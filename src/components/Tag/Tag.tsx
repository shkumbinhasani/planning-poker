import React, {FC} from 'react';
import styles from "./Tag.module.scss";
import {TagProps} from "./Tag.types";
import {FiX} from "react-icons/all";

const Tag: FC<TagProps> = ({children, notDismissible, onClick}) => {
    return <button className={[styles.Tag,  notDismissible ? styles.isDismissible : ""].join(" ")} onClick={onClick}>
        <span>{children}</span>
        {notDismissible ?? <FiX/>}
    </button>
};

export default Tag;
