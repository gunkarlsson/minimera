import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useCurrentUserInfo } from "../hooks/useCurrentUserInfo";
import { AdCard } from "./Ads/AdCard";
import { Container, Typography } from "@mui/material";

export const Home = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUserInfo = useCurrentUserInfo();
  const [isUnmounting, setIsUnmounting] = useState(false);

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

    if (!isUnmounting) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserInfo) {
      getAds();
    }

    return () => {
      setIsUnmounting(true);
    };
  }, [currentUserInfo]);

  return (
    <Container>
      <Typography component="h1" variant="h1">
        Annonser i {currentUserInfo?.area}
      </Typography>

      {loading ? (
        <Typography component="h2" variant="h2">
          Loading...
        </Typography>
      ) : // <Typography component="h2" variant="h2">
      //   {ads.length < 0 && "Det finns inga annonser i området ännu."}
      // </Typography>

      null}

      {ads.map((ad) => (
        <div key={ad.id}>
          <AdCard ad={ad} link={"/ad-details/" + ad.id} noWrap />
        </div>
      ))}
    </Container>
  );
};
