const urlBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5500'

export const ApiConstants={
    GET_APP_GETALLMOVIES:`https://ghibliapi.vercel.app/films`,
    GET_APP_GETMOVIEBYID:`https://ghibliapi.vercel.app/films`,
    GET_LOCATIONS_BYID:`https://ghibliapi.vercel.app/locations`,
}
