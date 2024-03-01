import React, { useState } from 'react'
import styled from 'styled-components'
import { movieInterface } from '../Types/appTypes'
import { Alert } from '@mui/material'
import { ApiConstants } from '../utils/constants/ApiConstants'
import { useApi } from '@/customHooks/useApi'
import SaveMovie from './SaveMovie'
import { message } from 'antd'
import { useRouter } from 'next/navigation'
interface propsInterface {
    movie: movieInterface
    isOffline?:boolean
    onSuccess?:()=>void
}

const copiarAlPortapapeles = (texto: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    textarea.style.position = 'fixed';
    textarea.style.left = '0';
    textarea.style.top = '0';
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');

    document.body.removeChild(textarea);
};




const ButonsPack = (props: propsInterface) => {
    const { movie, isOffline, onSuccess } = props
    const [messageApi, contextHolder] = message.useMessage();
    const info = (mensage:string) => {
        messageApi.info(mensage);
      };
    const router= useRouter()

    return (
        !isOffline?
        <div className='d-flex justify-content-end container22 text-center gap-2'>
        <div onClick={e=>{
            e.preventDefault()
            e.stopPropagation()
        }}>
        </div>
             {contextHolder}
            <SaveMovie movie={movie} info={info}/>
            <IconContent className='IconContent' onClick={e => {
                e.stopPropagation()
                let fullUrl
                if (window.location.pathname == '/detail') {
                    fullUrl = window.location.href ?? ''
                } else {
                    fullUrl = window.location.href + 'detail?id=' + movie.id ?? ''
                }
                copiarAlPortapapeles(fullUrl ?? '');
                info('Text copied to clipboard')
            }}>
                <i className='fas pointer fa-share' />
            </IconContent>
        </div>:
        <div className='d-flex justify-content-end text-center gap-2'>
        <SaveMovie movie={movie} info={info}/>
        </div>
    )
}

export default ButonsPack
const IconContent = styled.div`
background-color: gray;
padding: 10px;
border-radius: 100px;
width: 40px;
height: 40px;
cursor: pointer;
color: white;
`