import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import { NotificationItem } from "./NotificationItem";
import { styled } from "@mui/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
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

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const goToMyAccount = () => {
    window.location.href = "/account";
  };
  return (
    <Grid container direction="row" justifyContent="flex-end">
      <Grid item>
        <Box p={1} pr={2}>
          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </StyledBadge>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                transform: "translateX(-20px) translateY(0px)",
              },
            }}
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <NotificationItem item={item} />
            ))}
          </Menu>
          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://miro.medium.com/max/720/1*TLSXdYk_2zXW3BEBMzKdjg.png"
            />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                transform: "translateX(-20px) translateY(0px)",
              },
            }}
          >
            <MenuItem onClick={goToMyAccount}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Navbar;
