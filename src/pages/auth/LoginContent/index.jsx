import React, { useState,useContext } from "react";
import { useFormik } from "formik";
import Input from "../../../components/Input";
import "../../../index.css";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../../../services/services";
import { loginContentSchema } from "../../../schemas";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const Login_content = () => {
  const [submitDisable, setSubmitDisable] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginContentSchema,
    onSubmit: async (values) => {
      setSubmitDisable(true);
      console.log(values);

      try {
        const res = await loginUser(values).unwrap();
        console.log(isLoading);
        console.log(res);
        if (res.token) {
          toast.success("Successfully Logged In");
          localStorage.setItem("token", res.token);
          navigate("/home");
        } else if (res.status == "error") {
          toast.error(res.message);
          setSubmitDisable(false);
          // navigate("/home");
        }
      } catch (err) {
        setSubmitDisable(false);
        toast.error("Error validating user");
        console.error("Error:", err);
      }
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit} className="w-50 my-form mt-5">
        <h3 className="text-center fw-bold fs-5 mb-5">LOGIN</h3>
        <Input
          name="email"
          type="text"
          formik={formik}
          placeholder="Enter email"
          icon={<AiOutlineUser />}
        />
        <Input
          name="password"
          type="password"
          formik={formik}
          placeholder="Password"
          icon={<AiOutlineLock />}
        />
        <div id="forpsw" className="text-end text-primary crs fs-7 mb-4">
          <Link to="/forget">Forgot Password?</Link>
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className="text-white fw-medium bg-whole border-0 rounded-3 mb-3 w-100 fs-7 py-2"
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" className="me-2" />
          ) : (
            "Login Now"
          )}
        </Button>
        <br></br>
        <Link to="/loginWithOtp">
          <Button
            type="button"
            className=" bg-white fw-medium rounded-3 mb-4 w-100 fs-7 py-2 border-whole"
          >
            Login With OTP
          </Button>
        </Link>
        <div className="fs-7">
          Don't have any account?{" "}
          <Link to="/signUp">
            <u className="text-primary crs">Sign Up</u>
          </Link>
        </div>
      </Form>
    </>
  );
};

export default Login_content;
