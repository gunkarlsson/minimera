import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { db } from "../../firebase";
import {
  Typography,
  Button,
  Box,
  Container,
  TextField,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
} from "@mui/material";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState();
  const [area, setArea] = useState("norr");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError("Lösenorden matchar ej");
    }
    try {
      setError("");
      setLoading(true);

      let newUser = await signup(email, password);

      db.collection("users")
        .doc(newUser.user.uid)
        .set({ name, area, email: email });
      history.push("/");
    } catch {
      setError("Misslyckades med att skapa konto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Container>
        <Typography variant="h1">Skapa konto</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", padding: "10px" }}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              sx={{ marginTop: "10px", marginBottom: "10px" }}
              onChange={(e) => setName(e.target.value)}
              label="Namn"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              aria-label="email input"
            />
            <TextField
              sx={{ marginTop: "10px", marginBottom: "10px" }}
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

            <FormControl required sx={{ width: "100%" }}>
              <FormLabel>Stadsdel</FormLabel>
              <Select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                label="Stadsdel"
              >
                <MenuItem value="norr">Norr</MenuItem>
                <MenuItem value="östra">Östra</MenuItem>
                <MenuItem value="västra">Västra</MenuItem>
                <MenuItem value="söder">Söder</MenuItem>
                <MenuItem value="centrum">Centrum</MenuItem>
              </Select>
            </FormControl>

            <Button
              sx={{ width: "100%", mt: "100px", mb: "5px" }}
              variant="contained"
              disableElevation
              disabled={loading}
              type="submit"
            >
              Skapa konto
            </Button>
            {error && <div className="error">{error}</div>}
            <Typography variant="body2" sx={{ textAlign: "right" }}>
              <Link to="/login"> Redan medlem? Logga in</Link>
            </Typography>
          </form>
        </Box>
      </Container>
    </>
  );
};
