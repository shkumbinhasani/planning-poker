import {useDocument} from "react-firebase-hooks/firestore";
import {doc} from "firebase/firestore";
import {db} from "../firebase/config";
import {LobbyInterface} from "../interfaces/lobby.interface";
import firebase from "firebase/compat";
import FirestoreError = firebase.firestore.FirestoreError;
import {LobbyMemberInterface} from "../interfaces/lobbyMember.interface";

interface UseLobbyMemberInterface {
    lobbyMember: LobbyMemberInterface | null,
    loading: boolean,
    error: FirestoreError | undefined;
}

const useLobbyMember = (lobbyId: string, userId: string): UseLobbyMemberInterface => {
    const [value, loading, error] = useDocument(doc(db, `lobby/${lobbyId}/members`, userId));
    let lobbyMember = null;
    if (value) {
        lobbyMember = value.data() as LobbyMemberInterface;
    }

    return {
        lobbyMember,
        loading,
        error
    }
}

export default useLobbyMember;
