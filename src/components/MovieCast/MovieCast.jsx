import { useEffect, useState } from "react";
import css from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import { dataFilmsCast } from "../../data-api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

export default function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    async function getPageDetailsCastFilms() {
      setIsLoading(true);
      try {
        setError(false);
        const responce = await dataFilmsCast(movieId);
        setCasts(responce);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getPageDetailsCastFilms();
  }, [movieId]);

  if (casts.length === 0) {
    return <div>We do not have any Cast for this movie</div>;
  }
  return (
    <div>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}

      <ul className={css.list}>
        {casts.map((cast) => (
          <li key={cast.id} className={css.item}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
              alt="Profile"
              width="200"
              height="200"
            />
            <p>{cast.name} </p>
            <p>Character: {cast.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
