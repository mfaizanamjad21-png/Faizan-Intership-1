const Library = () => {
  return (
    <main className="for-you-page">
      <div className="for-you-container">
        <section className="library-section">
          <h1>Saved Books</h1>
          <p className="library-count">0 items</p>

          <div className="library-empty-state">
            <h2>Save your favorite books!</h2>
            <p>When you save a book, it will appear here.</p>
          </div>
        </section>

        <section className="library-section">
          <h1>Finished</h1>
          <p className="library-count">0 items</p>

          <div className="library-empty-state">
            <h2>Done and dusted!</h2>
            <p>When you finish a book, you can find it here later.</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Library;