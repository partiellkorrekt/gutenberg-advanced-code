function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/snippets/haml.snippets", [
    "require",
    "exports",
    "module"
], function(require, exports1, module1) {
    module1.exports = "snippet t\n\t%table\n\t\t%tr\n\t\t\t%th\n\t\t\t\t${1:headers}\n\t\t%tr\n\t\t\t%td\n\t\t\t\t${2:headers}\nsnippet ul\n\t%ul\n\t\t%li\n\t\t\t${1:item}\n\t\t%li\nsnippet =rp\n\t= render :partial => '${1:partial}'\nsnippet =rpl\n\t= render :partial => '${1:partial}', :locals => {}\nsnippet =rpc\n\t= render :partial => '${1:partial}', :collection => @$1\n\n";
});
ace.define("ace/snippets/haml", [
    "require",
    "exports",
    "module",
    "ace/snippets/haml.snippets"
], function(require, exports1, module1) {
    "use strict";
    exports1.snippetText = require("./haml.snippets");
    exports1.scope = "haml";
});
(function() {
    ace.require([
        "ace/snippets/haml"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
