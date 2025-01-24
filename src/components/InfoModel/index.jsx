import React, { useState } from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';

function InfoModel({show, setShow, item }) {
  // console.log(item);
  
  // const [show, setShow] = useState(false);

  // const handleShow = () => setShow(true);
  // const handleClose = () => setShow(false);

  return (
    <>
      {/* Trigger Button */}
      {/* <Button variant="primary" onClick={handleShow}>
        Show Modal
      </Button> */}

      {/* Modal */}
      <Modal show={show} onHide={setShow} centered>
        <Modal.Header closeButton>
          <Modal.Title>Event Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col><strong>Event Name:</strong> {item.eventName || "N/A"}</Col>
            <Col><strong>Category:</strong> {item.category || "N/A"}</Col>
          </Row>
          <Row className="mb-3">
            <Col><strong>Event Start Date:</strong> {item.startDate || "N/A"}</Col>
            <Col><strong>Event End Date:</strong> {item.endDate || "N/A"}</Col>
          </Row>
          <Row className="mb-3">
            <Col><strong>Event Start Time:</strong> {item.eventStartTime || "N/A"}</Col>
            <Col><strong>Event End Time:</strong> {item.eventEndTime || "N/A"}</Col>
          </Row>
          <Row className="mb-3">
            <Col><strong>City:</strong> {item.city || "N/A"}</Col>
            <Col><strong>Address:</strong> {item.placeAddress || "N/A"}</Col>
          </Row>
          <Row className="mb-3">
            <Col><strong>Available Tickets:</strong> {item.avaliabelTicket || "0"}</Col>
            <Col><strong>Price:</strong> {item.ticketPrice || "0"}</Col>
          </Row>
          <Row className="mb-3">
            <Col><strong>Description:</strong> {item.eventDetails || "N/A"}</Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{
            setShow(false)
          }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InfoModel;
