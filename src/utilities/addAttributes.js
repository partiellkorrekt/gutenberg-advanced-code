const { addFilter } = wp.hooks
import _ from 'lodash'

const camel2dash = string => string.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)

const addAttributes = (blockName, additionalAttributes) => {
  const registerHookName = "gutenberg-advanced-code/add-" + blockName.replace('/', '-') + "-attributes"
  const saveHookName = "gutenberg-advanced-code/save-" + blockName.replace('/', '-') + "-attributes"

  addFilter('blocks.registerBlockType', registerHookName, (settings, name) => {
    if (name !== blockName) { return settings }

    settings.attributes = {
      ...settings.attributes,
      ..._.mapValues(additionalAttributes, (attribute, name) => ({
        ...attribute,
        source: 'attribute',
        selector: 'pre',
        attribute: 'data-' + camel2dash(name)
      }))
    }

    return settings
  });

  addFilter('blocks.getSaveContent.extraProps', saveHookName, (props, { name }, attributes) => {
    if (name !== blockName) { return props }
    return {
      ...props,
      ..._.pickBy(_.mapKeys(
        _.mapValues(additionalAttributes, (value, name) => {
          if (!attributes[name] || (attributes[name] === value.default)) {
            return undefined
          }
          return attributes[name]
        }),
        (attribute, name) => 'data-' + camel2dash(name)
      ), _.id)
    }
  })
}

export default addAttributes
