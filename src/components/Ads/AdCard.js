import React from "react";
import { ItemCard } from "../../style/StyledComponents";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

function AdCard() {
  return (
    <ItemCard>
      <Link to={ROUTES.AD_DETAILS}>Click for ad details</Link>
      <div className="text-div">
        <h2>Kapsåg Bosch</h2>
        <span>Sprillans ny kapsåg med extra sågklinga</span>
      </div>
    </ItemCard>
  );
}

export default AdCard;
