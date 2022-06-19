import React, {FC} from 'react';
import styles from "./Button.module.scss";
import {ButtonProps} from "./Button.types";

const Button: FC<ButtonProps> = ({color, ...props}) => {
    return <button className={[styles.Button, styles[color ?? "primary"]].join(" ")} {...props}/>
};

export default Button;
