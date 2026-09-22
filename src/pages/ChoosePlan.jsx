import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ChoosePlan = () => {
  const navigate = useNavigate();

  const [billing, setBilling] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(null);

  const monthlyPrice = 9.99;
  const yearlyPrice = 89.99;

  const faqs = [
    {
      question: "What is included with a subscription?",
      answer:
        "A subscription gives you access to premium book summaries and audio content.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes. You can manage and cancel your subscription from your account settings.",
    },
    {
      question: "Does the yearly plan include a free trial?",
      answer:
        "Yes. The yearly subscription includes a 7-day free trial.",
    },
    {
      question: "Can I switch between monthly and yearly billing?",
      answer:
        "Yes. You can switch between the monthly and yearly plans before continuing.",
    },
  ];

  const handleSubscribe = (selectedBilling) => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/payment", {
      state: {
        plan:
          selectedBilling === "yearly"
            ? "premium-plus"
            : "premium",
      },
    });
  };

  return (
    <main className="choose-plan-page">
      <div className="choose-plan-container">
        <Link to="/" className="choose-plan-logo">
          Summarist
        </Link>

        <header className="choose-plan-header">
          <h1>Choose your plan</h1>

          <p>
            Unlock more books and continue learning with Summarist.
          </p>
        </header>

        <div className="billing-switch">
          <button
            type="button"
            className={billing === "monthly" ? "active" : ""}
            onClick={() => setBilling("monthly")}
          >
            Monthly
          </button>

          <button
            type="button"
            className={billing === "yearly" ? "active" : ""}
            onClick={() => setBilling("yearly")}
          >
            Yearly
          </button>
        </div>

        <section className="plans">
          {/* Monthly Plan */}
          <div
            className={`plan-card ${
              billing === "monthly" ? "plan-card-active" : ""
            }`}
          >
            <p className="plan-name">Premium</p>

            <h2>
              ${monthlyPrice}
              <span>/month</span>
            </h2>

            <p className="plan-description">
              Flexible monthly access to premium book summaries.
            </p>

            <ul>
              <li>✓ Premium book summaries</li>
              <li>✓ Audio summaries</li>
              <li>✓ Read and listen to premium books</li>
              <li>✓ Cancel anytime</li>
            </ul>

            <button
              type="button"
              onClick={() => handleSubscribe("monthly")}
            >
              Choose Monthly
            </button>
          </div>

          {/* Yearly Plan */}
          <div
            className={`plan-card featured-plan ${
              billing === "yearly" ? "plan-card-active" : ""
            }`}
          >
            <div className="trial-badge">
              7-DAY FREE TRIAL
            </div>

            <p className="plan-name">Premium Plus</p>

            <h2>
              ${yearlyPrice}
              <span>/year</span>
            </h2>

            <p className="plan-description">
              Save with annual billing and get a 7-day free trial.
            </p>

            <ul>
              <li>✓ Everything in Premium</li>
              <li>✓ Annual billing</li>
              <li>✓ 7-day free trial</li>
              <li>✓ Full premium access</li>
            </ul>

            <button
              type="button"
              onClick={() => handleSubscribe("yearly")}
            >
              Start 7-Day Free Trial
            </button>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  className="faq-item"
                  key={faq.question}
                >
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                  >
                    <span>{faq.question}</span>

                    <span>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <Link to="/" className="choose-plan-back">
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default ChoosePlan;