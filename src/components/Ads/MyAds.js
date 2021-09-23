import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import AdCard from "./AdCard";
import { Button, Container, Typography } from "@material-ui/core";

const MyAds = () => {
  const [myAds, setMyAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

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
      <Typography component="h1">My Ads</Typography>

      {loading ? <h1>Loading...</h1> : null}

      {myAds.map((ad) => (
        <div className="ad" key={ad.id}>
          <AdCard ad={ad} deleteAd={deleteAd} />
        </div>
      ))}
      {/* {myAds.map((ad) => (
        <div className="ad" key={ad.id}>
          <h2>{ad.title}</h2>
          <p>{ad.desc}</p>
          <div>
            <button onClick={() => deleteAd(ad)}>X</button>
            <button>Edit (no onClick)</button>
          </div>
        </div>
      ))} */}
    </Container>
  );
};

export default MyAds;
