import { Link } from "react-router-dom";
import css from "./MovieList.module.css";
import { useLocation } from "react-router-dom";

export default function MovieList({ films }) {
  const location = useLocation();
  if (films.length === 0) {
    return <div>No movies found</div>;
  }
  return (
    <div>
      <ul className={css.ul}>
        {films.map((film) => (
          <li key={film.id}>
            <Link to={`/movies/${film.id}`} state={{ from: location }}>
              {film.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
