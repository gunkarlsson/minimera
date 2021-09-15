import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/AuthContext";
import { PrimarySection, AdForm } from "../../style/StyledComponents";

const AddNewAd = () => {
  const [ads, setAds] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  const currentUserId = currentUser ? currentUser.uid : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, desc);
    setTitle("");
    setDesc("");
  };
  //TUTORIAL WAY: BETTER PERFORMANCE + INSTANT UPDATE
  const ref = db.collection("group1");

  const getAds = () => {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setAds(items);
      setLoading(false);
      console.log(currentUser.email, currentUser.name);
    });
  };

  useEffect(() => {
    getAds();
  }, []);

  const addAd = (newAd) => {
    // const owner = currentUser ? currentUser.uid : "unknown";
    // const ownerEmail = currentUser ? currentUser.email : "unknown";
    // const newAd = {
    //   title,
    //   desc,
    //   id: uuidv4(),
    //   owner,
    //   ownerEmail,
    // };
    // console.log("owner is: " + owner);
    ref
      .doc(newAd.id)
      // .doc(); use this is for some reason you want firebase to create the id
      .set(newAd)
      .catch((err) => {
        console.error(err);
      });
  };

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
      <h1>Add New Ad</h1>
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
        <button onClick={() => addAd({ title, desc, id: uuidv4() })}>
          Submit
        </button>
      </AdForm>

      {loading ? <h1>Loading...</h1> : null}

      {ads.map((ad) => (
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

export default AddNewAd;

//MY REWRITE OF TUTORIAL WAY
// const getAds = () => {
//   setLoading(true);
//   db.collection("group1").onSnapshot((querySnapshot) => {
//     //querySnapshot = the result of a query
//     const items = [];
//     querySnapshot.forEach((doc) => {
//       //for each document in the querySnapshot, we want to apply the data()-method to it
//       items.push(doc.data());
//       //then put that result into our items array
//     });
//     setAds(items);
//     setLoading(false);
//   });
// };

// useEffect(() => {
//   getAds();
// }, []);

//TUTORIAL WAY 2 WITH GET(), LESS PERFORMANT
// const ref = db.collection("group1");
// function getAds2() {
//   setLoading(true);
//   ref.get()
//   .then((item) => {
//     const items = items.docs.map((doc) => doc.data());
//     setAds(items);
//     setLoading(false);
//   });
// }
// useEffect(() => {
//   // getAds();
//   getAds2();
// }, []);
