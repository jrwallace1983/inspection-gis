import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import Re from '../../img/marker-icon.png'
//import Tweet from 'tweet.png'

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
  const stopLayerRef = useRef(null);
  const iconRef = useRef(null);
  const circleRef = useRef(null);
  useEffect(
    () => {
      console.log(props.gisData)

        iconRef.current = L.icon({
            iconUrl: require('./train-stop.png'),//'https://leafletjs.com/examples/custom-icons/leaf-green.png',//'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
            iconSize: [20, 30],
            iconAnchor: [20, 30],
            popupAnchor: [-3, -76],
            //shadowUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/my-icon-shadow.png',
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
          //props.gisData.forEach((point)=>{
          //  L.circle([point.geometry.y, point.geometry.x],
           //   {color:"blue", fillColor:"blue", fillOpacity:1, radius:30}).addTo(mapRef.current).bindPopup(point.attributes.Station)
         // })

         // props.gisData.forEach((stop)=>{
          //  L.marker([stop.geometry.y, stop.geometry.x], {icon:iconRef.current}).addTo(mapRef.current);
         // });

        }
        /*if(circleRef.current){

        circleRef.current.addTo(mapRef.current).bindPopup("This is a red circle");
        }else{
            circleRef.current.addTo(mapRef.current);
        }*/

      if (props.gisData.length<1) {
        console.log("markerref true")//markerRef.current.setLatLng([stops[0].x, stops[0].y]);
      } else {
        //let stopLayer
        const stops = props.gisData.map((stop)=>{
            return L.marker([stop.geometry.y, stop.geometry.x], {icon:iconRef.current}).bindPopup(stop.attributes.Station)//.addTo(mapRef.current);
        });
        console.log(stops)
        stopLayerRef.current = L.layerGroup(stops).addTo(mapRef.current);
        //markerRef.current = L.marker([props.gisData[0].geometry.x, gisData[0].geometry.y], {icon:iconRef.current}).addTo(mapRef.current);
        var latLngs = [ stops[0].getLatLng() ];
        var markerBounds = L.latLngBounds(latLngs);
        mapRef.current.fitBounds(markerBounds);
        
        //mapRef.current.center = [props.gisData[0].geometry.y, props.gisData[0].geometry.x]
      }
    },
    [props.markerPosition, props.gisData]
  );

  return <div id="map"></div>
}

export default Map;