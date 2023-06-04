import { Box, Stack, TextField, Button, Paper, Alert, Typography } from "@mui/material";
import { Form, json, redirect } from "react-router-dom";
import { lostPetInstance } from "../util/BaseAxiosInstance";

import { useActionData } from 'react-router-dom';


const Login = () => {
  const errors = useActionData();

  return (
    <>
      <Paper
        elevation={3}
        sx={{ width: "20rem", margin: "0 auto", padding: 3 }}
      >
        <Box sx={{marginBottom: 2}}>
            <Typography variant="h5" component="h5" sx={{ textAlign: 'center'}}>
                Login to Post Lost Pets!
            </Typography>
        </Box>
        <Form method="post" action="/login">
          <Stack spacing={3} useFlexGap>
            <TextField
              id="owner-email"
              name="email"
              label="e-mail"
              required
              variant="outlined"
              size="small"
              sx={{ width: "100%" }}
              //   {...(errors && errors !== null ? { error: true } : {})}
            />
            <TextField
              id="owner-password"
              name="password"
              label="password"
              type="password"
              required
              variant="outlined"
              size="small"
              sx={{ width: "100%" }}
              //   {...(errors && errors !== null ? { error: true } : {})}
            />
            {errors && errors.authError ? (
              <Alert severity="error" sx={{ marginY: 1 }}>
                {errors.authError}
              </Alert>
            ) : (
              ""
            )}
            <Button
              variant="contained"
              sx={{ width: "100%", paddingY: "0.75rem" }}
              type="submit"
            >
              Login
            </Button>
          </Stack>
        </Form>
      </Paper>
    </>
  );
};

export const action = async ({ request }) => {
  const data = Object.fromEntries(await request.formData());
  const errors = {};

  try {
    const response = await lostPetInstance.post('/login', {
        ...data
    })

    console.log(response);
    const token = response.data.token;
    localStorage.setItem('token', token);

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem('expiration', expiration.toISOString());

    return redirect('/lostpets')

  } catch (error) {
    console.log(error.response);
    if (error.response.status !== 400 && error.response.status !== 401) {
        throw json({message: error.response.data.message}, {status: error.response.status})
    }
    if (error.response.status === 400 || error.response.status === 401) {
        errors.authError = error.response.data.message
    }
    return errors
  }
  return null;
};

export default Login;
