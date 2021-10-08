import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { Typography, Button, Container, TextField, Box } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";

export const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Skickat! Kolla din inkorg för vidare instruktioner");
    } catch {
      setError("Misslyckades med att återställa lösenord");
    }
    setLoading(false);
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
          <KeyboardArrowLeftRoundedIcon fontSize="large" />
        </Button>
        <Typography component="h1" variant="h2">
          Glömt lösenord
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", padding: "10px" }}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              sx={{ mt: "10px" }}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              aria-label="email input"
            />
            <Button
              sx={{ width: "100%", mt: "50px", mb: "10px" }}
              variant="outlined"
              disabled={loading}
              type="submit"
            >
              Återställ lösenord
            </Button>
          </form>
          {error && <Typography variant="body1">{error}</Typography>}
          {message && <Typography variant="body1">{message}</Typography>}
        </Box>
      </Container>
    </>
  );
};
