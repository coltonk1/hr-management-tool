import styles from "../styles/Main.module.css";
import login_styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";

import earthSrc from "../earth2.png";

const Login = () => {
    return (
        <section>
            <div className={styles.smallMargin}>Margin</div>
            <div className={login_styles.loginContainer}>
                <title>Login</title>
                <div>
                    <label>Username or Email</label>
                    <input placeholder=""></input>
                </div>
                <div>
                    <label>Password</label>
                    <input placeholder=""></input>
                </div>
                <div>
                    <label>Remember password?</label>
                    <input type="checkbox"></input>
                </div>
                <div className={styles.smallMargin}>Margin</div>
                <Link to="/more" className="outlined-button">
                    Link
                </Link>
                <p>
                    Don't have an account yet? <Link to={"/signup"}>Signup now</Link>
                </p>
                <p>
                    <Link>Forgot password?</Link>
                </p>
            </div>
            <div className={styles.smallMargin}>Margin</div>
            <div className={login_styles.earthContainer}>
                <img className={login_styles.earth} src={earthSrc}></img>
            </div>
        </section>
    );
};

export default Login;
