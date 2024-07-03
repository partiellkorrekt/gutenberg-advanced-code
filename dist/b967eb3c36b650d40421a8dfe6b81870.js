function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/snippets/snippets.snippets", [
    "require",
    "exports",
    "module"
], function(require, exports1, module1) {
    module1.exports = "# snippets for making snippets :)\nsnippet snip\n\tsnippet ${1:trigger}\n\t\t${2}\nsnippet msnip\n\tsnippet ${1:trigger} ${2:description}\n\t\t${3}\nsnippet v\n\t{VISUAL}\n";
});
ace.define("ace/snippets/snippets", [
    "require",
    "exports",
    "module",
    "ace/snippets/snippets.snippets"
], function(require, exports1, module1) {
    "use strict";
    exports1.snippetText = require("./snippets.snippets");
    exports1.scope = "snippets";
});
(function() {
    ace.require([
        "ace/snippets/snippets"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
