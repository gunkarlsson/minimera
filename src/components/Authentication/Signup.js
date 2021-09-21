import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { PrimarySection } from "../../style/StyledComponents";
import { db } from "../../firebase";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [name, setName] = useState();
  const [area, setArea] = useState("north");
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
      <PrimarySection>
        <h1>minimera</h1>
        <h2>Sign Up</h2>
        {error && <div>{error}</div>}
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
              <option value="north">Norr</option>
              <option value="east">Östra</option>
              <option value="west">Västra</option>
              <option value="south">Söder</option>
              <option value="center">Centrum</option>
            </select>
            {/* <select ref={areaRef} required>
              <option value="north">Norr</option>
              <option value="east">Östra</option>
              <option value="west">Västra</option>
              <option value="south">Söder</option>
              <option value="center">Centrum</option>
            </select> */}
          </div>
          <button disabled={loading} type="submit">
            Sign Up
          </button>
          <Link to="/login"> Already have an account? Login</Link>
        </form>
      </PrimarySection>
    </>
  );
}
