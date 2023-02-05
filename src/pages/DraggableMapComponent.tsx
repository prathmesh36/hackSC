import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';



const MyDraggableMap = (props) => {



    function DraggableMarker(props) {
        const [draggable, setDraggable] = useState(true)


        const markerRef = useRef(null)
        const eventHandlers = useMemo(
            () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    //setPosition(marker.getLatLng())
                    props.setPositionParent(marker.getLatLng());
                }
            },
        }),
        [],
        )

        return (
            <Marker
                draggable={draggable}
                eventHandlers={eventHandlers}
                position={props.parentPosition}
                ref={markerRef}>
            </Marker>
        )
    }

    return (
    <MapContainer style={{height:"300px"}} center={props.parentPosition} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker parentPosition={props.parentPosition} setPositionParent={props.setPositionParent}/>
    </MapContainer>
    )
}

export default MyDraggableMap;