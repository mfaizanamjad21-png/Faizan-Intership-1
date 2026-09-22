import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import Sidebar from "../components/Sidebar";

const SELECTED_API =
  "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected";

const RECOMMENDED_API =
  "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended";

const SUGGESTED_API =
  "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested";

const ForYou = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [suggestedBooks, setSuggestedBooks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          selectedResponse,
          recommendedResponse,
          suggestedResponse,
        ] = await Promise.all([
          fetch(SELECTED_API),
          fetch(RECOMMENDED_API),
          fetch(SUGGESTED_API),
        ]);

        if (
          !selectedResponse.ok ||
          !recommendedResponse.ok ||
          !suggestedResponse.ok
        ) {
          throw new Error("Failed to load books.");
        }

        const selectedData = await selectedResponse.json();
        const recommendedData = await recommendedResponse.json();
        const suggestedData = await suggestedResponse.json();

        const selected =
          Array.isArray(selectedData)
            ? selectedData[0]
            : selectedData;

        const recommended =
          Array.isArray(recommendedData)
            ? recommendedData
            : [];

        const suggested =
          Array.isArray(suggestedData)
            ? suggestedData
            : [];

        setSelectedBook(selected);
        setRecommendedBooks(recommended);
        setSuggestedBooks(suggested);

        // Keep all books together for searching
        const allBooks = [
          ...(selected ? [selected] : []),
          ...recommended,
          ...suggested,
        ];

        // Remove duplicate books
        const uniqueBooks = allBooks.filter(
          (book, index, self) =>
            index === self.findIndex((item) => item.id === book.id)
        );

        setSearchResults(uniqueBooks);
      } catch (err) {
        console.error(err);
        setError("Unable to load books. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      const search = searchTerm.trim().toLowerCase();

      if (!search) {
        setSearchResults([]);
        return;
      }

      const allBooks = [
        ...(selectedBook ? [selectedBook] : []),
        ...recommendedBooks,
        ...suggestedBooks,
      ];

      const uniqueBooks = allBooks.filter(
        (book, index, self) =>
          index === self.findIndex((item) => item.id === book.id)
      );

      const filteredBooks = uniqueBooks.filter((book) => {
        const title = book.title?.toLowerCase() || "";
        const author = book.author?.toLowerCase() || "";
        const subtitle = book.subTitle?.toLowerCase() || "";

        return (
          title.includes(search) ||
          author.includes(search) ||
          subtitle.includes(search)
        );
      });

      setSearchResults(filteredBooks);
    }, 400);

    return () => clearTimeout(timer);
  }, [
    searchTerm,
    selectedBook,
    recommendedBooks,
    suggestedBooks,
  ]);

  if (loading) {
    return (
      <div className="summarist-app-layout">
        <Sidebar />

        <main className="for-you-page">
          <div className="for-you-container">
            <div className="page-heading-skeleton"></div>

            <div className="selected-skeleton">
              <div className="skeleton-image"></div>

              <div className="skeleton-content">
                <div className="skeleton-line large"></div>
                <div className="skeleton-line medium"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-button"></div>
              </div>
            </div>

            <div className="books-skeleton">
              <div className="skeleton-line section"></div>

              <div className="skeleton-books">
                <div className="book-skeleton"></div>
                <div className="book-skeleton"></div>
                <div className="book-skeleton"></div>
                <div className="book-skeleton"></div>
                <div className="book-skeleton"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="summarist-app-layout">
        <Sidebar />

        <main className="for-you-page">
          <div className="for-you-container">
            <div className="error-message">
              <h2>Something went wrong</h2>
              <p>{error}</p>

              <button
                type="button"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="summarist-app-layout">
      <Sidebar />

      <main className="for-you-page">
        <div className="for-you-container">

          {/* SEARCH BAR */}
          <div className="top-search-wrapper">
            <div className="top-search-bar">
              <FaSearch />

              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
            </div>
          </div>

          {/* SEARCH RESULTS */}
          {searchTerm.trim() && (
            <section className="search-results-section">
              <div className="books-section-header">
                <div>
                  <h2>Search Results</h2>

                  <p>
                    {searchResults.length}{" "}
                    {searchResults.length === 1
                      ? "book"
                      : "books"}{" "}
                    found
                  </p>
                </div>
              </div>

              {searchResults.length > 0 ? (
                <div className="books-grid">
                  {searchResults.map((book) => (
                    <Link
                      to={`/book/${book.id}`}
                      className="book-card"
                      key={book.id}
                    >
                      <div className="book-card-image">
                        <img
                          src={book.imageLink}
                          alt={book.title}
                        />

                        {book.subscriptionRequired && (
                          <span className="premium-pill">
                            Premium
                          </span>
                        )}
                      </div>

                      <div className="book-card-content">
                        <h3>{book.title}</h3>

                        <p className="book-card-author">
                          {book.author}
                        </p>

                        <p className="book-card-subtitle">
                          {book.subTitle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="search-no-results">
                  <h3>No books found</h3>
                  <p>
                    Try searching for another book title or
                    author.
                  </p>
                </div>
              )}
            </section>
          )}

          {/* PAGE HEADER */}
          {!searchTerm.trim() && (
            <>
              <header className="for-you-header">
                <div>
                  <h1>For You</h1>

                  <p>
                    Discover books selected and recommended for
                    your learning journey.
                  </p>
                </div>
              </header>

              {/* SELECTED BOOK */}
              {selectedBook && (
                <section className="selected-book-section">
                  <h2>Selected Book</h2>

                  <Link
                    to={`/book/${selectedBook.id}`}
                    className="selected-book-card"
                  >
                    <div className="selected-book-image">
                      <img
                        src={selectedBook.imageLink}
                        alt={selectedBook.title}
                      />

                      {selectedBook.subscriptionRequired && (
                        <span className="premium-pill">
                          Premium
                        </span>
                      )}
                    </div>

                    <div className="selected-book-content">
                      <p className="book-label">
                        SELECTED FOR YOU
                      </p>

                      <h3>{selectedBook.title}</h3>

                      <p className="book-subtitle">
                        {selectedBook.subTitle}
                      </p>

                      <p className="book-author">
                        By {selectedBook.author}
                      </p>

                      <p className="book-description">
                        {selectedBook.bookDescription}
                      </p>

                      <span className="book-link">
                        View Book →
                      </span>
                    </div>
                  </Link>
                </section>
              )}

              {/* RECOMMENDED BOOKS */}
              <section className="books-section">
                <div className="books-section-header">
                  <div>
                    <h2>Recommended Books</h2>

                    <p>
                      Books we think you might enjoy.
                    </p>
                  </div>
                </div>

                <div className="books-grid">
                  {recommendedBooks.map((book) => (
                    <Link
                      to={`/book/${book.id}`}
                      className="book-card"
                      key={book.id}
                    >
                      <div className="book-card-image">
                        <img
                          src={book.imageLink}
                          alt={book.title}
                        />

                        {book.subscriptionRequired && (
                          <span className="premium-pill">
                            Premium
                          </span>
                        )}
                      </div>

                      <div className="book-card-content">
                        <h3>{book.title}</h3>

                        <p className="book-card-author">
                          {book.author}
                        </p>

                        <p className="book-card-subtitle">
                          {book.subTitle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* SUGGESTED BOOKS */}
              <section className="books-section">
                <div className="books-section-header">
                  <div>
                    <h2>Suggested Books</h2>

                    <p>
                      Explore more books and discover new ideas.
                    </p>
                  </div>
                </div>

                <div className="books-grid">
                  {suggestedBooks.map((book) => (
                    <Link
                      to={`/book/${book.id}`}
                      className="book-card"
                      key={book.id}
                    >
                      <div className="book-card-image">
                        <img
                          src={book.imageLink}
                          alt={book.title}
                        />

                        {book.subscriptionRequired && (
                          <span className="premium-pill">
                            Premium
                          </span>
                        )}
                      </div>

                      <div className="book-card-content">
                        <h3>{book.title}</h3>

                        <p className="book-card-author">
                          {book.author}
                        </p>

                        <p className="book-card-subtitle">
                          {book.subTitle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ForYou;