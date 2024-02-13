import React from "react";
import { useParams } from "react-router-dom";
import DepositPrice from "./DepositPrice";

function RentPage() {
  const { itemId } = useParams();

  return (
    <div>
      <DepositPrice itemId={itemId} />
    </div>
  );
}

export default RentPage;
