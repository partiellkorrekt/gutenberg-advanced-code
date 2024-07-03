function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/mode/csp_highlight_rules", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text_highlight_rules"
], function(require, exports1, module1) {
    "use strict";
    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    var CspHighlightRules = function CspHighlightRules() {
        var keywordMapper = this.createKeywordMapper({
            "constant.language": "child-src|connect-src|default-src|font-src|frame-src|img-src|manifest-src|media-src|object-src" + "|script-src|style-src|worker-src|base-uri|plugin-types|sandbox|disown-opener|form-action|frame-ancestors|report-uri" + "|report-to|upgrade-insecure-requests|block-all-mixed-content|require-sri-for|reflected-xss|referrer|policy-uri",
            "variable": "'none'|'self'|'unsafe-inline'|'unsafe-eval'|'strict-dynamic'|'unsafe-hashed-attributes'"
        }, "identifier", true);
        this.$rules = {
            start: [
                {
                    token: "string.link",
                    regex: /https?:[^;\s]*/
                },
                {
                    token: "operator.punctuation",
                    regex: /;/
                },
                {
                    token: keywordMapper,
                    regex: /[^\s;]+/
                }
            ]
        };
    };
    oop.inherits(CspHighlightRules, TextHighlightRules);
    exports1.CspHighlightRules = CspHighlightRules;
});
ace.define("ace/mode/csp", [
    "require",
    "exports",
    "module",
    "ace/mode/text",
    "ace/mode/csp_highlight_rules",
    "ace/lib/oop"
], function(require, exports1, module1) {
    "use strict";
    var TextMode = require("./text").Mode;
    var CspHighlightRules = require("./csp_highlight_rules").CspHighlightRules;
    var oop = require("../lib/oop");
    var Mode = function Mode() {
        this.HighlightRules = CspHighlightRules;
    };
    oop.inherits(Mode, TextMode);
    (function() {
        this.$id = "ace/mode/csp";
    }).call(Mode.prototype);
    exports1.Mode = Mode;
});
(function() {
    ace.require([
        "ace/mode/csp"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
