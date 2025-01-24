import React from "react";
import { Container } from "react-bootstrap";
import { error } from "../../../assets/Constant";

export const Error = () => {
  return (
    <Container className="text-center mt-5">
      <img src={error} alt="No Event Found" className="w-50 h-50 mb-5" />
      <h1 className="mb-5">No Event Found!</h1>
    </Container>
  );
};

export default Error;
