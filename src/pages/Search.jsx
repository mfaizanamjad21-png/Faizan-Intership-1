import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setBooks([]);
      setError("");
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooks?query=${encodeURIComponent(
            query.trim()
          )}`
        );

        if (!response.ok) {
          throw new Error("Unable to search books.");
        }

        const data = await response.json();

        const results = Array.isArray(data)
          ? data
          : data.books || [];

        setBooks(results);
      } catch (error) {
        console.error("Search error:", error);
        setBooks([]);
        setError("Unable to search books. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <main className="search-page">
      <div className="search-container">
        <h1>Search</h1>

        <div className="search-input-wrapper">
          <FaSearch />

          <input
            type="text"
            placeholder="Search for a book..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        {loading && (
          <p className="search-status">
            Searching...
          </p>
        )}

        {error && (
          <p className="search-error">
            {error}
          </p>
        )}

        {!loading && !error && query.trim() && books.length === 0 && (
          <p className="search-status">
            No books found.
          </p>
        )}

        <div className="search-results">
          {books.map((book) => (
            <button
              type="button"
              className="search-book-card"
              key={book.id}
              onClick={() => navigate(`/book/${book.id}`)}
            >
              {book.imageLink && (
                <img
                  src={book.imageLink}
                  alt={book.title}
                />
              )}

              <div>
                <h2>{book.title}</h2>

                <p>
                  {book.author || "Unknown author"}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Search;