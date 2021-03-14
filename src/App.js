import 'bootstrap/dist/css/bootstrap.min.css';
import React,  {useState, useEffect} from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

/* Bootstrap CSS */
import 'bootstrap';

/* jQuery */
import JQuery from 'jquery';
window.$ = JQuery;

const App = () => { // eslint-disable-next-line
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=d6fd7dc7`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
    setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourites) => favourites.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
  };

  return (
  <div className='container-fluid movie-app'>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading='Movies' />
      <SearchBox 
      searchValue={searchValue} 
      setSearchValue={setSearchValue} 
      />
    </div>  
    <div className='row'>
      <MovieList movies={movies} 
      handleFavouritesClick={addFavouriteMovie} 
      favouriteComponent={AddFavourites} 
      />
    </div>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading='Favourites' />
    </div> 
    <div className='row'>
      <MovieList 
      movies={favourites} 
      handleFavouritesClick={removeFavouriteMovie} 
      favouriteComponent={RemoveFavourites} 
      />
    </div>
  </div>
  );
};

export default App;

    