import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Modal } from 'react-bootstrap';
import { RiInformation2Fill } from 'react-icons/ri';


const HistoryCard = ({ event, onCancelClick, showCancelButton }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isCancelButtonEnabled, setIsCancelButtonEnabled] = useState(false);

  useEffect(() => {
    const eventStartTime = new Date(`${event.startDate}T${event.eventStartTime}`);
    const currentTime = new Date();
    const timeDifference = eventStartTime - currentTime;
    setIsCancelButtonEnabled(timeDifference > 24 * 60 * 60 * 1000);
  }, [event.startDate, event.eventStartTime]);

  const handleDetailsClick = () => setShowDetailsModal(true);
  const handleCloseModal = () => setShowDetailsModal(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <>
      <Row className="bg-white shadow-sm rounded-4 mt-3 p-3 g-2 m-auto">
        <Col
          xs={12}
          sm={12}
          className="d-flex justify-content-center align-items-center"
        >
          <img
            src={event.imageUrl}
            alt="Event"
            className="rounded-3 img-fluid"
            style={{ maxHeight: '150px', width: '100%' }}
          />
        </Col>

        <Col xs={12} sm={12} className="mt-2">
          <h5 className="fw-bold mb-1">
            {event.eventName}{' '}
            <button
              onClick={handleDetailsClick}
              className="border-0 bg-transparent"
            >
              <RiInformation2Fill />
            </button>
          </h5>
          <p className="fw-medium text-primary mb-1">{formatDate(event.startDate)}</p>
          <p className="text-muted mb-2">
            {event.eventDetails && event.eventDetails.split(' ').length > 15
              ? event.eventDetails.split(' ').slice(0, 15).join(' ') + '...'
              : event.eventDetails}
          </p>

          <div className={`d-flex mt-2 ${showCancelButton ? 'justify-content-between' : 'justify-content-end'}`}>
            {showCancelButton && (
              <Button
                className="d-block rounded-5 bg-danger border-0 text-white fw-medium px-3 py-1"
                onClick={() => onCancelClick(event)}
                disabled={!isCancelButtonEnabled}
              >
                Cancel
              </Button>
            )}
          </div>
        </Col>
      </Row>

      <Modal show={showDetailsModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-2">
          <div>Event Name: {event.eventName}</div>
          <div>Event Start Date: {event.startDate}</div>
          <div>Event End Date: {event.endDate}</div>
          <div>Event Start Time: {event.eventStartTime}</div>
          <div>Event End Time: {event.eventEndTime}</div>
          <div>Venue: {event.placeAddress}</div>
          <div>City: {event.city}</div>
          <div>Category: {event.category}</div>
          <div>Total Price: {event.totalPrice}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HistoryCard;