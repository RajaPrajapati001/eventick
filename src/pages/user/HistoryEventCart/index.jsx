import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import info from 'https://res.cloudinary.com/dlrkct80i/image/upload/v1737696012/info_apb14i.png';

export const EventCard = ({ event, onCancelClick, showCancelButton }) => {
  const [showModal, setShowModal] = useState(false);
  const [isCancelButtonEnabled, setIsCancelButtonEnabled] = useState(false);

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const eventStartTime = new Date(`${event.startDate}T${event.eventStartTime}`);
    const currentTime = new Date();
    const timeDifference = eventStartTime - currentTime;
    if (timeDifference > 24 * 60 * 60 * 1000) {
      setIsCancelButtonEnabled(true);
    } else {
      setIsCancelButtonEnabled(false);
    }
  }, [event.startDate, event.eventStartTime]);

  return (
    <div className="bg-white shadow-sm mb-3 border rounded-4 px-3 ps-3 h-100">
      <div className="img rounded-3 d-flex justify-content-center align-items-center">
        <img src={event.imageUrl} alt="event" style={{ width: "210px", height: "190px" }} className="rounded-3" />
      </div>

      <div className="w-100 mt-3 mt-sm-0">
        <div className="d-flex justify-content-center mt-2">
          <h6 className="mb-2 fw-bold">{event.eventName}</h6>
          <img src={info} alt="" height={22} className='crs ms-1' onClick={handleImageClick} />
        </div>

        <div className='left'>
          <div className="d-flex justify-content-between">
            <p className="custom-color mb-0 fw-medium fs-7">
              Category: <b className="text-dark fw-normal">{event.category}</b>
            </p>
            <p className="custom-color fw-medium mb-2 fs-7">
              Total price: <b className="text-dark fw-normal">{event.totalPrice}</b>
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="custom-color fw-medium mb-2 fs-7">
              Venue: <b className="text-dark pe-1 fw-normal">{event.placeAddress}</b>
            </p>
            <p className="custom-color fw-medium fs-7">
              Place: <b className="text-dark fw-normal">{event.city}</b>
            </p>
          </div>
        </div>

        <div className="d-flex flex-row justify-content-end align-items-center">
          {showCancelButton && (
            <Button
              className="bg-danger text-white fw-medium rounded-5 border-0 px-3 py-2 fs-7"
              onClick={() => onCancelClick(event)}
              disabled={!isCancelButtonEnabled}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex flex-column gap-2'>
          <div>Event Name: {event.eventName}</div>
          <div>Event Start Date: {event.startDate}</div>
          <div>Event End Date: {event.endDate}</div>
          <div>Event Start Time: {event.eventStartTime}</div>
          <div>Event End Time: {event.eventEndTime}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventCard;