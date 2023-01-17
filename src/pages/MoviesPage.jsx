import styles from './MoviesPage.module.css';

import { useState, useEffect } from 'react';
import { getMovieByQuery } from '../services/MoviesApi';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
  const [movieToFind, setMovieToFind] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchString = searchParams.get('query') ?? '';
  const location = useLocation();

  useEffect(() => {
    if (searchString) {
      const getMovies = async () => {
        const { results } = await getMovieByQuery(searchString);

        setMovies(results);
        setMovieToFind(searchString);
      };

      getMovies();
    }
  }, [searchString]);

  const handleSubmit = async e => {
    e.preventDefault();
    setSearchParams({ query: movieToFind });
    setMovieToFind('');
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
      {movies.length > 0 && (
        <ul>
          {' '}
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `/movies/${`${id}`}`,
                  state: {
                    from: {
                      location,
                      label: 'Back to Home',
                    },
                  },
                }}
              >
                <p>{title}</p>
              </Link>
            </li>
          ))}{' '}
        </ul>
      )}
    </>
  );
}
