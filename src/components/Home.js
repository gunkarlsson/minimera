import React, { useEffect, useState } from "react";
import AdCard from "./Ads/AdCard";

import { PrimarySection } from "../style/StyledComponents";

const Home = () => {
  return (
    <PrimarySection>
      <h1>Grupp: Kompisgänget</h1>

      <AdCard />
      <AdCard />
      <AdCard />
      <AdCard />
    </PrimarySection>
  );
};

export default Home;
