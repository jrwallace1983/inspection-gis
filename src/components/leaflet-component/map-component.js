import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import './map-component.css'

//note that to use the useEffect hook I have to have the function as Capitalized Map instead of map
function MapComponent(props) {
    //let map
    const mapRef = useRef(null);
  useEffect(() => {

    // create map
    mapRef.current = L.map('map', {
      center: [33, -117],
      zoom: 9,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
      
    });

    
   L.marker([33, -117]).addTo(mapRef.current);
    console.log(mapRef.current.options)
  }, []);

  /*useEffect(()=>{
    L.marker([50.5, 30.5]).addTo(map);
      console.log("this is  a test")

  },[props.gisData])*/

  console.log(props)

  return (
  <div id="map"></div>
  )
}

export default MapComponent;