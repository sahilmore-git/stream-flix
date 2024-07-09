
import styles from './movie_list_wrapper.module.scss';
import MovieCard from '../MovieCard/MovieCard.component';
import { InterfaceMovieCard } from '../../interfaces/movie_details';

const MovieListWrapper = (props:any) => {

    return(
        <div className={styles.wrapper}>
            <div className={styles.yearTitle}>{props?.currYear}</div>
            {
                props?.movieData.map((card: InterfaceMovieCard, idx:number) => {
                    return (<span key={card?.id+idx}>
                        <MovieCard
                            movieDetails={card}
                        />
                    </span>)
                })
            }
        </div>
    );


}

export default MovieListWrapper;