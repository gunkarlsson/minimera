import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import {
  Typography,
  Button,
  Box,
  Container,
  TextField,
  FormHelperText,
} from "@mui/material";

export const UpdateProfile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    if (password !== passwordConfirm) {
      return setError("Lösenorden matchar ej");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (email !== currentUser.email) {
      //if we've changed the email, we want to add that promise to the array
      //we call the updateEmail-function with our current email, and add this to the array of promises
      //we want to do all the promises before we throw an error
      promises.push(updateEmail(email));
    }
    if (password) {
      promises.push(updatePassword(password));
    }

    Promise.all(promises)
      //we pass in the array of promises,
      //when all the promises finishes and are successful, then history.push will execute
      .then(() => {
        setMessage("Kontot har nu uppdaterats.");
      })
      // .then(() => {
      //   history.push("/");
      // })
      .catch(() => {
        setError(
          "Misslyckades med att uppdatera konto. Pröva att logga ut och in igen."
        );
        //Probably "Credentials are too old, you need to log in again"-error?
        //https://firebase.google.com/docs/reference/js/firebase.User#reauthenticatewithcredential
      })
      //finally runs wheather we succeed or fail
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Container>
      <Button
        sx={{
          color: "text.secondary",
          padding: "15px 0 0 0",
          justifyContent: "flex-start",
        }}
        onClick={() => history.goBack()}
      >
        <KeyboardArrowLeftRoundedIcon fontSize="large" />
      </Button>

      <Typography component="h1" variant="h2">
        Ändra lösenord
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", padding: "10px" }}>
        <Typography
          sx={{
            p: "1px",
            my: "10px",
            fontSize: "1.1em",
            fontStyle: "italic",
          }}
        >
          Email: {currentUser.email}
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          {/* <TextField
            sx={{ mt: "10px", mb: "10px" }}
            onChange={(e) => setEmail(e.target.value)}
            label={currentUser.email}
            variant="outlined"
            color="secondary"
            fullWidth
            aria-label="email input"
          /> */}
          <TextField
            sx={{ mt: "10px" }}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            label="Lösenord"
            variant="outlined"
            color="primary"
            fullWidth
            required
            aria-label="password input"
            id="password-input"
          />
          <FormHelperText id="password-input">
            Lösenordet måste vara minst 6 tecken
          </FormHelperText>
          <TextField
            sx={{ mt: "10px", mb: "5px" }}
            type="password"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            label="Bekräfta lösenord"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            aria-label="password confirmation"
          />
          <Button
            sx={{ width: "100%", mt: "50px" }}
            variant="contained"
            disableElevation
            disabled={loading}
            type="submit"
          >
            Spara ändringar
          </Button>
          {error && (
            <Typography sx={{ my: "15px" }} color="error">
              {error}
            </Typography>
          )}
          {message && (
            <Typography sx={{ my: "15px" }} color="success">
              {message}
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
};
