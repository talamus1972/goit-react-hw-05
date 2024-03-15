import { Suspense, useEffect, useState, useRef } from "react";
import css from "./MovieDetailsPage.module.css";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { dataPageFilms } from "../../data-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [film, setFilms] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const linkRef = useRef(location.state?.from ?? "/");

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

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <div>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      <hr />
      <Link to={linkRef.current}>
        <button className={css.btn}>Go back</button>
      </Link>
      <div className={css.container}>
        <img
          className={css.image}
          src={
            film.backdrop_path
              ? `https://image.tmdb.org/t/p/w500/${film.backdrop_path}`
              : defaultImg
          }
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
          {film.genres &&
            film.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}
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
      <Suspense fallback={<div>Loading page... </div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
