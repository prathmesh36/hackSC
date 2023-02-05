import {SmallBox} from '@app/components';
import React, {useState, useEffect} from 'react';
import {ContentHeader} from '@components';
import MyMap from '@app/pages/MapComponent';
import instance from '@app/utils/axios';

const Dashboard = () => {
  const [shelterData, setShelterData] = useState([]);

  const mapIsReadyCallback = (map) => {
    //console.log(map);
  };

 const onShelterSearchSubmit = async (shelter:string)=>{
    console.log("Hello")
    setShelterData([]);
    const response = await instance.get("/v1/user/getUser");
    console.log("Response");
    console.log(response);
    setShelterData(response.data);
  }

  useEffect(()=>{
      console.log("Hello")
      onShelterSearchSubmit()
  },[]);

  return (
    <div>
      <ContentHeader title="Disaster Management Home Page" />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>150</h3>

                  <p>Shelters</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
                <a href="/" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>
                    539
                  </h3>

                  <p>Total Vacancy in Shelters</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <a href="/" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>44</h3>

                  <p>Rescue Transport Available</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="/" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>63</h3>

                  <p>People SOSed</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
                <a href="/" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

{/*       <ContentHeader title="People SOS Map" /> */}
{/*       <section> */}
{/*          <div className="card-body"> */}
{/*             <MyMap markerData={shelterData} mapIsReadyCallback={mapIsReadyCallback} /> */}
{/*          </div> */}
{/*       </section> */}
    </div>
  );
};

export default Dashboard;
