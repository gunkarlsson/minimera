import React from "react";
import {
  makeStyles,
  Avatar,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Fab,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core/";
import { useHistory, useLocation } from "react-router";
import { format } from "date-fns";
import Navbar from "./Navbar";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      border: "2px solid orange",
      //   padding: theme.spacing(3),
      //spacing takes the base spacing (8px) * 3 = 24 px
    },
    drawer: {
      width: "100%",
      border: "2px solid green",
    },
    drawerPaper: {
      width: "100%",
      border: "2px solid blue",
    },
    root: {
      display: "flex",
      border: "2px solid red",
    },
    activeTab: {
      background: "red",
    },
    title: {
      padding: theme.spacing(2),
      border: "2px solid purple",
    },
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {" "}
      <Navbar />
      {children}
      {/* <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div> */}
      {/*
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="bottom"
        classes={{ paper: classes.drawerPaper }}
      >
      </Drawer> */}
    </div>
  );
};

export default Layout;
