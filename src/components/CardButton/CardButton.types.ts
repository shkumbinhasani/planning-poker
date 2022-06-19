import React from "react";

export interface CardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: string,
    active?: boolean
}
