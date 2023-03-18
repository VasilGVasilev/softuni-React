import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    
    return(
        <section className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>User</span>
                <span className='title'>Login</span>
                <form>
                    <input type="email" name="email" placeholder='email'/>
                    <input type="password" name="password" placeholder='password'/>
                    <button>Sign in</button>
                </form>
                <p>            
                    If you don't have profile click <Link to="/register">here</Link>
                </p>
            </div>
        </section>
    );
};

export default Login;