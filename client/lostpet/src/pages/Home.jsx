import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import FormSubmissionPending from "../components/formSubmissionPending";

import { lostPetInstance } from "../util/BaseAxiosInstance";

import { Form, json, redirect } from "react-router-dom";
import { useActionData, useNavigation, useRouteLoaderData } from "react-router-dom";

import MapboxMap from "../components/MapboxHomeMap";

const HomePage = () => {
  const errors = useActionData();
  const token = useRouteLoaderData('root');
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === "submitting" ? <FormSubmissionPending /> : ""}
      <Grid container spacing={2}>
        {!token && <Grid item xs={12} sm={4}>
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
                width: "66%",
                height: "125px",
                margin: "auto",
                position: "relative",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                className="signup-img"
              />
              <div className="img-gradient-overlay" />
            </Box>
            <Box sx={{ marginTop: 3 }}>
              <Box sx={{ marginBottom: 2 }}>
                <Typography
                  variant="h5"
                  component="h4"
                  sx={{ textAlign: "center", fontWeight: 600 }}
                >
                  Sign Up to List Lost Pets
                </Typography>
              </Box>
              <Form method="post" action="/">
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      id="owner-firstName"
                      name="firstName"
                      label="First Name"
                      required
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%" }}
                      {...(errors && errors !== null ? { error: true } : {})}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="owner-lastName"
                      name="lastName"
                      label="Last Name"
                      required
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%" }}
                      {...(errors && errors !== null ? { error: true } : {})}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="owner-phoneNumber"
                      name="phoneNumber"
                      label="Phone Number"
                      required
                      variant="outlined"
                      size="small"
                      placeholder="+1XXX-XXX-XXXX"
                      sx={{ width: "100%" }}
                      {...(errors && errors !== null ? { error: true } : {})}
                      {...(errors && errors.phoneNumber
                        ? { helperText: errors.phoneNumber }
                        : {})}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="owner-email"
                      name="email"
                      label="Email"
                      required
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%" }}
                      {...(errors && errors !== null ? { error: true } : {})}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="owner-password"
                      name="password"
                      label="Password"
                      type="password"
                      required
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%" }}
                      {...(errors && errors !== null ? { error: true } : {})}
                      {...(errors && errors.confirmPassword
                        ? { helperText: "Passwords Must Match" }
                        : {})}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="owner-confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      required
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%" }}
                      {...(errors && errors !== null ? { error: true } : {})}
                      // {...(isErrors && errors.confirmPassword
                      //   ? { helperText: "Passwords Must Match" }
                      //   : {})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {errors && errors.validationError ? (
                      <Alert severity="error" sx={{ marginY: 1 }}>
                        {errors.validationError}
                      </Alert>
                    ) : (
                      ""
                    )}
                    <Button
                      variant="contained"
                      sx={{ width: "100%", paddingY: "0.75rem" }}
                      type="submit"
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Box>
          </Paper>
        </Grid>}
        <Grid item xs={0} {...(token ? { sm: 12 } : { sm : 8 })}>
          <MapboxMap />
        </Grid>
      </Grid>
    </>
  );
};

export const action = async ({ request }) => {
  const data = Object.fromEntries(await request.formData());
  const errors = {};

  if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Passwords must match!";
  }

  if (/[+][1]\d{3}[-]\d{3}[-]\d{4}/.test(data.phoneNumber) === false) {
    errors.phoneNumber = "Format as +1XXX-XXX-XXXX";
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  try {
    const response = await lostPetInstance.post("/register", {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      password: data.password,
    });

    console.log(response);
    const token = response.data.token;
    localStorage.setItem("token", token);

    return redirect("/lostpets");
  } catch (error) {
    if (error.response.status !== 400) {
      throw json(
        { message: error.response.data.message },
        { status: error.response.status }
      );
    }
    if (error.response.status === 400) {
      errors.validationError = error.response.data.message;
    }
    return errors;
  }
  return null;
};

export async function loader() {
  try {
    const response = await lostPetInstance.get("/lostpets");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw json(
      { message: error.response.data.error.message },
      { status: error.response.data.error.status }
    );
    return null;
  }
}

export default HomePage;
