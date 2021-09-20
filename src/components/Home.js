import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { PrimarySection } from "../style/StyledComponents";

const Home = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  //TUTORIAL WAY: BETTER PERFORMANCE + INSTANT UPDATE
  const ref = db.collection("allAds");

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
      <h1>All Ads</h1>

      {loading ? <h1>Loading...</h1> : null}

      {ads.map((ad) => (
        <div className="ad" key={ad.id}>
          <h3>{ad.title}</h3>
          <p>{ad.desc}</p>
          <p>userId: {ad.userId}</p>
          <p>owner email: {ad.ownerEmail}</p>
        </div>
      ))}
    </PrimarySection>
  );
};

export default Home;
