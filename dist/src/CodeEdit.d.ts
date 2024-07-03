import 'ace-builds/webpack-resolver';
export declare const modes: string[];
declare const CodeEdit: {
    ({ attributes, setAttributes, className }: {
        attributes: any;
        setAttributes: any;
        className: any;
    }): import("react/jsx-runtime").JSX.Element;
    additionalAttributes: {
        languageMode: {
            type: string;
            default: string;
        };
        filename: {
            type: string;
            default: string;
        };
    };
};
export default CodeEdit;
