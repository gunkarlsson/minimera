import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/AuthContext";
import { PrimarySection, AdForm } from "../../style/StyledComponents";

const MyAds = () => {
  const [myAds, setMyAds] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  const currentUserId = currentUser ? currentUser.uid : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitle("");
    setDesc("");
  };

  //TUTORIAL WAY: BETTER PERFORMANCE + INSTANT UPDATE

  // db.collection("allAds")
  //   .where("userId", "==", "7xtCQXwFR3OfRQYGHECYxIJfkN02")
  //   .get()
  //   .then(function (querySnapshot) {
  //     querySnapshot.forEach(function (doc) {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, " => ", doc.data());
  //     });
  //   })
  //   .catch(function (error) {
  //     console.log("Error getting documents: ", error);
  //   });

  const ref = db.collection("allAds");

  const getAds = () => {
    setLoading(true);
    ref.where("userId", "==", currentUserId).onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setMyAds(items);
      setLoading(false);
      console.log(currentUserId, myAds);
    });
  };

  // const getAds = () => {
  //   setLoading(true);
  //   ref.onSnapshot((querySnapshot) => {
  //     const items = [];
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data());
  //     });
  //     setMyAds(items);
  //     setLoading(false);
  //     console.log(currentUser.email, currentUser.name);
  //   });
  // };

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

export default MyAds;

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
