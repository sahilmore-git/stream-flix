import React, { useEffect, useState } from "react";
import { getGenre } from "../../services/genreService";
import GenreComponent from "../GenreComponent/GenreComponent.component";
import MovieYearWrapper from "../MovieYearWrapper/MovieYearWrapper.component";
import SearchModal from "../SearchModal/SearchModal.component";
import Header from "../Header/Header.component";


const Layout = () => {

        const [activeGenre, setActiveGenre] = useState(0);
        const [searchShow, setSearchShow] = useState(false);
        const [genreList, setGenreList] = useState([
            {
                id: 0,
                name: "All"
            }
        ]);
       const handleGenre = (genreId:number) =>{
            setActiveGenre(genreId);
        }

        useEffect(() => {
        let cached = localStorage.getItem('genre');
        if(cached){
            let res:any = JSON.parse(cached);
            setGenreList([...genreList, ...res?.genres]);
        }
        else{
            getGenre().then((res: any) => {
                localStorage.setItem('genre', JSON.stringify(res));
                setGenreList([...genreList, ...res?.genres]);
                //store genremap
                let genreMap:any = {};
                res.genres.map((genre:any) => {
                    genreMap[genre?.id] = genre.name;
                });
                localStorage.setItem('genreMap', JSON.stringify(genreMap));
            }).catch((er: any) => {
                console.log(er)
            });
        }
    }, []);

    return(<div className="App">
        <Header setSearchShow={setSearchShow}/>
        <GenreComponent activeGenre={activeGenre} genreList={genreList} handleGenre={handleGenre}/>
        <MovieYearWrapper activeGenre={activeGenre} />
        { searchShow && <SearchModal handleClose={()=>setSearchShow(false)}/>}
        
    </div>);
}


export default Layout;