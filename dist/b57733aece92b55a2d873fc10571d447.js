function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/mode/ada_highlight_rules", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text_highlight_rules"
], function(require, exports1, module1) {
    "use strict";
    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    var AdaHighlightRules = function AdaHighlightRules() {
        var keywords = "abort|else|new|return|abs|elsif|not|reverse|abstract|end|null|accept|entry|select|" + "access|exception|of|separate|aliased|exit|or|some|all|others|subtype|and|for|out|synchronized|" + "array|function|overriding|at|tagged|generic|package|task|begin|goto|pragma|terminate|" + "body|private|then|if|procedure|type|case|in|protected|constant|interface|until|" + "|is|raise|use|declare|range|delay|limited|record|when|delta|loop|rem|while|digits|renames|with|do|mod|requeue|xor";
        var builtinConstants = "true|false|null";
        var builtinFunctions = "count|min|max|avg|sum|rank|now|coalesce|main";
        var keywordMapper = this.createKeywordMapper({
            "support.function": builtinFunctions,
            "keyword": keywords,
            "constant.language": builtinConstants
        }, "identifier", true);
        this.$rules = {
            "start": [
                {
                    token: "comment",
                    regex: "--.*$"
                },
                {
                    token: "string",
                    regex: '".*?"'
                },
                {
                    token: "string",
                    regex: "'.'"
                },
                {
                    token: "constant.numeric",
                    regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
                },
                {
                    token: keywordMapper,
                    regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                },
                {
                    token: "keyword.operator",
                    regex: "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
                },
                {
                    token: "paren.lparen",
                    regex: "[\\(]"
                },
                {
                    token: "paren.rparen",
                    regex: "[\\)]"
                },
                {
                    token: "text",
                    regex: "\\s+"
                }
            ]
        };
    };
    oop.inherits(AdaHighlightRules, TextHighlightRules);
    exports1.AdaHighlightRules = AdaHighlightRules;
});
ace.define("ace/mode/ada", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text",
    "ace/mode/ada_highlight_rules",
    "ace/range"
], function(require, exports1, module1) {
    "use strict";
    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var AdaHighlightRules = require("./ada_highlight_rules").AdaHighlightRules;
    var Range = require("../range").Range;
    var Mode = function Mode() {
        this.HighlightRules = AdaHighlightRules;
        this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);
    (function() {
        this.lineCommentStart = "--";
        this.getNextLineIndent = function(state, line, tab) {
            var indent = this.$getIndent(line);
            var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
            var tokens = tokenizedLine.tokens;
            if (tokens.length && tokens[tokens.length - 1].type == "comment") {
                return indent;
            }
            if (state == "start") {
                var match = line.match(/^.*(begin|loop|then|is|do)\s*$/);
                if (match) {
                    indent += tab;
                }
            }
            return indent;
        };
        this.checkOutdent = function(state, line, input) {
            var complete_line = line + input;
            if (complete_line.match(/^\s*(begin|end)$/)) {
                return true;
            }
            return false;
        };
        this.autoOutdent = function(state, session, row) {
            var line = session.getLine(row);
            var prevLine = session.getLine(row - 1);
            var prevIndent = this.$getIndent(prevLine).length;
            var indent = this.$getIndent(line).length;
            if (indent <= prevIndent) {
                return;
            }
            session.outdentRows(new Range(row, 0, row + 2, 0));
        };
        this.$id = "ace/mode/ada";
    }).call(Mode.prototype);
    exports1.Mode = Mode;
});
(function() {
    ace.require([
        "ace/mode/ada"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
