import { useEffect, useState } from "react";
import css from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import { dataFilmsCast } from "../../data-api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) {
      return;
    }
    async function getPageDetailsCastFilms() {
      try {
        setError(false);
        const responce = await dataFilmsCast(movieId);
        setCasts(responce);
      } catch (error) {
        setError(true);
        console.log(error.message);
      }
    }
    getPageDetailsCastFilms();
  }, [movieId]);
  return (
    <div>
      {error && <ErrorMessage />}
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
