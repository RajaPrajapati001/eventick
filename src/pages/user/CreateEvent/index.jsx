// import React, { useState, useEffect, useRef } from "react";
// import Container from "react-bootstrap/Container";
// import { Row, Col, Button } from "react-bootstrap";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import Form from "react-bootstrap/Form";
// import { MdErrorOutline } from "react-icons/md";
// import Accordionn from "../../../components/Accordion";
// import Input from "../../../components/Input";
// import { useFormik } from "formik";
// import Select from "../../../components/Select";
// import { organizerSchema } from "../../../schemas";
// import upload from "../../../assets/upload.webp";
// import {
//   useCreareEventMutation,
//   useEventFilterQuery,
// } from "../../../services/services";
// import { jwtDecode } from "jwt-decode";

// function Event() {
//   const [image, setImage] = useState(upload);
//   const [modalData, setModalData] = useState({});
//   const [file, setFile] = useState(null); // File state
//   const fileInputRef = useRef(null);
//   const [email, setEmail] = useState("");

//   const [createEvent] = useCreareEventMutation();
//   const { data } = useEventFilterQuery();

//   // Load image from localStorage on component mount
//   useEffect(() => {
//     const storedImage = localStorage.getItem("uploadedImage");
//     if (storedImage) {
//       setImage(storedImage);
//     }
//     const token = localStorage.getItem("token");
//     setEmail(jwtDecode(token).sub);
//   }, []);

//   const category = ["event"];

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       textarea: "",
//       category: category[0],
//       city: "",
//       venuName: "",
//       capacity: "",
//       rentalCost: "",
//       startDate: "",
//       endDate: "",
//       startTime: "",
//       endTime: "",
//       quantity: "",
//       price: "",
//     },
//     validationSchema: organizerSchema,
//     onSubmit: async (values) => {
//       const formData = new FormData();

//       // Append form fields
//       formData.append(
//         "event",
//         new Blob(
//           [
//             JSON.stringify({
//               eventName: values.name,
//               email: email,
//               eventDetails: values.textarea,
//               category: values.category,
//               city: values.city,
//               capacity: values.capacity,
//               placePrice: values.rentalCost,
//               startDate: values.startDate,
//               endDate: values.endDate,
//               eventStartTime: values.startTime,
//               eventEndTime: values.endTime,
//               ticketPrice: values.price,
//               maxTicket: values.quantity,
//             }),
//           ],
//           { type: "application/json" }
//         )
//       );

//       // Append file
//       if (file) {
//         formData.append("file", file);
//       }

//       // Log FormData entries for debugging
//       for (const pair of formData.entries()) {
//         console.log(`${pair[0]}:`, pair[1]);
//       }

//       try {
//         const res = await createEvent(formData).unwrap();
//         console.log("Event created", res);
//       } catch (error) {
//         console.error("Error creating event", error);
//       }
//     },
//   });

//   const handleChange = () => {
//     fileInputRef.current.click();
//   };

//   const handleFile = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile); // Update file state
//       setImage(URL.createObjectURL(selectedFile)); // Preview the image
//     }
//   };

//   const handleRemoveImage = () => {
//     localStorage.removeItem("uploadedImage");
//     setImage(upload);
//     setFile(null); // Clear the file
//   };

//   return (
//     <div>
//       <div className="hh container-fluid text-center heading-background py-5"></div>
//       <Container className="mt-4">
//         <form onSubmit={formik.handleSubmit}>
//           <Row>
//             <Col md={12} lg={6}>
//               <div className="custom-hi w-100 rounded-4 object-fit-cover">
//                 <img
//                   className="h-100 w-100 rounded-4 object-fit-cover"
//                   src={image}
//                   alt="..."
//                 />
//               </div>
//               <div className="mt-4">
//                 <div className="d-flex align-items-center">
//                   <Button
//                     className="bg-transparent text-danger border-0"
//                     onClick={handleRemoveImage}
//                   >
//                     <RiDeleteBin6Line className="pb-1" size={25} /> Remove
//                   </Button>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     name="myfile"
//                     ref={fileInputRef}
//                     onChange={handleFile}
//                     hidden
//                   />
//                   <Button
//                     className="ms-4"
//                     variant="secondary"
//                     onClick={handleChange}
//                   >
//                     Change
//                   </Button>
//                 </div>
//               </div>
//             </Col>
//             <Col md={12} lg={6} className="mt-4 mt-lg-0">
//               <h3 className="fw-bold mb-3">
//                 <MdErrorOutline className="pb-2" color="blue" size={40} />{" "}
//                 General information
//               </h3>
//               <Form.Group
//                 className="mb-3"
//                 controlId="exampleForm.ControlInput1"
//               >
//                 <Input
//                   name="name"
//                   type="text"
//                   formik={formik}
//                   placeholder="input description"
//                   bg="bg-body-secondary"
//                   label="Name *"
//                 />
//               </Form.Group>
//               <Form.Group
//                 className="mb-3"
//                 controlId="exampleForm.ControlTextarea1"
//               >
//                 <Form.Label className="m-0">Description</Form.Label>
//                 <textarea
//                   className="d-block w-100 rounded-3 px-3 py-1 bg-body-secondary border-0"
//                   name="textarea"
//                   style={{ outline: "none" }}
//                   rows={2}
//                   onChange={formik.handleChange}
//                   value={formik.values.textarea}
//                 />
//               </Form.Group>
//                 {formik.touched.textarea && formik.errors.textarea ? (
//                   <div className="flex-column formargin text-danger text-start mb-2 fs-8">
//                     {formik.errors.textarea}
//                   </div>
//                 ) : null}
//               <Form.Group
//                 className="mb-3"
//                 controlId="exampleForm.ControlInput1"
//               >
//                 {data && (
//                   <Select
//                     name="category"
//                     label="Category"
//                     value={data.map((value) => value.category)}
//                     formik={formik}
//                   />
//                 )}
//               </Form.Group>
//             </Col>
//           </Row>
//           <Accordionn formik={formik} />
//           <div className="d-flex justify-content-between mt-3 pb-2">
//             <Button className="px-3 fs-5 align-item-center" variant="secondary">
//               Cancel
//             </Button>
//             <Button className="px-5 fs-5" variant="primary" type="submit">
//               Next
//             </Button>
//           </div>
//         </form>
//       </Container>
//     </div>
//   );
// }

// export default Event;
