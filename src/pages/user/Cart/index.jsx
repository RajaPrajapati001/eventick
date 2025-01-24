import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import {
  usePaymentMutation,
  useRemoveEventMutation,
  useCartDataMutation,
  useUpdateQuantityMutation
} from "../../../services/services";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { empty } from "../../../assets/Constant";
import CartItem from "../../../components/CartItem";
import CustomForm from "../BecomeOrganizer";

function Cart() {
  const [email,setEmail]=useState("")
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [cartData, setCartData] = useState({ data: { data: [] } });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [update] = useUpdateQuantityMutation();
  const [removeEvent] = useRemoveEventMutation();
  const [data] = useCartDataMutation();

  // const token = localStorage.getItem("token");
  // const decoded = jwtDecode(token).sub;
  // const email = decoded.sub;
  const [makepayment, { isLoading: Loading }] = usePaymentMutation();

  useEffect(() => {
    if (cartData.data.data?.length > 0) {
      const total_price = cartData.data.data.reduce((sum, item) => {
        return (sum =
          sum + parseInt(item.ticketPrice) * parseInt(item.ticketQuantity));
      }, 0);
      setTotal(parseInt(total_price));
    }
  }, [cartData]);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        
        if ( token) {
          setEmail(jwtDecode(token).sub );
          const resp = await data({ userEmail: jwtDecode(token).sub });

          if (resp.data.data) {
            setCartData(resp);
          } else {
            setCartData({ data: { data: [] } });
          }
          setLoading(false);
        } else {
          setLoading(false);
          setCartData({ data: { data: [] } });
          toast.error("please login first");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    })();
  }, []);

  async function decrease(obj) {
    if (obj.ticketQuantity <= 1) {
      const resp = await removeEvent({ eventUuid: obj.addToCartUuid });
      if (resp) {
        setCartData(resp);
      } else {
        toast.error("something went wrong");
      }
    } else {
      const res = await update({
        addToCartUuid: obj.addToCartUuid,
        ticketQuantity: obj.ticketQuantity - 1,
      });
      if (res) {
        setCartData(res);
      } else {
        toast.error("something went wrong");
      }
    }
  }
  async function increase(obj) {
    if (obj.ticketQuantity >= obj.maxTickets) {
      toast.error("No tickets left");
    } else {
      const res = await update({
        addToCartUuid: obj.addToCartUuid,
        ticketQuantity: obj.ticketQuantity + 1,
      });
      if (res) {
        setCartData(res);
      } else {
        toast.error("something went wrong");
      }
    }
  }
  async function deleteEvent(id) {
    const res = await removeEvent({ eventUuid: id.addToCartUuid });
    if (res) {
      setCartData(res);
    } else {
      toast.error("something went wrong");
    }
  }

  async function createPayment() {
    const res = await makepayment({ userEmail: email });

    if (res.data.sessionUrl) {
      window.location.href = res.data.sessionUrl;
      localStorage.setItem("sessionId", res.data.sessionId);
      localStorage.setItem("key","cart")
    }
  }

  return loading ? (
    <>
      <div className="hh container-fluid text-center heading-background py-3">
        {/* <h1 className="text-white pt-5 fw-bold">Cart Section</h1> */}
      </div>

      <div className="d-flex justify-content-center align-items-center forhght">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "92%" }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    </>
  ) : cartData.data.data?.length > 0 ? (
    <>
      <div className="hh container-fluid text-center heading-background py-3">
        {/* <h1 className="text-white pt-5 fw-bold">Cart Section</h1> */}
      </div>
      <div
        className="m-auto d-flex gap-4 flex-column flex-lg-row forheight"
        style={{ width: "92%" }}
      >
        <div className="scroll flex-grow-1">
          {cartData.data.data?.length > 0 && (
            <>
              {cartData.data.data.map((items) => (
                <CartItem
                  key={items.addToCartUuid}
                  removeEvent={deleteEvent}
                  decrease={decrease}
                  increase={increase}
                  {...items}
                />
              ))}
            </>
          )}
        </div>

        <div className=" d-flex align-items-center justify-content-center">
          <div className="m-auto">
            <div className="bg-white box-width p-3 border-custom w-100 d-flex flex-column gap-2 shadow-sm rounded-4 mb-3 mb-lg-0">
              <div className="d-flex justify-content-center py-3 fs-5">
                <p className="my-0 fw-medium text-dark">Price Details</p>
              </div>
              <div className="d-flex py-2 px-3 justify-content-between ">
                {cartData ? (
                  <p className="my-0 text-custom">
                    Price ({cartData.data.data?.length} items)
                  </p>
                ) : (
                  <p className="my-0 text-custom">Price ({0} items)</p>
                )}
                <p className="my-0 text-custom">{total}/-</p>
              </div>
              <div className="d-flex py-1 mb-3 px-3 justify-content-between">
                <p className="my-0 text-custom">Payment Mode</p>{" "}
                <p className="my-0 text-custom pe-2">Online </p>
              </div>
              <div className="d-flex pt-2 px-3 mb-3 justify-content-between">
                <p className="my-0 fw-medium text-dark">Total Amount</p>{" "}
                <p className="my-0 fw-medium text-dark">{total}/-</p>
              </div>
              <div className="mt-4 mb-4">
                {" "}
                <Button
                  className=" bg-yellow fs-6 text-white px-5 py-2 fw-medium m-auto w-100 rounded-3 border-0"
                  disabled={Loading}
                  onClick={createPayment}
                >
                  Place Order
                </Button>
              </div>{" "}
            </div>
          </div>
          {show && (
            <CustomForm
              firstname={response.data.firstName}
              lastname={response.data.lastName}
              email={response.data.email}
              showModal={show}
              setShowModal={setShow}
            />
          )}
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="hh container-fluid text-center heading-background py-3">
        {/* <h1 className="text-white pt-5 fw-bold">Cart Section</h1> */}
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <img
          src={empty}
          style={{
            width: "230px",
            height: "230px",
          }}
        />
        <p className="fs-6 fw-bold mt-4">NO EVENTS YET</p>
        <div
          className="fs-7 text-custom mb-4"
          style={{
            width: "270px",
          }}
        >
          <p className="text-center my-0">Looks like your cart is empty.</p>
          <p className="text-center my-0">Why not add something exciting?</p>
        </div>
        <button
          className="fw-bold bg-whole rounded-3 border-0 py-2 px-3 text-white fw-medium"
          onClick={() => navigate("/")}
        >
          Explore Events
        </button>
      </div>
    </>
  );
}
export default Cart;
