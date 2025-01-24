import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import Input from "../../../components/Input";
import "../../../index.css";
import { AiOutlineLock } from "react-icons/ai";
import { Button, Form, Spinner } from "react-bootstrap";
import { updatePasswordSchema } from "../../../schemas";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateDataMutation } from "../../../services/services";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Ensure location is defined here
  const { email } = location.state || {};

  useEffect(() => {
    if (!email) {
      navigate("/ForgetPassword");
    }
  }, [navigate, email]);

  const [disable, setDisable] = useState(false);
  const [update, { isLoading }] = useUpdateDataMutation();

  const formik = useFormik({
    initialValues: {
      NewPassword: "",
      ConfirmPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: async (values) => {
      setDisable(true);
      try {
        const response = await update({
          email: email,
          password: values.NewPassword,
        });
        if (response.data.status === "success") {
          toast.success("Password Updated Successfully");
          setTimeout(() => {
            navigate("/");
          }, 3500);
        } else {
          setDisable(false);
          toast.error("Not Updated");
        }
      } catch (err) {
        setDisable(false);
        toast.error("Error updating password");
        console.error("Failed to update password:", err);
      }
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit} className="w-50 my-form mt-5">
        <h3 className="text-center fw-bold fs-5 mb-4">Update Your Password</h3>
        <p className="fs-7 mb-4">Enter your new password below</p>
        <Input
          name="NewPassword"
          type="password"
          formik={formik}
          placeholder="Password"
          icon={<AiOutlineLock />}
        />
        <Input
          name="ConfirmPassword"
          type="password"
          formik={formik}
          placeholder="Confirm Password"
          icon={<AiOutlineLock />}
        />
        <Button
          type="submit"
          className="text-white fw-medium bg-whole border-0 rounded-3 w-100 fs-7 py-2 mt-3"
          disabled={disable}
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" className="me-2" />
          ) : (
            "Update"
          )}
        </Button>
      </Form>
    </>
  );
};

export default UpdatePassword;
