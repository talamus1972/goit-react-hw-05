import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MzM1YjU2ODAxYjFkZWIwMGFlZTE1MDc3NWY0MzU3NSIsInN1YiI6IjY1ZWI4Mzk2MjBlY2FmMDE2MmZhYWFmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BBDH310OD4hDdB80GDcz1i97I5bvTx_OpeOn7qH8KCY",
  },
};

export const getTrendingFilms = async () => {
  const response = await axios.get(
    "trending/movie/day?language=en-US",
    options
  );
  return response.data.results;
};

export const dataPageFilms = async (movieId) => {
  const response = await axios.get(`movie/${movieId}?language=en-US`, options);
  return response.data;
};

export const dataFilmsCast = async (movieId) => {
  const response = await axios.get(
    `movie/${movieId}/credits?language=en-US`,
    options
  );

  return response.data.cast;
};

export const dataFilmsReviews = async (movieId) => {
  const response = await axios.get(
    `movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  console.log(movieId);
  return response.data.results;
};
