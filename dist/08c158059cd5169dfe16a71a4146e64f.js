function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/snippets/csound_document.snippets", [
    "require",
    "exports",
    "module"
], function(require, exports1, module1) {
    module1.exports = "# <CsoundSynthesizer>\nsnippet synth\n\t<CsoundSynthesizer>\n\t<CsInstruments>\n\t${1}\n\t</CsInstruments>\n\t<CsScore>\n\te\n\t</CsScore>\n\t</CsoundSynthesizer>\n";
});
ace.define("ace/snippets/csound_document", [
    "require",
    "exports",
    "module",
    "ace/snippets/csound_document.snippets"
], function(require, exports1, module1) {
    "use strict";
    exports1.snippetText = require("./csound_document.snippets");
    exports1.scope = "csound_document";
});
(function() {
    ace.require([
        "ace/snippets/csound_document"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
