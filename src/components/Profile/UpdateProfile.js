import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import {
  Typography,
  Button,
  Container,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

export const UpdateProfile = () => {
  const emailRef = useRef();
  const [newEmail, setNewEmail] = useState();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      //if we've changed the email, we want to add that promise to the array
      //we call the updateEmail-function with our current email, and add this to the array of promises
      //we want to do all the promises before we throw an error
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      //we pass in the array of promises,
      //when all the promises finishes and are successful, then history.push will execute
      .then(() => {
        setMessage("Profile was successfully updated.");
      })
      //   .then(() => {
      //     history.push("/");
      //   })
      .catch(() => {
        setError("Failed to update account. Try logging out and in again");
        //Probably "Credentials are too old, you need to log in again"-error?
        //https://firebase.google.com/docs/reference/js/firebase.User#reauthenticatewithcredential
      })
      //finally runs wheather we succeed or fail
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Container>
        <Button
          sx={{
            color: "text.secondary",
            padding: "15px 0 0 0",
            justifyContent: "flex-start",
          }}
          onClick={() => history.goBack()}
        >
          <FaAngleLeft size="2em" title="back" />
        </Button>

        <Typography variant="h2">Uppdatera profil</Typography>

        {error && <div>{error}</div>}
        {message && <div>{message}</div>}

        <form autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <input type="email" ref={emailRef} required />
            <label>
              <span>{currentUser.email}</span>
            </label>
          </div>

          {/* <TextField
            inputRef={emailRef}
            label="Email"
            variant="standard"
            color="secondary"
            // defaultValue={currentUser.email}
            fullWidth
            required
          /> */}

          <div>
            <input type="password" ref={passwordRef} required />
            <label>
              <span>Lösenord</span>
            </label>
          </div>
          <div>
            <input type="password" ref={passwordConfirmRef} required />
            <label>
              <span>Bekräfta lösenord</span>
            </label>
          </div>

          <Button variant="contained" disabled={loading} type="submit">
            Spara ändringar
          </Button>
        </form>
      </Container>
    </>
  );
};
