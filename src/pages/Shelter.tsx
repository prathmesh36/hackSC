/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import {ContentHeader} from '@components';
import instance from '@app/utils/axios';
import ShelterItem from '@app/pages/ShelterItem'
import MyMap from '@app/pages/MapComponent';





const Shelter = () => {
  const [zipCode, setZipCode] = useState("");
  const [shelterData, setShelterData] = useState([]);
  
  const onShelterSearchSubmit = async (shelter:string)=>{
    setShelterData([]);
    const response = await instance.get("/v1/user/getShelterByZip?zip="+shelter);
    //console.debug(response); 
    setShelterData(response.data);
  }

  const mapIsReadyCallback = (map) => {
    //console.log(map);
  };

  return (
    <div>
      <ContentHeader title="Shelter Page" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Search for nearby shelters</h3>
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
              <button style={{marginLeft:"10px"}} onClick={()=>{onShelterSearchSubmit(zipCode)}}>Submit</button>
            </div>
            <div className="card-body">

              {(shelterData.length > 0)? (
              <MyMap markerData={shelterData} mapIsReadyCallback={mapIsReadyCallback} />) :(<></>)
              }
              <br/>
              {shelterData.map((shelter) => (
                <ShelterItem shelter={shelter}/>
              ))}
            </div>
            <div className="card-footer">Shelters limited to Southern California</div>
          </div>
        </div>
      </section>
      </div>
  );
};

export default Shelter;
