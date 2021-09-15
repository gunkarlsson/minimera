import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../context/AuthContext";
import { PrimarySection, AdForm } from "../style/StyledComponents";

const Home = () => {
  const [ads, setAds] = useState([]);
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

  return (
    <PrimarySection>
      <h1>Group 1: Ads</h1>

      {loading ? <h1>Loading...</h1> : null}

      {ads.map((ad) => (
        <div className="ad" key={ad.id}>
          <h3>{ad.title}</h3>
          <p>{ad.desc}</p>
        </div>
      ))}
    </PrimarySection>
  );
};

export default Home;
