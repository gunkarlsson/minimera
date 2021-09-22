import React, { useState } from "react";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/AuthContext";
import { PrimarySection, AdForm } from "../../style/StyledComponents";
import useCurrentUserInfo from "../../hooks/useCurrentUserInfo";

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
} from "@material-ui/core";
import { ButtonGroup } from "@material-ui/core/";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import { makeStyles } from "@material-ui/core/";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

const CreateAd = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { currentUser } = useAuth();
  const currentUserInfo = useCurrentUserInfo();

  const classes = useStyles();
  const history = useHistory();
  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [category, setCategory] = useState("todos");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAd = {
      title,
      desc,
      id: uuidv4(),
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
      <Typography component="h1" variant="h6" gutterBottom>
        Create Ad
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDesc(e.target.value)}
          className={classes.field}
          label="Description"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={descError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Category</FormLabel>
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
          endIcon={<KeyboardArrowRightRoundedIcon />}
          disableElevation
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default CreateAd;
