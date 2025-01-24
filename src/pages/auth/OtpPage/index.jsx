import React, { useState, useEffect, useContext } from "react";
import OtpInput from "react-otp-input";
import { Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../index.css";
import {
  useVerifyOtpMutation,
  useStoreDataMutation,
} from "../../../services/services";
import { otpSchema } from "../../../schemas";
import { useLoginOtpMutation } from "../../../services/services";
import { useGetOtpMutation } from "../../../services/services";
import { useNavigate } from "react-router-dom";
import { useLoginWithOtpMutation } from "../../../services/services";
import { jwtDecode } from "jwt-decode";

function OtpModal({ showModal, setShowModal, otpData }) {
  const [loginWithOtp] = useLoginWithOtpMutation();
  const [resendDisable, setResendDisable] = useState(false);
  const navigate = useNavigate();
  const [resend] = useGetOtpMutation();
  const [store] = useStoreDataMutation();
  const [verify, { isLoading }] = useVerifyOtpMutation();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(10);
  const [alertShown, setAlertShown] = useState(false);
  const handleClose = () => setShowModal(false);
  const [loginotp] = useLoginOtpMutation();
  const [disable, setDisable] = useState(false);
  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      try {
        if (otpData.firstName) {
          setDisable(true);
          const response = await verify({
            email: otpData.phoneOrEmail,
            otp: values.otp,
          });
          if (response.data.verify == "success") {
            try {
              const res = await store({
                firstName: otpData.firstName,
                lastName: otpData.lastName,
                email: otpData.phoneOrEmail,
                password: otpData.password,
              });
              if (res.data.status == "created") {
                toast.success("Account has been created");
                setDisable(true);
                setResendDisable(true);
                setTimeout(() => {
                  handleClose();
                  navigate("/");
                }, 3000);
              }
              console.log(res);
            } catch (error) {
              console.error("Error storing data:", error);
            }
          } else if (response.data.verify == "fails") {
            toast.error(response.data.message);
            setDisable(false);
          }
        } else if (otpData.MobileForget) {
          setDisable(true);
          const response = await verify({
            email: otpData.MobileForget,
            otp: values.otp,
          });

          if (response.data.verify == "success") {
            setDisable(true);
            navigate("/update", {
              state: { email: otpData.MobileForget },
            });
            // setTimeout(() => {
            //   handleClose()
            // }, 2000);
          } else if (response.data.verify == "fails") {
            setDisable(false);
            toast.error(response.data.message);
          }
        } else {
          setDisable(true);
          const response = await verify({
            email: otpData.email,
            otp: values.otp,
          });
          if (response.data.verify == "success") {
            const res = await loginotp(otpData.email);
            localStorage.setItem("token", res.data.token);
            toast.success("user has been logged-in");
            setDisable(true);
         
            setTimeout(() => {
              
              navigate("/")
            }, 3000);
          } else if (response.data.verify == "fails") {
            setDisable(false);
            toast.error(response.data.message);
          }
        }
      } catch (err) {
        console.log("Failed to send data:", err);
      }
    },
  });

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResend = async () => {
    if (otpData.firstName) {
      const res = await resend(otpData.phoneOrEmail);
      if (res.data.status == "true") {
        if (res.data.attempt <= 3) {
          try {
            setOtp("");
            setTimer(10);
          } catch (err) {
            console.error("Failed to resend OTP:", err);
          }
        } else {
          setResendDisable(true);
          if (!alertShown) {
            toast.warn("Maximum resend attempts reached. Try again later.");
            setAlertShown(true);
          }
        }
      } else {
        setResendDisable(true);
        toast.error("Your OTP request limit has reached");
      }
    } else if (otpData.MobileForget) {
      const res = await loginWithOtp(otpData.MobileForget);
      if (res.data.status == "true") {
        if (res.data.attempt <= 3) {
          try {
            setOtp("");
            setTimer(10);
          } catch (err) {
            console.error("Failed to resend OTP:", err);
          }
        } else {
          setResendDisable(true);
          if (!alertShown) {
            toast.warn("Maximum resend attempts reached. Try again later.");
            setAlertShown(true);
          }
        }
      } else {
        setResendDisable(true);
        toast.error("Your OTP request limit has reached");
      }
    } else {
      const res = await loginWithOtp(otpData.email);
      if (res.data.status == "true") {
        if (res.data.attempt <= 3) {
          try {
            setOtp("");
            setTimer(10);
          } catch (err) {
            console.error("Failed to resend OTP:", err);
          }
        } else {
          setResendDisable(true);
          if (!alertShown) {
            toast.warn("Maximum resend attempts reached. Try again later.");
            setAlertShown(true);
          }
        }
      } else {
        setResendDisable(true);
        toast.error("Your OTP request limit has reached");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" || /[0-9]/.test(e.key)) {
      return;
    }
    else if(e.key == "Enter"){
      e.preventDefault();
      formik.handleSubmit();
    }
     else {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-50">
        <Modal
          show={showModal}
          onHide={handleClose}
          centered
          backdrop="static"
          aria-labelledby="contained-modal-title-vcenter"
          className="w-100"
        >
          <Modal.Header className="d-flex justify-content-center">
            <Modal.Title>OTP Verification</Modal.Title>
            <Button
              variant="close"
              className="position-absolute otp-outline mt-2 me-2 top-0 end-0"
              onClick={handleClose}
            />
          </Modal.Header>

          <Modal.Body className="d-flex justify-content-center align-items-center">
            <Form onSubmit={formik.handleSubmit} onKeyDown={handleKeyDown} className="modal-form">
              <h3 className="text-center fw-bold fs-5 pt-4 mb-4">Enter OTP</h3>
              <p className="fs-6 mb-4 px-md-5 mx-md-5 mx-0 px-3 text-center">
                We have sent an OTP to your email. Please enter
                it below.
              </p>
              <Row className="justify-content-center mb-3">
                <Col
                  md={6}
                  className="d-flex justify-content-center px-3 p-2 w-75"
                >
                  <OtpInput
                    value={otp}
                    onChange={(otp) => {
                      setOtp(otp);
                      formik.setFieldValue("otp", otp);
                    }}
                    numInputs={4}
                    className="otp-outline"
                    renderInput={(props) => (
                      <input
                        {...props}
                        className="form-control text-center otp-field mx-1 otp-width otp-outline border-0 bg-light"
                       
                        style={{ color: "black" }}
                      />
                    )}
                  />
                </Col>
              </Row>
              {formik.errors.otp && formik.touched.otp && (
                <Row className="text-center text-danger mb-3 fs-7 formargin">
                  <Col>{formik.errors.otp}</Col>
                </Row>
              )}
              {timer > 0 ? (
                <Row className="text-center text-dark mb-3 py-2 fs-7">
                  <Col>Resend OTP in {timer} seconds</Col>
                </Row>
              ) : (
                <Row className="text-center mb-3 py-2 fs-7">
                  <Col className="d-flex flex-row justify-content-center gap-1">
                    Didn't receive OTP?{" "}
                    <Button
                      href="#"
                      onClick={handleResend}
                      disabled={resendDisable}
                      className="text-primary bg-white border-0 p-0 m-0 fs-7"
                    >
                      <u>Resend</u>
                    </Button>
                  </Col>
                </Row>
              )}
              <Row>
                <Col className="d-flex justify-content-center">
                  <Button
                    type="submit"
                    className="text-white fw-medium bg-whole border-0 rounded-3 fs-7 py-2 mb-4 w-50"
                    disabled={disable}
                  >
                    {isLoading ? (
                      <Spinner animation="border" size="sm" className="me-2" />
                    ) : (
                      "Verify OTP"
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default OtpModal;
