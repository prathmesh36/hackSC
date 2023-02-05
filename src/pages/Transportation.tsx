/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import {ContentHeader} from '@components';
import instance from '@app/utils/axios';
import TransportItem from '@app/pages/TransportItem'

const Transport = () => {
  const [zipCode, setZipCode] = useState("");
  const [transportData, setTransportData] = useState([]);
  
  const onTransportSearchSubmit = async (shelter:string)=>{
    setTransportData([]);
    const response = await instance.get("/v1/user/getTransportByZip?zip="+shelter);
    //console.debug(response); 
    setTransportData(response.data);
  }

  const mapIsReadyCallback = (map) => {
    //console.log(map);
  };

  return (
    <div>
      <ContentHeader title="Relief Effort Transportation Service" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Search for nearby relief effort transportation</h3>
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
              Search by zip code: 
              <input type="text" style={{marginLeft:"4px"}} onChange={(zipCode)=>{setZipCode(zipCode.target.value)}} value={zipCode}></input>
              <button style={{marginLeft:"10px"}} onClick={()=>{onTransportSearchSubmit(zipCode)}}>Submit</button>
            </div>
            <div className="card-body">
              {transportData.map((eachTransportData) => (
                <TransportItem transportData={eachTransportData}/>
              ))}
            </div>
            <div className="card-footer">Transportations services limited to Southern California</div>
          </div>
        </div>
      </section>
      </div>
  );
};

export default Transport;