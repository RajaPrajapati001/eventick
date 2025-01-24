import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import {
  AiOutlineUser,
  AiOutlineIdcard,
  AiOutlineShop,
} from "react-icons/ai";
import { useFormik } from "formik";
import Input from "../../../components/Input";
import { FormSchema } from "../../../schemas";
import { useBecomeOrganizerMutation } from "../../../services/services";
import { becomePartner } from "../../../assets/Constant";

function CustomForm({ firstname, lastname, email, showModal, setShowModal }) {
  const [api] = useBecomeOrganizerMutation();
  const formik = useFormik({
    initialValues: {
      FirstName: firstname,
      LastName: lastname,
      Email: email,
      Organization: "",
      Description: "",
    },
    validationSchema: FormSchema,
    onSubmit: async (values) => {
      const response = await api({
        firstname: values.FirstName,
        lastname: values.LastName,
        email: values.Email,
        organizationName: values.Organization,
        details: values.Description,
      });
    
     if(response.data.code==201){
      toast.success(response.data.message);
      setShowModal(false)
     }
    },
  });

  return (
    <>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName="custom-modal"
        centered
      >
        <Modal.Body className="p-0 position-relative">
          <Button
            variant="light"
            className="close-btn position-absolute bg-transparent border-0 end-0"
            onClick={() => setShowModal(false)}
          >
            ✖
          </Button>
          <Row>
            <Col xs={12} sm={5}>
              <div className="w-100 bg-white h-100 p-4 pe-3 pe-sm-0">
                <div className="d-flex justify-content-center w-100 pt-2">
                  <img
                    src={becomePartner}
                    className="for-img"
                  ></img>
                </div>

                <h4 className="ps-1 ps-sm-2 pe-2 pe-sm-0 fw-bold mt-5">
                  Become Organizer
                </h4>
                <p
                  className="text-custom fs-7 ps-1 ps-sm-2 pe-2 pe-sm-0 fw-medium mt-3"
                  style={{ lineHeight: "1.6" }}
                >
                  Dear user, once you become an organizer, You cannot book
                  events or access the cart as an organizer. You can only
                  organize events and view your profile history.
                </p>
              </div>
            </Col>
            <Col xs={12} sm={7}>
              <div className="bg-custom py-3 px-3 px-lg-4 w-100 h-100">
                <Form onSubmit={formik.handleSubmit}>
                  <label
                    htmlFor="FirstName"
                    className="my-0 fs-7 fw-medium form-label"
                  >
                    FirstName
                  </label>
                  <Input
                    name="FirstName"
                    id="FirstName"
                    type="text"
                    formik={formik}
                    placeholder=""
                    icon={<AiOutlineUser />}
                    disabled
                    className="bg-white"
                  />
                  <label
                    htmlFor="LastName"
                    className="my-0 fs-7 fw-medium form-label"
                  >
                    LastName
                  </label>
                  <Input
                    id="LastName"
                    name="LastName"
                    type="text"
                    formik={formik}
                    placeholder=""
                    icon={<AiOutlineUser />}
                    disabled
                  />
                  <label
                    htmlFor="Email"
                    className="my-0 fs-7 fw-medium form-label"
                  >
                    Email
                  </label>
                  <Input
                    id="Email"
                    name="Email"
                    type="text"
                    formik={formik}
                    placeholder=""
                    icon={<AiOutlineIdcard />}
                    disabled
                  />
                  <label
                    htmlFor="Organization"
                    className="my-0 fs-7 fw-medium form-label"
                  >
                    Organization Name
                  </label>
                  <Input
                    id="Organization"
                    name="Organization"
                    type="text"
                    formik={formik}
                    placeholder="Enter Your Organization Name"
                    icon={<AiOutlineShop />}
                  />

                  <Row>
                    <Col xs={12}>
                      <label
                        htmlFor="Description"
                        className="mb-0 fs-7 fw-medium form-label"
                      >
                        Description
                      </label>
                      <textarea
                        name="Description"
                        id="Description"
                        rows="3"
                        value={formik.values.Description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Type your message here..."
                        className="w-100 rounded-3 bg-grey ps-2 fs-7"
                        style={{
                          resize: "none",
                          outline: "none",
                        }}
                      ></textarea>
                      {formik.touched.Description &&
                      formik.errors.Description ? (
                        <div className="text-danger fs-8 ps-2 for-mg">
                          {formik.errors.Description}
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                  <div className="w-100 text-end mt-2">
                    <Button
                      className="bg-whole border-0 fs-7 text-white fw-medium"
                      type="submit"
                    >
                      Submit Now
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CustomForm;