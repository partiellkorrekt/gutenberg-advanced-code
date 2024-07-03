function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/mode/doc_comment_highlight_rules", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text_highlight_rules"
], function(require, exports1, module1) {
    "use strict";
    var oop = require("../lib/oop");
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    var DocCommentHighlightRules = function DocCommentHighlightRules1() {
        this.$rules = {
            "start": [
                {
                    token: "comment.doc.tag",
                    regex: "@\\w+(?=\\s|$)"
                },
                DocCommentHighlightRules.getTagRule(),
                {
                    defaultToken: "comment.doc.body",
                    caseInsensitive: true
                }
            ]
        };
    };
    oop.inherits(DocCommentHighlightRules, TextHighlightRules);
    DocCommentHighlightRules.getTagRule = function(start) {
        return {
            token: "comment.doc.tag.storage.type",
            regex: "\\b(?:TODO|FIXME|XXX|HACK)\\b"
        };
    };
    DocCommentHighlightRules.getStartRule = function(start) {
        return {
            token: "comment.doc",
            regex: /\/\*\*(?!\/)/,
            next: start
        };
    };
    DocCommentHighlightRules.getEndRule = function(start) {
        return {
            token: "comment.doc",
            regex: "\\*\\/",
            next: start
        };
    };
    exports1.DocCommentHighlightRules = DocCommentHighlightRules;
});
ace.define("ace/mode/edifact_highlight_rules", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/doc_comment_highlight_rules",
    "ace/mode/text_highlight_rules"
], function(require, exports1, module1) {
    "use strict";
    var oop = require("../lib/oop");
    var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
    var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
    var EdifactHighlightRules = function EdifactHighlightRules() {
        var header = "UNH";
        var segment = "ADR|AGR|AJT|ALC|ALI|APP|APR|ARD|ARR|ASI|ATT|AUT|" + "BAS|BGM|BII|BUS|" + "CAV|CCD|CCI|CDI|CDS|CDV|CED|CIN|CLA|CLI|CMP|CNI|CNT|COD|COM|COT|CPI|CPS|CPT|CST|CTA|CUX|" + "DAM|DFN|DGS|DII|DIM|DLI|DLM|DMS|DOC|DRD|DSG|DSI|DTM|" + "EDT|EFI|ELM|ELU|ELV|EMP|EQA|EQD|EQN|ERC|ERP|EVE|FCA|FII|FNS|FNT|FOR|FSQ|FTX|" + "GDS|GEI|GID|GIN|GIR|GOR|GPO|GRU|HAN|HYN|ICD|IDE|IFD|IHC|IMD|IND|INP|INV|IRQ|" + "LAN|LIN|LOC|MEA|MEM|MKS|MOA|MSG|MTD|NAD|NAT|" + "PAC|PAI|PAS|PCC|PCD|PCI|PDI|PER|PGI|PIA|PNA|POC|PRC|PRI|PRV|PSD|PTY|PYT|" + "QRS|QTY|QUA|QVR|" + "RCS|REL|RFF|RJL|RNG|ROD|RSL|RTE|" + "SAL|SCC|SCD|SEG|SEL|SEQ|SFI|SGP|SGU|SPR|SPS|STA|STC|STG|STS|" + "TAX|TCC|TDT|TEM|TMD|TMP|TOD|TPL|TRU|TSR|" + "UNB|UNZ|UNT|UGH|UGT|UNS|" + "VLI";
        var header = "UNH";
        var buildinConstants = "null|Infinity|NaN|undefined";
        var langClasses = "";
        var keywords = "BY|SE|ON|INV|JP|UNOA";
        var keywordMapper = this.createKeywordMapper({
            "variable.language": "this",
            "keyword": keywords,
            "entity.name.segment": segment,
            "entity.name.header": header,
            "constant.language": buildinConstants,
            "support.function": langClasses
        }, "identifier");
        this.$rules = {
            "start": [
                {
                    token: "punctuation.operator",
                    regex: "\\+.\\+"
                },
                {
                    token: "constant.language.boolean",
                    regex: "(?:true|false)\\b"
                },
                {
                    token: keywordMapper,
                    regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                },
                {
                    token: "keyword.operator",
                    regex: "\\+"
                },
                {
                    token: "punctuation.operator",
                    regex: "\\:|'"
                },
                {
                    token: "identifier",
                    regex: "\\:D\\:"
                }
            ]
        };
        this.embedRules(DocCommentHighlightRules, "doc-", [
            DocCommentHighlightRules.getEndRule("start")
        ]);
    };
    EdifactHighlightRules.metaData = {
        fileTypes: [
            'edi'
        ],
        keyEquivalent: '^~E',
        name: 'Edifact',
        scopeName: 'source.edifact'
    };
    oop.inherits(EdifactHighlightRules, TextHighlightRules);
    exports1.EdifactHighlightRules = EdifactHighlightRules;
});
ace.define("ace/mode/edifact", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text",
    "ace/mode/edifact_highlight_rules"
], function(require, exports1, module1) {
    "use strict";
    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var EdifactHighlightRules = require("./edifact_highlight_rules").EdifactHighlightRules;
    var Mode = function Mode() {
        this.HighlightRules = EdifactHighlightRules;
        this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);
    (function() {
        this.$id = "ace/mode/edifact";
        this.snippetFileId = "ace/snippets/edifact";
    }).call(Mode.prototype);
    exports1.Mode = Mode;
});
(function() {
    ace.require([
        "ace/mode/edifact"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
