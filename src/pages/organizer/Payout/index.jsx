
import React, { useState, useEffect } from 'react';
import {Row, Col } from 'react-bootstrap';
import { useGetPayoutEventQuery } from '../../../services/services';
import { jwtDecode } from 'jwt-decode';  
import DashboardItems from "../../../components/DashboardItems";
import {Loader} from '../../../components/Loader'; 

export const Payout = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [email, setEmail] = useState('');
   const [isLoadingData, setIsLoadingData] = useState(true); 
  const [queryParams, setQueryParams] = useState(null);
  const { data: events, isLoading } = useGetPayoutEventQuery(queryParams, { skip: !queryParams });


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
   useEffect(() => {
      if (isLoading) {
        setIsLoadingData(true);
      } 
      else {
        setIsLoadingData(false);
      }
    }, [isLoading]); 

  useEffect(() => {
    if (email && activeTab) {
      setQueryParams({ email, status: activeTab });
    }
  }, [email, activeTab]);
   useEffect(() => {
      if (events) {
        setIsLoadingData(false);
      }
    }, [events])
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (email) {
      setQueryParams({ email, status: tabName });
      setIsLoadingData(true); 
    }
  };

  return (
    <>
      <div className='d-flex justify-content-center'>
        <div style={{ width: "92%" }} className="forheight scroll">
          <div className="tabs fs-7 d-flex justify-content-center mb-3 position-sticky top-0 my-bg z-1">
            <div
              className={`tab-btn bg-transparent border-0 rounded-0 px-2 px-md-3 py-2 mx-md-2 mx-0 text-center crs ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => handleTabClick('history')}
            >
              Payment History
            </div>
            <div
              className={`tab-btn bg-transparent border-0 text-center rounded-0 px-2 px-md-3 py-2 mx-md-2 mx-0 fw-medium crs ${activeTab === 'Pending' ? 'active' : ''}`}
              onClick={() => handleTabClick('Pending')}
            >
              Pending
            </div>
            <div
              className={`tab-btn bg-transparent border-0 text-center rounded-0 px-2 px-md-3 py-2 mx-md-2 mx-0 fw-medium crs ${activeTab === 'payment' ? 'active' : ''}`}
              onClick={() => handleTabClick('payment')}
            >
              Get Payment
            </div>
          </div>
          {isLoadingData ? (
  <Loader />
) : (
  <>
    {(!events || events.length === 0) && (
      <div className="text-center py-5">
        <h3>No events found</h3>
      </div>
    )}
    <Row className="g-2">
      {events && events.map((event) => (
        <Col
          sm={6}
          lg={4}
          xs={12}
          key={event.uuid}
          className="px-1 px-xl-3 py-2 px-md-2 px-sm-5 p-lg-3"
        >
          <DashboardItems 
            items={event}
            setPayBtn={false}
            setCancelBtn={false}
            setRejectedPending={false}
            setEdit={false}
            setPaid={activeTab === 'history'}
            setGetPayment={activeTab === 'payment'}
          />
        </Col>
      ))}
    </Row>
  </>
)}

       
        </div>
      </div>
    </>
  );
};

export default Payout;
