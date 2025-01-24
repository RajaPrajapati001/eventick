import React, { useEffect, useState, useContext } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { RiInformation2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { AppContext } from "../../routes/AppRoutes";
import { useOrganizerApprovalQuery, useEventApprovalQuery, useOrganizerPaymentQuery } from "../../services/services";
import DetailsModal from "../../components/HistoryModal"
import EditModal from "../EditModal";

const AdminDashboardItems = ({
  items,
  setOrganizerBtn,
  setEventsBtn,
  setInfo,
  setEdit
}) => {
  const [selectedItem,setSelectedItem]=useState("")
  const { setUpdate } = useContext(AppContext);
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [uuid, setUuid] = useState("");
  const [eventUuid, setEventUuid] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDetailsData, setShowDetailsData] = useState(null);
  const[show,setShow]= useState(false)

  const { data: paymentData } = useOrganizerPaymentQuery(
    { eventUuid },
    { skip: !eventUuid }
  );

  const { data, isLoading } = useOrganizerApprovalQuery(
    { email, status },
    { skip: !email || !status }
  );

  const { data: eventData, isLoading: loading } = useEventApprovalQuery(
    { uuid, status },
    { skip: !uuid || !status }
  );

  useEffect(() => {
    if (data?.status === 200 && data?.message === "Successfully updated") {
      toast.success("Organizer updated successfully");
      setUpdate(true);
    }
  }, [data, setUpdate]);

  useEffect(() => {
    if (eventData?.message === "update status") {
      toast.success("Event updated successfully");
      setUpdate(true);
    }
  }, [eventData, setUpdate]);

  useEffect(() => {
    if (paymentData) {
      window.location.href = paymentData.paymentUrl;
      localStorage.setItem("sessionId", paymentData.sessionId);
    }
  }, [paymentData]);

  const handleOrganizerBtns = (item, action) => {
    setEmail(item.email);
    setStatus(action);
  };

  const handleEventBtns = (item, action) => {
    setUuid(item.uuid);
    setStatus(action);
  };

  const showDetailedModal = (item) => {
    setShowDetailsData(item);
    setShowDetailsModal(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleEdit = (event) => {
    setSelectedItem(event);
    setShow(true);
  };

  return (
    <>
      <Row className="bg-white shadow-sm rounded-4 mt-3 p-3 g-2 m-auto">
        {/* Organizer or Event Section */}
        {setOrganizerBtn || setEventsBtn ? (
          <>
            <Col
              xs={12}
              className={`${
                setOrganizerBtn ? "d-none" : "d-flex"
              } justify-content-center align-items-center`}
            >
              <img
                src={items.imageUrl}
                alt="Event"
                className="rounded-3 img-fluid"
                style={{ height: "150px", width: "100%" }}
              />
            </Col>
            <Col xs={12} className="mt-2">
            <div className={setOrganizerBtn ? "d-none" : "d-flex flex-column"}>
  <div className="justify-content-between d-flex">
    <h5 className="fw-bold mb-1">{items.eventName}</h5>
    <p className="fw-medium text-primary mb-1">
      {items.startDate}
    </p>
  </div>
  <div className="d-flex flex-column">
    <p className="my-1 fw-medium text-dark mb-1 text-break">
      Details:{" "}
      {items.eventDetails?.length > 65
        ? `${items.eventDetails.substring(0, 65)}...`
        : items.eventDetails}
    </p>
    <p className="mb-1">City: {items.city}</p>
    <p className="mb-1">Email: {items.email}</p>
    <p className="mb-1">Place Price: {items.placePrice}</p>
  </div>
</div>

<div className={setEventsBtn? "d-none " : "d-flex flex-column"}>
<p className="mb-1">Email: {items.email}</p>
  <p className="mb-1">
    Organization Name: {items.organizationName || "No shop"}
  </p>
  <p className="mb-1 text-break">
    Details:{" "}
    {items.details?.length > 65
      ? `${items.details.substring(0, 65)}...`
      : items.details}
  </p>
  <p className="mb-1">Attempts: {items.attempts}</p>
</div>


              <div className="mt-2 d-flex justify-content-between">
                {setOrganizerBtn && (
                  <>
                    <Button
                      className="rounded-5 bg-danger border-0 text-white fw-medium px-3 py-1"
                      onClick={() => handleOrganizerBtns(items, "Rejected")}
                      disabled={isLoading}
                    >
                      Reject
                    </Button>
                    <Button
                      className="rounded-5 bg-success border-0 text-white fw-medium px-3 py-1"
                      onClick={() => handleOrganizerBtns(items, "Approved")}
                      disabled={isLoading}
                    >
                      Approve
                    </Button>
                  </>
                )}
                {setEventsBtn && (
                  <>
                    <Button
                      className="rounded-5 bg-danger border-0 text-white fw-medium px-3 py-1"
                      onClick={() => handleEventBtns(items, "Rejected")}
                      disabled={loading}
                    >
                      Reject
                    </Button>
                    <Button
                      className="rounded-5 bg-success border-0 text-white fw-medium px-3 py-1"
                      onClick={() => handleEventBtns(items, "Approved")}
                      disabled={loading}
                    >
                      Approve
                    </Button>
                  </>
                )}
              </div>
            </Col>
          </>
        ) : (
          <>
            <Col
              xs={12}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                src={items.imageUrl}
                alt="Event"
                className="rounded-3 img-fluid"
                style={{ height: "150px", width: "100%" }}
              />
            </Col>
            <Col xs={12} className="mt-2">
              <h5 className="fw-bold mb-1">
                {items.eventName}
                {!setInfo && (
                  <button
                    onClick={() => showDetailedModal(items)}
                    className="border-0 bg-transparent ms-2"
                  >
                    <RiInformation2Fill />
                  </button>
                )}
              </h5>
              <p className="fw-medium text-primary mb-1">
                {formatDate(items.startDate)}
              </p>
              <p className="text-muted mb-2">
              {items.eventDetails?.length > 65
                    ? `${items.eventDetails.substring(0, 65)}...`
                    : items.eventDetails}
              </p>
                          <Button
                            className={`${
                              setEdit ? "d-block" : "d-none"
                            } rounded-5 bg-success border-0 text-white fw-medium px-3 py-1`}
                            onClick={() => handleEdit(items)}
                          >
                            Edit
                          </Button>
              <div>
                {setInfo && (
                  <Button
                    className="rounded-5 bg-whole border-0 text-white fw-medium px-3 py-1"
                    onClick={() => showDetailedModal(items)}
                  >
                    Info
                  </Button>
                )}
              </div>
            </Col>
          </>
        )}
      </Row>

      {showDetailsModal && showDetailsData && (
        <DetailsModal
          selectedItem={showDetailsData}
          show={showDetailsModal}
          setShow={setShowDetailsModal}
        />
      )}
      {selectedItem && (
        <EditModal selectedItem={selectedItem} show={show} setShow={setShow} />
      )}
    </>
  );
};

export default AdminDashboardItems;
