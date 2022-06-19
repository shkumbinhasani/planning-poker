import React, {FC} from 'react';
import styles from "./FAB.module.scss";
import {FABProps} from "./FAB.types";

const FAB: FC<FABProps> = ({text, icon, color, stack, onClick}) => {
    if (!stack) {
        stack = 0;
    }

    return <div className={styles.relativeDiv}
                style={
        {
            bottom: (50+(stack*85)) + "px",
            width: stack > 0 ? "50px" : "64px",
            height: stack > 0 ? "50px" : "64px",
            right: stack > 0 ? "57px" : "50px",
        }
    }>
        <span className={styles.fabLabel}>{text}</span>
        <button onClick={onClick} className={[styles.FAB, styles[color ?? "primary"]].join(" ")}>
            {icon}
        </button>
    </div>
};

export default FAB;
