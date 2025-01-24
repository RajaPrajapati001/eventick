
import React from 'react';
import { Card } from 'react-bootstrap';
const AmountCard = ({ title, value }) => {
  return (
    <Card className="custom-card border-0">
      <Card.Body className='pe-xl-0'>
        <Card.Title className='fs-7 opacity-75'>{title}</Card.Title>
        <Card.Text className='fw-bold fs-6'>{value}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default AmountCard;
