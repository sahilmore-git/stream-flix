import styles from './genre_component.module.scss';
const GenreComponent = (props:any) =>{

    return(<>
    <div className={styles.genreWrapper}>
        <ul className={styles.genreList}>
            {props?.genreList?.map((genre:any, idx:number)=>{
                return (
                    <li className={`${styles.genreType} ${ genre.id == props?.activeGenre ? styles.activeGenre : ''}`} key={genre.id+idx} onClick={() => props?.handleGenre(genre.id)}>{genre.name}</li>
                )
            })}
        </ul>
    </div>
    </>)
}

export default GenreComponent;