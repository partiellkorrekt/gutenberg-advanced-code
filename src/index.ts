import replaceEditor from './utilities/replaceEditor'
import CodeEdit from './CodeEdit'
import addAttributes from './utilities/addAttributes'

addAttributes('core/code', CodeEdit.additionalAttributes)
replaceEditor('core/code', CodeEdit)
