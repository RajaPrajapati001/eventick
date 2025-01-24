import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import useEventData from "./UseEventData";
import EventCard from "./EventCard";
import { useRefundMutation } from "./services";
import { jwtDecode } from "jwt-decode";
import Loader from "./Loader";
import "./index.css";

export const Booking = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { filteredEvents: events, isLoading } = useEventData("upcoming");
  const [email, setEmail] = useState("");
  const [refund] = useRefundMutation();

  const handleCancelClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.sub;
        setEmail(userEmail);
        console.log(email);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    } else {
      console.warn("Token not found in localStorage");
    }
  }, []);

  const handleRefund = async () => {
    if (selectedEvent) {
      try {
        const res = await refund({
          userEmail: email,
          eventUuid: selectedEvent.eventUuid,
        });
        console.log(res);
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="overflow-hidden">
      <div className="container-fluid text-center heading-background py-5 mb-3">
        <h1 className="text-white pt-5 fw-bold">Booking Events</h1>
      </div>
      <Container className="px-0 mt-3">
        {isLoading ? (
          <Loader />
        ) : events.length > 0 ? (
          <Row className="justify-content-center px-md-5 px-3 px-lg-1 px-xl-1 mx-xl-4">
            {events.map((event) => (
              <Col
                xl={3}
                lg={4}
                md={6}
                sm={12}
                key={event.eventUuid}
                className="d-flex justify-content-center py-2 px-0"
              >
                <EventCard
                  event={event}
                  onCancelClick={handleCancelClick}
                  showCancelButton={true}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <h1 className="text-color">No booking events.</h1>
          </div>
        )}
      </Container>
      {selectedEvent && (
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          size="md"
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title className="w-100 text-color fs-5 text-center fw-bold pt-md-3">
              Are you sure you want to cancel the ticket for{" "}
              {selectedEvent.eventName}?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Once you cancel your ticket, your ticket is free for another user to
            buy. If you change your mind, you have to purchase again.
            <br />
            <br />
            Refund amount will depend on the terms and conditions.
            <div className="d-flex justify-content-between ps-md-4 pe-md-5 ps-sm-3 pe-0 pt-4">
              <div>
                Total price you paid <br />
                {selectedEvent.totalPrice} rupees
              </div>
              <div>
                Refund amount <br />
                {(selectedEvent.totalPrice * 20) / 100} rupees
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="border-whole bg-white"
              onClick={handleCloseModal}
            >
              Keep Your Ticket
            </Button>
            <Button className="bg-whole border-0" onClick={handleRefund}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Booking;
