function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/snippets/dart.snippets", [
    "require",
    "exports",
    "module"
], function(require, exports1, module1) {
    module1.exports = "snippet lib\n\tlibrary ${1};\n\t${2}\nsnippet im\n\timport '${1}';\n\t${2}\nsnippet pa\n\tpart '${1}';\n\t${2}\nsnippet pao\n\tpart of ${1};\n\t${2}\nsnippet main\n\tvoid main() {\n\t  ${1:/* code */}\n\t}\nsnippet st\n\tstatic ${1}\nsnippet fi\n\tfinal ${1}\nsnippet re\n\treturn ${1}\nsnippet br\n\tbreak;\nsnippet th\n\tthrow ${1}\nsnippet cl\n\tclass ${1:`Filename(\"\", \"untitled\")`} ${2}\nsnippet imp\n\timplements ${1}\nsnippet ext\n\textends ${1}\nsnippet if\n\tif (${1:true}) {\n\t  ${2}\n\t}\nsnippet ife\n\tif (${1:true}) {\n\t  ${2}\n\t} else {\n\t  ${3}\n\t}\nsnippet el\n\telse\nsnippet sw\n\tswitch (${1}) {\n\t  ${2}\n\t}\nsnippet cs\n\tcase ${1}:\n\t  ${2}\nsnippet de\n\tdefault:\n\t  ${1}\nsnippet for\n\tfor (var ${2:i} = 0, len = ${1:things}.length; $2 < len; ${3:++}$2) {\n\t  ${4:$1[$2]}\n\t}\nsnippet fore\n\tfor (final ${2:item} in ${1:itemList}) {\n\t  ${3:/* code */}\n\t}\nsnippet wh\n\twhile (${1:/* condition */}) {\n\t  ${2:/* code */}\n\t}\nsnippet dowh\n\tdo {\n\t  ${2:/* code */}\n\t} while (${1:/* condition */});\nsnippet as\n\tassert(${1:/* condition */});\nsnippet try\n\ttry {\n\t  ${2}\n\t} catch (${1:Exception e}) {\n\t}\nsnippet tryf\n\ttry {\n\t  ${2}\n\t} catch (${1:Exception e}) {\n\t} finally {\n\t}\n";
});
ace.define("ace/snippets/dart", [
    "require",
    "exports",
    "module",
    "ace/snippets/dart.snippets"
], function(require, exports1, module1) {
    "use strict";
    exports1.snippetText = require("./dart.snippets");
    exports1.scope = "dart";
});
(function() {
    ace.require([
        "ace/snippets/dart"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
