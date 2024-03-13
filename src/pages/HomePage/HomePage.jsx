import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { getTrendingFilms } from "../../data-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import css from "../HomePage/HomePage.module.css";

export default function HomePage() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);

      try {
        setError(false);
        const data = await getTrendingFilms();
        setFilms(data);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <hr />
      {<h1 className={css.h1}>Trending today</h1>}
      {error && <ErrorMessage />}
      {isLoading && <Loader />}

      <MovieList films={films} />
    </div>
  );
}
