import React, {FC} from 'react';
import styles from "./CardButton.module.scss";
import {CardButtonProps} from "./CardButton.types";

const CardButton: FC<CardButtonProps> = ({children, active, ...props}) => {
    return <button {...props} className={[styles.CardButton, active ? styles.ActiveCardButton : ""].join(" ")}>
        {children}
    </button>
};

export default CardButton;
