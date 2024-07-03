function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/snippets/maze.snippets", [
    "require",
    "exports",
    "module"
], function(require, exports1, module1) {
    module1.exports = "snippet >\ndescription assignment\nscope maze\n\t-> ${1}= ${2}\n\nsnippet >\ndescription if\nscope maze\n\t-> IF ${2:**} THEN %${3:L} ELSE %${4:R}\n";
});
ace.define("ace/snippets/maze", [
    "require",
    "exports",
    "module",
    "ace/snippets/maze.snippets"
], function(require, exports1, module1) {
    "use strict";
    exports1.snippetText = require("./maze.snippets");
    exports1.scope = "maze";
});
(function() {
    ace.require([
        "ace/snippets/maze"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
