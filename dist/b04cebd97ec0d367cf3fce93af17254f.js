function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
ace.define("ace/occur", [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/search",
    "ace/edit_session",
    "ace/search_highlight",
    "ace/lib/dom"
], function(require, exports1, module1) {
    "use strict";
    var __extends = this && this.__extends || function() {
        var extendStatics = function extendStatics1(d, b) {
            extendStatics = Object.setPrototypeOf || _instanceof({
                __proto__: []
            }, Array) && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
            return extendStatics(d, b);
        };
        return function(d, b) {
            if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var oop = require("./lib/oop");
    var Search = require("./search").Search;
    var EditSession = require("./edit_session").EditSession;
    var SearchHighlight = require("./search_highlight").SearchHighlight;
    var Occur = /** @class */ function(_super) {
        __extends(Occur, _super);
        function Occur() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Occur.prototype.enter = function(editor, options) {
            if (!options.needle) return false;
            var pos = editor.getCursorPosition();
            this.displayOccurContent(editor, options);
            var translatedPos = this.originalToOccurPosition(editor.session, pos);
            editor.moveCursorToPosition(translatedPos);
            return true;
        };
        Occur.prototype.exit = function(editor, options) {
            var pos = options.translatePosition && editor.getCursorPosition();
            var translatedPos = pos && this.occurToOriginalPosition(editor.session, pos);
            this.displayOriginalContent(editor);
            if (translatedPos) editor.moveCursorToPosition(translatedPos);
            return true;
        };
        Occur.prototype.highlight = function(sess, regexp) {
            var hl = sess.$occurHighlight = sess.$occurHighlight || sess.addDynamicMarker(new SearchHighlight(null, "ace_occur-highlight", "text"));
            hl.setRegexp(regexp);
            sess._emit("changeBackMarker"); // force highlight layer redraw
        };
        Occur.prototype.displayOccurContent = function(editor, options) {
            this.$originalSession = editor.session;
            var found = this.matchingLines(editor.session, options);
            var lines = found.map(function(foundLine) {
                return foundLine.content;
            });
            var occurSession = new EditSession(lines.join('\n'));
            occurSession.$occur = this;
            occurSession.$occurMatchingLines = found;
            editor.setSession(occurSession);
            this.$useEmacsStyleLineStart = this.$originalSession.$useEmacsStyleLineStart;
            occurSession.$useEmacsStyleLineStart = this.$useEmacsStyleLineStart;
            this.highlight(occurSession, options.re);
            occurSession._emit('changeBackMarker');
        };
        Occur.prototype.displayOriginalContent = function(editor) {
            editor.setSession(this.$originalSession);
            this.$originalSession.$useEmacsStyleLineStart = this.$useEmacsStyleLineStart;
        };
        Occur.prototype.originalToOccurPosition = function(session, pos) {
            var lines = session.$occurMatchingLines;
            var nullPos = {
                row: 0,
                column: 0
            };
            if (!lines) return nullPos;
            for(var i = 0; i < lines.length; i++){
                if (lines[i].row === pos.row) return {
                    row: i,
                    column: pos.column
                };
            }
            return nullPos;
        };
        Occur.prototype.occurToOriginalPosition = function(session, pos) {
            var lines = session.$occurMatchingLines;
            if (!lines || !lines[pos.row]) return pos;
            return {
                row: lines[pos.row].row,
                column: pos.column
            };
        };
        Occur.prototype.matchingLines = function(session, options) {
            options = oop.mixin({}, options);
            if (!session || !options.needle) return [];
            var search = new Search();
            search.set(options);
            return search.findAll(session).reduce(function(lines, range) {
                var row = range.start.row;
                var last = lines[lines.length - 1];
                return last && last.row === row ? lines : lines.concat({
                    row: row,
                    content: session.getLine(row)
                });
            }, []);
        };
        return Occur;
    }(Search);
    var dom = require('./lib/dom');
    dom.importCssString(".ace_occur-highlight {\n\
    border-radius: 4px;\n\
    background-color: rgba(87, 255, 8, 0.25);\n\
    position: absolute;\n\
    z-index: 4;\n\
    box-sizing: border-box;\n\
    box-shadow: 0 0 4px rgb(91, 255, 50);\n\
}\n\
.ace_dark .ace_occur-highlight {\n\
    background-color: rgb(80, 140, 85);\n\
    box-shadow: 0 0 4px rgb(60, 120, 70);\n\
}\n", "incremental-occur-highlighting", false);
    exports1.Occur = Occur;
});
ace.define("ace/commands/occur_commands", [
    "require",
    "exports",
    "module",
    "ace/config",
    "ace/occur",
    "ace/keyboard/hash_handler",
    "ace/lib/oop"
], function(require, exports1, module1) {
    var config = require("../config"), Occur = require("../occur").Occur;
    var occurStartCommand = {
        name: "occur",
        exec: function exec(editor, options) {
            var alreadyInOccur = !!editor.session.$occur;
            var occurSessionActive = new Occur().enter(editor, options);
            if (occurSessionActive && !alreadyInOccur) OccurKeyboardHandler.installIn(editor);
        },
        readOnly: true
    };
    var occurCommands = [
        {
            name: "occurexit",
            bindKey: 'esc|Ctrl-G',
            exec: function exec(editor) {
                var occur = editor.session.$occur;
                if (!occur) return;
                occur.exit(editor, {});
                if (!editor.session.$occur) OccurKeyboardHandler.uninstallFrom(editor);
            },
            readOnly: true
        },
        {
            name: "occuraccept",
            bindKey: 'enter',
            exec: function exec(editor) {
                var occur = editor.session.$occur;
                if (!occur) return;
                occur.exit(editor, {
                    translatePosition: true
                });
                if (!editor.session.$occur) OccurKeyboardHandler.uninstallFrom(editor);
            },
            readOnly: true
        }
    ];
    var HashHandler = require("../keyboard/hash_handler").HashHandler;
    var oop = require("../lib/oop");
    function OccurKeyboardHandler() {}
    oop.inherits(OccurKeyboardHandler, HashHandler);
    (function() {
        this.isOccurHandler = true;
        this.attach = function(editor) {
            HashHandler.call(this, occurCommands, editor.commands.platform);
            this.$editor = editor;
        };
        var handleKeyboard$super = this.handleKeyboard;
        this.handleKeyboard = function(data, hashId, key, keyCode) {
            var cmd = handleKeyboard$super.call(this, data, hashId, key, keyCode);
            return cmd && cmd.command ? cmd : undefined;
        };
    }).call(OccurKeyboardHandler.prototype);
    OccurKeyboardHandler.installIn = function(editor) {
        var handler = new this();
        editor.keyBinding.addKeyboardHandler(handler);
        editor.commands.addCommands(occurCommands);
    };
    OccurKeyboardHandler.uninstallFrom = function(editor) {
        editor.commands.removeCommands(occurCommands);
        var handler = editor.getKeyboardHandler();
        if (handler.isOccurHandler) editor.keyBinding.removeKeyboardHandler(handler);
    };
    exports1.occurStartCommand = occurStartCommand;
});
ace.define("ace/commands/incremental_search_commands", [
    "require",
    "exports",
    "module",
    "ace/config",
    "ace/lib/oop",
    "ace/keyboard/hash_handler",
    "ace/commands/occur_commands"
], function(require, exports1, module1) {
    var config = require("../config");
    var oop = require("../lib/oop");
    var HashHandler = require("../keyboard/hash_handler").HashHandler;
    var occurStartCommand = require("./occur_commands").occurStartCommand;
    exports1.iSearchStartCommands = [
        {
            name: "iSearch",
            bindKey: {
                win: "Ctrl-F",
                mac: "Command-F"
            },
            exec: function exec(editor, options) {
                config.loadModule([
                    "core",
                    "ace/incremental_search"
                ], function(e) {
                    var iSearch = e.iSearch = e.iSearch || new e.IncrementalSearch();
                    iSearch.activate(editor, options.backwards);
                    if (options.jumpToFirstMatch) iSearch.next(options);
                });
            },
            readOnly: true
        },
        {
            name: "iSearchBackwards",
            exec: function exec(editor, jumpToNext) {
                editor.execCommand('iSearch', {
                    backwards: true
                });
            },
            readOnly: true
        },
        {
            name: "iSearchAndGo",
            bindKey: {
                win: "Ctrl-K",
                mac: "Command-G"
            },
            exec: function exec(editor, jumpToNext) {
                editor.execCommand('iSearch', {
                    jumpToFirstMatch: true,
                    useCurrentOrPrevSearch: true
                });
            },
            readOnly: true
        },
        {
            name: "iSearchBackwardsAndGo",
            bindKey: {
                win: "Ctrl-Shift-K",
                mac: "Command-Shift-G"
            },
            exec: function exec(editor) {
                editor.execCommand('iSearch', {
                    jumpToFirstMatch: true,
                    backwards: true,
                    useCurrentOrPrevSearch: true
                });
            },
            readOnly: true
        }
    ];
    exports1.iSearchCommands = [
        {
            name: "restartSearch",
            bindKey: {
                win: "Ctrl-F",
                mac: "Command-F"
            },
            exec: function exec(iSearch) {
                iSearch.cancelSearch(true);
            }
        },
        {
            name: "searchForward",
            bindKey: {
                win: "Ctrl-S|Ctrl-K",
                mac: "Ctrl-S|Command-G"
            },
            exec: function exec(iSearch, options) {
                options.useCurrentOrPrevSearch = true;
                iSearch.next(options);
            }
        },
        {
            name: "searchBackward",
            bindKey: {
                win: "Ctrl-R|Ctrl-Shift-K",
                mac: "Ctrl-R|Command-Shift-G"
            },
            exec: function exec(iSearch, options) {
                options.useCurrentOrPrevSearch = true;
                options.backwards = true;
                iSearch.next(options);
            }
        },
        {
            name: "extendSearchTerm",
            exec: function exec(iSearch, string) {
                iSearch.addString(string);
            }
        },
        {
            name: "extendSearchTermSpace",
            bindKey: "space",
            exec: function exec(iSearch) {
                iSearch.addString(' ');
            }
        },
        {
            name: "shrinkSearchTerm",
            bindKey: "backspace",
            exec: function exec(iSearch) {
                iSearch.removeChar();
            }
        },
        {
            name: 'confirmSearch',
            bindKey: 'return',
            exec: function exec(iSearch) {
                iSearch.deactivate();
            }
        },
        {
            name: 'cancelSearch',
            bindKey: 'esc|Ctrl-G',
            exec: function exec(iSearch) {
                iSearch.deactivate(true);
            }
        },
        {
            name: 'occurisearch',
            bindKey: 'Ctrl-O',
            exec: function exec(iSearch) {
                var options = oop.mixin({}, iSearch.$options);
                iSearch.deactivate();
                occurStartCommand.exec(iSearch.$editor, options);
            }
        },
        {
            name: "yankNextWord",
            bindKey: "Ctrl-w",
            exec: function exec(iSearch) {
                var ed = iSearch.$editor, range = ed.selection.getRangeOfMovements(function(sel) {
                    sel.moveCursorWordRight();
                }), string = ed.session.getTextRange(range);
                iSearch.addString(string);
            }
        },
        {
            name: "yankNextChar",
            bindKey: "Ctrl-Alt-y",
            exec: function exec(iSearch) {
                var ed = iSearch.$editor, range = ed.selection.getRangeOfMovements(function(sel) {
                    sel.moveCursorRight();
                }), string = ed.session.getTextRange(range);
                iSearch.addString(string);
            }
        },
        {
            name: 'recenterTopBottom',
            bindKey: 'Ctrl-l',
            exec: function exec(iSearch) {
                iSearch.$editor.execCommand('recenterTopBottom');
            }
        },
        {
            name: 'selectAllMatches',
            bindKey: 'Ctrl-space',
            exec: function exec(iSearch) {
                var ed = iSearch.$editor, hl = ed.session.$isearchHighlight, ranges = hl && hl.cache ? hl.cache.reduce(function(ranges, ea) {
                    return ranges.concat(ea ? ea : []);
                }, []) : [];
                iSearch.deactivate(false);
                ranges.forEach(ed.selection.addRange.bind(ed.selection));
            }
        },
        {
            name: 'searchAsRegExp',
            bindKey: 'Alt-r',
            exec: function exec(iSearch) {
                iSearch.convertNeedleToRegExp();
            }
        }
    ].map(function(cmd) {
        cmd.readOnly = true;
        cmd.isIncrementalSearchCommand = true;
        cmd.scrollIntoView = "animate-cursor";
        return cmd;
    });
    function IncrementalSearchKeyboardHandler(iSearch) {
        this.$iSearch = iSearch;
    }
    oop.inherits(IncrementalSearchKeyboardHandler, HashHandler);
    (function() {
        this.attach = function(editor) {
            var iSearch = this.$iSearch;
            HashHandler.call(this, exports1.iSearchCommands, editor.commands.platform);
            this.$commandExecHandler = editor.commands.on('exec', function(e) {
                if (!e.command.isIncrementalSearchCommand) return iSearch.deactivate();
                e.stopPropagation();
                e.preventDefault();
                var scrollTop = editor.session.getScrollTop();
                var result = e.command.exec(iSearch, e.args || {});
                editor.renderer.scrollCursorIntoView(null, 0.5);
                editor.renderer.animateScrolling(scrollTop);
                return result;
            });
        };
        this.detach = function(editor) {
            if (!this.$commandExecHandler) return;
            editor.commands.off('exec', this.$commandExecHandler);
            delete this.$commandExecHandler;
        };
        var handleKeyboard$super = this.handleKeyboard;
        this.handleKeyboard = function(data, hashId, key, keyCode) {
            if ((hashId === 1 /*ctrl*/  || hashId === 8 /*command*/ ) && key === 'v' || hashId === 1 /*ctrl*/  && key === 'y') return null;
            var cmd = handleKeyboard$super.call(this, data, hashId, key, keyCode);
            if (cmd && cmd.command) {
                return cmd;
            }
            if (hashId == -1) {
                var extendCmd = this.commands.extendSearchTerm;
                if (extendCmd) {
                    return {
                        command: extendCmd,
                        args: key
                    };
                }
            }
            return false;
        };
    }).call(IncrementalSearchKeyboardHandler.prototype);
    exports1.IncrementalSearchKeyboardHandler = IncrementalSearchKeyboardHandler;
});
ace.define("ace/incremental_search", [
    "require",
    "exports",
    "module",
    "ace/range",
    "ace/search",
    "ace/search_highlight",
    "ace/commands/incremental_search_commands",
    "ace/lib/dom",
    "ace/commands/command_manager",
    "ace/editor",
    "ace/config"
], function(require, exports1, module1) {
    "use strict";
    var __extends = this && this.__extends || function() {
        var extendStatics = function extendStatics1(d, b) {
            extendStatics = Object.setPrototypeOf || _instanceof({
                __proto__: []
            }, Array) && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
            return extendStatics(d, b);
        };
        return function(d, b) {
            if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var Range = require("./range").Range;
    var Search = require("./search").Search;
    var SearchHighlight = require("./search_highlight").SearchHighlight;
    var iSearchCommandModule = require("./commands/incremental_search_commands");
    var ISearchKbd = iSearchCommandModule.IncrementalSearchKeyboardHandler;
    function isRegExp(obj) {
        return _instanceof(obj, RegExp);
    }
    function regExpToObject(re) {
        var string = String(re), start = string.indexOf('/'), flagStart = string.lastIndexOf('/');
        return {
            expression: string.slice(start + 1, flagStart),
            flags: string.slice(flagStart + 1)
        };
    }
    function stringToRegExp(string, flags) {
        try {
            return new RegExp(string, flags);
        } catch (e) {
            return string;
        }
    }
    function objectToRegExp(obj) {
        return stringToRegExp(obj.expression, obj.flags);
    }
    var IncrementalSearch = /** @class */ function(_super) {
        __extends(IncrementalSearch, _super);
        function IncrementalSearch() {
            var _this = _super.call(this) || this;
            _this.$options = {
                wrap: false,
                skipCurrent: false
            };
            _this.$keyboardHandler = new ISearchKbd(_this);
            return _this;
        }
        IncrementalSearch.prototype.activate = function(editor, backwards) {
            this.$editor = editor;
            this.$startPos = this.$currentPos = editor.getCursorPosition();
            this.$options.needle = '';
            this.$options.backwards = backwards;
            editor.keyBinding.addKeyboardHandler(this.$keyboardHandler);
            this.$originalEditorOnPaste = editor.onPaste;
            editor.onPaste = this.onPaste.bind(this);
            this.$mousedownHandler = editor.on('mousedown', this.onMouseDown.bind(this));
            this.selectionFix(editor);
            this.statusMessage(true);
        };
        IncrementalSearch.prototype.deactivate = function(reset) {
            this.cancelSearch(reset);
            var editor = this.$editor;
            editor.keyBinding.removeKeyboardHandler(this.$keyboardHandler);
            if (this.$mousedownHandler) {
                editor.off('mousedown', this.$mousedownHandler);
                delete this.$mousedownHandler;
            }
            editor.onPaste = this.$originalEditorOnPaste;
            this.message('');
        };
        IncrementalSearch.prototype.selectionFix = function(editor) {
            if (editor.selection.isEmpty() && !editor.session.$emacsMark) {
                editor.clearSelection();
            }
        };
        IncrementalSearch.prototype.highlight = function(regexp) {
            var sess = this.$editor.session, hl = sess.$isearchHighlight = sess.$isearchHighlight || sess.addDynamicMarker(new SearchHighlight(null, "ace_isearch-result", "text"));
            hl.setRegexp(regexp);
            sess._emit("changeBackMarker"); // force highlight layer redraw
        };
        IncrementalSearch.prototype.cancelSearch = function(reset) {
            var e = this.$editor;
            this.$prevNeedle = this.$options.needle;
            this.$options.needle = '';
            if (reset) {
                e.moveCursorToPosition(this.$startPos);
                this.$currentPos = this.$startPos;
            } else {
                e.pushEmacsMark && e.pushEmacsMark(this.$startPos, false);
            }
            this.highlight(null);
            return Range.fromPoints(this.$currentPos, this.$currentPos);
        };
        IncrementalSearch.prototype.highlightAndFindWithNeedle = function(moveToNext, needleUpdateFunc) {
            if (!this.$editor) return null;
            var options = this.$options;
            if (needleUpdateFunc) {
                options.needle = needleUpdateFunc.call(this, options.needle || '') || '';
            }
            if (options.needle.length === 0) {
                this.statusMessage(true);
                return this.cancelSearch(true);
            }
            options.start = this.$currentPos;
            var session = this.$editor.session, found = this.find(session), shouldSelect = this.$editor.emacsMark ? !!this.$editor.emacsMark() : !this.$editor.selection.isEmpty();
            if (found) {
                if (options.backwards) found = Range.fromPoints(found.end, found.start);
                this.$editor.selection.setRange(Range.fromPoints(shouldSelect ? this.$startPos : found.end, found.end));
                if (moveToNext) this.$currentPos = found.end;
                this.highlight(options.re);
            }
            this.statusMessage(found);
            return found;
        };
        IncrementalSearch.prototype.addString = function(s) {
            return this.highlightAndFindWithNeedle(false, function(needle) {
                if (!isRegExp(needle)) return needle + s;
                var reObj = regExpToObject(needle);
                reObj.expression += s;
                return objectToRegExp(reObj);
            });
        };
        IncrementalSearch.prototype.removeChar = function(c) {
            return this.highlightAndFindWithNeedle(false, function(needle) {
                if (!isRegExp(needle)) return needle.substring(0, needle.length - 1);
                var reObj = regExpToObject(needle);
                reObj.expression = reObj.expression.substring(0, reObj.expression.length - 1);
                return objectToRegExp(reObj);
            });
        };
        IncrementalSearch.prototype.next = function(options) {
            options = options || {};
            this.$options.backwards = !!options.backwards;
            this.$currentPos = this.$editor.getCursorPosition();
            return this.highlightAndFindWithNeedle(true, function(needle) {
                return options.useCurrentOrPrevSearch && needle.length === 0 ? this.$prevNeedle || '' : needle;
            });
        };
        IncrementalSearch.prototype.onMouseDown = function(evt) {
            this.deactivate();
            return true;
        };
        IncrementalSearch.prototype.onPaste = function(text) {
            this.addString(text);
        };
        IncrementalSearch.prototype.convertNeedleToRegExp = function() {
            return this.highlightAndFindWithNeedle(false, function(needle) {
                return isRegExp(needle) ? needle : stringToRegExp(needle, 'ig');
            });
        };
        IncrementalSearch.prototype.convertNeedleToString = function() {
            return this.highlightAndFindWithNeedle(false, function(needle) {
                return isRegExp(needle) ? regExpToObject(needle).expression : needle;
            });
        };
        IncrementalSearch.prototype.statusMessage = function(found) {
            var options = this.$options, msg = '';
            msg += options.backwards ? 'reverse-' : '';
            msg += 'isearch: ' + options.needle;
            msg += found ? '' : ' (not found)';
            this.message(msg);
        };
        IncrementalSearch.prototype.message = function(msg) {
            if (this.$editor.showCommandLine) {
                this.$editor.showCommandLine(msg);
                this.$editor.focus();
            }
        };
        return IncrementalSearch;
    }(Search);
    exports1.IncrementalSearch = IncrementalSearch;
    var dom = require('./lib/dom');
    dom.importCssString("\n.ace_marker-layer .ace_isearch-result {\n  position: absolute;\n  z-index: 6;\n  box-sizing: border-box;\n}\ndiv.ace_isearch-result {\n  border-radius: 4px;\n  background-color: rgba(255, 200, 0, 0.5);\n  box-shadow: 0 0 4px rgb(255, 200, 0);\n}\n.ace_dark div.ace_isearch-result {\n  background-color: rgb(100, 110, 160);\n  box-shadow: 0 0 4px rgb(80, 90, 140);\n}", "incremental-search-highlighting", false);
    var commands = require("./commands/command_manager");
    (function() {
        this.setupIncrementalSearch = function(editor, val) {
            if (this.usesIncrementalSearch == val) return;
            this.usesIncrementalSearch = val;
            var iSearchCommands = iSearchCommandModule.iSearchStartCommands;
            var method = val ? 'addCommands' : 'removeCommands';
            this[method](iSearchCommands);
        };
    }).call(commands.CommandManager.prototype);
    var Editor = require("./editor").Editor;
    require("./config").defineOptions(Editor.prototype, "editor", {
        useIncrementalSearch: {
            set: function set(val) {
                this.keyBinding.$handlers.forEach(function(handler) {
                    if (handler.setupIncrementalSearch) {
                        handler.setupIncrementalSearch(this, val);
                    }
                });
                this._emit('incrementalSearchSettingChanged', {
                    isEnabled: val
                });
            }
        }
    });
});
ace.define("ace/keyboard/emacs", [
    "require",
    "exports",
    "module",
    "ace/lib/dom",
    "ace/incremental_search",
    "ace/commands/incremental_search_commands",
    "ace/keyboard/hash_handler",
    "ace/lib/keys"
], function(require, exports1, module1) {
    "use strict";
    var dom = require("../lib/dom");
    require("../incremental_search");
    var iSearchCommandModule = require("../commands/incremental_search_commands");
    var HashHandler = require("./hash_handler").HashHandler;
    exports1.handler = new HashHandler();
    exports1.handler.isEmacs = true;
    exports1.handler.$id = "ace/keyboard/emacs";
    dom.importCssString("\n.emacs-mode .ace_cursor{\n    border: 1px rgba(50,250,50,0.8) solid!important;\n    box-sizing: border-box!important;\n    background-color: rgba(0,250,0,0.9);\n    opacity: 0.5;\n}\n.emacs-mode .ace_hidden-cursors .ace_cursor{\n    opacity: 1;\n    background-color: transparent;\n}\n.emacs-mode .ace_overwrite-cursors .ace_cursor {\n    opacity: 1;\n    background-color: transparent;\n    border-width: 0 0 2px 2px !important;\n}\n.emacs-mode .ace_text-layer {\n    z-index: 4\n}\n.emacs-mode .ace_cursor-layer {\n    z-index: 2\n}", 'emacsMode');
    var $formerLongWords;
    var $formerLineStart;
    exports1.handler.attach = function(editor) {
        $formerLongWords = editor.session.$selectLongWords;
        editor.session.$selectLongWords = true;
        $formerLineStart = editor.session.$useEmacsStyleLineStart;
        editor.session.$useEmacsStyleLineStart = true;
        editor.session.$emacsMark = null; // the active mark
        editor.session.$emacsMarkRing = editor.session.$emacsMarkRing || [];
        editor.emacsMark = function() {
            return this.session.$emacsMark;
        };
        editor.setEmacsMark = function(p) {
            this.session.$emacsMark = p;
        };
        editor.pushEmacsMark = function(p, activate) {
            var prevMark = this.session.$emacsMark;
            if (prevMark) this.session.$emacsMarkRing.push(prevMark);
            if (!p || activate) this.setEmacsMark(p);
            else this.session.$emacsMarkRing.push(p);
        };
        editor.popEmacsMark = function() {
            var mark = this.emacsMark();
            if (mark) {
                this.setEmacsMark(null);
                return mark;
            }
            return this.session.$emacsMarkRing.pop();
        };
        editor.getLastEmacsMark = function(p) {
            return this.session.$emacsMark || this.session.$emacsMarkRing.slice(-1)[0];
        };
        editor.emacsMarkForSelection = function(replacement) {
            var sel = this.selection, multiRangeLength = this.multiSelect ? this.multiSelect.getAllRanges().length : 1, selIndex = sel.index || 0, markRing = this.session.$emacsMarkRing, markIndex = markRing.length - (multiRangeLength - selIndex), lastMark = markRing[markIndex] || sel.anchor;
            if (replacement) {
                markRing.splice(markIndex, 1, "row" in replacement && "column" in replacement ? replacement : undefined);
            }
            return lastMark;
        };
        editor.on("click", $resetMarkMode);
        editor.on("changeSession", $kbSessionChange);
        editor.renderer.$blockCursor = true;
        editor.setStyle("emacs-mode");
        editor.commands.addCommands(commands);
        exports1.handler.platform = editor.commands.platform;
        editor.$emacsModeHandler = this;
        editor.on('copy', this.onCopy);
        editor.on('paste', this.onPaste);
    };
    exports1.handler.detach = function(editor) {
        editor.renderer.$blockCursor = false;
        editor.session.$selectLongWords = $formerLongWords;
        editor.session.$useEmacsStyleLineStart = $formerLineStart;
        editor.off("click", $resetMarkMode);
        editor.off("changeSession", $kbSessionChange);
        editor.unsetStyle("emacs-mode");
        editor.commands.removeCommands(commands);
        editor.off('copy', this.onCopy);
        editor.off('paste', this.onPaste);
        editor.$emacsModeHandler = null;
    };
    var $kbSessionChange = function $kbSessionChange(e) {
        if (e.oldSession) {
            e.oldSession.$selectLongWords = $formerLongWords;
            e.oldSession.$useEmacsStyleLineStart = $formerLineStart;
        }
        $formerLongWords = e.session.$selectLongWords;
        e.session.$selectLongWords = true;
        $formerLineStart = e.session.$useEmacsStyleLineStart;
        e.session.$useEmacsStyleLineStart = true;
        if (!e.session.hasOwnProperty('$emacsMark')) e.session.$emacsMark = null;
        if (!e.session.hasOwnProperty('$emacsMarkRing')) e.session.$emacsMarkRing = [];
    };
    var $resetMarkMode = function $resetMarkMode(e) {
        e.editor.session.$emacsMark = null;
    };
    var keys = require("../lib/keys").KEY_MODS;
    var eMods = {
        C: "ctrl",
        S: "shift",
        M: "alt",
        CMD: "command"
    };
    var combinations = [
        "C-S-M-CMD",
        "S-M-CMD",
        "C-M-CMD",
        "C-S-CMD",
        "C-S-M",
        "M-CMD",
        "S-CMD",
        "S-M",
        "C-CMD",
        "C-M",
        "C-S",
        "CMD",
        "M",
        "S",
        "C"
    ];
    combinations.forEach(function(c) {
        var hashId = 0;
        c.split("-").forEach(function(c) {
            hashId = hashId | keys[eMods[c]];
        });
        eMods[hashId] = c.toLowerCase() + "-";
    });
    exports1.handler.onCopy = function(e, editor) {
        if (editor.$handlesEmacsOnCopy) return;
        editor.$handlesEmacsOnCopy = true;
        exports1.handler.commands.killRingSave.exec(editor);
        editor.$handlesEmacsOnCopy = false;
    };
    exports1.handler.onPaste = function(e, editor) {
        editor.pushEmacsMark(editor.getCursorPosition());
    };
    exports1.handler.bindKey = function(key, command) {
        if ((typeof key === "undefined" ? "undefined" : _type_of(key)) == "object") key = key[this.platform];
        if (!key) return;
        var ckb = this.commandKeyBinding;
        key.split("|").forEach(function(keyPart) {
            keyPart = keyPart.toLowerCase();
            ckb[keyPart] = command;
            var keyParts = keyPart.split(" ").slice(0, -1);
            keyParts.reduce(function(keyMapKeys, keyPart, i) {
                var prefix = keyMapKeys[i - 1] ? keyMapKeys[i - 1] + ' ' : '';
                return keyMapKeys.concat([
                    prefix + keyPart
                ]);
            }, []).forEach(function(keyPart) {
                if (!ckb[keyPart]) ckb[keyPart] = "null";
            });
        }, this);
    };
    exports1.handler.getStatusText = function(editor, data) {
        var str = "";
        if (data.count) str += data.count;
        if (data.keyChain) str += " " + data.keyChain;
        return str;
    };
    exports1.handler.handleKeyboard = function(data, hashId, key, keyCode) {
        if (keyCode === -1) return undefined;
        var editor = data.editor;
        editor._signal("changeStatus");
        if (hashId == -1) {
            editor.pushEmacsMark();
            if (data.count) {
                var str = new Array(data.count + 1).join(key);
                data.count = null;
                return {
                    command: "insertstring",
                    args: str
                };
            }
        }
        var modifier = eMods[hashId];
        if (modifier == "c-" || data.count) {
            var count = parseInt(key[key.length - 1]);
            if (typeof count === 'number' && !isNaN(count)) {
                data.count = Math.max(data.count, 0) || 0;
                data.count = 10 * data.count + count;
                return {
                    command: "null"
                };
            }
        }
        if (modifier) key = modifier + key;
        if (data.keyChain) key = data.keyChain += " " + key;
        var command = this.commandKeyBinding[key];
        data.keyChain = command == "null" ? key : "";
        if (!command) return undefined;
        if (command === "null") return {
            command: "null"
        };
        if (command === "universalArgument") {
            data.count = -4;
            return {
                command: "null"
            };
        }
        var args;
        if (typeof command !== "string") {
            args = command.args;
            if (command.command) command = command.command;
            if (command === "goorselect") {
                command = editor.emacsMark() ? args[1] : args[0];
                args = null;
            }
        }
        if (typeof command === "string") {
            if (command === "insertstring" || command === "splitline" || command === "togglecomment") {
                editor.pushEmacsMark();
            }
            command = this.commands[command] || editor.commands.commands[command];
            if (!command) return undefined;
        }
        if (!command.readOnly && !command.isYank) data.lastCommand = null;
        if (!command.readOnly && editor.emacsMark()) editor.setEmacsMark(null);
        if (data.count) {
            var count = data.count;
            data.count = 0;
            if (!command || !command.handlesCount) {
                return {
                    args: args,
                    command: {
                        exec: function exec(editor, args) {
                            for(var i = 0; i < count; i++)command.exec(editor, args);
                        },
                        multiSelectAction: command.multiSelectAction
                    }
                };
            } else {
                if (!args) args = {};
                if ((typeof args === "undefined" ? "undefined" : _type_of(args)) === 'object') args.count = count;
            }
        }
        return {
            command: command,
            args: args
        };
    };
    exports1.emacsKeys = {
        "Up|C-p": {
            command: "goorselect",
            args: [
                "golineup",
                "selectup"
            ]
        },
        "Down|C-n": {
            command: "goorselect",
            args: [
                "golinedown",
                "selectdown"
            ]
        },
        "Left|C-b": {
            command: "goorselect",
            args: [
                "gotoleft",
                "selectleft"
            ]
        },
        "Right|C-f": {
            command: "goorselect",
            args: [
                "gotoright",
                "selectright"
            ]
        },
        "C-Left|M-b": {
            command: "goorselect",
            args: [
                "gotowordleft",
                "selectwordleft"
            ]
        },
        "C-Right|M-f": {
            command: "goorselect",
            args: [
                "gotowordright",
                "selectwordright"
            ]
        },
        "Home|C-a": {
            command: "goorselect",
            args: [
                "gotolinestart",
                "selecttolinestart"
            ]
        },
        "End|C-e": {
            command: "goorselect",
            args: [
                "gotolineend",
                "selecttolineend"
            ]
        },
        "C-Home|S-M-,": {
            command: "goorselect",
            args: [
                "gotostart",
                "selecttostart"
            ]
        },
        "C-End|S-M-.": {
            command: "goorselect",
            args: [
                "gotoend",
                "selecttoend"
            ]
        },
        "S-Up|S-C-p": "selectup",
        "S-Down|S-C-n": "selectdown",
        "S-Left|S-C-b": "selectleft",
        "S-Right|S-C-f": "selectright",
        "S-C-Left|S-M-b": "selectwordleft",
        "S-C-Right|S-M-f": "selectwordright",
        "S-Home|S-C-a": "selecttolinestart",
        "S-End|S-C-e": "selecttolineend",
        "S-C-Home": "selecttostart",
        "S-C-End": "selecttoend",
        "C-l": "recenterTopBottom",
        "M-s": "centerselection",
        "M-g": "gotoline",
        "C-x C-p": "selectall",
        "C-Down": {
            command: "goorselect",
            args: [
                "gotopagedown",
                "selectpagedown"
            ]
        },
        "C-Up": {
            command: "goorselect",
            args: [
                "gotopageup",
                "selectpageup"
            ]
        },
        "PageDown|C-v": {
            command: "goorselect",
            args: [
                "gotopagedown",
                "selectpagedown"
            ]
        },
        "PageUp|M-v": {
            command: "goorselect",
            args: [
                "gotopageup",
                "selectpageup"
            ]
        },
        "S-C-Down": "selectpagedown",
        "S-C-Up": "selectpageup",
        "C-s": "iSearch",
        "C-r": "iSearchBackwards",
        "M-C-s": "findnext",
        "M-C-r": "findprevious",
        "S-M-5": "replace",
        "Backspace": "backspace",
        "Delete|C-d": "del",
        "Return|C-m": {
            command: "insertstring",
            args: "\n"
        },
        "C-o": "splitline",
        "M-d|C-Delete": {
            command: "killWord",
            args: "right"
        },
        "C-Backspace|M-Backspace|M-Delete": {
            command: "killWord",
            args: "left"
        },
        "C-k": "killLine",
        "C-y|S-Delete": "yank",
        "M-y": "yankRotate",
        "C-g": "keyboardQuit",
        "C-w|C-S-W": "killRegion",
        "M-w": "killRingSave",
        "C-Space": "setMark",
        "C-x C-x": "exchangePointAndMark",
        "C-t": "transposeletters",
        "M-u": "touppercase",
        "M-l": "tolowercase",
        "M-/": "autocomplete",
        "C-u": "universalArgument",
        "M-;": "togglecomment",
        "C-/|C-x u|S-C--|C-z": "undo",
        "S-C-/|S-C-x u|C--|S-C-z": "redo",
        "C-x r": "selectRectangularRegion",
        "M-x": {
            command: "focusCommandLine",
            args: "M-x "
        }
    };
    exports1.handler.bindKeys(exports1.emacsKeys);
    exports1.handler.addCommands({
        recenterTopBottom: function recenterTopBottom(editor) {
            var renderer = editor.renderer;
            var pos = renderer.$cursorLayer.getPixelPosition();
            var h = renderer.$size.scrollerHeight - renderer.lineHeight;
            var scrollTop = renderer.scrollTop;
            if (Math.abs(pos.top - scrollTop) < 2) {
                scrollTop = pos.top - h;
            } else if (Math.abs(pos.top - scrollTop - h * 0.5) < 2) {
                scrollTop = pos.top;
            } else {
                scrollTop = pos.top - h * 0.5;
            }
            editor.session.setScrollTop(scrollTop);
        },
        selectRectangularRegion: function selectRectangularRegion(editor) {
            editor.multiSelect.toggleBlockSelection();
        },
        setMark: {
            exec: function exec(editor, args) {
                if (args && args.count) {
                    if (editor.inMultiSelectMode) editor.forEachSelection(moveToMark);
                    else moveToMark();
                    moveToMark();
                    return;
                }
                var mark = editor.emacsMark(), ranges = editor.selection.getAllRanges(), rangePositions = ranges.map(function(r) {
                    return {
                        row: r.start.row,
                        column: r.start.column
                    };
                }), transientMarkModeActive = true, hasNoSelection = ranges.every(function(range) {
                    return range.isEmpty();
                });
                if (transientMarkModeActive && (mark || !hasNoSelection)) {
                    if (editor.inMultiSelectMode) editor.forEachSelection({
                        exec: editor.clearSelection.bind(editor)
                    });
                    else editor.clearSelection();
                    if (mark) editor.pushEmacsMark(null);
                    return;
                }
                if (!mark) {
                    rangePositions.forEach(function(pos) {
                        editor.pushEmacsMark(pos);
                    });
                    editor.setEmacsMark(rangePositions[rangePositions.length - 1]);
                    return;
                }
                function moveToMark() {
                    var mark = editor.popEmacsMark();
                    mark && editor.moveCursorToPosition(mark);
                }
            },
            readOnly: true,
            handlesCount: true
        },
        exchangePointAndMark: {
            exec: function exchangePointAndMark$exec(editor, args) {
                var sel = editor.selection;
                if (!args.count && !sel.isEmpty()) {
                    sel.setSelectionRange(sel.getRange(), !sel.isBackwards());
                    return;
                }
                if (args.count) {
                    var pos = {
                        row: sel.lead.row,
                        column: sel.lead.column
                    };
                    sel.clearSelection();
                    sel.moveCursorToPosition(editor.emacsMarkForSelection(pos));
                } else {
                    sel.selectToPosition(editor.emacsMarkForSelection());
                }
            },
            readOnly: true,
            handlesCount: true,
            multiSelectAction: "forEach"
        },
        killWord: {
            exec: function exec(editor, dir) {
                editor.clearSelection();
                if (dir == "left") editor.selection.selectWordLeft();
                else editor.selection.selectWordRight();
                var range = editor.getSelectionRange();
                var text = editor.session.getTextRange(range);
                exports1.killRing.add(text);
                editor.session.remove(range);
                editor.clearSelection();
            },
            multiSelectAction: "forEach"
        },
        killLine: function killLine(editor) {
            editor.pushEmacsMark(null);
            editor.clearSelection();
            var range = editor.getSelectionRange();
            var line = editor.session.getLine(range.start.row);
            range.end.column = line.length;
            line = line.substr(range.start.column);
            var foldLine = editor.session.getFoldLine(range.start.row);
            if (foldLine && range.end.row != foldLine.end.row) {
                range.end.row = foldLine.end.row;
                line = "x";
            }
            if (/^\s*$/.test(line)) {
                range.end.row++;
                line = editor.session.getLine(range.end.row);
                range.end.column = /^\s*$/.test(line) ? line.length : 0;
            }
            var text = editor.session.getTextRange(range);
            if (editor.prevOp.command == this) exports1.killRing.append(text);
            else exports1.killRing.add(text);
            editor.session.remove(range);
            editor.clearSelection();
        },
        yank: function yank(editor) {
            editor.onPaste(exports1.killRing.get() || '');
            editor.keyBinding.$data.lastCommand = "yank";
        },
        yankRotate: function yankRotate(editor) {
            if (editor.keyBinding.$data.lastCommand != "yank") return;
            editor.undo();
            editor.session.$emacsMarkRing.pop(); // also undo recording mark
            editor.onPaste(exports1.killRing.rotate());
            editor.keyBinding.$data.lastCommand = "yank";
        },
        killRegion: {
            exec: function exec(editor) {
                exports1.killRing.add(editor.getCopyText());
                editor.commands.byName.cut.exec(editor);
                editor.setEmacsMark(null);
            },
            readOnly: true,
            multiSelectAction: "forEach"
        },
        killRingSave: {
            exec: function exec(editor) {
                editor.$handlesEmacsOnCopy = true;
                var marks = editor.session.$emacsMarkRing.slice(), deselectedMarks = [];
                exports1.killRing.add(editor.getCopyText());
                setTimeout(function() {
                    function deselect() {
                        var sel = editor.selection, range = sel.getRange(), pos = sel.isBackwards() ? range.end : range.start;
                        deselectedMarks.push({
                            row: pos.row,
                            column: pos.column
                        });
                        sel.clearSelection();
                    }
                    editor.$handlesEmacsOnCopy = false;
                    if (editor.inMultiSelectMode) editor.forEachSelection({
                        exec: deselect
                    });
                    else deselect();
                    editor.setEmacsMark(null);
                    editor.session.$emacsMarkRing = marks.concat(deselectedMarks.reverse());
                }, 0);
            },
            readOnly: true
        },
        keyboardQuit: function keyboardQuit(editor) {
            editor.selection.clearSelection();
            editor.setEmacsMark(null);
            editor.keyBinding.$data.count = null;
        },
        focusCommandLine: function focusCommandLine(editor, arg) {
            if (editor.showCommandLine) editor.showCommandLine(arg);
        }
    });
    exports1.handler.addCommands(iSearchCommandModule.iSearchStartCommands);
    var commands = exports1.handler.commands;
    commands.yank.isYank = true;
    commands.yankRotate.isYank = true;
    exports1.killRing = {
        $data: [],
        add: function add(str) {
            str && this.$data.push(str);
            if (this.$data.length > 30) this.$data.shift();
        },
        append: function append(str) {
            var idx = this.$data.length - 1;
            var text = this.$data[idx] || "";
            if (str) text += str;
            if (text) this.$data[idx] = text;
        },
        get: function get(n) {
            n = n || 1;
            return this.$data.slice(this.$data.length - n, this.$data.length).reverse().join('\n');
        },
        pop: function pop() {
            if (this.$data.length > 1) this.$data.pop();
            return this.get();
        },
        rotate: function rotate() {
            this.$data.unshift(this.$data.pop());
            return this.get();
        }
    };
});
(function() {
    ace.require([
        "ace/keyboard/emacs"
    ], function(m) {
        if ((typeof module === "undefined" ? "undefined" : _type_of(module)) == "object" && (typeof exports === "undefined" ? "undefined" : _type_of(exports)) == "object" && module) {
            module.exports = m;
        }
    });
})();
