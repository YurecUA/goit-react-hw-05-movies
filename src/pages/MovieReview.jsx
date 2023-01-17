import { useState, useEffect } from 'react';
import { getMovieReviews } from '../services/MoviesApi';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

export default function MovieReview() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const getCast = async () => {
      const results = await getMovieReviews(movieId);
      console.log(results);
      setReviews(results);

    };
    getCast();
  }, [movieId]);

  return (
    <div>
      {reviews.length > 0 ? (
        <>
          <ul>
            {reviews.map(({ id, author, content }) => (
              <li key={id}>
                <p>{author}</p>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </div>
  );
}
