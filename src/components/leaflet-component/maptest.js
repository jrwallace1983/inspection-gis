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
  const controlRef = useRef(null);
  const greyLayerRef = useRef(null);
  const streetsLayerRef = useRef(null);
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


          if (props.gisData.length<1) {
            } else {
        //let stopLayer
        if(controlRef.current){
        mapRef.current.removeControl(controlRef.current);
        mapRef.current.removeLayer(greyLayerRef.current);
        mapRef.current.removeLayer(streetsLayerRef.current);

        
      }

        if(stopLayerRef.current){
          mapRef.current.removeLayer(stopLayerRef.current)
        }
        const stops = props.gisData.map((stop)=>{
            return L.marker([stop.geometry.y, stop.geometry.x], {icon:iconRef.current}).bindPopup(stop.attributes.Station)//.addTo(mapRef.current);
        });
        console.log(stops)
        stopLayerRef.current = L.layerGroup(stops)
        stopLayerRef.current.addTo(mapRef.current);
        var latLngs = [ stops[0].getLatLng() ];
        var markerBounds = L.latLngBounds(latLngs);
        mapRef.current.fitBounds(markerBounds);

        var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
  
      greyLayerRef.current   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr});
      streetsLayerRef.current  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

      var baseLayers = {
        "Grayscale": greyLayerRef.current,
        "Streets": streetsLayerRef.current
      };

        let overlays = {
          "stops": stopLayerRef.current
        };
      
       controlRef.current = L.control.layers(baseLayers, overlays)
       controlRef.current.addTo(mapRef.current);
       console.log(controlRef.current)
      }
    }
    },
    [props.markerPosition, props.gisData]
  );

  return <div id="map"></div>
}

export default Map;