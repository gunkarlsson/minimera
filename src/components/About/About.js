import React from "react";
import { Card, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
    card: {
      margin: "25px 10px",
      padding: "15px 25px",
    },
  };
});

export const About = () => {
  const classes = useStyles();

  return (
    <Container>
      <Typography variant="h1">Hur funkar det?</Typography>
      <Card className={classes.card} elevation={2}>
        <Typography variant="h6" gutterBottom sx={{ margin: "5px 0 15px 0" }}>
          Varför behövs minimera?
        </Typography>

        <Typography variant="body1" gutterBottom>
          För att spara miljön och minska vår konsumtion av varor och saker som
          vi annars kan dela med varandra.
        </Typography>
      </Card>
      <Card className={classes.card} elevation={2}>
        <Typography variant="h6" gutterBottom sx={{ margin: "5px 0 15px 0" }}>
          Att låna av någon
        </Typography>

        <Typography variant="body1" gutterBottom>
          • Hitta den annons som du är intresserad av{" "}
        </Typography>
        <Typography variant="body1" gutterBottom>
          • Klicka på “Kontakta annonsör” och skicka ett meddelande
        </Typography>
        <Typography variant="body1" gutterBottom>
          • Om utlånaren godkänner förfrågan så kommer ni överens om tid för
          upphämtning och återlämning själva
        </Typography>
      </Card>
      <Card className={classes.card} elevation={2}>
        <Typography variant="h6" gutterBottom sx={{ margin: "5px 0 15px 0" }}>
          Att låna ut till någon
        </Typography>

        <Typography variant="body1" gutterBottom>
          • Lägg upp en eller flera annonser{" "}
        </Typography>
        <Typography variant="body1" gutterBottom>
          • När du får en förfrågan godkänner du (eller nekar om du inte kan)
        </Typography>
        <Typography variant="body1" gutterBottom>
          • Ni kommer överens om tid för utlämning och återlämning själva
        </Typography>
      </Card>
    </Container>
  );
};
