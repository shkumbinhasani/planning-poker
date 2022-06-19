import React, {FC, useEffect, useState} from 'react';
import styles from "./Config.module.scss";
import Card from "../Card";
import TextField from "../TextField";
import Button from "../Button";
import {LobbyInterface, LobbyStatus} from "../../interfaces/lobby.interface";
import MultiSelect from "../MultiSelect";
import {BsFillPlayFill, BsFillStopFill} from "react-icons/bs";
import {VscDebugRestart} from "react-icons/vsc";
import FAB from "../FAB";
import useLobbyMembers from "../../hooks/useLobbyMembers";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import useInput from "../../hooks/useInput";
import {updateAnswers, updateLobby, updateLobbyState} from "../../services/lobby.service";

const Config: FC<LobbyInterface> = (lobby) => {
    const options = ["0", "1/2", "1", "2", "3", "5", "8", "13"];
    const [selected, setSelected] = useState<number[]>([]);
    const [timeToVoteValue, onTimeToVoteChange] = useInput("10");
    const [status, setStatus] = useState<LobbyStatus>(LobbyStatus.IDLE);
    const {lobbyMembers, loading, error} = useLobbyMembers(lobby.id);
    const navigate = useNavigate();

    useEffect(() => {
        updateAnswers(lobby, lobbyMembers).then(() => {
        })
    }, [lobby, lobbyMembers, status])

    useEffect(() => {
        if (error) {
            toast.error(error.message);
            navigate("/")
        }
    }, [error])

    const onSave = () => {
        toast.promise(updateLobby(lobby.id, {
            answers: options.filter((value, index) => selected.includes(index))
        }), {
            success: "Lobby updated successfully",
            loading: "Updating Lobby",
            error: "Failed Updating lobby"
        }).then(r => {})
    }

    const startGame = () => {
        toast.promise(updateLobbyState(lobby, LobbyStatus.RUNNING), {
            error: "Failed Starting the game",
            loading: "Starting the Game",
            success: "Game Started Successfully"
        }).then(r => {})
     }

    return <Card className={[styles.Lobby, styles.Config].join(" ")}>
        <h3>Config</h3>
        <div className={styles.InputGrid}>
            <TextField label={"Lobby id"}
                       readOnly
                       value={lobby.id}/>

            <TextField label={"Time to vote (in seconds)"}
                       type={"number"}
                       value={timeToVoteValue}
                       onChange={onTimeToVoteChange}
                       min={10}
                       max={3000}
            />

            <MultiSelect label={"Story Points"}
                         options={options}
                         value={selected}
                         onChange={(newElements => {
                             setSelected(newElements)
                         })}/>
        </div>
        {lobby.status == LobbyStatus.IDLE ? <FAB text={"Start"} icon={<BsFillPlayFill/>} onClick={startGame}/> : <></>}
        {lobby.status == LobbyStatus.ENDED ? <FAB text={"Start"} icon={<BsFillPlayFill/>} onClick={startGame}/> : <></>}
        {lobby.status == LobbyStatus.RUNNING ? <>
            <FAB text={"stop"} color={"danger"} icon={<BsFillStopFill/>}/>
            <FAB text={"restart"} color={"secondary"} icon={<VscDebugRestart/>} stack={1}/>
        </> : <></>}

        <footer>
            <Button onClick={onSave}>Save</Button>
        </footer>
    </Card>
};

export default Config;
