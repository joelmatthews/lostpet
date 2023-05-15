import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const HomePage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} sx={{paddingX: "2rem", paddingY: "3rem", borderRadius: "10px"}}>
        <Typography variant="h4" component="h3" sx={{ marginBottom: 3, textAlign: "center" }}>
          Register to List Lost Pets
        </Typography>
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
                sx={{width: "100%"}}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="owner-confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                sx={{width: "100%"}}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" sx={{width: "100%", paddingY: "0.75rem"}}>Sign Up</Button>
            </Grid>
          </Grid>
        </form>
        </Paper>
      </Grid>
      <Grid item xs={0} sm={6}>
        <h1>Lost PET</h1>
      </Grid>
    </Grid>
  );
};

export default HomePage;
