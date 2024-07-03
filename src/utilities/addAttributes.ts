import type { Block } from "@wordpress/blocks";
import { addFilter } from "@wordpress/hooks";
import _ from "lodash";

const camel2dash = (string: string): string =>
	string.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);

const addAttributes = <T extends {}>(
	blockName: string,
	additionalAttributes: Block<T>["attributes"],
): void => {
	const registerHookName = `gutenberg-advanced-code/add-${blockName.replace("/", "-")}-attributes`;
	const saveHookName = `gutenberg-advanced-code/save-${blockName.replace("/", "-")}-attributes`;

	addFilter(
		"blocks.registerBlockType",
		registerHookName,
		(settings: Block<T>, name: string): Block<T> => {
			if (name !== blockName) {
				return settings;
			}

			return {
				...settings,
				attributes: {
					...settings.attributes,
					// biome-ignore lint/complexity/noBannedTypes: <explanation>
					..._.mapValues(additionalAttributes, (attribute: {}, name) => ({
						...attribute,
						source: "attribute",
						selector: "pre",
						attribute: `data-${camel2dash(name)}`,
					})),
				},
			};
		},
	);

	addFilter(
		"blocks.getSaveContent.extraProps",
		saveHookName,
		(
			props: object,
			{ name }: { name: string },
			attributes: { [name: string]: string },
		) => {
			if (name !== blockName) {
				return props;
			}
			return {
				...props,
				..._.pickBy(
					_.mapKeys(
						_.mapValues(
							additionalAttributes,
							(value: { default: string }, name: string) => {
								// biome-ignore lint/style/noNonNullAssertion: <explanation>
								if (!attributes[name] || attributes[name] === value!.default) {
									return undefined;
								}
								return attributes[name];
							},
						),
						(_attribute, name) => `data-${camel2dash(name)}`,
					),
					_.identity,
				),
			};
		},
	);
};

export default addAttributes;
