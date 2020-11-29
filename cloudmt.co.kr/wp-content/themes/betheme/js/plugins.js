/**
 * Before After
 * TwentyTwenty
 * http://zurb.com/playground/twentytwenty
 */

! function(t) {
    t.fn.twentytwenty = function(e) {
        var e = t.extend({
            default_offset_pct: .5,
            orientation: "horizontal"
        }, e);
        return this.each(function() {
            var n = e.default_offset_pct,
                i = t(this),
                a = e.orientation,
                s = "vertical" === a ? "down" : "left",
                d = "vertical" === a ? "up" : "right";
            i.wrap("<div class='twentytwenty-wrapper twentytwenty-" + a + "'></div>"), i.append("<div class='twentytwenty-overlay'></div>");
            var r = i.find("img:first"),
                w = i.find("img:last");
            i.append("<div class='twentytwenty-handle'></div>");
            var c = i.find(".twentytwenty-handle");
            c.append("<span class='twentytwenty-" + s + "-arrow'></span>"), c.append("<span class='twentytwenty-" + d + "-arrow'></span>"), i.addClass("twentytwenty-container"), r.addClass("twentytwenty-before"), w.addClass("twentytwenty-after");
            var o = i.find(".twentytwenty-overlay");
            o.append("<div class='twentytwenty-before-label'></div>"), o.append("<div class='twentytwenty-after-label'></div>");
            var f = function(t) {
                    var e = r.width(),
                        n = r.height();
                    return {
                        w: e + "px",
                        h: n + "px",
                        cw: t * e + "px",
                        ch: t * n + "px"
                    }
                },
                l = function(t) {
                    "vertical" === a ? r.css("clip", "rect(0," + t.w + "," + t.ch + ",0)") : r.css("clip", "rect(0," + t.cw + "," + t.h + ",0)"), i.css("height", t.h)
                },
                v = function(t) {
                    var e = f(t);
                    c.css("vertical" === a ? "top" : "left", "vertical" === a ? e.ch : e.cw), l(e)
                };
            t(window).on("resize.twentytwenty", function(t) {
                v(n)
            });
            var p = 0,
                y = 0;
            c.on("movestart", function(t) {
                (t.distX > t.distY && t.distX < -t.distY || t.distX < t.distY && t.distX > -t.distY) && "vertical" !== a ? t.preventDefault() : (t.distX < t.distY && t.distX < -t.distY || t.distX > t.distY && t.distX > -t.distY) && "vertical" === a && t.preventDefault(), i.addClass("active"), p = i.offset().left, offsetY = i.offset().top, y = r.width(), imgHeight = r.height()
            }), c.on("moveend", function(t) {
                i.removeClass("active")
            }), c.on("move", function(t) {
                i.hasClass("active") && (n = "vertical" === a ? (t.pageY - offsetY) / imgHeight : (t.pageX - p) / y, 0 > n && (n = 0), n > 1 && (n = 1), v(n))
            }), i.find("img").on("mousedown", function(t) {
                t.preventDefault()
            }), t(window).trigger("resize.twentytwenty")
        })
    }
}(jQuery);

/**
 * Event Move
 * required for: TwentyTwenty
 * 1.3.6 | Stephen Band
 */

! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(t, e) {
    function n(t) {
        function e(t) {
            a ? (n(), O(e), i = !0, a = !1) : i = !1
        }
        var n = t,
            a = !1,
            i = !1;
        this.kick = function(t) {
            a = !0, i || e()
        }, this.end = function(t) {
            var e = n;
            t && (i ? (n = a ? function() {
                e(), t()
            } : t, a = !0) : t())
        }
    }

    function a() {
        return !0
    }

    function i() {
        return !1
    }

    function o(t) {
        t.preventDefault()
    }

    function r(t) {
        z[t.target.tagName.toLowerCase()] || t.preventDefault()
    }

    function u(t) {
        return 1 === t.which && !t.ctrlKey && !t.altKey
    }

    function c(t, e) {
        var n, a;
        if (t.identifiedTouch) return t.identifiedTouch(e);
        for (n = -1, a = t.length; ++n < a;)
            if (t[n].identifier === e) return t[n]
    }

    function d(t, e) {
        var n = c(t.changedTouches, e.identifier);
        if (n && (n.pageX !== e.pageX || n.pageY !== e.pageY)) return n
    }

    function m(t) {
        var e;
        u(t) && (e = {
            target: t.target,
            startX: t.pageX,
            startY: t.pageY,
            timeStamp: t.timeStamp
        }, K(document, Q.move, f, e), K(document, Q.cancel, s, e))
    }

    function f(t) {
        var e = t.data;
        X(t, e, t, v)
    }

    function s(t) {
        v()
    }

    function v() {
        L(document, Q.move, f), L(document, Q.cancel, s)
    }

    function p(t) {
        var e, n;
        z[t.target.tagName.toLowerCase()] || (e = t.changedTouches[0], n = {
            target: e.target,
            startX: e.pageX,
            startY: e.pageY,
            timeStamp: t.timeStamp,
            identifier: e.identifier
        }, K(document, B.move + "." + e.identifier, g, n), K(document, B.cancel + "." + e.identifier, h, n))
    }

    function g(t) {
        var e = t.data,
            n = d(t, e);
        n && X(t, e, n, l)
    }

    function h(t) {
        var e = t.data,
            n = c(t.changedTouches, e.identifier);
        n && l(e.identifier)
    }

    function l(t) {
        L(document, "." + t, g), L(document, "." + t, h)
    }

    function X(t, e, n, a) {
        var i = n.pageX - e.startX,
            o = n.pageY - e.startY;
        C * C > i * i + o * o || y(t, e, n, i, o, a)
    }

    function Y() {
        return this._handled = a, !1
    }

    function w(t) {
        t._handled()
    }

    function y(t, e, n, a, i, o) {
        var r, u;
        e.target;
        r = t.targetTouches, u = t.timeStamp - e.timeStamp, e.type = "movestart", e.distX = a, e.distY = i, e.deltaX = a, e.deltaY = i, e.pageX = n.pageX, e.pageY = n.pageY, e.velocityX = a / u, e.velocityY = i / u, e.targetTouches = r, e.finger = r ? r.length : 1, e._handled = Y, e._preventTouchmoveDefault = function() {
            t.preventDefault()
        }, N(e.target, e), o(e.identifier)
    }

    function T(t) {
        var e = t.data.timer;
        t.data.touch = t, t.data.timeStamp = t.timeStamp, e.kick()
    }

    function S(t) {
        var e = t.data.event,
            n = t.data.timer;
        k(), F(e, n, function() {
            setTimeout(function() {
                L(e.target, "click", i)
            }, 0)
        })
    }

    function k(t) {
        L(document, Q.move, T), L(document, Q.end, S)
    }

    function _(t) {
        var e = t.data.event,
            n = t.data.timer,
            a = d(t, e);
        a && (t.preventDefault(), e.targetTouches = t.targetTouches, t.data.touch = a, t.data.timeStamp = t.timeStamp, n.kick())
    }

    function q(t) {
        var e = t.data.event,
            n = t.data.timer,
            a = c(t.changedTouches, e.identifier);
        a && (A(e), F(e, n))
    }

    function A(t) {
        L(document, "." + t.identifier, _), L(document, "." + t.identifier, q)
    }

    function D(t, e, n, a) {
        var i = n - t.timeStamp;
        t.type = "move", t.distX = e.pageX - t.startX, t.distY = e.pageY - t.startY, t.deltaX = e.pageX - t.pageX, t.deltaY = e.pageY - t.pageY, t.velocityX = .3 * t.velocityX + .7 * t.deltaX / i, t.velocityY = .3 * t.velocityY + .7 * t.deltaY / i, t.pageX = e.pageX, t.pageY = e.pageY
    }

    function F(t, e, n) {
        e.end(function() {
            return t.type = "moveend", N(t.target, t), n && n()
        })
    }

    function R(t, e, n) {
        return K(this, "movestart.move", w), !0
    }

    function x(t) {
        return L(this, "dragstart drag", o), L(this, "mousedown touchstart", r), L(this, "movestart", w), !0
    }

    function b(t) {
        "move" !== t.namespace && "moveend" !== t.namespace && (K(this, "dragstart." + t.guid + " drag." + t.guid, o, e, t.selector), K(this, "mousedown." + t.guid, r, e, t.selector))
    }

    function j(t) {
        "move" !== t.namespace && "moveend" !== t.namespace && (L(this, "dragstart." + t.guid + " drag." + t.guid), L(this, "mousedown." + t.guid))
    }
    var C = 6,
        K = t.event.add,
        L = t.event.remove,
        N = function(e, n, a) {
            t.event.trigger(n, a, e)
        },
        O = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t, e) {
                return window.setTimeout(function() {
                    t()
                }, 25)
            }
        }(),
        z = {
            textarea: !0,
            input: !0,
            select: !0,
            button: !0
        },
        Q = {
            move: "mousemove",
            cancel: "mouseup dragstart",
            end: "mouseup"
        },
        B = {
            move: "touchmove",
            cancel: "touchend",
            end: "touchend"
        };
    t.event.special.movestart = {
        setup: R,
        teardown: x,
        add: b,
        remove: j,
        _default: function(t) {
            function a(e) {
                D(o, r.touch, r.timeStamp), N(t.target, o)
            }
            var o, r;
            t._handled() && (o = {
                target: t.target,
                startX: t.startX,
                startY: t.startY,
                pageX: t.pageX,
                pageY: t.pageY,
                distX: t.distX,
                distY: t.distY,
                deltaX: t.deltaX,
                deltaY: t.deltaY,
                velocityX: t.velocityX,
                velocityY: t.velocityY,
                timeStamp: t.timeStamp,
                identifier: t.identifier,
                targetTouches: t.targetTouches,
                finger: t.finger
            }, r = {
                event: o,
                timer: new n(a),
                touch: e,
                timeStamp: e
            }, t.identifier === e ? (K(t.target, "click", i), K(document, Q.move, T, r), K(document, Q.end, S, r)) : (t._preventTouchmoveDefault(), K(document, B.move + "." + t.identifier, _, r), K(document, B.end + "." + t.identifier, q, r)))
        }
    }, t.event.special.move = {
        setup: function() {
            K(this, "movestart.move", t.noop)
        },
        teardown: function() {
            L(this, "movestart.move", t.noop)
        }
    }, t.event.special.moveend = {
        setup: function() {
            K(this, "movestart.moveend", t.noop)
        },
        teardown: function() {
            L(this, "movestart.moveend", t.noop)
        }
    }, K(document, "mousedown.move", m), K(document, "touchstart.move", p), "function" == typeof Array.prototype.indexOf && ! function(t, e) {
        for (var n = ["changedTouches", "targetTouches"], a = n.length; a--;) - 1 === t.event.props.indexOf(n[a]) && t.event.props.push(n[a])
    }(t)
});

/**
 * Chart
 * easyPieChart
 * 2.1.3 | Robert Fleischmann <rendro87@gmail.com> (http://robert-fleischmann.de)
 */

! function(a, b) {
    "object" == typeof exports ? module.exports = b(require("jquery")) : "function" == typeof define && define.amd ? define("EasyPieChart", ["jquery"], b) : b(a.jQuery)
}(this, function(a) {
    var b = function(a, b) {
            var c, d = document.createElement("canvas");
            "undefined" != typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(d);
            var e = d.getContext("2d");
            d.width = d.height = b.size, a.appendChild(d);
            var f = 1;
            window.devicePixelRatio > 1 && (f = window.devicePixelRatio, d.style.width = d.style.height = [b.size, "px"].join(""), d.width = d.height = b.size * f, e.scale(f, f)), e.translate(b.size / 2, b.size / 2), e.rotate((-0.5 + b.rotate / 180) * Math.PI);
            var g = (b.size - b.lineWidth) / 2;
            b.scaleColor && b.scaleLength && (g -= b.scaleLength + 2), Date.now = Date.now || function() {
                return +new Date
            };
            var h = function(a, b, c) {
                    c = Math.min(Math.max(-1, c || 0), 1);
                    var d = 0 >= c ? !0 : !1;
                    e.beginPath(), e.arc(0, 0, g, 0, 2 * Math.PI * c, d), e.strokeStyle = a, e.lineWidth = b, e.stroke()
                },
                i = function() {
                    var a, c, d = 24;
                    e.lineWidth = 1, e.fillStyle = b.scaleColor, e.save();
                    for (var d = 24; d > 0; --d) 0 === d % 6 ? (c = b.scaleLength, a = 0) : (c = .6 * b.scaleLength, a = b.scaleLength - c), e.fillRect(-b.size / 2 + a, 0, c, 1), e.rotate(Math.PI / 12);
                    e.restore()
                },
                j = function() {
                    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a) {
                        window.setTimeout(a, 1e3 / 60)
                    }
                }(),
                k = function() {
                    b.scaleColor && i(), b.trackColor && h(b.trackColor, b.lineWidth, 1)
                };
            this.clear = function() {
                e.clearRect(b.size / -2, b.size / -2, b.size, b.size)
            }, this.draw = function(a) {
                b.scaleColor || b.trackColor ? e.getImageData && e.putImageData ? c ? e.putImageData(c, 0, 0) : (k(), c = e.getImageData(0, 0, b.size * f, b.size * f)) : (this.clear(), k()) : this.clear(), e.lineCap = b.lineCap;
                var d;
                d = "function" == typeof b.barColor ? b.barColor(a) : b.barColor, h(d, b.lineWidth, a / 100)
            }.bind(this), this.animate = function(a, c) {
                var d = Date.now();
                b.onStart(a, c);
                var e = function() {
                    var f = Math.min(Date.now() - d, b.animate),
                        g = b.easing(this, f, a, c - a, b.animate);
                    this.draw(g), b.onStep(a, c, g), f >= b.animate ? b.onStop(a, c) : j(e)
                }.bind(this);
                j(e)
            }.bind(this)
        },
        c = function(a, c) {
            var d = {
                barColor: "#ef1e25",
                trackColor: "#f9f9f9",
                scaleColor: "#dfe0e0",
                scaleLength: 5,
                lineCap: "round",
                lineWidth: 3,
                size: 110,
                rotate: 0,
                animate: 1e3,
                easing: function(a, b, c, d, e) {
                    return b /= e / 2, 1 > b ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
                },
                onStart: function() {},
                onStep: function() {},
                onStop: function() {}
            };
            if ("undefined" != typeof b) d.renderer = b;
            else {
                if ("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
                d.renderer = SVGRenderer
            }
            var e = {},
                f = 0,
                g = function() {
                    this.el = a, this.options = e;
                    for (var b in d) d.hasOwnProperty(b) && (e[b] = c && "undefined" != typeof c[b] ? c[b] : d[b], "function" == typeof e[b] && (e[b] = e[b].bind(this)));
                    e.easing = "string" == typeof e.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[e.easing]) ? jQuery.easing[e.easing] : d.easing, this.renderer = new e.renderer(a, e), this.renderer.draw(f), a.dataset && a.dataset.percent ? this.update(parseFloat(a.dataset.percent)) : a.getAttribute && a.getAttribute("data-percent") && this.update(parseFloat(a.getAttribute("data-percent")))
                }.bind(this);
            this.update = function(a) {
                return a = parseFloat(a), e.animate ? this.renderer.animate(f, a) : this.renderer.draw(a), f = a, this
            }.bind(this), g()
        };
    a.fn.easyPieChart = function(b) {
        return this.each(function() {
            var d;
            a.data(this, "easyPieChart") || (d = a.extend({}, b, a(this).data()), a.data(this, "easyPieChart", new c(this, d)))
        })
    }
});

/**
 * Countdown
 * downCount
 * Sonny T. <hi@sonnyt.com>, sonnyt.com
 */

(function(e) {
    e.fn.downCount = function(t, n) {
        function o() {
            var e = new Date(r.date),
                t = s();
            var o = e - t;
            if (o < 0) {
                clearInterval(u);
                if (n && typeof n === "function") n();
                return
            }
            var a = 1e3,
                f = a * 60,
                l = f * 60,
                c = l * 24;
            var h = Math.floor(o / c),
                p = Math.floor(o % c / l),
                d = Math.floor(o % l / f),
                v = Math.floor(o % f / a);
            h = String(h).length >= 2 ? h : "0" + h;
            p = String(p).length >= 2 ? p : "0" + p;
            d = String(d).length >= 2 ? d : "0" + d;
            v = String(v).length >= 2 ? v : "0" + v;
            var m = h === 1 ? "day" : "days",
                g = p === 1 ? "hour" : "hours",
                y = d === 1 ? "minute" : "minutes",
                b = v === 1 ? "second" : "seconds";
            i.find(".days").text(h);
            i.find(".hours").text(p);
            i.find(".minutes").text(d);
            i.find(".seconds").text(v);
            i.find(".days_ref").text(m);
            i.find(".hours_ref").text(g);
            i.find(".minutes_ref").text(y);
            i.find(".seconds_ref").text(b)
        }
        var r = e.extend({
            date: null,
            offset: null
        }, t);
        if (!r.date) {
            e.error("Date is not defined.")
        }
        if (!Date.parse(r.date)) {
            e.error("Incorrect date format, it should look like this, 12/24/2012 12:00:00.")
        }
        var i = this;
        var s = function() {
            var e = new Date;
            var t = e.getTime() + e.getTimezoneOffset() * 6e4;
            var n = new Date(t + 36e5 * r.offset);
            return n
        };
        var u = setInterval(o, 1e3)
    }
})(jQuery);

/**
 * Greyscale
 * Black & White
 * 0.3.7 |  Gianluca Guarini | http://www.gianlucaguarini.com/
 */

! function(a) {
    a.fn.extend({
        BlackAndWhite: function(b) {
            "use strict";
            var c = this,
                d = a.extend({
                    hoverEffect: !0,
                    webworkerPath: !1,
                    invertHoverEffect: !1,
                    speed: 500,
                    onImageReady: null,
                    intensity: 1
                }, b),
                e = d.hoverEffect,
                f = d.webworkerPath,
                g = d.invertHoverEffect,
                h = "number" == typeof d.intensity && d.intensity < 1 && d.intensity > 0 ? d.intensity : 1,
                i = a.isPlainObject(d.speed) ? d.speed.fadeIn : d.speed,
                j = a.isPlainObject(d.speed) ? d.speed.fadeOut : d.speed,
                k = a(window),
                l = ".BlackAndWhite",
                m = (document.all && !window.opera && window.XMLHttpRequest ? !0 : !1, " -webkit- -moz- -o- -ms- ".split(" ")),
                n = {},
                o = function(a) {
                    if (n[a] || "" === n[a]) return n[a] + a;
                    var b = document.createElement("div"),
                        c = ["", "Moz", "Webkit", "O", "ms", "Khtml"];
                    for (var d in c)
                        if ("undefined" != typeof b.style[c[d] + a]) return n[a] = c[d], c[d] + a;
                    return a.toLowerCase()
                },
                p = function() {
                    var a = document.createElement("div");
                    return a.style.cssText = m.join("filter:blur(2px); "), !!a.style.length && (void 0 === document.documentMode || document.documentMode > 9)
                }(),
                q = !!document.createElement("canvas").getContext,
                r = function() {
                    return "undefined" != typeof Worker ? !0 : !1
                }(),
                s = o("Filter"),
                t = [],
                u = r && f ? new Worker(f + "BnWWorker.js") : !1,
                v = function(b) {
                    a(b.currentTarget).find(".BWfade").stop(!0, !0).animate({
                        opacity: g ? 0 : 1
                    }, j)
                },
                w = function(b) {
                    a(b.currentTarget).find(".BWfade").stop(!0, !0).animate({
                        opacity: g ? 1 : 0
                    }, i)
                },
                x = function(a) {
                    "function" == typeof d.onImageReady && d.onImageReady(a)
                },
                y = function(a) {
                    u && q && !p && !a && z()
                },
                z = function() {
                    return t.length ? (u.postMessage({
                        imgData: t[0].imageData,
                        intensity: h
                    }), void(u.onmessage = function(a) {
                        t[0].ctx.putImageData(a.data, 0, 0), x(t[0].img), t.splice(0, 1), z()
                    })) : (u.terminate && u.terminate(), void(u.close && u.close()))
                },
                A = function(a) {
                    return a.complete || "undefined" != typeof a.naturalWidth && a.naturalWidth
                },
                B = function(a, b, c, d) {
                    var e = b.getContext("2d"),
                        f = 0;
                    e.drawImage(a, 0, 0, c, d);
                    var g = e.getImageData(0, 0, c, d),
                        i = g.data,
                        j = i.length;
                    if (u) t.push({
                        imageData: g,
                        ctx: e,
                        img: a
                    });
                    else {
                        for (; j > f; f += 4) {
                            var k = .3 * i[f] + .59 * i[f + 1] + .11 * i[f + 2];
                            i[f] = ~~(k * h + i[f] * (1 - h)), i[f + 1] = ~~(k * h + i[f + 1] * (1 - h)), i[f + 2] = ~~(k * h + i[f + 2] * (1 - h))
                        }
                        e.putImageData(g, 0, 0), x(a)
                    }
                },
                C = function(b, c) {
                    var d, e = b[0],
                        f = (e.src, b.position()),
                        i = {
                            top: f.top,
                            left: f.left,
                            position: "absolute",
                            "-webkit-transform": "translate3d(0,0,0)",
                            opacity: g ? 0 : 1
                        };
                    e.crossOrigin = "anonymous", q && !p ? (d = a('<canvas width="' + e.naturalWidth + '" height="' + e.naturalHeight + '" class="BWfade"></canvas>'), i.width = b.width(), i.height = b.height(), B(e, d.get(0), e.naturalWidth, e.naturalHeight)) : (q ? i[s] = "grayscale(" + 100 * h + "%)" : i.filter = "progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)", d = b.clone().addClass("BWFilter BWfade"), x(e)), d.css(i).prependTo(c), !a.support.opacity && g && d.animate({
                        opacity: 0
                    }, 0)
                },
                D = function() {
                    c.each(function(b, c) {
                        var d = a(c).find("img"),
                            e = a(d).width(),
                            f = a(d).height();
                        a(this).find("canvas").css({
                            width: e,
                            height: f
                        })
                    })
                },
                E = function() {
                    var b = c.find("img").filter(function() {
                        return !a(this).data("_b&w")
                    }).length;
                    c.each(function(c, d) {
                        var e = a(d),
                            f = e.find("img");
                        f.data("_b&w") || (A(f[0]) ? (b--, C(f, e)) : f.on("load", function() {
                            return f.data("_b&w_loaded") || !f[0].complete ? void setTimeout(function() {
                                f.load()
                            }, 20) : (C(f, e), f.data("_b&w_loaded", !0), b--, void y(b))
                        }).load(), f.data("_b&w", !0))
                    }), y(b), e && c.unbind(l).on("mouseleave" + l, v).on("mouseenter" + l, w), q && !p && k.unbind(l).on("resize" + l + " orientationchange" + l, D)
                },
                F = function() {
                    c.off(l), k.off(l)
                };
            return E(), {
                destroy: F
            }
        }
    })
}(jQuery);

/**
 * imagesLoaded
 * required for: Isotope
 * 4.1.4 | http://imagesloaded.desandro.com/
 */

! function(e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, function() {
    function e() {}
    var t = e.prototype;
    return t.on = function(e, t) {
        if (e && t) {
            var i = this._events = this._events || {},
                n = i[e] = i[e] || [];
            return n.indexOf(t) == -1 && n.push(t), this
        }
    }, t.once = function(e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {},
                n = i[e] = i[e] || {};
            return n[t] = !0, this
        }
    }, t.off = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var n = i.indexOf(t);
            return n != -1 && i.splice(n, 1), this
        }
    }, t.emitEvent = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            i = i.slice(0), t = t || [];
            for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
                var r = i[o],
                    s = n && n[r];
                s && (this.off(e, r), delete n[r]), r.apply(this, t)
            }
            return this
        }
    }, t.allOff = function() {
        delete this._events, delete this._onceEvents
    }, e
}),
function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
        return t(e, i)
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
}("undefined" != typeof window ? window : this, function(e, t) {
    function i(e, t) {
        for (var i in t) e[i] = t[i];
        return e
    }

    function n(e) {
        if (Array.isArray(e)) return e;
        var t = "object" == typeof e && "number" == typeof e.length;
        return t ? d.call(e) : [e]
    }

    function o(e, t, r) {
        if (!(this instanceof o)) return new o(e, t, r);
        var s = e;
        return "string" == typeof e && (s = document.querySelectorAll(e)), s ? (this.elements = n(s), this.options = i({}, this.options), "function" == typeof t ? r = t : i(this.options, t), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (s || e))
    }

    function r(e) {
        this.img = e
    }

    function s(e, t) {
        this.url = e, this.element = t, this.img = new Image
    }
    var h = e.jQuery,
        a = e.console,
        d = Array.prototype.slice;
    o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, o.prototype.addElementImages = function(e) {
        "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && u[t]) {
            for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = e.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    };
    var u = {
        1: !0,
        9: !0,
        11: !0
    };
    return o.prototype.addElementBackgroundImages = function(e) {
        var t = getComputedStyle(e);
        if (t)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
                var o = n && n[2];
                o && this.addBackground(o, e), n = i.exec(t.backgroundImage)
            }
    }, o.prototype.addImage = function(e) {
        var t = new r(e);
        this.images.push(t)
    }, o.prototype.addBackground = function(e, t) {
        var i = new s(e, t);
        this.images.push(i)
    }, o.prototype.check = function() {
        function e(e, i, n) {
            setTimeout(function() {
                t.progress(e, i, n)
            })
        }
        var t = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(t) {
            t.once("progress", e), t.check()
        }) : void this.complete()
    }, o.prototype.progress = function(e, t, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, e, t)
    }, o.prototype.complete = function() {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var t = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[t](this)
        }
    }, r.prototype = Object.create(t.prototype), r.prototype.check = function() {
        var e = this.getIsImageComplete();
        return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, r.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth
    }, r.prototype.confirm = function(e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
    }, r.prototype.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, r.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, r.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, r.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype = Object.create(r.prototype), s.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var e = this.getIsImageComplete();
        e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, s.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype.confirm = function(e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
    }, o.makeJQueryPlugin = function(t) {
        t = t || e.jQuery, t && (h = t, h.fn.imagesLoaded = function(e, t) {
            var i = new o(this, e, t);
            return i.jqDeferred.promise(h(this))
        })
    }, o.makeJQueryPlugin(), o
});

/**
 * Isotope
 * 3.0.6 | https://isotope.metafizzy.co
 */

