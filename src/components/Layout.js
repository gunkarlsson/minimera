import React from "react";
import { makeStyles } from "@material-ui/core/";
import { useHistory, useLocation } from "react-router";
import { format } from "date-fns";
import Navbar from "./Navbar";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      height: "calc(100vh - 60px)",
      border: "2px solid orange",
      padding: theme.spacing(2),
      //spacing takes the base spacing (8px) * 3 = 24 px
    },
    root: {
      display: "flex",
      border: "1px solid red",
    },
    title: {
      padding: theme.spacing(2),
      border: "1px solid purple",
    },
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.page}>{children}</div>

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
