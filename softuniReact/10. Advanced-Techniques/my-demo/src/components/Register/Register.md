import { Link } from "react-router-dom";
import * as authService from '../../services/authService'
import { withAuth } from '../../contexts/AuthContext'
import { useNavigate } from "react-router-dom";

const Register = ({ auth }) => {
    
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new  FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');
        
        if (password != confirmPassword) {
            return; //stops onSubmit before passing on data to service
        }

        authService.register(email, password)
            .then(authData => {
                auth.userLogin(authData)
                navigate('/')
            })
    }

    return(
        <section id="register-page" className="content auth">
        <form onSubmit={onSubmit} id="register">
            <div className="container">
                <div className="brand-logo" />
                <h1>Register</h1>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="maria@email.com"
                />
                <label htmlFor="pass">Password:</label>
                <input type="password" name="password" id="register-password" />
                <label htmlFor="con-pass">Confirm Password:</label>
                <input type="password" name="confirm-password" id="confirm-password" />
                <input className="btn submit" type="submit" defaultValue="Register" />
                <p className="field">
                    <span>
                        If you already have profile click <Link to="/login">here</Link>
                    </span>
                </p>
            </div>
        </form>
    </section>
    );
};

export default withAuth(Register);

<!-- we pass in auth={context} in HOC definition via closure storing context in HOC -->
<!-- we apply HOC as a wrapper that accepts Register component, applies auth Context and returns the updated version -->