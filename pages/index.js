import { useState } from "react";
import uuid from "uuid/v4";
import StripeCheckout from "react-stripe-checkout";

const amount = 200;
const currency = "GBP";

const onToken = token => {
  fetch("localhost:9000/purchase", {
    method: "POST",
    body: JSON.stringify({
      amount,
      currency,
      idempotency_key: uuid(),
      token
    })
  }).then(response => {
    response.json().then(data => {
      alert(`We are in business, ${data.email}`);
    });
  });
};

export default () => {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>

      <StripeCheckout
        amount={amount}
        currency={currency}
        description="Weekly thoughtful messages via SMS"
        image="https://stripe.com/img/documentation/checkout/marketplace.png"
        name="ThoughtfulSMS"
        stripeKey="pk_test_mWZk6aPfUsPtg5WtJ5wwDhy0"
        token={onToken}
      />
    </div>
  );
};
