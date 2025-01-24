import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../routes/AppRoutes";
import { Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGetApprovalDashboardQuery } from "../../../services/services";
import DashboardItems from "../../../components/DashboardItems";
import {jwtDecode} from "jwt-decode";
import { toast } from "react-toastify";

const Approval = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Approved");
  const [eventData, setEventData] = useState([]);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  
  const { update, setUpdate } = useContext(AppContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setEmail(decodedToken.sub);
        setRole(decodedToken.role);
      } catch (error) {
        console.error("Token decoding failed:", error);
      }
    } else {
      toast.warn("Please login first");
      navigate("/login");
    }
  }, [token, navigate]);

  const { data: cartData, refetch, isLoading, error } = useGetApprovalDashboardQuery(
    { email, status },
    { skip: !email }
  );

  useEffect(() => {
    if (isLoading) {
      setLoading(true); 
    } else if (cartData) {
      setEventData(cartData.data || []); // Update event data after fetching
      setLoading(false); // Disable loading
    } else if (error) {
      console.error("Error fetching data:", error);
      setEventData([]);
      setLoading(false); // Disable loading even in case of error
    }
  }, [cartData, isLoading, error]);

  useEffect(() => {
    if (update) {
      refetch();
      setUpdate(false);
    }
  }, [update, refetch, setUpdate]);

  useEffect(() => {
    if (role === "USER") {
      toast.warn("User can't access this page");
      navigate("/login");
    }
  }, [role, navigate]);

  const handleTabClick = (tabName) => {
    setLoading(true);
    setStatus(tabName);
    refetch(); 
  };

  console.log("edddddddddddd-",eventData);
  

  return (
    <div className="d-flex justify-content-center">
      <div style={{ width: "92%" }} className="forheight scroll">
        <div className="tabs fs-7 d-flex justify-content-center mb-3 position-sticky top-0 my-bg z-1">
          <div
            className={`tab-btn bg-transparent border-0 rounded-0 px-2 px-md-3 py-2 mx-md-2 mx-0 text-center crs ${
              status === "Approved" ? "active" : ""
            }`}
            onClick={() => handleTabClick("Approved")}
          >
            Approved
          </div>
          <div
            className={`tab-btn bg-transparent border-0 text-center rounded-0 px-2 px-md-3 py-2 mx-md-2 mx-0 fw-medium crs ${
              status === "Pending" ? "active" : ""
            }`}
            onClick={() => handleTabClick("Pending")}
          >
            Pending
          </div>
          <div
            className={`tab-btn bg-transparent border-0 text-center rounded-0 px-2 px-md-3 py-2 mx-md-2 mx-0 fw-medium crs ${
              status === "Rejected" ? "active" : ""
            }`}
            onClick={() => handleTabClick("Rejected")}
          >
            Rejected
          </div>
        </div>
        <Row className="justify-content-start px-md-5 px-3 px-lg-3 px-xl-1 mx-xl-4">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{height:"350px"}}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : eventData.length === 0 ? (
            <div className="text-center py-5">
              <h3>No events found</h3>
            </div>
          ) : (
            <Row className="g-2">
              {eventData.map((event) => (
                <Col
                  sm={6}
                  lg={4}
                  xs={12}
                  xl={3}
                  className="m-auto m-sm-0 px-1 py-2"
                  key={event.eventUuid}
                >
                  {status === "Approved" ? (
                    <DashboardItems
                      items={event}
                      setPayBtn={true}
                      setCancelBtn={true}
                      setRejected={false}
                      setPending={false}
                      setEdit={false}
                    />
                  ) : (
                    <DashboardItems
                      items={event}
                      setPayBtn={false}
                      setCancelBtn={false}
                      setRejectedPending={status}
                      setEdit={false}
                    />
                  )}
                </Col>
              ))}
            </Row>
          )}
        </Row>
      </div>
    </div>
  );
};

export default Approval;