import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/AuthContext";
import { PrimarySection, AdForm } from "../../style/StyledComponents";

const EditAd = () => {
  const [ads, setAds] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  const currentUserId = currentUser ? currentUser.uid : null;
  const [myAds, setMyAds] = useState([]);

  // useEffect(() => {
  //   db.collection("users")
  //     .doc(currentUser.uid)
  //     .collection("myAds")
  //     .get()
  //     //this is async, so it returns a promise
  //     .then((snapshot) => {
  //       let documents = [];
  //       snapshot.docs.forEach((doc) => {
  //         documents.push(doc.data());
  //       });
  //       setMyAds(documents);
  //     });
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, desc);
    setTitle("");
    setDesc("");
  };
  //TUTORIAL WAY: BETTER PERFORMANCE + INSTANT UPDATE
  const ref = db.collection("allAds");

  const getAds = () => {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setMyAds(items);
      setLoading(false);
      console.log(currentUser.email, currentUser.name);
    });
  };

  useEffect(() => {
    getAds();
  }, []);

  const deleteAd = (ad) => {
    ref
      .doc(ad.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  };

  const editAd = (updatedAd) => {
    setLoading();
    ref
      .doc(updatedAd.id)
      .update(updatedAd)
      //could as well use set()
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <PrimarySection>
      <h1>My Ads</h1>
      <AdForm onSubmit={handleSubmit}>
        <h3>Edit ads</h3>
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
        <button onClick={() => editAd({ title, desc, id: uuidv4() })}>
          Submit
        </button>
      </AdForm>

      {loading ? <h1>Loading...</h1> : null}

      {myAds.map((ad) => (
        <div className="ad" key={ad.id}>
          <h2>{ad.title}</h2>
          <p>{ad.desc}</p>
          <div>
            <button onClick={() => deleteAd(ad)}>X</button>
            <button
              onClick={() => editAd({ title: ad.title, desc, id: ad.id })}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </PrimarySection>
  );
};

export default EditAd;
