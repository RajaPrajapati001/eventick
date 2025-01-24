import {React,useState} from 'react';
import { useFormik } from 'formik';
import Input from '../../../components/Input';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Button, Form, Spinner} from 'react-bootstrap';
import { useLoginWithOtpMutation } from "../../../services/services";
import { toast } from 'react-toastify';
import { loginWithOtpSchema } from "../../../schemas";
import OtpModal from '../OtpPage';

const LoginWithOtp = () => {
  const [otpData, setOtpData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loginWithOtp, {isLoading}] = useLoginWithOtpMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: loginWithOtpSchema,
    onSubmit:async(values)=>{
      console.log("Form Values:", values); 
      try {
        const response = await loginWithOtp(values.email)
        if (response.data.status == "true"){
          setOtpData(values);
         setShowModal(true);
        } else if(response.data.status=="false"&&response.data.message=="This Email is not registered"){
          toast.error('email and phone does not exist');
        }else{
          toast.error('limit reached');
        }
      } catch (error) {
        console.error("Error:", error); 
        toast.error('An error occurred!');
      }
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit} className="w-50 my-form mt-5">
        <h3 className="text-center fw-bold fs-5 mb-4">LOGIN WITH OTP</h3>
        <p className="fs-7 mb-4">
          Please enter your registered email address.
        </p>
        <Input
          name="email"
          type="text"
          formik={formik}
          placeholder="Enter email"
          icon={<AiOutlineUser />}
        />
        <Button
          type="submit"
          className="text-white fw-medium bg-whole border-0 rounded-3 w-100 fs-7 py-2 mt-4 mb-"
        >
         {isLoading ? (
            <Spinner animation="border" size="sm" className="me-2" />
          ) : (
            "Send OTP"
          )}
        </Button>
        <br />
        <Link to="/Login">
          <Button
            type="button"
            className="bg-white fw-medium rounded-3 mt-3 w-100 fs-7 py-2 border-whole"
          >
            Login With Password
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

export default LoginWithOtp;
