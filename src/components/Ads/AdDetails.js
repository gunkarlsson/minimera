import React, { useState, useEffect } from "react";
import { AdCard } from "./AdCard";
import { useParams, useHistory } from "react-router-dom";
import { db } from "../../firebase";
import { Button, Container } from "@mui/material";
import { FaAngleLeft } from "react-icons/fa";

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
        <FaAngleLeft size="2em" title="back" />
      </Button>
      {loading ? <h1>Loading...</h1> : null}

      {adDetails && <AdCard ad={adDetails} mailto={Mailto} />}
    </Container>
  );
};
