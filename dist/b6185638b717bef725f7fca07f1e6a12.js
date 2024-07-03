function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/snippets/fsl.snippets", [
    "require",
    "exports",
    "module"
], function(require, exports1, module1) {
    module1.exports = "snippet header\n\tmachine_name     : \"\";\n\tmachine_author   : \"\";\n\tmachine_license  : MIT;\n\tmachine_comment  : \"\";\n\tmachine_language : en;\n\tmachine_version  : 1.0.0;\n\tfsl_version      : 1.0.0;\n\tstart_states     : [];\n";
});
ace.define("ace/snippets/fsl", [
    "require",
    "exports",
    "module",
    "ace/snippets/fsl.snippets"
], function(require, exports1, module1) {
    "use strict";
    exports1.snippetText = require("./fsl.snippets");
    exports1.scope = "fsl";
});
(function() {
    ace.require([
        "ace/snippets/fsl"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
