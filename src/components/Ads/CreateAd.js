import React, { useState } from "react";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/AuthContext";
import { useCurrentUserInfo } from "../../hooks/useCurrentUserInfo";
import { useHistory } from "react-router";
import {
  Typography,
  Button,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export const CreateAd = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { currentUser } = useAuth();
  const currentUserInfo = useCurrentUserInfo();

  const classes = useStyles();
  const history = useHistory();
  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [category, setCategory] = useState("övrigt");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAd = {
      title,
      desc,
      id: uuidv4(),
      category,
      userId: currentUser.uid,
      userEmail: currentUser.email,
      userName: currentUserInfo.name,
      area: currentUserInfo.area,
    };

    db.collection("allAds").doc(newAd.id).set(newAd);
    setTitle("");
    setDesc("");
    history.push("/");
  };

  // const createAd = () => {
  //   const newAd = {
  //     title,
  //     desc,
  //     id: uuidv4(),
  //     userId: currentUser.uid,
  //     userEmail: currentUser.email,
  //     userName: currentUserInfo.name,
  //     area: currentUserInfo.area,
  //   };

  //   db.collection("allAds").doc(newAd.id).set(newAd);
  // };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Lägg till ny annons
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Rubrik"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDesc(e.target.value)}
          className={classes.field}
          label="Beskrivning"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={descError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Kategori</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
          type="submit"
          color="secondary"
          variant="contained"
          disableElevation
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};
