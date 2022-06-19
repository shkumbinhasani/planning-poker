import React, {FC} from 'react';
import styles from "./Progress.module.scss";
import {ProgressProps} from "./Progress.types";

const Progress: FC<ProgressProps> = ({value, max, className}) => {
    return <div className={[styles.Progress, className].join(" ")}>
        <div style={{width: ((value/max)*100)+"%" }} />
    </div>
};

export default Progress;
