import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase/config";
import Loading from "./pages/Loading/";
import Auth from "./routes/Auth";
import NoAuth from "./routes/NoAuth";
import {Toaster} from "react-hot-toast";

function App() {
    const [user, loading, error] = useAuthState(auth);
    if (loading) {
        return <Loading/>
    }

    if (error) {
        return <pre>{JSON.stringify(error, null, 2)}</pre>
    }

    return <React.Fragment>
        <Toaster toastOptions={{
            style: {
                fontFamily: "Product Sans",
            },
        }}/>
        {user ? <Auth /> : <NoAuth/>}
    </React.Fragment>
}

export default App
