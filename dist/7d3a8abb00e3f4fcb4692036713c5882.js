function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/snippets/csound_orchestra.snippets", [
    "require",
    "exports",
    "module"
], function(require, exports1, module1) {
    module1.exports = "# else\nsnippet else\n\telse\n\t\t${1:/* statements */}\n# elseif\nsnippet elseif\n\telseif ${1:/* condition */} then\n\t\t${2:/* statements */}\n# if\nsnippet if\n\tif ${1:/* condition */} then\n\t\t${2:/* statements */}\n\tendif\n# instrument block\nsnippet instr\n\tinstr ${1:name}\n\t\t${2:/* statements */}\n\tendin\n# i-time while loop\nsnippet iwhile\n\ti${1:Index} = ${2:0}\n\twhile i${1:Index} < ${3:/* count */} do\n\t\t${4:/* statements */}\n\t\ti${1:Index} += 1\n\tod\n# k-rate while loop\nsnippet kwhile\n\tk${1:Index} = ${2:0}\n\twhile k${1:Index} < ${3:/* count */} do\n\t\t${4:/* statements */}\n\t\tk${1:Index} += 1\n\tod\n# opcode\nsnippet opcode\n\topcode ${1:name}, ${2:/* output types */ 0}, ${3:/* input types */ 0}\n\t\t${4:/* statements */}\n\tendop\n# until loop\nsnippet until\n\tuntil ${1:/* condition */} do\n\t\t${2:/* statements */}\n\tod\n# while loop\nsnippet while\n\twhile ${1:/* condition */} do\n\t\t${2:/* statements */}\n\tod\n";
});
ace.define("ace/snippets/csound_orchestra", [
    "require",
    "exports",
    "module",
    "ace/snippets/csound_orchestra.snippets"
], function(require, exports1, module1) {
    "use strict";
    exports1.snippetText = require("./csound_orchestra.snippets");
    exports1.scope = "csound_orchestra";
});
(function() {
    ace.require([
        "ace/snippets/csound_orchestra"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
