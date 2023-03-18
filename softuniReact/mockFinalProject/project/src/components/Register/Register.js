import Add from '../../img/addImage.png'
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    return(
        <section className='authFormContainer'>
            <div className='formWrapper'>
                <span className='logo'>Register</span>
                <span className='title'>form</span>
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
        </section>
    )
} 

export default Register;