import { useState } from "react";
import uuid from "uuid/v4";
import StripeCheckout from "react-stripe-checkout";

const amount = 200;
const currency = "GBP";

const onToken = metadata => token => {
  fetch(`${process.env.LAMBDA_ENDPOINT}/purchase`, {
    method: "POST",
    body: JSON.stringify({
      amount,
      currency,
      idempotency_key: uuid(),
      token,
      metadata
    })
  })
    .then(response => {
      console.log("response", response);
      response.json().then(data => {
        console.log("response data", data);
        // alert(`We are in business, ${data.email}`);
      });
    })
    .catch(err => {
      console.log(err);
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
        stripeKey={process.env.STRIPE_PUBLISHABLE_KEY}
        token={onToken({
          recipientFirstName: "Alex",
          recipientPhoneNumber: "+447977336726"
        })}
      />
    </div>
  );
};
