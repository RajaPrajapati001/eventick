import React, { useState } from 'react';
import { Carousel, Container, Row, Col, Accordion, Card } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight, FaPlus, FaMinus } from 'react-icons/fa';

export const About = () => {
  const [activeKey, setActiveKey] = useState(null);

  const handleAccordionToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  return (
    <div className="bg-light">
      <div className="hh container-fluid text-center heading-background py-5">
        {/* <h1 className="text-white pt-5 fw-bold">Your Event, Our Passion</h1> */}
      </div>
      <Container>
        <Row className="my-4">
          <Col className="text-center fw-bold">
            <h1>Discover Our Vision</h1>
          </Col>
        </Row>
        <Row className="justify-content-center mb-3 mb-lg-2 text-center">
          <Col xs={3} className="d-flex justify-content-center gap-1 align-items-center">
            <div className="square-box bg-primary"></div>
            <div className="square-box bg-success mx-1"></div>
            <div className="square-box bg-danger"></div>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col lg={6} xs={12}>
            <h6 className="fw-bold d-inline">Welcome to the Event Management: </h6>
            <p className="d-inline">
              Eventick works with you to deliver exceptional events, ensuring the highest standards and meticulous attention to detail. Our goal is to create events that not only energize and recharge your family and colleagues but also lead to greater productivity and success.
              <br />
              <br />
              At Eventick, we meticulously plan each event after understanding your organization, budget, ethos, and requirements. Our events feature a variety of special programs such as air bubbles, balloon decorations, popcorn & candy, and delightful parting gifts. We aim to turn every occasion into a memorable experience.
            </p>
          </Col>
          <Col lg={6} xs={12} className="d-flex justify-content-center align-items-center px-0">
            <div className="outer-div position-relative m-auto my-5">
              <img src="https://res.cloudinary.com/dlrkct80i/image/upload/v1737696012/mac_jwq4bw.png" alt="Background" className="position-absolute w-100 h-100" />

              <Carousel
                className="carousel-container position-absolute top-50 start-50 w-75"
                indicators={false}
                controls={true}
                prevIcon={<FaChevronLeft className="text-dark fw-bold fs-2" />}
                nextIcon={<FaChevronRight className="text-dark fw-bold fs-2" />}
              >
                <Carousel.Item>
                  <img className="d-block w-100" src="https://res.cloudinary.com/dlrkct80i/image/upload/v1737696012/about1_q9qagu.jpg" alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src="https://res.cloudinary.com/dlrkct80i/image/upload/v1737696012/about2_xqycrp.jpg" alt="Second slide" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src="https://res.cloudinary.com/dlrkct80i/image/upload/v1737696012/about3_mmc2dh.jpg" alt="Third slide" />
                </Carousel.Item>
              </Carousel>
            </div>
          </Col>
        </Row>

        <Row className="mt-2 mt-lg-4 d-flex align-items-start">
          <Col xs={12} lg={6} className="d-flex flex-column">
            <Accordion activeKey={activeKey}>
              <h2 className="ms-1 mb-3">WHY CHOOSE US</h2>
              <Card className="mb-1">
                <Card.Header className="bg-white">
                  <div
                    onClick={() => handleAccordionToggle("0")}
                    className="w-100 bg-white px-0 py-2 d-flex align-items-center cursor-pointer"
                  >
                    <div className="icon-box bg-danger py-2 px-2 d-flex justify-content-center align-items-center text-white fs-5 rounded-circle me-3">
                      {activeKey === "0" ? <FaMinus /> : <FaPlus />}
                    </div>

                    <span className="text-dark w-100 fw-medium">WHO WE ARE ?</span>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <p>Eventick is a team of reliable, professional, and creative talents in event planning. We focus on making your special day truly wonderful with our expertise in coordinating dazzling events. As the leading event organizer, we turn every occasion into a memorable experience.</p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card className="mb-1">
                <Card.Header className="bg-white">
                  <div
                    onClick={() => handleAccordionToggle("1")}
                    className="w-100 bg-white px-0 py-2 d-flex align-items-center cursor-pointer"
                  >
                    <div className="icon-box bg-danger py-2 px-2 d-flex justify-content-center align-items-center text-white fs-5 rounded-circle me-3">
                      {activeKey === "1" ? <FaMinus /> : <FaPlus />}
                    </div>
                    <span className="text-dark w-100 fw-medium">WHAT WE DO</span>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <p>Eventick excels in artistic, technical, creative, management, and marketing fields. Based in Chennai, we handle events of all sizes, from birthday parties to stage shows, engaging closely with clients to bring their vision to life.</p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card className="mb-1">
                <Card.Header className="bg-white">
                  <div
                    onClick={() => handleAccordionToggle("2")}
                    className="w-100 bg-white px-0 py-2 d-flex align-items-center cursor-pointer"
                  >
                    <div className="icon-box bg-danger py-2 px-2 d-flex justify-content-center align-items-center text-white fs-5 rounded-circle me-3">
                      {activeKey === "2" ? <FaMinus /> : <FaPlus />}
                    </div>
                    <span className="text-dark w-100 fw-medium">OUR MISSION</span>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <p>Our mission is to provide our clients with quality, efficiency, professionalism, and excellent customer service.</p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card className="mb-1">
                <Card.Header className="bg-white">
                  <div
                    onClick={() => handleAccordionToggle("3")}
                    className="w-100 bg-white px-0 py-2 d-flex align-items-center cursor-pointer"
                  >
                    <div className="icon-box bg-danger py-2 px-2 d-flex justify-content-center align-items-center text-white fs-5 rounded-circle me-3">
                      {activeKey === "3" ? <FaMinus /> : <FaPlus />}
                    </div>
                    <span className="text-dark w-100 fw-medium">OUR VISION</span>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    <p>Our vision is to be the No.1 event planner in India by our innovative, quality of service and accountability.</p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
          <Col xs={12} lg={6} className="mt-4 mt-lg-3 pt-lg-4 d-flex flex-column justify-content-center gap-1">
            <div className="bg-white border rounded-3 d-flex align-items-center p-1">
              <span>
                <img src="https://res.cloudinary.com/dlrkct80i/image/upload/v1737696012/balloon_xpwrx6.jpg" className="rounded-circle ms-2 me-3 p-0" alt="balloon image" />
              </span>
              <span>Event Organiser in Madhya Pradesh</span>
            </div>
            <div className="bg-white border rounded-3 d-flex align-items-center p-1">
              <span>
                <img src="https://res.cloudinary.com/dlrkct80i/image/upload/v1737696012/gifts_ukutpr.jpg" className="rounded-circle ms-2 me-3 p-0" alt="gift image" />
              </span>
              <span>Event Planner in Madhya Pradesh</span>
            </div>
            <div className="bg-white border rounded-3 d-flex align-items-center p-1">
              <span>
                <img src="https://res.cloudinary.com/dlrkct80i/image/upload/v1737696012/wedd_lszcjp.jpg" className="rounded-circle ms-2 me-3 p-0" alt="wedd image" />
              </span>
              <span>Wedding Planner in Madhya Pradesh</span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About