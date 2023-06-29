import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import Paper from "@mui/material/Paper";

import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;


export default function MapboxShowMap({ coordinates }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(coordinates[0]);
  const [lat, setLat] = useState(coordinates[1]);
  const [zoom, setZoom] = useState(18);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    new mapboxgl.Marker().setLngLat([coordinates[0], coordinates[1]]).addTo(map.current);

  }, []);


  useEffect(() => {
    if (!map.current) return;
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <Paper elevation={3}>
      <div className="map-sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </Paper>
  );
}
