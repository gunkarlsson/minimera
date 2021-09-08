import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function ForgotPassword() {
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
      <section>
        <button onClick={() => history.goBack()}>Go back</button>
        <h2>Password Reset</h2>
        {error && <div>{error}</div>}
        {message && <div>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <input type="email" placeholder="Email" ref={emailRef} required />
          </div>

          <button disabled={loading} type="submit">
            Reset Password
          </button>
        </form>
      </section>
    </>
  );
}
