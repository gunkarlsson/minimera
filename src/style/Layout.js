import React from "react";
import { makeStyles } from "@mui/styles";
import { Navbar } from "../components/Navbar";

const useStyles = makeStyles(() => {
  return {
    root: {
      display: "flex",
      height: "100%",
      background: "#f9f9f9",
    },
    page: {
      width: "100%",
      overflow: "scroll",
      // height: "100vh",
      height: "calc(100vh - 59px)",
      // padding: theme.spacing(2),
      //spacing takes the base spacing (8px) * 3 = 24 px
    },
  };
});

export const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.page}>{children}</div>
    </div>
  );
};
