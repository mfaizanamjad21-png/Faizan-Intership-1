import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const navigate = useNavigate();
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    const loadLibrary = () => {
      const library = JSON.parse(
        localStorage.getItem("library") || "[]"
      );

      setSavedBooks(library);
    };

    loadLibrary();

    window.addEventListener("libraryUpdated", loadLibrary);

    return () => {
      window.removeEventListener("libraryUpdated", loadLibrary);
    };
  }, []);

  return (
    <main className="for-you-page">
      <div className="for-you-container">
        <section className="library-section">
          <h1>My Library</h1>

          <p className="library-count">
            {savedBooks.length}{" "}
            {savedBooks.length === 1 ? "item" : "items"}
          </p>

          {savedBooks.length === 0 ? (
            <div className="library-empty-state">
              <h2>Save your favorite books!</h2>
              <p>
                When you save a book, it will appear here.
              </p>
            </div>
          ) : (
            <div className="books-grid">
              {savedBooks.map((book) => (
                <button
                  type="button"
                  className="book-card"
                  key={book.id}
                  onClick={() => navigate(`/book/${book.id}`)}
                >
                  <div className="book-card-image">
                    {book.imageLink && (
                      <img
                        src={book.imageLink}
                        alt={book.title}
                      />
                    )}
                  </div>

                  <div className="book-card-content">
                    <h3>{book.title}</h3>

                    <p className="book-card-author">
                      {book.author || "Unknown author"}
                    </p>

                    {book.subtitle && (
                      <p className="book-card-subtitle">
                        {book.subtitle}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Library;