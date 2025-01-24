import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useUnPaidPaymentQuery } from '../../services/services';

const ViewModal = ({ show, handleClose, eventData, unpaidAmount }) => {
  const [triggerApi, setTriggerApi] = useState(false);

  const { data, isLoading } = useUnPaidPaymentQuery(
    triggerApi ? { placeUuid: eventData.placeUuid } : null
  );

  const handlePayClick = () => {
    setTriggerApi(true); 
  };

  if (data) {
    window.location.href = data.paymentUrl;
    localStorage.setItem("sessionId", data.sessionId);
  }

  return (
    <Modal show={show} onHide={handleClose} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-color fs-5 fw-bold pt-md-3">
          Payment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div><strong>City:</strong> {eventData.city}</div>
        <br />
        <div><strong>Venue Name:</strong> {eventData.venueName}</div>        
        <br />
        <div><strong>Rental Cost:</strong> {eventData.rentalCost}</div>        
        <br />
        <div><strong>Capacity:</strong> {eventData.capacity}</div>
        <br />
        <div><strong>Unpaid Amount:</strong> {unpaidAmount}</div>
        <br />
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
     
       <Button
          className='bg-whole border-0'
          onClick={handlePayClick}
          disabled={isLoading} 
        >
          {isLoading ? 'Processing...' : 'Pay'} 
        </Button>
        <Button className='bg-secondary border-0' onClick={handleClose}>
          Close
        </Button>
       
      </Modal.Footer>
    </Modal>
  );
};

export default ViewModal;
