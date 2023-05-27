import { useRouteLoaderData } from "react-router-dom";

import LostPetIndexCard from "../components/LostPetIndexCard";

const LostPetIndex = () => {
  const lostPets = useRouteLoaderData("root");

  return (
    <>
      {lostPets &&
        lostPets.map((lostpet) => (
          <LostPetIndexCard key={lostpet._id}
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

export default LostPetIndex;
