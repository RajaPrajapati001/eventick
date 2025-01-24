import React from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button } from "react-bootstrap";
import { facebook, twitter, linkedin } from "../../../assets/Constant";
import { eventlogo } from "../../../assets/Constant";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="mt-5 text-white" style={{ backgroundColor: "#0A075F" }}>
      <Container className="p-2 pt-5 pb-2">
        <Row className="mb-5 m-0">
          <Col className="col-6 col-md-4 col-lg-4">
            <img src={eventlogo} alt="..." />
            <p className="mt-3">
              Eventick is a global self-service ticketing platform for live
              experiences that allows anyone to create, share, find and attend
              events that fuel their passions and enrich their lives.
            </p>
            <div className="icon d-flex">
              <div>
                <img className="me-3" src={facebook} alt="..." />
              </div>
              <div>
                <img className="me-3" src={twitter} alt="..." />
              </div>
              <div>
                <img className="" src={linkedin} alt="..." />
              </div>
            </div>
          </Col>
          <Col className="col-12 col-sm-6 col-md-4 col-lg-2 d-lg-flex justify-content-lg-center mt-5 mt-sm-0 mt-md-0 mt-lg-0">
            <div>
              <h6 className="fw-bold">Plan Events</h6>
              <ul className="list-unstyled mt-4">
                <li className="mb-2">Create and Set Up</li>
                <li className="mb-2">Sell Tickets</li>
                <li className="mb-2">Online RSVP</li>
                <li className="mb-2">Online Events</li>
              </ul>
            </div>
          </Col>
          <Col className="col-12 col-sm-6 col-md-4 col-lg-2 mt-5 mt-md-0 m-lg-0 d-lg-flex justify-content-lg-center">
            <div>
              <h6 className="fw-bold">Eventick</h6>
              <ul className="list-unstyled mt-4">
                <li className="mb-2"><Link to="/about">About Us</Link> </li>
                <li className="mb-2"><Link to="/about">Contact US</Link> </li>
                <li className="mb-2"><Link to="/about">Help Center</Link> </li>
                {/* <li className='mb-2'>How it Works</li>
                            <li className='mb-2'>Privacy</li>
                            <li className='mb-2'>Terms</li> */}
              </ul>
            </div>
          </Col>
          <Col className="col-12 col-sm-6 col-md-6 col-lg-4 mt-5 m-lg-0">
            <h6 className="fw-bold">Stay In The Loop</h6>
            <p className="mt-3">
              Join our mailing list to stay in the loop with our newest for
              Event and concert
            </p>
            <div>
            </div>
          </Col>
        </Row>
        <hr />
        <div className="text-center">
          <Link to="/">Copyright @ 2024 Event Management Team</Link>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
