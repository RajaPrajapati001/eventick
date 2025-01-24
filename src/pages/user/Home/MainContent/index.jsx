import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CustomForm from "../../BecomeOrganizer";
import { useCheckStatusMutation } from "../../../../services/services";
import { img1 } from "../../../../assets/Constant";

function MainContent() {
  const navigate = useNavigate();
  const [api, { isLoading }] = useCheckStatusMutation();
  const [response, setResponse] = useState(null);
  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(false);
  const [role, setRole] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodeToken = jwtDecode(token);

      const role = decodeToken.role;
      setRole(role);
    }
  }, []);
  function handlesetTimeOut() {
    setTimeout(() => {
      setDisable(false);
    }, 3500);
  }
  async function become() {
    setDisable(true);
    const token = localStorage.getItem("token");

    if (token && role == "USER") {
      const res = await api({ email: jwtDecode(token).sub });
      setResponse(res);
      if (res.data.code == 200) {
        if (res.data.status == "reject" && res.data.attempts < 3) {
          toast.error("previous request rejected");
          setTimeout(() => {
            setShow(true);
            setDisable(false);
          }, 1000);
        } else if (res.data.status == "PENDING" && res.data.attempts <= 3) {
          toast.error("request is pending");
          handlesetTimeOut();
        } else if (res.data.status == "reject" && res.data.attempts == 3) {
          toast.error("try again after 24 hour");
          handlesetTimeOut();
        } else {
          toast.error("something went wrong");
          handlesetTimeOut();
        }
      } else {
        setTimeout(() => {
          setShow(true);
          setDisable(false);
        }, 1000);
      }
    } else if (role === "ORGANIZER") {
      navigate("/addEvent");
    } else {
      toast.error("please login first");
      handlesetTimeOut();
    }
  }

  return (
    <>
     {role !== "ADMIN" ? <div className="h-100 bg-body-secondary">
        <div className="h-100 bg-custom d-lg-flex justify-content-evenly d-md-block justify-md-content-evenly mt-5 text-ctr">
          <div className="">
            <img className="h-100 custom-wid" src={img1} alt="..." />
          </div>
          <div className="d-flex justify-content-center align-items-center mt-lg-0 mt-5">
            <div>
              <h2 className="fw-bold">Make your own Event</h2>
              <div className="">
                {role === "ORGANIZER" ? (
                  <p className="custom-width">You can create event</p>
                ) : (
                  <p className="custom-width">
                    if you want to create any event you have to be a organizer
                    first.
                  </p>
                )}
              </div>
              <Button
                className="rounded-5 fw-medium border-0 px-5 py-2 mb-lg-0 mb-5"
                style={{ backgroundColor: "#F5167E" }}
                variant="danger"
                disabled={disable}
                onClick={become}
              >
                {role === "ORGANIZER"
                  ? "Create Event"
                  : "Become an organizer"}
              </Button>
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
        </div>
      </div> : ""}
    </>
  );
}

export default MainContent;
