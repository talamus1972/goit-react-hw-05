import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { dataFilmsSearch } from "../../data-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm.jsx";

export default function MoviesPage() {
  const [query, setQuery] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useSearchParams();

  const getQuery = params.get("query");

  const handleSubmit = (formValue) => {
    const form = formValue !== "" ? { query: formValue } : {};
    setParams(form);
  };

  useEffect(() => {
    async function getDataSearch() {
      if (!getQuery) {
        return;
      }
      setIsLoading(true);

      try {
        setError(false);
        const data = await dataFilmsSearch(getQuery);
        setQuery(data);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getDataSearch();
  }, [getQuery]);

  return (
    <div>
      <hr />
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      <SearchForm onSubmit={handleSubmit} />
      <MovieList films={query} />
    </div>
  );
}