! function(t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
    "use strict";

    function i(i, s, a) {
        function u(t, e, o) {
            var n, s = "$()." + i + '("' + e + '")';
            return t.each(function(t, u) {
                var h = a.data(u, i);
                if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                var d = h[e];
                if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method");
                var l = d.apply(h, o);
                n = void 0 === n ? l : n
            }), void 0 !== n ? n : t
        }

        function h(t, e) {
            t.each(function(t, o) {
                var n = a.data(o, i);
                n ? (n.option(e), n._init()) : (n = new s(o, e), a.data(o, i, n))
            })
        }
        a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function(t) {
            if ("string" == typeof t) {
                var e = n.call(arguments, 1);
                return u(this, t, e)
            }
            return h(this, t), this
        }, o(a))
    }

    function o(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var n = Array.prototype.slice,
        s = t.console,
        r = "undefined" == typeof s ? function() {} : function(t) {
            s.error(t)
        };
    return o(e || t.jQuery), i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                o = i[t] = i[t] || [];
            return o.indexOf(e) == -1 && o.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                o = i[t] = i[t] || {};
            return o[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var o = i.indexOf(e);
            return o != -1 && i.splice(o, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0), e = e || [];
            for (var o = this._onceEvents && this._onceEvents[t], n = 0; n < i.length; n++) {
                var s = i[n],
                    r = o && o[s];
                r && (this.off(t, s), delete o[s]), s.apply(this, e)
            }
            return this
        }
    }, e.allOff = function() {
        delete this._events, delete this._onceEvents
    }, t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";

    function t(t) {
        var e = parseFloat(t),
            i = t.indexOf("%") == -1 && !isNaN(e);
        return i && e
    }

    function e() {}

    function i() {
        for (var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, e = 0; e < h; e++) {
            var i = u[e];
            t[i] = 0
        }
        return t
    }

    function o(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e
    }

    function n() {
        if (!d) {
            d = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var n = o(e);
            r = 200 == Math.round(t(n.width)), s.isBoxSizeOuter = r, i.removeChild(e)
        }
    }

    function s(e) {
        if (n(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var s = o(e);
            if ("none" == s.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; l < h; l++) {
                var f = u[l],
                    c = s[f],
                    m = parseFloat(c);
                a[f] = isNaN(m) ? 0 : m
            }
            var p = a.paddingLeft + a.paddingRight,
                y = a.paddingTop + a.paddingBottom,
                g = a.marginLeft + a.marginRight,
                v = a.marginTop + a.marginBottom,
                _ = a.borderLeftWidth + a.borderRightWidth,
                z = a.borderTopWidth + a.borderBottomWidth,
                I = d && r,
                x = t(s.width);
            x !== !1 && (a.width = x + (I ? 0 : p + _));
            var S = t(s.height);
            return S !== !1 && (a.height = S + (I ? 0 : y + z)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (y + z), a.outerWidth = a.width + g, a.outerHeight = a.height + v, a
        }
    }
    var r, a = "undefined" == typeof console ? e : function(t) {
            console.error(t)
        },
        u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        h = u.length,
        d = !1;
    return s
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var t = function() {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var o = e[i],
                n = o + "MatchesSelector";
            if (t[n]) return n
        }
    }();
    return function(e, i) {
        return e[t](i)
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function(t, e) {
    var i = {};
    i.extend = function(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }, i.modulo = function(t, e) {
        return (t % e + e) % e
    };
    var o = Array.prototype.slice;
    i.makeArray = function(t) {
        if (Array.isArray(t)) return t;
        if (null === t || void 0 === t) return [];
        var e = "object" == typeof t && "number" == typeof t.length;
        return e ? o.call(t) : [t]
    }, i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1)
    }, i.getParent = function(t, i) {
        for (; t.parentNode && t != document.body;)
            if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function(t, o) {
        t = i.makeArray(t);
        var n = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!o) return void n.push(t);
                e(t, o) && n.push(t);
                for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++) n.push(i[s])
            }
        }), n
    }, i.debounceMethod = function(t, e, i) {
        i = i || 100;
        var o = t.prototype[e],
            n = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[n];
            clearTimeout(t);
            var e = arguments,
                s = this;
            this[n] = setTimeout(function() {
                o.apply(s, e), delete s[n]
            }, i)
        }
    }, i.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var n = t.console;
    return i.htmlInit = function(e, o) {
        i.docReady(function() {
            var s = i.toDashed(o),
                r = "data-" + s,
                a = document.querySelectorAll("[" + r + "]"),
                u = document.querySelectorAll(".js-" + s),
                h = i.makeArray(a).concat(i.makeArray(u)),
                d = r + "-options",
                l = t.jQuery;
            h.forEach(function(t) {
                var i, s = t.getAttribute(r) || t.getAttribute(d);
                try {
                    i = s && JSON.parse(s)
                } catch (a) {
                    return void(n && n.error("Error parsing " + r + " on " + t.className + ": " + a))
                }
                var u = new e(t, i);
                l && l.data(t, o, u)
            })
        })
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function(t, e) {
    "use strict";

    function i(t) {
        for (var e in t) return !1;
        return e = null, !0
    }

    function o(t, e) {
        t && (this.element = t, this.layout = e, this.position = {
            x: 0,
            y: 0
        }, this._create())
    }

    function n(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return "-" + t.toLowerCase()
        })
    }
    var s = document.documentElement.style,
        r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
        a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
        u = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        }[r],
        h = {
            transform: a,
            transition: r,
            transitionDuration: r + "Duration",
            transitionProperty: r + "Property",
            transitionDelay: r + "Delay"
        },
        d = o.prototype = Object.create(t.prototype);
    d.constructor = o, d._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        })
    }, d.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, d.getSize = function() {
        this.size = e(this.element)
    }, d.css = function(t) {
        var e = this.element.style;
        for (var i in t) {
            var o = h[i] || i;
            e[o] = t[i]
        }
    }, d.getPosition = function() {
        var t = getComputedStyle(this.element),
            e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            o = t[e ? "left" : "right"],
            n = t[i ? "top" : "bottom"],
            s = parseFloat(o),
            r = parseFloat(n),
            a = this.layout.size;
        o.indexOf("%") != -1 && (s = s / 100 * a.width), n.indexOf("%") != -1 && (r = r / 100 * a.height), s = isNaN(s) ? 0 : s, r = isNaN(r) ? 0 : r, s -= e ? a.paddingLeft : a.paddingRight, r -= i ? a.paddingTop : a.paddingBottom, this.position.x = s, this.position.y = r
    }, d.layoutPosition = function() {
        var t = this.layout.size,
            e = {},
            i = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop"),
            n = i ? "paddingLeft" : "paddingRight",
            s = i ? "left" : "right",
            r = i ? "right" : "left",
            a = this.position.x + t[n];
        e[s] = this.getXValue(a), e[r] = "";
        var u = o ? "paddingTop" : "paddingBottom",
            h = o ? "top" : "bottom",
            d = o ? "bottom" : "top",
            l = this.position.y + t[u];
        e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
    }, d.getXValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, d.getYValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, d._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x,
            o = this.position.y,
            n = t == this.position.x && e == this.position.y;
        if (this.setPosition(t, e), n && !this.isTransitioning) return void this.layoutPosition();
        var s = t - i,
            r = e - o,
            a = {};
        a.transform = this.getTranslate(s, r), this.transition({
            to: a,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        })
    }, d.getTranslate = function(t, e) {
        var i = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop");
        return t = i ? t : -t, e = o ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
    }, d.goTo = function(t, e) {
        this.setPosition(t, e), this.layoutPosition()
    }, d.moveTo = d._transitionTo, d.setPosition = function(t, e) {
        this.position.x = parseFloat(t), this.position.y = parseFloat(e)
    }, d._nonTransition = function(t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, d.transition = function(t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
            this.css(t.from);
            var o = this.element.offsetHeight;
            o = null
        }
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    };
    var l = "opacity," + n(a);
    d.enableTransition = function() {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({
                transitionProperty: l,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(u, this, !1)
        }
    }, d.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t)
    }, d.onotransitionend = function(t) {
        this.ontransitionend(t)
    };
    var f = {
        "-webkit-transform": "transform"
    };
    d.ontransitionend = function(t) {
        if (t.target === this.element) {
            var e = this._transn,
                o = f[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) {
                var n = e.onEnd[o];
                n.call(this), delete e.onEnd[o]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, d.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1
    }, d._removeStyles = function(t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e)
    };
    var c = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return d.removeTransitionStyles = function() {
        this.css(c)
    }, d.stagger = function(t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, d.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [this])
    }, d.remove = function() {
        return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem()
        }), void this.hide()) : void this.removeElem()
    }, d.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("visibleStyle");
        e[i] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }, d.getHideRevealTransitionEndProperty = function(t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i
    }, d.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        e[i] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"))
    }, d.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }, o
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, o, n, s) {
        return e(t, i, o, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function(t, e, i, o, n) {
    "use strict";

    function s(t, e) {
        var i = o.getQueryElement(t);
        if (!i) return void(u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i, h && (this.$element = h(this.element)), this.options = o.extend({}, this.constructor.defaults), this.option(e);
        var n = ++l;
        this.element.outlayerGUID = n, f[n] = this, this._create();
        var s = this._getOption("initLayout");
        s && this.layout()
    }

    function r(t) {
        function e() {
            t.apply(this, arguments)
        }
        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }

    function a(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/),
            i = e && e[1],
            o = e && e[2];
        if (!i.length) return 0;
        i = parseFloat(i);
        var n = m[o] || 1;
        return i * n
    }
    var u = t.console,
        h = t.jQuery,
        d = function() {},
        l = 0,
        f = {};
    s.namespace = "outlayer", s.Item = n, s.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var c = s.prototype;
    o.extend(c, e.prototype), c.option = function(t) {
        o.extend(this.options, t)
    }, c._getOption = function(t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, c._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize()
    }, c.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }, c._itemize = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0; n < e.length; n++) {
            var s = e[n],
                r = new i(s, this);
            o.push(r)
        }
        return o
    }, c._filterFindItemElements = function(t) {
        return o.filterFindElements(t, this.options.itemSelector)
    }, c.getItemElements = function() {
        return this.items.map(function(t) {
            return t.element
        })
    }, c.layout = function() {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, c._init = c.layout, c._resetLayout = function() {
        this.getSize()
    }, c.getSize = function() {
        this.size = i(this.element)
    }, c._getMeasurement = function(t, e) {
        var o, n = this.options[t];
        n ? ("string" == typeof n ? o = this.element.querySelector(n) : n instanceof HTMLElement && (o = n), this[t] = o ? i(o)[e] : n) : this[t] = 0
    }, c.layoutItems = function(t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, c._getItemsForLayout = function(t) {
        return t.filter(function(t) {
            return !t.isIgnored
        })
    }, c._layoutItems = function(t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function(t) {
                var o = this._getItemLayoutPosition(t);
                o.item = t, o.isInstant = e || t.isLayoutInstant, i.push(o)
            }, this), this._processLayoutQueue(i)
        }
    }, c._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }, c._processLayoutQueue = function(t) {
        this.updateStagger(), t.forEach(function(t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }, c.updateStagger = function() {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger)
    }, c._positionItem = function(t, e, i, o, n) {
        o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i))
    }, c._postLayout = function() {
        this.resizeContainer()
    }, c.resizeContainer = function() {
        var t = this._getOption("resizeContainer");
        if (t) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
        }
    }, c._getContainerSize = d, c._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, c._emitCompleteOnItems = function(t, e) {
        function i() {
            n.dispatchEvent(t + "Complete", null, [e])
        }

        function o() {
            r++, r == s && i()
        }
        var n = this,
            s = e.length;
        if (!e || !s) return void i();
        var r = 0;
        e.forEach(function(e) {
            e.once(t, o)
        })
    }, c.dispatchEvent = function(t, e, i) {
        var o = e ? [e].concat(i) : i;
        if (this.emitEvent(t, o), h)
            if (this.$element = this.$element || h(this.element), e) {
                var n = h.Event(e);
                n.type = t, this.$element.trigger(n, i)
            } else this.$element.trigger(t, i)
    }, c.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, c.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, c.stamp = function(t) {
        t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, c.unstamp = function(t) {
        t = this._find(t), t && t.forEach(function(t) {
            o.removeFrom(this.stamps, t), this.unignore(t)
        }, this)
    }, c._find = function(t) {
        if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = o.makeArray(t)
    }, c._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, c._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(),
            e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }, c._manageStamp = d, c._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(),
            o = this._boundingRect,
            n = i(t),
            s = {
                left: e.left - o.left - n.marginLeft,
                top: e.top - o.top - n.marginTop,
                right: o.right - e.right - n.marginRight,
                bottom: o.bottom - e.bottom - n.marginBottom
            };
        return s
    }, c.handleEvent = o.handleEvent, c.bindResize = function() {
        t.addEventListener("resize", this), this.isResizeBound = !0
    }, c.unbindResize = function() {
        t.removeEventListener("resize", this), this.isResizeBound = !1
    }, c.onresize = function() {
        this.resize()
    }, o.debounceMethod(s, "onresize", 100), c.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, c.needsResizeLayout = function() {
        var t = i(this.element),
            e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth
    }, c.addItems = function(t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e
    }, c.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, c.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, c.reveal = function(t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.reveal()
            })
        }
    }, c.hide = function(t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.hide()
            })
        }
    }, c.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, c.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e)
    }, c.getItem = function(t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i
        }
    }, c.getItems = function(t) {
        t = o.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, c.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) {
            t.remove(), o.removeFrom(this.items, t)
        }, this)
    }, c.destroy = function() {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) {
            t.destroy()
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
    }, s.data = function(t) {
        t = o.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && f[e]
    }, s.create = function(t, e) {
        var i = r(s);
        return i.defaults = o.extend({}, s.defaults), o.extend(i.defaults, e), i.compatOptions = o.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(n), o.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i
    };
    var m = {
        ms: 1,
        s: 1e3
    };
    return s.Item = n, s
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window, function(t) {
    "use strict";

    function e() {
        t.Item.apply(this, arguments)
    }
    var i = e.prototype = Object.create(t.Item.prototype),
        o = i._create;
    i._create = function() {
        this.id = this.layout.itemGUID++, o.call(this), this.sortData = {}
    }, i.updateSortData = function() {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var t = this.layout.options.getSortData,
                e = this.layout._sorters;
            for (var i in t) {
                var o = e[i];
                this.sortData[i] = o(this.element, this)
            }
        }
    };
    var n = i.destroy;
    return i.destroy = function() {
        n.apply(this, arguments), this.css({
            display: ""
        })
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function(t, e) {
    "use strict";

    function i(t) {
        this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
    }
    var o = i.prototype,
        n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
    return n.forEach(function(t) {
        o[t] = function() {
            return e.prototype[t].apply(this.isotope, arguments)
        }
    }), o.needsVerticalResizeLayout = function() {
        var e = t(this.isotope.element),
            i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight
    }, o._getMeasurement = function() {
        this.isotope._getMeasurement.apply(this, arguments)
    }, o.getColumnWidth = function() {
        this.getSegmentSize("column", "Width")
    }, o.getRowHeight = function() {
        this.getSegmentSize("row", "Height")
    }, o.getSegmentSize = function(t, e) {
        var i = t + e,
            o = "outer" + e;
        if (this._getMeasurement(i, o), !this[i]) {
            var n = this.getFirstItemSize();
            this[i] = n && n[o] || this.isotope.size["inner" + e]
        }
    }, o.getFirstItemSize = function() {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element)
    }, o.layout = function() {
        this.isotope.layout.apply(this.isotope, arguments)
    }, o.getSize = function() {
        this.isotope.getSize(), this.size = this.isotope.size
    }, i.modes = {}, i.create = function(t, e) {
        function n() {
            i.apply(this, arguments)
        }
        return n.prototype = Object.create(o), n.prototype.constructor = n, e && (n.options = e), n.prototype.namespace = t, i.modes[t] = n, n
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("masonry-layout/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function(t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var o = i.prototype;
    return o._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, o.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0],
                i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var o = this.columnWidth += this.gutter,
            n = this.containerWidth + this.gutter,
            s = n / o,
            r = o - n % o,
            a = r && r < 1 ? "round" : "floor";
        s = Math[a](s), this.cols = Math.max(s, 1)
    }, o.getContainerWidth = function() {
        var t = this._getOption("fitWidth"),
            i = t ? this.element.parentNode : this.element,
            o = e(i);
        this.containerWidth = o && o.innerWidth
    }, o._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
            i = e && e < 1 ? "round" : "ceil",
            o = Math[i](t.size.outerWidth / this.columnWidth);
        o = Math.min(o, this.cols);
        for (var n = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", s = this[n](o, t), r = {
                x: this.columnWidth * s.col,
                y: s.y
            }, a = s.y + t.size.outerHeight, u = o + s.col, h = s.col; h < u; h++) this.colYs[h] = a;
        return r
    }, o._getTopColPosition = function(t) {
        var e = this._getTopColGroup(t),
            i = Math.min.apply(Math, e);
        return {
            col: e.indexOf(i),
            y: i
        }
    }, o._getTopColGroup = function(t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++) e[o] = this._getColGroupY(o, t);
        return e
    }, o._getColGroupY = function(t, e) {
        if (e < 2) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i)
    }, o._getHorizontalColPosition = function(t, e) {
        var i = this.horizontalColIndex % this.cols,
            o = t > 1 && i + t > this.cols;
        i = o ? 0 : i;
        var n = e.size.outerWidth && e.size.outerHeight;
        return this.horizontalColIndex = n ? i + t : this.horizontalColIndex, {
            col: i,
            y: this._getColGroupY(i, t)
        }
    }, o._manageStamp = function(t) {
        var i = e(t),
            o = this._getElementOffset(t),
            n = this._getOption("originLeft"),
            s = n ? o.left : o.right,
            r = s + i.outerWidth,
            a = Math.floor(s / this.columnWidth);
        a = Math.max(0, a);
        var u = Math.floor(r / this.columnWidth);
        u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);
        for (var h = this._getOption("originTop"), d = (h ? o.top : o.bottom) + i.outerHeight, l = a; l <= u; l++) this.colYs[l] = Math.max(d, this.colYs[l])
    }, o._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, o._getContainerFitWidth = function() {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }, o.needsResizeLayout = function() {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode", "masonry-layout/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function(t, e) {
    "use strict";
    var i = t.create("masonry"),
        o = i.prototype,
        n = {
            _getElementOffset: !0,
            layout: !0,
            _getMeasurement: !0
        };
    for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);
    var r = o.measureColumns;
    o.measureColumns = function() {
        this.items = this.isotope.filteredItems, r.call(this)
    };
    var a = o._getOption;
    return o._getOption = function(t) {
        return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("fitRows"),
        i = e.prototype;
    return i._resetLayout = function() {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
            i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
        var o = {
            x: this.x,
            y: this.y
        };
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o
    }, i._getContainerSize = function() {
        return {
            height: this.maxY
        }
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("vertical", {
            horizontalAlignment: 0
        }),
        i = e.prototype;
    return i._resetLayout = function() {
        this.y = 0
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
            i = this.y;
        return this.y += t.size.outerHeight, {
            x: e,
            y: i
        }
    }, i._getContainerSize = function() {
        return {
            height: this.y
        }
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope-layout/js/item", "isotope-layout/js/layout-mode", "isotope-layout/js/layout-modes/masonry", "isotope-layout/js/layout-modes/fit-rows", "isotope-layout/js/layout-modes/vertical"], function(i, o, n, s, r, a) {
        return e(t, i, o, n, s, r, a)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope-layout/js/item"), require("isotope-layout/js/layout-mode"), require("isotope-layout/js/layout-modes/masonry"), require("isotope-layout/js/layout-modes/fit-rows"), require("isotope-layout/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
}(window, function(t, e, i, o, n, s, r) {
    function a(t, e) {
        return function(i, o) {
            for (var n = 0; n < t.length; n++) {
                var s = t[n],
                    r = i.sortData[s],
                    a = o.sortData[s];
                if (r > a || r < a) {
                    var u = void 0 !== e[s] ? e[s] : e,
                        h = u ? 1 : -1;
                    return (r > a ? 1 : -1) * h
                }
            }
            return 0
        }
    }
    var u = t.jQuery,
        h = String.prototype.trim ? function(t) {
            return t.trim()
        } : function(t) {
            return t.replace(/^\s+|\s+$/g, "")
        },
        d = e.create("isotope", {
            layoutMode: "masonry",
            isJQueryFiltering: !0,
            sortAscending: !0
        });
    d.Item = s, d.LayoutMode = r;
    var l = d.prototype;
    l._create = function() {
        this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
        for (var t in r.modes) this._initLayoutMode(t)
    }, l.reloadItems = function() {
        this.itemGUID = 0, e.prototype.reloadItems.call(this)
    }, l._itemize = function() {
        for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
            var o = t[i];
            o.id = this.itemGUID++
        }
        return this._updateItemsSortData(t), t
    }, l._initLayoutMode = function(t) {
        var e = r.modes[t],
            i = this.options[t] || {};
        this.options[t] = e.options ? n.extend(e.options, i) : i, this.modes[t] = new e(this)
    }, l.layout = function() {
        return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
    }, l._layout = function() {
        var t = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
    }, l.arrange = function(t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
    }, l._init = l.arrange, l._hideReveal = function(t) {
        this.reveal(t.needReveal), this.hide(t.needHide)
    }, l._getIsInstant = function() {
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e, e
    }, l._bindArrangeComplete = function() {
        function t() {
            e && i && o && n.dispatchEvent("arrangeComplete", null, [n.filteredItems])
        }
        var e, i, o, n = this;
        this.once("layoutComplete", function() {
            e = !0, t()
        }), this.once("hideComplete", function() {
            i = !0, t()
        }), this.once("revealComplete", function() {
            o = !0, t()
        })
    }, l._filter = function(t) {
        var e = this.options.filter;
        e = e || "*";
        for (var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
            var a = t[r];
            if (!a.isIgnored) {
                var u = s(a);
                u && i.push(a), u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a)
            }
        }
        return {
            matches: i,
            needReveal: o,
            needHide: n
        }
    }, l._getFilterTest = function(t) {
        return u && this.options.isJQueryFiltering ? function(e) {
            return u(e.element).is(t);
        } : "function" == typeof t ? function(e) {
            return t(e.element)
        } : function(e) {
            return o(e.element, t)
        }
    }, l.updateSortData = function(t) {
        var e;
        t ? (t = n.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
    }, l._getSorters = function() {
        var t = this.options.getSortData;
        for (var e in t) {
            var i = t[e];
            this._sorters[e] = f(i)
        }
    }, l._updateItemsSortData = function(t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) {
            var o = t[i];
            o.updateSortData()
        }
    };
    var f = function() {
        function t(t) {
            if ("string" != typeof t) return t;
            var i = h(t).split(" "),
                o = i[0],
                n = o.match(/^\[(.+)\]$/),
                s = n && n[1],
                r = e(s, o),
                a = d.sortDataParsers[i[1]];
            return t = a ? function(t) {
                return t && a(r(t))
            } : function(t) {
                return t && r(t)
            }
        }

        function e(t, e) {
            return t ? function(e) {
                return e.getAttribute(t)
            } : function(t) {
                var i = t.querySelector(e);
                return i && i.textContent
            }
        }
        return t
    }();
    d.sortDataParsers = {
        parseInt: function(t) {
            return parseInt(t, 10)
        },
        parseFloat: function(t) {
            return parseFloat(t)
        }
    }, l._sort = function() {
        if (this.options.sortBy) {
            var t = n.makeArray(this.options.sortBy);
            this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
            var e = a(this.sortHistory, this.options.sortAscending);
            this.filteredItems.sort(e)
        }
    }, l._getIsSameSortBy = function(t) {
        for (var e = 0; e < t.length; e++)
            if (t[e] != this.sortHistory[e]) return !1;
        return !0
    }, l._mode = function() {
        var t = this.options.layoutMode,
            e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return e.options = this.options[t], e
    }, l._resetLayout = function() {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout()
    }, l._getItemLayoutPosition = function(t) {
        return this._mode()._getItemLayoutPosition(t)
    }, l._manageStamp = function(t) {
        this._mode()._manageStamp(t)
    }, l._getContainerSize = function() {
        return this._mode()._getContainerSize()
    }, l.needsResizeLayout = function() {
        return this._mode().needsResizeLayout()
    }, l.appended = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i)
        }
    }, l.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
        }
    }, l._filterRevealAdded = function(t) {
        var e = this._filter(t);
        return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
    }, l.insert = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i, o, n = e.length;
            for (i = 0; i < n; i++) o = e[i], this.element.appendChild(o.element);
            var s = this._filter(e).matches;
            for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
            this.reveal(s)
        }
    };
    var c = l.remove;
    return l.remove = function(t) {
        t = n.makeArray(t);
        var e = this.getItems(t);
        c.call(this, t);
        for (var i = e && e.length, o = 0; i && o < i; o++) {
            var s = e[o];
            n.removeFrom(this.filteredItems, s)
        }
    }, l.shuffle = function() {
        for (var t = 0; t < this.items.length; t++) {
            var e = this.items[t];
            e.sortData.random = Math.random()
        }
        this.options.sortBy = "random", this._sort(), this._layout()
    }, l._noTransition = function(t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var o = t.apply(this, e);
        return this.options.transitionDuration = i, o
    }, l.getFilteredItemElements = function() {
        return this.filteredItems.map(function(t) {
            return t.element
        })
    }, d
});

/**
 * Magnific Popup
 * 1.1.0 | Dmitry Semenov | MIT | http://dimsemenov.com/plugins/magnific-popup/
 */

