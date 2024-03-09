import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { getTrendingFilms } from "../../data-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function HomePage() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setError(false);
        const data = await getTrendingFilms();
        setFilms(data);
      } catch (error) {
        setError(true);
        console.log(error.message);
      }
    }
    getData();
  }, []);

  return (
    <div>
      {error && <ErrorMessage />}
      <MovieList films={films} />
    </div>
  );
}
