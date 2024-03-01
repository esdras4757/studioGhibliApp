import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Fab, Drawer, TextField, Chip } from '@mui/material';
import Movie from './Movie';
import Filters from './Filters';
import { useApi } from '@/customHooks/useApi';
import { ApiConstants } from '../utils/constants/ApiConstants';
import styled from 'styled-components';
import ErrorPlaceHolder from '../placeholders/ErrorPlaceHolder';
import NoDataPlaceholder from '../placeholders/NoDataPlaceholder';
import { isArray, isEmpty, isNil, isObject } from 'lodash';
import { movieInterface } from '../Types/appTypes';
import type { GetProp, UploadProps } from 'antd';
import OfflineMovies from './OfflineMovies';
import Loader from '../placeholders/Loader';
import { useSelector } from 'react-redux';
import { appState } from '../redux/types';

const filtersNames = [
    {
        name: 'Movie',
        type: 'text',
        id: 'title',
    }
];

type mainProps = {
    offlineMode: boolean
    setOfflineMode: Dispatch<SetStateAction<boolean>>
}

const MoviesContainer = (props: mainProps) => {
    const { offlineMode, setOfflineMode } = props
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<null | movieInterface[]>(null);
    const [errorData, setErrorData] = useState(false);
    const [catalog, setCatalog] = useState([{text:'',id:''}])
    const [update, setUpdate] = useState(false)
    const state = useSelector((state:appState)=>state.utils.update)

    useEffect(() => {
        console.log(state)
            getAllMoviesFn();
    }, [state]);


    const getCatalog = async () => {
        try {
            const response = await useApi(ApiConstants.GET_APP_GETALLMOVIES, 'get', {});
            if (response && response.data) {
                return response.data
            }
        } catch (error: any) {
            if (error ) {
                if (error?.response?.status) {
                    setData([]);
                return
                }
                
            }
        }
    }

    useEffect(() => {
        const updateCatalog = async () => {
            const dataCatalog = await getCatalog()
            if (dataCatalog && dataCatalog.length >= 0) {
                const newCatalog = dataCatalog?.map((element:movieInterface) => {
                    return { text: element.title, id: element.id }
                })
                setCatalog(newCatalog)
            }
        }

        updateCatalog()
    }, [])


 const getAllMoviesFn = async (paramData:{}|null=null) => {
        setData(null);
        setLoading(true);
        setErrorData(false);
        try {
            const data = paramData??JSON.parse(localStorage.getItem('editvalues') ?? '')
            let params = `/${data.title.conditions.id??''}`
            const response = await useApi(ApiConstants.GET_APP_GETALLMOVIES + params, 'get', data);
            if (response && response.data) {
                if (isArray(response.data)) {
                    setData(response.data)
                    return
                }
                if (isObject(response.data)) {
                    setData([response.data as movieInterface])
                }

            }
        } catch (error: any) {
            if (error?.response?.status == 404) {
                setData([]);
                return
            }
            setErrorData(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className='d-flex m-auto px-0 px-md-4'>
            <div className='col-12 col-md-8 col-xl-9 pe-0 pe-md-4 br' style={{ position: 'relative' }}>

                <div className='pb-5' style={{ overflowY: 'auto', overflowX: 'hidden', height: '82vh' }}>
                    <div className='col-12'>
                        <Filters catalog={catalog} filtersNames={filtersNames} getAllMoviesFn={getAllMoviesFn} />
                    </div>

                    {isNil(data) === true && loading === true && errorData === false && (
                        <div className='col-12 d-flex justify-content-center'>
                            <Loader />
                        </div>
                    )}

                    {isNil(data) === true && loading === false && errorData === true && <ErrorPlaceHolder />}

                    {isNil(data) === false && isEmpty(data) === true && loading === false && errorData === false && <NoDataPlaceholder />}

                    {isNil(data) === false && isEmpty(data) === false && loading === false && errorData === false && (
                        <>
                            {data?.map((element: movieInterface) => (
                                <Movie onSuccess={getAllMoviesFn} key={element.id} movie={element} />
                            ))}
                        </>
                    )}
                </div>
            </div>
            <div className='col-5 col-md-4 col-xl-3 d-none d-md-block'>
                {/* <Recents /> */}
                <div className='pointer'>
                    <OfflineMovies dataParent={data}/>
                </div>
            </div>

        </Container>
    );
};

const Container = styled.div`
padding-bottom: 5px;
  @media (min-width: 768px) {
    .br {
      border-right: 1px solid #7e7e7e;
    }
  }
`;

export default MoviesContainer;
