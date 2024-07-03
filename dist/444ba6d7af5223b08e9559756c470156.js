function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/mode/gcode_highlight_rules", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text_highlight_rules"
], function(require, exports1, module1) {
    "use strict";
    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    var GcodeHighlightRules = function GcodeHighlightRules() {
        var keywords = "IF|DO|WHILE|ENDWHILE|CALL|ENDIF|SUB|ENDSUB|GOTO|REPEAT|ENDREPEAT|CALL";
        var builtinConstants = "PI";
        var builtinFunctions = "ATAN|ABS|ACOS|ASIN|SIN|COS|EXP|FIX|FUP|ROUND|LN|TAN";
        var keywordMapper = this.createKeywordMapper({
            "support.function": builtinFunctions,
            "keyword": keywords,
            "constant.language": builtinConstants
        }, "identifier", true);
        this.$rules = {
            "start": [
                {
                    token: "comment",
                    regex: "\\(.*\\)"
                },
                {
                    token: "comment",
                    regex: "([N])([0-9]+)"
                },
                {
                    token: "string",
                    regex: "([G])([0-9]+\\.?[0-9]?)"
                },
                {
                    token: "string",
                    regex: "([M])([0-9]+\\.?[0-9]?)"
                },
                {
                    token: "constant.numeric",
                    regex: "([-+]?([0-9]*\\.?[0-9]+\\.?))|(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)"
                },
                {
                    token: keywordMapper,
                    regex: "[A-Z]"
                },
                {
                    token: "keyword.operator",
                    regex: "EQ|LT|GT|NE|GE|LE|OR|XOR"
                },
                {
                    token: "paren.lparen",
                    regex: "[\\[]"
                },
                {
                    token: "paren.rparen",
                    regex: "[\\]]"
                },
                {
                    token: "text",
                    regex: "\\s+"
                }
            ]
        };
    };
    oop.inherits(GcodeHighlightRules, TextHighlightRules);
    exports1.GcodeHighlightRules = GcodeHighlightRules;
});
ace.define("ace/mode/gcode", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text",
    "ace/mode/gcode_highlight_rules",
    "ace/range"
], function(require, exports1, module1) {
    "use strict";
    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var GcodeHighlightRules = require("./gcode_highlight_rules").GcodeHighlightRules;
    var Range = require("../range").Range;
    var Mode = function Mode() {
        this.HighlightRules = GcodeHighlightRules;
        this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);
    (function() {
        this.$id = "ace/mode/gcode";
    }).call(Mode.prototype);
    exports1.Mode = Mode;
});
(function() {
    ace.require([
        "ace/mode/gcode"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
