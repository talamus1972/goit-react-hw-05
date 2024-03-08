import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import getFilms from "../../data-api";

export default function HomePage() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getFilms();
        setFilms(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <MovieList films={films} />
    </div>
  );
}
