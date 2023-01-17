import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import { lazy, Suspense } from 'react';
import Container from './components/Container/Container';
import Loader from 'components/Loader/Loader';
import MovieCastView from 'pages/MovieCastView';
import MovieReview from 'pages/MovieReview';

const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName:"HomePage" */)
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage' /* webpackChunkName:"MoviesPage" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage' /* webpackChunkName:"MovieDetailsPage" */
  )
);
const NotFoundView = lazy(() =>
  import('./pages/NotFoundView' /* webpackChunkName:"NotFoundView" */)
);

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<HomePage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="movies/:movieId" element={<MovieDetailsPage />} >
        <Route path="reviews" element={<MovieReview />} />
          <Route path="cast" element={<MovieCastView />} />
        </Route>
      </Route>
    </Routes>
  );
};

