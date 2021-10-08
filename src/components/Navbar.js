import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import HelpCenterRoundedIcon from "@mui/icons-material/HelpCenterRounded";

const useStyles = makeStyles({
  stickToBottom: {
    zIndex: 1,
    borderTop: "1px solid black",
    width: "100%",
    position: "fixed",
    bottom: 0,
    height: "60px",
  },
  active: {
    border: "1px solid red",
  },
});

export const Navbar = () => {
  const classes = useStyles();
  const [value, setValue] = useState("hem");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.stickToBottom}
        showLabels
      >
        <BottomNavigationAction
          component={NavLink}
          to="/"
          label="Hem"
          icon={<HomeRoundedIcon />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/create-ad"
          label="Ny annons"
          icon={<AddCircleRoundedIcon />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/about"
          label="Om"
          icon={<HelpCenterRoundedIcon />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/profile"
          label="Profil"
          icon={<PersonRoundedIcon />}
        />
      </BottomNavigation>
    </>
  );
};
