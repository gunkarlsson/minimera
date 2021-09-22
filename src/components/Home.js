import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { PrimarySection } from "../style/StyledComponents";
import useCurrentUserInfo from "../hooks/useCurrentUserInfo";

const Home = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUserInfo = useCurrentUserInfo();

  const getAds = async () => {
    setLoading(true);

    await db
      .collection("allAds")
      .where("area", "==", currentUserInfo.area)
      .get()
      .then((snapshot) => {
        let gottenAds = [];
        snapshot.forEach((doc) => {
          gottenAds.push(doc.data());
        });
        setAds(gottenAds);
      });

    setLoading(false);
  };

  useEffect(() => {
    if (currentUserInfo) {
      getAds();
    }
  }, [currentUserInfo]);

  return (
    <PrimarySection>
      <h1>All Ads</h1>

      {loading ? <h1>Loading...</h1> : null}

      {ads.map((ad) => (
        <div className="ad" key={ad.title}>
          <h3>title: {ad.title}</h3>
          <p>{ad.desc}</p>
          <p>{ad.area}</p>
          <p>{ad.userName}</p>
          <p>{ad.userEmail}</p>
        </div>
      ))}
    </PrimarySection>
  );
};

export default Home;
