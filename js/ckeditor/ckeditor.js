﻿(function () {
    if (!window.CKEDITOR || !window.CKEDITOR.dom)window.CKEDITOR || (window.CKEDITOR = function () {
        var c = {
            timestamp: "D8HF",
            version: "4.3 beta (Standard)",
            revision: "ebf5182",
            rnd: Math.floor(900 * Math.random()) + 100,
            _: {pending: []},
            status: "unloaded",
            basePath: function () {
                var a = window.CKEDITOR_BASEPATH || "";
                if (!a)for (var d = document.getElementsByTagName("script"), b = 0; b < d.length; b++) {
                    var c = d[b].src.match(/(^|.*[\\\/])ckeditor(?:_basic)?(?:_source)?.js(?:\?.*)?$/i);
                    if (c) {
                        a = c[1];
                        break
                    }
                }
                -1 == a.indexOf(":/") && (a = 0 === a.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + a : location.href.match(/^[^\?]*\/(?:)/)[0] + a);
                if (!a)throw'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
                return a
            }(),
            getUrl: function (a) {
                -1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a);
                this.timestamp && ("/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a)) && (a += (0 <= a.indexOf("?") ? "&" : "?") + "t=" + this.timestamp);
                return a
            },
            domReady: function () {
                function a() {
                    try {
                        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", a, !1), d()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), d())
                    } catch (b) {
                    }
                }

                function d() {
                    for (var d; d = b.shift();)d()
                }

                var b = [];
                return function (d) {
                    b.push(d);
                    "complete" === document.readyState && setTimeout(a, 1);
                    if (1 == b.length)if (document.addEventListener)document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1); else if (document.attachEvent) {
                        document.attachEvent("onreadystatechange", a);
                        window.attachEvent("onload", a);
                        d = !1;
                        try {
                            d = !window.frameElement
                        } catch (c) {
                        }
                        if (document.documentElement.doScroll && d) {
                            var e = function () {
                                try {
                                    document.documentElement.doScroll("left")
                                } catch (d) {
                                    setTimeout(e, 1);
                                    return
                                }
                                a()
                            };
                            e()
                        }
                    }
                }
            }()
        }, f = window.CKEDITOR_GETURL;
        if (f) {
            var b = c.getUrl;
            c.getUrl = function (a) {
                return f.call(c, a) || b.call(c, a)
            }
        }
        return c
    }()), CKEDITOR.event || (CKEDITOR.event = function () {
    }, CKEDITOR.event.implementOn = function (c) {
        var f = CKEDITOR.event.prototype, b;
        for (b in f)c[b] == void 0 && (c[b] = f[b])
    }, CKEDITOR.event.prototype = function () {
        function c(a) {
            var d = f(this);
            return d[a] || (d[a] = new b(a))
        }

        var f = function (a) {
            a = a.getPrivate && a.getPrivate() || a._ || (a._ = {});
            return a.events || (a.events = {})
        }, b = function (a) {
            this.name = a;
            this.listeners = []
        };
        b.prototype = {
            getListenerIndex: function (a) {
                for (var d = 0, b = this.listeners; d < b.length; d++)if (b[d].fn == a)return d;
                return -1
            }
        };
        return {
            define: function (a, d) {
                var b = c.call(this, a);
                CKEDITOR.tools.extend(b, d, true)
            }, on: function (a, d, b, g, h) {
                function e(c, e, k, h) {
                    c = {
                        name: a,
                        sender: this,
                        editor: c,
                        data: e,
                        listenerData: g,
                        stop: k,
                        cancel: h,
                        removeListener: f
                    };
                    return d.call(b, c) === false ? false : c.data
                }

                function f() {
                    n.removeListener(a, d)
                }

                var k = c.call(this, a);
                if (k.getListenerIndex(d) < 0) {
                    k = k.listeners;
                    b || (b = this);
                    isNaN(h) && (h = 10);
                    var n = this;
                    e.fn = d;
                    e.priority = h;
                    for (var o = k.length - 1; o >= 0; o--)if (k[o].priority <= h) {
                        k.splice(o + 1, 0, e);
                        return {removeListener: f}
                    }
                    k.unshift(e)
                }
                return {removeListener: f}
            }, once: function () {
                var a = arguments[1];
                arguments[1] = function (d) {
                    d.removeListener();
                    return a.apply(this, arguments)
                };
                return this.on.apply(this, arguments)
            }, capture: function () {
                CKEDITOR.event.useCapture = 1;
                var a = this.on.apply(this, arguments);
                CKEDITOR.event.useCapture = 0;
                return a
            }, fire: function () {
                var a = 0, d = function () {
                    a = 1
                }, b = 0, c = function () {
                    b = 1
                };
                return function (h, e, j) {
                    var k = f(this)[h], h = a, n = b;
                    a = b = 0;
                    if (k) {
                        var o = k.listeners;
                        if (o.length)for (var o = o.slice(0), q, m = 0; m < o.length; m++) {
                            if (k.errorProof)try {
                                q = o[m].call(this, j, e, d, c)
                            } catch (p) {
                            } else q = o[m].call(this, j, e, d, c);
                            q === false ? b = 1 : typeof q != "undefined" && (e = q);
                            if (a || b)break
                        }
                    }
                    e = b ? false : typeof e == "undefined" ? true : e;
                    a = h;
                    b = n;
                    return e
                }
            }(), fireOnce: function (a, d, b) {
                d = this.fire(a, d, b);
                delete f(this)[a];
                return d
            }, removeListener: function (a, d) {
                var b = f(this)[a];
                if (b) {
                    var c = b.getListenerIndex(d);
                    c >= 0 && b.listeners.splice(c, 1)
                }
            }, removeAllListeners: function () {
                var a = f(this), d;
                for (d in a)delete a[d]
            }, hasListeners: function (a) {
                return (a = f(this)[a]) && a.listeners.length > 0
            }
        }
    }()), CKEDITOR.editor || (CKEDITOR.editor = function () {
        CKEDITOR._.pending.push([this, arguments]);
        CKEDITOR.event.call(this)
    }, CKEDITOR.editor.prototype.fire = function (c, f) {
        c in{instanceReady: 1, loaded: 1} && (this[c] = true);
        return CKEDITOR.event.prototype.fire.call(this, c, f, this)
    }, CKEDITOR.editor.prototype.fireOnce = function (c, f) {
        c in{instanceReady: 1, loaded: 1} && (this[c] = true);
        return CKEDITOR.event.prototype.fireOnce.call(this, c, f, this)
    }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)), CKEDITOR.env || (CKEDITOR.env = function () {
        var c = navigator.userAgent.toLowerCase(), f = window.opera, b = {
            ie: eval("/*@cc_on!@*/false"),
            opera: !!f && f.version,
            webkit: c.indexOf(" applewebkit/") > -1,
            air: c.indexOf(" adobeair/") > -1,
            mac: c.indexOf("macintosh") > -1,
            quirks: document.compatMode == "BackCompat",
            mobile: c.indexOf("mobile") > -1,
            iOS: /(ipad|iphone|ipod)/.test(c),
            isCustomDomain: function () {
                if (!this.ie)return false;
                var d = document.domain, a = window.location.hostname;
                return d != a && d != "[" + a + "]"
            },
            secure: location.protocol == "https:"
        };
        b.gecko = navigator.product == "Gecko" && !b.webkit && !b.opera;
        if (b.webkit)c.indexOf("chrome") > -1 ? b.chrome = true : b.safari = true;
        var a = 0;
        if (b.ie) {
            a = b.quirks || !document.documentMode ? parseFloat(c.match(/msie (\d+)/)[1]) : document.documentMode;
            b.ie9Compat = a == 9;
            b.ie8Compat = a == 8;
            b.ie7Compat = a == 7;
            b.ie6Compat = a < 7 || b.quirks && a < 10
        }
        if (b.gecko) {
            var d = c.match(/rv:([\d\.]+)/);
            if (d) {
                d = d[1].split(".");
                a = d[0] * 1E4 + (d[1] || 0) * 100 + (d[2] || 0) * 1
            }
        }
        b.opera && (a = parseFloat(f.version()));
        b.air && (a = parseFloat(c.match(/ adobeair\/(\d+)/)[1]));
        b.webkit && (a = parseFloat(c.match(/ applewebkit\/(\d+)/)[1]));
        b.version = a;
        b.isCompatible = b.iOS && a >= 534 || !b.mobile && (b.ie && a > 6 || b.gecko && a >= 10801 || b.opera && a >= 9.5 || b.air && a >= 1 || b.webkit && a >= 522 || false);
        b.hidpi = window.devicePixelRatio >= 2;
        b.cssClass = "cke_browser_" + (b.ie ? "ie" : b.gecko ? "gecko" : b.opera ? "opera" : b.webkit ? "webkit" : "unknown");
        if (b.quirks)b.cssClass = b.cssClass + " cke_browser_quirks";
        if (b.ie) {
            b.cssClass = b.cssClass + (" cke_browser_ie" + (b.quirks || b.version < 7 ? "6" : b.version));
            if (b.quirks)b.cssClass = b.cssClass + " cke_browser_iequirks"
        }
        if (b.gecko)if (a < 10900)b.cssClass = b.cssClass + " cke_browser_gecko18"; else if (a <= 11E3)b.cssClass = b.cssClass + " cke_browser_gecko19";
        if (b.air)b.cssClass = b.cssClass + " cke_browser_air";
        if (b.iOS)b.cssClass = b.cssClass + " cke_browser_ios";
        if (b.hidpi)b.cssClass = b.cssClass + " cke_hidpi";
        return b
    }()), "unloaded" == CKEDITOR.status && function () {
        CKEDITOR.event.implementOn(CKEDITOR);
        CKEDITOR.loadFullCore = function () {
            if (CKEDITOR.status != "basic_ready")CKEDITOR.loadFullCore._load = 1; else {
                delete CKEDITOR.loadFullCore;
                var c = document.createElement("script");
                c.type = "text/javascript";
                c.src = CKEDITOR.basePath + "ckeditor.js";
                document.getElementsByTagName("head")[0].appendChild(c)
            }
        };
        CKEDITOR.loadFullCoreTimeout = 0;
        CKEDITOR.add = function (c) {
            (this._.pending || (this._.pending = [])).push(c)
        };
        (function () {
            CKEDITOR.domReady(function () {
                var c = CKEDITOR.loadFullCore, f = CKEDITOR.loadFullCoreTimeout;
                if (c) {
                    CKEDITOR.status = "basic_ready";
                    c && c._load ? c() : f && setTimeout(function () {
                        CKEDITOR.loadFullCore && CKEDITOR.loadFullCore()
                    }, f * 1E3)
                }
            })
        })();
        CKEDITOR.status = "basic_loaded"
    }(), CKEDITOR.dom = {}, function () {
        var c = [], f = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.opera ? "-o-" : CKEDITOR.env.ie ? "-ms-" : "";
        CKEDITOR.on("reset", function () {
            c = []
        });
        CKEDITOR.tools = {
            arrayCompare: function (b, a) {
                if (!b && !a)return true;
                if (!b || !a || b.length != a.length)return false;
                for (var d = 0; d < b.length; d++)if (b[d] != a[d])return false;
                return true
            }, clone: function (b) {
                var a;
                if (b && b instanceof Array) {
                    a = [];
                    for (var d = 0; d < b.length; d++)a[d] = CKEDITOR.tools.clone(b[d]);
                    return a
                }
                if (b === null || typeof b != "object" || b instanceof String || b instanceof Number || b instanceof Boolean || b instanceof Date || b instanceof RegExp)return b;
                a = new b.constructor;
                for (d in b)a[d] = CKEDITOR.tools.clone(b[d]);
                return a
            }, capitalize: function (b, a) {
                return b.charAt(0).toUpperCase() + (a ? b.slice(1) : b.slice(1).toLowerCase())
            }, extend: function (b) {
                var a = arguments.length, d, c;
                if (typeof(d = arguments[a - 1]) == "boolean")a--; else if (typeof(d = arguments[a - 2]) == "boolean") {
                    c = arguments[a - 1];
                    a = a - 2
                }
                for (var g = 1; g < a; g++) {
                    var h = arguments[g], e;
                    for (e in h)if (d === true || b[e] == void 0)if (!c || e in c)b[e] = h[e]
                }
                return b
            }, prototypedCopy: function (b) {
                var a = function () {
                };
                a.prototype = b;
                return new a
            }, copy: function (b) {
                var a = {}, d;
                for (d in b)a[d] = b[d];
                return a
            }, isArray: function (b) {
                return !!b && b instanceof Array
            }, isEmpty: function (b) {
                for (var a in b)if (b.hasOwnProperty(a))return false;
                return true
            }, cssVendorPrefix: function (b, a, d) {
                if (d)return f + b + ":" + a + ";" + b + ":" + a;
                d = {};
                d[b] = a;
                d[f + b] = a;
                return d
            }, cssStyleToDomStyle: function () {
                var b = document.createElement("div").style, a = typeof b.cssFloat != "undefined" ? "cssFloat" : typeof b.styleFloat != "undefined" ? "styleFloat" : "float";
                return function (d) {
                    return d == "float" ? a : d.replace(/-./g, function (d) {
                        return d.substr(1).toUpperCase()
                    })
                }
            }(), buildStyleHtml: function (b) {
                for (var b = [].concat(b), a, d = [], c = 0; c < b.length; c++)if (a = b[c])/@import|[{}]/.test(a) ? d.push("<style>" + a + "</style>") : d.push('<link type="text/css" rel=stylesheet href="' + a + '">');
                return d.join("")
            }, htmlEncode: function (b) {
                return ("" + b).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;")
            }, htmlEncodeAttr: function (b) {
                return b.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            }, htmlDecodeAttr: function (b) {
                return b.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">")
            }, getNextNumber: function () {
                var b = 0;
                return function () {
                    return ++b
                }
            }(), getNextId: function () {
                return "cke_" + this.getNextNumber()
            }, override: function (b, a) {
                var d = a(b);
                d.prototype = b.prototype;
                return d
            }, setTimeout: function (b, a, d, c, g) {
                g || (g = window);
                d || (d = g);
                return g.setTimeout(function () {
                    c ? b.apply(d, [].concat(c)) : b.apply(d)
                }, a || 0)
            }, trim: function () {
                var b = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
                return function (a) {
                    return a.replace(b, "")
                }
            }(), ltrim: function () {
                var b = /^[ \t\n\r]+/g;
                return function (a) {
                    return a.replace(b, "")
                }
            }(), rtrim: function () {
                var b = /[ \t\n\r]+$/g;
                return function (a) {
                    return a.replace(b, "")
                }
            }(), indexOf: function (b, a) {
                if (typeof a == "function")for (var d = 0, c = b.length; d < c; d++) {
                    if (a(b[d]))return d
                } else {
                    if (b.indexOf)return b.indexOf(a);
                    d = 0;
                    for (c = b.length; d < c; d++)if (b[d] === a)return d
                }
                return -1
            }, search: function (b, a) {
                var d = CKEDITOR.tools.indexOf(b, a);
                return d >= 0 ? b[d] : null
            }, bind: function (b, a) {
                return function () {
                    return b.apply(a, arguments)
                }
            }, createClass: function (b) {
                var a = b.$, d = b.base, c = b.privates || b._, g = b.proto, b = b.statics;
                !a && (a = function () {
                    d && this.base.apply(this, arguments)
                });
                if (c)var h = a, a = function () {
                    var d = this._ || (this._ = {}), a;
                    for (a in c) {
                        var b = c[a];
                        d[a] = typeof b == "function" ? CKEDITOR.tools.bind(b, this) : b
                    }
                    h.apply(this, arguments)
                };
                if (d) {
                    a.prototype = this.prototypedCopy(d.prototype);
                    a.prototype.constructor = a;
                    a.base = d;
                    a.baseProto = d.prototype;
                    a.prototype.base = function () {
                        this.base = d.prototype.base;
                        d.apply(this, arguments);
                        this.base = arguments.callee
                    }
                }
                g && this.extend(a.prototype, g, true);
                b && this.extend(a, b, true);
                return a
            }, addFunction: function (b, a) {
                return c.push(function () {
                        return b.apply(a || this, arguments)
                    }) - 1
            }, removeFunction: function (b) {
                c[b] = null
            }, callFunction: function (b) {
                var a = c[b];
                return a && a.apply(window, Array.prototype.slice.call(arguments, 1))
            }, cssLength: function () {
                var b = /^-?\d+\.?\d*px$/, a;
                return function (d) {
                    a = CKEDITOR.tools.trim(d + "") + "px";
                    return b.test(a) ? a : d || ""
                }
            }(), convertToPx: function () {
                var b;
                return function (a) {
                    if (!b) {
                        b = CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>', CKEDITOR.document);
                        CKEDITOR.document.getBody().append(b)
                    }
                    if (!/%$/.test(a)) {
                        b.setStyle("width", a);
                        return b.$.clientWidth
                    }
                    return a
                }
            }(), repeat: function (b, a) {
                return Array(a + 1).join(b)
            }, tryThese: function () {
                for (var b, a = 0, d = arguments.length; a < d; a++) {
                    var c = arguments[a];
                    try {
                        b = c();
                        break
                    } catch (g) {
                    }
                }
                return b
            }, genKey: function () {
                return Array.prototype.slice.call(arguments).join("-")
            }, defer: function (b) {
                return function () {
                    var a = arguments, d = this;
                    window.setTimeout(function () {
                        b.apply(d, a)
                    }, 0)
                }
            }, normalizeCssText: function (b, a) {
                var d = [], c, g = CKEDITOR.tools.parseCssText(b, true, a);
                for (c in g)d.push(c + ":" + g[c]);
                d.sort();
                return d.length ? d.join(";") + ";" : ""
            }, convertRgbToHex: function (b) {
                return b.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function (a, d, b, c) {
                    a = [d, b, c];
                    for (d = 0; d < 3; d++)a[d] = ("0" + parseInt(a[d], 10).toString(16)).slice(-2);
                    return "#" + a.join("")
                })
            }, parseCssText: function (b, a, d) {
                var c = {};
                if (d) {
                    d = new CKEDITOR.dom.element("span");
                    d.setAttribute("style", b);
                    b = CKEDITOR.tools.convertRgbToHex(d.getAttribute("style") || "")
                }
                if (!b || b == ";")return c;
                b.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (d, b, e) {
                    if (a) {
                        b = b.toLowerCase();
                        b == "font-family" && (e = e.toLowerCase().replace(/["']/g, "").replace(/\s*,\s*/g, ","));
                        e = CKEDITOR.tools.trim(e)
                    }
                    c[b] = e
                });
                return c
            }, writeCssText: function (b, a) {
                var d, c = [];
                for (d in b)c.push(d + ":" + b[d]);
                a && c.sort();
                return c.join("; ")
            }, objectCompare: function (b, a, d) {
                var c;
                if (!b && !a)return true;
                if (!b || !a)return false;
                for (c in b)if (b[c] != a[c])return false;
                if (!d)for (c in a)if (b[c] != a[c])return false;
                return true
            }, objectKeys: function (b) {
                var a = [], d;
                for (d in b)a.push(d);
                return a
            }, convertArrayToObject: function (b, a) {
                var d = {};
                arguments.length == 1 && (a = true);
                for (var c = 0, g = b.length; c < g; ++c)d[b[c]] = a;
                return d
            }, fixDomain: function () {
                for (var b; ;)try {
                    b = window.parent.document.domain;
                    break
                } catch (a) {
                    b = b ? b.replace(/.+?(?:\.|$)/, "") : document.domain;
                    if (!b)break;
                    document.domain = b
                }
                return !!b
            }, eventsBuffer: function (b, a) {
                function d() {
                    g = (new Date).getTime();
                    c = false;
                    a()
                }

                var c, g = 0;
                return {
                    input: function () {
                        if (!c) {
                            var a = (new Date).getTime() - g;
                            a < b ? c = setTimeout(d, b - a) : d()
                        }
                    }, reset: function () {
                        c && clearTimeout(c);
                        c = g = 0
                    }
                }
            }, enableHtml5Elements: function (b, a) {
                for (var d = ["abbr", "article", "aside", "audio", "bdi", "canvas", "data", "datalist", "details", "figcaption", "figure", "footer", "header", "hgroup", "mark", "meter", "nav", "output", "progress", "section", "summary", "time", "video"], c = d.length, g; c--;) {
                    g = b.createElement(d[c]);
                    a && b.appendChild(g)
                }
            }
        }
    }(), CKEDITOR.dtd = function () {
        var c = CKEDITOR.tools.extend, f = function (d, a) {
            for (var b = CKEDITOR.tools.clone(d), c = 1; c < arguments.length; c++) {
                var a = arguments[c], i;
                for (i in a)delete b[i]
            }
            return b
        }, b = {}, a = {}, d = {
            address: 1,
            article: 1,
            aside: 1,
            blockquote: 1,
            details: 1,
            div: 1,
            dl: 1,
            fieldset: 1,
            figure: 1,
            footer: 1,
            form: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1,
            header: 1,
            hgroup: 1,
            hr: 1,
            menu: 1,
            nav: 1,
            ol: 1,
            p: 1,
            pre: 1,
            section: 1,
            table: 1,
            ul: 1
        }, i = {command: 1, link: 1, meta: 1, noscript: 1, script: 1, style: 1}, g = {}, h = {"#": 1}, e = {
            center: 1,
            dir: 1,
            noframes: 1
        };
        c(b, {
            a: 1,
            abbr: 1,
            area: 1,
            audio: 1,
            b: 1,
            bdi: 1,
            bdo: 1,
            br: 1,
            button: 1,
            canvas: 1,
            cite: 1,
            code: 1,
            command: 1,
            datalist: 1,
            del: 1,
            dfn: 1,
            em: 1,
            embed: 1,
            i: 1,
            iframe: 1,
            img: 1,
            input: 1,
            ins: 1,
            kbd: 1,
            keygen: 1,
            label: 1,
            map: 1,
            mark: 1,
            meter: 1,
            noscript: 1,
            object: 1,
            output: 1,
            progress: 1,
            q: 1,
            ruby: 1,
            s: 1,
            samp: 1,
            script: 1,
            select: 1,
            small: 1,
            span: 1,
            strong: 1,
            sub: 1,
            sup: 1,
            textarea: 1,
            time: 1,
            u: 1,
            "var": 1,
            video: 1,
            wbr: 1
        }, h, {acronym: 1, applet: 1, basefont: 1, big: 1, font: 1, isindex: 1, strike: 1, style: 1, tt: 1});
        c(a, d, b, e);
        f = {
            a: f(b, {a: 1, button: 1}),
            abbr: b,
            address: a,
            area: g,
            article: c({style: 1}, a),
            aside: c({style: 1}, a),
            audio: c({source: 1, track: 1}, a),
            b: b,
            base: g,
            bdi: b,
            bdo: b,
            blockquote: a,
            body: a,
            br: g,
            button: f(b, {a: 1, button: 1}),
            canvas: b,
            caption: a,
            cite: b,
            code: b,
            col: g,
            colgroup: {col: 1},
            command: g,
            datalist: c({option: 1}, b),
            dd: a,
            del: b,
            details: c({summary: 1}, a),
            dfn: b,
            div: c({style: 1}, a),
            dl: {dt: 1, dd: 1},
            dt: a,
            em: b,
            embed: g,
            fieldset: c({legend: 1}, a),
            figcaption: a,
            figure: c({figcaption: 1}, a),
            footer: a,
            form: a,
            h1: b,
            h2: b,
            h3: b,
            h4: b,
            h5: b,
            h6: b,
            head: c({title: 1, base: 1}, i),
            header: a,
            hgroup: {h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1},
            hr: g,
            html: c({head: 1, body: 1}, a, i),
            i: b,
            iframe: h,
            img: g,
            input: g,
            ins: b,
            kbd: b,
            keygen: g,
            label: b,
            legend: b,
            li: a,
            link: g,
            map: a,
            mark: b,
            menu: c({li: 1}, a),
            meta: g,
            meter: f(b, {meter: 1}),
            nav: a,
            noscript: c({link: 1, meta: 1, style: 1}, b),
            object: c({param: 1}, b),
            ol: {li: 1},
            optgroup: {option: 1},
            option: h,
            output: b,
            p: b,
            param: g,
            pre: b,
            progress: f(b, {progress: 1}),
            q: b,
            rp: b,
            rt: b,
            ruby: c({rp: 1, rt: 1}, b),
            s: b,
            samp: b,
            script: h,
            section: c({style: 1}, a),
            select: {optgroup: 1, option: 1},
            small: b,
            source: g,
            span: b,
            strong: b,
            style: h,
            sub: b,
            summary: b,
            sup: b,
            table: {caption: 1, colgroup: 1, thead: 1, tfoot: 1, tbody: 1, tr: 1},
            tbody: {tr: 1},
            td: a,
            textarea: h,
            tfoot: {tr: 1},
            th: a,
            thead: {tr: 1},
            time: f(b, {time: 1}),
            title: h,
            tr: {th: 1, td: 1},
            track: g,
            u: b,
            ul: {li: 1},
            "var": b,
            video: c({source: 1, track: 1}, a),
            wbr: g,
            acronym: b,
            applet: c({param: 1}, a),
            basefont: g,
            big: b,
            center: a,
            dialog: g,
            dir: {li: 1},
            font: b,
            isindex: g,
            noframes: a,
            strike: b,
            tt: b
        };
        c(f, {
            $block: c({audio: 1, dd: 1, dt: 1, figcaption: 1, li: 1, video: 1}, d, e),
            $blockLimit: {
                article: 1,
                aside: 1,
                audio: 1,
                body: 1,
                caption: 1,
                details: 1,
                dir: 1,
                div: 1,
                dl: 1,
                fieldset: 1,
                figcaption: 1,
                figure: 1,
                footer: 1,
                form: 1,
                header: 1,
                hgroup: 1,
                menu: 1,
                nav: 1,
                ol: 1,
                section: 1,
                table: 1,
                td: 1,
                th: 1,
                tr: 1,
                ul: 1,
                video: 1
            },
            $cdata: {script: 1, style: 1},
            $editable: {
                address: 1,
                article: 1,
                aside: 1,
                blockquote: 1,
                body: 1,
                details: 1,
                div: 1,
                fieldset: 1,
                figcaption: 1,
                footer: 1,
                form: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                header: 1,
                hgroup: 1,
                nav: 1,
                p: 1,
                pre: 1,
                section: 1
            },
            $empty: {
                area: 1,
                base: 1,
                basefont: 1,
                br: 1,
                col: 1,
                command: 1,
                dialog: 1,
                embed: 1,
                hr: 1,
                img: 1,
                input: 1,
                isindex: 1,
                keygen: 1,
                link: 1,
                meta: 1,
                param: 1,
                source: 1,
                track: 1,
                wbr: 1
            },
            $inline: b,
            $list: {dl: 1, ol: 1, ul: 1},
            $listItem: {dd: 1, dt: 1, li: 1},
            $nonBodyContent: c({body: 1, head: 1, html: 1}, f.head),
            $nonEditable: {
                applet: 1,
                audio: 1,
                button: 1,
                embed: 1,
                iframe: 1,
                map: 1,
                object: 1,
                option: 1,
                param: 1,
                script: 1,
                textarea: 1,
                video: 1
            },
            $object: {
                applet: 1,
                audio: 1,
                button: 1,
                hr: 1,
                iframe: 1,
                img: 1,
                input: 1,
                object: 1,
                select: 1,
                table: 1,
                textarea: 1,
                video: 1
            },
            $removeEmpty: {
                abbr: 1,
                acronym: 1,
                b: 1,
                bdi: 1,
                bdo: 1,
                big: 1,
                cite: 1,
                code: 1,
                del: 1,
                dfn: 1,
                em: 1,
                font: 1,
                i: 1,
                ins: 1,
                label: 1,
                kbd: 1,
                mark: 1,
                meter: 1,
                output: 1,
                q: 1,
                ruby: 1,
                s: 1,
                samp: 1,
                small: 1,
                span: 1,
                strike: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                time: 1,
                tt: 1,
                u: 1,
                "var": 1
            },
            $tabIndex: {a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1},
            $tableContent: {caption: 1, col: 1, colgroup: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1},
            $transparent: {a: 1, audio: 1, canvas: 1, del: 1, ins: 1, map: 1, noscript: 1, object: 1, video: 1},
            $intermediate: {
                caption: 1,
                colgroup: 1,
                dd: 1,
                dt: 1,
                figcaption: 1,
                legend: 1,
                li: 1,
                optgroup: 1,
                option: 1,
                rp: 1,
                rt: 1,
                summary: 1,
                tbody: 1,
                td: 1,
                tfoot: 1,
                th: 1,
                thead: 1,
                tr: 1
            }
        });
        return f
    }(), CKEDITOR.dom.event = function (c) {
        this.$ = c
    }, CKEDITOR.dom.event.prototype = {
        getKey: function () {
            return this.$.keyCode || this.$.which
        }, getKeystroke: function () {
            var c = this.getKey();
            if (this.$.ctrlKey || this.$.metaKey)c = c + CKEDITOR.CTRL;
            this.$.shiftKey && (c = c + CKEDITOR.SHIFT);
            this.$.altKey && (c = c + CKEDITOR.ALT);
            return c
        }, preventDefault: function (c) {
            var f = this.$;
            f.preventDefault ? f.preventDefault() : f.returnValue = false;
            c && this.stopPropagation()
        }, stopPropagation: function () {
            var c = this.$;
            c.stopPropagation ? c.stopPropagation() : c.cancelBubble = true
        }, getTarget: function () {
            var c = this.$.target || this.$.srcElement;
            return c ? new CKEDITOR.dom.node(c) : null
        }, getPhase: function () {
            return this.$.eventPhase || 2
        }, getPageOffset: function () {
            var c = this.getTarget().getDocument().$;
            return {
                x: this.$.pageX || this.$.clientX + (c.documentElement.scrollLeft || c.body.scrollLeft),
                y: this.$.pageY || this.$.clientY + (c.documentElement.scrollTop || c.body.scrollTop)
            }
        }
    }, CKEDITOR.CTRL = 1114112, CKEDITOR.SHIFT = 2228224, CKEDITOR.ALT = 4456448, CKEDITOR.EVENT_PHASE_CAPTURING = 1, CKEDITOR.EVENT_PHASE_AT_TARGET = 2, CKEDITOR.EVENT_PHASE_BUBBLING = 3, CKEDITOR.dom.domObject = function (c) {
        if (c)this.$ = c
    }, CKEDITOR.dom.domObject.prototype = function () {
        var c = function (c, b) {
            return function (a) {
                typeof CKEDITOR != "undefined" && c.fire(b, new CKEDITOR.dom.event(a))
            }
        };
        return {
            getPrivate: function () {
                var c;
                if (!(c = this.getCustomData("_")))this.setCustomData("_", c = {});
                return c
            }, on: function (f) {
                var b = this.getCustomData("_cke_nativeListeners");
                if (!b) {
                    b = {};
                    this.setCustomData("_cke_nativeListeners", b)
                }
                if (!b[f]) {
                    b = b[f] = c(this, f);
                    this.$.addEventListener ? this.$.addEventListener(f, b, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + f, b)
                }
                return CKEDITOR.event.prototype.on.apply(this, arguments)
            }, removeListener: function (c) {
                CKEDITOR.event.prototype.removeListener.apply(this, arguments);
                if (!this.hasListeners(c)) {
                    var b = this.getCustomData("_cke_nativeListeners"), a = b && b[c];
                    if (a) {
                        this.$.removeEventListener ? this.$.removeEventListener(c, a, false) : this.$.detachEvent && this.$.detachEvent("on" + c, a);
                        delete b[c]
                    }
                }
            }, removeAllListeners: function () {
                var c = this.getCustomData("_cke_nativeListeners"), b;
                for (b in c) {
                    var a = c[b];
                    this.$.detachEvent ? this.$.detachEvent("on" + b, a) : this.$.removeEventListener && this.$.removeEventListener(b, a, false);
                    delete c[b]
                }
            }
        }
    }(), function (c) {
        var f = {};
        CKEDITOR.on("reset", function () {
            f = {}
        });
        c.equals = function (b) {
            try {
                return b && b.$ === this.$
            } catch (a) {
                return false
            }
        };
        c.setCustomData = function (b, a) {
            var d = this.getUniqueId();
            (f[d] || (f[d] = {}))[b] = a;
            return this
        };
        c.getCustomData = function (b) {
            var a = this.$["data-cke-expando"];
            return (a = a && f[a]) && b in a ? a[b] : null
        };
        c.removeCustomData = function (b) {
            var a = this.$["data-cke-expando"], a = a && f[a], d, c;
            if (a) {
                d = a[b];
                c = b in a;
                delete a[b]
            }
            return c ? d : null
        };
        c.clearCustomData = function () {
            this.removeAllListeners();
            var b = this.$["data-cke-expando"];
            b && delete f[b]
        };
        c.getUniqueId = function () {
            return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber())
        };
        CKEDITOR.event.implementOn(c)
    }(CKEDITOR.dom.domObject.prototype), CKEDITOR.dom.node = function (c) {
        return c ? new CKEDITOR.dom[c.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : c.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : c.nodeType == CKEDITOR.NODE_TEXT ? "text" : c.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : c.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](c) : this
    }, CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject, CKEDITOR.NODE_ELEMENT = 1, CKEDITOR.NODE_DOCUMENT = 9, CKEDITOR.NODE_TEXT = 3, CKEDITOR.NODE_COMMENT = 8, CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11, CKEDITOR.POSITION_IDENTICAL = 0, CKEDITOR.POSITION_DISCONNECTED = 1, CKEDITOR.POSITION_FOLLOWING = 2, CKEDITOR.POSITION_PRECEDING = 4, CKEDITOR.POSITION_IS_CONTAINED = 8, CKEDITOR.POSITION_CONTAINS = 16, CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
        appendTo: function (c, f) {
            c.append(this, f);
            return c
        }, clone: function (c, f) {
            var b = this.$.cloneNode(c), a = function (d) {
                d["data-cke-expando"] && (d["data-cke-expando"] = false);
                if (d.nodeType == CKEDITOR.NODE_ELEMENT) {
                    f || d.removeAttribute("id", false);
                    if (c)for (var d = d.childNodes, b = 0; b < d.length; b++)a(d[b])
                }
            };
            a(b);
            return new CKEDITOR.dom.node(b)
        }, hasPrevious: function () {
            return !!this.$.previousSibling
        }, hasNext: function () {
            return !!this.$.nextSibling
        }, insertAfter: function (c) {
            c.$.parentNode.insertBefore(this.$, c.$.nextSibling);
            return c
        }, insertBefore: function (c) {
            c.$.parentNode.insertBefore(this.$, c.$);
            return c
        }, insertBeforeMe: function (c) {
            this.$.parentNode.insertBefore(c.$, this.$);
            return c
        }, getAddress: function (c) {
            for (var f = [], b = this.getDocument().$.documentElement, a = this.$; a && a != b;) {
                var d = a.parentNode;
                d && f.unshift(this.getIndex.call({$: a}, c));
                a = d
            }
            return f
        }, getDocument: function () {
            return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument)
        }, getIndex: function (c) {
            var f = this.$, b = -1, a;
            if (!this.$.parentNode)return b;
            do if (!c || !(f != this.$ && f.nodeType == CKEDITOR.NODE_TEXT && (a || !f.nodeValue))) {
                b++;
                a = f.nodeType == CKEDITOR.NODE_TEXT
            } while (f = f.previousSibling);
            return b
        }, getNextSourceNode: function (c, f, b) {
            if (b && !b.call)var a = b, b = function (d) {
                return !d.equals(a)
            };
            var c = !c && this.getFirst && this.getFirst(), d;
            if (!c) {
                if (this.type == CKEDITOR.NODE_ELEMENT && b && b(this, true) === false)return null;
                c = this.getNext()
            }
            for (; !c && (d = (d || this).getParent());) {
                if (b && b(d, true) === false)return null;
                c = d.getNext()
            }
            return !c || b && b(c) === false ? null : f && f != c.type ? c.getNextSourceNode(false, f, b) : c
        }, getPreviousSourceNode: function (c, f, b) {
            if (b && !b.call)var a = b, b = function (d) {
                return !d.equals(a)
            };
            var c = !c && this.getLast && this.getLast(), d;
            if (!c) {
                if (this.type == CKEDITOR.NODE_ELEMENT && b && b(this, true) === false)return null;
                c = this.getPrevious()
            }
            for (; !c && (d = (d || this).getParent());) {
                if (b && b(d, true) === false)return null;
                c = d.getPrevious()
            }
            return !c || b && b(c) === false ? null : f && c.type != f ? c.getPreviousSourceNode(false, f, b) : c
        }, getPrevious: function (c) {
            var f = this.$, b;
            do b = (f = f.previousSibling) && f.nodeType != 10 && new CKEDITOR.dom.node(f); while (b && c && !c(b));
            return b
        }, getNext: function (c) {
            var f = this.$, b;
            do b = (f = f.nextSibling) && new CKEDITOR.dom.node(f); while (b && c && !c(b));
            return b
        }, getParent: function (c) {
            var f = this.$.parentNode;
            return f && (f.nodeType == CKEDITOR.NODE_ELEMENT || c && f.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(f) : null
        }, getParents: function (c) {
            var f = this, b = [];
            do b[c ? "push" : "unshift"](f); while (f = f.getParent());
            return b
        }, getCommonAncestor: function (c) {
            if (c.equals(this))return this;
            if (c.contains && c.contains(this))return c;
            var f = this.contains ? this : this.getParent();
            do if (f.contains(c))return f; while (f = f.getParent());
            return null
        }, getPosition: function (c) {
            var f = this.$, b = c.$;
            if (f.compareDocumentPosition)return f.compareDocumentPosition(b);
            if (f == b)return CKEDITOR.POSITION_IDENTICAL;
            if (this.type == CKEDITOR.NODE_ELEMENT && c.type == CKEDITOR.NODE_ELEMENT) {
                if (f.contains) {
                    if (f.contains(b))return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING;
                    if (b.contains(f))return CKEDITOR.POSITION_IS_CONTAINED +
                        CKEDITOR.POSITION_FOLLOWING
                }
                if ("sourceIndex"in f)return f.sourceIndex < 0 || b.sourceIndex < 0 ? CKEDITOR.POSITION_DISCONNECTED : f.sourceIndex < b.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
            }
            for (var f = this.getAddress(), c = c.getAddress(), b = Math.min(f.length, c.length), a = 0; a <= b - 1; a++)if (f[a] != c[a]) {
                if (a < b)return f[a] < c[a] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
                break
            }
            return f.length < c.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED +
            CKEDITOR.POSITION_FOLLOWING
        }, getAscendant: function (c, f) {
            var b = this.$, a;
            if (!f)b = b.parentNode;
            for (; b;) {
                if (b.nodeName && (a = b.nodeName.toLowerCase(), typeof c == "string" ? a == c : a in c))return new CKEDITOR.dom.node(b);
                try {
                    b = b.parentNode
                } catch (d) {
                    b = null
                }
            }
            return null
        }, hasAscendant: function (c, f) {
            var b = this.$;
            if (!f)b = b.parentNode;
            for (; b;) {
                if (b.nodeName && b.nodeName.toLowerCase() == c)return true;
                b = b.parentNode
            }
            return false
        }, move: function (c, f) {
            c.append(this.remove(), f)
        }, remove: function (c) {
            var f = this.$, b = f.parentNode;
            if (b) {
                if (c)for (; c = f.firstChild;)b.insertBefore(f.removeChild(c), f);
                b.removeChild(f)
            }
            return this
        }, replace: function (c) {
            this.insertBefore(c);
            c.remove()
        }, trim: function () {
            this.ltrim();
            this.rtrim()
        }, ltrim: function () {
            for (var c; this.getFirst && (c = this.getFirst());) {
                if (c.type == CKEDITOR.NODE_TEXT) {
                    var f = CKEDITOR.tools.ltrim(c.getText()), b = c.getLength();
                    if (f) {
                        if (f.length < b) {
                            c.split(b - f.length);
                            this.$.removeChild(this.$.firstChild)
                        }
                    } else {
                        c.remove();
                        continue
                    }
                }
                break
            }
        }, rtrim: function () {
            for (var c; this.getLast && (c = this.getLast());) {
                if (c.type == CKEDITOR.NODE_TEXT) {
                    var f = CKEDITOR.tools.rtrim(c.getText()), b = c.getLength();
                    if (f) {
                        if (f.length < b) {
                            c.split(f.length);
                            this.$.lastChild.parentNode.removeChild(this.$.lastChild)
                        }
                    } else {
                        c.remove();
                        continue
                    }
                }
                break
            }
            if (!CKEDITOR.env.ie && !CKEDITOR.env.opera)(c = this.$.lastChild) && (c.type == 1 && c.nodeName.toLowerCase() == "br") && c.parentNode.removeChild(c)
        }, isReadOnly: function () {
            var c = this;
            this.type != CKEDITOR.NODE_ELEMENT && (c = this.getParent());
            if (c && typeof c.$.isContentEditable != "undefined")return !(c.$.isContentEditable || c.data("cke-editable"));
            for (; c;) {
                if (c.data("cke-editable"))break;
                if (c.getAttribute("contentEditable") == "false")return true;
                if (c.getAttribute("contentEditable") == "true")break;
                c = c.getParent()
            }
            return !c
        }
    }), CKEDITOR.dom.window = function (c) {
        CKEDITOR.dom.domObject.call(this, c)
    }, CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
        focus: function () {
            this.$.focus()
        }, getViewPaneSize: function () {
            var c = this.$.document, f = c.compatMode == "CSS1Compat";
            return {
                width: (f ? c.documentElement.clientWidth : c.body.clientWidth) || 0,
                height: (f ? c.documentElement.clientHeight : c.body.clientHeight) || 0
            }
        }, getScrollPosition: function () {
            var c = this.$;
            if ("pageXOffset"in c)return {x: c.pageXOffset || 0, y: c.pageYOffset || 0};
            c = c.document;
            return {
                x: c.documentElement.scrollLeft || c.body.scrollLeft || 0,
                y: c.documentElement.scrollTop || c.body.scrollTop || 0
            }
        }, getFrame: function () {
            var c = this.$.frameElement;
            return c ? new CKEDITOR.dom.element.get(c) : null
        }
    }), CKEDITOR.dom.document = function (c) {
        CKEDITOR.dom.domObject.call(this, c)
    }, CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
        type: CKEDITOR.NODE_DOCUMENT,
        appendStyleSheet: function (c) {
            if (this.$.createStyleSheet)this.$.createStyleSheet(c); else {
                var f = new CKEDITOR.dom.element("link");
                f.setAttributes({rel: "stylesheet", type: "text/css", href: c});
                this.getHead().append(f)
            }
        },
        appendStyleText: function (c) {
            if (this.$.createStyleSheet) {
                var f = this.$.createStyleSheet("");
                f.cssText = c
            } else {
                var b = new CKEDITOR.dom.element("style", this);
                b.append(new CKEDITOR.dom.text(c, this));
                this.getHead().append(b)
            }
            return f || b.$.sheet
        },
        createElement: function (c, f) {
            var b = new CKEDITOR.dom.element(c, this);
            if (f) {
                f.attributes && b.setAttributes(f.attributes);
                f.styles && b.setStyles(f.styles)
            }
            return b
        },
        createText: function (c) {
            return new CKEDITOR.dom.text(c, this)
        },
        focus: function () {
            this.getWindow().focus()
        },
        getActive: function () {
            return new CKEDITOR.dom.element(this.$.activeElement)
        },
        getById: function (c) {
            return (c = this.$.getElementById(c)) ? new CKEDITOR.dom.element(c) : null
        },
        getByAddress: function (c, f) {
            for (var b = this.$.documentElement, a = 0; b && a < c.length; a++) {
                var d = c[a];
                if (f)for (var i = -1, g = 0; g < b.childNodes.length; g++) {
                    var h = b.childNodes[g];
                    if (!(f === true && h.nodeType == 3 && h.previousSibling && h.previousSibling.nodeType == 3)) {
                        i++;
                        if (i == d) {
                            b = h;
                            break
                        }
                    }
                } else b = b.childNodes[d]
            }
            return b ? new CKEDITOR.dom.node(b) : null
        },
        getElementsByTag: function (c, f) {
            if ((!CKEDITOR.env.ie || document.documentMode > 8) && f)c = f + ":" + c;
            return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(c))
        },
        getHead: function () {
            var c = this.$.getElementsByTagName("head")[0];
            return c = c ? new CKEDITOR.dom.element(c) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), true)
        },
        getBody: function () {
            return new CKEDITOR.dom.element(this.$.body)
        },
        getDocumentElement: function () {
            return new CKEDITOR.dom.element(this.$.documentElement)
        },
        getWindow: function () {
            return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView)
        },
        write: function (c) {
            this.$.open("text/html", "replace");
            CKEDITOR.env.ie && (c = c.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$&\n<script data-cke-temp="1">(' + CKEDITOR.tools.fixDomain + ")();<\/script>"));
            this.$.write(c);
            this.$.close()
        },
        find: function (c) {
            return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(c))
        },
        findOne: function (c) {
            return (c = this.$.querySelector(c)) ? new CKEDITOR.dom.element(c) : null
        },
        _getHtml5ShivFrag: function () {
            var c = this.getCustomData("html5ShivFrag");
            if (!c) {
                c = this.$.createDocumentFragment();
                CKEDITOR.tools.enableHtml5Elements(c, true);
                this.setCustomData("html5ShivFrag", c)
            }
            return c
        }
    }), CKEDITOR.dom.nodeList = function (c) {
        this.$ = c
    }, CKEDITOR.dom.nodeList.prototype = {
        count: function () {
            return this.$.length
        }, getItem: function (c) {
            if (c < 0 || c >= this.$.length)return null;
            return (c = this.$[c]) ? new CKEDITOR.dom.node(c) : null
        }
    }, CKEDITOR.dom.element = function (c, f) {
        typeof c == "string" && (c = (f ? f.$ : document).createElement(c));
        CKEDITOR.dom.domObject.call(this, c)
    }, CKEDITOR.dom.element.get = function (c) {
        return (c = typeof c == "string" ? document.getElementById(c) || document.getElementsByName(c)[0] : c) && (c.$ ? c : new CKEDITOR.dom.element(c))
    }, CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node, CKEDITOR.dom.element.createFromHtml = function (c, f) {
        var b = new CKEDITOR.dom.element("div", f);
        b.setHtml(c);
        return b.getFirst().remove()
    }, CKEDITOR.dom.element.setMarker = function (c, f, b, a) {
        var d = f.getCustomData("list_marker_id") || f.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"), i = f.getCustomData("list_marker_names") || f.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
        c[d] = f;
        i[b] = 1;
        return f.setCustomData(b, a)
    }, CKEDITOR.dom.element.clearAllMarkers = function (c) {
        for (var f in c)CKEDITOR.dom.element.clearMarkers(c, c[f], 1)
    }, CKEDITOR.dom.element.clearMarkers = function (c, f, b) {
        var a = f.getCustomData("list_marker_names"), d = f.getCustomData("list_marker_id"), i;
        for (i in a)f.removeCustomData(i);
        f.removeCustomData("list_marker_names");
        if (b) {
            f.removeCustomData("list_marker_id");
            delete c[d]
        }
    }, function () {
        function c(d) {
            var a = true;
            if (!d.$.id) {
                d.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber();
                a = false
            }
            return function () {
                a || d.removeAttribute("id")
            }
        }

        function f(d, a) {
            return "#" +
                d.$.id + " " + a.split(/,\s*/).join(", #" + d.$.id + " ")
        }

        function b(d) {
            for (var b = 0, c = 0, h = a[d].length; c < h; c++)b = b + (parseInt(this.getComputedStyle(a[d][c]) || 0, 10) || 0);
            return b
        }

        CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
            type: CKEDITOR.NODE_ELEMENT,
            addClass: function (d) {
                var a = this.$.className;
                a && (RegExp("(?:^|\\s)" + d + "(?:\\s|$)", "").test(a) || (a = a + (" " + d)));
                this.$.className = a || d
            },
            removeClass: function (d) {
                var a = this.getAttribute("class");
                if (a) {
                    d = RegExp("(?:^|\\s+)" + d + "(?=\\s|$)", "i");
                    if (d.test(a))(a = a.replace(d, "").replace(/^\s+/, "")) ? this.setAttribute("class", a) : this.removeAttribute("class")
                }
                return this
            },
            hasClass: function (d) {
                return RegExp("(?:^|\\s+)" + d + "(?=\\s|$)", "").test(this.getAttribute("class"))
            },
            append: function (d, a) {
                typeof d == "string" && (d = this.getDocument().createElement(d));
                a ? this.$.insertBefore(d.$, this.$.firstChild) : this.$.appendChild(d.$);
                return d
            },
            appendHtml: function (d) {
                if (this.$.childNodes.length) {
                    var a = new CKEDITOR.dom.element("div", this.getDocument());
                    a.setHtml(d);
                    a.moveChildren(this)
                } else this.setHtml(d)
            },
            appendText: function (d) {
                this.$.text != void 0 ? this.$.text = this.$.text + d : this.append(new CKEDITOR.dom.text(d))
            },
            appendBogus: function () {
                for (var d = this.getLast(); d && d.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(d.getText());)d = d.getPrevious();
                if (!d || !d.is || !d.is("br")) {
                    d = CKEDITOR.env.opera ? this.getDocument().createText("") : this.getDocument().createElement("br");
                    CKEDITOR.env.gecko && d.setAttribute("type", "_moz");
                    this.append(d)
                }
            },
            breakParent: function (d) {
                var a = new CKEDITOR.dom.range(this.getDocument());
                a.setStartAfter(this);
                a.setEndAfter(d);
                d = a.extractContents();
                a.insertNode(this.remove());
                d.insertAfterNode(this)
            },
            contains: CKEDITOR.env.ie || CKEDITOR.env.webkit ? function (d) {
                var a = this.$;
                return d.type != CKEDITOR.NODE_ELEMENT ? a.contains(d.getParent().$) : a != d.$ && a.contains(d.$)
            } : function (d) {
                return !!(this.$.compareDocumentPosition(d.$) & 16)
            },
            focus: function () {
                function d() {
                    try {
                        this.$.focus()
                    } catch (d) {
                    }
                }

                return function (a) {
                    a ? CKEDITOR.tools.setTimeout(d, 100, this) : d.call(this)
                }
            }(),
            getHtml: function () {
                var d = this.$.innerHTML;
                return CKEDITOR.env.ie ? d.replace(/<\?[^>]*>/g, "") : d
            },
            getOuterHtml: function () {
                if (this.$.outerHTML)return this.$.outerHTML.replace(/<\?[^>]*>/, "");
                var d = this.$.ownerDocument.createElement("div");
                d.appendChild(this.$.cloneNode(true));
                return d.innerHTML
            },
            getClientRect: function () {
                var d = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect());
                !d.width && (d.width = d.right - d.left);
                !d.height && (d.height = d.bottom - d.top);
                return d
            },
            setHtml: CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? function (d) {
                try {
                    var a = this.$;
                    if (this.getParent())return a.innerHTML = d;
                    var b = this.getDocument()._getHtml5ShivFrag();
                    b.appendChild(a);
                    a.innerHTML = d;
                    b.removeChild(a);
                    return d
                } catch (c) {
                    this.$.innerHTML = "";
                    a = new CKEDITOR.dom.element("body", this.getDocument());
                    a.$.innerHTML = d;
                    for (a = a.getChildren(); a.count();)this.append(a.getItem(0));
                    return d
                }
            } : function (d) {
                return this.$.innerHTML = d
            },
            setText: function (d) {
                CKEDITOR.dom.element.prototype.setText = this.$.innerText != void 0 ? function (d) {
                    return this.$.innerText = d
                } : function (d) {
                    return this.$.textContent = d
                };
                return this.setText(d)
            },
            getAttribute: function () {
                var d = function (d) {
                    return this.$.getAttribute(d, 2)
                };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function (d) {
                    switch (d) {
                        case"class":
                            d = "className";
                            break;
                        case"http-equiv":
                            d = "httpEquiv";
                            break;
                        case"name":
                            return this.$.name;
                        case"tabindex":
                            d = this.$.getAttribute(d, 2);
                            d !== 0 && this.$.tabIndex === 0 && (d = null);
                            return d;
                        case"checked":
                            d = this.$.attributes.getNamedItem(d);
                            return (d.specified ? d.nodeValue : this.$.checked) ? "checked" : null;
                        case"hspace":
                        case"value":
                            return this.$[d];
                        case"style":
                            return this.$.style.cssText;
                        case"contenteditable":
                        case"contentEditable":
                            return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
                    }
                    return this.$.getAttribute(d, 2)
                } : d
            }(),
            getChildren: function () {
                return new CKEDITOR.dom.nodeList(this.$.childNodes)
            },
            getComputedStyle: CKEDITOR.env.ie ? function (d) {
                return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(d)]
            } : function (d) {
                var a = this.getWindow().$.getComputedStyle(this.$, null);
                return a ? a.getPropertyValue(d) : ""
            },
            getDtd: function () {
                var d = CKEDITOR.dtd[this.getName()];
                this.getDtd = function () {
                    return d
                };
                return d
            },
            getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag,
            getTabIndex: CKEDITOR.env.ie ? function () {
                var d = this.$.tabIndex;
                d === 0 && (!CKEDITOR.dtd.$tabIndex[this.getName()] && parseInt(this.getAttribute("tabindex"), 10) !== 0) && (d = -1);
                return d
            } : CKEDITOR.env.webkit ? function () {
                var d = this.$.tabIndex;
                if (d == void 0) {
                    d = parseInt(this.getAttribute("tabindex"), 10);
                    isNaN(d) && (d = -1)
                }
                return d
            } : function () {
                return this.$.tabIndex
            },
            getText: function () {
                return this.$.textContent || this.$.innerText || ""
            },
            getWindow: function () {
                return this.getDocument().getWindow()
            },
            getId: function () {
                return this.$.id || null
            },
            getNameAtt: function () {
                return this.$.name || null
            },
            getName: function () {
                var d = this.$.nodeName.toLowerCase();
                if (CKEDITOR.env.ie && !(document.documentMode > 8)) {
                    var a = this.$.scopeName;
                    a != "HTML" && (d = a.toLowerCase() + ":" + d)
                }
                return (this.getName = function () {
                    return d
                })()
            },
            getValue: function () {
                return this.$.value
            },
            getFirst: function (d) {
                var a = this.$.firstChild;
                (a = a && new CKEDITOR.dom.node(a)) && (d && !d(a)) && (a = a.getNext(d));
                return a
            },
            getLast: function (d) {
                var a = this.$.lastChild;
                (a = a && new CKEDITOR.dom.node(a)) && (d && !d(a)) && (a = a.getPrevious(d));
                return a
            },
            getStyle: function (d) {
                return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(d)]
            },
            is: function () {
                var d = this.getName();
                if (typeof arguments[0] == "object")return !!arguments[0][d];
                for (var a = 0; a < arguments.length; a++)if (arguments[a] == d)return true;
                return false
            },
            isEditable: function (d) {
                var a = this.getName();
                if (this.isReadOnly() || this.getComputedStyle("display") == "none" || this.getComputedStyle("visibility") == "hidden" || CKEDITOR.dtd.$nonEditable[a] || CKEDITOR.dtd.$empty[a] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount())return false;
                if (d !== false) {
                    d = CKEDITOR.dtd[a] || CKEDITOR.dtd.span;
                    return !(!d || !d["#"])
                }
                return true
            },
            isIdentical: function (d) {
                var a = this.clone(0, 1), d = d.clone(0, 1);
                a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                d.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
                if (a.$.isEqualNode) {
                    a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText);
                    d.$.style.cssText = CKEDITOR.tools.normalizeCssText(d.$.style.cssText);
                    return a.$.isEqualNode(d.$)
                }
                a = a.getOuterHtml();
                d = d.getOuterHtml();
                if (CKEDITOR.env.ie && CKEDITOR.env.version < 9 && this.is("a")) {
                    var b = this.getParent();
                    if (b.type == CKEDITOR.NODE_ELEMENT) {
                        b = b.clone();
                        b.setHtml(a);
                        a = b.getHtml();
                        b.setHtml(d);
                        d = b.getHtml()
                    }
                }
                return a == d
            },
            isVisible: function () {
                var d = (this.$.offsetHeight || this.$.offsetWidth) && this.getComputedStyle("visibility") != "hidden", a, b;
                if (d && (CKEDITOR.env.webkit || CKEDITOR.env.opera)) {
                    a = this.getWindow();
                    if (!a.equals(CKEDITOR.document.getWindow()) && (b = a.$.frameElement))d = (new CKEDITOR.dom.element(b)).isVisible()
                }
                return !!d
            },
            isEmptyInlineRemoveable: function () {
                if (!CKEDITOR.dtd.$removeEmpty[this.getName()])return false;
                for (var d = this.getChildren(), a = 0, b = d.count(); a < b; a++) {
                    var c = d.getItem(a);
                    if (!(c.type == CKEDITOR.NODE_ELEMENT && c.data("cke-bookmark")) && (c.type == CKEDITOR.NODE_ELEMENT && !c.isEmptyInlineRemoveable() || c.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(c.getText())))return false
                }
                return true
            },
            hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function () {
                for (var d = this.$.attributes, a = 0; a < d.length; a++) {
                    var b = d[a];
                    switch (b.nodeName) {
                        case"class":
                            if (this.getAttribute("class"))return true;
                        case"data-cke-expando":
                            continue;
                        default:
                            if (b.specified)return true
                    }
                }
                return false
            } : function () {
                var d = this.$.attributes, a = d.length, b = {"data-cke-expando": 1, _moz_dirty: 1};
                return a > 0 && (a > 2 || !b[d[0].nodeName] || a == 2 && !b[d[1].nodeName])
            },
            hasAttribute: function () {
                function d(d) {
                    d = this.$.attributes.getNamedItem(d);
                    return !(!d || !d.specified)
                }

                return CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? function (a) {
                    return a == "name" ? !!this.$.name : d.call(this, a)
                } : d
            }(),
            hide: function () {
                this.setStyle("display", "none")
            },
            moveChildren: function (d, a) {
                var b = this.$, d = d.$;
                if (b != d) {
                    var c;
                    if (a)for (; c = b.lastChild;)d.insertBefore(b.removeChild(c), d.firstChild); else for (; c = b.firstChild;)d.appendChild(b.removeChild(c))
                }
            },
            mergeSiblings: function () {
                function d(d, a, b) {
                    if (a && a.type == CKEDITOR.NODE_ELEMENT) {
                        for (var c = []; a.data("cke-bookmark") || a.isEmptyInlineRemoveable();) {
                            c.push(a);
                            a = b ? a.getNext() : a.getPrevious();
                            if (!a || a.type != CKEDITOR.NODE_ELEMENT)return
                        }
                        if (d.isIdentical(a)) {
                            for (var f = b ? d.getLast() : d.getFirst(); c.length;)c.shift().move(d, !b);
                            a.moveChildren(d, !b);
                            a.remove();
                            f && f.type == CKEDITOR.NODE_ELEMENT && f.mergeSiblings()
                        }
                    }
                }

                return function (a) {
                    if (a === false || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) {
                        d(this, this.getNext(), true);
                        d(this, this.getPrevious())
                    }
                }
            }(),
            show: function () {
                this.setStyles({display: "", visibility: ""})
            },
            setAttribute: function () {
                var d = function (d, a) {
                    this.$.setAttribute(d, a);
                    return this
                };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function (a, b) {
                    a == "class" ? this.$.className = b : a == "style" ? this.$.style.cssText = b : a == "tabindex" ? this.$.tabIndex = b : a == "checked" ? this.$.checked = b : a == "contenteditable" ? d.call(this, "contentEditable", b) : d.apply(this, arguments);
                    return this
                } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function (a, b) {
                    if (a == "src" && b.match(/^http:\/\//))try {
                        d.apply(this, arguments)
                    } catch (c) {
                    } else d.apply(this, arguments);
                    return this
                } : d
            }(),
            setAttributes: function (d) {
                for (var a in d)this.setAttribute(a, d[a]);
                return this
            },
            setValue: function (d) {
                this.$.value = d;
                return this
            },
            removeAttribute: function () {
                var d = function (d) {
                    this.$.removeAttribute(d)
                };
                return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) ? function (d) {
                    d == "class" ? d = "className" : d == "tabindex" ? d = "tabIndex" : d == "contenteditable" && (d = "contentEditable");
                    this.$.removeAttribute(d)
                } : d
            }(),
            removeAttributes: function (d) {
                if (CKEDITOR.tools.isArray(d))for (var a = 0; a < d.length; a++)this.removeAttribute(d[a]); else for (a in d)d.hasOwnProperty(a) && this.removeAttribute(a)
            },
            removeStyle: function (d) {
                var a = this.$.style;
                if (!a.removeProperty && (d == "border" || d == "margin" || d == "padding")) {
                    var b = ["top", "left", "right", "bottom"], c;
                    d == "border" && (c = ["color", "style", "width"]);
                    for (var a = [], e = 0; e < b.length; e++)if (c)for (var f = 0; f < c.length; f++)a.push([d, b[e], c[f]].join("-")); else a.push([d, b[e]].join("-"));
                    for (d = 0; d < a.length; d++)this.removeStyle(a[d])
                } else {
                    a.removeProperty ? a.removeProperty(d) : a.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(d));
                    this.$.style.cssText || this.removeAttribute("style")
                }
            },
            setStyle: function (a, b) {
                this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b;
                return this
            },
            setStyles: function (a) {
                for (var b in a)this.setStyle(b, a[b]);
                return this
            },
            setOpacity: function (a) {
                if (CKEDITOR.env.ie && CKEDITOR.env.version < 9) {
                    a = Math.round(a * 100);
                    this.setStyle("filter", a >= 100 ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity=" + a + ")")
                } else this.setStyle("opacity", a)
            },
            unselectable: function () {
                this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "none"));
                if (CKEDITOR.env.ie || CKEDITOR.env.opera) {
                    this.setAttribute("unselectable", "on");
                    for (var a, b = this.getElementsByTag("*"), c = 0, h = b.count(); c < h; c++) {
                        a = b.getItem(c);
                        a.setAttribute("unselectable", "on")
                    }
                }
            },
            getPositionedAncestor: function () {
                for (var a = this; a.getName() != "html";) {
                    if (a.getComputedStyle("position") != "static")return a;
                    a = a.getParent()
                }
                return null
            },
            getDocumentPosition: function (a) {
                var b = 0, c = 0, h = this.getDocument(), e = h.getBody(), f = h.$.compatMode == "BackCompat";
                if (document.documentElement.getBoundingClientRect) {
                    var k = this.$.getBoundingClientRect(), n = h.$.documentElement, o = n.clientTop || e.$.clientTop || 0, q = n.clientLeft || e.$.clientLeft || 0, m = true;
                    if (CKEDITOR.env.ie) {
                        m = h.getDocumentElement().contains(this);
                        h = h.getBody().contains(this);
                        m = f && h || !f && m
                    }
                    if (m) {
                        b = k.left + (!f && n.scrollLeft || e.$.scrollLeft);
                        b = b - q;
                        c = k.top + (!f && n.scrollTop || e.$.scrollTop);
                        c = c - o
                    }
                } else {
                    e = this;
                    for (h = null; e && !(e.getName() == "body" || e.getName() == "html");) {
                        b = b + (e.$.offsetLeft - e.$.scrollLeft);
                        c = c + (e.$.offsetTop - e.$.scrollTop);
                        if (!e.equals(this)) {
                            b = b + (e.$.clientLeft || 0);
                            c = c + (e.$.clientTop || 0)
                        }
                        for (; h && !h.equals(e);) {
                            b = b - h.$.scrollLeft;
                            c = c - h.$.scrollTop;
                            h = h.getParent()
                        }
                        h = e;
                        e = (k = e.$.offsetParent) ? new CKEDITOR.dom.element(k) : null
                    }
                }
                if (a) {
                    e = this.getWindow();
                    h = a.getWindow();
                    if (!e.equals(h) && e.$.frameElement) {
                        a = (new CKEDITOR.dom.element(e.$.frameElement)).getDocumentPosition(a);
                        b = b + a.x;
                        c = c + a.y
                    }
                }
                if (!document.documentElement.getBoundingClientRect && CKEDITOR.env.gecko && !f) {
                    b = b + (this.$.clientLeft ? 1 : 0);
                    c = c + (this.$.clientTop ? 1 : 0)
                }
                return {x: b, y: c}
            },
            scrollIntoView: function (a) {
                var b = this.getParent();
                if (b) {
                    do {
                        (b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1);
                        if (b.is("html")) {
                            var c = b.getWindow();
                            try {
                                var h = c.$.frameElement;
                                h && (b = new CKEDITOR.dom.element(h))
                            } catch (e) {
                            }
                        }
                    } while (b = b.getParent())
                }
            },
            scrollIntoParent: function (a, b, c) {
                var h, e, f, k;

                function n(b, c) {
                    if (/body|html/.test(a.getName()))a.getWindow().$.scrollBy(b, c); else {
                        a.$.scrollLeft = a.$.scrollLeft + b;
                        a.$.scrollTop = a.$.scrollTop + c
                    }
                }

                function o(a, d) {
                    var b = {x: 0, y: 0};
                    if (!a.is(m ? "body" : "html")) {
                        var c = a.$.getBoundingClientRect();
                        b.x = c.left;
                        b.y = c.top
                    }
                    c = a.getWindow();
                    if (!c.equals(d)) {
                        c = o(CKEDITOR.dom.element.get(c.$.frameElement), d);
                        b.x = b.x + c.x;
                        b.y = b.y + c.y
                    }
                    return b
                }

                function q(a, d) {
                    return parseInt(a.getComputedStyle("margin-" + d) || 0, 10) || 0
                }

                !a && (a = this.getWindow());
                f = a.getDocument();
                var m = f.$.compatMode == "BackCompat";
                a instanceof CKEDITOR.dom.window && (a = m ? f.getBody() : f.getDocumentElement());
                f = a.getWindow();
                e = o(this, f);
                var p = o(a, f), r = this.$.offsetHeight;
                h = this.$.offsetWidth;
                var l = a.$.clientHeight, y = a.$.clientWidth;
                f = e.x - q(this, "left") - p.x || 0;
                k = e.y - q(this, "top") - p.y || 0;
                h = e.x + h + q(this, "right") - (p.x + y) || 0;
                e = e.y + r + q(this, "bottom") - (p.y + l) || 0;
                if (k < 0 || e > 0)n(0, b === true ? k : b === false ? e : k < 0 ? k : e);
                if (c && (f < 0 || h > 0))n(f < 0 ? f : h, 0)
            },
            setState: function (a, b, c) {
                b = b || "cke";
                switch (a) {
                    case CKEDITOR.TRISTATE_ON:
                        this.addClass(b + "_on");
                        this.removeClass(b + "_off");
                        this.removeClass(b + "_disabled");
                        c && this.setAttribute("aria-pressed", true);
                        c && this.removeAttribute("aria-disabled");
                        break;
                    case CKEDITOR.TRISTATE_DISABLED:
                        this.addClass(b + "_disabled");
                        this.removeClass(b + "_off");
                        this.removeClass(b + "_on");
                        c && this.setAttribute("aria-disabled", true);
                        c && this.removeAttribute("aria-pressed");
                        break;
                    default:
                        this.addClass(b + "_off");
                        this.removeClass(b + "_on");
                        this.removeClass(b + "_disabled");
                        c && this.removeAttribute("aria-pressed");
                        c && this.removeAttribute("aria-disabled")
                }
            },
            getFrameDocument: function () {
                var a = this.$;
                try {
                    a.contentWindow.document
                } catch (b) {
                    a.src = a.src
                }
                return a && new CKEDITOR.dom.document(a.contentWindow.document)
            },
            copyAttributes: function (a, b) {
                for (var c = this.$.attributes, b = b || {}, h = 0; h < c.length; h++) {
                    var e = c[h], f = e.nodeName.toLowerCase(), k;
                    if (!(f in b))if (f == "checked" && (k = this.getAttribute(f)))a.setAttribute(f, k); else if (e.specified || CKEDITOR.env.ie && e.nodeValue && f == "value") {
                        k = this.getAttribute(f);
                        if (k === null)k = e.nodeValue;
                        a.setAttribute(f, k)
                    }
                }
                if (this.$.style.cssText !== "")a.$.style.cssText = this.$.style.cssText
            },
            renameNode: function (a) {
                if (this.getName() != a) {
                    var b = this.getDocument(), a = new CKEDITOR.dom.element(a, b);
                    this.copyAttributes(a);
                    this.moveChildren(a);
                    this.getParent() && this.$.parentNode.replaceChild(a.$, this.$);
                    a.$["data-cke-expando"] = this.$["data-cke-expando"];
                    this.$ = a.$
                }
            },
            getChild: function () {
                function a(d, b) {
                    var c = d.childNodes;
                    if (b >= 0 && b < c.length)return c[b]
                }

                return function (b) {
                    var c = this.$;
                    if (b.slice)for (; b.length > 0 && c;)c = a(c, b.shift()); else c = a(c, b);
                    return c ? new CKEDITOR.dom.node(c) : null
                }
            }(),
            getChildCount: function () {
                return this.$.childNodes.length
            },
            disableContextMenu: function () {
                this.on("contextmenu", function (a) {
                    a.data.getTarget().hasClass("cke_enable_context_menu") || a.data.preventDefault()
                })
            },
            getDirection: function (a) {
                return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir || "ltr" : this.getStyle("direction") || this.getAttribute("dir")
            },
            data: function (a, b) {
                a = "data-" + a;
                if (b === void 0)return this.getAttribute(a);
                b === false ? this.removeAttribute(a) : this.setAttribute(a, b);
                return null
            },
            getEditor: function () {
                var a = CKEDITOR.instances, b, c;
                for (b in a) {
                    c = a[b];
                    if (c.element.equals(this) && c.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO)return c
                }
                return null
            },
            find: function (a) {
                var b = c(this), a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(f(this, a)));
                b();
                return a
            },
            findOne: function (a) {
                var b = c(this), a = this.$.querySelector(f(this, a));
                b();
                return a ? new CKEDITOR.dom.element(a) : null
            }
        });
        var a = {
            width: ["border-left-width", "border-right-width", "padding-left", "padding-right"],
            height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"]
        };
        CKEDITOR.dom.element.prototype.setSize = function (a, c, g) {
            if (typeof c == "number") {
                if (g && (!CKEDITOR.env.ie || !CKEDITOR.env.quirks))c = c - b.call(this, a);
                this.setStyle(a, c + "px")
            }
        };
        CKEDITOR.dom.element.prototype.getSize = function (a, c) {
            var g = Math.max(this.$["offset" +
                CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0;
            c && (g = g - b.call(this, a));
            return g
        }
    }(), CKEDITOR.dom.documentFragment = function (c) {
        c = c || CKEDITOR.document;
        this.$ = c.type == CKEDITOR.NODE_DOCUMENT ? c.$.createDocumentFragment() : c
    }, CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, {
        type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
        insertAfterNode: function (c) {
            c = c.$;
            c.parentNode.insertBefore(this.$, c.nextSibling)
        }
    }, !0, {
        append: 1,
        appendBogus: 1,
        getFirst: 1,
        getLast: 1,
        getParent: 1,
        getNext: 1,
        getPrevious: 1,
        appendTo: 1,
        moveChildren: 1,
        insertBefore: 1,
        insertAfterNode: 1,
        replace: 1,
        trim: 1,
        type: 1,
        ltrim: 1,
        rtrim: 1,
        getDocument: 1,
        getChildCount: 1,
        getChild: 1,
        getChildren: 1
    }), function () {
        function c(a, b) {
            var d = this.range;
            if (this._.end)return null;
            if (!this._.start) {
                this._.start = 1;
                if (d.collapsed) {
                    this.end();
                    return null
                }
                d.optimize()
            }
            var c, e = d.startContainer;
            c = d.endContainer;
            var g = d.startOffset, h = d.endOffset, l, i = this.guard, f = this.type, j = a ? "getPreviousSourceNode" : "getNextSourceNode";
            if (!a && !this._.guardLTR) {
                var s = c.type == CKEDITOR.NODE_ELEMENT ? c : c.getParent(), v = c.type == CKEDITOR.NODE_ELEMENT ? c.getChild(h) : c.getNext();
                this._.guardLTR = function (a, b) {
                    return (!b || !s.equals(a)) && (!v || !a.equals(v)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(d.root))
                }
            }
            if (a && !this._.guardRTL) {
                var w = e.type == CKEDITOR.NODE_ELEMENT ? e : e.getParent(), u = e.type == CKEDITOR.NODE_ELEMENT ? g ? e.getChild(g - 1) : null : e.getPrevious();
                this._.guardRTL = function (a, b) {
                    return (!b || !w.equals(a)) && (!u || !a.equals(u)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(d.root))
                }
            }
            var x = a ? this._.guardRTL : this._.guardLTR;
            l = i ? function (a, b) {
                return x(a, b) === false ? false : i(a, b)
            } : x;
            if (this.current)c = this.current[j](false, f, l); else {
                if (a)c.type == CKEDITOR.NODE_ELEMENT && (c = h > 0 ? c.getChild(h - 1) : l(c, true) === false ? null : c.getPreviousSourceNode(true, f, l)); else {
                    c = e;
                    if (c.type == CKEDITOR.NODE_ELEMENT && !(c = c.getChild(g)))c = l(e, true) === false ? null : e.getNextSourceNode(true, f, l)
                }
                c && l(c) === false && (c = null)
            }
            for (; c && !this._.end;) {
                this.current = c;
                if (!this.evaluator || this.evaluator(c) !== false) {
                    if (!b)return c
                } else if (b && this.evaluator)return false;
                c = c[j](false, f, l)
            }
            this.end();
            return this.current = null
        }

        function f(a) {
            for (var b, d = null; b = c.call(this, a);)d = b;
            return d
        }

        function b(a) {
            if (e(a))return false;
            if (a.type == CKEDITOR.NODE_TEXT)return true;
            if (a.type == CKEDITOR.NODE_ELEMENT) {
                if (a.is(CKEDITOR.dtd.$inline) || a.getAttribute("contenteditable") == "false")return true;
                var b;
                if (b = CKEDITOR.env.ie)if (b = a.is(j))a:{
                    b = 0;
                    for (var d = a.getChildCount(); b < d; ++b)if (!e(a.getChild(b))) {
                        b = false;
                        break a
                    }
                    b = true
                }
                if (b)return true
            }
            return false
        }

        CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
            $: function (a) {
                this.range = a;
                this._ = {}
            }, proto: {
                end: function () {
                    this._.end = 1
                }, next: function () {
                    return c.call(this)
                }, previous: function () {
                    return c.call(this, 1)
                }, checkForward: function () {
                    return c.call(this, 0, 1) !== false
                }, checkBackward: function () {
                    return c.call(this, 1, 1) !== false
                }, lastForward: function () {
                    return f.call(this)
                }, lastBackward: function () {
                    return f.call(this, 1)
                }, reset: function () {
                    delete this.current;
                    this._ = {}
                }
            }
        });
        var a = {
            block: 1,
            "list-item": 1,
            table: 1,
            "table-row-group": 1,
            "table-header-group": 1,
            "table-footer-group": 1,
            "table-row": 1,
            "table-column-group": 1,
            "table-column": 1,
            "table-cell": 1,
            "table-caption": 1
        };
        CKEDITOR.dom.element.prototype.isBlockBoundary = function (b) {
            b = b ? CKEDITOR.tools.extend({}, CKEDITOR.dtd.$block, b) : CKEDITOR.dtd.$block;
            return this.getComputedStyle("float") == "none" && a[this.getComputedStyle("display")] || b[this.getName()]
        };
        CKEDITOR.dom.walker.blockBoundary = function (a) {
            return function (b) {
                return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a))
            }
        };
        CKEDITOR.dom.walker.listItemBoundary = function () {
            return this.blockBoundary({br: 1})
        };
        CKEDITOR.dom.walker.bookmark = function (a, b) {
            function d(a) {
                return a && a.getName && a.getName() == "span" && a.data("cke-bookmark")
            }

            return function (c) {
                var e, g;
                e = c && c.type != CKEDITOR.NODE_ELEMENT && (g = c.getParent()) && d(g);
                e = a ? e : e || d(c);
                return !!(b ^ e)
            }
        };
        CKEDITOR.dom.walker.whitespaces = function (a) {
            return function (b) {
                var d;
                b && b.type == CKEDITOR.NODE_TEXT && (d = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && b.getText() == "​");
                return !!(a ^ d)
            }
        };
        CKEDITOR.dom.walker.invisible = function (a) {
            var b = CKEDITOR.dom.walker.whitespaces();
            return function (d) {
                if (b(d))d = 1; else {
                    d.type == CKEDITOR.NODE_TEXT && (d = d.getParent());
                    d = !d.$.offsetHeight
                }
                return !!(a ^ d)
            }
        };
        CKEDITOR.dom.walker.nodeType = function (a, b) {
            return function (d) {
                return !!(b ^ d.type == a)
            }
        };
        CKEDITOR.dom.walker.bogus = function (a) {
            function b(a) {
                return !i(a) && !g(a)
            }

            return function (c) {
                var e = !CKEDITOR.env.ie ? c.is && c.is("br") : c.getText && d.test(c.getText());
                if (e) {
                    e = c.getParent();
                    c = c.getNext(b);
                    e = e.isBlockBoundary() && (!c || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary())
                }
                return !!(a ^ e)
            }
        };
        CKEDITOR.dom.walker.temp = function (a) {
            return function (b) {
                b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent());
                b = b && b.hasAttribute("data-cke-temp");
                return !!(a ^ b)
            }
        };
        var d = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, i = CKEDITOR.dom.walker.whitespaces(), g = CKEDITOR.dom.walker.bookmark(), h = CKEDITOR.dom.walker.temp();
        CKEDITOR.dom.walker.ignored = function (a) {
            return function (b) {
                b = i(b) || g(b) || h(b);
                return !!(a ^ b)
            }
        };
        var e = CKEDITOR.dom.walker.ignored(), j = function (a) {
            var b = {}, d;
            for (d in a)CKEDITOR.dtd[d]["#"] && (b[d] = 1);
            return b
        }(CKEDITOR.dtd.$block);
        CKEDITOR.dom.walker.editable = function (a) {
            return function (d) {
                return !!(a ^ b(d))
            }
        };
        CKEDITOR.dom.element.prototype.getBogus = function () {
            var a = this;
            do a = a.getPreviousSourceNode(); while (g(a) || i(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty));
            return a && (!CKEDITOR.env.ie ? a.is && a.is("br") : a.getText && d.test(a.getText())) ? a : false
        }
    }(), CKEDITOR.dom.range = function (c) {
        this.endOffset = this.endContainer = this.startOffset = this.startContainer = null;
        this.collapsed = true;
        var f = c instanceof CKEDITOR.dom.document;
        this.document = f ? c : c.getDocument();
        this.root = f ? c.getBody() : c
    }, function () {
        function c() {
            var a = false, b = CKEDITOR.dom.walker.whitespaces(), d = CKEDITOR.dom.walker.bookmark(true), c = CKEDITOR.dom.walker.bogus();
            return function (e) {
                if (d(e) || b(e))return true;
                if (c(e) && !a)return a = true;
                return e.type == CKEDITOR.NODE_TEXT && (e.hasAscendant("pre") || CKEDITOR.tools.trim(e.getText()).length) || e.type == CKEDITOR.NODE_ELEMENT && !e.is(i) ? false : true
            }
        }

        function f(a) {
            var b = CKEDITOR.dom.walker.whitespaces(), d = CKEDITOR.dom.walker.bookmark(1);
            return function (c) {
                return d(c) || b(c) ? true : !a && g(c) || c.type == CKEDITOR.NODE_ELEMENT && c.is(CKEDITOR.dtd.$removeEmpty)
            }
        }

        function b(a) {
            return function () {
                var b;
                return this[a ? "getPreviousNode" : "getNextNode"](function (a) {
                    !b && j(a) && (b = a);
                    return e(a) && !(g(a) && a.equals(b))
                })
            }
        }

        var a = function (a) {
            a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset
        }, d = function (a, b, d, c) {
            a.optimizeBookmark();
            var e = a.startContainer, g = a.endContainer, h = a.startOffset, l = a.endOffset, i, f;
            if (g.type == CKEDITOR.NODE_TEXT)g = g.split(l); else if (g.getChildCount() > 0)if (l >= g.getChildCount()) {
                g = g.append(a.document.createText(""));
                f = true
            } else g = g.getChild(l);
            if (e.type == CKEDITOR.NODE_TEXT) {
                e.split(h);
                e.equals(g) && (g = e.getNext())
            } else if (h)if (h >= e.getChildCount()) {
                e = e.append(a.document.createText(""));
                i = true
            } else e = e.getChild(h).getPrevious(); else {
                e = e.append(a.document.createText(""), 1);
                i = true
            }
            var h = e.getParents(), l = g.getParents(), j, s, v;
            for (j = 0; j < h.length; j++) {
                s = h[j];
                v = l[j];
                if (!s.equals(v))break
            }
            for (var w = d, u, x, B, z = j; z < h.length; z++) {
                u = h[z];
                w && !u.equals(e) && (x = w.append(u.clone()));
                for (u = u.getNext(); u;) {
                    if (u.equals(l[z]) || u.equals(g))break;
                    B = u.getNext();
                    if (b == 2)w.append(u.clone(true)); else {
                        u.remove();
                        b == 1 && w.append(u)
                    }
                    u = B
                }
                w && (w = x)
            }
            w = d;
            for (d = j; d < l.length; d++) {
                u = l[d];
                b > 0 && !u.equals(g) && (x = w.append(u.clone()));
                if (!h[d] || u.$.parentNode != h[d].$.parentNode)for (u = u.getPrevious(); u;) {
                    if (u.equals(h[d]) || u.equals(e))break;
                    B = u.getPrevious();
                    if (b == 2)w.$.insertBefore(u.$.cloneNode(true), w.$.firstChild); else {
                        u.remove();
                        b == 1 && w.$.insertBefore(u.$, w.$.firstChild)
                    }
                    u = B
                }
                w && (w = x)
            }
            if (b == 2) {
                s = a.startContainer;
                if (s.type == CKEDITOR.NODE_TEXT) {
                    s.$.data = s.$.data + s.$.nextSibling.data;
                    s.$.parentNode.removeChild(s.$.nextSibling)
                }
                a = a.endContainer;
                if (a.type == CKEDITOR.NODE_TEXT && a.$.nextSibling) {
                    a.$.data = a.$.data + a.$.nextSibling.data;
                    a.$.parentNode.removeChild(a.$.nextSibling)
                }
            } else {
                if (s && v && (e.$.parentNode != s.$.parentNode || g.$.parentNode != v.$.parentNode)) {
                    b = v.getIndex();
                    i && v.$.parentNode == e.$.parentNode && b--;
                    if (c && s.type == CKEDITOR.NODE_ELEMENT) {
                        c = CKEDITOR.dom.element.createFromHtml('<span data-cke-bookmark="1" style="display:none">&nbsp;</span>', a.document);
                        c.insertAfter(s);
                        s.mergeSiblings(false);
                        a.moveToBookmark({startNode: c})
                    } else a.setStart(v.getParent(), b)
                }
                a.collapse(true)
            }
            i && e.remove();
            f && g.$.parentNode && g.remove()
        }, i = {
            abbr: 1,
            acronym: 1,
            b: 1,
            bdo: 1,
            big: 1,
            cite: 1,
            code: 1,
            del: 1,
            dfn: 1,
            em: 1,
            font: 1,
            i: 1,
            ins: 1,
            label: 1,
            kbd: 1,
            q: 1,
            samp: 1,
            small: 1,
            span: 1,
            strike: 1,
            strong: 1,
            sub: 1,
            sup: 1,
            tt: 1,
            u: 1,
            "var": 1
        }, g = CKEDITOR.dom.walker.bogus(), h = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, e = CKEDITOR.dom.walker.editable(), j = CKEDITOR.dom.walker.ignored(true);
        CKEDITOR.dom.range.prototype = {
            clone: function () {
                var a = new CKEDITOR.dom.range(this.root);
                a.startContainer = this.startContainer;
                a.startOffset = this.startOffset;
                a.endContainer = this.endContainer;
                a.endOffset = this.endOffset;
                a.collapsed = this.collapsed;
                return a
            }, collapse: function (a) {
                if (a) {
                    this.endContainer = this.startContainer;
                    this.endOffset = this.startOffset
                } else {
                    this.startContainer = this.endContainer;
                    this.startOffset = this.endOffset
                }
                this.collapsed = true
            }, cloneContents: function () {
                var a = new CKEDITOR.dom.documentFragment(this.document);
                this.collapsed || d(this, 2, a);
                return a
            }, deleteContents: function (a) {
                this.collapsed || d(this, 0, null, a)
            }, extractContents: function (a) {
                var b = new CKEDITOR.dom.documentFragment(this.document);
                this.collapsed || d(this, 1, b, a);
                return b
            }, createBookmark: function (a) {
                var b, d, c, e, g = this.collapsed;
                b = this.document.createElement("span");
                b.data("cke-bookmark", 1);
                b.setStyle("display", "none");
                b.setHtml("&nbsp;");
                if (a) {
                    c = "cke_bm_" + CKEDITOR.tools.getNextNumber();
                    b.setAttribute("id", c + (g ? "C" : "S"))
                }
                if (!g) {
                    d = b.clone();
                    d.setHtml("&nbsp;");
                    a && d.setAttribute("id", c + "E");
                    e = this.clone();
                    e.collapse();
                    e.insertNode(d)
                }
                e = this.clone();
                e.collapse(true);
                e.insertNode(b);
                if (d) {
                    this.setStartAfter(b);
                    this.setEndBefore(d)
                } else this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END);
                return {startNode: a ? c + (g ? "C" : "S") : b, endNode: a ? c + "E" : d, serializable: a, collapsed: g}
            }, createBookmark2: function () {
                function a(b, d) {
                    return d > 0 && b && b.type == CKEDITOR.NODE_TEXT && b.getPrevious() && b.getPrevious().type == CKEDITOR.NODE_TEXT
                }

                function b(d) {
                    var c, e, g = d.container, h = d.offset;
                    if (g.type == CKEDITOR.NODE_ELEMENT) {
                        if (c = g.getChild(h)) {
                            if (a(c, h)) {
                                g = c;
                                h = 0
                            }
                        } else {
                            c = g.getLast();
                            if (a(c, h)) {
                                g = c;
                                h = c.getLength()
                            }
                        }
                        c && c.type == CKEDITOR.NODE_ELEMENT && (h = c.getIndex(1))
                    }
                    for (; g.type == CKEDITOR.NODE_TEXT && (e = g.getPrevious()) && e.type == CKEDITOR.NODE_TEXT;) {
                        g = e;
                        h = h + e.getLength()
                    }
                    d.container = g;
                    d.offset = h
                }

                return function (a) {
                    var d = this.collapsed, c = {
                        container: this.startContainer,
                        offset: this.startOffset
                    }, e = {container: this.endContainer, offset: this.endOffset};
                    if (!c.container || !e.container)return {start: 0, end: 0};
                    if (a) {
                        b(c);
                        d || b(e)
                    }
                    return {
                        start: c.container.getAddress(a),
                        end: d ? null : e.container.getAddress(a),
                        startOffset: c.offset,
                        endOffset: e.offset,
                        normalized: a,
                        collapsed: d,
                        is2: true
                    }
                }
            }(), moveToBookmark: function (a) {
                if (a.is2) {
                    var b = this.document.getByAddress(a.start, a.normalized), d = a.startOffset, c = a.end && this.document.getByAddress(a.end, a.normalized), a = a.endOffset;
                    this.setStart(b, d);
                    c ? this.setEnd(c, a) : this.collapse(true)
                } else {
                    b = (d = a.serializable) ? this.document.getById(a.startNode) : a.startNode;
                    a = d ? this.document.getById(a.endNode) : a.endNode;
                    this.setStartBefore(b);
                    b.remove();
                    if (a) {
                        this.setEndBefore(a);
                        a.remove()
                    } else this.collapse(true)
                }
            }, getBoundaryNodes: function () {
                var a = this.startContainer, b = this.endContainer, d = this.startOffset, c = this.endOffset, e;
                if (a.type == CKEDITOR.NODE_ELEMENT) {
                    e = a.getChildCount();
                    if (e > d)a = a.getChild(d); else if (e < 1)a = a.getPreviousSourceNode(); else {
                        for (a = a.$; a.lastChild;)a = a.lastChild;
                        a = new CKEDITOR.dom.node(a);
                        a = a.getNextSourceNode() || a
                    }
                }
                if (b.type == CKEDITOR.NODE_ELEMENT) {
                    e = b.getChildCount();
                    if (e > c)b = b.getChild(c).getPreviousSourceNode(true); else if (e < 1)b = b.getPreviousSourceNode(); else {
                        for (b = b.$; b.lastChild;)b = b.lastChild;
                        b = new CKEDITOR.dom.node(b)
                    }
                }
                a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b);
                return {startNode: a, endNode: b}
            }, getCommonAncestor: function (a, b) {
                var d = this.startContainer, c = this.endContainer, d = d.equals(c) ? a && d.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? d.getChild(this.startOffset) : d : d.getCommonAncestor(c);
                return b && !d.is ? d.getParent() : d
            }, optimize: function () {
                var a = this.startContainer, b = this.startOffset;
                a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) : this.setStartBefore(a));
                a = this.endContainer;
                b = this.endOffset;
                a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
            }, optimizeBookmark: function () {
                var a = this.startContainer, b = this.endContainer;
                a.is && (a.is("span") && a.data("cke-bookmark")) && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START);
                b && (b.is && b.is("span") && b.data("cke-bookmark")) && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END)
            }, trim: function (a, b) {
                var d = this.startContainer, c = this.startOffset, e = this.collapsed;
                if ((!a || e) && d && d.type == CKEDITOR.NODE_TEXT) {
                    if (c)if (c >= d.getLength()) {
                        c = d.getIndex() + 1;
                        d = d.getParent()
                    } else {
                        var g = d.split(c), c = d.getIndex() + 1, d = d.getParent();
                        if (this.startContainer.equals(this.endContainer))this.setEnd(g, this.endOffset - this.startOffset); else if (d.equals(this.endContainer))this.endOffset = this.endOffset + 1
                    } else {
                        c = d.getIndex();
                        d = d.getParent()
                    }
                    this.setStart(d, c);
                    if (e) {
                        this.collapse(true);
                        return
                    }
                }
                d = this.endContainer;
                c = this.endOffset;
                if (!b && !e && d && d.type == CKEDITOR.NODE_TEXT) {
                    if (c) {
                        c >= d.getLength() || d.split(c);
                        c = d.getIndex() + 1
                    } else c = d.getIndex();
                    d = d.getParent();
                    this.setEnd(d, c)
                }
            }, enlarge: function (a, b) {
                switch (a) {
                    case CKEDITOR.ENLARGE_INLINE:
                        var d = 1;
                    case CKEDITOR.ENLARGE_ELEMENT:
                        if (this.collapsed)break;
                        var c = this.getCommonAncestor(), e = this.root, g, h, l, i, f, j = false, s, v;
                        s = this.startContainer;
                        v = this.startOffset;
                        if (s.type == CKEDITOR.NODE_TEXT) {
                            if (v) {
                                s = !CKEDITOR.tools.trim(s.substring(0, v)).length && s;
                                j = !!s
                            }
                            if (s && !(i = s.getPrevious()))l = s.getParent()
                        } else {
                            v && (i = s.getChild(v - 1) || s.getLast());
                            i || (l = s)
                        }
                        for (; l || i;) {
                            if (l && !i) {
                                !f && l.equals(c) && (f = true);
                                if (d ? l.isBlockBoundary() : !e.contains(l))break;
                                if (!j || l.getComputedStyle("display") != "inline") {
                                    j = false;
                                    f ? g = l : this.setStartBefore(l)
                                }
                                i = l.getPrevious()
                            }
                            for (; i;) {
                                s = false;
                                if (i.type == CKEDITOR.NODE_COMMENT)i = i.getPrevious(); else {
                                    if (i.type == CKEDITOR.NODE_TEXT) {
                                        v = i.getText();
                                        /[^\s\ufeff]/.test(v) && (i = null);
                                        s = /[\s\ufeff]$/.test(v)
                                    } else if ((i.$.offsetWidth > 0 || b && i.is("br")) && !i.data("cke-bookmark"))if (j && CKEDITOR.dtd.$removeEmpty[i.getName()]) {
                                        v = i.getText();
                                        if (/[^\s\ufeff]/.test(v))i = null; else for (var w = i.$.getElementsByTagName("*"), u = 0, x; x = w[u++];)if (!CKEDITOR.dtd.$removeEmpty[x.nodeName.toLowerCase()]) {
                                            i = null;
                                            break
                                        }
                                        i && (s = !!v.length)
                                    } else i = null;
                                    s && (j ? f ? g = l : l && this.setStartBefore(l) : j = true);
                                    if (i) {
                                        s = i.getPrevious();
                                        if (!l && !s) {
                                            l = i;
                                            i = null;
                                            break
                                        }
                                        i = s
                                    } else l = null
                                }
                            }
                            l && (l = l.getParent())
                        }
                        s = this.endContainer;
                        v = this.endOffset;
                        l = i = null;
                        f = j = false;
                        if (s.type == CKEDITOR.NODE_TEXT) {
                            s = !CKEDITOR.tools.trim(s.substring(v)).length && s;
                            j = !(s && s.getLength());
                            if (s && !(i = s.getNext()))l = s.getParent()
                        } else(i = s.getChild(v)) || (l = s);
                        for (; l || i;) {
                            if (l && !i) {
                                !f && l.equals(c) && (f = true);
                                if (d ? l.isBlockBoundary() : !e.contains(l))break;
                                if (!j || l.getComputedStyle("display") != "inline") {
                                    j = false;
                                    f ? h = l : l && this.setEndAfter(l)
                                }
                                i = l.getNext()
                            }
                            for (; i;) {
                                s = false;
                                if (i.type == CKEDITOR.NODE_TEXT) {
                                    v = i.getText();
                                    /[^\s\ufeff]/.test(v) && (i = null);
                                    s = /^[\s\ufeff]/.test(v)
                                } else if (i.type == CKEDITOR.NODE_ELEMENT) {
                                    if ((i.$.offsetWidth > 0 || b && i.is("br")) && !i.data("cke-bookmark"))if (j && CKEDITOR.dtd.$removeEmpty[i.getName()]) {
                                        v = i.getText();
                                        if (/[^\s\ufeff]/.test(v))i = null; else {
                                            w = i.$.getElementsByTagName("*");
                                            for (u = 0; x = w[u++];)if (!CKEDITOR.dtd.$removeEmpty[x.nodeName.toLowerCase()]) {
                                                i = null;
                                                break
                                            }
                                        }
                                        i && (s = !!v.length)
                                    } else i = null
                                } else s = 1;
                                s && j && (f ? h = l : this.setEndAfter(l));
                                if (i) {
                                    s = i.getNext();
                                    if (!l && !s) {
                                        l = i;
                                        i = null;
                                        break
                                    }
                                    i = s
                                } else l = null
                            }
                            l && (l = l.getParent())
                        }
                        if (g && h) {
                            c = g.contains(h) ? h : g;
                            this.setStartBefore(c);
                            this.setEndAfter(c)
                        }
                        break;
                    case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
                    case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
                        l = new CKEDITOR.dom.range(this.root);
                        e = this.root;
                        l.setStartAt(e, CKEDITOR.POSITION_AFTER_START);
                        l.setEnd(this.startContainer, this.startOffset);
                        l = new CKEDITOR.dom.walker(l);
                        var B, z, D = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? {br: 1} : null), C = function (a) {
                            var b = D(a);
                            b || (B = a);
                            return b
                        }, d = function (a) {
                            var b = C(a);
                            !b && (a.is && a.is("br")) && (z = a);
                            return b
                        };
                        l.guard = C;
                        l = l.lastBackward();
                        B = B || e;
                        this.setStartAt(B, !B.is("br") && (!l && this.checkStartOfBlock() || l && B.contains(l)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END);
                        if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) {
                            l = this.clone();
                            l = new CKEDITOR.dom.walker(l);
                            var F = CKEDITOR.dom.walker.whitespaces(), G = CKEDITOR.dom.walker.bookmark();
                            l.evaluator = function (a) {
                                return !F(a) && !G(a)
                            };
                            if ((l = l.previous()) && l.type == CKEDITOR.NODE_ELEMENT && l.is("br"))break
                        }
                        l = this.clone();
                        l.collapse();
                        l.setEndAt(e, CKEDITOR.POSITION_BEFORE_END);
                        l = new CKEDITOR.dom.walker(l);
                        l.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? d : C;
                        B = null;
                        l = l.lastForward();
                        B = B || e;
                        this.setEndAt(B, !l && this.checkEndOfBlock() || l && B.contains(l) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START);
                        z && this.setEndAfter(z)
                }
            }, shrink: function (a, b, d) {
                if (!this.collapsed) {
                    var a = a || CKEDITOR.SHRINK_TEXT, c = this.clone(), e = this.startContainer, g = this.endContainer, h = this.startOffset, i = this.endOffset, f = 1, j = 1;
                    if (e && e.type == CKEDITOR.NODE_TEXT)if (h)if (h >= e.getLength())c.setStartAfter(e); else {
                        c.setStartBefore(e);
                        f = 0
                    } else c.setStartBefore(e);
                    if (g && g.type == CKEDITOR.NODE_TEXT)if (i)if (i >= g.getLength())c.setEndAfter(g); else {
                        c.setEndAfter(g);
                        j = 0
                    } else c.setEndBefore(g);
                    var c = new CKEDITOR.dom.walker(c), A = CKEDITOR.dom.walker.bookmark();
                    c.evaluator = function (b) {
                        return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT)
                    };
                    var s;
                    c.guard = function (b, c) {
                        if (A(b))return true;
                        if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || c && b.equals(s) || d === false && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary())return false;
                        !c && b.type == CKEDITOR.NODE_ELEMENT && (s = b);
                        return true
                    };
                    if (f)(e = c[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(e, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START);
                    if (j) {
                        c.reset();
                        (c = c[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(c, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END)
                    }
                    return !(!f && !j)
                }
            }, insertNode: function (a) {
                this.optimizeBookmark();
                this.trim(false, true);
                var b = this.startContainer, d = b.getChild(this.startOffset);
                d ? a.insertBefore(d) : b.append(a);
                a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++;
                this.setStartBefore(a)
            }, moveToPosition: function (a, b) {
                this.setStartAt(a, b);
                this.collapse(true)
            }, moveToRange: function (a) {
                this.setStart(a.startContainer, a.startOffset);
                this.setEnd(a.endContainer, a.endOffset)
            }, selectNodeContents: function (a) {
                this.setStart(a, 0);
                this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount())
            }, setStart: function (b, d) {
                if (b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()]) {
                    d = b.getIndex();
                    b = b.getParent()
                }
                this.startContainer = b;
                this.startOffset = d;
                if (!this.endContainer) {
                    this.endContainer = b;
                    this.endOffset = d
                }
                a(this)
            }, setEnd: function (b, d) {
                if (b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()]) {
                    d = b.getIndex() + 1;
                    b = b.getParent()
                }
                this.endContainer = b;
                this.endOffset = d;
                if (!this.startContainer) {
                    this.startContainer = b;
                    this.startOffset = d
                }
                a(this)
            }, setStartAfter: function (a) {
                this.setStart(a.getParent(), a.getIndex() + 1)
            }, setStartBefore: function (a) {
                this.setStart(a.getParent(), a.getIndex())
            }, setEndAfter: function (a) {
                this.setEnd(a.getParent(), a.getIndex() + 1)
            }, setEndBefore: function (a) {
                this.setEnd(a.getParent(), a.getIndex())
            }, setStartAt: function (b, d) {
                switch (d) {
                    case CKEDITOR.POSITION_AFTER_START:
                        this.setStart(b, 0);
                        break;
                    case CKEDITOR.POSITION_BEFORE_END:
                        b.type == CKEDITOR.NODE_TEXT ? this.setStart(b, b.getLength()) : this.setStart(b, b.getChildCount());
                        break;
                    case CKEDITOR.POSITION_BEFORE_START:
                        this.setStartBefore(b);
                        break;
                    case CKEDITOR.POSITION_AFTER_END:
                        this.setStartAfter(b)
                }
                a(this)
            }, setEndAt: function (b, d) {
                switch (d) {
                    case CKEDITOR.POSITION_AFTER_START:
                        this.setEnd(b, 0);
                        break;
                    case CKEDITOR.POSITION_BEFORE_END:
                        b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b, b.getLength()) : this.setEnd(b, b.getChildCount());
                        break;
                    case CKEDITOR.POSITION_BEFORE_START:
                        this.setEndBefore(b);
                        break;
                    case CKEDITOR.POSITION_AFTER_END:
                        this.setEndAfter(b)
                }
                a(this)
            }, fixBlock: function (a, b) {
                var d = this.createBookmark(), c = this.document.createElement(b);
                this.collapse(a);
                this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                this.extractContents().appendTo(c);
                c.trim();
                CKEDITOR.env.ie || c.appendBogus();
                this.insertNode(c);
                this.moveToBookmark(d);
                return c
            }, splitBlock: function (a) {
                var b = new CKEDITOR.dom.elementPath(this.startContainer, this.root), d = new CKEDITOR.dom.elementPath(this.endContainer, this.root), c = b.block, e = d.block, g = null;
                if (!b.blockLimit.equals(d.blockLimit))return null;
                if (a != "br") {
                    if (!c) {
                        c = this.fixBlock(true, a);
                        e = (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block
                    }
                    e || (e = this.fixBlock(false, a))
                }
                a = c && this.checkStartOfBlock();
                b = e && this.checkEndOfBlock();
                this.deleteContents();
                if (c && c.equals(e))if (b) {
                    g = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                    this.moveToPosition(e, CKEDITOR.POSITION_AFTER_END);
                    e = null
                } else if (a) {
                    g = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                    this.moveToPosition(c, CKEDITOR.POSITION_BEFORE_START);
                    c = null
                } else {
                    e = this.splitElement(c);
                    !CKEDITOR.env.ie && !c.is("ul", "ol") && c.appendBogus()
                }
                return {previousBlock: c, nextBlock: e, wasStartOfBlock: a, wasEndOfBlock: b, elementPath: g}
            }, splitElement: function (a) {
                if (!this.collapsed)return null;
                this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END);
                var b = this.extractContents(), d = a.clone(false);
                b.appendTo(d);
                d.insertAfter(a);
                this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END);
                return d
            }, removeEmptyBlocksAtEnd: function () {
                function a(c) {
                    return function (a) {
                        return b(a) || (d(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable()) || c.is("table") && a.is("caption") ? false : true
                    }
                }

                var b = CKEDITOR.dom.walker.whitespaces(), d = CKEDITOR.dom.walker.bookmark(false);
                return function (b) {
                    for (var d = this.createBookmark(), c = this[b ? "endPath" : "startPath"](), e = c.block || c.blockLimit, g; e && !e.equals(c.root) && !e.getFirst(a(e));) {
                        g = e.getParent();
                        this[b ? "setEndAt" : "setStartAt"](e, CKEDITOR.POSITION_AFTER_END);
                        e.remove(1);
                        e = g
                    }
                    this.moveToBookmark(d)
                }
            }(), startPath: function () {
                return new CKEDITOR.dom.elementPath(this.startContainer, this.root)
            }, endPath: function () {
                return new CKEDITOR.dom.elementPath(this.endContainer, this.root)
            }, checkBoundaryOfElement: function (a, b) {
                var d = b == CKEDITOR.START, c = this.clone();
                c.collapse(d);
                c[d ? "setStartAt" : "setEndAt"](a, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END);
                c = new CKEDITOR.dom.walker(c);
                c.evaluator = f(d);
                return c[d ? "checkBackward" : "checkForward"]()
            }, checkStartOfBlock: function () {
                var a = this.startContainer, b = this.startOffset;
                if (CKEDITOR.env.ie && b && a.type == CKEDITOR.NODE_TEXT) {
                    a = CKEDITOR.tools.ltrim(a.substring(0, b));
                    h.test(a) && this.trim(0, 1)
                }
                this.trim();
                a = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
                b = this.clone();
                b.collapse(true);
                b.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START);
                a = new CKEDITOR.dom.walker(b);
                a.evaluator = c();
                return a.checkBackward()
            }, checkEndOfBlock: function () {
                var a = this.endContainer, b = this.endOffset;
                if (CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT) {
                    a = CKEDITOR.tools.rtrim(a.substring(b));
                    h.test(a) && this.trim(1, 0)
                }
                this.trim();
                a = new CKEDITOR.dom.elementPath(this.endContainer, this.root);
                b = this.clone();
                b.collapse(false);
                b.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END);
                a = new CKEDITOR.dom.walker(b);
                a.evaluator = c();
                return a.checkForward()
            }, getPreviousNode: function (a, b, d) {
                var c = this.clone();
                c.collapse(1);
                c.setStartAt(d || this.root, CKEDITOR.POSITION_AFTER_START);
                d = new CKEDITOR.dom.walker(c);
                d.evaluator = a;
                d.guard = b;
                return d.previous()
            }, getNextNode: function (a, b, d) {
                var c = this.clone();
                c.collapse();
                c.setEndAt(d || this.root, CKEDITOR.POSITION_BEFORE_END);
                d = new CKEDITOR.dom.walker(c);
                d.evaluator = a;
                d.guard = b;
                return d.next()
            }, checkReadOnly: function () {
                function a(b, d) {
                    for (; b;) {
                        if (b.type == CKEDITOR.NODE_ELEMENT) {
                            if (b.getAttribute("contentEditable") == "false" && !b.data("cke-editable"))return 0;
                            if (b.is("html") || b.getAttribute("contentEditable") == "true" && (b.contains(d) || b.equals(d)))break
                        }
                        b = b.getParent()
                    }
                    return 1
                }

                return function () {
                    var b = this.startContainer, d = this.endContainer;
                    return !(a(b, d) && a(d, b))
                }
            }(), moveToElementEditablePosition: function (a, b) {
                if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(false)) {
                    this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
                    return true
                }
                for (var d = 0; a;) {
                    if (a.type == CKEDITOR.NODE_TEXT) {
                        b && this.endContainer && this.checkEndOfBlock() && h.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
                        d = 1;
                        break
                    }
                    if (a.type == CKEDITOR.NODE_ELEMENT)if (a.isEditable()) {
                        this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START);
                        d = 1
                    } else if (b && a.is("br") && this.endContainer && this.checkEndOfBlock())this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START); else if (a.getAttribute("contenteditable") == "false" && a.is(CKEDITOR.dtd.$block)) {
                        this.setStartBefore(a);
                        this.setEndAfter(a);
                        return true
                    }
                    var c = a, e = d, g = void 0;
                    c.type == CKEDITOR.NODE_ELEMENT && c.isEditable(false) && (g = c[b ? "getLast" : "getFirst"](j));
                    !e && !g && (g = c[b ? "getPrevious" : "getNext"](j));
                    a = g
                }
                return !!d
            }, moveToClosestEditablePosition: function (a, b) {
                var d = new CKEDITOR.dom.range(this.root), c = 0, e, g = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START];
                d.moveToPosition(a, g[b ? 0 : 1]);
                if (a.is(CKEDITOR.dtd.$block)) {
                    if (e = d[b ? "getNextEditableNode" : "getPreviousEditableNode"]()) {
                        c = 1;
                        if (e.type == CKEDITOR.NODE_ELEMENT && e.is(CKEDITOR.dtd.$block) && e.getAttribute("contenteditable") == "false") {
                            d.setStartAt(e, CKEDITOR.POSITION_BEFORE_START);
                            d.setEndAt(e, CKEDITOR.POSITION_AFTER_END)
                        } else d.moveToPosition(e, g[b ? 1 : 0])
                    }
                } else c = 1;
                c && this.moveToRange(d);
                return !!c
            }, moveToElementEditStart: function (a) {
                return this.moveToElementEditablePosition(a)
            }, moveToElementEditEnd: function (a) {
                return this.moveToElementEditablePosition(a, true)
            }, getEnclosedNode: function () {
                var a = this.clone();
                a.optimize();
                if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT)return null;
                var a = new CKEDITOR.dom.walker(a), b = CKEDITOR.dom.walker.bookmark(false, true), d = CKEDITOR.dom.walker.whitespaces(true);
                a.evaluator = function (a) {
                    return d(a) && b(a)
                };
                var c = a.next();
                a.reset();
                return c && c.equals(a.previous()) ? c : null
            }, getTouchedStartNode: function () {
                var a = this.startContainer;
                return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a
            }, getTouchedEndNode: function () {
                var a = this.endContainer;
                return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a
            }, getNextEditableNode: b(), getPreviousEditableNode: b(1), scrollIntoView: function () {
                var a = new CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", this.document), b, d, c, e = this.clone();
                e.optimize();
                if (c = e.startContainer.type == CKEDITOR.NODE_TEXT) {
                    d = e.startContainer.getText();
                    b = e.startContainer.split(e.startOffset);
                    a.insertAfter(e.startContainer)
                } else e.insertNode(a);
                a.scrollIntoView();
                if (c) {
                    e.startContainer.setText(d);
                    b.remove()
                }
                a.remove()
            }
        }
    }(), CKEDITOR.POSITION_AFTER_START = 1, CKEDITOR.POSITION_BEFORE_END = 2, CKEDITOR.POSITION_BEFORE_START = 3, CKEDITOR.POSITION_AFTER_END = 4, CKEDITOR.ENLARGE_ELEMENT = 1, CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2, CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3, CKEDITOR.ENLARGE_INLINE = 4, CKEDITOR.START = 1, CKEDITOR.END = 2, CKEDITOR.SHRINK_ELEMENT = 1, CKEDITOR.SHRINK_TEXT = 2, function () {
        function c(a) {
            if (!(arguments.length < 1)) {
                this.range = a;
                this.forceBrBreak = 0;
                this.enlargeBr = 1;
                this.enforceRealBlocks = 0;
                this._ || (this._ = {})
            }
        }

        function f(b, d, c) {
            for (b = b.getNextSourceNode(d, null, c); !a(b);)b = b.getNextSourceNode(d, null, c);
            return b
        }

        var b = /^[\r\n\t ]+$/, a = CKEDITOR.dom.walker.bookmark(false, true), d = CKEDITOR.dom.walker.whitespaces(true), i = function (b) {
            return a(b) && d(b)
        };
        c.prototype = {
            getNextParagraph: function (d) {
                d = d || "p";
                if (!CKEDITOR.dtd[this.range.root.getName()][d])return null;
                var c, e, j, k, n, o;
                if (!this._.started) {
                    e = this.range.clone();
                    e.shrink(CKEDITOR.NODE_ELEMENT, true);
                    k = e.endContainer.hasAscendant("pre", true) || e.startContainer.hasAscendant("pre", true);
                    e.enlarge(this.forceBrBreak && !k || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                    if (!e.collapsed) {
                        k = new CKEDITOR.dom.walker(e.clone());
                        var q = CKEDITOR.dom.walker.bookmark(true, true);
                        k.evaluator = q;
                        this._.nextNode = k.next();
                        k = new CKEDITOR.dom.walker(e.clone());
                        k.evaluator = q;
                        k = k.previous();
                        this._.lastNode = k.getNextSourceNode(true);
                        if (this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary()) {
                            q = this.range.clone();
                            q.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END);
                            if (q.checkEndOfBlock()) {
                                q = new CKEDITOR.dom.elementPath(q.endContainer, q.root);
                                this._.lastNode = (q.block || q.blockLimit).getNextSourceNode(true)
                            }
                        }
                        if (!this._.lastNode) {
                            this._.lastNode = this._.docEndMarker = e.document.createText("");
                            this._.lastNode.insertAfter(k)
                        }
                        e = null
                    }
                    this._.started = 1
                }
                q = this._.nextNode;
                k = this._.lastNode;
                for (this._.nextNode = null; q;) {
                    var m = 0, p = q.hasAscendant("pre"), r = q.type != CKEDITOR.NODE_ELEMENT, l = 0;
                    if (r)q.type == CKEDITOR.NODE_TEXT && b.test(q.getText()) && (r = 0); else {
                        var y = q.getName();
                        if (q.isBlockBoundary(this.forceBrBreak && !p && {br: 1})) {
                            if (y == "br")r = 1; else if (!e && !q.getChildCount() && y != "hr") {
                                c = q;
                                j = q.equals(k);
                                break
                            }
                            if (e) {
                                e.setEndAt(q, CKEDITOR.POSITION_BEFORE_START);
                                if (y != "br")this._.nextNode = q
                            }
                            m = 1
                        } else {
                            if (q.getFirst()) {
                                if (!e) {
                                    e = this.range.clone();
                                    e.setStartAt(q, CKEDITOR.POSITION_BEFORE_START)
                                }
                                q = q.getFirst();
                                continue
                            }
                            r = 1
                        }
                    }
                    if (r && !e) {
                        e = this.range.clone();
                        e.setStartAt(q, CKEDITOR.POSITION_BEFORE_START)
                    }
                    j = (!m || r) && q.equals(k);
                    if (e && !m)for (; !q.getNext(i) && !j;) {
                        y = q.getParent();
                        if (y.isBlockBoundary(this.forceBrBreak && !p && {br: 1})) {
                            m = 1;
                            r = 0;
                            j || y.equals(k);
                            e.setEndAt(y, CKEDITOR.POSITION_BEFORE_END);
                            break
                        }
                        q = y;
                        r = 1;
                        j = q.equals(k);
                        l = 1
                    }
                    r && e.setEndAt(q, CKEDITOR.POSITION_AFTER_END);
                    q = f(q, l, k);
                    if ((j = !q) || m && e)break
                }
                if (!c) {
                    if (!e) {
                        this._.docEndMarker && this._.docEndMarker.remove();
                        return this._.nextNode = null
                    }
                    c = new CKEDITOR.dom.elementPath(e.startContainer, e.root);
                    q = c.blockLimit;
                    m = {div: 1, th: 1, td: 1};
                    c = c.block;
                    if (!c && q && !this.enforceRealBlocks && m[q.getName()] && e.checkStartOfBlock() && e.checkEndOfBlock() && !q.equals(e.root))c = q; else if (!c || this.enforceRealBlocks && c.getName() == "li") {
                        c = this.range.document.createElement(d);
                        e.extractContents().appendTo(c);
                        c.trim();
                        e.insertNode(c);
                        n = o = true
                    } else if (c.getName() != "li") {
                        if (!e.checkStartOfBlock() || !e.checkEndOfBlock()) {
                            c = c.clone(false);
                            e.extractContents().appendTo(c);
                            c.trim();
                            o = e.splitBlock();
                            n = !o.wasStartOfBlock;
                            o = !o.wasEndOfBlock;
                            e.insertNode(c)
                        }
                    } else if (!j)this._.nextNode = c.equals(k) ? null : f(e.getBoundaryNodes().endNode, 1, k)
                }
                if (n)(e = c.getPrevious()) && e.type == CKEDITOR.NODE_ELEMENT && (e.getName() == "br" ? e.remove() : e.getLast() && e.getLast().$.nodeName.toLowerCase() == "br" && e.getLast().remove());
                if (o)(e = c.getLast()) && e.type == CKEDITOR.NODE_ELEMENT && e.getName() == "br" && (CKEDITOR.env.ie || e.getPrevious(a) || e.getNext(a)) && e.remove();
                if (!this._.nextNode)this._.nextNode = j || c.equals(k) || !k ? null : f(c, 1, k);
                return c
            }
        };
        CKEDITOR.dom.range.prototype.createIterator = function () {
            return new c(this)
        }
    }(), CKEDITOR.command = function (c, f) {
        this.uiItems = [];
        this.exec = function (a) {
            if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed())return false;
            this.editorFocus && c.focus();
            return this.fire("exec") === false ? true : f.exec.call(this, c, a) !== false
        };
        this.refresh = function (a, b) {
            if (!this.readOnly && a.readOnly)return true;
            if (this.context && !b.isContextFor(this.context)) {
                this.disable();
                return true
            }
            if (!this.checkAllowed(true)) {
                this.disable();
                return true
            }
            this.startDisabled || this.enable();
            this.modes && !this.modes[a.mode] && this.disable();
            return this.fire("refresh", {
                editor: a,
                path: b
            }) === false ? true : f.refresh && f.refresh.apply(this, arguments) !== false
        };
        var b;
        this.checkAllowed = function (a) {
            return !a && typeof b == "boolean" ? b : b = c.activeFilter.checkFeature(this)
        };
        CKEDITOR.tools.extend(this, f, {
            modes: {wysiwyg: 1},
            editorFocus: 1,
            contextSensitive: !!f.context,
            state: CKEDITOR.TRISTATE_DISABLED
        });
        CKEDITOR.event.call(this)
    }, CKEDITOR.command.prototype = {
        enable: function () {
            this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(!this.preserveState || typeof this.previousState == "undefined" ? CKEDITOR.TRISTATE_OFF : this.previousState)
        }, disable: function () {
            this.setState(CKEDITOR.TRISTATE_DISABLED)
        }, setState: function (c) {
            if (this.state == c || c != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed())return false;
            this.previousState = this.state;
            this.state = c;
            this.fire("state");
            return true
        }, toggleState: function () {
            this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
        }
    }, CKEDITOR.event.implementOn(CKEDITOR.command.prototype), CKEDITOR.ENTER_P = 1, CKEDITOR.ENTER_BR = 2, CKEDITOR.ENTER_DIV = 3, CKEDITOR.config = {
        customConfig: "config.js",
        autoUpdateElement: !0,
        language: "",
        defaultLanguage: "en",
        contentsLangDirection: "",
        enterMode: CKEDITOR.ENTER_P,
        forceEnterMode: !1,
        shiftEnterMode: CKEDITOR.ENTER_BR,
        docType: "<!DOCTYPE html>",
        bodyId: "",
        bodyClass: "",
        fullPage: !1,
        height: 200,
        extraPlugins: "",
        removePlugins: "",
        protectedSource: [],
        tabIndex: 0,
        width: "",
        baseFloatZIndex: 1E4,
        blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85]
    }, function () {
        function c(a, b, c, e, g) {
            var i = b.name;
            if ((e || typeof a.elements != "function" || a.elements(i)) && (!a.match || a.match(b))) {
                if (e = !g) {
                    a:if (a.nothingRequired)e = true; else {
                        if (g = a.requiredClasses) {
                            i = b.classes;
                            for (e = 0; e < g.length; ++e)if (CKEDITOR.tools.indexOf(i, g[e]) == -1) {
                                e = false;
                                break a
                            }
                        }
                        e = d(b.styles, a.requiredStyles) && d(b.attributes, a.requiredAttributes)
                    }
                    e = !e
                }
                if (!e) {
                    if (!a.propertiesOnly)c.valid = true;
                    if (!c.allAttributes)c.allAttributes = f(a.attributes, b.attributes, c.validAttributes);
                    if (!c.allStyles)c.allStyles = f(a.styles, b.styles, c.validStyles);
                    if (!c.allClasses) {
                        a = a.classes;
                        b = b.classes;
                        e = c.validClasses;
                        if (a)if (a === true)b = true; else {
                            for (var g = 0, i = b.length, h; g < i; ++g) {
                                h = b[g];
                                e[h] || (e[h] = a(h))
                            }
                            b = false
                        } else b = false;
                        c.allClasses = b
                    }
                }
            }
        }

        function f(a, b, c) {
            if (!a)return false;
            if (a === true)return true;
            for (var d in b)c[d] || (c[d] = a(d, b[d]));
            return false
        }

        function b(a, b) {
            if (!a)return false;
            if (a === true)return a;
            if (typeof a == "string") {
                a = v(a);
                return a == "*" ? true : CKEDITOR.tools.convertArrayToObject(a.split(b))
            }
            if (CKEDITOR.tools.isArray(a))return a.length ? CKEDITOR.tools.convertArrayToObject(a) : false;
            var c = {}, d = 0, e;
            for (e in a) {
                c[e] = a[e];
                d++
            }
            return d ? c : false
        }

        function a(a) {
            if (a._.filterFunction)return a._.filterFunction;
            var b = /^cke:(object|embed|param)$/, d = /^(object|embed|param)$/;
            return a._.filterFunction = function (g, i, h, l, m, f, y) {
                var o = g.name, r, q = false;
                if (m)g.name = o = o.replace(b, "$1");
                if (h = h && h[o]) {
                    e(g);
                    for (o = 0; o < h.length; ++o)p(a, g, h[o]);
                    j(g)
                }
                if (i) {
                    var o = g.name, h = i.elements[o], n = i.generic, i = {
                        valid: false,
                        validAttributes: {},
                        validClasses: {},
                        validStyles: {},
                        allAttributes: false,
                        allClasses: false,
                        allStyles: false
                    };
                    if (!h && !n) {
                        l.push(g);
                        return true
                    }
                    e(g);
                    if (h) {
                        o = 0;
                        for (r = h.length; o < r; ++o)c(h[o], g, i, true, f)
                    }
                    if (n) {
                        o = 0;
                        for (r = n.length; o < r; ++o)c(n[o], g, i, false, f)
                    }
                    if (!i.valid) {
                        l.push(g);
                        return true
                    }
                    f = i.validAttributes;
                    o = i.validStyles;
                    h = i.validClasses;
                    r = g.attributes;
                    var n = g.styles, v = r["class"], t = r.style, A, s, z = [], w = [], x = /^data-cke-/, u = false;
                    delete r.style;
                    delete r["class"];
                    if (!i.allAttributes)for (A in r)if (!f[A])if (x.test(A)) {
                        if (A != (s = A.replace(/^data-cke-saved-/, "")) && !f[s]) {
                            delete r[A];
                            u = true
                        }
                    } else {
                        delete r[A];
                        u = true
                    }
                    if (i.allStyles) {
                        if (t)r.style = t
                    } else {
                        for (A in n)o[A] ? z.push(A + ":" + n[A]) : u = true;
                        if (z.length)r.style = z.sort().join("; ")
                    }
                    if (i.allClasses)v && (r["class"] = v); else {
                        for (A in h)h[A] && w.push(A);
                        w.length && (r["class"] = w.sort().join(" "));
                        v && w.length < v.split(/\s+/).length && (u = true)
                    }
                    u && (q = true);
                    if (!y && !k(g)) {
                        l.push(g);
                        return true
                    }
                }
                if (m)g.name = g.name.replace(d, "cke:$1");
                return q
            }
        }

        function d(a, b) {
            if (!b)return true;
            for (var c = 0; c < b.length; ++c)if (!(b[c]in a))return false;
            return true
        }

        function i(a) {
            if (!a)return {};
            for (var a = a.split(/\s*,\s*/).sort(), b = {}; a.length;)b[a.shift()] = w;
            return b
        }

        function g(a) {
            for (var b, c, d, e, g = {}, i = 1, a = v(a); b = a.match(z);) {
                if (c = b[2]) {
                    d = h(c, "styles");
                    e = h(c, "attrs");
                    c = h(c, "classes")
                } else d = e = c = null;
                g["$" + i++] = {elements: b[1], classes: c, styles: d, attributes: e};
                a = a.slice(b[0].length)
            }
            return g
        }

        function h(a, b) {
            var c = a.match(D[b]);
            return c ? v(c[1]) : null
        }

        function e(a) {
            if (!a.styles)a.styles = CKEDITOR.tools.parseCssText(a.attributes.style || "", 1);
            if (!a.classes)a.classes = a.attributes["class"] ? a.attributes["class"].split(/\s+/) : []
        }

        function j(a) {
            var b = a.attributes, c;
            delete b.style;
            delete b["class"];
            if (c = CKEDITOR.tools.writeCssText(a.styles, true))b.style = c;
            a.classes.length && (b["class"] = a.classes.sort().join(" "))
        }

        function k(a) {
            switch (a.name) {
                case"a":
                    if (!a.children.length && !a.attributes.name)return false;
                    break;
                case"img":
                    if (!a.attributes.src)return false
            }
            return true
        }

        function n(a) {
            return !a ? false : a === true ? true : function (b) {
                return b in a
            }
        }

        function o() {
            return new CKEDITOR.htmlParser.element("br")
        }

        function q(a) {
            return a.type == CKEDITOR.NODE_ELEMENT && (a.name == "br" || A.$block[a.name])
        }

        function m(a, b, c) {
            var d = a.name;
            if (A.$empty[d] || !a.children.length)if (d == "hr" && b == "br")a.replaceWith(o()); else {
                a.parent && c.push({check: "it", el: a.parent});
                a.remove()
            } else if (A.$block[d] || d == "tr")if (b == "br") {
                if (a.previous && !q(a.previous)) {
                    b = o();
                    b.insertBefore(a)
                }
                if (a.next && !q(a.next)) {
                    b = o();
                    b.insertAfter(a)
                }
                a.replaceWithChildren()
            } else {
                var d = a.children, e;
                b:{
                    e = A[b];
                    for (var g = 0, i = d.length, h; g < i; ++g) {
                        h = d[g];
                        if (h.type == CKEDITOR.NODE_ELEMENT && !e[h.name]) {
                            e = false;
                            break b
                        }
                    }
                    e = true
                }
                if (e) {
                    a.name = b;
                    a.attributes = {};
                    c.push({check: "parent-down", el: a})
                } else {
                    e = a.parent;
                    for (var g = e.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || e.name == "body", l, i = d.length; i > 0;) {
                        h = d[--i];
                        if (g && (h.type == CKEDITOR.NODE_TEXT || h.type == CKEDITOR.NODE_ELEMENT && A.$inline[h.name])) {
                            if (!l) {
                                l = new CKEDITOR.htmlParser.element(b);
                                l.insertAfter(a);
                                c.push({check: "parent-down", el: l})
                            }
                            l.add(h, 0)
                        } else {
                            l = null;
                            h.insertAfter(a);
                            e.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && (h.type == CKEDITOR.NODE_ELEMENT && !A[e.name][h.name]) && c.push({
                                check: "el-up",
                                el: h
                            })
                        }
                    }
                    a.remove()
                }
            } else if (d == "style")a.remove(); else {
                a.parent && c.push({check: "it", el: a.parent});
                a.replaceWithChildren()
            }
        }

        function p(a, b, c) {
            var d, e;
            for (d = 0; d < c.length; ++d) {
                e = c[d];
                if ((!e.check || a.check(e.check, false)) && (!e.left || e.left(b))) {
                    e.right(b, C);
                    break
                }
            }
        }

        function r(a, b) {
            var c = b.getDefinition(), d = c.attributes, e = c.styles, g, h, i, l;
            if (a.name != c.element)return false;
            for (g in d)if (g == "class") {
                c = d[g].split(/\s+/);
                for (i = a.classes.join("|"); l = c.pop();)if (i.indexOf(l) == -1)return false
            } else if (a.attributes[g] != d[g])return false;
            for (h in e)if (a.styles[h] != e[h])return false;
            return true
        }

        function l(a, b) {
            var c, d;
            if (typeof a == "string")c = a; else if (a instanceof CKEDITOR.style)d = a; else {
                c = a[0];
                d = a[1]
            }
            return [{
                element: c, left: d, right: function (a, c) {
                    c.transform(a, b)
                }
            }]
        }

        function y(a) {
            return function (b) {
                return r(b, a)
            }
        }

        function t(a) {
            return function (b, c) {
                c[a](b)
            }
        }

        var A = CKEDITOR.dtd, s = CKEDITOR.tools.copy, v = CKEDITOR.tools.trim, w = "cke-test", u = ["", "p", "br", "div"];
        CKEDITOR.filter = function (a) {
            this.allowedContent = [];
            this.disabled = false;
            this.editor = null;
            this._ = {rules: {}, transformations: {}, cachedTests: {}};
            if (a instanceof CKEDITOR.editor) {
                a = this.editor = a;
                this.customConfig = true;
                var b = a.config.allowedContent;
                if (b === true)this.disabled = true; else {
                    if (!b)this.customConfig = false;
                    this.allow(b, "config", 1);
                    this.allow(a.config.extraAllowedContent, "extra", 1);
                    this.allow(u[a.enterMode] + " " + u[a.shiftEnterMode], "default", 1)
                }
            } else {
                this.customConfig = false;
                this.allow(a, "default", 1)
            }
        };
        CKEDITOR.filter.prototype = {
            allow: function (a, c, d) {
                if (this.disabled || this.customConfig && !d || !a)return false;
                this._.cachedChecks = {};
                var e, h;
                if (typeof a == "string")a = g(a); else if (a instanceof CKEDITOR.style) {
                    h = a.getDefinition();
                    d = {};
                    a = h.attributes;
                    d[h.element] = h = {
                        styles: h.styles,
                        requiredStyles: h.styles && CKEDITOR.tools.objectKeys(h.styles)
                    };
                    if (a) {
                        a = s(a);
                        h.classes = a["class"] ? a["class"].split(/\s+/) : null;
                        h.requiredClasses = h.classes;
                        delete a["class"];
                        h.attributes = a;
                        h.requiredAttributes = a && CKEDITOR.tools.objectKeys(a)
                    }
                    a = d
                } else if (CKEDITOR.tools.isArray(a)) {
                    for (e = 0; e < a.length; ++e)h = this.allow(a[e], c, d);
                    return h
                }
                var i, d = [];
                for (i in a) {
                    h = a[i];
                    h = typeof h == "boolean" ? {} : typeof h == "function" ? {match: h} : s(h);
                    if (i.charAt(0) != "$")h.elements = i;
                    if (c)h.featureName = c.toLowerCase();
                    var l = h;
                    l.elements = b(l.elements, /\s+/) || null;
                    l.propertiesOnly = l.propertiesOnly || l.elements === true;
                    var m = /\s*,\s*/, f = void 0;
                    for (f in x) {
                        l[f] = b(l[f], m) || null;
                        var j = l, p = B[f], k = b(l[B[f]], m), y = l[f], o = [], r = true, q = void 0;
                        k ? r = false : k = {};
                        for (q in y)if (q.charAt(0) == "!") {
                            q = q.slice(1);
                            o.push(q);
                            k[q] = true;
                            r = false
                        }
                        for (; q = o.pop();) {
                            y[q] = y["!" + q];
                            delete y["!" + q]
                        }
                        j[p] = (r ? false : k) || null
                    }
                    l.match = l.match || null;
                    this.allowedContent.push(h);
                    d.push(h)
                }
                c = this._.rules;
                i = c.elements || {};
                a = c.generic || [];
                h = 0;
                for (l = d.length; h < l; ++h) {
                    m = s(d[h]);
                    f = m.classes === true || m.styles === true || m.attributes === true;
                    j = m;
                    p = void 0;
                    for (p in x)j[p] = n(j[p]);
                    k = true;
                    for (p in B) {
                        p = B[p];
                        j[p] = CKEDITOR.tools.objectKeys(j[p]);
                        j[p] && (k = false)
                    }
                    j.nothingRequired = k;
                    if (m.elements === true || m.elements === null) {
                        m.elements = n(m.elements);
                        a[f ? "unshift" : "push"](m)
                    } else {
                        j = m.elements;
                        delete m.elements;
                        for (e in j)if (i[e])i[e][f ? "unshift" : "push"](m); else i[e] = [m]
                    }
                }
                c.elements = i;
                c.generic = a.length ? a : null;
                return true
            }, applyTo: function (b, c, d, e) {
                if (this.disabled)return false;
                var g = [], h = !d && this._.rules, i = this._.transformations, l = a(this), f = this.editor && this.editor.config.protectedSource, j = false;
                b.forEach(function (a) {
                    if (a.type == CKEDITOR.NODE_ELEMENT) {
                        if (a.attributes["data-cke-filter"] == "off")return false;
                        if (!c || !(a.name == "span" && ~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-")))l(a, h, i, g, c) && (j = true)
                    } else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                        var b;
                        a:{
                            var d = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, ""));
                            b = [];
                            var e, m, p;
                            if (f)for (m = 0; m < f.length; ++m)if ((p = d.match(f[m])) && p[0].length == d.length) {
                                b = true;
                                break a
                            }
                            d = CKEDITOR.htmlParser.fragment.fromHtml(d);
                            d.children.length == 1 && (e = d.children[0]).type == CKEDITOR.NODE_ELEMENT && l(e, h, i, b, c);
                            b = !b.length
                        }
                        b || g.push(a)
                    }
                }, null, true);
                g.length && (j = true);
                for (var p, b = [], e = u[e || (this.editor ? this.editor.activeEnterMode : CKEDITOR.ENTER_P)]; d = g.pop();)d.type == CKEDITOR.NODE_ELEMENT ? m(d, e, b) : d.remove();
                for (; p = b.pop();) {
                    d = p.el;
                    if (d.parent)switch (p.check) {
                        case"it":
                            A.$removeEmpty[d.name] && !d.children.length ? m(d, e, b) : k(d) || m(d, e, b);
                            break;
                        case"el-up":
                            d.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !A[d.parent.name][d.name] && m(d, e, b);
                            break;
                        case"parent-down":
                            d.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !A[d.parent.name][d.name] && m(d.parent, e, b)
                    }
                }
                return j
            }, checkFeature: function (a) {
                if (this.disabled || !a)return true;
                a.toFeature && (a = a.toFeature(this.editor));
                return !a.requiredContent || this.check(a.requiredContent)
            }, disable: function () {
                this.disabled = true
            }, addContentForms: function (a) {
                if (!this.disabled && a) {
                    var b, d, c = [], e;
                    for (b = 0; b < a.length && !e; ++b) {
                        d = a[b];
                        if ((typeof d == "string" || d instanceof CKEDITOR.style) && this.check(d))e = d
                    }
                    if (e) {
                        for (b = 0; b < a.length; ++b)c.push(l(a[b], e));
                        this.addTransformations(c)
                    }
                }
            }, addFeature: function (a) {
                if (this.disabled || !a)return true;
                a.toFeature && (a = a.toFeature(this.editor));
                this.allow(a.allowedContent, a.name);
                this.addTransformations(a.contentTransformations);
                this.addContentForms(a.contentForms);
                return this.customConfig && a.requiredContent ? this.check(a.requiredContent) : true
            }, addTransformations: function (a) {
                var b, d;
                if (!this.disabled && a) {
                    var c = this._.transformations, e;
                    for (e = 0; e < a.length; ++e) {
                        b = a[e];
                        var g = void 0, h = void 0, i = void 0, l = void 0, m = void 0, f = void 0;
                        d = [];
                        for (h = 0; h < b.length; ++h) {
                            i = b[h];
                            if (typeof i == "string") {
                                i = i.split(/\s*:\s*/);
                                l = i[0];
                                m = null;
                                f = i[1]
                            } else {
                                l = i.check;
                                m = i.left;
                                f = i.right
                            }
                            if (!g) {
                                g = i;
                                g = g.element ? g.element : l ? l.match(/^([a-z0-9]+)/i)[0] : g.left.getDefinition().element
                            }
                            m instanceof CKEDITOR.style && (m = y(m));
                            d.push({check: l == g ? null : l, left: m, right: typeof f == "string" ? t(f) : f})
                        }
                        b = g;
                        c[b] || (c[b] = []);
                        c[b].push(d)
                    }
                }
            }, check: function (b, d, c) {
                if (this.disabled)return true;
                if (CKEDITOR.tools.isArray(b)) {
                    for (var e = b.length; e--;)if (this.check(b[e], d, c))return true;
                    return false
                }
                var h, l;
                if (typeof b == "string") {
                    l = b + "<" +
                    (d === false ? "0" : "1") + (c ? "1" : "0") + ">";
                    if (l in this._.cachedChecks)return this._.cachedChecks[l];
                    e = g(b).$1;
                    h = e.styles;
                    var m = e.classes;
                    e.name = e.elements;
                    e.classes = m = m ? m.split(/\s*,\s*/) : [];
                    e.styles = i(h);
                    e.attributes = i(e.attributes);
                    e.children = [];
                    m.length && (e.attributes["class"] = m.join(" "));
                    if (h)e.attributes.style = CKEDITOR.tools.writeCssText(e.styles);
                    h = e
                } else {
                    e = b.getDefinition();
                    h = e.styles;
                    m = e.attributes || {};
                    if (h) {
                        h = s(h);
                        m.style = CKEDITOR.tools.writeCssText(h, true)
                    } else h = {};
                    h = {
                        name: e.element,
                        attributes: m,
                        classes: m["class"] ? m["class"].split(/\s+/) : [],
                        styles: h,
                        children: []
                    }
                }
                var m = CKEDITOR.tools.clone(h), f = [], k;
                if (d !== false && (k = this._.transformations[h.name])) {
                    for (e = 0; e < k.length; ++e)p(this, h, k[e]);
                    j(h)
                }
                a(this)(m, this._.rules, d === false ? false : this._.transformations, f, false, !c, !c);
                d = f.length > 0 ? false : CKEDITOR.tools.objectCompare(h.attributes, m.attributes, true) ? true : false;
                typeof b == "string" && (this._.cachedChecks[l] = d);
                return d
            }, getAllowedEnterMode: function () {
                var a = ["p", "div", "br"], b = {p: CKEDITOR.ENTER_P, div: CKEDITOR.ENTER_DIV, br: CKEDITOR.ENTER_BR};
                return function (d) {
                    var c = a.slice();
                    for (d || (c = c.reverse()); d = c.pop();)if (this.check(d))return b[d];
                    return CKEDITOR.ENTER_BR
                }
            }()
        };
        var x = {styles: 1, attributes: 1, classes: 1}, B = {
            styles: "requiredStyles",
            attributes: "requiredAttributes",
            classes: "requiredClasses"
        }, z = /^([a-z0-9*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i, D = {
            styles: /{([^}]+)}/,
            attrs: /\[([^\]]+)\]/,
            classes: /\(([^\)]+)\)/
        }, C = CKEDITOR.filter.transformationsTools = {
            sizeToStyle: function (a) {
                this.lengthToStyle(a, "width");
                this.lengthToStyle(a, "height")
            }, sizeToAttribute: function (a) {
                this.lengthToAttribute(a, "width");
                this.lengthToAttribute(a, "height")
            }, lengthToStyle: function (a, b, d) {
                d = d || b;
                if (!(d in a.styles)) {
                    var c = a.attributes[b];
                    if (c) {
                        /^\d+$/.test(c) && (c = c + "px");
                        a.styles[d] = c
                    }
                }
                delete a.attributes[b]
            }, lengthToAttribute: function (a, b, d) {
                d = d || b;
                if (!(d in a.attributes)) {
                    var c = a.styles[b], e = c && c.match(/^(\d+)(?:\.\d*)?px$/);
                    e ? a.attributes[d] = e[1] : c == w && (a.attributes[d] = w)
                }
                delete a.styles[b]
            }, alignmentToStyle: function (a) {
                if (!("float"in
                    a.styles)) {
                    var b = a.attributes.align;
                    if (b == "left" || b == "right")a.styles["float"] = b
                }
                delete a.attributes.align
            }, alignmentToAttribute: function (a) {
                if (!("align"in a.attributes)) {
                    var b = a.styles["float"];
                    if (b == "left" || b == "right")a.attributes.align = b
                }
                delete a.styles["float"]
            }, matchesStyle: r, transform: function (a, b) {
                if (typeof b == "string")a.name = b; else {
                    var d = b.getDefinition(), c = d.styles, e = d.attributes, g, h, i, l;
                    a.name = d.element;
                    for (g in e)if (g == "class") {
                        d = a.classes.join("|");
                        for (i = e[g].split(/\s+/); l = i.pop();)d.indexOf(l) == -1 && a.classes.push(l)
                    } else a.attributes[g] = e[g];
                    for (h in c)a.styles[h] = c[h]
                }
            }
        }
    }(), function () {
        CKEDITOR.focusManager = function (c) {
            if (c.focusManager)return c.focusManager;
            this.hasFocus = false;
            this.currentActive = null;
            this._ = {editor: c};
            return this
        };
        CKEDITOR.focusManager._ = {blurDelay: 200};
        CKEDITOR.focusManager.prototype = {
            focus: function (c) {
                this._.timer && clearTimeout(this._.timer);
                if (c)this.currentActive = c;
                if (!this.hasFocus && !this._.locked) {
                    (c = CKEDITOR.currentInstance) && c.focusManager.blur(1);
                    this.hasFocus = true;
                    (c = this._.editor.container) && c.addClass("cke_focus");
                    this._.editor.fire("focus")
                }
            }, lock: function () {
                this._.locked = 1
            }, unlock: function () {
                delete this._.locked
            }, blur: function (c) {
                function f() {
                    if (this.hasFocus) {
                        this.hasFocus = false;
                        var a = this._.editor.container;
                        a && a.removeClass("cke_focus");
                        this._.editor.fire("blur")
                    }
                }

                if (!this._.locked) {
                    this._.timer && clearTimeout(this._.timer);
                    var b = CKEDITOR.focusManager._.blurDelay;
                    c || !b ? f.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function () {
                        delete this._.timer;
                        f.call(this)
                    }, b, this)
                }
            }, add: function (c, f) {
                var b = c.getCustomData("focusmanager");
                if (!b || b != this) {
                    b && b.remove(c);
                    var b = "focus", a = "blur";
                    if (f)if (CKEDITOR.env.ie) {
                        b = "focusin";
                        a = "focusout"
                    } else CKEDITOR.event.useCapture = 1;
                    var d = {
                        blur: function () {
                            c.equals(this.currentActive) && this.blur()
                        }, focus: function () {
                            this.focus(c)
                        }
                    };
                    c.on(b, d.focus, this);
                    c.on(a, d.blur, this);
                    if (f)CKEDITOR.event.useCapture = 0;
                    c.setCustomData("focusmanager", this);
                    c.setCustomData("focusmanager_handlers", d)
                }
            }, remove: function (c) {
                c.removeCustomData("focusmanager");
                var f = c.removeCustomData("focusmanager_handlers");
                c.removeListener("blur", f.blur);
                c.removeListener("focus", f.focus)
            }
        }
    }(), CKEDITOR.keystrokeHandler = function (c) {
        if (c.keystrokeHandler)return c.keystrokeHandler;
        this.keystrokes = {};
        this.blockedKeystrokes = {};
        this._ = {editor: c};
        return this
    }, function () {
        var c, f = function (a) {
            var a = a.data, b = a.getKeystroke(), i = this.keystrokes[b], g = this._.editor;
            c = g.fire("key", {keyCode: b}) === false;
            if (!c) {
                i && (c = g.execCommand(i, {from: "keystrokeHandler"}) !== false);
                c || (c = !!this.blockedKeystrokes[b])
            }
            c && a.preventDefault(true);
            return !c
        }, b = function (a) {
            if (c) {
                c = false;
                a.data.preventDefault(true)
            }
        };
        CKEDITOR.keystrokeHandler.prototype = {
            attach: function (a) {
                a.on("keydown", f, this);
                if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac)a.on("keypress", b, this)
            }
        }
    }(), function () {
        CKEDITOR.lang = {
            languages: {
                af: 1,
                ar: 1,
                bg: 1,
                bn: 1,
                bs: 1,
                ca: 1,
                cs: 1,
                cy: 1,
                da: 1,
                de: 1,
                el: 1,
                "en-au": 1,
                "en-ca": 1,
                "en-gb": 1,
                en: 1,
                eo: 1,
                es: 1,
                et: 1,
                eu: 1,
                fa: 1,
                fi: 1,
                fo: 1,
                "fr-ca": 1,
                fr: 1,
                gl: 1,
                gu: 1,
                he: 1,
                hi: 1,
                hr: 1,
                hu: 1,
                id: 1,
                is: 1,
                it: 1,
                ja: 1,
                ka: 1,
                km: 1,
                ko: 1,
                ku: 1,
                lt: 1,
                lv: 1,
                mk: 1,
                mn: 1,
                ms: 1,
                nb: 1,
                nl: 1,
                no: 1,
                pl: 1,
                "pt-br": 1,
                pt: 1,
                ro: 1,
                ru: 1,
                si: 1,
                sk: 1,
                sl: 1,
                sq: 1,
                "sr-latn": 1,
                sr: 1,
                sv: 1,
                th: 1,
                tr: 1,
                ug: 1,
                uk: 1,
                vi: 1,
                "zh-cn": 1,
                zh: 1
            }, rtl: {ar: 1, fa: 1, he: 1, ku: 1, ug: 1}, load: function (c, f, b) {
                if (!c || !CKEDITOR.lang.languages[c])c = this.detect(f, c);
                this[c] ? b(c, this[c]) : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + c + ".js"), function () {
                    this[c].dir = this.rtl[c] ? "rtl" : "ltr";
                    b(c, this[c])
                }, this)
            }, detect: function (c, f) {
                var b = this.languages, f = f || navigator.userLanguage || navigator.language || c, a = f.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/), d = a[1], a = a[2];
                b[d + "-" + a] ? d = d + "-" + a : b[d] || (d = null);
                CKEDITOR.lang.detect = d ? function () {
                    return d
                } : function (a) {
                    return a
                };
                return d || c
            }
        }
    }(), CKEDITOR.scriptLoader = function () {
        var c = {}, f = {};
        return {
            load: function (b, a, d, i) {
                var g = typeof b == "string";
                g && (b = [b]);
                d || (d = CKEDITOR);
                var h = b.length, e = [], j = [], k = function (b) {
                    a && (g ? a.call(d, b) : a.call(d, e, j))
                };
                if (h === 0)k(true); else {
                    var n = function (a, b) {
                        (b ? e : j).push(a);
                        if (--h <= 0) {
                            i && CKEDITOR.document.getDocumentElement().removeStyle("cursor");
                            k(b)
                        }
                    }, o = function (a, b) {
                        c[a] = 1;
                        var d = f[a];
                        delete f[a];
                        for (var e = 0; e < d.length; e++)d[e](a, b)
                    }, q = function (b) {
                        if (c[b])n(b, true); else {
                            var d = f[b] || (f[b] = []);
                            d.push(n);
                            if (!(d.length > 1)) {
                                var e = new CKEDITOR.dom.element("script");
                                e.setAttributes({type: "text/javascript", src: b});
                                if (a)if (CKEDITOR.env.ie)e.$.onreadystatechange = function () {
                                    if (e.$.readyState == "loaded" || e.$.readyState == "complete") {
                                        e.$.onreadystatechange = null;
                                        o(b, true)
                                    }
                                }; else {
                                    e.$.onload = function () {
                                        setTimeout(function () {
                                            o(b, true)
                                        }, 0)
                                    };
                                    e.$.onerror = function () {
                                        o(b, false)
                                    }
                                }
                                e.appendTo(CKEDITOR.document.getHead())
                            }
                        }
                    };
                    i && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
                    for (var m = 0; m < h; m++)q(b[m])
                }
            }, queue: function () {
                function b() {
                    var b;
                    (b = a[0]) && this.load(b.scriptUrl, b.callback, CKEDITOR, 0)
                }

                var a = [];
                return function (d, c) {
                    var g = this;
                    a.push({
                        scriptUrl: d, callback: function () {
                            c && c.apply(this, arguments);
                            a.shift();
                            b.call(g)
                        }
                    });
                    a.length == 1 && b.call(this)
                }
            }()
        }
    }(), CKEDITOR.resourceManager = function (c, f) {
        this.basePath = c;
        this.fileName = f;
        this.registered = {};
        this.loaded = {};
        this.externals = {};
        this._ = {waitingList: {}}
    }, CKEDITOR.resourceManager.prototype = {
        add: function (c, f) {
            if (this.registered[c])throw'[CKEDITOR.resourceManager.add] The resource name "' + c + '" is already registered.';
            var b = this.registered[c] = f || {};
            b.name = c;
            b.path = this.getPath(c);
            CKEDITOR.fire(c + CKEDITOR.tools.capitalize(this.fileName) + "Ready", b);
            return this.get(c)
        }, get: function (c) {
            return this.registered[c] || null
        }, getPath: function (c) {
            var f = this.externals[c];
            return CKEDITOR.getUrl(f && f.dir || this.basePath + c + "/")
        }, getFilePath: function (c) {
            var f = this.externals[c];
            return CKEDITOR.getUrl(this.getPath(c) + (f && typeof f.file == "string" ? f.file : this.fileName + ".js"))
        }, addExternal: function (c, f, b) {
            for (var c = c.split(","), a = 0; a < c.length; a++)this.externals[c[a]] = {dir: f, file: b}
        }, load: function (c, f, b) {
            CKEDITOR.tools.isArray(c) || (c = c ? [c] : []);
            for (var a = this.loaded, d = this.registered, i = [], g = {}, h = {}, e = 0; e < c.length; e++) {
                var j = c[e];
                if (j)if (!a[j] && !d[j]) {
                    var k = this.getFilePath(j);
                    i.push(k);
                    k in g || (g[k] = []);
                    g[k].push(j)
                } else h[j] = this.get(j)
            }
            CKEDITOR.scriptLoader.load(i, function (d, c) {
                if (c.length)throw'[CKEDITOR.resourceManager.load] Resource name "' + g[c[0]].join(",") + '" was not found at "' + c[0] + '".';
                for (var e = 0; e < d.length; e++)for (var i = g[d[e]], j = 0; j < i.length; j++) {
                    var k = i[j];
                    h[k] = this.get(k);
                    a[k] = 1
                }
                f.call(b, h)
            }, this)
        }
    }, CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin"), CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function (c) {
        var f = {};
        return function (b, a, d) {
            var i = {}, g = function (b) {
                c.call(this, b, function (b) {
                    CKEDITOR.tools.extend(i, b);
                    var c = [], h;
                    for (h in b) {
                        var n = b[h], o = n && n.requires;
                        if (!f[h]) {
                            if (n.icons)for (var q = n.icons.split(","), m = q.length; m--;)CKEDITOR.skin.addIcon(q[m], n.path + "icons/" + (CKEDITOR.env.hidpi && n.hidpi ? "hidpi/" : "") + q[m] + ".png");
                            f[h] = 1
                        }
                        if (o) {
                            o.split && (o = o.split(","));
                            for (n = 0; n < o.length; n++)i[o[n]] || c.push(o[n])
                        }
                    }
                    if (c.length)g.call(this, c); else {
                        for (h in i) {
                            n = i[h];
                            if (n.onLoad && !n.onLoad._called) {
                                n.onLoad() === false && delete i[h];
                                n.onLoad._called = 1
                            }
                        }
                        a && a.call(d || window, i)
                    }
                }, this)
            };
            g.call(this, b)
        }
    }), CKEDITOR.plugins.setLang = function (c, f, b) {
        var a = this.get(c), c = a.langEntries || (a.langEntries = {}), a = a.lang || (a.lang = []);
        a.split && (a = a.split(","));
        CKEDITOR.tools.indexOf(a, f) == -1 && a.push(f);
        c[f] = b
    }, CKEDITOR.ui = function (c) {
        if (c.ui)return c.ui;
        this.items = {};
        this.instances = {};
        this.editor = c;
        this._ = {handlers: {}};
        return this
    }, CKEDITOR.ui.prototype = {
        add: function (c, f, b) {
            b.name = c.toLowerCase();
            var a = this.items[c] = {
                type: f,
                command: b.command || null,
                args: Array.prototype.slice.call(arguments, 2)
            };
            CKEDITOR.tools.extend(a, b)
        }, get: function (c) {
            return this.instances[c]
        }, create: function (c) {
            var f = this.items[c], b = f && this._.handlers[f.type], a = f && f.command && this.editor.getCommand(f.command), b = b && b.create.apply(this, f.args);
            this.instances[c] = b;
            a && a.uiItems.push(b);
            if (b && !b.type)b.type = f.type;
            return b
        }, addHandler: function (c, f) {
            this._.handlers[c] = f
        }, space: function (c) {
            return CKEDITOR.document.getById(this.spaceId(c))
        }, spaceId: function (c) {
            return this.editor.id + "_" + c
        }
    }, CKEDITOR.event.implementOn(CKEDITOR.ui), function () {
        function c(a, c, e) {
            CKEDITOR.event.call(this);
            a = a && CKEDITOR.tools.clone(a);
            if (c !== void 0) {
                if (c instanceof CKEDITOR.dom.element) {
                    if (!e)throw Error("One of the element modes must be specified.");
                } else throw Error("Expect element of type CKEDITOR.dom.element.");
                if (CKEDITOR.env.ie && CKEDITOR.env.quirks && e == CKEDITOR.ELEMENT_MODE_INLINE)throw Error("Inline element mode is not supported on IE quirks.");
                if (!(e == CKEDITOR.ELEMENT_MODE_INLINE ? c.is(CKEDITOR.dtd.$editable) || c.is("textarea") : e == CKEDITOR.ELEMENT_MODE_REPLACE ? !c.is(CKEDITOR.dtd.$nonBodyContent) : 1))throw Error('The specified element mode is not supported on element: "' + c.getName() + '".');
                this.element = c;
                this.elementMode = e;
                this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (c.getId() || c.getNameAtt())
            } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE;
            this._ = {};
            this.commands = {};
            this.templates = {};
            this.name = this.name || f();
            this.id = CKEDITOR.tools.getNextId();
            this.status = "unloaded";
            this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config);
            this.ui = new CKEDITOR.ui(this);
            this.focusManager = new CKEDITOR.focusManager(this);
            this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this);
            this.on("readOnly", b);
            this.on("selectionChange", function (a) {
                d(this, a.data.path)
            });
            this.on("activeFilterChange", function () {
                d(this, this.elementPath(), true)
            });
            this.on("mode", b);
            this.on("instanceReady", function () {
                this.config.startupFocus && this.focus()
            });
            CKEDITOR.fire("instanceCreated", null, this);
            CKEDITOR.add(this);
            CKEDITOR.tools.setTimeout(function () {
                g(this, a)
            }, 0, this)
        }

        function f() {
            do var a = "editor" + ++o; while (CKEDITOR.instances[a]);
            return a
        }

        function b() {
            var b = this.commands, c;
            for (c in b)a(this, b[c])
        }

        function a(a, b) {
            b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]()
        }

        function d(a, b, c) {
            var d, e, g = a.commands;
            for (e in g) {
                d = g[e];
                (c || d.contextSensitive) && d.refresh(a, b)
            }
        }

        function i(a) {
            var b = a.config.customConfig;
            if (!b)return false;
            var b = CKEDITOR.getUrl(b), c = q[b] || (q[b] = {});
            if (c.fn) {
                c.fn.call(a, a.config);
                (CKEDITOR.getUrl(a.config.customConfig) == b || !i(a)) && a.fireOnce("customConfigLoaded")
            } else CKEDITOR.scriptLoader.queue(b, function () {
                c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function () {
                };
                i(a)
            });
            return true
        }

        function g(a, b) {
            a.on("customConfigLoaded", function () {
                if (b) {
                    if (b.on)for (var c in b.on)a.on(c, b.on[c]);
                    CKEDITOR.tools.extend(a.config, b, true);
                    delete a.config.on
                }
                c = a.config;
                a.readOnly = !(!c.readOnly && !(a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.is("textarea") ? a.element.hasAttribute("disabled") : a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && a.element.hasAttribute("disabled")));
                a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) : false;
                a.tabIndex = c.tabIndex || a.element && a.element.getAttribute("tabindex") || 0;
                a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode;
                a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode;
                if (c.skin)CKEDITOR.skinName = c.skin;
                a.fireOnce("configLoaded");
                a.dataProcessor = new CKEDITOR.htmlDataProcessor(a);
                a.filter = a.activeFilter = new CKEDITOR.filter(a);
                h(a)
            });
            if (b && b.customConfig != void 0)a.config.customConfig = b.customConfig;
            i(a) || a.fireOnce("customConfigLoaded")
        }

        function h(a) {
            CKEDITOR.skin.loadPart("editor", function () {
                e(a)
            })
        }

        function e(a) {
            CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function (b, c) {
                var d = a.config.title;
                a.langCode = b;
                a.lang = CKEDITOR.tools.prototypedCopy(c);
                a.title = typeof d == "string" || d === false ? d : [a.lang.editor, a.name].join(", ");
                if (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 && a.lang.dir == "rtl")a.lang.dir = "ltr";
                if (!a.config.contentsLangDirection)a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir;
                a.fire("langLoaded");
                j(a)
            })
        }

        function j(a) {
            a.getStylesSet(function (b) {
                a.once("loaded", function () {
                    a.fire("stylesSet", {styles: b})
                }, null, null, 1);
                k(a)
            })
        }

        function k(a) {
            var b = a.config, c = b.plugins, d = b.extraPlugins, e = b.removePlugins;
            if (d)var g = RegExp("(?:^|,)(?:" + d.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"), c = c.replace(g, ""), c = c + ("," + d);
            if (e)var h = RegExp("(?:^|,)(?:" + e.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g"), c = c.replace(h, "");
            CKEDITOR.env.air && (c = c + ",adobeair");
            CKEDITOR.plugins.load(c.split(","), function (c) {
                var d = [], e = [], g = [];
                a.plugins = c;
                for (var i in c) {
                    var l = c[i], f = l.lang, j = null, k = l.requires, y;
                    CKEDITOR.tools.isArray(k) && (k = k.join(","));
                    if (k && (y = k.match(h)))for (; k = y.pop();)CKEDITOR.tools.setTimeout(function (a, b) {
                        throw Error('Plugin "' + a.replace(",", "") + '" cannot be removed from the plugins list, because it\'s required by "' + b + '" plugin.');
                    }, 0, null, [k, i]);
                    if (f && !a.lang[i]) {
                        f.split && (f = f.split(","));
                        if (CKEDITOR.tools.indexOf(f, a.langCode) >= 0)j = a.langCode; else {
                            j = a.langCode.replace(/-.*/, "");
                            j = j != a.langCode && CKEDITOR.tools.indexOf(f, j) >= 0 ? j : CKEDITOR.tools.indexOf(f, "en") >= 0 ? "en" : f[0]
                        }
                        if (!l.langEntries || !l.langEntries[j])g.push(CKEDITOR.getUrl(l.path + "lang/" + j + ".js")); else {
                            a.lang[i] = l.langEntries[j];
                            j = null
                        }
                    }
                    e.push(j);
                    d.push(l)
                }
                CKEDITOR.scriptLoader.load(g, function () {
                    for (var c = ["beforeInit", "init", "afterInit"], g = 0; g < c.length; g++)for (var h = 0; h < d.length; h++) {
                        var i = d[h];
                        g === 0 && (e[h] && i.lang && i.langEntries) && (a.lang[i.name] = i.langEntries[e[h]]);
                        if (i[c[g]])i[c[g]](a)
                    }
                    a.fireOnce("pluginsLoaded");
                    b.keystrokes && a.setKeystroke(a.config.keystrokes);
                    for (h = 0; h < a.config.blockedKeystrokes.length; h++)a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[h]] = 1;
                    a.status = "loaded";
                    a.fireOnce("loaded");
                    CKEDITOR.fire("instanceLoaded", null, a)
                })
            })
        }

        function n() {
            var a = this.element;
            if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
                var b = this.getData();
                this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b));
                a.is("textarea") ? a.setValue(b) : a.setHtml(b);
                return true
            }
            return false
        }

        c.prototype = CKEDITOR.editor.prototype;
        CKEDITOR.editor = c;
        var o = 0, q = {};
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            addCommand: function (b, c) {
                c.name = b.toLowerCase();
                var d = new CKEDITOR.command(this, c);
                this.mode && a(this, d);
                return this.commands[b] = d
            }, _attachToForm: function () {
                var a = this, b = a.element, c = new CKEDITOR.dom.element(b.$.form);
                if (b.is("textarea") && c) {
                    var d = function (c) {
                        a.updateElement();
                        a._.required && (!b.getValue() && a.fire("required") === false) && c.data.preventDefault()
                    };
                    c.on("submit", d);
                    if (c.$.submit && c.$.submit.call && c.$.submit.apply)c.$.submit = CKEDITOR.tools.override(c.$.submit, function (a) {
                        return function () {
                            d();
                            a.apply ? a.apply(this) : a()
                        }
                    });
                    a.on("destroy", function () {
                        c.removeListener("submit", d)
                    })
                }
            }, destroy: function (a) {
                this.fire("beforeDestroy");
                !a && n.call(this);
                this.editable(null);
                this.status = "destroyed";
                this.fire("destroy");
                this.removeAllListeners();
                CKEDITOR.remove(this);
                CKEDITOR.fire("instanceDestroyed", null, this)
            }, elementPath: function (a) {
                return (a = a || this.getSelection().getStartElement()) ? new CKEDITOR.dom.elementPath(a, this.editable()) : null
            }, createRange: function () {
                var a = this.editable();
                return a ? new CKEDITOR.dom.range(a) : null
            }, execCommand: function (a, b) {
                var c = this.getCommand(a), d = {name: a, commandData: b, command: c};
                if (c && c.state != CKEDITOR.TRISTATE_DISABLED && this.fire("beforeCommandExec", d) !== true) {
                    d.returnValue = c.exec(d.commandData);
                    if (!c.async && this.fire("afterCommandExec", d) !== true)return d.returnValue
                }
                return false
            }, getCommand: function (a) {
                return this.commands[a]
            }, getData: function (a) {
                !a && this.fire("beforeGetData");
                var b = this._.data;
                if (typeof b != "string")b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : "";
                b = {dataValue: b};
                !a && this.fire("getData", b);
                return b.dataValue
            }, getSnapshot: function () {
                var a = this.fire("getSnapshot");
                if (typeof a != "string") {
                    var b = this.element;
                    b && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (a = b.is("textarea") ? b.getValue() : b.getHtml())
                }
                return a
            }, loadSnapshot: function (a) {
                this.fire("loadSnapshot", a)
            }, setData: function (a, b, c) {
                if (b)this.on("dataReady", function (a) {
                    a.removeListener();
                    b.call(a.editor)
                });
                a = {dataValue: a};
                !c && this.fire("setData", a);
                this._.data = a.dataValue;
                !c && this.fire("afterSetData", a)
            }, setReadOnly: function (a) {
                a = a == void 0 || a;
                if (this.readOnly != a) {
                    this.readOnly = a;
                    this.keystrokeHandler.blockedKeystrokes[8] = +a;
                    this.editable().setReadOnly(a);
                    this.fire("readOnly")
                }
            }, insertHtml: function (a, b) {
                this.fire("insertHtml", {dataValue: a, mode: b})
            }, insertText: function (a) {
                this.fire("insertText", a)
            }, insertElement: function (a) {
                this.fire("insertElement", a)
            }, focus: function () {
                this.fire("beforeFocus")
            }, checkDirty: function () {
                return this.status == "ready" && this._.previousValue !== this.getSnapshot()
            }, resetDirty: function () {
                this._.previousValue = this.getSnapshot()
            }, updateElement: function () {
                return n.call(this)
            }, setKeystroke: function () {
                for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [[].slice.call(arguments, 0)], c, d, e = b.length; e--;) {
                    c = b[e];
                    d = 0;
                    if (CKEDITOR.tools.isArray(c)) {
                        d = c[1];
                        c = c[0]
                    }
                    d ? a[c] = d : delete a[c]
                }
            }, addFeature: function (a) {
                return this.filter.addFeature(a)
            }, setActiveFilter: function (a) {
                if (!a)a = this.filter;
                if (this.activeFilter !== a) {
                    this.activeFilter = a;
                    this.fire("activeFilterChange");
                    a === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(a.getAllowedEnterMode(), a.getAllowedEnterMode(true))
                }
            }, setActiveEnterMode: function (a, b) {
                a = a ? this.blockless ? CKEDITOR.ENTER_BR : a : this.enterMode;
                b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode;
                if (this.activeEnterMode != a || this.activeShiftEnterMode != b) {
                    this.activeEnterMode = a;
                    this.activeShiftEnterMode = b;
                    this.fire("activeEnterModeChange")
                }
            }
        })
    }(), CKEDITOR.ELEMENT_MODE_NONE = 0, CKEDITOR.ELEMENT_MODE_REPLACE = 1, CKEDITOR.ELEMENT_MODE_APPENDTO = 2, CKEDITOR.ELEMENT_MODE_INLINE = 3, CKEDITOR.htmlParser = function () {
        this._ = {htmlPartsRegex: RegExp("<(?:(?:\\/([^>]+)>)|(?:!--([\\S|\\s]*?)--\>)|(?:([^\\s>]+)\\s*((?:(?:\"[^\"]*\")|(?:'[^']*')|[^\"'>])*)\\/?>))", "g")}
    }, function () {
        var c = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, f = {
            checked: 1,
            compact: 1,
            declare: 1,
            defer: 1,
            disabled: 1,
            ismap: 1,
            multiple: 1,
            nohref: 1,
            noresize: 1,
            noshade: 1,
            nowrap: 1,
            readonly: 1,
            selected: 1
        };
        CKEDITOR.htmlParser.prototype = {
            onTagOpen: function () {
            }, onTagClose: function () {
            }, onText: function () {
            }, onCDATA: function () {
            }, onComment: function () {
            }, parse: function (b) {
                for (var a, d, i = 0, g; a = this._.htmlPartsRegex.exec(b);) {
                    d = a.index;
                    if (d > i) {
                        i = b.substring(i, d);
                        if (g)g.push(i); else this.onText(i)
                    }
                    i = this._.htmlPartsRegex.lastIndex;
                    if (d = a[1]) {
                        d = d.toLowerCase();
                        if (g && CKEDITOR.dtd.$cdata[d]) {
                            this.onCDATA(g.join(""));
                            g = null
                        }
                        if (!g) {
                            this.onTagClose(d);
                            continue
                        }
                    }
                    if (g)g.push(a[0]); else if (d = a[3]) {
                        d = d.toLowerCase();
                        if (!/="/.test(d)) {
                            var h = {}, e;
                            a = a[4];
                            var j = !!(a && a.charAt(a.length - 1) == "/");
                            if (a)for (; e = c.exec(a);) {
                                var k = e[1].toLowerCase();
                                e = e[2] || e[3] || e[4] || "";
                                h[k] = !e && f[k] ? k : CKEDITOR.tools.htmlDecodeAttr(e)
                            }
                            this.onTagOpen(d, h, j);
                            !g && CKEDITOR.dtd.$cdata[d] && (g = [])
                        }
                    } else if (d = a[2])this.onComment(d)
                }
                if (b.length > i)this.onText(b.substring(i, b.length))
            }
        }
    }(), CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
        $: function () {
            this._ = {output: []}
        }, proto: {
            openTag: function (c) {
                this._.output.push("<", c)
            }, openTagClose: function (c, f) {
                f ? this._.output.push(" />") : this._.output.push(">")
            }, attribute: function (c, f) {
                typeof f == "string" && (f = CKEDITOR.tools.htmlEncodeAttr(f));
                this._.output.push(" ", c, '="', f, '"')
            }, closeTag: function (c) {
                this._.output.push("</", c, ">")
            }, text: function (c) {
                this._.output.push(c)
            }, comment: function (c) {
                this._.output.push("<\!--", c, "--\>")
            }, write: function (c) {
                this._.output.push(c)
            }, reset: function () {
                this._.output = [];
                this._.indent = false
            }, getHtml: function (c) {
                var f = this._.output.join("");
                c && this.reset();
                return f
            }
        }
    }), "use strict", function () {
        CKEDITOR.htmlParser.node = function () {
        };
        CKEDITOR.htmlParser.node.prototype = {
            remove: function () {
                var c = this.parent.children, f = CKEDITOR.tools.indexOf(c, this), b = this.previous, a = this.next;
                b && (b.next = a);
                a && (a.previous = b);
                c.splice(f, 1);
                this.parent = null
            }, replaceWith: function (c) {
                var f = this.parent.children, b = CKEDITOR.tools.indexOf(f, this), a = c.previous = this.previous, d = c.next = this.next;
                a && (a.next = c);
                d && (d.previous = c);
                f[b] = c;
                c.parent = this.parent;
                this.parent = null
            }, insertAfter: function (c) {
                var f = c.parent.children, b = CKEDITOR.tools.indexOf(f, c), a = c.next;
                f.splice(b + 1, 0, this);
                this.next = c.next;
                this.previous = c;
                c.next = this;
                a && (a.previous = this);
                this.parent = c.parent
            }, insertBefore: function (c) {
                var f = c.parent.children, b = CKEDITOR.tools.indexOf(f, c);
                f.splice(b, 0, this);
                this.next = c;
                (this.previous = c.previous) && (c.previous.next = this);
                c.previous = this;
                this.parent = c.parent
            }, getAscendant: function (c) {
                var f = typeof c == "function" ? c : typeof c == "string" ? function (a) {
                    return a.name == c
                } : function (a) {
                    return a.name in
                        c
                }, b = this.parent;
                for (; b && b.type == CKEDITOR.NODE_ELEMENT;) {
                    if (f(b))return b;
                    b = b.parent
                }
                return null
            }, wrapWith: function (c) {
                this.replaceWith(c);
                c.add(this);
                return c
            }, getIndex: function () {
                return CKEDITOR.tools.indexOf(this.parent.children, this)
            }, getFilterContext: function (c) {
                return c || {}
            }
        }
    }(), "use strict", CKEDITOR.htmlParser.comment = function (c) {
        this.value = c;
        this._ = {isBlockLike: false}
    }, CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
        type: CKEDITOR.NODE_COMMENT,
        filter: function (c, f) {
            var b = this.value;
            if (!(b = c.onComment(f, b, this))) {
                this.remove();
                return false
            }
            if (typeof b != "string") {
                this.replaceWith(b);
                return false
            }
            this.value = b;
            return true
        },
        writeHtml: function (c, f) {
            f && this.filter(f);
            c.comment(this.value)
        }
    }),"use strict",function () {
        CKEDITOR.htmlParser.text = function (c) {
            this.value = c;
            this._ = {isBlockLike: false}
        };
        CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_TEXT,
            filter: function (c, f) {
                if (!(this.value = c.onText(f, this.value, this))) {
                    this.remove();
                    return false
                }
            },
            writeHtml: function (c, f) {
                f && this.filter(f);
                c.text(this.value)
            }
        })
    }(),"use strict",function () {
        CKEDITOR.htmlParser.cdata = function (c) {
            this.value = c
        };
        CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_TEXT,
            filter: function () {
            },
            writeHtml: function (c) {
                c.write(this.value)
            }
        })
    }(),"use strict",CKEDITOR.htmlParser.fragment = function () {
        this.children = [];
        this.parent = null;
        this._ = {isBlockLike: true, hasInlineStarted: false}
    },function () {
        function c(a) {
            return a.name == "a" && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name]
        }

        var f = CKEDITOR.tools.extend({
            table: 1,
            ul: 1,
            ol: 1,
            dl: 1
        }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl), b = {
            ol: 1,
            ul: 1
        }, a = CKEDITOR.tools.extend({}, {html: 1}, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {
            style: 1,
            script: 1
        });
        CKEDITOR.htmlParser.fragment.fromHtml = function (d, i, g) {
            function h(a) {
                var b;
                if (p.length > 0)for (var c = 0; c < p.length; c++) {
                    var d = p[c], g = d.name, h = CKEDITOR.dtd[g], i = l.name && CKEDITOR.dtd[l.name];
                    if ((!i || i[g]) && (!a || !h || h[a] || !CKEDITOR.dtd[a])) {
                        if (!b) {
                            e();
                            b = 1
                        }
                        d = d.clone();
                        d.parent = l;
                        l = d;
                        p.splice(c, 1);
                        c--
                    } else if (g == l.name) {
                        k(l, l.parent, 1);
                        c--
                    }
                }
            }

            function e() {
                for (; r.length;)k(r.shift(), l)
            }

            function j(a) {
                if (a._.isBlockLike && a.name != "pre" && a.name != "textarea") {
                    var b = a.children.length, c = a.children[b - 1], d;
                    if (c && c.type == CKEDITOR.NODE_TEXT)(d = CKEDITOR.tools.rtrim(c.value)) ? c.value = d : a.children.length = b - 1
                }
            }

            function k(a, b, d) {
                var b = b || l || m, e = l;
                if (a.previous === void 0) {
                    if (n(b, a)) {
                        l = b;
                        q.onTagOpen(g, {});
                        a.returnPoint = b = l
                    }
                    j(a);
                    (!c(a) || a.children.length) && b.add(a);
                    a.name == "pre" && (t = false);
                    a.name == "textarea" && (y = false)
                }
                if (a.returnPoint) {
                    l = a.returnPoint;
                    delete a.returnPoint
                } else l = d ? b : e
            }

            function n(a, b) {
                if ((a == m || a.name == "body") && g && (!a.name || CKEDITOR.dtd[a.name][g])) {
                    var c, d;
                    return (c = b.attributes && (d = b.attributes["data-cke-real-element-type"]) ? d : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) && !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
                }
            }

            function o(a, b) {
                return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || a == "dt" && b == "dd" || a == "dd" && b == "dt" : false
            }

            var q = new CKEDITOR.htmlParser, m = i instanceof CKEDITOR.htmlParser.element ? i : typeof i == "string" ? new CKEDITOR.htmlParser.element(i) : new CKEDITOR.htmlParser.fragment, p = [], r = [], l = m, y = m.name == "textarea", t = m.name == "pre";
            q.onTagOpen = function (d, g, i, j) {
                g = new CKEDITOR.htmlParser.element(d, g);
                if (g.isUnknown && i)g.isEmpty = true;
                g.isOptionalClose = j;
                if (c(g))p.push(g); else {
                    if (d == "pre")t = true; else {
                        if (d == "br" && t) {
                            l.add(new CKEDITOR.htmlParser.text("\n"));
                            return
                        }
                        d == "textarea" && (y = true)
                    }
                    if (d == "br")r.push(g); else {
                        for (; ;) {
                            j = (i = l.name) ? CKEDITOR.dtd[i] || (l._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : a;
                            if (!g.isUnknown && !l.isUnknown && !j[d])if (l.isOptionalClose)q.onTagClose(i); else if (d in b && i in b) {
                                i = l.children;
                                (i = i[i.length - 1]) && i.name == "li" || k(i = new CKEDITOR.htmlParser.element("li"), l);
                                !g.returnPoint && (g.returnPoint = l);
                                l = i
                            } else if (d in CKEDITOR.dtd.$listItem && !o(d, i))q.onTagOpen(d == "li" ? "ul" : "dl", {}, 0, 1); else if (i in f && !o(d, i)) {
                                !g.returnPoint && (g.returnPoint = l);
                                l = l.parent
                            } else {
                                i in
                                CKEDITOR.dtd.$inline && p.unshift(l);
                                if (l.parent)k(l, l.parent, 1); else {
                                    g.isOrphan = 1;
                                    break
                                }
                            } else break
                        }
                        h(d);
                        e();
                        g.parent = l;
                        g.isEmpty ? k(g) : l = g
                    }
                }
            };
            q.onTagClose = function (a) {
                for (var b = p.length - 1; b >= 0; b--)if (a == p[b].name) {
                    p.splice(b, 1);
                    return
                }
                for (var c = [], d = [], h = l; h != m && h.name != a;) {
                    h._.isBlockLike || d.unshift(h);
                    c.push(h);
                    h = h.returnPoint || h.parent
                }
                if (h != m) {
                    for (b = 0; b < c.length; b++) {
                        var i = c[b];
                        k(i, i.parent)
                    }
                    l = h;
                    h._.isBlockLike && e();
                    k(h, h.parent);
                    if (h == l)l = l.parent;
                    p = p.concat(d)
                }
                a == "body" && (g = false)
            };
            q.onText = function (c) {
                if ((!l._.hasInlineStarted || r.length) && !t && !y) {
                    c = CKEDITOR.tools.ltrim(c);
                    if (c.length === 0)return
                }
                var d = l.name, i = d ? CKEDITOR.dtd[d] || (l._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : a;
                if (!y && !i["#"] && d in f) {
                    q.onTagOpen(d in b ? "li" : d == "dl" ? "dd" : d == "table" ? "tr" : d == "tr" ? "td" : "");
                    q.onText(c)
                } else {
                    e();
                    h();
                    !t && !y && (c = c.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " "));
                    c = new CKEDITOR.htmlParser.text(c);
                    if (n(l, c))this.onTagOpen(g, {}, 0, 1);
                    l.add(c)
                }
            };
            q.onCDATA = function (a) {
                l.add(new CKEDITOR.htmlParser.cdata(a))
            };
            q.onComment = function (a) {
                e();
                h();
                l.add(new CKEDITOR.htmlParser.comment(a))
            };
            q.parse(d);
            for (e(!CKEDITOR.env.ie && 1); l != m;)k(l, l.parent, 1);
            j(m);
            return m
        };
        CKEDITOR.htmlParser.fragment.prototype = {
            type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, add: function (a, b) {
                isNaN(b) && (b = this.children.length);
                var c = b > 0 ? this.children[b - 1] : null;
                if (c) {
                    if (a._.isBlockLike && c.type == CKEDITOR.NODE_TEXT) {
                        c.value = CKEDITOR.tools.rtrim(c.value);
                        if (c.value.length === 0) {
                            this.children.pop();
                            this.add(a);
                            return
                        }
                    }
                    c.next = a
                }
                a.previous = c;
                a.parent = this;
                this.children.splice(b, 0, a);
                if (!this._.hasInlineStarted)this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike
            }, filter: function (a, b) {
                b = this.getFilterContext(b);
                a.onRoot(b, this);
                this.filterChildren(a, false, b)
            }, filterChildren: function (a, b, c) {
                if (this.childrenFilteredBy != a.id) {
                    c = this.getFilterContext(c);
                    if (b && !this.parent)a.onRoot(c, this);
                    this.childrenFilteredBy = a.id;
                    for (b = 0; b < this.children.length; b++)this.children[b].filter(a, c) === false && b--
                }
            }, writeHtml: function (a, b) {
                b && this.filter(b);
                this.writeChildrenHtml(a)
            }, writeChildrenHtml: function (a, b, c) {
                var h = this.getFilterContext();
                if (c && !this.parent && b)b.onRoot(h, this);
                b && this.filterChildren(b, false, h);
                b = 0;
                c = this.children;
                for (h = c.length; b < h; b++)c[b].writeHtml(a)
            }, forEach: function (a, b, c) {
                if (!c && (!b || this.type == b))var h = a(this);
                if (h !== false)for (var c = this.children, e = 0, f = c.length; e < f; e++) {
                    h = c[e];
                    h.type == CKEDITOR.NODE_ELEMENT ? h.forEach(a, b) : (!b || h.type == b) && a(h)
                }
            }, getFilterContext: function (a) {
                return a || {}
            }
        }
    }(),"use strict",function () {
        function c() {
            this.rules = []
        }

        function f(b, a, d, i) {
            var g, h;
            for (g in a) {
                (h = b[g]) || (h = b[g] = new c);
                h.add(a[g], d, i)
            }
        }

        CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
            $: function (b) {
                this.id = CKEDITOR.tools.getNextNumber();
                this.elementNameRules = new c;
                this.attributeNameRules = new c;
                this.elementsRules = {};
                this.attributesRules = {};
                this.textRules = new c;
                this.commentRules = new c;
                this.rootRules = new c;
                b && this.addRules(b, 10)
            }, proto: {
                addRules: function (b, a) {
                    var c;
                    if (typeof a == "number")c = a; else if (a && "priority"in
                        a)c = a.priority;
                    typeof c != "number" && (c = 10);
                    typeof a != "object" && (a = {});
                    b.elementNames && this.elementNameRules.addMany(b.elementNames, c, a);
                    b.attributeNames && this.attributeNameRules.addMany(b.attributeNames, c, a);
                    b.elements && f(this.elementsRules, b.elements, c, a);
                    b.attributes && f(this.attributesRules, b.attributes, c, a);
                    b.text && this.textRules.add(b.text, c, a);
                    b.comment && this.commentRules.add(b.comment, c, a);
                    b.root && this.rootRules.add(b.root, c, a)
                }, applyTo: function (b) {
                    b.filter(this)
                }, onElementName: function (b, a) {
                    return this.elementNameRules.execOnName(b, a)
                }, onAttributeName: function (b, a) {
                    return this.attributeNameRules.execOnName(b, a)
                }, onText: function (b, a) {
                    return this.textRules.exec(b, a)
                }, onComment: function (b, a, c) {
                    return this.commentRules.exec(b, a, c)
                }, onRoot: function (b, a) {
                    return this.rootRules.exec(b, a)
                }, onElement: function (b, a) {
                    for (var c = [this.elementsRules["^"], this.elementsRules[a.name], this.elementsRules.$], i, g = 0; g < 3; g++)if (i = c[g]) {
                        i = i.exec(b, a, this);
                        if (i === false)return null;
                        if (i && i != a)return this.onNode(b, i);
                        if (a.parent && !a.name)break
                    }
                    return a
                }, onNode: function (b, a) {
                    var c = a.type;
                    return c == CKEDITOR.NODE_ELEMENT ? this.onElement(b, a) : c == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(b, a.value)) : c == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(b, a.value)) : null
                }, onAttribute: function (b, a, c, i) {
                    return (c = this.attributesRules[c]) ? c.exec(b, i, a, this) : i
                }
            }
        });
        CKEDITOR.htmlParser.filterRulesGroup = c;
        c.prototype = {
            add: function (b, a, c) {
                this.rules.splice(this.findIndex(a), 0, {value: b, priority: a, options: c})
            }, addMany: function (b, a, c) {
                for (var i = [this.findIndex(a), 0], g = 0, h = b.length; g < h; g++)i.push({
                    value: b[g],
                    priority: a,
                    options: c
                });
                this.rules.splice.apply(this.rules, i)
            }, findIndex: function (b) {
                for (var a = this.rules, c = a.length - 1; c >= 0 && b < a[c].priority;)c--;
                return c + 1
            }, exec: function (b, a) {
                var c = a instanceof CKEDITOR.htmlParser.node || a instanceof CKEDITOR.htmlParser.fragment, i = Array.prototype.slice.call(arguments, 1), g = this.rules, h = g.length, e, f, k, n;
                for (n = 0; n < h; n++) {
                    if (c) {
                        e = a.type;
                        f = a.name
                    }
                    k = g[n];
                    if (!b.nonEditable || k.options.applyToAll) {
                        k = k.value.apply(null, i);
                        if (k === false)return k;
                        if (c) {
                            if (k && (k.name != f || k.type != e))return k
                        } else if (typeof k != "string")return k;
                        k != void 0 && (i[0] = a = k)
                    }
                }
                return a
            }, execOnName: function (b, a) {
                for (var c = 0, i = this.rules, g = i.length, h; a && c < g; c++) {
                    h = i[c];
                    if (!b.nonEditable || h.options.applyToAll)a = a.replace(h.value[0], h.value[1])
                }
                return a
            }
        }
    }(),function () {
        function c(c, e) {
            function h(a) {
                return a || CKEDITOR.env.ie ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", {"data-cke-bogus": 1})
            }

            function l(c, d) {
                return function (e) {
                    if (e.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var g = [], l = b(e), j, k;
                        if (l)for (f(l, 1) && g.push(l); l;) {
                            if (i(l) && (j = a(l)) && f(j))if ((k = a(j)) && !i(k))g.push(j); else {
                                h(m).insertAfter(j);
                                j.remove()
                            }
                            l = l.previous
                        }
                        for (l = 0; l < g.length; l++)g[l].remove();
                        if (g = CKEDITOR.env.opera && !c || (typeof d == "function" ? d(e) !== false : d))if (!m && CKEDITOR.env.ie && e.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)g = false; else if (!m && CKEDITOR.env.ie && (document.documentMode > 7 || e.name in CKEDITOR.dtd.tr || e.name in CKEDITOR.dtd.$listItem))g = false; else {
                            g = b(e);
                            g = !g || e.name == "form" && g.name == "input"
                        }
                        g && e.add(h(c))
                    }
                }
            }

            function f(a, b) {
                if ((!m || !CKEDITOR.env.ie) && a.type == CKEDITOR.NODE_ELEMENT && a.name == "br" && !a.attributes["data-cke-eol"])return true;
                var c;
                if (a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(r))) {
                    if (c.index) {
                        (new CKEDITOR.htmlParser.text(a.value.substring(0, c.index))).insertBefore(a);
                        a.value = c[0]
                    }
                    if (CKEDITOR.env.ie && m && (!b || a.parent.name in k))return true;
                    if (!m)if ((c = a.previous) && c.name == "br" || !c || i(c))return true
                }
                return false
            }

            var j = {elements: {}}, m = e == "html", k = CKEDITOR.tools.extend({}, A), o;
            for (o in k)"#"in y[o] || delete k[o];
            for (o in k)j.elements[o] = l(m, c.config.fillEmptyBlocks !== false);
            j.root = l(m);
            j.elements.br = function (b) {
                return function (c) {
                    if (c.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var e = c.attributes;
                        if ("data-cke-bogus"in e || "data-cke-eol"in e)delete e["data-cke-bogus"]; else {
                            for (e = c.next; e && d(e);)e = e.next;
                            var l = a(c);
                            !e && i(c.parent) ? g(c.parent, h(b)) : i(e) && (l && !i(l)) && h(b).insertBefore(e)
                        }
                    }
                }
            }(m);
            return j
        }

        function f(a, b) {
            return a != CKEDITOR.ENTER_BR && b !== false ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : false
        }

        function b(a) {
            for (a = a.children[a.children.length - 1]; a && d(a);)a = a.previous;
            return a
        }

        function a(a) {
            for (a = a.previous; a && d(a);)a = a.previous;
            return a
        }

        function d(a) {
            return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"]
        }

        function i(a) {
            return a && (a.type == CKEDITOR.NODE_ELEMENT && a.name in A || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
        }

        function g(a, b) {
            var c = a.children[a.children.length - 1];
            a.children.push(b);
            b.parent = a;
            if (c) {
                c.next = b;
                b.previous = c
            }
        }

        function h(a) {
            a = a.attributes;
            a.contenteditable != "false" && (a["data-cke-editable"] = a.contenteditable ? "true" : 1);
            a.contenteditable = "false"
        }

        function e(a) {
            a = a.attributes;
            switch (a["data-cke-editable"]) {
                case"true":
                    a.contenteditable = "true";
                    break;
                case"1":
                    delete a.contenteditable
            }
        }

        function j(a) {
            return a.replace(x, function (a, b, c) {
                return "<" + b + c.replace(B, function (a, b) {
                        if (!/^on/.test(b) && c.indexOf("data-cke-saved-" + b) == -1) {
                            a = a.slice(1);
                            return " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a
                        }
                        return a
                    }) + ">"
            })
        }

        function k(a, b) {
            return a.replace(b, function (a, b, c) {
                a.indexOf("<textarea") === 0 && (a = b + q(c).replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</textarea>");
                return "<cke:encoded>" + encodeURIComponent(a) + "</cke:encoded>"
            })
        }

        function n(a) {
            return a.replace(C, function (a, b) {
                return decodeURIComponent(b)
            })
        }

        function o(a) {
            return a.replace(/<\!--(?!{cke_protected})[\s\S]+?--\>/g, function (a) {
                return "<\!--" + l + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\>"
            })
        }

        function q(a) {
            return a.replace(/<\!--\{cke_protected\}\{C\}([\s\S]+?)--\>/g, function (a, b) {
                return decodeURIComponent(b)
            })
        }

        function m(a, b) {
            var c = b._.dataStore;
            return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g, function (a, b) {
                return decodeURIComponent(b)
            }).replace(/\{cke_protected_(\d+)\}/g, function (a, b) {
                return c && c[b] || ""
            })
        }

        function p(a, b) {
            for (var c = [], d = b.config.protectedSource, e = b._.dataStore || (b._.dataStore = {id: 1}), g = /<\!--\{cke_temp(comment)?\}(\d*?)--\>/g, d = [/<script[\s\S]*?<\/script>/gi, /<noscript[\s\S]*?<\/noscript>/gi].concat(d), a = a.replace(/<\!--[\s\S]*?--\>/g, function (a) {
                return "<\!--{cke_tempcomment}" + (c.push(a) - 1) + "--\>"
            }), h = 0; h < d.length; h++)a = a.replace(d[h], function (a) {
                a = a.replace(g, function (a, b, d) {
                    return c[d]
                });
                return /cke_temp(comment)?/.test(a) ? a : "<\!--{cke_temp}" + (c.push(a) - 1) + "--\>"
            });
            a = a.replace(g, function (a, b, d) {
                return "<\!--" + l + (b ? "{C}" : "") + encodeURIComponent(c[d]).replace(/--/g, "%2D%2D") + "--\>"
            });
            return a.replace(/(['"]).*?\1/g, function (a) {
                return a.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g, function (a, b) {
                    e[e.id] = decodeURIComponent(b);
                    return "{cke_protected_" + e.id++ + "}"
                })
            })
        }

        CKEDITOR.htmlDataProcessor = function (a) {
            var b, d, e = this;
            this.editor = a;
            this.dataFilter = b = new CKEDITOR.htmlParser.filter;
            this.htmlFilter = d = new CKEDITOR.htmlParser.filter;
            this.writer = new CKEDITOR.htmlParser.basicWriter;
            b.addRules(s);
            b.addRules(v, {applyToAll: true});
            b.addRules(c(a, "data"), {applyToAll: true});
            d.addRules(w);
            d.addRules(u, {applyToAll: true});
            d.addRules(c(a, "html"), {applyToAll: true});
            a.on("toHtml", function (b) {
                var b = b.data, c = b.dataValue, c = p(c, a), c = k(c, D), c = j(c), c = k(c, z), c = c.replace(F, "$1cke:$2"), c = c.replace(E, "<cke:$1$2></cke:$1>"), c = CKEDITOR.env.opera ? c : c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"), d = b.context || a.editable().getName(), e;
                if (CKEDITOR.env.ie && CKEDITOR.env.version < 9 && d == "pre") {
                    d = "div";
                    c = "<pre>" + c + "</pre>";
                    e = 1
                }
                d = a.document.createElement(d);
                d.setHtml("a" + c);
                c = d.getHtml().substr(1);
                c = c.replace(RegExp(" data-cke-" + CKEDITOR.rnd + "-", "ig"), " ");
                e && (c = c.replace(/^<pre>|<\/pre>$/gi, ""));
                c = c.replace(G, "$1$2");
                c = n(c);
                c = q(c);
                b.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, b.context, b.fixForBody === false ? false : f(b.enterMode, a.config.autoParagraph))
            }, null, null, 5);
            a.on("toHtml", function (b) {
                b.data.filter.applyTo(b.data.dataValue, true, b.data.dontFilter, b.data.enterMode) && a.fire("dataFiltered")
            }, null, null, 6);
            a.on("toHtml", function (a) {
                a.data.dataValue.filterChildren(e.dataFilter, true)
            }, null, null, 10);
            a.on("toHtml", function (a) {
                var a = a.data, b = a.dataValue, c = new CKEDITOR.htmlParser.basicWriter;
                b.writeChildrenHtml(c);
                b = c.getHtml(true);
                a.dataValue = o(b)
            }, null, null, 15);
            a.on("toDataFormat", function (b) {
                b.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(b.data.dataValue, b.data.context, f(b.data.enterMode, a.config.autoParagraph))
            }, null, null, 5);
            a.on("toDataFormat", function (a) {
                a.data.dataValue.filterChildren(e.htmlFilter, true)
            }, null, null, 10);
            a.on("toDataFormat", function (a) {
                a.data.filter.applyTo(a.data.dataValue, false, true)
            }, null, null, 11);
            a.on("toDataFormat", function (b) {
                var c = b.data.dataValue, d = e.writer;
                d.reset();
                c.writeChildrenHtml(d);
                c = d.getHtml(true);
                c = q(c);
                c = m(c, a);
                b.data.dataValue = c
            }, null, null, 15)
        };
        CKEDITOR.htmlDataProcessor.prototype = {
            toHtml: function (a, b, c, d) {
                var e = this.editor, g, h, i;
                if (b && typeof b == "object") {
                    g = b.context;
                    c = b.fixForBody;
                    d = b.dontFilter;
                    h = b.filter;
                    i = b.enterMode
                } else g = b;
                !g && g !== null && (g = e.editable().getName());
                return e.fire("toHtml", {
                    dataValue: a,
                    context: g,
                    fixForBody: c,
                    dontFilter: d,
                    filter: h || e.filter,
                    enterMode: i || e.enterMode
                }).dataValue
            }, toDataFormat: function (a, b) {
                var c, d, e;
                if (b) {
                    c = b.context;
                    d = b.filter;
                    e = b.enterMode
                }
                !c && c !== null && (c = this.editor.editable().getName());
                return this.editor.fire("toDataFormat", {
                    dataValue: a,
                    filter: d || this.editor.filter,
                    context: c,
                    enterMode: e || this.editor.enterMode
                }).dataValue
            }
        };
        var r = /(?:&nbsp;|\xa0)$/, l = "{cke_protected}", y = CKEDITOR.dtd, t = ["caption", "colgroup", "col", "thead", "tfoot", "tbody"], A = CKEDITOR.tools.extend({}, y.$blockLimit, y.$block), s = {
            elements: {
                input: h,
                textarea: h
            }
        }, v = {attributeNames: [[/^on/, "data-cke-pa-on"]]}, w = {
            elements: {
                embed: function (a) {
                    var b = a.parent;
                    if (b && b.name == "object") {
                        var c = b.attributes.width, b = b.attributes.height;
                        if (c)a.attributes.width = c;
                        if (b)a.attributes.height = b
                    }
                }, a: function (a) {
                    if (!a.children.length && !a.attributes.name && !a.attributes["data-cke-saved-name"])return false
                }
            }
        }, u = {
            elementNames: [[/^cke:/, ""], [/^\?xml:namespace$/, ""]],
            attributeNames: [[/^data-cke-(saved|pa)-/, ""], [/^data-cke-.*/, ""], ["hidefocus", ""]],
            elements: {
                $: function (a) {
                    var b = a.attributes;
                    if (b) {
                        if (b["data-cke-temp"])return false;
                        for (var c = ["name", "href", "src"], d, e = 0; e < c.length; e++) {
                            d = "data-cke-saved-" +
                            c[e];
                            d in b && delete b[c[e]]
                        }
                    }
                    return a
                }, table: function (a) {
                    a.children.slice(0).sort(function (a, b) {
                        var c, d;
                        if (a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type) {
                            c = CKEDITOR.tools.indexOf(t, a.name);
                            d = CKEDITOR.tools.indexOf(t, b.name)
                        }
                        if (!(c > -1 && d > -1 && c != d)) {
                            c = a.parent ? a.getIndex() : -1;
                            d = b.parent ? b.getIndex() : -1
                        }
                        return c > d ? 1 : -1
                    })
                }, param: function (a) {
                    a.children = [];
                    a.isEmpty = true;
                    return a
                }, span: function (a) {
                    a.attributes["class"] == "Apple-style-span" && delete a.name
                }, html: function (a) {
                    delete a.attributes.contenteditable;
                    delete a.attributes["class"]
                }, body: function (a) {
                    delete a.attributes.spellcheck;
                    delete a.attributes.contenteditable
                }, style: function (a) {
                    var b = a.children[0];
                    if (b && b.value)b.value = CKEDITOR.tools.trim(b.value);
                    if (!a.attributes.type)a.attributes.type = "text/css"
                }, title: function (a) {
                    var b = a.children[0];
                    !b && g(a, b = new CKEDITOR.htmlParser.text);
                    b.value = a.attributes["data-cke-title"] || ""
                }, input: e, textarea: e
            },
            attributes: {
                "class": function (a) {
                    return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || false
                }
            }
        };
        if (CKEDITOR.env.ie)u.attributes.style = function (a) {
            return a.replace(/(^|;)([^\:]+)/g, function (a) {
                return a.toLowerCase()
            })
        };
        var x = /<(a|area|img|input|source)\b([^>]*)>/gi, B = /\s(on\w+|href|src|name)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi, z = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi, D = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi, C = /<cke:encoded>([^<]*)<\/cke:encoded>/gi, F = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi, G = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi, E = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
    }(),"use strict",CKEDITOR.htmlParser.element = function (c, f) {
        this.name = c;
        this.attributes = f || {};
        this.children = [];
        var b = c || "", a = b.match(/^cke:(.*)/);
        a && (b = a[1]);
        b = !(!CKEDITOR.dtd.$nonBodyContent[b] && !CKEDITOR.dtd.$block[b] && !CKEDITOR.dtd.$listItem[b] && !CKEDITOR.dtd.$tableContent[b] && !(CKEDITOR.dtd.$nonEditable[b] || b == "br"));
        this.isEmpty = !!CKEDITOR.dtd.$empty[c];
        this.isUnknown = !CKEDITOR.dtd[c];
        this._ = {isBlockLike: b, hasInlineStarted: this.isEmpty || !b}
    },CKEDITOR.htmlParser.cssStyle = function (c) {
        var f = {};
        ((c instanceof CKEDITOR.htmlParser.element ? c.attributes.style : c) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (b, a, c) {
            a == "font-family" && (c = c.replace(/["']/g, ""));
            f[a.toLowerCase()] = c
        });
        return {
            rules: f, populate: function (b) {
                var a = this.toString();
                if (a)b instanceof CKEDITOR.dom.element ? b.setAttribute("style", a) : b instanceof CKEDITOR.htmlParser.element ? b.attributes.style = a : b.style = a
            }, toString: function () {
                var b = [], a;
                for (a in f)f[a] && b.push(a, ":", f[a], ";");
                return b.join("")
            }
        }
    },function () {
        function c(a) {
            return function (b) {
                return b.type == CKEDITOR.NODE_ELEMENT && (typeof a == "string" ? b.name == a : b.name in a)
            }
        }

        var f = function (a, b) {
            a = a[0];
            b = b[0];
            return a < b ? -1 : a > b ? 1 : 0
        }, b = CKEDITOR.htmlParser.fragment.prototype;
        CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
            type: CKEDITOR.NODE_ELEMENT, add: b.add, clone: function () {
                return new CKEDITOR.htmlParser.element(this.name, this.attributes)
            }, filter: function (a, b) {
                var c = this, g, h, b = c.getFilterContext(b);
                if (b.off)return true;
                if (!c.parent)a.onRoot(b, c);
                for (; ;) {
                    g = c.name;
                    if (!(h = a.onElementName(b, g))) {
                        this.remove();
                        return false
                    }
                    c.name = h;
                    if (!(c = a.onElement(b, c))) {
                        this.remove();
                        return false
                    }
                    if (c !== this) {
                        this.replaceWith(c);
                        return false
                    }
                    if (c.name == g)break;
                    if (c.type != CKEDITOR.NODE_ELEMENT) {
                        this.replaceWith(c);
                        return false
                    }
                    if (!c.name) {
                        this.replaceWithChildren();
                        return false
                    }
                }
                g = c.attributes;
                var e, f;
                for (e in g) {
                    f = e;
                    for (h = g[e]; ;)if (f = a.onAttributeName(b, e))if (f != e) {
                        delete g[e];
                        e = f
                    } else break; else {
                        delete g[e];
                        break
                    }
                    f && ((h = a.onAttribute(b, c, f, h)) === false ? delete g[f] : g[f] = h)
                }
                c.isEmpty || this.filterChildren(a, false, b);
                return true
            }, filterChildren: b.filterChildren, writeHtml: function (a, b) {
                b && this.filter(b);
                var c = this.name, g = [], h = this.attributes, e, j;
                a.openTag(c, h);
                for (e in h)g.push([e, h[e]]);
                a.sortAttributes && g.sort(f);
                e = 0;
                for (j = g.length; e < j; e++) {
                    h = g[e];
                    a.attribute(h[0], h[1])
                }
                a.openTagClose(c, this.isEmpty);
                this.writeChildrenHtml(a);
                this.isEmpty || a.closeTag(c)
            }, writeChildrenHtml: b.writeChildrenHtml, replaceWithChildren: function () {
                for (var a = this.children, b = a.length; b;)a[--b].insertAfter(this);
                this.remove()
            }, forEach: b.forEach, getFirst: function (a) {
                if (!a)return this.children.length ? this.children[0] : null;
                typeof a != "function" && (a = c(a));
                for (var b = 0, i = this.children.length; b < i; ++b)if (a(this.children[b]))return this.children[b];
                return null
            }, getHtml: function () {
                var a = new CKEDITOR.htmlParser.basicWriter;
                this.writeChildrenHtml(a);
                return a.getHtml()
            }, setHtml: function (a) {
                for (var a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children, b = 0, c = a.length; b < c; ++b)a[b].parent = this
            }, getOuterHtml: function () {
                var a = new CKEDITOR.htmlParser.basicWriter;
                this.writeHtml(a);
                return a.getHtml()
            }, split: function (a) {
                for (var b = this.children.splice(a, this.children.length - a), c = this.clone(), g = 0; g < b.length; ++g)b[g].parent = c;
                c.children = b;
                if (b[0])b[0].previous = null;
                if (a > 0)this.children[a - 1].next = null;
                this.parent.add(c, this.getIndex() + 1);
                return c
            }, removeClass: function (a) {
                var b = this.attributes["class"];
                if (b)(b = CKEDITOR.tools.trim(b.replace(RegExp("(?:\\s+|^)" +
                a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = b : delete this.attributes["class"]
            }, hasClass: function (a) {
                var b = this.attributes["class"];
                return !b ? false : RegExp("(?:^|\\s)" + a + "(?=\\s|$)").test(b)
            }, getFilterContext: function (a) {
                var b = [];
                a || (a = {off: false, nonEditable: false});
                !a.off && this.attributes["data-cke-processor"] == "off" && b.push("off", true);
                !a.nonEditable && this.attributes.contenteditable == "false" && b.push("nonEditable", true);
                if (b.length)for (var a = CKEDITOR.tools.copy(a), c = 0; c < b.length; c = c + 2)a[b[c]] = b[c +
                1];
                return a
            }
        }, true)
    }(),function () {
        var c = {};
        CKEDITOR.template = function (f) {
            if (c[f])this.output = c[f]; else {
                var b = f.replace(/'/g, "\\'").replace(/{([^}]+)}/g, function (a, b) {
                    return "',data['" + b + "']==undefined?'{" + b + "}':data['" + b + "'],'"
                });
                this.output = c[f] = Function("data", "buffer", "return buffer?buffer.push('" + b + "'):['" + b + "'].join('');")
            }
        }
    }(),delete CKEDITOR.loadFullCore,CKEDITOR.instances = {},CKEDITOR.document = new CKEDITOR.dom.document(document),CKEDITOR.add = function (c) {
        CKEDITOR.instances[c.name] = c;
        c.on("focus", function () {
            if (CKEDITOR.currentInstance != c) {
                CKEDITOR.currentInstance = c;
                CKEDITOR.fire("currentInstance")
            }
        });
        c.on("blur", function () {
            if (CKEDITOR.currentInstance == c) {
                CKEDITOR.currentInstance = null;
                CKEDITOR.fire("currentInstance")
            }
        });
        CKEDITOR.fire("instance", null, c)
    },CKEDITOR.remove = function (c) {
        delete CKEDITOR.instances[c.name]
    },function () {
        var c = {};
        CKEDITOR.addTemplate = function (f, b) {
            var a = c[f];
            if (a)return a;
            a = {name: f, source: b};
            CKEDITOR.fire("template", a);
            return c[f] = new CKEDITOR.template(a.source)
        };
        CKEDITOR.getTemplate = function (f) {
            return c[f]
        }
    }(),function () {
        var c = [];
        CKEDITOR.addCss = function (f) {
            c.push(f)
        };
        CKEDITOR.getCss = function () {
            return c.join("\n")
        }
    }(),CKEDITOR.on("instanceDestroyed", function () {
        CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset")
    }),CKEDITOR.TRISTATE_ON = 1,CKEDITOR.TRISTATE_OFF = 2,CKEDITOR.TRISTATE_DISABLED = 0,function () {
        CKEDITOR.inline = function (c, f) {
            if (!CKEDITOR.env.isCompatible)return null;
            c = CKEDITOR.dom.element.get(c);
            if (c.getEditor())throw'The editor instance "' + c.getEditor().name + '" is already attached to the provided element.';
            var b = new CKEDITOR.editor(f, c, CKEDITOR.ELEMENT_MODE_INLINE), a = c.is("textarea") ? c : null;
            if (a) {
                b.setData(a.getValue(), null, true);
                c = CKEDITOR.dom.element.createFromHtml('<div contenteditable="' + !!b.readOnly + '" class="cke_textarea_inline">' + a.getValue() + "</div>", CKEDITOR.document);
                c.insertAfter(a);
                a.hide();
                a.$.form && b._attachToForm()
            } else b.setData(c.getHtml(), null, true);
            b.on("loaded", function () {
                b.fire("uiReady");
                b.editable(c);
                b.container = c;
                b.setData(b.getData(1));
                b.resetDirty();
                b.fire("contentDom");
                b.mode = "wysiwyg";
                b.fire("mode");
                b.status = "ready";
                b.fireOnce("instanceReady");
                CKEDITOR.fire("instanceReady", null, b)
            }, null, null, 1E4);
            b.on("destroy", function () {
                if (a) {
                    b.container.clearCustomData();
                    b.container.remove();
                    a.show()
                }
                b.element.clearCustomData();
                delete b.element
            });
            return b
        };
        CKEDITOR.inlineAll = function () {
            var c, f, b;
            for (b in CKEDITOR.dtd.$editable)for (var a = CKEDITOR.document.getElementsByTag(b), d = 0, i = a.count(); d < i; d++) {
                c = a.getItem(d);
                if (c.getAttribute("contenteditable") == "true") {
                    f = {element: c, config: {}};
                    CKEDITOR.fire("inline", f) !== false && CKEDITOR.inline(c, f.config)
                }
            }
        };
        CKEDITOR.domReady(function () {
            !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll()
        })
    }(),CKEDITOR.replaceClass = "ckeditor",function () {
        function c(a, c, g, h) {
            if (!CKEDITOR.env.isCompatible)return null;
            a = CKEDITOR.dom.element.get(a);
            if (a.getEditor())throw'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
            var e = new CKEDITOR.editor(c, a, h);
            if (h == CKEDITOR.ELEMENT_MODE_REPLACE) {
                a.setStyle("visibility", "hidden");
                e._.required = a.hasAttribute("required");
                a.removeAttribute("required")
            }
            g && e.setData(g, null, true);
            e.on("loaded", function () {
                b(e);
                h == CKEDITOR.ELEMENT_MODE_REPLACE && (e.config.autoUpdateElement && a.$.form) && e._attachToForm();
                e.setMode(e.config.startupMode, function () {
                    e.resetDirty();
                    e.status = "ready";
                    e.fireOnce("instanceReady");
                    CKEDITOR.fire("instanceReady", null, e)
                })
            });
            e.on("destroy", f);
            return e
        }

        function f() {
            var a = this.container, b = this.element;
            if (a) {
                a.clearCustomData();
                a.remove()
            }
            if (b) {
                b.clearCustomData();
                if (this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE) {
                    b.show();
                    this._.required && b.setAttribute("required", "required")
                }
                delete this.element
            }
        }

        function b(b) {
            var c = b.name, g = b.element, h = b.elementMode, e = b.fire("uiSpace", {
                space: "top",
                html: ""
            }).html, f = b.fire("uiSpace", {space: "bottom", html: ""}).html;
            a || (a = CKEDITOR.addTemplate("maincontainer", '<{outerEl} id="cke_{name}" class="{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir="{langDir}" lang="{langCode}" role="application" aria-labelledby="cke_{name}_arialbl"><span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span><{outerEl} class="cke_inner cke_reset" role="presentation">{topHtml}<{outerEl} id="{contentId}" class="cke_contents cke_reset" role="presentation"></{outerEl}>{bottomHtml}</{outerEl}></{outerEl}>'));
            c = CKEDITOR.dom.element.createFromHtml(a.output({
                id: b.id,
                name: c,
                langDir: b.lang.dir,
                langCode: b.langCode,
                voiceLabel: [b.lang.editor, b.name].join(", "),
                topHtml: e ? '<span id="' + b.ui.spaceId("top") + '" class="cke_top cke_reset_all" role="presentation" style="height:auto">' + e + "</span>" : "",
                contentId: b.ui.spaceId("contents"),
                bottomHtml: f ? '<span id="' + b.ui.spaceId("bottom") + '" class="cke_bottom cke_reset_all" role="presentation">' + f + "</span>" : "",
                outerEl: CKEDITOR.env.ie ? "span" : "div"
            }));
            if (h == CKEDITOR.ELEMENT_MODE_REPLACE) {
                g.hide();
                c.insertAfter(g)
            } else g.append(c);
            b.container = c;
            e && b.ui.space("top").unselectable();
            f && b.ui.space("bottom").unselectable();
            g = b.config.width;
            h = b.config.height;
            g && c.setStyle("width", CKEDITOR.tools.cssLength(g));
            h && b.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(h));
            c.disableContextMenu();
            CKEDITOR.env.webkit && c.on("focus", function () {
                b.focus()
            });
            b.fireOnce("uiReady")
        }

        CKEDITOR.replace = function (a, b) {
            return c(a, b, null, CKEDITOR.ELEMENT_MODE_REPLACE)
        };
        CKEDITOR.appendTo = function (a, b, g) {
            return c(a, b, g, CKEDITOR.ELEMENT_MODE_APPENDTO)
        };
        CKEDITOR.replaceAll = function () {
            for (var a = document.getElementsByTagName("textarea"), b = 0; b < a.length; b++) {
                var c = null, h = a[b];
                if (h.name || h.id) {
                    if (typeof arguments[0] == "string") {
                        if (!RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)").test(h.className))continue
                    } else if (typeof arguments[0] == "function") {
                        c = {};
                        if (arguments[0](h, c) === false)continue
                    }
                    this.replace(h, c)
                }
            }
        };
        CKEDITOR.editor.prototype.addMode = function (a, b) {
            (this._.modes || (this._.modes = {}))[a] = b
        };
        CKEDITOR.editor.prototype.setMode = function (a, b) {
            var c = this, h = this._.modes;
            if (!(a == c.mode || !h || !h[a])) {
                c.fire("beforeSetMode", a);
                if (c.mode) {
                    var e = c.checkDirty();
                    c._.previousMode = c.mode;
                    c.fire("beforeModeUnload");
                    c.editable(0);
                    c.ui.space("contents").setHtml("");
                    c.mode = ""
                }
                this._.modes[a](function () {
                    c.mode = a;
                    e !== void 0 && !e && c.resetDirty();
                    setTimeout(function () {
                        c.fire("mode");
                        b && b.call(c)
                    }, 0)
                })
            }
        };
        CKEDITOR.editor.prototype.resize = function (a, b, c, h) {
            var e = this.container, f = this.ui.space("contents"), k = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement, h = h ? e.getChild(1) : e;
            h.setSize("width", a, true);
            k && (k.style.width = "1%");
            f.setStyle("height", Math.max(b - (c ? 0 : (h.$.offsetHeight || 0) - (f.$.clientHeight || 0)), 0) + "px");
            k && (k.style.width = "100%");
            this.fire("resize")
        };
        CKEDITOR.editor.prototype.getResizable = function (a) {
            return a ? this.ui.space("contents") : this.container
        };
        var a;
        CKEDITOR.domReady(function () {
            CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass)
        })
    }(),CKEDITOR.config.startupMode = "wysiwyg",function () {
        function c(a) {
            var c = a.editor;
            c.editable();
            var d = a.data.path, e = d.blockLimit, g = a.data.selection.getRanges()[0];
            if (CKEDITOR.env.gecko) {
                var h = d.block || d.blockLimit || d.root, f = h && h.getLast(b);
                h && (h.isBlockBoundary() && (!f || !(f.type == CKEDITOR.NODE_ELEMENT && f.isBlockBoundary())) && !h.is("pre") && !h.getBogus()) && h.appendBogus()
            }
            if (c.config.autoParagraph !== false && (c.activeEnterMode != CKEDITOR.ENTER_BR && c.editable().equals(e) && !d.block) && g.collapsed) {
                d = g.clone();
                d.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
                e = new CKEDITOR.dom.walker(d);
                e.guard = function (a) {
                    return !b(a) || a.type == CKEDITOR.NODE_COMMENT || a.isReadOnly()
                };
                if (!e.checkForward() || d.checkStartOfBlock() && d.checkEndOfBlock()) {
                    c = g.fixBlock(true, c.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p");
                    if (CKEDITOR.env.ie)(c = c.getFirst(b)) && (c.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(c.getText()).match(/^(?:&nbsp;|\xa0)$/)) && c.remove();
                    g.select();
                    a.cancel()
                }
            }
        }

        function f(a) {
            var b = a.data.getTarget();
            if (b.is("input")) {
                b = b.getAttribute("type");
                (b == "submit" || b == "reset") && a.data.preventDefault()
            }
        }

        function b(a) {
            return j(a) && k(a)
        }

        function a(a, b) {
            return function (c) {
                var d = CKEDITOR.dom.element.get(c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget);
                (!d || !b.equals(d) && !b.contains(d)) && a.call(this, c)
            }
        }

        function d(a) {
            var c, d = a.getRanges()[0], e = a.root, g = {table: 1, ul: 1, ol: 1, dl: 1};
            if (d.startPath().contains(g)) {
                var a = function (a) {
                    return function (d, e) {
                        e && (d.type == CKEDITOR.NODE_ELEMENT && d.is(g)) && (c = d);
                        if (!e && b(d) && (!a || !h(d)))return false
                    }
                }, f = d.clone();
                f.collapse(1);
                f.setStartAt(e, CKEDITOR.POSITION_AFTER_START);
                e = new CKEDITOR.dom.walker(f);
                e.guard = a();
                e.checkBackward();
                if (c) {
                    f = d.clone();
                    f.collapse();
                    f.setEndAt(c, CKEDITOR.POSITION_AFTER_END);
                    e = new CKEDITOR.dom.walker(f);
                    e.guard = a(true);
                    c = false;
                    e.checkForward();
                    return c
                }
            }
            return null
        }

        function i(a) {
            a.editor.focus();
            a.editor.fire("saveSnapshot")
        }

        function g(a, b) {
            var c = a.editor;
            !b && c.getSelection().scrollIntoView();
            setTimeout(function () {
                c.fire("saveSnapshot")
            }, 0)
        }

        CKEDITOR.editable = CKEDITOR.tools.createClass({
            base: CKEDITOR.dom.element, $: function (a, b) {
                this.base(b.$ || b);
                this.editor = a;
                this.hasFocus = false;
                this.setup()
            }, proto: {
                focus: function () {
                    var a;
                    if (CKEDITOR.env.webkit && !this.hasFocus) {
                        a = this.editor._.previousActive || this.getDocument().getActive();
                        if (this.contains(a)) {
                            a.focus();
                            return
                        }
                    }
                    try {
                        this.$[CKEDITOR.env.ie && this.getDocument().equals(CKEDITOR.document) ? "setActive" : "focus"]()
                    } catch (b) {
                        if (!CKEDITOR.env.ie)throw b;
                    }
                    if (CKEDITOR.env.safari && !this.isInline()) {
                        a = CKEDITOR.document.getActive();
                        a.equals(this.getWindow().getFrame()) || this.getWindow().focus()
                    }
                }, on: function (b, c) {
                    var d = Array.prototype.slice.call(arguments, 0);
                    if (CKEDITOR.env.ie && /^focus|blur$/.exec(b)) {
                        b = b == "focus" ? "focusin" : "focusout";
                        c = a(c, this);
                        d[0] = b;
                        d[1] = c
                    }
                    return CKEDITOR.dom.element.prototype.on.apply(this, d)
                }, attachListener: function (a, b, c, d, e, g) {
                    !this._.listeners && (this._.listeners = []);
                    var h = Array.prototype.slice.call(arguments, 1), h = a.on.apply(a, h);
                    this._.listeners.push(h);
                    return h
                }, clearListeners: function () {
                    var a = this._.listeners;
                    try {
                        for (; a.length;)a.pop().removeListener()
                    } catch (b) {
                    }
                }, restoreAttrs: function () {
                    var a = this._.attrChanges, b, c;
                    for (c in a)if (a.hasOwnProperty(c)) {
                        b = a[c];
                        b !== null ? this.setAttribute(c, b) : this.removeAttribute(c)
                    }
                }, attachClass: function (a) {
                    var b = this.getCustomData("classes");
                    if (!this.hasClass(a)) {
                        !b && (b = []);
                        b.push(a);
                        this.setCustomData("classes", b);
                        this.addClass(a)
                    }
                }, changeAttr: function (a, b) {
                    var c = this.getAttribute(a);
                    if (b !== c) {
                        !this._.attrChanges && (this._.attrChanges = {});
                        a in this._.attrChanges || (this._.attrChanges[a] = c);
                        this.setAttribute(a, b)
                    }
                }, insertHtml: function (a, b) {
                    i(this);
                    n(this, b || "html", a)
                }, insertText: function (a) {
                    i(this);
                    var b = this.editor, c = b.getSelection().getStartElement().hasAscendant("pre", true) ? CKEDITOR.ENTER_BR : b.activeEnterMode, b = c == CKEDITOR.ENTER_BR, d = CKEDITOR.tools, a = d.htmlEncode(a.replace(/\r\n/g, "\n")), a = a.replace(/\t/g, "&nbsp;&nbsp; &nbsp;"), c = c == CKEDITOR.ENTER_P ? "p" : "div";
                    if (!b) {
                        var e = /\n{2}/g;
                        if (e.test(a))var g = "<" + c + ">", h = "</" + c + ">", a = g + a.replace(e, function () {
                                return h + g
                            }) + h
                    }
                    a = a.replace(/\n/g, "<br>");
                    b || (a = a.replace(RegExp("<br>(?=</" + c + ">)"), function (a) {
                        return d.repeat(a, 2)
                    }));
                    a = a.replace(/^ | $/g, "&nbsp;");
                    a = a.replace(/(>|\s) /g, function (a, b) {
                        return b + "&nbsp;"
                    }).replace(/ (?=<)/g, "&nbsp;");
                    n(this, "text", a)
                }, insertElement: function (a, b) {
                    b ? this.insertElementIntoRange(a, b) : this.insertElementIntoSelection(a)
                }, insertElementIntoRange: function (a, b) {
                    var c = this.editor, d = c.config.enterMode, e = a.getName(), g = CKEDITOR.dtd.$block[e];
                    if (b.checkReadOnly())return false;
                    b.deleteContents(1);
                    var h, f;
                    if (g)for (; (h = b.getCommonAncestor(0, 1)) && (f = CKEDITOR.dtd[h.getName()]) && (!f || !f[e]);)if (h.getName()in CKEDITOR.dtd.span)b.splitElement(h); else if (b.checkStartOfBlock() && b.checkEndOfBlock()) {
                        b.setStartBefore(h);
                        b.collapse(true);
                        h.remove()
                    } else b.splitBlock(d == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable());
                    b.insertNode(a);
                    return true
                }, insertElementIntoSelection: function (a) {
                    var c = this.editor, d = c.activeEnterMode, c = c.getSelection(), e = c.getRanges(), f = a.getName(), f = CKEDITOR.dtd.$block[f], l, j, k;
                    i(this);
                    for (var n = e.length; n--;) {
                        k = e[n];
                        l = !n && a || a.clone(1);
                        this.insertElementIntoRange(l, k) && !j && (j = l)
                    }
                    if (j) {
                        k.moveToPosition(j, CKEDITOR.POSITION_AFTER_END);
                        if (f)if ((a = j.getNext(function (a) {
                                return b(a) && !h(a)
                            })) && a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$block))a.getDtd()["#"] ? k.moveToElementEditStart(a) : k.moveToElementEditEnd(j); else if (!a && d != CKEDITOR.ENTER_BR) {
                            a = k.fixBlock(true, d == CKEDITOR.ENTER_DIV ? "div" : "p");
                            k.moveToElementEditStart(a)
                        }
                    }
                    c.selectRanges([k]);
                    g(this, CKEDITOR.env.opera)
                }, setData: function (a, b) {
                    b || (a = this.editor.dataProcessor.toHtml(a));
                    this.setHtml(a);
                    this.editor.fire("dataReady")
                }, getData: function (a) {
                    var b = this.getHtml();
                    a || (b = this.editor.dataProcessor.toDataFormat(b));
                    return b
                }, setReadOnly: function (a) {
                    this.setAttribute("contenteditable", !a)
                }, detach: function () {
                    this.removeClass("cke_editable");
                    var a = this.editor;
                    this._.detach();
                    delete a.document;
                    delete a.window
                }, isInline: function () {
                    return this.getDocument().equals(CKEDITOR.document)
                }, setup: function () {
                    var a = this.editor;
                    this.attachListener(a, "beforeGetData", function () {
                        var b = this.getData();
                        this.is("textarea") || a.config.ignoreEmptyParagraph !== false && (b = b.replace(e, function (a, b) {
                            return b
                        }));
                        a.setData(b, null, 1)
                    }, this);
                    this.attachListener(a, "getSnapshot", function (a) {
                        a.data = this.getData(1)
                    }, this);
                    this.attachListener(a, "afterSetData", function () {
                        this.setData(a.getData(1))
                    }, this);
                    this.attachListener(a, "loadSnapshot", function (a) {
                        this.setData(a.data, 1)
                    }, this);
                    this.attachListener(a, "beforeFocus", function () {
                        var b = a.getSelection();
                        (b = b && b.getNative()) && b.type == "Control" || this.focus()
                    }, this);
                    this.attachListener(a, "insertHtml", function (a) {
                        this.insertHtml(a.data.dataValue, a.data.mode)
                    }, this);
                    this.attachListener(a, "insertElement", function (a) {
                        this.insertElement(a.data)
                    }, this);
                    this.attachListener(a, "insertText", function (a) {
                        this.insertText(a.data)
                    }, this);
                    this.setReadOnly(a.readOnly);
                    this.attachClass("cke_editable");
                    this.attachClass(a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "cke_editable_inline" : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE || a.elementMode == CKEDITOR.ELEMENT_MODE_APPENDTO ? "cke_editable_themed" : "");
                    this.attachClass("cke_contents_" + a.config.contentsLangDirection);
                    a.keystrokeHandler.blockedKeystrokes[8] = +a.readOnly;
                    a.keystrokeHandler.attach(this);
                    this.on("blur", function (a) {
                        CKEDITOR.env.opera && CKEDITOR.document.getActive().equals(this.isInline() ? this : this.getWindow().getFrame()) ? a.cancel() : this.hasFocus = false
                    }, null, null, -1);
                    this.on("focus", function () {
                        this.hasFocus = true
                    }, null, null, -1);
                    a.focusManager.add(this);
                    if (this.equals(CKEDITOR.document.getActive())) {
                        this.hasFocus = true;
                        a.once("contentDom", function () {
                            a.focusManager.focus()
                        })
                    }
                    this.isInline() && this.changeAttr("tabindex", a.tabIndex);
                    if (!this.is("textarea")) {
                        a.document = this.getDocument();
                        a.window = this.getWindow();
                        var b = a.document;
                        this.changeAttr("spellcheck", !a.config.disableNativeSpellChecker);
                        var c = a.config.contentsLangDirection;
                        this.getDirection(1) != c && this.changeAttr("dir", c);
                        var g = CKEDITOR.getCss();
                        if (g) {
                            c = b.getHead();
                            if (!c.getCustomData("stylesheet")) {
                                g = b.appendStyleText(g);
                                g = new CKEDITOR.dom.element(g.ownerNode || g.owningElement);
                                c.setCustomData("stylesheet", g);
                                g.data("cke-temp", 1)
                            }
                        }
                        c = b.getCustomData("stylesheet_ref") || 0;
                        b.setCustomData("stylesheet_ref", c +
                        1);
                        this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling);
                        this.attachListener(this, "click", function (a) {
                            var a = a.data, b = a.getTarget();
                            b.is("a") && (a.$.button != 2 && b.isReadOnly()) && a.preventDefault()
                        });
                        this.attachListener(a, "key", function (b) {
                            if (a.readOnly)return true;
                            var c = b.data.keyCode, e;
                            if (c in{8: 1, 46: 1}) {
                                var g = a.getSelection(), b = g.getRanges()[0], h = b.startPath(), f, i, k, c = c == 8;
                                if (g = d(g)) {
                                    a.fire("saveSnapshot");
                                    b.moveToPosition(g, CKEDITOR.POSITION_BEFORE_START);
                                    g.remove();
                                    b.select();
                                    a.fire("saveSnapshot");
                                    e = 1
                                } else if (b.collapsed)if ((f = h.block) && b[c ? "checkStartOfBlock" : "checkEndOfBlock"]() && (k = f[c ? "getPrevious" : "getNext"](j)) && k.is("table")) {
                                    a.fire("saveSnapshot");
                                    b[c ? "checkEndOfBlock" : "checkStartOfBlock"]() && f.remove();
                                    b["moveToElementEdit" + (c ? "End" : "Start")](k);
                                    b.select();
                                    a.fire("saveSnapshot");
                                    e = 1
                                } else if (h.blockLimit && h.blockLimit.is("td") && (i = h.blockLimit.getAscendant("table")) && b.checkBoundaryOfElement(i, c ? CKEDITOR.START : CKEDITOR.END) && (k = i[c ? "getPrevious" : "getNext"](j))) {
                                    a.fire("saveSnapshot");
                                    b["moveToElementEdit" + (c ? "End" : "Start")](k);
                                    b.checkStartOfBlock() && b.checkEndOfBlock() ? k.remove() : b.select();
                                    a.fire("saveSnapshot");
                                    e = 1
                                } else if ((i = h.contains(["td", "th", "caption"])) && b.checkBoundaryOfElement(i, c ? CKEDITOR.START : CKEDITOR.END))e = 1
                            }
                            return !e
                        });
                        this.attachListener(this, "dblclick", function (b) {
                            if (a.readOnly)return false;
                            b = {element: b.data.getTarget()};
                            a.fire("doubleclick", b)
                        });
                        CKEDITOR.env.ie && this.attachListener(this, "click", f);
                        !CKEDITOR.env.ie && !CKEDITOR.env.opera && this.attachListener(this, "mousedown", function (b) {
                            var c = b.data.getTarget();
                            if (c.is("img", "hr", "input", "textarea", "select")) {
                                a.getSelection().selectElement(c);
                                c.is("input", "textarea", "select") && b.data.preventDefault()
                            }
                        });
                        CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function (b) {
                            if (b.data.$.button == 2) {
                                b = b.data.getTarget();
                                if (!b.getOuterHtml().replace(e, "")) {
                                    var c = a.createRange();
                                    c.moveToElementEditStart(b);
                                    c.select(true)
                                }
                            }
                        });
                        if (CKEDITOR.env.webkit) {
                            this.attachListener(this, "click", function (a) {
                                a.data.getTarget().is("input", "select") && a.data.preventDefault()
                            });
                            this.attachListener(this, "mouseup", function (a) {
                                a.data.getTarget().is("input", "textarea") && a.data.preventDefault()
                            })
                        }
                    }
                }
            }, _: {
                detach: function () {
                    this.editor.setData(this.editor.getData(), 0, 1);
                    this.clearListeners();
                    this.restoreAttrs();
                    var a;
                    if (a = this.removeCustomData("classes"))for (; a.length;)this.removeClass(a.pop());
                    a = this.getDocument();
                    var b = a.getHead();
                    if (b.getCustomData("stylesheet")) {
                        var c = a.getCustomData("stylesheet_ref");
                        if (--c)a.setCustomData("stylesheet_ref", c); else {
                            a.removeCustomData("stylesheet_ref");
                            b.removeCustomData("stylesheet").remove()
                        }
                    }
                    delete this.editor
                }
            }
        });
        CKEDITOR.editor.prototype.editable = function (a) {
            var b = this._.editable;
            if (b && a)return 0;
            if (arguments.length)b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), null);
            return b
        };
        var h = CKEDITOR.dom.walker.bogus(), e = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi, j = CKEDITOR.dom.walker.whitespaces(true), k = CKEDITOR.dom.walker.bookmark(false, true);
        CKEDITOR.on("instanceLoaded", function (a) {
            var b = a.editor;
            b.on("insertElement", function (a) {
                a = a.data;
                if (a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea"))) {
                    a.getAttribute("contentEditable") != "false" && a.data("cke-editable", a.hasAttribute("contenteditable") ? "true" : "1");
                    a.setAttribute("contentEditable", false)
                }
            });
            b.on("selectionChange", function (a) {
                if (!b.readOnly) {
                    var d = b.getSelection();
                    if (d && !d.isLocked) {
                        d = b.checkDirty();
                        b.fire("lockSnapshot");
                        c(a);
                        b.fire("unlockSnapshot");
                        !d && b.resetDirty()
                    }
                }
            })
        });
        CKEDITOR.on("instanceCreated", function (a) {
            var b = a.editor;
            b.on("mode", function () {
                var a = b.editable();
                if (a && a.isInline()) {
                    var c = b.title;
                    a.changeAttr("role", "textbox");
                    a.changeAttr("aria-label", c);
                    c && a.changeAttr("title", c);
                    if (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents")) {
                        var d = CKEDITOR.tools.getNextId(), e = CKEDITOR.dom.element.createFromHtml('<span id="' + d + '" class="cke_voice_label">' + this.lang.common.editorHelp + "</span>");
                        c.append(e);
                        a.changeAttr("aria-describedby", d)
                    }
                }
            })
        });
        CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
        var n = function () {
            function a(b) {
                return b.type == CKEDITOR.NODE_ELEMENT
            }

            function c(b, d) {
                var e, g, h, f, l = [], j = d.range.startContainer;
                e = d.range.startPath();
                for (var j = i[j.getName()], k = 0, m = b.getChildren(), p = m.count(), n = -1, t = -1, r = 0, A = e.contains(i.$list); k < p; ++k) {
                    e = m.getItem(k);
                    if (a(e)) {
                        h = e.getName();
                        if (A && h in CKEDITOR.dtd.$list)l = l.concat(c(e, d)); else {
                            f = !!j[h];
                            if (h == "br" && e.data("cke-eol") && (!k || k == p - 1)) {
                                r = (g = k ? l[k - 1].node : m.getItem(k + 1)) && (!a(g) || !g.is("br"));
                                g = g && a(g) && i.$block[g.getName()]
                            }
                            n == -1 && !f && (n = k);
                            f || (t = k);
                            l.push({
                                isElement: 1,
                                isLineBreak: r,
                                isBlock: e.isBlockBoundary(),
                                hasBlockSibling: g,
                                node: e,
                                name: h,
                                allowed: f
                            });
                            g = r = 0
                        }
                    } else l.push({isElement: 0, node: e, allowed: 1})
                }
                if (n > -1)l[n].firstNotAllowed = 1;
                if (t > -1)l[t].lastNotAllowed = 1;
                return l
            }

            function d(b, c) {
                var e = [], g = b.getChildren(), h = g.count(), f, l = 0, j = i[c], k = !b.is(i.$inline) || b.is("br");
                for (k && e.push(" "); l < h; l++) {
                    f = g.getItem(l);
                    a(f) && !f.is(j) ? e = e.concat(d(f, c)) : e.push(f)
                }
                k && e.push(" ");
                return e
            }

            function e(b) {
                return b && a(b) && (b.is(i.$removeEmpty) || b.is("a") && !b.isBlockBoundary())
            }

            function h(b, c, d, e) {
                var g = b.clone(), f, i;
                g.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
                if ((f = (new CKEDITOR.dom.walker(g)).next()) && a(f) && j[f.getName()] && (i = f.getPrevious()) && a(i) && !i.getParent().equals(b.startContainer) && d.contains(i) && e.contains(f) && f.isIdentical(i)) {
                    f.moveChildren(i);
                    f.remove();
                    h(b, c, d, e)
                }
            }

            function f(b, c) {
                function d(b, c) {
                    if (c.isBlock && c.isElement && !c.node.is("br") && a(b) && b.is("br")) {
                        b.remove();
                        return 1
                    }
                }

                var e = c.endContainer.getChild(c.endOffset), g = c.endContainer.getChild(c.endOffset - 1);
                e && d(e, b[b.length - 1]);
                if (g && d(g, b[0])) {
                    c.setEnd(c.endContainer, c.endOffset - 1);
                    c.collapse()
                }
            }

            var i = CKEDITOR.dtd, j = {
                p: 1,
                div: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                ul: 1,
                ol: 1,
                li: 1,
                pre: 1,
                dl: 1,
                blockquote: 1
            }, k = {p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1}, n = CKEDITOR.tools.extend({}, i.$inline);
            delete n.br;
            return function (j, t, u) {
                var x = j.editor;
                j.getDocument();
                var B = x.getSelection().getRanges()[0], z = false;
                if (t == "unfiltered_html") {
                    t = "html";
                    z = true
                }
                if (!B.checkReadOnly()) {
                    var D = (new CKEDITOR.dom.elementPath(B.startContainer, B.root)).blockLimit || B.root, t = {
                        type: t,
                        dontFilter: z,
                        editable: j,
                        editor: x,
                        range: B,
                        blockLimit: D,
                        mergeCandidates: [],
                        zombies: []
                    }, x = t.range, z = t.mergeCandidates, C, F, G, E;
                    if (t.type == "text" && x.shrink(CKEDITOR.SHRINK_ELEMENT, true, false)) {
                        C = CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", x.document);
                        x.insertNode(C);
                        x.setStartAfter(C)
                    }
                    F = new CKEDITOR.dom.elementPath(x.startContainer);
                    t.endPath = G = new CKEDITOR.dom.elementPath(x.endContainer);
                    if (!x.collapsed) {
                        var D = G.block || G.blockLimit, M = x.getCommonAncestor();
                        D && (!D.equals(M) && !D.contains(M) && x.checkEndOfBlock()) && t.zombies.push(D);
                        x.deleteContents()
                    }
                    for (; (E = a(x.startContainer) && x.startContainer.getChild(x.startOffset - 1)) && a(E) && E.isBlockBoundary() && F.contains(E);)x.moveToPosition(E, CKEDITOR.POSITION_BEFORE_END);
                    h(x, t.blockLimit, F, G);
                    if (C) {
                        x.setEndBefore(C);
                        x.collapse();
                        C.remove()
                    }
                    C = x.startPath();
                    if (D = C.contains(e, false, 1)) {
                        x.splitElement(D);
                        t.inlineStylesRoot = D;
                        t.inlineStylesPeak = C.lastElement
                    }
                    C = x.createBookmark();
                    (D = C.startNode.getPrevious(b)) && a(D) && e(D) && z.push(D);
                    (D = C.startNode.getNext(b)) && a(D) && e(D) && z.push(D);
                    for (D = C.startNode; (D = D.getParent()) && e(D);)z.push(D);
                    x.moveToBookmark(C);
                    if (C = u) {
                        C = t.range;
                        if (t.type == "text" && t.inlineStylesRoot) {
                            E = t.inlineStylesPeak;
                            x = E.getDocument().createText("{cke-peak}");
                            for (z = t.inlineStylesRoot.getParent(); !E.equals(z);) {
                                x = x.appendTo(E.clone());
                                E = E.getParent()
                            }
                            u = x.getOuterHtml().split("{cke-peak}").join(u)
                        }
                        E = t.blockLimit.getName();
                        if (/^\s+|\s+$/.test(u) && "span"in CKEDITOR.dtd[E])var I = '<span data-cke-marker="1">&nbsp;</span>', u = I + u + I;
                        u = t.editor.dataProcessor.toHtml(u, {
                            context: null,
                            fixForBody: false,
                            dontFilter: t.dontFilter,
                            filter: t.editor.activeFilter,
                            enterMode: t.editor.activeEnterMode
                        });
                        E = C.document.createElement("body");
                        E.setHtml(u);
                        if (I) {
                            E.getFirst().remove();
                            E.getLast().remove()
                        }
                        if ((I = C.startPath().block) && !(I.getChildCount() == 1 && I.getBogus()))a:{
                            var J;
                            if (E.getChildCount() == 1 && a(J = E.getFirst()) && J.is(k)) {
                                I = J.getElementsByTag("*");
                                C = 0;
                                for (z = I.count(); C < z; C++) {
                                    x = I.getItem(C);
                                    if (!x.is(n))break a
                                }
                                J.moveChildren(J.getParent(1));
                                J.remove()
                            }
                        }
                        t.dataWrapper = E;
                        C = u
                    }
                    if (C) {
                        J = t.range;
                        var I = J.document, H, u = t.blockLimit;
                        C = 0;
                        var L;
                        E = [];
                        var K, P, z = x = 0, N, Q;
                        F = J.startContainer;
                        var D = t.endPath.elements[0], R;
                        G = D.getPosition(F);
                        M = !!D.getCommonAncestor(F) && G != CKEDITOR.POSITION_IDENTICAL && !(G & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED);
                        F = c(t.dataWrapper, t);
                        for (f(F, J); C < F.length; C++) {
                            G = F[C];
                            if (H = G.isLineBreak) {
                                H = J;
                                N = u;
                                var O = void 0, V = void 0;
                                if (G.hasBlockSibling)H = 1; else {
                                    O = H.startContainer.getAscendant(i.$block, 1);
                                    if (!O || !O.is({div: 1, p: 1}))H = 0; else {
                                        V = O.getPosition(N);
                                        if (V == CKEDITOR.POSITION_IDENTICAL || V == CKEDITOR.POSITION_CONTAINS)H = 0; else {
                                            N = H.splitElement(O);
                                            H.moveToPosition(N, CKEDITOR.POSITION_AFTER_START);
                                            H = 1
                                        }
                                    }
                                }
                            }
                            if (H)z = C > 0; else {
                                H = J.startPath();
                                if (!G.isBlock && t.editor.config.autoParagraph !== false && (t.editor.activeEnterMode != CKEDITOR.ENTER_BR && t.editor.editable().equals(H.blockLimit) && !H.block) && (P = t.editor.activeEnterMode != CKEDITOR.ENTER_BR && t.editor.config.autoParagraph !== false ? t.editor.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : false)) {
                                    P = I.createElement(P);
                                    !CKEDITOR.env.ie && P.appendBogus();
                                    J.insertNode(P);
                                    !CKEDITOR.env.ie && (L = P.getBogus()) && L.remove();
                                    J.moveToPosition(P, CKEDITOR.POSITION_BEFORE_END)
                                }
                                if ((H = J.startPath().block) && !H.equals(K)) {
                                    if (L = H.getBogus()) {
                                        L.remove();
                                        E.push(H)
                                    }
                                    K = H
                                }
                                G.firstNotAllowed && (x = 1);
                                if (x && G.isElement) {
                                    H = J.startContainer;
                                    for (N = null; H && !i[H.getName()][G.name];) {
                                        if (H.equals(u)) {
                                            H = null;
                                            break
                                        }
                                        N = H;
                                        H = H.getParent()
                                    }
                                    if (H) {
                                        if (N) {
                                            Q = J.splitElement(N);
                                            t.zombies.push(Q);
                                            t.zombies.push(N)
                                        }
                                    } else {
                                        N = u.getName();
                                        R = !C;
                                        H = C == F.length - 1;
                                        N = d(G.node, N);
                                        for (var O = [], V = N.length, U = 0, W = void 0, X = 0, S = -1; U < V; U++) {
                                            W = N[U];
                                            if (W == " ") {
                                                if (!X && (!R || U)) {
                                                    O.push(new CKEDITOR.dom.text(" "));
                                                    S = O.length
                                                }
                                                X = 1
                                            } else {
                                                O.push(W);
                                                X = 0
                                            }
                                        }
                                        H && S == O.length && O.pop();
                                        R = O
                                    }
                                }
                                if (R) {
                                    for (; H = R.pop();)J.insertNode(H);
                                    R = 0
                                } else J.insertNode(G.node);
                                if (G.lastNotAllowed && C < F.length - 1) {
                                    (Q = M ? D : Q) && J.setEndAt(Q, CKEDITOR.POSITION_AFTER_START);
                                    x = 0
                                }
                                J.collapse()
                            }
                        }
                        t.dontMoveCaret = z;
                        t.bogusNeededBlocks = E
                    }
                    L = t.range;
                    var T;
                    Q = t.bogusNeededBlocks;
                    for (R = L.createBookmark(); K = t.zombies.pop();)if (K.getParent()) {
                        P = L.clone();
                        P.moveToElementEditStart(K);
                        P.removeEmptyBlocksAtEnd()
                    }
                    if (Q)for (; K = Q.pop();)K.append(CKEDITOR.env.ie ? L.document.createText(" ") : L.document.createElement("br"));
                    for (; K = t.mergeCandidates.pop();)K.mergeSiblings();
                    L.moveToBookmark(R);
                    if (!t.dontMoveCaret) {
                        for (K = a(L.startContainer) && L.startContainer.getChild(L.startOffset - 1); K && a(K) && !K.is(i.$empty);) {
                            if (K.isBlockBoundary())L.moveToPosition(K, CKEDITOR.POSITION_BEFORE_END); else {
                                if (e(K) && K.getHtml().match(/(\s|&nbsp;)$/g)) {
                                    T = null;
                                    break
                                }
                                T = L.clone();
                                T.moveToPosition(K, CKEDITOR.POSITION_BEFORE_END)
                            }
                            K = K.getLast(b)
                        }
                        T && L.moveToRange(T)
                    }
                    B.select();
                    g(j)
                }
            }
        }()
    }(),function () {
        function c() {
            var a = this._.fakeSelection, b;
            if (a) {
                b = this.getSelection(1);
                if (!b || !b.isHidden()) {
                    a.reset();
                    a = 0
                }
            }
            if (!a) {
                a = b || this.getSelection(1);
                if (!a || a.getType() == CKEDITOR.SELECTION_NONE)return
            }
            this.fire("selectionCheck", a);
            b = this.elementPath();
            if (!b.compare(this._.selectionPreviousPath)) {
                if (CKEDITOR.env.webkit)this._.previousActive = this.document.getActive();
                this._.selectionPreviousPath = b;
                this.fire("selectionChange", {selection: a, path: b})
            }
        }

        function f() {
            n = true;
            if (!k) {
                b.call(this);
                k = CKEDITOR.tools.setTimeout(b, 200, this)
            }
        }

        function b() {
            k = null;
            if (n) {
                CKEDITOR.tools.setTimeout(c, 0, this);
                n = false
            }
        }

        function a(a) {
            function b(c, d) {
                return !c || c.type == CKEDITOR.NODE_TEXT ? false : a.clone()["moveToElementEdit" + (d ? "End" : "Start")](c)
            }

            if (!(a.root instanceof CKEDITOR.editable))return false;
            var c = a.startContainer, d = a.getPreviousNode(o, null, c), e = a.getNextNode(o, null, c);
            return b(d) || b(e, 1) || !d && !e && !(c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary() && c.getBogus()) ? true : false
        }

        function d(a) {
            return a.getCustomData("cke-fillingChar")
        }

        function i(a, b) {
            var c = a && a.removeCustomData("cke-fillingChar");
            if (c) {
                if (b !== false) {
                    var d, e = a.getDocument().getSelection().getNative(), h = e && e.type != "None" && e.getRangeAt(0);
                    if (c.getLength() > 1 && h && h.intersectsNode(c.$)) {
                        d = [e.anchorOffset, e.focusOffset];
                        h = e.focusNode == c.$ && e.focusOffset > 0;
                        e.anchorNode == c.$ && e.anchorOffset > 0 && d[0]--;
                        h && d[1]--;
                        var f;
                        h = e;
                        if (!h.isCollapsed) {
                            f = h.getRangeAt(0);
                            f.setStart(h.anchorNode, h.anchorOffset);
                            f.setEnd(h.focusNode, h.focusOffset);
                            f = f.collapsed
                        }
                        f && d.unshift(d.pop())
                    }
                }
                c.setText(g(c.getText()));
                if (d) {
                    c = e.getRangeAt(0);
                    c.setStart(c.startContainer, d[0]);
                    c.setEnd(c.startContainer, d[1]);
                    e.removeAllRanges();
                    e.addRange(c)
                }
            }
        }

        function g(a) {
            return a.replace(/\u200B( )?/g, function (a) {
                return a[1] ? " " : ""
            })
        }

        function h(a, b, c) {
            var d = a.on("focus", function (a) {
                a.cancel()
            }, null, null, -100);
            if (CKEDITOR.env.ie)var e = a.getDocument().on("selectionchange", function (a) {
                a.cancel()
            }, null, null, -100); else {
                var g = new CKEDITOR.dom.range(a);
                g.moveToElementEditStart(a);
                var h = a.getDocument().$.createRange();
                h.setStart(g.startContainer.$, g.startOffset);
                h.collapse(1);
                b.removeAllRanges();
                b.addRange(h)
            }
            c && a.focus();
            d.removeListener();
            e && e.removeListener()
        }

        function e(a) {
            var b = CKEDITOR.dom.element.createFromHtml('<div data-cke-hidden-sel="1" data-cke-temp="1" style="' + (CKEDITOR.env.ie ? "display:none" : "position:fixed;top:0;left:-1000px") + '">&nbsp;</div>', a.document);
            a.fire("lockSnapshot");
            a.editable().append(b);
            var c = a.getSelection(), d = a.createRange(), e = c.root.on("selectionchange", function (a) {
                a.cancel()
            }, null, null, 0);
            d.setStartAt(b, CKEDITOR.POSITION_AFTER_START);
            d.setEndAt(b, CKEDITOR.POSITION_BEFORE_END);
            c.selectRanges([d]);
            e.removeListener();
            a.fire("unlockSnapshot");
            a._.hiddenSelectionContainer = b
        }

        function j(a) {
            var b = {37: 1, 39: 1, 8: 1, 46: 1};
            return function (c) {
                var d = c.data.getKeystroke();
                if (b[d]) {
                    var e = a.getSelection().getRanges(), g = e[0];
                    if (e.length == 1 && g.collapsed)if ((d = g[d < 38 ? "getPreviousEditableNode" : "getNextEditableNode"]()) && d.type == CKEDITOR.NODE_ELEMENT && d.getAttribute("contenteditable") == "false") {
                        a.getSelection().fake(d);
                        c.data.preventDefault();
                        c.cancel()
                    }
                }
            }
        }

        var k, n, o = CKEDITOR.dom.walker.invisible(1), q = function () {
            function a(b) {
                return function (a) {
                    var c = a.editor.createRange();
                    c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([c]);
                    return false
                }
            }

            function b(a) {
                return function (b) {
                    var c = b.editor, d = c.createRange(), e;
                    if (!(e = d.moveToClosestEditablePosition(b.selected, a)))e = d.moveToClosestEditablePosition(b.selected, !a);
                    e && c.getSelection().selectRanges([d]);
                    c.fire("saveSnapshot");
                    b.selected.remove();
                    if (!e) {
                        d.moveToElementEditablePosition(c.editable());
                        c.getSelection().selectRanges([d])
                    }
                    c.fire("saveSnapshot");
                    return false
                }
            }

            var c = a(), d = a(1);
            return {37: c, 38: c, 39: d, 40: d, 8: b(), 46: b(1)}
        }();
        CKEDITOR.on("instanceCreated", function (a) {
            function b() {
                var a = d.getSelection();
                a && a.removeAllRanges()
            }

            var d = a.editor;
            d.on("contentDom", function () {
                var a = d.document, b = CKEDITOR.document, e = d.editable(), g = a.getBody(), h = a.getDocumentElement(), l = e.isInline(), k, y;
                CKEDITOR.env.gecko && e.attachListener(e, "focus", function (a) {
                    a.removeListener();
                    if (k !== 0)if ((a = d.getSelection().getNative()) && a.isCollapsed && a.anchorNode == e.$) {
                        a = d.createRange();
                        a.moveToElementEditStart(e);
                        a.select()
                    }
                }, null, null, -2);
                e.attachListener(e, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function () {
                    k && CKEDITOR.env.webkit && (k = d._.previousActive && d._.previousActive.equals(a.getActive()));
                    d.unlockSelection(k);
                    k = 0
                }, null, null, -1);
                e.attachListener(e, "mousedown", function () {
                    k = 0
                });
                if (CKEDITOR.env.ie || CKEDITOR.env.opera || l) {
                    var p = function () {
                        y = new CKEDITOR.dom.selection(d.getSelection());
                        y.lock()
                    };
                    m ? e.attachListener(e, "beforedeactivate", p, null, null, -1) : e.attachListener(d, "selectionCheck", p, null, null, -1);
                    e.attachListener(e, CKEDITOR.env.webkit ? "DOMFocusOut" : "blur", function () {
                        d.lockSelection(y);
                        k = 1
                    }, null, null, -1);
                    e.attachListener(e, "mousedown", function () {
                        k = 0
                    })
                }
                if (CKEDITOR.env.ie && !l) {
                    var n;
                    e.attachListener(e, "mousedown", function (a) {
                        a.data.$.button == 2 && d.document.$.selection.type == "None" && (n = d.window.getScrollPosition())
                    });
                    e.attachListener(e, "mouseup", function (a) {
                        if (a.data.$.button == 2 && n) {
                            d.document.$.documentElement.scrollLeft = n.x;
                            d.document.$.documentElement.scrollTop = n.y
                        }
                        n = null
                    });
                    if (a.$.compatMode != "BackCompat") {
                        if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat)h.on("mousedown", function (a) {
                            function c(a) {
                                a = a.data.$;
                                if (e) {
                                    var b = g.$.createTextRange();
                                    try {
                                        b.moveToPoint(a.x, a.y)
                                    } catch (d) {
                                    }
                                    e.setEndPoint(i.compareEndPoints("StartToStart", b) < 0 ? "EndToEnd" : "StartToStart", b);
                                    e.select()
                                }
                            }

                            function d() {
                                h.removeListener("mousemove", c);
                                b.removeListener("mouseup", d);
                                h.removeListener("mouseup", d);
                                e.select()
                            }

                            a = a.data;
                            if (a.getTarget().is("html") && a.$.y < h.$.clientHeight && a.$.x < h.$.clientWidth) {
                                var e = g.$.createTextRange();
                                try {
                                    e.moveToPoint(a.$.x, a.$.y)
                                } catch (f) {
                                }
                                var i = e.duplicate();
                                h.on("mousemove", c);
                                b.on("mouseup", d);
                                h.on("mouseup", d)
                            }
                        });
                        if (CKEDITOR.env.version > 7) {
                            h.on("mousedown", function (a) {
                                if (a.data.getTarget().is("html")) {
                                    b.on("mouseup", q);
                                    h.on("mouseup", q)
                                }
                            });
                            var q = function () {
                                b.removeListener("mouseup", q);
                                h.removeListener("mouseup", q);
                                var c = CKEDITOR.document.$.selection, d = c.createRange();
                                c.type != "None" && d.parentElement().ownerDocument == a.$ && d.select()
                            }
                        }
                    }
                }
                e.attachListener(e, "selectionchange", c, d);
                e.attachListener(e, "keyup", f, d);
                e.attachListener(e, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function () {
                    d.forceNextSelectionCheck();
                    d.selectionChange(1)
                });
                if (l ? CKEDITOR.env.webkit || CKEDITOR.env.gecko : CKEDITOR.env.opera) {
                    var G;
                    e.attachListener(e, "mousedown", function () {
                        G = 1
                    });
                    e.attachListener(a.getDocumentElement(), "mouseup", function () {
                        G && f.call(d);
                        G = 0
                    })
                } else e.attachListener(CKEDITOR.env.ie ? e : a.getDocumentElement(), "mouseup", f, d);
                CKEDITOR.env.webkit && e.attachListener(a, "keydown", function (a) {
                    switch (a.data.getKey()) {
                        case 13:
                        case 33:
                        case 34:
                        case 35:
                        case 36:
                        case 37:
                        case 39:
                        case 8:
                        case 45:
                        case 46:
                            i(e)
                    }
                }, null, null, -1);
                e.attachListener(e, "keydown", j(d), null, null, -1)
            });
            d.on("contentDomUnload", d.forceNextSelectionCheck, d);
            d.on("dataReady", function () {
                delete d._.fakeSelection;
                delete d._.hiddenSelectionContainer;
                d.selectionChange(1)
            });
            d.on("loadSnapshot", function () {
                var a = d.editable().getLast(function (a) {
                    return a.type == CKEDITOR.NODE_ELEMENT
                });
                a && a.hasAttribute("data-cke-hidden-sel") && a.remove()
            }, null, null, 100);
            CKEDITOR.env.ie9Compat && d.on("beforeDestroy", b, null, null, 9);
            CKEDITOR.env.webkit && d.on("setData", b);
            d.on("contentDomUnload", function () {
                d.unlockSelection()
            });
            d.on("key", function (a) {
                if (d.mode == "wysiwyg") {
                    var b = d.getSelection();
                    if (b.isFake) {
                        var c = q[a.data.keyCode];
                        if (c)return c({editor: d, selected: b.getSelectedElement(), selection: b, keyEvent: a})
                    }
                }
            })
        });
        CKEDITOR.on("instanceReady", function (a) {
            var b = a.editor;
            if (CKEDITOR.env.webkit) {
                b.on("selectionChange", function () {
                    var a = b.editable(), c = d(a);
                    c && (c.getCustomData("ready") ? i(a) : c.setCustomData("ready", 1))
                }, null, null, -1);
                b.on("beforeSetMode", function () {
                    i(b.editable())
                }, null, null, -1);
                var c, e, a = function () {
                    var a = b.editable();
                    if (a)if (a = d(a)) {
                        var h = b.document.$.defaultView.getSelection();
                        h.type == "Caret" && h.anchorNode == a.$ && (e = 1);
                        c = a.getText();
                        a.setText(g(c))
                    }
                }, h = function () {
                    var a = b.editable();
                    if (a)if (a = d(a)) {
                        a.setText(c);
                        if (e) {
                            b.document.$.defaultView.getSelection().setPosition(a.$, a.getLength());
                            e = 0
                        }
                    }
                };
                b.on("beforeUndoImage", a);
                b.on("afterUndoImage", h);
                b.on("beforeGetData", a, null, null, 0);
                b.on("getData", h)
            }
        });
        CKEDITOR.editor.prototype.selectionChange = function (a) {
            (a ? c : f).call(this)
        };
        CKEDITOR.editor.prototype.getSelection = function (a) {
            if ((this._.savedSelection || this._.fakeSelection) && !a)return this._.savedSelection || this._.fakeSelection;
            return (a = this.editable()) && this.mode == "wysiwyg" ? new CKEDITOR.dom.selection(a) : null
        };
        CKEDITOR.editor.prototype.lockSelection = function (a) {
            a = a || this.getSelection(1);
            if (a.getType() != CKEDITOR.SELECTION_NONE) {
                !a.isLocked && a.lock();
                this._.savedSelection = a;
                return true
            }
            return false
        };
        CKEDITOR.editor.prototype.unlockSelection = function (a) {
            var b = this._.savedSelection;
            if (b) {
                b.unlock(a);
                delete this._.savedSelection;
                return true
            }
            return false
        };
        CKEDITOR.editor.prototype.forceNextSelectionCheck = function () {
            delete this._.selectionPreviousPath
        };
        CKEDITOR.dom.document.prototype.getSelection = function () {
            return new CKEDITOR.dom.selection(this)
        };
        CKEDITOR.dom.range.prototype.select = function () {
            var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root);
            a.selectRanges([this]);
            return a
        };
        CKEDITOR.SELECTION_NONE = 1;
        CKEDITOR.SELECTION_TEXT = 2;
        CKEDITOR.SELECTION_ELEMENT = 3;
        var m = typeof window.getSelection != "function", p = 1;
        CKEDITOR.dom.selection = function (a) {
            if (a instanceof CKEDITOR.dom.selection)var b = a, a = a.root;
            var c = a instanceof CKEDITOR.dom.element;
            this.rev = b ? b.rev : p++;
            this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument();
            this.root = a = c ? a : this.document.getBody();
            this.isLocked = 0;
            this._ = {cache: {}};
            if (b) {
                CKEDITOR.tools.extend(this._.cache, b._.cache);
                this.isFake = b.isFake;
                this.isLocked = b.isLocked;
                return this
            }
            b = m ? this.document.$.selection : this.document.getWindow().$.getSelection();
            if (CKEDITOR.env.webkit)(b.type == "None" && this.document.getActive().equals(a) || b.type == "Caret" && b.anchorNode.nodeType == CKEDITOR.NODE_DOCUMENT) && h(a, b); else if (CKEDITOR.env.gecko)b && (this.document.getActive().equals(a) && b.anchorNode && b.anchorNode.nodeType == CKEDITOR.NODE_DOCUMENT) && h(a, b, true); else if (CKEDITOR.env.ie) {
                var d;
                try {
                    d = this.document.getActive()
                } catch (e) {
                }
                if (m)b.type == "None" && (d && d.equals(this.document.getDocumentElement())) && h(a, null, true); else {
                    (b = b && b.anchorNode) && (b = new CKEDITOR.dom.node(b));
                    d && (d.equals(this.document.getDocumentElement()) && b && (a.equals(b) || a.contains(b))) && h(a, null, true)
                }
            }
            d = this.getNative();
            var g, f;
            if (d)if (d.getRangeAt)g = (f = d.rangeCount && d.getRangeAt(0)) && new CKEDITOR.dom.node(f.commonAncestorContainer); else {
                try {
                    f = d.createRange()
                } catch (i) {
                }
                g = f && CKEDITOR.dom.element.get(f.item && f.item(0) || f.parentElement())
            }
            if (!g || !(g.type == CKEDITOR.NODE_ELEMENT || g.type == CKEDITOR.NODE_TEXT) || !this.root.equals(g) && !this.root.contains(g)) {
                this._.cache.type = CKEDITOR.SELECTION_NONE;
                this._.cache.startElement = null;
                this._.cache.selectedElement = null;
                this._.cache.selectedText = "";
                this._.cache.ranges = new CKEDITOR.dom.rangeList
            }
            return this
        };
        var r = {
            img: 1,
            hr: 1,
            li: 1,
            table: 1,
            tr: 1,
            td: 1,
            th: 1,
            embed: 1,
            object: 1,
            ol: 1,
            ul: 1,
            a: 1,
            input: 1,
            form: 1,
            select: 1,
            textarea: 1,
            button: 1,
            fieldset: 1,
            thead: 1,
            tfoot: 1
        };
        CKEDITOR.dom.selection.prototype = {
            getNative: function () {
                return this._.cache.nativeSel !== void 0 ? this._.cache.nativeSel : this._.cache.nativeSel = m ? this.document.$.selection : this.document.getWindow().$.getSelection()
            }, getType: m ? function () {
                var a = this._.cache;
                if (a.type)return a.type;
                var b = CKEDITOR.SELECTION_NONE;
                try {
                    var c = this.getNative(), d = c.type;
                    if (d == "Text")b = CKEDITOR.SELECTION_TEXT;
                    if (d == "Control")b = CKEDITOR.SELECTION_ELEMENT;
                    if (c.createRange().parentElement())b = CKEDITOR.SELECTION_TEXT
                } catch (e) {
                }
                return a.type = b
            } : function () {
                var a = this._.cache;
                if (a.type)return a.type;
                var b = CKEDITOR.SELECTION_TEXT, c = this.getNative();
                if (!c || !c.rangeCount)b = CKEDITOR.SELECTION_NONE; else if (c.rangeCount == 1) {
                    var c = c.getRangeAt(0), d = c.startContainer;
                    if (d == c.endContainer && d.nodeType == 1 && c.endOffset - c.startOffset == 1 && r[d.childNodes[c.startOffset].nodeName.toLowerCase()])b = CKEDITOR.SELECTION_ELEMENT
                }
                return a.type = b
            }, getRanges: function () {
                var a = m ? function () {
                    function a(b) {
                        return (new CKEDITOR.dom.node(b)).getIndex()
                    }

                    var b = function (b, c) {
                        b = b.duplicate();
                        b.collapse(c);
                        var d = b.parentElement(), e = d.ownerDocument;
                        if (!d.hasChildNodes())return {container: d, offset: 0};
                        for (var g = d.children, h, f, i = b.duplicate(), j = 0, l = g.length - 1, k = -1, m, p; j <= l;) {
                            k = Math.floor((j + l) / 2);
                            h = g[k];
                            i.moveToElementText(h);
                            m = i.compareEndPoints("StartToStart", b);
                            if (m > 0)l = k - 1; else if (m < 0)j = k + 1; else {
                                if (CKEDITOR.env.ie9Compat && h.tagName == "BR") {
                                    g = e.defaultView.getSelection();
                                    return {
                                        container: g[c ? "anchorNode" : "focusNode"],
                                        offset: g[c ? "anchorOffset" : "focusOffset"]
                                    }
                                }
                                return {container: d, offset: a(h)}
                            }
                        }
                        if (k == -1 || k == g.length - 1 && m < 0) {
                            i.moveToElementText(d);
                            i.setEndPoint("StartToStart", b);
                            e = i.text.replace(/(\r\n|\r)/g, "\n").length;
                            g = d.childNodes;
                            if (!e) {
                                h = g[g.length - 1];
                                return h.nodeType != CKEDITOR.NODE_TEXT ? {container: d, offset: g.length} : {
                                    container: h,
                                    offset: h.nodeValue.length
                                }
                            }
                            for (d = g.length; e > 0 && d > 0;) {
                                f = g[--d];
                                if (f.nodeType == CKEDITOR.NODE_TEXT) {
                                    p = f;
                                    e = e - f.nodeValue.length
                                }
                            }
                            return {container: p, offset: -e}
                        }
                        i.collapse(m > 0 ? true : false);
                        i.setEndPoint(m > 0 ? "StartToStart" : "EndToStart", b);
                        e = i.text.replace(/(\r\n|\r)/g, "\n").length;
                        if (!e)return {container: d, offset: a(h) + (m > 0 ? 0 : 1)};
                        for (; e > 0;)try {
                            f = h[m > 0 ? "previousSibling" : "nextSibling"];
                            if (f.nodeType == CKEDITOR.NODE_TEXT) {
                                e = e - f.nodeValue.length;
                                p = f
                            }
                            h = f
                        } catch (n) {
                            return {container: d, offset: a(h)}
                        }
                        return {container: p, offset: m > 0 ? -e : p.nodeValue.length + e}
                    };
                    return function () {
                        var a = this.getNative(), c = a && a.createRange(), d = this.getType();
                        if (!a)return [];
                        if (d == CKEDITOR.SELECTION_TEXT) {
                            a = new CKEDITOR.dom.range(this.root);
                            d = b(c, true);
                            a.setStart(new CKEDITOR.dom.node(d.container), d.offset);
                            d = b(c);
                            a.setEnd(new CKEDITOR.dom.node(d.container), d.offset);
                            a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse();
                            return [a]
                        }
                        if (d == CKEDITOR.SELECTION_ELEMENT) {
                            for (var d = [], e = 0; e < c.length; e++) {
                                for (var g = c.item(e), h = g.parentNode, f = 0, a = new CKEDITOR.dom.range(this.root); f < h.childNodes.length && h.childNodes[f] != g; f++);
                                a.setStart(new CKEDITOR.dom.node(h), f);
                                a.setEnd(new CKEDITOR.dom.node(h), f + 1);
                                d.push(a)
                            }
                            return d
                        }
                        return []
                    }
                }() : function () {
                    var a = [], b, c = this.getNative();
                    if (!c)return a;
                    for (var d = 0; d < c.rangeCount; d++) {
                        var e = c.getRangeAt(d);
                        b = new CKEDITOR.dom.range(this.root);
                        b.setStart(new CKEDITOR.dom.node(e.startContainer), e.startOffset);
                        b.setEnd(new CKEDITOR.dom.node(e.endContainer), e.endOffset);
                        a.push(b)
                    }
                    return a
                };
                return function (b) {
                    var c = this._.cache;
                    if (c.ranges && !b)return c.ranges;
                    if (!c.ranges)c.ranges = new CKEDITOR.dom.rangeList(a.call(this));
                    if (b)for (var d = c.ranges, e = 0; e < d.length; e++) {
                        var g = d[e];
                        g.getCommonAncestor().isReadOnly() && d.splice(e, 1);
                        if (!g.collapsed) {
                            if (g.startContainer.isReadOnly())for (var b = g.startContainer, h; b;) {
                                if ((h = b.type == CKEDITOR.NODE_ELEMENT) && b.is("body") || !b.isReadOnly())break;
                                h && b.getAttribute("contentEditable") == "false" && g.setStartAfter(b);
                                b = b.getParent()
                            }
                            b = g.startContainer;
                            h = g.endContainer;
                            var f = g.startOffset, i = g.endOffset, j = g.clone();
                            b && b.type == CKEDITOR.NODE_TEXT && (f >= b.getLength() ? j.setStartAfter(b) : j.setStartBefore(b));
                            h && h.type == CKEDITOR.NODE_TEXT && (i ? j.setEndAfter(h) : j.setEndBefore(h));
                            b = new CKEDITOR.dom.walker(j);
                            b.evaluator = function (a) {
                                if (a.type == CKEDITOR.NODE_ELEMENT && a.isReadOnly()) {
                                    var b = g.clone();
                                    g.setEndBefore(a);
                                    g.collapsed && d.splice(e--, 1);
                                    if (!(a.getPosition(j.endContainer) & CKEDITOR.POSITION_CONTAINS)) {
                                        b.setStartAfter(a);
                                        b.collapsed || d.splice(e + 1, 0, b)
                                    }
                                    return true
                                }
                                return false
                            };
                            b.next()
                        }
                    }
                    return c.ranges
                }
            }(), getStartElement: function () {
                var a = this._.cache;
                if (a.startElement !== void 0)return a.startElement;
                var b;
                switch (this.getType()) {
                    case CKEDITOR.SELECTION_ELEMENT:
                        return this.getSelectedElement();
                    case CKEDITOR.SELECTION_TEXT:
                        var c = this.getRanges()[0];
                        if (c) {
                            if (c.collapsed) {
                                b = c.startContainer;
                                b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent())
                            } else {
                                for (c.optimize(); ;) {
                                    b = c.startContainer;
                                    if (c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary())c.setStartAfter(b); else break
                                }
                                b = c.startContainer;
                                if (b.type != CKEDITOR.NODE_ELEMENT)return b.getParent();
                                b = b.getChild(c.startOffset);
                                if (!b || b.type != CKEDITOR.NODE_ELEMENT)b = c.startContainer; else for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;) {
                                    b = c;
                                    c = c.getFirst()
                                }
                            }
                            b = b.$
                        }
                }
                return a.startElement = b ? new CKEDITOR.dom.element(b) : null
            }, getSelectedElement: function () {
                var a = this._.cache;
                if (a.selectedElement !== void 0)return a.selectedElement;
                var b = this, c = CKEDITOR.tools.tryThese(function () {
                    return b.getNative().createRange().item(0)
                }, function () {
                    for (var a = b.getRanges()[0].clone(), c, d, e = 2; e && (!(c = a.getEnclosedNode()) || !(c.type == CKEDITOR.NODE_ELEMENT && r[c.getName()] && (d = c))); e--)a.shrink(CKEDITOR.SHRINK_ELEMENT);
                    return d && d.$
                });
                return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null
            }, getSelectedText: function () {
                var a = this._.cache;
                if (a.selectedText !== void 0)return a.selectedText;
                var b = this.getNative(), b = m ? b.type == "Control" ? "" : b.createRange().text : b.toString();
                return a.selectedText = b
            }, lock: function () {
                this.getRanges();
                this.getStartElement();
                this.getSelectedElement();
                this.getSelectedText();
                this._.cache.nativeSel = null;
                this.isLocked = 1
            }, unlock: function (a) {
                if (this.isLocked) {
                    if (a)var b = this.getSelectedElement(), c = !b && this.getRanges(), d = this.isFake;
                    this.isLocked = 0;
                    this.reset();
                    if (a)(a = b || c[0] && c[0].getCommonAncestor()) && a.getAscendant("body", 1) && (d ? this.fake(b) : b ? this.selectElement(b) : this.selectRanges(c))
                }
            }, reset: function () {
                this._.cache = {};
                this.isFake = 0;
                var a = this.root.editor;
                if (a && a._.fakeSelection && this.rev == a._.fakeSelection.rev) {
                    delete a._.fakeSelection;
                    var b = a._.hiddenSelectionContainer;
                    if (b) {
                        a.fire("lockSnapshot");
                        b.remove();
                        a.fire("unlockSnapshot")
                    }
                    delete a._.hiddenSelectionContainer
                }
                this.rev = p++
            }, selectElement: function (a) {
                var b = new CKEDITOR.dom.range(this.root);
                b.setStartBefore(a);
                b.setEndAfter(a);
                this.selectRanges([b])
            }, selectRanges: function (b) {
                this.reset();
                if (b.length)if (this.isLocked) {
                    var c = CKEDITOR.document.getActive();
                    this.unlock();
                    this.selectRanges(b);
                    this.lock();
                    !c.equals(this.root) && c.focus()
                } else if (b.length == 1 && !b[0].collapsed && (c = b[0].getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && c.getAttribute("contenteditable") == "false")this.fake(c); else {
                    if (m) {
                        var d = CKEDITOR.dom.walker.whitespaces(true), e = /\ufeff|\u00a0/, g = {
                            table: 1,
                            tbody: 1,
                            tr: 1
                        };
                        if (b.length > 1) {
                            c = b[b.length - 1];
                            b[0].setEnd(c.endContainer, c.endOffset)
                        }
                        var c = b[0], b = c.collapsed, h, f, j, k = c.getEnclosedNode();
                        if (k && k.type == CKEDITOR.NODE_ELEMENT && k.getName()in r && (!k.is("a") || !k.getText()))try {
                            j = k.$.createControlRange();
                            j.addElement(k.$);
                            j.select();
                            return
                        } catch (p) {
                        }
                        (c.startContainer.type == CKEDITOR.NODE_ELEMENT && c.startContainer.getName()in g || c.endContainer.type == CKEDITOR.NODE_ELEMENT && c.endContainer.getName()in g) && c.shrink(CKEDITOR.NODE_ELEMENT, true);
                        j = c.createBookmark();
                        var g = j.startNode, n;
                        if (!b)n = j.endNode;
                        j = c.document.$.body.createTextRange();
                        j.moveToElementText(g.$);
                        j.moveStart("character", 1);
                        if (n) {
                            e = c.document.$.body.createTextRange();
                            e.moveToElementText(n.$);
                            j.setEndPoint("EndToEnd", e);
                            j.moveEnd("character", -1)
                        } else {
                            h = g.getNext(d);
                            f = g.hasAscendant("pre");
                            h = !(h && h.getText && h.getText().match(e)) && (f || !g.hasPrevious() || g.getPrevious().is && g.getPrevious().is("br"));
                            f = c.document.createElement("span");
                            f.setHtml("&#65279;");
                            f.insertBefore(g);
                            h && c.document.createText("﻿").insertBefore(g)
                        }
                        c.setStartBefore(g);
                        g.remove();
                        if (b) {
                            if (h) {
                                j.moveStart("character", -1);
                                j.select();
                                c.document.$.selection.clear()
                            } else j.select();
                            c.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START);
                            f.remove()
                        } else {
                            c.setEndBefore(n);
                            n.remove();
                            j.select()
                        }
                    } else {
                        n = this.getNative();
                        if (!n)return;
                        if (CKEDITOR.env.opera) {
                            c = this.document.$.createRange();
                            c.selectNodeContents(this.root.$);
                            n.addRange(c)
                        }
                        this.removeAllRanges();
                        for (j = 0; j < b.length; j++) {
                            if (j < b.length - 1) {
                                c = b[j];
                                e = b[j + 1];
                                f = c.clone();
                                f.setStart(c.endContainer, c.endOffset);
                                f.setEnd(e.startContainer, e.startOffset);
                                if (!f.collapsed) {
                                    f.shrink(CKEDITOR.NODE_ELEMENT, true);
                                    h = f.getCommonAncestor();
                                    f = f.getEnclosedNode();
                                    if (h.isReadOnly() || f && f.isReadOnly()) {
                                        e.setStart(c.startContainer, c.startOffset);
                                        b.splice(j--, 1);
                                        continue
                                    }
                                }
                            }
                            c = b[j];
                            e = this.document.$.createRange();
                            h = c.startContainer;
                            if (CKEDITOR.env.opera && c.collapsed && h.type == CKEDITOR.NODE_ELEMENT) {
                                f = h.getChild(c.startOffset - 1);
                                d = h.getChild(c.startOffset);
                                if (!f && !d && h.is(CKEDITOR.dtd.$removeEmpty) || f && f.type == CKEDITOR.NODE_ELEMENT || d && d.type == CKEDITOR.NODE_ELEMENT) {
                                    c.insertNode(this.document.createText(""));
                                    c.collapse(1)
                                }
                            }
                            if (c.collapsed && CKEDITOR.env.webkit && a(c)) {
                                h = this.root;
                                i(h, false);
                                f = h.getDocument().createText("​");
                                h.setCustomData("cke-fillingChar", f);
                                c.insertNode(f);
                                if ((h = f.getNext()) && !f.getPrevious() && h.type == CKEDITOR.NODE_ELEMENT && h.getName() == "br") {
                                    i(this.root);
                                    c.moveToPosition(h, CKEDITOR.POSITION_BEFORE_START)
                                } else c.moveToPosition(f, CKEDITOR.POSITION_AFTER_END)
                            }
                            e.setStart(c.startContainer.$, c.startOffset);
                            try {
                                e.setEnd(c.endContainer.$, c.endOffset)
                            } catch (q) {
                                if (q.toString().indexOf("NS_ERROR_ILLEGAL_VALUE") >= 0) {
                                    c.collapse(1);
                                    e.setEnd(c.endContainer.$, c.endOffset)
                                } else throw q;
                            }
                            n.addRange(e)
                        }
                    }
                    this.reset();
                    this.root.fire("selectionchange")
                }
            }, fake: function (a) {
                var b = this.root.editor;
                e(b);
                var c = this._.cache, d = new CKEDITOR.dom.range(a.getDocument());
                d.setStartBefore(a);
                d.setEndAfter(a);
                c.ranges = new CKEDITOR.dom.rangeList(d);
                c.selectedElement = c.startElement = a;
                c.type = CKEDITOR.SELECTION_ELEMENT;
                c.selectedText = c.nativeSel = null;
                this.isFake = 1;
                this.rev = p++;
                b._.fakeSelection = this;
                this.root.fire("selectionchange")
            }, isHidden: function () {
                var a = this.getCommonAncestor();
                a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent());
                return !(!a || !a.data("cke-hidden-sel"))
            }, createBookmarks: function (a) {
                a = this.getRanges().createBookmarks(a);
                this.isFake && (a.isFake = 1);
                return a
            }, createBookmarks2: function (a) {
                a = this.getRanges().createBookmarks2(a);
                this.isFake && (a.isFake = 1);
                return a
            }, selectBookmarks: function (a) {
                for (var b = [], c = 0; c < a.length; c++) {
                    var d = new CKEDITOR.dom.range(this.root);
                    d.moveToBookmark(a[c]);
                    b.push(d)
                }
                a.isFake ? this.fake(b[0].getEnclosedNode()) : this.selectRanges(b);
                return this
            }, getCommonAncestor: function () {
                var a = this.getRanges();
                return !a.length ? null : a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer)
            }, scrollIntoView: function () {
                this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView()
            }, removeAllRanges: function () {
                var a = this.getNative();
                try {
                    a && a[m ? "empty" : "removeAllRanges"]()
                } catch (b) {
                }
                this.reset()
            }
        }
    }(),CKEDITOR.editor.prototype.attachStyleStateChange = function (c, f) {
        var b = this._.styleStateChangeCallbacks;
        if (!b) {
            b = this._.styleStateChangeCallbacks = [];
            this.on("selectionChange", function (a) {
                for (var c = 0; c < b.length; c++) {
                    var f = b[c], g = f.style.checkActive(a.data.path) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
                    f.fn.call(this, g)
                }
            })
        }
        b.push({style: c, fn: f})
    },CKEDITOR.STYLE_BLOCK = 1,CKEDITOR.STYLE_INLINE = 2,CKEDITOR.STYLE_OBJECT = 3,function () {
        function c(a, b) {
            for (var c, d; a = a.getParent();) {
                if (a.equals(b))break;
                if (a.getAttribute("data-nostyle"))c = a; else if (!d) {
                    var e = a.getAttribute("contentEditable");
                    e == "false" ? c = a : e == "true" && (d = 1)
                }
            }
            return c
        }

        function f(a) {
            var b = a.document;
            if (a.collapsed) {
                b = p(this, b);
                a.insertNode(b);
                a.moveToPosition(b, CKEDITOR.POSITION_BEFORE_END)
            } else {
                var d = this.element, e = this._.definition, g, h = e.ignoreReadonly, f = h || e.includeReadonly;
                f == void 0 && (f = a.root.getCustomData("cke_includeReadonly"));
                var i = CKEDITOR.dtd[d] || (g = true, CKEDITOR.dtd.span);
                a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
                a.trim();
                var j = a.createBookmark(), k = j.startNode, l = j.endNode, m = k, n;
                if (!h) {
                    var q = a.getCommonAncestor(), h = c(k, q), q = c(l, q);
                    h && (m = h.getNextSourceNode(true));
                    q && (l = q)
                }
                for (m.getPosition(l) == CKEDITOR.POSITION_FOLLOWING && (m = 0); m;) {
                    h = false;
                    if (m.equals(l)) {
                        m = null;
                        h = true
                    } else {
                        var r = m.type, t = r == CKEDITOR.NODE_ELEMENT ? m.getName() : null, q = t && m.getAttribute("contentEditable") == "false", y = t && m.getAttribute("data-nostyle");
                        if (t && m.data("cke-bookmark")) {
                            m = m.getNextSourceNode(true);
                            continue
                        }
                        if (!t || i[t] && !y && (!q || f) && (m.getPosition(l) | CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED) == CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IDENTICAL + CKEDITOR.POSITION_IS_CONTAINED && (!e.childRule || e.childRule(m))) {
                            var v = m.getParent();
                            if (v && ((v.getDtd() || CKEDITOR.dtd.span)[d] || g) && (!e.parentRule || e.parentRule(v))) {
                                if (!n && (!t || !CKEDITOR.dtd.$removeEmpty[t] || (m.getPosition(l) | CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED) == CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IDENTICAL + CKEDITOR.POSITION_IS_CONTAINED)) {
                                    n = a.clone();
                                    n.setStartBefore(m)
                                }
                                if (r == CKEDITOR.NODE_TEXT || q || r == CKEDITOR.NODE_ELEMENT && !m.getChildCount()) {
                                    for (var r = m, A; (h = !r.getNext(x)) && (A = r.getParent(), i[A.getName()]) && (A.getPosition(k) | CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED) == CKEDITOR.POSITION_FOLLOWING + CKEDITOR.POSITION_IDENTICAL + CKEDITOR.POSITION_IS_CONTAINED && (!e.childRule || e.childRule(A));)r = A;
                                    n.setEndAfter(r)
                                }
                            } else h = true
                        } else h = true;
                        m = m.getNextSourceNode(y || q && !f)
                    }
                    if (h && n && !n.collapsed) {
                        for (var h = p(this, b), q = h.hasAttributes(), y = n.getCommonAncestor(), r = {}, t = {}, v = {}, s = {}, u, w, T; h && y;) {
                            if (y.getName() == d) {
                                for (u in e.attributes)if (!s[u] && (T = y.getAttribute(w)))h.getAttribute(u) == T ? t[u] = 1 : s[u] = 1;
                                for (w in e.styles)if (!v[w] && (T = y.getStyle(w)))h.getStyle(w) == T ? r[w] = 1 : v[w] = 1
                            }
                            y = y.getParent()
                        }
                        for (u in t)h.removeAttribute(u);
                        for (w in r)h.removeStyle(w);
                        q && !h.hasAttributes() && (h = null);
                        if (h) {
                            n.extractContents().appendTo(h);
                            o.call(this, h);
                            n.insertNode(h);
                            h.mergeSiblings();
                            CKEDITOR.env.ie || h.$.normalize()
                        } else {
                            h = new CKEDITOR.dom.element("span");
                            n.extractContents().appendTo(h);
                            n.insertNode(h);
                            o.call(this, h);
                            h.remove(true)
                        }
                        n = null
                    }
                }
                a.moveToBookmark(j);
                a.shrink(CKEDITOR.SHRINK_TEXT)
            }
        }

        function b(a) {
            a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
            var b = a.createBookmark(), c = b.startNode;
            if (a.collapsed) {
                for (var d = new CKEDITOR.dom.elementPath(c.getParent(), a.root), e, g = 0, h; g < d.elements.length && (h = d.elements[g]); g++) {
                    if (h == d.block || h == d.blockLimit)break;
                    if (this.checkElementRemovable(h)) {
                        var f;
                        if (a.collapsed && (a.checkBoundaryOfElement(h, CKEDITOR.END) || (f = a.checkBoundaryOfElement(h, CKEDITOR.START)))) {
                            e = h;
                            e.match = f ? "start" : "end"
                        } else {
                            h.mergeSiblings();
                            h.getName() == this.element ? n.call(this, h) : q(h, y(this)[h.getName()])
                        }
                    }
                }
                if (e) {
                    h = c;
                    for (g = 0; ; g++) {
                        f = d.elements[g];
                        if (f.equals(e))break; else if (f.match)continue; else f = f.clone();
                        f.append(h);
                        h = f
                    }
                    h[e.match == "start" ? "insertBefore" : "insertAfter"](e)
                }
            } else {
                var i = b.endNode, j = this, d = function () {
                    for (var a = new CKEDITOR.dom.elementPath(c.getParent()), b = new CKEDITOR.dom.elementPath(i.getParent()), d = null, e = null, g = 0; g < a.elements.length; g++) {
                        var h = a.elements[g];
                        if (h == a.block || h == a.blockLimit)break;
                        j.checkElementRemovable(h) && (d = h)
                    }
                    for (g = 0; g < b.elements.length; g++) {
                        h = b.elements[g];
                        if (h == b.block || h == b.blockLimit)break;
                        j.checkElementRemovable(h) && (e = h)
                    }
                    e && i.breakParent(e);
                    d && c.breakParent(d)
                };
                d();
                for (e = c; !e.equals(i);) {
                    g = e.getNextSourceNode();
                    if (e.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(e)) {
                        e.getName() == this.element ? n.call(this, e) : q(e, y(this)[e.getName()]);
                        if (g.type == CKEDITOR.NODE_ELEMENT && g.contains(c)) {
                            d();
                            g = c.getNext()
                        }
                    }
                    e = g
                }
            }
            a.moveToBookmark(b)
        }

        function a(a) {
            var b = a.getEnclosedNode() || a.getCommonAncestor(false, true);
            (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && r(a, this)
        }

        function d(a) {
            var b = a.getCommonAncestor(true, true);
            if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
                var b = this._.definition, c = b.attributes;
                if (c)for (var d in c)a.removeAttribute(d, c[d]);
                if (b.styles)for (var e in b.styles)b.styles.hasOwnProperty(e) && a.removeStyle(e)
            }
        }

        function i(a) {
            var b = a.createBookmark(true), c = a.createIterator();
            c.enforceRealBlocks = true;
            if (this._.enterMode)c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
            for (var d, e = a.document; d = c.getNextParagraph();)if (!d.isReadOnly()) {
                var g = p(this, e, d);
                h(d, g)
            }
            a.moveToBookmark(b)
        }

        function g(a) {
            var b = a.createBookmark(1), c = a.createIterator();
            c.enforceRealBlocks = true;
            c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
            for (var d; d = c.getNextParagraph();)if (this.checkElementRemovable(d))if (d.is("pre")) {
                var e = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div");
                e && d.copyAttributes(e);
                h(d, e)
            } else n.call(this, d);
            a.moveToBookmark(b)
        }

        function h(a, b) {
            var c = !b;
            if (c) {
                b = a.getDocument().createElement("div");
                a.copyAttributes(b)
            }
            var d = b && b.is("pre"), g = a.is("pre"), h = !d && g;
            if (d && !g) {
                g = b;
                (h = a.getBogus()) && h.remove();
                h = a.getHtml();
                h = j(h, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "");
                h = h.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1");
                h = h.replace(/([ \t\n\r]+|&nbsp;)/g, " ");
                h = h.replace(/<br\b[^>]*>/gi, "\n");
                if (CKEDITOR.env.ie) {
                    var f = a.getDocument().createElement("div");
                    f.append(g);
                    g.$.outerHTML = "<pre>" + h + "</pre>";
                    g.copyAttributes(f.getFirst());
                    g = f.getFirst().remove()
                } else g.setHtml(h);
                b = g
            } else h ? b = k(c ? [a.getHtml()] : e(a), b) : a.moveChildren(b);
            b.replace(a);
            if (d) {
                var c = b, i;
                if ((i = c.getPrevious(B)) && i.is && i.is("pre")) {
                    d = j(i.getHtml(), /\n$/, "") + "\n\n" + j(c.getHtml(), /^\n/, "");
                    CKEDITOR.env.ie ? c.$.outerHTML = "<pre>" + d + "</pre>" : c.setHtml(d);
                    i.remove()
                }
            } else c && m(b)
        }

        function e(a) {
            a.getName();
            var b = [];
            j(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function (a, b, c) {
                return b + "</pre>" + c + "<pre>"
            }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function (a, c) {
                b.push(c)
            });
            return b
        }

        function j(a, b, c) {
            var d = "", e = "", a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function (a, b, c) {
                b && (d = b);
                c && (e = c);
                return ""
            });
            return d + a.replace(b, c) + e
        }

        function k(a, b) {
            var c;
            a.length > 1 && (c = new CKEDITOR.dom.documentFragment(b.getDocument()));
            for (var d = 0; d < a.length; d++) {
                var e = a[d], e = e.replace(/(\r\n|\r)/g, "\n"), e = j(e, /^[ \t]*\n/, ""), e = j(e, /\n$/, ""), e = j(e, /^[ \t]+|[ \t]+$/g, function (a, b) {
                    return a.length == 1 ? "&nbsp;" : b ? " " + CKEDITOR.tools.repeat("&nbsp;", a.length - 1) : CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " "
                }), e = e.replace(/\n/g, "<br>"), e = e.replace(/[ \t]{2,}/g, function (a) {
                    return CKEDITOR.tools.repeat("&nbsp;", a.length - 1) + " "
                });
                if (c) {
                    var g = b.clone();
                    g.setHtml(e);
                    c.append(g)
                } else b.setHtml(e)
            }
            return c || b
        }

        function n(a) {
            var b = this._.definition, c = b.attributes, b = b.styles, d = y(this)[a.getName()], e = CKEDITOR.tools.isEmpty(c) && CKEDITOR.tools.isEmpty(b), g;
            for (g in c)if (!((g == "class" || this._.definition.fullMatch) && a.getAttribute(g) != t(g, c[g]))) {
                e = a.hasAttribute(g);
                a.removeAttribute(g)
            }
            for (var h in b)if (!(this._.definition.fullMatch && a.getStyle(h) != t(h, b[h], true))) {
                e = e || !!a.getStyle(h);
                a.removeStyle(h)
            }
            q(a, d, s[a.getName()]);
            e && (this._.definition.alwaysRemoveElement ? m(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? m(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
        }

        function o(a) {
            for (var b = y(this), c = a.getElementsByTag(this.element), d = c.count(); --d >= 0;)n.call(this, c.getItem(d));
            for (var e in b)if (e != this.element) {
                c = a.getElementsByTag(e);
                for (d = c.count() - 1; d >= 0; d--) {
                    var g = c.getItem(d);
                    q(g, b[e])
                }
            }
        }

        function q(a, b, c) {
            if (b = b && b.attributes)for (var d = 0; d < b.length; d++) {
                var e = b[d][0], g;
                if (g = a.getAttribute(e)) {
                    var h = b[d][1];
                    (h === null || h.test && h.test(g) || typeof h == "string" && g == h) && a.removeAttribute(e)
                }
            }
            c || m(a)
        }

        function m(a, b) {
            if (!a.hasAttributes() || b)if (CKEDITOR.dtd.$block[a.getName()]) {
                var c = a.getPrevious(B), d = a.getNext(B);
                c && (c.type == CKEDITOR.NODE_TEXT || !c.isBlockBoundary({br: 1})) && a.append("br", 1);
                d && (d.type == CKEDITOR.NODE_TEXT || !d.isBlockBoundary({br: 1})) && a.append("br");
                a.remove(true)
            } else {
                c = a.getFirst();
                d = a.getLast();
                a.remove(true);
                if (c) {
                    c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings();
                    d && (!c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT) && d.mergeSiblings()
                }
            }
        }

        function p(a, b, c) {
            var d;
            d = a.element;
            d == "*" && (d = "span");
            d = new CKEDITOR.dom.element(d, b);
            c && c.copyAttributes(d);
            d = r(d, a);
            b.getCustomData("doc_processing_style") && d.hasAttribute("id") ? d.removeAttribute("id") : b.setCustomData("doc_processing_style", 1);
            return d
        }

        function r(a, b) {
            var c = b._.definition, d = c.attributes, c = CKEDITOR.style.getStyleText(c);
            if (d)for (var e in d)a.setAttribute(e, d[e]);
            c && a.setAttribute("style", c);
            return a
        }

        function l(a, b) {
            for (var c in a)a[c] = a[c].replace(u, function (a, c) {
                return b[c]
            })
        }

        function y(a) {
            if (a._.overrides)return a._.overrides;
            var b = a._.overrides = {}, c = a._.definition.overrides;
            if (c) {
                CKEDITOR.tools.isArray(c) || (c = [c]);
                for (var d = 0; d < c.length; d++) {
                    var e = c[d], g, h;
                    if (typeof e == "string")g = e.toLowerCase(); else {
                        g = e.element ? e.element.toLowerCase() : a.element;
                        h = e.attributes
                    }
                    e = b[g] || (b[g] = {});
                    if (h) {
                        var e = e.attributes = e.attributes || [], f;
                        for (f in h)e.push([f.toLowerCase(), h[f]])
                    }
                }
            }
            return b
        }

        function t(a, b, c) {
            var d = new CKEDITOR.dom.element("span");
            d[c ? "setStyle" : "setAttribute"](a, b);
            return d[c ? "getStyle" : "getAttribute"](a)
        }

        function A(a, b) {
            for (var c = a.document, d = a.getRanges(), e = b ? this.removeFromRange : this.applyToRange, g, h = d.createIterator(); g = h.getNextRange();)e.call(this, g);
            a.selectRanges(d);
            c.removeCustomData("doc_processing_style")
        }

        var s = {
            address: 1,
            div: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1,
            p: 1,
            pre: 1,
            section: 1,
            header: 1,
            footer: 1,
            nav: 1,
            article: 1,
            aside: 1,
            figure: 1,
            dialog: 1,
            hgroup: 1,
            time: 1,
            meter: 1,
            menu: 1,
            command: 1,
            keygen: 1,
            output: 1,
            progress: 1,
            details: 1,
            datagrid: 1,
            datalist: 1
        }, v = {
            a: 1,
            embed: 1,
            hr: 1,
            img: 1,
            li: 1,
            object: 1,
            ol: 1,
            table: 1,
            td: 1,
            tr: 1,
            th: 1,
            ul: 1,
            dl: 1,
            dt: 1,
            dd: 1,
            form: 1,
            audio: 1,
            video: 1
        }, w = /\s*(?:;\s*|$)/, u = /#\((.+?)\)/g, x = CKEDITOR.dom.walker.bookmark(0, 1), B = CKEDITOR.dom.walker.whitespaces(1);
        CKEDITOR.style = function (a, b) {
            var c = a.attributes;
            if (c && c.style) {
                a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style));
                delete c.style
            }
            if (b) {
                a = CKEDITOR.tools.clone(a);
                l(a.attributes, b);
                l(a.styles, b)
            }
            c = this.element = a.element ? typeof a.element == "string" ? a.element.toLowerCase() : a.element : "*";
            this.type = a.type || (s[c] ? CKEDITOR.STYLE_BLOCK : v[c] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE);
            if (typeof this.element == "object")this.type = CKEDITOR.STYLE_OBJECT;
            this._ = {definition: a}
        };
        CKEDITOR.editor.prototype.applyStyle = function (a) {
            A.call(a, this.getSelection())
        };
        CKEDITOR.editor.prototype.removeStyle = function (a) {
            A.call(a, this.getSelection(), 1)
        };
        CKEDITOR.style.prototype = {
            apply: function (a) {
                A.call(this, a.getSelection())
            }, remove: function (a) {
                A.call(this, a.getSelection(), 1)
            }, applyToRange: function (b) {
                return (this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? f : this.type == CKEDITOR.STYLE_BLOCK ? i : this.type == CKEDITOR.STYLE_OBJECT ? a : null).call(this, b)
            }, removeFromRange: function (a) {
                return (this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? b : this.type == CKEDITOR.STYLE_BLOCK ? g : this.type == CKEDITOR.STYLE_OBJECT ? d : null).call(this, a)
            }, applyToObject: function (a) {
                r(a, this)
            }, checkActive: function (a) {
                switch (this.type) {
                    case CKEDITOR.STYLE_BLOCK:
                        return this.checkElementRemovable(a.block || a.blockLimit, true);
                    case CKEDITOR.STYLE_OBJECT:
                    case CKEDITOR.STYLE_INLINE:
                        for (var b = a.elements, c = 0, d; c < b.length; c++) {
                            d = b[c];
                            if (!(this.type == CKEDITOR.STYLE_INLINE && (d == a.block || d == a.blockLimit))) {
                                if (this.type == CKEDITOR.STYLE_OBJECT) {
                                    var e = d.getName();
                                    if (!(typeof this.element == "string" ? e == this.element : e in this.element))continue
                                }
                                if (this.checkElementRemovable(d, true))return true
                            }
                        }
                }
                return false
            }, checkApplicable: function (a) {
                switch (this.type) {
                    case CKEDITOR.STYLE_OBJECT:
                        return a.contains(this.element)
                }
                return true
            }, checkElementMatch: function (a, b) {
                var c = this._.definition;
                if (!a || !c.ignoreReadonly && a.isReadOnly())return false;
                var d = a.getName();
                if (typeof this.element == "string" ? d == this.element : d in this.element) {
                    if (!b && !a.hasAttributes())return true;
                    if (d = c._AC)c = d; else {
                        var d = {}, e = 0, g = c.attributes;
                        if (g)for (var h in g) {
                            e++;
                            d[h] = g[h]
                        }
                        if (h = CKEDITOR.style.getStyleText(c)) {
                            d.style || e++;
                            d.style = h
                        }
                        d._length = e;
                        c = c._AC = d
                    }
                    if (c._length) {
                        for (var f in c)if (f != "_length") {
                            e = a.getAttribute(f) || "";
                            if (f == "style")a:{
                                d = c[f];
                                typeof d == "string" && (d = CKEDITOR.tools.parseCssText(d));
                                typeof e == "string" && (e = CKEDITOR.tools.parseCssText(e, true));
                                h = void 0;
                                for (h in d)if (!(h in e && (e[h] == d[h] || d[h] == "inherit" || e[h] == "inherit"))) {
                                    d = false;
                                    break a
                                }
                                d = true
                            } else d = c[f] == e;
                            if (d) {
                                if (!b)return true
                            } else if (b)return false
                        }
                        if (b)return true
                    } else return true
                }
                return false
            }, checkElementRemovable: function (a, b) {
                if (this.checkElementMatch(a, b))return true;
                var c = y(this)[a.getName()];
                if (c) {
                    var d;
                    if (!(c = c.attributes))return true;
                    for (var e = 0; e < c.length; e++) {
                        d = c[e][0];
                        if (d = a.getAttribute(d)) {
                            var g = c[e][1];
                            if (g === null || typeof g == "string" && d == g || g.test(d))return true
                        }
                    }
                }
                return false
            }, buildPreview: function (a) {
                var b = this._.definition, c = [], d = b.element;
                d == "bdo" && (d = "span");
                var c = ["<", d], e = b.attributes;
                if (e)for (var g in e)c.push(" ", g, '="', e[g], '"');
                (e = CKEDITOR.style.getStyleText(b)) && c.push(' style="', e, '"');
                c.push(">", a || b.name, "</", d, ">");
                return c.join("")
            }, getDefinition: function () {
                return this._.definition
            }
        };
        CKEDITOR.style.getStyleText = function (a) {
            var b = a._ST;
            if (b)return b;
            var b = a.styles, c = a.attributes && a.attributes.style || "", d = "";
            c.length && (c = c.replace(w, ";"));
            for (var e in b) {
                var g = b[e], h = (e + ":" + g).replace(w, ";");
                g == "inherit" ? d = d + h : c = c + h
            }
            c.length && (c = CKEDITOR.tools.normalizeCssText(c, true));
            return a._ST = c + d
        }
    }(),CKEDITOR.styleCommand = function (c, f) {
        this.requiredContent = this.allowedContent = this.style = c;
        CKEDITOR.tools.extend(this, f, true)
    },CKEDITOR.styleCommand.prototype.exec = function (c) {
        c.focus();
        this.state == CKEDITOR.TRISTATE_OFF ? c.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && c.removeStyle(this.style)
    },CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"),CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet),CKEDITOR.loadStylesSet = function (c, f, b) {
        CKEDITOR.stylesSet.addExternal(c, f, "");
        CKEDITOR.stylesSet.load(c, b)
    },CKEDITOR.editor.prototype.getStylesSet = function (c) {
        if (this._.stylesDefinitions)c(this._.stylesDefinitions); else {
            var f = this, b = f.config.stylesCombo_stylesSet || f.config.stylesSet;
            if (b === false)c(null); else if (b instanceof Array) {
                f._.stylesDefinitions = b;
                c(b)
            } else {
                b || (b = "default");
                var b = b.split(":"), a = b[0];
                CKEDITOR.stylesSet.addExternal(a, b[1] ? b.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), "");
                CKEDITOR.stylesSet.load(a, function (b) {
                    f._.stylesDefinitions = b[a];
                    c(f._.stylesDefinitions)
                })
            }
        }
    },CKEDITOR.dom.comment = function (c, f) {
        typeof c == "string" && (c = (f ? f.$ : document).createComment(c));
        CKEDITOR.dom.domObject.call(this, c)
    },CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node,CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, {
        type: CKEDITOR.NODE_COMMENT,
        getOuterHtml: function () {
            return "<\!--" + this.$.nodeValue + "--\>"
        }
    }),"use strict",function () {
        var c = {}, f = {}, b;
        for (b in CKEDITOR.dtd.$blockLimit)b in CKEDITOR.dtd.$list || (c[b] = 1);
        for (b in CKEDITOR.dtd.$block)b in CKEDITOR.dtd.$blockLimit || b in CKEDITOR.dtd.$empty || (f[b] = 1);
        CKEDITOR.dom.elementPath = function (a, b) {
            var i = null, g = null, h = [], e = a, j, b = b || a.getDocument().getBody();
            do if (e.type == CKEDITOR.NODE_ELEMENT) {
                h.push(e);
                if (!this.lastElement) {
                    this.lastElement = e;
                    if (e.is(CKEDITOR.dtd.$object))continue
                }
                if (e.equals(b))break;
                if (!g) {
                    j = e.getName();
                    e.getAttribute("contenteditable") == "true" ? g = e : !i && f[j] && (i = e);
                    if (c[j]) {
                        var k;
                        if (k = !i) {
                            if (j = j == "div") {
                                a:{
                                    j = e.getChildren();
                                    k = 0;
                                    for (var n = j.count(); k < n; k++) {
                                        var o = j.getItem(k);
                                        if (o.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[o.getName()]) {
                                            j = true;
                                            break a
                                        }
                                    }
                                    j = false
                                }
                                j = !j
                            }
                            k = j
                        }
                        k ? i = e : g = e
                    }
                }
            } while (e = e.getParent());
            g || (g = b);
            this.block = i;
            this.blockLimit = g;
            this.root = b;
            this.elements = h
        }
    }(),CKEDITOR.dom.elementPath.prototype = {
        compare: function (c) {
            var f = this.elements, c = c && c.elements;
            if (!c || f.length != c.length)return false;
            for (var b = 0; b < f.length; b++)if (!f[b].equals(c[b]))return false;
            return true
        }, contains: function (c, f, b) {
            var a;
            typeof c == "string" && (a = function (a) {
                return a.getName() == c
            });
            c instanceof CKEDITOR.dom.element ? a = function (a) {
                return a.equals(c)
            } : CKEDITOR.tools.isArray(c) ? a = function (a) {
                return CKEDITOR.tools.indexOf(c, a.getName()) > -1
            } : typeof c == "function" ? a = c : typeof c == "object" && (a = function (a) {
                return a.getName()in c
            });
            var d = this.elements, i = d.length;
            f && i--;
            if (b) {
                d = Array.prototype.slice.call(d, 0);
                d.reverse()
            }
            for (f = 0; f < i; f++)if (a(d[f]))return d[f];
            return null
        }, isContextFor: function (c) {
            var f;
            if (c in CKEDITOR.dtd.$block) {
                f = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit;
                return !!f.getDtd()[c]
            }
            return true
        }, direction: function () {
            return (this.block || this.blockLimit || this.root).getDirection(1)
        }
    },CKEDITOR.dom.text = function (c, f) {
        typeof c == "string" && (c = (f ? f.$ : document).createTextNode(c));
        this.$ = c
    },CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node,CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
        type: CKEDITOR.NODE_TEXT,
        getLength: function () {
            return this.$.nodeValue.length
        },
        getText: function () {
            return this.$.nodeValue
        },
        setText: function (c) {
            this.$.nodeValue = c
        },
        split: function (c) {
            var f = this.$.parentNode, b = f.childNodes.length, a = this.getLength(), d = this.getDocument(), i = new CKEDITOR.dom.text(this.$.splitText(c), d);
            if (f.childNodes.length == b)if (c >= a) {
                i = d.createText("");
                i.insertAfter(this)
            } else {
                c = d.createText("");
                c.insertAfter(i);
                c.remove()
            }
            return i
        },
        substring: function (c, f) {
            return typeof f != "number" ? this.$.nodeValue.substr(c) : this.$.nodeValue.substring(c, f)
        }
    }),function () {
        function c(b, a, c) {
            var f = b.serializable, g = a[c ? "endContainer" : "startContainer"], h = c ? "endOffset" : "startOffset", e = f ? a.document.getById(b.startNode) : b.startNode, b = f ? a.document.getById(b.endNode) : b.endNode;
            if (g.equals(e.getPrevious())) {
                a.startOffset = a.startOffset - g.getLength() - b.getPrevious().getLength();
                g = b.getNext()
            } else if (g.equals(b.getPrevious())) {
                a.startOffset = a.startOffset - g.getLength();
                g = b.getNext()
            }
            g.equals(e.getParent()) && a[h]++;
            g.equals(b.getParent()) && a[h]++;
            a[c ? "endContainer" : "startContainer"] = g;
            return a
        }

        CKEDITOR.dom.rangeList = function (b) {
            if (b instanceof CKEDITOR.dom.rangeList)return b;
            b ? b instanceof CKEDITOR.dom.range && (b = [b]) : b = [];
            return CKEDITOR.tools.extend(b, f)
        };
        var f = {
            createIterator: function () {
                var b = this, a = CKEDITOR.dom.walker.bookmark(), c = [], f;
                return {
                    getNextRange: function (g) {
                        f = f == void 0 ? 0 : f + 1;
                        var h = b[f];
                        if (h && b.length > 1) {
                            if (!f)for (var e = b.length - 1; e >= 0; e--)c.unshift(b[e].createBookmark(true));
                            if (g)for (var j = 0; b[f + j + 1];) {
                                for (var k = h.document, g = 0, e = k.getById(c[j].endNode), k = k.getById(c[j + 1].startNode); ;) {
                                    e = e.getNextSourceNode(false);
                                    if (k.equals(e))g = 1; else if (a(e) || e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary())continue;
                                    break
                                }
                                if (!g)break;
                                j++
                            }
                            for (h.moveToBookmark(c.shift()); j--;) {
                                e = b[++f];
                                e.moveToBookmark(c.shift());
                                h.setEnd(e.endContainer, e.endOffset)
                            }
                        }
                        return h
                    }
                }
            }, createBookmarks: function (b) {
                for (var a = [], d, f = 0; f < this.length; f++) {
                    a.push(d = this[f].createBookmark(b, true));
                    for (var g = f + 1; g < this.length; g++) {
                        this[g] = c(d, this[g]);
                        this[g] = c(d, this[g], true)
                    }
                }
                return a
            }, createBookmarks2: function (b) {
                for (var a = [], c = 0; c < this.length; c++)a.push(this[c].createBookmark2(b));
                return a
            }, moveToBookmarks: function (b) {
                for (var a = 0; a < this.length; a++)this[a].moveToBookmark(b[a])
            }
        }
    }(),function () {
        function c() {
            return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/")
        }

        function f(a) {
            var b = CKEDITOR.skin["ua_" + a], d = CKEDITOR.env;
            if (b)for (var b = b.split(",").sort(function (a, b) {
                return a > b ? -1 : 1
            }), e = 0, g; e < b.length; e++) {
                g = b[e];
                if (d.ie && (g.replace(/^ie/, "") == d.version || d.quirks && g == "iequirks"))g = "ie";
                if (d[g]) {
                    a = a + ("_" + b[e]);
                    break
                }
            }
            return CKEDITOR.getUrl(c() + a + ".css")
        }

        function b(a, b) {
            if (!i[a]) {
                CKEDITOR.document.appendStyleSheet(f(a));
                i[a] = 1
            }
            b && b()
        }

        function a(a) {
            var b = a.getById(g);
            if (!b) {
                b = a.getHead().append("style");
                b.setAttribute("id", g);
                b.setAttribute("type", "text/css")
            }
            return b
        }

        function d(a, b, c) {
            var d, e, g;
            if (CKEDITOR.env.webkit) {
                b = b.split("}").slice(0, -1);
                for (e = 0; e < b.length; e++)b[e] = b[e].split("{")
            }
            for (var h = 0; h < a.length; h++)if (CKEDITOR.env.webkit)for (e = 0; e < b.length; e++) {
                g = b[e][1];
                for (d = 0; d < c.length; d++)g = g.replace(c[d][0], c[d][1]);
                a[h].$.sheet.addRule(b[e][0], g)
            } else {
                g = b;
                for (d = 0; d < c.length; d++)g = g.replace(c[d][0], c[d][1]);
                CKEDITOR.env.ie ? a[h].$.styleSheet.cssText = a[h].$.styleSheet.cssText + g : a[h].$.innerHTML = a[h].$.innerHTML +
                g
            }
        }

        var i = {};
        CKEDITOR.skin = {
            path: c, loadPart: function (a, d) {
                CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(c() + "skin.js"), function () {
                    b(a, d)
                }) : b(a, d)
            }, getPath: function (a) {
                return CKEDITOR.getUrl(f(a))
            }, icons: {}, addIcon: function (a, b, c, d) {
                a = a.toLowerCase();
                this.icons[a] || (this.icons[a] = {path: b, offset: c || 0, bgsize: d || "16px"})
            }, getIconStyle: function (a, b, c, d, e) {
                var g;
                if (a) {
                    a = a.toLowerCase();
                    b && (g = this.icons[a + "-rtl"]);
                    g || (g = this.icons[a])
                }
                a = c || g && g.path || "";
                d = d || g && g.offset;
                e = e || g && g.bgsize || "16px";
                return a && "background-image:url(" + CKEDITOR.getUrl(a) + ");background-position:0 " + d + "px;background-size:" + e + ";"
            }
        };
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            getUiColor: function () {
                return this.uiColor
            }, setUiColor: function (b) {
                var c = a(CKEDITOR.document);
                return (this.setUiColor = function (a) {
                    var b = CKEDITOR.skin.chameleon, g = [[e, a]];
                    this.uiColor = a;
                    d([c], b(this, "editor"), g);
                    d(h, b(this, "panel"), g)
                }).call(this, b)
            }
        });
        var g = "cke_ui_color", h = [], e = /\$color/g;
        CKEDITOR.on("instanceLoaded", function (b) {
            if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
                var c = b.editor, b = function (b) {
                    b = (b.data[0] || b.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();
                    if (!b.getById("cke_ui_color")) {
                        b = a(b);
                        h.push(b);
                        var g = c.getUiColor();
                        g && d([b], CKEDITOR.skin.chameleon(c, "panel"), [[e, g]])
                    }
                };
                c.on("panelShow", b);
                c.on("menuShow", b);
                c.config.uiColor && c.setUiColor(c.config.uiColor)
            }
        })
    }(),function () {
        if (CKEDITOR.env.webkit)CKEDITOR.env.hc = false; else {
            var c = CKEDITOR.dom.element.createFromHtml('<div style="width:0px;height:0px;position:absolute;left:-10000px;border: 1px solid;border-color: red blue;"></div>', CKEDITOR.document);
            c.appendTo(CKEDITOR.document.getHead());
            try {
                CKEDITOR.env.hc = c.getComputedStyle("border-top-color") == c.getComputedStyle("border-right-color")
            } catch (f) {
                CKEDITOR.env.hc = false
            }
            c.remove()
        }
        if (CKEDITOR.env.hc)CKEDITOR.env.cssClass = CKEDITOR.env.cssClass + " cke_hc";
        CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");
        CKEDITOR.status = "loaded";
        CKEDITOR.fireOnce("loaded");
        if (c = CKEDITOR._.pending) {
            delete CKEDITOR._.pending;
            for (var b = 0; b < c.length; b++) {
                CKEDITOR.editor.prototype.constructor.apply(c[b][0], c[b][1]);
                CKEDITOR.add(c[b][0])
            }
        }
    }(),CKEDITOR.skin.name = "moono",CKEDITOR.skin.ua_editor = "ie,iequirks,ie7,ie8,gecko",CKEDITOR.skin.ua_dialog = "ie,iequirks,ie7,ie8,opera",CKEDITOR.skin.chameleon = function () {
        var c = function () {
            return function (a, b) {
                for (var c = a.match(/[^#]./g), g = 0; g < 3; g++) {
                    var h = c, e = g, f;
                    f = parseInt(c[g], 16);
                    f = ("0" + (b < 0 ? 0 | f * (1 + b) : 0 | f + (255 - f) * b).toString(16)).slice(-2);
                    h[e] = f
                }
                return "#" + c.join("")
            }
        }(), f = function () {
            var a = new CKEDITOR.template("background:#{to};background-image:-webkit-gradient(linear,lefttop,leftbottom,from({from}),to({to}));background-image:-moz-linear-gradient(top,{from},{to});background-image:-webkit-linear-gradient(top,{from},{to});background-image:-o-linear-gradient(top,{from},{to});background-image:-ms-linear-gradient(top,{from},{to});background-image:linear-gradient(top,{from},{to});filter:progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr='{from}',endColorstr='{to}');");
            return function (b, c) {
                return a.output({from: b, to: c})
            }
        }(), b = {
            editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ {defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_bottom [{defaultGradient}border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [{defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [{defaultGradient}outline-color:{defaultBorder};border-top-color:{defaultBorder};] {id} .cke_dialog_tab [{lightGradient}border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [{mediumGradient}] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} .cke_toolgroup [{lightGradient}border-color:{defaultBorder};] {id} a.cke_button_off:hover, {id} a.cke_button_off:focus, {id} a.cke_button_off:active [{mediumGradient}] {id} .cke_button_on [{ckeButtonOn}] {id} .cke_toolbar_separator [background-color: {ckeToolbarSeparator};] {id} .cke_combo_button [border-color:{defaultBorder};{lightGradient}] {id} a.cke_combo_button:hover, {id} a.cke_combo_button:focus, {id} .cke_combo_on a.cke_combo_button [border-color:{defaultBorder};{mediumGradient}] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover, {id} a.cke_path_item:focus, {id} a.cke_path_item:active [background-color:{elementsPathBg};] {id}.cke_panel [border-color:{defaultBorder};] "),
            panel: new CKEDITOR.template(".cke_panel_grouptitle [{lightGradient}border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:focus.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:focus.cke_colorauto, a:focus.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
        };
        return function (a, d) {
            var i = a.uiColor, i = {
                id: "." + a.id,
                defaultBorder: c(i, -0.1),
                defaultGradient: f(c(i, 0.9), i),
                lightGradient: f(c(i, 1), c(i, 0.7)),
                mediumGradient: f(c(i, 0.8), c(i, 0.5)),
                ckeButtonOn: f(c(i, 0.6), c(i, 0.7)),
                ckeResizer: c(i, -0.4),
                ckeToolbarSeparator: c(i, 0.5),
                ckeColorauto: c(i, 0.8),
                dialogBody: c(i, 0.7),
                dialogTabSelected: f("#FFFFFF", "#FFFFFF"),
                dialogTabSelectedBorder: "#FFF",
                elementsPathColor: c(i, -0.6),
                elementsPathBg: i,
                menubuttonIcon: c(i, 0.5),
                menubuttonIconHover: c(i, 0.3)
            };
            return b[d].output(i).replace(/\[/g, "{").replace(/\]/g, "}")
        }
    }(),CKEDITOR.plugins.add("dialogui", {
        onLoad: function () {
            var c = function (a) {
                this._ || (this._ = {});
                this._["default"] = this._.initValue = a["default"] || "";
                this._.required = a.required || false;
                for (var b = [this._], c = 1; c < arguments.length; c++)b.push(arguments[c]);
                b.push(true);
                CKEDITOR.tools.extend.apply(CKEDITOR.tools, b);
                return this._
            }, f = {
                build: function (a, b, c) {
                    return new CKEDITOR.ui.dialog.textInput(a, b, c)
                }
            }, b = {
                build: function (a, b, c) {
                    return new CKEDITOR.ui.dialog[b.type](a, b, c)
                }
            }, a = {
                isChanged: function () {
                    return this.getValue() != this.getInitValue()
                }, reset: function (a) {
                    this.setValue(this.getInitValue(), a)
                }, setInitValue: function () {
                    this._.initValue = this.getValue()
                }, resetInitValue: function () {
                    this._.initValue = this._["default"]
                }, getInitValue: function () {
                    return this._.initValue
                }
            }, d = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                onChange: function (a, b) {
                    if (!this._.domOnChangeRegistered) {
                        a.on("load", function () {
                            this.getInputElement().on("change", function () {
                                a.parts.dialog.isVisible() && this.fire("change", {value: this.getValue()})
                            }, this)
                        }, this);
                        this._.domOnChangeRegistered = true
                    }
                    this.on("change", b)
                }
            }, true), i = /^on([A-Z]\w+)/, g = function (a) {
                for (var b in a)(i.test(b) || b == "title" || b == "type") && delete a[b];
                return a
            };
            CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                labeledElement: function (a, b, d, g) {
                    if (!(arguments.length < 4)) {
                        var f = c.call(this, b);
                        f.labelId = CKEDITOR.tools.getNextId() + "_label";
                        this._.children = [];
                        CKEDITOR.ui.dialog.uiElement.call(this, a, b, d, "div", null, {role: "presentation"}, function () {
                            var c = [], d = b.required ? " cke_required" : "";
                            if (b.labelLayout != "horizontal")c.push('<label class="cke_dialog_ui_labeled_label' + d + '" ', ' id="' + f.labelId + '"', f.inputId ? ' for="' + f.inputId + '"' : "", (b.labelStyle ? ' style="' + b.labelStyle + '"' : "") + ">", b.label, "</label>", '<div class="cke_dialog_ui_labeled_content"' + (b.controlStyle ? ' style="' + b.controlStyle + '"' : "") + ' role="presentation">', g.call(this, a, b), "</div>"); else {
                                d = {
                                    type: "hbox",
                                    widths: b.widths,
                                    padding: 0,
                                    children: [{
                                        type: "html",
                                        html: '<label class="cke_dialog_ui_labeled_label' + d + '" id="' + f.labelId + '" for="' + f.inputId + '"' + (b.labelStyle ? ' style="' + b.labelStyle + '"' : "") + ">" + CKEDITOR.tools.htmlEncode(b.label) + "</span>"
                                    }, {
                                        type: "html",
                                        html: '<span class="cke_dialog_ui_labeled_content"' + (b.controlStyle ? ' style="' + b.controlStyle + '"' : "") + ">" + g.call(this, a, b) + "</span>"
                                    }]
                                };
                                CKEDITOR.dialog._.uiElementBuilders.hbox.build(a, d, c)
                            }
                            return c.join("")
                        })
                    }
                }, textInput: function (a, b, d) {
                    if (!(arguments.length < 3)) {
                        c.call(this, b);
                        var g = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput", f = {
                            "class": "cke_dialog_ui_input_" +
                            b.type, id: g, type: b.type
                        };
                        if (b.validate)this.validate = b.validate;
                        if (b.maxLength)f.maxlength = b.maxLength;
                        if (b.size)f.size = b.size;
                        if (b.inputStyle)f.style = b.inputStyle;
                        var i = this, q = false;
                        a.on("load", function () {
                            i.getInputElement().on("keydown", function (a) {
                                a.data.getKeystroke() == 13 && (q = true)
                            });
                            i.getInputElement().on("keyup", function (b) {
                                if (b.data.getKeystroke() == 13 && q) {
                                    a.getButton("ok") && setTimeout(function () {
                                        a.getButton("ok").click()
                                    }, 0);
                                    q = false
                                }
                            }, null, null, 1E3)
                        });
                        CKEDITOR.ui.dialog.labeledElement.call(this, a, b, d, function () {
                            var a = ['<div class="cke_dialog_ui_input_', b.type, '" role="presentation"'];
                            b.width && a.push('style="width:' + b.width + '" ');
                            a.push("><input ");
                            f["aria-labelledby"] = this._.labelId;
                            this._.required && (f["aria-required"] = this._.required);
                            for (var c in f)a.push(c + '="' + f[c] + '" ');
                            a.push(" /></div>");
                            return a.join("")
                        })
                    }
                }, textarea: function (a, b, d) {
                    if (!(arguments.length < 3)) {
                        c.call(this, b);
                        var g = this, f = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea", i = {};
                        if (b.validate)this.validate = b.validate;
                        i.rows = b.rows || 5;
                        i.cols = b.cols || 20;
                        i["class"] = "cke_dialog_ui_input_textarea " + (b["class"] || "");
                        if (typeof b.inputStyle != "undefined")i.style = b.inputStyle;
                        if (b.dir)i.dir = b.dir;
                        CKEDITOR.ui.dialog.labeledElement.call(this, a, b, d, function () {
                            i["aria-labelledby"] = this._.labelId;
                            this._.required && (i["aria-required"] = this._.required);
                            var a = ['<div class="cke_dialog_ui_input_textarea" role="presentation"><textarea id="', f, '" '], b;
                            for (b in i)a.push(b + '="' + CKEDITOR.tools.htmlEncode(i[b]) + '" ');
                            a.push(">", CKEDITOR.tools.htmlEncode(g._["default"]), "</textarea></div>");
                            return a.join("")
                        })
                    }
                }, checkbox: function (a, b, d) {
                    if (!(arguments.length < 3)) {
                        var f = c.call(this, b, {"default": !!b["default"]});
                        if (b.validate)this.validate = b.validate;
                        CKEDITOR.ui.dialog.uiElement.call(this, a, b, d, "span", null, null, function () {
                            var c = CKEDITOR.tools.extend({}, b, {id: b.id ? b.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox"}, true), d = [], i = CKEDITOR.tools.getNextId() + "_label", j = {
                                "class": "cke_dialog_ui_checkbox_input",
                                type: "checkbox",
                                "aria-labelledby": i
                            };
                            g(c);
                            if (b["default"])j.checked = "checked";
                            if (typeof c.inputStyle != "undefined")c.style = c.inputStyle;
                            f.checkbox = new CKEDITOR.ui.dialog.uiElement(a, c, d, "input", null, j);
                            d.push(' <label id="', i, '" for="', j.id, '"' + (b.labelStyle ? ' style="' + b.labelStyle + '"' : "") + ">", CKEDITOR.tools.htmlEncode(b.label), "</label>");
                            return d.join("")
                        })
                    }
                }, radio: function (a, b, d) {
                    if (!(arguments.length < 3)) {
                        c.call(this, b);
                        if (!this._["default"])this._["default"] = this._.initValue = b.items[0][1];
                        if (b.validate)this.validate = b.valdiate;
                        var f = [], i = this;
                        CKEDITOR.ui.dialog.labeledElement.call(this, a, b, d, function () {
                            for (var c = [], d = [], j = b.id ? b.id + "_radio" : CKEDITOR.tools.getNextId() + "_radio", p = 0; p < b.items.length; p++) {
                                var r = b.items[p], l = r[2] !== void 0 ? r[2] : r[0], y = r[1] !== void 0 ? r[1] : r[0], t = CKEDITOR.tools.getNextId() + "_radio_input", A = t + "_label", t = CKEDITOR.tools.extend({}, b, {
                                    id: t,
                                    title: null,
                                    type: null
                                }, true), l = CKEDITOR.tools.extend({}, t, {title: l}, true), s = {
                                    type: "radio",
                                    "class": "cke_dialog_ui_radio_input",
                                    name: j,
                                    value: y,
                                    "aria-labelledby": A
                                }, v = [];
                                if (i._["default"] == y)s.checked = "checked";
                                g(t);
                                g(l);
                                if (typeof t.inputStyle != "undefined")t.style = t.inputStyle;
                                f.push(new CKEDITOR.ui.dialog.uiElement(a, t, v, "input", null, s));
                                v.push(" ");
                                new CKEDITOR.ui.dialog.uiElement(a, l, v, "label", null, {id: A, "for": s.id}, r[0]);
                                c.push(v.join(""))
                            }
                            new CKEDITOR.ui.dialog.hbox(a, f, c, d);
                            return d.join("")
                        });
                        this._.children = f
                    }
                }, button: function (a, b, d) {
                    if (arguments.length) {
                        typeof b == "function" && (b = b(a.getParentEditor()));
                        c.call(this, b, {disabled: b.disabled || false});
                        CKEDITOR.event.implementOn(this);
                        var g = this;
                        a.on("load", function () {
                            var a = this.getElement();
                            (function () {
                                a.on("click", function (a) {
                                    g.click();
                                    a.data.preventDefault()
                                });
                                a.on("keydown", function (a) {
                                    if (a.data.getKeystroke()in{32: 1}) {
                                        g.click();
                                        a.data.preventDefault()
                                    }
                                })
                            })();
                            a.unselectable()
                        }, this);
                        var f = CKEDITOR.tools.extend({}, b);
                        delete f.style;
                        var i = CKEDITOR.tools.getNextId() + "_label";
                        CKEDITOR.ui.dialog.uiElement.call(this, a, f, d, "a", null, {
                            style: b.style,
                            href: "javascript:void(0)",
                            title: b.label,
                            hidefocus: "true",
                            "class": b["class"],
                            role: "button",
                            "aria-labelledby": i
                        }, '<span id="' + i + '" class="cke_dialog_ui_button">' +
                        CKEDITOR.tools.htmlEncode(b.label) + "</span>")
                    }
                }, select: function (a, b, d) {
                    if (!(arguments.length < 3)) {
                        var f = c.call(this, b);
                        if (b.validate)this.validate = b.validate;
                        f.inputId = CKEDITOR.tools.getNextId() + "_select";
                        CKEDITOR.ui.dialog.labeledElement.call(this, a, b, d, function () {
                            var c = CKEDITOR.tools.extend({}, b, {id: b.id ? b.id + "_select" : CKEDITOR.tools.getNextId() + "_select"}, true), d = [], i = [], j = {
                                id: f.inputId,
                                "class": "cke_dialog_ui_input_select",
                                "aria-labelledby": this._.labelId
                            };
                            d.push('<div class="cke_dialog_ui_input_', b.type, '" role="presentation"');
                            b.width && d.push('style="width:' + b.width + '" ');
                            d.push(">");
                            if (b.size != void 0)j.size = b.size;
                            if (b.multiple != void 0)j.multiple = b.multiple;
                            g(c);
                            for (var p = 0, r; p < b.items.length && (r = b.items[p]); p++)i.push('<option value="', CKEDITOR.tools.htmlEncode(r[1] !== void 0 ? r[1] : r[0]).replace(/"/g, "&quot;"), '" /> ', CKEDITOR.tools.htmlEncode(r[0]));
                            if (typeof c.inputStyle != "undefined")c.style = c.inputStyle;
                            f.select = new CKEDITOR.ui.dialog.uiElement(a, c, d, "select", null, j, i.join(""));
                            d.push("</div>");
                            return d.join("")
                        })
                    }
                }, file: function (a, b, d) {
                    if (!(arguments.length < 3)) {
                        b["default"] === void 0 && (b["default"] = "");
                        var g = CKEDITOR.tools.extend(c.call(this, b), {definition: b, buttons: []});
                        if (b.validate)this.validate = b.validate;
                        a.on("load", function () {
                            CKEDITOR.document.getById(g.frameId).getParent().addClass("cke_dialog_ui_input_file")
                        });
                        CKEDITOR.ui.dialog.labeledElement.call(this, a, b, d, function () {
                            g.frameId = CKEDITOR.tools.getNextId() + "_fileInput";
                            var a = ['<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" role="presentation" id="', g.frameId, '" title="', b.label, '" src="javascript:void('];
                            a.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0");
                            a.push(')"></iframe>');
                            return a.join("")
                        })
                    }
                }, fileButton: function (a, b, d) {
                    if (!(arguments.length < 3)) {
                        c.call(this, b);
                        var g = this;
                        if (b.validate)this.validate = b.validate;
                        var f = CKEDITOR.tools.extend({}, b), i = f.onClick;
                        f.className = (f.className ? f.className + " " : "") + "cke_dialog_ui_button";
                        f.onClick = function (c) {
                            var d = b["for"];
                            if (!i || i.call(this, c) !== false) {
                                a.getContentElement(d[0], d[1]).submit();
                                this.disable()
                            }
                        };
                        a.on("load", function () {
                            a.getContentElement(b["for"][0], b["for"][1])._.buttons.push(g)
                        });
                        CKEDITOR.ui.dialog.button.call(this, a, f, d)
                    }
                }, html: function () {
                    var a = /^\s*<[\w:]+\s+([^>]*)?>/, b = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/, c = /\/$/;
                    return function (d, g, f) {
                        if (!(arguments.length < 3)) {
                            var i = [], m = g.html;
                            m.charAt(0) != "<" && (m = "<span>" + m + "</span>");
                            var p = g.focus;
                            if (p) {
                                var r = this.focus;
                                this.focus = function () {
                                    (typeof p == "function" ? p : r).call(this);
                                    this.fire("focus")
                                };
                                if (g.isFocusable)this.isFocusable = this.isFocusable;
                                this.keyboardFocusable = true
                            }
                            CKEDITOR.ui.dialog.uiElement.call(this, d, g, i, "span", null, null, "");
                            i = i.join("").match(a);
                            m = m.match(b) || ["", "", ""];
                            if (c.test(m[1])) {
                                m[1] = m[1].slice(0, -1);
                                m[2] = "/" + m[2]
                            }
                            f.push([m[1], " ", i[1] || "", m[2]].join(""))
                        }
                    }
                }(), fieldset: function (a, b, c, d, g) {
                    var f = g.label;
                    this._ = {children: b};
                    CKEDITOR.ui.dialog.uiElement.call(this, a, g, d, "fieldset", null, null, function () {
                        var a = [];
                        f && a.push("<legend" +
                        (g.labelStyle ? ' style="' + g.labelStyle + '"' : "") + ">" + f + "</legend>");
                        for (var b = 0; b < c.length; b++)a.push(c[b]);
                        return a.join("")
                    })
                }
            }, true);
            CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement;
            CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setLabel: function (a) {
                    var b = CKEDITOR.document.getById(this._.labelId);
                    b.getChildCount() < 1 ? (new CKEDITOR.dom.text(a, CKEDITOR.document)).appendTo(b) : b.getChild(0).$.nodeValue = a;
                    return this
                }, getLabel: function () {
                    var a = CKEDITOR.document.getById(this._.labelId);
                    return !a || a.getChildCount() < 1 ? "" : a.getChild(0).getText()
                }, eventProcessors: d
            }, true);
            CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                click: function () {
                    return !this._.disabled ? this.fire("click", {dialog: this._.dialog}) : false
                },
                enable: function () {
                    this._.disabled = false;
                    var a = this.getElement();
                    a && a.removeClass("cke_disabled")
                },
                disable: function () {
                    this._.disabled = true;
                    this.getElement().addClass("cke_disabled")
                },
                isVisible: function () {
                    return this.getElement().getFirst().isVisible()
                },
                isEnabled: function () {
                    return !this._.disabled
                },
                eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                    onClick: function (a, b) {
                        this.on("click", function () {
                            b.apply(this, arguments)
                        })
                    }
                }, true),
                accessKeyUp: function () {
                    this.click()
                },
                accessKeyDown: function () {
                    this.focus()
                },
                keyboardFocusable: true
            }, true);
            CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function () {
                    return CKEDITOR.document.getById(this._.inputId)
                }, focus: function () {
                    var a = this.selectParentTab();
                    setTimeout(function () {
                        var b = a.getInputElement();
                        b && b.$.focus()
                    }, 0)
                }, select: function () {
                    var a = this.selectParentTab();
                    setTimeout(function () {
                        var b = a.getInputElement();
                        if (b) {
                            b.$.focus();
                            b.$.select()
                        }
                    }, 0)
                }, accessKeyUp: function () {
                    this.select()
                }, setValue: function (a) {
                    !a && (a = "");
                    return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments)
                }, keyboardFocusable: true
            }, a, true);
            CKEDITOR.ui.dialog.textarea.prototype = new CKEDITOR.ui.dialog.textInput;
            CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
                getInputElement: function () {
                    return this._.select.getElement()
                }, add: function (a, b, c) {
                    var d = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document), g = this.getInputElement().$;
                    d.$.text = a;
                    d.$.value = b === void 0 || b === null ? a : b;
                    c === void 0 || c === null ? CKEDITOR.env.ie ? g.add(d.$) : g.add(d.$, null) : g.add(d.$, c);
                    return this
                }, remove: function (a) {
                    this.getInputElement().$.remove(a);
                    return this
                }, clear: function () {
                    for (var a = this.getInputElement().$; a.length > 0;)a.remove(0);
                    return this
                }, keyboardFocusable: true
            }, a, true);
            CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                getInputElement: function () {
                    return this._.checkbox.getElement()
                }, setValue: function (a, b) {
                    this.getInputElement().$.checked = a;
                    !b && this.fire("change", {value: a})
                }, getValue: function () {
                    return this.getInputElement().$.checked
                }, accessKeyUp: function () {
                    this.setValue(!this.getValue())
                }, eventProcessors: {
                    onChange: function (a, b) {
                        if (!CKEDITOR.env.ie || CKEDITOR.env.version > 8)return d.onChange.apply(this, arguments);
                        a.on("load", function () {
                            var a = this._.checkbox.getElement();
                            a.on("propertychange", function (b) {
                                b = b.data.$;
                                b.propertyName == "checked" && this.fire("change", {value: a.$.checked})
                            }, this)
                        }, this);
                        this.on("change", b);
                        return null
                    }
                }, keyboardFocusable: true
            }, a, true);
            CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
                setValue: function (a, b) {
                    for (var c = this._.children, d, g = 0; g < c.length && (d = c[g]); g++)d.getElement().$.checked = d.getValue() == a;
                    !b && this.fire("change", {value: a})
                }, getValue: function () {
                    for (var a = this._.children, b = 0; b < a.length; b++)if (a[b].getElement().$.checked)return a[b].getValue();
                    return null
                }, accessKeyUp: function () {
                    var a = this._.children, b;
                    for (b = 0; b < a.length; b++)if (a[b].getElement().$.checked) {
                        a[b].getElement().focus();
                        return
                    }
                    a[0].getElement().focus()
                }, eventProcessors: {
                    onChange: function (a, b) {
                        if (CKEDITOR.env.ie) {
                            a.on("load", function () {
                                for (var a = this._.children, b = this, c = 0; c < a.length; c++)a[c].getElement().on("propertychange", function (a) {
                                    a = a.data.$;
                                    a.propertyName == "checked" && this.$.checked && b.fire("change", {value: this.getAttribute("value")})
                                })
                            }, this);
                            this.on("change", b)
                        } else return d.onChange.apply(this, arguments);
                        return null
                    }
                }, keyboardFocusable: true
            }, a, true);
            CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, a, {
                getInputElement: function () {
                    var a = CKEDITOR.document.getById(this._.frameId).getFrameDocument();
                    return a.$.forms.length > 0 ? new CKEDITOR.dom.element(a.$.forms[0].elements[0]) : this.getElement()
                }, submit: function () {
                    this.getInputElement().getParent().$.submit();
                    return this
                }, getAction: function () {
                    return this.getInputElement().getParent().$.action
                }, registerEvents: function (a) {
                    var b = /^on([A-Z]\w+)/, c, d = function (a, b, c, d) {
                        a.on("formLoaded", function () {
                            a.getInputElement().on(c, d, a)
                        })
                    }, g;
                    for (g in a)if (c = g.match(b))this.eventProcessors[g] ? this.eventProcessors[g].call(this, this._.dialog, a[g]) : d(this, this._.dialog, c[1].toLowerCase(), a[g]);
                    return this
                }, reset: function () {
                    function a() {
                        c.$.open();
                        var h = "";
                        d.size && (h = d.size - (CKEDITOR.env.ie ? 7 : 0));
                        var l = b.frameId + "_input";
                        c.$.write(['<html dir="' + m + '" lang="' + p + '"><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">', '<form enctype="multipart/form-data" method="POST" dir="' + m + '" lang="' + p + '" action="', CKEDITOR.tools.htmlEncode(d.action), '"><label id="', b.labelId, '" for="', l, '" style="display:none">', CKEDITOR.tools.htmlEncode(d.label), '</label><input id="', l, '" aria-labelledby="', b.labelId, '" type="file" name="', CKEDITOR.tools.htmlEncode(d.id || "cke_upload"), '" size="', CKEDITOR.tools.htmlEncode(h > 0 ? h : ""), '" /></form></body></html><script>', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + f + ");", "window.onbeforeunload = function() {window.parent.CKEDITOR.tools.callFunction(" + i + ")}", "<\/script>"].join(""));
                        c.$.close();
                        for (h = 0; h < g.length; h++)g[h].enable()
                    }

                    var b = this._, c = CKEDITOR.document.getById(b.frameId).getFrameDocument(), d = b.definition, g = b.buttons, f = this.formLoadedNumber, i = this.formUnloadNumber, m = b.dialog._.editor.lang.dir, p = b.dialog._.editor.langCode;
                    if (!f) {
                        f = this.formLoadedNumber = CKEDITOR.tools.addFunction(function () {
                            this.fire("formLoaded")
                        }, this);
                        i = this.formUnloadNumber = CKEDITOR.tools.addFunction(function () {
                            this.getInputElement().clearCustomData()
                        }, this);
                        this.getDialog()._.editor.on("destroy", function () {
                            CKEDITOR.tools.removeFunction(f);
                            CKEDITOR.tools.removeFunction(i)
                        })
                    }
                    CKEDITOR.env.gecko ? setTimeout(a, 500) : a()
                }, getValue: function () {
                    return this.getInputElement().$.value || ""
                }, setInitValue: function () {
                    this._.initValue = ""
                }, eventProcessors: {
                    onChange: function (a, b) {
                        if (!this._.domOnChangeRegistered) {
                            this.on("formLoaded", function () {
                                this.getInputElement().on("change", function () {
                                    this.fire("change", {value: this.getValue()})
                                }, this)
                            }, this);
                            this._.domOnChangeRegistered = true
                        }
                        this.on("change", b)
                    }
                }, keyboardFocusable: true
            }, true);
            CKEDITOR.ui.dialog.fileButton.prototype = new CKEDITOR.ui.dialog.button;
            CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);
            CKEDITOR.dialog.addUIElement("text", f);
            CKEDITOR.dialog.addUIElement("password", f);
            CKEDITOR.dialog.addUIElement("textarea", b);
            CKEDITOR.dialog.addUIElement("checkbox", b);
            CKEDITOR.dialog.addUIElement("radio", b);
            CKEDITOR.dialog.addUIElement("button", b);
            CKEDITOR.dialog.addUIElement("select", b);
            CKEDITOR.dialog.addUIElement("file", b);
            CKEDITOR.dialog.addUIElement("fileButton", b);
            CKEDITOR.dialog.addUIElement("html", b);
            CKEDITOR.dialog.addUIElement("fieldset", {
                build: function (a, b, c) {
                    for (var d = b.children, g, f = [], i = [], m = 0; m < d.length && (g = d[m]); m++) {
                        var p = [];
                        f.push(p);
                        i.push(CKEDITOR.dialog._.uiElementBuilders[g.type].build(a, g, p))
                    }
                    return new CKEDITOR.ui.dialog[b.type](a, i, f, c, b)
                }
            })
        }
    }),CKEDITOR.DIALOG_RESIZE_NONE = 0,CKEDITOR.DIALOG_RESIZE_WIDTH = 1,CKEDITOR.DIALOG_RESIZE_HEIGHT = 2,CKEDITOR.DIALOG_RESIZE_BOTH = 3,function () {
        function c() {
            for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--)if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight)return this._.tabIdList[c % a];
            return null
        }

        function f() {
            for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++)if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight)return this._.tabIdList[c % a];
            return null
        }

        function b(a, b) {
            for (var c = a.$.getElementsByTagName("input"), d = 0, e = c.length; d < e; d++) {
                var g = new CKEDITOR.dom.element(c[d]);
                if (g.getAttribute("type").toLowerCase() == "text")if (b) {
                    g.setAttribute("value", g.getCustomData("fake_value") || "");
                    g.removeCustomData("fake_value")
                } else {
                    g.setCustomData("fake_value", g.getAttribute("value"));
                    g.setAttribute("value", "")
                }
            }
        }

        function a(a, b) {
            var c = this.getInputElement();
            c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", true));
            a || (this.select ? this.select() : this.focus());
            b && alert(b);
            this.fire("validated", {valid: a, msg: b})
        }

        function d() {
            var a = this.getInputElement();
            a && a.removeAttribute("aria-invalid")
        }

        function i(a) {
            var a = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", p).output({
                id: CKEDITOR.tools.getNextNumber(),
                editorId: a.id,
                langDir: a.lang.dir,
                langCode: a.langCode,
                editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog",
                closeTitle: a.lang.common.close,
                hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : ""
            })), b = a.getChild([0, 0, 0, 0, 0]), c = b.getChild(0), d = b.getChild(1);
            if (CKEDITOR.env.ie && !CKEDITOR.env.ie6Compat) {
                var e = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())";
                CKEDITOR.dom.element.createFromHtml('<iframe frameBorder="0" class="cke_iframe_shim" src="' + e + '" tabIndex="-1"></iframe>').appendTo(b.getParent())
            }
            c.unselectable();
            d.unselectable();
            return {
                element: a,
                parts: {
                    dialog: a.getChild(0),
                    title: c,
                    close: d,
                    tabs: b.getChild(2),
                    contents: b.getChild([3, 0, 0, 0]),
                    footer: b.getChild([3, 0, 1, 0])
                }
            }
        }

        function g(a, b, c) {
            this.element = b;
            this.focusIndex = c;
            this.tabIndex = 0;
            this.isFocusable = function () {
                return !b.getAttribute("disabled") && b.isVisible()
            };
            this.focus = function () {
                a._.currentFocusIndex = this.focusIndex;
                this.element.focus()
            };
            b.on("keydown", function (a) {
                a.data.getKeystroke()in{32: 1, 13: 1} && this.fire("click")
            });
            b.on("focus", function () {
                this.fire("mouseover")
            });
            b.on("blur", function () {
                this.fire("mouseout")
            })
        }

        function h(a) {
            function b() {
                a.layout()
            }

            var c = CKEDITOR.document.getWindow();
            c.on("resize", b);
            a.on("hide", function () {
                c.removeListener("resize", b)
            })
        }

        function e(a, b) {
            this._ = {dialog: a};
            CKEDITOR.tools.extend(this, b)
        }

        function j(a) {
            function b(c) {
                var i = a.getSize(), j = CKEDITOR.document.getWindow().getViewPaneSize(), l = c.data.$.screenX, k = c.data.$.screenY, m = l - d.x, p = k - d.y;
                d = {x: l, y: k};
                e.x = e.x + m;
                e.y = e.y + p;
                a.move(e.x + f[3] < h ? -f[3] : e.x - f[1] > j.width - i.width - h ? j.width - i.width +
                (g.lang.dir == "rtl" ? 0 : f[1]) : e.x, e.y + f[0] < h ? -f[0] : e.y - f[2] > j.height - i.height - h ? j.height - i.height + f[2] : e.y, 1);
                c.data.preventDefault()
            }

            function c() {
                CKEDITOR.document.removeListener("mousemove", b);
                CKEDITOR.document.removeListener("mouseup", c);
                if (CKEDITOR.env.ie6Compat) {
                    var a = w.getChild(0).getFrameDocument();
                    a.removeListener("mousemove", b);
                    a.removeListener("mouseup", c)
                }
            }

            var d = null, e = null;
            a.getElement().getFirst();
            var g = a.getParentEditor(), h = g.config.dialog_magnetDistance, f = CKEDITOR.skin.margins || [0, 0, 0, 0];
            typeof h == "undefined" && (h = 20);
            a.parts.title.on("mousedown", function (g) {
                d = {x: g.data.$.screenX, y: g.data.$.screenY};
                CKEDITOR.document.on("mousemove", b);
                CKEDITOR.document.on("mouseup", c);
                e = a.getPosition();
                if (CKEDITOR.env.ie6Compat) {
                    var h = w.getChild(0).getFrameDocument();
                    h.on("mousemove", b);
                    h.on("mouseup", c)
                }
                g.data.preventDefault()
            }, a)
        }

        function k(a) {
            var b, c;

            function d(e) {
                var m = f.lang.dir == "rtl", p = k.width, n = k.height, r = p + (e.data.$.screenX - b) * (m ? -1 : 1) * (a._.moved ? 1 : 2), q = n + (e.data.$.screenY - c) * (a._.moved ? 1 : 2), t = a._.element.getFirst(), t = m && t.getComputedStyle("right"), y = a.getPosition();
                y.y + q > l.height && (q = l.height - y.y);
                if ((m ? t : y.x) + r > l.width)r = l.width - (m ? t : y.x);
                if (h == CKEDITOR.DIALOG_RESIZE_WIDTH || h == CKEDITOR.DIALOG_RESIZE_BOTH)p = Math.max(g.minWidth || 0, r - i);
                if (h == CKEDITOR.DIALOG_RESIZE_HEIGHT || h == CKEDITOR.DIALOG_RESIZE_BOTH)n = Math.max(g.minHeight || 0, q - j);
                a.resize(p, n);
                a._.moved || a.layout();
                e.data.preventDefault()
            }

            function e() {
                CKEDITOR.document.removeListener("mouseup", e);
                CKEDITOR.document.removeListener("mousemove", d);
                if (m) {
                    m.remove();
                    m = null
                }
                if (CKEDITOR.env.ie6Compat) {
                    var a = w.getChild(0).getFrameDocument();
                    a.removeListener("mouseup", e);
                    a.removeListener("mousemove", d)
                }
            }

            var g = a.definition, h = g.resizable;
            if (h != CKEDITOR.DIALOG_RESIZE_NONE) {
                var f = a.getParentEditor(), i, j, l, k, m, p = CKEDITOR.tools.addFunction(function (g) {
                    k = a.getSize();
                    var h = a.parts.contents;
                    if (h.$.getElementsByTagName("iframe").length) {
                        m = CKEDITOR.dom.element.createFromHtml('<div class="cke_dialog_resize_cover" style="height: 100%; position: absolute; width: 100%;"></div>');
                        h.append(m)
                    }
                    j = k.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.opera || CKEDITOR.env.ie && CKEDITOR.env.quirks));
                    i = k.width - a.parts.contents.getSize("width", 1);
                    b = g.screenX;
                    c = g.screenY;
                    l = CKEDITOR.document.getWindow().getViewPaneSize();
                    CKEDITOR.document.on("mousemove", d);
                    CKEDITOR.document.on("mouseup", e);
                    if (CKEDITOR.env.ie6Compat) {
                        h = w.getChild(0).getFrameDocument();
                        h.on("mousemove", d);
                        h.on("mouseup", e)
                    }
                    g.preventDefault && g.preventDefault()
                });
                a.on("load", function () {
                    var b = "";
                    h == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : h == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical");
                    b = CKEDITOR.dom.element.createFromHtml('<div class="cke_resizer' + b + " cke_resizer_" + f.lang.dir + '" title="' + CKEDITOR.tools.htmlEncode(f.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + p + ', event )">' + (f.lang.dir == "ltr" ? "◢" : "◣") + "</div>");
                    a.parts.footer.append(b, 1)
                });
                f.on("destroy", function () {
                    CKEDITOR.tools.removeFunction(p)
                })
            }
        }

        function n(a) {
            a.data.preventDefault(1)
        }

        function o(a) {
            var b = CKEDITOR.document.getWindow(), c = a.config, d = c.dialog_backgroundCoverColor || "white", e = c.dialog_backgroundCoverOpacity, g = c.baseFloatZIndex, c = CKEDITOR.tools.genKey(d, e, g), h = v[c];
            if (h)h.show(); else {
                g = ['<div tabIndex="-1" style="position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", g, "; top: 0px; left: 0px; ", !CKEDITOR.env.ie6Compat ? "background-color: " + d : "", '" class="cke_dialog_background_cover">'];
                if (CKEDITOR.env.ie6Compat) {
                    d = "<html><body style=\\'background-color:" +
                    d + ";\\'></body></html>";
                    g.push('<iframe hidefocus="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:');
                    g.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + d + "' );document.close();") + "})())");
                    g.push('" style="position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>')
                }
                g.push("</div>");
                h = CKEDITOR.dom.element.createFromHtml(g.join(""));
                h.setOpacity(e != void 0 ? e : 0.5);
                h.on("keydown", n);
                h.on("keypress", n);
                h.on("keyup", n);
                h.appendTo(CKEDITOR.document.getBody());
                v[c] = h
            }
            a.focusManager.add(h);
            w = h;
            var a = function () {
                var a = b.getViewPaneSize();
                h.setStyles({width: a.width + "px", height: a.height + "px"})
            }, f = function () {
                var a = b.getScrollPosition(), c = CKEDITOR.dialog._.currentTop;
                h.setStyles({left: a.x + "px", top: a.y + "px"});
                if (c) {
                    do {
                        a = c.getPosition();
                        c.move(a.x, a.y)
                    } while (c = c._.parentDialog)
                }
            };
            s = a;
            b.on("resize", a);
            a();
            (!CKEDITOR.env.mac || !CKEDITOR.env.webkit) && h.focus();
            if (CKEDITOR.env.ie6Compat) {
                var i = function () {
                    f();
                    arguments.callee.prevScrollHandler.apply(this, arguments)
                };
                b.$.setTimeout(function () {
                    i.prevScrollHandler = window.onscroll || function () {
                    };
                    window.onscroll = i
                }, 0);
                f()
            }
        }

        function q(a) {
            if (w) {
                a.focusManager.remove(w);
                a = CKEDITOR.document.getWindow();
                w.hide();
                a.removeListener("resize", s);
                CKEDITOR.env.ie6Compat && a.$.setTimeout(function () {
                    window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null
                }, 0);
                s = null
            }
        }

        var m = CKEDITOR.tools.cssLength, p = '<div class="cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir="{langDir}" lang="{langCode}" role="dialog" aria-labelledby="cke_dialog_title_{id}"><table class="cke_dialog ' +
            CKEDITOR.env.cssClass + ' cke_{langDir}" style="position:absolute" role="presentation"><tr><td role="presentation"><div class="cke_dialog_body" role="presentation"><div id="cke_dialog_title_{id}" class="cke_dialog_title" role="presentation"></div><a id="cke_dialog_close_button_{id}" class="cke_dialog_close_button" href="javascript:void(0)" title="{closeTitle}" role="button"><span class="cke_label">X</span></a><div id="cke_dialog_tabs_{id}" class="cke_dialog_tabs" role="tablist"></div><table class="cke_dialog_contents" role="presentation"><tr><td id="cke_dialog_contents_{id}" class="cke_dialog_contents_body" role="presentation"></td></tr><tr><td id="cke_dialog_footer_{id}" class="cke_dialog_footer" role="presentation"></td></tr></table></div></td></tr></table></div>';
        CKEDITOR.dialog = function (b, e) {
            function g() {
                var a = s._.focusList;
                a.sort(function (a, b) {
                    return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex
                });
                for (var b = a.length, c = 0; c < b; c++)a[c].focusIndex = c
            }

            function h(a) {
                var b = s._.focusList, a = a || 0;
                if (!(b.length < 1)) {
                    var c = s._.currentFocusIndex;
                    try {
                        b[c].getInputElement().$.blur()
                    } catch (d) {
                    }
                    for (var e = c = (c + a + b.length) % b.length; a && !b[e].isFocusable();) {
                        e = (e + a + b.length) % b.length;
                        if (e == c)break
                    }
                    b[e].focus();
                    b[e].type == "text" && b[e].select()
                }
            }

            function l(a) {
                if (s == CKEDITOR.dialog._.currentTop) {
                    var d = a.data.getKeystroke(), e = b.lang.dir == "rtl";
                    o = x = 0;
                    if (d == 9 || d == CKEDITOR.SHIFT + 9) {
                        d = d == CKEDITOR.SHIFT + 9;
                        if (s._.tabBarMode) {
                            d = d ? c.call(s) : f.call(s);
                            s.selectPage(d);
                            s._.tabs[d][0].focus()
                        } else h(d ? -1 : 1);
                        o = 1
                    } else if (d == CKEDITOR.ALT + 121 && !s._.tabBarMode && s.getPageCount() > 1) {
                        s._.tabBarMode = true;
                        s._.tabs[s._.currentTabId][0].focus();
                        o = 1
                    } else if ((d == 37 || d == 39) && s._.tabBarMode) {
                        d = d == (e ? 39 : 37) ? c.call(s) : f.call(s);
                        s.selectPage(d);
                        s._.tabs[d][0].focus();
                        o = 1
                    } else if ((d == 13 || d == 32) && s._.tabBarMode) {
                        this.selectPage(this._.currentTabId);
                        this._.tabBarMode = false;
                        this._.currentFocusIndex = -1;
                        h(1);
                        o = 1
                    } else if (d == 13) {
                        d = a.data.getTarget();
                        if (!d.is("a", "button", "select", "textarea") && (!d.is("input") || d.$.type != "button")) {
                            (d = this.getButton("ok")) && CKEDITOR.tools.setTimeout(d.click, 0, d);
                            o = 1
                        }
                        x = 1
                    } else if (d == 27) {
                        (d = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(d.click, 0, d) : this.fire("cancel", {hide: true}).hide !== false && this.hide();
                        x = 1
                    } else return;
                    m(a)
                }
            }

            function m(a) {
                o ? a.data.preventDefault(1) : x && a.data.stopPropagation()
            }

            var p = CKEDITOR.dialog._.dialogDefinitions[e], n = CKEDITOR.tools.clone(r), q = b.config.dialog_buttonsOrder || "OS", t = b.lang.dir, y = {}, o, x;
            (q == "OS" && CKEDITOR.env.mac || q == "rtl" && t == "ltr" || q == "ltr" && t == "rtl") && n.buttons.reverse();
            p = CKEDITOR.tools.extend(p(b), n);
            p = CKEDITOR.tools.clone(p);
            p = new A(this, p);
            n = i(b);
            this._ = {
                editor: b,
                element: n.element,
                name: e,
                contentSize: {width: 0, height: 0},
                size: {width: 0, height: 0},
                contents: {},
                buttons: {},
                accessKeyMap: {},
                tabs: {},
                tabIdList: [],
                currentTabId: null,
                currentTabIndex: null,
                pageCount: 0,
                lastTab: null,
                tabBarMode: false,
                focusList: [],
                currentFocusIndex: 0,
                hasFocus: false
            };
            this.parts = n.parts;
            CKEDITOR.tools.setTimeout(function () {
                b.fire("ariaWidget", this.parts.contents)
            }, 0, this);
            n = {position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed", top: 0, visibility: "hidden"};
            n[t == "rtl" ? "right" : "left"] = 0;
            this.parts.dialog.setStyles(n);
            CKEDITOR.event.call(this);
            this.definition = p = CKEDITOR.fire("dialogDefinition", {name: e, definition: p}, b).definition;
            if (!("removeDialogTabs"in b._) && b.config.removeDialogTabs) {
                n = b.config.removeDialogTabs.split(";");
                for (t = 0; t < n.length; t++) {
                    q = n[t].split(":");
                    if (q.length == 2) {
                        var v = q[0];
                        y[v] || (y[v] = []);
                        y[v].push(q[1])
                    }
                }
                b._.removeDialogTabs = y
            }
            if (b._.removeDialogTabs && (y = b._.removeDialogTabs[e]))for (t = 0; t < y.length; t++)p.removeContents(y[t]);
            if (p.onLoad)this.on("load", p.onLoad);
            if (p.onShow)this.on("show", p.onShow);
            if (p.onHide)this.on("hide", p.onHide);
            if (p.onOk)this.on("ok", function (a) {
                b.fire("saveSnapshot");
                setTimeout(function () {
                    b.fire("saveSnapshot")
                }, 0);
                if (p.onOk.call(this, a) === false)a.data.hide = false
            });
            if (p.onCancel)this.on("cancel", function (a) {
                if (p.onCancel.call(this, a) === false)a.data.hide = false
            });
            var s = this, u = function (a) {
                var b = s._.contents, c = false, d;
                for (d in b)for (var e in b[d])if (c = a.call(this, b[d][e]))return
            };
            this.on("ok", function (b) {
                u(function (c) {
                    if (c.validate) {
                        var d = c.validate(this), e = typeof d == "string" || d === false;
                        if (e) {
                            b.data.hide = false;
                            b.stop()
                        }
                        a.call(c, !e, typeof d == "string" ? d : void 0);
                        return e
                    }
                })
            }, this, null, 0);
            this.on("cancel", function (a) {
                u(function (c) {
                    if (c.isChanged()) {
                        if (!confirm(b.lang.common.confirmCancel))a.data.hide = false;
                        return true
                    }
                })
            }, this, null, 0);
            this.parts.close.on("click", function (a) {
                this.fire("cancel", {hide: true}).hide !== false && this.hide();
                a.data.preventDefault()
            }, this);
            this.changeFocus = h;
            var w = this._.element;
            b.focusManager.add(w, 1);
            this.on("show", function () {
                w.on("keydown", l, this);
                if (CKEDITOR.env.opera || CKEDITOR.env.gecko)w.on("keypress", m, this)
            });
            this.on("hide", function () {
                w.removeListener("keydown", l);
                (CKEDITOR.env.opera || CKEDITOR.env.gecko) && w.removeListener("keypress", m);
                u(function (a) {
                    d.apply(a)
                })
            });
            this.on("iframeAdded", function (a) {
                (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", l, this, null, 0)
            });
            this.on("show", function () {
                g();
                if (b.config.dialog_startupFocusTab && s._.pageCount > 1) {
                    s._.tabBarMode = true;
                    s._.tabs[s._.currentTabId][0].focus()
                } else if (!this._.hasFocus) {
                    this._.currentFocusIndex = -1;
                    if (p.onFocus) {
                        var a = p.onFocus.call(this);
                        a && a.focus()
                    } else h(1)
                }
            }, this, null, 4294967295);
            if (CKEDITOR.env.ie6Compat)this.on("load", function () {
                var a = this.getElement(), b = a.getFirst();
                b.remove();
                b.appendTo(a)
            }, this);
            j(this);
            k(this);
            (new CKEDITOR.dom.text(p.title, CKEDITOR.document)).appendTo(this.parts.title);
            for (t = 0; t < p.contents.length; t++)(y = p.contents[t]) && this.addPage(y);
            this.parts.tabs.on("click", function (a) {
                var b = a.data.getTarget();
                if (b.hasClass("cke_dialog_tab")) {
                    b = b.$.id;
                    this.selectPage(b.substring(4, b.lastIndexOf("_")));
                    if (this._.tabBarMode) {
                        this._.tabBarMode = false;
                        this._.currentFocusIndex = -1;
                        h(1)
                    }
                    a.data.preventDefault()
                }
            }, this);
            t = [];
            y = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, {
                type: "hbox",
                className: "cke_dialog_footer_buttons",
                widths: [],
                children: p.buttons
            }, t).getChild();
            this.parts.footer.setHtml(t.join(""));
            for (t = 0; t < y.length; t++)this._.buttons[y[t].id] = y[t]
        };
        CKEDITOR.dialog.prototype = {
            destroy: function () {
                this.hide();
                this._.element.remove()
            }, resize: function () {
                return function (a, b) {
                    if (!this._.contentSize || !(this._.contentSize.width == a && this._.contentSize.height == b)) {
                        CKEDITOR.dialog.fire("resize", {dialog: this, width: a, height: b}, this._.editor);
                        this.fire("resize", {width: a, height: b}, this._.editor);
                        this.parts.contents.setStyles({width: a + "px", height: b + "px"});
                        if (this._.editor.lang.dir == "rtl" && this._.position)this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10);
                        this._.contentSize = {width: a, height: b}
                    }
                }
            }(), getSize: function () {
                var a = this._.element.getFirst();
                return {width: a.$.offsetWidth || 0, height: a.$.offsetHeight || 0}
            }, move: function (a, b, c) {
                var d = this._.element.getFirst(), e = this._.editor.lang.dir == "rtl", g = d.getComputedStyle("position") == "fixed";
                CKEDITOR.env.ie && d.setStyle("zoom", "100%");
                if (!g || !this._.position || !(this._.position.x == a && this._.position.y == b)) {
                    this._.position = {x: a, y: b};
                    if (!g) {
                        g = CKEDITOR.document.getWindow().getScrollPosition();
                        a = a + g.x;
                        b = b + g.y
                    }
                    if (e) {
                        g = this.getSize();
                        a = CKEDITOR.document.getWindow().getViewPaneSize().width - g.width - a
                    }
                    b = {top: (b > 0 ? b : 0) + "px"};
                    b[e ? "right" : "left"] = (a > 0 ? a : 0) + "px";
                    d.setStyles(b);
                    c && (this._.moved = 1)
                }
            }, getPosition: function () {
                return CKEDITOR.tools.extend({}, this._.position)
            }, show: function () {
                var a = this._.element, b = this.definition;
                !a.getParent() || !a.getParent().equals(CKEDITOR.document.getBody()) ? a.appendTo(CKEDITOR.document.getBody()) : a.setStyle("display", "block");
                if (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900) {
                    var c = this.parts.dialog;
                    c.setStyle("position", "absolute");
                    setTimeout(function () {
                        c.setStyle("position", "fixed")
                    }, 0)
                }
                this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight);
                this.reset();
                this.selectPage(this.definition.contents[0].id);
                if (CKEDITOR.dialog._.currentZIndex === null)CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex;
                this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex = CKEDITOR.dialog._.currentZIndex + 10);
                if (CKEDITOR.dialog._.currentTop === null) {
                    CKEDITOR.dialog._.currentTop = this;
                    this._.parentDialog = null;
                    o(this._.editor)
                } else {
                    this._.parentDialog = CKEDITOR.dialog._.currentTop;
                    this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2);
                    CKEDITOR.dialog._.currentTop = this
                }
                a.on("keydown", x);
                a.on(CKEDITOR.env.opera ? "keypress" : "keyup", B);
                this._.hasFocus = false;
                CKEDITOR.tools.setTimeout(function () {
                    this.layout();
                    h(this);
                    this.parts.dialog.setStyle("visibility", "");
                    this.fireOnce("load", {});
                    CKEDITOR.ui.fire("ready", this);
                    this.fire("show", {});
                    this._.editor.fire("dialogShow", this);
                    this._.parentDialog || this._.editor.focusManager.lock();
                    this.foreach(function (a) {
                        a.setInitValue && a.setInitValue()
                    })
                }, 100, this)
            }, layout: function () {
                var a = this.parts.dialog, b = this.getSize(), c = CKEDITOR.document.getWindow().getViewPaneSize(), d = (c.width - b.width) / 2, e = (c.height - b.height) / 2;
                CKEDITOR.env.ie6Compat || (b.height + (e > 0 ? e : 0) > c.height || b.width + (d > 0 ? d : 0) > c.width ? a.setStyle("position", "absolute") : a.setStyle("position", "fixed"));
                this.move(this._.moved ? this._.position.x : d, this._.moved ? this._.position.y : e)
            }, foreach: function (a) {
                for (var b in this._.contents)for (var c in this._.contents[b])a.call(this, this._.contents[b][c]);
                return this
            }, reset: function () {
                var a = function (a) {
                    a.reset && a.reset(1)
                };
                return function () {
                    this.foreach(a);
                    return this
                }
            }(), setupContent: function () {
                var a = arguments;
                this.foreach(function (b) {
                    b.setup && b.setup.apply(b, a)
                })
            }, commitContent: function () {
                var a = arguments;
                this.foreach(function (b) {
                    CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur();
                    b.commit && b.commit.apply(b, a)
                })
            }, hide: function () {
                if (this.parts.dialog.isVisible()) {
                    this.fire("hide", {});
                    this._.editor.fire("dialogHide", this);
                    this.selectPage(this._.tabIdList[0]);
                    var a = this._.element;
                    a.setStyle("display", "none");
                    this.parts.dialog.setStyle("visibility", "hidden");
                    for (D(this); CKEDITOR.dialog._.currentTop != this;)CKEDITOR.dialog._.currentTop.hide();
                    if (this._.parentDialog) {
                        var b = this._.parentDialog.getElement().getFirst();
                        b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2))
                    } else q(this._.editor);
                    if (CKEDITOR.dialog._.currentTop = this._.parentDialog)CKEDITOR.dialog._.currentZIndex = CKEDITOR.dialog._.currentZIndex - 10; else {
                        CKEDITOR.dialog._.currentZIndex = null;
                        a.removeListener("keydown", x);
                        a.removeListener(CKEDITOR.env.opera ? "keypress" : "keyup", B);
                        var c = this._.editor;
                        c.focus();
                        setTimeout(function () {
                            c.focusManager.unlock()
                        }, 0)
                    }
                    delete this._.parentDialog;
                    this.foreach(function (a) {
                        a.resetInitValue && a.resetInitValue()
                    })
                }
            }, addPage: function (a) {
                if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
                    for (var b = [], c = a.label ? ' title="' + CKEDITOR.tools.htmlEncode(a.label) + '"' : "", d = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {
                        type: "vbox",
                        className: "cke_dialog_page_contents",
                        children: a.elements,
                        expand: !!a.expand,
                        padding: a.padding,
                        style: a.style || "width: 100%;"
                    }, b), e = this._.contents[a.id] = {}, g = d.getChild(), h = 0; d = g.shift();) {
                        !d.notAllowed && (d.type != "hbox" && d.type != "vbox") && h++;
                        e[d.id] = d;
                        typeof d.getChild == "function" && g.push.apply(g, d.getChild())
                    }
                    if (!h)a.hidden = true;
                    b = CKEDITOR.dom.element.createFromHtml(b.join(""));
                    b.setAttribute("role", "tabpanel");
                    d = CKEDITOR.env;
                    e = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber();
                    c = CKEDITOR.dom.element.createFromHtml(['<a class="cke_dialog_tab"', this._.pageCount > 0 ? " cke_last" : "cke_first", c, a.hidden ? ' style="display:none"' : "", ' id="', e, '"', d.gecko && d.version >= 10900 && !d.hc ? "" : ' href="javascript:void(0)"', ' tabIndex="-1" hidefocus="true" role="tab">', a.label, "</a>"].join(""));
                    b.setAttribute("aria-labelledby", e);
                    this._.tabs[a.id] = [c, b];
                    this._.tabIdList.push(a.id);
                    !a.hidden && this._.pageCount++;
                    this._.lastTab = c;
                    this.updateStyle();
                    b.setAttribute("name", a.id);
                    b.appendTo(this.parts.contents);
                    c.unselectable();
                    this.parts.tabs.append(c);
                    if (a.accessKey) {
                        z(this, this, "CTRL+" + a.accessKey, F, C);
                        this._.accessKeyMap["CTRL+" + a.accessKey] = a.id
                    }
                }
            }, selectPage: function (a) {
                if (this._.currentTabId != a && this.fire("selectPage", {
                        page: a,
                        currentPage: this._.currentTabId
                    }) !== true) {
                    for (var c in this._.tabs) {
                        var d = this._.tabs[c][0], e = this._.tabs[c][1];
                        if (c != a) {
                            d.removeClass("cke_dialog_tab_selected");
                            e.hide()
                        }
                        e.setAttribute("aria-hidden", c != a)
                    }
                    var g = this._.tabs[a];
                    g[0].addClass("cke_dialog_tab_selected");
                    if (CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat) {
                        b(g[1]);
                        g[1].show();
                        setTimeout(function () {
                            b(g[1], 1)
                        }, 0)
                    } else g[1].show();
                    this._.currentTabId = a;
                    this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
                }
            }, updateStyle: function () {
                this.parts.dialog[(this._.pageCount === 1 ? "add" : "remove") + "Class"]("cke_single_page")
            }, hidePage: function (a) {
                var b = this._.tabs[a] && this._.tabs[a][0];
                if (b && this._.pageCount != 1 && b.isVisible()) {
                    a == this._.currentTabId && this.selectPage(c.call(this));
                    b.hide();
                    this._.pageCount--;
                    this.updateStyle()
                }
            }, showPage: function (a) {
                if (a = this._.tabs[a] && this._.tabs[a][0]) {
                    a.show();
                    this._.pageCount++;
                    this.updateStyle()
                }
            }, getElement: function () {
                return this._.element
            }, getName: function () {
                return this._.name
            }, getContentElement: function (a, b) {
                var c = this._.contents[a];
                return c && c[b]
            }, getValueOf: function (a, b) {
                return this.getContentElement(a, b).getValue()
            }, setValueOf: function (a, b, c) {
                return this.getContentElement(a, b).setValue(c)
            }, getButton: function (a) {
                return this._.buttons[a]
            }, click: function (a) {
                return this._.buttons[a].click()
            }, disableButton: function (a) {
                return this._.buttons[a].disable()
            }, enableButton: function (a) {
                return this._.buttons[a].enable()
            }, getPageCount: function () {
                return this._.pageCount
            }, getParentEditor: function () {
                return this._.editor
            }, getSelectedElement: function () {
                return this.getParentEditor().getSelection().getSelectedElement()
            }, addFocusable: function (a, b) {
                if (typeof b == "undefined") {
                    b = this._.focusList.length;
                    this._.focusList.push(new g(this, a, b))
                } else {
                    this._.focusList.splice(b, 0, new g(this, a, b));
                    for (var c = b + 1; c < this._.focusList.length; c++)this._.focusList[c].focusIndex++
                }
            }
        };
        CKEDITOR.tools.extend(CKEDITOR.dialog, {
            add: function (a, b) {
                if (!this._.dialogDefinitions[a] || typeof b == "function")this._.dialogDefinitions[a] = b
            }, exists: function (a) {
                return !!this._.dialogDefinitions[a]
            }, getCurrent: function () {
                return CKEDITOR.dialog._.currentTop
            }, isTabEnabled: function (a, b, c) {
                a = a.config.removeDialogTabs;
                return !(a && a.match(RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)", "i")))
            }, okButton: function () {
                var a = function (a, b) {
                    b = b || {};
                    return CKEDITOR.tools.extend({
                        id: "ok",
                        type: "button",
                        label: a.lang.common.ok,
                        "class": "cke_dialog_ui_button_ok",
                        onClick: function (a) {
                            a = a.data.dialog;
                            a.fire("ok", {hide: true}).hide !== false && a.hide()
                        }
                    }, b, true)
                };
                a.type = "button";
                a.override = function (b) {
                    return CKEDITOR.tools.extend(function (c) {
                        return a(c, b)
                    }, {type: "button"}, true)
                };
                return a
            }(), cancelButton: function () {
                var a = function (a, b) {
                    b = b || {};
                    return CKEDITOR.tools.extend({
                        id: "cancel",
                        type: "button",
                        label: a.lang.common.cancel,
                        "class": "cke_dialog_ui_button_cancel",
                        onClick: function (a) {
                            a = a.data.dialog;
                            a.fire("cancel", {hide: true}).hide !== false && a.hide()
                        }
                    }, b, true)
                };
                a.type = "button";
                a.override = function (b) {
                    return CKEDITOR.tools.extend(function (c) {
                        return a(c, b)
                    }, {type: "button"}, true)
                };
                return a
            }(), addUIElement: function (a, b) {
                this._.uiElementBuilders[a] = b
            }
        });
        CKEDITOR.dialog._ = {uiElementBuilders: {}, dialogDefinitions: {}, currentTop: null, currentZIndex: null};
        CKEDITOR.event.implementOn(CKEDITOR.dialog);
        CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
        var r = {
            resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
            minWidth: 600,
            minHeight: 400,
            buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton]
        }, l = function (a, b, c) {
            for (var d = 0, e; e = a[d]; d++) {
                if (e.id == b)return e;
                if (c && e[c])if (e = l(e[c], b, c))return e
            }
            return null
        }, y = function (a, b, c, d, e) {
            if (c) {
                for (var g = 0, h; h = a[g]; g++) {
                    if (h.id == c) {
                        a.splice(g, 0, b);
                        return b
                    }
                    if (d && h[d])if (h = y(h[d], b, c, d, true))return h
                }
                if (e)return null
            }
            a.push(b);
            return b
        }, t = function (a, b, c) {
            for (var d = 0, e; e = a[d]; d++) {
                if (e.id == b)return a.splice(d, 1);
                if (c && e[c])if (e = t(e[c], b, c))return e
            }
            return null
        }, A = function (a, b) {
            this.dialog = a;
            for (var c = b.contents, d = 0, g; g = c[d]; d++)c[d] = g && new e(a, g);
            CKEDITOR.tools.extend(this, b)
        };
        A.prototype = {
            getContents: function (a) {
                return l(this.contents, a)
            }, getButton: function (a) {
                return l(this.buttons, a)
            }, addContents: function (a, b) {
                return y(this.contents, a, b)
            }, addButton: function (a, b) {
                return y(this.buttons, a, b)
            }, removeContents: function (a) {
                t(this.contents, a)
            }, removeButton: function (a) {
                t(this.buttons, a)
            }
        };
        e.prototype = {
            get: function (a) {
                return l(this.elements, a, "children")
            }, add: function (a, b) {
                return y(this.elements, a, b, "children")
            }, remove: function (a) {
                t(this.elements, a, "children")
            }
        };
        var s, v = {}, w, u = {}, x = function (a) {
            var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, d = a.data.$.shiftKey, e = String.fromCharCode(a.data.$.keyCode);
            if ((b = u[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + e]) && b.length) {
                b = b[b.length - 1];
                b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key);
                a.data.preventDefault()
            }
        }, B = function (a) {
            var b = a.data.$.ctrlKey || a.data.$.metaKey, c = a.data.$.altKey, d = a.data.$.shiftKey, e = String.fromCharCode(a.data.$.keyCode);
            if ((b = u[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + e]) && b.length) {
                b = b[b.length - 1];
                if (b.keyup) {
                    b.keyup.call(b.uiElement, b.dialog, b.key);
                    a.data.preventDefault()
                }
            }
        }, z = function (a, b, c, d, e) {
            (u[c] || (u[c] = [])).push({
                uiElement: a,
                dialog: b,
                key: c,
                keyup: e || a.accessKeyUp,
                keydown: d || a.accessKeyDown
            })
        }, D = function (a) {
            for (var b in u) {
                for (var c = u[b], d = c.length - 1; d >= 0; d--)(c[d].dialog == a || c[d].uiElement == a) && c.splice(d, 1);
                c.length === 0 && delete u[b]
            }
        }, C = function (a, b) {
            a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b])
        }, F = function () {
        };
        (function () {
            CKEDITOR.ui.dialog = {
                uiElement: function (a, b, c, d, e, g, h) {
                    if (!(arguments.length < 4)) {
                        var f = (d.call ? d(b) : d) || "div", i = ["<", f, " "], j = (e && e.call ? e(b) : e) || {}, l = (g && g.call ? g(b) : g) || {}, k = (h && h.call ? h.call(this, a, b) : h) || "", m = this.domId = l.id || CKEDITOR.tools.getNextId() + "_uiElement";
                        this.id = b.id;
                        if (b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent)) {
                            j.display = "none";
                            this.notAllowed = true
                        }
                        l.id = m;
                        var p = {};
                        b.type && (p["cke_dialog_ui_" + b.type] = 1);
                        b.className && (p[b.className] = 1);
                        b.disabled && (p.cke_disabled = 1);
                        for (var n = l["class"] && l["class"].split ? l["class"].split(" ") : [], m = 0; m < n.length; m++)n[m] && (p[n[m]] = 1);
                        n = [];
                        for (m in p)n.push(m);
                        l["class"] = n.join(" ");
                        if (b.title)l.title = b.title;
                        p = (b.style || "").split(";");
                        if (b.align) {
                            n = b.align;
                            j["margin-left"] = n == "left" ? 0 : "auto";
                            j["margin-right"] = n == "right" ? 0 : "auto"
                        }
                        for (m in j)p.push(m + ":" + j[m]);
                        b.hidden && p.push("display:none");
                        for (m = p.length - 1; m >= 0; m--)p[m] === "" && p.splice(m, 1);
                        if (p.length > 0)l.style = (l.style ? l.style + "; " : "") + p.join("; ");
                        for (m in l)i.push(m + '="' + CKEDITOR.tools.htmlEncode(l[m]) + '" ');
                        i.push(">", k, "</", f, ">");
                        c.push(i.join(""));
                        (this._ || (this._ = {})).dialog = a;
                        if (typeof b.isChanged == "boolean")this.isChanged = function () {
                            return b.isChanged
                        };
                        if (typeof b.isChanged == "function")this.isChanged = b.isChanged;
                        if (typeof b.setValue == "function")this.setValue = CKEDITOR.tools.override(this.setValue, function (a) {
                            return function (c) {
                                a.call(this, b.setValue.call(this, c))
                            }
                        });
                        if (typeof b.getValue == "function")this.getValue = CKEDITOR.tools.override(this.getValue, function (a) {
                            return function () {
                                return b.getValue.call(this, a.call(this))
                            }
                        });
                        CKEDITOR.event.implementOn(this);
                        this.registerEvents(b);
                        this.accessKeyUp && (this.accessKeyDown && b.accessKey) && z(this, a, "CTRL+" + b.accessKey);
                        var r = this;
                        a.on("load", function () {
                            var b = r.getInputElement();
                            if (b) {
                                var c = r.type in{
                                    checkbox: 1,
                                    ratio: 1
                                } && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? "cke_dialog_ui_focused" : "";
                                b.on("focus", function () {
                                    a._.tabBarMode = false;
                                    a._.hasFocus = true;
                                    r.fire("focus");
                                    c && this.addClass(c)
                                });
                                b.on("blur", function () {
                                    r.fire("blur");
                                    c && this.removeClass(c)
                                })
                            }
                        });
                        if (this.keyboardFocusable) {
                            this.tabIndex = b.tabIndex || 0;
                            this.focusIndex = a._.focusList.push(this) - 1;
                            this.on("focus", function () {
                                a._.currentFocusIndex = r.focusIndex
                            })
                        }
                        CKEDITOR.tools.extend(this, b)
                    }
                }, hbox: function (a, b, c, d, e) {
                    if (!(arguments.length < 4)) {
                        this._ || (this._ = {});
                        var g = this._.children = b, h = e && e.widths || null, f = e && e.height || null, i, j = {role: "presentation"};
                        e && e.align && (j.align = e.align);
                        CKEDITOR.ui.dialog.uiElement.call(this, a, e || {type: "hbox"}, d, "table", {}, j, function () {
                            var a = ['<tbody><tr class="cke_dialog_ui_hbox">'];
                            for (i = 0; i < c.length; i++) {
                                var b = "cke_dialog_ui_hbox_child", d = [];
                                i === 0 && (b = "cke_dialog_ui_hbox_first");
                                i == c.length - 1 && (b = "cke_dialog_ui_hbox_last");
                                a.push('<td class="', b, '" role="presentation" ');
                                h ? h[i] && d.push("width:" + m(h[i])) : d.push("width:" + Math.floor(100 / c.length) + "%");
                                f && d.push("height:" + m(f));
                                e && e.padding != void 0 && d.push("padding:" + m(e.padding));
                                CKEDITOR.env.ie && (CKEDITOR.env.quirks && g[i].align) && d.push("text-align:" + g[i].align);
                                d.length > 0 && a.push('style="' +
                                d.join("; ") + '" ');
                                a.push(">", c[i], "</td>")
                            }
                            a.push("</tr></tbody>");
                            return a.join("")
                        })
                    }
                }, vbox: function (a, b, c, d, e) {
                    if (!(arguments.length < 3)) {
                        this._ || (this._ = {});
                        var g = this._.children = b, h = e && e.width || null, f = e && e.heights || null;
                        CKEDITOR.ui.dialog.uiElement.call(this, a, e || {type: "vbox"}, d, "div", null, {role: "presentation"}, function () {
                            var b = ['<table role="presentation" cellspacing="0" border="0" '];
                            b.push('style="');
                            e && e.expand && b.push("height:100%;");
                            b.push("width:" + m(h || "100%"), ";");
                            CKEDITOR.env.webkit && b.push("float:none;");
                            b.push('"');
                            b.push('align="', CKEDITOR.tools.htmlEncode(e && e.align || (a.getParentEditor().lang.dir == "ltr" ? "left" : "right")), '" ');
                            b.push("><tbody>");
                            for (var d = 0; d < c.length; d++) {
                                var i = [];
                                b.push('<tr><td role="presentation" ');
                                h && i.push("width:" + m(h || "100%"));
                                f ? i.push("height:" + m(f[d])) : e && e.expand && i.push("height:" + Math.floor(100 / c.length) + "%");
                                e && e.padding != void 0 && i.push("padding:" + m(e.padding));
                                CKEDITOR.env.ie && (CKEDITOR.env.quirks && g[d].align) && i.push("text-align:" + g[d].align);
                                i.length > 0 && b.push('style="', i.join("; "), '" ');
                                b.push(' class="cke_dialog_ui_vbox_child">', c[d], "</td></tr>")
                            }
                            b.push("</tbody></table>");
                            return b.join("")
                        })
                    }
                }
            }
        })();
        CKEDITOR.ui.dialog.uiElement.prototype = {
            getElement: function () {
                return CKEDITOR.document.getById(this.domId)
            }, getInputElement: function () {
                return this.getElement()
            }, getDialog: function () {
                return this._.dialog
            }, setValue: function (a, b) {
                this.getInputElement().setValue(a);
                !b && this.fire("change", {value: a});
                return this
            }, getValue: function () {
                return this.getInputElement().getValue()
            }, isChanged: function () {
                return false
            }, selectParentTab: function () {
                for (var a = this.getInputElement(); (a = a.getParent()) && a.$.className.search("cke_dialog_page_contents") == -1;);
                if (!a)return this;
                a = a.getAttribute("name");
                this._.dialog._.currentTabId != a && this._.dialog.selectPage(a);
                return this
            }, focus: function () {
                this.selectParentTab().getInputElement().focus();
                return this
            }, registerEvents: function (a) {
                var b = /^on([A-Z]\w+)/, c, d = function (a, b, c, d) {
                    b.on("load", function () {
                        a.getInputElement().on(c, d, a)
                    })
                }, e;
                for (e in a)if (c = e.match(b))this.eventProcessors[e] ? this.eventProcessors[e].call(this, this._.dialog, a[e]) : d(this, this._.dialog, c[1].toLowerCase(), a[e]);
                return this
            }, eventProcessors: {
                onLoad: function (a, b) {
                    a.on("load", b, this)
                }, onShow: function (a, b) {
                    a.on("show", b, this)
                }, onHide: function (a, b) {
                    a.on("hide", b, this)
                }
            }, accessKeyDown: function () {
                this.focus()
            }, accessKeyUp: function () {
            }, disable: function () {
                var a = this.getElement();
                this.getInputElement().setAttribute("disabled", "true");
                a.addClass("cke_disabled")
            }, enable: function () {
                var a = this.getElement();
                this.getInputElement().removeAttribute("disabled");
                a.removeClass("cke_disabled")
            }, isEnabled: function () {
                return !this.getElement().hasClass("cke_disabled")
            }, isVisible: function () {
                return this.getInputElement().isVisible()
            }, isFocusable: function () {
                return !this.isEnabled() || !this.isVisible() ? false : true
            }
        };
        CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
            getChild: function (a) {
                if (arguments.length < 1)return this._.children.concat();
                a.splice || (a = [a]);
                return a.length < 2 ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null
            }
        }, true);
        CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox;
        (function () {
            var a = {
                build: function (a, b, c) {
                    for (var d = b.children, e, g = [], h = [], f = 0; f < d.length && (e = d[f]); f++) {
                        var i = [];
                        g.push(i);
                        h.push(CKEDITOR.dialog._.uiElementBuilders[e.type].build(a, e, i))
                    }
                    return new CKEDITOR.ui.dialog[b.type](a, h, g, c, b)
                }
            };
            CKEDITOR.dialog.addUIElement("hbox", a);
            CKEDITOR.dialog.addUIElement("vbox", a)
        })();
        CKEDITOR.dialogCommand = function (a, b) {
            this.dialogName = a;
            CKEDITOR.tools.extend(this, b, true)
        };
        CKEDITOR.dialogCommand.prototype = {
            exec: function (a) {
                CKEDITOR.env.opera ? CKEDITOR.tools.setTimeout(function () {
                    a.openDialog(this.dialogName)
                }, 0, this) : a.openDialog(this.dialogName)
            }, canUndo: false, editorFocus: 1
        };
        (function () {
            var a = /^([a]|[^a])+$/, b = /^\d*$/, c = /^\d*(?:\.\d+)?$/, d = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/, e = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i, g = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
            CKEDITOR.VALIDATE_OR = 1;
            CKEDITOR.VALIDATE_AND = 2;
            CKEDITOR.dialog.validate = {
                functions: function () {
                    var a = arguments;
                    return function () {
                        var b = this && this.getValue ? this.getValue() : a[0], c = void 0, d = CKEDITOR.VALIDATE_AND, e = [], g;
                        for (g = 0; g < a.length; g++)if (typeof a[g] == "function")e.push(a[g]); else break;
                        if (g < a.length && typeof a[g] == "string") {
                            c = a[g];
                            g++
                        }
                        g < a.length && typeof a[g] == "number" && (d = a[g]);
                        var h = d == CKEDITOR.VALIDATE_AND ? true : false;
                        for (g = 0; g < e.length; g++)h = d == CKEDITOR.VALIDATE_AND ? h && e[g](b) : h || e[g](b);
                        return !h ? c : true
                    }
                }, regex: function (a, b) {
                    return function (c) {
                        c = this && this.getValue ? this.getValue() : c;
                        return !a.test(c) ? b : true
                    }
                }, notEmpty: function (b) {
                    return this.regex(a, b)
                }, integer: function (a) {
                    return this.regex(b, a)
                }, number: function (a) {
                    return this.regex(c, a)
                }, cssLength: function (a) {
                    return this.functions(function (a) {
                        return e.test(CKEDITOR.tools.trim(a))
                    }, a)
                }, htmlLength: function (a) {
                    return this.functions(function (a) {
                        return d.test(CKEDITOR.tools.trim(a))
                    }, a)
                }, inlineStyle: function (a) {
                    return this.functions(function (a) {
                        return g.test(CKEDITOR.tools.trim(a))
                    }, a)
                }, equals: function (a, b) {
                    return this.functions(function (b) {
                        return b == a
                    }, b)
                }, notEqual: function (a, b) {
                    return this.functions(function (b) {
                        return b != a
                    }, b)
                }
            };
            CKEDITOR.on("instanceDestroyed", function (a) {
                if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
                    for (var b; b = CKEDITOR.dialog._.currentTop;)b.hide();
                    for (var c in v)v[c].remove();
                    v = {}
                }
                var a = a.editor._.storedDialogs, d;
                for (d in a)a[d].destroy()
            })
        })();
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            openDialog: function (a, b) {
                var c = null, d = CKEDITOR.dialog._.dialogDefinitions[a];
                CKEDITOR.dialog._.currentTop === null && o(this);
                if (typeof d == "function") {
                    c = this._.storedDialogs || (this._.storedDialogs = {});
                    c = c[a] || (c[a] = new CKEDITOR.dialog(this, a));
                    b && b.call(c, c);
                    c.show()
                } else {
                    if (d == "failed") {
                        q(this);
                        throw Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.');
                    }
                    typeof d == "string" && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d), function () {
                        typeof CKEDITOR.dialog._.dialogDefinitions[a] != "function" && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed");
                        this.openDialog(a, b)
                    }, this, 0, 1)
                }
                CKEDITOR.skin.loadPart("dialog");
                return c
            }
        })
    }(),CKEDITOR.plugins.add("dialog", {
        requires: "dialogui", init: function (c) {
            c.on("doubleclick", function (f) {
                f.data.dialog && c.openDialog(f.data.dialog)
            }, null, null, 999)
        }
    }),function () {
        CKEDITOR.plugins.add("a11yhelp", {
            requires: "dialog",
            availableLangs: {
                ar: 1,
                bg: 1,
                ca: 1,
                cs: 1,
                cy: 1,
                da: 1,
                de: 1,
                el: 1,
                en: 1,
                eo: 1,
                es: 1,
                et: 1,
                fa: 1,
                fi: 1,
                fr: 1,
                "fr-ca": 1,
                gl: 1,
                gu: 1,
                he: 1,
                hi: 1,
                hr: 1,
                hu: 1,
                id: 1,
                it: 1,
                ja: 1,
                km: 1,
                ku: 1,
                lt: 1,
                lv: 1,
                mk: 1,
                mn: 1,
                nb: 1,
                nl: 1,
                no: 1,
                pl: 1,
                pt: 1,
                "pt-br": 1,
                ro: 1,
                ru: 1,
                si: 1,
                sk: 1,
                sl: 1,
                sq: 1,
                sr: 1,
                "sr-latn": 1,
                sv: 1,
                th: 1,
                tr: 1,
                ug: 1,
                uk: 1,
                vi: 1,
                "zh-cn": 1
            },
            init: function (c) {
                var f = this;
                c.addCommand("a11yHelp", {
                    exec: function () {
                        var b = c.langCode, b = f.availableLangs[b] ? b : f.availableLangs[b.replace(/-.*/, "")] ? b.replace(/-.*/, "") : "en";
                        CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(f.path + "dialogs/lang/" + b + ".js"), function () {
                            c.lang.a11yhelp = f.langEntries[b];
                            c.openDialog("a11yHelp")
                        })
                    }, modes: {wysiwyg: 1, source: 1}, readOnly: 1, canUndo: false
                });
                c.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp");
                CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js")
            }
        })
    }(),CKEDITOR.plugins.add("about", {
        requires: "dialog", init: function (c) {
            var f = c.addCommand("about", new CKEDITOR.dialogCommand("about"));
            f.modes = {wysiwyg: 1, source: 1};
            f.canUndo = false;
            f.readOnly = 1;
            c.ui.addButton && c.ui.addButton("About", {label: c.lang.about.title, command: "about", toolbar: "about"});
            CKEDITOR.dialog.add("about", this.path + "dialogs/about.js")
        }
    }),CKEDITOR.plugins.add("basicstyles", {
        init: function (c) {
            var f = 0, b = function (b, d, e, i) {
                if (i) {
                    var i = new CKEDITOR.style(i), k = a[e];
                    k.unshift(i);
                    c.attachStyleStateChange(i, function (a) {
                        !c.readOnly && c.getCommand(e).setState(a)
                    });
                    c.addCommand(e, new CKEDITOR.styleCommand(i, {contentForms: k}));
                    c.ui.addButton && c.ui.addButton(b, {label: d, command: e, toolbar: "basicstyles," + (f = f + 10)})
                }
            }, a = {
                bold: ["strong", "b", ["span", function (a) {
                    a = a.styles["font-weight"];
                    return a == "bold" || +a >= 700
                }]], italic: ["em", "i", ["span", function (a) {
                    return a.styles["font-style"] == "italic"
                }]], underline: ["u", ["span", function (a) {
                    return a.styles["text-decoration"] == "underline"
                }]], strike: ["s", "strike", ["span", function (a) {
                    return a.styles["text-decoration"] == "line-through"
                }]], subscript: ["sub"], superscript: ["sup"]
            }, d = c.config, i = c.lang.basicstyles;
            b("Bold", i.bold, "bold", d.coreStyles_bold);
            b("Italic", i.italic, "italic", d.coreStyles_italic);
            b("Underline", i.underline, "underline", d.coreStyles_underline);
            b("Strike", i.strike, "strike", d.coreStyles_strike);
            b("Subscript", i.subscript, "subscript", d.coreStyles_subscript);
            b("Superscript", i.superscript, "superscript", d.coreStyles_superscript);
            c.setKeystroke([[CKEDITOR.CTRL + 66, "bold"], [CKEDITOR.CTRL + 73, "italic"], [CKEDITOR.CTRL + 85, "underline"]])
        }
    }),CKEDITOR.config.coreStyles_bold = {
        element: "strong",
        overrides: "b"
    },CKEDITOR.config.coreStyles_italic = {
        element: "em",
        overrides: "i"
    },CKEDITOR.config.coreStyles_underline = {element: "u"},CKEDITOR.config.coreStyles_strike = {
        element: "s",
        overrides: "strike"
    },CKEDITOR.config.coreStyles_subscript = {element: "sub"},CKEDITOR.config.coreStyles_superscript = {element: "sup"},function () {
        var c = {
            exec: function (c) {
                var b = c.getCommand("blockquote").state, a = c.getSelection(), d = a && a.getRanges(true)[0];
                if (d) {
                    var i = a.createBookmarks();
                    if (CKEDITOR.env.ie) {
                        var g = i[0].startNode, h = i[0].endNode, e;
                        if (g && g.getParent().getName() == "blockquote")for (e = g; e = e.getNext();)if (e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary()) {
                            g.move(e, true);
                            break
                        }
                        if (h && h.getParent().getName() == "blockquote")for (e = h; e = e.getPrevious();)if (e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary()) {
                            h.move(e);
                            break
                        }
                    }
                    var j = d.createIterator();
                    j.enlargeBr = c.config.enterMode != CKEDITOR.ENTER_BR;
                    if (b == CKEDITOR.TRISTATE_OFF) {
                        for (g = []; b = j.getNextParagraph();)g.push(b);
                        if (g.length < 1) {
                            b = c.document.createElement(c.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div");
                            h = i.shift();
                            d.insertNode(b);
                            b.append(new CKEDITOR.dom.text("﻿", c.document));
                            d.moveToBookmark(h);
                            d.selectNodeContents(b);
                            d.collapse(true);
                            h = d.createBookmark();
                            g.push(b);
                            i.unshift(h)
                        }
                        e = g[0].getParent();
                        d = [];
                        for (h = 0; h < g.length; h++) {
                            b = g[h];
                            e = e.getCommonAncestor(b.getParent())
                        }
                        for (b = {table: 1, tbody: 1, tr: 1, ol: 1, ul: 1}; b[e.getName()];)e = e.getParent();
                        for (h = null; g.length > 0;) {
                            for (b = g.shift(); !b.getParent().equals(e);)b = b.getParent();
                            b.equals(h) || d.push(b);
                            h = b
                        }
                        for (; d.length > 0;) {
                            b = d.shift();
                            if (b.getName() == "blockquote") {
                                for (h = new CKEDITOR.dom.documentFragment(c.document); b.getFirst();) {
                                    h.append(b.getFirst().remove());
                                    g.push(h.getLast())
                                }
                                h.replace(b)
                            } else g.push(b)
                        }
                        d = c.document.createElement("blockquote");
                        for (d.insertBefore(g[0]); g.length > 0;) {
                            b = g.shift();
                            d.append(b)
                        }
                    } else if (b == CKEDITOR.TRISTATE_ON) {
                        h = [];
                        for (e = {}; b = j.getNextParagraph();) {
                            for (g = d = null; b.getParent();) {
                                if (b.getParent().getName() == "blockquote") {
                                    d = b.getParent();
                                    g = b;
                                    break
                                }
                                b = b.getParent()
                            }
                            if (d && g && !g.getCustomData("blockquote_moveout")) {
                                h.push(g);
                                CKEDITOR.dom.element.setMarker(e, g, "blockquote_moveout", true)
                            }
                        }
                        CKEDITOR.dom.element.clearAllMarkers(e);
                        b = [];
                        g = [];
                        for (e = {}; h.length > 0;) {
                            j = h.shift();
                            d = j.getParent();
                            if (j.getPrevious())if (j.getNext()) {
                                j.breakParent(j.getParent());
                                g.push(j.getNext())
                            } else j.remove().insertAfter(d); else j.remove().insertBefore(d);
                            if (!d.getCustomData("blockquote_processed")) {
                                g.push(d);
                                CKEDITOR.dom.element.setMarker(e, d, "blockquote_processed", true)
                            }
                            b.push(j)
                        }
                        CKEDITOR.dom.element.clearAllMarkers(e);
                        for (h = g.length - 1; h >= 0; h--) {
                            d = g[h];
                            a:{
                                e = d;
                                for (var j = 0, k = e.getChildCount(), n = void 0; j < k && (n = e.getChild(j)); j++)if (n.type == CKEDITOR.NODE_ELEMENT && n.isBlockBoundary()) {
                                    e = false;
                                    break a
                                }
                                e = true
                            }
                            e && d.remove()
                        }
                        if (c.config.enterMode == CKEDITOR.ENTER_BR)for (d = true; b.length;) {
                            j = b.shift();
                            if (j.getName() == "div") {
                                h = new CKEDITOR.dom.documentFragment(c.document);
                                d && (j.getPrevious() && !(j.getPrevious().type == CKEDITOR.NODE_ELEMENT && j.getPrevious().isBlockBoundary())) && h.append(c.document.createElement("br"));
                                for (d = j.getNext() && !(j.getNext().type == CKEDITOR.NODE_ELEMENT && j.getNext().isBlockBoundary()); j.getFirst();)j.getFirst().remove().appendTo(h);
                                d && h.append(c.document.createElement("br"));
                                h.replace(j);
                                d = false
                            }
                        }
                    }
                    a.selectBookmarks(i);
                    c.focus()
                }
            }, refresh: function (c, b) {
                this.setState(c.elementPath(b.block || b.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
            }, context: "blockquote", allowedContent: "blockquote", requiredContent: "blockquote"
        };
        CKEDITOR.plugins.add("blockquote", {
            init: function (f) {
                if (!f.blockless) {
                    f.addCommand("blockquote", c);
                    f.ui.addButton && f.ui.addButton("Blockquote", {
                        label: f.lang.blockquote.toolbar,
                        command: "blockquote",
                        toolbar: "blocks,10"
                    })
                }
            }
        })
    }(),"use strict",function () {
        function c(a) {
            function b() {
                var c = a.editable();
                c.on(u, function (a) {
                    (!CKEDITOR.env.ie || !s) && y(a)
                });
                CKEDITOR.env.ie && c.on("paste", function (b) {
                    if (!v) {
                        f();
                        b.data.preventDefault();
                        y(b);
                        o("paste") || a.openDialog("paste")
                    }
                });
                if (CKEDITOR.env.ie) {
                    c.on("contextmenu", i, null, null, 0);
                    c.on("beforepaste", function (a) {
                        a.data && !a.data.$.ctrlKey && i()
                    }, null, null, 0)
                }
                c.on("beforecut", function () {
                    !s && m(a)
                });
                var d;
                c.attachListener(CKEDITOR.env.ie ? c : a.document.getDocumentElement(), "mouseup", function () {
                    d = setTimeout(function () {
                        t()
                    }, 0)
                });
                a.on("destroy", function () {
                    clearTimeout(d)
                });
                c.on("keyup", t)
            }

            function c(b) {
                return {
                    type: b, canUndo: b == "cut", startDisabled: true, exec: function () {
                        this.type == "cut" && m();
                        var b;
                        var c = this.type;
                        if (CKEDITOR.env.ie)b = o(c); else try {
                            b = a.document.$.execCommand(c, false, null)
                        } catch (d) {
                            b = false
                        }
                        b || alert(a.lang.clipboard[this.type + "Error"]);
                        return b
                    }
                }
            }

            function d() {
                return {
                    canUndo: false, async: true, exec: function (a, b) {
                        var c = function (b, c) {
                            b && q(b.type, b.dataValue, !!c);
                            a.fire("afterCommandExec", {name: "paste", command: d, returnValue: !!b})
                        }, d = this;
                        typeof b == "string" ? c({type: "auto", dataValue: b}, 1) : a.getClipboardData(c)
                    }
                }
            }

            function f() {
                v = 1;
                setTimeout(function () {
                    v = 0
                }, 100)
            }

            function i() {
                s = 1;
                setTimeout(function () {
                    s = 0
                }, 10)
            }

            function o(b) {
                var c = a.document, d = c.getBody(), e = false, h = function () {
                    e = true
                };
                d.on(b, h);
                (CKEDITOR.env.version > 7 ? c.$ : c.$.selection.createRange()).execCommand(b);
                d.removeListener(b, h);
                return e
            }

            function q(b, c, d) {
                b = {type: b};
                if (d && !a.fire("beforePaste", b) || !c)return false;
                b.dataValue = c;
                return a.fire("paste", b)
            }

            function m() {
                if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
                    var b = a.getSelection(), c, d, e;
                    if (b.getType() == CKEDITOR.SELECTION_ELEMENT && (c = b.getSelectedElement())) {
                        d = b.getRanges()[0];
                        e = a.document.createText("");
                        e.insertBefore(c);
                        d.setStartBefore(e);
                        d.setEndAfter(c);
                        b.selectRanges([d]);
                        setTimeout(function () {
                            if (c.getParent()) {
                                e.remove();
                                b.selectElement(c)
                            }
                        }, 0)
                    }
                }
            }

            function p(b, c) {
                var d = a.document, e = a.editable(), h = function (a) {
                    a.cancel()
                }, f = CKEDITOR.env.gecko && CKEDITOR.env.version <= 10902, i;
                if (!d.getById("cke_pastebin")) {
                    var j = a.getSelection(), l = j.createBookmarks(), m = new CKEDITOR.dom.element((CKEDITOR.env.webkit || e.is("body")) && !CKEDITOR.env.ie && !CKEDITOR.env.opera ? "body" : "div", d);
                    m.setAttribute("id", "cke_pastebin");
                    CKEDITOR.env.opera && m.appendBogus();
                    var k = 0, d = d.getWindow();
                    if (f) {
                        m.insertAfter(l[0].startNode);
                        m.setStyle("display", "inline")
                    } else {
                        if (CKEDITOR.env.webkit) {
                            e.append(m);
                            m.addClass("cke_editable");
                            if (!e.is("body")) {
                                f = e.getComputedStyle("position") != "static" ? e : CKEDITOR.dom.element.get(e.$.offsetParent);
                                k = f.getDocumentPosition().y
                            }
                        } else e.getAscendant(CKEDITOR.env.ie || CKEDITOR.env.opera ? "body" : "html", 1).append(m);
                        m.setStyles({
                            position: "absolute",
                            top: d.getScrollPosition().y - k + 10 + "px",
                            width: "1px",
                            height: Math.max(1, d.getViewPaneSize().height -
                            20) + "px",
                            overflow: "hidden",
                            margin: 0,
                            padding: 0
                        })
                    }
                    if (f = m.getParent().isReadOnly()) {
                        m.setOpacity(0);
                        m.setAttribute("contenteditable", true)
                    } else m.setStyle(a.config.contentsLangDirection == "ltr" ? "left" : "right", "-1000px");
                    a.on("selectionChange", h, null, null, 0);
                    CKEDITOR.env.webkit && (i = e.once("blur", h, null, null, -100));
                    f && m.focus();
                    f = new CKEDITOR.dom.range(m);
                    f.selectNodeContents(m);
                    var p = f.select();
                    CKEDITOR.env.ie && (i = e.once("blur", function () {
                        a.lockSelection(p)
                    }));
                    var n = CKEDITOR.document.getWindow().getScrollPosition().y;
                    setTimeout(function () {
                        if (CKEDITOR.env.webkit || CKEDITOR.env.opera)CKEDITOR.document[CKEDITOR.env.webkit ? "getBody" : "getDocumentElement"]().$.scrollTop = n;
                        i && i.removeListener();
                        CKEDITOR.env.ie && e.focus();
                        j.selectBookmarks(l);
                        m.remove();
                        var b;
                        if (CKEDITOR.env.webkit && (b = m.getFirst()) && b.is && b.hasClass("Apple-style-span"))m = b;
                        a.removeListener("selectionChange", h);
                        c(m.getHtml())
                    }, 0)
                }
            }

            function r() {
                if (CKEDITOR.env.ie) {
                    a.focus();
                    f();
                    var b = a.focusManager;
                    b.lock();
                    if (a.editable().fire(u) && !o("paste")) {
                        b.unlock();
                        return false
                    }
                    b.unlock()
                } else try {
                    if (a.editable().fire(u) && !a.document.$.execCommand("Paste", false, null))throw 0;
                } catch (c) {
                    return false
                }
                return true
            }

            function l(b) {
                if (a.mode == "wysiwyg")switch (b.data.keyCode) {
                    case CKEDITOR.CTRL + 86:
                    case CKEDITOR.SHIFT + 45:
                        b = a.editable();
                        f();
                        !CKEDITOR.env.ie && b.fire("beforepaste");
                        (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.version < 10900) && b.fire("paste");
                        break;
                    case CKEDITOR.CTRL + 88:
                    case CKEDITOR.SHIFT + 46:
                        a.fire("saveSnapshot");
                        setTimeout(function () {
                            a.fire("saveSnapshot")
                        }, 0)
                }
            }

            function y(b) {
                var c = {type: "auto"}, d = a.fire("beforePaste", c);
                p(b, function (a) {
                    a = a.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, "");
                    d && q(c.type, a, 0, 1)
                })
            }

            function t() {
                if (a.mode == "wysiwyg") {
                    var b = A("Paste");
                    a.getCommand("cut").setState(A("Cut"));
                    a.getCommand("copy").setState(A("Copy"));
                    a.getCommand("paste").setState(b);
                    a.fire("pasteState", b)
                }
            }

            function A(b) {
                var c;
                if (w && b in{Paste: 1, Cut: 1})return CKEDITOR.TRISTATE_DISABLED;
                if (b == "Paste") {
                    CKEDITOR.env.ie && (s = 1);
                    try {
                        c = a.document.$.queryCommandEnabled(b) || CKEDITOR.env.webkit
                    } catch (d) {
                    }
                    s = 0
                } else {
                    b = a.getSelection();
                    c = b.getRanges();
                    c = b.getType() != CKEDITOR.SELECTION_NONE && !(c.length == 1 && c[0].collapsed)
                }
                return c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
            }

            var s = 0, v = 0, w = 0, u = CKEDITOR.env.ie ? "beforepaste" : "paste";
            (function () {
                a.on("key", l);
                a.on("contentDom", b);
                a.on("selectionChange", function (a) {
                    w = a.data.selection.getRanges()[0].checkReadOnly();
                    t()
                });
                a.contextMenu && a.contextMenu.addListener(function (a, b) {
                    w = b.getRanges()[0].checkReadOnly();
                    return {cut: A("Cut"), copy: A("Copy"), paste: A("Paste")}
                })
            })();
            (function () {
                function b(c, d, e, h, f) {
                    var i = a.lang.clipboard[d];
                    a.addCommand(d, e);
                    a.ui.addButton && a.ui.addButton(c, {label: i, command: d, toolbar: "clipboard," + h});
                    a.addMenuItems && a.addMenuItem(d, {label: i, command: d, group: "clipboard", order: f})
                }

                b("Cut", "cut", c("cut"), 10, 1);
                b("Copy", "copy", c("copy"), 20, 4);
                b("Paste", "paste", d(), 30, 8)
            })();
            a.getClipboardData = function (b, c) {
                function d(a) {
                    a.removeListener();
                    a.cancel();
                    c(a.data)
                }

                function e(a) {
                    a.removeListener();
                    a.cancel();
                    j = true;
                    c({type: i, dataValue: a.data})
                }

                function h() {
                    this.customTitle = b && b.title
                }

                var f = false, i = "auto", j = false;
                if (!c) {
                    c = b;
                    b = null
                }
                a.on("paste", d, null, null, 0);
                a.on("beforePaste", function (a) {
                    a.removeListener();
                    f = true;
                    i = a.data.type
                }, null, null, 1E3);
                if (r() === false) {
                    a.removeListener("paste", d);
                    if (f && a.fire("pasteDialog", h)) {
                        a.on("pasteDialogCommit", e);
                        a.on("dialogHide", function (a) {
                            a.removeListener();
                            a.data.removeListener("pasteDialogCommit", e);
                            setTimeout(function () {
                                j || c(null)
                            }, 10)
                        })
                    } else c(null)
                }
            }
        }

        function f(a) {
            if (CKEDITOR.env.webkit) {
                if (!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi))return "html"
            } else if (CKEDITOR.env.ie) {
                if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi))return "html"
            } else if (CKEDITOR.env.gecko || CKEDITOR.env.opera) {
                if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi))return "html"
            } else return "html";
            return "htmlifiedtext"
        }

        function b(a, b) {
            function c(a) {
                return CKEDITOR.tools.repeat("</p><p>", ~~(a / 2)) + (a % 2 == 1 ? "<br>" : "")
            }

            b = b.replace(/\s+/g, " ").replace(/> +</g, "><").replace(/<br ?\/>/gi, "<br>");
            b = b.replace(/<\/?[A-Z]+>/g, function (a) {
                return a.toLowerCase()
            });
            if (b.match(/^[^<]$/))return b;
            if (CKEDITOR.env.webkit && b.indexOf("<div>") > -1) {
                b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "<br>").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "<div></div>");
                b.match(/<div>(<br>|)<\/div>/) && (b = "<p>" + b.replace(/(<div>(<br>|)<\/div>)+/g, function (a) {
                    return c(a.split("</div><div>").length + 1)
                }) + "</p>");
                b = b.replace(/<\/div><div>/g, "<br>");
                b = b.replace(/<\/?div>/g, "")
            }
            if ((CKEDITOR.env.gecko || CKEDITOR.env.opera) && a.enterMode != CKEDITOR.ENTER_BR) {
                CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "<br>"));
                b.indexOf("<br><br>") > -1 && (b = "<p>" + b.replace(/(<br>){2,}/g, function (a) {
                    return c(a.length / 4)
                }) + "</p>")
            }
            return i(a, b)
        }

        function a() {
            var a = new CKEDITOR.htmlParser.filter, b = {
                blockquote: 1,
                dl: 1,
                fieldset: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                ol: 1,
                p: 1,
                table: 1,
                ul: 1
            }, c = CKEDITOR.tools.extend({br: 0}, CKEDITOR.dtd.$inline), d = {
                p: 1,
                br: 1,
                "cke:br": 1
            }, f = CKEDITOR.dtd, i = CKEDITOR.tools.extend({
                area: 1,
                basefont: 1,
                embed: 1,
                iframe: 1,
                map: 1,
                object: 1,
                param: 1
            }, CKEDITOR.dtd.$nonBodyContent, CKEDITOR.dtd.$cdata), o = function (a) {
                delete a.name;
                a.add(new CKEDITOR.htmlParser.text(" "))
            }, q = function (a) {
                for (var b = a, c; (b = b.next) && b.name && b.name.match(/^h\d$/);) {
                    c = new CKEDITOR.htmlParser.element("cke:br");
                    c.isEmpty = true;
                    for (a.add(c); c = b.children.shift();)a.add(c)
                }
            };
            a.addRules({
                elements: {
                    h1: q, h2: q, h3: q, h4: q, h5: q, h6: q, img: function (a) {
                        var a = CKEDITOR.tools.trim(a.attributes.alt || ""), b = " ";
                        a && !a.match(/(^http|\.(jpe?g|gif|png))/i) && (b = " [" +
                        a + "] ");
                        return new CKEDITOR.htmlParser.text(b)
                    }, td: o, th: o, $: function (a) {
                        var g = a.name, r;
                        if (i[g])return false;
                        a.attributes = [];
                        if (g == "br")return a;
                        if (b[g])a.name = "p"; else if (c[g])delete a.name; else if (f[g]) {
                            r = new CKEDITOR.htmlParser.element("cke:br");
                            r.isEmpty = true;
                            if (CKEDITOR.dtd.$empty[g])return r;
                            a.add(r, 0);
                            r = r.clone();
                            r.isEmpty = true;
                            a.add(r);
                            delete a.name
                        }
                        d[a.name] || delete a.name;
                        return a
                    }
                }
            }, {applyToAll: true});
            return a
        }

        function d(a, b, c) {
            var b = new CKEDITOR.htmlParser.fragment.fromHtml(b), d = new CKEDITOR.htmlParser.basicWriter;
            b.writeHtml(d, c);
            var b = d.getHtml(), b = b.replace(/\s*(<\/?[a-z:]+ ?\/?>)\s*/g, "$1").replace(/(<cke:br \/>){2,}/g, "<cke:br />").replace(/(<cke:br \/>)(<\/?p>|<br \/>)/g, "$2").replace(/(<\/?p>|<br \/>)(<cke:br \/>)/g, "$1").replace(/<(cke:)?br( \/)?>/g, "<br>").replace(/<p><\/p>/g, ""), f = 0, b = b.replace(/<\/?p>/g, function (a) {
                if (a == "<p>") {
                    if (++f > 1)return "</p><p>"
                } else if (--f > 0)return "</p><p>";
                return a
            }).replace(/<p><\/p>/g, "");
            return i(a, b)
        }

        function i(a, b) {
            a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function (a) {
                return CKEDITOR.tools.repeat("<br>", a.length / 7 * 2)
            }).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "<$1div>"));
            return b
        }

        CKEDITOR.plugins.add("clipboard", {
            requires: "dialog", init: function (g) {
                var h;
                c(g);
                CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js"));
                g.on("paste", function (a) {
                    var b = a.data.dataValue, c = CKEDITOR.dtd.$block;
                    if (b.indexOf("Apple-") > -1) {
                        b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " ");
                        a.data.type != "html" && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function (a, b) {
                            return b.replace(/\t/g, "&nbsp;&nbsp; &nbsp;")
                        }));
                        if (b.indexOf('<br class="Apple-interchange-newline">') > -1) {
                            a.data.startsWithEOL = 1;
                            a.data.preSniffing = "html";
                            b = b.replace(/<br class="Apple-interchange-newline">/, "")
                        }
                        b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1")
                    }
                    if (b.match(/^<[^<]+cke_(editable|contents)/i)) {
                        var d, g, h = new CKEDITOR.dom.element("div");
                        for (h.setHtml(b); h.getChildCount() == 1 && (d = h.getFirst()) && d.type == CKEDITOR.NODE_ELEMENT && (d.hasClass("cke_editable") || d.hasClass("cke_contents"));)h = g = d;
                        g && (b = g.getHtml().replace(/<br>$/i, ""))
                    }
                    CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function (b, d) {
                        if (d.toLowerCase()in c) {
                            a.data.preSniffing = "html";
                            return "<" + d
                        }
                        return b
                    }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function (b, d) {
                        if (d in c) {
                            a.data.endsWithEOL = 1;
                            return "</" + d + ">"
                        }
                        return b
                    }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1"));
                    a.data.dataValue = b
                }, null, null, 3);
                g.on("paste", function (c) {
                    var c = c.data, i = c.type, k = c.dataValue, n, o = g.config.clipboard_defaultContentType || "html";
                    n = i == "html" || c.preSniffing == "html" ? "html" : f(k);
                    n == "htmlifiedtext" ? k = b(g.config, k) : i == "text" && n == "html" && (k = d(g.config, k, h || (h = a(g))));
                    c.startsWithEOL && (k = '<br data-cke-eol="1">' + k);
                    c.endsWithEOL && (k = k + '<br data-cke-eol="1">');
                    i == "auto" && (i = n == "html" || o == "html" ? "html" : "text");
                    c.type = i;
                    c.dataValue = k;
                    delete c.preSniffing;
                    delete c.startsWithEOL;
                    delete c.endsWithEOL
                }, null, null, 6);
                g.on("paste", function (a) {
                    a = a.data;
                    g.insertHtml(a.dataValue, a.type);
                    setTimeout(function () {
                        g.fire("afterPaste")
                    }, 0)
                }, null, null, 1E3);
                g.on("pasteDialog", function (a) {
                    setTimeout(function () {
                        g.openDialog("paste", a.data)
                    }, 0)
                })
            }
        })
    }(),function () {
        CKEDITOR.plugins.add("panel", {
            beforeInit: function (a) {
                a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler)
            }
        });
        CKEDITOR.UI_PANEL = "panel";
        CKEDITOR.ui.panel = function (a, b) {
            b && CKEDITOR.tools.extend(this, b);
            CKEDITOR.tools.extend(this, {className: "", css: []});
            this.id = CKEDITOR.tools.getNextId();
            this.document = a;
            this.isFramed = this.forceIFrame || this.css.length;
            this._ = {blocks: {}}
        };
        CKEDITOR.ui.panel.handler = {
            create: function (a) {
                return new CKEDITOR.ui.panel(a)
            }
        };
        var c = CKEDITOR.addTemplate("panel", '<div lang="{langCode}" id="{id}" dir={dir} class="cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style="z-index:{z-index}" role="presentation">{frame}</div>'), f = CKEDITOR.addTemplate("panel-frame", '<iframe id="{id}" class="cke_panel_frame" role="presentation" frameborder="0" src="{src}"></iframe>'), b = CKEDITOR.addTemplate("panel-frame-inner", '<!DOCTYPE html><html class="cke_panel_container {env}" dir="{dir}" lang="{langCode}"><head>{css}</head><body class="cke_{dir}" style="margin:0;padding:0" onload="{onload}"></body></html>');
        CKEDITOR.ui.panel.prototype = {
            render: function (a, d) {
                this.getHolderElement = function () {
                    var a = this._.holder;
                    if (!a) {
                        if (this.isFramed) {
                            var a = this.document.getById(this.id + "_frame"), c = a.getParent(), a = a.getFrameDocument();
                            CKEDITOR.env.iOS && c.setStyles({
                                overflow: "scroll",
                                "-webkit-overflow-scrolling": "touch"
                            });
                            c = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function () {
                                this.isLoaded = true;
                                if (this.onLoad)this.onLoad()
                            }, this));
                            a.write(b.output(CKEDITOR.tools.extend({
                                css: CKEDITOR.tools.buildStyleHtml(this.css),
                                onload: "window.parent.CKEDITOR.tools.callFunction(" + c + ");"
                            }, i)));
                            a.getWindow().$.CKEDITOR = CKEDITOR;
                            a.on("key" + (CKEDITOR.env.opera ? "press" : "down"), function (a) {
                                var b = a.data.getKeystroke(), c = this.document.getById(this.id).getAttribute("dir");
                                this._.onKeyDown && this._.onKeyDown(b) === false ? a.data.preventDefault() : (b == 27 || b == (c == "rtl" ? 39 : 37)) && this.onEscape && this.onEscape(b) === false && a.data.preventDefault()
                            }, this);
                            a = a.getBody();
                            a.unselectable();
                            CKEDITOR.env.air && CKEDITOR.tools.callFunction(c)
                        } else a = this.document.getById(this.id);
                        this._.holder = a
                    }
                    return a
                };
                var i = {
                    editorId: a.id,
                    id: this.id,
                    langCode: a.langCode,
                    dir: a.lang.dir,
                    cls: this.className,
                    frame: "",
                    env: CKEDITOR.env.cssClass,
                    "z-index": a.config.baseFloatZIndex + 1
                };
                if (this.isFramed) {
                    var g = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" +
                    encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : "";
                    i.frame = f.output({id: this.id + "_frame", src: g})
                }
                g = c.output(i);
                d && d.push(g);
                return g
            }, addBlock: function (a, b) {
                b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block ? b : new CKEDITOR.ui.panel.block(this.getHolderElement(), b);
                this._.currentBlock || this.showBlock(a);
                return b
            }, getBlock: function (a) {
                return this._.blocks[a]
            }, showBlock: function (a) {
                var a = this._.blocks[a], b = this._.currentBlock, c = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame");
                if (b) {
                    c.removeAttributes(b.attributes);
                    b.hide()
                }
                this._.currentBlock = a;
                c.setAttributes(a.attributes);
                CKEDITOR.fire("ariaWidget", c);
                a._.focusIndex = -1;
                this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a);
                a.show();
                return a
            }, destroy: function () {
                this.element && this.element.remove()
            }
        };
        CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({
            $: function (a, b) {
                this.element = a.append(a.getDocument().createElement("div", {
                    attributes: {
                        tabIndex: -1,
                        "class": "cke_panel_block",
                        role: "presentation",
                        tabindex: 0
                    }, styles: {display: "none"}
                }));
                b && CKEDITOR.tools.extend(this, b);
                this.element.setAttributes({
                    "aria-label": this.attributes["aria-label"],
                    title: this.attributes.title || this.attributes["aria-label"]
                });
                delete this.attributes["aria-label"];
                delete this.attributes.title;
                this.keys = {};
                this._.focusIndex = -1;
                this.element.disableContextMenu()
            }, _: {
                markItem: function (a) {
                    if (a != -1) {
                        a = this.element.getElementsByTag("a").getItem(this._.focusIndex = a);
                        (CKEDITOR.env.webkit || CKEDITOR.env.opera) && a.getDocument().getWindow().focus();
                        a.focus();
                        this.onMark && this.onMark(a)
                    }
                }
            }, proto: {
                show: function () {
                    this.element.setStyle("display", "")
                }, hide: function () {
                    (!this.onHide || this.onHide.call(this) !== true) && this.element.setStyle("display", "none")
                }, onKeyDown: function (a) {
                    var b = this.keys[a];
                    switch (b) {
                        case"next":
                            for (var a = this._.focusIndex, b = this.element.getElementsByTag("a"), c; c = b.getItem(++a);)if (c.getAttribute("_cke_focus") && c.$.offsetWidth) {
                                this._.focusIndex = a;
                                c.focus();
                                break
                            }
                            return false;
                        case"prev":
                            a = this._.focusIndex;
                            for (b = this.element.getElementsByTag("a"); a > 0 && (c = b.getItem(--a));)if (c.getAttribute("_cke_focus") && c.$.offsetWidth) {
                                this._.focusIndex = a;
                                c.focus();
                                break
                            }
                            return false;
                        case"click":
                        case"mouseup":
                            a = this._.focusIndex;
                            (c = a >= 0 && this.element.getElementsByTag("a").getItem(a)) && (c.$[b] ? c.$[b]() : c.$["on" + b]());
                            return false
                    }
                    return true
                }
            }
        })
    }(),CKEDITOR.plugins.add("floatpanel", {requires: "panel"}),function () {
        function c(b, a, c, i, g) {
            var g = CKEDITOR.tools.genKey(a.getUniqueId(), c.getUniqueId(), b.lang.dir, b.uiColor || "", i.css || "", g || ""), h = f[g];
            if (!h) {
                h = f[g] = new CKEDITOR.ui.panel(a, i);
                h.element = c.append(CKEDITOR.dom.element.createFromHtml(h.render(b), a));
                h.element.setStyles({display: "none", position: "absolute"})
            }
            return h
        }

        var f = {};
        CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
            $: function (b, a, d, f) {
                function g() {
                    k.hide()
                }

                d.forceIFrame = 1;
                d.toolbarRelated && b.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (a = CKEDITOR.document.getById("cke_" + b.name));
                var h = a.getDocument(), f = c(b, h, a, d, f || 0), e = f.element, j = e.getFirst(), k = this;
                e.disableContextMenu();
                this.element = e;
                this._ = {
                    editor: b,
                    panel: f,
                    parentElement: a,
                    definition: d,
                    document: h,
                    iframe: j,
                    children: [],
                    dir: b.lang.dir
                };
                b.on("mode", g);
                b.on("resize", g);
                h.getWindow().on("resize", g)
            }, proto: {
                addBlock: function (b, a) {
                    return this._.panel.addBlock(b, a)
                }, addListBlock: function (b, a) {
                    return this._.panel.addListBlock(b, a)
                }, getBlock: function (b) {
                    return this._.panel.getBlock(b)
                }, showBlock: function (b, a, c, f, g, h) {
                    var e = this._.panel, j = e.showBlock(b);
                    this.allowBlur(false);
                    b = this._.editor.editable();
                    this._.returnFocus = b.hasFocus ? b : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);
                    var k = this.element, b = this._.iframe, b = CKEDITOR.env.ie ? b : new CKEDITOR.dom.window(b.$.contentWindow), n = k.getDocument(), o = this._.parentElement.getPositionedAncestor(), q = a.getDocumentPosition(n), n = o ? o.getDocumentPosition(n) : {
                        x: 0,
                        y: 0
                    }, m = this._.dir == "rtl", p = q.x + (f || 0) - n.x, r = q.y + (g || 0) - n.y;
                    if (m && (c == 1 || c == 4))p = p + a.$.offsetWidth; else if (!m && (c == 2 || c == 3))p = p + (a.$.offsetWidth - 1);
                    if (c == 3 || c == 4)r = r + (a.$.offsetHeight - 1);
                    this._.panel._.offsetParentId = a.getId();
                    k.setStyles({top: r + "px", left: 0, display: ""});
                    k.setOpacity(0);
                    k.getFirst().removeStyle("width");
                    this._.editor.focusManager.add(b);
                    if (!this._.blurSet) {
                        CKEDITOR.event.useCapture = true;
                        b.on("blur", function (a) {
                            if (this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && this.visible && !this._.activeChild) {
                                delete this._.returnFocus;
                                this.hide()
                            }
                        }, this);
                        b.on("focus", function () {
                            this._.focused = true;
                            this.hideChild();
                            this.allowBlur(true)
                        }, this);
                        CKEDITOR.event.useCapture = false;
                        this._.blurSet = 1
                    }
                    e.onEscape = CKEDITOR.tools.bind(function (a) {
                        if (this.onEscape && this.onEscape(a) === false)return false
                    }, this);
                    CKEDITOR.tools.setTimeout(function () {
                        var a = CKEDITOR.tools.bind(function () {
                            k.removeStyle("width");
                            if (j.autoSize) {
                                var a = j.element.getDocument(), a = (CKEDITOR.env.webkit ? j.element : a.getBody()).$.scrollWidth;
                                CKEDITOR.env.ie && (CKEDITOR.env.quirks && a > 0) && (a = a + ((k.$.offsetWidth || 0) - (k.$.clientWidth || 0) + 3));
                                k.setStyle("width", a + 10 + "px");
                                a = j.element.$.scrollHeight;
                                CKEDITOR.env.ie && (CKEDITOR.env.quirks && a > 0) && (a = a + ((k.$.offsetHeight || 0) - (k.$.clientHeight || 0) + 3));
                                k.setStyle("height", a + "px");
                                e._.currentBlock.element.setStyle("display", "none").removeStyle("display")
                            } else k.removeStyle("height");
                            m && (p = p - k.$.offsetWidth);
                            k.setStyle("left", p + "px");
                            var b = e.element.getWindow(), a = k.$.getBoundingClientRect(), b = b.getViewPaneSize(), c = a.width || a.right - a.left, d = a.height || a.bottom - a.top, g = m ? a.right : b.width - a.left, f = m ? b.width - a.right : a.left;
                            m ? g < c && (p = f > c ? p + c : b.width > c ? p - a.left : p - a.right + b.width) : g < c && (p = f > c ? p - c : b.width > c ? p - a.right + b.width : p - a.left);
                            c = a.top;
                            b.height - a.top < d && (r = c > d ? r - d : b.height > d ? r - a.bottom + b.height : r - a.top);
                            if (CKEDITOR.env.ie) {
                                b = a = new CKEDITOR.dom.element(k.$.offsetParent);
                                b.getName() == "html" && (b = b.getDocument().getBody());
                                b.getComputedStyle("direction") == "rtl" && (p = CKEDITOR.env.ie8Compat ? p - k.getDocument().getDocumentElement().$.scrollLeft * 2 : p - (a.$.scrollWidth - a.$.clientWidth))
                            }
                            var a = k.getFirst(), i;
                            (i = a.getCustomData("activePanel")) && i.onHide && i.onHide.call(this, 1);
                            a.setCustomData("activePanel", this);
                            k.setStyles({top: r + "px", left: p + "px"});
                            k.setOpacity(1);
                            h && h()
                        }, this);
                        e.isLoaded ? a() : e.onLoad = a;
                        CKEDITOR.tools.setTimeout(function () {
                            this.focus();
                            this.allowBlur(true);
                            this._.editor.fire("panelShow", this)
                        }, 0, this)
                    }, CKEDITOR.env.air ? 200 : 0, this);
                    this.visible = 1;
                    this.onShow && this.onShow.call(this)
                }, focus: function () {
                    if (CKEDITOR.env.webkit) {
                        var b = CKEDITOR.document.getActive();
                        !b.equals(this._.iframe) && b.$.blur()
                    }
                    (this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus()
                }, blur: function () {
                    var b = this._.iframe.getFrameDocument().getActive();
                    b.is("a") && (this._.lastFocused = b)
                }, hide: function (b) {
                    if (this.visible && (!this.onHide || this.onHide.call(this) !== true)) {
                        this.hideChild();
                        CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur();
                        this.element.setStyle("display", "none");
                        this.visible = 0;
                        this.element.getFirst().removeCustomData("activePanel");
                        if (b = b && this._.returnFocus) {
                            CKEDITOR.env.webkit && b.type && b.getWindow().$.focus();
                            b.focus()
                        }
                        delete this._.lastFocused;
                        this._.editor.fire("panelHide", this)
                    }
                }, allowBlur: function (b) {
                    var a = this._.panel;
                    if (b != void 0)a.allowBlur = b;
                    return a.allowBlur
                }, showAsChild: function (b, a, c, f, g, h) {
                    if (!(this._.activeChild == b && b._.panel._.offsetParentId == c.getId())) {
                        this.hideChild();
                        b.onHide = CKEDITOR.tools.bind(function () {
                            CKEDITOR.tools.setTimeout(function () {
                                this._.focused || this.hide()
                            }, 0, this)
                        }, this);
                        this._.activeChild = b;
                        this._.focused = false;
                        b.showBlock(a, c, f, g, h);
                        this.blur();
                        (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function () {
                            b.element.getChild(0).$.style.cssText += ""
                        }, 100)
                    }
                }, hideChild: function (b) {
                    var a = this._.activeChild;
                    if (a) {
                        delete a.onHide;
                        delete this._.activeChild;
                        a.hide();
                        b && this.focus()
                    }
                }
            }
        });
        CKEDITOR.on("instanceDestroyed", function () {
            var b = CKEDITOR.tools.isEmpty(CKEDITOR.instances), a;
            for (a in f) {
                var c = f[a];
                b ? c.destroy() : c.element.hide()
            }
            b && (f = {})
        })
    }(),CKEDITOR.plugins.add("menu", {
        requires: "floatpanel", beforeInit: function (c) {
            for (var f = c.config.menu_groups.split(","), b = c._.menuGroups = {}, a = c._.menuItems = {}, d = 0; d < f.length; d++)b[f[d]] = d + 1;
            c.addMenuGroup = function (a, c) {
                b[a] = c || 100
            };
            c.addMenuItem = function (c, d) {
                b[d.group] && (a[c] = new CKEDITOR.menuItem(this, c, d))
            };
            c.addMenuItems = function (a) {
                for (var b in a)this.addMenuItem(b, a[b])
            };
            c.getMenuItem = function (b) {
                return a[b]
            };
            c.removeMenuItem = function (b) {
                delete a[b]
            }
        }
    }),function () {
        function c(a) {
            a.sort(function (a, b) {
                return a.group < b.group ? -1 : a.group > b.group ? 1 : a.order < b.order ? -1 : a.order > b.order ? 1 : 0
            })
        }

        var f = '<span class="cke_menuitem"><a id="{id}" class="cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href="{href}" title="{title}" tabindex="-1"_cke_focus=1 hidefocus="true" role="menuitem" aria-haspopup="{hasPopup}" aria-disabled="{disabled}"';
        if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac)f = f + ' onkeypress="return false;"';
        CKEDITOR.env.gecko && (f = f + ' onblur="this.style.cssText = this.style.cssText;"');
        var f = f + (' onmouseover="CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout="CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},{index}); return false;">'), b = CKEDITOR.addTemplate("menuItem", f + '<span class="cke_menubutton_inner"><span class="cke_menubutton_icon"><span class="cke_button_icon cke_button__{iconName}_icon" style="{iconStyle}"></span></span><span class="cke_menubutton_label">{label}</span>{arrowHtml}</span></a></span>'), a = CKEDITOR.addTemplate("menuArrow", '<span class="cke_menuarrow"><span>{label}</span></span>');
        CKEDITOR.menu = CKEDITOR.tools.createClass({
            $: function (a, b) {
                b = this._.definition = b || {};
                this.id = CKEDITOR.tools.getNextId();
                this.editor = a;
                this.items = [];
                this._.listeners = [];
                this._.level = b.level || 1;
                var c = CKEDITOR.tools.extend({}, b.panel, {
                    css: [CKEDITOR.skin.getPath("editor")],
                    level: this._.level - 1,
                    block: {}
                }), h = c.block.attributes = c.attributes || {};
                !h.role && (h.role = "menu");
                this._.panelDefinition = c
            }, _: {
                onShow: function () {
                    var a = this.editor.getSelection(), b = a && a.getStartElement(), c = this.editor.elementPath(), h = this._.listeners;
                    this.removeAll();
                    for (var e = 0; e < h.length; e++) {
                        var f = h[e](b, a, c);
                        if (f)for (var k in f) {
                            var n = this.editor.getMenuItem(k);
                            if (n && (!n.command || this.editor.getCommand(n.command).state)) {
                                n.state = f[k];
                                this.add(n)
                            }
                        }
                    }
                }, onClick: function (a) {
                    this.hide();
                    if (a.onClick)a.onClick(); else a.command && this.editor.execCommand(a.command)
                }, onEscape: function (a) {
                    var b = this.parent;
                    b ? b._.panel.hideChild(1) : a == 27 && this.hide(1);
                    return false
                }, onHide: function () {
                    this.onHide && this.onHide()
                }, showSubMenu: function (a) {
                    var b = this._.subMenu, c = this.items[a];
                    if (c = c.getItems && c.getItems()) {
                        if (b)b.removeAll(); else {
                            b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, {level: this._.level + 1}, true));
                            b.parent = this;
                            b._.onClick = CKEDITOR.tools.bind(this._.onClick, this)
                        }
                        for (var h in c) {
                            var e = this.editor.getMenuItem(h);
                            if (e) {
                                e.state = c[h];
                                b.add(e)
                            }
                        }
                        var f = this._.panel.getBlock(this.id).element.getDocument().getById(this.id +
                        ("" + a));
                        setTimeout(function () {
                            b.show(f, 2)
                        }, 0)
                    } else this._.panel.hideChild(1)
                }
            }, proto: {
                add: function (a) {
                    if (!a.order)a.order = this.items.length;
                    this.items.push(a)
                }, removeAll: function () {
                    this.items = []
                }, show: function (a, b, g, h) {
                    if (!this.parent) {
                        this._.onShow();
                        if (!this.items.length)return
                    }
                    var b = b || (this.editor.lang.dir == "rtl" ? 2 : 1), e = this.items, f = this.editor, k = this._.panel, n = this._.element;
                    if (!k) {
                        k = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level);
                        k.onEscape = CKEDITOR.tools.bind(function (a) {
                            if (this._.onEscape(a) === false)return false
                        }, this);
                        k.onShow = function () {
                            k._.panel.getHolderElement().getParent().addClass("cke cke_reset_all")
                        };
                        k.onHide = CKEDITOR.tools.bind(function () {
                            this._.onHide && this._.onHide()
                        }, this);
                        n = k.addBlock(this.id, this._.panelDefinition.block);
                        n.autoSize = true;
                        var o = n.keys;
                        o[40] = "next";
                        o[9] = "next";
                        o[38] = "prev";
                        o[CKEDITOR.SHIFT + 9] = "prev";
                        o[f.lang.dir == "rtl" ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click";
                        o[32] = CKEDITOR.env.ie ? "mouseup" : "click";
                        CKEDITOR.env.ie && (o[13] = "mouseup");
                        n = this._.element = n.element;
                        o = n.getDocument();
                        o.getBody().setStyle("overflow", "hidden");
                        o.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden");
                        this._.itemOverFn = CKEDITOR.tools.addFunction(function (a) {
                            clearTimeout(this._.showSubTimeout);
                            this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, f.config.menu_subMenuDelay || 400, this, [a])
                        }, this);
                        this._.itemOutFn = CKEDITOR.tools.addFunction(function () {
                            clearTimeout(this._.showSubTimeout)
                        }, this);
                        this._.itemClickFn = CKEDITOR.tools.addFunction(function (a) {
                            var b = this.items[a];
                            if (b.state == CKEDITOR.TRISTATE_DISABLED)this.hide(1); else if (b.getItems)this._.showSubMenu(a); else this._.onClick(b)
                        }, this)
                    }
                    c(e);
                    for (var o = f.elementPath(), o = ['<div class="cke_menu' + (o && o.direction() != f.lang.dir ? " cke_mixed_dir_content" : "") + '" role="presentation">'], q = e.length, m = q && e[0].group, p = 0; p < q; p++) {
                        var r = e[p];
                        if (m != r.group) {
                            o.push('<div class="cke_menuseparator" role="separator"></div>');
                            m = r.group
                        }
                        r.render(this, p, o)
                    }
                    o.push("</div>");
                    n.setHtml(o.join(""));
                    CKEDITOR.ui.fire("ready", this);
                    this.parent ? this.parent._.panel.showAsChild(k, this.id, a, b, g, h) : k.showBlock(this.id, a, b, g, h);
                    f.fire("menuShow", [k])
                }, addListener: function (a) {
                    this._.listeners.push(a)
                }, hide: function (a) {
                    this._.onHide && this._.onHide();
                    this._.panel && this._.panel.hide(a)
                }
            }
        });
        CKEDITOR.menuItem = CKEDITOR.tools.createClass({
            $: function (a, b, c) {
                CKEDITOR.tools.extend(this, c, {order: 0, className: "cke_menubutton__" + b});
                this.group = a._.menuGroups[this.group];
                this.editor = a;
                this.name = b
            }, proto: {
                render: function (c, f, g) {
                    var h = c.id + ("" + f), e = typeof this.state == "undefined" ? CKEDITOR.TRISTATE_OFF : this.state, j = e == CKEDITOR.TRISTATE_ON ? "on" : e == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off", k = this.getItems, n = "&#" + (this.editor.lang.dir == "rtl" ? "9668" : "9658") + ";", o = this.name;
                    if (this.icon && !/\./.test(this.icon))o = this.icon;
                    c = {
                        id: h,
                        name: this.name,
                        iconName: o,
                        label: this.label,
                        cls: this.className || "",
                        state: j,
                        hasPopup: k ? "true" : "false",
                        disabled: e == CKEDITOR.TRISTATE_DISABLED,
                        title: this.label,
                        href: "javascript:void('" +
                        (this.label || "").replace("'") + "')",
                        hoverFn: c._.itemOverFn,
                        moveOutFn: c._.itemOutFn,
                        clickFn: c._.itemClickFn,
                        index: f,
                        iconStyle: CKEDITOR.skin.getIconStyle(o, this.editor.lang.dir == "rtl", o == this.icon ? null : this.icon, this.iconOffset),
                        arrowHtml: k ? a.output({label: n}) : ""
                    };
                    b.output(c, g)
                }
            }
        })
    }(),CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div",CKEDITOR.plugins.add("contextmenu", {
        requires: "menu", onLoad: function () {
            CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
                base: CKEDITOR.menu, $: function (c) {
                    this.base.call(this, c, {
                        panel: {
                            className: "cke_menu_panel",
                            attributes: {"aria-label": c.lang.contextmenu.options}
                        }
                    })
                }, proto: {
                    addTarget: function (c, f) {
                        if (CKEDITOR.env.opera && !("oncontextmenu"in document.body)) {
                            var b;
                            c.on("mousedown", function (a) {
                                a = a.data;
                                if (a.$.button != 2)a.getKeystroke() == CKEDITOR.CTRL + 1 && c.fire("contextmenu", a); else if (!f || !(CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey)) {
                                    var d = a.getTarget();
                                    if (!b) {
                                        d = d.getDocument();
                                        b = d.createElement("input");
                                        b.$.type = "button";
                                        d.getBody().append(b)
                                    }
                                    b.setAttribute("style", "position:absolute;top:" + (a.$.clientY - 2) + "px;left:" + (a.$.clientX - 2) + "px;width:5px;height:5px;opacity:0.01")
                                }
                            });
                            c.on("mouseup", function (a) {
                                if (b) {
                                    b.remove();
                                    b = void 0;
                                    c.fire("contextmenu", a.data)
                                }
                            })
                        }
                        c.on("contextmenu", function (b) {
                            b = b.data;
                            if (!f || !(CKEDITOR.env.webkit ? a : CKEDITOR.env.mac ? b.$.metaKey : b.$.ctrlKey)) {
                                b.preventDefault();
                                var c = b.getTarget().getDocument(), d = b.getTarget().getDocument().getDocumentElement(), e = !c.equals(CKEDITOR.document), c = c.getWindow().getScrollPosition(), j = e ? b.$.clientX : b.$.pageX || c.x + b.$.clientX, k = e ? b.$.clientY : b.$.pageY || c.y + b.$.clientY;
                                CKEDITOR.tools.setTimeout(function () {
                                    this.open(d, null, j, k)
                                }, CKEDITOR.env.ie ? 200 : 0, this)
                            }
                        }, this);
                        if (CKEDITOR.env.opera)c.on("keypress", function (a) {
                            a = a.data;
                            a.$.keyCode === 0 && a.preventDefault()
                        });
                        if (CKEDITOR.env.webkit) {
                            var a, d = function () {
                                a = 0
                            };
                            c.on("keydown", function (b) {
                                a = CKEDITOR.env.mac ? b.data.$.metaKey : b.data.$.ctrlKey
                            });
                            c.on("keyup", d);
                            c.on("contextmenu", d)
                        }
                    }, open: function (c, f, b, a) {
                        this.editor.focus();
                        c = c || CKEDITOR.document.getDocumentElement();
                        this.editor.selectionChange(1);
                        this.show(c, f, b, a)
                    }
                }
            })
        }, beforeInit: function (c) {
            var f = c.contextMenu = new CKEDITOR.plugins.contextMenu(c);
            c.on("contentDom", function () {
                f.addTarget(c.editable(), c.config.browserContextMenuOnCtrl !== false)
            });
            c.addCommand("contextMenu", {
                exec: function () {
                    c.contextMenu.open(c.document.getBody())
                }
            });
            c.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu");
            c.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT +
            121, "contextMenu")
        }
    }),function () {
        var c;

        function f(a, g) {
            function h(b) {
                b = a._.elementsPath.list[b];
                if (b.equals(a.editable())) {
                    var c = a.createRange();
                    c.selectNodeContents(b);
                    c.select()
                } else a.getSelection().selectElement(b);
                a.focus()
            }

            function e() {
                k && k.setHtml(b);
                delete a._.elementsPath.list
            }

            var f = a.ui.spaceId("path"), k, n = "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_";
            a._.elementsPath = {idBase: n, filters: []};
            g.html = g.html + ('<span id="' + f + '_label" class="cke_voice_label">' + a.lang.elementspath.eleLabel + '</span><span id="' + f + '" class="cke_path" role="group" aria-labelledby="' + f + '_label">' + b + "</span>");
            a.on("uiReady", function () {
                var b = a.ui.space("path");
                b && a.focusManager.add(b, 1)
            });
            var o = CKEDITOR.tools.addFunction(h), q = CKEDITOR.tools.addFunction(function (b, c) {
                var d = a._.elementsPath.idBase, e, c = new CKEDITOR.dom.event(c);
                e = a.lang.dir == "rtl";
                switch (c.getKeystroke()) {
                    case e ? 39 : 37:
                    case 9:
                        (e = CKEDITOR.document.getById(d + (b + 1))) || (e = CKEDITOR.document.getById(d + "0"));
                        e.focus();
                        return false;
                    case e ? 37 : 39:
                    case CKEDITOR.SHIFT +
                    9:
                        (e = CKEDITOR.document.getById(d + (b - 1))) || (e = CKEDITOR.document.getById(d + (a._.elementsPath.list.length - 1)));
                        e.focus();
                        return false;
                    case 27:
                        a.focus();
                        return false;
                    case 13:
                    case 32:
                        h(b);
                        return false
                }
                return true
            });
            a.on("selectionChange", function (c) {
                for (var e = a.editable(), g = c.data.selection.getStartElement(), c = [], h = a._.elementsPath.list = [], y = a._.elementsPath.filters; g;) {
                    var t = 0, A;
                    A = g.data("cke-display-name") ? g.data("cke-display-name") : g.data("cke-real-element-type") ? g.data("cke-real-element-type") : g.getName();
                    for (var s = 0; s < y.length; s++) {
                        var v = y[s](g, A);
                        if (v === false) {
                            t = 1;
                            break
                        }
                        A = v || A
                    }
                    if (!t) {
                        t = h.push(g) - 1;
                        s = a.lang.elementspath.eleTitle.replace(/%1/, A);
                        A = d.output({
                            id: n + t,
                            label: s,
                            text: A,
                            jsTitle: "javascript:void('" + A + "')",
                            index: t,
                            keyDownFn: q,
                            clickFn: o
                        });
                        c.unshift(A)
                    }
                    if (g.equals(e))break;
                    g = g.getParent()
                }
                k || (k = CKEDITOR.document.getById(f));
                e = k;
                e.setHtml(c.join("") + b);
                a.fire("elementsPathUpdate", {space: e})
            });
            a.on("readOnly", e);
            a.on("contentDomUnload", e);
            a.addCommand("elementsPathFocus", c);
            a.setKeystroke(CKEDITOR.ALT +
            122, "elementsPathFocus")
        }

        c = {
            editorFocus: false, readOnly: 1, exec: function (a) {
                (a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air)
            }
        };
        var b = '<span class="cke_path_empty">&nbsp;</span>', a = "";
        if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac)a = a + ' onkeypress="return false;"';
        CKEDITOR.env.gecko && (a = a + ' onblur="this.style.cssText = this.style.cssText;"');
        var d = CKEDITOR.addTemplate("pathItem", '<a id="{id}" href="{jsTitle}" tabindex="-1" class="cke_path_item" title="{label}"' +
        (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 ? ' onfocus="event.preventBubble();"' : "") + a + ' hidefocus="true"  onkeydown="return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick="CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role="button" aria-label="{label}">{text}</a>');
        CKEDITOR.plugins.add("elementspath", {
            init: function (a) {
                a.on("uiSpace", function (b) {
                    b.data.space == "bottom" && f(a, b.data)
                })
            }
        })
    }(),function () {
        function c(a, c) {
            var i, g;
            c.on("refresh", function (a) {
                var c = [f], d;
                for (d in a.data.states)c.push(a.data.states[d]);
                this.setState(CKEDITOR.tools.search(c, b) ? b : f)
            }, c, null, 100);
            c.on("exec", function (b) {
                i = a.getSelection();
                g = i.createBookmarks(1);
                if (!b.data)b.data = {};
                b.data.done = false
            }, c, null, 0);
            c.on("exec", function () {
                a.forceNextSelectionCheck();
                i.selectBookmarks(g)
            }, c, null, 100)
        }

        var f = CKEDITOR.TRISTATE_DISABLED, b = CKEDITOR.TRISTATE_OFF;
        CKEDITOR.plugins.add("indent", {
            init: function (a) {
                var b = CKEDITOR.plugins.indent.genericDefinition;
                c(a, a.addCommand("indent", new b(true)));
                c(a, a.addCommand("outdent", new b));
                if (a.ui.addButton) {
                    a.ui.addButton("Indent", {
                        label: a.lang.indent.indent,
                        command: "indent",
                        directional: true,
                        toolbar: "indent,20"
                    });
                    a.ui.addButton("Outdent", {
                        label: a.lang.indent.outdent,
                        command: "outdent",
                        directional: true,
                        toolbar: "indent,10"
                    })
                }
                a.on("dirChanged", function (b) {
                    var c = a.createRange(), d = b.data.node;
                    c.setStartBefore(d);
                    c.setEndAfter(d);
                    for (var e = new CKEDITOR.dom.walker(c), f; f = e.next();)if (f.type == CKEDITOR.NODE_ELEMENT)if (!f.equals(d) && f.getDirection()) {
                        c.setStartAfter(f);
                        e = new CKEDITOR.dom.walker(c)
                    } else {
                        var k = a.config.indentClasses;
                        if (k)for (var n = b.data.dir == "ltr" ? ["_rtl", ""] : ["", "_rtl"], o = 0; o < k.length; o++)if (f.hasClass(k[o] + n[0])) {
                            f.removeClass(k[o] + n[0]);
                            f.addClass(k[o] + n[1])
                        }
                        k = f.getStyle("margin-right");
                        n = f.getStyle("margin-left");
                        k ? f.setStyle("margin-left", k) : f.removeStyle("margin-left");
                        n ? f.setStyle("margin-right", n) : f.removeStyle("margin-right")
                    }
                })
            }
        });
        CKEDITOR.plugins.indent = {
            genericDefinition: function (a) {
                this.isIndent = !!a;
                this.startDisabled = !this.isIndent
            }, specificDefinition: function (a, b, c) {
                this.name = b;
                this.editor = a;
                this.jobs = {};
                this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR;
                this.isIndent = !!c;
                this.relatedGlobal = c ? "indent" : "outdent";
                this.indentKey = c ? 9 : CKEDITOR.SHIFT + 9;
                this.database = {}
            }, registerCommands: function (a, b) {
                a.on("pluginsLoaded", function () {
                    for (var a in b)(function (a, b) {
                        var c = a.getCommand(b.relatedGlobal), d;
                        for (d in b.jobs) {
                            c.on("exec", function (c) {
                                if (!c.data.done) {
                                    a.fire("lockSnapshot");
                                    if (b.execJob(a, d))c.data.done = true;
                                    a.fire("unlockSnapshot");
                                    CKEDITOR.dom.element.clearAllMarkers(b.database)
                                }
                            }, this, null, d);
                            c.on("refresh", function (c) {
                                if (!c.data.states)c.data.states = {};
                                c.data.states[b.name + "@" + d] = b.refreshJob(a, d, c.data.path)
                            }, this, null, d)
                        }
                        a.addFeature(b)
                    })(this, b[a])
                })
            }
        };
        CKEDITOR.plugins.indent.genericDefinition.prototype = {
            context: "p", exec: function () {
            }
        };
        CKEDITOR.plugins.indent.specificDefinition.prototype = {
            execJob: function (a, b) {
                var c = this.jobs[b];
                if (c.state != f)return c.exec.call(this, a)
            }, refreshJob: function (a, b, c) {
                b = this.jobs[b];
                b.state = b.refresh.call(this, a, c);
                return b.state
            }, getContext: function (a) {
                return a.contains(this.context)
            }
        }
    }(),function () {
        function c(c) {
            function e(b) {
                for (var e = q.startContainer, m = q.endContainer; e && !e.getParent().equals(b);)e = e.getParent();
                for (; m && !m.getParent().equals(b);)m = m.getParent();
                if (!e || !m)return false;
                for (var p = e, e = [], o = false; !o;) {
                    p.equals(m) && (o = true);
                    e.push(p);
                    p = p.getNext()
                }
                if (e.length < 1)return false;
                p = b.getParents(true);
                for (m = 0; m < p.length; m++)if (p[m].getName && i[p[m].getName()]) {
                    b = p[m];
                    break
                }
                for (var p = g.isIndent ? 1 : -1, m = e[0], e = e[e.length - 1], o = CKEDITOR.plugins.list.listToArray(b, f), s = o[e.getCustomData("listarray_index")].indent, m = m.getCustomData("listarray_index"); m <= e.getCustomData("listarray_index"); m++) {
                    o[m].indent = o[m].indent + p;
                    if (p > 0) {
                        var v = o[m].parent;
                        o[m].parent = new CKEDITOR.dom.element(v.getName(), v.getDocument())
                    }
                }
                for (m = e.getCustomData("listarray_index") + 1; m < o.length && o[m].indent > s; m++)o[m].indent = o[m].indent + p;
                e = CKEDITOR.plugins.list.arrayToList(o, f, null, c.config.enterMode, b.getDirection());
                if (!g.isIndent) {
                    var w;
                    if ((w = b.getParent()) && w.is("li"))for (var p = e.listNode.getChildren(), u = [], x, m = p.count() - 1; m >= 0; m--)(x = p.getItem(m)) && (x.is && x.is("li")) && u.push(x)
                }
                e && e.listNode.replace(b);
                if (u && u.length)for (m = 0; m < u.length; m++) {
                    for (x = b = u[m]; (x = x.getNext()) && x.is && x.getName()in i;) {
                        CKEDITOR.env.ie && !b.getFirst(function (b) {
                            return a(b) && d(b)
                        }) && b.append(q.document.createText(" "));
                        b.append(x)
                    }
                    b.insertAfter(w)
                }
                return true
            }

            for (var g = this, f = this.database, i = this.context, o = c.getSelection(), o = (o && o.getRanges(1)).createIterator(), q; q = o.getNextRange();) {
                for (var m = q.getCommonAncestor(); m && !(m.type == CKEDITOR.NODE_ELEMENT && i[m.getName()]);)m = m.getParent();
                m || (m = q.startPath().contains(i)) && q.setEndAt(m, CKEDITOR.POSITION_BEFORE_END);
                if (!m) {
                    var p = q.getEnclosedNode();
                    if (p && p.type == CKEDITOR.NODE_ELEMENT && p.getName()in i) {
                        q.setStartAt(p, CKEDITOR.POSITION_AFTER_START);
                        q.setEndAt(p, CKEDITOR.POSITION_BEFORE_END);
                        m = p
                    }
                }
                if (m && q.startContainer.type == CKEDITOR.NODE_ELEMENT && q.startContainer.getName()in i) {
                    p = new CKEDITOR.dom.walker(q);
                    p.evaluator = b;
                    q.startContainer = p.next()
                }
                if (m && q.endContainer.type == CKEDITOR.NODE_ELEMENT && q.endContainer.getName()in i) {
                    p = new CKEDITOR.dom.walker(q);
                    p.evaluator = b;
                    q.endContainer = p.previous()
                }
                if (m)return e(m)
            }
            return 0
        }

        function f(a, c) {
            c || (c = a.contains(this.context));
            return c && a.block && a.block.equals(c.getFirst(b))
        }

        function b(a) {
            return a.type == CKEDITOR.NODE_ELEMENT && a.is("li")
        }

        var a = CKEDITOR.dom.walker.whitespaces(true), d = CKEDITOR.dom.walker.bookmark(false, true), i = CKEDITOR.TRISTATE_DISABLED, g = CKEDITOR.TRISTATE_OFF;
        CKEDITOR.plugins.add("indentlist", {
            requires: "indent", init: function (a) {
                function b(a, e) {
                    d.specificDefinition.apply(this, arguments);
                    this.requiredContent = ["ul", "ol"];
                    a.on("key", function (b) {
                        if (a.mode == "wysiwyg" && b.data.keyCode == this.indentKey) {
                            var c = this.getContext(a.elementPath());
                            if (c && (!this.isIndent || !f.call(this, a.elementPath(), c))) {
                                a.execCommand(this.relatedGlobal);
                                b.cancel()
                            }
                        }
                    }, this);
                    this.jobs[this.isIndent ? 10 : 30] = {
                        refresh: this.isIndent ? function (a, b) {
                            var c = this.getContext(b), d = f.call(this, b, c);
                            return !c || !this.isIndent || d ? i : g
                        } : function (a, b) {
                            return !this.getContext(b) || this.isIndent ? i : g
                        }, exec: CKEDITOR.tools.bind(c, this)
                    }
                }

                var d = CKEDITOR.plugins.indent;
                d.registerCommands(a, {indentlist: new b(a, "indentlist", true), outdentlist: new b(a, "outdentlist")});
                CKEDITOR.tools.extend(b.prototype, d.specificDefinition.prototype, {context: {ol: 1, ul: 1}})
            }
        })
    }(),function () {
        function c(a, b, c) {
            function d(c) {
                if ((j = i[c ? "getFirst" : "getLast"]()) && (!j.is || !j.isBlockBoundary()) && (k = b.root[c ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(true))) && (!k.is || !k.isBlockBoundary({br: 1})))a.document.createElement("br")[c ? "insertBefore" : "insertAfter"](j)
            }

            for (var e = CKEDITOR.plugins.list.listToArray(b.root, c), g = [], f = 0; f < b.contents.length; f++) {
                var h = b.contents[f];
                if ((h = h.getAscendant("li", true)) && !h.getCustomData("list_item_processed")) {
                    g.push(h);
                    CKEDITOR.dom.element.setMarker(c, h, "list_item_processed", true)
                }
            }
            h = null;
            for (f = 0; f < g.length; f++) {
                h = g[f].getCustomData("listarray_index");
                e[h].indent = -1
            }
            for (f = h + 1; f < e.length; f++)if (e[f].indent > e[f - 1].indent + 1) {
                g = e[f - 1].indent + 1 - e[f].indent;
                for (h = e[f].indent; e[f] && e[f].indent >= h;) {
                    e[f].indent = e[f].indent + g;
                    f++
                }
                f--
            }
            var i = CKEDITOR.plugins.list.arrayToList(e, c, null, a.config.enterMode, b.root.getAttribute("dir")).listNode, j, k;
            d(true);
            d();
            i.replace(b.root)
        }

        function f(a, b) {
            this.name = a;
            this.context = this.type = b;
            this.allowedContent = b + " li";
            this.requiredContent = b
        }

        function b(a, b, c, d) {
            for (var e, g; e = a[d ? "getLast" : "getFirst"](q);) {
                (g = e.getDirection(1)) !== b.getDirection(1) && e.setAttribute("dir", g);
                e.remove();
                c ? e[d ? "insertBefore" : "insertAfter"](c) : b.append(e, d)
            }
        }

        function a(a) {
            var c;
            (c = function (c) {
                var d = a[c ? "getPrevious" : "getNext"](k);
                if (d && d.type == CKEDITOR.NODE_ELEMENT && d.is(a.getName())) {
                    b(a, d, null, !c);
                    a.remove();
                    a = d
                }
            })();
            c(1)
        }

        function d(a) {
            return a.type == CKEDITOR.NODE_ELEMENT && (a.getName()in CKEDITOR.dtd.$block || a.getName()in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[a.getName()]["#"]
        }

        function i(c, d, e) {
            c.fire("saveSnapshot");
            e.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
            var f = e.extractContents();
            d.trim(false, true);
            var h = d.createBookmark(), i = new CKEDITOR.dom.elementPath(d.startContainer), j = i.block, i = i.lastElement.getAscendant("li", 1) || j, q = new CKEDITOR.dom.elementPath(e.startContainer), o = q.contains(CKEDITOR.dtd.$listItem), q = q.contains(CKEDITOR.dtd.$list);
            if (j)(j = j.getBogus()) && j.remove(); else if (q)(j = q.getPrevious(k)) && n(j) && j.remove();
            (j = f.getLast()) && (j.type == CKEDITOR.NODE_ELEMENT && j.is("br")) && j.remove();
            (j = d.startContainer.getChild(d.startOffset)) ? f.insertBefore(j) : d.startContainer.append(f);
            if (o)if (f = g(o))if (i.contains(o)) {
                b(f, o.getParent(), o);
                f.remove()
            } else i.append(f);
            for (; e.checkStartOfBlock() && e.checkEndOfBlock();) {
                q = e.startPath();
                f = q.block;
                if (f.is("li")) {
                    i = f.getParent();
                    f.equals(i.getLast(k)) && f.equals(i.getFirst(k)) && (f = i)
                }
                e.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START);
                f.remove()
            }
            e = e.clone();
            f = c.editable();
            e.setEndAt(f, CKEDITOR.POSITION_BEFORE_END);
            e = new CKEDITOR.dom.walker(e);
            e.evaluator = function (a) {
                return k(a) && !n(a)
            };
            (e = e.next()) && (e.type == CKEDITOR.NODE_ELEMENT && e.getName()in CKEDITOR.dtd.$list) && a(e);
            d.moveToBookmark(h);
            d.select();
            c.fire("saveSnapshot")
        }

        function g(a) {
            return (a = a.getLast(k)) && a.type == CKEDITOR.NODE_ELEMENT && a.getName()in h ? a : null
        }

        var h = {
            ol: 1,
            ul: 1
        }, e = CKEDITOR.dom.walker.whitespaces(), j = CKEDITOR.dom.walker.bookmark(), k = function (a) {
            return !(e(a) || j(a))
        }, n = CKEDITOR.dom.walker.bogus();
        CKEDITOR.plugins.list = {
            listToArray: function (a, b, c, d, e) {
                if (!h[a.getName()])return [];
                d || (d = 0);
                c || (c = []);
                for (var g = 0, f = a.getChildCount(); g < f; g++) {
                    var i = a.getChild(g);
                    i.type == CKEDITOR.NODE_ELEMENT && i.getName()in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(i, b, c, d + 1);
                    if (i.$.nodeName.toLowerCase() == "li") {
                        var j = {parent: a, indent: d, element: i, contents: []};
                        if (e)j.grandparent = e; else {
                            j.grandparent = a.getParent();
                            if (j.grandparent && j.grandparent.$.nodeName.toLowerCase() == "li")j.grandparent = j.grandparent.getParent()
                        }
                        b && CKEDITOR.dom.element.setMarker(b, i, "listarray_index", c.length);
                        c.push(j);
                        for (var k = 0, n = i.getChildCount(), q; k < n; k++) {
                            q = i.getChild(k);
                            q.type == CKEDITOR.NODE_ELEMENT && h[q.getName()] ? CKEDITOR.plugins.list.listToArray(q, b, c, d + 1, j.grandparent) : j.contents.push(q)
                        }
                    }
                }
                return c
            }, arrayToList: function (a, b, c, d, e) {
                c || (c = 0);
                if (!a || a.length < c + 1)return null;
                for (var g, f = a[c].parent.getDocument(), i = new CKEDITOR.dom.documentFragment(f), j = null, n = c, q = Math.max(a[c].indent, 0), o = null, B, z, D = d == CKEDITOR.ENTER_P ? "p" : "div"; ;) {
                    var C = a[n];
                    g = C.grandparent;
                    B = C.element.getDirection(1);
                    if (C.indent == q) {
                        if (!j || a[n].parent.getName() != j.getName()) {
                            j = a[n].parent.clone(false, 1);
                            e && j.setAttribute("dir", e);
                            i.append(j)
                        }
                        o = j.append(C.element.clone(0, 1));
                        B != j.getDirection(1) && o.setAttribute("dir", B);
                        for (g = 0; g < C.contents.length; g++)o.append(C.contents[g].clone(1, 1));
                        n++
                    } else if (C.indent == Math.max(q, 0) + 1) {
                        z = a[n - 1].element.getDirection(1);
                        n = CKEDITOR.plugins.list.arrayToList(a, null, n, d, z != B ? B : null);
                        !o.getChildCount() && (CKEDITOR.env.ie && !(f.$.documentMode > 7)) && o.append(f.createText(" "));
                        o.append(n.listNode);
                        n = n.nextIndex
                    } else if (C.indent == -1 && !c && g) {
                        if (h[g.getName()]) {
                            o = C.element.clone(false, true);
                            B != g.getDirection(1) && o.setAttribute("dir", B)
                        } else o = new CKEDITOR.dom.documentFragment(f);
                        var j = g.getDirection(1) != B, F = C.element, G = F.getAttribute("class"), E = F.getAttribute("style"), M = o.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (d != CKEDITOR.ENTER_BR || j || E || G), I, J = C.contents.length;
                        for (g = 0; g < J; g++) {
                            I = C.contents[g];
                            if (I.type == CKEDITOR.NODE_ELEMENT && I.isBlockBoundary()) {
                                j && !I.getDirection() && I.setAttribute("dir", B);
                                var H = I, L = F.getAttribute("style");
                                L && H.setAttribute("style", L.replace(/([^;])$/, "$1;") + (H.getAttribute("style") || ""));
                                G && I.addClass(G)
                            } else if (M) {
                                if (!z) {
                                    z = f.createElement(D);
                                    j && z.setAttribute("dir", B)
                                }
                                E && z.setAttribute("style", E);
                                G && z.setAttribute("class", G);
                                z.append(I.clone(1, 1))
                            }
                            o.append(z || I.clone(1, 1))
                        }
                        if (o.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && n != a.length - 1) {
                            (B = o.getLast()) && (B.type == CKEDITOR.NODE_ELEMENT && B.getAttribute("type") == "_moz") && B.remove();
                            (!o.getLast(k) || !(B.type == CKEDITOR.NODE_ELEMENT && B.getName()in CKEDITOR.dtd.$block)) && o.append(f.createElement("br"))
                        }
                        B = o.$.nodeName.toLowerCase();
                        !CKEDITOR.env.ie && (B == "div" || B == "p") && o.appendBogus();
                        i.append(o);
                        j = null;
                        n++
                    } else return null;
                    z = null;
                    if (a.length <= n || Math.max(a[n].indent, 0) < q)break
                }
                if (b)for (a = i.getFirst(); a;) {
                    if (a.type == CKEDITOR.NODE_ELEMENT) {
                        CKEDITOR.dom.element.clearMarkers(b, a);
                        if (a.getName()in CKEDITOR.dtd.$listItem) {
                            c = a;
                            f = e = d = void 0;
                            if (d = c.getDirection()) {
                                for (e = c.getParent(); e && !(f = e.getDirection());)e = e.getParent();
                                d == f && c.removeAttribute("dir")
                            }
                        }
                    }
                    a = a.getNextSourceNode()
                }
                return {listNode: i, nextIndex: n}
            }
        };
        var o = /^h[1-6]$/, q = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);
        f.prototype = {
            exec: function (b) {
                this.refresh(b, b.elementPath());
                var d = b.config, e = b.getSelection(), g = e && e.getRanges(true);
                if (this.state == CKEDITOR.TRISTATE_OFF) {
                    var f = b.editable();
                    if (f.getFirst(k)) {
                        var i = g.length == 1 && g[0];
                        (d = i && i.getEnclosedNode()) && (d.is && this.type == d.getName()) && this.setState(CKEDITOR.TRISTATE_ON)
                    } else {
                        d.enterMode == CKEDITOR.ENTER_BR ? f.appendBogus() : g[0].fixBlock(1, d.enterMode == CKEDITOR.ENTER_P ? "p" : "div");
                        e.selectRanges(g)
                    }
                }
                for (var d = e.createBookmarks(true), f = [], j = {}, g = g.createIterator(), n = 0; (i = g.getNextRange()) && ++n;) {
                    var q = i.getBoundaryNodes(), w = q.startNode, u = q.endNode;
                    w.type == CKEDITOR.NODE_ELEMENT && w.getName() == "td" && i.setStartAt(q.startNode, CKEDITOR.POSITION_AFTER_START);
                    u.type == CKEDITOR.NODE_ELEMENT && u.getName() == "td" && i.setEndAt(q.endNode, CKEDITOR.POSITION_BEFORE_END);
                    i = i.createIterator();
                    for (i.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; q = i.getNextParagraph();)if (!q.getCustomData("list_block")) {
                        CKEDITOR.dom.element.setMarker(j, q, "list_block", 1);
                        for (var x = b.elementPath(q), w = x.elements, u = 0, x = x.blockLimit, B, z = w.length - 1; z >= 0 && (B = w[z]); z--)if (h[B.getName()] && x.contains(B)) {
                            x.removeCustomData("list_group_object_" + n);
                            if (w = B.getCustomData("list_group_object"))w.contents.push(q); else {
                                w = {root: B, contents: [q]};
                                f.push(w);
                                CKEDITOR.dom.element.setMarker(j, B, "list_group_object", w)
                            }
                            u = 1;
                            break
                        }
                        if (!u) {
                            u = x;
                            if (u.getCustomData("list_group_object_" + n))u.getCustomData("list_group_object_" + n).contents.push(q); else {
                                w = {root: u, contents: [q]};
                                CKEDITOR.dom.element.setMarker(j, u, "list_group_object_" + n, w);
                                f.push(w)
                            }
                        }
                    }
                }
                for (B = []; f.length > 0;) {
                    w = f.shift();
                    if (this.state == CKEDITOR.TRISTATE_OFF)if (h[w.root.getName()]) {
                        q = b;
                        g = w;
                        w = j;
                        n = B;
                        u = CKEDITOR.plugins.list.listToArray(g.root, w);
                        x = [];
                        for (i = 0; i < g.contents.length; i++) {
                            z = g.contents[i];
                            if ((z = z.getAscendant("li", true)) && !z.getCustomData("list_item_processed")) {
                                x.push(z);
                                CKEDITOR.dom.element.setMarker(w, z, "list_item_processed", true)
                            }
                        }
                        for (var z = g.root.getDocument(), D = void 0, C = void 0, i = 0; i < x.length; i++) {
                            var F = x[i].getCustomData("listarray_index"), D = u[F].parent;
                            if (!D.is(this.type)) {
                                C = z.createElement(this.type);
                                D.copyAttributes(C, {start: 1, type: 1});
                                C.removeStyle("list-style-type");
                                u[F].parent = C
                            }
                        }
                        q = CKEDITOR.plugins.list.arrayToList(u, w, null, q.config.enterMode);
                        w = void 0;
                        u = q.listNode.getChildCount();
                        for (i = 0; i < u && (w = q.listNode.getChild(i)); i++)w.getName() == this.type && n.push(w);
                        q.listNode.replace(g.root)
                    } else {
                        u = b;
                        q = w;
                        i = B;
                        x = q.contents;
                        g = q.root.getDocument();
                        n = [];
                        if (x.length == 1 && x[0].equals(q.root)) {
                            w = g.createElement("div");
                            x[0].moveChildren && x[0].moveChildren(w);
                            x[0].append(w);
                            x[0] = w
                        }
                        q = q.contents[0].getParent();
                        for (z = 0; z < x.length; z++)q = q.getCommonAncestor(x[z].getParent());
                        D = u.config.useComputedState;
                        u = w = void 0;
                        D = D === void 0 || D;
                        for (z = 0; z < x.length; z++)for (C = x[z]; F = C.getParent();) {
                            if (F.equals(q)) {
                                n.push(C);
                                !u && C.getDirection() && (u = 1);
                                C = C.getDirection(D);
                                w !== null && (w = w && w != C ? null : C);
                                break
                            }
                            C = F
                        }
                        if (!(n.length < 1)) {
                            x = n[n.length - 1].getNext();
                            z = g.createElement(this.type);
                            i.push(z);
                            for (D = i = void 0; n.length;) {
                                i = n.shift();
                                D = g.createElement("li");
                                if (i.is("pre") || o.test(i.getName()))i.appendTo(D); else {
                                    i.copyAttributes(D);
                                    if (w && i.getDirection()) {
                                        D.removeStyle("direction");
                                        D.removeAttribute("dir")
                                    }
                                    i.moveChildren(D);
                                    i.remove()
                                }
                                D.appendTo(z)
                            }
                            w && u && z.setAttribute("dir", w);
                            x ? z.insertBefore(x) : z.appendTo(q)
                        }
                    } else this.state == CKEDITOR.TRISTATE_ON && h[w.root.getName()] && c.call(this, b, w, j)
                }
                for (z = 0; z < B.length; z++)a(B[z]);
                CKEDITOR.dom.element.clearAllMarkers(j);
                e.selectBookmarks(d);
                b.focus()
            }, refresh: function (a, b) {
                var c = b.contains(h, 1), d = b.blockLimit || b.root;
                c && d.contains(c) ? this.setState(c.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF)
            }
        };
        CKEDITOR.plugins.add("list", {
            requires: "indentlist", init: function (a) {
                if (!a.blockless) {
                    a.addCommand("numberedlist", new f("numberedlist", "ol"));
                    a.addCommand("bulletedlist", new f("bulletedlist", "ul"));
                    if (a.ui.addButton) {
                        a.ui.addButton("NumberedList", {
                            label: a.lang.list.numberedlist,
                            command: "numberedlist",
                            directional: true,
                            toolbar: "list,10"
                        });
                        a.ui.addButton("BulletedList", {
                            label: a.lang.list.bulletedlist,
                            command: "bulletedlist",
                            directional: true,
                            toolbar: "list,20"
                        })
                    }
                    a.on("key", function (b) {
                        var c = b.data.keyCode;
                        if (a.mode == "wysiwyg" && c in{8: 1, 46: 1}) {
                            var e = a.getSelection().getRanges()[0], f = e && e.startPath();
                            if (e && e.collapsed) {
                                var f = new CKEDITOR.dom.elementPath(e.startContainer), j = c == 8, q = a.editable(), o = new CKEDITOR.dom.walker(e.clone());
                                o.evaluator = function (a) {
                                    return k(a) && !n(a)
                                };
                                o.guard = function (a, b) {
                                    return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table"))
                                };
                                c = e.clone();
                                if (j) {
                                    var v, w;
                                    if ((v = f.contains(h)) && e.checkBoundaryOfElement(v, CKEDITOR.START) && (v = v.getParent()) && v.is("li") && (v = g(v))) {
                                        w = v;
                                        v = v.getPrevious(k);
                                        c.moveToPosition(v && n(v) ? v : w, CKEDITOR.POSITION_BEFORE_START)
                                    } else {
                                        o.range.setStartAt(q, CKEDITOR.POSITION_AFTER_START);
                                        o.range.setEnd(e.startContainer, e.startOffset);
                                        if ((v = o.previous()) && v.type == CKEDITOR.NODE_ELEMENT && (v.getName()in h || v.is("li"))) {
                                            if (!v.is("li")) {
                                                o.range.selectNodeContents(v);
                                                o.reset();
                                                o.evaluator = d;
                                                v = o.previous()
                                            }
                                            w = v;
                                            c.moveToElementEditEnd(w)
                                        }
                                    }
                                    if (w) {
                                        i(a, c, e);
                                        b.cancel()
                                    } else if ((c = f.contains(h)) && e.checkBoundaryOfElement(c, CKEDITOR.START)) {
                                        w = c.getFirst(k);
                                        if (e.checkBoundaryOfElement(w, CKEDITOR.START)) {
                                            v = c.getPrevious(k);
                                            if (g(w)) {
                                                if (v) {
                                                    e.moveToElementEditEnd(v);
                                                    e.select()
                                                }
                                            } else a.execCommand("outdent");
                                            b.cancel()
                                        }
                                    }
                                } else if (w = f.contains("li")) {
                                    o.range.setEndAt(q, CKEDITOR.POSITION_BEFORE_END);
                                    q = (f = w.getLast(k)) && d(f) ? f : w;
                                    w = 0;
                                    if ((v = o.next()) && v.type == CKEDITOR.NODE_ELEMENT && v.getName()in h && v.equals(f)) {
                                        w = 1;
                                        v = o.next()
                                    } else e.checkBoundaryOfElement(q, CKEDITOR.END) && (w = 1);
                                    if (w && v) {
                                        e = e.clone();
                                        e.moveToElementEditStart(v);
                                        i(a, c, e);
                                        b.cancel()
                                    }
                                } else {
                                    o.range.setEndAt(q, CKEDITOR.POSITION_BEFORE_END);
                                    if ((v = o.next()) && v.type == CKEDITOR.NODE_ELEMENT && v.is(h)) {
                                        v = v.getFirst(k);
                                        if (f.block && e.checkStartOfBlock() && e.checkEndOfBlock()) {
                                            f.block.remove();
                                            e.moveToElementEditStart(v);
                                            e.select()
                                        } else if (g(v)) {
                                            e.moveToElementEditStart(v);
                                            e.select()
                                        } else {
                                            e = e.clone();
                                            e.moveToElementEditStart(v);
                                            i(a, c, e)
                                        }
                                        b.cancel()
                                    }
                                }
                                setTimeout(function () {
                                    a.selectionChange(1)
                                })
                            }
                        }
                    })
                }
            }
        })
    }(),function () {
        function c(a, b, c) {
            c = a.config.forceEnterMode || c;
            if (a.mode == "wysiwyg") {
                if (!b)b = a.activeEnterMode;
                if (!a.elementPath().isContextFor("p")) {
                    b = CKEDITOR.ENTER_BR;
                    c = 1
                }
                a.fire("saveSnapshot");
                b == CKEDITOR.ENTER_BR ? i(a, b, null, c) : g(a, b, null, c);
                a.fire("saveSnapshot")
            }
        }

        function f(a) {
            for (var a = a.getSelection().getRanges(true), b = a.length - 1; b > 0; b--)a[b].deleteContents();
            return a[0]
        }

        CKEDITOR.plugins.add("enterkey", {
            init: function (a) {
                a.addCommand("enter", {
                    modes: {wysiwyg: 1}, editorFocus: false, exec: function (a) {
                        c(a)
                    }
                });
                a.addCommand("shiftEnter", {
                    modes: {wysiwyg: 1}, editorFocus: false, exec: function (a) {
                        c(a, a.activeShiftEnterMode, 1)
                    }
                });
                a.setKeystroke([[13, "enter"], [CKEDITOR.SHIFT + 13, "shiftEnter"]])
            }
        });
        var b = CKEDITOR.dom.walker.whitespaces(), a = CKEDITOR.dom.walker.bookmark();
        CKEDITOR.plugins.enterkey = {
            enterBlock: function (c, d, g, n) {
                if (g = g || f(c)) {
                    var o = g.document, q = g.checkStartOfBlock(), m = g.checkEndOfBlock(), p = c.elementPath(g.startContainer).block, r = d == CKEDITOR.ENTER_DIV ? "div" : "p", l;
                    if (q && m) {
                        if (p && (p.is("li") || p.getParent().is("li"))) {
                            g = p.getParent();
                            l = g.getParent();
                            var n = !p.hasPrevious(), y = !p.hasNext(), r = c.getSelection(), t = r.createBookmarks(), q = p.getDirection(1), m = p.getAttribute("class"), A = p.getAttribute("style"), s = l.getDirection(1) != q, c = c.enterMode != CKEDITOR.ENTER_BR || s || A || m;
                            if (l.is("li"))if (n || y)p[n ? "insertBefore" : "insertAfter"](l); else p.breakParent(l); else {
                                if (c) {
                                    l = o.createElement(d == CKEDITOR.ENTER_P ? "p" : "div");
                                    s && l.setAttribute("dir", q);
                                    A && l.setAttribute("style", A);
                                    m && l.setAttribute("class", m);
                                    p.moveChildren(l);
                                    if (n || y)l[n ? "insertBefore" : "insertAfter"](g); else {
                                        p.breakParent(g);
                                        l.insertAfter(g)
                                    }
                                } else {
                                    p.appendBogus();
                                    if (n || y)for (; o = p[n ? "getFirst" : "getLast"]();)o[n ? "insertBefore" : "insertAfter"](g); else for (p.breakParent(g); o = p.getLast();)o.insertAfter(g)
                                }
                                p.remove()
                            }
                            r.selectBookmarks(t);
                            return
                        }
                        if (p && p.getParent().is("blockquote")) {
                            p.breakParent(p.getParent());
                            p.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || p.getPrevious().remove();
                            p.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || p.getNext().remove();
                            g.moveToElementEditStart(p);
                            g.select();
                            return
                        }
                    } else if (p && p.is("pre") && !m) {
                        i(c, d, g, n);
                        return
                    }
                    if (m = g.splitBlock(r)) {
                        d = m.previousBlock;
                        p = m.nextBlock;
                        c = m.wasStartOfBlock;
                        q = m.wasEndOfBlock;
                        if (p) {
                            t = p.getParent();
                            if (t.is("li")) {
                                p.breakParent(t);
                                p.move(p.getNext(), 1)
                            }
                        } else if (d && (t = d.getParent()) && t.is("li")) {
                            d.breakParent(t);
                            t = d.getNext();
                            g.moveToElementEditStart(t);
                            d.move(d.getPrevious())
                        }
                        if (!c && !q) {
                            if (p.is("li")) {
                                l = g.clone();
                                l.selectNodeContents(p);
                                l = new CKEDITOR.dom.walker(l);
                                l.evaluator = function (c) {
                                    return !(a(c) || b(c) || c.type == CKEDITOR.NODE_ELEMENT && c.getName()in CKEDITOR.dtd.$inline && !(c.getName()in
                                    CKEDITOR.dtd.$empty))
                                };
                                (t = l.next()) && (t.type == CKEDITOR.NODE_ELEMENT && t.is("ul", "ol")) && (CKEDITOR.env.ie ? o.createText(" ") : o.createElement("br")).insertBefore(t)
                            }
                            p && g.moveToElementEditStart(p)
                        } else {
                            if (d) {
                                if (d.is("li") || !h.test(d.getName()) && !d.is("pre"))l = d.clone()
                            } else p && (l = p.clone());
                            if (l)n && !l.is("li") && l.renameNode(r); else if (t && t.is("li"))l = t; else {
                                l = o.createElement(r);
                                d && (y = d.getDirection()) && l.setAttribute("dir", y)
                            }
                            if (o = m.elementPath) {
                                n = 0;
                                for (r = o.elements.length; n < r; n++) {
                                    t = o.elements[n];
                                    if (t.equals(o.block) || t.equals(o.blockLimit))break;
                                    if (CKEDITOR.dtd.$removeEmpty[t.getName()]) {
                                        t = t.clone();
                                        l.moveChildren(t);
                                        l.append(t)
                                    }
                                }
                            }
                            CKEDITOR.env.ie || l.appendBogus();
                            l.getParent() || g.insertNode(l);
                            l.is("li") && l.removeAttribute("value");
                            if (CKEDITOR.env.ie && c && (!q || !d.getChildCount())) {
                                g.moveToElementEditStart(q ? d : l);
                                g.select()
                            }
                            g.moveToElementEditStart(c && !q ? p : l)
                        }
                        g.select();
                        g.scrollIntoView()
                    }
                }
            }, enterBr: function (a, b, c, d) {
                if (c = c || f(a)) {
                    var i = c.document, q = c.checkEndOfBlock(), m = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()), p = m.block, m = p && m.block.getName();
                    if (!d && m == "li")g(a, b, c, d); else {
                        if (!d && q && h.test(m))if (q = p.getDirection()) {
                            i = i.createElement("div");
                            i.setAttribute("dir", q);
                            i.insertAfter(p);
                            c.setStart(i, 0)
                        } else {
                            i.createElement("br").insertAfter(p);
                            CKEDITOR.env.gecko && i.createText("").insertAfter(p);
                            c.setStartAt(p.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)
                        } else {
                            p = m == "pre" && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? i.createText("\r") : i.createElement("br");
                            c.deleteContents();
                            c.insertNode(p);
                            if (CKEDITOR.env.ie)c.setStartAt(p, CKEDITOR.POSITION_AFTER_END); else {
                                i.createText("﻿").insertAfter(p);
                                q && p.getParent().appendBogus();
                                p.getNext().$.nodeValue = "";
                                c.setStartAt(p.getNext(), CKEDITOR.POSITION_AFTER_START)
                            }
                        }
                        c.collapse(true);
                        c.select();
                        c.scrollIntoView()
                    }
                }
            }
        };
        var d = CKEDITOR.plugins.enterkey, i = d.enterBr, g = d.enterBlock, h = /^h[1-6]$/
    }(),function () {
        function c(c, b) {
            var a = {}, d = [], i = {
                nbsp: " ",
                shy: "­",
                gt: ">",
                lt: "<",
                amp: "&",
                apos: "'",
                quot: '"'
            }, c = c.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function (c, e) {
                var g = b ? "&" + e + ";" : i[e];
                a[g] = b ? i[e] : "&" + e + ";";
                d.push(g);
                return ""
            });
            if (!b && c) {
                var c = c.split(","), g = document.createElement("div"), h;
                g.innerHTML = "&" + c.join(";&") + ";";
                h = g.innerHTML;
                g = null;
                for (g = 0; g < h.length; g++) {
                    var e = h.charAt(g);
                    a[e] = "&" + c[g] + ";";
                    d.push(e)
                }
            }
            a.regex = d.join(b ? "|" : "");
            return a
        }

        CKEDITOR.plugins.add("entities", {
            afterInit: function (f) {
                var b = f.config;
                if (f = (f = f.dataProcessor) && f.htmlFilter) {
                    var a = [];
                    b.basicEntities !== false && a.push("nbsp,gt,lt,amp");
                    if (b.entities) {
                        a.length && a.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro");
                        b.entities_latin && a.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml");
                        b.entities_greek && a.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv");
                        b.entities_additional && a.push(b.entities_additional)
                    }
                    var d = c(a.join(",")), i = d.regex ? "[" + d.regex + "]" : "a^";
                    delete d.regex;
                    b.entities && b.entities_processNumerical && (i = "[^ -~]|" + i);
                    var i = RegExp(i, "g"), g = function (a) {
                        return b.entities_processNumerical == "force" || !d[a] ? "&#" + a.charCodeAt(0) + ";" : d[a]
                    }, h = c("nbsp,gt,lt,amp,shy", true), e = RegExp(h.regex, "g"), j = function (a) {
                        return h[a]
                    };
                    f.addRules({
                        text: function (a) {
                            return a.replace(e, j).replace(i, g)
                        }
                    })
                }
            }
        })
    }(),CKEDITOR.config.basicEntities = !0,CKEDITOR.config.entities = !0,CKEDITOR.config.entities_latin = !0,CKEDITOR.config.entities_greek = !0,CKEDITOR.config.entities_additional = "#39",CKEDITOR.plugins.add("popup"),CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        popup: function (c, f, b, a) {
            f = f || "80%";
            b = b || "70%";
            typeof f == "string" && (f.length > 1 && f.substr(f.length - 1, 1) == "%") && (f = parseInt(window.screen.width * parseInt(f, 10) / 100, 10));
            typeof b == "string" && (b.length > 1 && b.substr(b.length - 1, 1) == "%") && (b = parseInt(window.screen.height * parseInt(b, 10) / 100, 10));
            f < 640 && (f = 640);
            b < 420 && (b = 420);
            var d = parseInt((window.screen.height - b) / 2, 10), i = parseInt((window.screen.width - f) / 2, 10), a = (a || "location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes") + ",width=" + f + ",height=" + b + ",top=" + d + ",left=" + i, g = window.open("", null, a, true);
            if (!g)return false;
            try {
                if (navigator.userAgent.toLowerCase().indexOf(" chrome/") == -1) {
                    g.moveTo(i, d);
                    g.resizeTo(f, b)
                }
                g.focus();
                g.location.href = c
            } catch (h) {
                window.open(c, null, a, true)
            }
            return true
        }
    }),function () {
        function c(a, b) {
            var c = [];
            if (b)for (var d in b)c.push(d + "=" + encodeURIComponent(b[d])); else return a;
            return a + (a.indexOf("?") != -1 ? "&" : "?") + c.join("&")
        }

        function f(a) {
            a = a + "";
            return a.charAt(0).toUpperCase() + a.substr(1)
        }

        function b() {
            var a = this.getDialog(), b = a.getParentEditor();
            b._.filebrowserSe = this;
            var d = b.config["filebrowser" + f(a.getName()) + "WindowWidth"] || b.config.filebrowserWindowWidth || "80%", a = b.config["filebrowser" + f(a.getName()) + "WindowHeight"] || b.config.filebrowserWindowHeight || "70%", g = this.filebrowser.params || {};
            g.CKEditor = b.name;
            g.CKEditorFuncNum = b._.filebrowserFn;
            if (!g.langCode)g.langCode = b.langCode;
            g = c(this.filebrowser.url, g);
            b.popup(g, d, a, b.config.filebrowserWindowFeatures || b.config.fileBrowserWindowFeatures)
        }

        function a() {
            var a = this.getDialog();
            a.getParentEditor()._.filebrowserSe = this;
            return !a.getContentElement(this["for"][0], this["for"][1]).getInputElement().$.value || !a.getContentElement(this["for"][0], this["for"][1]).getAction() ? false : true
        }

        function d(a, b, d) {
            var g = d.params || {};
            g.CKEditor = a.name;
            g.CKEditorFuncNum = a._.filebrowserFn;
            if (!g.langCode)g.langCode = a.langCode;
            b.action = c(d.url, g);
            b.filebrowser = d
        }

        function i(c, g, h, n) {
            if (n && n.length)for (var o, q = n.length; q--;) {
                o = n[q];
                (o.type == "hbox" || o.type == "vbox" || o.type == "fieldset") && i(c, g, h, o.children);
                if (o.filebrowser) {
                    if (typeof o.filebrowser == "string")o.filebrowser = {
                        action: o.type == "fileButton" ? "QuickUpload" : "Browse",
                        target: o.filebrowser
                    };
                    if (o.filebrowser.action == "Browse") {
                        var m = o.filebrowser.url;
                        if (m === void 0) {
                            m = c.config["filebrowser" + f(g) + "BrowseUrl"];
                            if (m === void 0)m = c.config.filebrowserBrowseUrl
                        }
                        if (m) {
                            o.onClick = b;
                            o.filebrowser.url = m;
                            o.hidden = false
                        }
                    } else if (o.filebrowser.action == "QuickUpload" && o["for"]) {
                        m = o.filebrowser.url;
                        if (m === void 0) {
                            m = c.config["filebrowser" + f(g) + "UploadUrl"];
                            if (m === void 0)m = c.config.filebrowserUploadUrl
                        }
                        if (m) {
                            var p = o.onClick;
                            o.onClick = function (b) {
                                var c = b.sender;
                                return p && p.call(c, b) === false ? false : a.call(c, b)
                            };
                            o.filebrowser.url = m;
                            o.hidden = false;
                            d(c, h.getContents(o["for"][0]).get(o["for"][1]), o.filebrowser)
                        }
                    }
                }
            }
        }

        function g(a, b, c) {
            if (c.indexOf(";") !== -1) {
                for (var c = c.split(";"), d = 0; d < c.length; d++)if (g(a, b, c[d]))return true;
                return false
            }
            return (a = a.getContents(b).get(c).filebrowser) && a.url
        }

        function h(a, b) {
            var c = this._.filebrowserSe.getDialog(), d = this._.filebrowserSe["for"], g = this._.filebrowserSe.filebrowser.onSelect;
            d && c.getContentElement(d[0], d[1]).reset();
            if (!(typeof b == "function" && b.call(this._.filebrowserSe) === false) && !(g && g.call(this._.filebrowserSe, a, b) === false)) {
                typeof b == "string" && b && alert(b);
                if (a) {
                    d = this._.filebrowserSe;
                    c = d.getDialog();
                    if (d = d.filebrowser.target || null) {
                        d = d.split(":");
                        if (g = c.getContentElement(d[0], d[1])) {
                            g.setValue(a);
                            c.selectPage(d[0])
                        }
                    }
                }
            }
        }

        CKEDITOR.plugins.add("filebrowser", {
            requires: "popup", init: function (a) {
                a._.filebrowserFn = CKEDITOR.tools.addFunction(h, a);
                a.on("destroy", function () {
                    CKEDITOR.tools.removeFunction(this._.filebrowserFn)
                })
            }
        });
        CKEDITOR.on("dialogDefinition", function (a) {
            for (var b = a.data.definition, c, d = 0; d < b.contents.length; ++d)if (c = b.contents[d]) {
                i(a.editor, a.data.name, b, c.elements);
                if (c.hidden && c.filebrowser)c.hidden = !g(b, c.id, c.filebrowser)
            }
        })
    }(),function () {
        function c(c) {
            var i = c.config, g = c.fire("uiSpace", {space: "top", html: ""}).html, h = function () {
                function g(b, c, d) {
                    e.setStyle(c, a(d));
                    e.setStyle("position", b)
                }

                function f(a) {
                    var b = m.getDocumentPosition();
                    switch (a) {
                        case"top":
                            g("absolute", "top", b.y - y - s);
                            break;
                        case"pin":
                            g("fixed", "top", w);
                            break;
                        case"bottom":
                            g("absolute", "top", b.y + (r.height || r.bottom - r.top) + s)
                    }
                    j = a
                }

                var j, m, k, r, l, y, t, A = i.floatSpaceDockedOffsetX || 0, s = i.floatSpaceDockedOffsetY || 0, v = i.floatSpacePinnedOffsetX || 0, w = i.floatSpacePinnedOffsetY || 0;
                return function (g) {
                    if (m = c.editable()) {
                        g && g.name == "focus" && e.show();
                        e.removeStyle("left");
                        e.removeStyle("right");
                        k = e.getClientRect();
                        r = m.getClientRect();
                        l = b.getViewPaneSize();
                        y = k.height;
                        t = "pageXOffset"in b.$ ? b.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft;
                        if (j) {
                            y + s <= r.top ? f("top") : y + s > l.height - r.bottom ? f("pin") : f("bottom");
                            var g = l.width / 2, g = r.left > 0 && r.right < l.width && r.width > k.width ? c.config.contentsLangDirection == "rtl" ? "right" : "left" : g - r.left > r.right -
                            g ? "left" : "right", i;
                            if (k.width > l.width) {
                                g = "left";
                                i = 0
                            } else {
                                i = g == "left" ? r.left > 0 ? r.left : 0 : r.right < l.width ? l.width - r.right : 0;
                                if (i + k.width > l.width) {
                                    g = g == "left" ? "right" : "left";
                                    i = 0
                                }
                            }
                            e.setStyle(g, a((j == "pin" ? v : A) + i + (j == "pin" ? 0 : g == "left" ? t : -t)))
                        } else {
                            j = "pin";
                            f("pin");
                            h(g)
                        }
                    }
                }
            }();
            if (g) {
                var e = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(f.output({
                    content: g,
                    id: c.id,
                    langDir: c.lang.dir,
                    langCode: c.langCode,
                    name: c.name,
                    style: "display:none;z-index:" + (i.baseFloatZIndex - 1),
                    topId: c.ui.spaceId("top")
                }))), j = CKEDITOR.tools.eventsBuffer(500, h), k = CKEDITOR.tools.eventsBuffer(100, h);
                e.unselectable();
                e.on("mousedown", function (a) {
                    a = a.data;
                    a.getTarget().hasAscendant("a", 1) || a.preventDefault()
                });
                c.on("focus", function (a) {
                    h(a);
                    c.on("change", j.input);
                    b.on("scroll", k.input);
                    b.on("resize", k.input)
                });
                c.on("blur", function () {
                    e.hide();
                    c.removeListener("change", j.input);
                    b.removeListener("scroll", k.input);
                    b.removeListener("resize", k.input)
                });
                c.on("destroy", function () {
                    b.removeListener("scroll", k.input);
                    b.removeListener("resize", k.input);
                    e.clearCustomData();
                    e.remove()
                });
                c.focusManager.hasFocus && e.show();
                c.focusManager.add(e, 1)
            }
        }

        var f = CKEDITOR.addTemplate("floatcontainer", '<div id="cke_{name}" class="cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir="{langDir}" title="' + (CKEDITOR.env.gecko ? " " : "") + '" lang="{langCode}" role="application" style="{style}"><div class="cke_inner"><div id="{topId}" class="cke_top" role="presentation">{content}</div></div></div>'), b = CKEDITOR.document.getWindow(), a = CKEDITOR.tools.cssLength;
        CKEDITOR.plugins.add("floatingspace", {
            init: function (a) {
                a.on("loaded", function () {
                    c(this)
                }, null, null, 20)
            }
        })
    }(),CKEDITOR.plugins.add("listblock", {
        requires: "panel", onLoad: function () {
            var c = CKEDITOR.addTemplate("panel-list", '<ul role="presentation" class="cke_panel_list">{items}</ul>'), f = CKEDITOR.addTemplate("panel-list-item", '<li id="{id}" class="cke_panel_listItem" role=presentation><a id="{id}_option" _cke_focus=1 hidefocus=true title="{title}" href="javascript:void(\'{val}\')"  {onclick}="CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role="option">{text}</a></li>'), b = CKEDITOR.addTemplate("panel-list-group", '<h1 id="{id}" class="cke_panel_grouptitle" role="presentation" >{label}</h1>');
            CKEDITOR.ui.panel.prototype.addListBlock = function (a, b) {
                return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), b))
            };
            CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.panel.block, $: function (a, b) {
                    var b = b || {}, c = b.attributes || (b.attributes = {});
                    (this.multiSelect = !!b.multiSelect) && (c["aria-multiselectable"] = true);
                    !c.role && (c.role = "listbox");
                    this.base.apply(this, arguments);
                    this.element.setAttribute("role", c.role);
                    c = this.keys;
                    c[40] = "next";
                    c[9] = "next";
                    c[38] = "prev";
                    c[CKEDITOR.SHIFT + 9] = "prev";
                    c[32] = CKEDITOR.env.ie ? "mouseup" : "click";
                    CKEDITOR.env.ie && (c[13] = "mouseup");
                    this._.pendingHtml = [];
                    this._.pendingList = [];
                    this._.items = {};
                    this._.groups = {}
                }, _: {
                    close: function () {
                        if (this._.started) {
                            var a = c.output({items: this._.pendingList.join("")});
                            this._.pendingList = [];
                            this._.pendingHtml.push(a);
                            delete this._.started
                        }
                    }, getClick: function () {
                        if (!this._.click)this._.click = CKEDITOR.tools.addFunction(function (a) {
                            var b = this.toggle(a);
                            if (this.onClick)this.onClick(a, b)
                        }, this);
                        return this._.click
                    }
                }, proto: {
                    add: function (a, b, c) {
                        var g = CKEDITOR.tools.getNextId();
                        if (!this._.started) {
                            this._.started = 1;
                            this._.size = this._.size || 0
                        }
                        this._.items[a] = g;
                        a = {
                            id: g,
                            val: a,
                            onclick: CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick",
                            clickFn: this._.getClick(),
                            title: c || a,
                            text: b || a
                        };
                        this._.pendingList.push(f.output(a))
                    }, startGroup: function (a) {
                        this._.close();
                        var c = CKEDITOR.tools.getNextId();
                        this._.groups[a] = c;
                        this._.pendingHtml.push(b.output({id: c, label: a}))
                    }, commit: function () {
                        this._.close();
                        this.element.appendHtml(this._.pendingHtml.join(""));
                        delete this._.size;
                        this._.pendingHtml = []
                    }, toggle: function (a) {
                        var b = this.isMarked(a);
                        b ? this.unmark(a) : this.mark(a);
                        return !b
                    }, hideGroup: function (a) {
                        var b = (a = this.element.getDocument().getById(this._.groups[a])) && a.getNext();
                        if (a) {
                            a.setStyle("display", "none");
                            b && b.getName() == "ul" && b.setStyle("display", "none")
                        }
                    }, hideItem: function (a) {
                        this.element.getDocument().getById(this._.items[a]).setStyle("display", "none")
                    }, showAll: function () {
                        var a = this._.items, b = this._.groups, c = this.element.getDocument(), g;
                        for (g in a)c.getById(a[g]).setStyle("display", "");
                        for (var f in b) {
                            a = c.getById(b[f]);
                            g = a.getNext();
                            a.setStyle("display", "");
                            g && g.getName() == "ul" && g.setStyle("display", "")
                        }
                    }, mark: function (a) {
                        this.multiSelect || this.unmarkAll();
                        var a = this._.items[a], b = this.element.getDocument().getById(a);
                        b.addClass("cke_selected");
                        this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", true);
                        this.onMark && this.onMark(b)
                    }, unmark: function (a) {
                        var b = this.element.getDocument(), a = this._.items[a], c = b.getById(a);
                        c.removeClass("cke_selected");
                        b.getById(a + "_option").removeAttribute("aria-selected");
                        this.onUnmark && this.onUnmark(c)
                    }, unmarkAll: function () {
                        var a = this._.items, b = this.element.getDocument(), c;
                        for (c in a) {
                            var g = a[c];
                            b.getById(g).removeClass("cke_selected");
                            b.getById(g + "_option").removeAttribute("aria-selected")
                        }
                        this.onUnmark && this.onUnmark()
                    }, isMarked: function (a) {
                        return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected")
                    }, focus: function (a) {
                        this._.focusIndex = -1;
                        var b = this.element.getElementsByTag("a"), c, g = -1;
                        if (a)for (c = this.element.getDocument().getById(this._.items[a]).getFirst(); a = b.getItem(++g);) {
                            if (a.equals(c)) {
                                this._.focusIndex = g;
                                break
                            }
                        } else {
                            b = CKEDITOR.document.getWindow().getScrollPosition().y;
                            this.element.focus();
                            if (CKEDITOR.env.webkit)CKEDITOR.document[CKEDITOR.env.webkit ? "getBody" : "getDocumentElement"]().$.scrollTop = b
                        }
                        c && setTimeout(function () {
                            c.focus()
                        }, 0)
                    }
                }
            })
        }
    }),function () {
        var c = '<a id="{id}" class="cke_button cke_button__{name} cke_button_{state} {cls}"' +
            (CKEDITOR.env.gecko && CKEDITOR.env.version >= 10900 && !CKEDITOR.env.hc ? "" : '" href="javascript:void(\'{titleJs}\')"') + ' title="{title}" tabindex="-1" hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="{hasArrow}"';
        if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac)c = c + ' onkeypress="return false;"';
        CKEDITOR.env.gecko && (c = c + ' onblur="this.style.cssText = this.style.cssText;"');
        var c = c + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);"  onmousedown="return CKEDITOR.tools.callFunction({mousedownFn},event);" ' +
            (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span class="cke_button_icon cke_button__{iconName}_icon" style="{style}"'), c = c + '>&nbsp;</span><span id="{id}_label" class="cke_button_label cke_button__{name}_label" aria-hidden="false">{label}</span>{arrowHtml}</a>', f = CKEDITOR.addTemplate("buttonArrow", '<span class="cke_button_arrow">' + (CKEDITOR.env.hc ? "&#9660;" : "") + "</span>"), b = CKEDITOR.addTemplate("button", c);
        CKEDITOR.plugins.add("button", {
            beforeInit: function (a) {
                a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler)
            }
        });
        CKEDITOR.UI_BUTTON = "button";
        CKEDITOR.ui.button = function (a) {
            CKEDITOR.tools.extend(this, a, {
                title: a.label, click: a.click || function (b) {
                    b.execCommand(a.command)
                }
            });
            this._ = {}
        };
        CKEDITOR.ui.button.handler = {
            create: function (a) {
                return new CKEDITOR.ui.button(a)
            }
        };
        CKEDITOR.ui.button.prototype = {
            render: function (a, c) {
                var i = CKEDITOR.env, g = this._.id = CKEDITOR.tools.getNextId(), h = "", e = this.command, j;
                this._.editor = a;
                var k = {
                    id: g, button: this, editor: a, focus: function () {
                        CKEDITOR.document.getById(g).focus()
                    }, execute: function () {
                        this.button.click(a)
                    }, attach: function (a) {
                        this.button.attach(a)
                    }
                }, n = CKEDITOR.tools.addFunction(function (a) {
                    if (k.onkey) {
                        a = new CKEDITOR.dom.event(a);
                        return k.onkey(k, a.getKeystroke()) !== false
                    }
                }), o = CKEDITOR.tools.addFunction(function (a) {
                    var b;
                    k.onfocus && (b = k.onfocus(k, new CKEDITOR.dom.event(a)) !== false);
                    CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 && a.preventBubble();
                    return b
                }), q = 0, m = CKEDITOR.tools.addFunction(function () {
                    if (CKEDITOR.env.opera) {
                        var b = a.editable();
                        if (b.isInline() && b.hasFocus) {
                            a.lockSelection();
                            q = 1
                        }
                    }
                });
                k.clickFn = j = CKEDITOR.tools.addFunction(function () {
                    if (q) {
                        a.unlockSelection(1);
                        q = 0
                    }
                    k.execute()
                });
                if (this.modes) {
                    var p = {}, r = function () {
                        var b = a.mode;
                        if (b) {
                            b = this.modes[b] ? p[b] != void 0 ? p[b] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
                            this.setState(a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : b)
                        }
                    };
                    a.on("beforeModeUnload", function () {
                        if (a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED)p[a.mode] = this._.state
                    }, this);
                    a.on("mode", r, this);
                    !this.readOnly && a.on("readOnly", r, this)
                } else if (e)if (e = a.getCommand(e)) {
                    e.on("state", function () {
                        this.setState(e.state)
                    }, this);
                    h = h + (e.state == CKEDITOR.TRISTATE_ON ? "on" : e.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off")
                }
                if (this.directional)a.on("contentDirChanged", function (b) {
                    var c = CKEDITOR.document.getById(this._.id), d = c.getFirst(), b = b.data;
                    b != a.lang.dir ? c.addClass("cke_" + b) : c.removeClass("cke_ltr").removeClass("cke_rtl");
                    d.setAttribute("style", CKEDITOR.skin.getIconStyle(l, b == "rtl", this.icon, this.iconOffset))
                }, this);
                e || (h = h + "off");
                var l = r = this.name || this.command;
                if (this.icon && !/\./.test(this.icon)) {
                    l = this.icon;
                    this.icon = null
                }
                i = {
                    id: g,
                    name: r,
                    iconName: l,
                    label: this.label,
                    cls: this.className || "",
                    state: h,
                    title: this.title,
                    titleJs: i.gecko && i.version >= 10900 && !i.hc ? "" : (this.title || "").replace("'", ""),
                    hasArrow: this.hasArrow ? "true" : "false",
                    keydownFn: n,
                    mousedownFn: m,
                    focusFn: o,
                    clickFn: j,
                    style: CKEDITOR.skin.getIconStyle(l, a.lang.dir == "rtl", this.icon, this.iconOffset),
                    arrowHtml: this.hasArrow ? f.output() : ""
                };
                b.output(i, c);
                if (this.onRender)this.onRender();
                return k
            }, setState: function (a) {
                if (this._.state == a)return false;
                this._.state = a;
                var b = CKEDITOR.document.getById(this._.id);
                if (b) {
                    b.setState(a, "cke_button");
                    a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", true) : b.removeAttribute("aria-disabled");
                    a == CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", true) : b.removeAttribute("aria-pressed");
                    return true
                }
                return false
            }, toFeature: function (a) {
                if (this._.feature)return this._.feature;
                var b = this;
                !this.allowedContent && (!this.requiredContent && this.command) && (b = a.getCommand(this.command) || b);
                return this._.feature = b
            }
        };
        CKEDITOR.ui.prototype.addButton = function (a, b) {
            this.add(a, CKEDITOR.UI_BUTTON, b)
        }
    }(),CKEDITOR.plugins.add("richcombo", {
        requires: "floatpanel,listblock,button", beforeInit: function (c) {
            c.ui.addHandler(CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler)
        }
    }),function () {
        var c = '<span id="{id}" class="cke_combo cke_combo__{name} {cls}" role="presentation"><span id="{id}_label" class="cke_combo_label">{label}</span><a class="cke_combo_button" hidefocus=true title="{title}" tabindex="-1"' +
            (CKEDITOR.env.gecko && CKEDITOR.env.version >= 10900 && !CKEDITOR.env.hc ? "" : '" href="javascript:void(\'{titleJs}\')"') + ' hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="true"';
        if (CKEDITOR.env.opera || CKEDITOR.env.gecko && CKEDITOR.env.mac)c = c + ' onkeypress="return false;"';
        CKEDITOR.env.gecko && (c = c + ' onblur="this.style.cssText = this.style.cssText;"');
        var c = c + (' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event,this);" onmousedown="return CKEDITOR.tools.callFunction({mousedownFn},event);"  onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" ' +
            (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span id="{id}_text" class="cke_combo_text cke_combo_inlinelabel">{label}</span><span class="cke_combo_open"><span class="cke_combo_arrow">' + (CKEDITOR.env.hc ? "&#9660;" : CKEDITOR.env.air ? "&nbsp;" : "") + "</span></span></a></span>"), f = CKEDITOR.addTemplate("combo", c);
        CKEDITOR.UI_RICHCOMBO = "richcombo";
        CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
            $: function (b) {
                CKEDITOR.tools.extend(this, b, {canGroup: false, title: b.label, modes: {wysiwyg: 1}, editorFocus: 1});
                b = this.panel || {};
                delete this.panel;
                this.id = CKEDITOR.tools.getNextNumber();
                this.document = b.parent && b.parent.getDocument() || CKEDITOR.document;
                b.className = "cke_combopanel";
                b.block = {multiSelect: b.multiSelect, attributes: b.attributes};
                b.toolbarRelated = true;
                this._ = {panelDefinition: b, items: {}}
            }, proto: {
                renderHtml: function (b) {
                    var a = [];
                    this.render(b, a);
                    return a.join("")
                }, render: function (b, a) {
                    function c() {
                        var a = this.modes[b.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
                        this.setState(b.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : a);
                        this.setValue("")
                    }

                    var i = CKEDITOR.env, g = "cke_" + this.id, h = CKEDITOR.tools.addFunction(function (a) {
                        if (o) {
                            b.unlockSelection(1);
                            o = 0
                        }
                        j.execute(a)
                    }, this), e = this, j = {
                        id: g, combo: this, focus: function () {
                            CKEDITOR.document.getById(g).getChild(1).focus()
                        }, execute: function (a) {
                            var c = e._;
                            if (c.state != CKEDITOR.TRISTATE_DISABLED) {
                                e.createPanel(b);
                                if (c.on)c.panel.hide(); else {
                                    e.commit();
                                    var d = e.getValue();
                                    d ? c.list.mark(d) : c.list.unmarkAll();
                                    c.panel.showBlock(e.id, new CKEDITOR.dom.element(a), 4)
                                }
                            }
                        }, clickFn: h
                    };
                    b.on("mode", c, this);
                    !this.readOnly && b.on("readOnly", c, this);
                    var k = CKEDITOR.tools.addFunction(function (a, b) {
                        var a = new CKEDITOR.dom.event(a), c = a.getKeystroke();
                        switch (c) {
                            case 13:
                            case 32:
                            case 40:
                                CKEDITOR.tools.callFunction(h, b);
                                break;
                            default:
                                j.onkey(j, c)
                        }
                        a.preventDefault()
                    }), n = CKEDITOR.tools.addFunction(function () {
                        j.onfocus && j.onfocus()
                    }), o = 0, q = CKEDITOR.tools.addFunction(function () {
                        if (CKEDITOR.env.opera) {
                            var a = b.editable();
                            if (a.isInline() && a.hasFocus) {
                                b.lockSelection();
                                o = 1
                            }
                        }
                    });
                    j.keyDownFn = k;
                    i = {
                        id: g,
                        name: this.name || this.command,
                        label: this.label,
                        title: this.title,
                        cls: this.className || "",
                        titleJs: i.gecko && i.version >= 10900 && !i.hc ? "" : (this.title || "").replace("'", ""),
                        keydownFn: k,
                        mousedownFn: q,
                        focusFn: n,
                        clickFn: h
                    };
                    f.output(i, a);
                    if (this.onRender)this.onRender();
                    return j
                }, createPanel: function (b) {
                    if (!this._.panel) {
                        var a = this._.panelDefinition, c = this._.panelDefinition.block, f = a.parent || CKEDITOR.document.getBody(), g = "cke_combopanel__" + this.name, h = new CKEDITOR.ui.floatPanel(b, f, a), e = h.addListBlock(this.id, c), j = this;
                        h.onShow = function () {
                            this.element.addClass(g);
                            j.setState(CKEDITOR.TRISTATE_ON);
                            j._.on = 1;
                            j.editorFocus && b.focus();
                            if (j.onOpen)j.onOpen();
                            e.focus(!e.multiSelect && j.getValue())
                        };
                        h.onHide = function (a) {
                            this.element.removeClass(g);
                            j.setState(j.modes && j.modes[b.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                            j._.on = 0;
                            if (!a && j.onClose)j.onClose()
                        };
                        h.onEscape = function () {
                            h.hide(1)
                        };
                        e.onClick = function (a, b) {
                            j.onClick && j.onClick.call(j, a, b);
                            h.hide()
                        };
                        this._.panel = h;
                        this._.list = e;
                        h.getBlock(this.id).onHide = function () {
                            j._.on = 0;
                            j.setState(CKEDITOR.TRISTATE_OFF)
                        };
                        this.init && this.init()
                    }
                }, setValue: function (b, a) {
                    this._.value = b;
                    var c = this.document.getById("cke_" + this.id + "_text");
                    if (c) {
                        if (!b && !a) {
                            a = this.label;
                            c.addClass("cke_combo_inlinelabel")
                        } else c.removeClass("cke_combo_inlinelabel");
                        c.setText(typeof a != "undefined" ? a : b)
                    }
                }, getValue: function () {
                    return this._.value || ""
                }, unmarkAll: function () {
                    this._.list.unmarkAll()
                }, mark: function (b) {
                    this._.list.mark(b)
                }, hideItem: function (b) {
                    this._.list.hideItem(b)
                }, hideGroup: function (b) {
                    this._.list.hideGroup(b)
                }, showAll: function () {
                    this._.list.showAll()
                }, add: function (b, a, c) {
                    this._.items[b] = c || b;
                    this._.list.add(b, a, c)
                }, startGroup: function (b) {
                    this._.list.startGroup(b)
                }, commit: function () {
                    if (!this._.committed) {
                        this._.list.commit();
                        this._.committed = 1;
                        CKEDITOR.ui.fire("ready", this)
                    }
                    this._.committed = 1
                }, setState: function (b) {
                    if (this._.state != b) {
                        var a = this.document.getById("cke_" + this.id);
                        a.setState(b, "cke_combo");
                        b == CKEDITOR.TRISTATE_DISABLED ? a.setAttribute("aria-disabled", true) : a.removeAttribute("aria-disabled");
                        this._.state = b
                    }
                }, enable: function () {
                    this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState)
                }, disable: function () {
                    if (this._.state != CKEDITOR.TRISTATE_DISABLED) {
                        this._.lastState = this._.state;
                        this.setState(CKEDITOR.TRISTATE_DISABLED)
                    }
                }
            }, statics: {
                handler: {
                    create: function (b) {
                        return new CKEDITOR.ui.richCombo(b)
                    }
                }
            }
        });
        CKEDITOR.ui.prototype.addRichCombo = function (b, a) {
            this.add(b, CKEDITOR.UI_RICHCOMBO, a)
        }
    }(),CKEDITOR.plugins.add("format", {
        requires: "richcombo", init: function (c) {
            if (!c.blockless) {
                for (var f = c.config, b = c.lang.format, a = f.format_tags.split(";"), d = {}, i = 0, g = [], h = 0; h < a.length; h++) {
                    var e = a[h], j = new CKEDITOR.style(f["format_" + e]);
                    if (!c.filter.customConfig || c.filter.check(j)) {
                        i++;
                        d[e] = j;
                        d[e]._.enterMode = c.config.enterMode;
                        g.push(j)
                    }
                }
                i !== 0 && c.ui.addRichCombo("Format", {
                    label: b.label,
                    title: b.panelTitle,
                    toolbar: "styles,20",
                    allowedContent: g,
                    panel: {
                        css: [CKEDITOR.skin.getPath("editor")].concat(f.contentsCss),
                        multiSelect: false,
                        attributes: {"aria-label": b.panelTitle}
                    },
                    init: function () {
                        this.startGroup(b.panelTitle);
                        for (var a in d) {
                            var c = b["tag_" + a];
                            this.add(a, d[a].buildPreview(c), c)
                        }
                    },
                    onClick: function (a) {
                        c.focus();
                        c.fire("saveSnapshot");
                        var a = d[a], b = c.elementPath();
                        c[a.checkActive(b) ? "removeStyle" : "applyStyle"](a);
                        setTimeout(function () {
                            c.fire("saveSnapshot")
                        }, 0)
                    },
                    onRender: function () {
                        c.on("selectionChange", function (a) {
                            var b = this.getValue(), a = a.data.path, e = !c.readOnly && a.isContextFor("p");
                            this[e ? "enable" : "disable"]();
                            if (e) {
                                for (var g in d)if (d[g].checkActive(a)) {
                                    g != b && this.setValue(g, c.lang.format["tag_" + g]);
                                    return
                                }
                                this.setValue("")
                            }
                        }, this)
                    }
                })
            }
        }
    }),CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div",CKEDITOR.config.format_p = {element: "p"},CKEDITOR.config.format_div = {element: "div"},CKEDITOR.config.format_pre = {element: "pre"},CKEDITOR.config.format_address = {element: "address"},CKEDITOR.config.format_h1 = {element: "h1"},CKEDITOR.config.format_h2 = {element: "h2"},CKEDITOR.config.format_h3 = {element: "h3"},CKEDITOR.config.format_h4 = {element: "h4"},CKEDITOR.config.format_h5 = {element: "h5"},CKEDITOR.config.format_h6 = {element: "h6"},function () {
        var c = {
            canUndo: false, exec: function (c) {
                var b = c.document.createElement("hr");
                c.insertElement(b)
            }, allowedContent: "hr", requiredContent: "hr"
        };
        CKEDITOR.plugins.add("horizontalrule", {
            init: function (f) {
                if (!f.blockless) {
                    f.addCommand("horizontalrule", c);
                    f.ui.addButton && f.ui.addButton("HorizontalRule", {
                        label: f.lang.horizontalrule.toolbar,
                        command: "horizontalrule",
                        toolbar: "insert,40"
                    })
                }
            }
        })
    }(),CKEDITOR.plugins.add("htmlwriter", {
        init: function (c) {
            var f = new CKEDITOR.htmlWriter;
            f.forceSimpleAmpersand = c.config.forceSimpleAmpersand;
            f.indentationChars = c.config.dataIndentationChars || "\t";
            c.dataProcessor.writer = f
        }
    }),CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
        base: CKEDITOR.htmlParser.basicWriter, $: function () {
            this.base();
            this.indentationChars = "\t";
            this.selfClosingEnd = " />";
            this.lineBreakChars = "\n";
            this.sortAttributes = 1;
            this._.indent = 0;
            this._.indentation = "";
            this._.inPre = 0;
            this._.rules = {};
            var c = CKEDITOR.dtd, f;
            for (f in CKEDITOR.tools.extend({}, c.$nonBodyContent, c.$block, c.$listItem, c.$tableContent))this.setRules(f, {
                indent: !c[f]["#"],
                breakBeforeOpen: 1,
                breakBeforeClose: !c[f]["#"],
                breakAfterClose: 1,
                needsSpace: f in c.$block && !(f in{li: 1, dt: 1, dd: 1})
            });
            this.setRules("br", {breakAfterOpen: 1});
            this.setRules("title", {indent: 0, breakAfterOpen: 0});
            this.setRules("style", {indent: 0, breakBeforeClose: 1});
            this.setRules("pre", {breakAfterOpen: 1, indent: 0})
        }, proto: {
            openTag: function (c) {
                var f = this._.rules[c];
                this._.afterCloser && (f && f.needsSpace && this._.needsSpace) && this._.output.push("\n");
                if (this._.indent)this.indentation(); else if (f && f.breakBeforeOpen) {
                    this.lineBreak();
                    this.indentation()
                }
                this._.output.push("<", c);
                this._.afterCloser = 0
            }, openTagClose: function (c, f) {
                var b = this._.rules[c];
                if (f) {
                    this._.output.push(this.selfClosingEnd);
                    if (b && b.breakAfterClose)this._.needsSpace = b.needsSpace
                } else {
                    this._.output.push(">");
                    if (b && b.indent)this._.indentation = this._.indentation + this.indentationChars
                }
                b && b.breakAfterOpen && this.lineBreak();
                c == "pre" && (this._.inPre = 1)
            }, attribute: function (c, f) {
                if (typeof f == "string") {
                    this.forceSimpleAmpersand && (f = f.replace(/&amp;/g, "&"));
                    f = CKEDITOR.tools.htmlEncodeAttr(f)
                }
                this._.output.push(" ", c, '="', f, '"')
            }, closeTag: function (c) {
                var f = this._.rules[c];
                if (f && f.indent)this._.indentation = this._.indentation.substr(this.indentationChars.length);
                if (this._.indent)this.indentation(); else if (f && f.breakBeforeClose) {
                    this.lineBreak();
                    this.indentation()
                }
                this._.output.push("</", c, ">");
                c == "pre" && (this._.inPre = 0);
                if (f && f.breakAfterClose) {
                    this.lineBreak();
                    this._.needsSpace = f.needsSpace
                }
                this._.afterCloser = 1
            }, text: function (c) {
                if (this._.indent) {
                    this.indentation();
                    !this._.inPre && (c = CKEDITOR.tools.ltrim(c))
                }
                this._.output.push(c)
            }, comment: function (c) {
                this._.indent && this.indentation();
                this._.output.push("<\!--", c, "--\>")
            }, lineBreak: function () {
                !this._.inPre && this._.output.length > 0 && this._.output.push(this.lineBreakChars);
                this._.indent = 1
            }, indentation: function () {
                !this._.inPre && this._.indentation && this._.output.push(this._.indentation);
                this._.indent = 0
            }, reset: function () {
                this._.output = [];
                this._.indent = 0;
                this._.indentation = "";
                this._.afterCloser = 0;
                this._.inPre = 0
            }, setRules: function (c, f) {
                var b = this._.rules[c];
                b ? CKEDITOR.tools.extend(b, f, true) : this._.rules[c] = f
            }
        }
    }),function () {
        function c(b, a) {
            a || (a = b.getSelection().getSelectedElement());
            if (a && a.is("img") && !a.data("cke-realelement") && !a.isReadOnly())return a
        }

        function f(b) {
            var a = b.getStyle("float");
            if (a == "inherit" || a == "none")a = 0;
            a || (a = b.getAttribute("align"));
            return a
        }

        CKEDITOR.plugins.add("image", {
            requires: "dialog", init: function (b) {
                CKEDITOR.dialog.add("image", this.path + "dialogs/image.js");
                var a = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";
                CKEDITOR.dialog.isTabEnabled(b, "image", "advanced") && (a = "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)");
                b.addCommand("image", new CKEDITOR.dialogCommand("image", {
                    allowedContent: a,
                    requiredContent: "img[alt,src]",
                    contentTransformations: [["img{width}: sizeToStyle", "img[width]: sizeToAttribute"], ["img{float}: alignmentToStyle", "img[align]: alignmentToAttribute"]]
                }));
                b.ui.addButton && b.ui.addButton("Image", {
                    label: b.lang.common.image,
                    command: "image",
                    toolbar: "insert,10"
                });
                b.on("doubleclick", function (a) {
                    var b = a.data.element;
                    if (b.is("img") && !b.data("cke-realelement") && !b.isReadOnly())a.data.dialog = "image"
                });
                b.addMenuItems && b.addMenuItems({image: {label: b.lang.image.menu, command: "image", group: "image"}});
                b.contextMenu && b.contextMenu.addListener(function (a) {
                    if (c(b, a))return {image: CKEDITOR.TRISTATE_OFF}
                })
            }, afterInit: function (b) {
                function a(a) {
                    var i = b.getCommand("justify" + a);
                    if (i) {
                        if (a == "left" || a == "right")i.on("exec", function (g) {
                            var h = c(b), e;
                            if (h) {
                                e = f(h);
                                if (e == a) {
                                    h.removeStyle("float");
                                    a == f(h) && h.removeAttribute("align")
                                } else h.setStyle("float", a);
                                g.cancel()
                            }
                        });
                        i.on("refresh", function (g) {
                            var h = c(b);
                            if (h) {
                                h = f(h);
                                this.setState(h == a ? CKEDITOR.TRISTATE_ON : a == "right" || a == "left" ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                                g.cancel()
                            }
                        })
                    }
                }

                a("left");
                a("right");
                a("center");
                a("block")
            }
        })
    }(),CKEDITOR.config.image_removeLinkByEmptyURL = !0,function () {
        function c(b, c) {
            var d = a.exec(b), f = a.exec(c);
            if (d) {
                if (!d[2] && f[2] == "px")return f[1];
                if (d[2] == "px" && !f[2])return f[1] + "px"
            }
            return c
        }

        var f = CKEDITOR.htmlParser.cssStyle, b = CKEDITOR.tools.cssLength, a = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i, d = {
            elements: {
                $: function (a) {
                    var b = a.attributes;
                    if ((b = (b = (b = b && b["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(b))) && b.children[0]) && a.attributes["data-cke-resizable"]) {
                        var d = (new f(a)).rules, a = b.attributes, i = d.width, d = d.height;
                        i && (a.width = c(a.width, i));
                        d && (a.height = c(a.height, d))
                    }
                    return b
                }
            }
        }, i = CKEDITOR.plugins.add("fakeobjects", {
            afterInit: function (a) {
                (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(d)
            }
        });
        CKEDITOR.editor.prototype.createFakeElement = function (a, c, d, j) {
            var k = this.lang.fakeobjects, k = k[d] || k.unknown, c = {
                "class": c,
                "data-cke-realelement": encodeURIComponent(a.getOuterHtml()),
                "data-cke-real-node-type": a.type,
                alt: k,
                title: k,
                align: a.getAttribute("align") || ""
            };
            if (!CKEDITOR.env.hc)c.src = CKEDITOR.getUrl(i.path + "images/spacer.gif");
            d && (c["data-cke-real-element-type"] = d);
            if (j) {
                c["data-cke-resizable"] = j;
                d = new f;
                j = a.getAttribute("width");
                a = a.getAttribute("height");
                j && (d.rules.width = b(j));
                a && (d.rules.height = b(a));
                d.populate(c)
            }
            return this.document.createElement("img", {attributes: c})
        };
        CKEDITOR.editor.prototype.createFakeParserElement = function (a, c, d, j) {
            var k = this.lang.fakeobjects, k = k[d] || k.unknown, n;
            n = new CKEDITOR.htmlParser.basicWriter;
            a.writeHtml(n);
            n = n.getHtml();
            c = {
                "class": c,
                "data-cke-realelement": encodeURIComponent(n),
                "data-cke-real-node-type": a.type,
                alt: k,
                title: k,
                align: a.attributes.align || ""
            };
            if (!CKEDITOR.env.hc)c.src = CKEDITOR.getUrl(i.path + "images/spacer.gif");
            d && (c["data-cke-real-element-type"] = d);
            if (j) {
                c["data-cke-resizable"] = j;
                j = a.attributes;
                a = new f;
                d = j.width;
                j = j.height;
                d != void 0 && (a.rules.width = b(d));
                j != void 0 && (a.rules.height = b(j));
                a.populate(c)
            }
            return new CKEDITOR.htmlParser.element("img", c)
        };
        CKEDITOR.editor.prototype.restoreRealElement = function (a) {
            if (a.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT)return null;
            var b = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(a.data("cke-realelement")), this.document);
            if (a.data("cke-resizable")) {
                var d = a.getStyle("width"), a = a.getStyle("height");
                d && b.setAttribute("width", c(b.getAttribute("width"), d));
                a && b.setAttribute("height", c(b.getAttribute("height"), a))
            }
            return b
        }
    }(),CKEDITOR.plugins.add("link", {
        requires: "dialog,fakeobjects", onLoad: function () {
            function c(a) {
                return b.replace(/%1/g, a == "rtl" ? "right" : "left").replace(/%2/g, "cke_contents_" + a)
            }

            var f = "background:url(" + CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;", b = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + f + "padding-%1:18px;cursor:auto;}" + (CKEDITOR.env.ie ? "a.cke_anchor_empty{display:inline-block;}" : "") + ".%2 img.cke_anchor{" + f + "width:16px;min-height:15px;height:1.15em;vertical-align:" + (CKEDITOR.env.opera ? "middle" : "text-bottom") + ";}";
            CKEDITOR.addCss(c("ltr") + c("rtl"))
        }, init: function (c) {
            var f = "a[!href]";
            CKEDITOR.dialog.isTabEnabled(c, "link", "advanced") && (f = f.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type]{*}(*)"));
            CKEDITOR.dialog.isTabEnabled(c, "link", "target") && (f = f.replace("]", ",target,onclick]"));
            c.addCommand("link", new CKEDITOR.dialogCommand("link", {allowedContent: f, requiredContent: "a[href]"}));
            c.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", {
                allowedContent: "a[!name,id]",
                requiredContent: "a[name]"
            }));
            c.addCommand("unlink", new CKEDITOR.unlinkCommand);
            c.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand);
            c.setKeystroke(CKEDITOR.CTRL + 76, "link");
            if (c.ui.addButton) {
                c.ui.addButton("Link", {label: c.lang.link.toolbar, command: "link", toolbar: "links,10"});
                c.ui.addButton("Unlink", {label: c.lang.link.unlink, command: "unlink", toolbar: "links,20"});
                c.ui.addButton("Anchor", {label: c.lang.link.anchor.toolbar, command: "anchor", toolbar: "links,30"})
            }
            CKEDITOR.dialog.add("link", this.path + "dialogs/link.js");
            CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js");
            c.on("doubleclick", function (b) {
                var a = CKEDITOR.plugins.link.getSelectedLink(c) || b.data.element;
                if (!a.isReadOnly())if (a.is("a")) {
                    b.data.dialog = a.getAttribute("name") && (!a.getAttribute("href") || !a.getChildCount()) ? "anchor" : "link";
                    c.getSelection().selectElement(a)
                } else if (CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, a))b.data.dialog = "anchor"
            });
            c.addMenuItems && c.addMenuItems({
                anchor: {
                    label: c.lang.link.anchor.menu,
                    command: "anchor",
                    group: "anchor",
                    order: 1
                },
                removeAnchor: {label: c.lang.link.anchor.remove, command: "removeAnchor", group: "anchor", order: 5},
                link: {label: c.lang.link.menu, command: "link", group: "link", order: 1},
                unlink: {label: c.lang.link.unlink, command: "unlink", group: "link", order: 5}
            });
            c.contextMenu && c.contextMenu.addListener(function (b) {
                if (!b || b.isReadOnly())return null;
                b = CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, b);
                if (!b && !(b = CKEDITOR.plugins.link.getSelectedLink(c)))return null;
                var a = {};
                b.getAttribute("href") && b.getChildCount() && (a = {
                    link: CKEDITOR.TRISTATE_OFF,
                    unlink: CKEDITOR.TRISTATE_OFF
                });
                if (b && b.hasAttribute("name"))a.anchor = a.removeAnchor = CKEDITOR.TRISTATE_OFF;
                return a
            })
        }, afterInit: function (c) {
            var f = c.dataProcessor, b = f && f.dataFilter, f = f && f.htmlFilter, a = c._.elementsPath && c._.elementsPath.filters;
            b && b.addRules({
                elements: {
                    a: function (a) {
                        var b = a.attributes;
                        if (!b.name)return null;
                        var g = !a.children.length;
                        if (CKEDITOR.plugins.link.synAnchorSelector) {
                            var a = g ? "cke_anchor_empty" : "cke_anchor", f = b["class"];
                            if (b.name && (!f || f.indexOf(a) < 0))b["class"] = (f || "") + " " + a;
                            if (g && CKEDITOR.plugins.link.emptyAnchorFix) {
                                b.contenteditable = "false";
                                b["data-cke-editable"] = 1
                            }
                        } else if (CKEDITOR.plugins.link.fakeAnchor && g)return c.createFakeParserElement(a, "cke_anchor", "anchor");
                        return null
                    }
                }
            });
            CKEDITOR.plugins.link.emptyAnchorFix && f && f.addRules({
                elements: {
                    a: function (a) {
                        delete a.attributes.contenteditable
                    }
                }
            });
            a && a.push(function (a, b) {
                if (b == "a" && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, a) || a.getAttribute("name") && (!a.getAttribute("href") || !a.getChildCount())))return "anchor"
            })
        }
    }),CKEDITOR.plugins.link = {
        getSelectedLink: function (c) {
            var f = c.getSelection(), b = f.getSelectedElement();
            if (b && b.is("a"))return b;
            if (f = f.getRanges(true)[0]) {
                f.shrink(CKEDITOR.SHRINK_TEXT);
                return c.elementPath(f.getCommonAncestor()).contains("a", 1)
            }
            return null
        },
        fakeAnchor: CKEDITOR.env.opera || CKEDITOR.env.webkit,
        synAnchorSelector: CKEDITOR.env.ie,
        emptyAnchorFix: CKEDITOR.env.ie && 8 > CKEDITOR.env.version,
        tryRestoreFakeAnchor: function (c, f) {
            if (f && f.data("cke-real-element-type") && f.data("cke-real-element-type") == "anchor") {
                var b = c.restoreRealElement(f);
                if (b.data("cke-saved-name"))return b
            }
        }
    },CKEDITOR.unlinkCommand = function () {
    },CKEDITOR.unlinkCommand.prototype = {
        exec: function (c) {
            var f = new CKEDITOR.style({element: "a", type: CKEDITOR.STYLE_INLINE, alwaysRemoveElement: 1});
            c.removeStyle(f)
        }, refresh: function (c, f) {
            var b = f.lastElement && f.lastElement.getAscendant("a", true);
            b && b.getName() == "a" && b.getAttribute("href") && b.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
        }, contextSensitive: 1, startDisabled: 1, requiredContent: "a[href]"
    },CKEDITOR.removeAnchorCommand = function () {
    },CKEDITOR.removeAnchorCommand.prototype = {
        exec: function (c) {
            var f = c.getSelection(), b = f.createBookmarks(), a;
            if (f && (a = f.getSelectedElement()) && (CKEDITOR.plugins.link.fakeAnchor && !a.getChildCount() ? CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, a) : a.is("a")))a.remove(1); else if (a = CKEDITOR.plugins.link.getSelectedLink(c))if (a.hasAttribute("href")) {
                a.removeAttributes({name: 1, "data-cke-saved-name": 1});
                a.removeClass("cke_anchor")
            } else a.remove(1);
            f.selectBookmarks(b)
        }, requiredContent: "a[name]"
    },CKEDITOR.tools.extend(CKEDITOR.config, {
        linkShowAdvancedTab: !0,
        linkShowTargetTab: !0
    }),"use strict",function () {
        function c(a, b, c) {
            return j(b) && j(c) && c.equals(b.getNext(function (a) {
                    return !(U(a) || W(a) || k(a))
                }))
        }

        function f(a) {
            this.upper = a[0];
            this.lower = a[1];
            this.set.apply(this, a.slice(2))
        }

        function b(a) {
            var b = a.element, c;
            return b && j(b) ? (c = b.getAscendant(a.triggers, true)) && !c.contains(a.editable) && !c.equals(a.editable) ? c : null : null
        }

        function a(a, b, c) {
            y(a, b);
            y(a, c);
            a = b.size.bottom;
            c = c.size.top;
            return a && c ? 0 | (a + c) / 2 : a || c
        }

        function d(a, b, c) {
            return b = b[c ? "getPrevious" : "getNext"](function (b) {
                return b && b.type == CKEDITOR.NODE_TEXT && !U(b) || j(b) && !k(b) && !e(a, b)
            })
        }

        function i(a) {
            var b = a.doc, c = u('<span contenteditable="false" style="' +
            Q + "position:absolute;border-top:1px dashed " + a.boxColor + '"></span>', b), d = this.path + "images/" + (x.hidpi ? "hidpi/" : "") + "icon.png";
            v(c, {
                attach: function () {
                    this.wrap.getParent() || this.wrap.appendTo(a.editable, true);
                    return this
                },
                lineChildren: [v(u('<span title="' + a.editor.lang.magicline.title + '" contenteditable="false">&#8629;</span>', b), {
                    base: Q + "height:17px;width:17px;" + (a.rtl ? "left" : "right") + ":17px;background:url(" + d + ") center no-repeat " + a.boxColor + ";cursor:pointer;" + (x.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" : "") + (x.hidpi ? "background-size: 9px 10px;" : ""),
                    looks: ["top:-8px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "2px", 1), "top:-17px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "2px 2px 0px 0px", 1), "top:-1px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "0px 0px 2px 2px", 1)]
                }), v(u(O, b), {
                    base: R + "left:0px;border-left-color:" + a.boxColor + ";",
                    looks: ["border-width:8px 0 8px 8px;top:-8px", "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px"]
                }), v(u(O, b), {
                    base: R + "right:0px;border-right-color:" +
                    a.boxColor + ";",
                    looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px", "border-width:0 8px 8px 0;top:0px"]
                })],
                detach: function () {
                    this.wrap.getParent() && this.wrap.remove();
                    return this
                },
                mouseNear: function () {
                    y(a, this);
                    var b = a.holdDistance, c = this.size;
                    return c && a.mouse.y > c.top - b && a.mouse.y < c.bottom + b && a.mouse.x > c.left - b && a.mouse.x < c.right + b ? true : false
                },
                place: function () {
                    var b = a.view, c = a.editable, d = a.trigger, e = d.upper, g = d.lower, f = e || g, h = f.getParent(), i = {};
                    this.trigger = d;
                    e && y(a, e, true);
                    g && y(a, g, true);
                    y(a, h, true);
                    a.inInlineMode && t(a, true);
                    if (h.equals(c)) {
                        i.left = b.scroll.x;
                        i.right = -b.scroll.x;
                        i.width = ""
                    } else {
                        i.left = f.size.left - f.size.margin.left + b.scroll.x - (a.inInlineMode ? b.editable.left + b.editable.border.left : 0);
                        i.width = f.size.outerWidth + f.size.margin.left + f.size.margin.right + b.scroll.x;
                        i.right = ""
                    }
                    if (e && g)i.top = e.size.margin.bottom === g.size.margin.top ? 0 | e.size.bottom + e.size.margin.bottom / 2 : e.size.margin.bottom < g.size.margin.top ? e.size.bottom + e.size.margin.bottom : e.size.bottom +
                    e.size.margin.bottom - g.size.margin.top; else if (e) {
                        if (!g)i.top = e.size.bottom + e.size.margin.bottom
                    } else i.top = g.size.top - g.size.margin.top;
                    if (d.is(E) || i.top > b.scroll.y - 15 && i.top < b.scroll.y + 5) {
                        i.top = a.inInlineMode ? 0 : b.scroll.y;
                        this.look(E)
                    } else if (d.is(M) || i.top > b.pane.bottom - 5 && i.top < b.pane.bottom + 15) {
                        i.top = a.inInlineMode ? b.editable.height + b.editable.padding.top + b.editable.padding.bottom : b.pane.bottom - 1;
                        this.look(M)
                    } else {
                        if (a.inInlineMode)i.top = i.top - (b.editable.top + b.editable.border.top);
                        this.look(I)
                    }
                    if (a.inInlineMode) {
                        i.top--;
                        i.top = i.top + b.editable.scroll.top;
                        i.left = i.left + b.editable.scroll.left
                    }
                    for (var j in i)i[j] = CKEDITOR.tools.cssLength(i[j]);
                    this.setStyles(i)
                },
                look: function (a) {
                    if (this.oldLook != a) {
                        for (var b = this.lineChildren.length, c; b--;)(c = this.lineChildren[b]).setAttribute("style", c.base + c.looks[0 | a / 2]);
                        this.oldLook = a
                    }
                },
                wrap: new w("span", a.doc)
            });
            for (b = c.lineChildren.length; b--;)c.lineChildren[b].appendTo(c);
            c.look(I);
            c.appendTo(c.wrap);
            c.unselectable();
            c.lineChildren[0].on("mouseup", function (b) {
                c.detach();
                g(a, function (b) {
                    var c = a.line.trigger;
                    b[c.is(z) ? "insertBefore" : "insertAfter"](c.is(z) ? c.lower : c.upper)
                }, true);
                a.editor.focus();
                !x.ie && a.enterMode != CKEDITOR.ENTER_BR && a.hotNode.scrollIntoView();
                b.data.preventDefault(true)
            });
            c.on("mousedown", function (a) {
                a.data.preventDefault(true)
            });
            a.line = c
        }

        function g(a, b, c) {
            var d = new CKEDITOR.dom.range(a.doc), e = a.editor, g;
            if (x.ie && a.enterMode == CKEDITOR.ENTER_BR)g = a.doc.createText(J); else {
                g = new w(a.enterBehavior, a.doc);
                a.enterMode != CKEDITOR.ENTER_BR && a.doc.createText(J).appendTo(g)
            }
            c && e.fire("saveSnapshot");
            b(g);
            d.moveToPosition(g, CKEDITOR.POSITION_AFTER_START);
            e.getSelection().selectRanges([d]);
            a.hotNode = g;
            c && e.fire("saveSnapshot")
        }

        function h(a, c) {
            return {
                canUndo: true, modes: {wysiwyg: 1}, exec: function () {
                    function e(b) {
                        var d = x.ie && x.version < 9 ? " " : J, f = a.hotNode && a.hotNode.getText() == d && a.element.equals(a.hotNode) && a.lastCmdDirection === !!c;
                        g(a, function (d) {
                            f && a.hotNode && a.hotNode.remove();
                            d[c ? "insertAfter" : "insertBefore"](b);
                            d.setAttributes({"data-cke-magicline-hot": 1, "data-cke-magicline-dir": !!c});
                            a.lastCmdDirection = !!c
                        });
                        !x.ie && a.enterMode != CKEDITOR.ENTER_BR && a.hotNode.scrollIntoView();
                        a.line.detach()
                    }

                    return function (g) {
                        g = g.getSelection().getStartElement();
                        g = g.getAscendant(P, 1);
                        if (!q(a, g) && g && !g.equals(a.editable) && !g.contains(a.editable)) {
                            a.element = g;
                            var f = d(a, g, !c), h;
                            if (j(f) && f.is(a.triggers) && f.is(K) && (!d(a, f, !c) || (h = d(a, f, !c)) && j(h) && h.is(a.triggers)))e(f); else {
                                h = b(a, g);
                                if (j(h))if (d(a, h, !c))(g = d(a, h, !c)) && (j(g) && g.is(a.triggers)) && e(h); else e(h)
                            }
                        }
                    }
                }()
            }
        }

        function e(a, b) {
            if (!b || !(b.type == CKEDITOR.NODE_ELEMENT && b.$))return false;
            var c = a.line;
            return c.wrap.equals(b) || c.wrap.contains(b)
        }

        function j(a) {
            return a && a.type == CKEDITOR.NODE_ELEMENT && a.$
        }

        function k(a) {
            if (!j(a))return false;
            var b;
            if (!(b = n(a)))if (j(a)) {
                b = {left: 1, right: 1, center: 1};
                b = !(!b[a.getComputedStyle("float")] && !b[a.getAttribute("align")])
            } else b = false;
            return b
        }

        function n(a) {
            return !!{absolute: 1, fixed: 1, relative: 1}[a.getComputedStyle("position")]
        }

        function o(a, b) {
            return j(b) ? b.is(a.triggers) : null
        }

        function q(a, b) {
            if (!b)return false;
            for (var c = b.getParents(1), d = c.length; d--;)for (var e = a.tabuList.length; e--;)if (c[d].hasAttribute(a.tabuList[e]))return true;
            return false
        }

        function m(a, b, c) {
            b = b[c ? "getLast" : "getFirst"](function (b) {
                return a.isRelevant(b) && !b.is(L)
            });
            if (!b)return false;
            y(a, b);
            return c ? b.size.top > a.mouse.y : b.size.bottom < a.mouse.y
        }

        function p(a) {
            var b = a.editable, c = a.mouse, d = a.view, g = a.triggerOffset;
            t(a);
            var h = c.y > (a.inInlineMode ? d.editable.top + d.editable.height / 2 : Math.min(d.editable.height, d.pane.height) / 2), b = b[h ? "getLast" : "getFirst"](function (a) {
                return !(U(a) || W(a))
            });
            if (!b)return null;
            e(a, b) && (b = a.line.wrap[h ? "getPrevious" : "getNext"](function (a) {
                return !(U(a) || W(a))
            }));
            if (!j(b) || k(b) || !o(a, b))return null;
            y(a, b);
            if (!h && b.size.top >= 0 && c.y > 0 && c.y < b.size.top + g) {
                a = a.inInlineMode || d.scroll.y === 0 ? E : I;
                return new f([null, b, z, F, a])
            }
            if (h && b.size.bottom <= d.pane.height && c.y > b.size.bottom - g && c.y < d.pane.height) {
                a = a.inInlineMode || b.size.bottom > d.pane.height - g && b.size.bottom < d.pane.height ? M : I;
                return new f([b, null, D, F, a])
            }
            return null
        }

        function r(a) {
            var c = a.mouse, e = a.view, g = a.triggerOffset, h = b(a);
            if (!h)return null;
            y(a, h);
            var g = Math.min(g, 0 | h.size.outerHeight / 2), i = [], l, p;
            if (c.y > h.size.top - 1 && c.y < h.size.top + g)p = false; else if (c.y > h.size.bottom - g && c.y < h.size.bottom + 1)p = true; else return null;
            if (k(h) || m(a, h, p) || h.getParent().is(H))return null;
            var q = d(a, h, !p);
            if (q) {
                if (q && q.type == CKEDITOR.NODE_TEXT)return null;
                if (j(q)) {
                    if (k(q) || !o(a, q) || q.getParent().is(H))return null;
                    i = [q, h][p ? "reverse" : "concat"]().concat([C, F])
                }
            } else {
                if (h.equals(a.editable[p ? "getLast" : "getFirst"](a.isRelevant))) {
                    t(a);
                    p && c.y > h.size.bottom - g && c.y < e.pane.height && h.size.bottom > e.pane.height - g && h.size.bottom < e.pane.height ? l = M : c.y > 0 && c.y < h.size.top + g && (l = E)
                } else l = I;
                i = [null, h][p ? "reverse" : "concat"]().concat([p ? D : z, F, l, h.equals(a.editable[p ? "getLast" : "getFirst"](a.isRelevant)) ? p ? M : E : I])
            }
            return 0 in i ? new f(i) : null
        }

        function l(a, b, c, d) {
            for (var e = function () {
                var c = x.ie ? b.$.currentStyle : a.win.$.getComputedStyle(b.$, "");
                return x.ie ? function (a) {
                    return c[CKEDITOR.tools.cssStyleToDomStyle(a)]
                } : function (a) {
                    return c.getPropertyValue(a)
                }
            }(), g = b.getDocumentPosition(), f = {}, h = {}, i = {}, j = {}, l = S.length; l--;) {
                f[S[l]] = parseInt(e("border-" + S[l] + "-width"), 10) || 0;
                i[S[l]] = parseInt(e("padding-" + S[l]), 10) || 0;
                h[S[l]] = parseInt(e("margin-" + S[l]), 10) || 0
            }
            (!c || d) && A(a, d);
            j.top = g.y - (c ? 0 : a.view.scroll.y);
            j.left = g.x - (c ? 0 : a.view.scroll.x);
            j.outerWidth = b.$.offsetWidth;
            j.outerHeight = b.$.offsetHeight;
            j.height = j.outerHeight - (i.top + i.bottom + f.top + f.bottom);
            j.width = j.outerWidth - (i.left + i.right + f.left + f.right);
            j.bottom = j.top + j.outerHeight;
            j.right = j.left + j.outerWidth;
            if (a.inInlineMode)j.scroll = {top: b.$.scrollTop, left: b.$.scrollLeft};
            return v({border: f, padding: i, margin: h, ignoreScroll: c}, j, true)
        }

        function y(a, b, c) {
            if (!j(b))return b.size = null;
            if (b.size) {
                if (b.size.ignoreScroll == c && b.size.date > new Date - N)return null
            } else b.size = {};
            return v(b.size, l(a, b, c), {date: +new Date}, true)
        }

        function t(a, b) {
            a.view.editable = l(a, a.editable, b, true)
        }

        function A(a, b) {
            if (!a.view)a.view = {};
            var c = a.view;
            if (b || !(c && c.date > new Date - N)) {
                var d = a.win, c = d.getScrollPosition(), d = d.getViewPaneSize();
                v(a.view, {
                    scroll: {
                        x: c.x,
                        y: c.y,
                        width: a.doc.$.documentElement.scrollWidth - d.width,
                        height: a.doc.$.documentElement.scrollHeight - d.height
                    }, pane: {width: d.width, height: d.height, bottom: d.height + c.y}, date: +new Date
                }, true)
            }
        }

        function s(a, b, c, d) {
            for (var e = d, g = d, h = 0, i = false, j = false, l = a.view.pane.height, m = a.mouse; m.y + h < l && m.y - h > 0;) {
                i || (i = b(e, d));
                j || (j = b(g, d));
                !i && m.y - h > 0 && (e = c(a, {x: m.x, y: m.y - h}));
                !j && m.y + h < l && (g = c(a, {x: m.x, y: m.y + h}));
                if (i && j)break;
                h = h + 2
            }
            return new f([e, g, null, null])
        }

        CKEDITOR.plugins.add("magicline", {
            init: function (a) {
                var c = {};
                c[CKEDITOR.ENTER_BR] = "br";
                c[CKEDITOR.ENTER_P] = "p";
                c[CKEDITOR.ENTER_DIV] = "div";
                var m = a.config, o = m.magicline_triggerOffset || 30, y = m.enterMode, s = {
                    editor: a,
                    enterBehavior: c[y],
                    enterMode: y,
                    triggerOffset: o,
                    holdDistance: 0 | o * (m.magicline_holdDistance || 0.5),
                    boxColor: m.magicline_color || "#ff0000",
                    rtl: m.contentsLangDirection == "rtl",
                    tabuList: ["data-widget-wrapper"].concat(m.magicline_tabuList || []),
                    triggers: m.magicline_everywhere ? P : {
                        table: 1,
                        hr: 1,
                        div: 1,
                        ul: 1,
                        ol: 1,
                        dl: 1,
                        form: 1,
                        blockquote: 1
                    }
                }, w, u, z;
                s.isRelevant = function (a) {
                    return j(a) && !e(s, a) && !k(a)
                };
                a.on("contentDom", function () {
                    var c = a.editable(), j = a.document, k = a.window;
                    v(s, {editable: c, inInlineMode: c.isInline(), doc: j, win: k}, true);
                    s.boundary = s.inInlineMode ? s.editable : s.doc.getDocumentElement();
                    if (!c.is(B.$inline)) {
                        s.inInlineMode && !n(c) && c.setStyles({position: "relative", top: null, left: null});
                        i.call(this, s);
                        A(s);
                        c.attachListener(a, "beforeUndoImage", function () {
                            s.line.detach()
                        });
                        c.attachListener(a, "beforeGetData", function () {
                            if (s.line.wrap.getParent()) {
                                s.line.detach();
                                a.once("getData", function () {
                                    s.line.attach()
                                }, null, null, 1E3)
                            }
                        }, null, null, 0);
                        c.attachListener(s.inInlineMode ? j : j.getWindow().getFrame(), "mouseout", function (b) {
                            if (a.mode == "wysiwyg")if (s.inInlineMode) {
                                var c = b.data.$.clientX, b = b.data.$.clientY;
                                A(s);
                                t(s, true);
                                var d = s.view.editable, e = s.view.scroll;
                                if (!(c > d.left - e.x && c < d.right - e.x) || !(b > d.top - e.y && b < d.bottom - e.y)) {
                                    clearTimeout(z);
                                    z = null;
                                    s.line.detach()
                                }
                            } else {
                                clearTimeout(z);
                                z = null;
                                s.line.detach()
                            }
                        });
                        c.attachListener(c, "keyup", function () {
                            s.hiddenMode = 0
                        });
                        c.attachListener(c, "keydown", function (b) {
                            if (a.mode == "wysiwyg") {
                                b = b.data.getKeystroke();
                                a.getSelection().getStartElement();
                                switch (b) {
                                    case 2228240:
                                    case 16:
                                        s.hiddenMode = 1;
                                        s.line.detach()
                                }
                            }
                        });
                        c.attachListener(s.inInlineMode ? c : j, "mousemove", function (b) {
                            u = true;
                            if (!(a.mode != "wysiwyg" || a.readOnly || z)) {
                                var c = {x: b.data.$.clientX, y: b.data.$.clientY};
                                z = setTimeout(function () {
                                    s.mouse = c;
                                    z = s.trigger = null;
                                    A(s);
                                    if (u && !s.hiddenMode && a.focusManager.hasFocus && !s.line.mouseNear() && (s.element = V(s, true))) {
                                        if ((s.trigger = p(s) || r(s) || X(s)) && !q(s, s.trigger.upper || s.trigger.lower))s.line.attach().place(); else {
                                            s.trigger = null;
                                            s.line.detach()
                                        }
                                        u = false
                                    }
                                }, 30)
                            }
                        });
                        c.attachListener(k, "scroll", function () {
                            if (a.mode == "wysiwyg") {
                                s.line.detach();
                                if (x.webkit) {
                                    s.hiddenMode = 1;
                                    clearTimeout(w);
                                    w = setTimeout(function () {
                                        s.hiddenMode = 0
                                    }, 50)
                                }
                            }
                        });
                        c.attachListener(k, "mousedown", function () {
                            if (a.mode == "wysiwyg") {
                                s.line.detach();
                                s.hiddenMode = 1
                            }
                        });
                        c.attachListener(k, "mouseup", function () {
                            s.hiddenMode = 0
                        });
                        a.addCommand("accessPreviousSpace", h(s));
                        a.addCommand("accessNextSpace", h(s, true));
                        a.setKeystroke([[m.magicline_keystrokePrevious, "accessPreviousSpace"], [m.magicline_keystrokeNext, "accessNextSpace"]]);
                        a.on("loadSnapshot", function () {
                            for (var b = a.document.getElementsByTag(s.enterBehavior), c, d = b.count(); d--;)if ((c = b.getItem(d)).hasAttribute("data-cke-magicline-hot")) {
                                s.hotNode = c;
                                s.lastCmdDirection = c.getAttribute("data-cke-magicline-dir") === "true" ? true : false;
                                break
                            }
                        });
                        this.backdoor = {
                            accessFocusSpace: g,
                            boxTrigger: f,
                            isLine: e,
                            getAscendantTrigger: b,
                            getNonEmptyNeighbour: d,
                            getSize: l,
                            that: s,
                            triggerEdge: r,
                            triggerEditable: p,
                            triggerExpand: X
                        }
                    }
                }, this)
            }
        });
        var v = CKEDITOR.tools.extend, w = CKEDITOR.dom.element, u = w.createFromHtml, x = CKEDITOR.env, B = CKEDITOR.dtd, z = 128, D = 64, C = 32, F = 16, G = 8, E = 4, M = 2, I = 1, J = " ", H = B.$listItem, L = B.$tableContent, K = v({}, B.$nonEditable, B.$empty), P = B.$block, N = 100, Q = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;", R = Q + "border-color:transparent;display:block;border-style:solid;", O = "<span>" +
            J + "</span>";
        f.prototype = {
            set: function (a, b, c) {
                this.properties = a + b + (c || I);
                return this
            }, is: function (a) {
                return (this.properties & a) == a
            }
        };
        var V = function () {
            return function (a, b, c) {
                if (!a.mouse)return null;
                var d = a.doc, g = a.line.wrap, c = c || a.mouse, f = new CKEDITOR.dom.element(d.$.elementFromPoint(c.x, c.y));
                if (b && e(a, f)) {
                    g.hide();
                    f = new CKEDITOR.dom.element(d.$.elementFromPoint(c.x, c.y));
                    g.show()
                }
                return !f || !(f.type == CKEDITOR.NODE_ELEMENT && f.$) || x.ie && x.version < 9 && !a.boundary.equals(f) && !a.boundary.contains(f) ? null : f
            }
        }(), U = CKEDITOR.dom.walker.whitespaces(), W = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT), X = function () {
            function b(e) {
                var g = e.element, f, h, i;
                if (!j(g) || g.contains(e.editable))return null;
                i = s(e, function (a, b) {
                    return !b.equals(a)
                }, function (a, b) {
                    return V(a, true, b)
                }, g);
                f = i.upper;
                h = i.lower;
                if (c(e, f, h))return i.set(C, G);
                if (f && g.contains(f))for (; !f.getParent().equals(g);)f = f.getParent(); else f = g.getFirst(function (a) {
                    return d(e, a)
                });
                if (h && g.contains(h))for (; !h.getParent().equals(g);)h = h.getParent(); else h = g.getLast(function (a) {
                    return d(e, a)
                });
                if (!f || !h)return null;
                y(e, f);
                y(e, h);
                if (!(e.mouse.y > f.size.top && e.mouse.y < h.size.bottom))return null;
                for (var g = Number.MAX_VALUE, l, m, k, p; h && !h.equals(f);) {
                    if (!(m = f.getNext(e.isRelevant)))break;
                    l = Math.abs(a(e, f, m) - e.mouse.y);
                    if (l < g) {
                        g = l;
                        k = f;
                        p = m
                    }
                    f = m;
                    y(e, f)
                }
                if (!k || !p || !(e.mouse.y > k.size.top && e.mouse.y < p.size.bottom))return null;
                i.upper = k;
                i.lower = p;
                return i.set(C, G)
            }

            function d(a, b) {
                return !(b && b.type == CKEDITOR.NODE_TEXT || W(b) || k(b) || e(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ && b.is("br"))
            }

            return function (a) {
                var d = b(a), e;
                if (e = d) {
                    e = d.upper;
                    var g = d.lower;
                    e = !e || !g || k(g) || k(e) || g.equals(e) || e.equals(g) || g.contains(e) || e.contains(g) ? false : o(a, e) && o(a, g) && c(a, e, g) ? true : false
                }
                return e ? d : null
            }
        }(), S = ["top", "left", "right", "bottom"]
    }(),CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 219,CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 221,function () {
        function c(a) {
            if (!a || a.type != CKEDITOR.NODE_ELEMENT || a.getName() != "form")return [];
            for (var b = [], c = ["style", "className"], d = 0; d < c.length; d++) {
                var f = a.$.elements.namedItem(c[d]);
                if (f) {
                    f = new CKEDITOR.dom.element(f);
                    b.push([f, f.nextSibling]);
                    f.remove()
                }
            }
            return b
        }

        function f(a, b) {
            if (a && !(a.type != CKEDITOR.NODE_ELEMENT || a.getName() != "form") && b.length > 0)for (var c = b.length - 1; c >= 0; c--) {
                var d = b[c][0], f = b[c][1];
                f ? d.insertBefore(f) : d.appendTo(a)
            }
        }

        function b(a, b) {
            var d = c(a), e = {}, j = a.$;
            if (!b) {
                e["class"] = j.className || "";
                j.className = ""
            }
            e.inline = j.style.cssText || "";
            if (!b)j.style.cssText = "position: static; overflow: visible";
            f(d);
            return e
        }

        function a(a, b) {
            var d = c(a), e = a.$;
            if ("class"in b)e.className = b["class"];
            if ("inline"in b)e.style.cssText = b.inline;
            f(d)
        }

        function d(a) {
            if (!a.editable().isInline()) {
                var b = CKEDITOR.instances, c;
                for (c in b) {
                    var d = b[c];
                    if (d.mode == "wysiwyg" && !d.readOnly) {
                        d = d.document.getBody();
                        d.setAttribute("contentEditable", false);
                        d.setAttribute("contentEditable", true)
                    }
                }
                if (a.editable().hasFocus) {
                    a.toolbox.focus();
                    a.focus()
                }
            }
        }

        CKEDITOR.plugins.add("maximize", {
            init: function (c) {
                function g() {
                    var a = j.getViewPaneSize();
                    c.resize(a.width, a.height, null, true)
                }

                if (c.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var f = c.lang, e = CKEDITOR.document, j = e.getWindow(), k, n, o, q = CKEDITOR.TRISTATE_OFF;
                    c.addCommand("maximize", {
                        modes: {wysiwyg: !CKEDITOR.env.iOS, source: !CKEDITOR.env.iOS},
                        readOnly: 1,
                        editorFocus: false,
                        exec: function () {
                            var m = c.container.getChild(1), p = c.ui.space("contents");
                            if (c.mode == "wysiwyg") {
                                var r = c.getSelection();
                                k = r && r.getRanges();
                                n = j.getScrollPosition()
                            } else {
                                var l = c.editable().$;
                                k = !CKEDITOR.env.ie && [l.selectionStart, l.selectionEnd];
                                n = [l.scrollLeft, l.scrollTop]
                            }
                            if (this.state == CKEDITOR.TRISTATE_OFF) {
                                j.on("resize", g);
                                o = j.getScrollPosition();
                                for (r = c.container; r = r.getParent();) {
                                    r.setCustomData("maximize_saved_styles", b(r));
                                    r.setStyle("z-index", c.config.baseFloatZIndex - 5)
                                }
                                p.setCustomData("maximize_saved_styles", b(p, true));
                                m.setCustomData("maximize_saved_styles", b(m, true));
                                p = {overflow: CKEDITOR.env.webkit ? "" : "hidden", width: 0, height: 0};
                                e.getDocumentElement().setStyles(p);
                                !CKEDITOR.env.gecko && e.getDocumentElement().setStyle("position", "fixed");
                                (!CKEDITOR.env.gecko || !CKEDITOR.env.quirks) && e.getBody().setStyles(p);
                                CKEDITOR.env.ie ? setTimeout(function () {
                                    j.$.scrollTo(0, 0)
                                }, 0) : j.$.scrollTo(0, 0);
                                m.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute");
                                m.$.offsetLeft;
                                m.setStyles({"z-index": c.config.baseFloatZIndex - 5, left: "0px", top: "0px"});
                                m.addClass("cke_maximized");
                                g();
                                p = m.getDocumentPosition();
                                m.setStyles({left: -1 * p.x + "px", top: -1 * p.y + "px"});
                                CKEDITOR.env.gecko && d(c)
                            } else if (this.state == CKEDITOR.TRISTATE_ON) {
                                j.removeListener("resize", g);
                                p = [p, m];
                                for (r = 0; r < p.length; r++) {
                                    a(p[r], p[r].getCustomData("maximize_saved_styles"));
                                    p[r].removeCustomData("maximize_saved_styles")
                                }
                                for (r = c.container; r = r.getParent();) {
                                    a(r, r.getCustomData("maximize_saved_styles"));
                                    r.removeCustomData("maximize_saved_styles")
                                }
                                CKEDITOR.env.ie ? setTimeout(function () {
                                    j.$.scrollTo(o.x, o.y)
                                }, 0) : j.$.scrollTo(o.x, o.y);
                                m.removeClass("cke_maximized");
                                if (CKEDITOR.env.webkit) {
                                    m.setStyle("display", "inline");
                                    setTimeout(function () {
                                        m.setStyle("display", "block")
                                    }, 0)
                                }
                                c.fire("resize")
                            }
                            this.toggleState();
                            if (r = this.uiItems[0]) {
                                p = this.state == CKEDITOR.TRISTATE_OFF ? f.maximize.maximize : f.maximize.minimize;
                                r = CKEDITOR.document.getById(r._.id);
                                r.getChild(1).setHtml(p);
                                r.setAttribute("title", p);
                                r.setAttribute("href", 'javascript:void("' + p + '");')
                            }
                            if (c.mode == "wysiwyg")if (k) {
                                CKEDITOR.env.gecko && d(c);
                                c.getSelection().selectRanges(k);
                                (l = c.getSelection().getStartElement()) && l.scrollIntoView(true)
                            } else j.$.scrollTo(n.x, n.y); else {
                                if (k) {
                                    l.selectionStart = k[0];
                                    l.selectionEnd = k[1]
                                }
                                l.scrollLeft = n[0];
                                l.scrollTop = n[1]
                            }
                            k = n = null;
                            q = this.state;
                            c.fire("maximize", this.state)
                        },
                        canUndo: false
                    });
                    c.ui.addButton && c.ui.addButton("Maximize", {
                        label: f.maximize.maximize,
                        command: "maximize",
                        toolbar: "tools,10"
                    });
                    c.on("mode", function () {
                        var a = c.getCommand("maximize");
                        a.setState(a.state == CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : q)
                    }, null, null, 100)
                }
            }
        })
    }(),function () {
        function c(b, a, c) {
            var f = CKEDITOR.cleanWord;
            if (f)c(); else {
                b = CKEDITOR.getUrl(b.config.pasteFromWordCleanupFile || a + "filter/default.js");
                CKEDITOR.scriptLoader.load(b, c, null, true)
            }
            return !f
        }

        function f(b) {
            b.data.type = "html"
        }

        CKEDITOR.plugins.add("pastefromword", {
            requires: "clipboard", init: function (b) {
                var a = 0, d = this.path;
                b.addCommand("pastefromword", {
                    canUndo: false, async: true, exec: function (b) {
                        var c = this;
                        a = 1;
                        b.once("beforePaste", f);
                        b.getClipboardData({title: b.lang.pastefromword.title}, function (a) {
                            a && b.fire("paste", {type: "html", dataValue: a.dataValue});
                            b.fire("afterCommandExec", {name: "pastefromword", command: c, returnValue: !!a})
                        })
                    }
                });
                b.ui.addButton && b.ui.addButton("PasteFromWord", {
                    label: b.lang.pastefromword.toolbar,
                    command: "pastefromword",
                    toolbar: "clipboard,50"
                });
                b.on("pasteState", function (a) {
                    b.getCommand("pastefromword").setState(a.data)
                });
                b.on("paste", function (f) {
                    var g = f.data, h = g.dataValue;
                    if (h && (a || /(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/.test(h))) {
                        var e = c(b, d, function () {
                            if (e)b.fire("paste", g); else if (!b.config.pasteFromWordPromptCleanup || a || confirm(b.lang.pastefromword.confirmCleanup))g.dataValue = CKEDITOR.cleanWord(h, b)
                        });
                        e && f.cancel()
                    }
                }, null, null, 3)
            }
        })
    }(),function () {
        var c = {
            canUndo: false, async: true, exec: function (f) {
                f.getClipboardData({title: f.lang.pastetext.title}, function (b) {
                    b && f.fire("paste", {type: "text", dataValue: b.dataValue});
                    f.fire("afterCommandExec", {name: "pastetext", command: c, returnValue: !!b})
                })
            }
        };
        CKEDITOR.plugins.add("pastetext", {
            requires: "clipboard", init: function (f) {
                f.addCommand("pastetext", c);
                f.ui.addButton && f.ui.addButton("PasteText", {
                    label: f.lang.pastetext.button,
                    command: "pastetext",
                    toolbar: "clipboard,40"
                });
                if (f.config.forcePasteAsPlainText)f.on("beforePaste", function (b) {
                    if (b.data.type != "html")b.data.type = "text"
                });
                f.on("pasteState", function (b) {
                    f.getCommand("pastetext").setState(b.data)
                })
            }
        })
    }(),CKEDITOR.plugins.add("removeformat", {
        init: function (c) {
            c.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat);
            c.ui.addButton && c.ui.addButton("RemoveFormat", {
                label: c.lang.removeformat.toolbar,
                command: "removeFormat",
                toolbar: "cleanup,10"
            })
        }
    }),CKEDITOR.plugins.removeformat = {
        commands: {
            removeformat: {
                exec: function (c) {
                    for (var f = c._.removeFormatRegex || (c._.removeFormatRegex = RegExp("^(?:" + c.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")), b = c._.removeAttributes || (c._.removeAttributes = c.config.removeFormatAttributes.split(",")), a = CKEDITOR.plugins.removeformat.filter, d = c.getSelection().getRanges(1), i = d.createIterator(), g; g = i.getNextRange();) {
                        g.collapsed || g.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                        var h = g.createBookmark(), e = h.startNode, j = h.endNode, k = function (b) {
                            for (var d = c.elementPath(b), e = d.elements, g = 1, h; h = e[g]; g++) {
                                if (h.equals(d.block) || h.equals(d.blockLimit))break;
                                f.test(h.getName()) && a(c, h) && b.breakParent(h)
                            }
                        };
                        k(e);
                        if (j) {
                            k(j);
                            for (e = e.getNextSourceNode(true, CKEDITOR.NODE_ELEMENT); e;) {
                                if (e.equals(j))break;
                                k = e.getNextSourceNode(false, CKEDITOR.NODE_ELEMENT);
                                if (!(e.getName() == "img" && e.data("cke-realelement")) && a(c, e))if (f.test(e.getName()))e.remove(1); else {
                                    e.removeAttributes(b);
                                    c.fire("removeFormatCleanup", e)
                                }
                                e = k
                            }
                        }
                        g.moveToBookmark(h)
                    }
                    c.forceNextSelectionCheck();
                    c.getSelection().selectRanges(d)
                }
            }
        }, filter: function (c, f) {
            for (var b = c._.removeFormatFilters || [], a = 0; a < b.length; a++)if (b[a](f) === false)return false;
            return true
        }
    },CKEDITOR.editor.prototype.addRemoveFormatFilter = function (c) {
        if (!this._.removeFormatFilters)this._.removeFormatFilters = [];
        this._.removeFormatFilters.push(c)
    },CKEDITOR.config.removeFormatTags = "b,big,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var",CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign",CKEDITOR.plugins.add("resize", {
        init: function (c) {
            var f, b, a, d, i = c.config, g = c.ui.spaceId("resizer"), h = c.element ? c.element.getDirection(1) : "ltr";
            !i.resize_dir && (i.resize_dir = "vertical");
            i.resize_maxWidth == void 0 && (i.resize_maxWidth = 3E3);
            i.resize_maxHeight == void 0 && (i.resize_maxHeight = 3E3);
            i.resize_minWidth == void 0 && (i.resize_minWidth = 750);
            i.resize_minHeight == void 0 && (i.resize_minHeight = 250);
            if (i.resize_enabled !== false) {
                var e = null, j = (i.resize_dir == "both" || i.resize_dir == "horizontal") && i.resize_minWidth != i.resize_maxWidth, k = (i.resize_dir == "both" || i.resize_dir == "vertical") && i.resize_minHeight != i.resize_maxHeight, n = function (e) {
                    var g = f, q = b, l = g + (e.data.$.screenX - a) * (h == "rtl" ? -1 : 1), e = q + (e.data.$.screenY - d);
                    j && (g = Math.max(i.resize_minWidth, Math.min(l, i.resize_maxWidth)));
                    k && (q = Math.max(i.resize_minHeight, Math.min(e, i.resize_maxHeight)));
                    c.resize(j ? g : null, q)
                }, o = function () {
                    CKEDITOR.document.removeListener("mousemove", n);
                    CKEDITOR.document.removeListener("mouseup", o);
                    if (c.document) {
                        c.document.removeListener("mousemove", n);
                        c.document.removeListener("mouseup", o)
                    }
                }, q = CKEDITOR.tools.addFunction(function (g) {
                    e || (e = c.getResizable());
                    f = e.$.offsetWidth || 0;
                    b = e.$.offsetHeight || 0;
                    a = g.screenX;
                    d = g.screenY;
                    i.resize_minWidth > f && (i.resize_minWidth = f);
                    i.resize_minHeight > b && (i.resize_minHeight = b);
                    CKEDITOR.document.on("mousemove", n);
                    CKEDITOR.document.on("mouseup", o);
                    if (c.document) {
                        c.document.on("mousemove", n);
                        c.document.on("mouseup", o)
                    }
                    g.preventDefault && g.preventDefault()
                });
                c.on("destroy", function () {
                    CKEDITOR.tools.removeFunction(q)
                });
                c.on("uiSpace", function (a) {
                    if (a.data.space == "bottom") {
                        var b = "";
                        j && !k && (b = " cke_resizer_horizontal");
                        !j && k && (b = " cke_resizer_vertical");
                        var d = '<span id="' + g + '" class="cke_resizer' + b + " cke_resizer_" + h + '" title="' + CKEDITOR.tools.htmlEncode(c.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + q + ', event)">' + (h == "ltr" ? "◢" : "◣") + "</span>";
                        h == "ltr" && b == "ltr" ? a.data.html = a.data.html + d : a.data.html = d + a.data.html
                    }
                }, c, null, 100);
                c.on("maximize", function (a) {
                    c.ui.space("resizer")[a.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]()
                })
            }
        }
    }),CKEDITOR.plugins.add("menubutton", {
        requires: "button,menu", onLoad: function () {
            var c = function (c) {
                var b = this._;
                if (b.state !== CKEDITOR.TRISTATE_DISABLED) {
                    b.previousState = b.state;
                    var a = b.menu;
                    if (!a) {
                        a = b.menu = new CKEDITOR.menu(c, {
                            panel: {
                                className: "cke_menu_panel",
                                attributes: {"aria-label": c.lang.common.options}
                            }
                        });
                        a.onHide = CKEDITOR.tools.bind(function () {
                            this.setState(this.modes && this.modes[c.mode] ? b.previousState : CKEDITOR.TRISTATE_DISABLED)
                        }, this);
                        this.onMenu && a.addListener(this.onMenu)
                    }
                    if (b.on)a.hide(); else {
                        this.setState(CKEDITOR.TRISTATE_ON);
                        setTimeout(function () {
                            a.show(CKEDITOR.document.getById(b.id), 4)
                        }, 0)
                    }
                }
            };
            CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.button, $: function (f) {
                    delete f.panel;
                    this.base(f);
                    this.hasArrow = true;
                    this.click = c
                }, statics: {
                    handler: {
                        create: function (c) {
                            return new CKEDITOR.ui.menuButton(c)
                        }
                    }
                }
            })
        }, beforeInit: function (c) {
            c.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler)
        }
    }),CKEDITOR.UI_MENUBUTTON = "menubutton",function () {
        function c(a, b) {
            var c = 0, d;
            for (d in b)if (b[d] == a) {
                c = 1;
                break
            }
            return c
        }

        var f = "", b = function () {
            function b() {
                d.once("focus", i);
                d.once("blur", c)
            }

            function c(d) {
                var d = d.editor, e = a.getScayt(d), f = d.elementMode == CKEDITOR.ELEMENT_MODE_INLINE;
                if (e) {
                    a.setPaused(d, !e.disabled);
                    a.setControlId(d, e.id);
                    e.destroy(true);
                    delete a.instances[d.name];
                    f && b()
                }
            }

            var d = this, i = function () {
                if (!(typeof a.instances[d.name] != "undefined" || a.instances[d.name] != null)) {
                    var b = d.config, c = {};
                    c.srcNodeRef = d.editable().$.nodeName == "BODY" ? d.document.getWindow().$.frameElement : d.editable().$;
                    c.assocApp = "CKEDITOR." + CKEDITOR.version + "@" + CKEDITOR.revision;
                    c.customerid = b.scayt_customerid || "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2";
                    c.customDictionaryIds = b.scayt_customDictionaryIds || "";
                    c.userDictionaryName = b.scayt_userDictionaryName || "";
                    c.sLang = b.scayt_sLang || "en_US";
                    c.onLoad = function () {
                        CKEDITOR.env.ie && CKEDITOR.env.version < 8 || this.addStyle(this.selectorCss(), "padding-bottom: 2px !important;");
                        d.editable().hasFocus && !a.isControlRestored(d) && this.focus()
                    };
                    c.onBeforeChange = function () {
                        a.getScayt(d) && !d.checkDirty() && setTimeout(function () {
                            d.resetDirty()
                        }, 0)
                    };
                    b = window.scayt_custom_params;
                    if (typeof b == "object")for (var g in b)c[g] = b[g];
                    if (a.getControlId(d))c.id = a.getControlId(d);
                    var f = new window.scayt(c);
                    f.afterMarkupRemove.push(function (a) {
                        (new CKEDITOR.dom.element(a, f.document)).mergeSiblings()
                    });
                    if (c = a.instances[d.name]) {
                        f.sLang = c.sLang;
                        f.option(c.option());
                        f.paused = c.paused
                    }
                    a.instances[d.name] = f;
                    try {
                        f.setDisabled(a.isPaused(d) === false)
                    } catch (h) {
                    }
                    d.fire("showScaytState")
                }
            };
            d.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? b() : d.on("contentDom", i);
            d.on("contentDomUnload", function () {
                for (var a = CKEDITOR.document.getElementsByTag("script"), b = /^dojoIoScript(\d+)$/i, c = /^https?:\/\/svc\.webspellchecker\.net\/spellcheck\/script\/ssrv\.cgi/i, d = 0; d < a.count(); d++) {
                    var e = a.getItem(d), g = e.getId(), f = e.getAttribute("src");
                    g && (f && g.match(b) && f.match(c)) && e.remove()
                }
            });
            d.on("beforeCommandExec", function (b) {
                b.data.name == "source" && d.mode == "source" && a.markControlRestore(d)
            });
            d.on("afterCommandExec", function (b) {
                a.isScaytEnabled(d) && d.mode == "wysiwyg" && (b.data.name == "undo" || b.data.name == "redo") && window.setTimeout(function () {
                    a.getScayt(d).refresh()
                }, 10)
            });
            d.on("destroy", c);
            d.on("setData", c);
            d.on("insertElement", function () {
                var b = a.getScayt(d);
                if (a.isScaytEnabled(d)) {
                    CKEDITOR.env.ie && d.getSelection().unlock(true);
                    window.setTimeout(function () {
                        b.focus();
                        b.refresh()
                    }, 10)
                }
            }, this, null, 50);
            d.on("insertHtml", function () {
                var b = a.getScayt(d);
                if (a.isScaytEnabled(d)) {
                    CKEDITOR.env.ie && d.getSelection().unlock(true);
                    window.setTimeout(function () {
                        b.focus();
                        b.refresh()
                    }, 10)
                }
            }, this, null, 50);
            d.on("scaytDialog", function (b) {
                b.data.djConfig = window.djConfig;
                b.data.scayt_control = a.getScayt(d);
                b.data.tab = f;
                b.data.scayt = window.scayt
            });
            var k = d.dataProcessor;
            (k = k && k.htmlFilter) && k.addRules({
                elements: {
                    span: function (a) {
                        if (a.attributes["data-scayt_word"] && a.attributes["data-scaytid"]) {
                            delete a.name;
                            return a
                        }
                    }
                }
            });
            k = CKEDITOR.plugins.undo.Image.prototype;
            k = typeof k.equalsContent == "function" ? k.equalsContent : k.equals;
            k = CKEDITOR.tools.override(k, function (b) {
                return function (c) {
                    var d = this.contents, e = c.contents, g = a.getScayt(this.editor);
                    if (g && a.isScaytReady(this.editor)) {
                        this.contents = g.reset(d) || "";
                        c.contents = g.reset(e) || ""
                    }
                    g = b.apply(this, arguments);
                    this.contents = d;
                    c.contents = e;
                    return g
                }
            });
            d.document && (d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE || d.focusManager.hasFocus) && i()
        };
        CKEDITOR.plugins.scayt = {
            engineLoaded: false, instances: {}, controlInfo: {}, setControlInfo: function (a, b) {
                a && (a.name && typeof this.controlInfo[a.name] != "object") && (this.controlInfo[a.name] = {});
                for (var c in b)this.controlInfo[a.name][c] = b[c]
            }, isControlRestored: function (a) {
                return a && a.name && this.controlInfo[a.name] ? this.controlInfo[a.name].restored : false
            }, markControlRestore: function (a) {
                this.setControlInfo(a, {restored: true})
            }, setControlId: function (a, b) {
                this.setControlInfo(a, {id: b})
            }, getControlId: function (a) {
                return a && a.name && this.controlInfo[a.name] && this.controlInfo[a.name].id ? this.controlInfo[a.name].id : null
            }, setPaused: function (a, b) {
                this.setControlInfo(a, {paused: b})
            }, isPaused: function (a) {
                if (a && a.name && this.controlInfo[a.name])return this.controlInfo[a.name].paused
            }, getScayt: function (a) {
                return this.instances[a.name]
            }, isScaytReady: function (a) {
                return this.engineLoaded === true && "undefined" !== typeof window.scayt && this.getScayt(a)
            }, isScaytEnabled: function (a) {
                return (a = this.getScayt(a)) ? a.disabled === false : false
            }, getUiTabs: function (a) {
                var b = [], c = a.config.scayt_uiTabs || "1,1,1", c = c.split(",");
                c[3] = "1";
                for (var d = 0; d < 4; d++)b[d] = typeof window.scayt != "undefined" && typeof window.scayt.uiTags != "undefined" ? parseInt(c[d], 10) && window.scayt.uiTags[d] : parseInt(c[d], 10);
                typeof a.plugins.wsc == "object" ? b.push(1) : b.push(0);
                return b
            }, loadEngine: function (c) {
                if (CKEDITOR.env.gecko && CKEDITOR.env.version < 10900 || CKEDITOR.env.opera || CKEDITOR.env.air)return c.fire("showScaytState");
                if (this.engineLoaded === true)return b.apply(c);
                if (this.engineLoaded == -1)return CKEDITOR.on("scaytReady", function () {
                    b.apply(c)
                });
                CKEDITOR.on("scaytReady", b, c);
                CKEDITOR.on("scaytReady", function () {
                    this.engineLoaded = true
                }, this, null, 0);
                this.engineLoaded = -1;
                var d = document.location.protocol, d = d.search(/https?:/) != -1 ? d : "http:", d = c.config.scayt_srcUrl || d + "//svc.webspellchecker.net/scayt26/loader__base.js", e = a.parseUrl(d).path + "/";
                if (window.scayt == void 0) {
                    CKEDITOR._djScaytConfig = {
                        baseUrl: e, addOnLoad: [function () {
                            CKEDITOR.fireOnce("scaytReady")
                        }], isDebug: false
                    };
                    CKEDITOR.document.getHead().append(CKEDITOR.document.createElement("script", {
                        attributes: {
                            type: "text/javascript",
                            async: "true",
                            src: d
                        }
                    }))
                } else CKEDITOR.fireOnce("scaytReady");
                return null
            }, parseUrl: function (a) {
                var b;
                return a.match && (b = a.match(/(.*)[\/\\](.*?\.\w+)$/)) ? {path: b[1], file: b[2]} : a
            }
        };
        var a = CKEDITOR.plugins.scayt, d = function (a, b, c, d, f, i, o) {
            a.addCommand(d, f);
            a.addMenuItem(d, {label: c, command: d, group: i, order: o})
        }, i = {
            preserveState: true, editorFocus: false, canUndo: false, exec: function (b) {
                if (a.isScaytReady(b)) {
                    var c = a.isScaytEnabled(b);
                    this.setState(c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_ON);
                    b = a.getScayt(b);
                    b.focus();
                    b.setDisabled(c)
                } else if (!b.config.scayt_autoStartup && a.engineLoaded >= 0) {
                    b.focus();
                    this.setState(CKEDITOR.TRISTATE_DISABLED);
                    a.loadEngine(b)
                }
            }
        };
        CKEDITOR.plugins.add("scayt", {
            requires: "menubutton,dialog", beforeInit: function (a) {
                var b = a.config.scayt_contextMenuItemsOrder || "suggest|moresuggest|control", c = "";
                if ((b = b.split("|")) && b.length)for (var d = 0; d < b.length; d++)c = c + ("scayt_" + b[d] + (b.length != parseInt(d, 10) + 1 ? "," : ""));
                a.config.menu_groups = c + "," + a.config.menu_groups
            }, checkEnvironment: function () {
                return CKEDITOR.env.opera || CKEDITOR.env.air ? 0 : 1
            }, init: function (b) {
                var h = b.dataProcessor && b.dataProcessor.dataFilter, e = {
                    elements: {
                        span: function (a) {
                            var b = a.attributes;
                            b && b["data-scaytid"] && delete a.name
                        }
                    }
                };
                h && h.addRules(e);
                var j = {}, k = {}, n = b.addCommand("scaytcheck", i);
                CKEDITOR.dialog.add("scaytcheck", CKEDITOR.getUrl(this.path + "dialogs/options.js"));
                h = a.getUiTabs(b);
                b.addMenuGroup("scaytButton");
                b.addMenuGroup("scayt_suggest", -10);
                b.addMenuGroup("scayt_moresuggest", -9);
                b.addMenuGroup("scayt_control", -8);
                var e = {}, o = b.lang.scayt;
                e.scaytToggle = {label: o.enable, command: "scaytcheck", group: "scaytButton"};
                if (h[0] == 1)e.scaytOptions = {
                    label: o.options, group: "scaytButton", onClick: function () {
                        f = "options";
                        b.openDialog("scaytcheck")
                    }
                };
                if (h[1] == 1)e.scaytLangs = {
                    label: o.langs, group: "scaytButton", onClick: function () {
                        f = "langs";
                        b.openDialog("scaytcheck")
                    }
                };
                if (h[2] == 1)e.scaytDict = {
                    label: o.dictionariesTab, group: "scaytButton", onClick: function () {
                        f = "dictionaries";
                        b.openDialog("scaytcheck")
                    }
                };
                e.scaytAbout = {
                    label: b.lang.scayt.about, group: "scaytButton", onClick: function () {
                        f = "about";
                        b.openDialog("scaytcheck")
                    }
                };
                if (h[4] == 1)e.scaytWSC = {label: b.lang.wsc.toolbar, group: "scaytButton", command: "checkspell"};
                b.addMenuItems(e);
                b.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON, {
                    label: o.title,
                    title: CKEDITOR.env.opera ? o.opera_title : o.title,
                    modes: {wysiwyg: this.checkEnvironment()},
                    toolbar: "spellchecker,20",
                    onRender: function () {
                        n.on("state", function () {
                            this.setState(n.state)
                        }, this)
                    },
                    onMenu: function () {
                        var c = a.isScaytEnabled(b);
                        b.getMenuItem("scaytToggle").label = o[c ? "disable" : "enable"];
                        var d = a.getUiTabs(b);
                        return {
                            scaytToggle: CKEDITOR.TRISTATE_OFF,
                            scaytOptions: c && d[0] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                            scaytLangs: c && d[1] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                            scaytDict: c && d[2] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                            scaytAbout: c && d[3] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                            scaytWSC: d[4] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                        }
                    }
                });
                b.contextMenu && b.addMenuItems && b.contextMenu.addListener(function (e, f) {
                    if (!a.isScaytEnabled(b) || f.getRanges()[0].checkReadOnly())return null;
                    var h = a.getScayt(b), i = h.getScaytNode();
                    if (!i)return null;
                    var l = h.getWord(i);
                    if (!l)return null;
                    var n = h.getLang(), t = b.config.scayt_contextCommands || "all", l = window.scayt.getSuggestion(l, n), t = t.split("|"), A;
                    for (A in j) {
                        delete b._.menuItems[A];
                        delete b.commands[A]
                    }
                    for (A in k) {
                        delete b._.menuItems[A];
                        delete b.commands[A]
                    }
                    if (!l || !l.length) {
                        d(b, "no_sugg", o.noSuggestions, "scayt_no_sugg", {
                            exec: function () {
                            }
                        }, "scayt_control", 1, true);
                        k.scayt_no_sugg = CKEDITOR.TRISTATE_OFF
                    } else {
                        j = {};
                        k = {};
                        A = b.config.scayt_moreSuggestions || "on";
                        var n = false, s = b.config.scayt_maxSuggestions;
                        typeof s != "number" && (s = 5);
                        !s && (s = l.length);
                        for (var v = 0, w = l.length; v < w; v = v + 1) {
                            var u = "scayt_suggestion_" + l[v].replace(" ", "_"), x = function (a, b) {
                                return {
                                    exec: function () {
                                        h.replace(a, b)
                                    }
                                }
                            }(i, l[v]);
                            if (v < s) {
                                d(b, "button_" + u, l[v], u, x, "scayt_suggest", v + 1);
                                k[u] = CKEDITOR.TRISTATE_OFF
                            } else if (A == "on") {
                                d(b, "button_" + u, l[v], u, x, "scayt_moresuggest", v + 1);
                                j[u] = CKEDITOR.TRISTATE_OFF;
                                n = true
                            }
                        }
                        if (n) {
                            b.addMenuItem("scayt_moresuggest", {
                                label: o.moreSuggestions,
                                group: "scayt_moresuggest",
                                order: 10,
                                getItems: function () {
                                    return j
                                }
                            });
                            k.scayt_moresuggest = CKEDITOR.TRISTATE_OFF
                        }
                    }
                    if (c("all", t) || c("ignore", t)) {
                        d(b, "ignore", o.ignore, "scayt_ignore", {
                            exec: function () {
                                h.ignore(i)
                            }
                        }, "scayt_control", 2);
                        k.scayt_ignore = CKEDITOR.TRISTATE_OFF
                    }
                    if (c("all", t) || c("ignoreall", t)) {
                        d(b, "ignore_all", o.ignoreAll, "scayt_ignore_all", {
                            exec: function () {
                                h.ignoreAll(i)
                            }
                        }, "scayt_control", 3);
                        k.scayt_ignore_all = CKEDITOR.TRISTATE_OFF
                    }
                    if (c("all", t) || c("add", t)) {
                        d(b, "add_word", o.addWord, "scayt_add_word", {
                            exec: function () {
                                window.scayt.addWordToUserDictionary(i)
                            }
                        }, "scayt_control", 4);
                        k.scayt_add_word = CKEDITOR.TRISTATE_OFF
                    }
                    h.fireOnContextMenu && h.fireOnContextMenu(b);
                    return k
                });
                h = function (c) {
                    c.removeListener();
                    CKEDITOR.env.opera || CKEDITOR.env.air ? n.setState(CKEDITOR.TRISTATE_DISABLED) : n.setState(a.isScaytEnabled(b) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                };
                b.on("showScaytState", h);
                b.on("instanceReady", h);
                if (b.config.scayt_autoStartup)b.on("instanceReady", function () {
                    a.loadEngine(b)
                })
            }, afterInit: function (a) {
                var b, c = function (a) {
                    if (a.hasAttribute("data-scaytid"))return false
                };
                a._.elementsPath && (b = a._.elementsPath.filters) && b.push(c);
                a.addRemoveFormatFilter && a.addRemoveFormatFilter(c)
            }
        })
    }(),function () {
        CKEDITOR.plugins.add("sourcearea", {
            init: function (f) {
                function b() {
                    this.hide();
                    this.setStyle("height", this.getParent().$.clientHeight + "px");
                    this.setStyle("width", this.getParent().$.clientWidth + "px");
                    this.show()
                }

                if (f.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var a = CKEDITOR.plugins.sourcearea;
                    f.addMode("source", function (a) {
                        var i = f.ui.space("contents").getDocument().createElement("textarea");
                        i.setStyles(CKEDITOR.tools.extend({
                            width: CKEDITOR.env.ie7Compat ? "99%" : "100%",
                            height: "100%",
                            resize: "none",
                            outline: "none",
                            "text-align": "left"
                        }, CKEDITOR.tools.cssVendorPrefix("tab-size", f.config.sourceAreaTabSize || 4)));
                        i.setAttribute("dir", "ltr");
                        i.addClass("cke_source cke_reset cke_enable_context_menu");
                        f.ui.space("contents").append(i);
                        i = f.editable(new c(f, i));
                        i.setData(f.getData(1));
                        if (CKEDITOR.env.ie) {
                            i.attachListener(f, "resize", b, i);
                            i.attachListener(CKEDITOR.document.getWindow(), "resize", b, i);
                            CKEDITOR.tools.setTimeout(b, 0, i)
                        }
                        f.fire("ariaWidget", this);
                        a()
                    });
                    f.addCommand("source", a.commands.source);
                    f.ui.addButton && f.ui.addButton("Source", {
                        label: f.lang.sourcearea.toolbar,
                        command: "source",
                        toolbar: "mode,10"
                    });
                    f.on("mode", function () {
                        f.getCommand("source").setState(f.mode == "source" ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
                    })
                }
            }
        });
        var c = CKEDITOR.tools.createClass({
            base: CKEDITOR.editable, proto: {
                setData: function (c) {
                    this.setValue(c);
                    this.editor.fire("dataReady")
                }, getData: function () {
                    return this.getValue()
                }, insertHtml: function () {
                }, insertElement: function () {
                }, insertText: function () {
                }, setReadOnly: function (c) {
                    this[(c ? "set" : "remove") + "Attribute"]("readOnly", "readonly")
                }, detach: function () {
                    c.baseProto.detach.call(this);
                    this.clearCustomData();
                    this.remove()
                }
            }
        })
    }(),CKEDITOR.plugins.sourcearea = {
        commands: {
            source: {
                modes: {wysiwyg: 1, source: 1},
                editorFocus: !1,
                readOnly: 1,
                exec: function (c) {
                    c.mode == "wysiwyg" && c.fire("saveSnapshot");
                    c.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED);
                    c.setMode(c.mode == "source" ? "wysiwyg" : "source")
                },
                canUndo: !1
            }
        }
    },CKEDITOR.plugins.add("specialchar", {
        availableLangs: {
            ar: 1,
            bg: 1,
            ca: 1,
            cs: 1,
            cy: 1,
            de: 1,
            el: 1,
            en: 1,
            eo: 1,
            es: 1,
            et: 1,
            fa: 1,
            fi: 1,
            fr: 1,
            "fr-ca": 1,
            gl: 1,
            he: 1,
            hr: 1,
            hu: 1,
            id: 1,
            it: 1,
            ja: 1,
            ku: 1,
            lv: 1,
            nb: 1,
            nl: 1,
            no: 1,
            pl: 1,
            pt: 1,
            "pt-br": 1,
            ru: 1,
            si: 1,
            sk: 1,
            sl: 1,
            sq: 1,
            sv: 1,
            th: 1,
            tr: 1,
            ug: 1,
            uk: 1,
            vi: 1,
            "zh-cn": 1
        }, requires: "dialog", init: function (c) {
            var f = this;
            CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js");
            c.addCommand("specialchar", {
                exec: function () {
                    var b = c.langCode, b = f.availableLangs[b] ? b : f.availableLangs[b.replace(/-.*/, "")] ? b.replace(/-.*/, "") : "en";
                    CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(f.path + "dialogs/lang/" + b + ".js"), function () {
                        CKEDITOR.tools.extend(c.lang.specialchar, f.langEntries[b]);
                        c.openDialog("specialchar")
                    })
                }, modes: {wysiwyg: 1}, canUndo: false
            });
            c.ui.addButton && c.ui.addButton("SpecialChar", {
                label: c.lang.specialchar.toolbar,
                command: "specialchar",
                toolbar: "insert,50"
            })
        }
    }),CKEDITOR.config.specialChars = "! &quot; # $ % &amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ &euro; &lsquo; &rsquo; &ldquo; &rdquo; &ndash; &mdash; &iexcl; &cent; &pound; &curren; &yen; &brvbar; &sect; &uml; &copy; &ordf; &laquo; &not; &reg; &macr; &deg; &sup2; &sup3; &acute; &micro; &para; &middot; &cedil; &sup1; &ordm; &raquo; &frac14; &frac12; &frac34; &iquest; &Agrave; &Aacute; &Acirc; &Atilde; &Auml; &Aring; &AElig; &Ccedil; &Egrave; &Eacute; &Ecirc; &Euml; &Igrave; &Iacute; &Icirc; &Iuml; &ETH; &Ntilde; &Ograve; &Oacute; &Ocirc; &Otilde; &Ouml; &times; &Oslash; &Ugrave; &Uacute; &Ucirc; &Uuml; &Yacute; &THORN; &szlig; &agrave; &aacute; &acirc; &atilde; &auml; &aring; &aelig; &ccedil; &egrave; &eacute; &ecirc; &euml; &igrave; &iacute; &icirc; &iuml; &eth; &ntilde; &ograve; &oacute; &ocirc; &otilde; &ouml; &divide; &oslash; &ugrave; &uacute; &ucirc; &uuml; &yacute; &thorn; &yuml; &OElig; &oelig; &#372; &#374 &#373 &#375; &sbquo; &#8219; &bdquo; &hellip; &trade; &#9658; &bull; &rarr; &rArr; &hArr; &diams; &asymp;".split(" "),function () {
        CKEDITOR.plugins.add("stylescombo", {
            requires: "richcombo", init: function (c) {
                var f = c.config, b = c.lang.stylescombo, a = {}, d = [], i = [];
                c.on("stylesSet", function (b) {
                    if (b = b.data.styles) {
                        for (var h, e, j = 0, k = b.length; j < k; j++) {
                            h = b[j];
                            if (!(c.blockless && h.element in CKEDITOR.dtd.$block)) {
                                e = h.name;
                                h = new CKEDITOR.style(h);
                                if (!c.filter.customConfig || c.filter.check(h)) {
                                    h._name = e;
                                    h._.enterMode = f.enterMode;
                                    h._.weight = j + (h.type == CKEDITOR.STYLE_OBJECT ? 1 : h.type == CKEDITOR.STYLE_BLOCK ? 2 : 3) * 1E3;
                                    a[e] = h;
                                    d.push(h);
                                    i.push(h)
                                }
                            }
                        }
                        d.sort(function (a, b) {
                            return a._.weight - b._.weight
                        })
                    }
                });
                c.ui.addRichCombo("Styles", {
                    label: b.label,
                    title: b.panelTitle,
                    toolbar: "styles,10",
                    allowedContent: i,
                    panel: {
                        css: [CKEDITOR.skin.getPath("editor")].concat(f.contentsCss),
                        multiSelect: true,
                        attributes: {"aria-label": b.panelTitle}
                    },
                    init: function () {
                        var a, c, e, f, i, n;
                        i = 0;
                        for (n = d.length; i < n; i++) {
                            a = d[i];
                            c = a._name;
                            f = a.type;
                            if (f != e) {
                                this.startGroup(b["panelTitle" + f]);
                                e = f
                            }
                            this.add(c, a.type == CKEDITOR.STYLE_OBJECT ? c : a.buildPreview(), c)
                        }
                        this.commit()
                    },
                    onClick: function (b) {
                        c.focus();
                        c.fire("saveSnapshot");
                        var b = a[b], d = c.elementPath();
                        c[b.checkActive(d) ? "removeStyle" : "applyStyle"](b);
                        c.fire("saveSnapshot")
                    },
                    onRender: function () {
                        c.on("selectionChange", function (b) {
                            for (var c = this.getValue(), b = b.data.path.elements, d = 0, f = b.length, i; d < f; d++) {
                                i = b[d];
                                for (var n in a)if (a[n].checkElementRemovable(i, true)) {
                                    n != c && this.setValue(n);
                                    return
                                }
                            }
                            this.setValue("")
                        }, this)
                    },
                    onOpen: function () {
                        var d = c.getSelection().getSelectedElement(), d = c.elementPath(d), f = [0, 0, 0, 0];
                        this.showAll();
                        this.unmarkAll();
                        for (var e in a) {
                            var i = a[e], k = i.type;
                            if (k == CKEDITOR.STYLE_BLOCK && !d.isContextFor(i.element))this.hideItem(e); else {
                                if (i.checkActive(d))this.mark(e); else if (k == CKEDITOR.STYLE_OBJECT && !i.checkApplicable(d)) {
                                    this.hideItem(e);
                                    f[k]--
                                }
                                f[k]++
                            }
                        }
                        f[CKEDITOR.STYLE_BLOCK] || this.hideGroup(b["panelTitle" + CKEDITOR.STYLE_BLOCK]);
                        f[CKEDITOR.STYLE_INLINE] || this.hideGroup(b["panelTitle" + CKEDITOR.STYLE_INLINE]);
                        f[CKEDITOR.STYLE_OBJECT] || this.hideGroup(b["panelTitle" + CKEDITOR.STYLE_OBJECT])
                    },
                    reset: function () {
                        a = {};
                        d = []
                    }
                })
            }
        })
    }(),function () {
        function c(a) {
            return {
                editorFocus: false, canUndo: false, modes: {wysiwyg: 1}, exec: function (b) {
                    if (b.editable().hasFocus) {
                        var c = b.getSelection(), f;
                        if (f = (new CKEDITOR.dom.elementPath(c.getCommonAncestor(), c.root)).contains({
                                td: 1,
                                th: 1
                            }, 1)) {
                            var c = b.createRange(), e = CKEDITOR.tools.tryThese(function () {
                                var b = f.getParent().$.cells[f.$.cellIndex + (a ? -1 : 1)];
                                b.parentNode.parentNode;
                                return b
                            }, function () {
                                var b = f.getParent(), b = b.getAscendant("table").$.rows[b.$.rowIndex + (a ? -1 : 1)];
                                return b.cells[a ? b.cells.length - 1 : 0]
                            });
                            if (!e && !a) {
                                for (var j = f.getAscendant("table").$, e = f.getParent().$.cells, j = new CKEDITOR.dom.element(j.insertRow(-1), b.document), k = 0, n = e.length; k < n; k++) {
                                    var o = j.append((new CKEDITOR.dom.element(e[k], b.document)).clone(false, false));
                                    !CKEDITOR.env.ie && o.appendBogus()
                                }
                                c.moveToElementEditStart(j)
                            } else if (e) {
                                e = new CKEDITOR.dom.element(e);
                                c.moveToElementEditStart(e);
                                (!c.checkStartOfBlock() || !c.checkEndOfBlock()) && c.selectNodeContents(e)
                            } else return true;
                            c.select(true);
                            return true
                        }
                    }
                    return false
                }
            }
        }

        var f = {editorFocus: false, modes: {wysiwyg: 1, source: 1}}, b = {
            exec: function (a) {
                a.container.focusNext(true, a.tabIndex)
            }
        }, a = {
            exec: function (a) {
                a.container.focusPrevious(true, a.tabIndex)
            }
        };
        CKEDITOR.plugins.add("tab", {
            init: function (d) {
                for (var i = d.config.enableTabKeyTools !== false, g = d.config.tabSpaces || 0, h = ""; g--;)h = h + " ";
                if (h)d.on("key", function (a) {
                    if (a.data.keyCode == 9) {
                        d.insertHtml(h);
                        a.cancel()
                    }
                });
                if (i)d.on("key", function (a) {
                    (a.data.keyCode == 9 && d.execCommand("selectNextCell") || a.data.keyCode == CKEDITOR.SHIFT + 9 && d.execCommand("selectPreviousCell")) && a.cancel()
                });
                d.addCommand("blur", CKEDITOR.tools.extend(b, f));
                d.addCommand("blurBack", CKEDITOR.tools.extend(a, f));
                d.addCommand("selectNextCell", c());
                d.addCommand("selectPreviousCell", c(true))
            }
        })
    }(),CKEDITOR.dom.element.prototype.focusNext = function (c, f) {
        var b = f === void 0 ? this.getTabIndex() : f, a, d, i, g, h, e;
        if (b <= 0)for (h = this.getNextSourceNode(c, CKEDITOR.NODE_ELEMENT); h;) {
            if (h.isVisible() && h.getTabIndex() === 0) {
                i = h;
                break
            }
            h = h.getNextSourceNode(false, CKEDITOR.NODE_ELEMENT)
        } else for (h = this.getDocument().getBody().getFirst(); h = h.getNextSourceNode(false, CKEDITOR.NODE_ELEMENT);) {
            if (!a)if (!d && h.equals(this)) {
                d = true;
                if (c) {
                    if (!(h = h.getNextSourceNode(true, CKEDITOR.NODE_ELEMENT)))break;
                    a = 1
                }
            } else d && !this.contains(h) && (a = 1);
            if (h.isVisible() && !((e = h.getTabIndex()) < 0)) {
                if (a && e == b) {
                    i = h;
                    break
                }
                if (e > b && (!i || !g || e < g)) {
                    i = h;
                    g = e
                } else if (!i && e === 0) {
                    i = h;
                    g = e
                }
            }
        }
        i && i.focus()
    },CKEDITOR.dom.element.prototype.focusPrevious = function (c, f) {
        for (var b = f === void 0 ? this.getTabIndex() : f, a, d, i, g = 0, h, e = this.getDocument().getBody().getLast(); e = e.getPreviousSourceNode(false, CKEDITOR.NODE_ELEMENT);) {
            if (!a)if (!d && e.equals(this)) {
                d = true;
                if (c) {
                    if (!(e = e.getPreviousSourceNode(true, CKEDITOR.NODE_ELEMENT)))break;
                    a = 1
                }
            } else d && !this.contains(e) && (a = 1);
            if (e.isVisible() && !((h = e.getTabIndex()) < 0))if (b <= 0) {
                if (a && h === 0) {
                    i = e;
                    break
                }
                if (h > g) {
                    i = e;
                    g = h
                }
            } else {
                if (a && h == b) {
                    i = e;
                    break
                }
                if (h < b && (!i || h > g)) {
                    i = e;
                    g = h
                }
            }
        }
        i && i.focus()
    },CKEDITOR.plugins.add("table", {
        requires: "dialog", init: function (c) {
            function f(a) {
                return CKEDITOR.tools.extend(a || {}, {
                    contextSensitive: 1, refresh: function (a, b) {
                        this.setState(b.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                    }
                })
            }

            if (!c.blockless) {
                var b = c.lang.table;
                c.addCommand("table", new CKEDITOR.dialogCommand("table", {
                    context: "table",
                    allowedContent: "table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];" + (c.plugins.dialogadvtab ? "table" + c.plugins.dialogadvtab.allowedContent() : ""),
                    requiredContent: "table",
                    contentTransformations: [["table{width}: sizeToStyle", "table[width]: sizeToAttribute"]]
                }));
                c.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", f()));
                c.addCommand("tableDelete", f({
                    exec: function (a) {
                        var b = a.elementPath().contains("table", 1);
                        if (b) {
                            var c = b.getParent();
                            c.getChildCount() == 1 && !c.is("body", "td", "th") && (b = c);
                            a = a.createRange();
                            a.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START);
                            b.remove();
                            a.select()
                        }
                    }
                }));
                c.ui.addButton && c.ui.addButton("Table", {label: b.toolbar, command: "table", toolbar: "insert,30"});
                CKEDITOR.dialog.add("table", this.path + "dialogs/table.js");
                CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js");
                c.addMenuItems && c.addMenuItems({
                    table: {
                        label: b.menu,
                        command: "tableProperties",
                        group: "table",
                        order: 5
                    }, tabledelete: {label: b.deleteTable, command: "tableDelete", group: "table", order: 1}
                });
                c.on("doubleclick", function (a) {
                    if (a.data.element.is("table"))a.data.dialog = "tableProperties"
                });
                c.contextMenu && c.contextMenu.addListener(function () {
                    return {tabledelete: CKEDITOR.TRISTATE_OFF, table: CKEDITOR.TRISTATE_OFF}
                })
            }
        }
    }),function () {
        function c(a) {
            function b(a) {
                if (!(c.length > 0) && a.type == CKEDITOR.NODE_ELEMENT && o.test(a.getName()) && !a.getCustomData("selected_cell")) {
                    CKEDITOR.dom.element.setMarker(d, a, "selected_cell", true);
                    c.push(a)
                }
            }

            for (var a = a.getRanges(), c = [], d = {}, e = 0; e < a.length; e++) {
                var f = a[e];
                if (f.collapsed) {
                    f = f.getCommonAncestor();
                    (f = f.getAscendant("td", true) || f.getAscendant("th", true)) && c.push(f)
                } else {
                    var f = new CKEDITOR.dom.walker(f), g;
                    for (f.guard = b; g = f.next();)if (g.type != CKEDITOR.NODE_ELEMENT || !g.is(CKEDITOR.dtd.table))if ((g = g.getAscendant("td", true) || g.getAscendant("th", true)) && !g.getCustomData("selected_cell")) {
                        CKEDITOR.dom.element.setMarker(d, g, "selected_cell", true);
                        c.push(g)
                    }
                }
            }
            CKEDITOR.dom.element.clearAllMarkers(d);
            return c
        }

        function f(a, b) {
            for (var d = c(a), e = d[0], f = e.getAscendant("table"), e = e.getDocument(), g = d[0].getParent(), h = g.$.rowIndex, d = d[d.length - 1], i = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = new CKEDITOR.dom.element(f.$.rows[i]), h = b ? h : i, g = b ? g : d, d = CKEDITOR.tools.buildTableMap(f), f = d[h], h = b ? d[h - 1] : d[h + 1], d = d[0].length, e = e.createElement("tr"), i = 0; f[i] && i < d; i++) {
                var j;
                if (f[i].rowSpan > 1 && h && f[i] == h[i]) {
                    j = f[i];
                    j.rowSpan = j.rowSpan + 1
                } else {
                    j = (new CKEDITOR.dom.element(f[i])).clone();
                    j.removeAttribute("rowSpan");
                    !CKEDITOR.env.ie && j.appendBogus();
                    e.append(j);
                    j = j.$
                }
                i = i + (j.colSpan - 1)
            }
            b ? e.insertBefore(g) : e.insertAfter(g)
        }

        function b(a) {
            if (a instanceof CKEDITOR.dom.selection) {
                for (var d = c(a), e = d[0].getAscendant("table"), f = CKEDITOR.tools.buildTableMap(e), a = d[0].getParent().$.rowIndex, d = d[d.length - 1], g = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = [], h = a; h <= g; h++) {
                    for (var i = f[h], j = new CKEDITOR.dom.element(e.$.rows[h]), k = 0; k < i.length; k++) {
                        var n = new CKEDITOR.dom.element(i[k]), o = n.getParent().$.rowIndex;
                        if (n.$.rowSpan == 1)n.remove(); else {
                            n.$.rowSpan = n.$.rowSpan - 1;
                            if (o == h) {
                                o = f[h + 1];
                                o[k - 1] ? n.insertAfter(new CKEDITOR.dom.element(o[k - 1])) : (new CKEDITOR.dom.element(e.$.rows[h + 1])).append(n, 1)
                            }
                        }
                        k = k + (n.$.colSpan - 1)
                    }
                    d.push(j)
                }
                f = e.$.rows;
                e = new CKEDITOR.dom.element(f[g + 1] || (a > 0 ? f[a - 1] : null) || e.$.parentNode);
                for (h = d.length; h >= 0; h--)b(d[h]);
                return e
            }
            if (a instanceof CKEDITOR.dom.element) {
                e = a.getAscendant("table");
                e.$.rows.length == 1 ? e.remove() : a.remove()
            }
            return null
        }

        function a(a, b) {
            for (var c = b ? Infinity : 0, d = 0; d < a.length; d++) {
                var e;
                e = a[d];
                for (var f = b, g = e.getParent().$.cells, h = 0, i = 0; i < g.length; i++) {
                    var j = g[i], h = h + (f ? 1 : j.colSpan);
                    if (j == e.$)break
                }
                e = h - 1;
                if (b ? e < c : e > c)c = e
            }
            return c
        }

        function d(b, d) {
            for (var e = c(b), f = e[0].getAscendant("table"), g = a(e, 1), e = a(e), g = d ? g : e, h = CKEDITOR.tools.buildTableMap(f), f = [], e = [], i = h.length, j = 0; j < i; j++) {
                f.push(h[j][g]);
                e.push(d ? h[j][g - 1] : h[j][g + 1])
            }
            for (j = 0; j < i; j++)if (f[j]) {
                if (f[j].colSpan > 1 && e[j] == f[j]) {
                    g = f[j];
                    g.colSpan = g.colSpan + 1
                } else {
                    g = (new CKEDITOR.dom.element(f[j])).clone();
                    g.removeAttribute("colSpan");
                    !CKEDITOR.env.ie && g.appendBogus();
                    g[d ? "insertBefore" : "insertAfter"].call(g, new CKEDITOR.dom.element(f[j]));
                    g = g.$
                }
                j = j + (g.rowSpan - 1)
            }
        }

        function i(a, b) {
            var c = a.getStartElement();
            if (c = c.getAscendant("td", 1) || c.getAscendant("th", 1)) {
                var d = c.clone();
                CKEDITOR.env.ie || d.appendBogus();
                b ? d.insertBefore(c) : d.insertAfter(c)
            }
        }

        function g(a) {
            if (a instanceof CKEDITOR.dom.selection) {
                var a = c(a), b = a[0] && a[0].getAscendant("table"), d;
                a:{
                    var e = 0;
                    d = a.length - 1;
                    for (var f = {}, i, j; i = a[e++];)CKEDITOR.dom.element.setMarker(f, i, "delete_cell", true);
                    for (e = 0; i = a[e++];)if ((j = i.getPrevious()) && !j.getCustomData("delete_cell") || (j = i.getNext()) && !j.getCustomData("delete_cell")) {
                        CKEDITOR.dom.element.clearAllMarkers(f);
                        d = j;
                        break a
                    }
                    CKEDITOR.dom.element.clearAllMarkers(f);
                    j = a[0].getParent();
                    if (j = j.getPrevious())d = j.getLast(); else {
                        j = a[d].getParent();
                        d = (j = j.getNext()) ? j.getChild(0) : null
                    }
                }
                for (j = a.length - 1; j >= 0; j--)g(a[j]);
                d ? h(d, true) : b && b.remove()
            } else if (a instanceof CKEDITOR.dom.element) {
                b = a.getParent();
                b.getChildCount() == 1 ? b.remove() : a.remove()
            }
        }

        function h(a, b) {
            var c = new CKEDITOR.dom.range(a.getDocument());
            if (!c["moveToElementEdit" + (b ? "End" : "Start")](a)) {
                c.selectNodeContents(a);
                c.collapse(b ? false : true)
            }
            c.select(true)
        }

        function e(a, b, c) {
            a = a[b];
            if (typeof c == "undefined")return a;
            for (b = 0; a && b < a.length; b++) {
                if (c.is && a[b] == c.$)return b;
                if (b == c)return new CKEDITOR.dom.element(a[b])
            }
            return c.is ? -1 : null
        }

        function j(a, b, d) {
            var f = c(a), g;
            if ((b ? f.length != 1 : f.length < 2) || (g = a.getCommonAncestor()) && g.type == CKEDITOR.NODE_ELEMENT && g.is("table"))return false;
            var h, a = f[0];
            g = a.getAscendant("table");
            var i = CKEDITOR.tools.buildTableMap(g), j = i.length, k = i[0].length, n = a.getParent().$.rowIndex, o = e(i, n, a);
            if (b) {
                var u;
                try {
                    var x = parseInt(a.getAttribute("rowspan"), 10) || 1;
                    h = parseInt(a.getAttribute("colspan"), 10) || 1;
                    u = i[b == "up" ? n - x : b == "down" ? n + x : n][b == "left" ? o - h : b == "right" ? o + h : o]
                } catch (B) {
                    return false
                }
                if (!u || a.$ == u)return false;
                f[b == "up" || b == "left" ? "unshift" : "push"](new CKEDITOR.dom.element(u))
            }
            for (var b = a.getDocument(), z = n, x = u = 0, D = !d && new CKEDITOR.dom.documentFragment(b), C = 0, b = 0; b < f.length; b++) {
                h = f[b];
                var F = h.getParent(), G = h.getFirst(), E = h.$.colSpan, M = h.$.rowSpan, F = F.$.rowIndex, I = e(i, F, h), C = C + E * M, x = Math.max(x, I - o + E);
                u = Math.max(u, F - n + M);
                if (!d) {
                    E = h;
                    (M = E.getBogus()) && M.remove();
                    E.trim();
                    if (h.getChildren().count()) {
                        if (F != z && G && (!G.isBlockBoundary || !G.isBlockBoundary({br: 1})))(z = D.getLast(CKEDITOR.dom.walker.whitespaces(true))) && (!z.is || !z.is("br")) && D.append("br");
                        h.moveChildren(D)
                    }
                    b ? h.remove() : h.setHtml("")
                }
                z = F
            }
            if (d)return u * x == C;
            D.moveChildren(a);
            CKEDITOR.env.ie || a.appendBogus();
            x >= k ? a.removeAttribute("rowSpan") : a.$.rowSpan = u;
            u >= j ? a.removeAttribute("colSpan") : a.$.colSpan = x;
            d = new CKEDITOR.dom.nodeList(g.$.rows);
            f = d.count();
            for (b = f - 1; b >= 0; b--) {
                g = d.getItem(b);
                if (!g.$.cells.length) {
                    g.remove();
                    f++
                }
            }
            return a
        }

        function k(a, b) {
            var d = c(a);
            if (d.length > 1)return false;
            if (b)return true;
            var d = d[0], f = d.getParent(), g = f.getAscendant("table"), h = CKEDITOR.tools.buildTableMap(g), i = f.$.rowIndex, j = e(h, i, d), k = d.$.rowSpan, n;
            if (k > 1) {
                n = Math.ceil(k / 2);
                for (var k = Math.floor(k / 2), f = i + n, g = new CKEDITOR.dom.element(g.$.rows[f]), h = e(h, f), o, f = d.clone(), i = 0; i < h.length; i++) {
                    o = h[i];
                    if (o.parentNode == g.$ && i > j) {
                        f.insertBefore(new CKEDITOR.dom.element(o));
                        break
                    } else o = null
                }
                o || g.append(f, true)
            } else {
                k = n = 1;
                g = f.clone();
                g.insertAfter(f);
                g.append(f = d.clone());
                o = e(h, i);
                for (j = 0; j < o.length; j++)o[j].rowSpan++
            }
            CKEDITOR.env.ie || f.appendBogus();
            d.$.rowSpan = n;
            f.$.rowSpan = k;
            n == 1 && d.removeAttribute("rowSpan");
            k == 1 && f.removeAttribute("rowSpan");
            return f
        }

        function n(a, b) {
            var d = c(a);
            if (d.length > 1)return false;
            if (b)return true;
            var d = d[0], f = d.getParent(), g = f.getAscendant("table"), g = CKEDITOR.tools.buildTableMap(g), h = e(g, f.$.rowIndex, d), i = d.$.colSpan;
            if (i > 1) {
                f = Math.ceil(i / 2);
                i = Math.floor(i / 2)
            } else {
                for (var i = f = 1, j = [], k = 0; k < g.length; k++) {
                    var n = g[k];
                    j.push(n[h]);
                    n[h].rowSpan > 1 && (k = k + (n[h].rowSpan - 1))
                }
                for (g = 0; g < j.length; g++)j[g].colSpan++
            }
            g = d.clone();
            g.insertAfter(d);
            CKEDITOR.env.ie || g.appendBogus();
            d.$.colSpan = f;
            g.$.colSpan = i;
            f == 1 && d.removeAttribute("colSpan");
            i == 1 && g.removeAttribute("colSpan");
            return g
        }

        var o = /^(?:td|th)$/;
        CKEDITOR.plugins.tabletools = {
            requires: "table,dialog,contextmenu", init: function (a) {
                function e(a) {
                    return CKEDITOR.tools.extend(a || {}, {
                        contextSensitive: 1, refresh: function (a, b) {
                            this.setState(b.contains({
                                td: 1,
                                th: 1
                            }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                        }
                    })
                }

                function o(b, c) {
                    var d = a.addCommand(b, c);
                    a.addFeature(d)
                }

                var r = a.lang.table;
                o("cellProperties", new CKEDITOR.dialogCommand("cellProperties", e({
                    allowedContent: "td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]",
                    requiredContent: "table"
                })));
                CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js");
                o("rowDelete", e({
                    requiredContent: "table", exec: function (a) {
                        a = a.getSelection();
                        h(b(a))
                    }
                }));
                o("rowInsertBefore", e({
                    requiredContent: "table", exec: function (a) {
                        a = a.getSelection();
                        f(a, true)
                    }
                }));
                o("rowInsertAfter", e({
                    requiredContent: "table", exec: function (a) {
                        a = a.getSelection();
                        f(a)
                    }
                }));
                o("columnDelete", e({
                    requiredContent: "table", exec: function (a) {
                        for (var a = a.getSelection(), a = c(a), b = a[0], d = a[a.length - 1], a = b.getAscendant("table"), e = CKEDITOR.tools.buildTableMap(a), f, g, i = [], j = 0, k = e.length; j < k; j++)for (var m = 0, n = e[j].length; m < n; m++) {
                            e[j][m] == b.$ && (f = m);
                            e[j][m] == d.$ && (g = m)
                        }
                        for (j = f; j <= g; j++)for (m = 0; m < e.length; m++) {
                            d = e[m];
                            b = new CKEDITOR.dom.element(a.$.rows[m]);
                            d = new CKEDITOR.dom.element(d[j]);
                            if (d.$) {
                                d.$.colSpan == 1 ? d.remove() : d.$.colSpan = d.$.colSpan - 1;
                                m = m + (d.$.rowSpan - 1);
                                b.$.cells.length || i.push(b)
                            }
                        }
                        g = a.$.rows[0] && a.$.rows[0].cells;
                        f = new CKEDITOR.dom.element(g[f] || (f ? g[f - 1] : a.$.parentNode));
                        i.length == k && a.remove();
                        f && h(f, true)
                    }
                }));
                o("columnInsertBefore", e({
                    requiredContent: "table", exec: function (a) {
                        a = a.getSelection();
                        d(a, true)
                    }
                }));
                o("columnInsertAfter", e({
                    requiredContent: "table", exec: function (a) {
                        a = a.getSelection();
                        d(a)
                    }
                }));
                o("cellDelete", e({
                    requiredContent: "table", exec: function (a) {
                        a = a.getSelection();
                        g(a)
                    }
                }));
                o("cellMerge", e({
                    allowedContent: "td[colspan,rowspan]",
                    requiredContent: "td[colspan,rowspan]",
                    exec: function (a) {
                        h(j(a.getSelection()), true)
                    }
                }));
                o("cellMergeRight", e({
                    allowedContent: "td[colspan]", requiredContent: "td[colspan]", exec: function (a) {
                        h(j(a.getSelection(), "right"), true)
                    }
                }));
                o("cellMergeDown", e({
                    allowedContent: "td[rowspan]", requiredContent: "td[rowspan]", exec: function (a) {
                        h(j(a.getSelection(), "down"), true)
                    }
                }));
                o("cellVerticalSplit", e({
                    allowedContent: "td[rowspan]",
                    requiredContent: "td[rowspan]",
                    exec: function (a) {
                        h(k(a.getSelection()))
                    }
                }));
                o("cellHorizontalSplit", e({
                    allowedContent: "td[colspan]",
                    requiredContent: "td[colspan]",
                    exec: function (a) {
                        h(n(a.getSelection()))
                    }
                }));
                o("cellInsertBefore", e({
                    requiredContent: "table", exec: function (a) {
                        a = a.getSelection();
                        i(a, true)
                    }
                }));
                o("cellInsertAfter", e({
                    requiredContent: "table", exec: function (a) {
                        a = a.getSelection();
                        i(a)
                    }
                }));
                a.addMenuItems && a.addMenuItems({
                    tablecell: {
                        label: r.cell.menu,
                        group: "tablecell",
                        order: 1,
                        getItems: function () {
                            var b = a.getSelection(), d = c(b);
                            return {
                                tablecell_insertBefore: CKEDITOR.TRISTATE_OFF,
                                tablecell_insertAfter: CKEDITOR.TRISTATE_OFF,
                                tablecell_delete: CKEDITOR.TRISTATE_OFF,
                                tablecell_merge: j(b, null, true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_merge_right: j(b, "right", true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_merge_down: j(b, "down", true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_split_vertical: k(b, true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_split_horizontal: n(b, true) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_properties: d.length > 0 ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                            }
                        }
                    },
                    tablecell_insertBefore: {
                        label: r.cell.insertBefore,
                        group: "tablecell",
                        command: "cellInsertBefore",
                        order: 5
                    },
                    tablecell_insertAfter: {
                        label: r.cell.insertAfter,
                        group: "tablecell",
                        command: "cellInsertAfter",
                        order: 10
                    },
                    tablecell_delete: {label: r.cell.deleteCell, group: "tablecell", command: "cellDelete", order: 15},
                    tablecell_merge: {label: r.cell.merge, group: "tablecell", command: "cellMerge", order: 16},
                    tablecell_merge_right: {
                        label: r.cell.mergeRight,
                        group: "tablecell",
                        command: "cellMergeRight",
                        order: 17
                    },
                    tablecell_merge_down: {
                        label: r.cell.mergeDown,
                        group: "tablecell",
                        command: "cellMergeDown",
                        order: 18
                    },
                    tablecell_split_horizontal: {
                        label: r.cell.splitHorizontal,
                        group: "tablecell",
                        command: "cellHorizontalSplit",
                        order: 19
                    },
                    tablecell_split_vertical: {
                        label: r.cell.splitVertical,
                        group: "tablecell",
                        command: "cellVerticalSplit",
                        order: 20
                    },
                    tablecell_properties: {
                        label: r.cell.title,
                        group: "tablecellproperties",
                        command: "cellProperties",
                        order: 21
                    },
                    tablerow: {
                        label: r.row.menu, group: "tablerow", order: 1, getItems: function () {
                            return {
                                tablerow_insertBefore: CKEDITOR.TRISTATE_OFF,
                                tablerow_insertAfter: CKEDITOR.TRISTATE_OFF,
                                tablerow_delete: CKEDITOR.TRISTATE_OFF
                            }
                        }
                    },
                    tablerow_insertBefore: {
                        label: r.row.insertBefore,
                        group: "tablerow",
                        command: "rowInsertBefore",
                        order: 5
                    },
                    tablerow_insertAfter: {
                        label: r.row.insertAfter,
                        group: "tablerow",
                        command: "rowInsertAfter",
                        order: 10
                    },
                    tablerow_delete: {label: r.row.deleteRow, group: "tablerow", command: "rowDelete", order: 15},
                    tablecolumn: {
                        label: r.column.menu, group: "tablecolumn", order: 1, getItems: function () {
                            return {
                                tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF,
                                tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF,
                                tablecolumn_delete: CKEDITOR.TRISTATE_OFF
                            }
                        }
                    },
                    tablecolumn_insertBefore: {
                        label: r.column.insertBefore,
                        group: "tablecolumn",
                        command: "columnInsertBefore",
                        order: 5
                    },
                    tablecolumn_insertAfter: {
                        label: r.column.insertAfter,
                        group: "tablecolumn",
                        command: "columnInsertAfter",
                        order: 10
                    },
                    tablecolumn_delete: {
                        label: r.column.deleteColumn,
                        group: "tablecolumn",
                        command: "columnDelete",
                        order: 15
                    }
                });
                a.contextMenu && a.contextMenu.addListener(function (a, b, c) {
                    return (a = c.contains({td: 1, th: 1}, 1)) && !a.isReadOnly() ? {
                        tablecell: CKEDITOR.TRISTATE_OFF,
                        tablerow: CKEDITOR.TRISTATE_OFF,
                        tablecolumn: CKEDITOR.TRISTATE_OFF
                    } : null
                })
            }, getSelectedCells: c
        };
        CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
    }(),CKEDITOR.tools.buildTableMap = function (c) {
        for (var c = c.$.rows, f = -1, b = [], a = 0; a < c.length; a++) {
            f++;
            !b[f] && (b[f] = []);
            for (var d = -1, i = 0; i < c[a].cells.length; i++) {
                var g = c[a].cells[i];
                for (d++; b[f][d];)d++;
                for (var h = isNaN(g.colSpan) ? 1 : g.colSpan, g = isNaN(g.rowSpan) ? 1 : g.rowSpan, e = 0; e < g; e++) {
                    b[f + e] || (b[f + e] = []);
                    for (var j = 0; j < h; j++)b[f + e][d + j] = c[a].cells[i]
                }
                d = d + (h - 1)
            }
        }
        return b
    },function () {
        function c(a) {
            function b() {
                for (var e = c(), i = CKEDITOR.tools.clone(a.config.toolbarGroups) || f(a), j = 0; j < i.length; j++) {
                    var k = i[j];
                    if (k != "/") {
                        typeof k == "string" && (k = i[j] = {name: k});
                        var p, r = k.groups;
                        if (r)for (var l = 0; l < r.length; l++) {
                            p = r[l];
                            (p = e[p]) && h(k, p)
                        }
                        (p = e[k.name]) && h(k, p)
                    }
                }
                return i
            }

            function c() {
                var b = {}, e, f, g;
                for (e in a.ui.items) {
                    f = a.ui.items[e];
                    g = f.toolbar || "others";
                    g = g.split(",");
                    f = g[0];
                    g = parseInt(g[1] || -1, 10);
                    b[f] || (b[f] = []);
                    b[f].push({name: e, order: g})
                }
                for (f in b)b[f] = b[f].sort(function (a, b) {
                    return a.order == b.order ? 0 : b.order < 0 ? -1 : a.order < 0 ? 1 : a.order < b.order ? -1 : 1
                });
                return b
            }

            function h(b, c) {
                if (c.length) {
                    b.items ? b.items.push(a.ui.create("-")) : b.items = [];
                    for (var e; e = c.shift();) {
                        e = typeof e == "string" ? e : e.name;
                        if (!j || CKEDITOR.tools.indexOf(j, e) == -1)(e = a.ui.create(e)) && a.addFeature(e) && b.items.push(e)
                    }
                }
            }

            function e(a) {
                var b = [], c, d, e;
                for (c = 0; c < a.length; ++c) {
                    d = a[c];
                    e = {};
                    if (d == "/")b.push(d); else if (CKEDITOR.tools.isArray(d)) {
                        h(e, CKEDITOR.tools.clone(d));
                        b.push(e)
                    } else if (d.items) {
                        h(e, CKEDITOR.tools.clone(d.items));
                        e.name = d.name;
                        b.push(e)
                    }
                }
                return b
            }

            var j = a.config.removeButtons, j = j && j.split(","), k = a.config.toolbar;
            typeof k == "string" && (k = a.config["toolbar_" + k]);
            return a.toolbar = k ? e(k) : b()
        }

        function f(a) {
            return a._.toolbarGroups || (a._.toolbarGroups = [{
                    name: "document",
                    groups: ["mode", "document", "doctools"]
                }, {name: "clipboard", groups: ["clipboard", "undo"]}, {
                    name: "editing",
                    groups: ["find", "selection", "spellchecker"]
                }, {name: "forms"}, "/", {name: "basicstyles", groups: ["basicstyles", "cleanup"]}, {
                    name: "paragraph",
                    groups: ["list", "indent", "blocks", "align", "bidi"]
                }, {name: "links"}, {name: "insert"}, "/", {name: "styles"}, {name: "colors"}, {name: "tools"}, {name: "others"}, {name: "about"}])
        }

        var b = function () {
            this.toolbars = [];
            this.focusCommandExecuted = false
        };
        b.prototype.focus = function () {
            for (var a = 0, b; b = this.toolbars[a++];)for (var c = 0, f; f = b.items[c++];)if (f.focus) {
                f.focus();
                return
            }
        };
        var a = {
            modes: {wysiwyg: 1, source: 1}, readOnly: 1, exec: function (a) {
                if (a.toolbox) {
                    a.toolbox.focusCommandExecuted = true;
                    CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function () {
                        a.toolbox.focus()
                    }, 100) : a.toolbox.focus()
                }
            }
        };
        CKEDITOR.plugins.add("toolbar", {
            requires: "button", init: function (d) {
                var f, g = function (a, b) {
                    var c, k = d.lang.dir == "rtl", n = d.config.toolbarGroupCycling, n = n === void 0 || n;
                    switch (b) {
                        case 9:
                        case CKEDITOR.SHIFT + 9:
                            for (; !c || !c.items.length;) {
                                c = b == 9 ? (c ? c.next : a.toolbar.next) || d.toolbox.toolbars[0] : (c ? c.previous : a.toolbar.previous) || d.toolbox.toolbars[d.toolbox.toolbars.length - 1];
                                if (c.items.length)for (a = c.items[f ? c.items.length - 1 : 0]; a && !a.focus;)(a = f ? a.previous : a.next) || (c = 0)
                            }
                            a && a.focus();
                            return false;
                        case k ? 37 : 39:
                        case 40:
                            c = a;
                            do {
                                c = c.next;
                                !c && n && (c = a.toolbar.items[0])
                            } while (c && !c.focus);
                            c ? c.focus() : g(a, 9);
                            return false;
                        case k ? 39 : 37:
                        case 38:
                            c = a;
                            do {
                                c = c.previous;
                                !c && n && (c = a.toolbar.items[a.toolbar.items.length - 1])
                            } while (c && !c.focus);
                            if (c)c.focus(); else {
                                f = 1;
                                g(a, CKEDITOR.SHIFT + 9);
                                f = 0
                            }
                            return false;
                        case 27:
                            d.focus();
                            return false;
                        case 13:
                        case 32:
                            a.execute();
                            return false
                    }
                    return true
                };
                d.on("uiSpace", function (a) {
                    if (a.data.space == d.config.toolbarLocation) {
                        a.removeListener();
                        d.toolbox = new b;
                        var e = CKEDITOR.tools.getNextId(), f = ['<span id="', e, '" class="cke_voice_label">', d.lang.toolbar.toolbars, "</span>", '<span id="' + d.ui.spaceId("toolbox") + '" class="cke_toolbox" role="group" aria-labelledby="', e, '" onmousedown="return false;">'], e = d.config.toolbarStartupExpanded !== false, i, n;
                        d.config.toolbarCanCollapse && d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && f.push('<span class="cke_toolbox_main"' + (e ? ">" : ' style="display:none">'));
                        for (var o = d.toolbox.toolbars, q = c(d), m = 0; m < q.length; m++) {
                            var p, r = 0, l, y = q[m], t;
                            if (y) {
                                if (i) {
                                    f.push("</span>");
                                    n = i = 0
                                }
                                if (y === "/")f.push('<span class="cke_toolbar_break"></span>'); else {
                                    t = y.items || y;
                                    for (var A = 0; A < t.length; A++) {
                                        var s = t[A], v;
                                        if (s)if (s.type == CKEDITOR.UI_SEPARATOR)n = i && s; else {
                                            v = s.canGroup !== false;
                                            if (!r) {
                                                p = CKEDITOR.tools.getNextId();
                                                r = {id: p, items: []};
                                                l = y.name && (d.lang.toolbar.toolbarGroups[y.name] || y.name);
                                                f.push('<span id="', p, '" class="cke_toolbar"', l ? ' aria-labelledby="' + p + '_label"' : "", ' role="toolbar">');
                                                l && f.push('<span id="', p, '_label" class="cke_voice_label">', l, "</span>");
                                                f.push('<span class="cke_toolbar_start"></span>');
                                                var w = o.push(r) - 1;
                                                if (w > 0) {
                                                    r.previous = o[w - 1];
                                                    r.previous.next = r
                                                }
                                            }
                                            if (v) {
                                                if (!i) {
                                                    f.push('<span class="cke_toolgroup" role="presentation">');
                                                    i = 1
                                                }
                                            } else if (i) {
                                                f.push("</span>");
                                                i = 0
                                            }
                                            p = function (a) {
                                                a = a.render(d, f);
                                                w = r.items.push(a) - 1;
                                                if (w > 0) {
                                                    a.previous = r.items[w - 1];
                                                    a.previous.next = a
                                                }
                                                a.toolbar = r;
                                                a.onkey = g;
                                                a.onfocus = function () {
                                                    d.toolbox.focusCommandExecuted || d.focus()
                                                }
                                            };
                                            if (n) {
                                                p(n);
                                                n = 0
                                            }
                                            p(s)
                                        }
                                    }
                                    if (i) {
                                        f.push("</span>");
                                        n = i = 0
                                    }
                                    r && f.push('<span class="cke_toolbar_end"></span></span>')
                                }
                            }
                        }
                        d.config.toolbarCanCollapse && f.push("</span>");
                        if (d.config.toolbarCanCollapse && d.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                            var u = CKEDITOR.tools.addFunction(function () {
                                d.execCommand("toolbarCollapse")
                            });
                            d.on("destroy", function () {
                                CKEDITOR.tools.removeFunction(u)
                            });
                            d.addCommand("toolbarCollapse", {
                                readOnly: 1, exec: function (a) {
                                    var b = a.ui.space("toolbar_collapser"), c = b.getPrevious(), d = a.ui.space("contents"), e = c.getParent(), f = parseInt(d.$.style.height, 10), g = e.$.offsetHeight, h = b.hasClass("cke_toolbox_collapser_min");
                                    if (h) {
                                        c.show();
                                        b.removeClass("cke_toolbox_collapser_min");
                                        b.setAttribute("title", a.lang.toolbar.toolbarCollapse)
                                    } else {
                                        c.hide();
                                        b.addClass("cke_toolbox_collapser_min");
                                        b.setAttribute("title", a.lang.toolbar.toolbarExpand)
                                    }
                                    b.getFirst().setText(h ? "▲" : "◀");
                                    d.setStyle("height", f - (e.$.offsetHeight - g) + "px");
                                    a.fire("resize")
                                }, modes: {wysiwyg: 1, source: 1}
                            });
                            d.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse");
                            f.push('<a title="' + (e ? d.lang.toolbar.toolbarCollapse : d.lang.toolbar.toolbarExpand) + '" id="' + d.ui.spaceId("toolbar_collapser") + '" tabIndex="-1" class="cke_toolbox_collapser');
                            e || f.push(" cke_toolbox_collapser_min");
                            f.push('" onclick="CKEDITOR.tools.callFunction(' +
                            u + ')">', '<span class="cke_arrow">&#9650;</span>', "</a>")
                        }
                        f.push("</span>");
                        a.data.html = a.data.html + f.join("")
                    }
                });
                d.on("destroy", function () {
                    if (this.toolbox) {
                        var a, b = 0, c, d, f;
                        for (a = this.toolbox.toolbars; b < a.length; b++) {
                            d = a[b].items;
                            for (c = 0; c < d.length; c++) {
                                f = d[c];
                                f.clickFn && CKEDITOR.tools.removeFunction(f.clickFn);
                                f.keyDownFn && CKEDITOR.tools.removeFunction(f.keyDownFn)
                            }
                        }
                    }
                });
                d.on("uiReady", function () {
                    var a = d.ui.space("toolbox");
                    a && d.focusManager.add(a, 1)
                });
                d.addCommand("toolbarFocus", a);
                d.setKeystroke(CKEDITOR.ALT +
                121, "toolbarFocus");
                d.ui.add("-", CKEDITOR.UI_SEPARATOR, {});
                d.ui.addHandler(CKEDITOR.UI_SEPARATOR, {
                    create: function () {
                        return {
                            render: function (a, b) {
                                b.push('<span class="cke_toolbar_separator" role="separator"></span>');
                                return {}
                            }
                        }
                    }
                })
            }
        });
        CKEDITOR.ui.prototype.addToolbarGroup = function (a, b, c) {
            var h = f(this.editor), e = b === 0, j = {name: a};
            if (c) {
                if (c = CKEDITOR.tools.search(h, function (a) {
                        return a.name == c
                    })) {
                    !c.groups && (c.groups = []);
                    if (b) {
                        b = CKEDITOR.tools.indexOf(c.groups, b);
                        if (b >= 0) {
                            c.groups.splice(b + 1, 0, a);
                            return
                        }
                    }
                    e ? c.groups.splice(0, 0, a) : c.groups.push(a);
                    return
                }
                b = null
            }
            b && (b = CKEDITOR.tools.indexOf(h, function (a) {
                return a.name == b
            }));
            e ? h.splice(0, 0, a) : typeof b == "number" ? h.splice(b + 1, 0, j) : h.push(a)
        }
    }(),CKEDITOR.UI_SEPARATOR = "separator",CKEDITOR.config.toolbarLocation = "top",function () {
        function c(a) {
            this.editor = a;
            this.reset()
        }

        CKEDITOR.plugins.add("undo", {
            init: function (a) {
                function b(a) {
                    g.enabled && a.data.command.canUndo !== false && g.save()
                }

                function f() {
                    g.enabled = a.readOnly ? false : a.mode == "wysiwyg";
                    g.onChange()
                }

                var g = a.undoManager = new c(a), h = a.addCommand("undo", {
                    exec: function () {
                        if (g.undo()) {
                            a.selectionChange();
                            this.fire("afterUndo")
                        }
                    }, startDisabled: true, canUndo: false
                }), e = a.addCommand("redo", {
                    exec: function () {
                        if (g.redo()) {
                            a.selectionChange();
                            this.fire("afterRedo")
                        }
                    }, startDisabled: true, canUndo: false
                });
                a.setKeystroke([[CKEDITOR.CTRL + 90, "undo"], [CKEDITOR.CTRL + 89, "redo"], [CKEDITOR.CTRL + CKEDITOR.SHIFT + 90, "redo"]]);
                g.onChange = function () {
                    h.setState(g.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                    e.setState(g.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
                };
                a.on("beforeCommandExec", b);
                a.on("afterCommandExec", b);
                a.on("saveSnapshot", function (a) {
                    g.save(a.data && a.data.contentOnly)
                });
                a.on("contentDom", function () {
                    a.editable().on("keydown", function (a) {
                        a = a.data.getKey();
                        (a == 8 || a == 46) && g.type(a, 0)
                    });
                    a.editable().on("keypress", function (a) {
                        g.type(a.data.getKey(), 1)
                    })
                });
                a.on("beforeModeUnload", function () {
                    a.mode == "wysiwyg" && g.save(true)
                });
                a.on("mode", f);
                a.on("readOnly", f);
                if (a.ui.addButton) {
                    a.ui.addButton("Undo", {label: a.lang.undo.undo, command: "undo", toolbar: "undo,10"});
                    a.ui.addButton("Redo", {label: a.lang.undo.redo, command: "redo", toolbar: "undo,20"})
                }
                a.resetUndo = function () {
                    g.reset();
                    a.fire("saveSnapshot")
                };
                a.on("updateSnapshot", function () {
                    g.currentImage && g.update()
                });
                a.on("lockSnapshot", g.lock, g);
                a.on("unlockSnapshot", g.unlock, g)
            }
        });
        CKEDITOR.plugins.undo = {};
        var f = CKEDITOR.plugins.undo.Image = function (a) {
            this.editor = a;
            a.fire("beforeUndoImage");
            var b = a.getSnapshot(), c = b && a.getSelection();
            CKEDITOR.env.ie && b && (b = b.replace(/\s+data-cke-expando=".*?"/g, ""));
            this.contents = b;
            this.bookmarks = c && c.createBookmarks2(true);
            a.fire("afterUndoImage")
        }, b = /\b(?:href|src|name)="[^"]*?"/gi;
        f.prototype = {
            equalsContent: function (a) {
                var c = this.contents, a = a.contents;
                if (CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat)) {
                    c = c.replace(b, "");
                    a = a.replace(b, "")
                }
                return c != a ? false : true
            }, equalsSelection: function (a) {
                var b = this.bookmarks, a = a.bookmarks;
                if (b || a) {
                    if (!b || !a || b.length != a.length)return false;
                    for (var c = 0; c < b.length; c++) {
                        var f = b[c], h = a[c];
                        if (f.startOffset != h.startOffset || f.endOffset != h.endOffset || !CKEDITOR.tools.arrayCompare(f.start, h.start) || !CKEDITOR.tools.arrayCompare(f.end, h.end))return false
                    }
                }
                return true
            }
        };
        c.prototype = {
            type: function (a, b) {
                var c = !b && a != this.lastKeystroke, g = this.editor;
                if (!this.typing || b && !this.wasCharacter || c) {
                    var h = new f(g), e = this.snapshots.length;
                    CKEDITOR.tools.setTimeout(function () {
                        var a = g.getSnapshot();
                        CKEDITOR.env.ie && (a = a.replace(/\s+data-cke-expando=".*?"/g, ""));
                        if (h.contents != a && e == this.snapshots.length) {
                            this.typing = true;
                            this.save(false, h, false) || this.snapshots.splice(this.index + 1, this.snapshots.length - this.index - 1);
                            this.hasUndo = true;
                            this.hasRedo = false;
                            this.modifiersCount = this.typesCount = 1;
                            this.onChange()
                        }
                    }, 0, this)
                }
                this.lastKeystroke = a;
                if (this.wasCharacter = b) {
                    this.modifiersCount = 0;
                    this.typesCount++;
                    if (this.typesCount > 25) {
                        this.save(false, null, false);
                        this.typesCount = 1
                    } else setTimeout(function () {
                        g.fire("change")
                    }, 0)
                } else {
                    this.typesCount = 0;
                    this.modifiersCount++;
                    if (this.modifiersCount > 25) {
                        this.save(false, null, false);
                        this.modifiersCount = 1
                    } else setTimeout(function () {
                        g.fire("change")
                    }, 0)
                }
            }, reset: function () {
                this.lastKeystroke = 0;
                this.snapshots = [];
                this.index = -1;
                this.limit = this.editor.config.undoStackSize || 20;
                this.currentImage = null;
                this.hasRedo = this.hasUndo = false;
                this.locked = null;
                this.resetType()
            }, resetType: function () {
                this.typing = false;
                delete this.lastKeystroke;
                this.modifiersCount = this.typesCount = 0
            }, fireChange: function () {
                this.hasUndo = !!this.getNextImage(true);
                this.hasRedo = !!this.getNextImage(false);
                this.resetType();
                this.onChange()
            }, save: function (a, b, c) {
                if (this.locked)return false;
                var g = this.snapshots;
                b || (b = new f(this.editor));
                if (b.contents === false)return false;
                if (this.currentImage)if (b.equalsContent(this.currentImage)) {
                    if (a || b.equalsSelection(this.currentImage))return false
                } else this.editor.fire("change");
                g.splice(this.index + 1, g.length - this.index - 1);
                g.length == this.limit && g.shift();
                this.index = g.push(b) - 1;
                this.currentImage = b;
                c !== false && this.fireChange();
                return true
            }, restoreImage: function (a) {
                var b = this.editor, c;
                if (a.bookmarks) {
                    b.focus();
                    c = b.getSelection()
                }
                this.locked = 1;
                this.editor.loadSnapshot(a.contents);
                if (a.bookmarks)c.selectBookmarks(a.bookmarks); else if (CKEDITOR.env.ie) {
                    c = this.editor.document.getBody().$.createTextRange();
                    c.collapse(true);
                    c.select()
                }
                this.locked = 0;
                this.index = a.index;
                this.currentImage = this.snapshots[this.index];
                this.update();
                this.fireChange();
                b.fire("change")
            }, getNextImage: function (a) {
                var b = this.snapshots, c = this.currentImage, f;
                if (c)if (a)for (f = this.index - 1; f >= 0; f--) {
                    a = b[f];
                    if (!c.equalsContent(a)) {
                        a.index = f;
                        return a
                    }
                } else for (f = this.index + 1; f < b.length; f++) {
                    a = b[f];
                    if (!c.equalsContent(a)) {
                        a.index = f;
                        return a
                    }
                }
                return null
            }, redoable: function () {
                return this.enabled && this.hasRedo
            }, undoable: function () {
                return this.enabled && this.hasUndo
            }, undo: function () {
                if (this.undoable()) {
                    this.save(true);
                    var a = this.getNextImage(true);
                    if (a)return this.restoreImage(a), true
                }
                return false
            }, redo: function () {
                if (this.redoable()) {
                    this.save(true);
                    if (this.redoable()) {
                        var a = this.getNextImage(false);
                        if (a)return this.restoreImage(a), true
                    }
                }
                return false
            }, update: function (a) {
                if (!this.locked) {
                    a || (a = new f(this.editor));
                    for (var b = this.index, c = this.snapshots; b > 0 && this.currentImage.equalsContent(c[b - 1]);)b = b - 1;
                    c.splice(b, this.index - b + 1, a);
                    this.index = b;
                    this.currentImage = a
                }
            }, lock: function () {
                if (this.locked)this.locked.level++; else {
                    var a = new f(this.editor);
                    this.locked = {update: this.currentImage && this.currentImage.equalsContent(a) ? a : null, level: 1}
                }
            }, unlock: function () {
                if (this.locked && !--this.locked.level) {
                    var a = this.locked.update, b = new f(this.editor);
                    this.locked = null;
                    a && !a.equalsContent(b) && this.update(b)
                }
            }
        }
    }(),CKEDITOR.config.wsc_removeGlobalVariable = !0,CKEDITOR.plugins.add("wsc", {
        requires: "dialog",
        parseApi: function (c) {
            c.config.wsc_onFinish = typeof c.config.wsc_onFinish === "function" ? c.config.wsc_onFinish : function () {
            };
            c.config.wsc_onClose = typeof c.config.wsc_onClose === "function" ? c.config.wsc_onClose : function () {
            }
        },
        parseConfig: function (c) {
            c.config.wsc_customerId = c.config.wsc_customerId || CKEDITOR.config.wsc_customerId || "1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk";
            c.config.wsc_customDictionaryIds = c.config.wsc_customDictionaryIds || CKEDITOR.config.wsc_customDictionaryIds || "";
            c.config.wsc_userDictionaryName = c.config.wsc_userDictionaryName || CKEDITOR.config.wsc_userDictionaryName || "";
            c.config.wsc_customLoaderScript = c.config.wsc_customLoaderScript || CKEDITOR.config.wsc_customLoaderScript;
            CKEDITOR.config.wsc_cmd = c.config.wsc_cmd || CKEDITOR.config.wsc_cmd || "spell";
            CKEDITOR.config.wsc_version = CKEDITOR.version + " | %Rev%"
        },
        init: function (c) {
            this.parseConfig(c);
            this.parseApi(c);
            c.addCommand("checkspell", new CKEDITOR.dialogCommand("checkspell")).modes = {wysiwyg: !CKEDITOR.env.opera && !CKEDITOR.env.air && document.domain == window.location.hostname};
            typeof c.plugins.scayt == "undefined" && c.ui.addButton && c.ui.addButton("SpellChecker", {
                label: c.lang.wsc.toolbar,
                command: "checkspell",
                toolbar: "spellchecker,10"
            });
            CKEDITOR.dialog.add("checkspell", this.path + (CKEDITOR.env.ie && CKEDITOR.env.version <= 8 ? "dialogs/wsc_ie.js" : window.postMessage ? "dialogs/wsc.js" : "dialogs/wsc_ie.js"))
        }
    }),function () {
        function c(a) {
            var b = this.editor, c = a.document, f = c.body;
            (a = c.getElementById("cke_actscrpt")) && a.parentNode.removeChild(a);
            (a = c.getElementById("cke_shimscrpt")) && a.parentNode.removeChild(a);
            if (CKEDITOR.env.gecko) {
                f.contentEditable = false;
                if (CKEDITOR.env.version < 2E4) {
                    f.innerHTML = f.innerHTML.replace(/^.*<\!-- cke-content-start --\>/, "");
                    setTimeout(function () {
                        var a = new CKEDITOR.dom.range(new CKEDITOR.dom.document(c));
                        a.setStart(new CKEDITOR.dom.node(f), 0);
                        b.getSelection().selectRanges([a])
                    }, 0)
                }
            }
            f.contentEditable = true;
            if (CKEDITOR.env.ie) {
                f.hideFocus = true;
                f.disabled = true;
                f.removeAttribute("disabled")
            }
            delete this._.isLoadingData;
            this.$ = f;
            c = new CKEDITOR.dom.document(c);
            this.setup();
            if (CKEDITOR.env.ie) {
                c.getDocumentElement().addClass(c.$.compatMode);
                b.config.enterMode != CKEDITOR.ENTER_P && c.on("selectionchange", function () {
                    var a = c.getBody(), e = b.getSelection(), f = e && e.getRanges()[0];
                    f && (a.getHtml().match(/^<p>&nbsp;<\/p>$/i) && f.startContainer.equals(a)) && setTimeout(function () {
                        f = b.getSelection().getRanges()[0];
                        if (!f.startContainer.equals("body")) {
                            a.getFirst().remove(1);
                            f.moveToElementEditEnd(a);
                            f.select()
                        }
                    }, 0)
                })
            }
            try {
                b.document.$.execCommand("2D-position", false, true)
            } catch (h) {
            }
            try {
                b.document.$.execCommand("enableInlineTableEditing", false, !b.config.disableNativeTableHandles)
            } catch (e) {
            }
            if (b.config.disableObjectResizing)try {
                this.getDocument().$.execCommand("enableObjectResizing", false, false)
            } catch (j) {
                this.attachListener(this, CKEDITOR.env.ie ? "resizestart" : "resize", function (a) {
                    a.data.preventDefault()
                })
            }
            (CKEDITOR.env.gecko || CKEDITOR.env.ie && b.document.$.compatMode == "CSS1Compat") && this.attachListener(this, "keydown", function (a) {
                var c = a.data.getKeystroke();
                if (c == 33 || c == 34)if (CKEDITOR.env.ie)setTimeout(function () {
                    b.getSelection().scrollIntoView()
                }, 0); else if (b.window.$.innerHeight > this.$.offsetHeight) {
                    var e = b.createRange();
                    e[c == 33 ? "moveToElementEditStart" : "moveToElementEditEnd"](this);
                    e.select();
                    a.data.preventDefault()
                }
            });
            CKEDITOR.env.ie && this.attachListener(c, "blur", function () {
                try {
                    c.$.selection.empty()
                } catch (a) {
                }
            });
            b.document.getElementsByTag("title").getItem(0).data("cke-title", b.document.$.title);
            if (CKEDITOR.env.ie)b.document.$.title = this._.docTitle;
            CKEDITOR.tools.setTimeout(function () {
                b.fire("contentDom");
                if (this._.isPendingFocus) {
                    b.focus();
                    this._.isPendingFocus = false
                }
                setTimeout(function () {
                    b.fire("dataReady")
                }, 0);
                CKEDITOR.env.ie && setTimeout(function () {
                    if (b.document) {
                        var a = b.document.$.body;
                        a.runtimeStyle.marginBottom = "0px";
                        a.runtimeStyle.marginBottom = ""
                    }
                }, 1E3)
            }, 0, this)
        }

        function f() {
            var a = [];
            if (CKEDITOR.document.$.documentMode >= 8) {
                a.push("html.CSS1Compat [contenteditable=false]{min-height:0 !important}");
                var b = [], c;
                for (c in CKEDITOR.dtd.$removeEmpty)b.push("html.CSS1Compat " + c + "[contenteditable=false]");
                a.push(b.join(",") + "{display:inline-block}")
            } else if (CKEDITOR.env.gecko) {
                a.push("html{height:100% !important}");
                a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}")
            }
            a.push("html{cursor:text;*cursor:auto}");
            a.push("img,input,textarea{cursor:default}");
            return a.join("\n")
        }

        CKEDITOR.plugins.add("wysiwygarea", {
            init: function (a) {
                a.config.fullPage && a.addFeature({
                    allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]",
                    requiredContent: "body"
                });
                a.addMode("wysiwyg", function (c) {
                    function f(e) {
                        e && e.removeListener();
                        a.editable(new b(a, h.$.contentWindow.document.body));
                        a.setData(a.getData(1), c)
                    }

                    var g = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();", g = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent(g) + "}())" : "", h = CKEDITOR.dom.element.createFromHtml('<iframe src="' + g + '" frameBorder="0"></iframe>');
                    h.setStyles({width: "100%", height: "100%"});
                    h.addClass("cke_wysiwyg_frame cke_reset");
                    var e = a.ui.space("contents");
                    e.append(h);
                    if (g = CKEDITOR.env.ie || CKEDITOR.env.gecko)h.on("load", f);
                    var j = a.title, k = a.lang.common.editorHelp;
                    if (j) {
                        CKEDITOR.env.ie && (j = j + (", " + k));
                        h.setAttribute("title", j)
                    }
                    var j = CKEDITOR.tools.getNextId(), n = CKEDITOR.dom.element.createFromHtml('<span id="' + j + '" class="cke_voice_label">' + k + "</span>");
                    e.append(n, 1);
                    a.on("beforeModeUnload", function (a) {
                        a.removeListener();
                        n.remove()
                    });
                    h.setAttributes({"aria-describedby": j, tabIndex: a.tabIndex, allowTransparency: "true"});
                    !g && f();
                    if (CKEDITOR.env.webkit) {
                        g = function () {
                            e.setStyle("width", "100%");
                            h.hide();
                            h.setSize("width", e.getSize("width"));
                            e.removeStyle("width");
                            h.show()
                        };
                        h.setCustomData("onResize", g);
                        CKEDITOR.document.getWindow().on("resize", g)
                    }
                    a.fire("ariaWidget", h)
                })
            }
        });
        var b = CKEDITOR.tools.createClass({
            $: function (a) {
                this.base.apply(this, arguments);
                this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function (a) {
                    CKEDITOR.tools.setTimeout(c, 0, this, a)
                }, this);
                this._.docTitle = this.getWindow().getFrame().getAttribute("title")
            }, base: CKEDITOR.editable, proto: {
                setData: function (a, b) {
                    var c = this.editor;
                    if (b) {
                        this.setHtml(a);
                        c.fire("dataReady")
                    } else {
                        this._.isLoadingData = true;
                        c._.dataStore = {id: 1};
                        var g = c.config, h = g.fullPage, e = g.docType, j = CKEDITOR.tools.buildStyleHtml(f()).replace(/<style>/, '<style data-cke-temp="1">');
                        h || (j = j + CKEDITOR.tools.buildStyleHtml(c.config.contentsCss));
                        var k = g.baseHref ? '<base href="' + g.baseHref + '" data-cke-temp="1" />' : "";
                        h && (a = a.replace(/<!DOCTYPE[^>]*>/i, function (a) {
                            c.docType = e = a;
                            return ""
                        }).replace(/<\?xml\s[^\?]*\?>/i, function (a) {
                            c.xmlDeclaration = a;
                            return ""
                        }));
                        a = c.dataProcessor.toHtml(a);
                        if (h) {
                            /<body[\s|>]/.test(a) || (a = "<body>" + a);
                            /<html[\s|>]/.test(a) || (a = "<html>" + a + "</html>");
                            /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$&<title></title>")) : a = a.replace(/<html[^>]*>/, "$&<head><title></title></head>");
                            k && (a = a.replace(/<head>/, "$&" + k));
                            a = a.replace(/<\/head\s*>/, j + "$&");
                            a = e + a
                        } else a = g.docType + '<html dir="' + g.contentsLangDirection + '" lang="' + (g.contentsLanguage || c.langCode) + '"><head><title>' + this._.docTitle + "</title>" + k + j + "</head><body" + (g.bodyId ? ' id="' + g.bodyId + '"' : "") + (g.bodyClass ? ' class="' + g.bodyClass + '"' : "") + ">" + a + "</body></html>";
                        if (CKEDITOR.env.gecko) {
                            a = a.replace(/<body/, '<body contenteditable="true" ');
                            CKEDITOR.env.version < 2E4 && (a = a.replace(/<body[^>]*>/, "$&<\!-- cke-content-start --\>"))
                        }
                        g = '<script id="cke_actscrpt" type="text/javascript"' + (CKEDITOR.env.ie ? ' defer="defer" ' : "") + ">var wasLoaded=0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" +
                        this._.frameLoadedHandler + ",window);wasLoaded=1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "<\/script>";
                        CKEDITOR.env.ie && CKEDITOR.env.version < 9 && (g = g + '<script id="cke_shimscrpt">window.parent.CKEDITOR.tools.enableHtml5Elements(document)<\/script>');
                        a = a.replace(/(?=\s*<\/(:?head)>)/, g);
                        this.clearCustomData();
                        this.clearListeners();
                        c.fire("contentDomUnload");
                        var n = this.getDocument();
                        try {
                            n.write(a)
                        } catch (o) {
                            setTimeout(function () {
                                n.write(a)
                            }, 0)
                        }
                    }
                }, getData: function (a) {
                    if (a)return this.getHtml();
                    var a = this.editor, b = a.config, c = b.fullPage, f = c && a.docType, h = c && a.xmlDeclaration, e = this.getDocument(), c = c ? e.getDocumentElement().getOuterHtml() : e.getBody().getHtml();
                    CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/<br>(?=\s*(:?$|<\/body>))/, ""));
                    c = a.dataProcessor.toDataFormat(c);
                    h && (c = h + "\n" + c);
                    f && (c = f + "\n" + c);
                    return c
                }, focus: function () {
                    this._.isLoadingData ? this._.isPendingFocus = true : b.baseProto.focus.call(this)
                }, detach: function () {
                    var a = this.editor, c = a.document, f = a.window.getFrame();
                    b.baseProto.detach.call(this);
                    this.clearCustomData();
                    c.getDocumentElement().clearCustomData();
                    f.clearCustomData();
                    CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);
                    (c = f.removeCustomData("onResize")) && c.removeListener();
                    a.fire("contentDomUnload");
                    f.remove()
                }
            }
        })
    }(),CKEDITOR.config.disableObjectResizing = !1,CKEDITOR.config.disableNativeTableHandles = !0,CKEDITOR.config.disableNativeSpellChecker = !0,CKEDITOR.config.contentsCss = CKEDITOR.basePath + "contents.css",CKEDITOR.config.plugins = "dialogui,dialog,a11yhelp,about,basicstyles,blockquote,clipboard,panel,floatpanel,menu,contextmenu,elementspath,indent,indentlist,list,enterkey,entities,popup,filebrowser,floatingspace,listblock,button,richcombo,format,horizontalrule,htmlwriter,image,fakeobjects,link,magicline,maximize,pastefromword,pastetext,removeformat,resize,menubutton,scayt,sourcearea,specialchar,stylescombo,tab,table,tabletools,toolbar,undo,wsc,wysiwygarea",CKEDITOR.config.skin = "moono",function () {
        var c = function (c, b) {
            for (var a = CKEDITOR.getUrl("plugins/" + b), c = c.split(","), d = 0; d < c.length; d++)CKEDITOR.skin.icons[c[d]] = {
                path: a,
                offset: -c[++d],
                bgsize: c[++d]
            }
        };
        CKEDITOR.env.hidpi ? c("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,bgcolor,384,,textcolor,408,,creatediv,432,,docprops-rtl,456,,docprops,480,,find-rtl,504,,find,528,,replace,552,,flash,576,,button,600,,checkbox,624,,form,648,,hiddenfield,672,,imagebutton,696,,radio,720,,select-rtl,744,,select,768,,textarea-rtl,792,,textarea,816,,textfield-rtl,840,,textfield,864,,horizontalrule,888,,iframe,912,,image,936,,image2,960,,indent-rtl,984,,indent,1008,,outdent-rtl,1032,,outdent,1056,,justifyblock,1080,,justifycenter,1104,,justifyleft,1128,,justifyright,1152,,language,1176,,anchor-rtl,1200,,anchor,1224,,link,1248,,unlink,1272,,bulletedlist-rtl,1296,,bulletedlist,1320,,numberedlist-rtl,1344,,numberedlist,1368,,mathjax,1392,,maximize,1416,,newpage-rtl,1440,,newpage,1464,,pagebreak-rtl,1488,,pagebreak,1512,,pastefromword-rtl,1536,,pastefromword,1560,,pastetext-rtl,1584,,pastetext,1608,,placeholder,1632,,preview-rtl,1656,,preview,1680,,print,1704,,removeformat,1728,,save,1752,,scayt,1776,,selectall,1800,,showblocks-rtl,1824,,showblocks,1848,,smiley,1872,,source-rtl,1896,,source,1920,,sourcedialog-rtl,1944,,sourcedialog,1968,,specialchar,1992,,table,2016,,templates-rtl,2040,,templates,2064,,uicolor,2088,,redo-rtl,2112,,redo,2136,,undo-rtl,2160,,undo,2184,,spellchecker,2208,", "icons_hidpi.png") : c("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,bgcolor,384,auto,textcolor,408,auto,creatediv,432,auto,docprops-rtl,456,auto,docprops,480,auto,find-rtl,504,auto,find,528,auto,replace,552,auto,flash,576,auto,button,600,auto,checkbox,624,auto,form,648,auto,hiddenfield,672,auto,imagebutton,696,auto,radio,720,auto,select-rtl,744,auto,select,768,auto,textarea-rtl,792,auto,textarea,816,auto,textfield-rtl,840,auto,textfield,864,auto,horizontalrule,888,auto,iframe,912,auto,image,936,auto,image2,960,auto,indent-rtl,984,auto,indent,1008,auto,outdent-rtl,1032,auto,outdent,1056,auto,justifyblock,1080,auto,justifycenter,1104,auto,justifyleft,1128,auto,justifyright,1152,auto,language,1176,auto,anchor-rtl,1200,auto,anchor,1224,auto,link,1248,auto,unlink,1272,auto,bulletedlist-rtl,1296,auto,bulletedlist,1320,auto,numberedlist-rtl,1344,auto,numberedlist,1368,auto,mathjax,1392,auto,maximize,1416,auto,newpage-rtl,1440,auto,newpage,1464,auto,pagebreak-rtl,1488,auto,pagebreak,1512,auto,pastefromword-rtl,1536,auto,pastefromword,1560,auto,pastetext-rtl,1584,auto,pastetext,1608,auto,placeholder,1632,auto,preview-rtl,1656,auto,preview,1680,auto,print,1704,auto,removeformat,1728,auto,save,1752,auto,scayt,1776,auto,selectall,1800,auto,showblocks-rtl,1824,auto,showblocks,1848,auto,smiley,1872,auto,source-rtl,1896,auto,source,1920,auto,sourcedialog-rtl,1944,auto,sourcedialog,1968,auto,specialchar,1992,auto,table,2016,auto,templates-rtl,2040,auto,templates,2064,auto,uicolor,2088,auto,redo-rtl,2112,auto,redo,2136,auto,undo-rtl,2160,auto,undo,2184,auto,spellchecker,2208,auto", "icons.png")
    }()
})();