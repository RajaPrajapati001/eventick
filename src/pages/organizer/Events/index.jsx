import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useGetApprovalDashboardQuery } from "../../../services/services";
import { jwtDecode } from "jwt-decode"; // Ensure proper import
import Spinner from "react-bootstrap/Spinner";
import { Row, Col } from "react-bootstrap";
import DashboardItems from "../../../components/DashboardItems";
import { toast } from "react-toastify";
import { AppContext } from "../../../routes/AppRoutes";

function Events() {
  const { update, setUpdate } = useContext(AppContext);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const {
    data: cartData,
    isLoading,
    refetch,
  } = useGetApprovalDashboardQuery({email,status:"accepted"}, {
    skip: !(email && role === "ORGANIZER"),
  });

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setEmail(decodedToken.sub || "");
        setRole(decodedToken.role || "");
      } catch (error) {
        console.error("Token decoding failed:", error);
        toast.error("Invalid token. Please login again.");
        navigate("/login");
      }
    } else {
      toast.warn("Please login first");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (update) {
      refetch();
      setUpdate(false);
    }
  }, [update, refetch, setUpdate]);

  useEffect(() => {
    if (role === "USER") {
      toast.warn("User can't access this page.");
      navigate("/login");
    }
  }, [role, navigate]);

  return (
    <div className="m-auto" style={{ width: "92%" }}>
      <div className="scroll forheight flex-grow-1">
        {isLoading ? (
          <div className="w-100 d-flex justify-content-center align-items-center h-75">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : cartData?.data?.length > 0 ? (
          <Row className="g-2">
            {cartData.data.map((event) => (
              <Col
                sm={6}
                lg={4}
                xs={12}
                xl={3}
                key={event.eventUuid}
                className="m-auto m-sm-0 px-1 py-2"
              >
                <DashboardItems
                  items={event}
                  setPayBtn={false}
                  setCancelBtn={false}
                  setRejectedPending={false}
                  setEdit={true}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="d-flex flex-column col-12 justify-content-center align-items-center">
            <h1 className="text-color">No history events available.</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
