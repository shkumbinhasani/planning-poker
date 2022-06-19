import React, {FC} from 'react';
import styles from "./Center.module.scss";
import {CenterProps} from "./Center.types";

const Center: FC<CenterProps> = (props) => {
    return <div className={styles.Center} {...props}/>
};

export default Center;
