import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);
  const retryInterval = 5000;
  let retryTimer = null;

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.dev/api/films/');

      if (!response.ok) {
        throw new Error('Something went wrong......RETRYING');
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));

      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
      retryTimer = setTimeout(fetchMoviesHandler, retryInterval);
    }

    setIsLoading(false);
  };

  const handleCancelClick = () => {
    clearTimeout(retryTimer);
    setError(null); 
  };

  useEffect(() => {
    fetchMoviesHandler(); 
    return () => {
      clearTimeout(retryTimer);
    };
  }, []); 

  const content = React.useMemo(() => {
    if (isLoading) {
      return <p>Loading....</p>;
    } else if (movies.length > 0) {
      return <MoviesList movies={movies} />;
    } else if (error) {
      return (
        <div>
          <p>{error}</p>
          <button onClick={handleCancelClick}>Cancel Retry</button>
        </div>
      );
    }
  }, [isLoading, movies, error]);

  return (
    <React.Fragment>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
