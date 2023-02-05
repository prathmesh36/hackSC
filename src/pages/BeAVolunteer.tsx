/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import {ContentHeader} from '@components';
import instance from '@app/utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import MyDraggableMap from '@app/pages/DraggableMapComponent';

const BeAVolunteer = () => {
  const center = {
    lat: 34,
    lng: -118,
  };

  const [zipCode, setZipCode] = useState("");
  const [shelterName, setShelterName] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [position, setPosition] = useState(center)
  
  const setPositionLatLong = (latLong:any)=>{
    setPosition(latLong);
  }
  
  const onVolunteerSubmit = async (zipCode:string, shelterName:string, vacancy:string)=>{
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
    let raw = {
      "isprivate": "Y",
      "locationlongitude": position["lng"],
      "locationlatitude": position["lat"],
      "street": shelterName,
      "zipcode": zipCode,
      "vacancy": vacancy,
      "type": "Flood"
    };
    
    try{
      let response  = await instance.post("/v1/user/addShelter",raw,{headers:headers});
      if(response.status === 200){
        toast.error("Shelter added successfully");
      }
      else{
        toast.error("Shelter adding failed");
      }
    }catch(e){
      toast.error("Shelter adding failed");
    }
  }

  const mapIsReadyCallback = (map) => {
    //console.log(map);
  };

  return (
    <div>
      <ToastContainer />
      <ContentHeader title="Be a Volunteer Page" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Be a Volunteer</h3>
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
              Shelter Name and Street:   
              <input type="text" style={{marginLeft:"4px"}} onChange={(shelterName)=>{setShelterName(shelterName.target.value)}} value={shelterName}></input><br/><br/>
              Accomodation for No. of people: 
              <input type="text" style={{marginLeft:"4px"}} onChange={(vacancy)=>{setVacancy(vacancy.target.value)}} value={vacancy}></input><br/><br/>
              Shelter Address: 
              <MyDraggableMap parentPosition={position} setPositionParent={setPositionLatLong}/><br/>
              <button style={{marginLeft:"10px",background:"#343a40",color:"white"}} onClick={()=>{onVolunteerSubmit(zipCode, shelterName, vacancy)}}>Submit</button>
            </div>
            <div className="card-footer">Shelters limited to Southern California</div>
          </div>
        </div>
      </section>
      </div>
  );
};

export default BeAVolunteer;
