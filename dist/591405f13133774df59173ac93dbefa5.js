function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/mode/lisp_highlight_rules", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text_highlight_rules"
], function(require, exports1, module1) {
    "use strict";
    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    var LispHighlightRules = function LispHighlightRules() {
        var keywordControl = "case|do|let|loop|if|else|when";
        var keywordOperator = "eq|neq|and|or";
        var constantLanguage = "null|nil";
        var supportFunctions = "cons|car|cdr|cond|lambda|format|setq|setf|quote|eval|append|list|listp|memberp|t|load|progn";
        var keywordMapper = this.createKeywordMapper({
            "keyword.control": keywordControl,
            "keyword.operator": keywordOperator,
            "constant.language": constantLanguage,
            "support.function": supportFunctions
        }, "identifier", true);
        this.$rules = {
            "start": [
                {
                    token: "comment",
                    regex: ";.*$"
                },
                {
                    token: [
                        "storage.type.function-type.lisp",
                        "text",
                        "entity.name.function.lisp"
                    ],
                    regex: "(?:\\b(?:(defun|defmethod|defmacro))\\b)(\\s+)((?:\\w|\\-|\\!|\\?)*)"
                },
                {
                    token: [
                        "punctuation.definition.constant.character.lisp",
                        "constant.character.lisp"
                    ],
                    regex: "(#)((?:\\w|[\\\\+-=<>'\"&#])+)"
                },
                {
                    token: [
                        "punctuation.definition.variable.lisp",
                        "variable.other.global.lisp",
                        "punctuation.definition.variable.lisp"
                    ],
                    regex: "(\\*)(\\S*)(\\*)"
                },
                {
                    token: "constant.numeric",
                    regex: "0[xX][0-9a-fA-F]+(?:L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
                },
                {
                    token: "constant.numeric",
                    regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(?:L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
                },
                {
                    token: keywordMapper,
                    regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                },
                {
                    token: "string",
                    regex: '"(?=.)',
                    next: "qqstring"
                }
            ],
            "qqstring": [
                {
                    token: "constant.character.escape.lisp",
                    regex: "\\\\."
                },
                {
                    token: "string",
                    regex: '[^"\\\\]+'
                },
                {
                    token: "string",
                    regex: "\\\\$",
                    next: "qqstring"
                },
                {
                    token: "string",
                    regex: '"|$',
                    next: "start"
                }
            ]
        };
    };
    oop.inherits(LispHighlightRules, TextHighlightRules);
    exports1.LispHighlightRules = LispHighlightRules;
});
ace.define("ace/mode/lisp", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text",
    "ace/mode/lisp_highlight_rules"
], function(require, exports1, module1) {
    "use strict";
    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var LispHighlightRules = require("./lisp_highlight_rules").LispHighlightRules;
    var Mode = function Mode() {
        this.HighlightRules = LispHighlightRules;
        this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);
    (function() {
        this.lineCommentStart = ";";
        this.$id = "ace/mode/lisp";
    }).call(Mode.prototype);
    exports1.Mode = Mode;
});
(function() {
    ace.require([
        "ace/mode/lisp"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
