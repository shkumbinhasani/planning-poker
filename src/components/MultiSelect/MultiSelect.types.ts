export interface MultiSelectProps {
    label: string,
    options: string[],
    onChange: (newElements: number[]) => unknown,
    value: number[]
}
