import { NavLink } from 'react-router-dom'
import styles from './Navigation.module.css'
export default function Navigation() {
    const setNavStyle = ({isActive}) => {
        return isActive
        ? styles['active-link']
        : undefined
    }
    return (
        <nav>
            <ul>
                <li><NavLink className={setNavStyle} to="/">Home</NavLink></li>
                <li>
                    <NavLink 
                        to="/about"
                        // style={({isActive})=>({
                        //     background: isActive ? 'lightblue' : 'lightgrey'  
                        //   })}
                        className={setNavStyle}
                    >
                        About
                    </NavLink>
                </li>
                <li><NavLink className={setNavStyle} to="/pricing">Pricing</NavLink></li>
                <li><NavLink className={setNavStyle} to="/contacts">Contacts</NavLink></li>
                <li><NavLink className={setNavStyle} to="/pricing/premium">Premium Pricing</NavLink></li>
                <li><NavLink className={setNavStyle} to="/starships/">Starships</NavLink></li>
                <li><NavLink className={setNavStyle} to="/millennium-falcon">Millennium Falcon</NavLink></li>



            </ul>
        </nav>
    )
}