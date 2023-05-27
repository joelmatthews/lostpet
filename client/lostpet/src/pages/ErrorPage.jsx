import { Box, Container, Paper, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";
import ButtonAppBar from "../components/Navbar";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <>
    <ButtonAppBar />
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Paper elevation={3} sx={{padding: "3rem"}}>
        <Typography variant="h2" component="h2" textAlign="center" marginBottom={3}>
          An Error Has Occured!
        </Typography>
        <Typography variant="h4" component="h4">
            {error.status} {error.data.message}
        </Typography>
      </Paper>
    </Container>
    </>
  );
}
