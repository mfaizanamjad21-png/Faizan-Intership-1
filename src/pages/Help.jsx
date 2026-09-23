import { useState } from "react";

const Help = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const questions = [
    {
      question: "What is Summarist?",
      answer:
        "Summarist helps you learn the key ideas from books through short summaries and audio briefcasts.",
    },
    {
      question: "How do I search for a book?",
      answer:
        "Open Search from the sidebar and enter the title or topic you are looking for. Results will appear automatically.",
    },
    {
      question: "Can I listen to book summaries?",
      answer:
        "Yes. Open a book and select the listening option to access the audio player when available.",
    },
    {
      question: "How do I change my subscription?",
      answer:
        "Go to Settings and select the option to upgrade your subscription plan.",
    },
    {
      question: "How do I log out?",
      answer:
        "Open the sidebar and select Logout. Your current local session will then be cleared.",
    },
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(
      openQuestion === index ? null : index
    );
  };

  return (
    <main className="help-page">
      <div className="help-container">
        <h1>Help & Support</h1>

        <p className="help-intro">
          Find answers to common questions about using Summarist.
        </p>

        <section className="help-section">
          <h2>Frequently Asked Questions</h2>

          <div className="help-faq-list">
            {questions.map((item, index) => (
              <div className="help-faq-item" key={item.question}>
                <button
                  type="button"
                  className="help-question"
                  onClick={() => toggleQuestion(index)}
                >
                  <span>{item.question}</span>

                  <span>
                    {openQuestion === index ? "−" : "+"}
                  </span>
                </button>

                {openQuestion === index && (
                  <p className="help-answer">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="help-contact">
          <h2>Still need help?</h2>

          <p>
            If you need additional assistance, please contact
            the Summarist support team.
          </p>

          <a href="mailto:support@summarist.com">
            Contact Support
          </a>
        </section>
      </div>
    </main>
  );
};

export default Help;