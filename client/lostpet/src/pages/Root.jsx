import { Container } from "@mui/material";
import ButtonAppBar from "../components/Navbar";
import { Outlet } from "react-router-dom";

import { getToken } from "../util/authTokenGetter";

export default function Root() {

  return (
    <>
      <ButtonAppBar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export async function loader() {
    return getToken();
  }

