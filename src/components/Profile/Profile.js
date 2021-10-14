import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { useCurrentUserInfo } from "../../hooks/useCurrentUserInfo";
import { Box, Button, Container, Typography } from "@mui/material";
import smiley from "../../img/smiley.svg";
import { AlertDialog } from "../AlertDialog";

export const Profile = () => {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();
  const currentUserInfo = useCurrentUserInfo();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/");
    } catch (e) {
      setError("Misslyckades med att logga ut");
    }
  }

  return (
    <Container>
      <Typography variant="h1" mb="0">
        {currentUserInfo?.name}'s profil
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", padding: "10px" }}>
        <img
          style={{
            display: "block",
            marginTop: "30px",
            ml: "auto",
            mr: "auto",
            marginBottom: "30px",
            height: "150px",
          }}
          src={smiley}
          alt="profile-pic-smiley"
        />
        {/* ^ borde vara en template string literal för att bli conditional rendered */}
        {/* <Button
          variant="contained"
          disableElevation
          sx={{
            mt: "50px",
            mb: "10px",
            textTransform: "none",
            fontSize: "1em",
          }}
        >
          <Link style={{ textDecoration: "none" }} to={ROUTES.UPDATE_PROFILE}>
            Ändra email eller lösenord
          </Link>
        </Button> */}
        <Button
          variant="contained"
          disableElevation
          sx={{
            mt: "10px",
            mb: "10px",
            textTransform: "none",
            fontSize: "1em",
          }}
        >
          <Link style={{ textDecoration: "none" }} to={ROUTES.MY_ADS}>
            Mina annonser
          </Link>
        </Button>
        {error && <div>{error}</div>}

        {/* <Button
          sx={{ mt: "200px", border: "1px solid" }}
          variant="outlined"
          onClick={handleClickOpen}
          onClick={() => <AlertDialog handleLogout={handleLogout} />}
          disableElevation
        >
          {title}
        </Button> */}
        <AlertDialog handleLogout={handleLogout} title={"Logga ut"} />
      </Box>
    </Container>
  );
};
