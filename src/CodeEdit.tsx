import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import type { BlockEditProps } from "@wordpress/blocks";
import { PanelBody, SelectControl, TextControl } from "@wordpress/components";
import { escapeHTML } from "@wordpress/escape-html";
import { decodeEntities } from "@wordpress/html-entities";
import { __ } from "@wordpress/i18n";
import { Fragment } from "react";

import "ace-builds/css/ace.css";
import "ace-builds/css/theme/monokai.css";

// @ts-ignore
export const modes = Object.keys(ace.config.get("$moduleUrls"))
	.filter((x) => x.startsWith("ace/mode/"))
	.map((x) => x.substring(9));
const modeOptions = modes.map((name) => ({
	label: __(name),
	value: name,
}));

const defaultAceProps = {
	theme: "monokai",
	editorProps: { $blockScrolling: false },
	width: "100%",
	minLines: 1,
	maxLines: Number.POSITIVE_INFINITY,
	tabSize: 2,
	// Hack to allow 'inherit' even though the type definitions don't allow it - works flawlessly
	fontSize: "inherit" as unknown as number,
};
// @ts-ignore
ace.config.set("useStrictCSP", true);

const styles: { [name: string]: React.CSSProperties } = {
	wrap: {
		borderRadius: "5px",
		backgroundColor: "#272822",
		overflow: "hidden",
		color: "white",
		fontFamily: "sans-serif",
		margin: "0 -10px",
	},
	header: {
		padding: "0px 10px",
		fontSize: "0.8rem",
		color: "rgba(255, 255, 255, 0.7)",
	},
	language: {
		backgroundColor: "#66D9EF",
		float: "right",
		padding: "0px 10px",
		marginRight: "-10px",
		marginLeft: "10px",
		marginBottom: "5px",
		color: "#000",
		borderBottomLeftRadius: "5px",
	},
	footer: {
		height: "5px",
	},
};

const CodeEdit = ({
	attributes,
	setAttributes,
	className,
}: BlockEditProps<{
	languageMode?: string;
	filename?: string;
	content?: string;
}>) => {
	const props = useBlockProps();
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__("Code Properties")} initialOpen={true}>
					<SelectControl
						label={__("Language Mode")}
						value={attributes.languageMode || "text"}
						options={modeOptions}
						onChange={(languageMode): void => setAttributes({ languageMode })}
					/>
					<TextControl
						label={__("Filename")}
						value={attributes.filename || ""}
						onChange={(filename): void => setAttributes({ filename })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...props}>
				<div className={`${className} use-ace-patches`} style={styles.wrap}>
					<div style={styles.header}>
						<div style={styles.language}>
							{attributes.languageMode || "text"}
						</div>
						{attributes.filename || " "}
					</div>
					<AceEditor
						{...defaultAceProps}
						mode={attributes.languageMode || "text"}
						value={decodeEntities(attributes.content ?? "")}
						onChange={(content: string): void =>
							setAttributes({ content: escapeHTML(content) })
						}
					/>
					<div style={styles.footer} />
				</div>
			</div>
		</Fragment>
	);
};

CodeEdit.additionalAttributes = {
	languageMode: {
		type: "string",
		default: "text",
	},
	filename: {
		type: "string",
		default: "",
	},
} as const;
export default CodeEdit;
