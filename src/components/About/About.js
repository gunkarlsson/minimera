import React from "react";
import { Card, Container, Typography } from "@material-ui/core";

const About = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Hur funkar det?
      </Typography>
      <Card>
        <Typography variant="subtitle1" gutterBottom>
          Varför
        </Typography>
        <Typography variant="body2" gutterBottom>
          För att spara miljön och minska vår konsumtion av varor och saker som
          vi annars kan dela med varandra.
        </Typography>
      </Card>
      <Card>
        <Typography variant="subtitle1" gutterBottom>
          Att låna av någon
        </Typography>

        <Typography variant="body2" gutterBottom>
          • Hitta den annons som du är intresserad av{" "}
        </Typography>
        <Typography variant="body2" gutterBottom>
          • Klicka på “Kontakta annonsör” och skicka ett meddelande
        </Typography>
        <Typography variant="body2" gutterBottom>
          • Om utlånaren godkänner förfrågan så kommer ni överens om tid för
          upphämtning och återlämning själva
        </Typography>
      </Card>
      <Card>
        <Typography variant="subtitle1" gutterBottom>
          Att låna ut till någon
        </Typography>

        <Typography variant="body2" gutterBottom>
          • Lägg upp en eller flera annonser{" "}
        </Typography>
        <Typography variant="body2" gutterBottom>
          • När du får en förfrågan godkänner du (eller nekar om du inte kan)
        </Typography>
        <Typography variant="body2" gutterBottom>
          • Ni kommer överens om tid för utlämning och återlämning själva
        </Typography>
      </Card>
    </Container>
  );
};

export default About;
