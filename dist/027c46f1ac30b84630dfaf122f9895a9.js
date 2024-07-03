function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/snippets/drools.snippets", [
    "require",
    "exports",
    "module"
], function(require, exports1, module1) {
    module1.exports = "\nsnippet rule\n\trule \"${1?:rule_name}\"\n\twhen\n\t\t${2:// when...} \n\tthen\n\t\t${3:// then...}\n\tend\n\nsnippet query\n\tquery ${1?:query_name}\n\t\t${2:// find} \n\tend\n\t\nsnippet declare\n\tdeclare ${1?:type_name}\n\t\t${2:// attributes} \n\tend\n\n";
});
ace.define("ace/snippets/drools", [
    "require",
    "exports",
    "module",
    "ace/snippets/drools.snippets"
], function(require, exports1, module1) {
    "use strict";
    exports1.snippetText = require("./drools.snippets");
    exports1.scope = "drools";
});
(function() {
    ace.require([
        "ace/snippets/drools"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
