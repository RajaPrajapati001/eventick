import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { RiInformation2Fill } from "react-icons/ri";
import EditModal from "../EditModal";
import CancelModal from "../CancelModal";
import DetailsModal from "../DetailsModal";
import "../../index.css";
import { useOrganizerPaymentQuery,useGetOrganizerPaymentQuery } from "../../services/services";

const DashboardItems = ({
  items,
  setPayBtn = false,
  setCancelBtn = false,
  setRejectedPending = null,
  setEdit = false,
  setPaid ,
  setGetPayment
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDetailsData, setShowDetailsData] = useState(null);
  const [eventUuid, setEventUuid] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uuid,setUuid]=useState("")

  const { data: response, error, isLoading } = useOrganizerPaymentQuery(eventUuid, {
    skip: !eventUuid,
  });

  const { data } = useGetOrganizerPaymentQuery( uuid ,{skip: !uuid, }
  );
  if(data){
    window.location.href = data.paymentUrl;
    localStorage.setItem("sessionId",data.sessionId);
    localStorage.setItem("key","get-payment")
  }

  useEffect(() => {
    if (response) {
      window.location.href=response?.paymentUrl
      localStorage.setItem("sessionId",response?.sessionId)
      localStorage.setItem("key","event-payment")
    }
  }, [response, error, eventUuid]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const handleEdit = (event) => {
    setSelectedItem(event);
    setShow(true);
  };

  const showDetailedModal = (items) => {
    setShowDetailsData(items);
    setShowDetailsModal(true);
  };

  const handleCancel = (items) => {
    setShowModal(true);
    setSelectedItem(items);
  };

  const handlePay = (items) => {
    setEventUuid(items.uuid);
  };

  const handleGetPayment = (items) =>{
   if (items.uuid) {
      setUuid(items.uuid); 
    }

  }

  if (!items) {
    console.error("Error: Missing required items data.");
    return null;
  }

  return (
    <>
      <Row className="bg-white shadow-sm rounded-4 mt-3 p-3 g-2 m-auto">
        <Col xs={12} sm={12} className="d-flex justify-content-center align-items-center">
          <img
            src={items.imageUrl}
            alt="Event"
            className="rounded-3 img-fluid"
            style={{ maxHeight: "150px", width: "100%" }}
          />
        </Col>

        <Col xs={12} sm={12} className="mt-2">
          <h5 className="fw-bold mb-1">
            {items.eventName}{" "}
            <button
              onClick={() => showDetailedModal(items)}
              className="border-0 bg-transparent"
            >
              <RiInformation2Fill />
            </button>{" "}
          </h5>
          <p className="fw-medium text-primary mb-1">{formatDate(items.startDate)}</p>
          <p className="text-muted mb-2">
            {items?.eventDetails?.length > 65
              ? items.eventDetails.substring(0, 65) + "..."
              : items.eventDetails}
          </p>

          <div
            className={`d-flex ${
              setCancelBtn ? "justify-content-between" : "justify-content-end"
            } mt-2`}
          >
            <Button
              className={`${
                setCancelBtn ? "d-block" : "d-none"
              } rounded-5 bg-danger border-0 text-white fw-medium px-3 py-1`}
              onClick={() => handleCancel(items)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className={`${
                setEdit ? "d-block" : "d-none"
              } rounded-5 bg-success border-0 text-white fw-medium px-3 py-1`}
              onClick={() => handleEdit(items)}
            >
              Edit
            </Button>
            <Button
              className={`${
                setPayBtn ? "d-block" : "d-none"
              } rounded-5 bg-primary border-0 text-white fw-medium px-3 py-1`}
              onClick={() => handlePay(items)}
              disabled={isLoading}
            >
              Pay
            </Button>
            <Button
              disabled
              className={`${
                setPaid ? "d-block" : "d-none"
              } rounded-5 bg-success border-0 text-white fw-medium px-3 py-1`}
            >
              Paid
            </Button>
            <Button
              className={`${
                setGetPayment ? "d-block" : "d-none"
              } rounded-5 bg-whole border-0 text-white fw-medium px-3 py-1`}
              onClick={() => handleGetPayment(items)}
            >
              Get Payment
            </Button>

            <p
              className={`${
                setRejectedPending ? "d-block" : "d-none"
              } text-danger fs-7 fw-medium`}
            >
              {setRejectedPending}...
            </p>
          </div>
        </Col>
      </Row>

      {selectedItem && (
        <EditModal selectedItem={selectedItem} show={show} setShow={setShow} />
      )}
      {selectedItem && (
        <CancelModal
          cancelItems={selectedItem}
          show={showModal}
          setShow={setShowModal}
        />
      )}
      {showDetailsData && (
        <DetailsModal
          selectedItem={showDetailsData}
          show={showDetailsModal}
          setShow={setShowDetailsModal}
        />
      )}

      {errorMessage && (
        <div className="text-center text-danger mt-3">
          <p>{errorMessage}</p>
        </div>
      )}
    </>
  );
};

export default DashboardItems;