(function(a) {
    typeof define == "function" && define.amd ? define(["jquery"], a) : typeof exports == "object" ? a(require("jquery")) : a(window.jQuery || window.Zepto)
})(function(a) {
    var b = "Close",
        c = "BeforeClose",
        d = "AfterClose",
        e = "BeforeAppend",
        f = "MarkupParse",
        g = "Open",
        h = "Change",
        i = "mfp",
        j = "." + i,
        k = "mfp-ready",
        l = "mfp-removing",
        m = "mfp-prevent-close",
        n, o = function() {},
        p = !!window.jQuery,
        q, r = a(window),
        s, t, u, v, w = function(a, b) {
            n.ev.on(i + a + j, b)
        },
        x = function(b, c, d, e) {
            var f = document.createElement("div");
            return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
        },
        y = function(b, c) {
            n.ev.triggerHandler(i + b, c), n.st.callbacks && (b = b.charAt(0).toLowerCase() + b.slice(1), n.st.callbacks[b] && n.st.callbacks[b].apply(n, a.isArray(c) ? c : [c]))
        },
        z = function(b) {
            if (b !== v || !n.currTemplate.closeBtn) n.currTemplate.closeBtn = a(n.st.closeMarkup.replace("%title%", n.st.tClose)), v = b;
            return n.currTemplate.closeBtn
        },
        A = function() {
            a.magnificPopup.instance || (n = new o, n.init(), a.magnificPopup.instance = n)
        },
        B = function() {
            var a = document.createElement("p").style,
                b = ["ms", "O", "Moz", "Webkit"];
            if (a.transition !== undefined) return !0;
            while (b.length)
                if (b.pop() + "Transition" in a) return !0;
            return !1
        };
    o.prototype = {
        constructor: o,
        init: function() {
            var b = navigator.appVersion;
            n.isLowIE = n.isIE8 = document.all && !document.addEventListener, n.isAndroid = /android/gi.test(b), n.isIOS = /iphone|ipad|ipod/gi.test(b), n.supportsTransition = B(), n.probablyMobile = n.isAndroid || n.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), s = a(document), n.popupsCache = {}
        },
        open: function(b) {
            var c;
            if (b.isObj === !1) {
                n.items = b.items.toArray(), n.index = 0;
                var d = b.items,
                    e;
                for (c = 0; c < d.length; c++) {
                    e = d[c], e.parsed && (e = e.el[0]);
                    if (e === b.el[0]) {
                        n.index = c;
                        break
                    }
                }
            } else n.items = a.isArray(b.items) ? b.items : [b.items], n.index = b.index || 0;
            if (n.isOpen) {
                n.updateItemHTML();
                return
            }
            n.types = [], u = "", b.mainEl && b.mainEl.length ? n.ev = b.mainEl.eq(0) : n.ev = s, b.key ? (n.popupsCache[b.key] || (n.popupsCache[b.key] = {}), n.currTemplate = n.popupsCache[b.key]) : n.currTemplate = {}, n.st = a.extend(!0, {}, a.magnificPopup.defaults, b), n.fixedContentPos = n.st.fixedContentPos === "auto" ? !n.probablyMobile : n.st.fixedContentPos, n.st.modal && (n.st.closeOnContentClick = !1, n.st.closeOnBgClick = !1, n.st.showCloseBtn = !1, n.st.enableEscapeKey = !1), n.bgOverlay || (n.bgOverlay = x("bg").on("click" + j, function() {
                n.close()
            }), n.wrap = x("wrap").attr("tabindex", -1).on("click" + j, function(a) {
                n._checkIfClose(a.target) && n.close()
            }), n.container = x("container", n.wrap)), n.contentContainer = x("content"), n.st.preloader && (n.preloader = x("preloader", n.container, n.st.tLoading));
            var h = a.magnificPopup.modules;
            for (c = 0; c < h.length; c++) {
                var i = h[c];
                i = i.charAt(0).toUpperCase() + i.slice(1), n["init" + i].call(n)
            }
            y("BeforeOpen"), n.st.showCloseBtn && (n.st.closeBtnInside ? (w(f, function(a, b, c, d) {
                c.close_replaceWith = z(d.type)
            }), u += " mfp-close-btn-in") : n.wrap.append(z())), n.st.alignTop && (u += " mfp-align-top"), n.fixedContentPos ? n.wrap.css({
                overflow: n.st.overflowY,
                overflowX: "hidden",
                overflowY: n.st.overflowY
            }) : n.wrap.css({
                top: r.scrollTop(),
                position: "absolute"
            }), (n.st.fixedBgPos === !1 || n.st.fixedBgPos === "auto" && !n.fixedContentPos) && n.bgOverlay.css({
                height: s.height(),
                position: "absolute"
            }), n.st.enableEscapeKey && s.on("keyup" + j, function(a) {
                a.keyCode === 27 && n.close()
            }), r.on("resize" + j, function() {
                n.updateSize()
            }), n.st.closeOnContentClick || (u += " mfp-auto-cursor"), u && n.wrap.addClass(u);
            var l = n.wH = r.height(),
                m = {};
            if (n.fixedContentPos && n._hasScrollBar(l)) {
                var o = n._getScrollbarSize();
                o && (m.marginRight = o)
            }
            n.fixedContentPos && (n.isIE7 ? a("body, html").css("overflow", "hidden") : m.overflow = "hidden");
            var p = n.st.mainClass;
            return n.isIE7 && (p += " mfp-ie7"), p && n._addClassToMFP(p), n.updateItemHTML(), y("BuildControls"), a("html").css(m), n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo || a(document.body)), n._lastFocusedEl = document.activeElement, setTimeout(function() {
                n.content ? (n._addClassToMFP(k), n._setFocus()) : n.bgOverlay.addClass(k), s.on("focusin" + j, n._onFocusIn)
            }, 16), n.isOpen = !0, n.updateSize(l), y(g), b
        },
        close: function() {
            if (!n.isOpen) return;
            y(c), n.isOpen = !1, n.st.removalDelay && !n.isLowIE && n.supportsTransition ? (n._addClassToMFP(l), setTimeout(function() {
                n._close()
            }, n.st.removalDelay)) : n._close()
        },
        _close: function() {
            y(b);
            var c = l + " " + k + " ";
            n.bgOverlay.detach(), n.wrap.detach(), n.container.empty(), n.st.mainClass && (c += n.st.mainClass + " "), n._removeClassFromMFP(c);
            if (n.fixedContentPos) {
                var e = {
                    marginRight: ""
                };
                n.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
            }
            s.off("keyup" + j + " focusin" + j), n.ev.off(j), n.wrap.attr("class", "mfp-wrap").removeAttr("style"), n.bgOverlay.attr("class", "mfp-bg"), n.container.attr("class", "mfp-container"), n.st.showCloseBtn && (!n.st.closeBtnInside || n.currTemplate[n.currItem.type] === !0) && n.currTemplate.closeBtn && n.currTemplate.closeBtn.detach(), n.st.autoFocusLast && n._lastFocusedEl && a(n._lastFocusedEl).focus(), n.currItem = null, n.content = null, n.currTemplate = null, n.prevHeight = 0, y(d)
        },
        updateSize: function(a) {
            if (n.isIOS) {
                var b = document.documentElement.clientWidth / window.innerWidth,
                    c = window.innerHeight * b;
                n.wrap.css("height", c), n.wH = c
            } else n.wH = a || r.height();
            n.fixedContentPos || n.wrap.css("height", n.wH), y("Resize")
        },
        updateItemHTML: function() {
            var b = n.items[n.index];
            n.contentContainer.detach(), n.content && n.content.detach(), b.parsed || (b = n.parseEl(n.index));
            var c = b.type;
            y("BeforeChange", [n.currItem ? n.currItem.type : "", c]), n.currItem = b;
            if (!n.currTemplate[c]) {
                var d = n.st[c] ? n.st[c].markup : !1;
                y("FirstMarkupParse", d), d ? n.currTemplate[c] = a(d) : n.currTemplate[c] = !0
            }
            t && t !== b.type && n.container.removeClass("mfp-" + t + "-holder");
            var e = n["get" + c.charAt(0).toUpperCase() + c.slice(1)](b, n.currTemplate[c]);
            n.appendContent(e, c), b.preloaded = !0, y(h, b), t = b.type, n.container.prepend(n.contentContainer), y("AfterChange")
        },
        appendContent: function(a, b) {
            n.content = a, a ? n.st.showCloseBtn && n.st.closeBtnInside && n.currTemplate[b] === !0 ? n.content.find(".mfp-close").length || n.content.append(z()) : n.content = a : n.content = "", y(e), n.container.addClass("mfp-" + b + "-holder"), n.contentContainer.append(n.content)
        },
        parseEl: function(b) {
            var c = n.items[b],
                d;
            c.tagName ? c = {
                el: a(c)
            } : (d = c.type, c = {
                data: c,
                src: c.src
            });
            if (c.el) {
                var e = n.types;
                for (var f = 0; f < e.length; f++)
                    if (c.el.hasClass("mfp-" + e[f])) {
                        d = e[f];
                        break
                    }
                c.src = c.el.attr("data-mfp-src"), c.src || (c.src = c.el.attr("href"))
            }
            return c.type = d || n.st.type || "inline", c.index = b, c.parsed = !0, n.items[b] = c, y("ElementParse", c), n.items[b]
        },
        addGroup: function(a, b) {
            var c = function(c) {
                c.mfpEl = this, n._openClick(c, a, b)
            };
            b || (b = {});
            var d = "click.magnificPopup";
            b.mainEl = a, b.items ? (b.isObj = !0, a.off(d).on(d, c)) : (b.isObj = !1, b.delegate ? a.off(d).on(d, b.delegate, c) : (b.items = a, a.off(d).on(d, c)))
        },
        _openClick: function(b, c, d) {
            var e = d.midClick !== undefined ? d.midClick : a.magnificPopup.defaults.midClick;
            if (!e && (b.which === 2 || b.ctrlKey || b.metaKey || b.altKey || b.shiftKey)) return;
            var f = d.disableOn !== undefined ? d.disableOn : a.magnificPopup.defaults.disableOn;
            if (f)
                if (a.isFunction(f)) {
                    if (!f.call(n)) return !0
                } else if (r.width() < f) return !0;
            b.type && (b.preventDefault(), n.isOpen && b.stopPropagation()), d.el = a(b.mfpEl), d.delegate && (d.items = c.find(d.delegate)), n.open(d)
        },
        updateStatus: function(a, b) {
            if (n.preloader) {
                q !== a && n.container.removeClass("mfp-s-" + q), !b && a === "loading" && (b = n.st.tLoading);
                var c = {
                    status: a,
                    text: b
                };
                y("UpdateStatus", c), a = c.status, b = c.text, n.preloader.html(b), n.preloader.find("a").on("click", function(a) {
                    a.stopImmediatePropagation()
                }), n.container.addClass("mfp-s-" + a), q = a
            }
        },
        _checkIfClose: function(b) {
            if (a(b).hasClass(m)) return;
            var c = n.st.closeOnContentClick,
                d = n.st.closeOnBgClick;
            if (c && d) return !0;
            if (!n.content || a(b).hasClass("mfp-close") || n.preloader && b === n.preloader[0]) return !0;
            if (b !== n.content[0] && !a.contains(n.content[0], b)) {
                if (d && a.contains(document, b)) return !0
            } else if (c) return !0;
            return !1
        },
        _addClassToMFP: function(a) {
            n.bgOverlay.addClass(a), n.wrap.addClass(a)
        },
        _removeClassFromMFP: function(a) {
            this.bgOverlay.removeClass(a), n.wrap.removeClass(a)
        },
        _hasScrollBar: function(a) {
            return (n.isIE7 ? s.height() : document.body.scrollHeight) > (a || r.height())
        },
        _setFocus: function() {
            (n.st.focus ? n.content.find(n.st.focus).eq(0) : n.wrap).focus()
        },
        _onFocusIn: function(b) {
            if (b.target !== n.wrap[0] && !a.contains(n.wrap[0], b.target)) return n._setFocus(), !1
        },
        _parseMarkup: function(b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)), y(f, [b, c, d]), a.each(c, function(c, d) {
                if (d === undefined || d === !1) return !0;
                e = c.split("_");
                if (e.length > 1) {
                    var f = b.find(j + "-" + e[0]);
                    if (f.length > 0) {
                        var g = e[1];
                        g === "replaceWith" ? f[0] !== d[0] && f.replaceWith(d) : g === "img" ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d)
                    }
                } else b.find(j + "-" + c).html(d)
            })
        },
        _getScrollbarSize: function() {
            if (n.scrollbarSize === undefined) {
                var a = document.createElement("div");
                a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), n.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
            }
            return n.scrollbarSize
        }
    }, a.magnificPopup = {
        instance: null,
        proto: o.prototype,
        modules: [],
        open: function(b, c) {
            return A(), b ? b = a.extend(!0, {}, b) : b = {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
        },
        close: function() {
            return a.magnificPopup.instance && a.magnificPopup.instance.close()
        },
        registerModule: function(b, c) {
            c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, a.fn.magnificPopup = function(b) {
        A();
        var c = a(this);
        if (typeof b == "string")
            if (b === "open") {
                var d, e = p ? c.data("magnificPopup") : c[0].magnificPopup,
                    f = parseInt(arguments[1], 10) || 0;
                e.items ? d = e.items[f] : (d = c, e.delegate && (d = d.find(e.delegate)), d = d.eq(f)), n._openClick({
                    mfpEl: d
                }, c, e)
            } else n.isOpen && n[b].apply(n, Array.prototype.slice.call(arguments, 1));
        else b = a.extend(!0, {}, b), p ? c.data("magnificPopup", b) : c[0].magnificPopup = b, n.addGroup(c, b);
        return c
    };
    var C = "inline",
        D, E, F, G = function() {
            F && (E.after(F.addClass(D)).detach(), F = null)
        };
    a.magnificPopup.registerModule(C, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                n.types.push(C), w(b + "." + C, function() {
                    G()
                })
            },
            getInline: function(b, c) {
                G();
                if (b.src) {
                    var d = n.st.inline,
                        e = a(b.src);
                    if (e.length) {
                        var f = e[0].parentNode;
                        f && f.tagName && (E || (D = d.hiddenClass, E = x(D), D = "mfp-" + D), F = e.after(E).detach().removeClass(D)), n.updateStatus("ready")
                    } else n.updateStatus("error", d.tNotFound), e = a("<div>");
                    return b.inlineElement = e, e
                }
                return n.updateStatus("ready"), n._parseMarkup(c, {}, b), c
            }
        }
    });
    var H = "ajax",
        I, J = function() {
            I && a(document.body).removeClass(I)
        },
        K = function() {
            J(), n.req && n.req.abort()
        };
    a.magnificPopup.registerModule(H, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                n.types.push(H), I = n.st.ajax.cursor, w(b + "." + H, K), w("BeforeChange." + H, K)
            },
            getAjax: function(b) {
                I && a(document.body).addClass(I), n.updateStatus("loading");
                var c = a.extend({
                    url: b.src,
                    success: function(c, d, e) {
                        var f = {
                            data: c,
                            xhr: e
                        };
                        y("ParseAjax", f), n.appendContent(a(f.data), H), b.finished = !0, J(), n._setFocus(), setTimeout(function() {
                            n.wrap.addClass(k)
                        }, 16), n.updateStatus("ready"), y("AjaxContentAdded")
                    },
                    error: function() {
                        J(), b.finished = b.loadError = !0, n.updateStatus("error", n.st.ajax.tError.replace("%url%", b.src))
                    }
                }, n.st.ajax.settings);
                return n.req = a.ajax(c), ""
            }
        }
    });
    var L, M = function(b) {
        if (b.data && b.data.title !== undefined) return b.data.title;
        var c = n.st.image.titleSrc;
        if (c) {
            if (a.isFunction(c)) return c.call(n, b);
            if (b.el) return b.el.attr(c) || ""
        }
        return ""
    };
    a.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var c = n.st.image,
                    d = ".image";
                n.types.push("image"), w(g + d, function() {
                    n.currItem.type === "image" && c.cursor && a(document.body).addClass(c.cursor)
                }), w(b + d, function() {
                    c.cursor && a(document.body).removeClass(c.cursor), r.off("resize" + j)
                }), w("Resize" + d, n.resizeImage), n.isLowIE && w("AfterChange", n.resizeImage)
            },
            resizeImage: function() {
                var a = n.currItem;
                if (!a || !a.img) return;
                if (n.st.image.verticalFit) {
                    var b = 0;
                    n.isLowIE && (b = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", n.wH - b)
                }
            },
            _onImageHasSize: function(a) {
                a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (n.content && n.content.removeClass("mfp-loading"), a.imgHidden = !1))
            },
            findImageSize: function(a) {
                var b = 0,
                    c = a.img[0],
                    d = function(e) {
                        L && clearInterval(L), L = setInterval(function() {
                            if (c.naturalWidth > 0) {
                                n._onImageHasSize(a);
                                return
                            }
                            b > 200 && clearInterval(L), b++, b === 3 ? d(10) : b === 40 ? d(50) : b === 100 && d(500)
                        }, e)
                    };
                d(1)
            },
            getImage: function(b, c) {
                var d = 0,
                    e = function() {
                        b && (b.img[0].complete ? (b.img.off(".mfploader"), b === n.currItem && (n._onImageHasSize(b), n.updateStatus("ready")), b.hasSize = !0, b.loaded = !0, y("ImageLoadComplete")) : (d++, d < 200 ? setTimeout(e, 100) : f()))
                    },
                    f = function() {
                        b && (b.img.off(".mfploader"), b === n.currItem && (n._onImageHasSize(b), n.updateStatus("error", g.tError.replace("%url%", b.src))), b.hasSize = !0, b.loaded = !0, b.loadError = !0)
                    },
                    g = n.st.image,
                    h = c.find(".mfp-img");
                if (h.length) {
                    var i = document.createElement("img");
                    i.className = "mfp-img", b.el && b.el.find("img").length && (i.alt = b.el.find("img").attr("alt")), b.img = a(i).on("load.mfploader", e).on("error.mfploader", f), i.src = b.src, h.is("img") && (b.img = b.img.clone()), i = b.img[0], i.naturalWidth > 0 ? b.hasSize = !0 : i.width || (b.hasSize = !1)
                }
                return n._parseMarkup(c, {
                    title: M(b),
                    img_replaceWith: b.img
                }, b), n.resizeImage(), b.hasSize ? (L && clearInterval(L), b.loadError ? (c.addClass("mfp-loading"), n.updateStatus("error", g.tError.replace("%url%", b.src))) : (c.removeClass("mfp-loading"), n.updateStatus("ready")), c) : (n.updateStatus("loading"), b.loading = !0, b.hasSize || (b.imgHidden = !0, c.addClass("mfp-loading"), n.findImageSize(b)), c)
            }
        }
    });
    var N, O = function() {
        return N === undefined && (N = document.createElement("p").style.MozTransform !== undefined), N
    };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(a) {
                return a.is("img") ? a : a.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var a = n.st.zoom,
                    d = ".zoom",
                    e;
                if (!a.enabled || !n.supportsTransition) return;
                var f = a.duration,
                    g = function(b) {
                        var c = b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                            d = "all " + a.duration / 1e3 + "s " + a.easing,
                            e = {
                                position: "fixed",
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                "-webkit-backface-visibility": "hidden"
                            },
                            f = "transition";
                        return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, c.css(e), c
                    },
                    h = function() {
                        n.content.css("visibility", "visible")
                    },
                    i, j;
                w("BuildControls" + d, function() {
                    if (n._allowZoom()) {
                        clearTimeout(i), n.content.css("visibility", "hidden"), e = n._getItemToZoom();
                        if (!e) {
                            h();
                            return
                        }
                        j = g(e), j.css(n._getOffset()), n.wrap.append(j), i = setTimeout(function() {
                            j.css(n._getOffset(!0)), i = setTimeout(function() {
                                h(), setTimeout(function() {
                                    j.remove(), e = j = null, y("ZoomAnimationEnded")
                                }, 16)
                            }, f)
                        }, 16)
                    }
                }), w(c + d, function() {
                    if (n._allowZoom()) {
                        clearTimeout(i), n.st.removalDelay = f;
                        if (!e) {
                            e = n._getItemToZoom();
                            if (!e) return;
                            j = g(e)
                        }
                        j.css(n._getOffset(!0)), n.wrap.append(j), n.content.css("visibility", "hidden"), setTimeout(function() {
                            j.css(n._getOffset())
                        }, 16)
                    }
                }), w(b + d, function() {
                    n._allowZoom() && (h(), j && j.remove(), e = null)
                })
            },
            _allowZoom: function() {
                return n.currItem.type === "image"
            },
            _getItemToZoom: function() {
                return n.currItem.hasSize ? n.currItem.img : !1
            },
            _getOffset: function(b) {
                var c;
                b ? c = n.currItem.img : c = n.st.zoom.opener(n.currItem.el || n.currItem);
                var d = c.offset(),
                    e = parseInt(c.css("padding-top"), 10),
                    f = parseInt(c.css("padding-bottom"), 10);
                d.top -= a(window).scrollTop() - e;
                var g = {
                    width: c.width(),
                    height: (p ? c.innerHeight() : c[0].offsetHeight) - f - e
                };
                return O() ? g["-moz-transform"] = g.transform = "translate(" + d.left + "px," + d.top + "px)" : (g.left = d.left, g.top = d.top), g
            }
        }
    });
    var P = "iframe",
        Q = "//about:blank",
        R = function(a) {
            if (n.currTemplate[P]) {
                var b = n.currTemplate[P].find("iframe");
                b.length && (a || (b[0].src = Q), n.isIE8 && b.css("display", a ? "block" : "none"))
            }
        };
    a.magnificPopup.registerModule(P, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                n.types.push(P), w("BeforeChange", function(a, b, c) {
                    b !== c && (b === P ? R() : c === P && R(!0))
                }), w(b + "." + P, function() {
                    R()
                })
            },
            getIframe: function(b, c) {
                var d = b.src,
                    e = n.st.iframe;
                a.each(e.patterns, function() {
                    if (d.indexOf(this.index) > -1) return this.id && (typeof this.id == "string" ? d = d.substr(d.lastIndexOf(this.id) + this.id.length, d.length) : d = this.id.call(this, d)), d = this.src.replace("%id%", d), !1
                });
                var f = {};
                return e.srcAction && (f[e.srcAction] = d), n._parseMarkup(c, f, b), n.updateStatus("ready"), c
            }
        }
    });
    var S = function(a) {
            var b = n.items.length;
            return a > b - 1 ? a - b : a < 0 ? b + a : a
        },
        T = function(a, b, c) {
            return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
        };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var c = n.st.gallery,
                    d = ".mfp-gallery";
                n.direction = !0;
                if (!c || !c.enabled) return !1;
                u += " mfp-gallery", w(g + d, function() {
                    c.navigateByImgClick && n.wrap.on("click" + d, ".mfp-img", function() {
                        if (n.items.length > 1) return n.next(), !1
                    }), s.on("keydown" + d, function(a) {
                        a.keyCode === 37 ? n.prev() : a.keyCode === 39 && n.next()
                    })
                }), w("UpdateStatus" + d, function(a, b) {
                    b.text && (b.text = T(b.text, n.currItem.index, n.items.length))
                }), w(f + d, function(a, b, d, e) {
                    var f = n.items.length;
                    d.counter = f > 1 ? T(c.tCounter, e.index, f) : ""
                }), w("BuildControls" + d, function() {
                    if (n.items.length > 1 && c.arrows && !n.arrowLeft) {
                        var b = c.arrowMarkup,
                            d = n.arrowLeft = a(b.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(m),
                            e = n.arrowRight = a(b.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(m);
                        d.click(function() {
                            n.prev()
                        }), e.click(function() {
                            n.next()
                        }), n.container.append(d.add(e))
                    }
                }), w(h + d, function() {
                    n._preloadTimeout && clearTimeout(n._preloadTimeout), n._preloadTimeout = setTimeout(function() {
                        n.preloadNearbyImages(), n._preloadTimeout = null
                    }, 16)
                }), w(b + d, function() {
                    s.off(d), n.wrap.off("click" + d), n.arrowRight = n.arrowLeft = null
                })
            },
            next: function() {
                n.direction = !0, n.index = S(n.index + 1), n.updateItemHTML()
            },
            prev: function() {
                n.direction = !1, n.index = S(n.index - 1), n.updateItemHTML()
            },
            goTo: function(a) {
                n.direction = a >= n.index, n.index = a, n.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var a = n.st.gallery.preload,
                    b = Math.min(a[0], n.items.length),
                    c = Math.min(a[1], n.items.length),
                    d;
                for (d = 1; d <= (n.direction ? c : b); d++) n._preloadItem(n.index + d);
                for (d = 1; d <= (n.direction ? b : c); d++) n._preloadItem(n.index - d)
            },
            _preloadItem: function(b) {
                b = S(b);
                if (n.items[b].preloaded) return;
                var c = n.items[b];
                c.parsed || (c = n.parseEl(b)), y("LazyLoad", c), c.type === "image" && (c.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
                    c.hasSize = !0
                }).on("error.mfploader", function() {
                    c.hasSize = !0, c.loadError = !0, y("LazyLoadError", c)
                }).attr("src", c.src)), c.preloaded = !0
            }
        }
    });
    var U = "retina";
    a.magnificPopup.registerModule(U, {
        options: {
            replaceSrc: function(a) {
                return a.src.replace(/\.\w+$/, function(a) {
                    return "@2x" + a
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var a = n.st.retina,
                        b = a.ratio;
                    b = isNaN(b) ? b() : b, b > 1 && (w("ImageHasSize." + U, function(a, c) {
                        c.img.css({
                            "max-width": c.img[0].naturalWidth / b,
                            width: "100%"
                        })
                    }), w("ElementParse." + U, function(c, d) {
                        d.src = a.replaceSrc(d, b)
                    }))
                }
            }
        }
    }), A()
})

/**
 * Parallax
 * enllax.js
 * 1.1.0 | copyright 2015, MMK Jony | https://github.com/mmkjony/enllax.js
 */

! function(t) {
    "use strict";
    t.fn.enllax = function(r) {
        var a = t(window).height(),
            n = t(document).height(),
            o = t.extend({
                ratio: 0,
                type: "background",
                direction: "vertical"
            }, r),
            e = t("[data-enllax-ratio]");
        e.each(function() {
            var r, e, s, i = t(this),
                c = i.offset().top,
                l = i.outerHeight(),
                p = i.data("enllax-ratio"),
                d = i.data("enllax-type"),
                x = i.data("enllax-direction");
            r = p ? p : o.ratio, e = d ? d : o.type, s = x ? x : o.direction;
            var f = Math.round(c * r),
                u = Math.round((c - a / 2 + l) * r);
            "background" == e ? "vertical" == s ? i.css({
                "background-position": "center " + -f + "px"
            }) : "horizontal" == s && i.css({
                "background-position": -f + "px center"
            }) : "foreground" == e && ("vertical" == s ? i.css({
                "-webkit-transform": "translateY(" + u + "px)",
                "-moz-transform": "translateY(" + u + "px)",
                transform: "translateY(" + u + "px)"
            }) : "horizontal" == s && i.css({
                "-webkit-transform": "translateX(" + u + "px)",
                "-moz-transform": "translateX(" + u + "px)",
                transform: "translateX(" + u + "px)"
            })), t(window).on("scroll", function() {
                var o = t(this).scrollTop();
                f = Math.round((c - o) * r), u = Math.round((c - a / 2 + l - o) * r), "background" == e ? "vertical" == s ? i.css({
                    "background-position": "center " + -f + "px"
                }) : "horizontal" == s && i.css({
                    "background-position": -f + "px center"
                }) : "foreground" == e && n > o && ("vertical" == s ? i.css({
                    "-webkit-transform": "translateY(" + u + "px)",
                    "-moz-transform": "translateY(" + u + "px)",
                    transform: "translateY(" + u + "px)"
                }) : "horizontal" == s && i.css({
                    "-webkit-transform": "translateX(" + u + "px)",
                    "-moz-transform": "translateX(" + u + "px)",
                    transform: "translateX(" + u + "px)"
                }))
            })
        })
    }
}(jQuery);

/**
 * Resize
 * debouncedresize
 * https://github.com/louisremi/jquery-smartresize | Licensed under the MIT license.
 */

(function(e) {
    var t = e.event,
        n, r;
    n = t.special.debouncedresize = {
        setup: function() {
            e(this).on("resize", n.handler)
        },
        teardown: function() {
            e(this).off("resize", n.handler)
        },
        handler: function(e, i) {
            var s = this,
                o = arguments,
                u = function() {
                    e.type = "debouncedresize";
                    t.dispatch.apply(s, o)
                };
            if (r) {
                clearTimeout(r)
            }
            i ? u() : r = setTimeout(u, n.threshold)
        },
        threshold: 150
    }
})(jQuery);

/**
 * Scroll
 * Nice Scroll
 * 3.6.6 | InuYaksa | 2015 MIT | http://nicescroll.areaaperta.com
 */

! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
    "use strict";

    function o() {
        var e = document.getElementsByTagName("script"),
            o = e.length ? e[e.length - 1].src.split("?")[0] : "";
        return o.split("/").length > 0 ? o.split("/").slice(0, -1).join("/") + "/" : ""
    }

    function t(e, o, t) {
        for (var r = 0; r < o.length; r++) t(e, o[r])
    }
    var r = !1,
        i = !1,
        n = 0,
        s = 2e3,
        l = 0,
        a = e,
        c = ["webkit", "ms", "moz", "o"],
        d = window.requestAnimationFrame || !1,
        u = window.cancelAnimationFrame || !1;
    if (!d)
        for (var h in c) {
            var p = c[h];
            d || (d = window[p + "RequestAnimationFrame"]), u || (u = window[p + "CancelAnimationFrame"] || window[p + "CancelRequestAnimationFrame"])
        }
    var m = window.MutationObserver || window.WebKitMutationObserver || !1,
        f = {
            zindex: "auto",
            cursoropacitymin: 0,
            cursoropacitymax: 1,
            cursorcolor: "#424242",
            cursorwidth: "5px",
            cursorborder: "1px solid #fff",
            cursorborderradius: "5px",
            scrollspeed: 60,
            mousescrollstep: 24,
            touchbehavior: !1,
            hwacceleration: !0,
            usetransition: !0,
            boxzoom: !1,
            dblclickzoom: !0,
            gesturezoom: !0,
            grabcursorenabled: !0,
            autohidemode: !0,
            background: "",
            iframeautoresize: !0,
            cursorminheight: 32,
            preservenativescrolling: !0,
            railoffset: !1,
            railhoffset: !1,
            bouncescroll: !0,
            spacebarenabled: !0,
            railpadding: {
                top: 0,
                right: 0,
                left: 0,
                bottom: 0
            },
            disableoutline: !0,
            horizrailenabled: !0,
            railalign: "right",
            railvalign: "bottom",
            enabletranslate3d: !0,
            enablemousewheel: !0,
            enablekeyboard: !0,
            smoothscroll: !0,
            sensitiverail: !0,
            enablemouselockapi: !0,
            cursorfixedheight: !1,
            directionlockdeadzone: 6,
            hidecursordelay: 400,
            nativeparentscrolling: !0,
            enablescrollonselection: !0,
            overflowx: !0,
            overflowy: !0,
            cursordragspeed: .3,
            rtlmode: "auto",
            cursordragontouch: !1,
            oneaxismousemode: "auto",
            scriptpath: o(),
            preventmultitouchscrolling: !0
        },
        g = !1,
        w = function() {
            function e() {
                var e = ["-webkit-grab", "-moz-grab", "grab"];
                (n.ischrome && !n.ischrome22 || n.isie) && (e = []);
                for (var o = 0; o < e.length; o++) {
                    var r = e[o];
                    if (t.cursor = r, t.cursor == r) return r
                }
                return "url(//mail.google.com/mail/images/2/openhand.cur),n-resize"
            }
            if (g) return g;
            var o = document.createElement("DIV"),
                t = o.style,
                r = navigator.userAgent,
                i = navigator.platform,
                n = {};
            n.haspointerlock = "pointerLockElement" in document || "webkitPointerLockElement" in document || "mozPointerLockElement" in document, n.isopera = "opera" in window, n.isopera12 = n.isopera && "getUserMedia" in navigator, n.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(window.operamini), n.isie = "all" in document && "attachEvent" in o && !n.isopera, n.isieold = n.isie && !("msInterpolationMode" in t), n.isie7 = n.isie && !n.isieold && (!("documentMode" in document) || 7 == document.documentMode), n.isie8 = n.isie && "documentMode" in document && 8 == document.documentMode, n.isie9 = n.isie && "performance" in window && document.documentMode >= 9, n.isie10 = n.isie && "performance" in window && 10 == document.documentMode, n.isie11 = "msRequestFullscreen" in o && document.documentMode >= 11, n.isieedge = navigator.userAgent.match(/Edge\/12\./), n.isie9mobile = /iemobile.9/i.test(r), n.isie9mobile && (n.isie9 = !1), n.isie7mobile = !n.isie9mobile && n.isie7 && /iemobile/i.test(r), n.ismozilla = "MozAppearance" in t, n.iswebkit = "WebkitAppearance" in t, n.ischrome = "chrome" in window, n.ischrome22 = n.ischrome && n.haspointerlock, n.ischrome26 = n.ischrome && "transition" in t, n.cantouch = "ontouchstart" in document.documentElement || "ontouchstart" in window, n.hasmstouch = window.MSPointerEvent || !1, n.hasw3ctouch = (window.PointerEvent || !1) && (navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0), n.ismac = /^mac$/i.test(i), n.isios = n.cantouch && /iphone|ipad|ipod/i.test(i), n.isios4 = n.isios && !("seal" in Object), n.isios7 = n.isios && "webkitHidden" in document, n.isandroid = /android/i.test(r), n.haseventlistener = "addEventListener" in o, n.trstyle = !1, n.hastransform = !1, n.hastranslate3d = !1, n.transitionstyle = !1, n.hastransition = !1, n.transitionend = !1;
            var s, l = ["transform", "msTransform", "webkitTransform", "MozTransform", "OTransform"];
            for (s = 0; s < l.length; s++)
                if ("undefined" != typeof t[l[s]]) {
                    n.trstyle = l[s];
                    break
                }
            n.hastransform = !!n.trstyle, n.hastransform && (t[n.trstyle] = "translate3d(1px,2px,3px)", n.hastranslate3d = /translate3d/.test(t[n.trstyle])), n.transitionstyle = !1, n.prefixstyle = "", n.transitionend = !1, l = ["transition", "webkitTransition", "msTransition", "MozTransition", "OTransition", "OTransition", "KhtmlTransition"];
            var a = ["", "-webkit-", "-ms-", "-moz-", "-o-", "-o", "-khtml-"],
                c = ["transitionend", "webkitTransitionEnd", "msTransitionEnd", "transitionend", "otransitionend", "oTransitionEnd", "KhtmlTransitionEnd"];
            for (s = 0; s < l.length; s++)
                if (l[s] in t) {
                    n.transitionstyle = l[s], n.prefixstyle = a[s], n.transitionend = c[s];
                    break
                }
            return n.ischrome26 && (n.prefixstyle = a[1]), n.hastransition = n.transitionstyle, n.cursorgrabvalue = e(), n.hasmousecapture = "setCapture" in o, n.hasMutationObserver = m !== !1, o = null, g = n, n
        },
        v = function(e, o) {
            function t() {
                var e = v.doc.css(x.trstyle);
                return e && "matrix" == e.substr(0, 6) ? e.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/) : !1
            }

            function c() {
                var e = v.win;
                if ("zIndex" in e) return e.zIndex();
                for (; e.length > 0;) {
                    if (9 == e[0].nodeType) return !1;
                    var o = e.css("zIndex");
                    if (!isNaN(o) && 0 != o) return parseInt(o);
                    e = e.parent()
                }
                return !1
            }

            function h(e, o, t) {
                var r = e.css(o),
                    i = parseFloat(r);
                if (isNaN(i)) {
                    i = k[r] || 0;
                    var n = 3 == i ? t ? v.win.outerHeight() - v.win.innerHeight() : v.win.outerWidth() - v.win.innerWidth() : 1;
                    return v.isie8 && i && (i += 1), n ? i : 0
                }
                return i
            }

            function p(e, o, t, r) {
                v._bind(e, o, function(r) {
                    var r = r ? r : window.event,
                        i = {
                            original: r,
                            target: r.target || r.srcElement,
                            type: "wheel",
                            deltaMode: "MozMousePixelScroll" == r.type ? 0 : 1,
                            deltaX: 0,
                            deltaZ: 0,
                            preventDefault: function() {
                                return r.preventDefault ? r.preventDefault() : r.returnValue = !1, !1
                            },
                            stopImmediatePropagation: function() {
                                r.stopImmediatePropagation ? r.stopImmediatePropagation() : r.cancelBubble = !0
                            }
                        };
                    return "mousewheel" == o ? (i.deltaY = -1 / 40 * r.wheelDelta, r.wheelDeltaX && (i.deltaX = -1 / 40 * r.wheelDeltaX)) : i.deltaY = r.detail, t.call(e, i)
                }, r)
            }

            function g(e, o, t) {
                var r, i;
                if (0 == e.deltaMode ? (r = -Math.floor(e.deltaX * (v.opt.mousescrollstep / 54)), i = -Math.floor(e.deltaY * (v.opt.mousescrollstep / 54))) : 1 == e.deltaMode && (r = -Math.floor(e.deltaX * v.opt.mousescrollstep), i = -Math.floor(e.deltaY * v.opt.mousescrollstep)), o && v.opt.oneaxismousemode && 0 == r && i && (r = i, i = 0, t)) {
                    var n = 0 > r ? v.getScrollLeft() >= v.page.maxw : v.getScrollLeft() <= 0;
                    n && (i = r, r = 0)
                }
                if (r && (v.scrollmom && v.scrollmom.stop(), v.lastdeltax += r, v.debounced("mousewheelx", function() {
                        var e = v.lastdeltax;
                        v.lastdeltax = 0, v.rail.drag || v.doScrollLeftBy(e)
                    }, 15)), i) {
                    if (v.opt.nativeparentscrolling && t && !v.ispage && !v.zoomactive)
                        if (0 > i) {
                            if (v.getScrollTop() >= v.page.maxh) return !0
                        } else if (v.getScrollTop() <= 0) return !0;
                    v.scrollmom && v.scrollmom.stop(), v.lastdeltay += i, v.debounced("mousewheely", function() {
                        var e = v.lastdeltay;
                        v.lastdeltay = 0, v.rail.drag || v.doScrollBy(e)
                    }, 15)
                }
                return e.stopImmediatePropagation(), e.preventDefault()
            }
            var v = this;
            if (this.version = "3.6.6", this.name = "nicescroll", this.me = o, this.opt = {
                    doc: a("body"),
                    win: !1
                }, a.extend(this.opt, f), this.opt.snapbackspeed = 80, e)
                for (var y in v.opt) "undefined" != typeof e[y] && (v.opt[y] = e[y]);
            this.doc = v.opt.doc, this.iddoc = this.doc && this.doc[0] ? this.doc[0].id || "" : "", this.ispage = /^BODY|HTML/.test(v.opt.win ? v.opt.win[0].nodeName : this.doc[0].nodeName), this.haswrapper = v.opt.win !== !1, this.win = v.opt.win || (this.ispage ? a(window) : this.doc), this.docscroll = this.ispage && !this.haswrapper ? a(window) : this.win, this.body = a("body"), this.viewport = !1, this.isfixed = !1, this.iframe = !1, this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName, this.istextarea = "TEXTAREA" == this.win[0].nodeName, this.forcescreen = !1, this.canshowonmouseevent = "scroll" != v.opt.autohidemode, this.onmousedown = !1, this.onmouseup = !1, this.onmousemove = !1, this.onmousewheel = !1, this.onkeypress = !1, this.ongesturezoom = !1, this.onclick = !1, this.onscrollstart = !1, this.onscrollend = !1, this.onscrollcancel = !1, this.onzoomin = !1, this.onzoomout = !1, this.view = !1, this.page = !1, this.scroll = {
                x: 0,
                y: 0
            }, this.scrollratio = {
                x: 0,
                y: 0
            }, this.cursorheight = 20, this.scrollvaluemax = 0, this.isrtlmode = "auto" == this.opt.rtlmode ? "rtl" == (this.win[0] == window ? this.body : this.win).css("direction") : this.opt.rtlmode === !0, this.scrollrunning = !1, this.scrollmom = !1, this.observer = !1, this.observerremover = !1, this.observerbody = !1;
            do this.id = "ascrail" + s++; while (document.getElementById(this.id));
            this.rail = !1, this.cursor = !1, this.cursorfreezed = !1, this.selectiondrag = !1, this.zoom = !1, this.zoomactive = !1, this.hasfocus = !1, this.hasmousefocus = !1, this.visibility = !0, this.railslocked = !1, this.locked = !1, this.hidden = !1, this.cursoractive = !0, this.wheelprevented = !1, this.overflowx = v.opt.overflowx, this.overflowy = v.opt.overflowy, this.nativescrollingarea = !1, this.checkarea = 0, this.events = [], this.saved = {}, this.delaylist = {}, this.synclist = {}, this.lastdeltax = 0, this.lastdeltay = 0, this.detected = w();
            var x = a.extend({}, this.detected);
            this.canhwscroll = x.hastransform && v.opt.hwacceleration, this.ishwscroll = this.canhwscroll && v.haswrapper, this.hasreversehr = this.isrtlmode && !x.iswebkit, this.istouchcapable = !1, !x.cantouch || x.isios || x.isandroid || !x.iswebkit && !x.ismozilla || (this.istouchcapable = !0, x.cantouch = !1), v.opt.enablemouselockapi || (x.hasmousecapture = !1, x.haspointerlock = !1), this.debounced = function(e, o, t) {
                var r = v.delaylist[e];
                v.delaylist[e] = o, r || (v.debouncedelayed = setTimeout(function() {
                    if (v) {
                        var o = v.delaylist[e];
                        v.delaylist[e] = !1, o.call(v)
                    }
                }, t))
            };
            var S = !1;
            this.synched = function(e, o) {
                function t() {
                    S || (d(function() {
                        S = !1;
                        for (var e in v.synclist) {
                            var o = v.synclist[e];
                            o && o.call(v), v.synclist[e] = !1
                        }
                    }), S = !0)
                }
                return v.synclist[e] = o, t(), e
            }, this.unsynched = function(e) {
                v.synclist[e] && (v.synclist[e] = !1)
            }, this.css = function(e, o) {
                for (var t in o) v.saved.css.push([e, t, e.css(t)]), e.css(t, o[t])
            }, this.scrollTop = function(e) {
                return "undefined" == typeof e ? v.getScrollTop() : v.setScrollTop(e)
            }, this.scrollLeft = function(e) {
                return "undefined" == typeof e ? v.getScrollLeft() : v.setScrollLeft(e)
            };
            var z = function(e, o, t, r, i, n, s) {
                this.st = e, this.ed = o, this.spd = t, this.p1 = r || 0, this.p2 = i || 1, this.p3 = n || 0, this.p4 = s || 1, this.ts = (new Date).getTime(), this.df = this.ed - this.st
            };
            if (z.prototype = {
                    B2: function(e) {
                        return 3 * e * e * (1 - e)
                    },
                    B3: function(e) {
                        return 3 * e * (1 - e) * (1 - e)
                    },
                    B4: function(e) {
                        return (1 - e) * (1 - e) * (1 - e)
                    },
                    getNow: function() {
                        var e = (new Date).getTime(),
                            o = 1 - (e - this.ts) / this.spd,
                            t = this.B2(o) + this.B3(o) + this.B4(o);
                        return 0 > o ? this.ed : this.st + Math.round(this.df * t)
                    },
                    update: function(e, o) {
                        return this.st = this.getNow(), this.ed = e, this.spd = o, this.ts = (new Date).getTime(), this.df = this.ed - this.st, this
                    }
                }, this.ishwscroll) {
                this.doc.translate = {
                    x: 0,
                    y: 0,
                    tx: "0px",
                    ty: "0px"
                }, x.hastranslate3d && x.isios && this.doc.css("-webkit-backface-visibility", "hidden"), this.getScrollTop = function(e) {
                    if (!e) {
                        var o = t();
                        if (o) return 16 == o.length ? -o[13] : -o[5];
                        if (v.timerscroll && v.timerscroll.bz) return v.timerscroll.bz.getNow()
                    }
                    return v.doc.translate.y
                }, this.getScrollLeft = function(e) {
                    if (!e) {
                        var o = t();
                        if (o) return 16 == o.length ? -o[12] : -o[4];
                        if (v.timerscroll && v.timerscroll.bh) return v.timerscroll.bh.getNow()
                    }
                    return v.doc.translate.x
                }, this.notifyScrollEvent = function(e) {
                    var o = document.createEvent("UIEvents");
                    o.initUIEvent("scroll", !1, !0, window, 1), o.niceevent = !0, e.dispatchEvent(o)
                };
                var T = this.isrtlmode ? 1 : -1;
                x.hastranslate3d && v.opt.enabletranslate3d ? (this.setScrollTop = function(e, o) {
                    v.doc.translate.y = e, v.doc.translate.ty = -1 * e + "px", v.doc.css(x.trstyle, "translate3d(" + v.doc.translate.tx + "," + v.doc.translate.ty + ",0px)"), o || v.notifyScrollEvent(v.win[0])
                }, this.setScrollLeft = function(e, o) {
                    v.doc.translate.x = e, v.doc.translate.tx = e * T + "px", v.doc.css(x.trstyle, "translate3d(" + v.doc.translate.tx + "," + v.doc.translate.ty + ",0px)"), o || v.notifyScrollEvent(v.win[0])
                }) : (this.setScrollTop = function(e, o) {
                    v.doc.translate.y = e, v.doc.translate.ty = -1 * e + "px", v.doc.css(x.trstyle, "translate(" + v.doc.translate.tx + "," + v.doc.translate.ty + ")"), o || v.notifyScrollEvent(v.win[0])
                }, this.setScrollLeft = function(e, o) {
                    v.doc.translate.x = e, v.doc.translate.tx = e * T + "px", v.doc.css(x.trstyle, "translate(" + v.doc.translate.tx + "," + v.doc.translate.ty + ")"), o || v.notifyScrollEvent(v.win[0])
                })
            } else this.getScrollTop = function() {
                return v.docscroll.scrollTop()
            }, this.setScrollTop = function(e) {
                return setTimeout(function() {
                    v.docscroll.scrollTop(e)
                }, 1)
            }, this.getScrollLeft = function() {
                return v.detected.ismozilla && v.isrtlmode ? Math.abs(v.docscroll.scrollLeft()) : v.docscroll.scrollLeft()
            }, this.setScrollLeft = function(e) {
                return setTimeout(function() {
                    v.docscroll.scrollLeft(v.detected.ismozilla && v.isrtlmode ? -e : e)
                }, 1)
            };
            this.getTarget = function(e) {
                return e ? e.target ? e.target : e.srcElement ? e.srcElement : !1 : !1
            }, this.hasParent = function(e, o) {
                if (!e) return !1;
                for (var t = e.target || e.srcElement || e || !1; t && t.id != o;) t = t.parentNode || !1;
                return t !== !1
            };
            var k = {
                thin: 1,
                medium: 3,
                thick: 5
            };
            this.getDocumentScrollOffset = function() {
                return {
                    top: window.pageYOffset || document.documentElement.scrollTop,
                    left: window.pageXOffset || document.documentElement.scrollLeft
                }
            }, this.getOffset = function() {
                if (v.isfixed) {
                    var e = v.win.offset(),
                        o = v.getDocumentScrollOffset();
                    return e.top -= o.top, e.left -= o.left, e
                }
                var t = v.win.offset();
                if (!v.viewport) return t;
                var r = v.viewport.offset();
                return {
                    top: t.top - r.top,
                    left: t.left - r.left
                }
            }, this.updateScrollBar = function(e) {
                if (v.ishwscroll) v.rail.css({
                    height: v.win.innerHeight() - (v.opt.railpadding.top + v.opt.railpadding.bottom)
                }), v.railh && v.railh.css({
                    width: v.win.innerWidth() - (v.opt.railpadding.left + v.opt.railpadding.right)
                });
                else {
                    var o = v.getOffset(),
                        t = {
                            top: o.top,
                            left: o.left - (v.opt.railpadding.left + v.opt.railpadding.right)
                        };
                    t.top += h(v.win, "border-top-width", !0), t.left += v.rail.align ? v.win.outerWidth() - h(v.win, "border-right-width") - v.rail.width : h(v.win, "border-left-width");
                    var r = v.opt.railoffset;
                    if (r && (r.top && (t.top += r.top), r.left && (t.left += r.left)), v.railslocked || v.rail.css({
                            top: t.top,
                            left: t.left,
                            height: (e ? e.h : v.win.innerHeight()) - (v.opt.railpadding.top + v.opt.railpadding.bottom)
                        }), v.zoom && v.zoom.css({
                            top: t.top + 1,
                            left: 1 == v.rail.align ? t.left - 20 : t.left + v.rail.width + 4
                        }), v.railh && !v.railslocked) {
                        var t = {
                                top: o.top,
                                left: o.left
                            },
                            r = v.opt.railhoffset;
                        r && (r.top && (t.top += r.top), r.left && (t.left += r.left));
                        var i = v.railh.align ? t.top + h(v.win, "border-top-width", !0) + v.win.innerHeight() - v.railh.height : t.top + h(v.win, "border-top-width", !0),
                            n = t.left + h(v.win, "border-left-width");
                        v.railh.css({
                            top: i - (v.opt.railpadding.top + v.opt.railpadding.bottom),
                            left: n,
                            width: v.railh.width
                        })
                    }
                }
            }, this.doRailClick = function(e, o, t) {
                var r, i, n, s;
                v.railslocked || (v.cancelEvent(e), o ? (r = t ? v.doScrollLeft : v.doScrollTop, n = t ? (e.pageX - v.railh.offset().left - v.cursorwidth / 2) * v.scrollratio.x : (e.pageY - v.rail.offset().top - v.cursorheight / 2) * v.scrollratio.y, r(n)) : (r = t ? v.doScrollLeftBy : v.doScrollBy, n = t ? v.scroll.x : v.scroll.y, s = t ? e.pageX - v.railh.offset().left : e.pageY - v.rail.offset().top, i = t ? v.view.w : v.view.h, r(n >= s ? i : -i)))
            }, v.hasanimationframe = d, v.hascancelanimationframe = u, v.hasanimationframe ? v.hascancelanimationframe || (u = function() {
                v.cancelAnimationFrame = !0
            }) : (d = function(e) {
                return setTimeout(e, 15 - Math.floor(+new Date / 1e3) % 16)
            }, u = clearInterval), this.init = function() {
                if (v.saved.css = [], x.isie7mobile) return !0;
                if (x.isoperamini) return !0;
                if (x.hasmstouch && v.css(v.ispage ? a("html") : v.win, {
                        "-ms-touch-action": "none"
                    }), v.zindex = "auto", v.ispage || "auto" != v.opt.zindex ? v.zindex = v.opt.zindex : v.zindex = c() || "auto", v.ispage || "auto" == v.zindex || v.zindex > l && (l = v.zindex), v.isie && 0 == v.zindex && "auto" == v.opt.zindex && (v.zindex = "auto"), !v.ispage || !x.cantouch && !x.isieold && !x.isie9mobile) {
                    var e = v.docscroll;
                    v.ispage && (e = v.haswrapper ? v.win : v.doc), x.isie9mobile || v.css(e, {
                        "overflow-y": "hidden"
                    }), v.ispage && x.isie7 && ("BODY" == v.doc[0].nodeName ? v.css(a("html"), {
                        "overflow-y": "hidden"
                    }) : "HTML" == v.doc[0].nodeName && v.css(a("body"), {
                        "overflow-y": "hidden"
                    })), !x.isios || v.ispage || v.haswrapper || v.css(a("body"), {
                        "-webkit-overflow-scrolling": "touch"
                    });
                    var o = a(document.createElement("div"));
                    o.css({
                        position: "relative",
                        top: 0,
                        "float": "right",
                        width: v.opt.cursorwidth,
                        height: "0px",
                        "background-color": v.opt.cursorcolor,
                        border: v.opt.cursorborder,
                        "background-clip": "padding-box",
                        "-webkit-border-radius": v.opt.cursorborderradius,
                        "-moz-border-radius": v.opt.cursorborderradius,
                        "border-radius": v.opt.cursorborderradius
                    }), o.hborder = parseFloat(o.outerHeight() - o.innerHeight()), o.addClass("nicescroll-cursors"), v.cursor = o;
                    var t = a(document.createElement("div"));
                    t.attr("id", v.id), t.addClass("nicescroll-rails nicescroll-rails-vr");
                    var s, d, u = ["left", "right", "top", "bottom"];
                    for (var h in u) d = u[h], s = v.opt.railpadding[d], s ? t.css("padding-" + d, s + "px") : v.opt.railpadding[d] = 0;
                    t.append(o), t.width = Math.max(parseFloat(v.opt.cursorwidth), o.outerWidth()), t.css({
                        width: t.width + "px",
                        zIndex: v.zindex,
                        background: v.opt.background,
                        cursor: "default"
                    }), t.visibility = !0, t.scrollable = !0, t.align = "left" == v.opt.railalign ? 0 : 1, v.rail = t, v.rail.drag = !1;
                    var p = !1;
                    !v.opt.boxzoom || v.ispage || x.isieold || (p = document.createElement("div"), v.bind(p, "click", v.doZoom), v.bind(p, "mouseenter", function() {
                        v.zoom.css("opacity", v.opt.cursoropacitymax)
                    }), v.bind(p, "mouseleave", function() {
                        v.zoom.css("opacity", v.opt.cursoropacitymin)
                    }), v.zoom = a(p), v.zoom.css({
                        cursor: "pointer",
                        "z-index": v.zindex,
                        backgroundImage: "url(" + v.opt.scriptpath + "zoomico.png)",
                        height: 18,
                        width: 18,
                        backgroundPosition: "0px 0px"
                    }), v.opt.dblclickzoom && v.bind(v.win, "dblclick", v.doZoom), x.cantouch && v.opt.gesturezoom && (v.ongesturezoom = function(e) {
                        return e.scale > 1.5 && v.doZoomIn(e), e.scale < .8 && v.doZoomOut(e), v.cancelEvent(e)
                    }, v.bind(v.win, "gestureend", v.ongesturezoom))), v.railh = !1;
                    var f;
                    if (v.opt.horizrailenabled) {
                        v.css(e, {
                            "overflow-x": "hidden"
                        });
                        var o = a(document.createElement("div"));
                        o.css({
                            position: "absolute",
                            top: 0,
                            height: v.opt.cursorwidth,
                            width: "0px",
                            "background-color": v.opt.cursorcolor,
                            border: v.opt.cursorborder,
                            "background-clip": "padding-box",
                            "-webkit-border-radius": v.opt.cursorborderradius,
                            "-moz-border-radius": v.opt.cursorborderradius,
                            "border-radius": v.opt.cursorborderradius
                        }), x.isieold && o.css({
                            overflow: "hidden"
                        }), o.wborder = parseFloat(o.outerWidth() - o.innerWidth()), o.addClass("nicescroll-cursors"), v.cursorh = o, f = a(document.createElement("div")), f.attr("id", v.id + "-hr"), f.addClass("nicescroll-rails nicescroll-rails-hr"), f.height = Math.max(parseFloat(v.opt.cursorwidth), o.outerHeight()), f.css({
                            height: f.height + "px",
                            zIndex: v.zindex,
                            background: v.opt.background
                        }), f.append(o), f.visibility = !0, f.scrollable = !0, f.align = "top" == v.opt.railvalign ? 0 : 1, v.railh = f, v.railh.drag = !1
                    }
                    if (v.ispage) t.css({
                        position: "fixed",
                        top: "0px",
                        height: "100%"
                    }), t.align ? t.css({
                        right: "0px"
                    }) : t.css({
                        left: "0px"
                    }), v.body.append(t), v.railh && (f.css({
                        position: "fixed",
                        left: "0px",
                        width: "100%"
                    }), f.align ? f.css({
                        bottom: "0px"
                    }) : f.css({
                        top: "0px"
                    }), v.body.append(f));
                    else {
                        if (v.ishwscroll) {
                            "static" == v.win.css("position") && v.css(v.win, {
                                position: "relative"
                            });
                            var g = "HTML" == v.win[0].nodeName ? v.body : v.win;
                            a(g).scrollTop(0).scrollLeft(0), v.zoom && (v.zoom.css({
                                position: "absolute",
                                top: 1,
                                right: 0,
                                "margin-right": t.width + 4
                            }), g.append(v.zoom)), t.css({
                                position: "absolute",
                                top: 0
                            }), t.align ? t.css({
                                right: 0
                            }) : t.css({
                                left: 0
                            }), g.append(t), f && (f.css({
                                position: "absolute",
                                left: 0,
                                bottom: 0
                            }), f.align ? f.css({
                                bottom: 0
                            }) : f.css({
                                top: 0
                            }), g.append(f))
                        } else {
                            v.isfixed = "fixed" == v.win.css("position");
                            var w = v.isfixed ? "fixed" : "absolute";
                            v.isfixed || (v.viewport = v.getViewport(v.win[0])), v.viewport && (v.body = v.viewport, 0 == /fixed|absolute/.test(v.viewport.css("position")) && v.css(v.viewport, {
                                position: "relative"
                            })), t.css({
                                position: w
                            }), v.zoom && v.zoom.css({
                                position: w
                            }), v.updateScrollBar(), v.body.append(t), v.zoom && v.body.append(v.zoom), v.railh && (f.css({
                                position: w
                            }), v.body.append(f))
                        }
                        x.isios && v.css(v.win, {
                            "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                            "-webkit-touch-callout": "none"
                        }), x.isie && v.opt.disableoutline && v.win.attr("hideFocus", "true"), x.iswebkit && v.opt.disableoutline && v.win.css({
                            outline: "none"
                        })
                    }
                    if (v.opt.autohidemode === !1 ? (v.autohidedom = !1, v.rail.css({
                            opacity: v.opt.cursoropacitymax
                        }), v.railh && v.railh.css({
                            opacity: v.opt.cursoropacitymax
                        })) : v.opt.autohidemode === !0 || "leave" === v.opt.autohidemode ? (v.autohidedom = a().add(v.rail), x.isie8 && (v.autohidedom = v.autohidedom.add(v.cursor)), v.railh && (v.autohidedom = v.autohidedom.add(v.railh)), v.railh && x.isie8 && (v.autohidedom = v.autohidedom.add(v.cursorh))) : "scroll" == v.opt.autohidemode ? (v.autohidedom = a().add(v.rail), v.railh && (v.autohidedom = v.autohidedom.add(v.railh))) : "cursor" == v.opt.autohidemode ? (v.autohidedom = a().add(v.cursor), v.railh && (v.autohidedom = v.autohidedom.add(v.cursorh))) : "hidden" == v.opt.autohidemode && (v.autohidedom = !1, v.hide(), v.railslocked = !1), x.isie9mobile) {
                        v.scrollmom = new b(v), v.onmangotouch = function() {
                            var e = v.getScrollTop(),
                                o = v.getScrollLeft();
                            if (e == v.scrollmom.lastscrolly && o == v.scrollmom.lastscrollx) return !0;
                            var t = e - v.mangotouch.sy,
                                r = o - v.mangotouch.sx,
                                i = Math.round(Math.sqrt(Math.pow(r, 2) + Math.pow(t, 2)));
                            if (0 != i) {
                                var n = 0 > t ? -1 : 1,
                                    s = 0 > r ? -1 : 1,
                                    l = +new Date;
                                if (v.mangotouch.lazy && clearTimeout(v.mangotouch.lazy), l - v.mangotouch.tm > 80 || v.mangotouch.dry != n || v.mangotouch.drx != s) v.scrollmom.stop(), v.scrollmom.reset(o, e), v.mangotouch.sy = e, v.mangotouch.ly = e, v.mangotouch.sx = o, v.mangotouch.lx = o, v.mangotouch.dry = n, v.mangotouch.drx = s, v.mangotouch.tm = l;
                                else {
                                    v.scrollmom.stop(), v.scrollmom.update(v.mangotouch.sx - r, v.mangotouch.sy - t), v.mangotouch.tm = l;
                                    var a = Math.max(Math.abs(v.mangotouch.ly - e), Math.abs(v.mangotouch.lx - o));
                                    v.mangotouch.ly = e, v.mangotouch.lx = o, a > 2 && (v.mangotouch.lazy = setTimeout(function() {
                                        v.mangotouch.lazy = !1, v.mangotouch.dry = 0, v.mangotouch.drx = 0, v.mangotouch.tm = 0, v.scrollmom.doMomentum(30)
                                    }, 100))
                                }
                            }
                        };
                        var y = v.getScrollTop(),
                            S = v.getScrollLeft();
                        v.mangotouch = {
                            sy: y,
                            ly: y,
                            dry: 0,
                            sx: S,
                            lx: S,
                            drx: 0,
                            lazy: !1,
                            tm: 0
                        }, v.bind(v.docscroll, "scroll", v.onmangotouch)
                    } else {
                        if (x.cantouch || v.istouchcapable || v.opt.touchbehavior || x.hasmstouch) {
                            v.scrollmom = new b(v), v.ontouchstart = function(e) {
                                if (e.pointerType && 2 != e.pointerType && "touch" != e.pointerType) return !1;
                                if (v.hasmoving = !1, !v.railslocked) {
                                    var o;
                                    if (x.hasmstouch)
                                        for (o = e.target ? e.target : !1; o;) {
                                            var t = a(o).getNiceScroll();
                                            if (t.length > 0 && t[0].me == v.me) break;
                                            if (t.length > 0) return !1;
                                            if ("DIV" == o.nodeName && o.id == v.id) break;
                                            o = o.parentNode ? o.parentNode : !1
                                        }
                                    if (v.cancelScroll(), o = v.getTarget(e)) {
                                        var r = /INPUT/i.test(o.nodeName) && /range/i.test(o.type);
                                        if (r) return v.stopPropagation(e)
                                    }
                                    if (!("clientX" in e) && "changedTouches" in e && (e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY), v.forcescreen) {
                                        var i = e;
                                        e = {
                                            original: e.original ? e.original : e
                                        }, e.clientX = i.screenX, e.clientY = i.screenY
                                    }
                                    if (v.rail.drag = {
                                            x: e.clientX,
                                            y: e.clientY,
                                            sx: v.scroll.x,
                                            sy: v.scroll.y,
                                            st: v.getScrollTop(),
                                            sl: v.getScrollLeft(),
                                            pt: 2,
                                            dl: !1
                                        }, v.ispage || !v.opt.directionlockdeadzone) v.rail.drag.dl = "f";
                                    else {
                                        var n = {
                                                w: a(window).width(),
                                                h: a(window).height()
                                            },
                                            s = {
                                                w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                                                h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                                            },
                                            l = Math.max(0, s.h - n.h),
                                            c = Math.max(0, s.w - n.w);
                                        !v.rail.scrollable && v.railh.scrollable ? v.rail.drag.ck = l > 0 ? "v" : !1 : v.rail.scrollable && !v.railh.scrollable ? v.rail.drag.ck = c > 0 ? "h" : !1 : v.rail.drag.ck = !1, v.rail.drag.ck || (v.rail.drag.dl = "f")
                                    }
                                    if (v.opt.touchbehavior && v.isiframe && x.isie) {
                                        var d = v.win.position();
                                        v.rail.drag.x += d.left, v.rail.drag.y += d.top
                                    }
                                    if (v.hasmoving = !1, v.lastmouseup = !1, v.scrollmom.reset(e.clientX, e.clientY), !x.cantouch && !this.istouchcapable && !e.pointerType) {
                                        var u = o ? /INPUT|SELECT|TEXTAREA/i.test(o.nodeName) : !1;
                                        if (!u) return !v.ispage && x.hasmousecapture && o.setCapture(), v.opt.touchbehavior ? (o.onclick && !o._onclick && (o._onclick = o.onclick, o.onclick = function(e) {
                                            return v.hasmoving ? !1 : void o._onclick.call(this, e)
                                        }), v.cancelEvent(e)) : v.stopPropagation(e);
                                        /SUBMIT|CANCEL|BUTTON/i.test(a(o).attr("type")) && (pc = {
                                            tg: o,
                                            click: !1
                                        }, v.preventclick = pc)
                                    }
                                }
                            }, v.ontouchend = function(e) {
                                if (!v.rail.drag) return !0;
                                if (2 == v.rail.drag.pt) {
                                    if (e.pointerType && 2 != e.pointerType && "touch" != e.pointerType) return !1;
                                    if (v.scrollmom.doMomentum(), v.rail.drag = !1, v.hasmoving && (v.lastmouseup = !0, v.hideCursor(), x.hasmousecapture && document.releaseCapture(), !x.cantouch)) return v.cancelEvent(e)
                                } else if (1 == v.rail.drag.pt) return v.onmouseup(e)
                            };
                            var z = v.opt.touchbehavior && v.isiframe && !x.hasmousecapture;
                            v.ontouchmove = function(e, o) {
                                if (!v.rail.drag) return !1;
                                if (e.targetTouches && v.opt.preventmultitouchscrolling && e.targetTouches.length > 1) return !1;
                                if (e.pointerType && 2 != e.pointerType && "touch" != e.pointerType) return !1;
                                if (2 == v.rail.drag.pt) {
                                    if (x.cantouch && x.isios && "undefined" == typeof e.original) return !0;
                                    v.hasmoving = !0, v.preventclick && !v.preventclick.click && (v.preventclick.click = v.preventclick.tg.onclick || !1, v.preventclick.tg.onclick = v.onpreventclick);
                                    var t = a.extend({
                                        original: e
                                    }, e);
                                    if (e = t, "changedTouches" in e && (e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY), v.forcescreen) {
                                        var r = e;
                                        e = {
                                            original: e.original ? e.original : e
                                        }, e.clientX = r.screenX, e.clientY = r.screenY
                                    }
                                    var i, n;
                                    if (n = i = 0, z && !o) {
                                        var s = v.win.position();
                                        n = -s.left, i = -s.top
                                    }
                                    var l = e.clientY + i,
                                        c = l - v.rail.drag.y,
                                        d = e.clientX + n,
                                        u = d - v.rail.drag.x,
                                        h = v.rail.drag.st - c;
                                    v.ishwscroll && v.opt.bouncescroll ? 0 > h ? h = Math.round(h / 2) : h > v.page.maxh && (h = v.page.maxh + Math.round((h - v.page.maxh) / 2)) : (0 > h && (h = 0, l = 0), h > v.page.maxh && (h = v.page.maxh, l = 0));
                                    var p;
                                    v.railh && v.railh.scrollable && (p = v.isrtlmode ? u - v.rail.drag.sl : v.rail.drag.sl - u, v.ishwscroll && v.opt.bouncescroll ? 0 > p ? p = Math.round(p / 2) : p > v.page.maxw && (p = v.page.maxw + Math.round((p - v.page.maxw) / 2)) : (0 > p && (p = 0, d = 0), p > v.page.maxw && (p = v.page.maxw, d = 0)));
                                    var m = !1;
                                    if (v.rail.drag.dl) m = !0, "v" == v.rail.drag.dl ? p = v.rail.drag.sl : "h" == v.rail.drag.dl && (h = v.rail.drag.st);
                                    else {
                                        var f = Math.abs(c),
                                            g = Math.abs(u),
                                            w = v.opt.directionlockdeadzone;
                                        if ("v" == v.rail.drag.ck) {
                                            if (f > w && .3 * f >= g) return v.rail.drag = !1, !0;
                                            g > w && (v.rail.drag.dl = "f", a("body").scrollTop(a("body").scrollTop()))
                                        } else if ("h" == v.rail.drag.ck) {
                                            if (g > w && .3 * g >= f) return v.rail.drag = !1, !0;
                                            f > w && (v.rail.drag.dl = "f", a("body").scrollLeft(a("body").scrollLeft()))
                                        }
                                    }
                                    if (v.synched("touchmove", function() {
                                            v.rail.drag && 2 == v.rail.drag.pt && (v.prepareTransition && v.prepareTransition(0), v.rail.scrollable && v.setScrollTop(h), v.scrollmom.update(d, l), v.railh && v.railh.scrollable ? (v.setScrollLeft(p), v.showCursor(h, p)) : v.showCursor(h), x.isie10 && document.selection.clear())
                                        }), x.ischrome && v.istouchcapable && (m = !1), m) return v.cancelEvent(e)
                                } else if (1 == v.rail.drag.pt) return v.onmousemove(e)
                            }
                        }
                        if (v.onmousedown = function(e, o) {
                                if (!v.rail.drag || 1 == v.rail.drag.pt) {
                                    if (v.railslocked) return v.cancelEvent(e);
                                    v.cancelScroll(), v.rail.drag = {
                                        x: e.clientX,
                                        y: e.clientY,
                                        sx: v.scroll.x,
                                        sy: v.scroll.y,
                                        pt: 1,
                                        hr: !!o
                                    };
                                    var t = v.getTarget(e);
                                    return !v.ispage && x.hasmousecapture && t.setCapture(), v.isiframe && !x.hasmousecapture && (v.saved.csspointerevents = v.doc.css("pointer-events"), v.css(v.doc, {
                                        "pointer-events": "none"
                                    })), v.hasmoving = !1, v.cancelEvent(e)
                                }
                            }, v.onmouseup = function(e) {
                                return v.rail.drag ? 1 != v.rail.drag.pt ? !0 : (x.hasmousecapture && document.releaseCapture(), v.isiframe && !x.hasmousecapture && v.doc.css("pointer-events", v.saved.csspointerevents), v.rail.drag = !1, v.hasmoving && v.triggerScrollEnd(), v.cancelEvent(e)) : void 0
                            }, v.onmousemove = function(e) {
                                if (v.rail.drag) {
                                    if (1 != v.rail.drag.pt) return;
                                    if (x.ischrome && 0 == e.which) return v.onmouseup(e);
                                    if (v.cursorfreezed = !0, v.hasmoving = !0, v.rail.drag.hr) {
                                        v.scroll.x = v.rail.drag.sx + (e.clientX - v.rail.drag.x), v.scroll.x < 0 && (v.scroll.x = 0);
                                        var o = v.scrollvaluemaxw;
                                        v.scroll.x > o && (v.scroll.x = o)
                                    } else {
                                        v.scroll.y = v.rail.drag.sy + (e.clientY - v.rail.drag.y), v.scroll.y < 0 && (v.scroll.y = 0);
                                        var t = v.scrollvaluemax;
                                        v.scroll.y > t && (v.scroll.y = t)
                                    }
                                    return v.synched("mousemove", function() {
                                        v.rail.drag && 1 == v.rail.drag.pt && (v.showCursor(), v.rail.drag.hr ? v.hasreversehr ? v.doScrollLeft(v.scrollvaluemaxw - Math.round(v.scroll.x * v.scrollratio.x), v.opt.cursordragspeed) : v.doScrollLeft(Math.round(v.scroll.x * v.scrollratio.x), v.opt.cursordragspeed) : v.doScrollTop(Math.round(v.scroll.y * v.scrollratio.y), v.opt.cursordragspeed))
                                    }), v.cancelEvent(e)
                                }
                                v.checkarea = 0
                            }, x.cantouch || v.opt.touchbehavior) v.onpreventclick = function(e) {
                            return v.preventclick ? (v.preventclick.tg.onclick = v.preventclick.click, v.preventclick = !1, v.cancelEvent(e)) : void 0
                        }, v.bind(v.win, "mousedown", v.ontouchstart), v.onclick = x.isios ? !1 : function(e) {
                            return v.lastmouseup ? (v.lastmouseup = !1, v.cancelEvent(e)) : !0
                        }, v.opt.grabcursorenabled && x.cursorgrabvalue && (v.css(v.ispage ? v.doc : v.win, {
                            cursor: x.cursorgrabvalue
                        }), v.css(v.rail, {
                            cursor: x.cursorgrabvalue
                        }));
                        else {
                            var T = function(e) {
                                if (v.selectiondrag) {
                                    if (e) {
                                        var o = v.win.outerHeight(),
                                            t = e.pageY - v.selectiondrag.top;
                                        t > 0 && o > t && (t = 0), t >= o && (t -= o), v.selectiondrag.df = t
                                    }
                                    if (0 != v.selectiondrag.df) {
                                        var r = 2 * -Math.floor(v.selectiondrag.df / 6);
                                        v.doScrollBy(r), v.debounced("doselectionscroll", function() {
                                            T()
                                        }, 50)
                                    }
                                }
                            };
                            "getSelection" in document ? v.hasTextSelected = function() {
                                return document.getSelection().rangeCount > 0
                            } : "selection" in document ? v.hasTextSelected = function() {
                                return "None" != document.selection.type
                            } : v.hasTextSelected = function() {
                                return !1
                            }, v.onselectionstart = function(e) {
                                v.ispage || (v.selectiondrag = v.win.offset())
                            }, v.onselectionend = function(e) {
                                v.selectiondrag = !1
                            }, v.onselectiondrag = function(e) {
                                v.selectiondrag && v.hasTextSelected() && v.debounced("selectionscroll", function() {
                                    T(e)
                                }, 250)
                            }
                        }
                        x.hasw3ctouch ? (v.css(v.rail, {
                            "touch-action": "none"
                        }), v.css(v.cursor, {
                            "touch-action": "none"
                        }), v.bind(v.win, "pointerdown", v.ontouchstart), v.bind(document, "pointerup", v.ontouchend), v.bind(document, "pointermove", v.ontouchmove)) : x.hasmstouch ? (v.css(v.rail, {
                            "-ms-touch-action": "none"
                        }), v.css(v.cursor, {
                            "-ms-touch-action": "none"
                        }), v.bind(v.win, "MSPointerDown", v.ontouchstart), v.bind(document, "MSPointerUp", v.ontouchend), v.bind(document, "MSPointerMove", v.ontouchmove), v.bind(v.cursor, "MSGestureHold", function(e) {
                            e.preventDefault()
                        }), v.bind(v.cursor, "contextmenu", function(e) {
                            e.preventDefault()
                        })) : this.istouchcapable && (v.bind(v.win, "touchstart", v.ontouchstart), v.bind(document, "touchend", v.ontouchend), v.bind(document, "touchcancel", v.ontouchend), v.bind(document, "touchmove", v.ontouchmove)), (v.opt.cursordragontouch || !x.cantouch && !v.opt.touchbehavior) && (v.rail.css({
                            cursor: "default"
                        }), v.railh && v.railh.css({
                            cursor: "default"
                        }), v.jqbind(v.rail, "mouseenter", function() {
                            return v.ispage || v.win.is(":visible") ? (v.canshowonmouseevent && v.showCursor(), void(v.rail.active = !0)) : !1
                        }), v.jqbind(v.rail, "mouseleave", function() {
                            v.rail.active = !1, v.rail.drag || v.hideCursor()
                        }), v.opt.sensitiverail && (v.bind(v.rail, "click", function(e) {
                            v.doRailClick(e, !1, !1)
                        }), v.bind(v.rail, "dblclick", function(e) {
                            v.doRailClick(e, !0, !1)
                        }), v.bind(v.cursor, "click", function(e) {
                            v.cancelEvent(e)
                        }), v.bind(v.cursor, "dblclick", function(e) {
                            v.cancelEvent(e)
                        })), v.railh && (v.jqbind(v.railh, "mouseenter", function() {
                            return v.ispage || v.win.is(":visible") ? (v.canshowonmouseevent && v.showCursor(), void(v.rail.active = !0)) : !1
                        }), v.jqbind(v.railh, "mouseleave", function() {
                            v.rail.active = !1, v.rail.drag || v.hideCursor()
                        }), v.opt.sensitiverail && (v.bind(v.railh, "click", function(e) {
                            v.doRailClick(e, !1, !0)
                        }), v.bind(v.railh, "dblclick", function(e) {
                            v.doRailClick(e, !0, !0)
                        }), v.bind(v.cursorh, "click", function(e) {
                            v.cancelEvent(e)
                        }), v.bind(v.cursorh, "dblclick", function(e) {
                            v.cancelEvent(e)
                        })))), x.cantouch || v.opt.touchbehavior ? (v.bind(x.hasmousecapture ? v.win : document, "mouseup", v.ontouchend), v.bind(document, "mousemove", v.ontouchmove), v.onclick && v.bind(document, "click", v.onclick), v.opt.cursordragontouch && (v.bind(v.cursor, "mousedown", v.onmousedown), v.bind(v.cursor, "mouseup", v.onmouseup), v.cursorh && v.bind(v.cursorh, "mousedown", function(e) {
                            v.onmousedown(e, !0)
                        }), v.cursorh && v.bind(v.cursorh, "mouseup", v.onmouseup))) : (v.bind(x.hasmousecapture ? v.win : document, "mouseup", v.onmouseup), v.bind(document, "mousemove", v.onmousemove), v.onclick && v.bind(document, "click", v.onclick), v.bind(v.cursor, "mousedown", v.onmousedown), v.bind(v.cursor, "mouseup", v.onmouseup), v.railh && (v.bind(v.cursorh, "mousedown", function(e) {
                            v.onmousedown(e, !0)
                        }), v.bind(v.cursorh, "mouseup", v.onmouseup)), !v.ispage && v.opt.enablescrollonselection && (v.bind(v.win[0], "mousedown", v.onselectionstart), v.bind(document, "mouseup", v.onselectionend), v.bind(v.cursor, "mouseup", v.onselectionend), v.cursorh && v.bind(v.cursorh, "mouseup", v.onselectionend), v.bind(document, "mousemove", v.onselectiondrag)), v.zoom && (v.jqbind(v.zoom, "mouseenter", function() {
                            v.canshowonmouseevent && v.showCursor(), v.rail.active = !0
                        }), v.jqbind(v.zoom, "mouseleave", function() {
                            v.rail.active = !1, v.rail.drag || v.hideCursor()
                        }))), v.opt.enablemousewheel && (v.isiframe || v.bind(x.isie && v.ispage ? document : v.win, "mousewheel", v.onmousewheel), v.bind(v.rail, "mousewheel", v.onmousewheel), v.railh && v.bind(v.railh, "mousewheel", v.onmousewheelhr)), v.ispage || x.cantouch || /HTML|^BODY/.test(v.win[0].nodeName) || (v.win.attr("tabindex") || v.win.attr({
                                tabindex: n++
                            }), v.jqbind(v.win, "focus", function(e) {
                                r = v.getTarget(e).id || !0, v.hasfocus = !0, v.canshowonmouseevent && v.noticeCursor()
                            }),
                            v.jqbind(v.win, "blur", function(e) {
                                r = !1, v.hasfocus = !1
                            }), v.jqbind(v.win, "mouseenter", function(e) {
                                i = v.getTarget(e).id || !0, v.hasmousefocus = !0, v.canshowonmouseevent && v.noticeCursor()
                            }), v.jqbind(v.win, "mouseleave", function() {
                                i = !1, v.hasmousefocus = !1, v.rail.drag || v.hideCursor()
                            }))
                    }
                    if (v.onkeypress = function(e) {
                            if (v.railslocked && 0 == v.page.maxh) return !0;
                            e = e ? e : window.e;
                            var o = v.getTarget(e);
                            if (o && /INPUT|TEXTAREA|SELECT|OPTION/.test(o.nodeName)) {
                                var t = o.getAttribute("type") || o.type || !1;
                                if (!t || !/submit|button|cancel/i.tp) return !0
                            }
                            if (a(o).attr("contenteditable")) return !0;
                            if (v.hasfocus || v.hasmousefocus && !r || v.ispage && !r && !i) {
                                var n = e.keyCode;
                                if (v.railslocked && 27 != n) return v.cancelEvent(e);
                                var s = e.ctrlKey || !1,
                                    l = e.shiftKey || !1,
                                    c = !1;
                                switch (n) {
                                    case 38:
                                    case 63233:
                                        v.doScrollBy(72), c = !0;
                                        break;
                                    case 40:
                                    case 63235:
                                        v.doScrollBy(-72), c = !0;
                                        break;
                                    case 37:
                                    case 63232:
                                        v.railh && (s ? v.doScrollLeft(0) : v.doScrollLeftBy(72), c = !0);
                                        break;
                                    case 39:
                                    case 63234:
                                        v.railh && (s ? v.doScrollLeft(v.page.maxw) : v.doScrollLeftBy(-72), c = !0);
                                        break;
                                    case 33:
                                    case 63276:
                                        v.doScrollBy(v.view.h), c = !0;
                                        break;
                                    case 34:
                                    case 63277:
                                        v.doScrollBy(-v.view.h), c = !0;
                                        break;
                                    case 36:
                                    case 63273:
                                        v.railh && s ? v.doScrollPos(0, 0) : v.doScrollTo(0), c = !0;
                                        break;
                                    case 35:
                                    case 63275:
                                        v.railh && s ? v.doScrollPos(v.page.maxw, v.page.maxh) : v.doScrollTo(v.page.maxh), c = !0;
                                        break;
                                    case 32:
                                        v.opt.spacebarenabled && (l ? v.doScrollBy(v.view.h) : v.doScrollBy(-v.view.h), c = !0);
                                        break;
                                    case 27:
                                        v.zoomactive && (v.doZoom(), c = !0)
                                }
                                if (c) return v.cancelEvent(e)
                            }
                        }, v.opt.enablekeyboard && v.bind(document, x.isopera && !x.isopera12 ? "keypress" : "keydown", v.onkeypress), v.bind(document, "keydown", function(e) {
                            var o = e.ctrlKey || !1;
                            o && (v.wheelprevented = !0)
                        }), v.bind(document, "keyup", function(e) {
                            var o = e.ctrlKey || !1;
                            o || (v.wheelprevented = !1)
                        }), v.bind(window, "blur", function(e) {
                            v.wheelprevented = !1
                        }), v.bind(window, "resize", v.lazyResize), v.bind(window, "orientationchange", v.lazyResize), v.bind(window, "load", v.lazyResize), x.ischrome && !v.ispage && !v.haswrapper) {
                        var k = v.win.attr("style"),
                            M = parseFloat(v.win.css("width")) + 1;
                        v.win.css("width", M), v.synched("chromefix", function() {
                            v.win.attr("style", k)
                        })
                    }
                    v.onAttributeChange = function(e) {
                        v.lazyResize(v.isieold ? 250 : 30)
                    }, m !== !1 && (v.observerbody = new m(function(e) {
                        return e.forEach(function(e) {
                            return "attributes" == e.type ? a("body").hasClass("modal-open") && !a.contains(a(".modal-dialog")[0], v.doc[0]) ? v.hide() : v.show() : void 0
                        }), document.body.scrollHeight != v.page.maxh ? v.lazyResize(30) : void 0
                    }), v.observerbody.observe(document.body, {
                        childList: !0,
                        subtree: !0,
                        characterData: !1,
                        attributes: !0,
                        attributeFilter: ["class"]
                    })), v.ispage || v.haswrapper || (m !== !1 ? (v.observer = new m(function(e) {
                        e.forEach(v.onAttributeChange)
                    }), v.observer.observe(v.win[0], {
                        childList: !0,
                        characterData: !1,
                        attributes: !0,
                        subtree: !1
                    }), v.observerremover = new m(function(e) {
                        e.forEach(function(e) {
                            if (e.removedNodes.length > 0)
                                for (var o in e.removedNodes)
                                    if (v && e.removedNodes[o] == v.win[0]) return v.remove()
                        })
                    }), v.observerremover.observe(v.win[0].parentNode, {
                        childList: !0,
                        characterData: !1,
                        attributes: !1,
                        subtree: !1
                    })) : (v.bind(v.win, x.isie && !x.isie9 ? "propertychange" : "DOMAttrModified", v.onAttributeChange), x.isie9 && v.win[0].attachEvent("onpropertychange", v.onAttributeChange), v.bind(v.win, "DOMNodeRemoved", function(e) {
                        e.target == v.win[0] && v.remove()
                    }))), !v.ispage && v.opt.boxzoom && v.bind(window, "resize", v.resizeZoom), v.istextarea && (v.bind(v.win, "keydown", v.lazyResize), v.bind(v.win, "mouseup", v.lazyResize)), v.lazyResize(30)
                }
                if ("IFRAME" == this.doc[0].nodeName) {
                    var E = function() {
                        v.iframexd = !1;
                        var e;
                        try {
                            e = "contentDocument" in this ? this.contentDocument : this.contentWindow.document;
                            e.domain
                        } catch (o) {
                            v.iframexd = !0, e = !1
                        }
                        if (v.iframexd) return !0;
                        if (v.forcescreen = !0, v.isiframe && (v.iframe = {
                                doc: a(e),
                                html: v.doc.contents().find("html")[0],
                                body: v.doc.contents().find("body")[0]
                            }, v.getContentSize = function() {
                                return {
                                    w: Math.max(v.iframe.html.scrollWidth, v.iframe.body.scrollWidth),
                                    h: Math.max(v.iframe.html.scrollHeight, v.iframe.body.scrollHeight)
                                }
                            }, v.docscroll = a(v.iframe.body)), !x.isios && v.opt.iframeautoresize && !v.isiframe) {
                            v.win.scrollTop(0), v.doc.height("");
                            var t = Math.max(e.getElementsByTagName("html")[0].scrollHeight, e.body.scrollHeight);
                            v.doc.height(t)
                        }
                        v.lazyResize(30), x.isie7 && v.css(a(v.iframe.html), {
                            "overflow-y": "hidden"
                        }), v.css(a(v.iframe.body), {
                            "overflow-y": "hidden"
                        }), x.isios && v.haswrapper && v.css(a(e.body), {
                            "-webkit-transform": "translate3d(0,0,0)"
                        }), "contentWindow" in this ? v.bind(this.contentWindow, "scroll", v.onscroll) : v.bind(e, "scroll", v.onscroll), v.opt.enablemousewheel && v.bind(e, "mousewheel", v.onmousewheel), v.opt.enablekeyboard && v.bind(e, x.isopera ? "keypress" : "keydown", v.onkeypress), (x.cantouch || v.opt.touchbehavior) && (v.bind(e, "mousedown", v.ontouchstart), v.bind(e, "mousemove", function(e) {
                            return v.ontouchmove(e, !0)
                        }), v.opt.grabcursorenabled && x.cursorgrabvalue && v.css(a(e.body), {
                            cursor: x.cursorgrabvalue
                        })), v.bind(e, "mouseup", v.ontouchend), v.zoom && (v.opt.dblclickzoom && v.bind(e, "dblclick", v.doZoom), v.ongesturezoom && v.bind(e, "gestureend", v.ongesturezoom))
                    };
                    this.doc[0].readyState && "complete" == this.doc[0].readyState && setTimeout(function() {
                        E.call(v.doc[0], !1)
                    }, 500), v.bind(this.doc, "load", E)
                }
            }, this.showCursor = function(e, o) {
                if (v.cursortimeout && (clearTimeout(v.cursortimeout), v.cursortimeout = 0), v.rail) {
                    if (v.autohidedom && (v.autohidedom.stop().css({
                            opacity: v.opt.cursoropacitymax
                        }), v.cursoractive = !0), v.rail.drag && 1 == v.rail.drag.pt || ("undefined" != typeof e && e !== !1 && (v.scroll.y = Math.round(1 * e / v.scrollratio.y)), "undefined" != typeof o && (v.scroll.x = Math.round(1 * o / v.scrollratio.x))), v.cursor.css({
                            height: v.cursorheight,
                            top: v.scroll.y
                        }), v.cursorh) {
                        var t = v.hasreversehr ? v.scrollvaluemaxw - v.scroll.x : v.scroll.x;
                        !v.rail.align && v.rail.visibility ? v.cursorh.css({
                            width: v.cursorwidth,
                            left: t + v.rail.width
                        }) : v.cursorh.css({
                            width: v.cursorwidth,
                            left: t
                        }), v.cursoractive = !0
                    }
                    v.zoom && v.zoom.stop().css({
                        opacity: v.opt.cursoropacitymax
                    })
                }
            }, this.hideCursor = function(e) {
                v.cursortimeout || v.rail && v.autohidedom && (v.hasmousefocus && "leave" == v.opt.autohidemode || (v.cursortimeout = setTimeout(function() {
                    v.rail.active && v.showonmouseevent || (v.autohidedom.stop().animate({
                        opacity: v.opt.cursoropacitymin
                    }), v.zoom && v.zoom.stop().animate({
                        opacity: v.opt.cursoropacitymin
                    }), v.cursoractive = !1), v.cursortimeout = 0
                }, e || v.opt.hidecursordelay)))
            }, this.noticeCursor = function(e, o, t) {
                v.showCursor(o, t), v.rail.active || v.hideCursor(e)
            }, this.getContentSize = v.ispage ? function() {
                return {
                    w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                    h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                }
            } : v.haswrapper ? function() {
                return {
                    w: v.doc.outerWidth() + parseInt(v.win.css("paddingLeft")) + parseInt(v.win.css("paddingRight")),
                    h: v.doc.outerHeight() + parseInt(v.win.css("paddingTop")) + parseInt(v.win.css("paddingBottom"))
                }
            } : function() {
                return {
                    w: v.docscroll[0].scrollWidth,
                    h: v.docscroll[0].scrollHeight
                }
            }, this.onResize = function(e, o) {
                if (!v || !v.win) return !1;
                if (!v.haswrapper && !v.ispage) {
                    if ("none" == v.win.css("display")) return v.visibility && v.hideRail().hideRailHr(), !1;
                    v.hidden || v.visibility || v.showRail().showRailHr()
                }
                var t = v.page.maxh,
                    r = v.page.maxw,
                    i = {
                        h: v.view.h,
                        w: v.view.w
                    };
                if (v.view = {
                        w: v.ispage ? v.win.width() : parseInt(v.win[0].clientWidth),
                        h: v.ispage ? v.win.height() : parseInt(v.win[0].clientHeight)
                    }, v.page = o ? o : v.getContentSize(), v.page.maxh = Math.max(0, v.page.h - v.view.h), v.page.maxw = Math.max(0, v.page.w - v.view.w), v.page.maxh == t && v.page.maxw == r && v.view.w == i.w && v.view.h == i.h) {
                    if (v.ispage) return v;
                    var n = v.win.offset();
                    if (v.lastposition) {
                        var s = v.lastposition;
                        if (s.top == n.top && s.left == n.left) return v
                    }
                    v.lastposition = n
                }
                if (0 == v.page.maxh ? (v.hideRail(), v.scrollvaluemax = 0, v.scroll.y = 0, v.scrollratio.y = 0, v.cursorheight = 0, v.setScrollTop(0), v.rail && (v.rail.scrollable = !1)) : (v.page.maxh -= v.opt.railpadding.top + v.opt.railpadding.bottom, v.rail.scrollable = !0), 0 == v.page.maxw ? (v.hideRailHr(), v.scrollvaluemaxw = 0, v.scroll.x = 0, v.scrollratio.x = 0, v.cursorwidth = 0, v.setScrollLeft(0), v.railh && (v.railh.scrollable = !1)) : (v.page.maxw -= v.opt.railpadding.left + v.opt.railpadding.right, v.railh && (v.railh.scrollable = v.opt.horizrailenabled)), v.railslocked = v.locked || 0 == v.page.maxh && 0 == v.page.maxw, v.railslocked) return v.ispage || v.updateScrollBar(v.view), !1;
                v.hidden || v.visibility ? !v.railh || v.hidden || v.railh.visibility || v.showRailHr() : v.showRail().showRailHr(), v.istextarea && v.win.css("resize") && "none" != v.win.css("resize") && (v.view.h -= 20), v.cursorheight = Math.min(v.view.h, Math.round(v.view.h * (v.view.h / v.page.h))), v.cursorheight = v.opt.cursorfixedheight ? v.opt.cursorfixedheight : Math.max(v.opt.cursorminheight, v.cursorheight), v.cursorwidth = Math.min(v.view.w, Math.round(v.view.w * (v.view.w / v.page.w))), v.cursorwidth = v.opt.cursorfixedheight ? v.opt.cursorfixedheight : Math.max(v.opt.cursorminheight, v.cursorwidth), v.scrollvaluemax = v.view.h - v.cursorheight - v.cursor.hborder - (v.opt.railpadding.top + v.opt.railpadding.bottom), v.railh && (v.railh.width = v.page.maxh > 0 ? v.view.w - v.rail.width : v.view.w, v.scrollvaluemaxw = v.railh.width - v.cursorwidth - v.cursorh.wborder - (v.opt.railpadding.left + v.opt.railpadding.right)), v.ispage || v.updateScrollBar(v.view), v.scrollratio = {
                    x: v.page.maxw / v.scrollvaluemaxw,
                    y: v.page.maxh / v.scrollvaluemax
                };
                var l = v.getScrollTop();
                return l > v.page.maxh ? v.doScrollTop(v.page.maxh) : (v.scroll.y = Math.round(v.getScrollTop() * (1 / v.scrollratio.y)), v.scroll.x = Math.round(v.getScrollLeft() * (1 / v.scrollratio.x)), v.cursoractive && v.noticeCursor()), v.scroll.y && 0 == v.getScrollTop() && v.doScrollTo(Math.floor(v.scroll.y * v.scrollratio.y)), v
            }, this.resize = v.onResize, this.lazyResize = function(e) {
                return e = isNaN(e) ? 30 : e, v.debounced("resize", v.resize, e), v
            }, this.jqbind = function(e, o, t) {
                v.events.push({
                    e: e,
                    n: o,
                    f: t,
                    q: !0
                }), a(e).bind(o, t)
            }, this.bind = function(e, o, t, r) {
                var i = "jquery" in e ? e[0] : e;
                if ("mousewheel" == o)
                    if ("onwheel" in v.win) v._bind(i, "wheel", t, r || !1);
                    else {
                        var n = "undefined" != typeof document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
                        p(i, n, t, r || !1), "DOMMouseScroll" == n && p(i, "MozMousePixelScroll", t, r || !1)
                    }
                else if (i.addEventListener) {
                    if (x.cantouch && /mouseup|mousedown|mousemove/.test(o)) {
                        var s = "mousedown" == o ? "touchstart" : "mouseup" == o ? "touchend" : "touchmove";
                        v._bind(i, s, function(e) {
                            if (e.touches) {
                                if (e.touches.length < 2) {
                                    var o = e.touches.length ? e.touches[0] : e;
                                    o.original = e, t.call(this, o)
                                }
                            } else if (e.changedTouches) {
                                var o = e.changedTouches[0];
                                o.original = e, t.call(this, o)
                            }
                        }, r || !1)
                    }
                    v._bind(i, o, t, r || !1), x.cantouch && "mouseup" == o && v._bind(i, "touchcancel", t, r || !1)
                } else v._bind(i, o, function(e) {
                    return e = e || window.event || !1, e && e.srcElement && (e.target = e.srcElement), "pageY" in e || (e.pageX = e.clientX + document.documentElement.scrollLeft, e.pageY = e.clientY + document.documentElement.scrollTop), t.call(i, e) === !1 || r === !1 ? v.cancelEvent(e) : !0
                })
            }, x.haseventlistener ? (this._bind = function(e, o, t, r) {
                v.events.push({
                    e: e,
                    n: o,
                    f: t,
                    b: r,
                    q: !1
                }), e.addEventListener(o, t, r || !1)
            }, this.cancelEvent = function(e) {
                if (!e) return !1;
                var e = e.original ? e.original : e;
                return e.preventDefault(), e.stopPropagation(), e.preventManipulation && e.preventManipulation(), !1
            }, this.stopPropagation = function(e) {
                if (!e) return !1;
                var e = e.original ? e.original : e;
                return e.stopPropagation(), !1
            }, this._unbind = function(e, o, t, r) {
                e.removeEventListener(o, t, r)
            }) : (this._bind = function(e, o, t, r) {
                v.events.push({
                    e: e,
                    n: o,
                    f: t,
                    b: r,
                    q: !1
                }), e.attachEvent ? e.attachEvent("on" + o, t) : e["on" + o] = t
            }, this.cancelEvent = function(e) {
                var e = window.event || !1;
                return e ? (e.cancelBubble = !0, e.cancel = !0, e.returnValue = !1, !1) : !1
            }, this.stopPropagation = function(e) {
                var e = window.event || !1;
                return e ? (e.cancelBubble = !0, !1) : !1
            }, this._unbind = function(e, o, t, r) {
                e.detachEvent ? e.detachEvent("on" + o, t) : e["on" + o] = !1
            }), this.unbindAll = function() {
                for (var e = 0; e < v.events.length; e++) {
                    var o = v.events[e];
                    o.q ? o.e.unbind(o.n, o.f) : v._unbind(o.e, o.n, o.f, o.b)
                }
            }, this.showRail = function() {
                return 0 == v.page.maxh || !v.ispage && "none" == v.win.css("display") || (v.visibility = !0, v.rail.visibility = !0, v.rail.css("display", "block")), v
            }, this.showRailHr = function() {
                return v.railh ? (0 == v.page.maxw || !v.ispage && "none" == v.win.css("display") || (v.railh.visibility = !0, v.railh.css("display", "block")), v) : v
            }, this.hideRail = function() {
                return v.visibility = !1, v.rail.visibility = !1, v.rail.css("display", "none"), v
            }, this.hideRailHr = function() {
                return v.railh ? (v.railh.visibility = !1, v.railh.css("display", "none"), v) : v
            }, this.show = function() {
                return v.hidden = !1, v.railslocked = !1, v.showRail().showRailHr()
            }, this.hide = function() {
                return v.hidden = !0, v.railslocked = !0, v.hideRail().hideRailHr()
            }, this.toggle = function() {
                return v.hidden ? v.show() : v.hide()
            }, this.remove = function() {
                v.stop(), v.cursortimeout && clearTimeout(v.cursortimeout), v.debouncedelayed && clearTimeout(v.debouncedelayed), v.doZoomOut(), v.unbindAll(), x.isie9 && v.win[0].detachEvent("onpropertychange", v.onAttributeChange), v.observer !== !1 && v.observer.disconnect(), v.observerremover !== !1 && v.observerremover.disconnect(), v.observerbody !== !1 && v.observerbody.disconnect(), v.events = null, v.cursor && v.cursor.remove(), v.cursorh && v.cursorh.remove(), v.rail && v.rail.remove(), v.railh && v.railh.remove(), v.zoom && v.zoom.remove();
                for (var e = 0; e < v.saved.css.length; e++) {
                    var o = v.saved.css[e];
                    o[0].css(o[1], "undefined" == typeof o[2] ? "" : o[2])
                }
                v.saved = !1, v.me.data("__nicescroll", "");
                var t = a.nicescroll;
                t.each(function(e) {
                    if (this && this.id === v.id) {
                        delete t[e];
                        for (var o = ++e; o < t.length; o++, e++) t[e] = t[o];
                        t.length--, t.length && delete t[t.length]
                    }
                });
                for (var r in v) v[r] = null, delete v[r];
                v = null
            }, this.scrollstart = function(e) {
                return this.onscrollstart = e, v
            }, this.scrollend = function(e) {
                return this.onscrollend = e, v
            }, this.scrollcancel = function(e) {
                return this.onscrollcancel = e, v
            }, this.zoomin = function(e) {
                return this.onzoomin = e, v
            }, this.zoomout = function(e) {
                return this.onzoomout = e, v
            }, this.isScrollable = function(e) {
                var o = e.target ? e.target : e;
                if ("OPTION" == o.nodeName) return !0;
                for (; o && 1 == o.nodeType && !/^BODY|HTML/.test(o.nodeName);) {
                    var t = a(o),
                        r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
                    if (/scroll|auto/.test(r)) return o.clientHeight != o.scrollHeight;
                    o = o.parentNode ? o.parentNode : !1
                }
                return !1
            }, this.getViewport = function(e) {
                for (var o = e && e.parentNode ? e.parentNode : !1; o && 1 == o.nodeType && !/^BODY|HTML/.test(o.nodeName);) {
                    var t = a(o);
                    if (/fixed|absolute/.test(t.css("position"))) return t;
                    var r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
                    if (/scroll|auto/.test(r) && o.clientHeight != o.scrollHeight) return t;
                    if (t.getNiceScroll().length > 0) return t;
                    o = o.parentNode ? o.parentNode : !1
                }
                return !1
            }, this.triggerScrollEnd = function() {
                if (v.onscrollend) {
                    var e = v.getScrollLeft(),
                        o = v.getScrollTop(),
                        t = {
                            type: "scrollend",
                            current: {
                                x: e,
                                y: o
                            },
                            end: {
                                x: e,
                                y: o
                            }
                        };
                    v.onscrollend.call(v, t)
                }
            }, this.onmousewheel = function(e) {
                if (!v.wheelprevented) {
                    if (v.railslocked) return v.debounced("checkunlock", v.resize, 250), !0;
                    if (v.rail.drag) return v.cancelEvent(e);
                    if ("auto" == v.opt.oneaxismousemode && 0 != e.deltaX && (v.opt.oneaxismousemode = !1), v.opt.oneaxismousemode && 0 == e.deltaX && !v.rail.scrollable) return v.railh && v.railh.scrollable ? v.onmousewheelhr(e) : !0;
                    var o = +new Date,
                        t = !1;
                    if (v.opt.preservenativescrolling && v.checkarea + 600 < o && (v.nativescrollingarea = v.isScrollable(e), t = !0), v.checkarea = o, v.nativescrollingarea) return !0;
                    var r = g(e, !1, t);
                    return r && (v.checkarea = 0), r
                }
            }, this.onmousewheelhr = function(e) {
                if (!v.wheelprevented) {
                    if (v.railslocked || !v.railh.scrollable) return !0;
                    if (v.rail.drag) return v.cancelEvent(e);
                    var o = +new Date,
                        t = !1;
                    return v.opt.preservenativescrolling && v.checkarea + 600 < o && (v.nativescrollingarea = v.isScrollable(e), t = !0), v.checkarea = o, v.nativescrollingarea ? !0 : v.railslocked ? v.cancelEvent(e) : g(e, !0, t)
                }
            }, this.stop = function() {
                return v.cancelScroll(), v.scrollmon && v.scrollmon.stop(), v.cursorfreezed = !1, v.scroll.y = Math.round(v.getScrollTop() * (1 / v.scrollratio.y)), v.noticeCursor(), v
            }, this.getTransitionSpeed = function(e) {
                var o = Math.round(10 * v.opt.scrollspeed),
                    t = Math.min(o, Math.round(e / 20 * v.opt.scrollspeed));
                return t > 20 ? t : 0
            }, v.opt.smoothscroll ? v.ishwscroll && x.hastransition && v.opt.usetransition && v.opt.smoothscroll ? (this.prepareTransition = function(e, o) {
                var t = o ? e > 20 ? e : 0 : v.getTransitionSpeed(e),
                    r = t ? x.prefixstyle + "transform " + t + "ms ease-out" : "";
                return v.lasttransitionstyle && v.lasttransitionstyle == r || (v.lasttransitionstyle = r, v.doc.css(x.transitionstyle, r)), t
            }, this.doScrollLeft = function(e, o) {
                var t = v.scrollrunning ? v.newscrolly : v.getScrollTop();
                v.doScrollPos(e, t, o)
            }, this.doScrollTop = function(e, o) {
                var t = v.scrollrunning ? v.newscrollx : v.getScrollLeft();
                v.doScrollPos(t, e, o)
            }, this.doScrollPos = function(e, o, t) {
                var r = v.getScrollTop(),
                    i = v.getScrollLeft();
                return ((v.newscrolly - r) * (o - r) < 0 || (v.newscrollx - i) * (e - i) < 0) && v.cancelScroll(), 0 == v.opt.bouncescroll && (0 > o ? o = 0 : o > v.page.maxh && (o = v.page.maxh), 0 > e ? e = 0 : e > v.page.maxw && (e = v.page.maxw)), v.scrollrunning && e == v.newscrollx && o == v.newscrolly ? !1 : (v.newscrolly = o, v.newscrollx = e, v.newscrollspeed = t || !1, v.timer ? !1 : void(v.timer = setTimeout(function() {
                    var t = v.getScrollTop(),
                        r = v.getScrollLeft(),
                        i = {};
                    i.x = e - r, i.y = o - t, i.px = r, i.py = t;
                    var n = Math.round(Math.sqrt(Math.pow(i.x, 2) + Math.pow(i.y, 2))),
                        s = v.newscrollspeed && v.newscrollspeed > 1 ? v.newscrollspeed : v.getTransitionSpeed(n);
                    if (v.newscrollspeed && v.newscrollspeed <= 1 && (s *= v.newscrollspeed), v.prepareTransition(s, !0), v.timerscroll && v.timerscroll.tm && clearInterval(v.timerscroll.tm), s > 0) {
                        if (!v.scrollrunning && v.onscrollstart) {
                            var l = {
                                type: "scrollstart",
                                current: {
                                    x: r,
                                    y: t
                                },
                                request: {
                                    x: e,
                                    y: o
                                },
                                end: {
                                    x: v.newscrollx,
                                    y: v.newscrolly
                                },
                                speed: s
                            };
                            v.onscrollstart.call(v, l)
                        }
                        x.transitionend ? v.scrollendtrapped || (v.scrollendtrapped = !0, v.bind(v.doc, x.transitionend, v.onScrollTransitionEnd, !1)) : (v.scrollendtrapped && clearTimeout(v.scrollendtrapped), v.scrollendtrapped = setTimeout(v.onScrollTransitionEnd, s));
                        var a = t,
                            c = r;
                        v.timerscroll = {
                            bz: new z(a, v.newscrolly, s, 0, 0, .58, 1),
                            bh: new z(c, v.newscrollx, s, 0, 0, .58, 1)
                        }, v.cursorfreezed || (v.timerscroll.tm = setInterval(function() {
                            v.showCursor(v.getScrollTop(), v.getScrollLeft())
                        }, 60))
                    }
                    v.synched("doScroll-set", function() {
                        v.timer = 0, v.scrollendtrapped && (v.scrollrunning = !0), v.setScrollTop(v.newscrolly), v.setScrollLeft(v.newscrollx), v.scrollendtrapped || v.onScrollTransitionEnd()
                    })
                }, 50)))
            }, this.cancelScroll = function() {
                if (!v.scrollendtrapped) return !0;
                var e = v.getScrollTop(),
                    o = v.getScrollLeft();
                return v.scrollrunning = !1, x.transitionend || clearTimeout(x.transitionend), v.scrollendtrapped = !1, v._unbind(v.doc[0], x.transitionend, v.onScrollTransitionEnd), v.prepareTransition(0), v.setScrollTop(e), v.railh && v.setScrollLeft(o), v.timerscroll && v.timerscroll.tm && clearInterval(v.timerscroll.tm), v.timerscroll = !1, v.cursorfreezed = !1, v.showCursor(e, o), v
            }, this.onScrollTransitionEnd = function() {
                v.scrollendtrapped && v._unbind(v.doc[0], x.transitionend, v.onScrollTransitionEnd), v.scrollendtrapped = !1, v.prepareTransition(0), v.timerscroll && v.timerscroll.tm && clearInterval(v.timerscroll.tm), v.timerscroll = !1;
                var e = v.getScrollTop(),
                    o = v.getScrollLeft();
                return v.setScrollTop(e), v.railh && v.setScrollLeft(o), v.noticeCursor(!1, e, o), v.cursorfreezed = !1, 0 > e ? e = 0 : e > v.page.maxh && (e = v.page.maxh), 0 > o ? o = 0 : o > v.page.maxw && (o = v.page.maxw), e != v.newscrolly || o != v.newscrollx ? v.doScrollPos(o, e, v.opt.snapbackspeed) : (v.onscrollend && v.scrollrunning && v.triggerScrollEnd(), void(v.scrollrunning = !1))
            }) : (this.doScrollLeft = function(e, o) {
                var t = v.scrollrunning ? v.newscrolly : v.getScrollTop();
                v.doScrollPos(e, t, o)
            }, this.doScrollTop = function(e, o) {
                var t = v.scrollrunning ? v.newscrollx : v.getScrollLeft();
                v.doScrollPos(t, e, o)
            }, this.doScrollPos = function(e, o, t) {
                function r() {
                    if (v.cancelAnimationFrame) return !0;
                    if (v.scrollrunning = !0, h = 1 - h) return v.timer = d(r) || 1;
                    var e, o, t = 0,
                        i = o = v.getScrollTop();
                    if (v.dst.ay) {
                        i = v.bzscroll ? v.dst.py + v.bzscroll.getNow() * v.dst.ay : v.newscrolly;
                        var n = i - o;
                        (0 > n && i < v.newscrolly || n > 0 && i > v.newscrolly) && (i = v.newscrolly), v.setScrollTop(i), i == v.newscrolly && (t = 1)
                    } else t = 1;
                    var s = e = v.getScrollLeft();
                    if (v.dst.ax) {
                        s = v.bzscroll ? v.dst.px + v.bzscroll.getNow() * v.dst.ax : v.newscrollx;
                        var n = s - e;
                        (0 > n && s < v.newscrollx || n > 0 && s > v.newscrollx) && (s = v.newscrollx), v.setScrollLeft(s), s == v.newscrollx && (t += 1)
                    } else t += 1;
                    2 == t ? (v.timer = 0, v.cursorfreezed = !1, v.bzscroll = !1, v.scrollrunning = !1, 0 > i ? i = 0 : i > v.page.maxh && (i = v.page.maxh), 0 > s ? s = 0 : s > v.page.maxw && (s = v.page.maxw), s != v.newscrollx || i != v.newscrolly ? v.doScrollPos(s, i) : v.onscrollend && v.triggerScrollEnd()) : v.timer = d(r) || 1
                }
                var o = "undefined" == typeof o || o === !1 ? v.getScrollTop(!0) : o;
                if (v.timer && v.newscrolly == o && v.newscrollx == e) return !0;
                v.timer && u(v.timer), v.timer = 0;
                var i = v.getScrollTop(),
                    n = v.getScrollLeft();
                ((v.newscrolly - i) * (o - i) < 0 || (v.newscrollx - n) * (e - n) < 0) && v.cancelScroll(), v.newscrolly = o, v.newscrollx = e, v.bouncescroll && v.rail.visibility || (v.newscrolly < 0 ? v.newscrolly = 0 : v.newscrolly > v.page.maxh && (v.newscrolly = v.page.maxh)), v.bouncescroll && v.railh.visibility || (v.newscrollx < 0 ? v.newscrollx = 0 : v.newscrollx > v.page.maxw && (v.newscrollx = v.page.maxw)), v.dst = {}, v.dst.x = e - n, v.dst.y = o - i, v.dst.px = n, v.dst.py = i;
                var s = Math.round(Math.sqrt(Math.pow(v.dst.x, 2) + Math.pow(v.dst.y, 2)));
                v.dst.ax = v.dst.x / s, v.dst.ay = v.dst.y / s;
                var l = 0,
                    a = s;
                0 == v.dst.x ? (l = i, a = o, v.dst.ay = 1, v.dst.py = 0) : 0 == v.dst.y && (l = n, a = e, v.dst.ax = 1, v.dst.px = 0);
                var c = v.getTransitionSpeed(s);
                if (t && 1 >= t && (c *= t), c > 0 ? v.bzscroll = v.bzscroll ? v.bzscroll.update(a, c) : new z(l, a, c, 0, 1, 0, 1) : v.bzscroll = !1, !v.timer) {
                    (i == v.page.maxh && o >= v.page.maxh || n == v.page.maxw && e >= v.page.maxw) && v.checkContentSize();
                    var h = 1;
                    if (v.cancelAnimationFrame = !1, v.timer = 1, v.onscrollstart && !v.scrollrunning) {
                        var p = {
                            type: "scrollstart",
                            current: {
                                x: n,
                                y: i
                            },
                            request: {
                                x: e,
                                y: o
                            },
                            end: {
                                x: v.newscrollx,
                                y: v.newscrolly
                            },
                            speed: c
                        };
                        v.onscrollstart.call(v, p)
                    }
                    r(), (i == v.page.maxh && o >= i || n == v.page.maxw && e >= n) && v.checkContentSize(), v.noticeCursor()
                }
            }, this.cancelScroll = function() {
                return v.timer && u(v.timer), v.timer = 0, v.bzscroll = !1, v.scrollrunning = !1, v
            }) : (this.doScrollLeft = function(e, o) {
                var t = v.getScrollTop();
                v.doScrollPos(e, t, o)
            }, this.doScrollTop = function(e, o) {
                var t = v.getScrollLeft();
                v.doScrollPos(t, e, o)
            }, this.doScrollPos = function(e, o, t) {
                var r = e > v.page.maxw ? v.page.maxw : e;
                0 > r && (r = 0);
                var i = o > v.page.maxh ? v.page.maxh : o;
                0 > i && (i = 0), v.synched("scroll", function() {
                    v.setScrollTop(i), v.setScrollLeft(r)
                })
            }, this.cancelScroll = function() {}), this.doScrollBy = function(e, o) {
                var t = 0;
                if (o) t = Math.floor((v.scroll.y - e) * v.scrollratio.y);
                else {
                    var r = v.timer ? v.newscrolly : v.getScrollTop(!0);
                    t = r - e
                }
                if (v.bouncescroll) {
                    var i = Math.round(v.view.h / 2); - i > t ? t = -i : t > v.page.maxh + i && (t = v.page.maxh + i)
                }
                v.cursorfreezed = !1;
                var n = v.getScrollTop(!0);
                return 0 > t && 0 >= n ? v.noticeCursor() : t > v.page.maxh && n >= v.page.maxh ? (v.checkContentSize(), v.noticeCursor()) : void v.doScrollTop(t)
            }, this.doScrollLeftBy = function(e, o) {
                var t = 0;
                if (o) t = Math.floor((v.scroll.x - e) * v.scrollratio.x);
                else {
                    var r = v.timer ? v.newscrollx : v.getScrollLeft(!0);
                    t = r - e
                }
                if (v.bouncescroll) {
                    var i = Math.round(v.view.w / 2); - i > t ? t = -i : t > v.page.maxw + i && (t = v.page.maxw + i)
                }
                v.cursorfreezed = !1;
                var n = v.getScrollLeft(!0);
                return 0 > t && 0 >= n ? v.noticeCursor() : t > v.page.maxw && n >= v.page.maxw ? v.noticeCursor() : void v.doScrollLeft(t)
            }, this.doScrollTo = function(e, o) {
                var t = o ? Math.round(e * v.scrollratio.y) : e;
                0 > t ? t = 0 : t > v.page.maxh && (t = v.page.maxh), v.cursorfreezed = !1, v.doScrollTop(e)
            }, this.checkContentSize = function() {
                var e = v.getContentSize();
                (e.h != v.page.h || e.w != v.page.w) && v.resize(!1, e)
            }, v.onscroll = function(e) {
                v.rail.drag || v.cursorfreezed || v.synched("scroll", function() {
                    v.scroll.y = Math.round(v.getScrollTop() * (1 / v.scrollratio.y)), v.railh && (v.scroll.x = Math.round(v.getScrollLeft() * (1 / v.scrollratio.x))), v.noticeCursor()
                })
            }, v.bind(v.docscroll, "scroll", v.onscroll), this.doZoomIn = function(e) {
                if (!v.zoomactive) {
                    v.zoomactive = !0, v.zoomrestore = {
                        style: {}
                    };
                    var o = ["position", "top", "left", "zIndex", "backgroundColor", "marginTop", "marginBottom", "marginLeft", "marginRight"],
                        t = v.win[0].style;
                    for (var r in o) {
                        var i = o[r];
                        v.zoomrestore.style[i] = "undefined" != typeof t[i] ? t[i] : ""
                    }
                    v.zoomrestore.style.width = v.win.css("width"), v.zoomrestore.style.height = v.win.css("height"), v.zoomrestore.padding = {
                        w: v.win.outerWidth() - v.win.width(),
                        h: v.win.outerHeight() - v.win.height()
                    }, x.isios4 && (v.zoomrestore.scrollTop = a(window).scrollTop(), a(window).scrollTop(0)), v.win.css({
                        position: x.isios4 ? "absolute" : "fixed",
                        top: 0,
                        left: 0,
                        "z-index": l + 100,
                        margin: "0px"
                    });
                    var n = v.win.css("backgroundColor");
                    return ("" == n || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(n)) && v.win.css("backgroundColor", "#fff"), v.rail.css({
                        "z-index": l + 101
                    }), v.zoom.css({
                        "z-index": l + 102
                    }), v.zoom.css("backgroundPosition", "0px -18px"), v.resizeZoom(), v.onzoomin && v.onzoomin.call(v), v.cancelEvent(e)
                }
            }, this.doZoomOut = function(e) {
                return v.zoomactive ? (v.zoomactive = !1, v.win.css("margin", ""), v.win.css(v.zoomrestore.style), x.isios4 && a(window).scrollTop(v.zoomrestore.scrollTop), v.rail.css({
                    "z-index": v.zindex
                }), v.zoom.css({
                    "z-index": v.zindex
                }), v.zoomrestore = !1, v.zoom.css("backgroundPosition", "0px 0px"), v.onResize(), v.onzoomout && v.onzoomout.call(v), v.cancelEvent(e)) : void 0
            }, this.doZoom = function(e) {
                return v.zoomactive ? v.doZoomOut(e) : v.doZoomIn(e)
            }, this.resizeZoom = function() {
                if (v.zoomactive) {
                    var e = v.getScrollTop();
                    v.win.css({
                        width: a(window).width() - v.zoomrestore.padding.w + "px",
                        height: a(window).height() - v.zoomrestore.padding.h + "px"
                    }), v.onResize(), v.setScrollTop(Math.min(v.page.maxh, e))
                }
            }, this.init(), a.nicescroll.push(this)
        },
        b = function(e) {
            var o = this;
            this.nc = e, this.lastx = 0, this.lasty = 0, this.speedx = 0, this.speedy = 0, this.lasttime = 0, this.steptime = 0, this.snapx = !1, this.snapy = !1, this.demulx = 0, this.demuly = 0, this.lastscrollx = -1, this.lastscrolly = -1, this.chkx = 0, this.chky = 0, this.timer = 0, this.time = function() {
                return +new Date
            }, this.reset = function(e, t) {
                o.stop();
                var r = o.time();
                o.steptime = 0, o.lasttime = r, o.speedx = 0, o.speedy = 0, o.lastx = e, o.lasty = t, o.lastscrollx = -1, o.lastscrolly = -1
            }, this.update = function(e, t) {
                var r = o.time();
                o.steptime = r - o.lasttime, o.lasttime = r;
                var i = t - o.lasty,
                    n = e - o.lastx,
                    s = o.nc.getScrollTop(),
                    l = o.nc.getScrollLeft(),
                    a = s + i,
                    c = l + n;
                o.snapx = 0 > c || c > o.nc.page.maxw, o.snapy = 0 > a || a > o.nc.page.maxh, o.speedx = n, o.speedy = i, o.lastx = e, o.lasty = t
            }, this.stop = function() {
                o.nc.unsynched("domomentum2d"), o.timer && clearTimeout(o.timer), o.timer = 0, o.lastscrollx = -1, o.lastscrolly = -1
            }, this.doSnapy = function(e, t) {
                var r = !1;
                0 > t ? (t = 0, r = !0) : t > o.nc.page.maxh && (t = o.nc.page.maxh, r = !0), 0 > e ? (e = 0, r = !0) : e > o.nc.page.maxw && (e = o.nc.page.maxw, r = !0), r ? o.nc.doScrollPos(e, t, o.nc.opt.snapbackspeed) : o.nc.triggerScrollEnd()
            }, this.doMomentum = function(e) {
                var t = o.time(),
                    r = e ? t + e : o.lasttime,
                    i = o.nc.getScrollLeft(),
                    n = o.nc.getScrollTop(),
                    s = o.nc.page.maxh,
                    l = o.nc.page.maxw;
                o.speedx = l > 0 ? Math.min(60, o.speedx) : 0, o.speedy = s > 0 ? Math.min(60, o.speedy) : 0;
                var a = r && 60 >= t - r;
                (0 > n || n > s || 0 > i || i > l) && (a = !1);
                var c = o.speedy && a ? o.speedy : !1,
                    d = o.speedx && a ? o.speedx : !1;
                if (c || d) {
                    var u = Math.max(16, o.steptime);
                    if (u > 50) {
                        var h = u / 50;
                        o.speedx *= h, o.speedy *= h, u = 50
                    }
                    o.demulxy = 0, o.lastscrollx = o.nc.getScrollLeft(), o.chkx = o.lastscrollx, o.lastscrolly = o.nc.getScrollTop(), o.chky = o.lastscrolly;
                    var p = o.lastscrollx,
                        m = o.lastscrolly,
                        f = function() {
                            var e = o.time() - t > 600 ? .04 : .02;
                            o.speedx && (p = Math.floor(o.lastscrollx - o.speedx * (1 - o.demulxy)), o.lastscrollx = p, (0 > p || p > l) && (e = .1)), o.speedy && (m = Math.floor(o.lastscrolly - o.speedy * (1 - o.demulxy)), o.lastscrolly = m, (0 > m || m > s) && (e = .1)), o.demulxy = Math.min(1, o.demulxy + e), o.nc.synched("domomentum2d", function() {
                                if (o.speedx) {
                                    var e = o.nc.getScrollLeft();
                                    e != o.chkx && o.stop(), o.chkx = p, o.nc.setScrollLeft(p)
                                }
                                if (o.speedy) {
                                    var t = o.nc.getScrollTop();
                                    t != o.chky && o.stop(), o.chky = m, o.nc.setScrollTop(m)
                                }
                                o.timer || (o.nc.hideCursor(), o.doSnapy(p, m))
                            }), o.demulxy < 1 ? o.timer = setTimeout(f, u) : (o.stop(), o.nc.hideCursor(), o.doSnapy(p, m))
                        };
                    f()
                } else o.doSnapy(o.nc.getScrollLeft(), o.nc.getScrollTop())
            }
        },
        y = e.fn.scrollTop;
    e.cssHooks.pageYOffset = {
        get: function(e, o, t) {
            var r = a.data(e, "__nicescroll") || !1;
            return r && r.ishwscroll ? r.getScrollTop() : y.call(e)
        },
        set: function(e, o) {
            var t = a.data(e, "__nicescroll") || !1;
            return t && t.ishwscroll ? t.setScrollTop(parseInt(o)) : y.call(e, o), this
        }
    }, e.fn.scrollTop = function(e) {
        if ("undefined" == typeof e) {
            var o = this[0] ? a.data(this[0], "__nicescroll") || !1 : !1;
            return o && o.ishwscroll ? o.getScrollTop() : y.call(this)
        }
        return this.each(function() {
            var o = a.data(this, "__nicescroll") || !1;
            o && o.ishwscroll ? o.setScrollTop(parseInt(e)) : y.call(a(this), e)
        })
    };
    var x = e.fn.scrollLeft;
    a.cssHooks.pageXOffset = {
        get: function(e, o, t) {
            var r = a.data(e, "__nicescroll") || !1;
            return r && r.ishwscroll ? r.getScrollLeft() : x.call(e)
        },
        set: function(e, o) {
            var t = a.data(e, "__nicescroll") || !1;
            return t && t.ishwscroll ? t.setScrollLeft(parseInt(o)) : x.call(e, o), this
        }
    }, e.fn.scrollLeft = function(e) {
        if ("undefined" == typeof e) {
            var o = this[0] ? a.data(this[0], "__nicescroll") || !1 : !1;
            return o && o.ishwscroll ? o.getScrollLeft() : x.call(this)
        }
        return this.each(function() {
            var o = a.data(this, "__nicescroll") || !1;
            o && o.ishwscroll ? o.setScrollLeft(parseInt(e)) : x.call(a(this), e)
        })
    };
    var S = function(e) {
        var o = this;
        if (this.length = 0, this.name = "nicescrollarray", this.each = function(e) {
                for (var t = 0, r = 0; t < o.length; t++) e.call(o[t], r++);
                return o
            }, this.push = function(e) {
                o[o.length] = e, o.length++
            }, this.eq = function(e) {
                return o[e]
            }, e)
            for (var t = 0; t < e.length; t++) {
                var r = a.data(e[t], "__nicescroll") || !1;
                r && (this[this.length] = r, this.length++)
            }
        return this
    };
    t(S.prototype, ["show", "hide", "toggle", "onResize", "resize", "remove", "stop", "doScrollPos"], function(e, o) {
        e[o] = function() {
            var e = arguments;
            return this.each(function() {
                this[o].apply(this, e)
            })
        }
    }), e.fn.getNiceScroll = function(e) {
        if ("undefined" == typeof e) return new S(this);
        var o = this[e] && a.data(this[e], "__nicescroll") || !1;
        return o
    }, e.extend(e.expr[":"], {
        nicescroll: function(e) {
            return a.data(e, "__nicescroll") ? !0 : !1
        }
    }), a.fn.niceScroll = function(e, o) {
        "undefined" == typeof o && ("object" != typeof e || "jquery" in e || (o = e, e = !1)), o = a.extend({}, o);
        var t = new S;
        "undefined" == typeof o && (o = {}), e && (o.doc = a(e), o.win = a(this));
        var r = !("doc" in o);
        return r || "win" in o || (o.win = a(this)), this.each(function() {
            var e = a(this).data("__nicescroll") || !1;
            e || (o.doc = r ? a(this) : o.doc, e = new v(o, a(this)), a(this).data("__nicescroll", e)), t.push(e)
        }), 1 == t.length ? t[0] : t
    }, window.NiceScroll = {
        getjQuery: function() {
            return e
        }
    }, a.nicescroll || (a.nicescroll = new S, a.nicescroll.options = f)
});

