import React, {ReactNode} from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>{
    children: ReactNode;
}
