import React, {useState,useContext, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { useBlogSectionQuery } from "../../../services/services";
import BlogUpdate from "../../../components/BlogUpdate";
import { AppContext } from "../../../routes/AppRoutes";
function Blog() {
  const { update, setUpdate } = useContext(AppContext);
  const { data, isLoading, refetch } = useBlogSectionQuery();
  const date = new Date();
  const day = date.getDate();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()]; // Get month name
  const eventDate = day + month;

  const [showMore, setShowMore] = useState();
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    refetch();
    setUpdate(false);
  }, [update]);

  return (
    <Container>
      <Row>
        <Col className="col-12 text-center">
          <h2 className="fw-bold">Blog</h2>
          <p className="my-1">
            Have a look, How much dream events are succesfully completed by us
          </p>
        </Col>

        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="text-center">
              <Spinner animation="border" role="status" className="text-black mb-3">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="text-black fw-bold">Loading...</p>
            </div>
          </div>
        ) : (
          <Row className="vh-75 scroll"> {/* Add vh-75-scroll class here */}
            {data?.map((item) => (
              <Col key={item.uudi} className="mt-4 col-12 col-md-6 col-lg-4 shadow-sm p-4 rounded-4 shadow">
                <div style={{ height: "230px" }}>
                  <img className="h-100 w-100 rounded-4" src={item?.image} alt="..." />
                </div>
                <div>
                  <h6 className="fw-bold mt-3">{item.heading}</h6>
                  <p
                    className="mt-3"
                    style={{
                      height: showMore === item.uudi ? "100%" : "75px",
                      textWrap: "wrap",
                      overflow: "hidden",
                    }}
                  >
                    {item.details}...
                  </p>
                  <p
                    className="text-secondary"
                    onClick={() => {
                      setShowMore(showMore === item.uudi ? null : item.uudi);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Show {showMore === item.uudi ? "Less" : "More"}
                  </p>
                </div>
                <p className="text-secondary">
                  {item.eventDate} - {item.userName}
                </p>
                <Button
                  className="mb-5"
                  onClick={() => {
                    setShow(true);
                    setId(item?.uudi);
                  }}
                  variant="primary"
                >
                  Change
                </Button>
              </Col>
            ))}
          </Row>
        )}
      </Row>
      <BlogUpdate show={show} setShow={setShow} blogId={id} />
    </Container>
  );
}

export default Blog;
