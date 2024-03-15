import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { dataFilmsSearch } from "../../data-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm.jsx";

export default function MoviesPage() {
  const [trendingFilms, setTrendingFilms] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useSearchParams();

  const getFilms = params.get("name");

  const handleSubmit = (formValue) => {
    const form = formValue !== "" ? { name: formValue } : {};
    setParams(form);
  };

  useEffect(() => {
    async function getDataSearch() {
      if (!getFilms) {
        return;
      }
      setIsLoading(true);

      try {
        setError(false);
        const data = await dataFilmsSearch(getFilms);
        setTrendingFilms(data);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getDataSearch();
  }, [getFilms]);

  return (
    <div>
      <hr />
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      <SearchForm onSubmit={handleSubmit} />
      <MovieList films={trendingFilms} />
    </div>
  );
}
