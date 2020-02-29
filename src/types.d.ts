interface BlockSettings<T extends string = string> {
  attributes: Partial<
    {
      [name in T]: {
        source: string
        selector: string
        attribute: string
      }
    }
  >
}
type InspectorControls = React.ComponentClass<{}>
type PanelBody = React.ComponentClass<{
  title: string
  initialOpen: boolean
}>

type ControlProps = {
  label: string
  value: string
  onChange: (value: string) => void
}
type SelectControl = React.ComponentClass<
  ControlProps & {
    options: {
      label: string
      value: string
    }[]
  }
>
type TextControl = React.ComponentClass<ControlProps & {}>

type Attributes<T extends string> = Omit<{ [name in T]: string }, ''>

type EditorComponentProps<T extends string = string> = {
  name: string
  attributes: Attributes<T>
  setAttributes: (arg: Partial<Attributes<T>>) => void
  className: string
  OriginalEditor?: React.ComponentClass
}

type EditorComponent<T extends string = string> = React.FunctionComponent<EditorComponentProps<T>> & {
  additionalAttributes: Partial<Omit<{ [name in T]: { type: string; default: string } }, ''>>
}

interface WP {
  element: {
    createElement: typeof React.createElement
    Fragment: typeof React.Fragment
  }
  editor: {
    InspectorControls: InspectorControls
  }
  components: {
    PanelBody: PanelBody
    SelectControl: SelectControl
    TextControl: TextControl
  }
  i18n: {
    __: (key: string) => string
  }
  hooks: {
    addFilter: (filter: string, id: string, func: unknown) => void
  }
  compose: {
    createHigherOrderComponent: <T extends string>(
      hoc: (
        component: React.ComponentClass
      ) => (props: {
        name: string
        attributes: Attributes<T>
        setAttributes: (arg: {}) => void
        className: string
      }) => React.ReactNode
    ) => React.FunctionComponent
  }
}

declare const wp: WP
declare const ace: {
  config: {
    get: (key: '$moduleUrls') => { [name: string]: string }
  }
}
