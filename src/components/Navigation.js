import { NavLink } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { Navbar } from "../style/StyledComponents";
import { AiFillHome, AiFillPlusCircle } from "react-icons/ai";
import { BsPersonFill, BsInfoSquareFill } from "react-icons/bs";
import React from "react";
import {
  makeStyles,
  Avatar,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core/";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      //   padding: theme.spacing(3),
      //spacing takes the base spacing (8px) * 3 = 24 px
    },
    drawer: {
      width: "100%",
    },
    drawerPaper: {
      width: "100%",
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },
  };
});

const Navigation = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create",
    },
  ];

  return (
    <Navbar>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => history.push(item.path)}
            className={location.pathname == item.path ? classes.active : null}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <ul>
        <li>
          <NavLink
            to={ROUTES.HOME}
            className="nav-tab"
            activeClassName="nav-tab-active"
          >
            <AiFillHome size="2em" title="home" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTES.CREATE_AD}
            className="nav-tab"
            activeClassName="nav-tab-active"
          >
            <AiFillPlusCircle size="2em" title="home" />
          </NavLink>
        </li>

        <li>
          <NavLink
            to={ROUTES.PROFILE}
            className="nav-tab"
            activeClassName="nav-tab-active"
          >
            <BsPersonFill size="2em" title="profile" />
          </NavLink>
        </li>

        <li>
          <NavLink
            to={ROUTES.ABOUT}
            className="nav-tab"
            activeClassName="nav-tab-active"
          >
            <BsInfoSquareFill size="1.8em" title="profile" />
          </NavLink>
        </li>
      </ul>
    </Navbar>
  );
};

export default Navigation;
