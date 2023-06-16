import Button from "@mui/material/Button";

import { Link, useLoaderData, useRouteLoaderData } from "react-router-dom";

import { lostPetInstance } from "../util/BaseAxiosInstance";

import LostPetIndexCard from "../components/LostPetIndexCard";
import MapboxMap from "../components/MapboxHomeMap";

const LostPetIndex = () => {
  const lostPets = useLoaderData();
  const token = useRouteLoaderData("root");

  return (
    <>
      {token && (
        <Button sx={{ marginBottom: 3 }} variant="contained" color="success">
          <Link
            to="/lostpets/new"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Create Lost Pet +
          </Link>
        </Button>
      )}
      <MapboxMap />
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
    return null;
  }
}

export default LostPetIndex;
