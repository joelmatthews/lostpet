import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { Form, Link } from "react-router-dom";

export default function ButtonAppBar({ token }) {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/lostpets" style={{ textDecoration: 'none', color: 'inherit' }}>Lost Pets</Link>
          </Typography>
          {token ? <Form method="post" action="/logout"><Button color="inherit" type="submit">Logout</Button></Form> : (<><Link to="/" style={{ textDecoration: 'none', color: 'inherit'}}><Button color="inherit">Register</Button></Link><Link to="/login" style={{ textDecoration: 'none', color: 'inherit'}}><Button color="inherit">Login</Button></Link></>)}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
