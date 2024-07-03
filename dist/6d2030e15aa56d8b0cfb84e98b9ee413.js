function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/mode/plain_text", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text",
    "ace/mode/text_highlight_rules",
    "ace/mode/behaviour"
], function(require, exports1, module1) {
    "use strict";
    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    var Behaviour = require("./behaviour").Behaviour;
    var Mode = function Mode() {
        this.HighlightRules = TextHighlightRules;
        this.$behaviour = new Behaviour();
    };
    oop.inherits(Mode, TextMode);
    (function() {
        this.type = "text";
        this.getNextLineIndent = function(state, line, tab) {
            return '';
        };
        this.$id = "ace/mode/plain_text";
    }).call(Mode.prototype);
    exports1.Mode = Mode;
});
(function() {
    ace.require([
        "ace/mode/plain_text"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
