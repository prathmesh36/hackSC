import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import Routing from "@app/pages/RoutineMachine";
import { useState, useEffect } from "react";

export default function App(props) {

    let [position,setPosition] = useState([34, -118]);

  useEffect(()=>{
        console.log(props)
        let tempPosition = []
        for(let transportData in props.markerData){
            console.log(transportData)
            tempPosition.push([props.markerData[transportData].sourcelatitude,props.markerData[transportData].sourcelongitude])
        }
        console.log(tempPosition)
        setPosition(tempPosition);
    },[props.markerData]);

  return (
    <MapContainer center={position} zoom={13} style={{ height: "50vh",width:"80%" }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Routing pins={props.markerData}/>
    </MapContainer>
  );
}