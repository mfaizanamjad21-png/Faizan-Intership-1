import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedPlan = location.state?.plan || "premium";

  const isYearly = selectedPlan === "premium-plus";

  const planName = isYearly ? "Premium Plus" : "Premium";
  const price = isYearly ? "$89.99" : "$9.99";
  const billingText = isYearly ? "per year" : "per month";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5001/YOUR_FIREBASE_PROJECT/us-central1/createCheckoutSession",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plan: selectedPlan,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to start checkout."
        );
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Stripe checkout URL was not returned.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setError(error.message);
      setLoading(false);
    }
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
          Complete your subscription securely with Stripe
        </p>

        {/* Order Summary */}
        <section className="payment-summary">
          <div>
            <span>Plan</span>
            <strong>{planName}</strong>
          </div>

          <div>
            <span>Price</span>
            <strong>
              {price}
              <small> {billingText}</small>
            </strong>
          </div>
        </section>

        <div className="payment-divider"></div>

        {/* Stripe Payment */}
        <section className="stripe-payment-section">
          <h2>Payment Method</h2>

          <p className="stripe-description">
            You will be redirected to Stripe's secure checkout
            page to enter your payment information.
          </p>

          <div className="stripe-features">
            <div>
              <span>🔒</span>
              <p>Secure payment</p>
            </div>

            <div>
              <span>💳</span>
              <p>Credit & debit cards</p>
            </div>

            <div>
              <span>🛡️</span>
              <p>Protected by Stripe</p>
            </div>
          </div>

          {error && (
            <div className="payment-error">
              {error}
            </div>
          )}

          <button
            type="button"
            className="payment-submit-button"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading
              ? "Opening Stripe..."
              : `Continue to Stripe — ${price}`}
          </button>
        </section>

        <p className="payment-secure">
          🔒 Your payment information is securely handled by Stripe.
        </p>
      </div>
    </main>
  );
};y

export default PaymentMethod;