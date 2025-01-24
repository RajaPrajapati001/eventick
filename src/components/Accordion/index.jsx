import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { BsTicket } from "react-icons/bs";
import Input from "../Input";
import Select from "../Select";
import { useRegisterFilterQuery } from "../../services/services";
import { use } from "react";

function Accordionn({ formik }) {
  // console.log(formik);

  // const citys = ["Khategaon", "Indore", "Bhopal", "Mumbai"];
  const { data } = useRegisterFilterQuery();
  
  const filteredVenues = data?.filter(
    (item) => item.city === formik.values.city
  );
  // console.log("filteredVenues--", filteredVenues, "------", formik.values.city);

  const selectedVenue = filteredVenues?.find(
    (item) =>
      item?.venueName?.toLowerCase() ===
      formik?.values?.venueName?.toLowerCase()
  );

  useEffect(() => {
    formik.setFieldValue("rentalCost", selectedVenue?.rentalCost);
    formik.setFieldValue("capacity", selectedVenue?.capacity);
    formik.setFieldValue("placeUuid", selectedVenue?.placeUuid);

  }, [selectedVenue]);
  
  // console.log("selectedVenue--", selectedVenue);

  // const [select, setSelectedItem] = useState("");

  // data.map((value)=>{
  //   console.log(value.rentalCost);
  // })

  return (
    <>
      <Row>
        <Col md={12} lg={6}>
          <h4 className="fw-bold fs-5 mt-5">Location </h4>
          <p className="text-secondary">
            You can select venue and city from here
          </p>
          {data && (
            <div>
              <Select
                name="city"
                label="City"
                value={data?.map((value) => value?.city)} // Pass an array of city names
                formik={formik}
              />
              <Select
                name="venueName"
                label="VenueName"
                value={filteredVenues?.map((value) => value.venueName)} // Pass an array of city names
                formik={formik}
              />
              <Input
                name="capacity"
                type="number"
                formik={formik}
                value={selectedVenue?.capacity || ""}
                placeholder="Capacity"
                bg="bg-body-secondary"
                label="Capacity"
                readOnly="readOnly"
              />
              <Input
                name="rentalCost"
                type="number"
                formik={formik}
                value={selectedVenue?.rentalCost || " "}
                placeholder="RentalCost"
                bg="bg-body-secondary"
                label="RentalCost"
                readOnly="readOnly"
              />
              <Input
                name="placeUuid"
                type="number"
                formik={formik}
                value={selectedVenue?.placeUuid || " "}
                placeholder="placeUuid"
                bg="d-none"
              />
            </div>
          )}
        </Col>
        <Col md={12} lg={6} className="mt-5 mt-lg-0">
          <div className="mt-5">
            <h4 className="fw-bold">Time</h4>
            <p className="text-secondary">Choose the start time and end time for your event</p>
              <Col>
                <Input
                  name="startDate"
                  type="date"
                  formik={formik}
                  bg="bg-body-secondary"
                  placeholder="input description"
                  label="Event Start"
                />
              </Col>
              <Col>
                <Input
                  name="endDate"
                  type="date"
                  formik={formik}
                  placeholder="input description"
                  bg="bg-body-secondary"
                  label="Event End"
                />
              </Col>
              <Col>
                <Input
                  name="startTime"
                  type="time"
                  formik={formik}
                  placeholder="input description"
                  bg="bg-body-secondary"
                  label="Start Time"
                />
              </Col>
              <Col>
                <Input
                  name="endTime"
                  type="time"
                  formik={formik}
                  placeholder="input description"
                  bg="bg-body-secondary"
                  label="End Time"
                />
              </Col>
          </div>
        </Col>
      </Row>
      <Row>
            <Col>
              <Input
                name="quantity"
                type="number"
                formik={formik}
                placeholder="00"
                bg="bg-body-secondary"
                label="Quantity"
              />
            </Col>
            <Col>
              <Input
                name="price"
                type="number"
                formik={formik}
                placeholder="00"
                bg="bg-body-secondary"
                label="Price rs"
              />
            </Col>
          </Row>
    </>
  );
}

export default Accordionn;
