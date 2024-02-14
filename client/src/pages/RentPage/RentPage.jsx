import React from "react";
import { useParams } from "react-router-dom";
import DepositPrice from "./DepositPrice";
import "./rentStyle.css";

function RentPage() {
  const { itemId } = useParams();

  return (
    <div className="pricey">
      <DepositPrice itemId={itemId} />
    </div>
  );
}

export default RentPage;
