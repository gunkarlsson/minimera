import React, { useState } from "react";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/AuthContext";
import { PrimarySection, AdForm } from "../../style/StyledComponents";
import useCurrentUserInfo from "../../hooks/useCurrentUserInfo";

const CreateAd = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { currentUser } = useAuth();
  const currentUserInfo = useCurrentUserInfo();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitle("");
    setDesc("");
  };

  const createAd = () => {
    const newAd = {
      title,
      desc,
      id: uuidv4(),
      userId: currentUser.uid,
      userEmail: currentUser.email,
      userName: currentUserInfo.name,
      area: currentUserInfo.area,
    };

    db.collection("allAds").doc(newAd.id).set(newAd);
  };

  return (
    <PrimarySection>
      <h1>Create Ad</h1>
      <AdForm onSubmit={handleSubmit}>
        <h3>Add new</h3>
        <input
          required
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          required
          value={desc}
          placeholder="Description"
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={() => createAd()}>Submit</button>
      </AdForm>
    </PrimarySection>
  );
};

export default CreateAd;
