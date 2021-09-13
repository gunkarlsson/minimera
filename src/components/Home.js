import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

import { PrimarySection, AdForm } from "../style/StyledComponents";

const Home = () => {
  const [ads, setAds] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

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
    });
  };

  useEffect(() => {
    getAds();
  }, []);

  const addAd = (newAd) => {
    ref
      // .doc(); use this is for some reason you want firebase to create the id
      .doc(newAd.id)
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

  //MY OLD WAY WITH GET()
  // useEffect(() => {
  //   setLoading(true);
  //   db.collection("group1")
  //     .get()
  //     //this is async, so it returns a promise
  //     .then((snapshot) => {
  //       let documents = [];
  //       snapshot.docs.forEach((doc) => {
  //         documents.push(doc.data());
  //       });
  //       setAds(documents);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <PrimarySection>
      <h1>Group 1: Ads</h1>
      <AdForm>
        <h3>Add new</h3>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
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

export default Home;
