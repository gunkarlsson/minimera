import React, { useState } from "react";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/AuthContext";
import { useCurrentUserInfo } from "../../hooks/useCurrentUserInfo";
import { useHistory } from "react-router";
import {
  Typography,
  Button,
  Box,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

export const CreateAd = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { currentUser } = useAuth();
  const currentUserInfo = useCurrentUserInfo();
  const history = useHistory();
  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [category, setCategory] = useState("övrigt");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDescError(false);

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

    if (title === "") {
      setTitleError(true);
    }
    if (desc === "") {
      setDescError(true);
    }
    if (title && desc) {
      db.collection("allAds").doc(newAd.id).set(newAd);
      setTitle("");
      setDesc("");
      setSuccess(true);
    }
  };

  return (
    <Container>
      <Typography variant="h1">Lägg till ny annons</Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", padding: "10px" }}
      >
        <TextField
          sx={{ mt: "10px", mb: "10px" }}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          label="Rubrik"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
          inputProps={{ maxLength: 30 }}
        />
        <TextField
          sx={{ mt: "10px", mb: "20px" }}
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          label="Beskrivning"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={descError}
          inputProps={{ maxLength: 400 }}
        />

        <FormControl>
          <FormLabel>Kategori</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ ml: "5px", mb: "50px" }}
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

        <Button type="submit" variant="contained" disableElevation>
          Skapa annons
        </Button>
      </Box>
      {success && (
        <Typography
          onClick={() => history.push("/")}
          sx={{
            color: "success",
            textAlign: "center",
            p: "10px",
            textDecoration: "underline",
            fontSize: "1.1em",
          }}
        >
          Klart! Klicka här för att gå tillbaka.
        </Typography>
      )}
    </Container>
  );
};
