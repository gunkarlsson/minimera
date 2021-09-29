import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/AuthContext";
import {
  Button,
  Container,
  Typography,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { FaAngleLeft } from "react-icons/fa";
import { useParams, useHistory } from "react-router-dom";

export const EditAd = () => {
  const [myAds, setMyAds] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  // let { id } = useParams();
  const { currentUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitle("");
    setDesc("");
  };

  // const ref = db.collection("allAds");

  // const getAds = () => {
  //   setLoading(true);
  //   ref.where("userId", "==", currentUser.uid).onSnapshot((querySnapshot) => {
  //     const items = [];
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data());
  //     });
  //     setMyAds(items);
  //     setLoading(false);
  //   });
  // };

  // useEffect(() => {
  //   getAds();
  // }, []);

  // useEffect(() => {
  //   db.collection("allAds")
  //     .doc(id)
  //     .get()
  //     .then((doc) => {
  //       console.log(doc.data());
  //     });
  // }, []);

  const deleteAd = (ad) => {
    db.collection("allAds")
      .doc(ad.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  };

  const editAd = (updatedAd) => {
    setLoading();
    db.collection("allAds")
      .doc(updatedAd.id)
      .update(updatedAd)
      //could as well use set()
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

      <Typography variant="h2">Ändra i annons</Typography>

      <form onSubmit={handleSubmit}>
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
      </form>

      {loading ? <h1>Loading...</h1> : null}
      {/* {myAds.map((ad) => (
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
      ))} */}
    </Container>
  );
};
