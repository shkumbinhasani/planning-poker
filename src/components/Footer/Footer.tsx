import React, {FC} from 'react';
import styles from "./Footer.module.scss";
import {FooterProps} from "./Footer.types";

const Footer: FC<FooterProps> = ({}) => {
    return <div className={styles.Footer}>
        <p>Made with Love by Shkumbin Hasani</p>
    </div>
};

export default Footer;
