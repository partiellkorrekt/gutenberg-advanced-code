import type { BlockEditProps } from "@wordpress/blocks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { addFilter } from "@wordpress/hooks";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function replaceEditor<T extends {}>(
	blockName: string,
	ReplacementEditor: React.ComponentType<
		BlockEditProps<T> & {
			OriginalEditor: React.ComponentType<BlockEditProps<T>>;
		}
	>,
): void {
	const hookName = `gutenberg-advanced-code/replace-${blockName.replace("/", "-")}-editor`;

	addFilter(
		"editor.BlockEdit",
		hookName,
		createHigherOrderComponent<
			React.ComponentType<BlockEditProps<T>>,
			React.ComponentType<BlockEditProps<T> & { name: string }>
		>(
			(BlockEdit) =>
				(props): React.ReactNode => {
					if (props.name !== blockName) {
						return <BlockEdit {...props} />;
					}
					return <ReplacementEditor {...props} OriginalEditor={BlockEdit} />;
				},
			"AdvancedCode",
		),
	);
}

export default replaceEditor;
