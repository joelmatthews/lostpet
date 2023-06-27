import { useState } from "react";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, FormControl } from "@mui/material";

import {
  useSubmit,
  useActionData,
  redirect,
  json,
} from "react-router-dom";

import { lostPetInstance } from "../util/BaseAxiosInstance";
import states from "../util/StatesForSelect";
import { getToken } from "../util/authTokenGetter";

const LostPetNew = () => {
  const submit = useSubmit();
  const errors = useActionData();
  console.log(errors);
  const [selectedState, setSelectedState] = useState("");
  const [images, setImages] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [formTextData, setFormTextData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    houseNumber: "",
    street: "",
    city: "",
    zipcode: "",
    description: "",
  });

  const handleTextInputChange = (event) => {
    const { name, value } = event.target;
    setFormTextData((prevFormTextData) => ({
      ...prevFormTextData,
      [name]: value,
    }));
  };

  const handleSelectChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleFileChange = (event) => {
    setImages(event.target.files);
  };

  const handleCreatePetSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("dateLost", selectedDate);
    formData.append("state", selectedState);

    for (const formInput in formTextData) {
      formData.append(`${formInput}`, formTextData[formInput]);
    }

    for (let i = 0; i < images.length; i++) {
      formData.append(`image${i}`, images[i], images[i].name);
    }

    submit(formData, {
      method: "post",
      action: "/lostpets/new",
      encType: "multipart/form-data",
    });
  };

  return (
    <>
      <Paper elevation={3} sx={{ padding: 5, marginY: 5 }}>
        <Box sx={{ marginY: 5 }}>
          <Typography variant="h3" component="h3" sx={{ textAlign: "center" }}>
            Create a Lost Pet
          </Typography>
        </Box>
        <form onSubmit={handleCreatePetSubmit}>
          <Box sx={{ marginY: 3 }}>
            <Typography variant="h5" component="h5">
              Pet Information
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="petName"
                name="name"
                label="Pet Name"
                required
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={handleTextInputChange}
                {...(errors && errors !== null && errors.validationError && errors.validationError[0].includes('name') ? { error: true } : {})}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Pet Lost Date"
                onChange={(newValue) => {
                  const isoStringDate = newValue.toISOString();
                  setSelectedDate(isoStringDate);
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="petSpecies"
                name="species"
                label="Pet Species"
                required
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={handleTextInputChange}
                {...(errors && errors !== null && errors.validationError && errors.validationError[0].includes('species') ? { error: true } : {})}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="petBreed"
                name="breed"
                label="Pet Breed"
                required
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={handleTextInputChange}
                {...(errors && errors !== null && errors.validationError && errors.validationError[0].includes('breed') ? { error: true } : {})}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="petAge"
                name="age"
                label="Pet Age"
                type="number"
                required
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={handleTextInputChange}
                {...(errors && errors !== null && errors.validationError && errors.validationError[0].includes('age') ? { error: true } : {})}
              />
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
          <Box sx={{ marginY: 3 }}>
            <Typography variant="h5" component="h5">
              Last Known Location
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                id="petHouseNumber"
                name="houseNumber"
                label="House Number (optional)"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={handleTextInputChange}
                {...(errors && errors !== null && errors.validationError && errors.validationError[0].includes('houseNumber') ? { error: true } : {})}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="petStreet"
                name="street"
                label="Street"
                required
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={handleTextInputChange}
                {...(errors && errors !== null && errors.validationError && errors.validationError[0].includes('street') ? { error: true } : {})}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="petCity"
                name="city"
                label="City"
                required
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={handleTextInputChange}
                {...(errors && errors !== null && errors.validationError && errors.validationError[0].includes('city') ? { error: true } : {})}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="petState">State</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  labelId="petState"
                  id="petState"
                  value={selectedState}
                  label="State"
                  onChange={handleSelectChange}
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="petZip"
                name="zipcode"
                label="Zipcode"
                type="number"
                InputProps={{
                  inputMode: "numeric",
                }}
                required
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={handleTextInputChange}
                {...(errors && errors !== null && errors.validationError && errors.validationError[0].includes('zipcode') ? { error: true } : {})}
              />
            </Grid>
          </Grid>
          <Box sx={{ marginY: 3 }}>
            <Typography variant="h5" component="h5">
              Pet Description
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>
                <InputLabel id="images">
                  Upload up to 3 Images of Your Pet
                </InputLabel>
                {/* <Input
                  sx={{ width: "100%", marginY: 1 }}
                  id="images"
                  type="file"
                  multiple
                  name="images"
                  onChange={handleFileChange}
                /> */}
                <input
                  onChange={handleFileChange}
                  style={{ marginTop: "1rem" }}
                  type="file"
                  multiple
                  name="images"
                  id="images"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="petDescription"
                name="description"
                label="Details"
                multiline
                rows={4}
                required
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={handleTextInputChange}
              />
            </Grid>
          </Grid>
          {errors && errors.validationError ? (
              <Alert variant="outlined" severity="error" sx={{ marginTop: 5, width: '100%' }}>
                {errors.validationError}
              </Alert>
            ) : (
              ""
            )}
          <Grid
            item
            xs={4}
            sx={{ display: "flex", justifyContent: "start", marginTop: 5 }}
          >
            <Button variant="contained" color="success" type="submit">
              Create Lost Pet
            </Button>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default LostPetNew;

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const errors = {};

  for (let i = 0; i < 3; i++) {
    const image = formData.get(`image${i}`);
    if (image) {
      formData.append("images", image, `image${i}`);
      formData.delete(`image${i}`);
    }
  }

  const token = getToken();
  try {
    const response = await lostPetInstance.post("/lostpets/new", formData, {
      headers: {
        Authorization: "Bearer " + token.token,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);

    if (response.status === 201) {
      return redirect(`/lostpets/${response.data._id}`);
    }
  } catch (error) {
    console.log(error.response);
    if (error.response.status === 500) {
      throw json(
        { message: error.response.data.error.message },
        { status: error.response.status }
      );
    }
    if (error.response.status === 400) {
      errors.validationError = error.response.data.error.message;
    }
    return errors;
  }
  return null;
};
