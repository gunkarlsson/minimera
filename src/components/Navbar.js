import React from "react";
import { NavLink } from "react-router-dom";
import {
  makeStyles,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core/";
import {
  AddCircleOutlineOutlined,
  InfoOutlined,
  PersonOutlined,
  HomeOutlined,
} from "@material-ui/icons";

const useStyles = makeStyles({
  stickToBottom: {
    zIndex: 1,
    borderTop: "1px solid black",
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});

const Navbar = () => {
  const classes = useStyles();

  return (
    <>
      <BottomNavigation className={classes.stickToBottom} showLabels>
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
          icon={<PersonOutlined />}
        />
      </BottomNavigation>
    </>
  );
};

export default Navbar;
