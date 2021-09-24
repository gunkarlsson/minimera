import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import {
  Typography,
  Button,
  Container,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
  }

  return (
    <>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Log In
        </Typography>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <input type="email" placeholder="Email" ref={emailRef} required />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
          </div>
          <Link to="/forgot-password">Forgot Password?</Link>
          <Button variant="outlined" disabled={loading} type="submit">
            Log In
          </Button>
          <Link to="/signup"> Need an account? Sign Up</Link>
        </form>
      </Container>
    </>
  );
};
