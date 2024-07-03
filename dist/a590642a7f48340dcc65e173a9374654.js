function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/snippets/graphqlschema.snippets", [
    "require",
    "exports",
    "module"
], function(require, exports1, module1) {
    module1.exports = "# Type Snippet\ntrigger type\nsnippet type\n\ttype ${1:type_name} {\n\t\t${2:type_siblings}\n\t}\n\n# Input Snippet\ntrigger input\nsnippet input\n\tinput ${1:input_name} {\n\t\t${2:input_siblings}\n\t}\n\n# Interface Snippet\ntrigger interface\nsnippet interface\n\tinterface ${1:interface_name} {\n\t\t${2:interface_siblings}\n\t}\n\n# Interface Snippet\ntrigger union\nsnippet union\n\tunion ${1:union_name} = ${2:type} | ${3: type}\n\n# Enum Snippet\ntrigger enum\nsnippet enum\n\tenum ${1:enum_name} {\n\t\t${2:enum_siblings}\n\t}\n";
});
ace.define("ace/snippets/graphqlschema", [
    "require",
    "exports",
    "module",
    "ace/snippets/graphqlschema.snippets"
], function(require, exports1, module1) {
    "use strict";
    exports1.snippetText = require("./graphqlschema.snippets");
    exports1.scope = "graphqlschema";
});
(function() {
    ace.require([
        "ace/snippets/graphqlschema"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
