import React, {FC} from 'react';
import styles from "./Avatar.module.scss";
import {AvatarProps} from "./Avatar.types";

const Avatar: FC<AvatarProps> = ({src, alt, size = '50px'}) => {
    return <div className={styles.Avatar} style={{width: size, height: size}}>
        <img src={src ?? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} alt={alt}/>
    </div>
};

export default Avatar;
