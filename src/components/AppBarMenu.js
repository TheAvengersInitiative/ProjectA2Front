import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import React, { useEffect } from "react";
import { AccountCircle } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useHistory, withRouter } from "react-router-dom";
import styled from "styled-components";

const IconBack = styled(ArrowBackIosNewIcon)`
  cursor: pointer;
`;

const AppBarMenu = ({ location }) => {
  const { isLoggedIn, logOut } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  let history = useHistory();

  const handleLogOut = () => {
    logOut();
    handleClose();
    window.location.replace("/login");
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            direction="row"
          >
            <Grid item container alignItems="center" direction="row" xs={2}>
              {location.pathname !== "/" && location.pathname !== "/login" && (
                <Grid item alignItems="center">
                  <IconBack
                    onClick={history.goBack}
                    style={{ marginRight: "20px" }}
                  />
                </Grid>
              )}
              <Grid item>
                <Link href="/" color={"inherit"} underline={"none"}>
                  <Typography variant="h6">A2</Typography>
                </Link>
              </Grid>
            </Grid>
            <Grid item>
              {isLoggedIn && (
                <div>
                  <IconButton onClick={handleMenu} color="inherit">
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <Link href="/profile" color={"inherit"} underline={"none"}>
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                    </Link>
                    <Link
                      href="/my-projects"
                      color={"inherit"}
                      underline={"none"}
                    >
                      <MenuItem onClick={handleClose}>My Projects</MenuItem>
                    </Link>
                    <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                  </Menu>
                </div>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default withRouter(AppBarMenu);
