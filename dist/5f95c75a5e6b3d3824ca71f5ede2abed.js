function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/snippets/makefile.snippets", [
    "require",
    "exports",
    "module"
], function(require, exports1, module1) {
    module1.exports = "snippet ifeq\n\tifeq (${1:cond0},${2:cond1})\n\t\t${3:code}\n\tendif\n";
});
ace.define("ace/snippets/makefile", [
    "require",
    "exports",
    "module",
    "ace/snippets/makefile.snippets"
], function(require, exports1, module1) {
    "use strict";
    exports1.snippetText = require("./makefile.snippets");
    exports1.scope = "makefile";
});
(function() {
    ace.require([
        "ace/snippets/makefile"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
