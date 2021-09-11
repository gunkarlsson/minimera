import React from "react";
import AdCard from "./AdCard";
import { PrimarySection } from "../../style/StyledComponents";

const MyAds = () => {
  return (
    <PrimarySection>
      <h1>My Ads</h1>
      <AdCard />
      <AdCard />
      <AdCard />
      <AdCard />
    </PrimarySection>
  );
};

export default MyAds;
