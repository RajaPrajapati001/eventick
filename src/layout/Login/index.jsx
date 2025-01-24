import React from "react";
import {Row, Col} from "react-bootstrap";
import { Outlet } from "react-router-dom";


const Login = () => {
  
  return (
    <>
      <Container-fluid>
        <Row className="h-100 w-100 mx-0">
          <Col className="col-12 col-lg-6 d-flex align-items-center justify-content-center px-0 text-center">
        <Outlet />
          </Col>
          <Col
            id="bg-linear"
            className="col-6 d-none d-lg-flex vh-100 justify-content-center align-items-center"
          >
            <img src="https://res.cloudinary.com/dlrkct80i/image/upload/v1737696012/side_img_tmg9bn.png" className="w-75 h-75" />
          </Col>
        </Row>
      </Container-fluid>
    </>
  );
};

export default Login;
