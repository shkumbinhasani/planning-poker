import React, {FC, useId, useRef} from 'react';
import styles from "./TextField.module.scss";
import {TextFieldProps} from "./TextField.types";
import {useEventListener} from "usehooks-ts";

const TextField: FC<TextFieldProps> = React.forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
    const id = props.id ?? useId();
    const parent = useRef<HTMLDivElement>(null);

    useEventListener('click', (event) => {
        try{
            // @ts-ignore
            event.srcElement.children[1].focus()
        }catch {}

    }, parent)

    return <div className={styles.TextField} ref={parent}>
        <label htmlFor={id}>{props.label}</label>
        {/*@ts-ignore*/}
        <input {...props} ref={ref} id={id}/>
    </div>
});

export default TextField;
