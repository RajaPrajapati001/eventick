import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from 'react-bootstrap';
import { useFormik } from "formik";
import { toast } from 'react-hot-toast';
import ConfirmModal from '../../components/PlaceConfrim';
import { useAddNewPlaceMutation } from '../../services/services';
import Inputs from '../../components/Input';
import {newPlaceSchema} from '../../schemas/index'

const AddPlaceModal = ({ show, setShow, refetch }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [addPlace] = useAddNewPlaceMutation();
  const [formData, setFormData] = useState({
    Place: '',
    City: '',
    Seats: '',
    Placeprice: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const formik = useFormik({
    initialValues: {
      Place: '',
      City: '',
      Seats: '',
      Placeprice: '',
    },
    validationSchema: newPlaceSchema,
    onSubmit: (values) => {
      setFormData(values); 
      setShowConfirmModal(true); 
    },
  });

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    const newCity = formData.City.toLowerCase();
    try {
      const data = {
        city: newCity,
        venueName: formData.Place,
        capacity: formData.Seats,
        rentalCost: formData.Placeprice
      };
      const res = await addPlace(data);
      if (res.data.status === "201") {
        toast.success(res.data.message);
        refetch();  
        setFormData({
          Place: '',
          City: '',
          Seats: '',
          Placeprice: ''
        });
      } else if(res.data.status==='400'){
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('You can\'t add same place');
    }
    setIsLoading(false);
    setShow(false);
    setShowConfirmModal(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="ms-3 text-color fw-bold text-center">Add New Place</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit} className="mt-4 m-auto px-md-5">
            <Form.Label className="fs-7 ps-2 fw-medium">
              Place Name <span className="text-danger">*</span>
            </Form.Label>
            <Inputs name="Place" type="text" formik={formik} placeholder="Enter place name" />
            <Form.Label className="fs-7 ps-2 fw-medium">
              City<span className="text-danger">*</span>
            </Form.Label>
            <Inputs name="City" type="text" formik={formik} placeholder="Enter city name" />
            <Form.Label className="fs-7 ps-2 fw-medium">
              Max seats<span className="text-danger">*</span>
            </Form.Label>
            <Inputs name="Seats" type="text" formik={formik} placeholder="Enter max seats" />
            <Form.Label className="fs-7 ps-2 fw-medium">
              Place Price (per/day) <span className="text-danger">*</span>
            </Form.Label>
            <Inputs name="Placeprice" type="text" formik={formik} placeholder="Enter Price" />
            <div className="d-flex justify-content-end">
              <Button className="bg-secondary border-0 me-2" onClick={handleClose}>Close</Button>
              <Button className="bg-whole border-0" type="submit">Add</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ConfirmModal show={showConfirmModal} handleClose={handleCloseConfirmModal} handleConfirm={handleConfirm} formData={formData} isLoading={isLoading} />
    </>
  );
};

export default AddPlaceModal;
