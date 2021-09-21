import React, { useState } from "react";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/AuthContext";
import { PrimarySection, AdForm } from "../../style/StyledComponents";

const CreateAd = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const { currentUser } = useAuth();
  const currentUserId = currentUser ? currentUser.uid : null;
  const authorEmail = currentUser ? currentUser.email : "unknown";

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitle("");
    setDesc("");
  };
  //TUTORIAL WAY: BETTER PERFORMANCE + INSTANT UPDATE
  const ref = db.collection("allAds");

  const createAd = () => {
    const newAd = {
      title,
      desc,
      id: uuidv4(),
      userId: currentUserId,
      authorEmail: authorEmail,
    };

    ref
      .doc(newAd.id)
      // .doc(); use this is for some reason you want firebase to create the id
      .set(newAd)
      .catch((err) => {
        console.error(err);
      });
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
