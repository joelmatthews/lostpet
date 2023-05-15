import { Box, Container, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Box>
        <Typography variant="h2" component="h2">
          An Error Has Occured!
        </Typography>
        <Typography variant="paragraph" component="body1">
          Sorry, an unexpected error has occured.
        </Typography>
        <Typography variant="paragraph" component="body1">
            {error.status} {error.message}
        </Typography>
      </Box>
    </Container>
  );
}