/**
 * Slider
 * Slick.js
 * 1.8.0 | Ken Wheeler | http://kenwheeler.github.io | MIT license
 */

! function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function(i) {
    "use strict";
    var e = window.Slick || {};
    (e = function() {
        var e = 0;
        return function(t, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(t),
                appendDots: i(t),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, t) {
                    return i('<button type="button" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(t), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(t).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, void 0 !== document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = e++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
        }
    }()).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
        var s = this;
        if ("boolean" == typeof t) o = t, t = null;
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : !0 === o ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e)
        }), s.$slidesCache = s.$slides, s.reinit()
    }, e.prototype.animateHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({
                height: e
            }, i.options.speed)
        }
    }, e.prototype.animateSlide = function(e, t) {
        var o = {},
            s = this;
        s.animateHeight(), !0 === s.options.rtl && !1 === s.options.vertical && (e = -e), !1 === s.transformsEnabled ? !1 === s.options.vertical ? s.$slideTrack.animate({
            left: e
        }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
            top: e
        }, s.options.speed, s.options.easing, t) : !1 === s.cssTransitions ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft), i({
            animStart: s.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function(i) {
                i = Math.ceil(i), !1 === s.options.vertical ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o))
            },
            complete: function() {
                t && t.call()
            }
        })) : (s.applyTransition(), e = Math.ceil(e), !1 === s.options.vertical ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function() {
            s.disableTransition(), t.call()
        }, s.options.speed))
    }, e.prototype.getNavTarget = function() {
        var e = this,
            t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)), t
    }, e.prototype.asNavFor = function(e) {
        var t = this.getNavTarget();
        null !== t && "object" == typeof t && t.each(function() {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function(i) {
        var e = this,
            t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function() {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function() {
        var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e))
    }, e.prototype.buildArrows = function() {
        var e = this;
        !0 === e.options.arrows && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function() {
        var e, t, o = this;
        if (!0 === o.options.dots) {
            for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active")
        }
    }, e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function() {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
            for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; i < s; i++) {
                var d = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var a = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && a.appendChild(n.get(c))
                    }
                    d.appendChild(a)
                }
                o.appendChild(d)
            }
            l.$slider.empty().append(o), l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function(e, t) {
        var o, s, n, r = this,
            l = !1,
            d = r.$slider.width(),
            a = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || !1 === l || r.$slider.trigger("breakpoint", [r, l])
        }
    }, e.prototype.changeSlide = function(e, t) {
        var o, s, n, r = this,
            l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case "previous":
                s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                break;
            case "next":
                s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                break;
            case "index":
                var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(d), !1, t), l.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function(i) {
        var e, t;
        if (e = this.getNavigableIndexes(), t = 0, i > e[e.length - 1]) i = e[e.length - 1];
        else
            for (var o in e) {
                if (i < e[o]) {
                    i = t;
                    break
                }
                t = e[o]
            }
        return i
    }, e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.cleanUpRows = function() {
        var i, e = this;
        e.options.rows > 1 && ((i = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(i))
    }, e.prototype.clickHandler = function(i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
    }, e.prototype.destroy = function(e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            i(this).attr("style", i(this).data("originalStyling"))
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
    }, e.prototype.disableTransition = function(i) {
        var e = this,
            t = {};
        t[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.fadeSlide = function(i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }), t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }), e && setTimeout(function() {
            t.disableTransition(i), e.call()
        }, t.options.speed))
    }, e.prototype.fadeSlideOut = function(i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(t) {
            t.stopImmediatePropagation();
            var o = i(this);
            setTimeout(function() {
                e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay())
            }, 0)
        })
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, e.prototype.getDotCount = function() {
        var i = this,
            e = 0,
            t = 0,
            o = 0;
        if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow) ++o;
            else
                for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode) o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }, e.prototype.getLeft = function(i) {
        var e, t, o, s, n = this,
            r = 0;
        return n.slideOffset = 0, t = n.$slides.first().outerHeight(!0), !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), r = t * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1, r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth, r = (i + n.options.slidesToShow - n.slideCount) * t), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, r = 0), !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = !1 === n.options.vertical ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r, !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function(i) {
        return this.options[i]
    }, e.prototype.getNavigableIndexes = function() {
        var i, e = this,
            t = 0,
            o = 0,
            s = [];
        for (!1 === e.options.infinite ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); t < i;) s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
    }, e.prototype.getSlick = function() {
        return this
    }, e.prototype.getSlideCount = function() {
        var e, t, o = this;
        return t = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(s, n) {
            if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft) return e = n, !1
        }), Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }, e.prototype.init = function(e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
    }, e.prototype.initADA = function() {
        var e = this,
            t = Math.ceil(e.slideCount / e.options.slidesToShow),
            o = e.getNavigableIndexes().filter(function(i) {
                return i >= 0 && i < e.slideCount
            });
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
            var s = o.indexOf(t);
            i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1
            }), -1 !== s && i(this).attr({
                "aria-describedby": "slick-slide-control" + e.instanceUid + s
            })
        }), e.$dots.attr("role", "tablist").find("li").each(function(s) {
            var n = o[s];
            i(this).attr({
                role: "presentation"
            }), i(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + e.instanceUid + s,
                "aria-controls": "slick-slide" + e.instanceUid + n,
                "aria-label": s + 1 + " of " + t,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(e.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++) e.$slides.eq(s).attr("tabindex", 0);
        e.activateADA()
    }, e.prototype.initArrowEvents = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
    }, e.prototype.initDotEvents = function() {
        var e = this;
        !0 === e.options.dots && (i("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
    }, e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(e.setPosition)
    }, e.prototype.initUI = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }, e.prototype.keyHandler = function(i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }))
    }, e.prototype.lazyLoad = function() {
        function e(e) {
            i("img[data-lazy]", e).each(function() {
                var e = i(this),
                    t = i(this).attr("data-lazy"),
                    o = i(this).attr("data-srcset"),
                    s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                    r = document.createElement("img");
                r.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), n.$slider.trigger("lazyLoaded", [n, e, t])
                    })
                }, r.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t])
                }, r.src = t
            })
        }
        var t, o, s, n = this;
        if (!0 === n.options.centerMode ? !0 === n.options.infinite ? s = (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (o = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (o = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, s = Math.ceil(o + n.options.slidesToShow), !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)), t = n.$slider.find(".slick-slide").slice(o, s), "anticipated" === n.options.lazyLoad)
            for (var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0; a < n.options.slidesToScroll; a++) r < 0 && (r = n.slideCount - 1), t = (t = t.add(d.eq(r))).add(d.eq(l)), r--, l++;
        e(t), n.slideCount <= n.options.slidesToShow ? e(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && e(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }, e.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(), i.$slideTrack.css({
            opacity: 1
        }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, e.prototype.orientationChange = function() {
        var i = this;
        i.checkResponsive(), i.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function() {
        var i = this;
        i.autoPlayClear(), i.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
    }, e.prototype.postSlide = function(e) {
        var t = this;
        t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
    }, e.prototype.prev = e.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, e.prototype.preventDefault = function(i) {
        i.preventDefault()
    }, e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var t, o, s, n, r, l = this,
            d = i("img[data-lazy]", l.$slider);
        d.length ? (t = d.first(), o = t.attr("data-lazy"), s = t.attr("data-srcset"), n = t.attr("data-sizes") || l.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function() {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)), t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === l.options.adaptiveHeight && l.setPosition(), l.$slider.trigger("lazyLoaded", [l, t, o]), l.progressiveLazyLoad()
        }, r.onerror = function() {
            e < 3 ? setTimeout(function() {
                l.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, t, o]), l.progressiveLazyLoad())
        }, r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
    }, e.prototype.refresh = function(e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {
            currentSlide: t
        }), s.init(), e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }, e.prototype.registerBreakpoints = function() {
        var e, t, o, s = this,
            n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n)
                if (o = s.breakpoints.length - 1, n.hasOwnProperty(e)) {
                    for (t = n[e].breakpoint; o >= 0;) s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                    s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
                }
            s.breakpoints.sort(function(i, e) {
                return s.options.mobileFirst ? i - e : e - i
            })
        }
    }, e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, e.prototype.resize = function() {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
            e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
        o.unload(), !0 === t ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
    }, e.prototype.setCSS = function(i) {
        var e, t, o = this,
            s = {};
        !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled ? o.$slideTrack.css(s) : (s = {}, !1 === o.cssTransitions ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
    }, e.prototype.setDimensions = function() {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }, e.prototype.setFade = function() {
        var e, t = this;
        t.$slides.each(function(o, s) {
            e = t.slideWidth * o * -1, !0 === t.options.rtl ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            })
        }), t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
        })
    }, e.prototype.setHeight = function() {
        var i = this;
        if (1 === i.options.slidesToShow && !0 === i.options.adaptiveHeight && !1 === i.options.vertical) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, t, o, s, n, r = this,
            l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : void 0 !== arguments[1] && (n = "single")), "single" === n) r.options[o] = s;
        else if ("multiple" === n) i.each(o, function(i, e) {
            r.options[i] = e
        });
        else if ("responsive" === n)
            for (t in s)
                if ("array" !== i.type(r.options.responsive)) r.options.responsive = [s[t]];
                else {
                    for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
                    r.options.responsive.push(s[t])
                }
        l && (r.unload(), r.reinit())
    }, e.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
    }, e.prototype.setProps = function() {
        var i = this,
            e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
    }, e.prototype.setSlideClasses = function(i) {
        var e, t, o, s, n = this;
        if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), !0 === n.options.centerMode) {
            var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
            e = Math.floor(n.options.slidesToShow / 2), !0 === n.options.infinite && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i, t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")
        } else i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
    }, e.prototype.setupInfinite = function() {
        var e, t, o, s = this;
        if (!0 === s.options.fade && (s.options.centerMode = !1), !0 === s.options.infinite && !1 === s.options.fade && (t = null, s.slideCount > s.options.slidesToShow)) {
            for (o = !0 === s.options.centerMode ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1) t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; e < o + s.slideCount; e += 1) t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                i(this).attr("id", "")
            })
        }
    }, e.prototype.interrupt = function(i) {
        var e = this;
        i || e.autoPlay(), e.interrupted = i
    }, e.prototype.selectHandler = function(e) {
        var t = this,
            o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
            s = parseInt(o.attr("data-slick-index"));
        s || (s = 0), t.slideCount <= t.options.slidesToShow ? t.slideHandler(s, !1, !0) : t.slideHandler(s)
    }, e.prototype.slideHandler = function(i, e, t) {
        var o, s, n, r, l, d = null,
            a = this;
        if (e = e || !1, !(!0 === a.animating && !0 === a.options.waitForAnimate || !0 === a.options.fade && a.currentSlide === i))
            if (!1 === e && a.asNavFor(i), o = i, d = a.getLeft(o), r = a.getLeft(a.currentSlide), a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft, !1 === a.options.infinite && !1 === a.options.centerMode && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() {
                a.postSlide(o)
            }) : a.postSlide(o));
            else if (!1 === a.options.infinite && !0 === a.options.centerMode && (i < 0 || i > a.slideCount - a.options.slidesToScroll)) !1 === a.options.fade && (o = a.currentSlide, !0 !== t ? a.animateSlide(r, function() {
            a.postSlide(o)
        }) : a.postSlide(o));
        else {
            if (a.options.autoplay && clearInterval(a.autoPlayTimer), s = o < 0 ? a.slideCount % a.options.slidesToScroll != 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll != 0 ? 0 : o - a.slideCount : o, a.animating = !0, a.$slider.trigger("beforeChange", [a, a.currentSlide, s]), n = a.currentSlide, a.currentSlide = s, a.setSlideClasses(a.currentSlide), a.options.asNavFor && (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide), a.updateDots(), a.updateArrows(), !0 === a.options.fade) return !0 !== t ? (a.fadeSlideOut(n), a.fadeSlide(s, function() {
                a.postSlide(s)
            })) : a.postSlide(s), void a.animateHeight();
            !0 !== t ? a.animateSlide(d, function() {
                a.postSlide(s)
            }) : a.postSlide(s)
        }
    }, e.prototype.startLoad = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function() {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), (o = Math.round(180 * t / Math.PI)) < 0 && (o = 360 - Math.abs(o)), o <= 45 && o >= 0 ? !1 === s.options.rtl ? "left" : "right" : o <= 360 && o >= 315 ? !1 === s.options.rtl ? "left" : "right" : o >= 135 && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
    }, e.prototype.swipeEnd = function(i) {
        var e, t, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1, !1;
        if (o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
                case "left":
                case "down":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, e.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i)
        }
    }, e.prototype.swipeMove = function(i) {
        var e, t, o, s, n, r, l = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide), l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))), r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r), t = l.swipeDirection(), void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0, i.preventDefault()), s = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1), !0 === l.options.verticalSwiping && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1), o = l.touchObject.swipeLength, l.touchObject.edgeHit = !1, !1 === l.options.infinite && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction, l.touchObject.edgeHit = !0), !1 === l.options.vertical ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s, !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s), !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
    }, e.prototype.swipeStart = function(i) {
        var e, t = this;
        if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return t.touchObject = {}, !1;
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
    }, e.prototype.unload = function() {
        var e = this;
        i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function(i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy()
    }, e.prototype.updateArrows = function() {
        var i = this;
        Math.floor(i.options.slidesToShow / 2), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode ? (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
    }, e.prototype.visibility = function() {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }, i.fn.slick = function() {
        var i, t, o = this,
            s = arguments[0],
            n = Array.prototype.slice.call(arguments, 1),
            r = o.length;
        for (i = 0; i < r; i++)
            if ("object" == typeof s || void 0 === s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), void 0 !== t) return t;
        return o
    }
});

