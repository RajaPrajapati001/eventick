import React ,{useEffect, useState} from 'react'
import {Row,Col} from "react-bootstrap"
import Spinner from "react-bootstrap/Spinner";
import AdminDashboardItems from '../../../components/AdminDashboardItems'
import { useGetOrganizerDataQuery } from '../../../services/services';
import { useGetEventDataQuery } from '../../../services/services';
import { useContext } from 'react';
import { AppContext } from '../../../routes/AppRoutes';

const ApprovalAdmin = () => {
    const {update,setUpdate}=useContext(AppContext);
    const [status,setStatus]=useState("OrganizerApproval");
    const [eventData,setEventData]=useState("");
    const {data,isLoading,refetch}=status === "OrganizerApproval"
    ? useGetOrganizerDataQuery( { skip: status !== "OrganizerApproval" })
    : useGetEventDataQuery({ skip: status !== "EventsApproval" });

    useEffect(()=>{
        if(data?.status==200){
            setEventData(data);
        }else if(data?.status==404){
            setEventData({data:[]})
        }
    },[data])

    useEffect(()=>{
    refetch();
    setUpdate(false);
    },[update])
   
    function handleTabClick(item){
    setStatus(item);
    }
  return (
    <>
        <div className="d-flex justify-content-center">
      <div style={{ width: "92%" }}>
        <div className="tabs fs-7 d-flex justify-content-center mb-3 position-sticky top-0 my-bg z-1">
          <div
            className={`tab-btn bg-transparent border-0 rounded-0 px-2 px-md-3 py-2 mx-md-2 mx-0 text-center crs ${
              status === "OrganizerApproval" ? "active" : ""
            }`}
            onClick={() => handleTabClick("OrganizerApproval")}
          >
            Organizer Approval
          </div>
          <div
            className={`tab-btn bg-transparent border-0 text-center rounded-0 px-2 px-md-3 py-2 mx-md-2 mx-0 fw-medium crs ${
              status === "EventsApproval" ? "active" : ""
            }`}
            onClick={() => handleTabClick("EventsApproval")}
          >
            Events Approval
          </div>
        </div>
        <Row className="justify-content-start vh-75 scroll px-md-5 px-3 px-lg-3 px-xl-1 mx-xl-4">
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{height:"350px"}}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (eventData?.data?.length === 0 ? (
            <div className="text-center py-5">
              <h3>No requests found</h3>
            </div>
          ) : (
            <Row className="g-2">
              {eventData?.data?.map((event) => (
                <Col
                  sm={6}
                  lg={4}
                  xs={12}
                  xl={3}
                  className="m-auto m-sm-0 px-1 py-2"
                  key={event.eventUuid}
                >
                  {status === "OrganizerApproval" ? (
                    <AdminDashboardItems
                      items={event}
                     setOrganizerBtn={true}
                     setEventsBtn={false}
                    />
                  ) : (
                    <AdminDashboardItems
                      items={event}
                      setOrganizerBtn={false}
                      setEventsBtn={true}
                    />
                  )}
                </Col>
              ))}
            </Row>
          ))}
        </Row>
      </div>
    </div>
    </>
  )
}

export default ApprovalAdmin
