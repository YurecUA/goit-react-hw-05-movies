import styles from './MoviesPage.module.css';

import { useState, useEffect } from 'react';
import { getMovieByQuery } from '../services/MoviesApi';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Notiflix from 'notiflix';

const MoviesPage = () => {
  const [movieToFind, setMovieToFind] = useState('');
  const [movies, setMovies] = useState([]);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const searchString = new URLSearchParams(location.search).get('query');

    if (searchString) {
      const getMovies = async () => {
        const { results } = await getMovieByQuery(searchString);

        setMovies(results);
        setMovieToFind(searchString);

        console.log(searchString);
      };

      getMovies();
    }
  }, [location.search]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (movieToFind.trim()) {
      const { results } = await getMovieByQuery(movieToFind);

      setMovies(results);
      setMovieToFind('');

      if (results.length === 0) {
        Notiflix.Notify.warning(
          'No movies found! Please change your request and try again'
        );
      }

      history.push({
        ...location,
        search: `query=${movieToFind}`,
      });
    }
  };

  return (
    <>
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <input
            onChange={e => setMovieToFind(e.target.value)}
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movie"
            value={movieToFind}
          />
          <button type="submit" className={styles.searchFormButton}>
            search
          </button>
        </form>
      </header>
      {movies.length > 0 &&
        movies.map(({ id, title, poster_path }) => (
          <ul>
            <li key={id}>
              <Link
                to={{
                  pathname: `/movies/${`${id}`}`,
                  state: {
                    from: {
                      location,
                    },
                  },
                }}
              >
                <img
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w300${poster_path}`
                      : 'https://m.media-amazon.com/images/I/51dCwRZxtLL.jpg'
                  }
                  alt={title}
                />
                <p>{title}</p>
              </Link>
            </li>
          </ul>
        ))}
    </>
  );
};

export default MoviesPage;
