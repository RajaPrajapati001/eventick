import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useEventData from '../UseEventData';
import EventCard from '../HistoryCard';
import { useRefundMutation } from '../../../services/services';
import {jwtDecode} from 'jwt-decode';
import {Loader} from '../../../components/Loader'; 
import CancelModal from '../RefundModal'; 

export const History = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [refund] = useRefundMutation();
  const { upcomingEvents, historyEvents, isLoading } = useEventData(); 
  const [email, setEmail] = useState('');

  const handleCancelClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.sub;
        setEmail(userEmail);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    } else {
      console.warn('Token not found in localStorage');
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
        console.error('Error', error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className='overflow-hidden'>
      <div className="container-fluid text-center heading-background py-5 mb-3">
        <h1 className="text-white pt-5 fw-bold">Booking Events</h1>
      </div>
      <Container className="px-0 mt-3">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h2 className="fw-medium text-color mb-4 mt-3 ms-3 ms-md-0">Upcoming Events</h2>
            {upcomingEvents.length > 0 ? (
              <Row className="justify-content-center px-md-5 px-3 px-lg-1 px-xl-1 mx-xl-4">
                {upcomingEvents.map((event) => (
                  <Col xl={3} lg={4} md={6} sm={12} key={event.eventUuid} className="py-2 ">
                    <EventCard event={event} onCancelClick={handleCancelClick} showCancelButton={true} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <h3 className="text-color">No upcoming events.</h3>
              </div>
            )}
            
            <h2 className="fw-medium text-color mb-4 mt-5 ms-3 ms-md-0">History Events</h2>
            {historyEvents.length > 0 ? (
              <Row className="justify-content-center px-md-5 px-3 px-lg-1 px-xl-1 mx-xl-4">
                {historyEvents.map((event) => (
                  <Col xl={3} lg={4} md={6} sm={12} key={event.eventUuid} className="py-2">
                    <EventCard event={event} showCancelButton={false} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <h3 className="text-color">No history events.</h3>
              </div>
            )}
          </>
        )}
      </Container>
      {selectedEvent && (
        <CancelModal 
          show={showModal} 
          handleClose={handleCloseModal} 
          handleRefund={handleRefund} 
          selectedEvent={selectedEvent} 
        />
      )}
    </div>
  );
};

export default History;