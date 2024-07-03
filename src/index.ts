import CodeEdit from "./CodeEdit";
import addAttributes from "./utilities/addAttributes";
import replaceEditor from "./utilities/replaceEditor";

addAttributes("core/code", CodeEdit.additionalAttributes);
replaceEditor("core/code", CodeEdit);
