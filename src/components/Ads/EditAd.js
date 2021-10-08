import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/AuthContext";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import { useParams, useHistory } from "react-router-dom";
import { useCurrentUserInfo } from "../../hooks/useCurrentUserInfo";

export const EditAd = ({ ad }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { currentUser } = useAuth();
  const currentUserInfo = useCurrentUserInfo();
  let { id } = useParams();
  const [chosenAd, setChosenAd] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  // const getAds = async () => {
  //   setLoading(true);

  //   await db
  //     .collection("allAds")
  //     .doc(id)
  //     .get()
  //     .then((doc) => {
  //       setChosenAd(doc.data());
  //       setLoading(false);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // useEffect(() => {
  //   if (currentUserInfo) {
  //     getAds();
  //   }
  // }, [currentUserInfo]);

  useEffect(() => {
    setLoading(true);
    db.collection("allAds")
      .doc(id)
      .get()
      .then((doc) => {
        setChosenAd(doc.data());
        setLoading(false);
        // console.log(chosenAd.title);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const editAd = () => {
    db.collection("allAds")
      .doc(id)
      .update({ title: title, desc: desc })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Sparat!");
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
        Ändra i annons
      </Typography>
      {/* {chosenAd && <AdCard ad={chosenAd} />} */}
      {loading ? (
        <Typography component="h2" variant="h6">
          Loading...
        </Typography>
      ) : null}
      {chosenAd && (
        <Box sx={{ p: 1 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ marginTop: "10px", marginBottom: "10px" }}
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={chosenAd.title}
              variant="outlined"
              color="secondary"
              fullWidth
              required
              inputProps={{ maxLength: 30 }}
            />
            <TextField
              sx={{ marginTop: "10px", marginBottom: "10px" }}
              onChange={(e) => setDesc(e.target.value)}
              defaultValue={chosenAd.desc}
              variant="outlined"
              color="secondary"
              multiline
              rows={10}
              fullWidth
              required
              inputProps={{ maxLength: 400 }}
            />
            <Button
              sx={{ width: "100%", my: "50px" }}
              variant="outlined"
              onClick={() => editAd({ title, desc, id: uuidv4() })}
              type="submit"
            >
              Spara ändringar
            </Button>
          </form>
        </Box>
      )}
      <Typography>{message ? "Sparat" : null}</Typography>
    </Container>
  );
};
