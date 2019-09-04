import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import Re from '../../img/marker-icon.png'

function Map(props) {
  // create map
  const mapRef = useRef(null);
  useEffect(() => {
    mapRef.current = L.map('map', {
      center: [33.8, -117.8],
      zoom: 16,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });
  }, []);
  
  // add marker
  const markerRef = useRef(null);
  const iconRef = useRef(null);
  const circleRef = useRef(null);
  useEffect(
    () => {
      console.log(props)
        iconRef.current = L.icon({
            iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',//'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
            iconSize: [38, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
            shadowUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/my-icon-shadow.png',
            shadowSize: [68, 95],
            shadowAnchor: [22, 94]
        });

        circleRef.current = L.circle([33.8, -117.8], {
            color: 'blue',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 10
        });
        if(mapRef.current){
          props.gisData.forEach((point)=>{
            L.circle([point.geometry.y, point.geometry.x],
              {color:"blue", fillColor:"blue", fillOpacity:1, radius:30}).addTo(mapRef.current).bindPopup(point.attributes.Station)
          })

        }
        if(circleRef.current){

        circleRef.current.addTo(mapRef.current).bindPopup("This is a red circle");
        }else{
            circleRef.current.addTo(mapRef.current);
        }

      if (markerRef.current) {
        markerRef.current.setLatLng(props.markerPosition);
      } else {
        markerRef.current = L.marker(props.markerPosition, {icon:iconRef.current}).addTo(mapRef.current);
      }
    },
    [props.markerPosition, props.gisData]
  );

  return <div id="map"></div>
}

export default Map;