import React, {FC, useId} from 'react';
import styles from "./UserList.module.scss";
import {UserListProps} from "./UserList.types";
import Avatar from "../Avatar";
import {BiCheck} from "react-icons/bi";

const UserList: FC<UserListProps> = ({image, name, isCheck}) => {
    const id = useId();

    return <div className={styles.UserList}>
        <Avatar alt={id} src={image} size={"25px"}/>
        <span>{name}</span>
        <div className={[styles.chip, isCheck ? styles.hidden : styles.shown].join(" ")}><BiCheck/></div>
    </div>
};

export default UserList;
