import React, {FC} from 'react';
import styles from "./Home.module.scss";
import {HomeProps} from "./Home.types";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Avatar from "../../components/Avatar";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import Center from "../../components/Center";
import Footer from "../../components/Footer";
import {createLobby, joinLobby} from "../../services/lobby.service";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import useInput from "../../hooks/useInput";
import {auth} from "../../firebase/config";

const Home: FC<HomeProps> = ({}) => {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [lobbyIdValue, onLobbyIdChange] = useInput();

    const handleCreateLobby = () => {
        toast.promise(createLobby(), {
            loading: 'Loading',
            success: 'Created Successfully',
            error: 'Error Creating Lobby',
        }).then(id => {
            navigate(id);
        });
    }

    const handleJoinLobby = () => {
        toast.promise(joinLobby(lobbyIdValue), {
            loading: 'Loading',
            success: 'Lobby joined Successfully',
            error: 'Error Creating Lobby',
        }).then(() => {
            navigate(lobbyIdValue);
        });
    }

    return <Container>
        <Header headerText={"Planning Poker"}
                avatar={<Avatar src={user?.photoURL}
                                alt={user?.displayName ?? "Profile Picture"}/>}/>
        <Card className={styles.lobbyHome}>
            <div className={styles.flexOne}>
                <h3 style={{marginBottom: 0}}>Create a new Lobby</h3>
                <Center>
                    <Button color={"secondary"} onClick={handleCreateLobby}>Create Lobby</Button>
                </Center>
            </div>
            <div className={styles.divider}/>
            <div className={styles.flexOne}>
                <h3>Join Lobby</h3>
                <TextField label={"Lobby id"} placeholder={"0450-0564"} value={lobbyIdValue} onChange={onLobbyIdChange}/>
                <Button onClick={handleJoinLobby}>Join Lobby</Button>
            </div>
        </Card>
        <Footer/>
    </Container>
};

export default Home;
