import {useCollection} from "react-firebase-hooks/firestore";
import {collection} from "firebase/firestore";
import {db} from "../firebase/config";
import {LobbyMemberInterface} from "../interfaces/lobbyMember.interface";
import firebase from "firebase/compat";
import FirestoreError = firebase.firestore.FirestoreError;

interface UseLobbyMembers{
    lobbyMembers: LobbyMemberInterface[],
    loading: boolean,
    error: FirestoreError | undefined
}

export default function useLobbyMembers(lobbyId: string): UseLobbyMembers {
    const [snapshot, loading, error] = useCollection(collection(db, `/lobby/${lobbyId}/member`));
    let lobbyMembers: LobbyMemberInterface[] = [];
    if(snapshot){
        snapshot.docs.forEach((data) => {
            lobbyMembers.push(data.data() as LobbyMemberInterface)
        })
    }

    return {lobbyMembers, loading, error};
}
