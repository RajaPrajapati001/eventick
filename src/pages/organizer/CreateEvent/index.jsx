import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import Form from "react-bootstrap/Form";
import { MdErrorOutline } from "react-icons/md";
import Accordionn from "../../../components/Accordion";
import Input from "../../../components/Input";
import { useFormik } from "formik";
import { organizerSchema } from "../../../schemas";
import {
  useCreareEventMutation,
  useEventFilterQuery,
} from "../../../services/services";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { upload } from "../../../assets/Constant";

function Event() {
  const [image, setImage] = useState(upload);
  const [modalData, setModalData] = useState({});
  const [file, setFile] = useState(null); // File state
  const fileInputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(false);

  const [createEvent, { isLoading }] = useCreareEventMutation();
  const { data } = useEventFilterQuery();

  // Load image from localStorage on component mount
  useEffect(() => {
    const storedImage = localStorage.getItem("uploadedImage");
    if (storedImage) {
      setImage(storedImage);
    }
    const token = localStorage.getItem("token");
    setEmail(jwtDecode(token).sub);
  }, []);

  // const category = ["event"];

  const formik = useFormik({
    initialValues: {
      placeUuid: "",
      name: "",
      textarea: "",
      category: "",
      city: "",
      capacity: "",
      rentalCost: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      quantity: "",
      price: "",
      image: ""
    },
    validationSchema: organizerSchema,
    onSubmit: async (values) => {
      setDisable(true);
      // console.log("Values : ", values);
      console.log("values: ", values);

      const formData = new FormData();
      const placeUuid = values.placeUuid;

      // Append form fields
      formData.append(
        "event",
        new Blob(
          [
            JSON.stringify({
              placeUuid: values.placeUuid,
              eventName: values.name,
              email: email,
              eventDetails: values.textarea,
              category: values.category,
              text: values.text,
              city: values.city,
              capacity: values.capacity,
              placePrice: values.rentalCost,
              startDate: values.startDate,
              endDate: values.endDate,
              eventStartTime: values.startTime,
              eventEndTime: values.endTime,
              ticketPrice: values.price,
              maxTicket: values.quantity,
            }),
          ],
          { type: "application/json" }
        )
      );

      // Append file
      if (file) {
        formData.append("file", file);
      }

      try {
        const res = await createEvent(formData, placeUuid).unwrap();
        if (res.statusCodeValue === 400) {
          toast.warn(res.body);
        } else if (res.statusCodeValue === 200) {
          toast.success(res.body);
        } else {
          toast.error("The place is already booked.");
        }
      } catch (error) {
        toast.error("Failed api not fetched");
        console.error("Error creating event", error);
      }

      formik.resetForm();
      setDisable(false);
    },
  });

  const handleChange = () => {
    fileInputRef.current.click();
  };

  const handleFile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Update file state
      setImage(URL.createObjectURL(selectedFile)); // Preview the image
      formik.setFieldValue("image", selectedFile);
    }
  };

  // const handleRemoveImage = () => {
  //   localStorage.removeItem("uploadedImage");
  //   setImage(upload);
  //   setFile(null); // Clear the file
  // };

  return (
    <div className="m-auto" style={{ width: "92%" }}>
      <div className="scroll forheight flex-grow-1 ">
        <Container>
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={12} lg={6}>
                <div
                  className="custom-hi w-100 rounded-4 object-fit-cover"
                  onClick={handleChange}
                >
                  <img
                    className="h-100 w-100 rounded-4 object-fit-conatin"
                    src={image}
                    alt="..."
                  />
                </div>
                <div className="mt-4">
                  {formik.touched.image && formik.errors.image ? (
                    <div className="flex-column formargin text-danger text-start mb-2 fs-8">
                      {formik.errors.image}
                    </div>
                  ) : null}
                  <div className="d-flex align-items-center">
                    {/* <Button
                      className="bg-transparent text-danger border-0"
                      onClick={handleRemoveImage}
                    >
                      <RiDeleteBin6Line className="pb-1" size={25} /> Remove
                    </Button> */}
                    <input
                      type="file"
                      accept="image/*"
                      name="myfile"
                      ref={fileInputRef}
                      onChange={handleFile}
                      hidden
                    />
                    {/* <Button
                      className="ms-4"
                      variant="secondary"
                      onClick={handleChange}
                    >
                      Change
                    </Button> */}
                  </div>
                </div>
              </Col>
              <Col md={12} lg={6} className="mt-4 mt-lg-0">
                <h3 className="fw-bold mb-3">
                  <MdErrorOutline className="pb-2" color="blue" size={40} />{" "}
                  General information
                </h3>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    formik={formik}
                    placeholder="input description"
                    bg="bg-body-secondary"
                    label="Name *"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label className="m-0">Description</Form.Label>
                  <textarea
                    className="d-block w-100 rounded-3 px-3 py-1 bg-body-secondary border-0"
                    name="textarea"
                    style={{ outline: "none" }}
                    rows={2}
                    onChange={(e) => {
                      formik.setFieldValue("textarea", e.target.value);
                    }}
                    value={formik.values.textarea}
                  />
                </Form.Group>
                {formik.touched.textarea && formik.errors.textarea ? (
                  <div className="flex-column formargin text-danger text-start mb-2 fs-8">
                    {formik.errors.textarea}
                  </div>
                ) : null}
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Input
                    id="category"
                    name="category"
                    type="text"
                    formik={formik}
                    placeholder="category"
                    bg="bg-body-secondary"
                    label="Catagory"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Accordionn formik={formik} />
            <div className="d-flex justify-content-between mt-3 pb-2">
              <Button
                className="px-3 fs-5 align-item-center"
                variant="secondary"
                onClick={() => {
                  formik.resetForm();
                  console.log(formik.values);
                }}
              >
                Cancel
              </Button>
              <Button
                className="px-5 fs-5"
                variant="primary"
                type="submit"
                disabled={disable}
              >
                {isLoading ? (
                  <Spinner animation="border" role="status"  style={{ width: '1.2rem', height: '1.2rem' }}>
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Next"
                )}
              </Button>
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
}

export default Event;