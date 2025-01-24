import React, { useState, useEffect } from "react";
import { useGetEventAdminQuery } from "../../../services/services";
import AdminDashboardItems from "../../../components/AdminDashboardItems";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const EventsAdmin = () => {
  const [eventData, setEventData] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const { data,refetch, isLoading, isError } = useGetEventAdminQuery(selectedCity);

  useEffect(() => {
    setEventData(data);

    if (data && cities.length === 0) {
      const citySet = new Set();
      data.forEach((venue) => {
        if (venue.city) citySet.add(venue.city);
      });
      setCities([...citySet]);
    }
  }, [data, cities.length]);


  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    refetch();
  };

  if (isLoading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center py-5 fs-4 fw-medium">No Events Found</div>;
  }

  return (
    <>
      <div
        className="d-flex justify-content-between mt-0 m-auto px-sm-4 px-0"
        style={{ width: "92%" }}
      >
        <h3 className="text-dark fw-medium">Events</h3>
        <select
          className="form-select form-select-sm fs-7 w-auto form-control-custom rounded-pill p-2 pe-5"
          aria-label="City"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <option value="">All Cities</option>
          {cities.map((city, index) => (
            <option className="fs-7" key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div style={{ width: "92%" }} className="m-auto p-4">
        <div className="scroll vh-75 flex-grow-1">
          <Row>
            {eventData?.length > 0 ? (
              eventData.map((items) => (
                <Col
                  sm={6}
                  lg={4}
                  xs={12}
                  xl={3}
                  key={items.eventUuid}
                  className="m-auto m-sm-0 px-1 py-2"
                >
                  <AdminDashboardItems
                    key={items.eventUuid}
                    items={items}
                    setOrganizerBtn={false}
                    setEventsBtn={false}
                    setEdit={true}
                  />
                </Col>
              ))
            ) : (
              <div className="text-center py-5">
                <h4>No events found</h4>
              </div>
            )}
          </Row>
        </div>
      </div>
    </>
  );
};

export default EventsAdmin;
