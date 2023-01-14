import { Switch, Route } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Container from './components/Container';
import Appbar from './components/Appbar';
import Preloader from './components/Preloader/Preloader';
import './components/WebsitePreloader/WebsitePreloader';

const HomePage = lazy(() =>
  import('./pages/HomePage.jsx'),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage.jsx'),
);

const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage.jsx'
  ),
);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Appbar />
      <Container>
        <Suspense fallback={<Preloader />}>
          <Switch>
            <Route path="/" exact>
              <QueryClientProvider client={queryClient}>
                <HomePage />
              </QueryClientProvider>
            </Route>

            <Route path="/movies" exact>
              <MoviesPage />
            </Route>

            <Route path="/movies/:movieId">
              <MovieDetailsPage />
            </Route>

            <Route path="/:movieId">
              <MovieDetailsPage />
            </Route>

            <Route>
              <HomePage />
            </Route>
          </Switch>
        </Suspense>
      </Container>
    </>
  );
}

export default App;
