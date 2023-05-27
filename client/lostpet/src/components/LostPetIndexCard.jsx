import { Box, Paper, Typography, Grid } from "@mui/material";

import classes from "./LostPetIndexCard.module.css";

const LostPetIndexCard = (props) => {
  return (
    <Paper>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box sx={{width: "200px"}}>
            <img src={props.lostPetImg} alt={props.lostPetName} className={classes['index-img']}/>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box>
            <Box>
              <Typography variant="h4" component="h4">
                {props.lostPetName}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" component="h5">
                {props.dateLost}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" component="h5">
                {props.lostPetLastLocationAddress}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" component="h6">
                {props.lostPetDescription}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LostPetIndexCard;
