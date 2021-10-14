import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";

import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
} from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import { useParams, useHistory } from "react-router-dom";

export const EditAd = ({ ad }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  let { id } = useParams();
  const [chosenAd, setChosenAd] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    db.collection("allAds")
      .doc(id)
      .get()
      .then((doc) => {
        setChosenAd(doc.data());
        setTitle(doc.data().title);
        setDesc(doc.data().desc);
        setCategory(doc.data().category);

        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const editAd = () => {
    db.collection("allAds")
      .doc(id)
      .update({ title: title, desc: desc, category: category })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
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
              sx={{ mb: "10px" }}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              color="secondary"
              value={title}
              fullWidth
              required
              inputProps={{ maxLength: 30 }}
            />
            <TextField
              sx={{ mb: "10px" }}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              variant="outlined"
              color="secondary"
              multiline
              rows={8}
              fullWidth
              required
              inputProps={{ maxLength: 400 }}
            />
            <FormControl>
              <RadioGroup
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{ ml: "5px" }}
              >
                <FormControlLabel
                  value="bygg"
                  control={<Radio />}
                  label="Bygg & verktyg"
                />
                <FormControlLabel
                  value="hem"
                  control={<Radio />}
                  label="Hem & trädgård"
                />
                <FormControlLabel
                  value="sport"
                  control={<Radio />}
                  label="Sport & fritid"
                />
                <FormControlLabel
                  value="övrigt"
                  control={<Radio />}
                  label="Övrigt"
                />
              </RadioGroup>
            </FormControl>

            <Button
              sx={{ width: "100%", mt: "20px" }}
              variant="contained"
              disableElevation
              onClick={() => editAd({ title, desc, id: uuidv4() })}
              type="submit"
            >
              Spara ändringar
            </Button>
          </form>
        </Box>
      )}
      {success && (
        <Typography
          onClick={() => history.goBack()}
          sx={{
            color: "success",
            textAlign: "center",
            p: "10px",
            textDecoration: "underline",
          }}
        >
          Sparat! Klicka här för att gå tillbaka.
        </Typography>
      )}
    </Container>
  );
};
