function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/mode/cuttlefish_highlight_rules", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text_highlight_rules"
], function(require, exports1, module1) {
    "use strict";
    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    var CuttlefishHighlightRules = function CuttlefishHighlightRules() {
        this.$rules = {
            start: [
                {
                    token: [
                        'text',
                        'comment'
                    ],
                    regex: /^([ \t]*)(#.*)$/
                },
                {
                    token: [
                        'text',
                        'keyword',
                        'text',
                        'string',
                        'text',
                        'comment'
                    ],
                    regex: /^([ \t]*)(include)([ \t]*)([A-Za-z0-9-\_\.\*\/]+)([ \t]*)(#.*)?$/
                },
                {
                    token: [
                        'text',
                        'keyword',
                        'text',
                        'operator',
                        'text',
                        'string',
                        'text',
                        'comment'
                    ],
                    regex: /^([ \t]*)([A-Za-z0-9-_]+(?:\.[A-Za-z0-9-_]+)*)([ \t]*)(=)([ \t]*)([^ \t#][^#]*?)([ \t]*)(#.*)?$/
                },
                {
                    defaultToken: 'invalid'
                }
            ]
        };
        this.normalizeRules();
    };
    CuttlefishHighlightRules.metaData = {
        fileTypes: [
            'conf'
        ],
        keyEquivalent: '^~C',
        name: 'Cuttlefish',
        scopeName: 'source.conf'
    };
    oop.inherits(CuttlefishHighlightRules, TextHighlightRules);
    exports1.CuttlefishHighlightRules = CuttlefishHighlightRules;
});
ace.define("ace/mode/cuttlefish", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text",
    "ace/mode/cuttlefish_highlight_rules"
], function(require, exports1, module1) {
    "use strict";
    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var CuttlefishHighlightRules = require("./cuttlefish_highlight_rules").CuttlefishHighlightRules;
    var Mode = function Mode() {
        this.HighlightRules = CuttlefishHighlightRules;
        this.foldingRules = null;
        this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);
    (function() {
        this.lineCommentStart = "#";
        this.blockComment = null;
        this.$id = "ace/mode/cuttlefish";
    }).call(Mode.prototype);
    exports1.Mode = Mode;
});
(function() {
    ace.require([
        "ace/mode/cuttlefish"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
