import AceEditor from "react-ace-builds"
import "react-ace-builds/webpack-resolver-min"
import { escape, unescape } from '@wordpress/block-library/src/code/utils'
import _ from 'lodash'

const { InspectorControls } = wp.editor
const { PanelBody, SelectControl, TextControl } = wp.components
const { __ } = wp.i18n

export const modes = _.keys(ace.config.get('$moduleUrls')).filter(x => x.startsWith('ace/mode/')).map(x => x.substr(9))
const modeOptions = modes.map(name => ({
  label: __(name),
  value: name
}))

const defaultAceProps = {
  theme: 'monokai',
  editorProps: { $blockScrolling: false },
  width: '100%',
  minLines: 1,
  maxLines: Infinity,
  tabSize: 2,
  fontSize: 'inherit'
}

const styles = {
  wrap: {
    borderRadius: '5px',
    backgroundColor: '#272822',
    overflow: 'hidden',
    color: 'white',
    fontFamily: 'sans-serif',
    margin: '0 -10px'
  },
  header: {
    padding: '0px 10px',
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.7)'
  },
  language: {
    backgroundColor: '#66D9EF',
    float: 'right',
    padding: '0px 10px',
    marginRight: '-10px',
    marginLeft: '10px',
    marginBottom: '5px',
    color: '#000',
    borderBottomLeftRadius: '5px'
  },
  footer: {
    height: '5px'
  }
}

const CodeEdit = ({ attributes, setAttributes, className }) =>
  <>
    <InspectorControls>
      <PanelBody
        title={__('Code Properties')}
        initialOpen={true}
      >
        <SelectControl
          label={__('Language Mode')}
          value={attributes.languageMode || 'text'}
          options={modeOptions}
          onChange={(languageMode) => setAttributes({ languageMode })}
        />
        <TextControl
          label={__('Filename')}
          value={attributes.filename || ''}
          onChange={(filename) => setAttributes({ filename })}
        />
      </PanelBody>
    </InspectorControls>
    <div className={className} style={styles.wrap}>
      <div style={styles.header}>
        <div style={styles.language}>{attributes.languageMode || 'text'}</div>
        {attributes.filename || ' '}
      </div>
      <AceEditor
        {...defaultAceProps}
        mode={attributes.languageMode || 'text'}
        value={unescape(attributes.content || '')}
        onChange={(content) => setAttributes({ content: escape(content) })}
      />
      <div style={styles.footer} />
    </div>
  </>

CodeEdit.additionalAttributes = {
  languageMode: {
    type: 'string',
    default: 'text',
  },
  filename: {
    type: 'string',
    default: '',
  }
}
export default CodeEdit
