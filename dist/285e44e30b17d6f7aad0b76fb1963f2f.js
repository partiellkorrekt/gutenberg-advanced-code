function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/snippets/lua.snippets", [
    "require",
    "exports",
    "module"
], function(require, exports1, module1) {
    module1.exports = "snippet #!\n\t#!/usr/bin/env lua\n\t$1\nsnippet local\n\tlocal ${1:x} = ${2:1}\nsnippet fun\n\tfunction ${1:fname}(${2:...})\n\t\t${3:-- body}\n\tend\nsnippet for\n\tfor ${1:i}=${2:1},${3:10} do\n\t\t${4:print(i)}\n\tend\nsnippet forp\n\tfor ${1:i},${2:v} in pairs(${3:table_name}) do\n\t   ${4:-- body}\n\tend\nsnippet fori\n\tfor ${1:i},${2:v} in ipairs(${3:table_name}) do\n\t   ${4:-- body}\n\tend\n";
});
ace.define("ace/snippets/lua", [
    "require",
    "exports",
    "module",
    "ace/snippets/lua.snippets"
], function(require, exports1, module1) {
    "use strict";
    exports1.snippetText = require("./lua.snippets");
    exports1.scope = "lua";
});
(function() {
    ace.require([
        "ace/snippets/lua"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
