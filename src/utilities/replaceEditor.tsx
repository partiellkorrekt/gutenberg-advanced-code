const { addFilter } = wp.hooks
const { createHigherOrderComponent } = wp.compose

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function replaceEditor<T extends string>(blockName: string, ReplacementEditor: EditorComponent<T>): void {
  const hookName = 'gutenberg-advanced-code/replace-' + blockName.replace('/', '-') + '-editor'

  addFilter(
    'editor.BlockEdit',
    hookName,
    createHigherOrderComponent(BlockEdit => (props: EditorComponentProps<T>): React.ReactNode => {
      if (props.name !== blockName) {
        return <BlockEdit {...props} />
      }
      return <ReplacementEditor {...props} OriginalEditor={BlockEdit} />
    })
  )
}

export default replaceEditor
