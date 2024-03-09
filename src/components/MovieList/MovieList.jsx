import { Link } from "react-router-dom";
// import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import css from "./MovieList.module.css";

export default function MovieList({ films }) {
  return (
    <div>
      <h1 className={css.h1}>Trending today</h1>
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
