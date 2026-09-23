import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaLightbulb,
  FaMicrophone,
  FaStar,
} from "react-icons/fa";

import logo from "../assets/logo.png";
import landingImage from "../assets/landing.png";


const Home = () => {
  return (
    <main className="summarist-home">
      {/* =========================
          NAVBAR
      ========================= */}
      <header className="summarist-navbar">
        <Link to="/" className="summarist-logo">
          <img src={logo} alt="Summarist" />
        </Link>

        <nav className="summarist-nav-links">
          <Link to="/login">Login</Link>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#help">Help</a>
        </nav>
      </header>

      {/* =========================
          HERO
      ========================= */}
      <section className="summarist-hero">
        <div className="summarist-hero-content">
          <h1>
            Gain more knowledge
            <br />
            in less time
          </h1>

          <p>
            Great summaries for busy people, individuals who barely have time
            to read, and even people who don't like to read.
          </p>

          <Link to="/login" className="summarist-primary-button">
            Login
          </Link>
        </div>

        <div className="summarist-hero-image">
          <img src={landingImage} alt="Summarist books" />
        </div>
      </section>

      {/* =========================
          FEATURES
      ========================= */}
      <section className="summarist-features">
        <div className="summarist-section-title">
          <h2>Understand books in few minutes</h2>
        </div>

        <div className="summarist-feature-grid">
          <div className="summarist-feature">
            <div className="summarist-feature-icon">
              <FaBookOpen />
            </div>

            <h3>Read or listen</h3>

            <p>
              Save time by getting the core ideas from the best books.
            </p>
          </div>

          <div className="summarist-feature">
            <div className="summarist-feature-icon">
              <FaLightbulb />
            </div>

            <h3>Find your next read</h3>

            <p>
              Explore book lists and personalized recommendations.
            </p>
          </div>

          <div className="summarist-feature">
            <div className="summarist-feature-icon">
              <FaMicrophone />
            </div>

            <h3>Briefcasts</h3>

            <p>
              Gain valuable insights from briefcasts.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          KNOWLEDGE + STATISTICS
      ========================= */}
      <section className="summarist-knowledge" id="about">
        <div className="knowledge-row">
          {/* Goals */}
          <div className="summarist-goal-list">
            <div className="summarist-goal active">
              Enhance your knowledge
            </div>

            <div className="summarist-goal">
              Achieve greater success
            </div>

            <div className="summarist-goal">
              Improve your health
            </div>

            <div className="summarist-goal">
              Develop better parenting skills
            </div>

            <div className="summarist-goal">
              Increase happiness
            </div>

            <div className="summarist-goal">
              Be the best version of yourself!
            </div>
          </div>

          {/* Statistics */}
          <div className="summarist-statistics-box">
            <div className="summarist-statistic">
              <strong>93%</strong>

              <p>
                of Summarist members{" "}
                <b>significantly increase</b> reading frequency.
              </p>
            </div>

            <div className="summarist-statistic">
              <strong>96%</strong>

              <p>
                of Summarist members{" "}
                <b>establish better</b> habits.
              </p>
            </div>

            <div className="summarist-statistic">
              <strong>90%</strong>

              <p>
                have made{" "}
                <b>significant positive</b> change to their lives.
              </p>
            </div>
          </div>
        </div>

        {/* Second statistics row */}
        <div className="knowledge-row knowledge-row-reverse">
          <div className="summarist-goal-list">
            <div className="summarist-goal">
              Expand your learning
            </div>

            <div className="summarist-goal">
              Accomplish your goals
            </div>

            <div className="summarist-goal">
              Strengthen your vitality
            </div>

            <div className="summarist-goal">
              Become a better caregiver
            </div>

            <div className="summarist-goal">
              Improve your mood
            </div>

            <div className="summarist-goal">
              Maximize your abilities
            </div>
          </div>

          <div className="summarist-statistics-box">
            <div className="summarist-statistic">
              <strong>91%</strong>

              <p>
                of Summarist members{" "}
                <b>report feeling more productive</b> after incorporating the
                service into their daily routine.
              </p>
            </div>

            <div className="summarist-statistic">
              <strong>94%</strong>

              <p>
                of Summarist members have{" "}
                <b>noticed an improvement</b> in their overall comprehension
                and retention of information.
              </p>
            </div>

            <div className="summarist-statistic">
              <strong>88%</strong>

              <p>
                of Summarist members{" "}
                <b>feel more informed</b> about current events and industry
                trends since using the platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          TESTIMONIALS
      ========================= */}
      <section className="summarist-testimonials">
        <div className="summarist-section-title">
          <h2>What our members say</h2>
        </div>

        <div className="summarist-testimonial-grid">
          <div className="summarist-testimonial">
            <h3>Hanna M.</h3>

            <div className="testimonial-stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <p>
              This app has been a <b>game-changer</b> for me! It's saved me so
              much time and effort in reading and comprehending books. Highly
              recommend it to all book lovers.
            </p>
          </div>

          <div className="summarist-testimonial">
            <h3>David B.</h3>

            <div className="testimonial-stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <p>
              I love this app! It provides{" "}
              <b>concise and accurate summaries</b> of books in a way that is
              easy to understand. It's also very user-friendly and intuitive.
            </p>
          </div>

          <div className="summarist-testimonial">
            <h3>Nathan S.</h3>

            <div className="testimonial-stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <p>
              This app is a great way to get the main takeaways from a book
              without having to read the entire thing.{" "}
              <b>The summaries are well-written and informative.</b>{" "}
              Definitely worth downloading.
            </p>
          </div>

          <div className="summarist-testimonial">
            <h3>Ryan R.</h3>

            <div className="testimonial-stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <p>
              If you're a busy person who{" "}
              <b>loves reading but doesn't have the time</b> to read every book
              in full, this app is for you! The summaries are thorough and
              provide a great overview of the book's content.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          CTA
      ========================= */}
      <section className="summarist-cta">
        <Link to="/login" className="summarist-primary-button">
          Login
        </Link>

        <h2>Start growing with Summarist now</h2>
      </section>

      {/* =========================
          PLATFORM STATISTICS
      ========================= */}
      <section className="summarist-platform-stats">
        <div>
          <strong>3 Million</strong>
          <span>Downloads on all platforms</span>
        </div>

        <div>
          <strong>4.5 Stars</strong>
          <span>Average ratings on iOS and Google Play</span>
        </div>

        <div>
          <strong>97%</strong>
          <span>
            Of Summarist members create a better reading habit
          </span>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================= */}
      <footer className="summarist-footer" id="contact">
        <div className="summarist-footer-brand">
          <img src={logo} alt="Summarist" />

          <p>© Copyright © 2023 Summarist.</p>
        </div>

        <div>
          <h3>Actions</h3>

          <a href="#magazine">Summarist Magazine</a>
          <a href="#cancel">Cancel Subscription</a>
          <a href="#help">Help</a>
          <a href="#contact">Contact us</a>
        </div>

        <div>
          <h3>Useful Links</h3>

          <Link to="/choose-plan">Pricing</Link>
          <a href="#business">Summarist Business</a>
          <a href="#gifts">Gift Cards</a>
          <a href="#authors">Authors Publishers</a>
        </div>

        <div>
          <h3>Company</h3>

          <a href="#about">About</a>
          <a href="#careers">Careers</a>
          <a href="#partners">Partners</a>
          <a href="#code">Code of Conduct</a>
        </div>

        <div>
          <h3>Other</h3>

          <a href="#sitemap">Sitemap</a>
          <a href="#legal">Legal Notice</a>
          <a href="#terms">Terms of Service</a>
          <a href="#privacy">Privacy Policies</a>
        </div>
      </footer>
    </main>
  );
};

export default Home;