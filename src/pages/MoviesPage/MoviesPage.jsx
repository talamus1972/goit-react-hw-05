import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { dataFilmsSearch } from "../../data-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import FormPage from "../../components/FormPage/FormPage";

export default function MoviesPage() {
  const [value, setValues] = useState([]);
  const [query, setQuery] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (values) => {
    setValues(values);
  };

  useEffect(() => {
    async function getDataSearch() {
      setIsLoading(true);

      try {
        setError(false);
        const data = await dataFilmsSearch(value);
        setQuery(data);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getDataSearch();
  }, [value]);
  return (
    <div>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      <FormPage onSearch={handleSearch} />
      <MovieList films={query} />
    </div>
  );
}
