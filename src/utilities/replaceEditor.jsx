const { addFilter } = wp.hooks
const { createHigherOrderComponent } = wp.compose || {}

const replaceEditor = (blockName, ReplacementEditor) => {
  const hookName = "gutenberg-advanced-code/replace-" + blockName.replace('/', '-') + "-editor"

  addFilter('editor.BlockEdit', hookName, createHigherOrderComponent((BlockEdit) => props => {
    if (props.name !== blockName) {
      return <BlockEdit {...props} />
    }
    return <ReplacementEditor {...props} OriginalEditor={BlockEdit} />
  }));
}

export default replaceEditor
