import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import { useGetPlaceQuery, useViewPaymentQuery } from '../../../services/services';
import FormModal from '../../../components/AddPlaceModal';
import {Loader} from '../../../components/Loader';
import toast from 'react-hot-toast';  
import AmountModal from '../../../components/UnPaidModal';  

export const PlacesAdmin = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [eventData, setEventData] = useState({});
  const [placeId, setPlaceId] = useState();
  const { data, isLoading, isError, refetch, isFetching } = useGetPlaceQuery();

  const [cities, setCities] = useState([]);
  const [loadingEventId, setLoadingEventId] = useState(null); 
  
  useEffect(() => {
    if (data) {
      const cities = [];
      data.forEach((venue) => {
        const lowerCaseCity = venue.city.toLowerCase();
        if (!cities.includes(lowerCaseCity)) {
          cities.push(lowerCaseCity);
        }
      });
      setCities(cities);
    }
  }, [data]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value.toLowerCase());
  };

  const filteredData = selectedCity ? data.filter(event => event.city === selectedCity) : data;

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleViewClick = (event) => {
    setPlaceId(event.placeUuid);
    setEventData(event);
    setLoadingEventId(event.placeUuid); 
  };

  const { data: viewData, isLoading: isViewLoading } = useViewPaymentQuery({ placeUuid: placeId }, { skip: !placeId });

  useEffect(() => {
    if (viewData) {
      const { unpaidAmount } = viewData;

      if (unpaidAmount === 0) {
        toast.error("No unpaid amount found.");
      } else if (unpaidAmount > 0) {
        setShowViewModal(true);
      }
    }
    setLoadingEventId(null); 
  }, [viewData]); 
  return (
    <>
      <div className='d-flex justify-content-center mt-5'>
        <div style={{ width: '92%' }} className='forheight scroll'>
          <Container fluid className='px-md-4 px-1'>
            <Row className='align-items-center mb-3'>
             
              <Col>
                <div className='d-flex justify-content-between align-items-center my-4'>
                  <h1 className='text-color fs-3 mb-0 mt-2'>Places</h1>
                  <div className='d-flex gap-2'>
                    <select
                      className='form-select form-select-sm fs-7 w-auto form-control-custom rounded-pill p-2 pe-5'
                      aria-label='City'
                      value={selectedCity}
                      onChange={handleCityChange}
                    >
                      {cities.map((city, index) => (
                        <option className='fs-7' key={index} value={city}>{city}</option>
                      ))}
                      <option value="">All cities</option>
                    </select>
                    <Button className='bg-whole d-none d-md-block border-0' onClick={handleShowModal}>Add Place</Button>
                  </div>
                </div>
                <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <Table className='table mb-0 bg-transparent rounded border'>
                    <thead>
                      <tr>
                        <th className='py-3 fs-7 text-color'>City</th>
                        <th className='py-3 fs-7 text-color'>Venue</th>
                        <th className='py-3 fs-7 text-color'>Place/price</th>
                        <th className='py-3 fs-7 text-color'>Seats</th>
                        <th className='py-3 fs-7 text-color'>Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(isLoading || isFetching) ? (
                        <tr>
                          <td colSpan="5" className='text-center'>
                            <Loader />
                          </td>
                        </tr>
                      ) : isError || filteredData.length < 1 ? (
                        <tr>
                          <td colSpan="5" className='text-center text-color'>
                            Place not found.
                          </td>
                        </tr>
                      ) : (
                        filteredData.map((event, index) => (
                          <tr key={index} className='bg-transparent'>
                            <td className='py-md-3 fs-7 py-2 px-md-2 px-3 fw-medium' style={{ borderBottom: '1px solid #dee2e6' }}>{event.city}</td>
                            <td className='py-md-3 fs-7 py-2 px-md-0 px-3' style={{ borderBottom: '1px solid #dee2e6' }}>{event.venueName}</td>
                            <td className='py-md-3 fs-7 py-2 px-md-2 px-3' style={{ borderBottom: '1px solid #dee2e6' }}>{event.rentalCost}</td>
                            <td className='py-md-3 fs-7 py-2 px-md-2 px-3' style={{ borderBottom: '1px solid #dee2e6' }}>{event.capacity}</td>
                            <td className='py-md-3 fs-7 py-2 px-md-2 px-3' style={{ borderBottom: '1px solid #dee2e6' }}>
                              <Button
                                className='border-whole bg-transparent'
                                onClick={() => handleViewClick(event)}
                                disabled={isViewLoading && placeId === event.placeUuid} 
                              >
                                {isViewLoading && placeId === event.placeUuid ? 'Loading' : 'View'}
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
                <div className='d-flex justify-content-end mt-4'>
                  <Button className='bg-whole d-block d-md-none border-0' onClick={handleShowModal}>Add New Place</Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {viewData && (
        <AmountModal
          show={showViewModal}
          handleClose={() => setShowViewModal(false)}
          eventData={eventData}
          unpaidAmount={viewData.unpaidAmount}  
        />
      )}

      <FormModal show={showModal} setShow={setShowModal} refetch={refetch} />
    </>
  );
};

export default PlacesAdmin;
