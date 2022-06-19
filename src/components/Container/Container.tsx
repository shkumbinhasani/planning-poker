import React, {FC} from 'react';
import "./Container.module.scss";
import {ContainerProps} from "./Container.types";
import styles from "./Container.module.scss";

const Container: FC<ContainerProps> = ({children}) => {
    return <div className={styles.root}>
        <div className={styles.Container}>
            {children}
        </div>
    </div>
};

export default Container;
