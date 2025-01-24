import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGetOrganizerHistoryQuery } from "../../../services/services";
import AdminDashboardItems from '../../../components/HistoryDashItem';

export const HistoryAdmin = () => {
  const [activeTab, setActiveTab] = useState('paid');
  const [queryParams, setQueryParams] = useState({ status: 'paid' });
  const [isLoadingData, setIsLoadingData] = useState(true); 
  const { data, isLoading, isError } = useGetOrganizerHistoryQuery(queryParams);

  const events = data && Array.isArray(data.data) ? data.data : [];
  useEffect(() => {
    if (isLoading) {
      setIsLoadingData(true);
    } 
    else {
      setIsLoadingData(false);
    }
  }, [isLoading]); 

  useEffect(() => {
    if (data && data.data) {
      setIsLoadingData(false);
    }
  }, [data]);  

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setQueryParams({ status: tabName });  
    setIsLoadingData(true);  
  };

  return (
    <>
      <div className='d-flex justify-content-center'>
        <div style={{ width: "92%" }} className="forheight scroll">
          <div className="tabs fs-7 d-flex justify-content-center mb-3 position-sticky top-0 my-bg z-1">
            <div
              className={`tab-btn bg-transparent border-0 rounded-0 px-2 px-md-3 py-2 mx-md-2 mx-0 text-center crs ${activeTab === 'paid' ? 'active fw-medium' : ''}`}
              onClick={() => handleTabClick('paid')}
            >
              Paid
            </div>
            <div
              className={`tab-btn bg-transparent border-0 text-center rounded-0 px-2 px-md-3 py-2 mx-md-2 mx-0 fw-medium crs ${activeTab === 'unpaid' ? 'active fw-medium' : ''}`}
              onClick={() => handleTabClick('unpaid')}
            >
              Unpaid
            </div>
            <div
              className={`tab-btn bg-transparent border-0 text-center rounded-0 px-2 px-md-3 py-2 mx-md-2 mx-0 fw-medium crs ${activeTab === 'cancelled' ? 'active fw-medium' : ''}`}
              onClick={() => handleTabClick('cancelled')}
            >
              Cancelled
            </div>
          </div>
          <Row className="px-md-5 px-3 px-lg-3 px-xl-1 mx-xl-4">
            {isLoadingData && (
              <div className='text-center my-5'>
                <h3>Loading...</h3>
              </div>)}  
            { (!isLoadingData && (isError || events.length === 0)) && (
              <div className="text-center py-5">
                <h3>No events found</h3>
              </div>
            )}
            { !isLoadingData && events.map((event) => (
              <Col sm={6} lg={4} xs={12} key={event.uuid} className="px-1 py-2 px-lg-2 px-md-2 px-sm-5 p-lg-3">
                <AdminDashboardItems 
                  items={event}
                  setOrganizerBtn={false}
                  setEventsBtn={false}
                  setInfo={true}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default HistoryAdmin;