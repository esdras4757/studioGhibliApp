import { ApiConstants } from "@/app/utils/constants/ApiConstants"

export interface movieInterface{
    author: string,
    release_date:string
    id: string,
    description: string,
    image: string,
    publicationDate: string,
    title: string
    director:string
    running_time:string
    original_title:string
    original_title_romanised:string
    locations:string[]
    movie_banner:string
    people:string[]
    rt_score:string
}

export type ApiEndpointType = typeof  ApiConstants[keyof typeof ApiConstants]


export interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    readOnly:boolean
}

export type FiltersNamesType = {
    name: string;
    type: string;
    id: string;
  }[];
  