import {useDocument} from "react-firebase-hooks/firestore";
import {doc} from "firebase/firestore";
import {db} from "../firebase/config";
import {LobbyInterface} from "../interfaces/lobby.interface";
import firebase from "firebase/compat";
import FirestoreError = firebase.firestore.FirestoreError;

interface UseLobbyInterface {
    lobby: LobbyInterface | null,
    loading: boolean,
    error: FirestoreError | undefined;
}

const useLobby = (lobbyId: string): UseLobbyInterface => {
    const [value, loading, error] = useDocument(doc(db, "lobby", lobbyId));
    let lobby = null;
    if (value) {
        lobby = value.data() as LobbyInterface;
    }

    return {
        lobby,
        loading,
        error
    }
}

export default useLobby;
