import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

import classes from "./LostPetIndexCard.module.css";

const LostPetIndexCard = (props) => {
  const inputDate = props.dateLost ? props.dateLost : new Date().toISOString();
  const dateComponents = inputDate.split('T')[0].split('-');
  const year = parseInt(dateComponents[0], 10);
  const month = parseInt(dateComponents[1], 10) - 1;
  const day = parseInt(dateComponents[2], 10);

  const readableLostDate = new Date(year, month, day).toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })



  return (
    <Paper elevation={3} sx={{marginBottom: 5, padding: 2}}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box sx={{width: "250px", marginLeft: 3,}}>
            <img src={props.lostPetImg || 'https://images.unsplash.com/photo-1554226983-8a81adeda0c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'} alt={props.lostPetName} className={classes['index-img']}/>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box>
            <Box>
              <Typography variant="h4" component="h4">
                Pet Name: {props.lostPetName}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" component="h5">
                Date Lost: {readableLostDate}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" component="h5">
                Last Seen: {props.lostPetLastLocationAddress}
              </Typography>
            </Box>
            {/* <Box>
              <Typography variant="body1" component="h6">
                Description: {props.lostPetDescription}
              </Typography>
            </Box> */}
            <Button variant="contained" sx={{marginTop: 2}}><Link to={`/lostpets/${props.lostPetId}`} style={{ textDecoration: 'none', color: '#fff'}}>View Pet</Link></Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LostPetIndexCard;
