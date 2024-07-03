function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/mode/properties_highlight_rules", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text_highlight_rules"
], function(require, exports1, module1) {
    "use strict";
    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    var PropertiesHighlightRules = function PropertiesHighlightRules() {
        var escapeRe = /\\u[0-9a-fA-F]{4}|\\/;
        this.$rules = {
            "start": [
                {
                    token: "comment",
                    regex: /[!#].*$/
                },
                {
                    token: "keyword",
                    regex: /[=:]$/
                },
                {
                    token: "keyword",
                    regex: /[=:]/,
                    next: "value"
                },
                {
                    token: "constant.language.escape",
                    regex: escapeRe
                },
                {
                    defaultToken: "variable"
                }
            ],
            "value": [
                {
                    regex: /\\$/,
                    token: "string",
                    next: "value"
                },
                {
                    regex: /$/,
                    token: "string",
                    next: "start"
                },
                {
                    token: "constant.language.escape",
                    regex: escapeRe
                },
                {
                    defaultToken: "string"
                }
            ]
        };
    };
    oop.inherits(PropertiesHighlightRules, TextHighlightRules);
    exports1.PropertiesHighlightRules = PropertiesHighlightRules;
});
ace.define("ace/mode/properties", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text",
    "ace/mode/properties_highlight_rules"
], function(require, exports1, module1) {
    "use strict";
    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var PropertiesHighlightRules = require("./properties_highlight_rules").PropertiesHighlightRules;
    var Mode = function Mode() {
        this.HighlightRules = PropertiesHighlightRules;
        this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);
    (function() {
        this.$id = "ace/mode/properties";
    }).call(Mode.prototype);
    exports1.Mode = Mode;
});
(function() {
    ace.require([
        "ace/mode/properties"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
