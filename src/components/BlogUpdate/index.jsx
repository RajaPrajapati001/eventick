import React, { useState, useRef, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Row, Col, Button } from "react-bootstrap";
import {upload} from "../../assets/Constant";
import Input from "../../components/Input";
import { useFormik } from "formik";
import { useAdminBlogViewMutation } from "../../services/services";
import { AppContext } from "../../routes/AppRoutes";
import { blog } from "../../schemas";

function BlogUpdate({ show, setShow, blogId }) {
  const { setUpdate } = useContext(AppContext);
  const [image, setImage] = useState(img);
  const [file, setFile] = useState();
  const fileInputRef = useRef(null);
  const [blogUpdate] = useAdminBlogViewMutation();

  const formik = useFormik({
    initialValues: {
      id: blogId || "",
      name: "",
      date: "",
      heading: "",
      discription: "",
    },
    validationSchema: blog,
    onSubmit: async (values) => {
      // console.log("Values : ", values);
      console.log("values: ", values);

      const formData = new FormData();

      // Append form fields
      formData.append(
        "blog",
        new Blob(
          [
            JSON.stringify({
              id: blogId,
              userName: values.name,
              eventDate: values.date,
              heading: values.heading,
              details: values.discription,
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
        const res = await blogUpdate(formData).unwrap();
        console.log("Event created", res);
        setUpdate(true);
      } catch (error) {
        console.error("Error creating event", error);
      }
    },
  });

  const handleImg = () => {
    fileInputRef.current.click();
  };

  const handleFile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Update file state
      setImage(URL.createObjectURL(selectedFile)); // Preview the image
    }
  };
  return (
    <Modal show={show} onHide={setShow} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Blog Secction
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <Row>
            <Col>
              <div
                onClick={handleImg}
                className="w-100"
                style={{ height: "150px" }}
              >
                <input
                  type="file"
                  accept="image/*"
                  name="myfile"
                  ref={fileInputRef}
                  onChange={handleFile}
                  hidden
                />
                <img
                  className="h-100 w-100 object-fit-cover rounded-3"
                  src={image}
                  alt="..."
                />
              </div>
            </Col>
            <Col>
              <Input
                name="name"
                type="text"
                formik={formik}
                bg="bg-body-secondary"
                placeholder="Enter name"
                label="Name*"
              />
              <Input
                name="date"
                type="date"
                formik={formik}
                bg="bg-body-secondary"
                placeholder="input description"
                label="Date"
              />
            </Col>
            <Col className="col-12">
              <Input
                name="heading"
                type="text"
                formik={formik}
                bg="bg-body-secondary"
                placeholder="Enter Heading"
                label="Heading"
              />
            </Col>
            <Col className="col-12">
              <Form.Label className="m-0">Description</Form.Label>
              <textarea
                className="d-block w-100 rounded-3 px-3 py-1 bg-body-secondary border-0"
                name="discription"
                style={{ outline: "none" }}
                rows={2}
                onChange={(e) => {
                  formik.setFieldValue("discription", e.target.value);
                }}
                value={formik.values.discription}
              />
            </Col>
            {formik.touched.discription && formik.errors.discription ? (
              <div className="flex-column formargin text-danger text-start mt-1 fs-8">
                {formik.errors.discription}
              </div>
            ) : null}
            <Button
              className="mt-4 ms-3 text-end"
              type="submit"
              variant="primary"
              style={{ width: "100px" }}
              >
              Update
            </Button>
          </Row>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BlogUpdate;