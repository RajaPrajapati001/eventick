import React, { useState, useEffect } from "react";
import { useOrganizerHistoryQuery } from "../../../services/services";
import DashboardItems from "../../../components/DashboardItems";
import { jwtDecode } from "jwt-decode";
import { Row, Spinner, Col } from "react-bootstrap";

function History() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("organizer-history");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token).sub;
    setEmail(decodedToken);
  }, []);

  const { data, isLoading } = useOrganizerHistoryQuery({ email, status });

  function handleTabClick(tab) {
    setStatus(tab);
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <div style={{ width: "92%" }} className="forheight scroll">
          <div className="tabs fs-7 d-flex justify-content-center mb-3 position-sticky top-0 my-bg z-1">
            <div
              className={`tab-btn bg-transparent border-0 rounded-0 px-2 px-md-3 py-2 mx-md-2 mx-0 text-center crs ${
                status === "organizer-history" ? "active" : ""
              }`}
              onClick={() => handleTabClick("organizer-history")}
            >
              Completed
            </div>
            <div
              className={`tab-btn bg-transparent border-0 text-center rounded-0 px-2 px-md-3 py-2 mx-md-2 mx-0 fw-medium crs ${
                status === "organizer-cancelled" ? "active" : ""
              }`}
              onClick={() => handleTabClick("organizer-cancelled")}
            >
              Cancelled
            </div>
          </div>
          <Row className="justify-content-start px-md-5 px-3 px-lg-3 px-xl-1 mx-xl-4">
            {isLoading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "350px" }}
              >
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : data?.length === 0 ? (
              <div className="text-center py-5">
                <h3>No events found</h3>
              </div>
            ) : (
              <Row className="g-2">
                {data?.map((event) => (
                  <Col
                    sm={6}
                    lg={4}
                    xs={12}
                    xl={3}
                    className="m-auto m-sm-0 px-1 py-2"
                    key={event.eventUuid}
                  >
                    {status === "organizer-cancelled" ? (
                      <DashboardItems
                        items={event}
                        setOrganizerBtn={true}
                        setEventsBtn={false}
                      />
                    ) : (
                      <DashboardItems
                        items={event}
                        setOrganizerBtn={false}
                        setEventsBtn={true}
                      />
                    )}
                  </Col>
                ))}
              </Row>
            )}
          </Row>
        </div>
      </div>
    </>
  );
}

export default History;
