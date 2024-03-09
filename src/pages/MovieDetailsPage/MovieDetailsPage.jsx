import { useEffect, useState } from "react";
import css from "./MovieDetailsPage.module.css";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { dataPageFilms } from "../../data-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [film, setFilms] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) {
      return;
    }
    async function getPageDetailsFilms() {
      try {
        setError(false);

        const responce = await dataPageFilms(movieId);
        setFilms(responce);
      } catch (error) {
        setError(true);

        console.log(error.message);
      }
    }
    getPageDetailsFilms();
  }, [movieId]);
  return (
    <div>
      {error && <ErrorMessage />}
      <Link to="/">
        <button className={css.btn}>Go back</button>
      </Link>
      <div className={css.container}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${film.backdrop_path}`}
          alt="Backdrop"
        />

        <div className={css.overview}>
          <h1>
            {film.title} {film.release_date}
          </h1>

          <h3>Overview</h3>
          <p>{film.overview}</p>
          <h3>Genres</h3>
          {/* <ul className={css.list}>
            {film.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul> */}
        </div>
      </div>
      <p>Additional information</p>
      <ul className={css.link}>
        <li>
          <NavLink to="cast"> Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
