import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Lobby from "../pages/Lobby";

export default function Auth() {
    return <Routes>
        <Route path={"/"} element={<Home />}/>
        <Route path={"/:lobbyId"} element={<Lobby />}/>
    </Routes>
}
