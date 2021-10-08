import React, { useState, useEffect } from "react";
import { AdCard } from "./AdCard";
import { useParams, useHistory } from "react-router-dom";
import { db } from "../../firebase";
import { Button, Container, Typography } from "@mui/material";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";

const Mailto = ({ email, subject, body, ...props }) => {
  return (
    <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
      {props.children}
    </a>
  );
};

export const AdDetails = () => {
  let { id } = useParams();
  const history = useHistory();
  const [adDetails, setAdDetails] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    db.collection("allAds")
      .doc(id)
      .get()
      .then((doc) => {
        setAdDetails(doc.data());
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <Button
        sx={{
          color: "text.secondary",
          padding: "15px 0 15px 0",
          justifyContent: "flex-start",
        }}
        onClick={() => history.goBack()}
      >
        <KeyboardArrowLeftRoundedIcon fontSize="large" />
      </Button>
      {loading ? (
        <Typography component="h2" variant="h6">
          Loading...
        </Typography>
      ) : null}

      {adDetails && <AdCard ad={adDetails} mailto={Mailto} />}
    </Container>
  );
};
