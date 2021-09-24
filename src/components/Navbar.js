import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlinedIcon";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlinedIcon";
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlinedIcon";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlinedIcon";
import {
  AddCircleOutlineOutlined,
  InfoOutlined,
  PersonOutlineOutlined,
  HomeOutlined,
} from "@material-ui/icons";

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
          icon={<HomeOutlined />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/create-ad"
          label="Ny annons"
          icon={<AddCircleOutlineOutlined />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/about"
          label="Om"
          icon={<InfoOutlined />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/profile"
          label="Profil"
          icon={<PersonOutlineOutlined />}
        />
      </BottomNavigation>
    </>
  );
};
