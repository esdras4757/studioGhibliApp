import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { movieInterface } from '../Types/appTypes';
import { isEmpty, isNil } from 'lodash';
import ErrorPlaceHolder from '../placeholders/ErrorPlaceHolder';
import NoDataPlaceholder from '../placeholders/NoDataPlaceholder';
import localforage from 'localforage';
import Movie from './Movie';
import Loader from '../placeholders/Loader';

interface OfflineProps{
  dataParent:movieInterface[] | null
}

const OfflineMovies = (props:OfflineProps) => {
  const {dataParent} = props
  const [data, setData] = useState<null | movieInterface[]>(null);
  const [loading, setLoading] = useState(false);
  const [errorData, setErrorData] = useState(false);

  useEffect(() => {
    getAllMoviesFn();
  }, [dataParent]);

  const getAllMoviesFn = async () => {
    setData(null);
    setLoading(true);
    setErrorData(false);
    try {
      const storedMovies:movieInterface[]|null = await localforage.getItem('storedMovies')

      if (storedMovies) {
        setData(storedMovies);
      }
    } catch (error) {
      setErrorData(true);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <h4 className='ms-2'>Offline</h4>
      {isNil(data) === true && loading === false && errorData === true && (
        <div className='col-8 m-auto pt-5'>
          <ErrorPlaceHolder />
        </div>
      )}

{isEmpty(data) === true && loading === false && errorData === false && (
        <div className='col-8 m-auto pt-5'>
          <NoDataPlaceholder />
        </div>
      )}


      {isNil(data) === true && loading === true && errorData === false && (
        <div className='col-12 d-flex justify-content-center'>
          <Loader/>
        </div>
      )}

      {isNil(data) === false && isEmpty(data) === false && loading === false && errorData === false && (
        <>
          <RecentsContainer >
            {data?.map((element: movieInterface) => (
              <Movie completeDescription={false} onSuccess={()=>{}} key={element.id} movie={element} />
            ))}
          </RecentsContainer>
        </>
      )}
    </>
  );
};

export default OfflineMovies;

const RecentsContainer = styled.div`
  max-height: 85vh;
  padding: 0px 20px;
  overflow: auto;
`;
