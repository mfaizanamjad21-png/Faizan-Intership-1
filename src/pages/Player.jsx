import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPlay, FaPause, FaBackward, FaForward } from "react-icons/fa";

const Player = () => {
  const { id } = useParams();

  const audioRef = useRef(null);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);

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

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const setAudioDuration = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [book]);

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const skipForward = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = Math.min(
      audio.currentTime + 15,
      audio.duration || audio.currentTime
    );
  };

  const skipBackward = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = Math.max(audio.currentTime - 15, 0);
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;

    if (!audio) return;

    const newTime = Number(event.target.value);

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (!time || Number.isNaN(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <main className="player-page">
        <div className="player-container">
          <div className="player-skeleton-title"></div>
          <div className="player-skeleton-line"></div>
          <div className="player-skeleton-player"></div>
          <div className="player-skeleton-summary"></div>
        </div>
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="player-page">
        <div className="player-container">
          <div className="error-message">
            <h2>Unable to Load Book</h2>
            <p>{error || "Book not found."}</p>

            <Link to="/for-you" className="book-details-back-button">
              Back to For You
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="player-page">
      <div className="player-container">
        <Link to={`/book/${book.id}`} className="player-back">
          ← Back to Book
        </Link>

        <section className="player-header">
          <p className="player-label">NOW PLAYING</p>

          <h1>{book.title}</h1>

          <h2>{book.subTitle}</h2>

          <p className="player-author">
            By {book.author}
          </p>
        </section>

        <section className="audio-player">
          <audio
            ref={audioRef}
            src={book.audioLink}
            preload="metadata"
          />

          <div className="audio-controls">
            <button
              type="button"
              onClick={skipBackward}
              aria-label="Skip backward 15 seconds"
            >
              <FaBackward />
            </button>

            <button
              type="button"
              className="play-button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            <button
              type="button"
              onClick={skipForward}
              aria-label="Skip forward 15 seconds"
            >
              <FaForward />
            </button>
          </div>

          <div className="audio-progress">
            <span>{formatTime(currentTime)}</span>

            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
            />

            <span>{formatTime(duration)}</span>
          </div>
        </section>

        <section className="player-summary">
          <h2>Summary</h2>

          <p>{book.summary}</p>
        </section>
      </div>
    </main>
  );
};

export default Player;