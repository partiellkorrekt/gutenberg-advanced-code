function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/mode/lucene_highlight_rules", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text_highlight_rules"
], function(require, exports1, module1) {
    "use strict";
    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    var LuceneHighlightRules = function LuceneHighlightRules() {
        this.$rules = {
            "start": [
                {
                    token: "constant.language.escape",
                    regex: /\\[\-+&|!(){}\[\]^"~*?:\\]/
                },
                {
                    token: "constant.character.negation",
                    regex: "\\-"
                },
                {
                    token: "constant.character.interro",
                    regex: "\\?"
                },
                {
                    token: "constant.character.required",
                    regex: "\\+"
                },
                {
                    token: "constant.character.asterisk",
                    regex: "\\*"
                },
                {
                    token: 'constant.character.proximity',
                    regex: '~(?:0\\.[0-9]+|[0-9]+)?'
                },
                {
                    token: 'keyword.operator',
                    regex: '(AND|OR|NOT|TO)\\b'
                },
                {
                    token: "paren.lparen",
                    regex: "[\\(\\{\\[]"
                },
                {
                    token: "paren.rparen",
                    regex: "[\\)\\}\\]]"
                },
                {
                    token: "keyword.operator",
                    regex: /[><=^]/
                },
                {
                    token: "constant.numeric",
                    regex: /\d[\d.-]*/
                },
                {
                    token: "string",
                    regex: /"(?:\\"|[^"])*"/
                },
                {
                    token: "keyword",
                    regex: /(?:\\.|[^\s\-+&|!(){}\[\]^"~*?:\\])+:/,
                    next: "maybeRegex"
                },
                {
                    token: "term",
                    regex: /\w+/
                },
                {
                    token: "text",
                    regex: /\s+/
                }
            ],
            "maybeRegex": [
                {
                    token: "text",
                    regex: /\s+/
                },
                {
                    token: "string.regexp.start",
                    regex: "/",
                    next: "regex"
                },
                {
                    regex: "",
                    next: "start"
                }
            ],
            "regex": [
                {
                    token: "regexp.keyword.operator",
                    regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
                },
                {
                    token: "string.regexp.end",
                    regex: "/[sxngimy]*",
                    next: "start"
                },
                {
                    token: "invalid",
                    regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/
                },
                {
                    token: "constant.language.escape",
                    regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/
                },
                {
                    token: "constant.language.escape",
                    regex: "<\d+-\d+>|[~&@]"
                },
                {
                    token: "constant.language.delimiter",
                    regex: /\|/
                },
                {
                    token: "constant.language.escape",
                    regex: /\[\^?/,
                    next: "regex_character_class"
                },
                {
                    token: "empty",
                    regex: "$",
                    next: "start"
                },
                {
                    defaultToken: "string.regexp"
                }
            ],
            "regex_character_class": [
                {
                    token: "regexp.charclass.keyword.operator",
                    regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
                },
                {
                    token: "constant.language.escape",
                    regex: "]",
                    next: "regex"
                },
                {
                    token: "constant.language.escape",
                    regex: "-"
                },
                {
                    token: "empty",
                    regex: "$",
                    next: "start"
                },
                {
                    defaultToken: "string.regexp.characterclass"
                }
            ]
        };
    };
    oop.inherits(LuceneHighlightRules, TextHighlightRules);
    exports1.LuceneHighlightRules = LuceneHighlightRules;
});
ace.define("ace/mode/lucene", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text",
    "ace/mode/lucene_highlight_rules"
], function(require, exports1, module1) {
    'use strict';
    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var LuceneHighlightRules = require("./lucene_highlight_rules").LuceneHighlightRules;
    var Mode = function Mode() {
        this.HighlightRules = LuceneHighlightRules;
        this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);
    (function() {
        this.$id = "ace/mode/lucene";
    }).call(Mode.prototype);
    exports1.Mode = Mode;
});
(function() {
    ace.require([
        "ace/mode/lucene"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
