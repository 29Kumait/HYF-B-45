import React from "react";

export const Checkout = () => {
  return (
    <section>
      <form
        action={`${process.env.BASE_SERVER_URL}/api/checkout/create-checkout-session`}
        method="POST"
      >
        <button type="submit">PURCHASE</button>
      </form>
    </section>
  );
};
