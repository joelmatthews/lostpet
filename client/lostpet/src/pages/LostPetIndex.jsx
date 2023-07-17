import { useState } from "react";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import Map, { Marker, Popup } from "react-map-gl";

import { Link, useLoaderData, useRouteLoaderData } from "react-router-dom";

import { lostPetInstance } from "../util/BaseAxiosInstance";

import LostPetIndexCard from "../components/LostPetIndexCard";

const LostPetIndex = () => {
  const lostPets = useLoaderData();
  const token = useRouteLoaderData("root");
  const [popupInfo, setPopupInfo] = useState(null);

  return (
    <>
      {token && (
        <Button sx={{ marginBottom: 1 }} variant="contained" color="success">
          <Link
            to="/lostpets/new"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Create Lost Pet +
          </Link>
        </Button>
      )}
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={{
          longitude: -98.5,
          latitude: 38.0,
          zoom: 3,
        }}
        style={{ width: "100%", height: 500, margin: "3rem 0" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {lostPets.map((lostPet) => (
          <Marker
            longitude={lostPet.lastLocation.coordinates[0]}
            latitude={lostPet.lastLocation.coordinates[1]}
            anchor="bottom"
            key={lostPet._id}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(lostPet);
            }}
          >
            <img src="../../map-marker-2-24.png" />
          </Marker>
        ))}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.lastLocation.coordinates[0]}
            latitude={popupInfo.lastLocation.coordinates[1]}
            onClose={() => setPopupInfo(null)}
          >
            <Box>
              <Typography variant="h4" component="h6">
                {popupInfo.name}
              </Typography>
              <Button variant="contained" sx={{marginY: 1}}>
                <Link style={{textDecoration: 'none', color: 'inherit'}} to={`/lostpets/${popupInfo._id}`}>
                  View Pet's Page
                </Link>
              </Button>
              <img
                src={popupInfo.lostPetImages[0].path}
                width="100%"
                height="120px"
              />
            </Box>
          </Popup>
        )}
      </Map>
      {lostPets &&
        lostPets.map((lostpet) => (
          <LostPetIndexCard
            key={lostpet._id}
            lostPetId={lostpet._id}
            lostPetImg={
              lostpet.lostPetImages.length > 0
                ? lostpet.lostPetImages[0].path
                : ""
            }
            lostPetName={lostpet.name}
            dateLost={lostpet.dateLost && lostpet.dateLost}
            lostPetLastLocationAddress={
              lostpet.lastLocationAddress ? lostpet.lastLocationAddress : ""
            }
            lostPetDescription={lostpet.description ? lostpet.description : ""}
          />
        ))}
    </>
  );
};

export async function loader() {
  try {
    const response = await lostPetInstance.get("/lostpets");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw json(
      { message: error.response.data.error.message },
      { status: error.response.data.error.status }
    );
  }
}

export default LostPetIndex;
