import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import Input from "../Input";
import { useFormik } from "formik";
import { editModal } from "../../schemas";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { useUpdateEventMutation } from "../../services/services";
import { toast } from "react-toastify";
import "../../index.css";
import { AppContext } from "../../routes/AppRoutes";

function EditModal({ show, setShow, selectedItem }) {
  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const [profilePic, setProfilePic] = useState(null);
  const [value, setValue] = useState(parseInt(selectedItem.maxTicket));
  const {setUpdate}=useContext(AppContext);

  function handleDecrease() {
    const minValue = parseInt(selectedItem.avaliabelTicket);
    if (value > minValue) {
      setValue(value - 1);
    } else {
      toast.warn("This is the minimum quantity");
    }
  }

  function handleIncrease() {
    if(value>=selectedItem.capacity){
      toast.warn("allocated all seats")
    }else{
    setValue(value + 1);}
  }

 
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setProfilePic(file);
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      event_name: selectedItem.eventName || "",
      event_details: selectedItem.eventDetails || "",
    },
    validationSchema: editModal,
    onSubmit: async (values) => {
      const formfile = new FormData();

      formfile.append(
        "event",
        new Blob(
          [
            JSON.stringify({
              uuid: selectedItem.uuid,
              eventName: values.event_name,
              eventDetails: values.event_details,
              maxTicket: value,
            }),
          ],
          { type: "application/json" }
        )
      );

      // if (profilePic) {
      //   formfile.append("file", profilePic);
      // }

      try {
        const res = await updateEvent(formfile).unwrap();
        if (
          res.status === "Event details updated successfully." 
        ) {
          setUpdate(true);
          setShow(false);
          toast.success("Event data updated successfully");
        } else {
          toast.error("Event not updated");
        }
      } catch (error) {
        console.error("Error updating event:", error);
        toast.error("An error occurred while updating the event");
      }
    },
  });

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Event Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <Row className="mb-3">
              <Col>
                <label htmlFor="event_name">Event Name</label>
                <Input
                  name="event_name"
                  id="event_name"
                  type="text"
                  formik={formik}
                  placeholder="Enter your event name"
                  icon={<MdDriveFileRenameOutline />}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col xs={12} sm={6} className="d-flex flex-row mb-2">
                    <div className="text-dark fw-medium me-1">Quantity : </div>
                    <div className="d-flex flex-row">
                      <button
                        type="button"
                        className="bg-btn rounded px-2 py-1 fs-7 border-0 me-2 crs"
                        onClick={handleDecrease}
                      >
                        -
                      </button>

                      <div className="me-2">{value}</div>
                      <button
                        type="button"
                        className="bg-btn rounded px-2 py-1 fs-7 border-0 crs"
                        onClick={handleIncrease}
                      >
                        +
                      </button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Event Start Date:</strong>{" "}
                {selectedItem.startDate || "N/A"}
              </Col>
              <Col>
                <strong>Event End Date:</strong> {selectedItem.endDate || "N/A"}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Event Start Time:</strong>{" "}
                {selectedItem.eventStartTime || "N/A"}
              </Col>
              <Col>
                <strong>Event End Time:</strong>{" "}
                {selectedItem.eventEndTime || "N/A"}
              </Col>
            </Row>
            {/* <Row className="mb-3">
              <Col>
               
              </Col>
            </Row> */}
            <Row className="mb-3">
              <Col>
                <label htmlFor="event_details">Event Details</label>
                <Input
                  name="event_details"
                  id="event_details"
                  type="text"
                  formik={formik}
                  placeholder="Enter event details"
                  icon={<CgDetailsMore />}
                />
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className={`rounded border-0 fw-medium text-white px-2 py-1 ${
                  isLoading ? "bg-whole opacity-75" : "bg-whole"
                }`}
                disabled={isLoading}
              >
                Apply Changes
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditModal;