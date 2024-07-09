import React, { useEffect, useRef, useState } from "react";
import styles from './search_modal.module.scss';
import { searchWithTitle } from "../../services/movieService";
import InfoModal from "../InfoModal/InfoModal.component";
import { IMAGE_185PX, IMAGE_BASE } from "../../globalConstants";
import Loader from "../Loader/Loader.component";


const SearchModal = (props:any) =>{

const debounceTimer = 1000;
const [searchQuery, setSearchQuery] = useState("");
const [error, setError] = useState("");
const [page, setPage] = useState(1);
const [results, setResults] = useState<any>([]);
const [listEnd, setListEnd] = useState(false);
const [showInfo, setShowInfo] = useState(false);    
const [movieDetails, setMovieDetails] = useState({});    
const [isLoading, setIsLoading] = useState(false);

const handleSearchClick = (movie:any) => {
    console.log(movie);
    setMovieDetails(movie);
    setShowInfo(true);
}

let debounceSearch = (fn:any, ...args:any) => {
    let timer:any;
    return function (){
        clearTimeout(timer);
        timer = setTimeout( ()=> {
            fn.apply(handleChange, [args[0]]);
        },debounceTimer);
    }
};

useEffect(() => {
    if(searchQuery != ""){
        handleSearch();
    }
}, [searchQuery]);

const handleChange = (e:any) =>{
    setPage(1);
    setListEnd(false);
    setSearchQuery(e.target.value.trim());
}

const reff:any = useRef(null);
const handleSearch = () => {
    if(searchQuery?.length < 2){
        setError("Input something more to search");
    }
    else{
        setIsLoading(true);
        setError("");
        if(!listEnd){
            searchWithTitle(searchQuery, page).then((res:any) => {
                if(results.total_results < 1){
                    setListEnd(true);
                }
                else if(results && page != 1){
                    setResults([...results, ...res?.results]);
                }
                else{
                    setResults(res?.results);
                }
                setPage(page+1);
                if(res?.page == res?.total_pages){
                    setListEnd(true);
                }
                setIsLoading(false);
            }).then((err:any)=>{
                console.log(err);
                setIsLoading(false);
            });
        }
    }
}

const handleScroll = () =>{
    if(Math.round(reff.current.scrollTop + reff.current.clientHeight) >= reff.current.scrollHeight){
        handleSearch();
    }
}

return(<>
    <div className={styles.modalWrapper}>
        <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
                <input 
                    type="text" 
                    name="search" 
                    onChange={(e) => debounceSearch(handleChange, e)()}
                    placeholder={"Search movies"}
                    className={styles.searchBox}
                />
                {error && <span className={styles.searchError}>Input something more to search</span>}
            </div>
            <div className={styles.modalContent} ref={reff} onScroll={handleScroll}>
                    {results?.map((a:any, idx:any) => {
                        return(<div key={idx+a?.id} className={styles.searchItem} onClick={() => handleSearchClick(a)}>
                                { a?.backdrop_path && <div className={styles.searchImg} style={{backgroundImage:`url(${IMAGE_BASE+IMAGE_185PX+a?.backdrop_path})`}}>
                                </div>}
                                <div className={styles.searchTitle} style={{justifyContent: a?.backdrop_path == null ? 'center' : ''}}>
                                    {a?.original_title}
                                </div>
                            </div>)
                    })}   
                    { (isLoading && !listEnd) && <Loader />}
                   { listEnd && <div className={styles.endResults}>End of results :(</div>}
            </div>
            <div  className={styles.close} onClick={props?.handleClose}>CLOSE X</div>
        </div>
    </div>
        {showInfo && <InfoModal 
            movieDetails={movieDetails}
            handleClose={() => setShowInfo(false)}
        />}
</>)

}


export default SearchModal;