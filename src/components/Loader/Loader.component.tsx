import React from "react";
import styles from './loader.module.scss';

const Loader = (props:any) => {
    return(
        <>
        <div className={styles.container}>
            {/* <div className={styles.load}></div> */}
            <img src={"assets/loader.gif"} />
        </div>
        </>
    )
}

export default Loader;