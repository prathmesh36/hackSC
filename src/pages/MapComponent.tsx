import React, { useEffect, useState } from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

const MyMap = (props) => {

    let [positions,setPositions] = useState([[[34, -118], "Default Name"]]);

    useEffect(()=>{
         console.log("Props")
        console.log(props)
        let tempPosition = []
        for(let shelterData in props.markerData){
            console.log(shelterData)
            console.log(props.markerData[shelterData])
            tempPosition.push([[props.markerData[shelterData].locationlongitude,props.markerData[shelterData].locationlatitude],props.markerData[shelterData].street])
        }
        console.log(tempPosition)
        setPositions(tempPosition);
    },[props.markerData]);

    return (
        <MapContainer style={{height:"500px", width:"100%"}} center={positions[0][0]} zoom={10} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {positions.map((position) => (
          <Marker position={position[0]}>
            <Popup>
              {position[1]}, <br /> Los Angeles
            </Popup>
          </Marker>
          ))}
        </MapContainer>
      )
};

export default MyMap;
