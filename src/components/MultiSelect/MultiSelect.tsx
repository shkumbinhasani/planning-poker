import React, {FC, useId} from 'react';
import styles from "./MultiSelect.module.scss";
import {MultiSelectProps} from "./MultiSelect.types";
import Tag from "../Tag";

const MultiSelect: FC<MultiSelectProps> = (props) => {
    const id = useId();

    return <div className={styles.MultiSelectParent}>
        <div className={styles.MultiSelect}>
            <label htmlFor={id}>{props.label}</label>
            <div id={id} className={styles.tagHolder}>
                {
                    props.value.length === 0 && <EmptyState/>
                }
                {
                    props.options.map((item, index) => {
                        if (props.value.includes(index)) {
                            return <Tag onClick={() => {
                                props.onChange(props.value.filter((value => value !== index)))
                            }}>{item}</Tag>;
                        }
                        return <></>
                    })
                }
            </div>
        </div>
        <div className={styles.tagHolder}>
            {
                props.options.map((item, index) => {
                    if (!props.value.includes(index)) {
                        return <Tag notDismissible onClick={() => {
                            props.onChange([...props.value, index])
                        }}>{item}</Tag>;
                    }
                    return <></>
                })
            }
        </div>
    </div>
};

const EmptyState = () => {
    return <div className={styles.emptyState}>No Items Selected</div>
}

export default MultiSelect;
