import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
} from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import HelpCenterRoundedIcon from "@mui/icons-material/HelpCenterRounded";

export const Navbar = () => {
  const [value, setValue] = useState("hem");
  const matches = useMediaQuery("(min-width:365px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        sx={{
          zIndex: 1,
          borderTop: "1px solid black",
          width: "100%",
          position: "fixed",
          bottom: 0,
          height: "60px",
        }}
        showLabels
      >
        <BottomNavigationAction
          component={NavLink}
          to="/"
          label={matches ? "Hem" : null}
          icon={<HomeRoundedIcon />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/create-ad"
          label={matches ? "Ny Annons" : null}
          icon={<AddCircleRoundedIcon />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/about"
          label={matches ? "Om" : null}
          icon={<HelpCenterRoundedIcon />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/profile"
          label={matches ? "Profil" : null}
          icon={<PersonRoundedIcon />}
        />
      </BottomNavigation>
    </>
  );
};
