import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useCurrentUserInfo } from "../hooks/useCurrentUserInfo";
import { AdCard } from "./Ads/AdCard";
import { Typography, Container } from "@mui/material";

export const Home = () => {
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
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Annonser i {currentUserInfo?.area}
      </Typography>

      {loading ? <h1>Loading...</h1> : null}

      {ads.map((ad) => (
        <div className="ad" key={ad.id}>
          <AdCard ad={ad} />
        </div>
      ))}
    </Container>
  );
};
