import { Link } from 'react-router-dom'
export default function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/contacts">Contacts</Link></li>
                <li><Link to="/pricing/premium">Premium Pricing</Link></li>
                <li><Link to="/products/2">Products</Link></li>
                <li><Link to="/millennium-falcon">Millennium Falcon</Link></li>



            </ul>
        </nav>
    )
}