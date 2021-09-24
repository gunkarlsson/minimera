import React from "react";
import { makeStyles } from "@mui/styles";
import { Navbar } from "../components/Navbar";

const useStyles = makeStyles(() => {
  return {
    root: {
      display: "flex",
      border: "1px solid red",
    },
    page: {
      background: "#f9f9f9",
      width: "100%",
      height: "calc(100vh - 60px)",
      border: "1px solid blue",
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
