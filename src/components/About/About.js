import React from "react";
import { Card, Container, List, ListItem, Typography } from "@material-ui/core";

const About = () => {
  return (
    <Container>
      <Typography component="h1">Hur funkar det?</Typography>
      <Card>
        <Typography component="h2">Varför</Typography>
        För att spara miljön och minska vår konsumtion av varor och saker som vi
        annars kan dela med varandra.
      </Card>
      <Card>
        <Typography component="h2">Att låna av någon</Typography>
        <List>
          <ListItem>• Hitta den annons som du är intresserad av </ListItem>
          <ListItem>
            • Klicka på “Kontakta annonsör” och skicka ett meddelande
          </ListItem>
          <ListItem>
            • Om utlånaren godkänner förfrågan så kommer ni överens om tid för
            upphämtning och återlämning själva
          </ListItem>
        </List>
      </Card>
      <Card>
        <Typography component="h2">Att låna ut till någon</Typography>
        <List>
          <ListItem>• Lägg upp en eller flera annonser </ListItem>
          <ListItem>
            • När du får en förfrågan godkänner du (eller nekar om du inte kan)
          </ListItem>
          <ListItem>
            • Ni kommer överens om tid för utlämning och återlämning själva
          </ListItem>
        </List>
      </Card>
    </Container>
  );
};

export default About;
