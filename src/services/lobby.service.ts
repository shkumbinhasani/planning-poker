import {LobbyInterface, LobbyStatus} from "../interfaces/lobby.interface";
import {auth, db} from "../firebase/config";
import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {generateString} from "../utils";
import {LobbyMemberInterface} from "../interfaces/lobbyMember.interface";

export const createLobby = async (): Promise<string> => {
    const id = generateString(5);
    const user = auth.currentUser;
    if (!user) {
        throw new Error("Not authenticated user");
    }
    const lobby: LobbyInterface = {
        admin: {
            id: user.uid ?? "",
            name: user.displayName ?? "",
            profilePicture: user.photoURL ?? "",
        },
        deadline: 0,
        id: id,
        status: LobbyStatus.IDLE,
        answers: [],
        scores: [
            {
                profilePicture: user.photoURL ?? "",
                displayName: user.displayName ?? "",
                hasVoted: false,
                vote: null
            }
        ]
    };

    const lobbyMember: LobbyMemberInterface = {
        id: user.uid,
        name: user.displayName ?? user.uid,
        profilePicture: user.photoURL ?? null,
        answer: ""
    }

    await setDoc(doc(db, "lobby", id), lobby);
    await setDoc(doc(db, `lobby/${id}/member/${user.uid}`), lobbyMember);
    return id;
}

export const joinLobby = async (lobbyId: string): Promise<void> => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("Not authenticated user");
    }

    const document = await getDoc(doc(db, "lobby", lobbyId));
    if (!document.exists()) {
        throw new Error("A lobby with this ID doesnt exist");
    }
    const lobby: LobbyInterface = document.data() as LobbyInterface;
    const lobbyMember: LobbyMemberInterface = {
        id: user.uid,
        name: user.displayName ?? user.uid,
        profilePicture: user.photoURL ?? null,
        answer: ""
    }

    await setDoc(doc(db, `lobby/${lobby.id}/member/${user.uid}`), lobbyMember);
}

export const updateAnswers = async (lobby: LobbyInterface, lobbyMembers: LobbyMemberInterface[]): Promise<void> => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("Not authenticated user");
    }
    let tempLobby = {...lobby};

    tempLobby.scores = lobbyMembers.map((lobbyMember) => {
        return {
            displayName: lobbyMember.name,
            profilePicture: lobbyMember.profilePicture ?? "",
            hasVoted: !!lobbyMember.answer,
            vote: lobbyMember.answer
        }
    })

    await setDoc(doc(db, "lobby", lobby.id), tempLobby);
}

export const updateLobbyState = async (lobby: LobbyInterface, status: LobbyStatus, resetAnswers?: boolean): Promise<void> => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("Not authenticated user");
    }
    let tempLobby = {...lobby};

    tempLobby.status = status;
    if (resetAnswers) {
        tempLobby.scores = tempLobby.scores.map((score) => {
            return {...score, hasVoted: false, vote: null}
        })
        const docs = await getDocs(collection(db, `/lobby/${lobby.id}/members`));
        for (let document of docs.docs) {
            await setDoc(doc(db, `lobby/${lobby.id}/member/${document.id}`), {
                ...document.data(),
                hasVoted: false,
                vote: ""
            });
        }
    }
    await setDoc(doc(db, "lobby", lobby.id), tempLobby);
}

export const updateLobby = async (lobbyId: string, update: Partial<LobbyInterface>): Promise<void> => {
    await updateDoc(doc(db, "lobby", lobbyId), update);
}
