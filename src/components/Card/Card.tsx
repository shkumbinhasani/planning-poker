import React, {FC} from 'react';
import styles from "./Card.module.scss";
import {CardProps} from "./Card.types";

const Card: FC<CardProps> = ({children, ...props}) => {
    return <div {...props} className={[styles.Card, props.className].join(" ")}>
        {children}
    </div>
};

export default Card;
