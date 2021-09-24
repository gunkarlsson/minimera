import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { useCurrentUserInfo } from "../../hooks/useCurrentUserInfo";
import { Button, Container, Typography } from "@mui/material";

export const Profile = () => {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();
  const { currentUser } = useAuth();
  const currentUserInfo = useCurrentUserInfo();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <Container>
      <Typography component="h1">{currentUserInfo?.name}'s profil</Typography>
      {/* ^ borde vara en template string literal för att bli conditional rendered */}
      <Typography component="h3">email: {currentUser.email}</Typography>
      <Typography component="h3">userId: {currentUser.uid}</Typography>

      <Link to={ROUTES.UPDATE_PROFILE}>Uppdatera email eller lösenord</Link>

      <Link to={ROUTES.MY_ADS}>Mina annonser</Link>

      {error && <div>{error}</div>}
      <Button
        variant="outlined"
        onClick={() => {
          const confirmBox = window.confirm("Do you really want to log out?");
          if (confirmBox === true) {
            handleLogout();
          }
        }}
      >
        Log out
      </Button>
    </Container>
  );
};
