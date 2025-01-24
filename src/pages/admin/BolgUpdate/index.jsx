import React, {useState} from "react";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Spinner from "react-bootstrap/Spinner";
// import { useBlogSectionQuery } from "../../../../services/services";
// import { img1, img2, img3, img4 } from "../../../../assets/Constant";

function Blog() {

  // const { data, isLoading } = useBlogSectionQuery();
  // console.log(data);
  // const date = new Date();
  // const day = date.getDate();
  // const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  // const month = monthNames[date.getMonth()]; // Get month name
  // const eventDate = day + month;
  // console.log(day, month);
  // const [showMore, setShowMore] = useState();
  
  //  const fallbackData = [
  //     {
  //       uudi: "1",
  //       heading: "SBS MTV The Kpop Show Ticket Package",
  //       details:
  //         "Look no further! Our SBS The Show tickets are the simplest way for you to experience a live Kpop recording.",
  //       image: img2,
  //       eventDate: eventDate,
  //       userName: "Naruto"
  //     },
  //     {
  //       uudi: "2",
  //       heading: "SBS MTV The Kpop Show Ticket Package",
  //       details:
  //         "Look no further! Our SBS The Show tickets are the simplest way for you to experience a live Kpop recording.",
  //       image: img3,
  //       eventDate: eventDate,
  //       userName: "Naruto"
  //     },
  //     {
  //       uudi: "3",
  //       heading: "SBS MTV The Kpop Show Ticket Package",
  //       details:
  //         "Look no further! Our SBS The Show tickets are the simplest way for you to experience a live Kpop recording.",
  //       image: img4,
  //       eventDate: eventDate,
  //       userName: "Naruto"
  //     },
  //   ];

    // const blogItem = data?.length ? data : fallbackData;

  return (
    // <Container>
    //   <Row>
    //     <Col className="col-12 text-center mt-5 pt-5">
    //       <h2 className="fw-bold">Blog</h2>
    //       <p>
    //         Have a look, How much dream events are succesfully completed by us
    //       </p>
    //     </Col>
    //     {isLoading?<div className="d-flex justify-content-center align-items-center">
    //       <div className="text-center">
    //         <Spinner animation="border" role="status" className="text-black mb-3">
    //           <span className="visually-hidden">Loading...</span>
    //         </Spinner>
    //         <p className="text-black fw-bold">Loading...</p>
    //       </div>
    //     </div>:data?.map((item)=>(<Col key={item.uudi} className="mt-4 col-12 col-md-6 col-lg-4">
    //       <img className="w-100" src={item?.image} alt="..." />
    //       <div>
    //         <h6 className="fw-bold mt-4">
    //           {item.heading}
    //         </h6>
    //         <p className="mt-3" style={{height: showMore === item.uudi ? '100%' : '75px', textWrap: "wrap", overflow: 'hidden'}}>
    //           {item.details}...
    //         </p>
    //         <p className="text-secondary" onClick={() => {setShowMore(showMore === item.uudi ? null : item.uudi)}} style={{cursor: "pointer"}}>Show {showMore === item.uudi ? "Less" : "More"}</p>
    //       </div>
    //       <p className="text-secondary">{item.eventDate} - {item.userName}</p>
    //     </Col>))}
    //   </Row>
    // </Container>
    <><div>Blog</div></>
  );
}

export default Blog;
