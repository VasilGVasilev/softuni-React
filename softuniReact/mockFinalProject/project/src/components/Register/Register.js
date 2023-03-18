import Add from '../../img/addImage.png'
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    return(
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>User</span>
                <span className='title'>Register</span>
                <form>
                    <input type="email" name="email" placeholder='email'/>
                    <input type="password" name="password" placeholder='password'/>
                    <input type="password" name="confirm-password" placeholder='repeat password'/>
                    {/* display none for input so that label is decorated */}
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Add user avatar</span>
                    </label>

                    <input style={{display:'none'}} type="file"id='file' />
                    <button>Sign up</button>
                </form>
                <p>If you already have profile click <Link to="/login">here</Link></p>
            </div>
        </div>
    )
} 

export default Register;