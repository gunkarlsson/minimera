import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import {
  BackButton,
  PrimarySection,
  PrimaryButton,
  PrimaryH1,
  UpdateProfileForm,
  FormSection,
  SecondaryH1,
  SubmitButton,
} from "../../style/StyledComponents";
import { FaAngleLeft } from "react-icons/fa";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      //if we've changed the email, we want to add that promise to the array
      //we call the updateEmail-function with our current email, and add this to the array of promises
      //we want to do all the promises before we throw an error
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      //we pass in the array of promises,
      //when all the promises finishes and are successful, then history.push will execute
      .then(() => {
        setMessage("Profile was successfully updated.");
      })
      //   .then(() => {
      //     history.push("/");
      //   })
      .catch(() => {
        setError("Failed to update account. Try logging out and in again");
        //Probably "Credentials are too old, you need to log in again"-error?
        //https://firebase.google.com/docs/reference/js/firebase.User#reauthenticatewithcredential
      })
      //finally runs wheather we succeed or fail
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <PrimarySection>
        <BackButton onClick={() => history.goBack()}>
          <FaAngleLeft size="2em" title="back" />
        </BackButton>

        <SecondaryH1>Update profile</SecondaryH1>

        {error && <div>{error}</div>}
        {message && <div>{message}</div>}
        <FormSection>
          <UpdateProfileForm onSubmit={handleSubmit}>
            <div className="form-control">
              <input type="email" ref={emailRef} required />
              <label>
                <span>{currentUser.email}</span>
              </label>
            </div>

            <div className="form-control">
              <input type="password" ref={passwordRef} required />
              <label>
                <span>Password</span>
              </label>
            </div>
            <div className="form-control">
              <input type="password" ref={passwordConfirmRef} required />
              <label>
                <span>Confirm password</span>
              </label>
            </div>

            <SubmitButton disabled={loading} type="submit">
              Save changes
            </SubmitButton>
          </UpdateProfileForm>
        </FormSection>
      </PrimarySection>
    </>
  );
}
