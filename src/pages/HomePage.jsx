import { useState, useEffect } from 'react';
import { getTrendingMovie } from '../services/MoviesApi';
import { Link, useLocation } from 'react-router-dom';

export default function HomePage() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const { results } = await getTrendingMovie();

      setMovies(results);
    };

    getMovies();
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {movies && (
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
