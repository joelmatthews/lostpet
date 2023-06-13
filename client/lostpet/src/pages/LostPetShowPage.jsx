import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";

import MapboxMap from "../components/MapboxHomeMap";
import QuiltedImageList from "../components/QuiltedImageList";

import { useSubmit, Link, json, useRouteLoaderData, redirect } from "react-router-dom";
import { lostPetInstance } from "../util/BaseAxiosInstance";
import SimpleAccordion from "../components/Accordion";
import { getToken } from "../util/authTokenGetter";

const ShowPage = () => {
  const lostPetData = useRouteLoaderData("lostPetShow");
  const token = useRouteLoaderData("root");
  const submit = useSubmit();

  console.log(lostPetData);
  console.log(token);

  const lostPetImageData = lostPetData.lostPetImages.map((image, index) => {
    if (index < 3) {
      return {
        img: image.path,
        title: image.filename,
        rows: lostPetData.lostPetImages.length === 1 ? 3 : index === 0 ? 2 : 1,
        cols: lostPetData.lostPetImages.length === 1 ? 3 : index === 0 ? 2 : 1,
      };
    }
  });

  const inputDate = lostPetData.dateLost
    ? lostPetData.dateLost
    : new Date().toISOString();
  const dateComponents = inputDate.split("T")[0].split("-");
  const year = parseInt(dateComponents[0], 10);
  const month = parseInt(dateComponents[1], 10) - 1;
  const day = parseInt(dateComponents[2], 10);

  const readableLostDate = new Date(year, month, day).toLocaleDateString(
    "en-us",
    {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const startDeleteHandler = () => {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete'});
    }
  };

  //   const lostPetImageDataTest = [
  //     {
  //       img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  //       title: "test",
  //       rows: 2,
  //       cols: 2,
  //     },
  //     {
  //         img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  //         title: "test",
  //         rows: 1,
  //         cols: 1,
  //       },
  //       {
  //         img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  //         title: "test",
  //         rows: 1,
  //         cols: 1,
  //       }
  //   ];
  console.log(lostPetImageData);

  return (
    <>
      <Paper elevation={3} sx={{ padding: 6, marginBottom: "6rem" }}>
        <Stack spacing={2}>
          <Box sx={{ width: "90%", margin: "0 auto" }}>
            <MapboxMap />
          </Box>
          <Box>
            <QuiltedImageList itemData={lostPetImageData} />
          </Box>
          <Box>
            <Box sx={{ margin: 3 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                {lostPetData.name} <span style={{ color: "grey" }}>|</span> Age:{" "}
                {lostPetData.age} <span style={{ color: "grey" }}>|</span> Last
                Seen: {readableLostDate}
              </Typography>
            </Box>
            <SimpleAccordion lostPetData={lostPetData} />
            {token &&
              token.userId &&
              token.userId === lostPetData.owner._id && (
                <Box sx={{ marginBottom: 5, marginTop: 10 }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Button variant="contained" color="warning">
                      <Link
                        to="edit"
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        Edit
                      </Link>
                    </Button>
                      <Button variant="contained" color="error" onClick={startDeleteHandler}>
                        Delete
                      </Button>
                  </Stack>
                </Box>
              )}
          </Box>
        </Stack>
      </Paper>
    </>
  );
};

export default ShowPage;

export const loader = async ({ request, params }) => {
  const lostPetId = params.lostPetId;

  try {
    const response = await lostPetInstance.get(`/lostpets/${lostPetId}`);
    return response.data;
  } catch (error) {
    console.log(error.response);
    throw json(
      { message: error.response.data.error.message },
      { status: error.response.status }
    );
  }

  return null;
};

export const action = async ({ request, params }) => {
  const lostPetId = params.lostPetId;

  const token = getToken();

  try {
    const response = await lostPetInstance.delete(`/lostpets/${lostPetId}/delete`, {
      headers: {
        Authorization: 'Bearer ' + token.token,
      }
    });

    if (response.status === 201) {
      return redirect('/lostpets');
    }

    return null;
  } catch (error) {
    console.log(error);
    throw json(
      { message: error.response.data.error.message },
      { status: error.response.data.error.status }
    );
  }
  return null;
};
