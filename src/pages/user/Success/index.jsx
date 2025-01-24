import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useOrganizerSuccessQuery, useSuccessQuery } from "../../../services/services";
import { payment } from "../../../assets/Constant";
import "./style.css";

const Success = () => {
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionId");
  if (sessionId) {
    console.log(sessionId);

    useSuccessQuery(sessionId);
  } else navigate("/upevent");

  const handleBack = () => {
    navigate("/");
  };

  if (sessionId) {
    useOrganizerSuccessQuery(sessionId);
  } else navigate("/placeorder");

  return (
    <div className="text-center d-flex h-100 flex-column justify-content-center align-items-center">
      <img
        className=""
        src={payment}
        style={{ width: "230px", height: "230px" }}
      />
      <h1 className="fs-6 fw-bold">Payment Successfully</h1>
      <p className="fs-7">Thankyou for your order</p>
      <Button
        className="fw-bold border-0 mt-3"
        variant="danger"
        style={{ background: "#f5167e" }}
        onClick={handleBack}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default Success;
