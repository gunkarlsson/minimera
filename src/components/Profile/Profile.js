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
import useCurrentUserInfo from "../../hooks/useCurrentUserInfo";

const Settings = () => {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();
  const { currentUser } = useAuth();
  const currentUserInfo = useCurrentUserInfo();

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
      <h3>email: {currentUser.email}</h3>
      <h3>userId: {currentUser.uid}</h3>
      <h3>name: {currentUserInfo?.name}</h3>
      <PrimaryLink>
        <Link to={ROUTES.UPDATE_PROFILE}>Update password or email</Link>
      </PrimaryLink>
      <PrimaryLink>
        <Link to={ROUTES.MY_ADS}>My Ads</Link>
      </PrimaryLink>
      {error && <div>{error}</div>}
      <PrimaryButton
        onClick={() => {
          const confirmBox = window.confirm("Do you really want to log out?");
          if (confirmBox === true) {
            handleLogout();
          }
        }}
      >
        Log out
      </PrimaryButton>
    </PrimarySection>
  );
};

export default Settings;
