declare const addAttributes: <T extends string>(blockName: string, additionalAttributes: Partial<Pick<{ [name in T]: {
    type: string;
    default: string;
}; }, Exclude<T, "">>>) => void;
export default addAttributes;
