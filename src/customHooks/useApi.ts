import axios, { Axios, AxiosPromise, AxiosResponse } from 'axios';
import openNotification from '../app/Components/notify';
import { ApiEndpointType } from '@/app/Types/appTypes';

type MethodType = 'post' | 'get' | 'update' | 'delete' |'put';


export const useApi = <T>(constant: ApiEndpointType, method: MethodType, data: T):AxiosPromise => {
   
    return axios({
        method,
        url: constant,
        data, 
    })
    .catch(error=>{
        if (error.response.status!==404) {
            openNotification('error','An error has occurred, try again',5)
        }
        throw error;
    })
};
