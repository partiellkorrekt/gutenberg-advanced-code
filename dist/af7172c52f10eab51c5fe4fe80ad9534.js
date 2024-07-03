function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/snippets/diff.snippets", [
    "require",
    "exports",
    "module"
], function(require, exports1, module1) {
    module1.exports = "# DEP-3 (http://dep.debian.net/deps/dep3/) style patch header\nsnippet header DEP-3 style header\n\tDescription: ${1}\n\tOrigin: ${2:vendor|upstream|other}, ${3:url of the original patch}\n\tBug: ${4:url in upstream bugtracker}\n\tForwarded: ${5:no|not-needed|url}\n\tAuthor: ${6:`g:snips_author`}\n\tReviewed-by: ${7:name and email}\n\tLast-Update: ${8:`strftime(\"%Y-%m-%d\")`}\n\tApplied-Upstream: ${9:upstream version|url|commit}\n\n";
});
ace.define("ace/snippets/diff", [
    "require",
    "exports",
    "module",
    "ace/snippets/diff.snippets"
], function(require, exports1, module1) {
    "use strict";
    exports1.snippetText = require("./diff.snippets");
    exports1.scope = "diff";
});
(function() {
    ace.require([
        "ace/snippets/diff"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
