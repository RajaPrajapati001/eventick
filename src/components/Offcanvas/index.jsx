import React, { useEffect,useState} from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { eventlogo } from "../../assets/Constant";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

function Offcanvass({ show, setShow }) {
  const [role,setRole]=useState("");
  let token = localStorage.getItem("token");
  useEffect(() => {
    if(token){
      const decodedToken = jwtDecode(token);
      const decodedRole = decodedToken.role;
      setRole(decodedRole)
    }
  },[])
   
  const handelClose = () => setShow(false)

  return (
    <>
      <Offcanvas show={show} onHide={setShow}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="bg-black rounded-2 mt-4">
            <img className="px-2 py-2" src={eventlogo} alt="..." />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="text-center">
          <NavLink
            to=""
            className="my-3 opacity-100 text-dark d-block text-decoration-none my-4"
            onClick={handelClose}
          >
            Home
          </NavLink>
          <NavLink
            to="/event"
            className="my-3 opacity-100 text-dark d-block text-decoration-none  my-4"
            onClick={handelClose}
          >
            Event
          </NavLink>
          <NavLink
            to="/about"
            className="my-3 opacity-100 text-dark d-block text-decoration-none  my-4"
            onClick={handelClose}
          >
            About us
          </NavLink>
         {role=="USER"?(<NavLink
            to="/cart"
            className="my-3 opacity-100 text-dark d-block text-decoration-none  my-4"
            onClick={handelClose}
          >
            Cart
          </NavLink>):(<NavLink
            to={role=="ADMIN"?"/overviewadmin":"/eventOrganizer"}
            className="my-3 opacity-100 text-dark d-block text-decoration-none  my-4"
            onClick={handelClose}
          >
            Dashboard
          </NavLink>)} 
          {!token &&
            <NavLink
              to="/login"
              className="my-3 opacity-100 text-dark d-block text-decoration-none  my-4"
              onClick={handelClose}
            >
              Login
            </NavLink>
          }
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Offcanvass;
