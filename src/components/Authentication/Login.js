import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Typography, Button, Container, TextField, Box } from "@mui/material";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      setLoading(false);
      history.push("/");
    } catch (e) {
      setError("Misslyckades med inloggning");
    }
  }

  return (
    <Container>
      <Typography variant="h1">Logga in</Typography>
      {error && <div>{error}</div>}
      <Box sx={{ display: "flex", flexDirection: "column", padding: "10px" }}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            sx={{ mt: "10px", mb: "10px" }}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            aria-label="email input"
          />

          <TextField
            sx={{ mt: "10px", mb: "5px" }}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            label="Lösenord"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            aria-label="password input"
          />

          <Typography variant="body2" sx={{ textAlign: "right" }}>
            <Link to="/forgot-password">Glömt lösenord?</Link>{" "}
          </Typography>

          <Button
            sx={{ width: "100%", mt: "100px", mb: "10px" }}
            variant="contained"
            disableElevation
            disabled={loading}
            type="submit"
          >
            Logga in
          </Button>
          <Typography
            variant="body2"
            sx={{
              textAlign: "right",
            }}
          >
            <Link to="/signup">Inte medlem? Skapa konto</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};
