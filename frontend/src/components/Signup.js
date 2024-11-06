import styles from "../styles/Main.module.css";
import login_styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";

import earthSrc from "../plainEarth.png";

const Login = () => {
    return (
        <section>
            <div className={styles.smallMargin}>Margin</div>
            <div className={login_styles.loginContainer}>
                <div className={login_styles.titleContainer}>
                    <h1>Create Your Account</h1>
                    <p>Join Polaris to get started</p>
                </div>
                <div>
                    <label className={login_styles.required}>Full Name</label>
                    <input placeholder="" required></input>
                </div>
                <div>
                    <label className={login_styles.required}>Username</label>
                    <input placeholder="" required></input>
                </div>
                <div>
                    <label className={login_styles.required}>Email</label>
                    <input placeholder="" required></input>
                </div>

                <div>
                    <label className={login_styles.required}>Password</label>
                    <input placeholder="" required></input>
                </div>
                <div>
                    <label className={login_styles.required}>Confirm Password</label>
                    <input placeholder="" required></input>
                </div>
                <div>
                    <a onClick={() => {}} className={login_styles.submitLogin}>
                        Create Account
                    </a>
                </div>
                <div>
                    <p>
                        By signing up, you agree to our <Link>Terms of Service</Link> and <Link>Privacy Policy</Link>
                    </p>
                </div>
                <div>
                    <p>
                        Already have an account? <Link to={"/login"}>Sign in</Link>
                    </p>
                </div>
            </div>
            <div className={styles.smallMargin}>Margin</div>
            <div className={login_styles.earthContainer}>
                <img className={login_styles.earth} src={earthSrc}></img>
            </div>
        </section>
    );
};

export default Login;
