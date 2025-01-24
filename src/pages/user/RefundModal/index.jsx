import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CancelModal = ({ show, handleClose, handleRefund, selectedEvent }) => {
  return (
    <Modal show={show} onHide={handleClose} size="md" centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-color fs-5 text-center fw-bold pt-md-3">
          Are you sure you want to cancel the ticket for {selectedEvent.eventName}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Once you cancel your ticket, it will be available for another user to buy. If you change your mind, you'll need to purchase it again.
        <br /><br />
        Refund amount depends on the terms and conditions.
        <div className="d-flex justify-content-between ps-md-4 pe-md-5 ps-sm-3 pe-0 pt-4">
          <div>Total price you paid <br />
            {selectedEvent.totalPrice} rupees
          </div>
          <div>Refund amount <br />
            {selectedEvent.totalPrice * 80 / 100} rupees
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className='text-danger border-danger bg-white' onClick={handleClose}>
          Keep Your Ticket
        </Button>
        <Button className='bg-danger border-0' onClick={handleRefund}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelModal;