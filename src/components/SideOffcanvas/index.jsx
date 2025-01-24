import { useState,useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useMatch } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function SideOffcanvas({ show, setShow }) {
  const [role,setRole]=useState("");
  const eventsMatch = useMatch("/eventorganizer");
  const payoutsMatch = useMatch("/payout");
  const approvalMatch = useMatch("/approval");
  const historyMatch = useMatch("/historyOrganizer");
  const addEventMatch = useMatch("/addEvent");
  const overviewAdminMatch = useMatch("/overviewadmin");
  const historyAdminMatch = useMatch("/historyadmin");
  const eventsAdminMatch = useMatch("/eventsadmin");
  const approvalAdminMatch = useMatch("/approvaladmin");
  const placesAdminMatch = useMatch("/placesadmin");
  const blogsAdminMatch = useMatch("/blog");

  useEffect(()=>{
    const token=localStorage.getItem("token");
    setRole(jwtDecode(token).role);
    },[])
  return (
    <>
      <Offcanvas
        show={show}
        onHide={() => {
          setShow(false);
        }}
        responsive="lg"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
        <div className={`flex-column gap-4 ${role == "ORGANIZER" ? "d-flex" : "d-none"}`}>
        <Link
            to="/eventorganizer"
            className={`mb-3 text-center text-dark text-decoration-none ${
              eventsMatch ? "text-dark fw-bold" : "custom-style text-dark"
            }`}
          >
            Events
          </Link>

          <Link
            to="/approval"
            className={`mb-3 text-center text-dark text-decoration-none ${
              approvalMatch ? "text-dark fw-bold" : "custom-style text-dark"
            }`}
          >
            Approval
          </Link>
          <Link
            to="/addEvent"
            className={`mb-3 text-center text-dark text-decoration-none ${
              addEventMatch ? "text-dark fw-bold" : "custom-style text-dark"
            }`}
          >
            Add Event
          </Link>
          <Link
            to="/historyOrganizer"
            className={`mb-3 text-center text-dark text-decoration-none ${
              historyMatch ? "text-dark fw-bold" : "custom-style text-dark"
            }`}
          >
            History
          </Link>
          <Link
            to="/payout"
            className={`mb-3 text-center text-dark text-decoration-none ${
              payoutsMatch ? "text-dark fw-bold" : "custom-style text-dark"
            }`}
          >
            Payouts
          </Link>
            </div>
            <div className={`flex-column gap-4 ${role == "ADMIN" ? "d-flex" : "d-none"}`}>
            <Link
            to="/overviewadmin"
            className={`mb-3 text-center text-dark text-decoration-none ${
              overviewAdminMatch ? "text-dark fw-bold" : "custom-style text-dark"
            }`}
          >
            Overview
          </Link>
          <Link
            to="/eventsadmin"
            className={`mb-3 text-center text-dark text-decoration-none ${
              eventsAdminMatch ? "text-dark fw-bold" : "custom-style text-dark"
            }`}
          >
            Events
          </Link>
          <Link
            to="/approvaladmin"
            className={`mb-3 text-center text-dark text-decoration-none ${
              approvalAdminMatch ? "text-dark fw-bold" : "custom-style text-dark"
            }`}
          >
            Approval
          </Link>
          <Link
            to="/blog"
            className={`mb-3 text-center text-dark text-decoration-none ${
              blogsAdminMatch ? "text-dark fw-bold" : "custom-style text-dark"
            }`}
          >
            Blogs
          </Link>
          <Link
            to="/historyadmin"
            className={`mb-3 text-center text-dark text-decoration-none ${
              historyAdminMatch ? "text-dark fw-bold" : "custom-style text-dark"
            }`}
          >
            History
          </Link>

          <Link
            to="/placesadmin"
            className={`mb-3 text-center text-dark text-decoration-none ${
              placesAdminMatch ? "text-dark fw-bold" : "custom-style text-dark"
            }`}
          >
            Places
          </Link>
            </div>
          <Link
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="my-3 text-center text-danger text-decoration-none"
          >
            <CiLogout /> Logout
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideOffcanvas;
