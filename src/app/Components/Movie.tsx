import { Chip } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import styled from 'styled-components'
import { movieInterface } from '../Types/appTypes'
import QuillHtmlRenderer from './QuillHtmlRenderer';
import ButonsPack from './ButonsPack'

interface propsInterface {
    movie: movieInterface
    isOffline?:boolean
    completeDescription?:boolean
    onSuccess:()=>void
}

const Movie = (props: propsInterface) => {
    const [showDetail, setShowDetail] = useState(false)
    const { movie, isOffline=false,onSuccess,completeDescription} = props
    const router = useRouter()
    const redirect=(id:string)=>{
        if (isOffline) {
            setShowDetail(true)
        }
        else{
            router.push(`/detail?id=${id}`)

        }
    }
    return (
        <MovieContainer >
            <img
                className='col-6 col-md-2 m-auto pointer'
                onClick={() => redirect(movie.id)}
                src={movie?.image !== '' && movie.image ? movie.image : '/images/imgPlaceholder.jpg'}
                alt={movie.title}
            />
            <div className='col-12 col-md-9 my-2 p-0 p-md-3 pointer pt-md-0' onClick={() => redirect(movie.id)}>
                <div className='d-flex mb-1 align-content-center align-items-center'>
                    <h3 className='m-0'>{movie.title}</h3><span className='ms-2 text-secondary'>{movie.publicationDate}</span>
                </div>
                <span className='text-secondary'><i className='fas fa-calendar'/> {movie?.release_date}</span>
                <span className='text-secondary ms-3'><i className='fas fa-video'/> {movie?.director}</span>
                <div className='mt-1'>
                    {movie.description && (
                        <QuillHtmlRenderer complete={completeDescription??true} htmlString={movie.description}/>
                    )}
                </div>
                <div className='buttons' style={{ bottom:15, right:10}}>
                <ButonsPack isOffline={isOffline} onSuccess={onSuccess} movie={movie}/>
                </div>
                <div className='col-12 d-flex column-gap-2 row-gap-1' style={{ flexWrap: 'wrap' }}>
                </div>
             
            </div>

        </MovieContainer>
    )
}

export default Movie

const MovieContainer = styled.div`
flex-wrap: wrap;
position: relative;
margin: auto;
padding: 18px 0px;
border-bottom: 1px solid #848484;
display: flex;
justify-content: space-between;
align-items: center;
justify-items: center;
img{
    max-height: 500px;
    border-radius: 10px;
    max-width: 300px;
    margin: 3px 0px;
}
span{
    font-size: 12px;
}
h3{
    font-size: 20px;
}
p{
    font-size: 14px;
}

@media (min-width: 850px) {
    .buttons{
        position: absolute;
        margin-top: 0px ;
    }
}
@media (max-width: 850px) {
    .buttons{
        margin-top: 12px !important;
        display: flex;
        justify-content: center;
    }
}

`