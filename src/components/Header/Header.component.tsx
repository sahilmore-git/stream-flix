
import styles from './header.module.scss';

const Header = (props:any) => {

    return (<>
     <header className={styles.AppHeader}>
        <div className={styles.logo} >
            StreamFlix
        </div>
        <div className={styles.options}>
            <span onClick={()=>props?.setSearchShow(true)}>Search</span>
        </div>
      </header>
      </>);
}

export default Header;