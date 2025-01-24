import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const DetailsModal = ({ selectedItem, show, setShow }) => {
  const handleClose = () => {
    setShow(false); 
  };
  

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Event Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><b>Event Name:</b> {selectedItem.eventName}</p>
        <p><b>Category:</b> {selectedItem.category}</p>
        <p><b>Date:</b> {selectedItem.startDate}</p>
        <p><b>Time:</b> {selectedItem.eventStartTime} PM</p>
        <p><b>Venue:</b> {selectedItem.placeAddress}</p>
        <p><b>Ticket Price:</b> Rs {selectedItem.ticketPrice}/- only</p>
        <p><b>Available Tickets:</b> {selectedItem.avaliabelTicket}</p>
        <p><b>Event Details:</b> {selectedItem.eventDetails}</p>
      </Modal.Body>
    </Modal>
  );
};

export default DetailsModal;