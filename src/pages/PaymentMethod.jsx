import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedPlan = location.state?.plan || "premium";

  const isYearly = selectedPlan === "premium-plus";

  const price = isYearly ? "$89.99" : "$9.99";
  const billingText = isYearly ? "per year" : "per month";

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("subscription", selectedPlan);

    navigate("/settings");
  };

  return (
    <main className="payment-page">
      <div className="payment-card">
        <button
          type="button"
          className="payment-back-button"
          onClick={() => navigate("/choose-plan")}
        >
          ← Back to Choose Plan
        </button>

        <h1>Checkout</h1>

        <p className="payment-subtitle">
          Complete your subscription
        </p>

        <section className="payment-summary">
          <div>
            <span>Plan</span>
            <strong>
              {isYearly ? "Premium Plus" : "Premium"}
            </strong>
          </div>

          <div>
            <span>Price</span>
            <strong>
              {price} <small>{billingText}</small>
            </strong>
          </div>
        </section>

        <div className="payment-divider"></div>

        <h2>Payment Method</h2>

        <form onSubmit={handleSubmit} className="payment-form">
          <label htmlFor="cardName">
            Cardholder Name
          </label>

          <input
            id="cardName"
            type="text"
            placeholder="John Doe"
            required
          />

          <label htmlFor="cardNumber">
            Card Number
          </label>

          <input
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(event) =>
              setCardNumber(event.target.value)
            }
            maxLength="19"
            required
          />

          <div className="payment-row">
            <div>
              <label htmlFor="expiry">
                Expiration Date
              </label>

              <input
                id="expiry"
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(event) =>
                  setExpiry(event.target.value)
                }
                maxLength="5"
                required
              />
            </div>

            <div>
              <label htmlFor="cvc">
                CVC
              </label>

              <input
                id="cvc"
                type="password"
                placeholder="123"
                value={cvc}
                onChange={(event) =>
                  setCvc(event.target.value)
                }
                maxLength="4"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="payment-submit-button"
          >
            Checkout — {price}
          </button>
        </form>

        <p className="payment-secure">
          🔒 Secure checkout
        </p>

        <p className="payment-demo-note">
          Demo payment for the internship project.
          No real payment will be processed.
        </p>
      </div>
    </main>
  );
};

export default PaymentMethod;