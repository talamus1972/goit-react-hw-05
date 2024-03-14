import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { dataFilmsSearch } from "../../data-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
// import FormPage from "../../components/FormPage/FormPage";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [values, setValues] = useState("")
  const [query, setQuery] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [params] = useSearchParams()
 

  //  const [, setParams] = useSearchParams();
  // const location = useLocation()
  // console.log(location);
// const value = params.get("owner") ?? "";
//   const changeSearch = (search) => {
//     params.set("owner", search)
//     setParams(params)
//   } 

 
  const name = params.get("name") ?? "";
  console.log(name);
    // params.set("name", values);
    // setParams(params);
  
      const handleSubmit = (evt) => {
      evt.preventDefault();
        setValues(evt.target.elements.name.value)
      evt.target.reset()
    };
	
  useEffect(() => {
    async function getDataSearch() {
      
      setIsLoading(true);

      try {
        setError(false);
        const data = await dataFilmsSearch(values);
        setQuery(data);
      } catch (error) {
        setError(true);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getDataSearch();
 
     
  }, [values]);
    

  return (
    <div>
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {/* <FormPage onSearch={handleSearch} /> */}
       <form onSubmit={handleSubmit}>
        <input type="text" name="name" />
        <button type="submit">Search</button>
      </form>
      <MovieList films={query} />
    </div>
  );
}
