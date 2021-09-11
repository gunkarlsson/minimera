import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import {
  PrimarySection,
  PrimaryLink,
  PrimaryH1,
  PrimaryButton,
} from "../../style/StyledComponents";

const Settings = () => {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <PrimarySection>
      {" "}
      <PrimaryH1>Settings</PrimaryH1>
      <PrimaryLink>
        <Link to={ROUTES.UPDATE_PROFILE}>Update password or email</Link>
      </PrimaryLink>
      <PrimaryLink>
        <Link to={ROUTES.MY_ADS}>My Ads</Link>
      </PrimaryLink>
      {error && <div>{error}</div>}
      <PrimaryButton onClick={handleLogout}>Log Out</PrimaryButton>
    </PrimarySection>
  );
};

export default Settings;
