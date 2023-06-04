import { useEffect } from "react";

import { Container } from "@mui/material";
import ButtonAppBar from "../components/Navbar";
import { Outlet } from "react-router-dom";

import { useLoaderData, useRouteLoaderData, useSubmit } from "react-router-dom";

import { getToken, getTokenDuration } from "../util/authTokenGetter";

export default function Root() {
  const token  = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'TOKEN EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' })
    }, tokenDuration)
  }, [token, submit]);

  return (
    <>
      <ButtonAppBar token={token} />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export async function loader() {
    return getToken();
  }

