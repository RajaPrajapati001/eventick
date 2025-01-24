import React, { useState, useContext } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import Input from "../Input";
import { useFormik } from "formik";
import { editModal } from "../../schemas";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { CiCircleList } from "react-icons/ci";
import { CgDetailsMore } from "react-icons/cg";
import { useCancelEventMutation } from "../../services/services";
import {toast} from "react-toastify";
import { AppContext } from "../../routes/AppRoutes";
import { cancelSchema } from "../../schemas";

function CancelModal({ show, setShow, cancelItems }) {
  const { setUpdate } = useContext(AppContext);
  const [api]=useCancelEventMutation();
  const formik=useFormik({
    initialValues:{
      reason:""
    },
    validationSchema:cancelSchema,
    onSubmit:async (values)=>{
      
      const data=await api({eventUuid:cancelItems.uuid,description:values.reason});
       if(data.data.status==200){
        console.log("success")
        toast.success(data.data.message);
        setShow(false);
        setUpdate(true);
       }else{
        toast.error("something went wrong");
        setShow(false);
       }
     
     
    }
  })
    
  return (
    <>
      {/* Modal */}
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
          <Row className="mb-3">
            <Col className="text-center fw-bold">Are you sure to cancel</Col>
          </Row>
          <Row className="mb-3">
            <Col className="text-center">
              If you want to cancel your event, So you cancel your event. but it
              can be made negative impact on your profile. please keep event and
              make profit.
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="text-center">
              Place Price:{cancelItems.placePrice}
            </Col>
          </Row>
          <Row className="mb-3">
           <Col  xs={12}
          sm={12} className="text-start">
              <label>Reason for cancel</label> 
            </Col>
            <Col  xs={12}
          sm={12}>
            <Input name="reason" placeholder="Enter reason" formik={formik}></Input>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="text-center">
              <button
                className="bg-success border-0 rounded text-white fw-medium px-2 py-1"
                onClick={() => {
                  setShow(false);
                }}
              >
                Keep Event
              </button>
            </Col>
            <Col className="text-center">
              <button className="bg-danger border-0 rounded text-white fw-medium px-2 py-1"
              type="submit">
                Cancel Event
              </button>
            </Col>
          </Row>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CancelModal;