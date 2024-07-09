import React, { useEffect, useRef, useState } from "react";
import styles from './movie_year_wrapper.module.scss';
import MovieListWrapper from "../MovieListWrapper/MovieListWrapper";
import Loader from "../Loader/Loader.component";
import { getMovies } from "../../services/movieService";

const MovieYearWrapper = (props:any) => {

    const reff:any = useRef(null);  
    const startRef:any = useRef(null);  
    const [year, setYear] = useState(2012);
    const [downYear, setDownYear] = useState(2012);
    const [upYear, setUpYear] = useState(2012);
    const [yearList, setYearList] = useState<any>([]);
    const [loadingTop, setLoadingTop] = useState(false);
    const [loadingBottom, setLoadingBottom] = useState(false);
    const [yearDataMap, setYearDataMap] = useState<any>({});

    useEffect(() => {
        if(props?.activeGenre == 0){
            getMovies(year).then((res:any) => {
                let ydMap: any = {};
                let yList: any = [];
                ydMap[year] = res?.results;
                yList.push(year);
                setYearDataMap({...ydMap});
                setYearList(yList);
            }).catch((err:any) => {
                console.log(err);
            });
        }
        else{
            let newYear:any = 2012; //default
            let ydMap:any = {}; //default
            let yList:any = []; //default
            setYearDataMap(ydMap);
            setYearList(yList);
            setYear(newYear);
            setDownYear(newYear);
            setUpYear(newYear);
            getMovies(newYear, props?.activeGenre).then((res:any) => {
                let ydMap: any = {};
                let yList: any = [];
                ydMap[year] = res?.results;
                yList.push(year);
                setYearDataMap({...ydMap});
                setYearList(yList);
            }).catch((err:any) => {
                console.log(err);
            });
        }
    }, [props?.activeGenre]);

    const handleScroll = function() {
        if (Math.round(reff.current.scrollTop + reff.current.clientHeight) >= reff.current.scrollHeight) {
            let newYear = downYear + 1;
            let ydMap: any = {};
            let yList: any = [];
            setLoadingBottom(true);
            if(props?.activeGenre != 0){
                  getMovies(newYear, props?.activeGenre).then((res:any) => {
                        ydMap[newYear] = res?.results;
                        yList.push(newYear);
                        setYearDataMap({...yearDataMap, ...ydMap});
                        setYearList([...yearList, newYear]);
                        setLoadingBottom(false);
                    }).catch((err:any) => {
                        console.log(err);
                        setLoadingBottom(false);
                    });
            }
            else{
                    getMovies(newYear).then((res:any) => {
                        ydMap[newYear] = res?.results;
                        yList.push(newYear);
                        setYearDataMap({...yearDataMap, ...ydMap});
                        setYearList([...yearList, newYear]);
                        setLoadingBottom(false);
                    }).catch((err:any) => {
                        console.log(err);
                        setLoadingBottom(false);
                    });
            }
            setDownYear((year) => year+1); // trigger loading of new posts by chaging page no
        }
        if(reff.current.scrollTop == 0){
            let newYear = upYear - 1;
            let ydMap: any = {};
            let yList: any = [];
            setLoadingTop(true);
            if(props?.activeGenre != 0){
                  getMovies(newYear, props?.activeGenre).then((res:any) => {
                        ydMap[newYear] = res?.results;
                        yList.push(newYear);
                        setYearDataMap({...ydMap, ...yearDataMap});
                        setYearList([newYear, ...yearList]);
                        setLoadingTop(false);
                    }).catch((err:any) => {
                        console.log(err);
                        setLoadingTop(false);
                    });
            }
            else{
                    getMovies(newYear).then((res:any) => {
                        ydMap[newYear] = res?.results;
                        yList.push(newYear);
                        setYearDataMap({...ydMap, ...yearDataMap});
                        setYearList([newYear, ...yearList]);
                        setLoadingTop(false);
                    }).catch((err:any) => {
                        console.log(err);
                        setLoadingTop(false);
                    });
            }
            setUpYear((upYear) => upYear-1); // trigger loading of new posts by chaging page no
        }
    };
    return (<> 
    {loadingTop && <Loader />}
    <div className={styles.movieMainWrapper} ref={reff} onScroll={handleScroll}>
        {yearList.map((yl:any, idx:any) => {
            return (
                <span key={yl+idx} ref={ yl == 2012 ? startRef : null}>
                    <MovieListWrapper 
                        currYear={yl}
                        movieData={yearDataMap[yl] || []}
                    />
                </span>
            )
        })}
    </div>
    {loadingBottom && <Loader />}
    </>);
}


export default MovieYearWrapper;