export enum LobbyStatus {
    IDLE = "IDLE",
    RUNNING = "RUNNING",
    ENDED = "ENDED"
}

export interface LobbyInterface {
    id: string,
    admin: {
        id: string,
        profilePicture?: string,
        name: string,
    },
    deadline: number,
    timeToEnd: number,
    status: LobbyStatus,
    answers: string[],
    scores: {
        displayName: string,
        profilePicture: string,
        hasVoted: boolean,
        vote: string | null
    }[]
}
