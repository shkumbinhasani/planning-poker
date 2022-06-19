import React, {useState} from "react";

type UseInputType = [string, React.ChangeEventHandler<HTMLInputElement>];

export default function useInput(defaultValue?: string): UseInputType {
    const [value, setValue] = useState<string>(defaultValue ?? "");

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setValue(event.target.value);
    }

    return [value, onChange];
}
