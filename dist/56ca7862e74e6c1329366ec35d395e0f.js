function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/theme/textmate", [
    "require",
    "exports",
    "module",
    "ace/theme/textmate-css",
    "ace/lib/dom"
], function(require, exports1, module1) {
    "use strict";
    exports1.isDark = false;
    exports1.cssClass = "ace-tm";
    exports1.cssText = require("./textmate-css");
    exports1.$id = "ace/theme/textmate";
    var dom = require("../lib/dom");
    dom.importCssString(exports1.cssText, exports1.cssClass, false);
});
(function() {
    ace.require([
        "ace/theme/textmate"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
