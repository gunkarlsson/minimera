import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { AdCard } from "./AdCard";
import { Button, Container, Typography } from "@mui/material";

export const MyAds = () => {
  const [myAds, setMyAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const history = useHistory();

  const ref = db.collection("allAds");

  const getAds = () => {
    setLoading(true);
    ref.where("userId", "==", currentUser.uid).onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setMyAds(items);
      setLoading(false);
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

  return (
    <Container>
      <Button
        sx={{
          color: "text.secondary",
          padding: "15px 0 0 0",
          justifyContent: "flex-start",
        }}
        onClick={() => history.goBack()}
      >
        <FaAngleLeft size="2em" title="back" />
      </Button>
      <Typography variant="h2">Mina annonser</Typography>

      {loading ? <Typography variant="h6">Loading...</Typography> : null}

      {myAds.map((ad) => (
        <div className="ad" key={ad.id}>
          <AdCard ad={ad} deleteAd={deleteAd} editAd />
        </div>
      ))}
    </Container>
  );
};
