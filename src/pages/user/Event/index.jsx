import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm } from "formik";
import { BsArrowClockwise } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DetailsModal from '../../../components/DetailsModal'
import { format } from "date-fns";
import {
  useGetSelectedEventQuery,
  useGetPlaceQuery,
  useAddCartDataMutation,
  useBuyDataMutation,
} from "../../../services/services";
import EventModal from "../../../components/Paymodel";
import EventCard from "../EventCart";
import { Loader } from "../../../components/Loader";
import { Error } from "../../user/Error";
import { toast } from "react-toastify";
import './style.css';

export const Event = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [eventFilter, setEventFilter] = useState({
    eventName: "",
    category: "",
    city: "",
    startDate: undefined,
    endDate: undefined,
  });
  const [cities, setCities] = useState([]);
  const [checkEmail, setCheckEmail] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [visibleEvents, setVisibleEvents] = useState(6);
  const [showCalendar, setShowCalendar] = useState(false);
  const { data, isLoading, isError } = useGetSelectedEventQuery(eventFilter);
  const { data: placeData, isLoading: isPlaceLoading } = useGetPlaceQuery();
  const [cartData] = useAddCartDataMutation();
  const [buyData] = useBuyDataMutation();
  const [disableBtn , setDisableBtn] = useState(true);
  const [showModal2, setShowModal2] = useState(false); 
  

  const [dateRangeState, setDateRangeState] = useState({
    startDate: null,
    endDate: null,
  });
  const calendarRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateChange = (ranges, submitForm, setFieldValue) => {
    const { startDate, endDate } = ranges.selection;
    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");

    setSelectedDates([startDate, endDate]);
    setFieldValue("startDate", formattedStartDate);
    setFieldValue("endDate", formattedEndDate);
 
      submitForm();
    
    setDateRangeState({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
  };
  const formatDateToLocal = (date) => {
    if (!date) return "";
    return format(new Date(date), "yyyy-MM-dd");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setEmail(jwtDecode(token).sub);
      setRole(jwtDecode(token).role);
      console.log(jwtDecode(token).role);
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
    
  }, []);

  useEffect(() => {
    if (role === 'USER') {
      setDisableBtn(false);
    }
  }, [role]);
  
  useEffect(() => {
    if (placeData) {
      const cities = [];
      placeData.forEach((venue) => {
        if (!cities.includes(venue.city)) {
          cities.push(venue.city);
        }
      });
      setCities(cities);
    }
  }, [placeData]);

  const handleEventFilter = (values) => {
    setEventFilter(values);
    setVisibleEvents(6);
  };
  const handleAddToCart = async (event) => {
    if (checkEmail === false) {
       navigate("/");
    } else {
      try {
        const res = await cartData({
          eventUuid: event.uuid,
          userEmail: email,
          ticketQuantity: quantity,
        });
        if (res.data.message === "Added to cart successfully") {
          toast.success(res.data.message);
        } else if (res.data.message === "Already Added to Cart") {
          toast.success(res.data.message);
        }
      } catch (error) {
        console.error("Error", error);
      }
    }
  };
  const handleInfoClick = (event) => { 
    setSelectedEvent(event); 
    setShowModal2(true); 
  };
  
  const handleBuyNow = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
    setQuantity(1)
  };
  const handleConfirmPurchase = async () => {
    if (selectedEvent) {
      try {
        const res = await buyData({
          userEmail: email,
          quantity: quantity,
          eventUuid: selectedEvent.uuid,
        });
        console.log(res.data.paymentUrl);
        if (res.data.paymentUrl) {
          window.location.href = res.data.paymentUrl;
          localStorage.setItem("sessionId", res.data.sessionId);
        }
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  const renderEventContent = () => {
    if (isLoading || isPlaceLoading) {
      return <Loader />;
    } else if (isError || !data || data.length === 0) {
      return <Error />;
    } else {
      return (
        <Container className="px-xl-0">
          <Row className="justify-content-center px-md-5 px-3 px-lg-3 px-xl-0 mx-xl-0">
            {data.slice(0, visibleEvents).map((event) => (
              <Col
                xl={3}
                lg={4}
                md={6}
                sm={12}
                key={event.uuid}
                className="px-1 px-lg-2 px-md-2 px-sm-5 p-lg-3"
              >
                <EventCard
                  event={event}
                  handleAddToCart={handleAddToCart}
                  handleBuyNow={handleBuyNow}
                  formatDateToLocal={formatDateToLocal}
                  handleInfoClick={handleInfoClick}
                  disableBtn={disableBtn}
                />
              </Col>
            ))}
            <Col className="mt-4 d-flex justify-content-center col-12 mb-3">
              {data.length > visibleEvents && (
                <button
                  className="border-whole rounded-pill fw-medium px-3 py-2 bg-white"
                  onClick={() => setVisibleEvents(visibleEvents + 6)}
                >
                  Load More
                </button>
              )}
            </Col>
          </Row>
        </Container>
      );
    }
  };

  return (
    <>
      <div className="container-fluid text-center heading-background py-5">
        {/* <h1 className="text-white pt-5 fw-bold">Exciting Events Ahead!</h1> */}
      </div>

      <Container fluid className="px-4">
        <Formik initialValues={eventFilter} onSubmit={handleEventFilter}>
          {({ values, handleChange, submitForm, setFieldValue }) => (
            <FormikForm>
              <Row className="justify-content-md-evenly justify-content-center my-4 pe-xl-5">
                <Col md={2} xl={1} className="px-0 mb-2 d-flex justify-content-center mt-2 pt-1 align-items-center">
                  <h1 className="ms-md-4 ms-lg-0 fs-3 text-color fw-bold">
                    Upcoming Events
                  </h1>
                </Col>
                <Col md={3} sm={12} className="pt-1 px-md-2 px-sm-5">
                  <Form.Group className="mb-2 ms-sm-0 ms-md-3 ms-lg-0">
                    <div className="input-group-custom rounded-pill mt-2 py-1 border d-flex align-items-center bg-grey">
                      <AiOutlineSearch
                        size={24}
                        className="ms-2 crs"
                        onClick={submitForm}
                      />
                      <Form.Control
                        type="text"
                        className="border-0 fs-7 rounded-pill py-1 bg-grey form-control-custom"
                        placeholder="Search events..."
                        name="eventName"
                        value={values.eventName}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            submitForm();
                          }
                        }}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col md={2} lg={2} xl={2} className="pt-1 px-md-2 px-xl-0 px-sm-5">
                  <Field
                    as="select"
                    className="p-2 rounded-pill form-select mt-md-2 fs-7 bg-grey form-control-custom"
                    name="city"
                    value={values.city}
                    onChange={(e) => {
                      handleChange(e);
                      submitForm();
                    }}
                  >
                    <option value="">City</option>
                    {cities.map((city, idx) => (
                      <option key={idx} value={city}>
                        {city}
                      </option>
                    ))}
                  </Field>
                </Col>
                <Col md={2} lg={2} xl={2} className="pt-1 px-md-2 px-xl-0 px-sm-5">
                  <Field
                    as="select"
                    className="p-2 rounded-pill form-select mb-1 mt-2 bg-grey fs-7 form-control-custom"
                    name="category"
                    value={values.category}
                    onChange={(e) => {
                      handleChange(e);
                      submitForm();
                    }}
                  >
                    <option value="">Category</option>
                    <option value="singing">Singing</option>
                    <option value="party">Party</option>
                    <option value="dance">Dance</option>
                    <option value="sports">Sports</option>
                  </Field>
                </Col>
                <Col md={3} xl={2} className="pt-1 px-md-2 px-sm-5 mt-2 ">
                 <div className="d-flex align-items-center justify-content-md-start gap-1">
                <div>
                <Form.Group className="mb-2" onClick={() => setShowCalendar(!showCalendar)} >
                    <div
                      ref={inputRef}
                      className="input-group-custom rounded-pill px-1 py-1 border d-flex align-items-center bg-grey"
                    >
                      <Form.Control type="text"
                        className="form-control p-1 fs-7 bg-grey border-0"
                        readOnly
                        placeholder="Select Dates"
                        value={
                          selectedDates.length > 0 &&
                          selectedDates[0] &&
                          selectedDates[1]
                            ? `${format(
                                selectedDates[0],
                                "yyyy-MM-dd"
                              )} to ${format(selectedDates[1], "yyyy-MM-dd")}`
                            : "Select Dates"
                        }
                        id="eventDate"
                      />
                    </div>
                  </Form.Group>
                  {showCalendar && (
                    <div
                      ref={calendarRef}
                      className="date-range-container position-absolute w-100 end-0 z-1 overflow-hidden d-flex justify-content-end align-items-center"
                    >
                      <DateRange
                        ranges={[
                          {
                            startDate: dateRangeState.startDate || new Date(),
                            endDate: dateRangeState.endDate || new Date(),
                            key: "selection",
                          },
                        ]}
                        className="py-0 border rounded"
                        onChange={(ranges) =>
                          handleDateChange(ranges, submitForm, setFieldValue)
                        }
                      />
                    </div>
                  )}
                </div>
                 <div>
                 <BsArrowClockwise size={18}
                          style={{ fontWeight: 'bolder'}}
                          className="crs fw-bolder mb-2"
                          onClick={() => {setFieldValue("eventName", '');setFieldValue("city", '');setFieldValue("category", '');setFieldValue("startDate", undefined);setFieldValue("endDate", undefined);setSelectedDates([]);submitForm();
                          }}
                          />
                 </div>
                 </div>
                </Col>
              </Row>
            </FormikForm>
          )}
        </Formik>
      </Container>
      {renderEventContent()}

      {selectedEvent && (
        <EventModal
          show={showModal}
          onHide={() => setShowModal(false)}
          event={selectedEvent}
          quantity={quantity}
          setQuantity={setQuantity}
          handleAddToCart={handleAddToCart}
          handleConfirmPurchase={handleConfirmPurchase}
        />
      )}
      {selectedEvent && ( 
        <DetailsModal selectedItem={selectedEvent} 
        show={showModal2} setShow={setShowModal2} /> )}
    </>
  );
};

export default Event