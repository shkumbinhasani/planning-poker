import {FC} from "react";
import {LoginTypes} from "./Login.types";
import styles from "./Login.module.scss";
import LoginWithGoogleButton from "../../components/LoginWithGoogleButton";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";

const Login: FC<LoginTypes> = () => {
    const [signInWithGoogle] = useSignInWithGoogle(auth);

    const handleOnGoogleClick = () => {
        signInWithGoogle().then(r => {
            console.log(r)
        });
    }

    return <main className={styles.main}>
        <h1>Planning Poker</h1>
        <LoginWithGoogleButton onClick={handleOnGoogleClick}/>
    </main>
}

export default Login;
