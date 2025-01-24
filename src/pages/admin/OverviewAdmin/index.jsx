import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import InfoCard from '../../../components/AmountCard';
import { useGetTotalPaymentQuery } from '../../../services/services';
import {Loader} from '../../../components/Loader'

const OverviewAdmin = () => {
  const { data, error, isLoading } = useGetTotalPaymentQuery(); 
  if (isLoading) {
    return (
      <Loader/>
    );
  }
  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      There was an error fetching the data. 
      <br />
      Please try again later.
      </Container>
    );
  }

  const eventPaymentStats = data.eventPaymentStatistics;
  const eventStats = data.eventStatistics;

  return (
    <div className="d-flex">
      <Container className="px-xl-5 mx-xl-5 mt-5 vh-75 scroll">
        <section className="mb-3">
          <h2 className="mb-4 ms-xl-3 text-color">Finance</h2>
          <Row className='px-xl-4'>
            <Col md={4} lg={3} className="mb-3 px-5 px-md-2">
              <InfoCard title="Total Payments" value={`${data.totalEarnings}`} />
            </Col>
            <Col md={4} lg={3} className="mb-3 px-5 px-md-2">
              <InfoCard title="Event Payments" value={`${eventPaymentStats.totalEventPayments}`} />
            </Col>
            <Col md={4} lg={3} className="mb-3 px-5 px-md-2">
              <InfoCard title="Place Price" value={`${eventPaymentStats.totalEventEarnings}`} />
            </Col>
            <Col md={4} lg={3} className="mb-3 px-5 px-md-2">
              <InfoCard title="Our Profit" value={`${data.netProfit}`} />
            </Col>
          </Row>
        </section>
        <section className="mb-3">
          <h2 className="mb-4 ms-xl-3 text-color">Events</h2>
          <Row className='px-xl-4'>
            <Col md={4} lg={3} className="mb-3 px-5 px-md-2">
              <InfoCard title="Total Events" value={eventStats.totalEvents} />
            </Col>
            <Col md={4} lg={3} className="mb-3 px-5 px-md-2">
              <InfoCard title="Approved Events" value={eventStats.approvedEvents} />
            </Col>
            <Col md={4} lg={3} className="mb-3 px-5 px-md-2">
              <InfoCard title="Canceled Events" value={eventStats.canceledEvents} />
            </Col>
            <Col md={4} lg={3} className="mb-3 px-5 px-md-2">
              <InfoCard title="Pending Approval" value={eventStats.pendingEvents} />
            </Col>
            <Col md={4} lg={3} className="mb-3 px-5 px-md-2">
              <InfoCard title="On Going Events" value={eventStats.ongoingEvents} />
            </Col>
            <Col md={4} lg={3} className="mb-3 px-5 px-md-2">
              <InfoCard title="Future Events" value={eventStats.upcomingEvents} />
            </Col>
            <Col md={4} lg={3} className="mb-3 px-5 px-md-2">
              <InfoCard title="Completed Events" value={eventStats.completedEvents} />
            </Col>
            <Col md={4} lg={3} className="mb-3 px-5 px-md-2">
              <InfoCard title="Rejected Events" value={eventStats.rejectedEvents} />
            </Col>
          </Row>
        </section>
        <section className="mb-3">
          <h2 className="mb-4 ms-xl-3 text-color">Total Profits</h2>
          <Row className='px-xl-4'>
            <Col md={4} lg={3} className="mb-3 px-5 px-md-2">
              <InfoCard title="Refund Profit" value={data.refundStatistics.totalRefundProfit} />
            </Col>
            <Col md={4} lg={3} className="mb-3 px-5 px-md-2">
              <InfoCard title="Event Profit" value={data.eventPaymentStatistics.totalEventProfit} />
            </Col>
            <Col md={4} lg={3} className="mb-3 px-5 px-md-2">
              <InfoCard title="Venue Profits" value={data.venuePaymentStatistics.totalProfitFromVenues} />
            </Col>
          </Row>
        </section>
        
        <section className="mb-3">
          <h2 className="mb-4 ms-xl-3 text-color">Total Users</h2>
          <Row className='px-xl-4'>
            <Col md={4} lg={3} className="mb-3 px-5 px-md-2">
              <InfoCard title="Users" value={data.userData.user} />
            </Col>
            <Col md={4} lg={3} className="mb-3 px-5 px-md-2">
              <InfoCard title="Organizer" value={data.userData.organizer} />
            </Col>
            <Col md={4} lg={3} className="mb-3 px-5 px-md-2">
              <InfoCard title="Total" value={`${Number(data.userData.user) + Number(data.userData.organizer)}`} />
            </Col>
          </Row>
        </section>
    
      </Container>
    </div>
  );
};

export default OverviewAdmin;
