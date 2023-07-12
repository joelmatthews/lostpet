import { Box, Container, Paper, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";
import ButtonAppBar from "../components/Navbar";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  let errorStatus = error.status || 404;
  let message = error.data ? error.data.message : "Not Found!";

  if (error.response) {
    errorStatus = error.response.status;
    message = error.response.data.error.message;
  }


  return (
    <>
    <ButtonAppBar />
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Paper elevation={3} sx={{padding: "3rem"}}>
        <Typography variant="h2" component="h2" textAlign="center" marginBottom={3}>
          An Error Has Occured!
        </Typography>
        <Typography variant="h4" component="h4">
            {errorStatus ? errorStatus : ''} {message ? message : ''} 
        </Typography>
      </Paper>
    </Container>
    </>
  );
}
