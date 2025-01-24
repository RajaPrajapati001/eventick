import React from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

const Paymodal = ({
  show,
  onHide,
  event,
  quantity,
  setQuantity,
  handleAddToCart,
  handleConfirmPurchase,
}) => {
  const calculateTotalPrice = event?.ticketPrice * quantity || 0;

  const handleQuantityChange = (operation) => {
    if (operation === "increase" && quantity < event.avaliabelTicket) {
      setQuantity((prev) => prev + 1);
    } else if (operation === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="text-color fw-bold">
          {event.eventName}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Card>
          <Card.Body className="row">
            <div className="col-12 col-lg-6 d-flex justify-content-center mb-3 mb-md-0">
              <Card.Img
                variant="top"
                src={event.imageUrl}
                className="w-100 h-auto rounded"
              />
            </div>

            <div className="col-12 col-lg-6 mt-2">
              <Card.Title className="text-color fs-6 fw-bold">
                {event.eventName}
              </Card.Title>
              <Card.Text>{event.eventDetails}</Card.Text>

              <div>
                <FaMapMarkerAlt className="me-1 text-color" /> {event.placeAddress},{" "}
                {event.city}
              </div>
              <div className="d-flex align-items-center mt-2">
                <MdDateRange className="me-1 text-black" /> {event.startDate} to{" "}
                {event.endDate}
              </div>

              <div className="d-flex mt-2">
                Ticket Price: {event.ticketPrice}
              </div>

              <div className="d-flex align-items-center justify-content-between mt-3">
                <div>Quantity:</div>
                <div className="d-flex align-items-center">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    className="btn btn-sm btn-secondary"
                  >
                    -
                  </button>
                  <span className="mx-2">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    className="btn btn-sm btn-secondary"
                    disabled={quantity >= event.availableTickets}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-3">Total Price: {calculateTotalPrice}</div>
            </div>
          </Card.Body>
        </Card>
      </Modal.Body>

      <Modal.Footer>
        <Button
          className="border-whole bg-transparent"
          onClick={() => handleAddToCart(event)}
        >
          Add to Cart
        </Button>
        <Button className="bg-whole border-0" onClick={handleConfirmPurchase}>
          Pay Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Paymodal;
