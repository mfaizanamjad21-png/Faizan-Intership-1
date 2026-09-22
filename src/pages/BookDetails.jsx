import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to load book.");
        }

        const data = await response.json();

        setBook(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load this book.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleReadOrListen = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
      return;
    }

    if (book.subscriptionRequired) {
      navigate("/choose-plan");
      return;
    }

    navigate(`/player/${book.id}`);
  };

  if (loading) {
    return (
      <main className="book-details-page">
        <div className="book-details-container">
          <div className="book-details-skeleton">
            <div className="book-details-skeleton-image"></div>

            <div className="book-details-skeleton-content">
              <div className="skeleton-line large"></div>
              <div className="skeleton-line medium"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="book-details-page">
        <div className="book-details-container">
          <div className="error-message">
            <h2>Book Not Found</h2>
            <p>{error || "We could not find this book."}</p>

            <Link to="/for-you" className="book-details-back-button">
              Back to For You
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="book-details-page">
      <div className="book-details-container">
        <Link to="/for-you" className="book-details-back">
          ← Back to For You
        </Link>

        <section className="book-details-card">
          <div className="book-details-image">
            <img src={book.imageLink} alt={book.title} />

            {book.subscriptionRequired && (
              <span className="premium-pill">Premium</span>
            )}
          </div>

          <div className="book-details-content">
            <p className="book-details-label">BOOK SUMMARY</p>

            <h1>{book.title}</h1>

            <h2>{book.subTitle}</h2>

            <p className="book-details-author">
              By {book.author}
            </p>

            <div className="book-rating">
              <span>★</span>

              <strong>
                {book.averageRating || "N/A"}
              </strong>

              <span>
                ({book.totalRating || 0} ratings)
              </span>
            </div>

            <p className="book-details-description">
              {book.bookDescription}
            </p>

            <div className="book-details-actions">
              <button
                type="button"
                onClick={handleReadOrListen}
              >
                {book.type === "audio" ? "Listen" : "Read"}
              </button>

              {book.type === "audio & text" && (
                <button
                  type="button"
                  className="secondary-action"
                  onClick={handleReadOrListen}
                >
                  Listen
                </button>
              )}

              <button
                type="button"
                className="library-button"
                onClick={() => {
                  const user = localStorage.getItem("user");

                  if (!user) {
                    navigate("/login");
                    return;
                  }

                  alert("Book added to My Library.");
                }}
              >
                + Add to My Library
              </button>
            </div>
          </div>
        </section>

        <section className="book-summary-section">
          <h2>Summary</h2>

          <p className="book-summary-text">
            {book.summary}
          </p>
        </section>

        {book.keyIdeas && (
          <section className="book-summary-section">
            <h2>Key Ideas</h2>

            <p className="book-summary-text">
              {Array.isArray(book.keyIdeas)
                ? book.keyIdeas.join("\n")
                : book.keyIdeas}
            </p>
          </section>
        )}

        {book.tags && (
          <section className="book-tags-section">
            <h2>Topics</h2>

            <div className="book-tags">
              {book.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>
        )}

        {book.authorDescription && (
          <section className="book-author-section">
            <h2>About the Author</h2>

            <p>{book.authorDescription}</p>
          </section>
        )}
      </div>
    </main>
  );
};

export default BookDetails;