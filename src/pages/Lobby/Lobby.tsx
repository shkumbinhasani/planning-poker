import React, {FC} from 'react';
import styles from "./Lobby.module.scss";
import {LobbyProps} from "./Lobby.types";
import Header from "../../components/Header";
import Avatar from "../../components/Avatar";
import {auth} from '../../firebase/config';
import Container from "../../components/Container";
import Card from "../../components/Card";
import UserList from "../../components/UserList";
import CardButton from "../../components/CardButton";
import Footer from "../../components/Footer";
import {useNavigate, useParams} from "react-router-dom";
import useLobby from "../../hooks/useLobby";
import Loading from "../Loading";
import {toast} from "react-hot-toast";
import Config from "../../components/Config";
import Progress from "../../components/Progress";
import useLobbyMember from "../../hooks/useLobbyMember";
import {LobbyStatus} from "../../interfaces/lobby.interface";

const Lobby: FC<LobbyProps> = ({}) => {
    const {lobbyId} = useParams();
    const navigate = useNavigate();
    const user = auth.currentUser;
    const {lobby, loading, error} = useLobby(lobbyId ?? "")
    const {
        lobbyMember,
        loading: loadingMemberLoading,
        error: lobbyMemberError
    } = useLobbyMember(lobbyId ?? "", user?.uid ?? "");
    if (loading || loadingMemberLoading) {
        return <Loading/>
    }

    if (error || lobbyMemberError) {
        if (error) {
            toast.error(error.message);
        } else if (lobbyMemberError) {
            toast.error(lobbyMemberError.message);
        }
        navigate("/");
        return <div/>;
    }

    if (!lobby) {
        toast.error("Lobby does not exist");
        navigate("/");
        return <div/>;
    }

    const isAbleToVote: boolean = !!lobbyMember?.answer && lobby.status === LobbyStatus.RUNNING;

    return <Container>
        <Header headerText={"Planning Poker"} avatar={<Avatar src={user?.photoURL} alt={"Profile picture"}/>}/>

        <Card className={styles.Lobby}>
            <Progress value={60} max={100} className={styles.progress}/>
            <div className={styles.flexOne}>
                <h3>Lobby #{lobby.id}</h3>
                <div className={styles.cardButtonParent}>
                    {
                        lobby.answers.map((answer) => {
                            return <CardButton disabled={!isAbleToVote}>{answer}</CardButton>
                        })
                    }

                </div>
            </div>
            <div className={styles.flexOne}>
                <h3>Members</h3>
                {
                    lobby.scores.map((scores) => <UserList image={scores.profilePicture}
                                                           name={scores.displayName}
                                                           isCheck={scores.hasVoted}/>)
                }
            </div>
        </Card>
        {lobby.admin?.id === user?.uid && <Config {...lobby} />}
        <Footer/>
    </Container>
};

export default Lobby;
