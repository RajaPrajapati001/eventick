import "../../../index.css";
import React from "react";
import { useFormik } from "formik";
import Input from "../../../components/Input";
import { Button, Form, Spinner } from "react-bootstrap";
import { AiOutlineUser, AiOutlineLock, AiOutlineMobile } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useGetOtpMutation } from "../../../services/services";
import { useState } from "react";
import OtpModal from "../OtpPage";
import { signUpSchema } from "../../../schemas";
import { toast } from "react-toastify";

const Signup = () => {
  const [submitDisable, setSubmitDisable] = useState(false);
  const [otpData, setOtpData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [getOtp, { isLoading }] = useGetOtpMutation();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneOrEmail: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      setSubmitDisable(true);
      const response = await getOtp(values.phoneOrEmail);
      console.log(response);
      if (
        response.data.status == "false" &&
        response.data.message == "This Email is already registered"
      ) {
        setSubmitDisable(false);
        toast.error("user already exists");
      } else if (
        response.data.status == "false" &&
        response.data.message ==
          "You have exceeded the maximum OTP requests. Please try again after 24 hours."
      ) {
        setSubmitDisable(false);
        toast.error("please try again after 24 hours");
      } else {
        setOtpData({ ...values, otp: response.data.otp });
        setSubmitDisable(false);
        setShowModal(true);
      }
    },
  });

  return (
    <>
      <div className="w-50 my-form mt-5">
        <h3 className="text-center fw-bold fs-5 mb-4">Sign Up</h3>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            name="firstName"
            formik={formik}
            placeholder="Enter first name"
            icon={<AiOutlineUser />}
            type="text"
          />
          <Input
            name="lastName"
            formik={formik}
            placeholder="Enter last name"
            icon={<AiOutlineUser />}
            type="text"
          />
          <Input
            name="phoneOrEmail"
            formik={formik}
            placeholder="Enter email"
            icon={<AiOutlineMobile />}
            type="text"
          />
          <Input
            name="password"
            formik={formik}
            placeholder="Enter password"
            icon={<AiOutlineLock />}
            type="password"
          />
          <Input
            name="confirmPassword"
            formik={formik}
            type="password"
            placeholder="Confirm password"
            icon={<AiOutlineLock />}
          />
          <Button
            type="submit"
            disabled={submitDisable}
            className="text-white fw-medium bg-whole border-0 rounded-3 w-100 fs-7 py-2 mt-2"
          >
            {isLoading ? (
              <Spinner animation="border" size="sm" className="me-2" />
            ) : (
              "SignUp"
            )}
          </Button>
          <br></br>
        </Form>
        <div className="fs-7 mt-3">
          Already have any accout?{" "}
          <Link to="/Login">
            <u className="text-primary crs">Log In</u>
          </Link>
        </div>
        {showModal && (
          <OtpModal
            showModal={showModal}
            setShowModal={setShowModal}
            otpData={otpData}
          />
        )}
      </div>
    </>
  );
};

export default Signup;
