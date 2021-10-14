import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { AdCard } from "./AdCard";
import { Button, Container, Typography } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";

export const MyAds = () => {
  const [myAds, setMyAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const history = useHistory();
  const [isUnmounting, setIsUnmounting] = useState(false);

  const getAds = () => {
    setLoading(true);
    db.collection("allAds")
      .where("userId", "==", currentUser.uid)
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setMyAds(items);
        // setLoading(false);
        if (!isUnmounting) {
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    getAds();
    return () => {
      setIsUnmounting(true);
    };
  }, []);

  const deleteAd = (ad) => {
    db.collection("allAds")
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
        <KeyboardArrowLeftRoundedIcon fontSize="large" />
      </Button>
      <Typography component="h1" variant="h2">
        Mina annonser
      </Typography>

      {loading ? (
        <Typography component="h2" variant="h6">
          Loading...
        </Typography>
      ) : null}

      {myAds.map((ad) => (
        <div key={ad.id}>
          <AdCard
            ad={ad}
            deleteAd={deleteAd}
            editAd={"/edit-ad/" + ad.id}
            noWrap
          />
        </div>
      ))}
    </Container>
  );
};
