import { useEffect, useState } from "react";
import css from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import { dataFilmsReviews } from "../../data-api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) {
      return;
    }
    async function getPageDetailsReviewsFilms() {
      setIsLoading(true);

      try {
        setError(false);
        const responce = await dataFilmsReviews(movieId);
        setReviews(responce);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getPageDetailsReviewsFilms();
  }, [movieId]);
  return (
    <div>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}

      <ul className={css.list}>
        {reviews.map((review) => (
          <li key={review.id} className={css.item}>
            <h3>Autor: {review.author} </h3>
            <p className={css.text}>{review.content} </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
