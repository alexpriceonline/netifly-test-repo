import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const onToken = token => {
  console.log("hit");
  fetch("/save-stripe-token", {
    method: "POST",
    body: JSON.stringify(token)
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
        token={onToken}
        stripeKey="pk_test_mWZk6aPfUsPtg5WtJ5wwDhy0"
        name="ThoughtfulSMS"
        description="Weekly thoughtful messages via SMS"
        amount={200}
        currency="GBP"
      />
    </div>
  );
};
