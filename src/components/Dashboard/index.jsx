import React, { useState,useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Row, Col, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import { MdOutlineAddTask } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";
import { CiBank } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import "../../index.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { BsList } from "react-icons/bs";
import SideOffcanvas from "../SideOffcanvas";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location=useLocation();
  const lastPathSegment = location.pathname.split("/").filter(Boolean).pop();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");
  const [role,setRole]=useState("");

    useEffect(() => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setRole(decodedToken.role);
        } catch (error) {
          console.error("Token decoding failed:", error);
        }
      } else {
        toast.warn("Please login first");
        navigate("/login");
      }
    }, []);

  return (
    <>
      <div>
        <Row className="g-0">
          <Col
            lg={2}
            className="d-none d-lg-flex ps-2 bg-white vh-100 d-flex flex-column gap-4"
          >
            <h4 className="mt-5 fw-bold d-flex flex-row gap-1">
              <div className="d-flex align-items-center">
                <MdOutlineDashboard />
              </div>{" "}
              Dashboard
            </h4>
            <div className={`flex-column gap-4 ${role == "ORGANIZER" ? "d-flex" : "d-none"}`}>
              <NavLink
              to="/eventOrganizer"
              className={({ isActive }) =>
                `style-hover fw-medium rounded-3 fs-6 me-sm-3 p-2 links fw-medium d-flex justify-content-between text-decoration-none ${
                  isActive
                    ? "text-white bg-whole fw-bold"
                    : "custom-style text-dark bg-grey"
                }`
              }
            >
              <div className="d-flex flex-row gap-2 align-items-center">
                <div className="d-flex align-items-center">
                  <MdOutlineEmojiEvents />
                </div>
                Events
              </div>{" "}
              <div></div>
            </NavLink>
            <NavLink
              to="/approval"
              className={({ isActive }) =>
                `style-hover fw-medium rounded-3 fs-6 me-sm-3 p-2 links fw-medium d-flex justify-content-between text-decoration-none ${
                  isActive
                    ? "text-white bg-whole fw-bold"
                    : "custom-style text-dark bg-grey"
                }`
              }

            >
              <div className="d-flex flex-row gap-2 align-items-center">
                <div className="d-flex align-items-center">
                  <VscUnverified />
                </div>
                Approval
              </div>{" "}
              <div></div>
            </NavLink>
            <NavLink
              to="/addEvent"
              className={({ isActive }) =>
                `style-hover fw-medium rounded-3 fs-6 me-sm-3 p-2 links fw-medium d-flex justify-content-between text-decoration-none ${
                  isActive
                    ? "text-white bg-whole fw-bold"
                    : "custom-style text-dark bg-grey"
                }`
              }

            >
              <div className="d-flex flex-row gap-2 align-items-center">
                <div className="d-flex align-items-center">
                  <MdOutlineAddTask />
                </div>
                Add Event
              </div>{" "}
              <div></div>
            </NavLink>
            <NavLink
              to="/historyOrganizer"
              className={({ isActive }) =>
                `style-hover fw-medium rounded-3 fs-6 me-sm-3 p-2 links fw-medium d-flex justify-content-between text-decoration-none ${
                  isActive
                    ? "text-white bg-whole fw-bold"
                    : "custom-style text-dark bg-grey"
                }`
              }
              
            >
              <div className="d-flex flex-row gap-2 align-items-center">
                <div className="d-flex align-items-center">
                  <LuHistory />
                </div>
                History
              </div>{" "}
              <div></div>
            </NavLink>
            <NavLink
              to="/payout"
              className={({ isActive }) =>
                `style-hover fw-medium rounded-3 fs-6 me-sm-3 p-2 links fw-medium d-flex justify-content-between text-decoration-none ${
                  isActive
                    ? "text-white bg-whole fw-bold"
                    : "custom-style text-dark bg-grey"
                }`
              }

            >
              <div className="d-flex flex-row gap-2 align-items-center">
                <div className="d-flex align-items-center">
                  <MdOutlinePayments />
                </div>
                Payout
              </div>{" "}
              <div></div>
            </NavLink>
            </div>
            <div className={`flex-column gap-4 ${role == "ADMIN" ? "d-flex" : "d-none"}`}>
            <NavLink
              to="/overviewadmin"
              className={({ isActive }) =>
                `style-hover fw-medium rounded-3 fs-6 me-sm-3 p-2 links fw-medium d-flex justify-content-between text-decoration-none ${
                  isActive
                    ? "text-white bg-whole fw-bold"
                    : "custom-style text-dark bg-grey"
                }`
              }
       
            >
              <div className="d-flex flex-row gap-2 align-items-center">
                <div className="d-flex align-items-center">
                  <MdOutlinePayments />
                </div>
                Overview
              </div>{" "}
              <div></div>
            </NavLink>
              <NavLink
              to="/eventsadmin"
              className={({ isActive }) =>
                `style-hover fw-medium rounded-3 fs-6 me-sm-3 p-2 links fw-medium d-flex justify-content-between text-decoration-none ${
                  isActive
                    ? "text-white bg-whole fw-bold"
                    : "custom-style text-dark bg-grey"
                }`
              }

            >
              <div className="d-flex flex-row gap-2 align-items-center">
                <div className="d-flex align-items-center">
                  <MdOutlineEmojiEvents />
                </div>
                Events
              </div>{" "}
              <div></div>
            </NavLink>
            <NavLink
              to="/approvaladmin"
              className={({ isActive }) =>
                `style-hover fw-medium rounded-3 fs-6 me-sm-3 p-2 links fw-medium d-flex justify-content-between text-decoration-none ${
                  isActive
                    ? "text-white bg-whole fw-bold"
                    : "custom-style text-dark bg-grey"
                }`
              }

            >
              <div className="d-flex flex-row gap-2 align-items-center">
                <div className="d-flex align-items-center">
                  <VscUnverified />
                </div>
                Approval
              </div>{" "}
              <div></div>
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `style-hover fw-medium rounded-3 fs-6 me-sm-3 p-2 links fw-medium d-flex justify-content-between text-decoration-none ${
                  isActive
                    ? "text-white bg-whole fw-bold"
                    : "custom-style text-dark bg-grey"
                }`
              }

            >
              <div className="d-flex flex-row gap-2 align-items-center">
                <div className="d-flex align-items-center">
                  <MdOutlineAddTask />
                </div>
                Blogs
              </div>{" "}
              <div></div>
            </NavLink>
            <NavLink
              to="/historyAdmin"
              className={({ isActive }) =>
                `style-hover fw-medium rounded-3 fs-6 me-sm-3 p-2 links fw-medium d-flex justify-content-between text-decoration-none ${
                  isActive
                    ? "text-white bg-whole fw-bold"
                    : "custom-style text-dark bg-grey"
                }`
              }

            >
              <div className="d-flex flex-row gap-2 align-items-center">
                <div className="d-flex align-items-center">
                  <LuHistory />
                </div>
                History
              </div>{" "}
              <div></div>
            </NavLink>
           
            <NavLink
              to="/placesadmin"
              className={({ isActive }) =>
                `style-hover fw-medium rounded-3 fs-6 me-sm-3 p-2 links fw-medium d-flex justify-content-between text-decoration-none ${
                  isActive
                    ? "text-white bg-whole fw-bold"
                    : "custom-style text-dark bg-grey"
                }`
              }
            >
              <div className="d-flex flex-row gap-2 align-items-center">
                <div className="d-flex align-items-center">
                  <CiBank />
                </div>
                Places
              </div>{" "}
              <div></div>
            </NavLink>
            </div>
          </Col>
          <Col xs={12} lg={10}>
            <div className="d-flex justify-content-center postion-sticky top-0">
              <div
                className="d-flex justify-content-between mt-3 my-bg px-sm-4 px-0 "
                style={{ width: "92%" }}
              >
                <Breadcrumb>
                  <div> </div>
                  <Breadcrumb.Item>
                    <Link to="/">Home</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>{lastPathSegment}</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                  {" "}
                  <button
                    className="d-lg-none fs-5 fw-medium d-block text-dark fw-medium bg-transparent border-0 rounded d-flex flex-row gap-1"
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    <BsList />
                  </button>
                </div>
                <button
                  className="d-lg-flex d-none text-danger fw-medium bg-transparent border-0 rounded d-flex flex-row gap-1"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                >
                  <div>
                    <CiLogout />
                  </div>
                  Logout
                </button>
              </div>
            </div>
            <Outlet />
          </Col>
        </Row>
        {show && <SideOffcanvas show={show} setShow={setShow} />}
      </div>
    </>
  );
};

export default Dashboard;
