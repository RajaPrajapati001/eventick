import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../../index.css"

const CartItem = ({
  key,
  removeEvent,
  decrease,
  increase,
  ...items
}) => {
  const [disable, setDisable] = useState(false);
  const [loadingIncrease, setLoadingIncrease] = useState(false); // State for increase button
  const handleDecrement=async()=>{
                      setLoadingIncrease(true);
                      await decrease({
                        ticketQuantity: items.ticketQuantity,
                        addToCartUuid: items.addToCartUuid,
                      });
                      setLoadingIncrease(false);
  }
  const handleIncrement=async()=>{
    setLoadingIncrease(true); 
    await increase({
      ticketQuantity: items.ticketQuantity,
      addToCartUuid: items.addToCartUuid,
      maxTickets: items.avaliabelTicket,
    });
    setLoadingIncrease(false); 
  }
  const handleRemove=()=>{
    removeEvent({
      addToCartUuid: items.addToCartUuid,
    });
    setDisable(true);
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  const formatTime=(timeString)=>{
const [hours, minutes] = timeString.split(":").map(Number);  // Split and convert to number

const period = hours >= 12 ? 'PM' : 'AM';
const formattedHour = hours % 12 === 0 ? 12 : hours % 12;  // Convert 24-hour format to 12-hour format
const formattedTime = `${formattedHour}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;

return formattedTime;
  }

  return (
    <>
      <div className="bg-white shadow-sm rounded-4 d-flex flex-column flex-sm-row mt-3 py-3 p-3 border-custom">
        <div className="img rounded-3 d-flex justify-content-between pe-1">
          <img
            src={items.imageUrl}
            alt="event"
            style={{
              width: "230px",
              height: "190px",
            }}
            className="rounded-3 myimg"
          ></img>
          <div className="date mb-2 d-block d-sm-none d-flex flex-column">
            <div className="fs-7 fw-medium text-dark">
              {formatDate(items.startDate)}
            </div>
            <div className="fs-7 fw-bold text-success text-end">
            {formatTime(items.eventStartTime)}
            </div>
          </div>
        </div>
        <div className="rght w-100 px-1 mt-2 mt-sm-0">
          <div className="ms-0 ms-sm-3">
            <div className="d-flex justify-content-between">
              <div className="flex-column mb-2 ">
                <h6 className="mb-2">{items.eventName}</h6>
                <p className="custom-color fw-normal fs-7">
                  Category :{" "}
                  <b className="text-dark fw-medium">{items.category}</b>
                </p>
              </div>{" "}
              <div className="date d-none d-sm-flex d-sm-block  mb-2 flex-column">
                <span className="fs-7 fw-medium text-dark">
                  {formatDate(items.startDate)}
                </span>
                <span className="fs-7 fw-bold text-success text-end">
                  {formatTime(items.eventStartTime)}
                </span>
              </div>
            </div>
            <div className=" d-flex flex-row">
              <p className="custom-color fw-normal mb-2">
                <b className="text-dark fw-medium">
                  Rs {items.ticketPrice}/- only
                </b>
              </p>{" "}
            </div>
            <div className="d-flex flex-column flex-sm-row justify-content-between">
              <div className="left ">
                <div className=" d-flex flex-row">
                  <p className="custom-color fw-normal fs-7">
                    Venue :{" "}
                    <b className="text-dark fw-medium">{items.placeAddress}</b>
                  </p>{" "}
                </div>
                <div className="d-flex flex-row mt-2">
                  <button
                    className="bg-btn px-2 py-1 fs-7 border-0 me-2 crs"
                    onClick={handleDecrement}
                    disabled={loadingIncrease}
                  >
                    -
                  </button>
                  <div className="me-2">{items.ticketQuantity}</div>
                  <button
                    className="bg-btn px-2 py-1 fs-7 border-0 crs"
                    onClick={handleIncrement}
                    disabled={loadingIncrease} // Disable when loading
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="right d-flex flex-row flex-sm-column justify-content-between">
                <p className="fs-7 text-danger my-0 d-flex align-self-center fw-medium">
                  Tickets left-{items.avaliabelTicket}
                </p>
                <Button
                  className="bg-danger text-white fw-medium rounded-5 border-0 mt-2 px-3 py-2 fs-7"
                  onClick={handleRemove}
                  disabled={disable}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;