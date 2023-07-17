import { useState, Suspense } from "react";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import Map, { Marker, Popup } from "react-map-gl";
import { useTheme } from "@mui/material/styles";

import QuiltedImageList from "../components/QuiltedImageList";
import ShowPageSkeleton from "../components/ShowPageSkeleton";

import {
  useSubmit,
  Link,
  json,
  useRouteLoaderData,
  redirect,
  defer,
  Await,
  useAsyncError,
} from "react-router-dom";
import { lostPetInstance } from "../util/BaseAxiosInstance";
import SimpleAccordion from "../components/Accordion";
import { getToken } from "../util/authTokenGetter";

const ShowPage = () => {
  const lostPetData = useRouteLoaderData("lostPetShow");
  const [popupInfo, setPopupInfo] = useState(null);
  const token = useRouteLoaderData("root");
  const submit = useSubmit();
  const theme = useTheme();
  const error = useAsyncError();

  console.log(error);
  console.log(lostPetData);
  console.log(token);

  const startDeleteHandler = () => {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  };

  return (
    <>
      <Suspense
        fallback={
          <ShowPageSkeleton />
        }
      >
        <Await resolve={lostPetData.resolvedLostPetData}>
          {(resolvedLostPetData) => {
            console.log(resolvedLostPetData);
            const lostPetImageData = resolvedLostPetData.data.lostPetImages.map(
              (image, index) => {
                if (index < 3) {
                  return {
                    img: image.path,
                    title: image.filename,
                    rows:
                      resolvedLostPetData.data.lostPetImages.length === 1
                        ? 3
                        : index === 0
                        ? 2
                        : 1,
                    cols:
                      resolvedLostPetData.data.lostPetImages.length === 1
                        ? 3
                        : index === 0
                        ? 2
                        : 1,
                  };
                  s;
                }
              }
            );

            const inputDate = resolvedLostPetData.data.dateLost
              ? resolvedLostPetData.data.dateLost
              : new Date().toISOString();
            const dateComponents = inputDate.split("T")[0].split("-");
            const year = parseInt(dateComponents[0], 10);
            const month = parseInt(dateComponents[1], 10) - 1;
            const day = parseInt(dateComponents[2], 10);

            const readableLostDate = new Date(
              year,
              month,
              day
            ).toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            return (
              <Paper elevation={3} sx={{ padding: 6, marginBottom: "6rem" }}>
                <Stack spacing={2}>
                  <Box sx={{ width: "90%", margin: "0 auto" }}>
                    {/* <MapboxShowMap coordinates={lostPetData.lastLocation.coordinates}/> */}
                    <Map
                      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
                      initialViewState={{
                        longitude:
                          resolvedLostPetData.data.lastLocation.coordinates[0],
                        latitude:
                          resolvedLostPetData.data.lastLocation.coordinates[1],
                        zoom: 6,
                      }}
                      style={{
                        width: "100%",
                        height: 500,
                        margin: "2rem 0",
                        border: `2px solid ${theme.palette.primary.light}`,
                      }}
                      mapStyle="mapbox://styles/mapbox/streets-v12"
                    >
                      <Marker
                        longitude={
                          resolvedLostPetData.data.lastLocation.coordinates[0]
                        }
                        latitude={
                          resolvedLostPetData.data.lastLocation.coordinates[1]
                        }
                        anchor="bottom"
                        key={resolvedLostPetData.data._id}
                        onClick={(e) => {
                          e.originalEvent.stopPropagation();
                          setPopupInfo(resolvedLostPetData.data);
                        }}
                      >
                        <img src="../../map-marker-2-24.png" />
                      </Marker>
                      {popupInfo && (
                        <Popup
                          anchor="top"
                          longitude={popupInfo.lastLocation.coordinates[0]}
                          latitude={popupInfo.lastLocation.coordinates[1]}
                          onClose={() => setPopupInfo(null)}
                        >
                          <Box>
                            <Typography variant="h4" component="h6">
                              {popupInfo.name}
                            </Typography>
                            {/* <Button variant="contained" sx={{marginY: 1}}>
                <Link style={{textDecoration: 'none', color: 'inherit'}} to={`/lostpets/${popupInfo._id}`}>
                  View Pet's Page
                </Link>
              </Button> */}
                            <img
                              src={popupInfo.lostPetImages[0].path}
                              width="100%"
                              height="120px"
                            />
                          </Box>
                        </Popup>
                      )}
                    </Map>
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
                        {resolvedLostPetData.data.name}{" "}
                        <span style={{ color: "grey" }}>|</span> Age:{" "}
                        {resolvedLostPetData.data.age}{" "}
                        <span style={{ color: "grey" }}>|</span> Last Seen:{" "}
                        {readableLostDate}
                      </Typography>
                    </Box>
                    <SimpleAccordion lostPetData={resolvedLostPetData.data} />
                    {token &&
                      token.userId &&
                      token.userId === resolvedLostPetData.data.owner._id && (
                        <Box sx={{ marginBottom: 5, marginTop: 10 }}>
                          <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Button variant="contained" color="warning">
                              <Link
                                to="edit"
                                style={{
                                  color: "inherit",
                                  textDecoration: "none",
                                }}
                              >
                                Edit
                              </Link>
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={startDeleteHandler}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </Box>
                      )}
                  </Box>
                </Stack>
              </Paper>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
};

export default ShowPage;

// const loadLostPet = async (id) => {
//   try {
//     const response = await lostPetInstance.get(`/lostpets/${id}`);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.log(error.response);
//     return error;
//   }
// };

export const loader = async ({ request, params }) => {
  const lostPetId = params.lostPetId;

  // try {
  const lostPetDataPromise = lostPetInstance.get(`/lostpets/${lostPetId}`);

  console.log(lostPetDataPromise);

  return defer({
    resolvedLostPetData: lostPetDataPromise,
  });
  // } catch (error) {
  //   console.log(error);
  //   throw json(
  //     {
  //       message:
  //         error.response.data?.error?.message || "Error loading lost pet data",
  //     },
  //     { status: error.response.status || 500 }
  //   );
  // }

  // try {

  //   const response = await lostPetInstance.get(`/lostpets/${lostPetId}`);
  //   // return response.data;

  //   return defer({
  //     resolvedLostPetData: response,
  //   });
  // } catch (error) {
  //   console.log(error.response);
  //   throw json(
  //     { message: error.response?.data?.error?.message || "Error loading lost pet data" },
  //     { status: error.response?.status || 500 }
  //   );
  // }
};

export const action = async ({ request, params }) => {
  const lostPetId = params.lostPetId;

  const token = getToken();

  try {
    const response = await lostPetInstance.delete(
      `/lostpets/${lostPetId}/delete`,
      {
        headers: {
          Authorization: "Bearer " + token.token,
        },
      }
    );

    if (response.status === 201) {
      return redirect("/lostpets");
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
