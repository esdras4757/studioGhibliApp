import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { movieInterface } from '../Types/appTypes'
import { ApiConstants } from '../utils/constants/ApiConstants'
import { useApi } from '@/customHooks/useApi'
import ErrorPlaceHolder from '../placeholders/ErrorPlaceHolder'
import { isEmpty, isNil } from 'lodash'
import NoDataPlaceholder from '../placeholders/NoDataPlaceholder'
import QuillHtmlRenderer from './QuillHtmlRenderer'
import ButonsPack from './ButonsPack'
import Loader from '../placeholders/Loader'

interface PropsInterface {
    onSuccess?: () => void
}


const DetailMovie = (props: PropsInterface) => {
    const [data, setData] = useState<null | movieInterface>(null)
    const [loading, setLoading] = useState(false)
    const [errorData, setErrorData] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const [lastid, setLastid] = useState('')
    const [locationsList, setLocationsList] = useState<any>([])
    const [peopleList, setPeopleList] = useState<any>([])


    useEffect(() => {
        const id = searchParams?.get('id')
        if (id != '' && id) {
            setLastid(id)
        }
        else {
            router.push('/')
        }

    }, []);

    useEffect(() => {
        if (isNil(lastid) == false && lastid != '') {
            getMovieInfo();
        }

    }, [lastid])


    const getMovieInfo = async () => {
        setData(null);
        setLoading(true);
        setErrorData(false);
        try {
            const response = await useApi(ApiConstants.GET_APP_GETMOVIEBYID + '/' + lastid, 'get', {});
            if (response && response.data) {
                setData(response.data);
                getLocations(response.data.locations)
                getPeople(response.data.people)
            }
        } catch (error) {
            setErrorData(true);
        } finally {
        }
    };

    const getLocations = async (locations: any) => {
        setLoading(true);

        try {
            const allLocations = await Promise.all(locations.map(async (url: any, index: any) => {
                try {
                    const response = await useApi(url, 'get', {});
                    return <div key={index} className='mb-2 text-start'><i className='fas me-1 fa-user' />{response.data.name}</div>;
                } catch (error) {
                    return <div key={index}>Error</div>;
                }
            }));
            setLocationsList(allLocations);
        } finally {
            setLoading(false);
        }
    };

    const getPeople = async (people: any) => {
        setLoading(true);
        try {
            const allPeople = await Promise.all(people.map(async (url: any, index: any) => {
                try {
                    const response = await useApi(url, 'get', {});
                    return <div key={index} className='mb-2 text-start'><i className='fas me-1 fa-user' />{response.data.name}</div>;
                } catch (error) {
                    return <div key={index}>Error</div>;
                }
            }));
            setPeopleList(allPeople);
        } finally {
            setLoading(false);
        }
    };




    return (
        <div style={{ height: '80hv',overflowY:'hidden', overflowX: 'auto' }}>

            {isNil(data) === true && loading === false && errorData === true && <div className='col-8 m-auto pt-5'>
                <ErrorPlaceHolder />
            </div>}

            {isNil(data) === false && isEmpty(data) === true && loading === false && errorData === false &&
                <div className='col-8 m-auto pt-5'>
                    <NoDataPlaceholder />
                </div>
            }
            {loading === true && errorData === false && (
                <div className='col-12 d-flex justify-content-center'>
                    <Loader />
                </div>
            )}

            {isNil(data) === false && isEmpty(data) === false && loading === false && errorData === false && (
                <>
                    <div className='d-flex justify-content-between mb-2' >
                        <i
                            onClick={() => router.push('/')}
                            className="col-auto fas fa-chevron-left m-3 fs-3 pointer" style={{ justifySelf: 'start' }}></i>
                        <h2 className='mt-2'>{data?.title}</h2>
                        <i className="col-auto m-3 fs-3 pointer" style={{ justifySelf: 'start' }}></i>
                    </div>

                    <div style={{ overflow: 'auto', height: 'calc(100vh - 120px)' }}>
                        <div className='bg-dark d-flex justify-content-center mb-3'>
                            <img
                                className='col-9 col-md-5' style={{ maxHeight: 500 }}
                                src={data?.movie_banner !== '' && data?.movie_banner ? data.movie_banner : '/images/imgPlaceholder.jpg'}
                                alt={data?.title}

                            />
                        </div>
                        <DetailContainer className='btn-container' style={{ height: 'auto' }}>
                            {data &&
                                <>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <div style={{ color: 'gray' }} className=''><i className='fas me-1 fa-calendar' /> Year: {data?.release_date}</div>
                                            <div style={{ color: 'gray' }} className=''><i className='fas me-1 fa-video' /> Director: {data?.director}</div>
                                            <div style={{ color: 'gray' }} className=''><i className='fas me-1 fa-clock' /> Duration: {data?.running_time}</div>
                                            <div style={{ color: 'gray' }} className=''><i className='fas me-1 fa-heart' /> Score: {data?.rt_score}</div>
                                        </div>
                                        <ButonsPack onSuccess={getMovieInfo} movie={data} />
                                    </div>
                                    <div className='text-center mt-4'>
                                        <div style={{flexWrap:'wrap'}} className='d-flex mb-5'>
                                            <img
                                                className='col-12 col-md-3 order-1 order-md-0' style={{}}
                                                src={data?.image !== '' && data?.image ? data?.image : '/images/imgPlaceholder.jpg'}
                                                alt={data?.title}

                                            />
                                            <div className='col-12 col-md-9 px-md-5 px-1'>
                                                <div style={{}} className='mb-2'><i className='fas me-1 fa-video' />{`Original Name: ${data?.original_title_romanised} (${data?.original_title})`}</div>
                                                {data?.description && (
                                                    <QuillHtmlRenderer complete={true} htmlString={data?.description} />
                                                )}

                                                <div className='text-start'>
                                                    {peopleList.length > 1 && <h4 className='mb-4'>Characters: </h4>}
                                                    {peopleList.length > 1 && peopleList.map((element:()=>JSX.Element,index:number)=>element)}
                                                </div>

                                                <div className='text-start'>
                                                    {locationsList.length > 1 && <h4 className='mb-4'>Locations: </h4>}
                                                    {locationsList.length > 1 && locationsList.map((element:()=>JSX.Element,index:number)=>element)}
                                                </div>
                                            </div>

                                        </div>
                                    </div>


                                </>

                            }
                        </DetailContainer>
                        <Footer>
                            <img src="images/logo.svg" alt="" />
                        </Footer>
                    </div>

                </>
                )}



        </div>
    )
}

export default DetailMovie

const DetailContainer = styled.div`
   @media (max-width: 600px) {

        margin-top: 5px !important;
        justify-content: center;
        .container22 {
            justify-content: center !important;
        }
        .IconContent{
            font-size: 14px;
            padding: 6px;
            height: 32px;
            width: 32px;
        }
   }


padding: 10px 20px;
.content{
    padding: 10px;
    margin: auto;
    text-align: left;
}
`

const Footer = styled.div`
  height: 100px;
img{
    width: 400px;
    background-color: #b0b0b0;
    margin-bottom: 20px;
}
  @media (max-width:400px) {
    padding: 0px 10px;
  }
justify-content: center;
  display: flex;

`
