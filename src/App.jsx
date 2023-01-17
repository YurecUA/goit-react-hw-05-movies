import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import MovieCastView from 'pages/MovieCastView';
import MovieReview from 'pages/MovieReview';
import HomePage from 'pages/HomePage';
import MoviesPage from 'pages/MoviesPage';
import MovieDetailsPage from 'pages/MovieDetailsPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<HomePage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="reviews" element={<MovieReview />} />
          <Route path="cast" element={<MovieCastView />} />
        </Route>
      </Route>
    </Routes>
  );
};
