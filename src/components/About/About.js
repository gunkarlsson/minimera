import React from "react";
import { Card, Container, Typography } from "@mui/material";

export const About = () => {
  return (
    <Container>
      <Typography variant="h1">Hur funkar det?</Typography>
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          mx: 1,
          my: 3,
          px: 3,
          py: 2,
          boxShadow: "2px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ margin: "5px 0 15px 0" }}>
          Varför behövs minimera?
        </Typography>

        <Typography variant="body1" gutterBottom>
          För att spara miljön och minska vår konsumtion av varor och saker som
          vi annars kan dela med varandra.
        </Typography>
      </Card>
      <Card
        sx={{
          borderRadius: 2,
          mx: 1,
          my: 3,
          px: 3,
          py: 2,
          boxShadow: "2px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
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
      <Card
        sx={{
          borderRadius: 2,
          mx: 1,
          my: 3,
          px: 3,
          py: 2,
          boxShadow: "2px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
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