/**
 * Sticky sidebar
 * 3.3.1 | Ahmed Bouhuolia | MIT | https://github.com/abouolia/sticky-sidebar
 **/

! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.StickySidebar = e()
}(this, function() {
    "use strict";
    "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;

    function t(t) {
        return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
    }

    function e(t, e) {
        return t(e = {
            exports: {}
        }, e.exports), e.exports
    }
    var i = e(function(t, e) {
        (function(t) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var l, n, e = function() {
                    function n(t, e) {
                        for (var i = 0; i < e.length; i++) {
                            var n = e[i];
                            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                        }
                    }
                    return function(t, e, i) {
                        return e && n(t.prototype, e), i && n(t, i), t
                    }
                }(),
                i = (l = ".stickySidebar", n = {
                    topSpacing: 0,
                    bottomSpacing: 0,
                    containerSelector: !1,
                    innerWrapperSelector: ".inner-wrapper-sticky",
                    stickyClass: "is-affixed",
                    resizeSensor: !0,
                    minWidth: !1
                }, function() {
                    function c(t) {
                        var e = this,
                            i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                        if (function(t, e) {
                                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                            }(this, c), this.options = c.extend(n, i), this.sidebar = "string" == typeof t ? document.querySelector(t) : t, void 0 === this.sidebar) throw new Error("There is no specific sidebar element.");
                        this.sidebarInner = !1, this.container = this.sidebar.parentElement, this.affixedType = "STATIC", this.direction = "down", this.support = {
                            transform: !1,
                            transform3d: !1
                        }, this._initialized = !1, this._reStyle = !1, this._breakpoint = !1, this.dimensions = {
                            translateY: 0,
                            maxTranslateY: 0,
                            topSpacing: 0,
                            lastTopSpacing: 0,
                            bottomSpacing: 0,
                            lastBottomSpacing: 0,
                            sidebarHeight: 0,
                            sidebarWidth: 0,
                            containerTop: 0,
                            containerHeight: 0,
                            viewportHeight: 0,
                            viewportTop: 0,
                            lastViewportTop: 0
                        }, ["handleEvent"].forEach(function(t) {
                            e[t] = e[t].bind(e)
                        }), this.initialize()
                    }
                    return e(c, [{
                        key: "initialize",
                        value: function() {
                            var i = this;
                            if (this._setSupportFeatures(), this.options.innerWrapperSelector && (this.sidebarInner = this.sidebar.querySelector(this.options.innerWrapperSelector), null === this.sidebarInner && (this.sidebarInner = !1)), !this.sidebarInner) {
                                var t = document.createElement("div");
                                for (t.setAttribute("class", "inner-wrapper-sticky"), this.sidebar.appendChild(t); this.sidebar.firstChild != t;) t.appendChild(this.sidebar.firstChild);
                                this.sidebarInner = this.sidebar.querySelector(".inner-wrapper-sticky")
                            }
                            if (this.options.containerSelector) {
                                var e = document.querySelectorAll(this.options.containerSelector);
                                if ((e = Array.prototype.slice.call(e)).forEach(function(t, e) {
                                        t.contains(i.sidebar) && (i.container = t)
                                    }), !e.length) throw new Error("The container does not contains on the sidebar.")
                            }
                            "function" != typeof this.options.topSpacing && (this.options.topSpacing = parseInt(this.options.topSpacing) || 0), "function" != typeof this.options.bottomSpacing && (this.options.bottomSpacing = parseInt(this.options.bottomSpacing) || 0), this._widthBreakpoint(), this.calcDimensions(), this.stickyPosition(), this.bindEvents(), this._initialized = !0
                        }
                    }, {
                        key: "bindEvents",
                        value: function() {
                            window.addEventListener("resize", this, {
                                passive: !0,
                                capture: !1
                            }), window.addEventListener("scroll", this, {
                                passive: !0,
                                capture: !1
                            }), this.sidebar.addEventListener("update" + l, this), this.options.resizeSensor && "undefined" != typeof ResizeSensor && (new ResizeSensor(this.sidebarInner, this.handleEvent), new ResizeSensor(this.container, this.handleEvent))
                        }
                    }, {
                        key: "handleEvent",
                        value: function(t) {
                            this.updateSticky(t)
                        }
                    }, {
                        key: "calcDimensions",
                        value: function() {
                            if (!this._breakpoint) {
                                var t = this.dimensions;
                                t.containerTop = c.offsetRelative(this.container).top, t.containerHeight = this.container.clientHeight, t.containerBottom = t.containerTop + t.containerHeight, t.sidebarHeight = this.sidebarInner.offsetHeight, t.sidebarWidth = this.sidebarInner.offsetWidth, t.viewportHeight = window.innerHeight, t.maxTranslateY = t.containerHeight - t.sidebarHeight, this._calcDimensionsWithScroll()
                            }
                        }
                    }, {
                        key: "_calcDimensionsWithScroll",
                        value: function() {
                            var t = this.dimensions;
                            t.sidebarLeft = c.offsetRelative(this.sidebar).left, t.viewportTop = document.documentElement.scrollTop || document.body.scrollTop, t.viewportBottom = t.viewportTop + t.viewportHeight, t.viewportLeft = document.documentElement.scrollLeft || document.body.scrollLeft, t.topSpacing = this.options.topSpacing, t.bottomSpacing = this.options.bottomSpacing, "function" == typeof t.topSpacing && (t.topSpacing = parseInt(t.topSpacing(this.sidebar)) || 0), "function" == typeof t.bottomSpacing && (t.bottomSpacing = parseInt(t.bottomSpacing(this.sidebar)) || 0), "VIEWPORT-TOP" === this.affixedType ? t.topSpacing < t.lastTopSpacing && (t.translateY += t.lastTopSpacing - t.topSpacing, this._reStyle = !0) : "VIEWPORT-BOTTOM" === this.affixedType && t.bottomSpacing < t.lastBottomSpacing && (t.translateY += t.lastBottomSpacing - t.bottomSpacing, this._reStyle = !0), t.lastTopSpacing = t.topSpacing, t.lastBottomSpacing = t.bottomSpacing
                        }
                    }, {
                        key: "isSidebarFitsViewport",
                        value: function() {
                            var t = this.dimensions,
                                e = "down" === this.scrollDirection ? t.lastBottomSpacing : t.lastTopSpacing;
                            return this.dimensions.sidebarHeight + e < this.dimensions.viewportHeight
                        }
                    }, {
                        key: "observeScrollDir",
                        value: function() {
                            var t = this.dimensions;
                            if (t.lastViewportTop !== t.viewportTop) {
                                var e = "down" === this.direction ? Math.min : Math.max;
                                t.viewportTop === e(t.viewportTop, t.lastViewportTop) && (this.direction = "down" === this.direction ? "up" : "down")
                            }
                        }
                    }, {
                        key: "getAffixType",
                        value: function() {
                            this._calcDimensionsWithScroll();
                            var t = this.dimensions,
                                e = t.viewportTop + t.topSpacing,
                                i = this.affixedType;
                            return e <= t.containerTop || t.containerHeight <= t.sidebarHeight ? (t.translateY = 0, i = "STATIC") : i = "up" === this.direction ? this._getAffixTypeScrollingUp() : this._getAffixTypeScrollingDown(), t.translateY = Math.max(0, t.translateY), t.translateY = Math.min(t.containerHeight, t.translateY), t.translateY = Math.round(t.translateY), t.lastViewportTop = t.viewportTop, i
                        }
                    }, {
                        key: "_getAffixTypeScrollingDown",
                        value: function() {
                            var t = this.dimensions,
                                e = t.sidebarHeight + t.containerTop,
                                i = t.viewportTop + t.topSpacing,
                                n = t.viewportBottom - t.bottomSpacing,
                                o = this.affixedType;
                            return this.isSidebarFitsViewport() ? t.sidebarHeight + i >= t.containerBottom ? (t.translateY = t.containerBottom - e, o = "CONTAINER-BOTTOM") : i >= t.containerTop && (t.translateY = i - t.containerTop, o = "VIEWPORT-TOP") : t.containerBottom <= n ? (t.translateY = t.containerBottom - e, o = "CONTAINER-BOTTOM") : e + t.translateY <= n ? (t.translateY = n - e, o = "VIEWPORT-BOTTOM") : t.containerTop + t.translateY <= i && 0 !== t.translateY && t.maxTranslateY !== t.translateY && (o = "VIEWPORT-UNBOTTOM"), o
                        }
                    }, {
                        key: "_getAffixTypeScrollingUp",
                        value: function() {
                            var t = this.dimensions,
                                e = t.sidebarHeight + t.containerTop,
                                i = t.viewportTop + t.topSpacing,
                                n = t.viewportBottom - t.bottomSpacing,
                                o = this.affixedType;
                            return i <= t.translateY + t.containerTop ? (t.translateY = i - t.containerTop, o = "VIEWPORT-TOP") : t.containerBottom <= n ? (t.translateY = t.containerBottom - e, o = "CONTAINER-BOTTOM") : this.isSidebarFitsViewport() || t.containerTop <= i && 0 !== t.translateY && t.maxTranslateY !== t.translateY && (o = "VIEWPORT-UNBOTTOM"), o
                        }
                    }, {
                        key: "_getStyle",
                        value: function(t) {
                            if (void 0 !== t) {
                                var e = {
                                        inner: {},
                                        outer: {}
                                    },
                                    i = this.dimensions;
                                switch (t) {
                                    case "VIEWPORT-TOP":
                                        e.inner = {
                                            position: "fixed",
                                            top: i.topSpacing,
                                            left: i.sidebarLeft - i.viewportLeft,
                                            width: i.sidebarWidth
                                        };
                                        break;
                                    case "VIEWPORT-BOTTOM":
                                        e.inner = {
                                            position: "fixed",
                                            top: "auto",
                                            left: i.sidebarLeft,
                                            bottom: i.bottomSpacing,
                                            width: i.sidebarWidth
                                        };
                                        break;
                                    case "CONTAINER-BOTTOM":
                                    case "VIEWPORT-UNBOTTOM":
                                        var n = this._getTranslate(0, i.translateY + "px");
                                        e.inner = n ? {
                                            transform: n
                                        } : {
                                            position: "absolute",
                                            top: i.translateY,
                                            width: i.sidebarWidth
                                        }
                                }
                                switch (t) {
                                    case "VIEWPORT-TOP":
                                    case "VIEWPORT-BOTTOM":
                                    case "VIEWPORT-UNBOTTOM":
                                    case "CONTAINER-BOTTOM":
                                        e.outer = {
                                            height: i.sidebarHeight,
                                            position: "relative"
                                        }
                                }
                                return e.outer = c.extend({
                                    height: "",
                                    position: ""
                                }, e.outer), e.inner = c.extend({
                                    position: "relative",
                                    top: "",
                                    left: "",
                                    bottom: "",
                                    width: "",
                                    transform: ""
                                }, e.inner), e
                            }
                        }
                    }, {
                        key: "stickyPosition",
                        value: function(t) {
                            if (!this._breakpoint) {
                                t = this._reStyle || t || !1, this.options.topSpacing, this.options.bottomSpacing;
                                var e = this.getAffixType(),
                                    i = this._getStyle(e);
                                if ((this.affixedType != e || t) && e) {
                                    var n = "affix." + e.toLowerCase().replace("viewport-", "") + l;
                                    for (var o in c.eventTrigger(this.sidebar, n), "STATIC" === e ? c.removeClass(this.sidebar, this.options.stickyClass) : c.addClass(this.sidebar, this.options.stickyClass), i.outer) {
                                        var s = "number" == typeof i.outer[o] ? "px" : "";
                                        this.sidebar.style[o] = i.outer[o] + s
                                    }
                                    for (var r in i.inner) {
                                        var a = "number" == typeof i.inner[r] ? "px" : "";
                                        this.sidebarInner.style[r] = i.inner[r] + a
                                    }
                                    var p = "affixed." + e.toLowerCase().replace("viewport-", "") + l;
                                    c.eventTrigger(this.sidebar, p)
                                } else this._initialized && (this.sidebarInner.style.left = i.inner.left);
                                this.affixedType = e
                            }
                        }
                    }, {
                        key: "_widthBreakpoint",
                        value: function() {
                            window.innerWidth <= this.options.minWidth ? (this._breakpoint = !0, this.affixedType = "STATIC", this.sidebar.removeAttribute("style"), c.removeClass(this.sidebar, this.options.stickyClass), this.sidebarInner.removeAttribute("style")) : this._breakpoint = !1
                        }
                    }, {
                        key: "updateSticky",
                        value: function() {
                            var t, e = this,
                                i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                            this._running || (this._running = !0, t = i.type, requestAnimationFrame(function() {
                                switch (t) {
                                    case "scroll":
                                        e._calcDimensionsWithScroll(), e.observeScrollDir(), e.stickyPosition();
                                        break;
                                    case "resize":
                                    default:
                                        e._widthBreakpoint(), e.calcDimensions(), e.stickyPosition(!0)
                                }
                                e._running = !1
                            }))
                        }
                    }, {
                        key: "_setSupportFeatures",
                        value: function() {
                            var t = this.support;
                            t.transform = c.supportTransform(), t.transform3d = c.supportTransform(!0)
                        }
                    }, {
                        key: "_getTranslate",
                        value: function() {
                            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                                e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
                                i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0;
                            return this.support.transform3d ? "translate3d(" + t + ", " + e + ", " + i + ")" : !!this.support.translate && "translate(" + t + ", " + e + ")"
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            window.removeEventListener("resize", this, {
                                capture: !1
                            }), window.removeEventListener("scroll", this, {
                                capture: !1
                            }), this.sidebar.classList.remove(this.options.stickyClass), this.sidebar.style.minHeight = "", this.sidebar.removeEventListener("update" + l, this);
                            var t = {
                                inner: {},
                                outer: {}
                            };
                            for (var e in t.inner = {
                                    position: "",
                                    top: "",
                                    left: "",
                                    bottom: "",
                                    width: "",
                                    transform: ""
                                }, t.outer = {
                                    height: "",
                                    position: ""
                                }, t.outer) this.sidebar.style[e] = t.outer[e];
                            for (var i in t.inner) this.sidebarInner.style[i] = t.inner[i];
                            this.options.resizeSensor && "undefined" != typeof ResizeSensor && (ResizeSensor.detach(this.sidebarInner, this.handleEvent), ResizeSensor.detach(this.container, this.handleEvent))
                        }
                    }], [{
                        key: "supportTransform",
                        value: function(t) {
                            var i = !1,
                                e = t ? "perspective" : "transform",
                                n = e.charAt(0).toUpperCase() + e.slice(1),
                                o = document.createElement("support").style;
                            return (e + " " + ["Webkit", "Moz", "O", "ms"].join(n + " ") + n).split(" ").forEach(function(t, e) {
                                if (void 0 !== o[t]) return i = t, !1
                            }), i
                        }
                    }, {
                        key: "eventTrigger",
                        value: function(t, e, i) {
                            try {
                                var n = new CustomEvent(e, {
                                    detail: i
                                })
                            } catch (t) {
                                (n = document.createEvent("CustomEvent")).initCustomEvent(e, !0, !0, i)
                            }
                            t.dispatchEvent(n)
                        }
                    }, {
                        key: "extend",
                        value: function(t, e) {
                            var i = {};
                            for (var n in t) void 0 !== e[n] ? i[n] = e[n] : i[n] = t[n];
                            return i
                        }
                    }, {
                        key: "offsetRelative",
                        value: function(t) {
                            var e = {
                                left: 0,
                                top: 0
                            };
                            do {
                                var i = t.offsetTop,
                                    n = t.offsetLeft;
                                isNaN(i) || (e.top += i), isNaN(n) || (e.left += n), t = "BODY" === t.tagName ? t.parentElement : t.offsetParent
                            } while (t);
                            return e
                        }
                    }, {
                        key: "addClass",
                        value: function(t, e) {
                            c.hasClass(t, e) || (t.classList ? t.classList.add(e) : t.className += " " + e)
                        }
                    }, {
                        key: "removeClass",
                        value: function(t, e) {
                            c.hasClass(t, e) && (t.classList ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " "))
                        }
                    }, {
                        key: "hasClass",
                        value: function(t, e) {
                            return t.classList ? t.classList.contains(e) : new RegExp("(^| )" + e + "( |$)", "gi").test(t.className)
                        }
                    }, {
                        key: "defaults",
                        get: function() {
                            return n
                        }
                    }]), c
                }());
            t.default = i, window.StickySidebar = i
        })(e)
    });
    return t(i), t(e(function(t, e) {
        (function(t) {
            var e, s = (e = t) && e.__esModule ? e : {
                default: e
            };
            ! function() {
                if ("undefined" != typeof window) {
                    var n = window.$ || window.jQuery || window.Zepto,
                        o = "stickySidebar";
                    if (n) {
                        n.fn.stickySidebar = function(i) {
                            return this.each(function() {
                                var t = n(this),
                                    e = n(this).data(o);
                                if (e || (e = new s.default(this, "object" == typeof i && i), t.data(o, e)), "string" == typeof i) {
                                    if (void 0 === e[i] && -1 === ["destroy", "updateSticky"].indexOf(i)) throw new Error('No method named "' + i + '"');
                                    e[i]()
                                }
                            })
                        }, n.fn.stickySidebar.Constructor = s.default;
                        var t = n.fn.stickySidebar;
                        n.fn.stickySidebar.noConflict = function() {
                            return n.fn.stickySidebar = t, this
                        }
                    }
                }
            }()
        })(i)
    }))
});

