import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import classes from "./FormSubmissionPending.module.css"

export default function FormSubmissionPending() {
  return (
    <div className={classes.overlay}>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, height: '100vh' }}
      >
        <CircularProgress sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}/>
      </Box>
    </div>
  );
}
