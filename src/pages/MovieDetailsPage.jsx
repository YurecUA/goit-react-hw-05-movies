import Loader from 'components/Loader/Loader';
import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  Link,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { getMovieById, IMAGE_URL } from '../services/MoviesApi';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  const location = useLocation();

  useEffect(() => {
    const getMovie = async () => {
      const currentMovie = await getMovieById(movieId);

      setMovie(currentMovie);
    };

    getMovie();
  }, [movieId]);

  const onGoBack = () => {
    return location?.state?.from ?? '/movies';
  };

  return (
    <>
      {!movie ? (
        <div className={styles.notFound}>This movie is not found</div>
      ) : (
        <>
          <Link to={onGoBack()}>
            Go back
          </Link>
          <div className={styles.movieContainer}>
            <div className={styles.movieImg}>
              <img
                src={
                  movie.poster_path
                    ? IMAGE_URL + movie.poster_path
                    : `https://bitsofco.de/content/images/2018/12/broken-1.png`
                }
                alt={movie.title}
                widht=""
                height=""
              />
            </div>

            <div>
              <h2>{movie.title}</h2>
              <p>User Score: {`${movie.vote_average * 10}`}%</p>
              <h3>Overview</h3>
              <p>{`${movie.overview}`}</p>
              <h3>Genres</h3>
              <p>{`${movie.genres.map(genre => genre.name).join(' / ')}`}</p>
            </div>
          </div>
        </>
      )}
      <hr />
      <p>Additional information</p>
      <nav>
        <Link
          to='cast'
          className={styles.link}
        >
          Cast
        </Link>
        <Link
          to='reviews'
          className={styles.link}
        >
          Reviews
        </Link>
      </nav>
      <Outlet />

      {/* <Suspense fallback={<Loader />}>
        <Switch>
          <Route path={`${path}/cast`}>
            <MovieCastView movieId={movieId} />
          </Route>

          <Route path={`${path}/reviews`}>
            <MovieReview movieId={movieId} />
          </Route>
        </Switch>
      </Suspense> */}
    </>
  );
}
