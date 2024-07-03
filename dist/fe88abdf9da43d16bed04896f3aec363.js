function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/snippets/razor.snippets", [
    "require",
    "exports",
    "module"
], function(require, exports1, module1) {
    module1.exports = "snippet if\n(${1} == ${2}) {\n\t${3}\n}";
});
ace.define("ace/snippets/razor", [
    "require",
    "exports",
    "module",
    "ace/snippets/razor.snippets"
], function(require, exports1, module1) {
    "use strict";
    exports1.snippetText = require("./razor.snippets");
    exports1.scope = "razor";
});
(function() {
    ace.require([
        "ace/snippets/razor"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
