import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";

import React, { useContext, useEffect } from "react";
import { AccountCircle } from "@mui/icons-material";
import { AuthContext } from "../contexts/AuthContext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useHistory, withRouter } from "react-router-dom";
import styled from "styled-components";
import { NotificationItem } from "./NotificationItem";
import NotificationsIcon from "@mui/icons-material/Notifications";

const IconBack = styled(ArrowBackIosNewIcon)`
  cursor: pointer;
`;

const StyledBadge = styled(Badge)((props) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#ffa700",
    color: "#ffa700",
    boxShadow: `0 0 0 1px #ffa700`,
    display: `${props.show ? "block" : "none"}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const MenuNotification = styled(Menu)`
  max-height: 450px !important;
`;

const AvatarStyled = styled(Avatar)`
  width: 30px;
  height: 30px;
  background-color: #1976d2;
  &:hover {
    background-color: #2686e3;
    cursor: pointer;
  }
`;

const ViewAll = styled.a`
  width: 100%;
  height: 30px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const Logo = styled.img`
  height: 35px;
`;

const Login = styled.a`
  text-decoration: none;
  color: white !important;
  font-size: 20px;
  font-weight: 500;
`;

const AppBarMenu = ({ location }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationModal, setNotificationModal] = React.useState(null);
  const [notificationList, setNotificationList] = React.useState([]);
  const { isLoggedIn, logOut, notification } = useContext(AuthContext);

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

  const handleOpenNotification = (event) => {
    setNotificationModal(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setNotificationModal(null);
  };

  useEffect(() => {
    console.log(notificationList);
  }, [notificationList]);

  useEffect(() => {
    console.log(location);
  }, [location]);

  useEffect(() => {
    setNotificationList(notification);
  }, [notification]);

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
                  <Logo src="https://cdn.discordapp.com/attachments/411201278031560708/906627245081260032/logo.png" />
                </Link>
              </Grid>
            </Grid>
            <Grid item>
              {isLoggedIn ? (
                <div>
                  <Button
                    id="basic-notification"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={notificationModal ? "true" : undefined}
                    onClick={handleOpenNotification}
                  >
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                      show={notificationList?.length > 0}
                    >
                      <AvatarStyled>
                        <NotificationsIcon />
                      </AvatarStyled>
                    </StyledBadge>
                  </Button>
                  {notificationList?.length > 0 && (
                    <MenuNotification
                      id="basic-notification"
                      anchorEl={notificationModal}
                      open={notificationModal}
                      onClose={handleCloseNotification}
                      PaperProps={{
                        style: {
                          transform: "translateX(-90px) translateY(0px)",
                        },
                      }}
                    >
                      {notificationList?.length > 0 &&
                        notificationList?.map((item) => (
                          <NotificationItem
                            setNotification={setNotificationModal}
                            key={item}
                            item={item}
                          />
                        ))}

                      <ViewAll href="/notifications">View all</ViewAll>
                    </MenuNotification>
                  )}

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
              ) : (
                location.pathname !== "/login" && (
                  <div>
                    <Login href="/login">Login</Login>
                  </div>
                )
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default withRouter(AppBarMenu);
