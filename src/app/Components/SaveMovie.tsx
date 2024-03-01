import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import styled from 'styled-components';
import { movieInterface } from '../Types/appTypes';
import { useDispatch } from 'react-redux';
import { updateData } from '../redux/actions/appActions';

interface MovieSaveButtonProps {
  movie: movieInterface;
  info:(value:string)=>void
}

const SaveMovie: React.FC<MovieSaveButtonProps> = ({ movie,info }) => {
  const [isSaved, setIsSaved] = useState(false);
  const dispatch=useDispatch()
  useEffect(() => {
    const checkIfSaved = async () => {
      const storedMovies: movieInterface[] = (await localforage.getItem('storedMovies')) || [];
      const existingMovie = storedMovies.find((storedMovie) => storedMovie.id === movie.id);
      setIsSaved(!!existingMovie);
    };

    checkIfSaved();
  }, [movie]);

  const handleSaveMovie = async () => {
    try {
      const key = `movie_${movie.id}`;
      const storedMovies: movieInterface[] = (await localforage.getItem('storedMovies')) || [];
      const existingMovie = storedMovies.find((storedMovie) => storedMovie.id === movie.id);

      if (existingMovie) {
        const updatedMovies = storedMovies.filter((storedMovie) => storedMovie.id !== movie.id);
        await localforage.setItem('storedMovies', updatedMovies);
        setIsSaved(false);
        info('Movie removed.');
        dispatch(updateData(true))

      } else {
        const imageBlob = await fetch(movie.image,{  method: 'GET',
        mode: 'no-cors',}).then((response) => response.blob());
        const newMovie = { ...movie, imageBlob };
        storedMovies.push(newMovie);

        await localforage.setItem('storedMovies', storedMovies);
        setIsSaved(true);
        info('Saved movie, available for offline access.');
        dispatch(updateData(true))

      }
    } catch (error) {
      info('Error saving/deleting movie:');
    }
  };

  return (
    <IconContent className='IconContent' onClick={(e) => {
      e.stopPropagation();
      handleSaveMovie();
    }}>
      <i className={`fas pointer ${isSaved ? 'fa-times' : 'fa-download'}`} />
    </IconContent>
  );
};

export default SaveMovie;

const IconContent = styled.div`
  background-color: gray;
  padding: 10px;
  border-radius: 100px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  color: white;
`;
