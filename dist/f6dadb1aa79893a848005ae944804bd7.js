function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/ext/linking", [
    "require",
    "exports",
    "module",
    "ace/editor",
    "ace/config"
], function(require, exports1, module1) {
    var Editor = require("../editor").Editor;
    require("../config").defineOptions(Editor.prototype, "editor", {
        enableLinking: {
            set: function set(val) {
                if (val) {
                    this.on("click", onClick);
                    this.on("mousemove", onMouseMove);
                } else {
                    this.off("click", onClick);
                    this.off("mousemove", onMouseMove);
                }
            },
            value: false
        }
    });
    exports1.previousLinkingHover = false;
    function onMouseMove(e) {
        var editor = e.editor;
        var ctrl = e.getAccelKey();
        if (ctrl) {
            var editor = e.editor;
            var docPos = e.getDocumentPosition();
            var session = editor.session;
            var token = session.getTokenAt(docPos.row, docPos.column);
            if (exports1.previousLinkingHover && exports1.previousLinkingHover != token) {
                editor._emit("linkHoverOut");
            }
            editor._emit("linkHover", {
                position: docPos,
                token: token
            });
            exports1.previousLinkingHover = token;
        } else if (exports1.previousLinkingHover) {
            editor._emit("linkHoverOut");
            exports1.previousLinkingHover = false;
        }
    }
    function onClick(e) {
        var ctrl = e.getAccelKey();
        var button = e.getButton();
        if (button == 0 && ctrl) {
            var editor = e.editor;
            var docPos = e.getDocumentPosition();
            var session = editor.session;
            var token = session.getTokenAt(docPos.row, docPos.column);
            editor._emit("linkClick", {
                position: docPos,
                token: token
            });
        }
    }
});
(function() {
    ace.require([
        "ace/ext/linking"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
