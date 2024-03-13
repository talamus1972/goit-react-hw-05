import { useEffect, useState } from "react";
import css from "./MovieDetailsPage.module.css";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { dataPageFilms } from "../../data-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [film, setFilms] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) {
      return;
    }
    async function getPageDetailsFilms() {
      setIsLoading(true);

      try {
        setError(false);

        const responce = await dataPageFilms(movieId);
        setFilms(responce);
      } catch (error) {
        setError(true);

        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getPageDetailsFilms();
  }, [movieId]);
  console.log(movieId);

  return (
    <div>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      <hr />
      <Link to="/">
        <button className={css.btn}>Go back</button>
      </Link>
      <div className={css.container}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${film.backdrop_path}`}
          alt="Backdrop"
          loading="lazy"
        />

        <div className={css.overview}>
          <h1>
            {film.title} {film.release_date}
          </h1>

          <h3>Overview</h3>
          <p>{film.overview}</p>
          <h3>Genres</h3>
          {/* {film.genres.name} */}
        </div>
      </div>
      <hr />
      <p>Additional information</p>
      <ul className={css.link}>
        <li>
          <NavLink to="cast"> Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
        <hr />
      </ul>
      <Outlet />
    </div>
  );
}
