/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import {ContentHeader} from '@components';
import instance from '@app/utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import MyDraggableMap from '@app/pages/DraggableMapComponent';

const TransportAdmin = () => {
  const center = {
    lat: 34,
    lng: -118,
  };

    const destCenter = {
      lat: 34.5,
      lng: -118.5,
    };

  const [zipCode, setZipCode] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [time, setTime] = useState("");
  const [position, setPosition] = useState(center)
  const [destPosition, setDestPosition] = useState(destCenter)
  
  const setPositionLatLong = (latLong:any)=>{
    setPosition(latLong);
  }

    const setDestPositionLatLong = (latLong:any)=>{
      setDestPosition(latLong);
    }
  
  const onSubmit = async (zipCode, name, street, time)=>{
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
    let raw = {
      "isprivate": "Y",
      "sourcelatitude": position["lat"],
      "sourcelongitude": position["lng"],
      "destlattitude": destPosition["lat"],
      "destlongitude": destPosition["lng"],
      "name": name,
      "street": street,
      "zipcode": zipCode,
      "timearrival": time,
      "isactive": "Y",
    };
    
    try{
      let response  = await instance.post("/v1/user/addTransport",raw,{headers:headers});
      if(response.status === 200){
        toast.success("Transportation Service added successfully");
      }
      else{
        toast.error("Transportation Service adding failed");
      }
    }catch(e){
      toast.error("Transportation Service adding failed");
    }
  }

  const mapIsReadyCallback = (map) => {
    //console.log(map);
  };

  return (
    <div>
      <ToastContainer />
      <ContentHeader title="Transport Admin Page" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Transport Admin page</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="collapse"
                  data-toggle="tooltip"
                  title="Collapse"
                >
                  <i className="fa fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="remove"
                  data-toggle="tooltip"
                  title="Remove"
                >
                  <i className="fa fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              Zip Code: 
              <input type="text" style={{marginLeft:"4px"}} onChange={(zipCode)=>{setZipCode(zipCode.target.value)}} value={zipCode}></input><br/><br/>
              Transportation Service Name
              <input type="text" style={{marginLeft:"4px"}} onChange={(name)=>{setName(name.target.value)}} value={name}></input><br/><br/>
              Street Name:
              <input type="text" style={{marginLeft:"4px"}} onChange={(street)=>{setStreet(street.target.value)}} value={street}></input><br/><br/>
              Time Arrival:
              <input type="text" style={{marginLeft:"4px"}} onChange={(time)=>{setTime(time.target.value)}} value={time}></input><br/><br/>
              Source Point (Drag the marker to the point):
              <MyDraggableMap parentPosition={position} setPositionParent={setPositionLatLong}/><br/>
              Destination Point :
              <MyDraggableMap parentPosition={destPosition} setPositionParent={setDestPositionLatLong}/><br/>
              <button style={{marginLeft:"10px",background:"#343a40",color:"white"}} onClick={()=>{onSubmit(zipCode, name, street,time)}}>Submit</button>
            </div>
            <div className="card-footer">Shelters limited to Southern California</div>
          </div>
        </div>
      </section>
      </div>
  );
};

export default TransportAdmin;
