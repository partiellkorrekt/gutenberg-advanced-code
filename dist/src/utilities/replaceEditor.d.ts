import { BlockEditProps } from '@wordpress/blocks';
declare function replaceEditor<T extends {
    name: string;
}>(blockName: string, ReplacementEditor: React.ComponentType<BlockEditProps<T>>): void;
export default replaceEditor;
