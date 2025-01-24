import React, { useState } from "react";
import { useFormik } from "formik";
import Input from "../../../components/Input";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../../index.css";
import { forgetPasswordSchema } from "../../../schemas";
import { toast } from "react-toastify";
import { useLoginWithOtpMutation } from "../../../services/services";
import OtpModal from "../OtpPage";

const ForgetPass = () => {
  const [showModal, setShowModal] = useState(false);
  const [otpData, setOtpData] = useState();
  const [validateUser, { isLoading }] = useLoginWithOtpMutation();

  const formik = useFormik({
    initialValues: {
      MobileForget: "",
    },
    validationSchema: forgetPasswordSchema,

    onSubmit: async (values) => {
      try {
        const response = await validateUser(values.MobileForget);
        if (response.data.status == "true") {
          setOtpData(values);
          setShowModal(true);
        } else if (
          response.data.status == "false" &&
          response.data.message == "This Email is not registered"
        ) {
          toast.error("email and phone does not exist");
        } else {
          toast.error("limit reached");
        }
      } catch (err) {
        toast.error("Error validating user.");
        console.error("Error:", err);
      }
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit} className="w-50 my-form mt-5">
        <h3 className="text-center fw-bold fs-5 mb-4">FORGET PASSWORD</h3>
        <p className="fs-7 mb-4">
          To reset your password, enter your registered email address.
        </p>
        <Input
          name="MobileForget"
          type="text"
          formik={formik}
          placeholder="Enter email"
          icon={<AiOutlineUser />}
        />
        <Button
          type="submit"
          className="text-white fw-medium bg-whole border-0 rounded-3 w-100 fs-7 py-2 mt-3 mb-3"
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" className="me-2" />
          ) : (
            "Get OTP"
          )}
        </Button>
        <Link to="/Login">
          <Button
            type="button"
            className="bg-white fw-medium rounded-3 w-100 fs-7 py-2 border-whole"
          >
            Back to Login
          </Button>
        </Link>
      </Form>

      {showModal && (
        <OtpModal
          showModal={showModal}
          setShowModal={setShowModal}
          otpData={otpData}
        />
      )}
    </>
  );
};

export default ForgetPass;
