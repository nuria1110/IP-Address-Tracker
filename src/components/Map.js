import React, { useState, useEffect, useRef} from 'react';
import { useIPContext } from '../contexts/IPContext';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import myMarker from '../images/icon-location.svg';

function Map() {

    const { ipData } = useIPContext();
    const mapContainer = useRef();
    let map = null;

    let icon = L.icon({
        iconUrl: myMarker,
        iconSize: [46, 56],
        iconAnchor: [23, 56],
    });

    useEffect(()=>{
        if (ipData !== null) {

            let lat = parseFloat(ipData.location.lat);
            let lng = parseFloat(ipData.location.lng);
            map = L.map(mapContainer.current).setView([lat, lng], 12);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 20,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        
            var marker;
            marker = new L.Marker([lat, lng], {icon: icon})
            map.addLayer(marker);
            
            // unmount
            return () => map.remove();               
        }
    }, [ipData])

    return (<div className='map'ref={el => mapContainer.current = el}></div>);
}

export default Map;