import React, { useEffect, useState } from "react";
import styles from './info_modal.module.scss';


const InfoModal = (props:any) =>{
    
const imageBase = "https://image.tmdb.org/t/p/w400";
const [genreMap, setGenreMap] = useState<any>({});
const [readMore, setReadMore] = useState(true);
const [readMoreText, setReadMoreText] = useState("...Read More");
const [hasMoreText, setHasMoreText] = useState(false);
const handleReadMore = () => {
    if(readMore){
        setReadMoreText("Read Less");
    }
    else{
        setReadMoreText("...Read More");
    }
    setReadMore(!readMore);
}
const colorMap = ["#15E5EF","#FFBF00", "#DFDC36", "#EDB7AB", "#9FE2BF", "#40E0D0", "#6495ED", "#CCCCFF"];
useEffect(() =>{
    let map:any = localStorage.getItem('genreMap');
    if(map){
        setGenreMap(JSON.parse(map));
    }
    if(props?.movieDetails?.overview.length > 70){
        setHasMoreText(true);
    }
}, []);

return(<div className={styles.modalWrapper}>
        <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
                <div className={styles.modalBackDropImage} style={ {backgroundImage: `url(${imageBase+props?.movieDetails?.backdrop_path})`} }>
                </div>
                <div className={styles.modalTitle}>
                    <span className={styles.textBackDrop}>
                        {props?.movieDetails?.title || "Movie Details"}
                    </span>
                </div>
            </div>
            <div className={styles.modalContent}>
                   <div className={styles.keyWrapper}>
                    {props?.movieDetails?.genre_ids.map((gi:number,idx:number) => {
                        return (<span key={idx+gi} className={styles.keywords} style={{backgroundColor: `${colorMap[idx%8]}` }}>{genreMap[gi] || ""}</span>)
                    })}
                   </div>
                   <div className={styles.desc}>
                        { hasMoreText && readMore ? props?.movieDetails?.overview.slice(0,70) : props?.movieDetails?.overview}
                        { hasMoreText && <span className={styles.readMore} onClick={handleReadMore}>{readMoreText}</span>}
                   </div>
            </div>
        <span  className={styles.close} onClick={props?.handleClose}>CLOSE X</span>
        </div>
</div>)

}


export default InfoModal;