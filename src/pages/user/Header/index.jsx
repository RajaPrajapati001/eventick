import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";
import { eventlogo } from "../../../assets/Constant";
import Offcanvass from "../../../components/Offcanvas";
import CustomDropdown from "../../../components/CustomDropdown";
import { useLocation } from "react-router-dom";

function Header() {
  // const [showDropdown, setShowDropdown] = useState(false);
  const [show, setShow] = useState(false);
  const [successs, setSuccess] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState();

  useEffect(() => {
     
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);          
          const role = decodedToken.role;
          setRole(role);
        } catch (error) {
          console.log(error);
          
        }
      } else {
        navigate("/");
      }
    }, []);

  const navigate = useNavigate();
  const handelMenu = () => {
    console.log("hii");
    setShow(true);
  };

  const handelLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    // localStorage.removeItem("role")
    setSuccess(null); // Update state to trigger re-render
  };

  // const location = useLocation();
  // const isHomePage = location.pathname === "/home";


  let token = localStorage.getItem("token");
  // let role = localStorage.getItem("role");

  return (
    <div>
      <Navbar bg="transparent position-absolute z-1 w-100 mt-3"
      >
        <Container className="d-flex justify-content-between align-items-center">
          <div className="logo">
            <Navbar.Brand className="">
              <img src={eventlogo} alt="..." />
            </Navbar.Brand>
          </div>
          <div className="d-flex align-items-center">
            <div className="d-none d-lg-block">
              <NavLink
                to=""
                className={({ isActive }) =>
                  `style-hover mx-3 text-decoration-none ${
                    isActive ? "text-white" : "custom-style"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/event"
                className={({ isActive }) =>
                  `style-hover mx-3 text-decoration-none ${
                    isActive ? "text-white" : "custom-style"
                  }`
                }
              >
                Event
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `style-hover mx-3 text-decoration-none ${
                    isActive ? "text-white" : "custom-style"
                  }`
                }
              >
                About us
              </NavLink>
              {role === "ADMIN" || role === "ORGANIZER" ? (
                <NavLink
                  to={role === "ADMIN" ? "/overviewadmin" : "/eventOrganizer"}
                  className={({ isActive }) =>
                    `style-hover mx-3 text-decoration-none ${
                      isActive ? "text-white" : "custom-style"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              ) : (
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `style-hover mx-3 text-decoration-none ${
                      isActive ? "text-white" : "custom-style"
                    }`
                  }
                >
                  Cart
                </NavLink>
              )}
              {!token ? (
                <Button
                  className="ms-4"
                  variant="outline-light px-4 rounded-pill"
                  onClick={handelLogin}
                >
                  Login 
                </Button>
              ) : (
                ""
              )}
            </div>
            <div
              className="ms-2 px-3 py-2 d-block d-lg-none"
              onClick={handelMenu}
            >
              <AiOutlineMenu size={22} color="white" />
            </div>
            {token ? (
               <CustomDropdown handelLogout={handleLogout} />
              
            ) : (
              ""
            )}
          </div>
        </Container>
      </Navbar>
      <Offcanvass show={show} setShow={setShow} />
    </div>
  );
}

export default Header;
