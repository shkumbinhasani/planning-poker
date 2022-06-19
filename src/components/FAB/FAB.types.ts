import {ReactElement, ReactNode} from "react";
import {IconType} from "react-icons";

export interface FABProps {
    text: string,
    icon: ReactElement<IconType>,
    color?: 'primary' | 'secondary' | 'danger',
    stack?: number,
    onClick?: () => unknown;
}
