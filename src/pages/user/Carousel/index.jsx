import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Carousel from "react-bootstrap/Carousel";
import { Row, Col, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import {
  useCarouselInfoQuery,
  useAddToCartMutation,
} from "../../../services/services";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import InfoModel from "../../../components/InfoModel";
import noevent from "../../../assets/no-events.jpg";
import "./style.css";

function Index() {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [show, setShow] = useState(false);
  const [select, setSelectedItem] = useState({});

  const navigate = useNavigate();

  const { data, isLoading, isError } = useCarouselInfoQuery();
  const [addToCart] = useAddToCartMutation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
    const decodeToken = jwtDecode(token).role;
    setRole(decodeToken);}
    else{
      setRole ("USER");
        }
  }, []);

  const handleAdd = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await addToCart({
        eventUuid: id,
        userEmail: jwtDecode(token).sub,
        ticketQuantity: 1,
      });

      if (res.data.status) {
        // setLoading(true);
        role === "ADMIN"
          ? toast.info("You Are Admin")
          : res.data.message === "Added to cart successfully"
          ? toast.success(res.data.message)
          : toast.info(res.data.message);
      } else {
        // setLoading(false);
        toast.error("Failed to add to cart!");
      }
    } else {
      toast.error("please login first");
    }
  };

  return (
    <Container fluid className="w-100 bg-custom-img p-0">
      {isLoading ? (
        // Show Skeleton Loader
        <div className="bg-custom-img-2">
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
              <Spinner
                animation="border"
                role="status"
                className="text-white mb-3"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="text-white fw-bold">Loading Events...</p>
            </div>
          </div>
        </div>
      ) : isError ? (
        // Show Error Placeholder
        <div className="bg-custom-img-2">
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center text-white">
              <h3>Events Not Found</h3>
              <img src={noevent} alt="..." />
              {/* <p>There seems to be an issue fetching events. Please try again later.</p> */}
            </div>
          </div>
        </div>
      ) : (
        // Show Carousel with Fallback Data
        <Carousel className="w-100 bg-custom-img-2 carousel-h">
          {(data?.length
            ? data
            : [
                {
                  eventName: "No Events Yet",
                  eventDetails: "If you want to add events, please do it!",
                  imageUrl: "https://via.placeholder.com/300",
                },
              ]
          ).map((item, index) => (
            <Carousel.Item
              key={index}
              className="carousel-h custom-margin"
              interval={3000}
            >
              <Row className="container mx-auto vh-100 align-items-center mt-md-0">
                <Col className="col-12 col-md-6 col-lg-6">
                  <img className="carausel-img" src={item.imageUrl} alt="..." />
                </Col>
                <Col className="col-12 col-md-6 col-lg-6">
                  <div className="px-lg-5 text-white text-lg-start text-md-start text-sm-start text-center">
                    <h3 className="fw-bold">{item.eventName}</h3>
                    <p>{item.eventDetails}</p>
                    {console.log(role !== "ADMIN")}
                    {role === "USER" && (
                      <div>
                        <Button
                          className="rounded-pill px-4 py-2 fw-medium me-2"
                          style={{ backgroundColor: "#F5167E", border: "none" }}
                          variant="danger"
                          // disabled={loading}
                          onClick={() => handleAdd(item.uuid)}
                        >
                          {isLoading ? "Adding..." : "Add to Cart"}
                        </Button>
                        <Button
                          className="rounded-pill px-4 py-2 fw-medium"
                          variant="outline-light"
                          onClick={() => {
                            setSelectedItem(item);
                            setShow(true);
                          }}
                        >
                          Learn More
                        </Button>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
              <InfoModel show={show} setShow={setShow} item={select} />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </Container>
  );
}

export default Index;
