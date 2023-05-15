import { Container } from "@mui/material";
import ButtonAppBar from "../components/Navbar";
import { Outlet } from "react-router-dom";


export default function Root() {
    return (
        <>
            <ButtonAppBar />
            <Container>
                <Outlet />
            </Container>
        </>
    )
}