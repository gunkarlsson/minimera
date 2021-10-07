import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { useCurrentUserInfo } from "../../hooks/useCurrentUserInfo";
import { Box, Button, Container, Typography } from "@mui/material";
import smiley from "../../img/smiley.svg";
import { makeStyles } from "@mui/styles";
import { AlertDialog } from "../AlertDialog";

const useStyles = makeStyles({
  box: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  },
  image: {
    display: "block",
    marginTop: "30px",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "30px",
    height: "150px",
  },
  links: {
    textDecoration: "none",
    width: "100%",
    color: "#fff",
  },
});

export const Profile = () => {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();
  const currentUserInfo = useCurrentUserInfo();
  const classes = useStyles();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/");
    } catch {
      setError("Misslyckades med att logga ut");
    }
  }

  return (
    <Container>
      <Typography variant="h1" marginBottom="0">
        {currentUserInfo?.name}'s profil
      </Typography>
      <Box className={classes.box}>
        <img className={classes.image} src={smiley} alt="profile-pic-smiley" />
        {/* ^ borde vara en template string literal för att bli conditional rendered */}
        <Button
          color="secondary"
          variant="contained"
          disableElevation
          sx={{
            marginTop: "50px",
            marginBottom: "10px",
            textTransform: "none",
            fontSize: "1em",
          }}
        >
          <Link className={classes.links} to={ROUTES.UPDATE_PROFILE}>
            Ändra email eller lösenord
          </Link>
        </Button>
        <Button
          color="secondary"
          variant="contained"
          disableElevation
          sx={{
            marginTop: "10px",
            marginBottom: "10px",
            textTransform: "none",
            fontSize: "1em",
          }}
        >
          <Link className={classes.links} to={ROUTES.MY_ADS}>
            Mina annonser
          </Link>
        </Button>
        {error && <div>{error}</div>}
        <Button
          sx={{ marginTop: "200px" }}
          color="secondary"
          variant="outlined"
          disableElevation
          onClick={() => {
            const confirmBox = window.confirm("Do you really want to log out?");
            if (confirmBox === true) {
              handleLogout();
            }
          }}
        >
          Logga ut
        </Button>
        <AlertDialog />
      </Box>
    </Container>
  );
};
