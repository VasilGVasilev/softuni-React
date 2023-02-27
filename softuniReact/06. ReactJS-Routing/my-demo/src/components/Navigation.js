import { NavLink, Link } from 'react-router-dom'
export default function Navigation() {
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li>
                    <NavLink 
                        to="/about"
                        style={({isActive})=>{
                            return isActive
                                ? {backgroundColor: 'lightblue'}
                                : undefined
                        }}
                    >
                        About
                    </NavLink>
                </li>
                <li><NavLink to="/pricing">Pricing</NavLink></li>
                <li><NavLink to="/contacts">Contacts</NavLink></li>
                <li><NavLink to="/pricing/premium">Premium Pricing</NavLink></li>
                <li><NavLink to="/products/2">Products</NavLink></li>
                <li><NavLink to="/millennium-falcon">Millennium Falcon</NavLink></li>



            </ul>
        </nav>
    )
}