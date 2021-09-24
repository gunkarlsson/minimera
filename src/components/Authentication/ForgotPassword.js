import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Button,
  Container,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

export const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <>
      <Container>
        <Button variant="outlined" onClick={() => history.goBack()}>
          Go back
        </Button>
        <Typography variant="h4" align="center" gutterBottom>
          Password Reset
        </Typography>
        {error && <div>{error}</div>}
        {message && <div>{message}</div>}
        <form onSubmit={handleSubmit}>
          <TextField type="email" placeholder="Email" ref={emailRef} required />

          <Button variant="outlined" disabled={loading} type="submit">
            Reset Password
          </Button>
        </form>
      </Container>
    </>
  );
};
