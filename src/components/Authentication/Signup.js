import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { db } from "../../firebase";
import {
  Typography,
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

export const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [name, setName] = useState();
  const [area, setArea] = useState("norr");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);

      let newUser = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );

      db.collection("users")
        .doc(newUser.user.uid)
        .set({ name, area, email: emailRef.current.value });
      history.push("/");
    } catch {
      setError("Failed to create an account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Container>
        <Typography variant="h1">Sign Up</Typography>

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
            {/* <input type="text" placeholder="Name" ref={nameRef} required /> */}
          </div>
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
          <div>
            <input
              type="password"
              placeholder="Repeat password"
              ref={passwordConfirmRef}
              required
            />
          </div>
          <div>
            <label>Stadsdel i Stockholm:</label>
            <select value={area} onChange={(e) => setArea(e.target.value)}>
              <option value="norr">Norr</option>
              <option value="östra">Östra</option>
              <option value="västra">Västra</option>
              <option value="söder">Söder</option>
              <option value="centrum">Centrum</option>
            </select>
            {/* <select ref={areaRef} required>
              <option value="north">Norr</option>
              <option value="east">Östra</option>
              <option value="west">Västra</option>
              <option value="south">Söder</option>
              <option value="center">Centrum</option>
            </select> */}
          </div>
          <Button variant="outlined" disabled={loading} type="submit">
            Sign Up
          </Button>
          {error && <div className="error">{error}</div>}
          <Link to="/login"> Already have an account? Login</Link>
        </form>
      </Container>
    </>
  );
};
