import 'bootstrap/dist/css/bootstrap.min.css';
import React,  {useState, useEffect} from 'react';
import './App.css';
import MovieList from './components/MovieList';

/* Bootstrap CSS */
import 'bootstrap';

/* jQuery */
import JQuery from 'jquery';
window.$ = JQuery;

const App = () => { // eslint-disable-next-line
  const [movies, setMovies] = useState([]);

  const gestMovieRequest = async () => {
    const url = "http://www.omdbapi.com/?s=horror&apikey=d6fd7dc7";

    const response = await fetch(url);
    const responseJson = await response.json();

    console.log(responseJson);
    setMovies(responseJson.Search);
  };

  useEffect(() => {
    gestMovieRequest();
  }, []);

  return (
  <div className='container-fluid movie-app'>
    <div className='row'>
      <MovieList movies={movies} />
    </div>
  </div>
  );
};

export default App;

