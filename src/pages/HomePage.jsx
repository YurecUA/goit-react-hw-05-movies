import { lazy, Suspense } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as MoviesAPI from '../services/MoviesApi';

import Preloader from '../components/Preloader/Preloader';
import NotFound from '../components/NotFound/NotFound';

const MoviesList = lazy(() =>
  import('../components/MoviesList'),
);

const PaginationList = lazy(
  () =>
    import('../components/PaginationList'),
);

export default function HomePage() {
  const history = useHistory();
  const location = useLocation();
  const page = new URLSearchParams(location.search).get('page') ?? 1;

  const { data, isLoading, isError, isFetching } = useQuery(
    ['movies', page],
    () => MoviesAPI.fetchTrendingMoviesByPage(page),
    { keepPreviousData: true },
  );

  const handleChange = (event, value) => {
    const options = {
      top: 0,
      behavior: 'smooth',
    };

    window.scrollTo(options);
    history.push({ ...location, search: `page=${value}` });
  };

  if (isLoading || isFetching) {
    return (
      <>
        <Preloader />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <NotFound text={'Nothing was found, please try again'} />
      </>
    );
  }

  return (
    <div>
      <Suspense fallback={<Preloader />}>
        <MoviesList movies={data.results} url="" />

        <PaginationList
          movies={data.results}
          totalPages={data.total_pages}
          page={Number(page)}
          handleChange={handleChange}
        />
      </Suspense>
    </div>
  );
}
