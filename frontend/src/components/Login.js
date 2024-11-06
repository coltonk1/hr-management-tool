import styles from "../styles/Main.module.css";
import login_styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import earthSrc from "../plainEarth.png";

const Login = () => {
    return (
        <section>
            <div className={styles.smallMargin}>Margin</div>
            <div className={login_styles.loginContainer}>
                <div className={login_styles.titleContainer}>
                    <h1>Welcome Back</h1>
                    <p>Sign in to your Polaris account</p>
                </div>
                <div>
                    <label>Email or Username</label>
                    <input placeholder=""></input>
                </div>
                <div>
                    <label>Password</label>
                    <input placeholder=""></input>
                    <p className={login_styles.bottomText}>
                        <a>Forgot password?</a>
                    </p>
                    <a className={login_styles.icon}>
                        <img src="https://icons.veryicon.com/png/o/miscellaneous/computer-room-integration/hide-password.png"></img>
                    </a>
                </div>
                <div className={login_styles.checkBoxContainer}>
                    <input type="checkbox"></input>
                    <h3>Remember me?</h3>
                </div>
                <div>
                    <a
                        onClick={() => {
                            // do login stuff / call api and get token
                            Cookies.set("token", "tokenvalue", { expires: 7, path: "/", secure: true, sameSite: "Strict" });
                            // the cookie info doesnt need to be secure, since if a use modifies it, they are modifying their own token information
                            // Cookies.get("token")
                            window.location.href = "/dashboard";
                        }}
                        className={login_styles.submitLogin}
                    >
                        Sign In
                    </a>
                </div>
                <div>
                    <p>
                        Don't have an account yet? <Link to={"/signup"}>Sign up</Link>
                    </p>
                </div>
                <div>
                    <small>
                        By signing in, you agree to our <a>Terms of Service</a> and <a>Privacy Policy</a>
                    </small>
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
