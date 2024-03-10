import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ films }) {
  return (
    <div>
      <ul className={css.ul}>
        {films.map((film) => (
          <li key={film.id}>
            <Link to={`/movies/${film.id}`}>{film.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
