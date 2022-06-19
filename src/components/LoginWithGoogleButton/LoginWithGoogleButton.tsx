import React, {FC} from 'react';
import {LoginWithGoogleButtonProps} from "./LoginWithGoogleButton.types";
import googleLogo from "./../../assets/svgs/google-logo.svg";
import styles from "./LoginWithGoogleButton.module.scss";

const LoginWithGoogleButton: FC<LoginWithGoogleButtonProps> = ({onClick}) => {
    return <button className={styles.LoginWithGoogleButton} onClick={onClick}>
        <img src={googleLogo} alt={"Google Logo"}/>
        <span>Login with Google</span>
    </button>
};

export default LoginWithGoogleButton;