/**
 * Visible
 * required for: One Page Active
 * Sam Sehnert, samatdf, TeamDF | https://github.com/teamdf/jquery-visible/
 */

(function(e) {
    e.fn.visible = function(t, n, r) {
        var i = e(this).eq(0),
            s = i.get(0),
            o = e(window),
            u = o.scrollTop(),
            a = u + o.height(),
            f = o.scrollLeft(),
            l = f + o.width(),
            c = i.offset().top,
            h = c + i.height(),
            p = i.offset().left,
            d = p + i.width(),
            v = t === true ? h : c,
            m = t === true ? c : h,
            g = t === true ? d : p,
            y = t === true ? p : d,
            b = n === true ? s.offsetWidth * s.offsetHeight : true,
            r = r ? r : "both";
        if (r === "both") return !!b && m <= a && v >= u && y <= l && g >= f;
        else if (r === "vertical") return !!b && m <= a && v >= u;
        else if (r === "horizontal") return !!b && y <= l && g >= f
    }
})(jQuery);

/**
 * Waypoints
 * required for: Chart, Progress, Skills
 * 4.0.1 | Caleb Troughton | https://github.com/imakewebthings/waypoints | Licensed under the MIT license.
 */

! function() {
    "use strict";

    function t(o) {
        if (!o) throw new Error("No options passed to Waypoint constructor");
        if (!o.element) throw new Error("No element option passed to Waypoint constructor");
        if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1
    }
    var e = 0,
        i = {};
    t.prototype.queueTrigger = function(t) {
        this.group.queueTrigger(this, t)
    }, t.prototype.trigger = function(t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }, t.prototype.destroy = function() {
        this.context.remove(this), this.group.remove(this), delete i[this.key]
    }, t.prototype.disable = function() {
        return this.enabled = !1, this
    }, t.prototype.enable = function() {
        return this.context.refresh(), this.enabled = !0, this
    }, t.prototype.next = function() {
        return this.group.next(this)
    }, t.prototype.previous = function() {
        return this.group.previous(this)
    }, t.invokeAll = function(t) {
        var e = [];
        for (var o in i) e.push(i[o]);
        for (var n = 0, r = e.length; r > n; n++) e[n][t]()
    }, t.destroyAll = function() {
        t.invokeAll("destroy")
    }, t.disableAll = function() {
        t.invokeAll("disable")
    }, t.enableAll = function() {
        t.Context.refreshAll();
        for (var e in i) i[e].enabled = !0;
        return this
    }, t.refreshAll = function() {
        t.Context.refreshAll()
    }, t.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight
    }, t.viewportWidth = function() {
        return document.documentElement.clientWidth
    }, t.adapters = [], t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, t.offsetAliases = {
        "bottom-in-view": function() {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        "right-in-view": function() {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = t
}(),
function() {
    "use strict";

    function t(t) {
        window.setTimeout(t, 1e3 / 60)
    }

    function e(t) {
        this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, n.windowContext || (n.windowContext = !0, n.windowContext = new e(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    }
    var i = 0,
        o = {},
        n = window.Waypoint,
        r = window.onload;
    e.prototype.add = function(t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t, this.refresh()
    }, e.prototype.checkEmpty = function() {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            e = this.Adapter.isEmptyObject(this.waypoints.vertical),
            i = this.element == this.element.window;
        t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key])
    }, e.prototype.createThrottledResizeHandler = function() {
        function t() {
            e.handleResize(), e.didResize = !1
        }
        var e = this;
        this.adapter.on("resize.waypoints", function() {
            e.didResize || (e.didResize = !0, n.requestAnimationFrame(t))
        })
    }, e.prototype.createThrottledScrollHandler = function() {
        function t() {
            e.handleScroll(), e.didScroll = !1
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function() {
            (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t))
        })
    }, e.prototype.handleResize = function() {
        n.Context.refreshAll()
    }, e.prototype.handleScroll = function() {
        var t = {},
            e = {
                horizontal: {
                    newScroll: this.adapter.scrollLeft(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left"
                },
                vertical: {
                    newScroll: this.adapter.scrollTop(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up"
                }
            };
        for (var i in e) {
            var o = e[i],
                n = o.newScroll > o.oldScroll,
                r = n ? o.forward : o.backward;
            for (var s in this.waypoints[i]) {
                var a = this.waypoints[i][s];
                if (null !== a.triggerPoint) {
                    var l = o.oldScroll < a.triggerPoint,
                        h = o.newScroll >= a.triggerPoint,
                        p = l && h,
                        u = !l && !h;
                    (p || u) && (a.queueTrigger(r), t[a.group.id] = a.group)
                }
            }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = {
            x: e.horizontal.newScroll,
            y: e.vertical.newScroll
        }
    }, e.prototype.innerHeight = function() {
        return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight()
    }, e.prototype.remove = function(t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty()
    }, e.prototype.innerWidth = function() {
        return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth()
    }, e.prototype.destroy = function() {
        var t = [];
        for (var e in this.waypoints)
            for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy()
    }, e.prototype.refresh = function() {
        var t, e = this.element == this.element.window,
            i = e ? void 0 : this.adapter.offset(),
            o = {};
        this.handleScroll(), t = {
            horizontal: {
                contextOffset: e ? 0 : i.left,
                contextScroll: e ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
            },
            vertical: {
                contextOffset: e ? 0 : i.top,
                contextScroll: e ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
            }
        };
        for (var r in t) {
            var s = t[r];
            for (var a in this.waypoints[r]) {
                var l, h, p, u, c, d = this.waypoints[r][a],
                    f = d.options.offset,
                    w = d.triggerPoint,
                    y = 0,
                    g = null == w;
                d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), l = s.contextScroll - s.contextOffset, d.triggerPoint = Math.floor(y + l - f), h = w < s.oldScroll, p = d.triggerPoint >= s.oldScroll, u = h && p, c = !h && !p, !g && u ? (d.queueTrigger(s.backward), o[d.group.id] = d.group) : !g && c ? (d.queueTrigger(s.forward), o[d.group.id] = d.group) : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), o[d.group.id] = d.group)
            }
        }
        return n.requestAnimationFrame(function() {
            for (var t in o) o[t].flushTriggers()
        }), this
    }, e.findOrCreateByElement = function(t) {
        return e.findByElement(t) || new e(t)
    }, e.refreshAll = function() {
        for (var t in o) o[t].refresh()
    }, e.findByElement = function(t) {
        return o[t.waypointContextKey]
    }, window.onload = function() {
        r && r(), e.refreshAll()
    }, n.requestAnimationFrame = function(e) {
        var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
        i.call(window, e)
    }, n.Context = e
}(),
function() {
    "use strict";

    function t(t, e) {
        return t.triggerPoint - e.triggerPoint
    }

    function e(t, e) {
        return e.triggerPoint - t.triggerPoint
    }

    function i(t) {
        this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this
    }
    var o = {
            vertical: {},
            horizontal: {}
        },
        n = window.Waypoint;
    i.prototype.add = function(t) {
        this.waypoints.push(t)
    }, i.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        }
    }, i.prototype.flushTriggers = function() {
        for (var i in this.triggerQueues) {
            var o = this.triggerQueues[i],
                n = "up" === i || "left" === i;
            o.sort(n ? e : t);
            for (var r = 0, s = o.length; s > r; r += 1) {
                var a = o[r];
                (a.options.continuous || r === o.length - 1) && a.trigger([i])
            }
        }
        this.clearTriggerQueues()
    }, i.prototype.next = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints),
            o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1]
    }, i.prototype.previous = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null
    }, i.prototype.queueTrigger = function(t, e) {
        this.triggerQueues[e].push(t)
    }, i.prototype.remove = function(t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1)
    }, i.prototype.first = function() {
        return this.waypoints[0]
    }, i.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1]
    }, i.findOrCreate = function(t) {
        return o[t.axis][t.name] || new i(t)
    }, n.Group = i
}(),
function() {
    "use strict";

    function t(t) {
        this.$element = e(t)
    }
    var e = window.jQuery,
        i = window.Waypoint;
    e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, i) {
        t.prototype[i] = function() {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[i].apply(this.$element, t)
        }
    }), e.each(["extend", "inArray", "isEmptyObject"], function(i, o) {
        t[o] = e[o]
    }), i.adapters.push({
        name: "jquery",
        Adapter: t
    }), i.Adapter = t
}(),
function() {
    "use strict";

    function t(t) {
        return function() {
            var i = [],
                o = arguments[0];
            return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function() {
                var n = t.extend({}, o, {
                    element: this
                });
                "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n))
            }), i
        }
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}();