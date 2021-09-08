import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { PrimarySection } from "../../style/StyledComponents";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
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
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <>
      <PrimarySection>
        <h2>Sign Up</h2>
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
          <div>
            <input
              type="password"
              placeholder="Repeat password"
              ref={passwordConfirmRef}
              required
            />
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
