import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

const ConfirmModal = ({ show, handleClose, handleConfirm, formData, isLoading }) => {
  return (
    <Modal show={show} onHide={handleClose} size="md" centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="w-100 fw-bold text-center text-color py-3 fs-5 text-center fw-bold pt-md-3">
          Confirm Your Place
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='py-4 py-md-5 px-3'>
        Once you add a new place, you may not delete or edit it. It's better to check before confirming it.
        <br />
        <br />
        <strong>Place Name:</strong> {formData.Place}
        <br />
        <strong>City:</strong> {formData.City}
        <br />
        <strong>Max Seats:</strong> {formData.Seats}
        <br />
        <strong>Price (per day):</strong> {formData.Placeprice}
        <br />
        <br />
        Are you sure you want to add this place?
        <br />
      </Modal.Body>
      <Modal.Footer className='py-3'>
        <Button className='border-whole bg-white' onClick={handleClose}>
          No
        </Button>
        <Button className='bg-whole border-0' onClick={handleConfirm} disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Sure, Add it'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
