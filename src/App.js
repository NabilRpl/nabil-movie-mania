import './App.css';
import { getMovieList, searchMovie } from "./Api";
import { useEffect, useState } from 'react';

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((movies) => {
      setPopularMovies(movies);
    }).catch((error) => {
      console.error("Failed to fetch popular movies:", error);
    });
  }, []);

  const search = async (q) => {
    if (q.length > 3) {
      try {
        const query = await searchMovie(q);
        setPopularMovies(query.results);
        console.log({ query: query });
      } catch (error) {
        console.error("Failed to search movies:", error);
      }
    }
  };

  console.log({ popularMovies: popularMovies });

  return (
    <div className="App">
      <header className="App-header">
        <h1>MOVIE MANIA</h1>
        <input
          placeholder="Search film kesukaan..."
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          {popularMovies.map((movie, index) => (
            <div className="Movie-wrapper" key={index}>
              <div className="Movie-title">{movie.title}</div>
              <img
                className="Movie-image"
                src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="Movie-date">Release: {movie.release_date}</div>
              <div className="Movie-rate">{movie.vote_average}</div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;
