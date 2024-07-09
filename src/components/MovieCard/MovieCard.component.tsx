import React, { useState } from 'react';
import styles from './movie_card.module.scss';
import {InterfaceMovieCard}  from '../../interfaces/movie_details';
import InfoModal from '../InfoModal/InfoModal.component';
import { IMAGE_185PX, IMAGE_BASE } from '../../globalConstants';

const MovieCard = (props: any) =>{

    const [isShow, SetIsShow] = useState(false);
    let movieDetails:InterfaceMovieCard = props?.movieDetails; 
    const handleOpen = () =>{
        SetIsShow(true);
    }
    const handleClose = () =>{
        SetIsShow(false);
    }
    const monthMap:any = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const getMonthYear = () => {
        let splitArr = props?.movieDetails?.release_date.split("-");
        let year:any = splitArr[0];
        let monthString:any = monthMap[Number(splitArr[1])-1];
        return monthString + " " + year;
    }
    return (<>
        <div className={`${styles.card_wrapper}`} style={ {backgroundImage: `url(${IMAGE_BASE+IMAGE_185PX+movieDetails?.poster_path})`} } onClick={handleOpen}>
            <div className={styles.movie_title_wrapper}>
                <div className={styles.movie_name} title={props?.movieDetails?.title}>{props?.movieDetails?.title}</div>
                <div className={styles.movie_ratings}>{getMonthYear() +" ("+ parseFloat(props?.movieDetails?.vote_average).toFixed(1) +")"}</div>   
            </div>
        </div>
        {isShow && <InfoModal
            movieDetails={props?.movieDetails}
            handleClose={handleClose}
        />}
    </>)
    
}

export default MovieCard;
