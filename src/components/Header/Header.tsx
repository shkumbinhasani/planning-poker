import React, {FC} from 'react';
import styles from "./Header.module.scss";
import {HeaderProps} from "./Header.types";

const Header: FC<HeaderProps> = ({headerText, avatar}) => {
    return <div className={styles.Header}>
        <h2>{headerText}</h2>
        <div>{avatar}</div>
    </div>
};

export default Header;
