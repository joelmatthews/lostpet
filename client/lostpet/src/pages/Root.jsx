import { Container } from "@mui/material";
import ButtonAppBar from "../components/Navbar";
import { Outlet, json } from "react-router-dom";
import { lostPetInstance } from "../util/BaseAxiosInstance";

import { useLoaderData } from "react-router-dom";


export default function Root() {
    const lostPets = useLoaderData();
    
    return (
        <>
            <ButtonAppBar />
            <Container>
                <Outlet />
            </Container>
        </>
    )
}

export async function loader() {
    try {
        const response = await lostPetInstance.get('/lostpets');
        console.log(response);
        return response.data;;
    } catch (error) {
        console.log(error);
        throw json({message: error.response.data.error.message}, {status: error.response.data.error.status})
        return null
    }
}