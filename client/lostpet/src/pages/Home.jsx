import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import MapboxMap from "../components/MapboxHomeMap";

const HomePage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Paper
          elevation={3}
          sx={{
            paddingX: "2rem",
            paddingBottom: "3rem",
            paddingTop: "1.5rem",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 100,
              marginBottom: "3rem",
              position: "relative"
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
              className="signup-img"
            />
            <div className="img-gradient-overlay" />
            <Typography variant="h5" component="h4" sx={{ textAlign: "center", fontWeight: 600}}>
              Sign Up to List Lost Pets
            </Typography>
          </Box>
          <Box>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="owner-firstName"
                    label="First Name"
                    variant="outlined"
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="owner-lastName"
                    label="Last Name"
                    variant="outlined"
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="owner-phoneNumber"
                    label="Phone Number"
                    variant="outlined"
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="owner-email"
                    label="Email"
                    variant="outlined"
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="owner-password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="owner-confirmPassword"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    sx={{ width: "100%", paddingY: "0.75rem" }}
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={0} sm={8}>
        <MapboxMap />
      </Grid>
    </Grid>
  );
};

export default HomePage;
