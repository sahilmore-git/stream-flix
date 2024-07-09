import { API_KEY, DISCOVER_API_URL, MOVIE_DETAILS, SEARCH_API_URL } from "../globalConstants"


export const getMovies = async (year:number, genre?:number) => {
    let url:string;
    if( genre ){
        url = DISCOVER_API_URL+"?api_key="+API_KEY+"&sort_by=popularity.desc&primary_release_year="+year+"page=1&vote_count.gte=100&with_genres="+genre;
    }
    else{
        url = DISCOVER_API_URL+"?api_key="+API_KEY+"&sort_by=popularity.desc&primary_release_year="+year+"page=1&vote_count.gte=100";
    }     
    let res = ( await fetch(url)).json();

    return res;
}


export const searchWithTitle = async (title:string, page:number) => {
    let url = SEARCH_API_URL+"?api_key="+API_KEY+"&include_adult=false&language=en-US&page="+page+"&query="+title;
    let res = (await fetch(url)).json();
    console.log(res);
    return res;
}

export const getMovieDetails = async (movieId: number) => {
    let url = MOVIE_DETAILS+"/"+movieId+"?api_key="+API_KEY;
    let res = (await fetch(url)).json();
    return res;
}