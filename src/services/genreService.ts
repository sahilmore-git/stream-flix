
import {API_KEY, GENRE_API_URL} from '../globalConstants';

export const getGenre = async () =>{
    let url = GENRE_API_URL+"?api_key="+API_KEY;
    let res = (await fetch(url)).json();
    return res;
}