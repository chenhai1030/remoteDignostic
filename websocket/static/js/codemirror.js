// CodeMirror, copyright (c) by Marijn Haverbeke and others
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.CodeMirror = t()
}(this, function() {
    "use strict";
    function e(e) {
        return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*")
    }
    function t(e) {
        for (var t = e.childNodes.length; t > 0; --t) e.removeChild(e.firstChild);
        return e
    }
    function n(e, n) {
        return t(e).appendChild(n)
    }
    function r(e, t, n, r) {
        var i = document.createElement(e);
        if (n && (i.className = n), r && (i.style.cssText = r), "string" == typeof t) i.appendChild(document.createTextNode(t));
        else if (t)
            for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
        return i
    }
    function i(e, t, n, i) {
        var o = r(e, t, n, i);
        return o.setAttribute("role", "presentation"), o
    }
    function o(e, t) {
        if (3 == t.nodeType && (t = t.parentNode), e.contains) return e.contains(t);
        do {
            if (11 == t.nodeType && (t = t.host), t == e) return !0
        } while (t = t.parentNode)
    }
    function a() {
        var e;
        try {
            e = document.activeElement
        } catch (Ka) {
            e = document.body || null
        }
        for (; e && e.shadowRoot && e.shadowRoot.activeElement;) e = e.shadowRoot.activeElement;
        return e
    }
    function l(t, n) {
        var r = t.className;
        e(n).test(r) || (t.className += (r ? " " : "") + n)
    }
    function s(t, n) {
        for (var r = t.split(" "), i = 0; i < r.length; i++) r[i] && !e(r[i]).test(n) && (n += " " + r[i]);
        return n
    }
    function c(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return function() {
            return e.apply(null, t)
        }
    }
    function u(e, t, n) {
        for (var r in t || (t = {}), e) !e.hasOwnProperty(r) || !1 === n && t.hasOwnProperty(r) || (t[r] = e[r]);
        return t
    }
    function f(e, t, n, r, i) {
        null == t && -1 == (t = e.search(/[^\s\u00a0]/)) && (t = e.length);
        for (var o = r || 0, a = i || 0;;) {
            var l = e.indexOf("\t", o);
            if (l < 0 || l >= t) return a + (t - o);
            a += l - o, a += n - a % n, o = l + 1
        }
    }
    function d(e, t) {
        for (var n = 0; n < e.length; ++n)
            if (e[n] == t) return n;
        return -1
    }
    function h(e, t, n) {
        for (var r = 0, i = 0;;) {
            var o = e.indexOf("\t", r); - 1 == o && (o = e.length);
            var a = o - r;
            if (o == e.length || i + a >= t) return r + Math.min(a, t - i);
            if (i += o - r, r = o + 1, (i += n - i % n) >= t) return r
        }
    }
    function p(e) {
        for (; Qa.length <= e;) Qa.push(m(Qa) + " ");
        return Qa[e]
    }
    function m(e) {
        return e[e.length - 1]
    }
    function g(e, t) {
        for (var n = [], r = 0; r < e.length; r++) n[r] = t(e[r], r);
        return n
    }
    function v(e, t, n) {
        for (var r = 0, i = n(t); r < e.length && n(e[r]) <= i;) r++;
        e.splice(r, 0, t)
    }
    function y() {}
    function b(e, t) {
        var n;
        return Object.create ? n = Object.create(e) : (y.prototype = e, n = new y), t && u(t, n), n
    }
    function x(e) {
        return /\w/.test(e) || e > "\x80" && (e.toUpperCase() != e.toLowerCase() || Ja.test(e))
    }
    function k(e, t) {
        return t ? !!(t.source.indexOf("\\w") > -1 && x(e)) || t.test(e) : x(e)
    }
    function w(e) {
        for (var t in e)
            if (e.hasOwnProperty(t) && e[t]) return !1;
        return !0
    }
    function C(e) {
        return e.charCodeAt(0) >= 768 && el.test(e)
    }
    function S(e, t, n) {
        for (;
            (n < 0 ? t > 0 : t < e.length) && C(e.charAt(t));) t += n;
        return t
    }
    function L(e, t, n) {
        for (var r = t > n ? -1 : 1;;) {
            if (t == n) return t;
            var i = (t + n) / 2,
                o = r < 0 ? Math.ceil(i) : Math.floor(i);
            if (o == t) return e(o) ? t : n;
            e(o) ? n = o : t = o + r
        }
    }
    function T(e, t, n) {
        var o = this;
        this.input = n, o.scrollbarFiller = r("div", null, "CodeMirror-scrollbar-filler"), o.scrollbarFiller.setAttribute("cm-not-content", "true"), o.gutterFiller = r("div", null, "CodeMirror-gutter-filler"), o.gutterFiller.setAttribute("cm-not-content", "true"), o.lineDiv = i("div", null, "CodeMirror-code"), o.selectionDiv = r("div", null, null, "position: relative; z-index: 1"), o.cursorDiv = r("div", null, "CodeMirror-cursors"), o.measure = r("div", null, "CodeMirror-measure"), o.lineMeasure = r("div", null, "CodeMirror-measure"), o.lineSpace = i("div", [o.measure, o.lineMeasure, o.selectionDiv, o.cursorDiv, o.lineDiv], null, "position: relative; outline: none");
        var a = i("div", [o.lineSpace], "CodeMirror-lines");
        o.mover = r("div", [a], null, "position: relative"), o.sizer = r("div", [o.mover], "CodeMirror-sizer"), o.sizerWidth = null, o.heightForcer = r("div", null, null, "position: absolute; height: " + Va + "px; width: 1px;"), o.gutters = r("div", null, "CodeMirror-gutters"), o.lineGutter = null, o.scroller = r("div", [o.sizer, o.heightForcer, o.gutters], "CodeMirror-scroll"), o.scroller.setAttribute("tabIndex", "-1"), o.wrapper = r("div", [o.scrollbarFiller, o.gutterFiller, o.scroller], "CodeMirror"), wa && Ca < 8 && (o.gutters.style.zIndex = -1, o.scroller.style.paddingRight = 0), Sa || ya && Ea || (o.scroller.draggable = !0), e && (e.appendChild ? e.appendChild(o.wrapper) : e(o.wrapper)), o.viewFrom = o.viewTo = t.first, o.reportedViewFrom = o.reportedViewTo = t.first, o.view = [], o.renderedView = null, o.externalMeasured = null, o.viewOffset = 0, o.lastWrapHeight = o.lastWrapWidth = 0, o.updateLineNumbers = null, o.nativeBarWidth = o.barHeight = o.barWidth = 0, o.scrollbarsClipped = !1, o.lineNumWidth = o.lineNumInnerWidth = o.lineNumChars = null, o.alignWidgets = !1, o.cachedCharWidth = o.cachedTextHeight = o.cachedPaddingH = null, o.maxLine = null, o.maxLineLength = 0, o.maxLineChanged = !1, o.wheelDX = o.wheelDY = o.wheelStartX = o.wheelStartY = null, o.shift = !1, o.selForContextMenu = null, o.activeTouch = null, n.init(o)
    }
    function M(e, t) {
        if ((t -= e.first) < 0 || t >= e.size) throw new Error("There is no line " + (t + e.first) + " in the document.");
        for (var n = e; !n.lines;)
            for (var r = 0;; ++r) {
                var i = n.children[r],
                    o = i.chunkSize();
                if (t < o) {
                    n = i;
                    break
                }
                t -= o
            }
        return n.lines[t]
    }
    function z(e, t, n) {
        var r = [],
            i = t.line;
        return e.iter(t.line, n.line + 1, function(e) {
            var o = e.text;
            i == n.line && (o = o.slice(0, n.ch)), i == t.line && (o = o.slice(t.ch)), r.push(o), ++i
        }), r
    }
    function A(e, t, n) {
        var r = [];
        return e.iter(t, n, function(e) {
            r.push(e.text)
        }), r
    }
    function O(e, t) {
        var n = t - e.height;
        if (n)
            for (var r = e; r; r = r.parent) r.height += n
    }
    function N(e) {
        if (null == e.parent) return null;
        for (var t = e.parent, n = d(t.lines, e), r = t.parent; r; t = r, r = r.parent)
            for (var i = 0; r.children[i] != t; ++i) n += r.children[i].chunkSize();
        return n + t.first
    }
    function P(e, t) {
        var n = e.first;
        e: do {
            for (var r = 0; r < e.children.length; ++r) {
                var i = e.children[r],
                    o = i.height;
                if (t < o) {
                    e = i;
                    continue e
                }
                t -= o, n += i.chunkSize()
            }
            return n
        } while (!e.lines);
        for (var a = 0; a < e.lines.length; ++a) {
            var l = e.lines[a].height;
            if (t < l) break;
            t -= l
        }
        return n + a
    }
    function E(e, t) {
        return t >= e.first && t < e.first + e.size
    }
    function F(e, t) {
        return String(e.lineNumberFormatter(t + e.firstLineNumber))
    }
    function j(e, t, n) {
        if (void 0 === n && (n = null), !(this instanceof j)) return new j(e, t, n);
        this.line = e, this.ch = t, this.sticky = n
    }
    function I(e, t) {
        return e.line - t.line || e.ch - t.ch
    }
    function D(e, t) {
        return e.sticky == t.sticky && 0 == I(e, t)
    }
    function _(e) {
        return j(e.line, e.ch)
    }
    function W(e, t) {
        return I(e, t) < 0 ? t : e
    }
    function R(e, t) {
        return I(e, t) < 0 ? e : t
    }
    function H(e, t) {
        return Math.max(e.first, Math.min(t, e.first + e.size - 1))
    }
    function B(e, t) {
        if (t.line < e.first) return j(e.first, 0);
        var n = e.first + e.size - 1;
        return t.line > n ? j(n, M(e, n).text.length) : q(t, M(e, t.line).text.length)
    }
    function q(e, t) {
        var n = e.ch;
        return null == n || n > t ? j(e.line, t) : n < 0 ? j(e.line, 0) : e
    }
    function U(e, t) {
        for (var n = [], r = 0; r < t.length; r++) n[r] = B(e, t[r]);
        return n
    }
    function $() {
        tl = !0
    }
    function K() {
        nl = !0
    }
    function V(e, t, n) {
        this.marker = e, this.from = t, this.to = n
    }
    function G(e, t) {
        if (e)
            for (var n = 0; n < e.length; ++n) {
                var r = e[n];
                if (r.marker == t) return r
            }
    }
    function X(e, t) {
        for (var n, r = 0; r < e.length; ++r) e[r] != t && (n || (n = [])).push(e[r]);
        return n
    }
    function Y(e, t) {
        e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t], t.marker.attachLine(e)
    }
    function Z(e, t, n) {
        var r;
        if (e)
            for (var i = 0; i < e.length; ++i) {
                var o = e[i],
                    a = o.marker;
                if (null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t) || o.from == t && "bookmark" == a.type && (!n || !o.marker.insertLeft)) {
                    var l = null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t);
                    (r || (r = [])).push(new V(a, o.from, l ? null : o.to))
                }
            }
        return r
    }
    function Q(e, t, n) {
        var r;
        if (e)
            for (var i = 0; i < e.length; ++i) {
                var o = e[i],
                    a = o.marker;
                if (null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t) || o.from == t && "bookmark" == a.type && (!n || o.marker.insertLeft)) {
                    var l = null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t);
                    (r || (r = [])).push(new V(a, l ? null : o.from - t, null == o.to ? null : o.to - t))
                }
            }
        return r
    }
    function J(e, t) {
        if (t.full) return null;
        var n = E(e, t.from.line) && M(e, t.from.line).markedSpans,
            r = E(e, t.to.line) && M(e, t.to.line).markedSpans;
        if (!n && !r) return null;
        var i = t.from.ch,
            o = t.to.ch,
            a = 0 == I(t.from, t.to),
            l = Z(n, i, a),
            s = Q(r, o, a),
            c = 1 == t.text.length,
            u = m(t.text).length + (c ? i : 0);
        if (l)
            for (var f = 0; f < l.length; ++f) {
                var d = l[f];
                if (null == d.to) {
                    var h = G(s, d.marker);
                    h ? c && (d.to = null == h.to ? null : h.to + u) : d.to = i
                }
            }
        if (s)
            for (var p = 0; p < s.length; ++p) {
                var g = s[p];
                if (null != g.to && (g.to += u), null == g.from) G(l, g.marker) || (g.from = u, c && (l || (l = [])).push(g));
                else g.from += u, c && (l || (l = [])).push(g)
            }
        l && (l = ee(l)), s && s != l && (s = ee(s));
        var v = [l];
        if (!c) {
            var y, b = t.text.length - 2;
            if (b > 0 && l)
                for (var x = 0; x < l.length; ++x) null == l[x].to && (y || (y = [])).push(new V(l[x].marker, null, null));
            for (var k = 0; k < b; ++k) v.push(y);
            v.push(s)
        }
        return v
    }
    function ee(e) {
        for (var t = 0; t < e.length; ++t) {
            var n = e[t];
            null != n.from && n.from == n.to && !1 !== n.marker.clearWhenEmpty && e.splice(t--, 1)
        }
        return e.length ? e : null
    }
    function te(e, t, n) {
        var r = null;
        if (e.iter(t.line, n.line + 1, function(e) {
                if (e.markedSpans)
                    for (var t = 0; t < e.markedSpans.length; ++t) {
                        var n = e.markedSpans[t].marker;
                        !n.readOnly || r && -1 != d(r, n) || (r || (r = [])).push(n)
                    }
            }), !r) return null;
        for (var i = [{
                from: t,
                to: n
            }], o = 0; o < r.length; ++o)
            for (var a = r[o], l = a.find(0), s = 0; s < i.length; ++s) {
                var c = i[s];
                if (!(I(c.to, l.from) < 0 || I(c.from, l.to) > 0)) {
                    var u = [s, 1],
                        f = I(c.from, l.from),
                        h = I(c.to, l.to);
                    (f < 0 || !a.inclusiveLeft && !f) && u.push({
                        from: c.from,
                        to: l.from
                    }), (h > 0 || !a.inclusiveRight && !h) && u.push({
                        from: l.to,
                        to: c.to
                    }), i.splice.apply(i, u), s += u.length - 3
                }
            }
        return i
    }
    function ne(e) {
        var t = e.markedSpans;
        if (t) {
            for (var n = 0; n < t.length; ++n) t[n].marker.detachLine(e);
            e.markedSpans = null
        }
    }
    function re(e, t) {
        if (t) {
            for (var n = 0; n < t.length; ++n) t[n].marker.attachLine(e);
            e.markedSpans = t
        }
    }
    function ie(e) {
        return e.inclusiveLeft ? -1 : 0
    }
    function oe(e) {
        return e.inclusiveRight ? 1 : 0
    }
    function ae(e, t) {
        var n = e.lines.length - t.lines.length;
        if (0 != n) return n;
        var r = e.find(),
            i = t.find(),
            o = I(r.from, i.from) || ie(e) - ie(t);
        if (o) return -o;
        var a = I(r.to, i.to) || oe(e) - oe(t);
        return a || t.id - e.id
    }
    function le(e, t) {
        var n, r = nl && e.markedSpans;
        if (r)
            for (var i = void 0, o = 0; o < r.length; ++o)(i = r[o]).marker.collapsed && null == (t ? i.from : i.to) && (!n || ae(n, i.marker) < 0) && (n = i.marker);
        return n
    }
    function se(e) {
        return le(e, !0)
    }
    function ce(e) {
        return le(e, !1)
    }
    function ue(e, t) {
        var n, r = nl && e.markedSpans;
        if (r)
            for (var i = 0; i < r.length; ++i) {
                var o = r[i];
                o.marker.collapsed && (null == o.from || o.from < t) && (null == o.to || o.to > t) && (!n || ae(n, o.marker) < 0) && (n = o.marker)
            }
        return n
    }
    function fe(e, t, n, r, i) {
        var o = M(e, t),
            a = nl && o.markedSpans;
        if (a)
            for (var l = 0; l < a.length; ++l) {
                var s = a[l];
                if (s.marker.collapsed) {
                    var c = s.marker.find(0),
                        u = I(c.from, n) || ie(s.marker) - ie(i),
                        f = I(c.to, r) || oe(s.marker) - oe(i);
                    if (!(u >= 0 && f <= 0 || u <= 0 && f >= 0) && (u <= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? I(c.to, n) >= 0 : I(c.to, n) > 0) || u >= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? I(c.from, r) <= 0 : I(c.from, r) < 0))) return !0
                }
            }
    }
    function de(e) {
        for (var t; t = se(e);) e = t.find(-1, !0).line;
        return e
    }
    function he(e) {
        for (var t; t = ce(e);) e = t.find(1, !0).line;
        return e
    }
    function pe(e) {
        for (var t, n; t = ce(e);) e = t.find(1, !0).line, (n || (n = [])).push(e);
        return n
    }
    function me(e, t) {
        var n = M(e, t),
            r = de(n);
        return n == r ? t : N(r)
    }
    function ge(e, t) {
        if (t > e.lastLine()) return t;
        var n, r = M(e, t);
        if (!ve(e, r)) return t;
        for (; n = ce(r);) r = n.find(1, !0).line;
        return N(r) + 1
    }
    function ve(e, t) {
        var n = nl && t.markedSpans;
        if (n)
            for (var r = void 0, i = 0; i < n.length; ++i)
                if ((r = n[i]).marker.collapsed) {
                    if (null == r.from) return !0;
                    if (!r.marker.widgetNode && 0 == r.from && r.marker.inclusiveLeft && ye(e, t, r)) return !0
                }
    }
    function ye(e, t, n) {
        if (null == n.to) {
            var r = n.marker.find(1, !0);
            return ye(e, r.line, G(r.line.markedSpans, n.marker))
        }
        if (n.marker.inclusiveRight && n.to == t.text.length) return !0;
        for (var i = void 0, o = 0; o < t.markedSpans.length; ++o)
            if ((i = t.markedSpans[o]).marker.collapsed && !i.marker.widgetNode && i.from == n.to && (null == i.to || i.to != n.from) && (i.marker.inclusiveLeft || n.marker.inclusiveRight) && ye(e, t, i)) return !0
    }
    function be(e) {
        for (var t = 0, n = (e = de(e)).parent, r = 0; r < n.lines.length; ++r) {
            var i = n.lines[r];
            if (i == e) break;
            t += i.height
        }
        for (var o = n.parent; o; o = (n = o).parent)
            for (var a = 0; a < o.children.length; ++a) {
                var l = o.children[a];
                if (l == n) break;
                t += l.height
            }
        return t
    }
    function xe(e) {
        if (0 == e.height) return 0;
        for (var t, n = e.text.length, r = e; t = se(r);) {
            var i = t.find(0, !0);
            r = i.from.line, n += i.from.ch - i.to.ch
        }
        for (r = e; t = ce(r);) {
            var o = t.find(0, !0);
            n -= r.text.length - o.from.ch, n += (r = o.to.line).text.length - o.to.ch
        }
        return n
    }
    function ke(e) {
        var t = e.display,
            n = e.doc;
        t.maxLine = M(n, n.first), t.maxLineLength = xe(t.maxLine), t.maxLineChanged = !0, n.iter(function(e) {
            var n = xe(e);
            n > t.maxLineLength && (t.maxLineLength = n, t.maxLine = e)
        })
    }
    function we(e, t, n, r) {
        if (!e) return r(t, n, "ltr", 0);
        for (var i = !1, o = 0; o < e.length; ++o) {
            var a = e[o];
            (a.from < n && a.to > t || t == n && a.to == t) && (r(Math.max(a.from, t), Math.min(a.to, n), 1 == a.level ? "rtl" : "ltr", o), i = !0)
        }
        i || r(t, n, "ltr")
    }
    function Ce(e, t, n) {
        var r;
        rl = null;
        for (var i = 0; i < e.length; ++i) {
            var o = e[i];
            if (o.from < t && o.to > t) return i;
            o.to == t && (o.from != o.to && "before" == n ? r = i : rl = i), o.from == t && (o.from != o.to && "before" != n ? r = i : rl = i)
        }
        return null != r ? r : rl
    }
    function Se(e, t) {
        var n = e.order;
        return null == n && (n = e.order = il(e.text, t)), n
    }
    function Le(e, t) {
        return e._handlers && e._handlers[t] || ol
    }
    function Te(e, t, n) {
        if (e.removeEventListener) e.removeEventListener(t, n, !1);
        else if (e.detachEvent) e.detachEvent("on" + t, n);
        else {
            var r = e._handlers,
                i = r && r[t];
            if (i) {
                var o = d(i, n);
                o > -1 && (r[t] = i.slice(0, o).concat(i.slice(o + 1)))
            }
        }
    }
    function Me(e, t) {
        var n = Le(e, t);
        if (n.length)
            for (var r = Array.prototype.slice.call(arguments, 2), i = 0; i < n.length; ++i) n[i].apply(null, r)
    }
    function ze(e, t, n) {
        return "string" == typeof t && (t = {
            type: t,
            preventDefault: function() {
                this.defaultPrevented = !0
            }
        }), Me(e, n || t.type, e, t), Fe(t) || t.codemirrorIgnore
    }
    function Ae(e) {
        var t = e._handlers && e._handlers.cursorActivity;
        if (t)
            for (var n = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), r = 0; r < t.length; ++r) - 1 == d(n, t[r]) && n.push(t[r])
    }
    function Oe(e, t) {
        return Le(e, t).length > 0
    }
    function Ne(e) {
        e.prototype.on = function(e, t) {
            al(this, e, t)
        }, e.prototype.off = function(e, t) {
            Te(this, e, t)
        }
    }
    function Pe(e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
    }
    function Ee(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
    }
    function Fe(e) {
        return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue
    }
    function je(e) {
        Pe(e), Ee(e)
    }
    function Ie(e) {
        return e.target || e.srcElement
    }
    function De(e) {
        var t = e.which;
        return null == t && (1 & e.button ? t = 1 : 2 & e.button ? t = 3 : 4 & e.button && (t = 2)), Fa && e.ctrlKey && 1 == t && (t = 3), t
    }
    function _e(e) {
        if (null == Ua) {
            var t = r("span", "\u200b");
            n(e, r("span", [t, document.createTextNode("x")])), 0 != e.firstChild.offsetHeight && (Ua = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(wa && Ca < 8))
        }
        var i = Ua ? r("span", "\u200b") : r("span", "\xa0", null, "display: inline-block; width: 1px; margin-right: -1px");
        return i.setAttribute("cm-text", ""), i
    }
    function We(e) {
        if (null != $a) return $a;
        var r = n(e, document.createTextNode("A\u062eA")),
            i = _a(r, 0, 1).getBoundingClientRect(),
            o = _a(r, 1, 2).getBoundingClientRect();
        return t(e), !(!i || i.left == i.right) && ($a = o.right - i.right < 3)
    }
    function Re(e) {
        if (null != fl) return fl;
        var t = n(e, r("span", "x")),
            i = t.getBoundingClientRect(),
            o = _a(t, 0, 1).getBoundingClientRect();
        return fl = Math.abs(i.left - o.left) > 1
    }
    function He(e, t) {
        arguments.length > 2 && (t.dependencies = Array.prototype.slice.call(arguments, 2)), dl[e] = t
    }
    function Be(e, t) {
        hl[e] = t
    }
    function qe(e) {
        if ("string" == typeof e && hl.hasOwnProperty(e)) e = hl[e];
        else if (e && "string" == typeof e.name && hl.hasOwnProperty(e.name)) {
            var t = hl[e.name];
            "string" == typeof t && (t = {
                name: t
            }), (e = b(t, e)).name = t.name
        } else {
            if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e)) return qe("application/xml");
            if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+json$/.test(e)) return qe("application/json")
        }
        return "string" == typeof e ? {
            name: e
        } : e || {
            name: "null"
        }
    }
    function Ue(e, t) {
        t = qe(t);
        var n = dl[t.name];
        if (!n) return Ue(e, "text/plain");
        var r = n(e, t);
        if (pl.hasOwnProperty(t.name)) {
            var i = pl[t.name];
            for (var o in i) i.hasOwnProperty(o) && (r.hasOwnProperty(o) && (r["_" + o] = r[o]), r[o] = i[o])
        }
        if (r.name = t.name, t.helperType && (r.helperType = t.helperType), t.modeProps)
            for (var a in t.modeProps) r[a] = t.modeProps[a];
        return r
    }
    function $e(e, t) {
        u(t, pl.hasOwnProperty(e) ? pl[e] : pl[e] = {})
    }
    function Ke(e, t) {
        if (!0 === t) return t;
        if (e.copyState) return e.copyState(t);
        var n = {};
        for (var r in t) {
            var i = t[r];
            i instanceof Array && (i = i.concat([])), n[r] = i
        }
        return n
    }
    function Ve(e, t) {
        for (var n; e.innerMode && (n = e.innerMode(t)) && n.mode != e;) t = n.state, e = n.mode;
        return n || {
            mode: e,
            state: t
        }
    }
    function Ge(e, t, n) {
        return !e.startState || e.startState(t, n)
    }
    function Xe(e, t, n, r) {
        var i = [e.state.modeGen],
            o = {};
        rt(e, t.text, e.doc.mode, n, function(e, t) {
            return i.push(e, t)
        }, o, r);
        for (var a = n.state, l = function(r) {
                n.baseTokens = i;
                var l = e.state.overlays[r],
                    s = 1,
                    c = 0;
                n.state = !0, rt(e, t.text, l.mode, n, function(e, t) {
                    for (var n = s; c < e;) {
                        var r = i[s];
                        r > e && i.splice(s, 1, e, i[s + 1], r), s += 2, c = Math.min(e, r)
                    }
                    if (t)
                        if (l.opaque) i.splice(n, s - n, e, "overlay " + t), s = n + 2;
                        else
                            for (; n < s; n += 2) {
                                var o = i[n + 1];
                                i[n + 1] = (o ? o + " " : "") + "overlay " + t
                            }
                }, o), n.state = a, n.baseTokens = null, n.baseTokenPos = 1
            }, s = 0; s < e.state.overlays.length; ++s) l(s);
        return {
            styles: i,
            classes: o.bgClass || o.textClass ? o : null
        }
    }
    function Ye(e, t, n) {
        if (!t.styles || t.styles[0] != e.state.modeGen) {
            var r = Ze(e, N(t)),
                i = t.text.length > e.options.maxHighlightLength && Ke(e.doc.mode, r.state),
                o = Xe(e, t, r);
            i && (r.state = i), t.stateAfter = r.save(!i), t.styles = o.styles, o.classes ? t.styleClasses = o.classes : t.styleClasses && (t.styleClasses = null), n === e.doc.highlightFrontier && (e.doc.modeFrontier = Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier))
        }
        return t.styles
    }
    function Ze(e, t, n) {
        var r = e.doc,
            i = e.display;
        if (!r.mode.startState) return new vl(r, !0, t);
        var o = it(e, t, n),
            a = o > r.first && M(r, o - 1).stateAfter,
            l = a ? vl.fromSaved(r, a, o) : new vl(r, Ge(r.mode), o);
        return r.iter(o, t, function(n) {
            Qe(e, n.text, l);
            var r = l.line;
            n.stateAfter = r == t - 1 || r % 5 == 0 || r >= i.viewFrom && r < i.viewTo ? l.save() : null, l.nextLine()
        }), n && (r.modeFrontier = l.line), l
    }
    function Qe(e, t, n, r) {
        var i = e.doc.mode,
            o = new ml(t, e.options.tabSize, n);
        for (o.start = o.pos = r || 0, "" == t && Je(i, n.state); !o.eol();) et(i, o, n.state), o.start = o.pos
    }
    function Je(e, t) {
        if (e.blankLine) return e.blankLine(t);
        if (e.innerMode) {
            var n = Ve(e, t);
            return n.mode.blankLine ? n.mode.blankLine(n.state) : void 0
        }
    }
    function et(e, t, n, r) {
        for (var i = 0; i < 10; i++) {
            r && (r[0] = Ve(e, n).mode);
            var o = e.token(t, n);
            if (t.pos > t.start) return o
        }
        throw new Error("Mode " + e.name + " failed to advance stream.")
    }
    function tt(e, t, n, r) {
        var i, o, a = e.doc,
            l = a.mode,
            s = M(a, (t = B(a, t)).line),
            c = Ze(e, t.line, n),
            u = new ml(s.text, e.options.tabSize, c);
        for (r && (o = []);
            (r || u.pos < t.ch) && !u.eol();) u.start = u.pos, i = et(l, u, c.state), r && o.push(new yl(u, i, Ke(a.mode, c.state)));
        return r ? o : new yl(u, i, c.state)
    }
    function nt(e, t) {
        if (e)
            for (;;) {
                var n = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
                if (!n) break;
                e = e.slice(0, n.index) + e.slice(n.index + n[0].length);
                var r = n[1] ? "bgClass" : "textClass";
                null == t[r] ? t[r] = n[2] : new RegExp("(?:^|s)" + n[2] + "(?:$|s)").test(t[r]) || (t[r] += " " + n[2])
            }
        return e
    }
    function rt(e, t, n, r, i, o, a) {
        var l = n.flattenSpans;
        null == l && (l = e.options.flattenSpans);
        var s, c = 0,
            u = null,
            f = new ml(t, e.options.tabSize, r),
            d = e.options.addModeClass && [null];
        for ("" == t && nt(Je(n, r.state), o); !f.eol();) {
            if (f.pos > e.options.maxHighlightLength ? (l = !1, a && Qe(e, t, r, f.pos), f.pos = t.length, s = null) : s = nt(et(n, f, r.state, d), o), d) {
                var h = d[0].name;
                h && (s = "m-" + (s ? h + " " + s : h))
            }
            if (!l || u != s) {
                for (; c < f.start;) i(c = Math.min(f.start, c + 5e3), u);
                u = s
            }
            f.start = f.pos
        }
        for (; c < f.pos;) {
            var p = Math.min(f.pos, c + 5e3);
            i(p, u), c = p
        }
    }
    function it(e, t, n) {
        for (var r, i, o = e.doc, a = n ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), l = t; l > a; --l) {
            if (l <= o.first) return o.first;
            var s = M(o, l - 1),
                c = s.stateAfter;
            if (c && (!n || l + (c instanceof gl ? c.lookAhead : 0) <= o.modeFrontier)) return l;
            var u = f(s.text, null, e.options.tabSize);
            (null == i || r > u) && (i = l - 1, r = u)
        }
        return i
    }
    function ot(e, t) {
        if (e.modeFrontier = Math.min(e.modeFrontier, t), !(e.highlightFrontier < t - 10)) {
            for (var n = e.first, r = t - 1; r > n; r--) {
                var i = M(e, r).stateAfter;
                if (i && (!(i instanceof gl) || r + i.lookAhead < t)) {
                    n = r + 1;
                    break
                }
            }
            e.highlightFrontier = Math.min(e.highlightFrontier, n)
        }
    }
    function at(e, t, n, r) {
        e.text = t, e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null), null != e.order && (e.order = null), ne(e), re(e, n);
        var i = r ? r(e) : 1;
        i != e.height && O(e, i)
    }
    function lt(e) {
        e.parent = null, ne(e)
    }
    function st(e, t) {
        if (!e || /^\s*$/.test(e)) return null;
        var n = t.addModeClass ? wl : kl;
        return n[e] || (n[e] = e.replace(/\S+/g, "cm-$&"))
    }
    function ct(e, t) {
        var n = i("span", null, null, Sa ? "padding-right: .1px" : null),
            r = {
                pre: i("pre", [n], "CodeMirror-line"),
                content: n,
                col: 0,
                pos: 0,
                cm: e,
                trailingSpace: !1,
                splitSpaces: (wa || Sa) && e.getOption("lineWrapping")
            };
        t.measure = {};
        for (var o = 0; o <= (t.rest ? t.rest.length : 0); o++) {
            var a = o ? t.rest[o - 1] : t.line,
                l = void 0;
            r.pos = 0, r.addToken = ft, We(e.display.measure) && (l = Se(a, e.doc.direction)) && (r.addToken = ht(r.addToken, l)), r.map = [], mt(a, r, Ye(e, a, t != e.display.externalMeasured && N(a))), a.styleClasses && (a.styleClasses.bgClass && (r.bgClass = s(a.styleClasses.bgClass, r.bgClass || "")), a.styleClasses.textClass && (r.textClass = s(a.styleClasses.textClass, r.textClass || ""))), 0 == r.map.length && r.map.push(0, 0, r.content.appendChild(_e(e.display.measure))), 0 == o ? (t.measure.map = r.map, t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(r.map), (t.measure.caches || (t.measure.caches = [])).push({}))
        }
        if (Sa) {
            var c = r.content.lastChild;
            (/\bcm-tab\b/.test(c.className) || c.querySelector && c.querySelector(".cm-tab")) && (r.content.className = "cm-tab-wrap-hack")
        }
        return Me(e, "renderLine", e, t.line, r.pre), r.pre.className && (r.textClass = s(r.pre.className, r.textClass || "")), r
    }
    function ut(e) {
        var t = r("span", "\u2022", "cm-invalidchar");
        return t.title = "\\u" + e.charCodeAt(0).toString(16), t.setAttribute("aria-label", t.title), t
    }
    function ft(e, t, n, i, o, a, l) {
        if (t) {
            var s, c = e.splitSpaces ? dt(t, e.trailingSpace) : t,
                u = e.cm.state.specialChars,
                f = !1;
            if (u.test(t)) {
                s = document.createDocumentFragment();
                for (var d = 0;;) {
                    u.lastIndex = d;
                    var h = u.exec(t),
                        m = h ? h.index - d : t.length - d;
                    if (m) {
                        var g = document.createTextNode(c.slice(d, d + m));
                        wa && Ca < 9 ? s.appendChild(r("span", [g])) : s.appendChild(g), e.map.push(e.pos, e.pos + m, g), e.col += m, e.pos += m
                    }
                    if (!h) break;
                    d += m + 1;
                    var v = void 0;
                    if ("\t" == h[0]) {
                        var y = e.cm.options.tabSize,
                            b = y - e.col % y;
                        (v = s.appendChild(r("span", p(b), "cm-tab"))).setAttribute("role", "presentation"), v.setAttribute("cm-text", "\t"), e.col += b
                    } else "\r" == h[0] || "\n" == h[0] ? ((v = s.appendChild(r("span", "\r" == h[0] ? "\u240d" : "\u2424", "cm-invalidchar"))).setAttribute("cm-text", h[0]), e.col += 1) : ((v = e.cm.options.specialCharPlaceholder(h[0])).setAttribute("cm-text", h[0]), wa && Ca < 9 ? s.appendChild(r("span", [v])) : s.appendChild(v), e.col += 1);
                    e.map.push(e.pos, e.pos + 1, v), e.pos++
                }
            } else e.col += t.length, s = document.createTextNode(c), e.map.push(e.pos, e.pos + t.length, s), wa && Ca < 9 && (f = !0), e.pos += t.length;
            if (e.trailingSpace = 32 == c.charCodeAt(t.length - 1), n || i || o || f || l) {
                var x = n || "";
                i && (x += i), o && (x += o);
                var k = r("span", [s], x, l);
                return a && (k.title = a), e.content.appendChild(k)
            }
            e.content.appendChild(s)
        }
    }
    function dt(e, t) {
        if (e.length > 1 && !/  /.test(e)) return e;
        for (var n = t, r = "", i = 0; i < e.length; i++) {
            var o = e.charAt(i);
            " " != o || !n || i != e.length - 1 && 32 != e.charCodeAt(i + 1) || (o = "\xa0"), r += o, n = " " == o
        }
        return r
    }
    function ht(e, t) {
        return function(n, r, i, o, a, l, s) {
            i = i ? i + " cm-force-border" : "cm-force-border";
            for (var c = n.pos, u = c + r.length;;) {
                for (var f = void 0, d = 0; d < t.length && !((f = t[d]).to > c && f.from <= c); d++);
                if (f.to >= u) return e(n, r, i, o, a, l, s);
                e(n, r.slice(0, f.to - c), i, o, null, l, s), o = null, r = r.slice(f.to - c), c = f.to
            }
        }
    }
    function pt(e, t, n, r) {
        var i = !r && n.widgetNode;
        i && e.map.push(e.pos, e.pos + t, i), !r && e.cm.display.input.needsContentAttribute && (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", n.id)), i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)), e.pos += t, e.trailingSpace = !1
    }
    function mt(e, t, n) {
        var r = e.markedSpans,
            i = e.text,
            o = 0;
        if (r)
            for (var a, l, s, c, u, f, d, h = i.length, p = 0, m = 1, g = "", v = 0;;) {
                if (v == p) {
                    s = c = u = f = l = "", d = null, v = Infinity;
                    for (var y = [], b = void 0, x = 0; x < r.length; ++x) {
                        var k = r[x],
                            w = k.marker;
                        "bookmark" == w.type && k.from == p && w.widgetNode ? y.push(w) : k.from <= p && (null == k.to || k.to > p || w.collapsed && k.to == p && k.from == p) ? (null != k.to && k.to != p && v > k.to && (v = k.to, c = ""), w.className && (s += " " + w.className), w.css && (l = (l ? l + ";" : "") + w.css), w.startStyle && k.from == p && (u += " " + w.startStyle), w.endStyle && k.to == v && (b || (b = [])).push(w.endStyle, k.to), w.title && !f && (f = w.title), w.collapsed && (!d || ae(d.marker, w) < 0) && (d = k)) : k.from > p && v > k.from && (v = k.from)
                    }
                    if (b)
                        for (var C = 0; C < b.length; C += 2) b[C + 1] == v && (c += " " + b[C]);
                    if (!d || d.from == p)
                        for (var S = 0; S < y.length; ++S) pt(t, 0, y[S]);
                    if (d && (d.from || 0) == p) {
                        if (pt(t, (null == d.to ? h + 1 : d.to) - p, d.marker, null == d.from), null == d.to) return;
                        d.to == p && (d = !1)
                    }
                }
                if (p >= h) break;
                for (var L = Math.min(h, v);;) {
                    if (g) {
                        var T = p + g.length;
                        if (!d) {
                            var M = T > L ? g.slice(0, L - p) : g;
                            t.addToken(t, M, a ? a + s : s, u, p + M.length == v ? c : "", f, l)
                        }
                        if (T >= L) {
                            g = g.slice(L - p), p = L;
                            break
                        }
                        p = T, u = ""
                    }
                    g = i.slice(o, o = n[m++]), a = st(n[m++], t.cm.options)
                }
            } else
                for (var z = 1; z < n.length; z += 2) t.addToken(t, i.slice(o, o = n[z]), st(n[z + 1], t.cm.options))
    }
    function gt(e, t, n) {
        this.line = t, this.rest = pe(t), this.size = this.rest ? N(m(this.rest)) - n + 1 : 1, this.node = this.text = null, this.hidden = ve(e, t)
    }
    function vt(e, t, n) {
        for (var r, i = [], o = t; o < n; o = r) {
            var a = new gt(e.doc, M(e.doc, o), o);
            r = o + a.size, i.push(a)
        }
        return i
    }
    function yt(e) {
        Cl ? Cl.ops.push(e) : e.ownsGroup = Cl = {
            ops: [e],
            delayedCallbacks: []
        }
    }
    function bt(e) {
        var t = e.delayedCallbacks,
            n = 0;
        do {
            for (; n < t.length; n++) t[n].call(null);
            for (var r = 0; r < e.ops.length; r++) {
                var i = e.ops[r];
                if (i.cursorActivityHandlers)
                    for (; i.cursorActivityCalled < i.cursorActivityHandlers.length;) i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm)
            }
        } while (n < t.length)
    }
    function xt(e, t) {
        var n = e.ownsGroup;
        if (n) try {
            bt(n)
        } finally {
            Cl = null, t(n)
        }
    }
    function kt(e, t) {
        var n = Le(e, t);
        if (n.length) {
            var r, i = Array.prototype.slice.call(arguments, 2);
            Cl ? r = Cl.delayedCallbacks : Sl ? r = Sl : (r = Sl = [], setTimeout(wt, 0));
            for (var o = function(e) {
                    r.push(function() {
                        return n[e].apply(null, i)
                    })
                }, a = 0; a < n.length; ++a) o(a)
        }
    }
    function wt() {
        var e = Sl;
        Sl = null;
        for (var t = 0; t < e.length; ++t) e[t]()
    }
    function Ct(e, t, n, r) {
        for (var i = 0; i < t.changes.length; i++) {
            var o = t.changes[i];
            "text" == o ? Mt(e, t) : "gutter" == o ? At(e, t, n, r) : "class" == o ? zt(e, t) : "widget" == o && Ot(e, t, r)
        }
        t.changes = null
    }
    function St(e) {
        return e.node == e.text && (e.node = r("div", null, null, "position: relative"), e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text), e.node.appendChild(e.text), wa && Ca < 8 && (e.node.style.zIndex = 2)), e.node
    }
    function Lt(e, t) {
        var n = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass;
        if (n && (n += " CodeMirror-linebackground"), t.background) n ? t.background.className = n : (t.background.parentNode.removeChild(t.background), t.background = null);
        else if (n) {
            var i = St(t);
            t.background = i.insertBefore(r("div", null, n), i.firstChild), e.display.input.setUneditable(t.background)
        }
    }
    function Tt(e, t) {
        var n = e.display.externalMeasured;
        return n && n.line == t.line ? (e.display.externalMeasured = null, t.measure = n.measure, n.built) : ct(e, t)
    }
    function Mt(e, t) {
        var n = t.text.className,
            r = Tt(e, t);
        t.text == t.node && (t.node = r.pre), t.text.parentNode.replaceChild(r.pre, t.text), t.text = r.pre, r.bgClass != t.bgClass || r.textClass != t.textClass ? (t.bgClass = r.bgClass, t.textClass = r.textClass, zt(e, t)) : n && (t.text.className = n)
    }
    function zt(e, t) {
        Lt(e, t), t.line.wrapClass ? St(t).className = t.line.wrapClass : t.node != t.text && (t.node.className = "");
        var n = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass;
        t.text.className = n || ""
    }
    function At(e, t, n, i) {
        if (t.gutter && (t.node.removeChild(t.gutter), t.gutter = null), t.gutterBackground && (t.node.removeChild(t.gutterBackground), t.gutterBackground = null), t.line.gutterClass) {
            var o = St(t);
            t.gutterBackground = r("div", null, "CodeMirror-gutter-background " + t.line.gutterClass, "left: " + (e.options.fixedGutter ? i.fixedPos : -i.gutterTotalWidth) + "px; width: " + i.gutterTotalWidth + "px"), e.display.input.setUneditable(t.gutterBackground), o.insertBefore(t.gutterBackground, t.text)
        }
        var a = t.line.gutterMarkers;
        if (e.options.lineNumbers || a) {
            var l = St(t),
                s = t.gutter = r("div", null, "CodeMirror-gutter-wrapper", "left: " + (e.options.fixedGutter ? i.fixedPos : -i.gutterTotalWidth) + "px");
            if (e.display.input.setUneditable(s), l.insertBefore(s, t.text), t.line.gutterClass && (s.className += " " + t.line.gutterClass), !e.options.lineNumbers || a && a["CodeMirror-linenumbers"] || (t.lineNumber = s.appendChild(r("div", F(e.options, n), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + i.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + e.display.lineNumInnerWidth + "px"))), a)
                for (var c = 0; c < e.options.gutters.length; ++c) {
                    var u = e.options.gutters[c],
                        f = a.hasOwnProperty(u) && a[u];
                    f && s.appendChild(r("div", [f], "CodeMirror-gutter-elt", "left: " + i.gutterLeft[u] + "px; width: " + i.gutterWidth[u] + "px"))
                }
        }
    }
    function Ot(e, t, n) {
        t.alignable && (t.alignable = null);
        for (var r = t.node.firstChild, i = void 0; r; r = i) i = r.nextSibling, "CodeMirror-linewidget" == r.className && t.node.removeChild(r);
        Pt(e, t, n)
    }
    function Nt(e, t, n, r) {
        var i = Tt(e, t);
        return t.text = t.node = i.pre, i.bgClass && (t.bgClass = i.bgClass), i.textClass && (t.textClass = i.textClass), zt(e, t), At(e, t, n, r), Pt(e, t, r), t.node
    }
    function Pt(e, t, n) {
        if (Et(e, t.line, t, n, !0), t.rest)
            for (var r = 0; r < t.rest.length; r++) Et(e, t.rest[r], t, n, !1)
    }
    function Et(e, t, n, i, o) {
        if (t.widgets)
            for (var a = St(n), l = 0, s = t.widgets; l < s.length; ++l) {
                var c = s[l],
                    u = r("div", [c.node], "CodeMirror-linewidget");
                c.handleMouseEvents || u.setAttribute("cm-ignore-events", "true"), Ft(c, u, n, i), e.display.input.setUneditable(u), o && c.above ? a.insertBefore(u, n.gutter || n.text) : a.appendChild(u), kt(c, "redraw")
            }
    }
    function Ft(e, t, n, r) {
        if (e.noHScroll) {
            (n.alignable || (n.alignable = [])).push(t);
            var i = r.wrapperWidth;
            t.style.left = r.fixedPos + "px", e.coverGutter || (i -= r.gutterTotalWidth, t.style.paddingLeft = r.gutterTotalWidth + "px"), t.style.width = i + "px"
        }
        e.coverGutter && (t.style.zIndex = 5, t.style.position = "relative", e.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"))
    }
    function jt(e) {
        if (null != e.height) return e.height;
        var t = e.doc.cm;
        if (!t) return 0;
        if (!o(document.body, e.node)) {
            var i = "position: relative;";
            e.coverGutter && (i += "margin-left: -" + t.display.gutters.offsetWidth + "px;"), e.noHScroll && (i += "width: " + t.display.wrapper.clientWidth + "px;"), n(t.display.measure, r("div", [e.node], null, i))
        }
        return e.height = e.node.parentNode.offsetHeight
    }
    function It(e, t) {
        for (var n = Ie(t); n != e.wrapper; n = n.parentNode)
            if (!n || 1 == n.nodeType && "true" == n.getAttribute("cm-ignore-events") || n.parentNode == e.sizer && n != e.mover) return !0
    }
    function Dt(e) {
        return e.lineSpace.offsetTop
    }
    function _t(e) {
        return e.mover.offsetHeight - e.lineSpace.offsetHeight
    }
    function Wt(e) {
        if (e.cachedPaddingH) return e.cachedPaddingH;
        var t = n(e.measure, r("pre", "x")),
            i = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle,
            o = {
                left: parseInt(i.paddingLeft),
                right: parseInt(i.paddingRight)
            };
        return isNaN(o.left) || isNaN(o.right) || (e.cachedPaddingH = o), o
    }
    function Rt(e) {
        return Va - e.display.nativeBarWidth
    }
    function Ht(e) {
        return e.display.scroller.clientWidth - Rt(e) - e.display.barWidth
    }
    function Bt(e) {
        return e.display.scroller.clientHeight - Rt(e) - e.display.barHeight
    }
    function qt(e, t, n) {
        var r = e.options.lineWrapping,
            i = r && Ht(e);
        if (!t.measure.heights || r && t.measure.width != i) {
            var o = t.measure.heights = [];
            if (r) {
                t.measure.width = i;
                for (var a = t.text.firstChild.getClientRects(), l = 0; l < a.length - 1; l++) {
                    var s = a[l],
                        c = a[l + 1];
                    Math.abs(s.bottom - c.bottom) > 2 && o.push((s.bottom + c.top) / 2 - n.top)
                }
            }
            o.push(n.bottom - n.top)
        }
    }
    function Ut(e, t, n) {
        if (e.line == t) return {
            map: e.measure.map,
            cache: e.measure.cache
        };
        for (var r = 0; r < e.rest.length; r++)
            if (e.rest[r] == t) return {
                map: e.measure.maps[r],
                cache: e.measure.caches[r]
            };
        for (var i = 0; i < e.rest.length; i++)
            if (N(e.rest[i]) > n) return {
                map: e.measure.maps[i],
                cache: e.measure.caches[i],
                before: !0
            }
    }
    function $t(e, t) {
        var r = N(t = de(t)),
            i = e.display.externalMeasured = new gt(e.doc, t, r);
        i.lineN = r;
        var o = i.built = ct(e, i);
        return i.text = o.pre, n(e.display.lineMeasure, o.pre), i
    }
    function Kt(e, t, n, r) {
        return Xt(e, Gt(e, t), n, r)
    }
    function Vt(e, t) {
        if (t >= e.display.viewFrom && t < e.display.viewTo) return e.display.view[Mn(e, t)];
        var n = e.display.externalMeasured;
        return n && t >= n.lineN && t < n.lineN + n.size ? n : void 0
    }
    function Gt(e, t) {
        var n = N(t),
            r = Vt(e, n);
        r && !r.text ? r = null : r && r.changes && (Ct(e, r, n, wn(e)), e.curOp.forceUpdate = !0), r || (r = $t(e, t));
        var i = Ut(r, t, n);
        return {
            line: t,
            view: r,
            rect: null,
            map: i.map,
            cache: i.cache,
            before: i.before,
            hasHeights: !1
        }
    }
    function Xt(e, t, n, r, i) {
        t.before && (n = -1);
        var o, a = n + (r || "");
        return t.cache.hasOwnProperty(a) ? o = t.cache[a] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()), t.hasHeights || (qt(e, t.view, t.rect), t.hasHeights = !0), (o = Qt(e, t, n, r)).bogus || (t.cache[a] = o)), {
            left: o.left,
            right: o.right,
            top: i ? o.rtop : o.top,
            bottom: i ? o.rbottom : o.bottom
        }
    }
    function Yt(e, t, n) {
        for (var r, i, o, a, l, s, c = 0; c < e.length; c += 3)
            if (l = e[c], s = e[c + 1], t < l ? (i = 0, o = 1, a = "left") : t < s ? o = (i = t - l) + 1 : (c == e.length - 3 || t == s && e[c + 3] > t) && (i = (o = s - l) - 1, t >= s && (a = "right")), null != i) {
                if (r = e[c + 2], l == s && n == (r.insertLeft ? "left" : "right") && (a = n), "left" == n && 0 == i)
                    for (; c && e[c - 2] == e[c - 3] && e[c - 1].insertLeft;) r = e[2 + (c -= 3)], a = "left";
                if ("right" == n && i == s - l)
                    for (; c < e.length - 3 && e[c + 3] == e[c + 4] && !e[c + 5].insertLeft;) r = e[(c += 3) + 2], a = "right";
                break
            }
        return {
            node: r,
            start: i,
            end: o,
            collapse: a,
            coverStart: l,
            coverEnd: s
        }
    }
    function Zt(e, t) {
        var n = Ll;
        if ("left" == t)
            for (var r = 0; r < e.length && (n = e[r]).left == n.right; r++);
        else
            for (var i = e.length - 1; i >= 0 && (n = e[i]).left == n.right; i--);
        return n
    }
    function Qt(e, t, n, r) {
        var i, o = Yt(t.map, n, r),
            a = o.node,
            l = o.start,
            s = o.end,
            c = o.collapse;
        if (3 == a.nodeType) {
            for (var u = 0; u < 4; u++) {
                for (; l && C(t.line.text.charAt(o.coverStart + l));) --l;
                for (; o.coverStart + s < o.coverEnd && C(t.line.text.charAt(o.coverStart + s));) ++s;
                if ((i = wa && Ca < 9 && 0 == l && s == o.coverEnd - o.coverStart ? a.parentNode.getBoundingClientRect() : Zt(_a(a, l, s).getClientRects(), r)).left || i.right || 0 == l) break;
                s = l, l -= 1, c = "right"
            }
            wa && Ca < 11 && (i = Jt(e.display.measure, i))
        } else {
            var f;
            l > 0 && (c = r = "right"), i = e.options.lineWrapping && (f = a.getClientRects()).length > 1 ? f["right" == r ? f.length - 1 : 0] : a.getBoundingClientRect()
        }
        if (wa && Ca < 9 && !l && (!i || !i.left && !i.right)) {
            var d = a.parentNode.getClientRects()[0];
            i = d ? {
                left: d.left,
                right: d.left + kn(e.display),
                top: d.top,
                bottom: d.bottom
            } : Ll
        }
        for (var h = i.top - t.rect.top, p = i.bottom - t.rect.top, m = (h + p) / 2, g = t.view.measure.heights, v = 0; v < g.length - 1 && !(m < g[v]); v++);
        var y = v ? g[v - 1] : 0,
            b = g[v],
            x = {
                left: ("right" == c ? i.right : i.left) - t.rect.left,
                right: ("left" == c ? i.left : i.right) - t.rect.left,
                top: y,
                bottom: b
            };
        return i.left || i.right || (x.bogus = !0), e.options.singleCursorHeightPerLine || (x.rtop = h, x.rbottom = p), x
    }
    function Jt(e, t) {
        if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !Re(e)) return t;
        var n = screen.logicalXDPI / screen.deviceXDPI,
            r = screen.logicalYDPI / screen.deviceYDPI;
        return {
            left: t.left * n,
            right: t.right * n,
            top: t.top * r,
            bottom: t.bottom * r
        }
    }
    function en(e) {
        if (e.measure && (e.measure.cache = {}, e.measure.heights = null, e.rest))
            for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {}
    }
    function tn(e) {
        e.display.externalMeasure = null, t(e.display.lineMeasure);
        for (var n = 0; n < e.display.view.length; n++) en(e.display.view[n])
    }
    function nn(e) {
        tn(e), e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null, e.options.lineWrapping || (e.display.maxLineChanged = !0), e.display.lineNumChars = null
    }
    function rn() {
        return Ta && Pa ? -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft)) : window.pageXOffset || (document.documentElement || document.body).scrollLeft
    }
    function on() {
        return Ta && Pa ? -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop)) : window.pageYOffset || (document.documentElement || document.body).scrollTop
    }
    function an(e) {
        var t = 0;
        if (e.widgets)
            for (var n = 0; n < e.widgets.length; ++n) e.widgets[n].above && (t += jt(e.widgets[n]));
        return t
    }
    function ln(e, t, n, r, i) {
        if (!i) {
            var o = an(t);
            n.top += o, n.bottom += o
        }
        if ("line" == r) return n;
        r || (r = "local");
        var a = be(t);
        if ("local" == r ? a += Dt(e.display) : a -= e.display.viewOffset, "page" == r || "window" == r) {
            var l = e.display.lineSpace.getBoundingClientRect();
            a += l.top + ("window" == r ? 0 : on());
            var s = l.left + ("window" == r ? 0 : rn());
            n.left += s, n.right += s
        }
        return n.top += a, n.bottom += a, n
    }
    function sn(e, t, n) {
        if ("div" == n) return t;
        var r = t.left,
            i = t.top;
        if ("page" == n) r -= rn(), i -= on();
        else if ("local" == n || !n) {
            var o = e.display.sizer.getBoundingClientRect();
            r += o.left, i += o.top
        }
        var a = e.display.lineSpace.getBoundingClientRect();
        return {
            left: r - a.left,
            top: i - a.top
        }
    }
    function cn(e, t, n, r, i) {
        return r || (r = M(e.doc, t.line)), ln(e, r, Kt(e, r, t.ch, i), n)
    }
    function un(e, t, n, r, i, o) {
        function a(t, a) {
            var l = Xt(e, i, t, a ? "right" : "left", o);
            return a ? l.left = l.right : l.right = l.left, ln(e, r, l, n)
        }
        function l(e, t, n) {
            return a(n ? e - 1 : e, 1 == s[t].level != n)
        }
        r = r || M(e.doc, t.line), i || (i = Gt(e, r));
        var s = Se(r, e.doc.direction),
            c = t.ch,
            u = t.sticky;
        if (c >= r.text.length ? (c = r.text.length, u = "before") : c <= 0 && (c = 0, u = "after"), !s) return a("before" == u ? c - 1 : c, "before" == u);
        var f = Ce(s, c, u),
            d = rl,
            h = l(c, f, "before" == u);
        return null != d && (h.other = l(c, d, "before" != u)), h
    }
    function fn(e, t) {
        var n = 0;
        t = B(e.doc, t), e.options.lineWrapping || (n = kn(e.display) * t.ch);
        var r = M(e.doc, t.line),
            i = be(r) + Dt(e.display);
        return {
            left: n,
            right: n,
            top: i,
            bottom: i + r.height
        }
    }
    function dn(e, t, n, r, i) {
        var o = j(e, t, n);
        return o.xRel = i, r && (o.outside = !0), o
    }
    function hn(e, t, n) {
        var r = e.doc;
        if ((n += e.display.viewOffset) < 0) return dn(r.first, 0, null, !0, -1);
        var i = P(r, n),
            o = r.first + r.size - 1;
        if (i > o) return dn(r.first + r.size - 1, M(r, o).text.length, null, !0, 1);
        t < 0 && (t = 0);
        for (var a = M(r, i);;) {
            var l = vn(e, a, i, t, n),
                s = ue(a, l.ch + (l.xRel > 0 ? 1 : 0));
            if (!s) return l;
            var c = s.find(1);
            if (c.line == i) return c;
            a = M(r, i = c.line)
        }
    }
    function pn(e, t, n, r) {
        r -= an(t);
        var i = t.text.length,
            o = L(function(t) {
                return Xt(e, n, t - 1).bottom <= r
            }, i, 0);
        return {
            begin: o,
            end: i = L(function(t) {
                return Xt(e, n, t).top > r
            }, o, i)
        }
    }
    function mn(e, t, n, r) {
        return n || (n = Gt(e, t)), pn(e, t, n, ln(e, t, Xt(e, n, r), "line").top)
    }
    function gn(e, t, n, r) {
        return !(e.bottom <= n) && (e.top > n || (r ? e.left : e.right) > t)
    }
    function vn(e, t, n, r, i) {
        i -= be(t);
        var o = Gt(e, t),
            a = an(t),
            l = 0,
            s = t.text.length,
            c = !0,
            u = Se(t, e.doc.direction);
        if (u) {
            var f = (e.options.lineWrapping ? bn : yn)(e, t, n, o, u, r, i);
            l = (c = 1 != f.level) ? f.from : f.to - 1, s = c ? f.to : f.from - 1
        }
        var d, h, p = null,
            m = null,
            g = L(function(t) {
                var n = Xt(e, o, t);
                return n.top += a, n.bottom += a, !!gn(n, r, i, !1) && (n.top <= i && n.left <= r && (p = t, m = n), !0)
            }, l, s),
            v = !1;
        if (m) {
            var y = r - m.left < m.right - r,
                b = y == c;
            g = p + (b ? 0 : 1), h = b ? "after" : "before", d = y ? m.left : m.right
        } else {
            c || g != s && g != l || g++, h = 0 == g ? "after" : g == t.text.length ? "before" : Xt(e, o, g - (c ? 1 : 0)).bottom + a <= i == c ? "after" : "before";
            var x = un(e, j(n, g, h), "line", t, o);
            d = x.left, v = i < x.top || i >= x.bottom
        }
        return dn(n, g = S(t.text, g, 1), h, v, r - d)
    }
    function yn(e, t, n, r, i, o, a) {
        var l = L(function(l) {
                var s = i[l],
                    c = 1 != s.level;
                return gn(un(e, j(n, c ? s.to : s.from, c ? "before" : "after"), "line", t, r), o, a, !0)
            }, 0, i.length - 1),
            s = i[l];
        if (l > 0) {
            var c = 1 != s.level,
                u = un(e, j(n, c ? s.from : s.to, c ? "after" : "before"), "line", t, r);
            gn(u, o, a, !0) && u.top > a && (s = i[l - 1])
        }
        return s
    }
    function bn(e, t, n, r, i, o, a) {
        var l = pn(e, t, r, a),
            s = l.begin,
            c = l.end;
        /\s/.test(t.text.charAt(c - 1)) && c--;
        for (var u = null, f = null, d = 0; d < i.length; d++) {
            var h = i[d];
            if (!(h.from >= c || h.to <= s)) {
                var p = Xt(e, r, 1 != h.level ? Math.min(c, h.to) - 1 : Math.max(s, h.from)).right,
                    m = p < o ? o - p + 1e9 : p - o;
                (!u || f > m) && (u = h, f = m)
            }
        }
        return u || (u = i[i.length - 1]), u.from < s && (u = {
            from: s,
            to: u.to,
            level: u.level
        }), u.to > c && (u = {
            from: u.from,
            to: c,
            level: u.level
        }), u
    }
    function xn(e) {
        if (null != e.cachedTextHeight) return e.cachedTextHeight;
        if (null == xl) {
            xl = r("pre");
            for (var i = 0; i < 49; ++i) xl.appendChild(document.createTextNode("x")), xl.appendChild(r("br"));
            xl.appendChild(document.createTextNode("x"))
        }
        n(e.measure, xl);
        var o = xl.offsetHeight / 50;
        return o > 3 && (e.cachedTextHeight = o), t(e.measure), o || 1
    }
    function kn(e) {
        if (null != e.cachedCharWidth) return e.cachedCharWidth;
        var t = r("span", "xxxxxxxxxx"),
            i = r("pre", [t]);
        n(e.measure, i);
        var o = t.getBoundingClientRect(),
            a = (o.right - o.left) / 10;
        return a > 2 && (e.cachedCharWidth = a), a || 10
    }
    function wn(e) {
        for (var t = e.display, n = {}, r = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, a = 0; o; o = o.nextSibling, ++a) n[e.options.gutters[a]] = o.offsetLeft + o.clientLeft + i, r[e.options.gutters[a]] = o.clientWidth;
        return {
            fixedPos: Cn(t),
            gutterTotalWidth: t.gutters.offsetWidth,
            gutterLeft: n,
            gutterWidth: r,
            wrapperWidth: t.wrapper.clientWidth
        }
    }
    function Cn(e) {
        return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left
    }
    function Sn(e) {
        var t = xn(e.display),
            n = e.options.lineWrapping,
            r = n && Math.max(5, e.display.scroller.clientWidth / kn(e.display) - 3);
        return function(i) {
            if (ve(e.doc, i)) return 0;
            var o = 0;
            if (i.widgets)
                for (var a = 0; a < i.widgets.length; a++) i.widgets[a].height && (o += i.widgets[a].height);
            return n ? o + (Math.ceil(i.text.length / r) || 1) * t : o + t
        }
    }
    function Ln(e) {
        var t = e.doc,
            n = Sn(e);
        t.iter(function(e) {
            var t = n(e);
            t != e.height && O(e, t)
        })
    }
    function Tn(e, t, n, r) {
        var i = e.display;
        if (!n && "true" == Ie(t).getAttribute("cm-not-content")) return null;
        var o, a, l = i.lineSpace.getBoundingClientRect();
        try {
            o = t.clientX - l.left, a = t.clientY - l.top
        } catch (t) {
            return null
        }
        var s, c = hn(e, o, a);
        if (r && 1 == c.xRel && (s = M(e.doc, c.line).text).length == c.ch) {
            var u = f(s, s.length, e.options.tabSize) - s.length;
            c = j(c.line, Math.max(0, Math.round((o - Wt(e.display).left) / kn(e.display)) - u))
        }
        return c
    }
    function Mn(e, t) {
        if (t >= e.display.viewTo) return null;
        if ((t -= e.display.viewFrom) < 0) return null;
        for (var n = e.display.view, r = 0; r < n.length; r++)
            if ((t -= n[r].size) < 0) return r
    }
    function zn(e) {
        e.display.input.showSelection(e.display.input.prepareSelection())
    }
    function An(e, t) {
        void 0 === t && (t = !0);
        for (var n = e.doc, r = {}, i = r.cursors = document.createDocumentFragment(), o = r.selection = document.createDocumentFragment(), a = 0; a < n.sel.ranges.length; a++)
            if (t || a != n.sel.primIndex) {
                var l = n.sel.ranges[a];
                if (!(l.from().line >= e.display.viewTo || l.to().line < e.display.viewFrom)) {
                    var s = l.empty();
                    (s || e.options.showCursorWhenSelecting) && On(e, l.head, i), s || Pn(e, l, o)
                }
            }
        return r
    }
    function On(e, t, n) {
        var i = un(e, t, "div", null, null, !e.options.singleCursorHeightPerLine),
            o = n.appendChild(r("div", "\xa0", "CodeMirror-cursor"));
        if (o.style.left = i.left + "px", o.style.top = i.top + "px", o.style.height = Math.max(0, i.bottom - i.top) * e.options.cursorHeight + "px", i.other) {
            var a = n.appendChild(r("div", "\xa0", "CodeMirror-cursor CodeMirror-secondarycursor"));
            a.style.display = "", a.style.left = i.other.left + "px", a.style.top = i.other.top + "px", a.style.height = .85 * (i.other.bottom - i.other.top) + "px"
        }
    }
    function Nn(e, t) {
        return e.top - t.top || e.left - t.left
    }
    function Pn(e, t, n) {
        function i(e, t, n, i) {
            t < 0 && (t = 0), t = Math.round(t), i = Math.round(i), s.appendChild(r("div", null, "CodeMirror-selected", "position: absolute; left: " + e + "px;\n                             top: " + t + "px; width: " + (null == n ? f - e : n) + "px;\n                             height: " + (i - t) + "px"))
        }
        function o(t, n, r) {
            function o(n, r) {
                return cn(e, j(t, n), "div", h, r)
            }
            function a(t, n, r) {
                var i = mn(e, h, null, t),
                    a = "ltr" == n == ("after" == r) ? "left" : "right";
                return o("after" == r ? i.begin : i.end - (/\s/.test(h.text.charAt(i.end - 1)) ? 2 : 1), a)[a]
            }
            var s, c, h = M(l, t),
                p = h.text.length,
                m = Se(h, l.direction);
            return we(m, n || 0, null == r ? p : r, function(e, t, l, h) {
                var g = "ltr" == l,
                    v = o(e, g ? "left" : "right"),
                    y = o(t - 1, g ? "right" : "left"),
                    b = null == n && 0 == e,
                    x = null == r && t == p,
                    k = 0 == h,
                    w = !m || h == m.length - 1;
                if (y.top - v.top <= 3) {
                    var C = (d ? x : b) && w,
                        S = (d ? b : x) && k ? u : (g ? v : y).left,
                        L = C ? f : (g ? y : v).right;
                    i(S, v.top, L - S, v.bottom)
                } else {
                    var T, M, z, A;
                    g ? (T = d && b && k ? u : v.left, M = d ? f : a(e, l, "before"), z = d ? u : a(t, l, "after"), A = d && x && w ? f : y.right) : (T = d ? a(e, l, "before") : u, M = !d && b && k ? f : v.right, z = !d && x && w ? u : y.left, A = d ? a(t, l, "after") : f), i(T, v.top, M - T, v.bottom), v.bottom < y.top && i(u, v.bottom, null, y.top), i(z, y.top, A - z, y.bottom)
                }(!s || Nn(v, s) < 0) && (s = v), Nn(y, s) < 0 && (s = y), (!c || Nn(v, c) < 0) && (c = v), Nn(y, c) < 0 && (c = y)
            }), {
                start: s,
                end: c
            }
        }
        var a = e.display,
            l = e.doc,
            s = document.createDocumentFragment(),
            c = Wt(e.display),
            u = c.left,
            f = Math.max(a.sizerWidth, Ht(e) - a.sizer.offsetLeft) - c.right,
            d = "ltr" == l.direction,
            h = t.from(),
            p = t.to();
        if (h.line == p.line) o(h.line, h.ch, p.ch);
        else {
            var m = M(l, h.line),
                g = M(l, p.line),
                v = de(m) == de(g),
                y = o(h.line, h.ch, v ? m.text.length + 1 : null).end,
                b = o(p.line, v ? 0 : null, p.ch).start;
            v && (y.top < b.top - 2 ? (i(y.right, y.top, null, y.bottom), i(u, b.top, b.left, b.bottom)) : i(y.right, y.top, b.left - y.right, y.bottom)), y.bottom < b.top && i(u, y.bottom, null, b.top)
        }
        n.appendChild(s)
    }
    function En(e) {
        if (e.state.focused) {
            var t = e.display;
            clearInterval(t.blinker);
            var n = !0;
            t.cursorDiv.style.visibility = "", e.options.cursorBlinkRate > 0 ? t.blinker = setInterval(function() {
                return t.cursorDiv.style.visibility = (n = !n) ? "" : "hidden"
            }, e.options.cursorBlinkRate) : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden")
        }
    }
    function Fn(e) {
        e.state.focused || (e.display.input.focus(), In(e))
    }
    function jn(e) {
        e.state.delayingBlurEvent = !0, setTimeout(function() {
            e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1, Dn(e))
        }, 100)
    }
    function In(e, t) {
        e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1), "nocursor" != e.options.readOnly && (e.state.focused || (Me(e, "focus", e, t), e.state.focused = !0, l(e.display.wrapper, "CodeMirror-focused"), e.curOp || e.display.selForContextMenu == e.doc.sel || (e.display.input.reset(), Sa && setTimeout(function() {
            return e.display.input.reset(!0)
        }, 20)), e.display.input.receivedFocus()), En(e))
    }
    function Dn(e, t) {
        e.state.delayingBlurEvent || (e.state.focused && (Me(e, "blur", e, t), e.state.focused = !1, Ha(e.display.wrapper, "CodeMirror-focused")), clearInterval(e.display.blinker), setTimeout(function() {
            e.state.focused || (e.display.shift = !1)
        }, 150))
    }
    function _n(e) {
        for (var t = e.display, n = t.lineDiv.offsetTop, r = 0; r < t.view.length; r++) {
            var i = t.view[r],
                o = void 0;
            if (!i.hidden) {
                if (wa && Ca < 8) {
                    var a = i.node.offsetTop + i.node.offsetHeight;
                    o = a - n, n = a
                } else {
                    var l = i.node.getBoundingClientRect();
                    o = l.bottom - l.top
                }
                var s = i.line.height - o;
                if (o < 2 && (o = xn(t)), (s > .005 || s < -.005) && (O(i.line, o), Wn(i.line), i.rest))
                    for (var c = 0; c < i.rest.length; c++) Wn(i.rest[c])
            }
        }
    }
    function Wn(e) {
        if (e.widgets)
            for (var t = 0; t < e.widgets.length; ++t) {
                var n = e.widgets[t],
                    r = n.node.parentNode;
                r && (n.height = r.offsetHeight)
            }
    }
    function Rn(e, t, n) {
        var r = n && null != n.top ? Math.max(0, n.top) : e.scroller.scrollTop;
        r = Math.floor(r - Dt(e));
        var i = n && null != n.bottom ? n.bottom : r + e.wrapper.clientHeight,
            o = P(t, r),
            a = P(t, i);
        if (n && n.ensure) {
            var l = n.ensure.from.line,
                s = n.ensure.to.line;
            l < o ? (o = l, a = P(t, be(M(t, l)) + e.wrapper.clientHeight)) : Math.min(s, t.lastLine()) >= a && (o = P(t, be(M(t, s)) - e.wrapper.clientHeight), a = s)
        }
        return {
            from: o,
            to: Math.max(a, o + 1)
        }
    }
    function Hn(e) {
        var t = e.display,
            n = t.view;
        if (t.alignWidgets || t.gutters.firstChild && e.options.fixedGutter) {
            for (var r = Cn(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = r + "px", a = 0; a < n.length; a++)
                if (!n[a].hidden) {
                    e.options.fixedGutter && (n[a].gutter && (n[a].gutter.style.left = o), n[a].gutterBackground && (n[a].gutterBackground.style.left = o));
                    var l = n[a].alignable;
                    if (l)
                        for (var s = 0; s < l.length; s++) l[s].style.left = o
                }
            e.options.fixedGutter && (t.gutters.style.left = r + i + "px")
        }
    }
    function Bn(e) {
        if (!e.options.lineNumbers) return !1;
        var t = e.doc,
            n = F(e.options, t.first + t.size - 1),
            i = e.display;
        if (n.length != i.lineNumChars) {
            var o = i.measure.appendChild(r("div", [r("div", n)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
                a = o.firstChild.offsetWidth,
                l = o.offsetWidth - a;
            return i.lineGutter.style.width = "", i.lineNumInnerWidth = Math.max(a, i.lineGutter.offsetWidth - l) + 1, i.lineNumWidth = i.lineNumInnerWidth + l, i.lineNumChars = i.lineNumInnerWidth ? n.length : -1, i.lineGutter.style.width = i.lineNumWidth + "px", Er(e), !0
        }
        return !1
    }
    function qn(e, t) {
        if (!ze(e, "scrollCursorIntoView")) {
            var n = e.display,
                i = n.sizer.getBoundingClientRect(),
                o = null;
            if (t.top + i.top < 0 ? o = !0 : t.bottom + i.top > (window.innerHeight || document.documentElement.clientHeight) && (o = !1), null != o && !Oa) {
                var a = r("div", "\u200b", null, "position: absolute;\n                         top: " + (t.top - n.viewOffset - Dt(e.display)) + "px;\n                         height: " + (t.bottom - t.top + Rt(e) + n.barHeight) + "px;\n                         left: " + t.left + "px; width: " + Math.max(2, t.right - t.left) + "px;");
                e.display.lineSpace.appendChild(a), a.scrollIntoView(o), e.display.lineSpace.removeChild(a)
            }
        }
    }
    function Un(e, t, n, r) {
        var i;
        null == r && (r = 0), e.options.lineWrapping || t != n || (n = "before" == (t = t.ch ? j(t.line, "before" == t.sticky ? t.ch - 1 : t.ch, "after") : t).sticky ? j(t.line, t.ch + 1, "before") : t);
        for (var o = 0; o < 5; o++) {
            var a = !1,
                l = un(e, t),
                s = n && n != t ? un(e, n) : l,
                c = Kn(e, i = {
                    left: Math.min(l.left, s.left),
                    top: Math.min(l.top, s.top) - r,
                    right: Math.max(l.left, s.left),
                    bottom: Math.max(l.bottom, s.bottom) + r
                }),
                u = e.doc.scrollTop,
                f = e.doc.scrollLeft;
            if (null != c.scrollTop && (Jn(e, c.scrollTop), Math.abs(e.doc.scrollTop - u) > 1 && (a = !0)), null != c.scrollLeft && (tr(e, c.scrollLeft), Math.abs(e.doc.scrollLeft - f) > 1 && (a = !0)), !a) break
        }
        return i
    }
    function $n(e, t) {
        var n = Kn(e, t);
        null != n.scrollTop && Jn(e, n.scrollTop), null != n.scrollLeft && tr(e, n.scrollLeft)
    }
    function Kn(e, t) {
        var n = e.display,
            r = xn(e.display);
        t.top < 0 && (t.top = 0);
        var i = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : n.scroller.scrollTop,
            o = Bt(e),
            a = {};
        t.bottom - t.top > o && (t.bottom = t.top + o);
        var l = e.doc.height + _t(n),
            s = t.top < r,
            c = t.bottom > l - r;
        if (t.top < i) a.scrollTop = s ? 0 : t.top;
        else if (t.bottom > i + o) {
            var u = Math.min(t.top, (c ? l : t.bottom) - o);
            u != i && (a.scrollTop = u)
        }
        var f = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : n.scroller.scrollLeft,
            d = Ht(e) - (e.options.fixedGutter ? n.gutters.offsetWidth : 0),
            h = t.right - t.left > d;
        return h && (t.right = t.left + d), t.left < 10 ? a.scrollLeft = 0 : t.left < f ? a.scrollLeft = Math.max(0, t.left - (h ? 0 : 10)) : t.right > d + f - 3 && (a.scrollLeft = t.right + (h ? 0 : 10) - d), a
    }
    function Vn(e, t) {
        null != t && (Zn(e), e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + t)
    }
    function Gn(e) {
        Zn(e);
        var t = e.getCursor();
        e.curOp.scrollToPos = {
            from: t,
            to: t,
            margin: e.options.cursorScrollMargin
        }
    }
    function Xn(e, t, n) {
        null == t && null == n || Zn(e), null != t && (e.curOp.scrollLeft = t), null != n && (e.curOp.scrollTop = n)
    }
    function Yn(e, t) {
        Zn(e), e.curOp.scrollToPos = t
    }
    function Zn(e) {
        var t = e.curOp.scrollToPos;
        t && (e.curOp.scrollToPos = null, Qn(e, fn(e, t.from), fn(e, t.to), t.margin))
    }
    function Qn(e, t, n, r) {
        var i = Kn(e, {
            left: Math.min(t.left, n.left),
            top: Math.min(t.top, n.top) - r,
            right: Math.max(t.right, n.right),
            bottom: Math.max(t.bottom, n.bottom) + r
        });
        Xn(e, i.scrollLeft, i.scrollTop)
    }
    function Jn(e, t) {
        Math.abs(e.doc.scrollTop - t) < 2 || (ya || Nr(e, {
            top: t
        }), er(e, t, !0), ya && Nr(e), Sr(e, 100))
    }
    function er(e, t, n) {
        t = Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t), (e.display.scroller.scrollTop != t || n) && (e.doc.scrollTop = t, e.display.scrollbars.setScrollTop(t), e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t))
    }
    function tr(e, t, n, r) {
        t = Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth), (n ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !r || (e.doc.scrollLeft = t, Hn(e), e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t), e.display.scrollbars.setScrollLeft(t))
    }
    function nr(e) {
        var t = e.display,
            n = t.gutters.offsetWidth,
            r = Math.round(e.doc.height + _t(e.display));
        return {
            clientHeight: t.scroller.clientHeight,
            viewHeight: t.wrapper.clientHeight,
            scrollWidth: t.scroller.scrollWidth,
            clientWidth: t.scroller.clientWidth,
            viewWidth: t.wrapper.clientWidth,
            barLeft: e.options.fixedGutter ? n : 0,
            docHeight: r,
            scrollHeight: r + Rt(e) + t.barHeight,
            nativeBarWidth: t.nativeBarWidth,
            gutterWidth: n
        }
    }
    function rr(e, t) {
        t || (t = nr(e));
        var n = e.display.barWidth,
            r = e.display.barHeight;
        ir(e, t);
        for (var i = 0; i < 4 && n != e.display.barWidth || r != e.display.barHeight; i++) n != e.display.barWidth && e.options.lineWrapping && _n(e), ir(e, nr(e)), n = e.display.barWidth, r = e.display.barHeight
    }
    function ir(e, t) {
        var n = e.display,
            r = n.scrollbars.update(t);
        n.sizer.style.paddingRight = (n.barWidth = r.right) + "px", n.sizer.style.paddingBottom = (n.barHeight = r.bottom) + "px", n.heightForcer.style.borderBottom = r.bottom + "px solid transparent", r.right && r.bottom ? (n.scrollbarFiller.style.display = "block", n.scrollbarFiller.style.height = r.bottom + "px", n.scrollbarFiller.style.width = r.right + "px") : n.scrollbarFiller.style.display = "", r.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter ? (n.gutterFiller.style.display = "block", n.gutterFiller.style.height = r.bottom + "px", n.gutterFiller.style.width = t.gutterWidth + "px") : n.gutterFiller.style.display = ""
    }
    function or(e) {
        e.display.scrollbars && (e.display.scrollbars.clear(), e.display.scrollbars.addClass && Ha(e.display.wrapper, e.display.scrollbars.addClass)), e.display.scrollbars = new zl[e.options.scrollbarStyle](function(t) {
            e.display.wrapper.insertBefore(t, e.display.scrollbarFiller), al(t, "mousedown", function() {
                e.state.focused && setTimeout(function() {
                    return e.display.input.focus()
                }, 0)
            }), t.setAttribute("cm-not-content", "true")
        }, function(t, n) {
            "horizontal" == n ? tr(e, t) : Jn(e, t)
        }, e), e.display.scrollbars.addClass && l(e.display.wrapper, e.display.scrollbars.addClass)
    }
    function ar(e) {
        e.curOp = {
            cm: e,
            viewChanged: !1,
            startHeight: e.doc.height,
            forceUpdate: !1,
            updateInput: null,
            typing: !1,
            changeObjs: null,
            cursorActivityHandlers: null,
            cursorActivityCalled: 0,
            selectionChanged: !1,
            updateMaxLine: !1,
            scrollLeft: null,
            scrollTop: null,
            scrollToPos: null,
            focus: !1,
            id: ++Al
        }, yt(e.curOp)
    }
    function lr(e) {
        xt(e.curOp, function(e) {
            for (var t = 0; t < e.ops.length; t++) e.ops[t].cm.curOp = null;
            sr(e)
        })
    }
    function sr(e) {
        for (var t = e.ops, n = 0; n < t.length; n++) cr(t[n]);
        for (var r = 0; r < t.length; r++) ur(t[r]);
        for (var i = 0; i < t.length; i++) fr(t[i]);
        for (var o = 0; o < t.length; o++) dr(t[o]);
        for (var a = 0; a < t.length; a++) hr(t[a])
    }
    function cr(e) {
        var t = e.cm,
            n = t.display;
        Tr(t), e.updateMaxLine && ke(t), e.mustUpdate = e.viewChanged || e.forceUpdate || null != e.scrollTop || e.scrollToPos && (e.scrollToPos.from.line < n.viewFrom || e.scrollToPos.to.line >= n.viewTo) || n.maxLineChanged && t.options.lineWrapping, e.update = e.mustUpdate && new Ol(t, e.mustUpdate && {
            top: e.scrollTop,
            ensure: e.scrollToPos
        }, e.forceUpdate)
    }
    function ur(e) {
        e.updatedDisplay = e.mustUpdate && Ar(e.cm, e.update)
    }
    function fr(e) {
        var t = e.cm,
            n = t.display;
        e.updatedDisplay && _n(t), e.barMeasure = nr(t), n.maxLineChanged && !t.options.lineWrapping && (e.adjustWidthTo = Kt(t, n.maxLine, n.maxLine.text.length).left + 3, t.display.sizerWidth = e.adjustWidthTo, e.barMeasure.scrollWidth = Math.max(n.scroller.clientWidth, n.sizer.offsetLeft + e.adjustWidthTo + Rt(t) + t.display.barWidth), e.maxScrollLeft = Math.max(0, n.sizer.offsetLeft + e.adjustWidthTo - Ht(t))), (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = n.input.prepareSelection())
    }
    function dr(e) {
        var t = e.cm;
        null != e.adjustWidthTo && (t.display.sizer.style.minWidth = e.adjustWidthTo + "px", e.maxScrollLeft < t.doc.scrollLeft && tr(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0), t.display.maxLineChanged = !1);
        var n = e.focus && e.focus == a();
        e.preparedSelection && t.display.input.showSelection(e.preparedSelection, n), (e.updatedDisplay || e.startHeight != t.doc.height) && rr(t, e.barMeasure), e.updatedDisplay && Fr(t, e.barMeasure), e.selectionChanged && En(t), t.state.focused && e.updateInput && t.display.input.reset(e.typing), n && Fn(e.cm)
    }
    function hr(e) {
        var t = e.cm,
            n = t.display,
            r = t.doc;
        (e.updatedDisplay && Or(t, e.update), null == n.wheelStartX || null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos || (n.wheelStartX = n.wheelStartY = null), null != e.scrollTop && er(t, e.scrollTop, e.forceScroll), null != e.scrollLeft && tr(t, e.scrollLeft, !0, !0), e.scrollToPos) && qn(t, Un(t, B(r, e.scrollToPos.from), B(r, e.scrollToPos.to), e.scrollToPos.margin));
        var i = e.maybeHiddenMarkers,
            o = e.maybeUnhiddenMarkers;
        if (i)
            for (var a = 0; a < i.length; ++a) i[a].lines.length || Me(i[a], "hide");
        if (o)
            for (var l = 0; l < o.length; ++l) o[l].lines.length && Me(o[l], "unhide");
        n.wrapper.offsetHeight && (r.scrollTop = t.display.scroller.scrollTop), e.changeObjs && Me(t, "changes", t, e.changeObjs), e.update && e.update.finish()
    }
    function pr(e, t) {
        if (e.curOp) return t();
        ar(e);
        try {
            return t()
        } finally {
            lr(e)
        }
    }
    function mr(e, t) {
        return function() {
            if (e.curOp) return t.apply(e, arguments);
            ar(e);
            try {
                return t.apply(e, arguments)
            } finally {
                lr(e)
            }
        }
    }
    function gr(e) {
        return function() {
            if (this.curOp) return e.apply(this, arguments);
            ar(this);
            try {
                return e.apply(this, arguments)
            } finally {
                lr(this)
            }
        }
    }
    function vr(e) {
        return function() {
            var t = this.cm;
            if (!t || t.curOp) return e.apply(this, arguments);
            ar(t);
            try {
                return e.apply(this, arguments)
            } finally {
                lr(t)
            }
        }
    }
    function yr(e, t, n, r) {
        null == t && (t = e.doc.first), null == n && (n = e.doc.first + e.doc.size), r || (r = 0);
        var i = e.display;
        if (r && n < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t), e.curOp.viewChanged = !0, t >= i.viewTo) nl && me(e.doc, t) < i.viewTo && xr(e);
        else if (n <= i.viewFrom) nl && ge(e.doc, n + r) > i.viewFrom ? xr(e) : (i.viewFrom += r, i.viewTo += r);
        else if (t <= i.viewFrom && n >= i.viewTo) xr(e);
        else if (t <= i.viewFrom) {
            var o = kr(e, n, n + r, 1);
            o ? (i.view = i.view.slice(o.index), i.viewFrom = o.lineN, i.viewTo += r) : xr(e)
        } else if (n >= i.viewTo) {
            var a = kr(e, t, t, -1);
            a ? (i.view = i.view.slice(0, a.index), i.viewTo = a.lineN) : xr(e)
        } else {
            var l = kr(e, t, t, -1),
                s = kr(e, n, n + r, 1);
            l && s ? (i.view = i.view.slice(0, l.index).concat(vt(e, l.lineN, s.lineN)).concat(i.view.slice(s.index)), i.viewTo += r) : xr(e)
        }
        var c = i.externalMeasured;
        c && (n < c.lineN ? c.lineN += r : t < c.lineN + c.size && (i.externalMeasured = null))
    }
    function br(e, t, n) {
        e.curOp.viewChanged = !0;
        var r = e.display,
            i = e.display.externalMeasured;
        if (i && t >= i.lineN && t < i.lineN + i.size && (r.externalMeasured = null), !(t < r.viewFrom || t >= r.viewTo)) {
            var o = r.view[Mn(e, t)];
            if (null != o.node) {
                var a = o.changes || (o.changes = []); - 1 == d(a, n) && a.push(n)
            }
        }
    }
    function xr(e) {
        e.display.viewFrom = e.display.viewTo = e.doc.first, e.display.view = [], e.display.viewOffset = 0
    }
    function kr(e, t, n, r) {
        var i, o = Mn(e, t),
            a = e.display.view;
        if (!nl || n == e.doc.first + e.doc.size) return {
            index: o,
            lineN: n
        };
        for (var l = e.display.viewFrom, s = 0; s < o; s++) l += a[s].size;
        if (l != t) {
            if (r > 0) {
                if (o == a.length - 1) return null;
                i = l + a[o].size - t, o++
            } else i = l - t;
            t += i, n += i
        }
        for (; me(e.doc, n) != n;) {
            if (o == (r < 0 ? 0 : a.length - 1)) return null;
            n += r * a[o - (r < 0 ? 1 : 0)].size, o += r
        }
        return {
            index: o,
            lineN: n
        }
    }
    function wr(e, t, n) {
        var r = e.display;
        0 == r.view.length || t >= r.viewTo || n <= r.viewFrom ? (r.view = vt(e, t, n), r.viewFrom = t) : (r.viewFrom > t ? r.view = vt(e, t, r.viewFrom).concat(r.view) : r.viewFrom < t && (r.view = r.view.slice(Mn(e, t))), r.viewFrom = t, r.viewTo < n ? r.view = r.view.concat(vt(e, r.viewTo, n)) : r.viewTo > n && (r.view = r.view.slice(0, Mn(e, n)))), r.viewTo = n
    }
    function Cr(e) {
        for (var t = e.display.view, n = 0, r = 0; r < t.length; r++) {
            var i = t[r];
            i.hidden || i.node && !i.changes || ++n
        }
        return n
    }
    function Sr(e, t) {
        e.doc.highlightFrontier < e.display.viewTo && e.state.highlight.set(t, c(Lr, e))
    }
    function Lr(e) {
        var t = e.doc;
        if (!(t.highlightFrontier >= e.display.viewTo)) {
            var n = +new Date + e.options.workTime,
                r = Ze(e, t.highlightFrontier),
                i = [];
            t.iter(r.line, Math.min(t.first + t.size, e.display.viewTo + 500), function(o) {
                if (r.line >= e.display.viewFrom) {
                    var a = o.styles,
                        l = o.text.length > e.options.maxHighlightLength ? Ke(t.mode, r.state) : null,
                        s = Xe(e, o, r, !0);
                    l && (r.state = l), o.styles = s.styles;
                    var c = o.styleClasses,
                        u = s.classes;
                    u ? o.styleClasses = u : c && (o.styleClasses = null);
                    for (var f = !a || a.length != o.styles.length || c != u && (!c || !u || c.bgClass != u.bgClass || c.textClass != u.textClass), d = 0; !f && d < a.length; ++d) f = a[d] != o.styles[d];
                    f && i.push(r.line), o.stateAfter = r.save(), r.nextLine()
                } else o.text.length <= e.options.maxHighlightLength && Qe(e, o.text, r), o.stateAfter = r.line % 5 == 0 ? r.save() : null, r.nextLine();
                if (+new Date > n) return Sr(e, e.options.workDelay), !0
            }), t.highlightFrontier = r.line, t.modeFrontier = Math.max(t.modeFrontier, r.line), i.length && pr(e, function() {
                for (var t = 0; t < i.length; t++) br(e, i[t], "text")
            })
        }
    }
    function Tr(e) {
        var t = e.display;
        !t.scrollbarsClipped && t.scroller.offsetWidth && (t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth, t.heightForcer.style.height = Rt(e) + "px", t.sizer.style.marginBottom = -t.nativeBarWidth + "px", t.sizer.style.borderRightWidth = Rt(e) + "px", t.scrollbarsClipped = !0)
    }
    function Mr(e) {
        if (e.hasFocus()) return null;
        var t = a();
        if (!t || !o(e.display.lineDiv, t)) return null;
        var n = {
            activeElt: t
        };
        if (window.getSelection) {
            var r = window.getSelection();
            r.anchorNode && r.extend && o(e.display.lineDiv, r.anchorNode) && (n.anchorNode = r.anchorNode, n.anchorOffset = r.anchorOffset, n.focusNode = r.focusNode, n.focusOffset = r.focusOffset)
        }
        return n
    }
    function zr(e) {
        if (e && e.activeElt && e.activeElt != a() && (e.activeElt.focus(), e.anchorNode && o(document.body, e.anchorNode) && o(document.body, e.focusNode))) {
            var t = window.getSelection(),
                n = document.createRange();
            n.setEnd(e.anchorNode, e.anchorOffset), n.collapse(!1), t.removeAllRanges(), t.addRange(n), t.extend(e.focusNode, e.focusOffset)
        }
    }
    function Ar(e, n) {
        var r = e.display,
            i = e.doc;
        if (n.editorIsHidden) return xr(e), !1;
        if (!n.force && n.visible.from >= r.viewFrom && n.visible.to <= r.viewTo && (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo) && r.renderedView == r.view && 0 == Cr(e)) return !1;
        Bn(e) && (xr(e), n.dims = wn(e));
        var o = i.first + i.size,
            a = Math.max(n.visible.from - e.options.viewportMargin, i.first),
            l = Math.min(o, n.visible.to + e.options.viewportMargin);
        r.viewFrom < a && a - r.viewFrom < 20 && (a = Math.max(i.first, r.viewFrom)), r.viewTo > l && r.viewTo - l < 20 && (l = Math.min(o, r.viewTo)), nl && (a = me(e.doc, a), l = ge(e.doc, l));
        var s = a != r.viewFrom || l != r.viewTo || r.lastWrapHeight != n.wrapperHeight || r.lastWrapWidth != n.wrapperWidth;
        wr(e, a, l), r.viewOffset = be(M(e.doc, r.viewFrom)), e.display.mover.style.top = r.viewOffset + "px";
        var c = Cr(e);
        if (!s && 0 == c && !n.force && r.renderedView == r.view && (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo)) return !1;
        var u = Mr(e);
        return c > 4 && (r.lineDiv.style.display = "none"), Pr(e, r.updateLineNumbers, n.dims), c > 4 && (r.lineDiv.style.display = ""), r.renderedView = r.view, zr(u), t(r.cursorDiv), t(r.selectionDiv), r.gutters.style.height = r.sizer.style.minHeight = 0, s && (r.lastWrapHeight = n.wrapperHeight, r.lastWrapWidth = n.wrapperWidth, Sr(e, 400)), r.updateLineNumbers = null, !0
    }
    function Or(e, t) {
        for (var n = t.viewport, r = !0;
            (r && e.options.lineWrapping && t.oldDisplayWidth != Ht(e) || (n && null != n.top && (n = {
                top: Math.min(e.doc.height + _t(e.display) - Bt(e), n.top)
            }), t.visible = Rn(e.display, e.doc, n), !(t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo))) && Ar(e, t); r = !1) {
            _n(e);
            var i = nr(e);
            zn(e), rr(e, i), Fr(e, i), t.force = !1
        }
        t.signal(e, "update", e), e.display.viewFrom == e.display.reportedViewFrom && e.display.viewTo == e.display.reportedViewTo || (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo), e.display.reportedViewFrom = e.display.viewFrom, e.display.reportedViewTo = e.display.viewTo)
    }
    function Nr(e, t) {
        var n = new Ol(e, t);
        if (Ar(e, n)) {
            _n(e), Or(e, n);
            var r = nr(e);
            zn(e), rr(e, r), Fr(e, r), n.finish()
        }
    }
    function Pr(e, n, r) {
        function i(t) {
            var n = t.nextSibling;
            return Sa && Fa && e.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t), n
        }
        for (var o = e.display, a = e.options.lineNumbers, l = o.lineDiv, s = l.firstChild, c = o.view, u = o.viewFrom, f = 0; f < c.length; f++) {
            var h = c[f];
            if (h.hidden);
            else if (h.node && h.node.parentNode == l) {
                for (; s != h.node;) s = i(s);
                var p = a && null != n && n <= u && h.lineNumber;
                h.changes && (d(h.changes, "gutter") > -1 && (p = !1), Ct(e, h, u, r)), p && (t(h.lineNumber), h.lineNumber.appendChild(document.createTextNode(F(e.options, u)))), s = h.node.nextSibling
            } else {
                var m = Nt(e, h, u, r);
                l.insertBefore(m, s)
            }
            u += h.size
        }
        for (; s;) s = i(s)
    }
    function Er(e) {
        var t = e.display.gutters.offsetWidth;
        e.display.sizer.style.marginLeft = t + "px"
    }
    function Fr(e, t) {
        e.display.sizer.style.minHeight = t.docHeight + "px", e.display.heightForcer.style.top = t.docHeight + "px", e.display.gutters.style.height = t.docHeight + e.display.barHeight + Rt(e) + "px"
    }
    function jr(e) {
        var n = e.display.gutters,
            i = e.options.gutters;
        t(n);
        for (var o = 0; o < i.length; ++o) {
            var a = i[o],
                l = n.appendChild(r("div", null, "CodeMirror-gutter " + a));
            "CodeMirror-linenumbers" == a && (e.display.lineGutter = l, l.style.width = (e.display.lineNumWidth || 1) + "px")
        }
        n.style.display = o ? "" : "none", Er(e)
    }
    function Ir(e) {
        var t = d(e.gutters, "CodeMirror-linenumbers"); - 1 == t && e.lineNumbers ? e.gutters = e.gutters.concat(["CodeMirror-linenumbers"]) : t > -1 && !e.lineNumbers && (e.gutters = e.gutters.slice(0), e.gutters.splice(t, 1))
    }
    function Dr(e) {
        var t = e.wheelDeltaX,
            n = e.wheelDeltaY;
        return null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail), null == n && e.detail && e.axis == e.VERTICAL_AXIS ? n = e.detail : null == n && (n = e.wheelDelta), {
            x: t,
            y: n
        }
    }
    function _r(e) {
        var t = Dr(e);
        return t.x *= Pl, t.y *= Pl, t
    }
    function Wr(e, t) {
        var n = Dr(t),
            r = n.x,
            i = n.y,
            o = e.display,
            a = o.scroller,
            l = a.scrollWidth > a.clientWidth,
            s = a.scrollHeight > a.clientHeight;
        if (r && l || i && s) {
            if (i && Fa && Sa) e: for (var c = t.target, u = o.view; c != a; c = c.parentNode)
                for (var f = 0; f < u.length; f++)
                    if (u[f].node == c) {
                        e.display.currentWheelTarget = c;
                        break e
                    }
            if (r && !ya && !Ma && null != Pl) return i && s && Jn(e, Math.max(0, a.scrollTop + i * Pl)), tr(e, Math.max(0, a.scrollLeft + r * Pl)), (!i || i && s) && Pe(t), void(o.wheelStartX = null);
            if (i && null != Pl) {
                var d = i * Pl,
                    h = e.doc.scrollTop,
                    p = h + o.wrapper.clientHeight;
                d < 0 ? h = Math.max(0, h + d - 50) : p = Math.min(e.doc.height, p + d + 50), Nr(e, {
                    top: h,
                    bottom: p
                })
            }
            Nl < 20 && (null == o.wheelStartX ? (o.wheelStartX = a.scrollLeft, o.wheelStartY = a.scrollTop, o.wheelDX = r, o.wheelDY = i, setTimeout(function() {
                if (null != o.wheelStartX) {
                    var e = a.scrollLeft - o.wheelStartX,
                        t = a.scrollTop - o.wheelStartY,
                        n = t && o.wheelDY && t / o.wheelDY || e && o.wheelDX && e / o.wheelDX;
                    o.wheelStartX = o.wheelStartY = null, n && (Pl = (Pl * Nl + n) / (Nl + 1), ++Nl)
                }
            }, 200)) : (o.wheelDX += r, o.wheelDY += i))
        }
    }
    function Rr(e, t) {
        var n = e[t];
        e.sort(function(e, t) {
            return I(e.from(), t.from())
        }), t = d(e, n);
        for (var r = 1; r < e.length; r++) {
            var i = e[r],
                o = e[r - 1];
            if (I(o.to(), i.from()) >= 0) {
                var a = R(o.from(), i.from()),
                    l = W(o.to(), i.to()),
                    s = o.empty() ? i.from() == i.head : o.from() == o.head;
                r <= t && --t, e.splice(--r, 2, new Fl(s ? l : a, s ? a : l))
            }
        }
        return new El(e, t)
    }
    function Hr(e, t) {
        return new El([new Fl(e, t || e)], 0)
    }
    function Br(e) {
        return e.text ? j(e.from.line + e.text.length - 1, m(e.text).length + (1 == e.text.length ? e.from.ch : 0)) : e.to
    }
    function qr(e, t) {
        if (I(e, t.from) < 0) return e;
        if (I(e, t.to) <= 0) return Br(t);
        var n = e.line + t.text.length - (t.to.line - t.from.line) - 1,
            r = e.ch;
        return e.line == t.to.line && (r += Br(t).ch - t.to.ch), j(n, r)
    }
    function Ur(e, t) {
        for (var n = [], r = 0; r < e.sel.ranges.length; r++) {
            var i = e.sel.ranges[r];
            n.push(new Fl(qr(i.anchor, t), qr(i.head, t)))
        }
        return Rr(n, e.sel.primIndex)
    }
    function $r(e, t, n) {
        return e.line == t.line ? j(n.line, e.ch - t.ch + n.ch) : j(n.line + (e.line - t.line), e.ch)
    }
    function Kr(e, t, n) {
        for (var r = [], i = j(e.first, 0), o = i, a = 0; a < t.length; a++) {
            var l = t[a],
                s = $r(l.from, i, o),
                c = $r(Br(l), i, o);
            if (i = l.to, o = c, "around" == n) {
                var u = e.sel.ranges[a],
                    f = I(u.head, u.anchor) < 0;
                r[a] = new Fl(f ? c : s, f ? s : c)
            } else r[a] = new Fl(s, s)
        }
        return new El(r, e.sel.primIndex)
    }
    function Vr(e) {
        e.doc.mode = Ue(e.options, e.doc.modeOption), Gr(e)
    }
    function Gr(e) {
        e.doc.iter(function(e) {
            e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null)
        }), e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first, Sr(e, 100), e.state.modeGen++, e.curOp && yr(e)
    }
    function Xr(e, t) {
        return 0 == t.from.ch && 0 == t.to.ch && "" == m(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore)
    }
    function Yr(e, t, n, r) {
        function i(e) {
            return n ? n[e] : null
        }
        function o(e, n, i) {
            at(e, n, i, r), kt(e, "change", e, t)
        }
        function a(e, t) {
            for (var n = [], o = e; o < t; ++o) n.push(new bl(c[o], i(o), r));
            return n
        }
        var l = t.from,
            s = t.to,
            c = t.text,
            u = M(e, l.line),
            f = M(e, s.line),
            d = m(c),
            h = i(c.length - 1),
            p = s.line - l.line;
        if (t.full) e.insert(0, a(0, c.length)), e.remove(c.length, e.size - c.length);
        else if (Xr(e, t)) {
            var g = a(0, c.length - 1);
            o(f, f.text, h), p && e.remove(l.line, p), g.length && e.insert(l.line, g)
        } else if (u == f)
            if (1 == c.length) o(u, u.text.slice(0, l.ch) + d + u.text.slice(s.ch), h);
            else {
                var v = a(1, c.length - 1);
                v.push(new bl(d + u.text.slice(s.ch), h, r)), o(u, u.text.slice(0, l.ch) + c[0], i(0)), e.insert(l.line + 1, v)
            }
        else if (1 == c.length) o(u, u.text.slice(0, l.ch) + c[0] + f.text.slice(s.ch), i(0)), e.remove(l.line + 1, p);
        else {
            o(u, u.text.slice(0, l.ch) + c[0], i(0)), o(f, d + f.text.slice(s.ch), h);
            var y = a(1, c.length - 1);
            p > 1 && e.remove(l.line + 1, p - 1), e.insert(l.line + 1, y)
        }
        kt(e, "change", e, t)
    }
    function Zr(e, t, n) {
        function r(e, i, o) {
            if (e.linked)
                for (var a = 0; a < e.linked.length; ++a) {
                    var l = e.linked[a];
                    if (l.doc != i) {
                        var s = o && l.sharedHist;
                        n && !s || (t(l.doc, s), r(l.doc, e, s))
                    }
                }
        }
        r(e, null, !0)
    }
    function Qr(e, t) {
        if (t.cm) throw new Error("This document is already in use.");
        e.doc = t, t.cm = e, Ln(e), Vr(e), Jr(e),
            e.options.lineWrapping || ke(e), e.options.mode = t.modeOption, yr(e)
    }
    function Jr(e) {
        ("rtl" == e.doc.direction ? l : Ha)(e.display.lineDiv, "CodeMirror-rtl")
    }
    function ei(e) {
        pr(e, function() {
            Jr(e), yr(e)
        })
    }
    function ti(e) {
        this.done = [], this.undone = [], this.undoDepth = Infinity, this.lastModTime = this.lastSelTime = 0, this.lastOp = this.lastSelOp = null, this.lastOrigin = this.lastSelOrigin = null, this.generation = this.maxGeneration = e || 1
    }
    function ni(e, t) {
        var n = {
            from: _(t.from),
            to: Br(t),
            text: z(e, t.from, t.to)
        };
        return ci(e, n, t.from.line, t.to.line + 1), Zr(e, function(e) {
            return ci(e, n, t.from.line, t.to.line + 1)
        }, !0), n
    }
    function ri(e) {
        for (; e.length;) {
            if (!m(e).ranges) break;
            e.pop()
        }
    }
    function ii(e, t) {
        return t ? (ri(e.done), m(e.done)) : e.done.length && !m(e.done).ranges ? m(e.done) : e.done.length > 1 && !e.done[e.done.length - 2].ranges ? (e.done.pop(), m(e.done)) : void 0
    }
    function oi(e, t, n, r) {
        var i = e.history;
        i.undone.length = 0;
        var o, a, l = +new Date;
        if ((i.lastOp == r || i.lastOrigin == t.origin && t.origin && ("+" == t.origin.charAt(0) && i.lastModTime > l - (e.cm ? e.cm.options.historyEventDelay : 500) || "*" == t.origin.charAt(0))) && (o = ii(i, i.lastOp == r))) a = m(o.changes), 0 == I(t.from, t.to) && 0 == I(t.from, a.to) ? a.to = Br(t) : o.changes.push(ni(e, t));
        else {
            var s = m(i.done);
            for (s && s.ranges || si(e.sel, i.done), o = {
                    changes: [ni(e, t)],
                    generation: i.generation
                }, i.done.push(o); i.done.length > i.undoDepth;) i.done.shift(), i.done[0].ranges || i.done.shift()
        }
        i.done.push(n), i.generation = ++i.maxGeneration, i.lastModTime = i.lastSelTime = l, i.lastOp = i.lastSelOp = r, i.lastOrigin = i.lastSelOrigin = t.origin, a || Me(e, "historyAdded")
    }
    function ai(e, t, n, r) {
        var i = t.charAt(0);
        return "*" == i || "+" == i && n.ranges.length == r.ranges.length && n.somethingSelected() == r.somethingSelected() && new Date - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500)
    }
    function li(e, t, n, r) {
        var i = e.history,
            o = r && r.origin;
        n == i.lastSelOp || o && i.lastSelOrigin == o && (i.lastModTime == i.lastSelTime && i.lastOrigin == o || ai(e, o, m(i.done), t)) ? i.done[i.done.length - 1] = t : si(t, i.done), i.lastSelTime = +new Date, i.lastSelOrigin = o, i.lastSelOp = n, r && !1 !== r.clearRedo && ri(i.undone)
    }
    function si(e, t) {
        var n = m(t);
        n && n.ranges && n.equals(e) || t.push(e)
    }
    function ci(e, t, n, r) {
        var i = t["spans_" + e.id],
            o = 0;
        e.iter(Math.max(e.first, n), Math.min(e.first + e.size, r), function(n) {
            n.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = n.markedSpans), ++o
        })
    }
    function ui(e) {
        if (!e) return null;
        for (var t, n = 0; n < e.length; ++n) e[n].marker.explicitlyCleared ? t || (t = e.slice(0, n)) : t && t.push(e[n]);
        return t ? t.length ? t : null : e
    }
    function fi(e, t) {
        var n = t["spans_" + e.id];
        if (!n) return null;
        for (var r = [], i = 0; i < t.text.length; ++i) r.push(ui(n[i]));
        return r
    }
    function di(e, t) {
        var n = fi(e, t),
            r = J(e, t);
        if (!n) return r;
        if (!r) return n;
        for (var i = 0; i < n.length; ++i) {
            var o = n[i],
                a = r[i];
            if (o && a) e: for (var l = 0; l < a.length; ++l) {
                for (var s = a[l], c = 0; c < o.length; ++c)
                    if (o[c].marker == s.marker) continue e;
                o.push(s)
            } else a && (n[i] = a)
        }
        return n
    }
    function hi(e, t, n) {
        for (var r = [], i = 0; i < e.length; ++i) {
            var o = e[i];
            if (o.ranges) r.push(n ? El.prototype.deepCopy.call(o) : o);
            else {
                var a = o.changes,
                    l = [];
                r.push({
                    changes: l
                });
                for (var s = 0; s < a.length; ++s) {
                    var c = a[s],
                        u = void 0;
                    if (l.push({
                            from: c.from,
                            to: c.to,
                            text: c.text
                        }), t)
                        for (var f in c)(u = f.match(/^spans_(\d+)$/)) && d(t, Number(u[1])) > -1 && (m(l)[f] = c[f], delete c[f])
                }
            }
        }
        return r
    }
    function pi(e, t, n, r) {
        if (r) {
            var i = e.anchor;
            if (n) {
                var o = I(t, i) < 0;
                o != I(n, i) < 0 ? (i = t, t = n) : o != I(t, n) < 0 && (t = n)
            }
            return new Fl(i, t)
        }
        return new Fl(n || t, t)
    }
    function mi(e, t, n, r, i) {
        null == i && (i = e.cm && (e.cm.display.shift || e.extend)), ki(e, new El([pi(e.sel.primary(), t, n, i)], 0), r)
    }
    function gi(e, t, n) {
        for (var r = [], i = e.cm && (e.cm.display.shift || e.extend), o = 0; o < e.sel.ranges.length; o++) r[o] = pi(e.sel.ranges[o], t[o], null, i);
        ki(e, Rr(r, e.sel.primIndex), n)
    }
    function vi(e, t, n, r) {
        var i = e.sel.ranges.slice(0);
        i[t] = n, ki(e, Rr(i, e.sel.primIndex), r)
    }
    function yi(e, t, n, r) {
        ki(e, Hr(t, n), r)
    }
    function bi(e, t, n) {
        var r = {
            ranges: t.ranges,
            update: function(t) {
                var n = this;
                this.ranges = [];
                for (var r = 0; r < t.length; r++) n.ranges[r] = new Fl(B(e, t[r].anchor), B(e, t[r].head))
            },
            origin: n && n.origin
        };
        return Me(e, "beforeSelectionChange", e, r), e.cm && Me(e.cm, "beforeSelectionChange", e.cm, r), r.ranges != t.ranges ? Rr(r.ranges, r.ranges.length - 1) : t
    }
    function xi(e, t, n) {
        var r = e.history.done,
            i = m(r);
        i && i.ranges ? (r[r.length - 1] = t, wi(e, t, n)) : ki(e, t, n)
    }
    function ki(e, t, n) {
        wi(e, t, n), li(e, e.sel, e.cm ? e.cm.curOp.id : NaN, n)
    }
    function wi(e, t, n) {
        (Oe(e, "beforeSelectionChange") || e.cm && Oe(e.cm, "beforeSelectionChange")) && (t = bi(e, t, n)), Ci(e, Li(e, t, n && n.bias || (I(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1), !0)), n && !1 === n.scroll || !e.cm || Gn(e.cm)
    }
    function Ci(e, t) {
        t.equals(e.sel) || (e.sel = t, e.cm && (e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = !0, Ae(e.cm)), kt(e, "cursorActivity", e))
    }
    function Si(e) {
        Ci(e, Li(e, e.sel, null, !1))
    }
    function Li(e, t, n, r) {
        for (var i, o = 0; o < t.ranges.length; o++) {
            var a = t.ranges[o],
                l = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
                s = Mi(e, a.anchor, l && l.anchor, n, r),
                c = Mi(e, a.head, l && l.head, n, r);
            (i || s != a.anchor || c != a.head) && (i || (i = t.ranges.slice(0, o)), i[o] = new Fl(s, c))
        }
        return i ? Rr(i, t.primIndex) : t
    }
    function Ti(e, t, n, r, i) {
        var o = M(e, t.line);
        if (o.markedSpans)
            for (var a = 0; a < o.markedSpans.length; ++a) {
                var l = o.markedSpans[a],
                    s = l.marker;
                if ((null == l.from || (s.inclusiveLeft ? l.from <= t.ch : l.from < t.ch)) && (null == l.to || (s.inclusiveRight ? l.to >= t.ch : l.to > t.ch))) {
                    if (i && (Me(s, "beforeCursorEnter"), s.explicitlyCleared)) {
                        if (o.markedSpans) {
                            --a;
                            continue
                        }
                        break
                    }
                    if (!s.atomic) continue;
                    if (n) {
                        var c = s.find(r < 0 ? 1 : -1),
                            u = void 0;
                        if ((r < 0 ? s.inclusiveRight : s.inclusiveLeft) && (c = zi(e, c, -r, c && c.line == t.line ? o : null)), c && c.line == t.line && (u = I(c, n)) && (r < 0 ? u < 0 : u > 0)) return Ti(e, c, t, r, i)
                    }
                    var f = s.find(r < 0 ? -1 : 1);
                    return (r < 0 ? s.inclusiveLeft : s.inclusiveRight) && (f = zi(e, f, r, f.line == t.line ? o : null)), f ? Ti(e, f, t, r, i) : null
                }
            }
        return t
    }
    function Mi(e, t, n, r, i) {
        var o = r || 1,
            a = Ti(e, t, n, o, i) || !i && Ti(e, t, n, o, !0) || Ti(e, t, n, -o, i) || !i && Ti(e, t, n, -o, !0);
        return a || (e.cantEdit = !0, j(e.first, 0))
    }
    function zi(e, t, n, r) {
        return n < 0 && 0 == t.ch ? t.line > e.first ? B(e, j(t.line - 1)) : null : n > 0 && t.ch == (r || M(e, t.line)).text.length ? t.line < e.first + e.size - 1 ? j(t.line + 1, 0) : null : new j(t.line, t.ch + n)
    }
    function Ai(e) {
        e.setSelection(j(e.firstLine(), 0), j(e.lastLine()), Xa)
    }
    function Oi(e, t, n) {
        var r = {
            canceled: !1,
            from: t.from,
            to: t.to,
            text: t.text,
            origin: t.origin,
            cancel: function() {
                return r.canceled = !0
            }
        };
        return n && (r.update = function(t, n, i, o) {
            t && (r.from = B(e, t)), n && (r.to = B(e, n)), i && (r.text = i), o !== undefined && (r.origin = o)
        }), Me(e, "beforeChange", e, r), e.cm && Me(e.cm, "beforeChange", e.cm, r), r.canceled ? null : {
            from: r.from,
            to: r.to,
            text: r.text,
            origin: r.origin
        }
    }
    function Ni(e, t, n) {
        if (e.cm) {
            if (!e.cm.curOp) return mr(e.cm, Ni)(e, t, n);
            if (e.cm.state.suppressEdits) return
        }
        if (!(Oe(e, "beforeChange") || e.cm && Oe(e.cm, "beforeChange")) || (t = Oi(e, t, !0))) {
            var r = tl && !n && te(e, t.from, t.to);
            if (r)
                for (var i = r.length - 1; i >= 0; --i) Pi(e, {
                    from: r[i].from,
                    to: r[i].to,
                    text: i ? [""] : t.text,
                    origin: t.origin
                });
            else Pi(e, t)
        }
    }
    function Pi(e, t) {
        if (1 != t.text.length || "" != t.text[0] || 0 != I(t.from, t.to)) {
            var n = Ur(e, t);
            oi(e, t, n, e.cm ? e.cm.curOp.id : NaN), ji(e, t, n, J(e, t));
            var r = [];
            Zr(e, function(e, n) {
                n || -1 != d(r, e.history) || (Ri(e.history, t), r.push(e.history)), ji(e, t, null, J(e, t))
            })
        }
    }
    function Ei(e, t, n) {
        var r = e.cm && e.cm.state.suppressEdits;
        if (!r || n) {
            for (var i, o = e.history, a = e.sel, l = "undo" == t ? o.done : o.undone, s = "undo" == t ? o.undone : o.done, c = 0; c < l.length && (i = l[c], n ? !i.ranges || i.equals(e.sel) : i.ranges); c++);
            if (c != l.length) {
                for (o.lastOrigin = o.lastSelOrigin = null;;) {
                    if (!(i = l.pop()).ranges) {
                        if (r) return void l.push(i);
                        break
                    }
                    if (si(i, s), n && !i.equals(e.sel)) return void ki(e, i, {
                        clearRedo: !1
                    });
                    a = i
                }
                var u = [];
                si(a, s), s.push({
                    changes: u,
                    generation: o.generation
                }), o.generation = i.generation || ++o.maxGeneration;
                for (var f = Oe(e, "beforeChange") || e.cm && Oe(e.cm, "beforeChange"), h = function(n) {
                        var r = i.changes[n];
                        if (r.origin = t, f && !Oi(e, r, !1)) return l.length = 0, {};
                        u.push(ni(e, r));
                        var o = n ? Ur(e, r) : m(l);
                        ji(e, r, o, di(e, r)), !n && e.cm && e.cm.scrollIntoView({
                            from: r.from,
                            to: Br(r)
                        });
                        var a = [];
                        Zr(e, function(e, t) {
                            t || -1 != d(a, e.history) || (Ri(e.history, r), a.push(e.history)), ji(e, r, null, di(e, r))
                        })
                    }, p = i.changes.length - 1; p >= 0; --p) {
                    var g = h(p);
                    if (g) return g.v
                }
            }
        }
    }
    function Fi(e, t) {
        if (0 != t && (e.first += t, e.sel = new El(g(e.sel.ranges, function(e) {
                return new Fl(j(e.anchor.line + t, e.anchor.ch), j(e.head.line + t, e.head.ch))
            }), e.sel.primIndex), e.cm)) {
            yr(e.cm, e.first, e.first - t, t);
            for (var n = e.cm.display, r = n.viewFrom; r < n.viewTo; r++) br(e.cm, r, "gutter")
        }
    }
    function ji(e, t, n, r) {
        if (e.cm && !e.cm.curOp) return mr(e.cm, ji)(e, t, n, r);
        if (t.to.line < e.first) Fi(e, t.text.length - 1 - (t.to.line - t.from.line));
        else if (!(t.from.line > e.lastLine())) {
            if (t.from.line < e.first) {
                var i = t.text.length - 1 - (e.first - t.from.line);
                Fi(e, i), t = {
                    from: j(e.first, 0),
                    to: j(t.to.line + i, t.to.ch),
                    text: [m(t.text)],
                    origin: t.origin
                }
            }
            var o = e.lastLine();
            t.to.line > o && (t = {
                from: t.from,
                to: j(o, M(e, o).text.length),
                text: [t.text[0]],
                origin: t.origin
            }), t.removed = z(e, t.from, t.to), n || (n = Ur(e, t)), e.cm ? Ii(e.cm, t, r) : Yr(e, t, r), wi(e, n, Xa)
        }
    }
    function Ii(e, t, n) {
        var r = e.doc,
            i = e.display,
            o = t.from,
            a = t.to,
            l = !1,
            s = o.line;
        e.options.lineWrapping || (s = N(de(M(r, o.line))), r.iter(s, a.line + 1, function(e) {
            if (e == i.maxLine) return l = !0, !0
        })), r.sel.contains(t.from, t.to) > -1 && Ae(e), Yr(r, t, n, Sn(e)), e.options.lineWrapping || (r.iter(s, o.line + t.text.length, function(e) {
            var t = xe(e);
            t > i.maxLineLength && (i.maxLine = e, i.maxLineLength = t, i.maxLineChanged = !0, l = !1)
        }), l && (e.curOp.updateMaxLine = !0)), ot(r, o.line), Sr(e, 400);
        var c = t.text.length - (a.line - o.line) - 1;
        t.full ? yr(e) : o.line != a.line || 1 != t.text.length || Xr(e.doc, t) ? yr(e, o.line, a.line + 1, c) : br(e, o.line, "text");
        var u = Oe(e, "changes"),
            f = Oe(e, "change");
        if (f || u) {
            var d = {
                from: o,
                to: a,
                text: t.text,
                removed: t.removed,
                origin: t.origin
            };
            f && kt(e, "change", e, d), u && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(d)
        }
        e.display.selForContextMenu = null
    }
    function Di(e, t, n, r, i) {
        var o;
        (r || (r = n), I(r, n) < 0) && (n = (o = [r, n])[0], r = o[1]);
        "string" == typeof t && (t = e.splitLines(t)), Ni(e, {
            from: n,
            to: r,
            text: t,
            origin: i
        })
    }
    function _i(e, t, n, r) {
        n < e.line ? e.line += r : t < e.line && (e.line = t, e.ch = 0)
    }
    function Wi(e, t, n, r) {
        for (var i = 0; i < e.length; ++i) {
            var o = e[i],
                a = !0;
            if (o.ranges) {
                o.copied || ((o = e[i] = o.deepCopy()).copied = !0);
                for (var l = 0; l < o.ranges.length; l++) _i(o.ranges[l].anchor, t, n, r), _i(o.ranges[l].head, t, n, r)
            } else {
                for (var s = 0; s < o.changes.length; ++s) {
                    var c = o.changes[s];
                    if (n < c.from.line) c.from = j(c.from.line + r, c.from.ch), c.to = j(c.to.line + r, c.to.ch);
                    else if (t <= c.to.line) {
                        a = !1;
                        break
                    }
                }
                a || (e.splice(0, i + 1), i = 0)
            }
        }
    }
    function Ri(e, t) {
        var n = t.from.line,
            r = t.to.line,
            i = t.text.length - (r - n) - 1;
        Wi(e.done, n, r, i), Wi(e.undone, n, r, i)
    }
    function Hi(e, t, n, r) {
        var i = t,
            o = t;
        return "number" == typeof t ? o = M(e, H(e, t)) : i = N(t), null == i ? null : (r(o, i) && e.cm && br(e.cm, i, n), o)
    }
    function Bi(e) {
        var t = this;
        this.lines = e, this.parent = null;
        for (var n = 0, r = 0; r < e.length; ++r) e[r].parent = t, n += e[r].height;
        this.height = n
    }
    function qi(e) {
        var t = this;
        this.children = e;
        for (var n = 0, r = 0, i = 0; i < e.length; ++i) {
            var o = e[i];
            n += o.chunkSize(), r += o.height, o.parent = t
        }
        this.size = n, this.height = r, this.parent = null
    }
    function Ui(e, t, n) {
        be(t) < (e.curOp && e.curOp.scrollTop || e.doc.scrollTop) && Vn(e, n)
    }
    function $i(e, t, n, r) {
        var i = new jl(e, n, r),
            o = e.cm;
        return o && i.noHScroll && (o.display.alignWidgets = !0), Hi(e, t, "widget", function(t) {
            var n = t.widgets || (t.widgets = []);
            if (null == i.insertAt ? n.push(i) : n.splice(Math.min(n.length - 1, Math.max(0, i.insertAt)), 0, i), i.line = t, o && !ve(e, t)) {
                var r = be(t) < e.scrollTop;
                O(t, t.height + jt(i)), r && Vn(o, i.height), o.curOp.forceUpdate = !0
            }
            return !0
        }), o && kt(o, "lineWidgetAdded", o, i, "number" == typeof t ? t : N(t)), i
    }
    function Ki(e, t, n, r, o) {
        if (r && r.shared) return Vi(e, t, n, r, o);
        if (e.cm && !e.cm.curOp) return mr(e.cm, Ki)(e, t, n, r, o);
        var a = new Dl(e, o),
            l = I(t, n);
        if (r && u(r, a, !1), l > 0 || 0 == l && !1 !== a.clearWhenEmpty) return a;
        if (a.replacedWith && (a.collapsed = !0, a.widgetNode = i("span", [a.replacedWith], "CodeMirror-widget"), r.handleMouseEvents || a.widgetNode.setAttribute("cm-ignore-events", "true"), r.insertLeft && (a.widgetNode.insertLeft = !0)), a.collapsed) {
            if (fe(e, t.line, t, n, a) || t.line != n.line && fe(e, n.line, t, n, a)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
            K()
        }
        a.addToHistory && oi(e, {
            from: t,
            to: n,
            origin: "markText"
        }, e.sel, NaN);
        var s, c = t.line,
            f = e.cm;
        if (e.iter(c, n.line + 1, function(e) {
                f && a.collapsed && !f.options.lineWrapping && de(e) == f.display.maxLine && (s = !0), a.collapsed && c != t.line && O(e, 0), Y(e, new V(a, c == t.line ? t.ch : null, c == n.line ? n.ch : null)), ++c
            }), a.collapsed && e.iter(t.line, n.line + 1, function(t) {
                ve(e, t) && O(t, 0)
            }), a.clearOnEnter && al(a, "beforeCursorEnter", function() {
                return a.clear()
            }), a.readOnly && ($(), (e.history.done.length || e.history.undone.length) && e.clearHistory()), a.collapsed && (a.id = ++Il, a.atomic = !0), f) {
            if (s && (f.curOp.updateMaxLine = !0), a.collapsed) yr(f, t.line, n.line + 1);
            else if (a.className || a.title || a.startStyle || a.endStyle || a.css)
                for (var d = t.line; d <= n.line; d++) br(f, d, "text");
            a.atomic && Si(f.doc), kt(f, "markerAdded", f, a)
        }
        return a
    }
    function Vi(e, t, n, r, i) {
        (r = u(r)).shared = !1;
        var o = [Ki(e, t, n, r, i)],
            a = o[0],
            l = r.widgetNode;
        return Zr(e, function(e) {
            l && (r.widgetNode = l.cloneNode(!0)), o.push(Ki(e, B(e, t), B(e, n), r, i));
            for (var s = 0; s < e.linked.length; ++s)
                if (e.linked[s].isParent) return;
            a = m(o)
        }), new _l(o, a)
    }
    function Gi(e) {
        return e.findMarks(j(e.first, 0), e.clipPos(j(e.lastLine())), function(e) {
            return e.parent
        })
    }
    function Xi(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n],
                i = r.find(),
                o = e.clipPos(i.from),
                a = e.clipPos(i.to);
            if (I(o, a)) {
                var l = Ki(e, o, a, r.primary, r.primary.type);
                r.markers.push(l), l.parent = r
            }
        }
    }
    function Yi(e) {
        for (var t = function(t) {
                var n = e[t],
                    r = [n.primary.doc];
                Zr(n.primary.doc, function(e) {
                    return r.push(e)
                });
                for (var i = 0; i < n.markers.length; i++) {
                    var o = n.markers[i]; - 1 == d(r, o.doc) && (o.parent = null, n.markers.splice(i--, 1))
                }
            }, n = 0; n < e.length; n++) t(n)
    }
    function Zi(e) {
        var t = this;
        if (eo(t), !ze(t, e) && !It(t.display, e)) {
            Pe(e), wa && (Hl = +new Date);
            var n = Tn(t, e, !0),
                r = e.dataTransfer.files;
            if (n && !t.isReadOnly())
                if (r && r.length && window.FileReader && window.File)
                    for (var i = r.length, o = Array(i), a = 0, l = function(e, r) {
                            if (!t.options.allowDropFileTypes || -1 != d(t.options.allowDropFileTypes, e.type)) {
                                var l = new FileReader;
                                l.onload = mr(t, function() {
                                    var e = l.result;
                                    if (/[\x00-\x08\x0e-\x1f]{2}/.test(e) && (e = ""), o[r] = e, ++a == i) {
                                        var s = {
                                            from: n = B(t.doc, n),
                                            to: n,
                                            text: t.doc.splitLines(o.join(t.doc.lineSeparator())),
                                            origin: "paste"
                                        };
                                        Ni(t.doc, s), xi(t.doc, Hr(n, Br(s)))
                                    }
                                }), l.readAsText(e)
                            }
                        }, s = 0; s < i; ++s) l(r[s], s);
                else {
                    if (t.state.draggingText && t.doc.sel.contains(n) > -1) return t.state.draggingText(e), void setTimeout(function() {
                        return t.display.input.focus()
                    }, 20);
                    try {
                        var c = e.dataTransfer.getData("Text");
                        if (c) {
                            var u;
                            if (t.state.draggingText && !t.state.draggingText.copy && (u = t.listSelections()), wi(t.doc, Hr(n, n)), u)
                                for (var f = 0; f < u.length; ++f) Di(t.doc, "", u[f].anchor, u[f].head, "drag");
                            t.replaceSelection(c, "around", "paste"), t.display.input.focus()
                        }
                    } catch (e) {}
                }
        }
    }
    function Qi(e, t) {
        if (wa && (!e.state.draggingText || +new Date - Hl < 100)) je(t);
        else if (!ze(e, t) && !It(e.display, t) && (t.dataTransfer.setData("Text", e.getSelection()), t.dataTransfer.effectAllowed = "copyMove", t.dataTransfer.setDragImage && !za)) {
            var n = r("img", null, null, "position: fixed; left: 0; top: 0;");
            n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", Ma && (n.width = n.height = 1, e.display.wrapper.appendChild(n), n._top = n.offsetTop), t.dataTransfer.setDragImage(n, 0, 0), Ma && n.parentNode.removeChild(n)
        }
    }
    function Ji(e, t) {
        var i = Tn(e, t);
        if (i) {
            var o = document.createDocumentFragment();
            On(e, i, o), e.display.dragCursor || (e.display.dragCursor = r("div", null, "CodeMirror-cursors CodeMirror-dragcursors"), e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)), n(e.display.dragCursor, o)
        }
    }
    function eo(e) {
        e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), e.display.dragCursor = null)
    }
    function to(e) {
        if (document.getElementsByClassName)
            for (var t = document.getElementsByClassName("CodeMirror"), n = 0; n < t.length; n++) {
                var r = t[n].CodeMirror;
                r && e(r)
            }
    }
    function no() {
        Bl || (ro(), Bl = !0)
    }
    function ro() {
        var e;
        al(window, "resize", function() {
            null == e && (e = setTimeout(function() {
                e = null, to(io)
            }, 100))
        }), al(window, "blur", function() {
            return to(Dn)
        })
    }
    function io(e) {
        var t = e.display;
        t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null, t.scrollbarsClipped = !1, e.setSize()
    }
    function oo(e) {
        var t, n, r, i, o = e.split(/-(?!$)/);
        e = o[o.length - 1];
        for (var a = 0; a < o.length - 1; a++) {
            var l = o[a];
            if (/^(cmd|meta|m)$/i.test(l)) i = !0;
            else if (/^a(lt)?$/i.test(l)) t = !0;
            else if (/^(c|ctrl|control)$/i.test(l)) n = !0;
            else {
                if (!/^s(hift)?$/i.test(l)) throw new Error("Unrecognized modifier name: " + l);
                r = !0
            }
        }
        return t && (e = "Alt-" + e), n && (e = "Ctrl-" + e), i && (e = "Cmd-" + e), r && (e = "Shift-" + e), e
    }
    function ao(e) {
        var t = {};
        for (var n in e)
            if (e.hasOwnProperty(n)) {
                var r = e[n];
                if (/^(name|fallthrough|(de|at)tach)$/.test(n)) continue;
                if ("..." == r) {
                    delete e[n];
                    continue
                }
                for (var i = g(n.split(" "), oo), o = 0; o < i.length; o++) {
                    var a = void 0,
                        l = void 0;
                    o == i.length - 1 ? (l = i.join(" "), a = r) : (l = i.slice(0, o + 1).join(" "), a = "...");
                    var s = t[l];
                    if (s) {
                        if (s != a) throw new Error("Inconsistent bindings for " + l)
                    } else t[l] = a
                }
                delete e[n]
            }
        for (var c in t) e[c] = t[c];
        return e
    }
    function lo(e, t, n, r) {
        var i = (t = fo(t)).call ? t.call(e, r) : t[e];
        if (!1 === i) return "nothing";
        if ("..." === i) return "multi";
        if (null != i && n(i)) return "handled";
        if (t.fallthrough) {
            if ("[object Array]" != Object.prototype.toString.call(t.fallthrough)) return lo(e, t.fallthrough, n, r);
            for (var o = 0; o < t.fallthrough.length; o++) {
                var a = lo(e, t.fallthrough[o], n, r);
                if (a) return a
            }
        }
    }
    function so(e) {
        var t = "string" == typeof e ? e : ql[e.keyCode];
        return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t
    }
    function co(e, t, n) {
        var r = e;
        return t.altKey && "Alt" != r && (e = "Alt-" + e), (Wa ? t.metaKey : t.ctrlKey) && "Ctrl" != r && (e = "Ctrl-" + e), (Wa ? t.ctrlKey : t.metaKey) && "Cmd" != r && (e = "Cmd-" + e), !n && t.shiftKey && "Shift" != r && (e = "Shift-" + e), e
    }
    function uo(e, t) {
        if (Ma && 34 == e.keyCode && e.char) return !1;
        var n = ql[e.keyCode];
        return null != n && !e.altGraphKey && (3 == e.keyCode && e.code && (n = e.code), co(n, e, t))
    }
    function fo(e) {
        return "string" == typeof e ? Vl[e] : e
    }
    function ho(e, t) {
        for (var n = e.doc.sel.ranges, r = [], i = 0; i < n.length; i++) {
            for (var o = t(n[i]); r.length && I(o.from, m(r).to) <= 0;) {
                var a = r.pop();
                if (I(a.from, o.from) < 0) {
                    o.from = a.from;
                    break
                }
            }
            r.push(o)
        }
        pr(e, function() {
            for (var t = r.length - 1; t >= 0; t--) Di(e.doc, "", r[t].from, r[t].to, "+delete");
            Gn(e)
        })
    }
    function po(e, t, n) {
        var r = S(e.text, t + n, n);
        return r < 0 || r > e.text.length ? null : r
    }
    function mo(e, t, n) {
        var r = po(e, t.ch, n);
        return null == r ? null : new j(t.line, r, n < 0 ? "after" : "before")
    }
    function go(e, t, n, r, i) {
        if (e) {
            var o = Se(n, t.doc.direction);
            if (o) {
                var a, l = i < 0 ? m(o) : o[0],
                    s = i < 0 == (1 == l.level) ? "after" : "before";
                if (l.level > 0 || "rtl" == t.doc.direction) {
                    var c = Gt(t, n);
                    a = i < 0 ? n.text.length - 1 : 0;
                    var u = Xt(t, c, a).top;
                    a = L(function(e) {
                        return Xt(t, c, e).top == u
                    }, i < 0 == (1 == l.level) ? l.from : l.to - 1, a), "before" == s && (a = po(n, a, 1))
                } else a = i < 0 ? l.to : l.from;
                return new j(r, a, s)
            }
        }
        return new j(r, i < 0 ? n.text.length : 0, i < 0 ? "before" : "after")
    }
    function vo(e, t, n, r) {
        var i = Se(t, e.doc.direction);
        if (!i) return mo(t, n, r);
        n.ch >= t.text.length ? (n.ch = t.text.length, n.sticky = "before") : n.ch <= 0 && (n.ch = 0, n.sticky = "after");
        var o = Ce(i, n.ch, n.sticky),
            a = i[o];
        if ("ltr" == e.doc.direction && a.level % 2 == 0 && (r > 0 ? a.to > n.ch : a.from < n.ch)) return mo(t, n, r);
        var l, s = function(e, n) {
                return po(t, e instanceof j ? e.ch : e, n)
            },
            c = function(n) {
                return e.options.lineWrapping ? (l = l || Gt(e, t), mn(e, t, l, n)) : {
                    begin: 0,
                    end: t.text.length
                }
            },
            u = c("before" == n.sticky ? s(n, -1) : n.ch);
        if ("rtl" == e.doc.direction || 1 == a.level) {
            var f = 1 == a.level == r < 0,
                d = s(n, f ? 1 : -1);
            if (null != d && (f ? d <= a.to && d <= u.end : d >= a.from && d >= u.begin)) {
                var h = f ? "before" : "after";
                return new j(n.line, d, h)
            }
        }
        var p = function(e, t, r) {
                for (var o = function(e, t) {
                        return t ? new j(n.line, s(e, 1), "before") : new j(n.line, e, "after")
                    }; e >= 0 && e < i.length; e += t) {
                    var a = i[e],
                        l = t > 0 == (1 != a.level),
                        c = l ? r.begin : s(r.end, -1);
                    if (a.from <= c && c < a.to) return o(c, l);
                    if (c = l ? a.from : s(a.to, -1), r.begin <= c && c < r.end) return o(c, l)
                }
            },
            m = p(o + r, r, u);
        if (m) return m;
        var g = r > 0 ? u.end : s(u.begin, -1);
        return null == g || r > 0 && g == t.text.length || !(m = p(r > 0 ? 0 : i.length - 1, r, c(g))) ? null : m
    }
    function yo(e, t) {
        var n = M(e.doc, t),
            r = de(n);
        return r != n && (t = N(r)), go(!0, e, r, t, 1)
    }
    function bo(e, t) {
        var n = M(e.doc, t),
            r = he(n);
        return r != n && (t = N(r)), go(!0, e, n, t, -1)
    }
    function xo(e, t) {
        var n = yo(e, t.line),
            r = M(e.doc, n.line),
            i = Se(r, e.doc.direction);
        if (!i || 0 == i[0].level) {
            var o = Math.max(0, r.text.search(/\S/)),
                a = t.line == n.line && t.ch <= o && t.ch;
            return j(n.line, a ? 0 : o, n.sticky)
        }
        return n
    }
    function ko(e, t, n) {
        if ("string" == typeof t && !(t = Yl[t])) return !1;
        e.display.input.ensurePolled();
        var r = e.display.shift,
            i = !1;
        try {
            e.isReadOnly() && (e.state.suppressEdits = !0), n && (e.display.shift = !1), i = t(e) != Ga
        } finally {
            e.display.shift = r, e.state.suppressEdits = !1
        }
        return i
    }
    function wo(e, t, n) {
        for (var r = 0; r < e.state.keyMaps.length; r++) {
            var i = lo(t, e.state.keyMaps[r], n, e);
            if (i) return i
        }
        return e.options.extraKeys && lo(t, e.options.extraKeys, n, e) || lo(t, e.options.keyMap, n, e)
    }
    function Co(e, t, n, r) {
        var i = e.state.keySeq;
        if (i) {
            if (so(t)) return "handled";
            if (/\'$/.test(t) ? e.state.keySeq = null : Zl.set(50, function() {
                    e.state.keySeq == i && (e.state.keySeq = null, e.display.input.reset())
                }), So(e, i + " " + t, n, r)) return !0
        }
        return So(e, t, n, r)
    }
    function So(e, t, n, r) {
        var i = wo(e, t, r);
        return "multi" == i && (e.state.keySeq = t), "handled" == i && kt(e, "keyHandled", e, t, n), "handled" != i && "multi" != i || (Pe(n), En(e)), !!i
    }
    function Lo(e, t) {
        var n = uo(t, !0);
        return !!n && (t.shiftKey && !e.state.keySeq ? Co(e, "Shift-" + n, t, function(t) {
            return ko(e, t, !0)
        }) || Co(e, n, t, function(t) {
            if ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) return ko(e, t)
        }) : Co(e, n, t, function(t) {
            return ko(e, t)
        }))
    }
    function To(e, t, n) {
        return Co(e, "'" + n + "'", t, function(t) {
            return ko(e, t, !0)
        })
    }
    function Mo(e) {
        var t = this;
        if (t.curOp.focus = a(), !ze(t, e)) {
            wa && Ca < 11 && 27 == e.keyCode && (e.returnValue = !1);
            var n = e.keyCode;
            t.display.shift = 16 == n || e.shiftKey;
            var r = Lo(t, e);
            Ma && (Ql = r ? n : null, !r && 88 == n && !ul && (Fa ? e.metaKey : e.ctrlKey) && t.replaceSelection("", null, "cut")), 18 != n || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) || zo(t)
        }
    }
    function zo(e) {
        function t(e) {
            18 != e.keyCode && e.altKey || (Ha(n, "CodeMirror-crosshair"), Te(document, "keyup", t), Te(document, "mouseover", t))
        }
        var n = e.display.lineDiv;
        l(n, "CodeMirror-crosshair"), al(document, "keyup", t), al(document, "mouseover", t)
    }
    function Ao(e) {
        16 == e.keyCode && (this.doc.sel.shift = !1), ze(this, e)
    }
    function Oo(e) {
        var t = this;
        if (!(It(t.display, e) || ze(t, e) || e.ctrlKey && !e.altKey || Fa && e.metaKey)) {
            var n = e.keyCode,
                r = e.charCode;
            if (Ma && n == Ql) return Ql = null, void Pe(e);
            if (!Ma || e.which && !(e.which < 10) || !Lo(t, e)) {
                var i = String.fromCharCode(null == r ? n : r);
                "\b" != i && (To(t, e, i) || t.display.input.onKeyPress(e))
            }
        }
    }
    function No(e, t) {
        var n = +new Date;
        return Xl && Xl.compare(n, e, t) ? (Gl = Xl = null, "triple") : Gl && Gl.compare(n, e, t) ? (Xl = new es(n, e, t), Gl = null, "double") : (Gl = new es(n, e, t), Xl = null, "single")
    }
    function Po(e) {
        var t = this,
            n = t.display;
        if (!(ze(t, e) || n.activeTouch && n.input.supportsTouch()))
            if (n.input.ensurePolled(), n.shift = e.shiftKey, It(n, e)) Sa || (n.scroller.draggable = !1, setTimeout(function() {
                return n.scroller.draggable = !0
            }, 100));
            else if (!Ho(t, e)) {
            var r = Tn(t, e),
                i = De(e),
                o = r ? No(r, i) : "single";
            window.focus(), 1 == i && t.state.selectingText && t.state.selectingText(e), r && Eo(t, i, r, o, e) || (1 == i ? r ? jo(t, r, o, e) : Ie(e) == n.scroller && Pe(e) : 2 == i ? (r && mi(t.doc, r), setTimeout(function() {
                return n.input.focus()
            }, 20)) : 3 == i && (Ra ? Bo(t, e) : jn(t)))
        }
    }
    function Eo(e, t, n, r, i) {
        var o = "Click";
        return "double" == r ? o = "Double" + o : "triple" == r && (o = "Triple" + o), Co(e, co(o = (1 == t ? "Left" : 2 == t ? "Middle" : "Right") + o, i), i, function(t) {
            if ("string" == typeof t && (t = Yl[t]), !t) return !1;
            var r = !1;
            try {
                e.isReadOnly() && (e.state.suppressEdits = !0), r = t(e, n) != Ga
            } finally {
                e.state.suppressEdits = !1
            }
            return r
        })
    }
    function Fo(e, t, n) {
        var r = e.getOption("configureMouse"),
            i = r ? r(e, t, n) : {};
        if (null == i.unit) {
            var o = ja ? n.shiftKey && n.metaKey : n.altKey;
            i.unit = o ? "rectangle" : "single" == t ? "char" : "double" == t ? "word" : "line"
        }
        return (null == i.extend || e.doc.extend) && (i.extend = e.doc.extend || n.shiftKey), null == i.addNew && (i.addNew = Fa ? n.metaKey : n.ctrlKey), null == i.moveOnDrag && (i.moveOnDrag = !(Fa ? n.altKey : n.ctrlKey)), i
    }
    function jo(e, t, n, r) {
        wa ? setTimeout(c(Fn, e), 0) : e.curOp.focus = a();
        var i, o = Fo(e, n, r),
            l = e.doc.sel;
        e.options.dragDrop && ll && !e.isReadOnly() && "single" == n && (i = l.contains(t)) > -1 && (I((i = l.ranges[i]).from(), t) < 0 || t.xRel > 0) && (I(i.to(), t) > 0 || t.xRel < 0) ? Io(e, r, t, o) : _o(e, r, t, o)
    }
    function Io(e, t, n, r) {
        var i = e.display,
            o = !1,
            a = mr(e, function(t) {
                Sa && (i.scroller.draggable = !1), e.state.draggingText = !1, Te(i.wrapper.ownerDocument, "mouseup", a), Te(i.wrapper.ownerDocument, "mousemove", l), Te(i.scroller, "dragstart", s), Te(i.scroller, "drop", a), o || (Pe(t), r.addNew || mi(e.doc, n, null, null, r.extend), Sa || wa && 9 == Ca ? setTimeout(function() {
                    i.wrapper.ownerDocument.body.focus(), i.input.focus()
                }, 20) : i.input.focus())
            }),
            l = function(e) {
                o = o || Math.abs(t.clientX - e.clientX) + Math.abs(t.clientY - e.clientY) >= 10
            },
            s = function() {
                return o = !0
            };
        Sa && (i.scroller.draggable = !0), e.state.draggingText = a, a.copy = !r.moveOnDrag, i.scroller.dragDrop && i.scroller.dragDrop(), al(i.wrapper.ownerDocument, "mouseup", a), al(i.wrapper.ownerDocument, "mousemove", l), al(i.scroller, "dragstart", s), al(i.scroller, "drop", a), jn(e), setTimeout(function() {
            return i.input.focus()
        }, 20)
    }
    function Do(e, t, n) {
        if ("char" == n) return new Fl(t, t);
        if ("word" == n) return e.findWordAt(t);
        if ("line" == n) return new Fl(j(t.line, 0), B(e.doc, j(t.line + 1, 0)));
        var r = n(e, t);
        return new Fl(r.from, r.to)
    }
    function _o(e, t, n, r) {
        function i(t) {
            if (0 != I(v, t))
                if (v = t, "rectangle" == r.unit) {
                    for (var i = [], o = e.options.tabSize, a = f(M(c, n.line).text, n.ch, o), l = f(M(c, t.line).text, t.ch, o), s = Math.min(a, l), m = Math.max(a, l), g = Math.min(n.line, t.line), y = Math.min(e.lastLine(), Math.max(n.line, t.line)); g <= y; g++) {
                        var b = M(c, g).text,
                            x = h(b, s, o);
                        s == m ? i.push(new Fl(j(g, x), j(g, x))) : b.length > x && i.push(new Fl(j(g, x), j(g, h(b, m, o))))
                    }
                    i.length || i.push(new Fl(n, n)), ki(c, Rr(p.ranges.slice(0, d).concat(i), d), {
                        origin: "*mouse",
                        scroll: !1
                    }), e.scrollIntoView(t)
                } else {
                    var k, w = u,
                        C = Do(e, t, r.unit),
                        S = w.anchor;
                    I(C.anchor, S) > 0 ? (k = C.head, S = R(w.from(), C.anchor)) : (k = C.anchor, S = W(w.to(), C.head));
                    var L = p.ranges.slice(0);
                    L[d] = Wo(e, new Fl(B(c, S), k)), ki(c, Rr(L, d), Ya)
                }
        }
        function o(t) {
            var n = ++b,
                l = Tn(e, t, !0, "rectangle" == r.unit);
            if (l)
                if (0 != I(l, v)) {
                    e.curOp.focus = a(), i(l);
                    var u = Rn(s, c);
                    (l.line >= u.to || l.line < u.from) && setTimeout(mr(e, function() {
                        b == n && o(t)
                    }), 150)
                } else {
                    var f = t.clientY < y.top ? -20 : t.clientY > y.bottom ? 20 : 0;
                    f && setTimeout(mr(e, function() {
                        b == n && (s.scroller.scrollTop += f, o(t))
                    }), 50)
                }
        }
        function l(t) {
            e.state.selectingText = !1, b = Infinity, Pe(t), s.input.focus(), Te(s.wrapper.ownerDocument, "mousemove", x), Te(s.wrapper.ownerDocument, "mouseup", k), c.history.lastSelOrigin = null
        }
        var s = e.display,
            c = e.doc;
        Pe(t);
        var u, d, p = c.sel,
            m = p.ranges;
        if (r.addNew && !r.extend ? (d = c.sel.contains(n), u = d > -1 ? m[d] : new Fl(n, n)) : (u = c.sel.primary(), d = c.sel.primIndex), "rectangle" == r.unit) r.addNew || (u = new Fl(n, n)), n = Tn(e, t, !0, !0), d = -1;
        else {
            var g = Do(e, n, r.unit);
            u = r.extend ? pi(u, g.anchor, g.head, r.extend) : g
        }
        r.addNew ? -1 == d ? (d = m.length, ki(c, Rr(m.concat([u]), d), {
            scroll: !1,
            origin: "*mouse"
        })) : m.length > 1 && m[d].empty() && "char" == r.unit && !r.extend ? (ki(c, Rr(m.slice(0, d).concat(m.slice(d + 1)), 0), {
            scroll: !1,
            origin: "*mouse"
        }), p = c.sel) : vi(c, d, u, Ya) : (d = 0, ki(c, new El([u], 0), Ya), p = c.sel);
        var v = n,
            y = s.wrapper.getBoundingClientRect(),
            b = 0,
            x = mr(e, function(e) {
                0 !== e.buttons && De(e) ? o(e) : l(e)
            }),
            k = mr(e, l);
        e.state.selectingText = k, al(s.wrapper.ownerDocument, "mousemove", x), al(s.wrapper.ownerDocument, "mouseup", k)
    }
    function Wo(e, t) {
        var n = t.anchor,
            r = t.head,
            i = M(e.doc, n.line);
        if (0 == I(n, r) && n.sticky == r.sticky) return t;
        var o = Se(i);
        if (!o) return t;
        var a = Ce(o, n.ch, n.sticky),
            l = o[a];
        if (l.from != n.ch && l.to != n.ch) return t;
        var s, c = a + (l.from == n.ch == (1 != l.level) ? 0 : 1);
        if (0 == c || c == o.length) return t;
        if (r.line != n.line) s = (r.line - n.line) * ("ltr" == e.doc.direction ? 1 : -1) > 0;
        else {
            var u = Ce(o, r.ch, r.sticky),
                f = u - a || (r.ch - n.ch) * (1 == l.level ? -1 : 1);
            s = u == c - 1 || u == c ? f < 0 : f > 0
        }
        var d = o[c + (s ? -1 : 0)],
            h = s == (1 == d.level),
            p = h ? d.from : d.to,
            m = h ? "after" : "before";
        return n.ch == p && n.sticky == m ? t : new Fl(new j(n.line, p, m), r)
    }
    function Ro(e, t, n, r) {
        var i, o;
        if (t.touches) i = t.touches[0].clientX, o = t.touches[0].clientY;
        else try {
            i = t.clientX, o = t.clientY
        } catch (t) {
            return !1
        }
        if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1;
        r && Pe(t);
        var a = e.display,
            l = a.lineDiv.getBoundingClientRect();
        if (o > l.bottom || !Oe(e, n)) return Fe(t);
        o -= l.top - a.viewOffset;
        for (var s = 0; s < e.options.gutters.length; ++s) {
            var c = a.gutters.childNodes[s];
            if (c && c.getBoundingClientRect().right >= i) return Me(e, n, e, P(e.doc, o), e.options.gutters[s], t), Fe(t)
        }
    }
    function Ho(e, t) {
        return Ro(e, t, "gutterClick", !0)
    }
    function Bo(e, t) {
        It(e.display, t) || qo(e, t) || ze(e, t, "contextmenu") || e.display.input.onContextMenu(t)
    }
    function qo(e, t) {
        return !!Oe(e, "gutterContextMenu") && Ro(e, t, "gutterContextMenu", !1)
    }
    function Uo(e) {
        e.display.wrapper.className = e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-"), nn(e)
    }
    function $o(e) {
        function t(t, r, i, o) {
            e.defaults[t] = r, i && (n[t] = o ? function(e, t, n) {
                n != ts && i(e, t, n)
            } : i)
        }
        var n = e.optionHandlers;
        e.defineOption = t, e.Init = ts, t("value", "", function(e, t) {
            return e.setValue(t)
        }, !0), t("mode", null, function(e, t) {
            e.doc.modeOption = t, Vr(e)
        }, !0), t("indentUnit", 2, Vr, !0), t("indentWithTabs", !1), t("smartIndent", !0), t("tabSize", 4, function(e) {
            Gr(e), nn(e), yr(e)
        }, !0), t("lineSeparator", null, function(e, t) {
            if (e.doc.lineSep = t, t) {
                var n = [],
                    r = e.doc.first;
                e.doc.iter(function(e) {
                    for (var i = 0;;) {
                        var o = e.text.indexOf(t, i);
                        if (-1 == o) break;
                        i = o + t.length, n.push(j(r, o))
                    }
                    r++
                });
                for (var i = n.length - 1; i >= 0; i--) Di(e.doc, t, n[i], j(n[i].line, n[i].ch + t.length))
            }
        }), t("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff]/g, function(e, t, n) {
            e.state.specialChars = new RegExp(t.source + (t.test("\t") ? "" : "|\t"), "g"), n != ts && e.refresh()
        }), t("specialCharPlaceholder", ut, function(e) {
            return e.refresh()
        }, !0), t("electricChars", !0), t("inputStyle", Ea ? "contenteditable" : "textarea", function() {
            throw new Error("inputStyle can not (yet) be changed in a running editor")
        }, !0), t("spellcheck", !1, function(e, t) {
            return e.getInputField().spellcheck = t
        }, !0), t("rtlMoveVisually", !Ia), t("wholeLineUpdateBefore", !0), t("theme", "default", function(e) {
            Uo(e), Ko(e)
        }, !0), t("keyMap", "default", function(e, t, n) {
            var r = fo(t),
                i = n != ts && fo(n);
            i && i.detach && i.detach(e, r), r.attach && r.attach(e, i || null)
        }), t("extraKeys", null), t("configureMouse", null), t("lineWrapping", !1, Go, !0), t("gutters", [], function(e) {
            Ir(e.options), Ko(e)
        }, !0), t("fixedGutter", !0, function(e, t) {
            e.display.gutters.style.left = t ? Cn(e.display) + "px" : "0", e.refresh()
        }, !0), t("coverGutterNextToScrollbar", !1, function(e) {
            return rr(e)
        }, !0), t("scrollbarStyle", "native", function(e) {
            or(e), rr(e), e.display.scrollbars.setScrollTop(e.doc.scrollTop), e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)
        }, !0), t("lineNumbers", !1, function(e) {
            Ir(e.options), Ko(e)
        }, !0), t("firstLineNumber", 1, Ko, !0), t("lineNumberFormatter", function(e) {
            return e
        }, Ko, !0), t("showCursorWhenSelecting", !1, zn, !0), t("resetSelectionOnContextMenu", !0), t("lineWiseCopyCut", !0), t("pasteLinesPerSelection", !0), t("readOnly", !1, function(e, t) {
            "nocursor" == t && (Dn(e), e.display.input.blur()), e.display.input.readOnlyChanged(t)
        }), t("disableInput", !1, function(e, t) {
            t || e.display.input.reset()
        }, !0), t("dragDrop", !0, Vo), t("allowDropFileTypes", null), t("cursorBlinkRate", 530), t("cursorScrollMargin", 0), t("cursorHeight", 1, zn, !0), t("singleCursorHeightPerLine", !0, zn, !0), t("workTime", 100), t("workDelay", 100), t("flattenSpans", !0, Gr, !0), t("addModeClass", !1, Gr, !0), t("pollInterval", 100), t("undoDepth", 200, function(e, t) {
            return e.doc.history.undoDepth = t
        }), t("historyEventDelay", 1250), t("viewportMargin", 10, function(e) {
            return e.refresh()
        }, !0), t("maxHighlightLength", 1e4, Gr, !0), t("moveInputWithCursor", !0, function(e, t) {
            t || e.display.input.resetPosition()
        }), t("tabindex", null, function(e, t) {
            return e.display.input.getField().tabIndex = t || ""
        }), t("autofocus", null), t("direction", "ltr", function(e, t) {
            return e.doc.setDirection(t)
        }, !0), t("phrases", null)
    }
    function Ko(e) {
        jr(e), yr(e), Hn(e)
    }
    function Vo(e, t, n) {
        if (!t != !(n && n != ts)) {
            var r = e.display.dragFunctions,
                i = t ? al : Te;
            i(e.display.scroller, "dragstart", r.start), i(e.display.scroller, "dragenter", r.enter), i(e.display.scroller, "dragover", r.over), i(e.display.scroller, "dragleave", r.leave), i(e.display.scroller, "drop", r.drop)
        }
    }
    function Go(e) {
        e.options.lineWrapping ? (l(e.display.wrapper, "CodeMirror-wrap"), e.display.sizer.style.minWidth = "", e.display.sizerWidth = null) : (Ha(e.display.wrapper, "CodeMirror-wrap"), ke(e)), Ln(e), yr(e), nn(e), setTimeout(function() {
            return rr(e)
        }, 100)
    }
    function Xo(e, t) {
        var n = this;
        if (!(this instanceof Xo)) return new Xo(e, t);
        this.options = t = t ? u(t) : {}, u(ns, t, !1), Ir(t);
        var r = t.value;
        "string" == typeof r ? r = new Rl(r, t.mode, null, t.lineSeparator, t.direction) : t.mode && (r.modeOption = t.mode), this.doc = r;
        var i = new Xo.inputStyles[t.inputStyle](this),
            o = this.display = new T(e, r, i);
        for (var a in o.wrapper.CodeMirror = this, jr(this), Uo(this), t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"), or(this), this.state = {
                keyMaps: [],
                overlays: [],
                modeGen: 0,
                overwrite: !1,
                delayingBlurEvent: !1,
                focused: !1,
                suppressEdits: !1,
                pasteIncoming: !1,
                cutIncoming: !1,
                selectingText: !1,
                draggingText: !1,
                highlight: new qa,
                keySeq: null,
                specialChars: null
            }, t.autofocus && !Ea && o.input.focus(), wa && Ca < 11 && setTimeout(function() {
                return n.display.input.reset(!0)
            }, 20), Yo(this), no(), ar(this), this.curOp.forceUpdate = !0, Qr(this, r), t.autofocus && !Ea || this.hasFocus() ? setTimeout(c(In, this), 20) : Dn(this), rs) rs.hasOwnProperty(a) && rs[a](n, t[a], ts);
        Bn(this), t.finishInit && t.finishInit(this);
        for (var l = 0; l < is.length; ++l) is[l](n);
        lr(this), Sa && t.lineWrapping && "optimizelegibility" == getComputedStyle(o.lineDiv).textRendering && (o.lineDiv.style.textRendering = "auto")
    }
    function Yo(e) {
        function t() {
            i.activeTouch && (o = setTimeout(function() {
                return i.activeTouch = null
            }, 1e3), (a = i.activeTouch).end = +new Date)
        }
        function n(e) {
            if (1 != e.touches.length) return !1;
            var t = e.touches[0];
            return t.radiusX <= 1 && t.radiusY <= 1
        }
        function r(e, t) {
            if (null == t.left) return !0;
            var n = t.left - e.left,
                r = t.top - e.top;
            return n * n + r * r > 400
        }
        var i = e.display;
        al(i.scroller, "mousedown", mr(e, Po)), al(i.scroller, "dblclick", wa && Ca < 11 ? mr(e, function(t) {
            if (!ze(e, t)) {
                var n = Tn(e, t);
                if (n && !Ho(e, t) && !It(e.display, t)) {
                    Pe(t);
                    var r = e.findWordAt(n);
                    mi(e.doc, r.anchor, r.head)
                }
            }
        }) : function(t) {
            return ze(e, t) || Pe(t)
        }), Ra || al(i.scroller, "contextmenu", function(t) {
            return Bo(e, t)
        });
        var o, a = {
            end: 0
        };
        al(i.scroller, "touchstart", function(t) {
            if (!ze(e, t) && !n(t) && !Ho(e, t)) {
                i.input.ensurePolled(), clearTimeout(o);
                var r = +new Date;
                i.activeTouch = {
                    start: r,
                    moved: !1,
                    prev: r - a.end <= 300 ? a : null
                }, 1 == t.touches.length && (i.activeTouch.left = t.touches[0].pageX, i.activeTouch.top = t.touches[0].pageY)
            }
        }), al(i.scroller, "touchmove", function() {
            i.activeTouch && (i.activeTouch.moved = !0)
        }), al(i.scroller, "touchend", function(n) {
            var o = i.activeTouch;
            if (o && !It(i, n) && null != o.left && !o.moved && new Date - o.start < 300) {
                var a, l = e.coordsChar(i.activeTouch, "page");
                a = !o.prev || r(o, o.prev) ? new Fl(l, l) : !o.prev.prev || r(o, o.prev.prev) ? e.findWordAt(l) : new Fl(j(l.line, 0), B(e.doc, j(l.line + 1, 0))), e.setSelection(a.anchor, a.head), e.focus(), Pe(n)
            }
            t()
        }), al(i.scroller, "touchcancel", t), al(i.scroller, "scroll", function() {
            i.scroller.clientHeight && (Jn(e, i.scroller.scrollTop), tr(e, i.scroller.scrollLeft, !0), Me(e, "scroll", e))
        }), al(i.scroller, "mousewheel", function(t) {
            return Wr(e, t)
        }), al(i.scroller, "DOMMouseScroll", function(t) {
            return Wr(e, t)
        }), al(i.wrapper, "scroll", function() {
            return i.wrapper.scrollTop = i.wrapper.scrollLeft = 0
        }), i.dragFunctions = {
            enter: function(t) {
                ze(e, t) || je(t)
            },
            over: function(t) {
                ze(e, t) || (Ji(e, t), je(t))
            },
            start: function(t) {
                return Qi(e, t)
            },
            drop: mr(e, Zi),
            leave: function(t) {
                ze(e, t) || eo(e)
            }
        };
        var l = i.input.getField();
        al(l, "keyup", function(t) {
            return Ao.call(e, t)
        }), al(l, "keydown", mr(e, Mo)), al(l, "keypress", mr(e, Oo)), al(l, "focus", function(t) {
            return In(e, t)
        }), al(l, "blur", function(t) {
            return Dn(e, t)
        })
    }
    function Zo(e, t, n, r) {
        var i, o = e.doc;
        null == n && (n = "add"), "smart" == n && (o.mode.indent ? i = Ze(e, t).state : n = "prev");
        var a = e.options.tabSize,
            l = M(o, t),
            s = f(l.text, null, a);
        l.stateAfter && (l.stateAfter = null);
        var c, u = l.text.match(/^\s*/)[0];
        if (r || /\S/.test(l.text)) {
            if ("smart" == n && ((c = o.mode.indent(i, l.text.slice(u.length), l.text)) == Ga || c > 150)) {
                if (!r) return;
                n = "prev"
            }
        } else c = 0, n = "not";
        "prev" == n ? c = t > o.first ? f(M(o, t - 1).text, null, a) : 0 : "add" == n ? c = s + e.options.indentUnit : "subtract" == n ? c = s - e.options.indentUnit : "number" == typeof n && (c = s + n), c = Math.max(0, c);
        var d = "",
            h = 0;
        if (e.options.indentWithTabs)
            for (var m = Math.floor(c / a); m; --m) h += a, d += "\t";
        if (h < c && (d += p(c - h)), d != u) return Di(o, d, j(t, 0), j(t, u.length), "+input"), l.stateAfter = null, !0;
        for (var g = 0; g < o.sel.ranges.length; g++) {
            var v = o.sel.ranges[g];
            if (v.head.line == t && v.head.ch < u.length) {
                var y = j(t, u.length);
                vi(o, g, new Fl(y, y));
                break
            }
        }
    }
    function Qo(e) {
        os = e
    }
    function Jo(e, t, n, r, i) {
        var o = e.doc;
        e.display.shift = !1, r || (r = o.sel);
        var a, l = e.state.pasteIncoming || "paste" == i,
            s = sl(t),
            c = null;
        if (l && r.ranges.length > 1)
            if (os && os.text.join("\n") == t) {
                if (r.ranges.length % os.text.length == 0) {
                    c = [];
                    for (var u = 0; u < os.text.length; u++) c.push(o.splitLines(os.text[u]))
                }
            } else s.length == r.ranges.length && e.options.pasteLinesPerSelection && (c = g(s, function(e) {
                return [e]
            }));
        for (var f = r.ranges.length - 1; f >= 0; f--) {
            var d = r.ranges[f],
                h = d.from(),
                p = d.to();
            d.empty() && (n && n > 0 ? h = j(h.line, h.ch - n) : e.state.overwrite && !l ? p = j(p.line, Math.min(M(o, p.line).text.length, p.ch + m(s).length)) : os && os.lineWise && os.text.join("\n") == t && (h = p = j(h.line, 0))), a = e.curOp.updateInput;
            var v = {
                from: h,
                to: p,
                text: c ? c[f % c.length] : s,
                origin: i || (l ? "paste" : e.state.cutIncoming ? "cut" : "+input")
            };
            Ni(e.doc, v), kt(e, "inputRead", e, v)
        }
        t && !l && ta(e, t), Gn(e), e.curOp.updateInput = a, e.curOp.typing = !0, e.state.pasteIncoming = e.state.cutIncoming = !1
    }
    function ea(e, t) {
        var n = e.clipboardData && e.clipboardData.getData("Text");
        if (n) return e.preventDefault(), t.isReadOnly() || t.options.disableInput || pr(t, function() {
            return Jo(t, n, 0, null, "paste")
        }), !0
    }
    function ta(e, t) {
        if (e.options.electricChars && e.options.smartIndent)
            for (var n = e.doc.sel, r = n.ranges.length - 1; r >= 0; r--) {
                var i = n.ranges[r];
                if (!(i.head.ch > 100 || r && n.ranges[r - 1].head.line == i.head.line)) {
                    var o = e.getModeAt(i.head),
                        a = !1;
                    if (o.electricChars) {
                        for (var l = 0; l < o.electricChars.length; l++)
                            if (t.indexOf(o.electricChars.charAt(l)) > -1) {
                                a = Zo(e, i.head.line, "smart");
                                break
                            }
                    } else o.electricInput && o.electricInput.test(M(e.doc, i.head.line).text.slice(0, i.head.ch)) && (a = Zo(e, i.head.line, "smart"));
                    a && kt(e, "electricInput", e, i.head.line)
                }
            }
    }
    function na(e) {
        for (var t = [], n = [], r = 0; r < e.doc.sel.ranges.length; r++) {
            var i = e.doc.sel.ranges[r].head.line,
                o = {
                    anchor: j(i, 0),
                    head: j(i + 1, 0)
                };
            n.push(o), t.push(e.getRange(o.anchor, o.head))
        }
        return {
            text: t,
            ranges: n
        }
    }
    function ra(e, t) {
        e.setAttribute("autocorrect", "off"), e.setAttribute("autocapitalize", "off"), e.setAttribute("spellcheck", !!t)
    }
    function ia() {
        var e = r("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),
            t = r("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        return Sa ? e.style.width = "1000px" : e.setAttribute("wrap", "off"), Na && (e.style.border = "1px solid black"), ra(e), t
    }
    function oa(e) {
        var t = e.optionHandlers,
            n = e.helpers = {};
        e.prototype = {
            constructor: e,
            focus: function() {
                window.focus(), this.display.input.focus()
            },
            setOption: function(e, n) {
                var r = this.options,
                    i = r[e];
                r[e] == n && "mode" != e || (r[e] = n, t.hasOwnProperty(e) && mr(this, t[e])(this, n, i), Me(this, "optionChange", this, e))
            },
            getOption: function(e) {
                return this.options[e]
            },
            getDoc: function() {
                return this.doc
            },
            addKeyMap: function(e, t) {
                this.state.keyMaps[t ? "push" : "unshift"](fo(e))
            },
            removeKeyMap: function(e) {
                for (var t = this.state.keyMaps, n = 0; n < t.length; ++n)
                    if (t[n] == e || t[n].name == e) return t.splice(n, 1), !0
            },
            addOverlay: gr(function(t, n) {
                var r = t.token ? t : e.getMode(this.options, t);
                if (r.startState) throw new Error("Overlays may not be stateful.");
                v(this.state.overlays, {
                    mode: r,
                    modeSpec: t,
                    opaque: n && n.opaque,
                    priority: n && n.priority || 0
                }, function(e) {
                    return e.priority
                }), this.state.modeGen++, yr(this)
            }),
            removeOverlay: gr(function(e) {
                for (var t = this, n = this.state.overlays, r = 0; r < n.length; ++r) {
                    var i = n[r].modeSpec;
                    if (i == e || "string" == typeof e && i.name == e) return n.splice(r, 1), t.state.modeGen++, void yr(t)
                }
            }),
            indentLine: gr(function(e, t, n) {
                "string" != typeof t && "number" != typeof t && (t = null == t ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract"), E(this.doc, e) && Zo(this, e, t, n)
            }),
            indentSelection: gr(function(e) {
                for (var t = this, n = this.doc.sel.ranges, r = -1, i = 0; i < n.length; i++) {
                    var o = n[i];
                    if (o.empty()) o.head.line > r && (Zo(t, o.head.line, e, !0), r = o.head.line, i == t.doc.sel.primIndex && Gn(t));
                    else {
                        var a = o.from(),
                            l = o.to(),
                            s = Math.max(r, a.line);
                        r = Math.min(t.lastLine(), l.line - (l.ch ? 0 : 1)) + 1;
                        for (var c = s; c < r; ++c) Zo(t, c, e);
                        var u = t.doc.sel.ranges;
                        0 == a.ch && n.length == u.length && u[i].from().ch > 0 && vi(t.doc, i, new Fl(a, u[i].to()), Xa)
                    }
                }
            }),
            getTokenAt: function(e, t) {
                return tt(this, e, t)
            },
            getLineTokens: function(e, t) {
                return tt(this, j(e), t, !0)
            },
            getTokenTypeAt: function(e) {
                e = B(this.doc, e);
                var t, n = Ye(this, M(this.doc, e.line)),
                    r = 0,
                    i = (n.length - 1) / 2,
                    o = e.ch;
                if (0 == o) t = n[2];
                else
                    for (;;) {
                        var a = r + i >> 1;
                        if ((a ? n[2 * a - 1] : 0) >= o) i = a;
                        else {
                            if (!(n[2 * a + 1] < o)) {
                                t = n[2 * a + 2];
                                break
                            }
                            r = a + 1
                        }
                    }
                var l = t ? t.indexOf("overlay ") : -1;
                return l < 0 ? t : 0 == l ? null : t.slice(0, l - 1)
            },
            getModeAt: function(t) {
                var n = this.doc.mode;
                return n.innerMode ? e.innerMode(n, this.getTokenAt(t).state).mode : n
            },
            getHelper: function(e, t) {
                return this.getHelpers(e, t)[0]
            },
            getHelpers: function(e, t) {
                var r = this,
                    i = [];
                if (!n.hasOwnProperty(t)) return i;
                var o = n[t],
                    a = this.getModeAt(e);
                if ("string" == typeof a[t]) o[a[t]] && i.push(o[a[t]]);
                else if (a[t])
                    for (var l = 0; l < a[t].length; l++) {
                        var s = o[a[t][l]];
                        s && i.push(s)
                    } else a.helperType && o[a.helperType] ? i.push(o[a.helperType]) : o[a.name] && i.push(o[a.name]);
                for (var c = 0; c < o._global.length; c++) {
                    var u = o._global[c];
                    u.pred(a, r) && -1 == d(i, u.val) && i.push(u.val)
                }
                return i
            },
            getStateAfter: function(e, t) {
                var n = this.doc;
                return Ze(this, (e = H(n, null == e ? n.first + n.size - 1 : e)) + 1, t).state
            },
            cursorCoords: function(e, t) {
                var n = this.doc.sel.primary();
                return un(this, null == e ? n.head : "object" == typeof e ? B(this.doc, e) : e ? n.from() : n.to(), t || "page")
            },
            charCoords: function(e, t) {
                return cn(this, B(this.doc, e), t || "page")
            },
            coordsChar: function(e, t) {
                return hn(this, (e = sn(this, e, t || "page")).left, e.top)
            },
            lineAtHeight: function(e, t) {
                return e = sn(this, {
                    top: e,
                    left: 0
                }, t || "page").top, P(this.doc, e + this.display.viewOffset)
            },
            heightAtLine: function(e, t, n) {
                var r, i = !1;
                if ("number" == typeof e) {
                    var o = this.doc.first + this.doc.size - 1;
                    e < this.doc.first ? e = this.doc.first : e > o && (e = o, i = !0), r = M(this.doc, e)
                } else r = e;
                return ln(this, r, {
                    top: 0,
                    left: 0
                }, t || "page", n || i).top + (i ? this.doc.height - be(r) : 0)
            },
            defaultTextHeight: function() {
                return xn(this.display)
            },
            defaultCharWidth: function() {
                return kn(this.display)
            },
            getViewport: function() {
                return {
                    from: this.display.viewFrom,
                    to: this.display.viewTo
                }
            },
            addWidget: function(e, t, n, r, i) {
                var o = this.display,
                    a = (e = un(this, B(this.doc, e))).bottom,
                    l = e.left;
                if (t.style.position = "absolute", t.setAttribute("cm-ignore-events", "true"), this.display.input.setUneditable(t), o.sizer.appendChild(t), "over" == r) a = e.top;
                else if ("above" == r || "near" == r) {
                    var s = Math.max(o.wrapper.clientHeight, this.doc.height),
                        c = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);
                    ("above" == r || e.bottom + t.offsetHeight > s) && e.top > t.offsetHeight ? a = e.top - t.offsetHeight : e.bottom + t.offsetHeight <= s && (a = e.bottom), l + t.offsetWidth > c && (l = c - t.offsetWidth)
                }
                t.style.top = a + "px", t.style.left = t.style.right = "", "right" == i ? (l = o.sizer.clientWidth - t.offsetWidth, t.style.right = "0px") : ("left" == i ? l = 0 : "middle" == i && (l = (o.sizer.clientWidth - t.offsetWidth) / 2), t.style.left = l + "px"), n && $n(this, {
                    left: l,
                    top: a,
                    right: l + t.offsetWidth,
                    bottom: a + t.offsetHeight
                })
            },
            triggerOnKeyDown: gr(Mo),
            triggerOnKeyPress: gr(Oo),
            triggerOnKeyUp: Ao,
            triggerOnMouseDown: gr(Po),
            execCommand: function(e) {
                if (Yl.hasOwnProperty(e)) return Yl[e].call(null, this)
            },
            triggerElectric: gr(function(e) {
                ta(this, e)
            }),
            findPosH: function(e, t, n, r) {
                var i = this,
                    o = 1;
                t < 0 && (o = -1, t = -t);
                for (var a = B(this.doc, e), l = 0; l < t && !(a = aa(i.doc, a, o, n, r)).hitSide; ++l);
                return a
            },
            moveH: gr(function(e, t) {
                var n = this;
                this.extendSelectionsBy(function(r) {
                    return n.display.shift || n.doc.extend || r.empty() ? aa(n.doc, r.head, e, t, n.options.rtlMoveVisually) : e < 0 ? r.from() : r.to()
                }, Za)
            }),
            deleteH: gr(function(e, t) {
                var n = this.doc.sel,
                    r = this.doc;
                n.somethingSelected() ? r.replaceSelection("", null, "+delete") : ho(this, function(n) {
                    var i = aa(r, n.head, e, t, !1);
                    return e < 0 ? {
                        from: i,
                        to: n.head
                    } : {
                        from: n.head,
                        to: i
                    }
                })
            }),
            findPosV: function(e, t, n, r) {
                var i = this,
                    o = 1,
                    a = r;
                t < 0 && (o = -1, t = -t);
                for (var l = B(this.doc, e), s = 0; s < t; ++s) {
                    var c = un(i, l, "div");
                    if (null == a ? a = c.left : c.left = a, (l = la(i, c, o, n)).hitSide) break
                }
                return l
            },
            moveV: gr(function(e, t) {
                var n = this,
                    r = this.doc,
                    i = [],
                    o = !this.display.shift && !r.extend && r.sel.somethingSelected();
                if (r.extendSelectionsBy(function(a) {
                        if (o) return e < 0 ? a.from() : a.to();
                        var l = un(n, a.head, "div");
                        null != a.goalColumn && (l.left = a.goalColumn), i.push(l.left);
                        var s = la(n, l, e, t);
                        return "page" == t && a == r.sel.primary() && Vn(n, cn(n, s, "div").top - l.top), s
                    }, Za), i.length)
                    for (var a = 0; a < r.sel.ranges.length; a++) r.sel.ranges[a].goalColumn = i[a]
            }),
            findWordAt: function(e) {
                var t = M(this.doc, e.line).text,
                    n = e.ch,
                    r = e.ch;
                if (t) {
                    var i = this.getHelper(e, "wordChars");
                    "before" != e.sticky && r != t.length || !n ? ++r : --n;
                    for (var o = t.charAt(n), a = k(o, i) ? function(e) {
                            return k(e, i)
                        } : /\s/.test(o) ? function(e) {
                            return /\s/.test(e)
                        } : function(e) {
                            return !/\s/.test(e) && !k(e)
                        }; n > 0 && a(t.charAt(n - 1));) --n;
                    for (; r < t.length && a(t.charAt(r));) ++r
                }
                return new Fl(j(e.line, n), j(e.line, r))
            },
            toggleOverwrite: function(e) {
                null != e && e == this.state.overwrite || ((this.state.overwrite = !this.state.overwrite) ? l(this.display.cursorDiv, "CodeMirror-overwrite") : Ha(this.display.cursorDiv, "CodeMirror-overwrite"), Me(this, "overwriteToggle", this, this.state.overwrite))
            },
            hasFocus: function() {
                return this.display.input.getField() == a()
            },
            isReadOnly: function() {
                return !(!this.options.readOnly && !this.doc.cantEdit)
            },
            scrollTo: gr(function(e, t) {
                Xn(this, e, t)
            }),
            getScrollInfo: function() {
                var e = this.display.scroller;
                return {
                    left: e.scrollLeft,
                    top: e.scrollTop,
                    height: e.scrollHeight - Rt(this) - this.display.barHeight,
                    width: e.scrollWidth - Rt(this) - this.display.barWidth,
                    clientHeight: Bt(this),
                    clientWidth: Ht(this)
                }
            },
            scrollIntoView: gr(function(e, t) {
                null == e ? (e = {
                    from: this.doc.sel.primary().head,
                    to: null
                }, null == t && (t = this.options.cursorScrollMargin)) : "number" == typeof e ? e = {
                    from: j(e, 0),
                    to: null
                } : null == e.from && (e = {
                    from: e,
                    to: null
                }), e.to || (e.to = e.from), e.margin = t || 0, null != e.from.line ? Yn(this, e) : Qn(this, e.from, e.to, e.margin)
            }),
            setSize: gr(function(e, t) {
                var n = this,
                    r = function(e) {
                        return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e
                    };
                null != e && (this.display.wrapper.style.width = r(e)), null != t && (this.display.wrapper.style.height = r(t)), this.options.lineWrapping && tn(this);
                var i = this.display.viewFrom;
                this.doc.iter(i, this.display.viewTo, function(e) {
                    if (e.widgets)
                        for (var t = 0; t < e.widgets.length; t++)
                            if (e.widgets[t].noHScroll) {
                                br(n, i, "widget");
                                break
                            }++i
                }), this.curOp.forceUpdate = !0, Me(this, "refresh", this)
            }),
            operation: function(e) {
                return pr(this, e)
            },
            startOperation: function() {
                return ar(this)
            },
            endOperation: function() {
                return lr(this)
            },
            refresh: gr(function() {
                var e = this.display.cachedTextHeight;
                yr(this), this.curOp.forceUpdate = !0, nn(this), Xn(this, this.doc.scrollLeft, this.doc.scrollTop), Er(this), (null == e || Math.abs(e - xn(this.display)) > .5) && Ln(this), Me(this, "refresh", this)
            }),
            swapDoc: gr(function(e) {
                var t = this.doc;
                return t.cm = null, Qr(this, e), nn(this), this.display.input.reset(), Xn(this, e.scrollLeft, e.scrollTop), this.curOp.forceScroll = !0, kt(this, "swapDoc", this, t), t
            }),
            phrase: function(e) {
                var t = this.options.phrases;
                return t && Object.prototype.hasOwnProperty.call(t, e) ? t[e] : e
            },
            getInputField: function() {
                return this.display.input.getField()
            },
            getWrapperElement: function() {
                return this.display.wrapper
            },
            getScrollerElement: function() {
                return this.display.scroller
            },
            getGutterElement: function() {
                return this.display.gutters
            }
        }, Ne(e), e.registerHelper = function(t, r, i) {
            n.hasOwnProperty(t) || (n[t] = e[t] = {
                _global: []
            }), n[t][r] = i
        }, e.registerGlobalHelper = function(t, r, i, o) {
            e.registerHelper(t, r, o), n[t]._global.push({
                pred: i,
                val: o
            })
        }
    }
    function aa(e, t, n, r, i) {
        function o() {
            var r = t.line + n;
            return !(r < e.first || r >= e.first + e.size) && (t = new j(r, t.ch, t.sticky), c = M(e, r))
        }
        function a(r) {
            var a;
            if (null == (a = i ? vo(e.cm, c, t, n) : mo(c, t, n))) {
                if (r || !o()) return !1;
                t = go(i, e.cm, c, t.line, n)
            } else t = a;
            return !0
        }
        var l = t,
            s = n,
            c = M(e, t.line);
        if ("char" == r) a();
        else if ("column" == r) a(!0);
        else if ("word" == r || "group" == r)
            for (var u = null, f = "group" == r, d = e.cm && e.cm.getHelper(t, "wordChars"), h = !0; !(n < 0) || a(!h); h = !1) {
                var p = c.text.charAt(t.ch) || "\n",
                    m = k(p, d) ? "w" : f && "\n" == p ? "n" : !f || /\s/.test(p) ? null : "p";
                if (!f || h || m || (m = "s"), u && u != m) {
                    n < 0 && (n = 1, a(), t.sticky = "after");
                    break
                }
                if (m && (u = m), n > 0 && !a(!h)) break
            }
        var g = Mi(e, t, l, s, !0);
        return D(l, g) && (g.hitSide = !0), g
    }
    function la(e, t, n, r) {
        var i, o, a = e.doc,
            l = t.left;
        if ("page" == r) {
            var s = Math.min(e.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight),
                c = Math.max(s - .5 * xn(e.display), 3);
            i = (n > 0 ? t.bottom : t.top) + n * c
        } else "line" == r && (i = n > 0 ? t.bottom + 3 : t.top - 3);
        for (;
            (o = hn(e, l, i)).outside;) {
            if (n < 0 ? i <= 0 : i >= a.height) {
                o.hitSide = !0;
                break
            }
            i += 5 * n
        }
        return o
    }
    function sa(e, t) {
        var n = Vt(e, t.line);
        if (!n || n.hidden) return null;
        var r = M(e.doc, t.line),
            i = Ut(n, r, t.line),
            o = Se(r, e.doc.direction),
            a = "left";
        o && (a = Ce(o, t.ch) % 2 ? "right" : "left");
        var l = Yt(i.map, t.ch, a);
        return l.offset = "right" == l.collapse ? l.end : l.start, l
    }
    function ca(e) {
        for (var t = e; t; t = t.parentNode)
            if (/CodeMirror-gutter-wrapper/.test(t.className)) return !0;
        return !1
    }
    function ua(e, t) {
        return t && (e.bad = !0), e
    }
    function fa(e, t, n, r, i) {
        function o(e) {
            return function(t) {
                return t.id == e
            }
        }
        function a() {
            u && (c += f, d && (c += f), u = d = !1)
        }
        function l(e) {
            e && (a(), c += e)
        }
        function s(t) {
            if (1 == t.nodeType) {
                var n = t.getAttribute("cm-text");
                if (n) return void l(n);
                var c, h = t.getAttribute("cm-marker");
                if (h) {
                    var p = e.findMarks(j(r, 0), j(i + 1, 0), o(+h));
                    return void(p.length && (c = p[0].find(0)) && l(z(e.doc, c.from, c.to).join(f)))
                }
                if ("false" == t.getAttribute("contenteditable")) return;
                var m = /^(pre|div|p|li|table|br)$/i.test(t.nodeName);
                if (!/^br$/i.test(t.nodeName) && 0 == t.textContent.length) return;
                m && a();
                for (var g = 0; g < t.childNodes.length; g++) s(t.childNodes[g]);
                /^(pre|p)$/i.test(t.nodeName) && (d = !0), m && (u = !0)
            } else 3 == t.nodeType && l(t.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "))
        }
        for (var c = "", u = !1, f = e.doc.lineSeparator(), d = !1; s(t), t != n;) t = t.nextSibling, d = !1;
        return c
    }
    function da(e, t, n) {
        var r;
        if (t == e.display.lineDiv) {
            if (!(r = e.display.lineDiv.childNodes[n])) return ua(e.clipPos(j(e.display.viewTo - 1)), !0);
            t = null, n = 0
        } else
            for (r = t;; r = r.parentNode) {
                if (!r || r == e.display.lineDiv) return null;
                if (r.parentNode && r.parentNode == e.display.lineDiv) break
            }
        for (var i = 0; i < e.display.view.length; i++) {
            var o = e.display.view[i];
            if (o.node == r) return ha(o, t, n)
        }
    }
    function ha(e, t, n) {
        function r(t, n, r) {
            for (var i = -1; i < (f ? f.length : 0); i++)
                for (var o = i < 0 ? u.map : f[i], a = 0; a < o.length; a += 3) {
                    var l = o[a + 2];
                    if (l == t || l == n) {
                        var s = N(i < 0 ? e.line : e.rest[i]),
                            c = o[a] + r;
                        return (r < 0 || l != t) && (c = o[a + (r ? 1 : 0)]), j(s, c)
                    }
                }
        }
        var i = e.text.firstChild,
            a = !1;
        if (!t || !o(i, t)) return ua(j(N(e.line), 0), !0);
        if (t == i && (a = !0, t = i.childNodes[n], n = 0, !t)) {
            var l = e.rest ? m(e.rest) : e.line;
            return ua(j(N(l), l.text.length), a)
        }
        var s = 3 == t.nodeType ? t : null,
            c = t;
        for (s || 1 != t.childNodes.length || 3 != t.firstChild.nodeType || (s = t.firstChild, n && (n = s.nodeValue.length)); c.parentNode != i;) c = c.parentNode;
        var u = e.measure,
            f = u.maps,
            d = r(s, c, n);
        if (d) return ua(d, a);
        for (var h = c.nextSibling, p = s ? s.nodeValue.length - n : 0; h; h = h.nextSibling) {
            if (d = r(h, h.firstChild, 0)) return ua(j(d.line, d.ch - p), a);
            p += h.textContent.length
        }
        for (var g = c.previousSibling, v = n; g; g = g.previousSibling) {
            if (d = r(g, g.firstChild, -1)) return ua(j(d.line, d.ch + v), a);
            v += g.textContent.length
        }
    }
    function pa(e, t) {
        function n() {
            e.value = s.getValue()
        }
        if ((t = t ? u(t) : {}).value = e.value, !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex), !t.placeholder && e.placeholder && (t.placeholder = e.placeholder), null == t.autofocus) {
            var r = a();
            t.autofocus = r == e || null != e.getAttribute("autofocus") && r == document.body
        }
        var i;
        if (e.form && (al(e.form, "submit", n), !t.leaveSubmitMethodAlone)) {
            var o = e.form;
            i = o.submit;
            try {
                var l = o.submit = function() {
                    n(), o.submit = i, o.submit(), o.submit = l
                }
            } catch (Ka) {}
        }
        t.finishInit = function(t) {
            t.save = n, t.getTextArea = function() {
                return e
            }, t.toTextArea = function() {
                t.toTextArea = isNaN, n(), e.parentNode.removeChild(t.getWrapperElement()), e.style.display = "", e.form && (Te(e.form, "submit", n), "function" == typeof e.form.submit && (e.form.submit = i))
            }
        }, e.style.display = "none";
        var s = Xo(function(t) {
            return e.parentNode.insertBefore(t, e.nextSibling)
        }, t);
        return s
    }
    function ma(e) {
        e.off = Te, e.on = al, e.wheelEventPixels = _r, e.Doc = Rl, e.splitLines = sl, e.countColumn = f, e.findColumn = h, e.isWordChar = x, e.Pass = Ga, e.signal = Me, e.Line = bl, e.changeEnd = Br, e.scrollbarModel = zl, e.Pos = j, e.cmpPos = I, e.modes = dl, e.mimeModes = hl, e.resolveMode = qe, e.getMode = Ue, e.modeExtensions = pl, e.extendMode = $e, e.copyState = Ke, e.startState = Ge, e.innerMode = Ve, e.commands = Yl, e.keyMap = Vl, e.keyName = uo, e.isModifierKey = so, e.lookupKey = lo, e.normalizeKeyMap = ao, e.StringStream = ml, e.SharedTextMarker = _l, e.TextMarker = Dl, e.LineWidget = jl, e.e_preventDefault = Pe, e.e_stopPropagation = Ee, e.e_stop = je, e.addClass = l, e.contains = o, e.rmClass = Ha, e.keyNames = ql
    }
    var ga = navigator.userAgent,
        va = navigator.platform,
        ya = /gecko\/\d/i.test(ga),
        ba = /MSIE \d/.test(ga),
        xa = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(ga),
        ka = /Edge\/(\d+)/.exec(ga),
        wa = ba || xa || ka,
        Ca = wa && (ba ? document.documentMode || 6 : +(ka || xa)[1]),
        Sa = !ka && /WebKit\//.test(ga),
        La = Sa && /Qt\/\d+\.\d+/.test(ga),
        Ta = !ka && /Chrome\//.test(ga),
        Ma = /Opera\//.test(ga),
        za = /Apple Computer/.test(navigator.vendor),
        Aa = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(ga),
        Oa = /PhantomJS/.test(ga),
        Na = !ka && /AppleWebKit/.test(ga) && /Mobile\/\w+/.test(ga),
        Pa = /Android/.test(ga),
        Ea = Na || Pa || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(ga),
        Fa = Na || /Mac/.test(va),
        ja = /\bCrOS\b/.test(ga),
        Ia = /win/i.test(va),
        Da = Ma && ga.match(/Version\/(\d*\.\d*)/);
    Da && (Da = Number(Da[1])), Da && Da >= 15 && (Ma = !1, Sa = !0);
    var _a, Wa = Fa && (La || Ma && (null == Da || Da < 12.11)),
        Ra = ya || wa && Ca >= 9,
        Ha = function(t, n) {
            var r = t.className,
                i = e(n).exec(r);
            if (i) {
                var o = r.slice(i.index + i[0].length);
                t.className = r.slice(0, i.index) + (o ? i[1] + o : "")
            }
        };
    _a = document.createRange ? function(e, t, n, r) {
        var i = document.createRange();
        return i.setEnd(r || e, n), i.setStart(e, t), i
    } : function(e, t, n) {
        var r = document.body.createTextRange();
        try {
            r.moveToElementText(e.parentNode)
        } catch (Ka) {
            return r
        }
        return r.collapse(!0), r.moveEnd("character", n), r.moveStart("character", t), r
    };
    var Ba = function(e) {
        e.select()
    };
    Na ? Ba = function(e) {
        e.selectionStart = 0, e.selectionEnd = e.value.length
    } : wa && (Ba = function(e) {
        try {
            e.select()
        } catch (t) {}
    });
    var qa = function() {
        this.id = null
    };
    qa.prototype.set = function(e, t) {
        clearTimeout(this.id), this.id = setTimeout(t, e)
    };
    var Ua, $a, Ka, Va = 30,
        Ga = {
            toString: function() {
                return "CodeMirror.Pass"
            }
        },
        Xa = {
            scroll: !1
        },
        Ya = {
            origin: "*mouse"
        },
        Za = {
            origin: "+move"
        },
        Qa = [""],
        Ja = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
        el = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/,
        tl = !1,
        nl = !1,
        rl = null,
        il = function() {
            function e(e) {
                return e <= 247 ? n.charAt(e) : 1424 <= e && e <= 1524 ? "R" : 1536 <= e && e <= 1785 ? r.charAt(e - 1536) : 1774 <= e && e <= 2220 ? "r" : 8192 <= e && e <= 8203 ? "w" : 8204 == e ? "b" : "L"
            }
            function t(e, t, n) {
                this.level = e, this.from = t, this.to = n
            }
            var n = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
                r = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111",
                i = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
                o = /[stwN]/,
                a = /[LRr]/,
                l = /[Lb1n]/,
                s = /[1n]/;
            return function(n, r) {
                var c = "ltr" == r ? "L" : "R";
                if (0 == n.length || "ltr" == r && !i.test(n)) return !1;
                for (var u = n.length, f = [], d = 0; d < u; ++d) f.push(e(n.charCodeAt(d)));
                for (var h = 0, p = c; h < u; ++h) {
                    var g = f[h];
                    "m" == g ? f[h] = p : p = g
                }
                for (var v = 0, y = c; v < u; ++v) {
                    var b = f[v];
                    "1" == b && "r" == y ? f[v] = "n" : a.test(b) && (y = b, "r" == b && (f[v] = "R"))
                }
                for (var x = 1, k = f[0]; x < u - 1; ++x) {
                    var w = f[x];
                    "+" == w && "1" == k && "1" == f[x + 1] ? f[x] = "1" : "," != w || k != f[x + 1] || "1" != k && "n" != k || (f[x] = k), k = w
                }
                for (var C = 0; C < u; ++C) {
                    var S = f[C];
                    if ("," == S) f[C] = "N";
                    else if ("%" == S) {
                        var L = void 0;
                        for (L = C + 1; L < u && "%" == f[L]; ++L);
                        for (var T = C && "!" == f[C - 1] || L < u && "1" == f[L] ? "1" : "N", M = C; M < L; ++M) f[M] = T;
                        C = L - 1
                    }
                }
                for (var z = 0, A = c; z < u; ++z) {
                    var O = f[z];
                    "L" == A && "1" == O ? f[z] = "L" : a.test(O) && (A = O)
                }
                for (var N = 0; N < u; ++N)
                    if (o.test(f[N])) {
                        var P = void 0;
                        for (P = N + 1; P < u && o.test(f[P]); ++P);
                        for (var E = "L" == (N ? f[N - 1] : c), F = E == ("L" == (P < u ? f[P] : c)) ? E ? "L" : "R" : c, j = N; j < P; ++j) f[j] = F;
                        N = P - 1
                    }
                for (var I, D = [], _ = 0; _ < u;)
                    if (l.test(f[_])) {
                        var W = _;
                        for (++_; _ < u && l.test(f[_]); ++_);
                        D.push(new t(0, W, _))
                    } else {
                        var R = _,
                            H = D.length;
                        for (++_; _ < u && "L" != f[_]; ++_);
                        for (var B = R; B < _;)
                            if (s.test(f[B])) {
                                R < B && D.splice(H, 0, new t(1, R, B));
                                var q = B;
                                for (++B; B < _ && s.test(f[B]); ++B);
                                D.splice(H, 0, new t(2, q, B)), R = B
                            } else ++B;
                        R < _ && D.splice(H, 0, new t(1, R, _))
                    }
                return "ltr" == r && (1 == D[0].level && (I = n.match(/^\s+/)) && (D[0].from = I[0].length, D.unshift(new t(0, 0, I[0].length))), 1 == m(D).level && (I = n.match(/\s+$/)) && (m(D).to -= I[0].length, D.push(new t(0, u - I[0].length, u)))), "rtl" == r ? D.reverse() : D
            }
        }(),
        ol = [],
        al = function(e, t, n) {
            if (e.addEventListener) e.addEventListener(t, n, !1);
            else if (e.attachEvent) e.attachEvent("on" + t, n);
            else {
                var r = e._handlers || (e._handlers = {});
                r[t] = (r[t] || ol).concat(n)
            }
        },
        ll = function() {
            if (wa && Ca < 9) return !1;
            var e = r("div");
            return "draggable" in e || "dragDrop" in e
        }(),
        sl = 3 != "\n\nb".split(/\n/).length ? function(e) {
            for (var t = 0, n = [], r = e.length; t <= r;) {
                var i = e.indexOf("\n", t); - 1 == i && (i = e.length);
                var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
                    a = o.indexOf("\r"); - 1 != a ? (n.push(o.slice(0, a)), t += a + 1) : (n.push(o), t = i + 1)
            }
            return n
        } : function(e) {
            return e.split(/\r\n?|\n/)
        },
        cl = window.getSelection ? function(e) {
            try {
                return e.selectionStart != e.selectionEnd
            } catch (Ka) {
                return !1
            }
        } : function(e) {
            var t;
            try {
                t = e.ownerDocument.selection.createRange()
            } catch (Ka) {}
            return !(!t || t.parentElement() != e) && 0 != t.compareEndPoints("StartToEnd", t)
        },
        ul = "oncopy" in (Ka = r("div")) || (Ka.setAttribute("oncopy", "return;"), "function" == typeof Ka.oncopy),
        fl = null,
        dl = {},
        hl = {},
        pl = {},
        ml = function(e, t, n) {
            this.pos = this.start = 0, this.string = e, this.tabSize = t || 8, this.lastColumnPos = this.lastColumnValue = 0, this.lineStart = 0, this.lineOracle = n
        };
    ml.prototype.eol = function() {
        return this.pos >= this.string.length
    }, ml.prototype.sol = function() {
        return this.pos == this.lineStart
    }, ml.prototype.peek = function() {
        return this.string.charAt(this.pos) || undefined
    }, ml.prototype.next = function() {
        if (this.pos < this.string.length) return this.string.charAt(this.pos++)
    }, ml.prototype.eat = function(e) {
        var t = this.string.charAt(this.pos);
        if ("string" == typeof e ? t == e : t && (e.test ? e.test(t) : e(t))) return ++this.pos, t
    }, ml.prototype.eatWhile = function(e) {
        for (var t = this.pos; this.eat(e););
        return this.pos > t
    }, ml.prototype.eatSpace = function() {
        for (var e = this, t = this.pos;
            /[\s\u00a0]/.test(this.string.charAt(this.pos));) ++e.pos;
        return this.pos > t
    }, ml.prototype.skipToEnd = function() {
        this.pos = this.string.length
    }, ml.prototype.skipTo = function(e) {
        var t = this.string.indexOf(e, this.pos);
        if (t > -1) return this.pos = t, !0
    }, ml.prototype.backUp = function(e) {
        this.pos -= e
    }, ml.prototype.column = function() {
        return this.lastColumnPos < this.start && (this.lastColumnValue = f(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue - (this.lineStart ? f(this.string, this.lineStart, this.tabSize) : 0)
    }, ml.prototype.indentation = function() {
        return f(this.string, null, this.tabSize) - (this.lineStart ? f(this.string, this.lineStart, this.tabSize) : 0)
    }, ml.prototype.match = function(e, t, n) {
        if ("string" != typeof e) {
            var r = this.string.slice(this.pos).match(e);
            return r && r.index > 0 ? null : (r && !1 !== t && (this.pos += r[0].length), r)
        }
        var i = function(e) {
            return n ? e.toLowerCase() : e
        };
        if (i(this.string.substr(this.pos, e.length)) == i(e)) return !1 !== t && (this.pos += e.length), !0
    }, ml.prototype.current = function() {
        return this.string.slice(this.start, this.pos)
    }, ml.prototype.hideFirstChars = function(e, t) {
        this.lineStart += e;
        try {
            return t()
        } finally {
            this.lineStart -= e
        }
    }, ml.prototype.lookAhead = function(e) {
        var t = this.lineOracle;
        return t && t.lookAhead(e)
    }, ml.prototype.baseToken = function() {
        var e = this.lineOracle;
        return e && e.baseToken(this.pos)
    };
    var gl = function(e, t) {
            this.state = e, this.lookAhead = t
        },
        vl = function(e, t, n, r) {
            this.state = t, this.doc = e, this.line = n, this.maxLookAhead = r || 0, this.baseTokens = null, this.baseTokenPos = 1
        };
    vl.prototype.lookAhead = function(e) {
        var t = this.doc.getLine(this.line + e);
        return null != t && e > this.maxLookAhead && (this.maxLookAhead = e), t
    }, vl.prototype.baseToken = function(e) {
        var t = this;
        if (!this.baseTokens) return null;
        for (; this.baseTokens[this.baseTokenPos] <= e;) t.baseTokenPos += 2;
        var n = this.baseTokens[this.baseTokenPos + 1];
        return {
            type: n && n.replace(/( |^)overlay .*/, ""),
            size: this.baseTokens[this.baseTokenPos] - e
        }
    }, vl.prototype.nextLine = function() {
        this.line++, this.maxLookAhead > 0 && this.maxLookAhead--
    }, vl.fromSaved = function(e, t, n) {
        return t instanceof gl ? new vl(e, Ke(e.mode, t.state), n, t.lookAhead) : new vl(e, Ke(e.mode, t), n)
    }, vl.prototype.save = function(e) {
        var t = !1 !== e ? Ke(this.doc.mode, this.state) : this.state;
        return this.maxLookAhead > 0 ? new gl(t, this.maxLookAhead) : t
    };
    var yl = function(e, t, n) {
            this.start = e.start, this.end = e.pos, this.string = e.current(), this.type = t || null, this.state = n
        },
        bl = function(e, t, n) {
            this.text = e, re(this, t), this.height = n ? n(this) : 1
        };
    bl.prototype.lineNo = function() {
        return N(this)
    }, Ne(bl);
    var xl, kl = {},
        wl = {},
        Cl = null,
        Sl = null,
        Ll = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        Tl = function(e, t, n) {
            this.cm = n;
            var i = this.vert = r("div", [r("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar"),
                o = this.horiz = r("div", [r("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
            i.tabIndex = o.tabIndex = -1, e(i), e(o), al(i, "scroll", function() {
                i.clientHeight && t(i.scrollTop, "vertical")
            }), al(o, "scroll", function() {
                o.clientWidth && t(o.scrollLeft, "horizontal")
            }), this.checkedZeroWidth = !1, wa && Ca < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px")
        };
    Tl.prototype.update = function(e) {
        var t = e.scrollWidth > e.clientWidth + 1,
            n = e.scrollHeight > e.clientHeight + 1,
            r = e.nativeBarWidth;
        if (n) {
            this.vert.style.display = "block", this.vert.style.bottom = t ? r + "px" : "0";
            var i = e.viewHeight - (t ? r : 0);
            this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px"
        } else this.vert.style.display = "", this.vert.firstChild.style.height = "0";
        if (t) {
            this.horiz.style.display = "block", this.horiz.style.right = n ? r + "px" : "0", this.horiz.style.left = e.barLeft + "px";
            var o = e.viewWidth - e.barLeft - (n ? r : 0);
            this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + o) + "px"
        } else this.horiz.style.display = "", this.horiz.firstChild.style.width = "0";
        return !this.checkedZeroWidth && e.clientHeight > 0 && (0 == r && this.zeroWidthHack(), this.checkedZeroWidth = !0), {
            right: n ? r : 0,
            bottom: t ? r : 0
        }
    }, Tl.prototype.setScrollLeft = function(e) {
        this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e), this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz")
    }, Tl.prototype.setScrollTop = function(e) {
        this.vert.scrollTop != e && (this.vert.scrollTop = e), this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert")
    }, Tl.prototype.zeroWidthHack = function() {
        var e = Fa && !Aa ? "12px" : "18px";
        this.horiz.style.height = this.vert.style.width = e, this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none", this.disableHoriz = new qa, this.disableVert = new qa
    }, Tl.prototype.enableZeroWidthBar = function(e, t, n) {
        function r() {
            var i = e.getBoundingClientRect();
            ("vert" == n ? document.elementFromPoint(i.right - 1, (i.top + i.bottom) / 2) : document.elementFromPoint((i.right + i.left) / 2, i.bottom - 1)) != e ? e.style.pointerEvents = "none" : t.set(1e3, r)
        }
        e.style.pointerEvents = "auto", t.set(1e3, r)
    }, Tl.prototype.clear = function() {
        var e = this.horiz.parentNode;
        e.removeChild(this.horiz), e.removeChild(this.vert)
    };
    var Ml = function() {};
    Ml.prototype.update = function() {
        return {
            bottom: 0,
            right: 0
        }
    }, Ml.prototype.setScrollLeft = function() {}, Ml.prototype.setScrollTop = function() {}, Ml.prototype.clear = function() {};
    var zl = {
            native: Tl,
            "null": Ml
        },
        Al = 0,
        Ol = function(e, t, n) {
            var r = e.display;
            this.viewport = t, this.visible = Rn(r, e.doc, t), this.editorIsHidden = !r.wrapper.offsetWidth, this.wrapperHeight = r.wrapper.clientHeight, this.wrapperWidth = r.wrapper.clientWidth, this.oldDisplayWidth = Ht(e), this.force = n, this.dims = wn(e), this.events = []
        };
    Ol.prototype.signal = function(e, t) {
        Oe(e, t) && this.events.push(arguments)
    }, Ol.prototype.finish = function() {
        for (var e = this, t = 0; t < this.events.length; t++) Me.apply(null, e.events[t])
    };
    var Nl = 0,
        Pl = null;
    wa ? Pl = -.53 : ya ? Pl = 15 : Ta ? Pl = -.7 : za && (Pl = -1 / 3);
    var El = function(e, t) {
        this.ranges = e, this.primIndex = t
    };
    El.prototype.primary = function() {
        return this.ranges[this.primIndex]
    }, El.prototype.equals = function(e) {
        var t = this;
        if (e == this) return !0;
        if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1;
        for (var n = 0; n < this.ranges.length; n++) {
            var r = t.ranges[n],
                i = e.ranges[n];
            if (!D(r.anchor, i.anchor) || !D(r.head, i.head)) return !1
        }
        return !0
    }, El.prototype.deepCopy = function() {
        for (var e = this, t = [], n = 0; n < this.ranges.length; n++) t[n] = new Fl(_(e.ranges[n].anchor), _(e.ranges[n].head));
        return new El(t, this.primIndex)
    }, El.prototype.somethingSelected = function() {
        for (var e = this, t = 0; t < this.ranges.length; t++)
            if (!e.ranges[t].empty()) return !0;
        return !1
    }, El.prototype.contains = function(e, t) {
        var n = this;
        t || (t = e);
        for (var r = 0; r < this.ranges.length; r++) {
            var i = n.ranges[r];
            if (I(t, i.from()) >= 0 && I(e, i.to()) <= 0) return r
        }
        return -1
    };
    var Fl = function(e, t) {
        this.anchor = e, this.head = t
    };
    Fl.prototype.from = function() {
        return R(this.anchor, this.head)
    }, Fl.prototype.to = function() {
        return W(this.anchor, this.head)
    }, Fl.prototype.empty = function() {
        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
    }, Bi.prototype = {
        chunkSize: function() {
            return this.lines.length
        },
        removeInner: function(e, t) {
            for (var n = this, r = e, i = e + t; r < i; ++r) {
                var o = n.lines[r];
                n.height -= o.height, lt(o), kt(o, "delete")
            }
            this.lines.splice(e, t)
        },
        collapse: function(e) {
            e.push.apply(e, this.lines)
        },
        insertInner: function(e, t, n) {
            var r = this;
            this.height += n, this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e));
            for (var i = 0; i < t.length; ++i) t[i].parent = r
        },
        iterN: function(e, t, n) {
            for (var r = this, i = e + t; e < i; ++e)
                if (n(r.lines[e])) return !0
        }
    }, qi.prototype = {
        chunkSize: function() {
            return this.size
        },
        removeInner: function(e, t) {
            var n = this;
            this.size -= t;
            for (var r = 0; r < this.children.length; ++r) {
                var i = n.children[r],
                    o = i.chunkSize();
                if (e < o) {
                    var a = Math.min(t, o - e),
                        l = i.height;
                    if (i.removeInner(e, a), n.height -= l - i.height, o == a && (n.children.splice(r--, 1), i.parent = null), 0 == (t -= a)) break;
                    e = 0
                } else e -= o
            }
            if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof Bi))) {
                var s = [];
                this.collapse(s), this.children = [new Bi(s)], this.children[0].parent = this
            }
        },
        collapse: function(e) {
            for (var t = this, n = 0; n < this.children.length; ++n) t.children[n].collapse(e)
        },
        insertInner: function(e, t, n) {
            var r = this;
            this.size += t.length, this.height += n;
            for (var i = 0; i < this.children.length; ++i) {
                var o = r.children[i],
                    a = o.chunkSize();
                if (e <= a) {
                    if (o.insertInner(e, t, n), o.lines && o.lines.length > 50) {
                        for (var l = o.lines.length % 25 + 25, s = l; s < o.lines.length;) {
                            var c = new Bi(o.lines.slice(s, s += 25));
                            o.height -= c.height, r.children.splice(++i, 0, c), c.parent = r
                        }
                        o.lines = o.lines.slice(0, l), r.maybeSpill()
                    }
                    break
                }
                e -= a
            }
        },
        maybeSpill: function() {
            if (!(this.children.length <= 10)) {
                var e = this;
                do {
                    var t = new qi(e.children.splice(e.children.length - 5, 5));
                    if (e.parent) {
                        e.size -= t.size, e.height -= t.height;
                        var n = d(e.parent.children, e);
                        e.parent.children.splice(n + 1, 0, t)
                    } else {
                        var r = new qi(e.children);
                        r.parent = e, e.children = [r, t], e = r
                    }
                    t.parent = e.parent
                } while (e.children.length > 10);
                e.parent.maybeSpill()
            }
        },
        iterN: function(e, t, n) {
            for (var r = this, i = 0; i < this.children.length; ++i) {
                var o = r.children[i],
                    a = o.chunkSize();
                if (e < a) {
                    var l = Math.min(t, a - e);
                    if (o.iterN(e, l, n)) return !0;
                    if (0 == (t -= l)) break;
                    e = 0
                } else e -= a
            }
        }
    };
    var jl = function(e, t, n) {
        var r = this;
        if (n)
            for (var i in n) n.hasOwnProperty(i) && (r[i] = n[i]);
        this.doc = e, this.node = t
    };
    jl.prototype.clear = function() {
        var e = this,
            t = this.doc.cm,
            n = this.line.widgets,
            r = this.line,
            i = N(r);
        if (null != i && n) {
            for (var o = 0; o < n.length; ++o) n[o] == e && n.splice(o--, 1);
            n.length || (r.widgets = null);
            var a = jt(this);
            O(r, Math.max(0, r.height - a)), t && (pr(t, function() {
                Ui(t, r, -a), br(t, i, "widget")
            }), kt(t, "lineWidgetCleared", t, this, i))
        }
    }, jl.prototype.changed = function() {
        var e = this,
            t = this.height,
            n = this.doc.cm,
            r = this.line;
        this.height = null;
        var i = jt(this) - t;
        i && (ve(this.doc, r) || O(r, r.height + i), n && pr(n, function() {
            n.curOp.forceUpdate = !0, Ui(n, r, i), kt(n, "lineWidgetChanged", n, e, N(r))
        }))
    }, Ne(jl);
    var Il = 0,
        Dl = function(e, t) {
            this.lines = [], this.type = t, this.doc = e, this.id = ++Il
        };
    Dl.prototype.clear = function() {
        var e = this;
        if (!this.explicitlyCleared) {
            var t = this.doc.cm,
                n = t && !t.curOp;
            if (n && ar(t), Oe(this, "clear")) {
                var r = this.find();
                r && kt(this, "clear", r.from, r.to)
            }
            for (var i = null, o = null, a = 0; a < this.lines.length; ++a) {
                var l = e.lines[a],
                    s = G(l.markedSpans, e);
                t && !e.collapsed ? br(t, N(l), "text") : t && (null != s.to && (o = N(l)), null != s.from && (i = N(l))), l.markedSpans = X(l.markedSpans, s), null == s.from && e.collapsed && !ve(e.doc, l) && t && O(l, xn(t.display))
            }
            if (t && this.collapsed && !t.options.lineWrapping)
                for (var c = 0; c < this.lines.length; ++c) {
                    var u = de(e.lines[c]),
                        f = xe(u);
                    f > t.display.maxLineLength && (t.display.maxLine = u, t.display.maxLineLength = f, t.display.maxLineChanged = !0)
                }
            null != i && t && this.collapsed && yr(t, i, o + 1), this.lines.length = 0, this.explicitlyCleared = !0, this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1, t && Si(t.doc)), t && kt(t, "markerCleared", t, this, i, o), n && lr(t), this.parent && this.parent.clear()
        }
    }, Dl.prototype.find = function(e, t) {
        var n, r, i = this;
        null == e && "bookmark" == this.type && (e = 1);
        for (var o = 0; o < this.lines.length; ++o) {
            var a = i.lines[o],
                l = G(a.markedSpans, i);
            if (null != l.from && (n = j(t ? a : N(a), l.from), -1 == e)) return n;
            if (null != l.to && (r = j(t ? a : N(a), l.to), 1 == e)) return r
        }
        return n && {
            from: n,
            to: r
        }
    }, Dl.prototype.changed = function() {
        var e = this,
            t = this.find(-1, !0),
            n = this,
            r = this.doc.cm;
        t && r && pr(r, function() {
            var i = t.line,
                o = N(t.line),
                a = Vt(r, o);
            if (a && (en(a), r.curOp.selectionChanged = r.curOp.forceUpdate = !0), r.curOp.updateMaxLine = !0, !ve(n.doc, i) && null != n.height) {
                var l = n.height;
                n.height = null;
                var s = jt(n) - l;
                s && O(i, i.height + s)
            }
            kt(r, "markerChanged", r, e)
        })
    }, Dl.prototype.attachLine = function(e) {
        if (!this.lines.length && this.doc.cm) {
            var t = this.doc.cm.curOp;
            t.maybeHiddenMarkers && -1 != d(t.maybeHiddenMarkers, this) || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this)
        }
        this.lines.push(e)
    }, Dl.prototype.detachLine = function(e) {
        if (this.lines.splice(d(this.lines, e), 1), !this.lines.length && this.doc.cm) {
            var t = this.doc.cm.curOp;
            (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this)
        }
    }, Ne(Dl);
    var _l = function(e, t) {
        var n = this;
        this.markers = e, this.primary = t;
        for (var r = 0; r < e.length; ++r) e[r].parent = n
    };
    _l.prototype.clear = function() {
        var e = this;
        if (!this.explicitlyCleared) {
            this.explicitlyCleared = !0;
            for (var t = 0; t < this.markers.length; ++t) e.markers[t].clear();
            kt(this, "clear")
        }
    }, _l.prototype.find = function(e, t) {
        return this.primary.find(e, t)
    }, Ne(_l);
    var Wl = 0,
        Rl = function(e, t, n, r, i) {
            if (!(this instanceof Rl)) return new Rl(e, t, n, r, i);
            null == n && (n = 0), qi.call(this, [new Bi([new bl("", null)])]), this.first = n, this.scrollTop = this.scrollLeft = 0, this.cantEdit = !1, this.cleanGeneration = 1, this.modeFrontier = this.highlightFrontier = n;
            var o = j(n, 0);
            this.sel = Hr(o), this.history = new ti(null), this.id = ++Wl, this.modeOption = t, this.lineSep = r, this.direction = "rtl" == i ? "rtl" : "ltr", this.extend = !1, "string" == typeof e && (e = this.splitLines(e)), Yr(this, {
                from: o,
                to: o,
                text: e
            }), ki(this, Hr(o), Xa)
        };
    Rl.prototype = b(qi.prototype, {
        constructor: Rl,
        iter: function(e, t, n) {
            n ? this.iterN(e - this.first, t - e, n) : this.iterN(this.first, this.first + this.size, e)
        },
        insert: function(e, t) {
            for (var n = 0, r = 0; r < t.length; ++r) n += t[r].height;
            this.insertInner(e - this.first, t, n)
        },
        remove: function(e, t) {
            this.removeInner(e - this.first, t)
        },
        getValue: function(e) {
            var t = A(this, this.first, this.first + this.size);
            return !1 === e ? t : t.join(e || this.lineSeparator())
        },
        setValue: vr(function(e) {
            var t = j(this.first, 0),
                n = this.first + this.size - 1;
            Ni(this, {
                from: t,
                to: j(n, M(this, n).text.length),
                text: this.splitLines(e),
                origin: "setValue",
                full: !0
            }, !0), this.cm && Xn(this.cm, 0, 0), ki(this, Hr(t), Xa)
        }),
        replaceRange: function(e, t, n, r) {
            Di(this, e, t = B(this, t), n = n ? B(this, n) : t, r)
        },
        getRange: function(e, t, n) {
            var r = z(this, B(this, e), B(this, t));
            return !1 === n ? r : r.join(n || this.lineSeparator())
        },
        getLine: function(e) {
            var t = this.getLineHandle(e);
            return t && t.text
        },
        getLineHandle: function(e) {
            if (E(this, e)) return M(this, e)
        },
        getLineNumber: function(e) {
            return N(e)
        },
        getLineHandleVisualStart: function(e) {
            return "number" == typeof e && (e = M(this, e)), de(e)
        },
        lineCount: function() {
            return this.size
        },
        firstLine: function() {
            return this.first
        },
        lastLine: function() {
            return this.first + this.size - 1
        },
        clipPos: function(e) {
            return B(this, e)
        },
        getCursor: function(e) {
            var t = this.sel.primary();
            return null == e || "head" == e ? t.head : "anchor" == e ? t.anchor : "end" == e || "to" == e || !1 === e ? t.to() : t.from()
        },
        listSelections: function() {
            return this.sel.ranges
        },
        somethingSelected: function() {
            return this.sel.somethingSelected()
        },
        setCursor: vr(function(e, t, n) {
            yi(this, B(this, "number" == typeof e ? j(e, t || 0) : e), null, n)
        }),
        setSelection: vr(function(e, t, n) {
            yi(this, B(this, e), B(this, t || e), n)
        }),
        extendSelection: vr(function(e, t, n) {
            mi(this, B(this, e), t && B(this, t), n)
        }),
        extendSelections: vr(function(e, t) {
            gi(this, U(this, e), t)
        }),
        extendSelectionsBy: vr(function(e, t) {
            gi(this, U(this, g(this.sel.ranges, e)), t)
        }),
        setSelections: vr(function(e, t, n) {
            var r = this;
            if (e.length) {
                for (var i = [], o = 0; o < e.length; o++) i[o] = new Fl(B(r, e[o].anchor), B(r, e[o].head));
                null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), ki(this, Rr(i, t), n)
            }
        }),
        addSelection: vr(function(e, t, n) {
            var r = this.sel.ranges.slice(0);
            r.push(new Fl(B(this, e), B(this, t || e))), ki(this, Rr(r, r.length - 1), n)
        }),
        getSelection: function(e) {
            for (var t, n = this, r = this.sel.ranges, i = 0; i < r.length; i++) {
                var o = z(n, r[i].from(), r[i].to());
                t = t ? t.concat(o) : o
            }
            return !1 === e ? t : t.join(e || this.lineSeparator())
        },
        getSelections: function(e) {
            for (var t = this, n = [], r = this.sel.ranges, i = 0; i < r.length; i++) {
                var o = z(t, r[i].from(), r[i].to());
                !1 !== e && (o = o.join(e || t.lineSeparator())), n[i] = o
            }
            return n
        },
        replaceSelection: function(e, t, n) {
            for (var r = [], i = 0; i < this.sel.ranges.length; i++) r[i] = e;
            this.replaceSelections(r, t, n || "+input")
        },
        replaceSelections: vr(function(e, t, n) {
            for (var r = this, i = [], o = this.sel, a = 0; a < o.ranges.length; a++) {
                var l = o.ranges[a];
                i[a] = {
                    from: l.from(),
                    to: l.to(),
                    text: r.splitLines(e[a]),
                    origin: n
                }
            }
            for (var s = t && "end" != t && Kr(this, i, t), c = i.length - 1; c >= 0; c--) Ni(r, i[c]);
            s ? xi(this, s) : this.cm && Gn(this.cm)
        }),
        undo: vr(function() {
            Ei(this, "undo")
        }),
        redo: vr(function() {
            Ei(this, "redo")
        }),
        undoSelection: vr(function() {
            Ei(this, "undo", !0)
        }),
        redoSelection: vr(function() {
            Ei(this, "redo", !0)
        }),
        setExtending: function(e) {
            this.extend = e
        },
        getExtending: function() {
            return this.extend
        },
        historySize: function() {
            for (var e = this.history, t = 0, n = 0, r = 0; r < e.done.length; r++) e.done[r].ranges || ++t;
            for (var i = 0; i < e.undone.length; i++) e.undone[i].ranges || ++n;
            return {
                undo: t,
                redo: n
            }
        },
        clearHistory: function() {
            this.history = new ti(this.history.maxGeneration)
        },
        markClean: function() {
            this.cleanGeneration = this.changeGeneration(!0)
        },
        changeGeneration: function(e) {
            return e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null), this.history.generation
        },
        isClean: function(e) {
            return this.history.generation == (e || this.cleanGeneration)
        },
        getHistory: function() {
            return {
                done: hi(this.history.done),
                undone: hi(this.history.undone)
            }
        },
        setHistory: function(e) {
            var t = this.history = new ti(this.history.maxGeneration);
            t.done = hi(e.done.slice(0), null, !0), t.undone = hi(e.undone.slice(0), null, !0)
        },
        setGutterMarker: vr(function(e, t, n) {
            return Hi(this, e, "gutter", function(e) {
                var r = e.gutterMarkers || (e.gutterMarkers = {});
                return r[t] = n, !n && w(r) && (e.gutterMarkers = null), !0
            })
        }),
        clearGutter: vr(function(e) {
            var t = this;
            this.iter(function(n) {
                n.gutterMarkers && n.gutterMarkers[e] && Hi(t, n, "gutter", function() {
                    return n.gutterMarkers[e] = null, w(n.gutterMarkers) && (n.gutterMarkers = null), !0
                })
            })
        }),
        lineInfo: function(e) {
            var t;
            if ("number" == typeof e) {
                if (!E(this, e)) return null;
                if (t = e, !(e = M(this, e))) return null
            } else if (null == (t = N(e))) return null;
            return {
                line: t,
                handle: e,
                text: e.text,
                gutterMarkers: e.gutterMarkers,
                textClass: e.textClass,
                bgClass: e.bgClass,
                wrapClass: e.wrapClass,
                widgets: e.widgets
            }
        },
        addLineClass: vr(function(t, n, r) {
            return Hi(this, t, "gutter" == n ? "gutter" : "class", function(t) {
                var i = "text" == n ? "textClass" : "background" == n ? "bgClass" : "gutter" == n ? "gutterClass" : "wrapClass";
                if (t[i]) {
                    if (e(r).test(t[i])) return !1;
                    t[i] += " " + r
                } else t[i] = r;
                return !0
            })
        }),
        removeLineClass: vr(function(t, n, r) {
            return Hi(this, t, "gutter" == n ? "gutter" : "class", function(t) {
                var i = "text" == n ? "textClass" : "background" == n ? "bgClass" : "gutter" == n ? "gutterClass" : "wrapClass",
                    o = t[i];
                if (!o) return !1;
                if (null == r) t[i] = null;
                else {
                    var a = o.match(e(r));
                    if (!a) return !1;
                    var l = a.index + a[0].length;
                    t[i] = o.slice(0, a.index) + (a.index && l != o.length ? " " : "") + o.slice(l) || null
                }
                return !0
            })
        }),
        addLineWidget: vr(function(e, t, n) {
            return $i(this, e, t, n)
        }),
        removeLineWidget: function(e) {
            e.clear()
        },
        markText: function(e, t, n) {
            return Ki(this, B(this, e), B(this, t), n, n && n.type || "range")
        },
        setBookmark: function(e, t) {
            var n = {
                replacedWith: t && (null == t.nodeType ? t.widget : t),
                insertLeft: t && t.insertLeft,
                clearWhenEmpty: !1,
                shared: t && t.shared,
                handleMouseEvents: t && t.handleMouseEvents
            };
            return Ki(this, e = B(this, e), e, n, "bookmark")
        },
        findMarksAt: function(e) {
            var t = [],
                n = M(this, (e = B(this, e)).line).markedSpans;
            if (n)
                for (var r = 0; r < n.length; ++r) {
                    var i = n[r];
                    (null == i.from || i.from <= e.ch) && (null == i.to || i.to >= e.ch) && t.push(i.marker.parent || i.marker)
                }
            return t
        },
        findMarks: function(e, t, n) {
            e = B(this, e), t = B(this, t);
            var r = [],
                i = e.line;
            return this.iter(e.line, t.line + 1, function(o) {
                var a = o.markedSpans;
                if (a)
                    for (var l = 0; l < a.length; l++) {
                        var s = a[l];
                        null != s.to && i == e.line && e.ch >= s.to || null == s.from && i != e.line || null != s.from && i == t.line && s.from >= t.ch || n && !n(s.marker) || r.push(s.marker.parent || s.marker)
                    }++i
            }), r
        },
        getAllMarks: function() {
            var e = [];
            return this.iter(function(t) {
                var n = t.markedSpans;
                if (n)
                    for (var r = 0; r < n.length; ++r) null != n[r].from && e.push(n[r].marker)
            }), e
        },
        posFromIndex: function(e) {
            var t, n = this.first,
                r = this.lineSeparator().length;
            return this.iter(function(i) {
                var o = i.text.length + r;
                if (o > e) return t = e, !0;
                e -= o, ++n
            }), B(this, j(n, t))
        },
        indexFromPos: function(e) {
            var t = (e = B(this, e)).ch;
            if (e.line < this.first || e.ch < 0) return 0;
            var n = this.lineSeparator().length;
            return this.iter(this.first, e.line, function(e) {
                t += e.text.length + n
            }), t
        },
        copy: function(e) {
            var t = new Rl(A(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
            return t.scrollTop = this.scrollTop, t.scrollLeft = this.scrollLeft, t.sel = this.sel, t.extend = !1, e && (t.history.undoDepth = this.history.undoDepth, t.setHistory(this.getHistory())), t
        },
        linkedDoc: function(e) {
            e || (e = {});
            var t = this.first,
                n = this.first + this.size;
            null != e.from && e.from > t && (t = e.from), null != e.to && e.to < n && (n = e.to);
            var r = new Rl(A(this, t, n), e.mode || this.modeOption, t, this.lineSep, this.direction);
            return e.sharedHist && (r.history = this.history), (this.linked || (this.linked = [])).push({
                doc: r,
                sharedHist: e.sharedHist
            }), r.linked = [{
                doc: this,
                isParent: !0,
                sharedHist: e.sharedHist
            }], Xi(r, Gi(this)), r
        },
        unlinkDoc: function(e) {
            var t = this;
            if (e instanceof Xo && (e = e.doc), this.linked)
                for (var n = 0; n < this.linked.length; ++n) {
                    if (t.linked[n].doc == e) {
                        t.linked.splice(n, 1), e.unlinkDoc(t), Yi(Gi(t));
                        break
                    }
                }
            if (e.history == this.history) {
                var r = [e.id];
                Zr(e, function(e) {
                    return r.push(e.id)
                }, !0), e.history = new ti(null), e.history.done = hi(this.history.done, r), e.history.undone = hi(this.history.undone, r)
            }
        },
        iterLinkedDocs: function(e) {
            Zr(this, e)
        },
        getMode: function() {
            return this.mode
        },
        getEditor: function() {
            return this.cm
        },
        splitLines: function(e) {
            return this.lineSep ? e.split(this.lineSep) : sl(e)
        },
        lineSeparator: function() {
            return this.lineSep || "\n"
        },
        setDirection: vr(function(e) {
            "rtl" != e && (e = "ltr"), e != this.direction && (this.direction = e, this.iter(function(e) {
                return e.order = null
            }), this.cm && ei(this.cm))
        })
    }), Rl.prototype.eachLine = Rl.prototype.iter;
    for (var Hl = 0, Bl = !1, ql = {
            3: "Pause",
            8: "Backspace",
            9: "Tab",
            13: "Enter",
            16: "Shift",
            17: "Ctrl",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Esc",
            32: "Space",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "Left",
            38: "Up",
            39: "Right",
            40: "Down",
            44: "PrintScrn",
            45: "Insert",
            46: "Delete",
            59: ";",
            61: "=",
            91: "Mod",
            92: "Mod",
            93: "Mod",
            106: "*",
            107: "=",
            109: "-",
            110: ".",
            111: "/",
            127: "Delete",
            145: "ScrollLock",
            173: "-",
            186: ";",
            187: "=",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "`",
            219: "[",
            220: "\\",
            221: "]",
            222: "'",
            63232: "Up",
            63233: "Down",
            63234: "Left",
            63235: "Right",
            63272: "Delete",
            63273: "Home",
            63275: "End",
            63276: "PageUp",
            63277: "PageDown",
            63302: "Insert"
        }, Ul = 0; Ul < 10; Ul++) ql[Ul + 48] = ql[Ul + 96] = String(Ul);
    for (var $l = 65; $l <= 90; $l++) ql[$l] = String.fromCharCode($l);
    for (var Kl = 1; Kl <= 12; Kl++) ql[Kl + 111] = ql[Kl + 63235] = "F" + Kl;
    var Vl = {
        basic: {
            Left: "goCharLeft",
            Right: "goCharRight",
            Up: "goLineUp",
            Down: "goLineDown",
            End: "goLineEnd",
            Home: "goLineStartSmart",
            PageUp: "goPageUp",
            PageDown: "goPageDown",
            Delete: "delCharAfter",
            Backspace: "delCharBefore",
            "Shift-Backspace": "delCharBefore",
            Tab: "defaultTab",
            "Shift-Tab": "indentAuto",
            Enter: "newlineAndIndent",
            Insert: "toggleOverwrite",
            Esc: "singleSelection"
        },
        pcDefault: {
            "Ctrl-A": "selectAll",
            "Ctrl-D": "deleteLine",
            "Ctrl-Z": "undo",
            "Shift-Ctrl-Z": "redo",
            "Ctrl-Y": "redo",
            "Ctrl-Home": "goDocStart",
            "Ctrl-End": "goDocEnd",
            "Ctrl-Up": "goLineUp",
            "Ctrl-Down": "goLineDown",
            "Ctrl-Left": "goGroupLeft",
            "Ctrl-Right": "goGroupRight",
            "Alt-Left": "goLineStart",
            "Alt-Right": "goLineEnd",
            "Ctrl-Backspace": "delGroupBefore",
            "Ctrl-Delete": "delGroupAfter",
            "Ctrl-S": "save",
            "Ctrl-F": "find",
            "Ctrl-G": "findNext",
            "Shift-Ctrl-G": "findPrev",
            "Shift-Ctrl-F": "replace",
            "Shift-Ctrl-R": "replaceAll",
            "Ctrl-[": "indentLess",
            "Ctrl-]": "indentMore",
            "Ctrl-U": "undoSelection",
            "Shift-Ctrl-U": "redoSelection",
            "Alt-U": "redoSelection",
            fallthrough: "basic"
        },
        emacsy: {
            "Ctrl-F": "goCharRight",
            "Ctrl-B": "goCharLeft",
            "Ctrl-P": "goLineUp",
            "Ctrl-N": "goLineDown",
            "Alt-F": "goWordRight",
            "Alt-B": "goWordLeft",
            "Ctrl-A": "goLineStart",
            "Ctrl-E": "goLineEnd",
            "Ctrl-V": "goPageDown",
            "Shift-Ctrl-V": "goPageUp",
            "Ctrl-D": "delCharAfter",
            "Ctrl-H": "delCharBefore",
            "Alt-D": "delWordAfter",
            "Alt-Backspace": "delWordBefore",
            "Ctrl-K": "killLine",
            "Ctrl-T": "transposeChars",
            "Ctrl-O": "openLine"
        },
        macDefault: {
            "Cmd-A": "selectAll",
            "Cmd-D": "deleteLine",
            "Cmd-Z": "undo",
            "Shift-Cmd-Z": "redo",
            "Cmd-Y": "redo",
            "Cmd-Home": "goDocStart",
            "Cmd-Up": "goDocStart",
            "Cmd-End": "goDocEnd",
            "Cmd-Down": "goDocEnd",
            "Alt-Left": "goGroupLeft",
            "Alt-Right": "goGroupRight",
            "Cmd-Left": "goLineLeft",
            "Cmd-Right": "goLineRight",
            "Alt-Backspace": "delGroupBefore",
            "Ctrl-Alt-Backspace": "delGroupAfter",
            "Alt-Delete": "delGroupAfter",
            "Cmd-S": "save",
            "Cmd-F": "find",
            "Cmd-G": "findNext",
            "Shift-Cmd-G": "findPrev",
            "Cmd-Alt-F": "replace",
            "Shift-Cmd-Alt-F": "replaceAll",
            "Cmd-[": "indentLess",
            "Cmd-]": "indentMore",
            "Cmd-Backspace": "delWrappedLineLeft",
            "Cmd-Delete": "delWrappedLineRight",
            "Cmd-U": "undoSelection",
            "Shift-Cmd-U": "redoSelection",
            "Ctrl-Up": "goDocStart",
            "Ctrl-Down": "goDocEnd",
            fallthrough: ["basic", "emacsy"]
        }
    };
    Vl["default"] = Fa ? Vl.macDefault : Vl.pcDefault;
    var Gl, Xl, Yl = {
            selectAll: Ai,
            singleSelection: function(e) {
                return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), Xa)
            },
            killLine: function(e) {
                return ho(e, function(t) {
                    if (t.empty()) {
                        var n = M(e.doc, t.head.line).text.length;
                        return t.head.ch == n && t.head.line < e.lastLine() ? {
                            from: t.head,
                            to: j(t.head.line + 1, 0)
                        } : {
                            from: t.head,
                            to: j(t.head.line, n)
                        }
                    }
                    return {
                        from: t.from(),
                        to: t.to()
                    }
                })
            },
            deleteLine: function(e) {
                return ho(e, function(t) {
                    return {
                        from: j(t.from().line, 0),
                        to: B(e.doc, j(t.to().line + 1, 0))
                    }
                })
            },
            delLineLeft: function(e) {
                return ho(e, function(e) {
                    return {
                        from: j(e.from().line, 0),
                        to: e.from()
                    }
                })
            },
            delWrappedLineLeft: function(e) {
                return ho(e, function(t) {
                    var n = e.charCoords(t.head, "div").top + 5;
                    return {
                        from: e.coordsChar({
                            left: 0,
                            top: n
                        }, "div"),
                        to: t.from()
                    }
                })
            },
            delWrappedLineRight: function(e) {
                return ho(e, function(t) {
                    var n = e.charCoords(t.head, "div").top + 5,
                        r = e.coordsChar({
                            left: e.display.lineDiv.offsetWidth + 100,
                            top: n
                        }, "div");
                    return {
                        from: t.from(),
                        to: r
                    }
                })
            },
            undo: function(e) {
                return e.undo()
            },
            redo: function(e) {
                return e.redo()
            },
            undoSelection: function(e) {
                return e.undoSelection()
            },
            redoSelection: function(e) {
                return e.redoSelection()
            },
            goDocStart: function(e) {
                return e.extendSelection(j(e.firstLine(), 0))
            },
            goDocEnd: function(e) {
                return e.extendSelection(j(e.lastLine()))
            },
            goLineStart: function(e) {
                return e.extendSelectionsBy(function(t) {
                    return yo(e, t.head.line)
                }, {
                    origin: "+move",
                    bias: 1
                })
            },
            goLineStartSmart: function(e) {
                return e.extendSelectionsBy(function(t) {
                    return xo(e, t.head)
                }, {
                    origin: "+move",
                    bias: 1
                })
            },
            goLineEnd: function(e) {
                return e.extendSelectionsBy(function(t) {
                    return bo(e, t.head.line)
                }, {
                    origin: "+move",
                    bias: -1
                })
            },
            goLineRight: function(e) {
                return e.extendSelectionsBy(function(t) {
                    var n = e.cursorCoords(t.head, "div").top + 5;
                    return e.coordsChar({
                        left: e.display.lineDiv.offsetWidth + 100,
                        top: n
                    }, "div")
                }, Za)
            },
            goLineLeft: function(e) {
                return e.extendSelectionsBy(function(t) {
                    var n = e.cursorCoords(t.head, "div").top + 5;
                    return e.coordsChar({
                        left: 0,
                        top: n
                    }, "div")
                }, Za)
            },
            goLineLeftSmart: function(e) {
                return e.extendSelectionsBy(function(t) {
                    var n = e.cursorCoords(t.head, "div").top + 5,
                        r = e.coordsChar({
                            left: 0,
                            top: n
                        }, "div");
                    return r.ch < e.getLine(r.line).search(/\S/) ? xo(e, t.head) : r
                }, Za)
            },
            goLineUp: function(e) {
                return e.moveV(-1, "line")
            },
            goLineDown: function(e) {
                return e.moveV(1, "line")
            },
            goPageUp: function(e) {
                return e.moveV(-1, "page")
            },
            goPageDown: function(e) {
                return e.moveV(1, "page")
            },
            goCharLeft: function(e) {
                return e.moveH(-1, "char")
            },
            goCharRight: function(e) {
                return e.moveH(1, "char")
            },
            goColumnLeft: function(e) {
                return e.moveH(-1, "column")
            },
            goColumnRight: function(e) {
                return e.moveH(1, "column")
            },
            goWordLeft: function(e) {
                return e.moveH(-1, "word")
            },
            goGroupRight: function(e) {
                return e.moveH(1, "group")
            },
            goGroupLeft: function(e) {
                return e.moveH(-1, "group")
            },
            goWordRight: function(e) {
                return e.moveH(1, "word")
            },
            delCharBefore: function(e) {
                return e.deleteH(-1, "char")
            },
            delCharAfter: function(e) {
                return e.deleteH(1, "char")
            },
            delWordBefore: function(e) {
                return e.deleteH(-1, "word")
            },
            delWordAfter: function(e) {
                return e.deleteH(1, "word")
            },
            delGroupBefore: function(e) {
                return e.deleteH(-1, "group")
            },
            delGroupAfter: function(e) {
                return e.deleteH(1, "group")
            },
            indentAuto: function(e) {
                return e.indentSelection("smart")
            },
            indentMore: function(e) {
                return e.indentSelection("add")
            },
            indentLess: function(e) {
                return e.indentSelection("subtract")
            },
            insertTab: function(e) {
                return e.replaceSelection("\t")
            },
            insertSoftTab: function(e) {
                for (var t = [], n = e.listSelections(), r = e.options.tabSize, i = 0; i < n.length; i++) {
                    var o = n[i].from(),
                        a = f(e.getLine(o.line), o.ch, r);
                    t.push(p(r - a % r))
                }
                e.replaceSelections(t)
            },
            defaultTab: function(e) {
                e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab")
            },
            transposeChars: function(e) {
                return pr(e, function() {
                    for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++)
                        if (t[r].empty()) {
                            var i = t[r].head,
                                o = M(e.doc, i.line).text;
                            if (o)
                                if (i.ch == o.length && (i = new j(i.line, i.ch - 1)), i.ch > 0) i = new j(i.line, i.ch + 1), e.replaceRange(o.charAt(i.ch - 1) + o.charAt(i.ch - 2), j(i.line, i.ch - 2), i, "+transpose");
                                else if (i.line > e.doc.first) {
                                var a = M(e.doc, i.line - 1).text;
                                a && (i = new j(i.line, 1), e.replaceRange(o.charAt(0) + e.doc.lineSeparator() + a.charAt(a.length - 1), j(i.line - 1, a.length - 1), i, "+transpose"))
                            }
                            n.push(new Fl(i, i))
                        }
                    e.setSelections(n)
                })
            },
            newlineAndIndent: function(e) {
                return pr(e, function() {
                    for (var t = e.listSelections(), n = t.length - 1; n >= 0; n--) e.replaceRange(e.doc.lineSeparator(), t[n].anchor, t[n].head, "+input");
                    t = e.listSelections();
                    for (var r = 0; r < t.length; r++) e.indentLine(t[r].from().line, null, !0);
                    Gn(e)
                })
            },
            openLine: function(e) {
                return e.replaceSelection("\n", "start")
            },
            toggleOverwrite: function(e) {
                return e.toggleOverwrite()
            }
        },
        Zl = new qa,
        Ql = null,
        Jl = 400,
        es = function(e, t, n) {
            this.time = e, this.pos = t, this.button = n
        };
    es.prototype.compare = function(e, t, n) {
        return this.time + Jl > e && 0 == I(t, this.pos) && n == this.button
    };
    var ts = {
            toString: function() {
                return "CodeMirror.Init"
            }
        },
        ns = {},
        rs = {};
    Xo.defaults = ns, Xo.optionHandlers = rs;
    var is = [];
    Xo.defineInitHook = function(e) {
        return is.push(e)
    };
    var os = null,
        as = function(e) {
            this.cm = e, this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null, this.polling = new qa, this.composing = null, this.gracePeriod = !1, this.readDOMTimeout = null
        };
    as.prototype.init = function(e) {
        function t(e) {
            if (!ze(i, e)) {
                if (i.somethingSelected()) Qo({
                    lineWise: !1,
                    text: i.getSelections()
                }), "cut" == e.type && i.replaceSelection("", null, "cut");
                else {
                    if (!i.options.lineWiseCopyCut) return;
                    var t = na(i);
                    Qo({
                        lineWise: !0,
                        text: t.text
                    }), "cut" == e.type && i.operation(function() {
                        i.setSelections(t.ranges, 0, Xa), i.replaceSelection("", null, "cut")
                    })
                }
                if (e.clipboardData) {
                    e.clipboardData.clearData();
                    var n = os.text.join("\n");
                    if (e.clipboardData.setData("Text", n), e.clipboardData.getData("Text") == n) return void e.preventDefault()
                }
                var a = ia(),
                    l = a.firstChild;
                i.display.lineSpace.insertBefore(a, i.display.lineSpace.firstChild), l.value = os.text.join("\n");
                var s = document.activeElement;
                Ba(l), setTimeout(function() {
                    i.display.lineSpace.removeChild(a), s.focus(), s == o && r.showPrimarySelection()
                }, 50)
            }
        }
        var n = this,
            r = this,
            i = r.cm,
            o = r.div = e.lineDiv;
        ra(o, i.options.spellcheck), al(o, "paste", function(e) {
            ze(i, e) || ea(e, i) || Ca <= 11 && setTimeout(mr(i, function() {
                return n.updateFromDOM()
            }), 20)
        }), al(o, "compositionstart", function(e) {
            n.composing = {
                data: e.data,
                done: !1
            }
        }), al(o, "compositionupdate", function(e) {
            n.composing || (n.composing = {
                data: e.data,
                done: !1
            })
        }), al(o, "compositionend", function(e) {
            n.composing && (e.data != n.composing.data && n.readFromDOMSoon(), n.composing.done = !0)
        }), al(o, "touchstart", function() {
            return r.forceCompositionEnd()
        }), al(o, "input", function() {
            n.composing || n.readFromDOMSoon()
        }), al(o, "copy", t), al(o, "cut", t)
    }, as.prototype.prepareSelection = function() {
        var e = An(this.cm, !1);
        return e.focus = this.cm.state.focused, e
    }, as.prototype.showSelection = function(e, t) {
        e && this.cm.display.view.length && ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e))
    }, as.prototype.getSelection = function() {
        return this.cm.display.wrapper.ownerDocument.getSelection()
    }, as.prototype.showPrimarySelection = function() {
        var e = this.getSelection(),
            t = this.cm,
            n = t.doc.sel.primary(),
            r = n.from(),
            i = n.to();
        if (t.display.viewTo == t.display.viewFrom || r.line >= t.display.viewTo || i.line < t.display.viewFrom) e.removeAllRanges();
        else {
            var o = da(t, e.anchorNode, e.anchorOffset),
                a = da(t, e.focusNode, e.focusOffset);
            if (!o || o.bad || !a || a.bad || 0 != I(R(o, a), r) || 0 != I(W(o, a), i)) {
                var l = t.display.view,
                    s = r.line >= t.display.viewFrom && sa(t, r) || {
                        node: l[0].measure.map[2],
                        offset: 0
                    },
                    c = i.line < t.display.viewTo && sa(t, i);
                if (!c) {
                    var u = l[l.length - 1].measure,
                        f = u.maps ? u.maps[u.maps.length - 1] : u.map;
                    c = {
                        node: f[f.length - 1],
                        offset: f[f.length - 2] - f[f.length - 3]
                    }
                }
                if (s && c) {
                    var d, h = e.rangeCount && e.getRangeAt(0);
                    try {
                        d = _a(s.node, s.offset, c.offset, c.node)
                    } catch (Ka) {}
                    d && (!ya && t.state.focused ? (e.collapse(s.node, s.offset), d.collapsed || (e.removeAllRanges(), e.addRange(d))) : (e.removeAllRanges(), e.addRange(d)), h && null == e.anchorNode ? e.addRange(h) : ya && this.startGracePeriod()), this.rememberSelection()
                } else e.removeAllRanges()
            }
        }
    }, as.prototype.startGracePeriod = function() {
        var e = this;
        clearTimeout(this.gracePeriod), this.gracePeriod = setTimeout(function() {
            e.gracePeriod = !1, e.selectionChanged() && e.cm.operation(function() {
                return e.cm.curOp.selectionChanged = !0
            })
        }, 20)
    }, as.prototype.showMultipleSelections = function(e) {
        n(this.cm.display.cursorDiv, e.cursors), n(this.cm.display.selectionDiv, e.selection)
    }, as.prototype.rememberSelection = function() {
        var e = this.getSelection();
        this.lastAnchorNode = e.anchorNode, this.lastAnchorOffset = e.anchorOffset, this.lastFocusNode = e.focusNode, this.lastFocusOffset = e.focusOffset
    }, as.prototype.selectionInEditor = function() {
        var e = this.getSelection();
        if (!e.rangeCount) return !1;
        var t = e.getRangeAt(0).commonAncestorContainer;
        return o(this.div, t)
    }, as.prototype.focus = function() {
        "nocursor" != this.cm.options.readOnly && (this.selectionInEditor() || this.showSelection(this.prepareSelection(), !0), this.div.focus())
    }, as.prototype.blur = function() {
        this.div.blur()
    }, as.prototype.getField = function() {
        return this.div
    }, as.prototype.supportsTouch = function() {
        return !0
    }, as.prototype.receivedFocus = function() {
        function e() {
            t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, e))
        }
        var t = this;
        this.selectionInEditor() ? this.pollSelection() : pr(this.cm, function() {
            return t.cm.curOp.selectionChanged = !0
        }), this.polling.set(this.cm.options.pollInterval, e)
    }, as.prototype.selectionChanged = function() {
        var e = this.getSelection();
        return e.anchorNode != this.lastAnchorNode || e.anchorOffset != this.lastAnchorOffset || e.focusNode != this.lastFocusNode || e.focusOffset != this.lastFocusOffset
    }, as.prototype.pollSelection = function() {
        if (null == this.readDOMTimeout && !this.gracePeriod && this.selectionChanged()) {
            var e = this.getSelection(),
                t = this.cm;
            if (Pa && Ta && this.cm.options.gutters.length && ca(e.anchorNode)) return this.cm.triggerOnKeyDown({
                type: "keydown",
                keyCode: 8,
                preventDefault: Math.abs
            }), this.blur(), void this.focus();
            if (!this.composing) {
                this.rememberSelection();
                var n = da(t, e.anchorNode, e.anchorOffset),
                    r = da(t, e.focusNode, e.focusOffset);
                n && r && pr(t, function() {
                    ki(t.doc, Hr(n, r), Xa), (n.bad || r.bad) && (t.curOp.selectionChanged = !0)
                })
            }
        }
    }, as.prototype.pollContent = function() {
        null != this.readDOMTimeout && (clearTimeout(this.readDOMTimeout), this.readDOMTimeout = null);
        var e, t, n, r = this.cm,
            i = r.display,
            o = r.doc.sel.primary(),
            a = o.from(),
            l = o.to();
        if (0 == a.ch && a.line > r.firstLine() && (a = j(a.line - 1, M(r.doc, a.line - 1).length)), l.ch == M(r.doc, l.line).text.length && l.line < r.lastLine() && (l = j(l.line + 1, 0)), a.line < i.viewFrom || l.line > i.viewTo - 1) return !1;
        a.line == i.viewFrom || 0 == (e = Mn(r, a.line)) ? (t = N(i.view[0].line), n = i.view[0].node) : (t = N(i.view[e].line), n = i.view[e - 1].node.nextSibling);
        var s, c, u = Mn(r, l.line);
        if (u == i.view.length - 1 ? (s = i.viewTo - 1, c = i.lineDiv.lastChild) : (s = N(i.view[u + 1].line) - 1, c = i.view[u + 1].node.previousSibling), !n) return !1;
        for (var f = r.doc.splitLines(fa(r, n, c, t, s)), d = z(r.doc, j(t, 0), j(s, M(r.doc, s).text.length)); f.length > 1 && d.length > 1;)
            if (m(f) == m(d)) f.pop(), d.pop(), s--;
            else {
                if (f[0] != d[0]) break;
                f.shift(), d.shift(), t++
            }
        for (var h = 0, p = 0, g = f[0], v = d[0], y = Math.min(g.length, v.length); h < y && g.charCodeAt(h) == v.charCodeAt(h);) ++h;
        for (var b = m(f), x = m(d), k = Math.min(b.length - (1 == f.length ? h : 0), x.length - (1 == d.length ? h : 0)); p < k && b.charCodeAt(b.length - p - 1) == x.charCodeAt(x.length - p - 1);) ++p;
        if (1 == f.length && 1 == d.length && t == a.line)
            for (; h && h > a.ch && b.charCodeAt(b.length - p - 1) == x.charCodeAt(x.length - p - 1);) h--, p++;
        f[f.length - 1] = b.slice(0, b.length - p).replace(/^\u200b+/, ""), f[0] = f[0].slice(h).replace(/\u200b+$/, "");
        var w = j(t, h),
            C = j(s, d.length ? m(d).length - p : 0);
        return f.length > 1 || f[0] || I(w, C) ? (Di(r.doc, f, w, C, "+input"), !0) : void 0
    }, as.prototype.ensurePolled = function() {
        this.forceCompositionEnd()
    }, as.prototype.reset = function() {
        this.forceCompositionEnd()
    }, as.prototype.forceCompositionEnd = function() {
        this.composing && (clearTimeout(this.readDOMTimeout), this.composing = null, this.updateFromDOM(), this.div.blur(), this.div.focus())
    }, as.prototype.readFromDOMSoon = function() {
        var e = this;
        null == this.readDOMTimeout && (this.readDOMTimeout = setTimeout(function() {
            if (e.readDOMTimeout = null, e.composing) {
                if (!e.composing.done) return;
                e.composing = null
            }
            e.updateFromDOM()
        }, 80))
    }, as.prototype.updateFromDOM = function() {
        var e = this;
        !this.cm.isReadOnly() && this.pollContent() || pr(this.cm, function() {
            return yr(e.cm)
        })
    }, as.prototype.setUneditable = function(e) {
        e.contentEditable = "false"
    }, as.prototype.onKeyPress = function(e) {
        0 == e.charCode || this.composing || (e.preventDefault(), this.cm.isReadOnly() || mr(this.cm, Jo)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0))
    }, as.prototype.readOnlyChanged = function(e) {
        this.div.contentEditable = String("nocursor" != e)
    }, as.prototype.onContextMenu = function() {}, as.prototype.resetPosition = function() {}, as.prototype.needsContentAttribute = !0;
    var ls = function(e) {
        this.cm = e, this.prevInput = "", this.pollingFast = !1, this.polling = new qa, this.hasSelection = !1, this.composing = null
    };
    ls.prototype.init = function(e) {
            function t(e) {
                if (!ze(i, e)) {
                    if (i.somethingSelected()) Qo({
                        lineWise: !1,
                        text: i.getSelections()
                    });
                    else {
                        if (!i.options.lineWiseCopyCut) return;
                        var t = na(i);
                        Qo({
                            lineWise: !0,
                            text: t.text
                        }), "cut" == e.type ? i.setSelections(t.ranges, null, Xa) : (r.prevInput = "", o.value = t.text.join("\n"), Ba(o))
                    }
                    "cut" == e.type && (i.state.cutIncoming = !0)
                }
            }
            var n = this,
                r = this,
                i = this.cm;
            this.createField(e);
            var o = this.textarea;
            e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild), Na && (o.style.width = "0px"), al(o, "input", function() {
                wa && Ca >= 9 && n.hasSelection && (n.hasSelection = null), r.poll()
            }), al(o, "paste", function(e) {
                ze(i, e) || ea(e, i) || (i.state.pasteIncoming = !0, r.fastPoll())
            }), al(o, "cut", t), al(o, "copy", t), al(e.scroller, "paste", function(t) {
                It(e, t) || ze(i, t) || (i.state.pasteIncoming = !0, r.focus())
            }), al(e.lineSpace, "selectstart", function(t) {
                It(e, t) || Pe(t)
            }), al(o, "compositionstart", function() {
                var e = i.getCursor("from");
                r.composing && r.composing.range.clear(), r.composing = {
                    start: e,
                    range: i.markText(e, i.getCursor("to"), {
                        className: "CodeMirror-composing"
                    })
                }
            }), al(o, "compositionend", function() {
                r.composing && (r.poll(), r.composing.range.clear(), r.composing = null)
            })
        }, ls.prototype.createField = function() {
            this.wrapper = ia(), this.textarea = this.wrapper.firstChild
        }, ls.prototype.prepareSelection = function() {
            var e = this.cm,
                t = e.display,
                n = e.doc,
                r = An(e);
            if (e.options.moveInputWithCursor) {
                var i = un(e, n.sel.primary().head, "div"),
                    o = t.wrapper.getBoundingClientRect(),
                    a = t.lineDiv.getBoundingClientRect();
                r.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, i.top + a.top - o.top)), r.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, i.left + a.left - o.left))
            }
            return r
        }, ls.prototype.showSelection = function(e) {
            var t = this.cm.display;
            n(t.cursorDiv, e.cursors), n(t.selectionDiv, e.selection), null != e.teTop && (this.wrapper.style.top = e.teTop + "px", this.wrapper.style.left = e.teLeft + "px")
        }, ls.prototype.reset = function(e) {
            if (!this.contextMenuPending && !this.composing) {
                var t = this.cm;
                if (t.somethingSelected()) {
                    this.prevInput = "";
                    var n = t.getSelection();
                    this.textarea.value = n, t.state.focused && Ba(this.textarea), wa && Ca >= 9 && (this.hasSelection = n)
                } else e || (this.prevInput = this.textarea.value = "", wa && Ca >= 9 && (this.hasSelection = null))
            }
        }, ls.prototype.getField = function() {
            return this.textarea
        }, ls.prototype.supportsTouch = function() {
            return !1
        }, ls.prototype.focus = function() {
            if ("nocursor" != this.cm.options.readOnly && (!Ea || a() != this.textarea)) try {
                this.textarea.focus()
            } catch (Ka) {}
        }, ls.prototype.blur = function() {
            this.textarea.blur()
        },
        ls.prototype.resetPosition = function() {
            this.wrapper.style.top = this.wrapper.style.left = 0
        }, ls.prototype.receivedFocus = function() {
            this.slowPoll()
        }, ls.prototype.slowPoll = function() {
            var e = this;
            this.pollingFast || this.polling.set(this.cm.options.pollInterval, function() {
                e.poll(), e.cm.state.focused && e.slowPoll()
            })
        }, ls.prototype.fastPoll = function() {
            function e() {
                n.poll() || t ? (n.pollingFast = !1, n.slowPoll()) : (t = !0, n.polling.set(60, e))
            }
            var t = !1,
                n = this;
            n.pollingFast = !0, n.polling.set(20, e)
        }, ls.prototype.poll = function() {
            var e = this,
                t = this.cm,
                n = this.textarea,
                r = this.prevInput;
            if (this.contextMenuPending || !t.state.focused || cl(n) && !r && !this.composing || t.isReadOnly() || t.options.disableInput || t.state.keySeq) return !1;
            var i = n.value;
            if (i == r && !t.somethingSelected()) return !1;
            if (wa && Ca >= 9 && this.hasSelection === i || Fa && /[\uf700-\uf7ff]/.test(i)) return t.display.input.reset(), !1;
            if (t.doc.sel == t.display.selForContextMenu) {
                var o = i.charCodeAt(0);
                if (8203 != o || r || (r = "\u200b"), 8666 == o) return this.reset(), this.cm.execCommand("undo")
            }
            for (var a = 0, l = Math.min(r.length, i.length); a < l && r.charCodeAt(a) == i.charCodeAt(a);) ++a;
            return pr(t, function() {
                Jo(t, i.slice(a), r.length - a, null, e.composing ? "*compose" : null), i.length > 1e3 || i.indexOf("\n") > -1 ? n.value = e.prevInput = "" : e.prevInput = i, e.composing && (e.composing.range.clear(), e.composing.range = t.markText(e.composing.start, t.getCursor("to"), {
                    className: "CodeMirror-composing"
                }))
            }), !0
        }, ls.prototype.ensurePolled = function() {
            this.pollingFast && this.poll() && (this.pollingFast = !1)
        }, ls.prototype.onKeyPress = function() {
            wa && Ca >= 9 && (this.hasSelection = null), this.fastPoll()
        }, ls.prototype.onContextMenu = function(e) {
            function t() {
                if (null != a.selectionStart) {
                    var e = i.somethingSelected(),
                        t = "\u200b" + (e ? a.value : "");
                    a.value = "\u21da", a.value = t, r.prevInput = e ? "" : "\u200b", a.selectionStart = 1, a.selectionEnd = t.length, o.selForContextMenu = i.doc.sel
                }
            }
            function n() {
                if (r.contextMenuPending = !1, r.wrapper.style.cssText = u, a.style.cssText = c, wa && Ca < 9 && o.scrollbars.setScrollTop(o.scroller.scrollTop = s), null != a.selectionStart) {
                    (!wa || wa && Ca < 9) && t();
                    var e = 0,
                        n = function() {
                            o.selForContextMenu == i.doc.sel && 0 == a.selectionStart && a.selectionEnd > 0 && "\u200b" == r.prevInput ? mr(i, Ai)(i) : e++ < 10 ? o.detectingSelectAll = setTimeout(n, 500) : (o.selForContextMenu = null, o.input.reset())
                        };
                    o.detectingSelectAll = setTimeout(n, 200)
                }
            }
            var r = this,
                i = r.cm,
                o = i.display,
                a = r.textarea,
                l = Tn(i, e),
                s = o.scroller.scrollTop;
            if (l && !Ma) {
                i.options.resetSelectionOnContextMenu && -1 == i.doc.sel.contains(l) && mr(i, ki)(i.doc, Hr(l), Xa);
                var c = a.style.cssText,
                    u = r.wrapper.style.cssText;
                r.wrapper.style.cssText = "position: absolute";
                var f, d = r.wrapper.getBoundingClientRect();
                if (a.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - d.top - 5) + "px; left: " + (e.clientX - d.left - 5) + "px;\n      z-index: 1000; background: " + (wa ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);", Sa && (f = window.scrollY), o.input.focus(), Sa && window.scrollTo(null, f), o.input.reset(), i.somethingSelected() || (a.value = r.prevInput = " "), r.contextMenuPending = !0, o.selForContextMenu = i.doc.sel, clearTimeout(o.detectingSelectAll), wa && Ca >= 9 && t(), Ra) {
                    je(e);
                    var h = function() {
                        Te(window, "mouseup", h), setTimeout(n, 20)
                    };
                    al(window, "mouseup", h)
                } else setTimeout(n, 50)
            }
        }, ls.prototype.readOnlyChanged = function(e) {
            e || this.reset(), this.textarea.disabled = "nocursor" == e
        }, ls.prototype.setUneditable = function() {}, ls.prototype.needsContentAttribute = !1, $o(Xo), oa(Xo);
    var ss = "iter insert remove copy getEditor constructor".split(" ");
    for (var cs in Rl.prototype) Rl.prototype.hasOwnProperty(cs) && d(ss, cs) < 0 && (Xo.prototype[cs] = function(e) {
        return function() {
            return e.apply(this.doc, arguments)
        }
    }(Rl.prototype[cs]));
    return Ne(Rl), Xo.inputStyles = {
        textarea: ls,
        contenteditable: as
    }, Xo.defineMode = function(e) {
        Xo.defaults.mode || "null" == e || (Xo.defaults.mode = e), He.apply(this, arguments)
    }, Xo.defineMIME = Be, Xo.defineMode("null", function() {
        return {
            token: function(e) {
                return e.skipToEnd()
            }
        }
    }), Xo.defineMIME("text/plain", "null"), Xo.defineExtension = function(e, t) {
        Xo.prototype[e] = t
    }, Xo.defineDocExtension = function(e, t) {
        Rl.prototype[e] = t
    }, Xo.fromTextArea = pa, ma(Xo), Xo.version = "5.40.0", Xo
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
    "use strict";
    function t(e) {
        var t = e.search(r);
        return -1 == t ? 0 : t
    }
    var n = {},
        r = /[^\s\u00a0]/,
        i = e.Pos;
    e.commands.toggleComment = function(e) {
        e.toggleComment()
    }, e.defineExtension("toggleComment", function(e) {
        e || (e = n);
        for (var t = this, r = Infinity, o = this.listSelections(), a = null, l = o.length - 1; l >= 0; l--) {
            var s = o[l].from(),
                c = o[l].to();
            s.line >= r || (c.line >= r && (c = i(r, 0)), r = s.line, null == a ? t.uncomment(s, c, e) ? a = "un" : (t.lineComment(s, c, e), a = "line") : "un" == a ? t.uncomment(s, c, e) : t.lineComment(s, c, e))
        }
    }), e.defineExtension("toggleBlockComment", function(e) {
        e || (e = n);
        for (var t = this, r = Infinity, o = this.listSelections(), a = null, l = o.length - 1; l >= 0; l--) {
            var s = o[l].from(),
                c = o[l].to();
            s.line >= r || (c.line >= r && (c = i(r, 0)), r = s.line, null == a ? t.uncomment(s, c, e) ? a = "un" : (t.blockComment(s, c, e), a = "block") : "un" == a ? t.uncomment(s, c, e) : t.blockComment(s, c, e))
        }
    }), e.defineExtension("lineComment", function(e, o, a) {
        a || (a = n);
        var l = this,
            s = l.getModeAt(e),
            c = a.lineComment || s.lineComment;
        if (c) {
            if (null != l.getLine(e.line)) {
                var u = Math.min(0 != o.ch || o.line == e.line ? o.line + 1 : o.line, l.lastLine() + 1),
                    f = null == a.padding ? " " : a.padding,
                    d = a.commentBlankLines || e.line == o.line;
                l.operation(function() {
                    if (a.indent) {
                        for (var n = null, o = e.line; o < u; ++o) {
                            var s = (h = l.getLine(o)).slice(0, t(h));
                            (null == n || n.length > s.length) && (n = s)
                        }
                        for (o = e.line; o < u; ++o) {
                            var h = l.getLine(o),
                                p = n.length;
                            (d || r.test(h)) && (h.slice(0, p) != n && (p = t(h)), l.replaceRange(n + c + f, i(o, 0), i(o, p)))
                        }
                    } else
                        for (o = e.line; o < u; ++o)(d || r.test(l.getLine(o))) && l.replaceRange(c + f, i(o, 0))
                })
            }
        } else(a.blockCommentStart || s.blockCommentStart) && (a.fullLines = !0, l.blockComment(e, o, a))
    }), e.defineExtension("blockComment", function(e, t, o) {
        o || (o = n);
        var a = this,
            l = a.getModeAt(e),
            s = o.blockCommentStart || l.blockCommentStart,
            c = o.blockCommentEnd || l.blockCommentEnd,
            u = o.blockCommentIndent || !1,
            f = u && a.getLine(e.line).match(/[^ ]/);
        if (u && a.indentSelection("add"), f && a.indentLine(e.line, "subtract"), s && c) {
            var d = null == o.padding ? " " : o.padding,
                h = Math.min(t.line, a.lastLine());
            h != e.line && 0 == t.ch && r.test(a.getLine(h)) && --h, e.line > h || a.operation(function() {
                if (0 != o.fullLines) {
                    var n = r.test(a.getLine(h));
                    " " !== c && a.replaceRange(d + c, i(h)), a.replaceRange(s + d, i(e.line, 0));
                    var u = o.blockCommentLead || l.blockCommentLead;
                    if (null != u)
                        for (var f = e.line + 1; f <= h; ++f)(f != h || n) && a.replaceRange(u + d, i(f, 0))
                } else a.replaceRange(d + c, t), a.replaceRange(s + d, e)
            })
        } else(o.lineComment || l.lineComment) && 0 != o.fullLines && a.lineComment(e, t, o)
    }), e.defineExtension("uncomment", function(e, t, o) {
        function a() {
            y && s.indentSelection("subtract")
        }
        o || (o = n);
        var l, s = this,
            c = s.getModeAt(e),
            u = Math.min(0 != t.ch || t.line == e.line ? t.line : t.line - 1, s.lastLine()),
            f = Math.min(e.line, u),
            d = o.blockCommentIndent || !1,
            h = d && e.line !== t.line,
            p = o.lineComment || c.lineComment,
            m = [],
            g = o.blockCommentStart,
            v = null == o.padding ? " " : o.padding,
            y = !1;
        e: if (p) {
            for (var b = f; b <= u; ++b) {
                var x = s.getLine(b),
                    k = d ? x.indexOf(g) : -1;
                if (k > -1 && (y = !0), -1 == k && (k = x.indexOf(p)), k > -1 && !/comment/.test(s.getTokenTypeAt(i(b, k + 1))) && (k = -1), -1 == k && (b != u || b == f) && r.test(x)) break e;
                if (k > -1 && r.test(x.slice(0, k))) break e;
                m.push(x)
            }
            if (s.operation(function() {
                    for (var e = f; e <= u; ++e) {
                        var t = y ? g : p,
                            n = m[e - f],
                            r = n.indexOf(t),
                            o = r + t.length;
                        r < 0 || (n.slice(o, o + v.length) == v && (o += v.length), l = !0, s.replaceRange("", i(e, r), i(e, o)))
                    }
                }), a(), l) return !0
        }
        var w = o.blockCommentStart || c.blockCommentStart,
            C = o.blockCommentEnd || c.blockCommentEnd,
            S = w && " " === C;
        if (!w || !C) return !1;
        var L = o.blockCommentLead || c.blockCommentLead,
            T = s.getLine(f),
            M = u == f ? T : s.getLine(u),
            z = T.indexOf(w),
            A = h ? M.length : M.lastIndexOf(C);
        if (-1 == A && f != u && (M = s.getLine(--u), A = M.lastIndexOf(C)), a(), -1 == z || !S && -1 == A || !/comment/.test(s.getTokenTypeAt(i(f, z + 1))) || !S && !/comment/.test(s.getTokenTypeAt(i(u, A + 1)))) return !1;
        var O = T.lastIndexOf(w, e.ch),
            N = -1 == O ? -1 : T.slice(0, e.ch).indexOf(C, O + w.length);
        if (-1 != O && -1 != N && N + C.length != e.ch) return !1;
        N = M.indexOf(C, t.ch);
        var P = M.slice(t.ch).lastIndexOf(w, N - t.ch);
        return O = -1 == N || -1 == P ? -1 : t.ch + P, (-1 == N || -1 == O || O == t.ch) && (s.operation(function() {
            var e = h ? 0 : C.length;
            s.replaceRange("", i(u, A - (v && M.slice(A - v.length, A) == v ? v.length : 0)), i(u, A + e));
            var t = z + w.length;
            if (v && T.slice(t, t + v.length) == v && (t += v.length), s.replaceRange("", i(f, z), i(f, t)), L)
                for (var n = f + 1; n <= u; ++n) {
                    var o = s.getLine(n),
                        a = o.indexOf(L);
                    if (-1 != a && !r.test(o.slice(0, a))) {
                        var l = a + L.length;
                        v && o.slice(l, l + v.length) == v && (l += v.length), s.replaceRange("", i(n, a), i(n, l))
                    }
                }
        }), !0)
    })
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
    function t(t, n, r) {
        var i, o = t.getWrapperElement();
        return (i = o.appendChild(document.createElement("div"))).className = r ? "CodeMirror-dialog CodeMirror-dialog-bottom" : "CodeMirror-dialog CodeMirror-dialog-top", "string" == typeof n ? i.innerHTML = n : i.appendChild(n), e.addClass(o, "dialog-opened"), i
    }
    function n(e, t) {
        e.state.currentNotificationClose && e.state.currentNotificationClose(), e.state.currentNotificationClose = t
    }
    e.defineExtension("openDialog", function(r, i, o) {
        function a(t) {
            if ("string" == typeof t) f.value = t;
            else {
                if (c) return;
                c = !0, e.rmClass(s.parentNode, "dialog-opened"), s.parentNode.removeChild(s), u.focus(), o.onClose && o.onClose(s)
            }
        }
        o || (o = {}), n(this, null);
        var l, s = t(this, r, o.bottom),
            c = !1,
            u = this,
            f = s.getElementsByTagName("input")[0];
        return f ? (f.focus(), o.value && (f.value = o.value, !1 !== o.selectValueOnOpen && f.select()), o.onInput && e.on(f, "input", function(e) {
            o.onInput(e, f.value, a)
        }), o.onKeyUp && e.on(f, "keyup", function(e) {
            o.onKeyUp(e, f.value, a)
        }), e.on(f, "keydown", function(t) {
            o && o.onKeyDown && o.onKeyDown(t, f.value, a) || ((27 == t.keyCode || !1 !== o.closeOnEnter && 13 == t.keyCode) && (f.blur(), e.e_stop(t), a()), 13 == t.keyCode && i(f.value, t))
        }), !1 !== o.closeOnBlur && e.on(f, "blur", a)) : (l = s.getElementsByTagName("button")[0]) && (e.on(l, "click", function() {
            a(), u.focus()
        }), !1 !== o.closeOnBlur && e.on(l, "blur", a), l.focus()), a
    }), e.defineExtension("openConfirm", function(r, i, o) {
        function a() {
            c || (c = !0, e.rmClass(l.parentNode, "dialog-opened"), l.parentNode.removeChild(l), u.focus())
        }
        n(this, null);
        var l = t(this, r, o && o.bottom),
            s = l.getElementsByTagName("button"),
            c = !1,
            u = this,
            f = 1;
        s[0].focus();
        for (var d = 0; d < s.length; ++d) {
            var h = s[d];
            ! function(t) {
                e.on(h, "click", function(n) {
                    e.e_preventDefault(n), a(), t && t(u)
                })
            }(i[d]), e.on(h, "blur", function() {
                --f, setTimeout(function() {
                    f <= 0 && a()
                }, 200)
            }), e.on(h, "focus", function() {
                ++f
            })
        }
    }), e.defineExtension("openNotification", function(r, i) {
        function o() {
            s || (s = !0, clearTimeout(a), e.rmClass(l.parentNode, "dialog-opened"), l.parentNode.removeChild(l))
        }
        n(this, o);
        var a, l = t(this, r, i && i.bottom),
            s = !1,
            c = i && "undefined" != typeof i.duration ? i.duration : 5e3;
        return e.on(l, "click", function(t) {
            e.e_preventDefault(t), o()
        }), c && (a = setTimeout(o, c)), o
    })
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
    function t(e) {
        e.state.placeholder && (e.state.placeholder.parentNode.removeChild(e.state.placeholder), e.state.placeholder = null)
    }
    function n(e) {
        t(e);
        var n = e.state.placeholder = document.createElement("pre");
        n.style.cssText = "height: 0; overflow: visible", n.style.direction = e.getOption("direction"), n.className = "CodeMirror-placeholder";
        var r = e.getOption("placeholder");
        "string" == typeof r && (r = document.createTextNode(r)), n.appendChild(r), e.display.lineSpace.insertBefore(n, e.display.lineSpace.firstChild)
    }
    function r(e) {
        o(e) && n(e)
    }
    function i(e) {
        var r = e.getWrapperElement(),
            i = o(e);
        r.className = r.className.replace(" CodeMirror-empty", "") + (i ? " CodeMirror-empty" : ""), i ? n(e) : t(e)
    }
    function o(e) {
        return 1 === e.lineCount() && "" === e.getLine(0)
    }
    e.defineOption("placeholder", "", function(n, o, a) {
        var l = a && a != e.Init;
        if (o && !l) n.on("blur", r), n.on("change", i), n.on("swapDoc", i), i(n);
        else if (!o && l) {
            n.off("blur", r), n.off("change", i), n.off("swapDoc", i), t(n);
            var s = n.getWrapperElement();
            s.className = s.className.replace(" CodeMirror-empty", "")
        }
        o && !n.hasFocus() && r(n)
    })
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
    function t(e, t) {
        return "pairs" == t && "string" == typeof e ? e : "object" == typeof e && null != e[t] ? e[t] : f[t]
    }
    function n(e) {
        for (var t = 0; t < e.length; t++) {
            var n = e.charAt(t),
                i = "'" + n + "'";
            h[i] || (h[i] = r(n))
        }
    }
    function r(e) {
        return function(t) {
            return s(t, e)
        }
    }
    function i(e) {
        var t = e.state.closeBrackets;
        return !t || t.override ? t : e.getModeAt(e.getCursor()).closeBrackets || t
    }
    function o(n) {
        var r = i(n);
        if (!r || n.getOption("disableInput")) return e.Pass;
        for (var o = t(r, "pairs"), a = n.listSelections(), l = 0; l < a.length; l++) {
            if (!a[l].empty()) return e.Pass;
            var s = c(n, a[l].head);
            if (!s || o.indexOf(s) % 2 != 0) return e.Pass
        }
        for (l = a.length - 1; l >= 0; l--) {
            var u = a[l].head;
            n.replaceRange("", d(u.line, u.ch - 1), d(u.line, u.ch + 1), "+delete")
        }
    }
    function a(n) {
        var r = i(n),
            o = r && t(r, "explode");
        if (!o || n.getOption("disableInput")) return e.Pass;
        for (var a = n.listSelections(), l = 0; l < a.length; l++) {
            if (!a[l].empty()) return e.Pass;
            var s = c(n, a[l].head);
            if (!s || o.indexOf(s) % 2 != 0) return e.Pass
        }
        n.operation(function() {
            var e = n.lineSeparator() || "\n";
            n.replaceSelection(e + e, null), n.execCommand("goCharLeft"), a = n.listSelections();
            for (var t = 0; t < a.length; t++) {
                var r = a[t].head.line;
                n.indentLine(r, null, !0), n.indentLine(r + 1, null, !0)
            }
        })
    }
    function l(t) {
        var n = e.cmpPos(t.anchor, t.head) > 0;
        return {
            anchor: new d(t.anchor.line, t.anchor.ch + (n ? -1 : 1)),
            head: new d(t.head.line, t.head.ch + (n ? 1 : -1))
        }
    }
    function s(n, r) {
        var o = i(n);
        if (!o || n.getOption("disableInput")) return e.Pass;
        var a = t(o, "pairs"),
            s = a.indexOf(r);
        if (-1 == s) return e.Pass;
        for (var c, f = t(o, "triples"), h = a.charAt(s + 1) == r, p = n.listSelections(), m = s % 2 == 0, g = 0; g < p.length; g++) {
            var v, y = p[g],
                b = y.head,
                x = n.getRange(b, d(b.line, b.ch + 1));
            if (m && !y.empty()) v = "surround";
            else if (!h && m || x != r)
                if (h && b.ch > 1 && f.indexOf(r) >= 0 && n.getRange(d(b.line, b.ch - 2), b) == r + r) {
                    if (b.ch > 2 && /\bstring/.test(n.getTokenTypeAt(d(b.line, b.ch - 2)))) return e.Pass;
                    v = "addFour"
                } else if (h) {
                var k = 0 == b.ch ? " " : n.getRange(d(b.line, b.ch - 1), b);
                if (e.isWordChar(x) || k == r || e.isWordChar(k)) return e.Pass;
                v = "both"
            } else {
                if (!m) return e.Pass;
                v = "both"
            } else v = h && u(n, b) ? "both" : f.indexOf(r) >= 0 && n.getRange(b, d(b.line, b.ch + 3)) == r + r + r ? "skipThree" : "skip";
            if (c) {
                if (c != v) return e.Pass
            } else c = v
        }
        var w = s % 2 ? a.charAt(s - 1) : r,
            C = s % 2 ? r : a.charAt(s + 1);
        n.operation(function() {
            if ("skip" == c) n.execCommand("goCharRight");
            else if ("skipThree" == c)
                for (var e = 0; e < 3; e++) n.execCommand("goCharRight");
            else if ("surround" == c) {
                var t = n.getSelections();
                for (e = 0; e < t.length; e++) t[e] = w + t[e] + C;
                n.replaceSelections(t, "around"), t = n.listSelections().slice();
                for (e = 0; e < t.length; e++) t[e] = l(t[e]);
                n.setSelections(t)
            } else "both" == c ? (n.replaceSelection(w + C, null), n.triggerElectric(w + C), n.execCommand("goCharLeft")) : "addFour" == c && (n.replaceSelection(w + w + w + w, "before"), n.execCommand("goCharRight"))
        })
    }
    function c(e, t) {
        var n = e.getRange(d(t.line, t.ch - 1), d(t.line, t.ch + 1));
        return 2 == n.length ? n : null
    }
    function u(e, t) {
        var n = e.getTokenAt(d(t.line, t.ch + 1));
        return /\bstring/.test(n.type) && n.start == t.ch && (0 == t.ch || !/\bstring/.test(e.getTokenTypeAt(t)))
    }
    var f = {
            pairs: "()[]{}''\"\"",
            triples: "",
            explode: "[]{}"
        },
        d = e.Pos;
    e.defineOption("autoCloseBrackets", !1, function(r, i, o) {
        o && o != e.Init && (r.removeKeyMap(h), r.state.closeBrackets = null), i && (n(t(i, "pairs")), r.state.closeBrackets = i, r.addKeyMap(h))
    });
    var h = {
        Backspace: o,
        Enter: a
    };
    n(f.pairs + "`")
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../fold/xml-fold")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../fold/xml-fold"], e) : e(CodeMirror)
}(function(e) {
    function t(t) {
        if (t.getOption("disableInput")) return e.Pass;
        for (var n = t.listSelections(), r = [], s = t.getOption("autoCloseTags"), c = 0; c < n.length; c++) {
            if (!n[c].empty()) return e.Pass;
            var u = n[c].head,
                f = t.getTokenAt(u),
                d = e.innerMode(t.getMode(), f.state),
                h = d.state;
            if ("xml" != d.mode.name || !h.tagName) return e.Pass;
            var p = "html" == d.mode.configuration,
                m = "object" == typeof s && s.dontCloseTags || p && a,
                g = "object" == typeof s && s.indentTags || p && l,
                v = h.tagName;
            f.end > u.ch && (v = v.slice(0, v.length - f.end + u.ch));
            var y = v.toLowerCase();
            if (!v || "string" == f.type && (f.end != u.ch || !/[\"\']/.test(f.string.charAt(f.string.length - 1)) || 1 == f.string.length) || "tag" == f.type && "closeTag" == h.type || f.string.indexOf("/") == f.string.length - 1 || m && i(m, y) > -1 || o(t, v, u, h, !0)) return e.Pass;
            var b = g && i(g, y) > -1;
            r[c] = {
                indent: b,
                text: ">" + (b ? "\n\n" : "") + "</" + v + ">",
                newPos: b ? e.Pos(u.line + 1, 0) : e.Pos(u.line, u.ch + 1)
            }
        }
        var x = "object" == typeof s && s.dontIndentOnAutoClose;
        for (c = n.length - 1; c >= 0; c--) {
            var k = r[c];
            t.replaceRange(k.text, n[c].head, n[c].anchor, "+insert");
            var w = t.listSelections().slice(0);
            w[c] = {
                head: k.newPos,
                anchor: k.newPos
            }, t.setSelections(w), !x && k.indent && (t.indentLine(k.newPos.line, null, !0), t.indentLine(k.newPos.line + 1, null, !0))
        }
    }
    function n(t, n) {
        for (var r = t.listSelections(), i = [], a = n ? "/" : "</", l = t.getOption("autoCloseTags"), s = "object" == typeof l && l.dontIndentOnSlash, c = 0; c < r.length; c++) {
            if (!r[c].empty()) return e.Pass;
            var u, f = r[c].head,
                d = t.getTokenAt(f),
                h = e.innerMode(t.getMode(), d.state),
                p = h.state;
            if (n && ("string" == d.type || "<" != d.string.charAt(0) || d.start != f.ch - 1)) return e.Pass;
            if ("xml" != h.mode.name)
                if ("htmlmixed" == t.getMode().name && "javascript" == h.mode.name) u = a + "script";
                else {
                    if ("htmlmixed" != t.getMode().name || "css" != h.mode.name) return e.Pass;
                    u = a + "style"
                }
            else {
                if (!p.context || !p.context.tagName || o(t, p.context.tagName, f, p)) return e.Pass;
                u = a + p.context.tagName
            }
            ">" != t.getLine(f.line).charAt(d.end) && (u += ">"), i[c] = u
        }
        if (t.replaceSelections(i), r = t.listSelections(), !s)
            for (c = 0; c < r.length; c++)(c == r.length - 1 || r[c].head.line < r[c + 1].head.line) && t.indentLine(r[c].head.line)
    }
    function r(t) {
        return t.getOption("disableInput") ? e.Pass : n(t, !0)
    }
    function i(e, t) {
        if (e.indexOf) return e.indexOf(t);
        for (var n = 0, r = e.length; n < r; ++n)
            if (e[n] == t) return n;
        return -1
    }
    function o(t, n, r, i, o) {
        if (!e.scanForClosingTag) return !1;
        var a = Math.min(t.lastLine() + 1, r.line + 500),
            l = e.scanForClosingTag(t, r, null, a);
        if (!l || l.tag != n) return !1;
        for (var s = i.context, c = o ? 1 : 0; s && s.tagName == n; s = s.prev) ++c;
        r = l.to;
        for (var u = 1; u < c; u++) {
            var f = e.scanForClosingTag(t, r, null, a);
            if (!f || f.tag != n) return !1;
            r = f.to
        }
        return !0
    }
    e.defineOption("autoCloseTags", !1, function(n, i, o) {
        if (o != e.Init && o && n.removeKeyMap("autoCloseTags"), i) {
            var a = {
                name: "autoCloseTags"
            };
            ("object" != typeof i || i.whenClosing) && (a["'/'"] = function(e) {
                return r(e)
            }), ("object" != typeof i || i.whenOpening) && (a["'>'"] = function(e) {
                return t(e)
            }), n.addKeyMap(a)
        }
    });
    var a = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"],
        l = ["applet", "blockquote", "body", "button", "div", "dl", "fieldset", "form", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "html", "iframe", "layer", "legend", "object", "ol", "p", "select", "table", "ul"];
    e.commands.closeTag = function(e) {
        return n(e)
    }
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
    function t(e, t, r) {
        var i = e.getLineHandle(t.line),
            o = t.ch - 1,
            s = r && r.afterCursor;
        null == s && (s = /(^| )cm-fat-cursor($| )/.test(e.getWrapperElement().className));
        var c = !s && o >= 0 && l[i.text.charAt(o)] || l[i.text.charAt(++o)];
        if (!c) return null;
        var u = ">" == c.charAt(1) ? 1 : -1;
        if (r && r.strict && u > 0 != (o == t.ch)) return null;
        var f = e.getTokenTypeAt(a(t.line, o + 1)),
            d = n(e, a(t.line, o + (u > 0 ? 1 : 0)), u, f || null, r);
        return null == d ? null : {
            from: a(t.line, o),
            to: d && d.pos,
            match: d && d.ch == c.charAt(0),
            forward: u > 0
        }
    }
    function n(e, t, n, r, i) {
        for (var o = i && i.maxScanLineLength || 1e4, s = i && i.maxScanLines || 1e3, c = [], u = i && i.bracketRegex ? i.bracketRegex : /[(){}[\]]/, f = n > 0 ? Math.min(t.line + s, e.lastLine() + 1) : Math.max(e.firstLine() - 1, t.line - s), d = t.line; d != f; d += n) {
            var h = e.getLine(d);
            if (h) {
                var p = n > 0 ? 0 : h.length - 1,
                    m = n > 0 ? h.length : -1;
                if (!(h.length > o))
                    for (d == t.line && (p = t.ch - (n < 0 ? 1 : 0)); p != m; p += n) {
                        var g = h.charAt(p);
                        if (u.test(g) && (r === undefined || e.getTokenTypeAt(a(d, p + 1)) == r))
                            if (">" == l[g].charAt(1) == n > 0) c.push(g);
                            else {
                                if (!c.length) return {
                                    pos: a(d, p),
                                    ch: g
                                };
                                c.pop()
                            }
                    }
            }
        }
        return d - n != (n > 0 ? e.lastLine() : e.firstLine()) && null
    }
    function r(e, n, r) {
        for (var i = e.state.matchBrackets.maxHighlightLineLength || 1e3, l = [], s = e.listSelections(), c = 0; c < s.length; c++) {
            var u = s[c].empty() && t(e, s[c].head, r);
            if (u && e.getLine(u.from.line).length <= i) {
                var f = u.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
                l.push(e.markText(u.from, a(u.from.line, u.from.ch + 1), {
                    className: f
                })), u.to && e.getLine(u.to.line).length <= i && l.push(e.markText(u.to, a(u.to.line, u.to.ch + 1), {
                    className: f
                }))
            }
        }
        if (l.length) {
            o && e.state.focused && e.focus();
            var d = function() {
                e.operation(function() {
                    for (var e = 0; e < l.length; e++) l[e].clear()
                })
            };
            if (!n) return d;
            setTimeout(d, 800)
        }
    }
    function i(e) {
        e.operation(function() {
            e.state.matchBrackets.currentlyHighlighted && (e.state.matchBrackets.currentlyHighlighted(), e.state.matchBrackets.currentlyHighlighted = null), e.state.matchBrackets.currentlyHighlighted = r(e, !1, e.state.matchBrackets)
        })
    }
    var o = /MSIE \d/.test(navigator.userAgent) && (null == document.documentMode || document.documentMode < 8),
        a = e.Pos,
        l = {
            "(": ")>",
            ")": "(<",
            "[": "]>",
            "]": "[<",
            "{": "}>",
            "}": "{<"
        };
    e.defineOption("matchBrackets", !1, function(t, n, r) {
        r && r != e.Init && (t.off("cursorActivity", i), t.state.matchBrackets && t.state.matchBrackets.currentlyHighlighted && (t.state.matchBrackets.currentlyHighlighted(), t.state.matchBrackets.currentlyHighlighted = null)), n && (t.state.matchBrackets = "object" == typeof n ? n : {}, t.on("cursorActivity", i))
    }), e.defineExtension("matchBrackets", function() {
        r(this, !0)
    }), e.defineExtension("findMatchingBracket", function(e, n, r) {
        return (r || "boolean" == typeof n) && (r ? (r.strict = n, n = r) : n = n ? {
            strict: !0
        } : null), t(this, e, n)
    }), e.defineExtension("scanForBracket", function(e, t, r, i) {
        return n(this, e, t, r, i)
    })
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../fold/xml-fold")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../fold/xml-fold"], e) : e(CodeMirror)
}(function(e) {
    "use strict";
    function t(e) {
        e.state.tagHit && e.state.tagHit.clear(), e.state.tagOther && e.state.tagOther.clear(), e.state.tagHit = e.state.tagOther = null
    }
    function n(n) {
        n.state.failedTagMatch = !1, n.operation(function() {
            if (t(n), !n.somethingSelected()) {
                var r = n.getCursor(),
                    i = n.getViewport();
                i.from = Math.min(i.from, r.line), i.to = Math.max(r.line + 1, i.to);
                var o = e.findMatchingTag(n, r, i);
                if (o) {
                    if (n.state.matchBothTags) {
                        var a = "open" == o.at ? o.open : o.close;
                        a && (n.state.tagHit = n.markText(a.from, a.to, {
                            className: "CodeMirror-matchingtag"
                        }))
                    }
                    var l = "close" == o.at ? o.open : o.close;
                    l ? n.state.tagOther = n.markText(l.from, l.to, {
                        className: "CodeMirror-matchingtag"
                    }) : n.state.failedTagMatch = !0
                }
            }
        })
    }
    function r(e) {
        e.state.failedTagMatch && n(e)
    }
    e.defineOption("matchTags", !1, function(i, o, a) {
        a && a != e.Init && (i.off("cursorActivity", n), i.off("viewportChange", r), t(i)), o && (i.state.matchBothTags = "object" == typeof o && o.bothTags, i.on("cursorActivity", n), i.on("viewportChange", r), n(i))
    }), e.commands.toMatchingTag = function(t) {
        var n = e.findMatchingTag(t, t.getCursor());
        if (n) {
            var r = "close" == n.at ? n.open : n.close;
            r && t.extendSelection(r.to, r.from)
        }
    }
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
    "use strict";
    e.commands.tabAndIndentMarkdownList = function(e) {
        var t = e.listSelections()[0].head;
        if (!1 !== e.getStateAfter(t.line).list) e.execCommand("indentMore");
        else if (e.options.indentWithTabs) e.execCommand("insertTab");
        else {
            var n = Array(e.options.tabSize + 1).join(" ");
            e.replaceSelection(n)
        }
    }, e.commands.shiftTabAndUnindentMarkdownList = function(e) {
        var t = e.listSelections()[0].head;
        if (!1 !== e.getStateAfter(t.line).list) e.execCommand("indentLess");
        else if (e.options.indentWithTabs) e.execCommand("insertTab");
        else {
            var n = Array(e.options.tabSize + 1).join(" ");
            e.replaceSelection(n)
        }
    }
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
    "use strict";
    e.registerHelper("fold", "brace", function(t, n) {
        function r(r) {
            for (var l = n.ch, s = 0;;) {
                var c = l <= 0 ? -1 : a.lastIndexOf(r, l - 1);
                if (-1 != c) {
                    if (1 == s && c < n.ch) break;
                    if (i = t.getTokenTypeAt(e.Pos(o, c + 1)), !/^(comment|string)/.test(i)) return c + 1;
                    l = c - 1
                } else {
                    if (1 == s) break;
                    s = 1, l = a.length
                }
            }
        }
        var i, o = n.line,
            a = t.getLine(o),
            l = "{",
            s = "}",
            c = r("{");
        if (null == c && (l = "[", s = "]", c = r("[")), null != c) {
            var u, f, d = 1,
                h = t.lastLine();
            e: for (var p = o; p <= h; ++p)
                for (var m = t.getLine(p), g = p == o ? c : 0;;) {
                    var v = m.indexOf(l, g),
                        y = m.indexOf(s, g);
                    if (v < 0 && (v = m.length), y < 0 && (y = m.length), (g = Math.min(v, y)) == m.length) break;
                    if (t.getTokenTypeAt(e.Pos(p, g + 1)) == i)
                        if (g == v) ++d;
                        else if (!--d) {
                        u = p, f = g;
                        break e
                    }++g
                }
            if (null != u && (o != u || f != c)) return {
                from: e.Pos(o, c),
                to: e.Pos(u, f)
            }
        }
    }), e.registerHelper("fold", "import", function(t, n) {
        function r(n) {
            if (n < t.firstLine() || n > t.lastLine()) return null;
            var r = t.getTokenAt(e.Pos(n, 1));
            if (/\S/.test(r.string) || (r = t.getTokenAt(e.Pos(n, r.end + 1))), "keyword" != r.type || "import" != r.string) return null;
            for (var i = n, o = Math.min(t.lastLine(), n + 10); i <= o; ++i) {
                var a = t.getLine(i).indexOf(";");
                if (-1 != a) return {
                    startCh: r.end,
                    end: e.Pos(i, a)
                }
            }
        }
        var i, o = n.line,
            a = r(o);
        if (!a || r(o - 1) || (i = r(o - 2)) && i.end.line == o - 1) return null;
        for (var l = a.end;;) {
            var s = r(l.line + 1);
            if (null == s) break;
            l = s.end
        }
        return {
            from: t.clipPos(e.Pos(o, a.startCh + 1)),
            to: l
        }
    }), e.registerHelper("fold", "include", function(t, n) {
        function r(n) {
            if (n < t.firstLine() || n > t.lastLine()) return null;
            var r = t.getTokenAt(e.Pos(n, 1));
            return /\S/.test(r.string) || (r = t.getTokenAt(e.Pos(n, r.end + 1))), "meta" == r.type && "#include" == r.string.slice(0, 8) ? r.start + 8 : void 0
        }
        var i = n.line,
            o = r(i);
        if (null == o || null != r(i - 1)) return null;
        for (var a = i;;) {
            if (null == r(a + 1)) break;
            ++a
        }
        return {
            from: e.Pos(i, o + 1),
            to: t.clipPos(e.Pos(a))
        }
    })
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
    "use strict";
    e.registerGlobalHelper("fold", "comment", function(e) {
        return e.blockCommentStart && e.blockCommentEnd
    }, function(t, n) {
        var r = t.getModeAt(n),
            i = r.blockCommentStart,
            o = r.blockCommentEnd;
        if (i && o) {
            for (var a, l = n.line, s = t.getLine(l), c = n.ch, u = 0;;) {
                var f = c <= 0 ? -1 : s.lastIndexOf(i, c - 1);
                if (-1 != f) {
                    if (1 == u && f < n.ch) return;
                    if (/comment/.test(t.getTokenTypeAt(e.Pos(l, f + 1))) && (0 == f || s.slice(f - o.length, f) == o || !/comment/.test(t.getTokenTypeAt(e.Pos(l, f))))) {
                        a = f + i.length;
                        break
                    }
                    c = f - 1
                } else {
                    if (1 == u) return;
                    u = 1, c = s.length
                }
            }
            var d, h, p = 1,
                m = t.lastLine();
            e: for (var g = l; g <= m; ++g)
                for (var v = t.getLine(g), y = g == l ? a : 0;;) {
                    var b = v.indexOf(i, y),
                        x = v.indexOf(o, y);
                    if (b < 0 && (b = v.length), x < 0 && (x = v.length), (y = Math.min(b, x)) == v.length) break;
                    if (y == b) ++p;
                    else if (!--p) {
                        d = g, h = y;
                        break e
                    }++y
                }
            if (null != d && (l != d || h != a)) return {
                from: e.Pos(l, a),
                to: e.Pos(d, h)
            }
        }
    })
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
    "use strict";
    function t(t, i, o, a) {
        function l(e) {
            var n = s(t, i);
            if (!n || n.to.line - n.from.line < c) return null;
            for (var r = t.findMarksAt(n.from), o = 0; o < r.length; ++o)
                if (r[o].__isFold && "fold" !== a) {
                    if (!e) return null;
                    n.cleared = !0, r[o].clear()
                }
            return n
        }
        if (o && o.call) {
            var s = o;
            o = null
        } else s = r(t, o, "rangeFinder");
        "number" == typeof i && (i = e.Pos(i, 0));
        var c = r(t, o, "minFoldSize"),
            u = l(!0);
        if (r(t, o, "scanUp"))
            for (; !u && i.line > t.firstLine();) i = e.Pos(i.line - 1, 0), u = l(!1);
        if (u && !u.cleared && "unfold" !== a) {
            var f = n(t, o);
            e.on(f, "mousedown", function(t) {
                d.clear(), e.e_preventDefault(t)
            });
            var d = t.markText(u.from, u.to, {
                replacedWith: f,
                clearOnEnter: r(t, o, "clearOnEnter"),
                __isFold: !0
            });
            d.on("clear", function(n, r) {
                e.signal(t, "unfold", t, n, r)
            }), e.signal(t, "fold", t, u.from, u.to)
        }
    }
    function n(e, t) {
        var n = r(e, t, "widget");
        if ("string" == typeof n) {
            var i = document.createTextNode(n);
            (n = document.createElement("span")).appendChild(i), n.className = "CodeMirror-foldmarker"
        } else n && (n = n.cloneNode(!0));
        return n
    }
    function r(e, t, n) {
        if (t && t[n] !== undefined) return t[n];
        var r = e.options.foldOptions;
        return r && r[n] !== undefined ? r[n] : i[n]
    }
    e.newFoldFunction = function(e, n) {
        return function(r, i) {
            t(r, i, {
                rangeFinder: e,
                widget: n
            })
        }
    }, e.defineExtension("foldCode", function(e, n, r) {
        t(this, e, n, r)
    }), e.defineExtension("isFolded", function(e) {
        for (var t = this.findMarksAt(e), n = 0; n < t.length; ++n)
            if (t[n].__isFold) return !0
    }), e.commands.toggleFold = function(e) {
        e.foldCode(e.getCursor())
    }, e.commands.fold = function(e) {
        e.foldCode(e.getCursor(), null, "fold")
    }, e.commands.unfold = function(e) {
        e.foldCode(e.getCursor(), null, "unfold")
    }, e.commands.foldAll = function(t) {
        t.operation(function() {
            for (var n = t.firstLine(), r = t.lastLine(); n <= r; n++) t.foldCode(e.Pos(n, 0), null, "fold")
        })
    }, e.commands.unfoldAll = function(t) {
        t.operation(function() {
            for (var n = t.firstLine(), r = t.lastLine(); n <= r; n++) t.foldCode(e.Pos(n, 0), null, "unfold")
        })
    }, e.registerHelper("fold", "combine", function() {
        var e = Array.prototype.slice.call(arguments, 0);
        return function(t, n) {
            for (var r = 0; r < e.length; ++r) {
                var i = e[r](t, n);
                if (i) return i
            }
        }
    }), e.registerHelper("fold", "auto", function(e, t) {
        for (var n = e.getHelpers(t, "fold"), r = 0; r < n.length; r++) {
            var i = n[r](e, t);
            if (i) return i
        }
    });
    var i = {
        rangeFinder: e.fold.auto,
        widget: "\u2194",
        minFoldSize: 0,
        scanUp: !1,
        clearOnEnter: !0
    };
    e.defineOption("foldOptions", null), e.defineExtension("foldOption", function(e, t) {
        return r(this, e, t)
    })
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("./foldcode")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "./foldcode"], e) : e(CodeMirror)
}(function(e) {
    "use strict";
    function t(e) {
        this.options = e, this.from = this.to = 0
    }
    function n(e) {
        return !0 === e && (e = {}), null == e.gutter && (e.gutter = "CodeMirror-foldgutter"), null == e.indicatorOpen && (e.indicatorOpen = "CodeMirror-foldgutter-open"), null == e.indicatorFolded && (e.indicatorFolded = "CodeMirror-foldgutter-folded"), e
    }
    function r(e, t) {
        for (var n = e.findMarks(f(t, 0), f(t + 1, 0)), r = 0; r < n.length; ++r)
            if (n[r].__isFold && n[r].find().from.line == t) return n[r]
    }
    function i(e) {
        if ("string" == typeof e) {
            var t = document.createElement("div");
            return t.className = e + " CodeMirror-guttermarker-subtle", t
        }
        return e.cloneNode(!0)
    }
    function o(e, t, n) {
        var o = e.state.foldGutter.options,
            a = t,
            l = e.foldOption(o, "minFoldSize"),
            s = e.foldOption(o, "rangeFinder");
        e.eachLine(t, n, function(t) {
            var n = null;
            if (r(e, a)) n = i(o.indicatorFolded);
            else {
                var c = f(a, 0),
                    u = s && s(e, c);
                u && u.to.line - u.from.line >= l && (n = i(o.indicatorOpen))
            }
            e.setGutterMarker(t, o.gutter, n), ++a
        })
    }
    function a(e) {
        var t = e.getViewport(),
            n = e.state.foldGutter;
        n && (e.operation(function() {
            o(e, t.from, t.to)
        }), n.from = t.from, n.to = t.to)
    }
    function l(e, t, n) {
        var i = e.state.foldGutter;
        if (i) {
            var o = i.options;
            if (n == o.gutter) {
                var a = r(e, t);
                a ? a.clear() : e.foldCode(f(t, 0), o.rangeFinder)
            }
        }
    }
    function s(e) {
        var t = e.state.foldGutter;
        if (t) {
            var n = t.options;
            t.from = t.to = 0, clearTimeout(t.changeUpdate), t.changeUpdate = setTimeout(function() {
                a(e)
            }, n.foldOnChangeTimeSpan || 600)
        }
    }
    function c(e) {
        var t = e.state.foldGutter;
        if (t) {
            var n = t.options;
            clearTimeout(t.changeUpdate), t.changeUpdate = setTimeout(function() {
                var n = e.getViewport();
                t.from == t.to || n.from - t.to > 20 || t.from - n.to > 20 ? a(e) : e.operation(function() {
                    n.from < t.from && (o(e, n.from, t.from), t.from = n.from), n.to > t.to && (o(e, t.to, n.to), t.to = n.to)
                })
            }, n.updateViewportTimeSpan || 400)
        }
    }
    function u(e, t) {
        var n = e.state.foldGutter;
        if (n) {
            var r = t.line;
            r >= n.from && r < n.to && o(e, r, r + 1)
        }
    }
    e.defineOption("foldGutter", !1, function(r, i, o) {
        o && o != e.Init && (r.clearGutter(r.state.foldGutter.options.gutter), r.state.foldGutter = null, r.off("gutterClick", l), r.off("change", s), r.off("viewportChange", c), r.off("fold", u), r.off("unfold", u), r.off("swapDoc", s)), i && (r.state.foldGutter = new t(n(i)), a(r), r.on("gutterClick", l), r.on("change", s), r.on("viewportChange", c), r.on("fold", u), r.on("unfold", u), r.on("swapDoc", s))
    });
    var f = e.Pos
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
    "use strict";
    e.registerHelper("fold", "markdown", function(t, n) {
        function r(n) {
            var r = t.getTokenTypeAt(e.Pos(n, 0));
            return r && /\bheader\b/.test(r)
        }
        function i(e, t, n) {
            var i = t && t.match(/^#+/);
            return i && r(e) ? i[0].length : (i = n && n.match(/^[=\-]+\s*$/)) && r(e + 1) ? "=" == n[0] ? 1 : 2 : o
        }
        var o = 100,
            a = t.getLine(n.line),
            l = t.getLine(n.line + 1),
            s = i(n.line, a, l);
        if (s === o) return undefined;
        for (var c = t.lastLine(), u = n.line, f = t.getLine(u + 2); u < c && !(i(u + 1, l, f) <= s);) ++u, l = f, f = t.getLine(u + 2);
        return {
            from: e.Pos(n.line, a.length),
            to: e.Pos(u, t.getLine(u).length)
        }
    })
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
    "use strict";
    function t(e, t) {
        return e.line - t.line || e.ch - t.ch
    }
    function n(e, t, n, r) {
        this.line = t, this.ch = n, this.cm = e, this.text = e.getLine(t), this.min = r ? Math.max(r.from, e.firstLine()) : e.firstLine(), this.max = r ? Math.min(r.to - 1, e.lastLine()) : e.lastLine()
    }
    function r(e, t) {
        var n = e.cm.getTokenTypeAt(d(e.line, t));
        return n && /\btag\b/.test(n)
    }
    function i(e) {
        if (!(e.line >= e.max)) return e.ch = 0, e.text = e.cm.getLine(++e.line), !0
    }
    function o(e) {
        if (!(e.line <= e.min)) return e.text = e.cm.getLine(--e.line), e.ch = e.text.length, !0
    }
    function a(e) {
        for (;;) {
            var t = e.text.indexOf(">", e.ch);
            if (-1 == t) {
                if (i(e)) continue;
                return
            }
            if (r(e, t + 1)) {
                var n = e.text.lastIndexOf("/", t),
                    o = n > -1 && !/\S/.test(e.text.slice(n + 1, t));
                return e.ch = t + 1, o ? "selfClose" : "regular"
            }
            e.ch = t + 1
        }
    }
    function l(e) {
        for (;;) {
            var t = e.ch ? e.text.lastIndexOf("<", e.ch - 1) : -1;
            if (-1 == t) {
                if (o(e)) continue;
                return
            }
            if (r(e, t + 1)) {
                p.lastIndex = t, e.ch = t;
                var n = p.exec(e.text);
                if (n && n.index == t) return n
            } else e.ch = t
        }
    }
    function s(e) {
        for (;;) {
            p.lastIndex = e.ch;
            var t = p.exec(e.text);
            if (!t) {
                if (i(e)) continue;
                return
            }
            if (r(e, t.index + 1)) return e.ch = t.index + t[0].length, t;
            e.ch = t.index + 1
        }
    }
    function c(e) {
        for (;;) {
            var t = e.ch ? e.text.lastIndexOf(">", e.ch - 1) : -1;
            if (-1 == t) {
                if (o(e)) continue;
                return
            }
            if (r(e, t + 1)) {
                var n = e.text.lastIndexOf("/", t),
                    i = n > -1 && !/\S/.test(e.text.slice(n + 1, t));
                return e.ch = t + 1, i ? "selfClose" : "regular"
            }
            e.ch = t
        }
    }
    function u(e, t) {
        for (var n = [];;) {
            var r, i = s(e),
                o = e.line,
                l = e.ch - (i ? i[0].length : 0);
            if (!i || !(r = a(e))) return;
            if ("selfClose" != r)
                if (i[1]) {
                    for (var c = n.length - 1; c >= 0; --c)
                        if (n[c] == i[2]) {
                            n.length = c;
                            break
                        }
                    if (c < 0 && (!t || t == i[2])) return {
                        tag: i[2],
                        from: d(o, l),
                        to: d(e.line, e.ch)
                    }
                } else n.push(i[2])
        }
    }
    function f(e, t) {
        for (var n = [];;) {
            var r = c(e);
            if (!r) return;
            if ("selfClose" != r) {
                var i = e.line,
                    o = e.ch,
                    a = l(e);
                if (!a) return;
                if (a[1]) n.push(a[2]);
                else {
                    for (var s = n.length - 1; s >= 0; --s)
                        if (n[s] == a[2]) {
                            n.length = s;
                            break
                        }
                    if (s < 0 && (!t || t == a[2])) return {
                        tag: a[2],
                        from: d(e.line, e.ch),
                        to: d(i, o)
                    }
                }
            } else l(e)
        }
    }
    var d = e.Pos,
        h = "A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",
        p = new RegExp("<(/?)([" + h + "][" + (h + "-:.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040") + "]*)", "g");
    e.registerHelper("fold", "xml", function(e, r) {
        for (var i = new n(e, r.line, 0);;) {
            var o = s(i);
            if (!o || i.line != r.line) return;
            var l = a(i);
            if (!l) return;
            if (!o[1] && "selfClose" != l) {
                var c = d(i.line, i.ch),
                    f = u(i, o[2]);
                return f && t(f.from, c) > 0 ? {
                    from: c,
                    to: f.from
                } : null
            }
        }
    }), e.findMatchingTag = function(e, r, i) {
        var o = new n(e, r.line, r.ch, i);
        if (-1 != o.text.indexOf(">") || -1 != o.text.indexOf("<")) {
            var s = a(o),
                c = s && d(o.line, o.ch),
                h = s && l(o);
            if (s && h && !(t(o, r) > 0)) {
                var p = {
                    from: d(o.line, o.ch),
                    to: c,
                    tag: h[2]
                };
                return "selfClose" == s ? {
                    open: p,
                    close: null,
                    at: "open"
                } : h[1] ? {
                    open: f(o, h[2]),
                    close: p,
                    at: "close"
                } : {
                    open: p,
                    close: u(o = new n(e, c.line, c.ch, i), h[2]),
                    at: "open"
                }
            }
        }
    }, e.findEnclosingTag = function(e, t, r, i) {
        for (var o = new n(e, t.line, t.ch, r);;) {
            var a = f(o, i);
            if (!a) break;
            var l = u(new n(e, t.line, t.ch, r), a.tag);
            if (l) return {
                open: a,
                close: l
            }
        }
    }, e.scanForClosingTag = function(e, t, r, i) {
        return u(new n(e, t.line, t.ch, i ? {
            from: 0,
            to: i
        } : null), r)
    }
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../../mode/css/css")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../../mode/css/css"], e) : e(CodeMirror)
}(function(e) {
    "use strict";
    var t = {
        link: 1,
        visited: 1,
        active: 1,
        hover: 1,
        focus: 1,
        "first-letter": 1,
        "first-line": 1,
        "first-child": 1,
        before: 1,
        after: 1,
        lang: 1
    };
    e.registerHelper("hint", "css", function(n) {
        function r(e) {
            for (var t in e) c && 0 != t.lastIndexOf(c, 0) || f.push(t)
        }
        var i = n.getCursor(),
            o = n.getTokenAt(i),
            a = e.innerMode(n.getMode(), o.state);
        if ("css" == a.mode.name) {
            if ("keyword" == o.type && 0 == "!important".indexOf(o.string)) return {
                list: ["!important"],
                from: e.Pos(i.line, o.start),
                to: e.Pos(i.line, o.end)
            };
            var l = o.start,
                s = i.ch,
                c = o.string.slice(0, s - l);
            /[^\w$_-]/.test(c) && (c = "", l = s = i.ch);
            var u = e.resolveMode("text/css"),
                f = [],
                d = a.state.state;
            return "pseudo" == d || "variable-3" == o.type ? r(t) : "block" == d || "maybeprop" == d ? r(u.propertyKeywords) : "prop" == d || "parens" == d || "at" == d || "params" == d ? (r(u.valueKeywords), r(u.colorKeywords)) : "media" != d && "media_parens" != d || (r(u.mediaTypes), r(u.mediaFeatures)), f.length ? {
                list: f,
                from: e.Pos(i.line, l),
                to: e.Pos(i.line, s)
            } : void 0
        }
    })
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("./xml-hint")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "./xml-hint"], e) : e(CodeMirror)
}(function(e) {
    "use strict";
    function t(e) {
        for (var t in f) f.hasOwnProperty(t) && (e.attrs[t] = f[t])
    }
    function n(t, n) {
        var r = {
            schemaInfo: u
        };
        if (n)
            for (var i in n) r[i] = n[i];
        return e.hint.xml(t, r)
    }
    var r = "ab aa af ak sq am ar an hy as av ae ay az bm ba eu be bn bh bi bs br bg my ca ch ce ny zh cv kw co cr hr cs da dv nl dz en eo et ee fo fj fi fr ff gl ka de el gn gu ht ha he hz hi ho hu ia id ie ga ig ik io is it iu ja jv kl kn kr ks kk km ki rw ky kv kg ko ku kj la lb lg li ln lo lt lu lv gv mk mg ms ml mt mi mr mh mn na nv nb nd ne ng nn no ii nr oc oj cu om or os pa pi fa pl ps pt qu rm rn ro ru sa sc sd se sm sg sr gd sn si sk sl so st es su sw ss sv ta te tg th ti bo tk tl tn to tr ts tt tw ty ug uk ur uz ve vi vo wa cy wo fy xh yi yo za zu".split(" "),
        i = ["_blank", "_self", "_top", "_parent"],
        o = ["ascii", "utf-8", "utf-16", "latin1", "latin1"],
        a = ["get", "post", "put", "delete"],
        l = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
        s = ["all", "screen", "print", "embossed", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "speech", "3d-glasses", "resolution [>][<][=] [X]", "device-aspect-ratio: X/Y", "orientation:portrait", "orientation:landscape", "device-height: [X]", "device-width: [X]"],
        c = {
            attrs: {}
        },
        u = {
            a: {
                attrs: {
                    href: null,
                    ping: null,
                    type: null,
                    media: s,
                    target: i,
                    hreflang: r
                }
            },
            abbr: c,
            acronym: c,
            address: c,
            applet: c,
            area: {
                attrs: {
                    alt: null,
                    coords: null,
                    href: null,
                    target: null,
                    ping: null,
                    media: s,
                    hreflang: r,
                    type: null,
                    shape: ["default", "rect", "circle", "poly"]
                }
            },
            article: c,
            aside: c,
            audio: {
                attrs: {
                    src: null,
                    mediagroup: null,
                    crossorigin: ["anonymous", "use-credentials"],
                    preload: ["none", "metadata", "auto"],
                    autoplay: ["", "autoplay"],
                    loop: ["", "loop"],
                    controls: ["", "controls"]
                }
            },
            b: c,
            base: {
                attrs: {
                    href: null,
                    target: i
                }
            },
            basefont: c,
            bdi: c,
            bdo: c,
            big: c,
            blockquote: {
                attrs: {
                    cite: null
                }
            },
            body: c,
            br: c,
            button: {
                attrs: {
                    form: null,
                    formaction: null,
                    name: null,
                    value: null,
                    autofocus: ["", "autofocus"],
                    disabled: ["", "autofocus"],
                    formenctype: l,
                    formmethod: a,
                    formnovalidate: ["", "novalidate"],
                    formtarget: i,
                    type: ["submit", "reset", "button"]
                }
            },
            canvas: {
                attrs: {
                    width: null,
                    height: null
                }
            },
            caption: c,
            center: c,
            cite: c,
            code: c,
            col: {
                attrs: {
                    span: null
                }
            },
            colgroup: {
                attrs: {
                    span: null
                }
            },
            command: {
                attrs: {
                    type: ["command", "checkbox", "radio"],
                    label: null,
                    icon: null,
                    radiogroup: null,
                    command: null,
                    title: null,
                    disabled: ["", "disabled"],
                    checked: ["", "checked"]
                }
            },
            data: {
                attrs: {
                    value: null
                }
            },
            datagrid: {
                attrs: {
                    disabled: ["", "disabled"],
                    multiple: ["", "multiple"]
                }
            },
            datalist: {
                attrs: {
                    data: null
                }
            },
            dd: c,
            del: {
                attrs: {
                    cite: null,
                    datetime: null
                }
            },
            details: {
                attrs: {
                    open: ["", "open"]
                }
            },
            dfn: c,
            dir: c,
            div: c,
            dl: c,
            dt: c,
            em: c,
            embed: {
                attrs: {
                    src: null,
                    type: null,
                    width: null,
                    height: null
                }
            },
            eventsource: {
                attrs: {
                    src: null
                }
            },
            fieldset: {
                attrs: {
                    disabled: ["", "disabled"],
                    form: null,
                    name: null
                }
            },
            figcaption: c,
            figure: c,
            font: c,
            footer: c,
            form: {
                attrs: {
                    action: null,
                    name: null,
                    "accept-charset": o,
                    autocomplete: ["on", "off"],
                    enctype: l,
                    method: a,
                    novalidate: ["", "novalidate"],
                    target: i
                }
            },
            frame: c,
            frameset: c,
            h1: c,
            h2: c,
            h3: c,
            h4: c,
            h5: c,
            h6: c,
            head: {
                attrs: {},
                children: ["title", "base", "link", "style", "meta", "script", "noscript", "command"]
            },
            header: c,
            hgroup: c,
            hr: c,
            html: {
                attrs: {
                    manifest: null
                },
                children: ["head", "body"]
            },
            i: c,
            iframe: {
                attrs: {
                    src: null,
                    srcdoc: null,
                    name: null,
                    width: null,
                    height: null,
                    sandbox: ["allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts"],
                    seamless: ["", "seamless"]
                }
            },
            img: {
                attrs: {
                    alt: null,
                    src: null,
                    ismap: null,
                    usemap: null,
                    width: null,
                    height: null,
                    crossorigin: ["anonymous", "use-credentials"]
                }
            },
            input: {
                attrs: {
                    alt: null,
                    dirname: null,
                    form: null,
                    formaction: null,
                    height: null,
                    list: null,
                    max: null,
                    maxlength: null,
                    min: null,
                    name: null,
                    pattern: null,
                    placeholder: null,
                    size: null,
                    src: null,
                    step: null,
                    value: null,
                    width: null,
                    accept: ["audio/*", "video/*", "image/*"],
                    autocomplete: ["on", "off"],
                    autofocus: ["", "autofocus"],
                    checked: ["", "checked"],
                    disabled: ["", "disabled"],
                    formenctype: l,
                    formmethod: a,
                    formnovalidate: ["", "novalidate"],
                    formtarget: i,
                    multiple: ["", "multiple"],
                    readonly: ["", "readonly"],
                    required: ["", "required"],
                    type: ["hidden", "text", "search", "tel", "url", "email", "password", "datetime", "date", "month", "week", "time", "datetime-local", "number", "range", "color", "checkbox", "radio", "file", "submit", "image", "reset", "button"]
                }
            },
            ins: {
                attrs: {
                    cite: null,
                    datetime: null
                }
            },
            kbd: c,
            keygen: {
                attrs: {
                    challenge: null,
                    form: null,
                    name: null,
                    autofocus: ["", "autofocus"],
                    disabled: ["", "disabled"],
                    keytype: ["RSA"]
                }
            },
            label: {
                attrs: {
                    "for": null,
                    form: null
                }
            },
            legend: c,
            li: {
                attrs: {
                    value: null
                }
            },
            link: {
                attrs: {
                    href: null,
                    type: null,
                    hreflang: r,
                    media: s,
                    sizes: ["all", "16x16", "16x16 32x32", "16x16 32x32 64x64"]
                }
            },
            map: {
                attrs: {
                    name: null
                }
            },
            mark: c,
            menu: {
                attrs: {
                    label: null,
                    type: ["list", "context", "toolbar"]
                }
            },
            meta: {
                attrs: {
                    content: null,
                    charset: o,
                    name: ["viewport", "application-name", "author", "description", "generator", "keywords"],
                    "http-equiv": ["content-language", "content-type", "default-style", "refresh"]
                }
            },
            meter: {
                attrs: {
                    value: null,
                    min: null,
                    low: null,
                    high: null,
                    max: null,
                    optimum: null
                }
            },
            nav: c,
            noframes: c,
            noscript: c,
            object: {
                attrs: {
                    data: null,
                    type: null,
                    name: null,
                    usemap: null,
                    form: null,
                    width: null,
                    height: null,
                    typemustmatch: ["", "typemustmatch"]
                }
            },
            ol: {
                attrs: {
                    reversed: ["", "reversed"],
                    start: null,
                    type: ["1", "a", "A", "i", "I"]
                }
            },
            optgroup: {
                attrs: {
                    disabled: ["", "disabled"],
                    label: null
                }
            },
            option: {
                attrs: {
                    disabled: ["", "disabled"],
                    label: null,
                    selected: ["", "selected"],
                    value: null
                }
            },
            output: {
                attrs: {
                    "for": null,
                    form: null,
                    name: null
                }
            },
            p: c,
            param: {
                attrs: {
                    name: null,
                    value: null
                }
            },
            pre: c,
            progress: {
                attrs: {
                    value: null,
                    max: null
                }
            },
            q: {
                attrs: {
                    cite: null
                }
            },
            rp: c,
            rt: c,
            ruby: c,
            s: c,
            samp: c,
            script: {
                attrs: {
                    type: ["text/javascript"],
                    src: null,
                    async: ["", "async"],
                    defer: ["", "defer"],
                    charset: o
                }
            },
            section: c,
            select: {
                attrs: {
                    form: null,
                    name: null,
                    size: null,
                    autofocus: ["", "autofocus"],
                    disabled: ["", "disabled"],
                    multiple: ["", "multiple"]
                }
            },
            small: c,
            source: {
                attrs: {
                    src: null,
                    type: null,
                    media: null
                }
            },
            span: c,
            strike: c,
            strong: c,
            style: {
                attrs: {
                    type: ["text/css"],
                    media: s,
                    scoped: null
                }
            },
            sub: c,
            summary: c,
            sup: c,
            table: c,
            tbody: c,
            td: {
                attrs: {
                    colspan: null,
                    rowspan: null,
                    headers: null
                }
            },
            textarea: {
                attrs: {
                    dirname: null,
                    form: null,
                    maxlength: null,
                    name: null,
                    placeholder: null,
                    rows: null,
                    cols: null,
                    autofocus: ["", "autofocus"],
                    disabled: ["", "disabled"],
                    readonly: ["", "readonly"],
                    required: ["", "required"],
                    wrap: ["soft", "hard"]
                }
            },
            tfoot: c,
            th: {
                attrs: {
                    colspan: null,
                    rowspan: null,
                    headers: null,
                    scope: ["row", "col", "rowgroup", "colgroup"]
                }
            },
            thead: c,
            time: {
                attrs: {
                    datetime: null
                }
            },
            title: c,
            tr: c,
            track: {
                attrs: {
                    src: null,
                    label: null,
                    "default": null,
                    kind: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
                    srclang: r
                }
            },
            tt: c,
            u: c,
            ul: c,
            "var": c,
            video: {
                attrs: {
                    src: null,
                    poster: null,
                    width: null,
                    height: null,
                    crossorigin: ["anonymous", "use-credentials"],
                    preload: ["auto", "metadata", "none"],
                    autoplay: ["", "autoplay"],
                    mediagroup: ["movie"],
                    muted: ["", "muted"],
                    controls: ["", "controls"]
                }
            },
            wbr: c
        },
        f = {
            accesskey: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            "class": null,
            contenteditable: ["true", "false"],
            contextmenu: null,
            dir: ["ltr", "rtl", "auto"],
            draggable: ["true", "false", "auto"],
            dropzone: ["copy", "move", "link", "string:", "file:"],
            hidden: ["hidden"],
            id: null,
            inert: ["inert"],
            itemid: null,
            itemprop: null,
            itemref: null,
            itemscope: ["itemscope"],
            itemtype: null,
            lang: ["en", "es"],
            spellcheck: ["true", "false"],
            style: null,
            tabindex: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
            title: null,
            translate: ["yes", "no"],
            onclick: null,
            rel: ["stylesheet", "alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch", "prev", "search", "tag"]
        };
    for (var d in t(c), u) u.hasOwnProperty(d) && u[d] != c && t(u[d]);
    e.htmlSchema = u, e.registerHelper("hint", "html", n)
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
    function t(e, t) {
        for (var n = 0, r = e.length; n < r; ++n) t(e[n])
    }
    function n(e, t) {
        if (!Array.prototype.indexOf) {
            for (var n = e.length; n--;)
                if (e[n] === t) return !0;
            return !1
        }
        return -1 != e.indexOf(t)
    }
    function r(t, n, r, i) {
        var o = t.getCursor(),
            a = r(t, o);
        if (!/\b(?:string|comment)\b/.test(a.type)) {
            var l = e.innerMode(t.getMode(), a.state);
            if ("json" !== l.mode.helperType) {
                a.state = l.state, /^[\w$_]*$/.test(a.string) ? a.end > o.ch && (a.end = o.ch, a.string = a.string.slice(0, o.ch - a.start)) : a = {
                    start: o.ch,
                    end: o.ch,
                    string: "",
                    state: a.state,
                    type: "." == a.string ? "property" : null
                };
                for (var u = a;
                    "property" == u.type;) {
                    if ("." != (u = r(t, c(o.line, u.start))).string) return;
                    if (u = r(t, c(o.line, u.start)), !f) var f = [];
                    f.push(u)
                }
                return {
                    list: s(a, f, n, i),
                    from: c(o.line, a.start),
                    to: c(o.line, a.end)
                }
            }
        }
    }
    function i(e, t) {
        return r(e, h, function(e, t) {
            return e.getTokenAt(t)
        }, t)
    }
    function o(e, t) {
        var n = e.getTokenAt(t);
        return t.ch == n.start + 1 && "." == n.string.charAt(0) ? (n.end = n.start, n.string = ".", n.type = "property") : /^\.[\w$_]*$/.test(n.string) && (n.type = "property", n.start++, n.string = n.string.replace(/\./, "")), n
    }
    function a(e, t) {
        return r(e, p, o, t)
    }
    function l(e, t) {
        if (Object.getOwnPropertyNames && Object.getPrototypeOf)
            for (var n = e; n; n = Object.getPrototypeOf(n)) Object.getOwnPropertyNames(n).forEach(t);
        else
            for (var r in e) t(r)
    }
    function s(e, r, i, o) {
        function a(e) {
            0 != e.lastIndexOf(h, 0) || n(c, e) || c.push(e)
        }
        function s(e) {
            "string" == typeof e ? t(u, a) : e instanceof Array ? t(f, a) : e instanceof Function && t(d, a), l(e, a)
        }
        var c = [],
            h = e.string,
            p = o && o.globalScope || window;
        if (r && r.length) {
            var m, g = r.pop();
            for (g.type && 0 === g.type.indexOf("variable") ? (o && o.additionalContext && (m = o.additionalContext[g.string]), o && !1 === o.useGlobalScope || (m = m || p[g.string])) : "string" == g.type ? m = "" : "atom" == g.type ? m = 1 : "function" == g.type && (null == p.jQuery || "$" != g.string && "jQuery" != g.string || "function" != typeof p.jQuery ? null != p._ && "_" == g.string && "function" == typeof p._ && (m = p._()) : m = p.jQuery()); null != m && r.length;) m = m[r.pop().string];
            null != m && s(m)
        } else {
            for (var v = e.state.localVars; v; v = v.next) a(v.name);
            for (v = e.state.globalVars; v; v = v.next) a(v.name);
            o && !1 === o.useGlobalScope || s(p), t(i, a)
        }
        return c
    }
    var c = e.Pos;
    e.registerHelper("hint", "javascript", i), e.registerHelper("hint", "coffeescript", a);
    var u = "charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight toUpperCase toLowerCase split concat match replace search".split(" "),
        f = "length concat join splice push pop shift unshift slice reverse sort indexOf lastIndexOf every some filter forEach map reduce reduceRight ".split(" "),
        d = "prototype apply call bind".split(" "),
        h = "break case catch class const continue debugger default delete do else export extends false finally for function if in import instanceof new null return super switch this throw true try typeof var void while with yield".split(" "),
        p = "and break catch class continue delete do else extends false finally for if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes".split(" ")
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
    "use strict";
    function t(e, t) {
        this.cm = e, this.options = t, this.widget = null, this.debounce = 0, this.tick = 0, this.startPos = this.cm.getCursor("start"), this.startLen = this.cm.getLine(this.startPos.line).length - this.cm.getSelection().length;
        var n = this;
        e.on("cursorActivity", this.activityFunc = function() {
            n.cursorActivity()
        })
    }
    function n(e, t, n) {
        var r = e.options.hintOptions,
            i = {};
        for (var o in p) i[o] = p[o];
        if (r)
            for (var o in r) r[o] !== undefined && (i[o] = r[o]);
        if (n)
            for (var o in n) n[o] !== undefined && (i[o] = n[o]);
        return i.hint.resolve && (i.hint = i.hint.resolve(e, t)), i
    }
    function r(e) {
        return "string" == typeof e ? e : e.text
    }
    function i(e, t) {
        function n(e, n) {
            var i;
            i = "string" != typeof n ? function(e) {
                return n(e, t)
            } : r.hasOwnProperty(n) ? r[n] : n, o[e] = i
        }
        var r = {
                Up: function() {
                    t.moveFocus(-1)
                },
                Down: function() {
                    t.moveFocus(1)
                },
                PageUp: function() {
                    t.moveFocus(1 - t.menuSize(), !0)
                },
                PageDown: function() {
                    t.moveFocus(t.menuSize() - 1, !0)
                },
                Home: function() {
                    t.setFocus(0)
                },
                End: function() {
                    t.setFocus(t.length - 1)
                },
                Enter: t.pick,
                Tab: t.pick,
                Esc: t.close
            },
            i = e.options.customKeys,
            o = i ? {} : r;
        if (i)
            for (var a in i) i.hasOwnProperty(a) && n(a, i[a]);
        var l = e.options.extraKeys;
        if (l)
            for (var a in l) l.hasOwnProperty(a) && n(a, l[a]);
        return o
    }
    function o(e, t) {
        for (; t && t != e;) {
            if ("LI" === t.nodeName.toUpperCase() && t.parentNode == e) return t;
            t = t.parentNode
        }
    }
    function a(t, n) {
        this.completion = t, this.data = n, this.picked = !1;
        var a = this,
            l = t.cm,
            s = this.hints = document.createElement("ul"),
            c = t.cm.options.theme;
        s.className = "CodeMirror-hints " + c, this.selectedHint = n.selectedHint || 0;
        for (var d = n.list, h = 0; h < d.length; ++h) {
            var p = s.appendChild(document.createElement("li")),
                m = d[h],
                g = u + (h != this.selectedHint ? "" : " " + f);
            null != m.className && (g = m.className + " " + g), p.className = g, m.render ? m.render(p, n, m) : p.appendChild(document.createTextNode(m.displayText || r(m))), p.hintId = h
        }
        var v = l.cursorCoords(t.options.alignWithWord ? n.from : null),
            y = v.left,
            b = v.bottom,
            x = !0;
        s.style.left = y + "px", s.style.top = b + "px";
        var k = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth),
            w = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
        (t.options.container || document.body).appendChild(s);
        var C = s.getBoundingClientRect(),
            S = C.bottom - w,
            L = s.scrollHeight > s.clientHeight + 1,
            T = l.getScrollInfo();
        if (S > 0) {
            var M = C.bottom - C.top;
            if (v.top - (v.bottom - C.top) - M > 0) s.style.top = (b = v.top - M) + "px", x = !1;
            else if (M > w) {
                s.style.height = w - 5 + "px", s.style.top = (b = v.bottom - C.top) + "px";
                var z = l.getCursor();
                n.from.ch != z.ch && (v = l.cursorCoords(z), s.style.left = (y = v.left) + "px", C = s.getBoundingClientRect())
            }
        }
        var A, O = C.right - k;
        if (O > 0 && (C.right - C.left > k && (s.style.width = k - 5 + "px", O -= C.right - C.left - k), s.style.left = (y = v.left - O) + "px"), L)
            for (var N = s.firstChild; N; N = N.nextSibling) N.style.paddingRight = l.display.nativeBarWidth + "px";
        (l.addKeyMap(this.keyMap = i(t, {
            moveFocus: function(e, t) {
                a.changeActive(a.selectedHint + e, t)
            },
            setFocus: function(e) {
                a.changeActive(e)
            },
            menuSize: function() {
                return a.screenAmount()
            },
            length: d.length,
            close: function() {
                t.close()
            },
            pick: function() {
                a.pick()
            },
            data: n
        })), t.options.closeOnUnfocus) && (l.on("blur", this.onBlur = function() {
            A = setTimeout(function() {
                t.close()
            }, 100)
        }), l.on("focus", this.onFocus = function() {
            clearTimeout(A)
        }));
        return l.on("scroll", this.onScroll = function() {
            var e = l.getScrollInfo(),
                n = l.getWrapperElement().getBoundingClientRect(),
                r = b + T.top - e.top,
                i = r - (window.pageYOffset || (document.documentElement || document.body).scrollTop);
            if (x || (i += s.offsetHeight), i <= n.top || i >= n.bottom) return t.close();
            s.style.top = r + "px", s.style.left = y + T.left - e.left + "px"
        }), e.on(s, "dblclick", function(e) {
            var t = o(s, e.target || e.srcElement);
            t && null != t.hintId && (a.changeActive(t.hintId), a.pick())
        }), e.on(s, "click", function(e) {
            var n = o(s, e.target || e.srcElement);
            n && null != n.hintId && (a.changeActive(n.hintId), t.options.completeOnSingleClick && a.pick())
        }), e.on(s, "mousedown", function() {
            setTimeout(function() {
                l.focus()
            }, 20)
        }), e.signal(n, "select", d[this.selectedHint], s.childNodes[this.selectedHint]), !0
    }
    function l(e, t) {
        if (!e.somethingSelected()) return t;
        for (var n = [], r = 0; r < t.length; r++) t[r].supportsSelection && n.push(t[r]);
        return n
    }
    function s(e, t, n, r) {
        if (e.async) e(t, r, n);
        else {
            var i = e(t, n);
            i && i.then ? i.then(r) : r(i)
        }
    }
    function c(t, n) {
        var r, i = t.getHelpers(n, "hint");
        if (i.length) {
            var o = function(e, t, n) {
                function r(i) {
                    if (i == o.length) return t(null);
                    s(o[i], e, n, function(e) {
                        e && e.list.length > 0 ? t(e) : r(i + 1)
                    })
                }
                var o = l(e, i);
                r(0)
            };
            return o.async = !0, o.supportsSelection = !0, o
        }
        return (r = t.getHelper(t.getCursor(), "hintWords")) ? function(t) {
            return e.hint.fromList(t, {
                words: r
            })
        } : e.hint.anyword ? function(t, n) {
            return e.hint.anyword(t, n)
        } : function() {}
    }
    var u = "CodeMirror-hint",
        f = "CodeMirror-hint-active";
    e.showHint = function(e, t, n) {
        if (!t) return e.showHint(n);
        n && n.async && (t.async = !0);
        var r = {
            hint: t
        };
        if (n)
            for (var i in n) r[i] = n[i];
        return e.showHint(r)
    }, e.defineExtension("showHint", function(r) {
        r = n(this, this.getCursor("start"), r);
        var i = this.listSelections();
        if (!(i.length > 1)) {
            if (this.somethingSelected()) {
                if (!r.hint.supportsSelection) return;
                for (var o = 0; o < i.length; o++)
                    if (i[o].head.line != i[o].anchor.line) return
            }
            this.state.completionActive && this.state.completionActive.close();
            var a = this.state.completionActive = new t(this, r);
            a.options.hint && (e.signal(this, "startCompletion", this), a.update(!0))
        }
    });
    var d = window.requestAnimationFrame || function(e) {
            return setTimeout(e, 1e3 / 60)
        },
        h = window.cancelAnimationFrame || clearTimeout;
    t.prototype = {
        close: function() {
            this.active() && (this.cm.state.completionActive = null, this.tick = null, this.cm.off("cursorActivity", this.activityFunc), this.widget && this.data && e.signal(this.data, "close"), this.widget && this.widget.close(), e.signal(this.cm, "endCompletion", this.cm))
        },
        active: function() {
            return this.cm.state.completionActive == this
        },
        pick: function(t, n) {
            var i = t.list[n];
            i.hint ? i.hint(this.cm, t, i) : this.cm.replaceRange(r(i), i.from || t.from, i.to || t.to, "complete"), e.signal(t, "pick", i), this.close()
        },
        cursorActivity: function() {
            this.debounce && (h(this.debounce), this.debounce = 0);
            var e = this.cm.getCursor(),
                t = this.cm.getLine(e.line);
            if (e.line != this.startPos.line || t.length - e.ch != this.startLen - this.startPos.ch || e.ch < this.startPos.ch || this.cm.somethingSelected() || !e.ch || this.options.closeCharacters.test(t.charAt(e.ch - 1))) this.close();
            else {
                var n = this;
                this.debounce = d(function() {
                    n.update()
                }), this.widget && this.widget.disable()
            }
        },
        update: function(e) {
            if (null != this.tick) {
                var t = this,
                    n = ++this.tick;
                s(this.options.hint, this.cm, this.options, function(r) {
                    t.tick == n && t.finishUpdate(r, e)
                })
            }
        },
        finishUpdate: function(t, n) {
            this.data && e.signal(this.data, "update");
            var r = this.widget && this.widget.picked || n && this.options.completeSingle;
            this.widget && this.widget.close(), this.data = t, t && t.list.length && (r && 1 == t.list.length ? this.pick(t, 0) : (this.widget = new a(this, t), e.signal(t, "shown")))
        }
    }, a.prototype = {
        close: function() {
            if (this.completion.widget == this) {
                this.completion.widget = null, this.hints.parentNode.removeChild(this.hints), this.completion.cm.removeKeyMap(this.keyMap);
                var e = this.completion.cm;
                this.completion.options.closeOnUnfocus && (e.off("blur", this.onBlur), e.off("focus", this.onFocus)), e.off("scroll", this.onScroll)
            }
        },
        disable: function() {
            this.completion.cm.removeKeyMap(this.keyMap);
            var e = this;
            this.keyMap = {
                Enter: function() {
                    e.picked = !0
                }
            }, this.completion.cm.addKeyMap(this.keyMap)
        },
        pick: function() {
            this.completion.pick(this.data, this.selectedHint)
        },
        changeActive: function(t, n) {
            if (t >= this.data.list.length ? t = n ? this.data.list.length - 1 : 0 : t < 0 && (t = n ? 0 : this.data.list.length - 1), this.selectedHint != t) {
                var r = this.hints.childNodes[this.selectedHint];
                r && (r.className = r.className.replace(" " + f, "")), (r = this.hints.childNodes[this.selectedHint = t]).className += " " + f, r.offsetTop < this.hints.scrollTop ? this.hints.scrollTop = r.offsetTop - 3 : r.offsetTop + r.offsetHeight > this.hints.scrollTop + this.hints.clientHeight && (this.hints.scrollTop = r.offsetTop + r.offsetHeight - this.hints.clientHeight + 3), e.signal(this.data, "select", this.data.list[this.selectedHint], r)
            }
        },
        screenAmount: function() {
            return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1
        }
    }, e.registerHelper("hint", "auto", {
        resolve: c
    }), e.registerHelper("hint", "fromList", function(t, n) {
        var r, i = t.getCursor(),
            o = t.getTokenAt(i),
            a = e.Pos(i.line, o.start),
            l = i;
        o.start < i.ch && /\w/.test(o.string.charAt(i.ch - o.start - 1)) ? r = o.string.substr(0, i.ch - o.start) : (r = "", a = i);
        for (var s = [], c = 0; c < n.words.length; c++) {
            var u = n.words[c];
            u.slice(0, r.length) == r && s.push(u)
        }
        if (s.length) return {
            list: s,
            from: a,
            to: l
        }
    }), e.commands.autocomplete = e.showHint;
    var p = {
        hint: e.hint.auto,
        completeSingle: !0,
        alignWithWord: !0,
        closeCharacters: /[\s()\[\]{};:>,]/,
        closeOnUnfocus: !0,
        completeOnSingleClick: !0,
        container: null,
        customKeys: null,
        extraKeys: null
    };
    e.defineOption("hintOptions", null)
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
    "use strict";
    function t(t, r) {
        var i = r && r.schemaInfo,
            o = r && r.quoteChar || '"';
        if (i) {
            var a = t.getCursor(),
                l = t.getTokenAt(a);
            l.end > a.ch && (l.end = a.ch, l.string = l.string.slice(0, a.ch - l.start));
            var s = e.innerMode(t.getMode(), l.state);
            if ("xml" == s.mode.name) {
                var c, u, f = [],
                    d = !1,
                    h = /\btag\b/.test(l.type) && !/>$/.test(l.string),
                    p = h && /^\w/.test(l.string);
                if (p) {
                    var m = t.getLine(a.line).slice(Math.max(0, l.start - 2), l.start),
                        g = /<\/$/.test(m) ? "close" : /<$/.test(m) ? "open" : null;
                    g && (u = l.start - ("close" == g ? 2 : 1))
                } else h && "<" == l.string ? g = "open" : h && "</" == l.string && (g = "close");
                if (!h && !s.state.tagName || g) {
                    p && (c = l.string), d = g;
                    var v = s.state.context,
                        y = v && i[v.tagName],
                        b = v ? y && y.children : i["!top"];
                    if (b && "close" != g)
                        for (var x = 0; x < b.length; ++x) c && 0 != b[x].lastIndexOf(c, 0) || f.push("<" + b[x]);
                    else if ("close" != g)
                        for (var k in i) !i.hasOwnProperty(k) || "!top" == k || "!attrs" == k || c && 0 != k.lastIndexOf(c, 0) || f.push("<" + k);
                    v && (!c || "close" == g && 0 == v.tagName.lastIndexOf(c, 0)) && f.push("</" + v.tagName + ">")
                } else {
                    var w = (y = i[s.state.tagName]) && y.attrs,
                        C = i["!attrs"];
                    if (!w && !C) return;
                    if (w) {
                        if (C) {
                            var S = {};
                            for (var L in C) C.hasOwnProperty(L) && (S[L] = C[L]);
                            for (var L in w) w.hasOwnProperty(L) && (S[L] = w[L]);
                            w = S
                        }
                    } else w = C;
                    if ("string" == l.type || "=" == l.string) {
                        var T, M = (m = t.getRange(n(a.line, Math.max(0, a.ch - 60)), n(a.line, "string" == l.type ? l.start : l.end))).match(/([^\s\u00a0=<>\"\']+)=$/);
                        if (!M || !w.hasOwnProperty(M[1]) || !(T = w[M[1]])) return;
                        if ("function" == typeof T && (T = T.call(this, t)), "string" == l.type) {
                            c = l.string;
                            var z = 0;
                            /['"]/.test(l.string.charAt(0)) && (o = l.string.charAt(0), c = l.string.slice(1), z++);
                            var A = l.string.length;
                            /['"]/.test(l.string.charAt(A - 1)) && (o = l.string.charAt(A - 1), c = l.string.substr(z, A - 2)), d = !0
                        }
                        for (x = 0; x < T.length; ++x) c && 0 != T[x].lastIndexOf(c, 0) || f.push(o + T[x] + o)
                    } else
                        for (var O in "attribute" == l.type && (c = l.string, d = !0), w) !w.hasOwnProperty(O) || c && 0 != O.lastIndexOf(c, 0) || f.push(O)
                }
                return {
                    list: f,
                    from: d ? n(a.line, null == u ? l.start : u) : a,
                    to: d ? n(a.line, l.end) : a
                }
            }
        }
    }
    var n = e.Pos;
    e.registerHelper("hint", "xml", t)
}),
// CodeMirror, copyright (c) by Marijn Haverbeke and others
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
    "use strict";
    e.overlayMode = function(t, n, r) {
        return {
            startState: function() {
                return {
                    base: e.startState(t),
                    overlay: e.startState(n),
                    basePos: 0,
                    baseCur: null,
                    overlayPos: 0,
                    overlayCur: null,
                    streamSeen: null
                }
            },
            copyState: function(r) {
                return {
                    base: e.copyState(t, r.base),
                    overlay: e.copyState(n, r.overlay),
                    basePos: r.basePos,
                    baseCur: null,
                    overlayPos: r.overlayPos,
                    overlayCur: null
                }
            },
            token: function(e, i) {
                return (e != i.streamSeen || Math.min(i.basePos, i.overlayPos) < e.start) && (i.streamSeen = e, i.basePos = i.overlayPos = e.start), e.start == i.basePos && (i.baseCur = t.token(e, i.base), i.basePos = e.pos), e.start == i.overlayPos && (e.pos = e.start, i.overlayCur = n.token(e, i.overlay), i.overlayPos = e.pos), e.pos = Math.min(i.basePos, i.overlayPos), null == i.overlayCur ? i.baseCur : null != i.baseCur && i.overlay.combineTokens || r && null == i.overlay.combineTokens ? i.baseCur + " " + i.overlayCur : i.overlayCur
            },
            indent: t.indent && function(e, n) {
                return t.indent(e.base, n)
            },
            electricChars: t.electricChars,
            innerMode: function(e) {
                return {
                    state: e.base,
                    mode: t
                }
            },
            blankLine: function(e) {
                var i, o;
                return t.blankLine && (i = t.blankLine(e.base)), n.blankLine && (o = n.blankLine(e.overlay)), null == o ? i : r && null != i ? i + " " + o : o
            }
        }
    }
}),
function(e) {
    "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
}(function(e) {
    "use strict";
    var t, n = 0,
        r = !1,
        i = !1,
        o = "",
        a = "";
    e.defineMode("spell-checker", function(l) {
        if (!r) {
            r = !0;
            var s = new XMLHttpRequest;
            s.open("GET", "https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.aff", !0), s.onload = function() {
                4 === s.readyState && 200 === s.status && (o = s.responseText, 2 == ++n && (t = new Typo("en_US", o, a, {
                    platform: "any"
                })))
            }, s.send(null)
        }
        if (!i) {
            i = !0;
            var c = new XMLHttpRequest;
            c.open("GET", "https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.dic", !0), c.onload = function() {
                4 === c.readyState && 200 === c.status && (a = c.responseText, 2 == ++n && (t = new Typo("en_US", o, a, {
                    platform: "any"
                })))
            }, c.send(null)
        }
        var u = '!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~ ',
            f = {
                token: function(e) {
                    var n = e.peek(),
                        r = "";
                    if (u.includes(n)) return e.next(), null;
                    for (; null != (n = e.peek()) && !u.includes(n);) r += n, e.next();
                    return t && !t.check(r) ? "spell-error" : null
                }
            },
            d = e.getMode(l, l.backdrop || "text/plain");
        return e.overlayMode(d, f, !0)
    }), String.prototype.includes || (String.prototype.includes = function() {
        return -1 !== String.prototype.indexOf.apply(this, arguments)
    })
});
var Typo = function(e, t, n, r) {
    if (r = r || {}, this.platform = r.platform || "chrome", this.dictionary = null, this.rules = {}, this.dictionaryTable = {}, this.compoundRules = [], this.compoundRuleCodes = {}, this.replacementTable = [], this.flags = r.flags || {}, e) {
        if (this.dictionary = e, "chrome" == this.platform) t || (t = this._readFile(chrome.extension.getURL("lib/typo/dictionaries/" + e + "/" + e + ".aff"))), n || (n = this._readFile(chrome.extension.getURL("lib/typo/dictionaries/" + e + "/" + e + ".dic")));
        else {
            var i = r.dictionaryPath || "";
            t || (t = this._readFile(i + "/" + e + "/" + e + ".aff")), n || (n = this._readFile(i + "/" + e + "/" + e + ".dic"))
        }
        this.rules = this._parseAFF(t), this.compoundRuleCodes = {};
        for (var o = 0, a = this.compoundRules.length; o < a; o++)
            for (var l = this.compoundRules[o], s = 0, c = l.length; s < c; s++) this.compoundRuleCodes[l[s]] = [];
        for (var o in "ONLYINCOMPOUND" in this.flags && (this.compoundRuleCodes[this.flags.ONLYINCOMPOUND] = []), this.dictionaryTable = this._parseDIC(n), this.compoundRuleCodes) 0 == this.compoundRuleCodes[o].length && delete this.compoundRuleCodes[o];
        for (o = 0, a = this.compoundRules.length; o < a; o++) {
            var u = this.compoundRules[o],
                f = "";
            for (s = 0, c = u.length; s < c; s++) {
                var d = u[s];
                d in this.compoundRuleCodes ? f += "(" + this.compoundRuleCodes[d].join("|") + ")" : f += d
            }
            this.compoundRules[o] = new RegExp(f, "i")
        }
    }
    return this
};
Typo.prototype = {
        load: function(e) {
            for (var t in e) this[t] = e[t];
            return this
        },
        _readFile: function(e, t) {
            t || (t = "ISO8859-1");
            var n = new XMLHttpRequest;
            return n.open("GET", e, !1), n.overrideMimeType && n.overrideMimeType("text/plain; charset=" + t), n.send(null), n.responseText
        },
        _parseAFF: function(e) {
            for (var t = {}, n = (e = this._removeAffixComments(e)).split("\n"), r = 0, i = n.length; r < i; r++) {
                var o = (b = n[r]).split(/\s+/),
                    a = o[0];
                if ("PFX" == a || "SFX" == a) {
                    for (var l = o[1], s = o[2], c = [], u = r + 1, f = r + 1 + (y = parseInt(o[3], 10)); u < f; u++) {
                        var d = (x = (b = n[u]).split(/\s+/))[2],
                            h = x[3].split("/"),
                            p = h[0];
                        "0" === p && (p = "");
                        var m = this.parseRuleCodes(h[1]),
                            g = x[4],
                            v = {};
                        v.add = p, m.length > 0 && (v.continuationClasses = m), "." !== g && (v.match = "SFX" === a ? new RegExp(g + "$") : new RegExp("^" + g)), "0" != d && (v.remove = "SFX" === a ? new RegExp(d + "$") : d), c.push(v)
                    }
                    t[l] = {
                        type: a,
                        combineable: "Y" == s,
                        entries: c
                    }, r += y
                } else if ("COMPOUNDRULE" === a) {
                    var y;
                    for (u = r + 1, f = r + 1 + (y = parseInt(o[1], 10)); u < f; u++) {
                        var b, x = (b = n[u]).split(/\s+/);
                        this.compoundRules.push(x[1])
                    }
                    r += y
                } else if ("REP" === a) {
                    3 === (x = b.split(/\s+/)).length && this.replacementTable.push([x[1], x[2]])
                } else this.flags[a] = o[1]
            }
            return t
        },
        _removeAffixComments: function(e) {
            return e = (e = (e = (e = e.replace(/#.*$/gm, "")).replace(/^\s\s*/m, "").replace(/\s\s*$/m, "")).replace(/\n{2,}/g, "\n")).replace(/^\s\s*/, "").replace(/\s\s*$/, "")
        },
        _parseDIC: function(e) {
            function t(e, t) {
                e in r && "object" == typeof r[e] || (r[e] = []), r[e].push(t)
            }
            for (var n = (e = this._removeDicComments(e)).split("\n"), r = {}, i = 1, o = n.length; i < o; i++) {
                var a = n[i].split("/", 2),
                    l = a[0];
                if (a.length > 1) {
                    var s = this.parseRuleCodes(a[1]);
                    "NEEDAFFIX" in this.flags && -1 != s.indexOf(this.flags.NEEDAFFIX) || t(l, s);
                    for (var c = 0, u = s.length; c < u; c++) {
                        var f = s[c],
                            d = this.rules[f];
                        if (d)
                            for (var h = this._applyRule(l, d), p = 0, m = h.length; p < m; p++) {
                                var g = h[p];
                                if (t(g, []), d.combineable)
                                    for (var v = c + 1; v < u; v++) {
                                        var y = s[v],
                                            b = this.rules[y];
                                        if (b && b.combineable && d.type != b.type)
                                            for (var x = this._applyRule(g, b), k = 0, w = x.length; k < w; k++) {
                                                t(x[k], [])
                                            }
                                    }
                            }
                        f in this.compoundRuleCodes && this.compoundRuleCodes[f].push(l)
                    }
                } else t(l.trim(), [])
            }
            return r
        },
        _removeDicComments: function(e) {
            return e = e.replace(/^\t.*$/gm, "")
        },
        parseRuleCodes: function(e) {
            if (!e) return [];
            if (!("FLAG" in this.flags)) return e.split("");
            if ("long" === this.flags.FLAG) {
                for (var t = [], n = 0, r = e.length; n < r; n += 2) t.push(e.substr(n, 2));
                return t
            }
            return "num" === this.flags.FLAG ? textCode.split(",") : void 0
        },
        _applyRule: function(e, t) {
            for (var n = t.entries, r = [], i = 0, o = n.length; i < o; i++) {
                var a = n[i];
                if (!a.match || e.match(a.match)) {
                    var l = e;
                    if (a.remove && (l = l.replace(a.remove, "")), "SFX" === t.type ? l += a.add : l = a.add + l, r.push(l), "continuationClasses" in a)
                        for (var s = 0, c = a.continuationClasses.length; s < c; s++) {
                            var u = this.rules[a.continuationClasses[s]];
                            u && (r = r.concat(this._applyRule(l, u)))
                        }
                }
            }
            return r
        },
        check: function(e) {
            var t = e.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
            if (this.checkExact(t)) return !0;
            if (t.toUpperCase() === t) {
                var n = t[0] + t.substring(1).toLowerCase();
                if (this.hasFlag(n, "KEEPCASE")) return !1;
                if (this.checkExact(n)) return !0
            }
            var r = t.toLowerCase();
            if (r !== t) {
                if (this.hasFlag(r, "KEEPCASE")) return !1;
                if (this.checkExact(r)) return !0
            }
            return !1
        },
        checkExact: function(e) {
            var t = this.dictionaryTable[e];
            if (void 0 === t) {
                if ("COMPOUNDMIN" in this.flags && e.length >= this.flags.COMPOUNDMIN)
                    for (var n = 0, r = this.compoundRules.length; n < r; n++)
                        if (e.match(this.compoundRules[n])) return !0;
                return !1
            }
            for (n = 0, r = t.length; n < r; n++)
                if (!this.hasFlag(e, "ONLYINCOMPOUND", t[n])) return !0;
            return !1
        },
        hasFlag: function(e, t, n) {
            if (t in this.flags) {
                if (void 0 === n) n = Array.prototype.concat.apply([], this.dictionaryTable[e]);
                if (n && -1 !== n.indexOf(this.flags[t])) return !0
            }
            return !1
        },
        alphabet: "",
        suggest: function(e, t) {
            function n(e) {
                for (var t = [], n = 0, r = e.length; n < r; n++) {
                    for (var i = e[n], o = [], a = 0, l = i.length + 1; a < l; a++) o.push([i.substring(0, a), i.substring(a, i.length)]);
                    var s = [];
                    for (a = 0, l = o.length; a < l; a++) {
                        (m = o[a])[1] && s.push(m[0] + m[1].substring(1))
                    }
                    var u = [];
                    for (a = 0, l = o.length; a < l; a++) {
                        (m = o[a])[1].length > 1 && u.push(m[0] + m[1][1] + m[1][0] + m[1].substring(2))
                    }
                    var f = [];
                    for (a = 0, l = o.length; a < l; a++) {
                        if ((m = o[a])[1])
                            for (var d = 0, h = c.alphabet.length; d < h; d++) f.push(m[0] + c.alphabet[d] + m[1].substring(1))
                    }
                    var p = [];
                    for (a = 0, l = o.length; a < l; a++) {
                        var m;
                        if ((m = o[a])[1])
                            for (d = 0, h = c.alphabet.length; d < h; d++) f.push(m[0] + c.alphabet[d] + m[1])
                    }
                    t = (t = (t = (t = t.concat(s)).concat(u)).concat(f)).concat(p)
                }
                return t
            }
            function r(e) {
                for (var t = [], n = 0; n < e.length; n++) c.check(e[n]) && t.push(e[n]);
                return t
            }
            function i(e) {
                function i(e, t) {
                    return e[1] < t[1] ? -1 : 1
                }
                for (var o = n([e]), a = n(o), l = r(o).concat(r(a)), s = {}, u = 0, f = l.length; u < f; u++) l[u] in s ? s[l[u]] += 1 : s[l[u]] = 1;
                var d = [];
                for (var u in s) d.push([u, s[u]]);
                d.sort(i).reverse();
                var h = [];
                for (u = 0, f = Math.min(t, d.length); u < f; u++) c.hasFlag(d[u][0], "NOSUGGEST") || h.push(d[u][0]);
                return h
            }
            if (t || (t = 5), this.check(e)) return [];
            for (var o = 0, a = this.replacementTable.length; o < a; o++) {
                var l = this.replacementTable[o];
                if (-1 !== e.indexOf(l[0])) {
                    var s = e.replace(l[0], l[1]);
                    if (this.check(s)) return [s]
                }
            }
            var c = this;
            return c.alphabet = "abcdefghijklmnopqrstuvwxyz", i(e)
        }
    },
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        e.runMode = function(t, n, r, i) {
            var o = e.getMode(e.defaults, n),
                a = /MSIE \d/.test(navigator.userAgent) && (null == document.documentMode || document.documentMode < 9);
            if (r.appendChild) {
                var l = i && i.tabSize || e.defaults.tabSize,
                    s = r,
                    c = 0;
                s.innerHTML = "", r = function(e, t) {
                    if ("\n" == e) return s.appendChild(document.createTextNode(a ? "\r" : e)), void(c = 0);
                    for (var n = "", r = 0;;) {
                        var i = e.indexOf("\t", r);
                        if (-1 == i) {
                            n += e.slice(r), c += e.length - r;
                            break
                        }
                        c += i - r, n += e.slice(r, i);
                        var o = l - c % l;
                        c += o;
                        for (var u = 0; u < o; ++u) n += " ";
                        r = i + 1
                    }
                    if (t) {
                        var f = s.appendChild(document.createElement("span"));
                        f.className = "cm-" + t.replace(/ +/g, " cm-"), f.appendChild(document.createTextNode(n))
                    } else s.appendChild(document.createTextNode(n))
                }
            }
            for (var u = e.splitLines(t), f = i && i.state || e.startState(o), d = 0, h = u.length; d < h; ++d) {
                d && r("\n");
                var p = new e.StringStream(u[d]);
                for (!p.string && o.blankLine && o.blankLine(f); !p.eol();) {
                    var m = o.token(p, f);
                    r(p.current(), m, d, p.start, f), p.start = p.pos
                }
            }
        }
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        function t(t, r) {
            e.changeEnd(r).line == t.lastLine() && n(t)
        }
        function n(e) {
            var t = "";
            e.lineCount() > 1 && (t = e.display.scroller.clientHeight - 30 - e.getLineHandle(e.lastLine()).height + "px");
            e.state.scrollPastEndPadding != t && (e.state.scrollPastEndPadding = t, e.display.lineSpace.parentNode.style.paddingBottom = t, e.off("refresh", n), e.setSize(), e.on("refresh", n))
        }
        e.defineOption("scrollPastEnd", !1, function(r, i, o) {
            o && o != e.Init && (r.off("change", t), r.off("refresh", n), r.display.lineSpace.parentNode.style.paddingBottom = "", r.state.scrollPastEndPadding = null), i && (r.on("change", t), r.on("refresh", n), n(r))
        })
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        function t(t, n, r) {
            function i(t) {
                var n = e.wheelEventPixels(t)["horizontal" == o.orientation ? "x" : "y"],
                    r = o.pos;
                o.moveTo(o.pos + n), o.pos != r && e.e_preventDefault(t)
            }
            this.orientation = n, this.scroll = r, this.screen = this.total = this.size = 1, this.pos = 0, this.node = document.createElement("div"), this.node.className = t + "-" + n, this.inner = this.node.appendChild(document.createElement("div"));
            var o = this;
            e.on(this.inner, "mousedown", function(t) {
                function n() {
                    e.off(document, "mousemove", r), e.off(document, "mouseup", n)
                }
                function r(e) {
                    if (1 != e.which) return n();
                    o.moveTo(l + (e[i] - a) * (o.total / o.size))
                }
                if (1 == t.which) {
                    e.e_preventDefault(t);
                    var i = "horizontal" == o.orientation ? "pageX" : "pageY",
                        a = t[i],
                        l = o.pos;
                    e.on(document, "mousemove", r), e.on(document, "mouseup", n)
                }
            }), e.on(this.node, "click", function(t) {
                e.e_preventDefault(t);
                var n, r = o.inner.getBoundingClientRect();
                n = "horizontal" == o.orientation ? t.clientX < r.left ? -1 : t.clientX > r.right ? 1 : 0 : t.clientY < r.top ? -1 : t.clientY > r.bottom ? 1 : 0, o.moveTo(o.pos + n * o.screen)
            }), e.on(this.node, "mousewheel", i), e.on(this.node, "DOMMouseScroll", i)
        }
        function n(e, n, r) {
            this.addClass = e, this.horiz = new t(e, "horizontal", r), n(this.horiz.node), this.vert = new t(e, "vertical", r), n(this.vert.node), this.width = null
        }
        t.prototype.setPos = function(e, t) {
            return e < 0 && (e = 0), e > this.total - this.screen && (e = this.total - this.screen), !(!t && e == this.pos) && (this.pos = e, this.inner.style["horizontal" == this.orientation ? "left" : "top"] = e * (this.size / this.total) + "px", !0)
        }, t.prototype.moveTo = function(e) {
            this.setPos(e) && this.scroll(e, this.orientation)
        };
        var r = 10;
        t.prototype.update = function(e, t, n) {
            var i = this.screen != t || this.total != e || this.size != n;
            i && (this.screen = t, this.total = e, this.size = n);
            var o = this.screen * (this.size / this.total);
            o < r && (this.size -= r - o, o = r), this.inner.style["horizontal" == this.orientation ? "width" : "height"] = o + "px", this.setPos(this.pos, i)
        }, n.prototype.update = function(e) {
            if (null == this.width) {
                var t = window.getComputedStyle ? window.getComputedStyle(this.horiz.node) : this.horiz.node.currentStyle;
                t && (this.width = parseInt(t.height))
            }
            var n = this.width || 0,
                r = e.scrollWidth > e.clientWidth + 1,
                i = e.scrollHeight > e.clientHeight + 1;
            return this.vert.node.style.display = i ? "block" : "none", this.horiz.node.style.display = r ? "block" : "none", i && (this.vert.update(e.scrollHeight, e.clientHeight, e.viewHeight - (r ? n : 0)), this.vert.node.style.bottom = r ? n + "px" : "0"), r && (this.horiz.update(e.scrollWidth, e.clientWidth, e.viewWidth - (i ? n : 0) - e.barLeft), this.horiz.node.style.right = i ? n + "px" : "0", this.horiz.node.style.left = e.barLeft + "px"), {
                right: i ? n : 0,
                bottom: r ? n : 0
            }
        }, n.prototype.setScrollTop = function(e) {
            this.vert.setPos(e)
        }, n.prototype.setScrollLeft = function(e) {
            this.horiz.setPos(e)
        }, n.prototype.clear = function() {
            var e = this.horiz.node.parentNode;
            e.removeChild(this.horiz.node), e.removeChild(this.vert.node)
        }, e.scrollbarModel.simple = function(e, t) {
            return new n("CodeMirror-simplescroll", e, t)
        }, e.scrollbarModel.overlay = function(e, t) {
            return new n("CodeMirror-overlayscroll", e, t)
        }
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../dialog/dialog")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../dialog/dialog"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        function t(e, t, n, r, i) {
            e.openDialog ? e.openDialog(t, i, {
                value: r,
                selectValueOnOpen: !0
            }) : i(prompt(n, r))
        }
        function n(e) {
            return e.phrase("Jump to line:") + ' <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">' + e.phrase("(Use line:column or scroll% syntax)") + "</span>"
        }
        function r(e, t) {
            var n = Number(t);
            return /^[-+]/.test(t) ? e.getCursor().line + n : n - 1
        }
        e.commands.jumpToLine = function(e) {
            var i = e.getCursor();
            t(e, n(e), e.phrase("Jump to line:"), i.line + 1 + ":" + i.ch, function(t) {
                var n;
                if (t)
                    if (n = /^\s*([\+\-]?\d+)\s*\:\s*(\d+)\s*$/.exec(t)) e.setCursor(r(e, n[1]), Number(n[2]));
                    else if (n = /^\s*([\+\-]?\d+(\.\d+)?)\%\s*/.exec(t)) {
                    var o = Math.round(e.lineCount() * Number(n[1]) / 100);
                    /^[-+]/.test(n[1]) && (o = i.line + o + 1), e.setCursor(o - 1, i.ch)
                } else(n = /^\s*\:?\s*([\+\-]?\d+)\s*/.exec(t)) && e.setCursor(r(e, n[1]), i.ch)
            })
        }, e.keyMap["default"]["Alt-G"] = "jumpToLine"
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("./searchcursor"), require("../dialog/dialog")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "./searchcursor", "../dialog/dialog"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        function t(e, t) {
            return "string" == typeof e ? e = new RegExp(e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), t ? "gi" : "g") : e.global || (e = new RegExp(e.source, e.ignoreCase ? "gi" : "g")), {
                token: function(t) {
                    e.lastIndex = t.pos;
                    var n = e.exec(t.string);
                    if (n && n.index == t.pos) return t.pos += n[0].length || 1, "searching";
                    n ? t.pos = n.index : t.skipToEnd()
                }
            }
        }
        function n() {
            this.posFrom = this.posTo = this.lastQuery = this.query = null, this.overlay = null
        }
        function r(e) {
            return e.state.search || (e.state.search = new n)
        }
        function i(e) {
            return "string" == typeof e && e == e.toLowerCase()
        }
        function o(e, t, n) {
            return e.getSearchCursor(t, n, {
                caseFold: i(t),
                multiline: !0
            })
        }
        function a(e, t, n, r, i) {
            e.openDialog(t, r, {
                value: n,
                selectValueOnOpen: !0,
                closeOnEnter: !1,
                onClose: function() {
                    p(e)
                },
                onKeyDown: i
            })
        }
        function l(e, t, n, r, i) {
            e.openDialog ? e.openDialog(t, i, {
                value: r,
                selectValueOnOpen: !0
            }) : i(prompt(n, r))
        }
        function s(e, t, n, r) {
            e.openConfirm ? e.openConfirm(t, r) : confirm(n) && r[0]()
        }
        function c(e) {
            return e.replace(/\\(.)/g, function(e, t) {
                return "n" == t ? "\n" : "r" == t ? "\r" : t
            })
        }
        function u(e) {
            var t = e.match(/^\/(.*)\/([a-z]*)$/);
            if (t) try {
                e = new RegExp(t[1], -1 == t[2].indexOf("i") ? "" : "i")
            } catch (n) {} else e = c(e);
            return ("string" == typeof e ? "" == e : e.test("")) && (e = /x^/), e
        }
        function f(e, n, r) {
            n.queryText = r, n.query = u(r), e.removeOverlay(n.overlay, i(n.query)), n.overlay = t(n.query, i(n.query)), e.addOverlay(n.overlay), e.showMatchesOnScrollbar && (n.annotate && (n.annotate.clear(), n.annotate = null), n.annotate = e.showMatchesOnScrollbar(n.query, i(n.query)))
        }
        function d(t, n, i, o) {
            var s = r(t);
            if (s.query) return h(t, n);
            var c = t.getSelection() || s.lastQuery;
            if (c instanceof RegExp && "x^" == c.source && (c = null), i && t.openDialog) {
                var u = null,
                    d = function(n, r) {
                        e.e_stop(r), n && (n != s.queryText && (f(t, s, n), s.posFrom = s.posTo = t.getCursor()), u && (u.style.opacity = 1), h(t, r.shiftKey, function(e, n) {
                            var r;
                            n.line < 3 && document.querySelector && (r = t.display.wrapper.querySelector(".CodeMirror-dialog")) && r.getBoundingClientRect().bottom - 4 > t.cursorCoords(n, "window").top && ((u = r).style.opacity = .4)
                        }))
                    };
                a(t, m(t), c, d, function(n, i) {
                    var o = e.keyName(n),
                        a = t.getOption("extraKeys"),
                        l = a && a[o] || e.keyMap[t.getOption("keyMap")][o];
                    "findNext" == l || "findPrev" == l || "findPersistentNext" == l || "findPersistentPrev" == l ? (e.e_stop(n), f(t, r(t), i), t.execCommand(l)) : "find" != l && "findPersistent" != l || (e.e_stop(n), d(i, n))
                }), o && c && (f(t, s, c), h(t, n))
            } else l(t, m(t), "Search for:", c, function(e) {
                e && !s.query && t.operation(function() {
                    f(t, s, e), s.posFrom = s.posTo = t.getCursor(), h(t, n)
                })
            })
        }
        function h(t, n, i) {
            t.operation(function() {
                var a = r(t),
                    l = o(t, a.query, n ? a.posFrom : a.posTo);
                (l.find(n) || (l = o(t, a.query, n ? e.Pos(t.lastLine()) : e.Pos(t.firstLine(), 0))).find(n)) && (t.setSelection(l.from(), l.to()), t.scrollIntoView({
                    from: l.from(),
                    to: l.to()
                }, 20), a.posFrom = l.from(), a.posTo = l.to(), i && i(l.from(), l.to()))
            })
        }
        function p(e) {
            e.operation(function() {
                var t = r(e);
                t.lastQuery = t.query, t.query && (t.query = t.queryText = null, e.removeOverlay(t.overlay), t.annotate && (t.annotate.clear(), t.annotate = null))
            })
        }
        function m(e) {
            return '<span class="CodeMirror-search-label">' + e.phrase("Search:") + '</span> <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">' + e.phrase("(Use /re/ syntax for regexp search)") + "</span>"
        }
        function g(e) {
            return ' <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">' + e.phrase("(Use /re/ syntax for regexp search)") + "</span>"
        }
        function v(e) {
            return '<span class="CodeMirror-search-label">' + e.phrase("With:") + '</span> <input type="text" style="width: 10em" class="CodeMirror-search-field"/>'
        }
        function y(e) {
            return '<span class="CodeMirror-search-label">' + e.phrase("Replace?") + "</span> <button>" + e.phrase("Yes") + "</button> <button>" + e.phrase("No") + "</button> <button>" + e.phrase("All") + "</button> <button>" + e.phrase("Stop") + "</button> "
        }
        function b(e, t, n) {
            e.operation(function() {
                for (var r = o(e, t); r.findNext();)
                    if ("string" != typeof t) {
                        var i = e.getRange(r.from(), r.to()).match(t);
                        r.replace(n.replace(/\$(\d)/g, function(e, t) {
                            return i[t]
                        }))
                    } else r.replace(n)
            })
        }
        function x(e, t) {
            if (!e.getOption("readOnly")) {
                var n = e.getSelection() || r(e).lastQuery,
                    i = '<span class="CodeMirror-search-label">' + (t ? e.phrase("Replace all:") : e.phrase("Replace:")) + "</span>";
                l(e, i + g(e), i, n, function(n) {
                    n && (n = u(n), l(e, v(e), e.phrase("Replace with:"), "", function(r) {
                        if (r = c(r), t) b(e, n, r);
                        else {
                            p(e);
                            var i = o(e, n, e.getCursor("from")),
                                a = function() {
                                    var t, c = i.from();
                                    !(t = i.findNext()) && (i = o(e, n), !(t = i.findNext()) || c && i.from().line == c.line && i.from().ch == c.ch) || (e.setSelection(i.from(), i.to()), e.scrollIntoView({
                                        from: i.from(),
                                        to: i.to()
                                    }), s(e, y(e), e.phrase("Replace?"), [function() {
                                        l(t)
                                    }, a, function() {
                                        b(e, n, r)
                                    }]))
                                },
                                l = function(e) {
                                    i.replace("string" == typeof n ? r : r.replace(/\$(\d)/g, function(t, n) {
                                        return e[n]
                                    })), a()
                                };
                            a()
                        }
                    }))
                })
            }
        }
        e.commands.find = function(e) {
            p(e), d(e)
        }, e.commands.findPersistent = function(e) {
            p(e), d(e, !1, !0)
        }, e.commands.findPersistentNext = function(e) {
            d(e, !1, !0, !0)
        }, e.commands.findPersistentPrev = function(e) {
            d(e, !0, !0, !0)
        }, e.commands.findNext = d, e.commands.findPrev = function(e) {
            d(e, !0)
        }, e.commands.clearSearch = p, e.commands.replace = x, e.commands.replaceAll = function(e) {
            x(e, !0)
        }
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        function t(e) {
            var t = e.flags;
            return null != t ? t : (e.ignoreCase ? "i" : "") + (e.global ? "g" : "") + (e.multiline ? "m" : "")
        }
        function n(e, n) {
            for (var r = t(e), i = r, o = 0; o < n.length; o++) - 1 == i.indexOf(n.charAt(o)) && (i += n.charAt(o));
            return r == i ? e : new RegExp(e.source, i)
        }
        function r(e) {
            return /\\s|\\n|\n|\\W|\\D|\[\^/.test(e.source)
        }
        function i(e, t, r) {
            t = n(t, "g");
            for (var i = r.line, o = r.ch, a = e.lastLine(); i <= a; i++, o = 0) {
                t.lastIndex = o;
                var l = e.getLine(i),
                    s = t.exec(l);
                if (s) return {
                    from: m(i, s.index),
                    to: m(i, s.index + s[0].length),
                    match: s
                }
            }
        }
        function o(e, t, o) {
            if (!r(t)) return i(e, t, o);
            t = n(t, "gm");
            for (var a, l = 1, s = o.line, c = e.lastLine(); s <= c;) {
                for (var u = 0; u < l && !(s > c); u++) {
                    var f = e.getLine(s++);
                    a = null == a ? f : a + "\n" + f
                }
                l *= 2, t.lastIndex = o.ch;
                var d = t.exec(a);
                if (d) {
                    var h = a.slice(0, d.index).split("\n"),
                        p = d[0].split("\n"),
                        g = o.line + h.length - 1,
                        v = h[h.length - 1].length;
                    return {
                        from: m(g, v),
                        to: m(g + p.length - 1, 1 == p.length ? v + p[0].length : p[p.length - 1].length),
                        match: d
                    }
                }
            }
        }
        function a(e, t) {
            for (var n, r = 0;;) {
                t.lastIndex = r;
                var i = t.exec(e);
                if (!i) return n;
                if ((r = (n = i).index + (n[0].length || 1)) == e.length) return n
            }
        }
        function l(e, t, r) {
            t = n(t, "g");
            for (var i = r.line, o = r.ch, l = e.firstLine(); i >= l; i--, o = -1) {
                var s = e.getLine(i);
                o > -1 && (s = s.slice(0, o));
                var c = a(s, t);
                if (c) return {
                    from: m(i, c.index),
                    to: m(i, c.index + c[0].length),
                    match: c
                }
            }
        }
        function s(e, t, r) {
            t = n(t, "gm");
            for (var i, o = 1, l = r.line, s = e.firstLine(); l >= s;) {
                for (var c = 0; c < o; c++) {
                    var u = e.getLine(l--);
                    i = null == i ? u.slice(0, r.ch) : u + "\n" + i
                }
                o *= 2;
                var f = a(i, t);
                if (f) {
                    var d = i.slice(0, f.index).split("\n"),
                        h = f[0].split("\n"),
                        p = l + d.length,
                        g = d[d.length - 1].length;
                    return {
                        from: m(p, g),
                        to: m(p + h.length - 1, 1 == h.length ? g + h[0].length : h[h.length - 1].length),
                        match: f
                    }
                }
            }
        }
        function c(e, t, n, r) {
            if (e.length == t.length) return n;
            for (var i = 0, o = n + Math.max(0, e.length - t.length);;) {
                if (i == o) return i;
                var a = i + o >> 1,
                    l = r(e.slice(0, a)).length;
                if (l == n) return a;
                l > n ? o = a : i = a + 1
            }
        }
        function u(e, t, n, r) {
            if (!t.length) return null;
            var i = r ? h : p,
                o = i(t).split(/\r|\n\r?/);
            e: for (var a = n.line, l = n.ch, s = e.lastLine() + 1 - o.length; a <= s; a++, l = 0) {
                var u = e.getLine(a).slice(l),
                    f = i(u);
                if (1 == o.length) {
                    var d = f.indexOf(o[0]);
                    if (-1 == d) continue e;
                    n = c(u, f, d, i) + l;
                    return {
                        from: m(a, c(u, f, d, i) + l),
                        to: m(a, c(u, f, d + o[0].length, i) + l)
                    }
                }
                var g = f.length - o[0].length;
                if (f.slice(g) == o[0]) {
                    for (var v = 1; v < o.length - 1; v++)
                        if (i(e.getLine(a + v)) != o[v]) continue e;
                    var y = e.getLine(a + o.length - 1),
                        b = i(y),
                        x = o[o.length - 1];
                    if (b.slice(0, x.length) == x) return {
                        from: m(a, c(u, f, g, i) + l),
                        to: m(a + o.length - 1, c(y, b, x.length, i))
                    }
                }
            }
        }
        function f(e, t, n, r) {
            if (!t.length) return null;
            var i = r ? h : p,
                o = i(t).split(/\r|\n\r?/);
            e: for (var a = n.line, l = n.ch, s = e.firstLine() - 1 + o.length; a >= s; a--, l = -1) {
                var u = e.getLine(a);
                l > -1 && (u = u.slice(0, l));
                var f = i(u);
                if (1 == o.length) {
                    var d = f.lastIndexOf(o[0]);
                    if (-1 == d) continue e;
                    return {
                        from: m(a, c(u, f, d, i)),
                        to: m(a, c(u, f, d + o[0].length, i))
                    }
                }
                var g = o[o.length - 1];
                if (f.slice(0, g.length) == g) {
                    var v = 1;
                    for (n = a - o.length + 1; v < o.length - 1; v++)
                        if (i(e.getLine(n + v)) != o[v]) continue e;
                    var y = e.getLine(a + 1 - o.length),
                        b = i(y);
                    if (b.slice(b.length - o[0].length) == o[0]) return {
                        from: m(a + 1 - o.length, c(y, b, y.length - o[0].length, i)),
                        to: m(a, c(u, f, g.length, i))
                    }
                }
            }
        }
        function d(e, t, r, a) {
            var c;
            this.atOccurrence = !1, this.doc = e, r = r ? e.clipPos(r) : m(0, 0), this.pos = {
                from: r,
                to: r
            }, "object" == typeof a ? c = a.caseFold : (c = a, a = null), "string" == typeof t ? (null == c && (c = !1), this.matches = function(n, r) {
                return (n ? f : u)(e, t, r, c)
            }) : (t = n(t, "gm"), a && !1 === a.multiline ? this.matches = function(n, r) {
                return (n ? l : i)(e, t, r)
            } : this.matches = function(n, r) {
                return (n ? s : o)(e, t, r)
            })
        }
        var h, p, m = e.Pos;
        String.prototype.normalize ? (h = function(e) {
            return e.normalize("NFD").toLowerCase()
        }, p = function(e) {
            return e.normalize("NFD")
        }) : (h = function(e) {
            return e.toLowerCase()
        }, p = function(e) {
            return e
        }), d.prototype = {
            findNext: function() {
                return this.find(!1)
            },
            findPrevious: function() {
                return this.find(!0)
            },
            find: function(t) {
                for (var n = this.matches(t, this.doc.clipPos(t ? this.pos.from : this.pos.to)); n && 0 == e.cmpPos(n.from, n.to);) t ? n.from.ch ? n.from = m(n.from.line, n.from.ch - 1) : n = n.from.line == this.doc.firstLine() ? null : this.matches(t, this.doc.clipPos(m(n.from.line - 1))) : n.to.ch < this.doc.getLine(n.to.line).length ? n.to = m(n.to.line, n.to.ch + 1) : n = n.to.line == this.doc.lastLine() ? null : this.matches(t, m(n.to.line + 1, 0));
                if (n) return this.pos = n, this.atOccurrence = !0, this.pos.match || !0;
                var r = m(t ? this.doc.firstLine() : this.doc.lastLine() + 1, 0);
                return this.pos = {
                    from: r,
                    to: r
                }, this.atOccurrence = !1
            },
            from: function() {
                if (this.atOccurrence) return this.pos.from
            },
            to: function() {
                if (this.atOccurrence) return this.pos.to
            },
            replace: function(t, n) {
                if (this.atOccurrence) {
                    var r = e.splitLines(t);
                    this.doc.replaceRange(r, this.pos.from, this.pos.to, n), this.pos.to = m(this.pos.from.line + r.length - 1, r[r.length - 1].length + (1 == r.length ? this.pos.from.ch : 0))
                }
            }
        }, e.defineExtension("getSearchCursor", function(e, t, n) {
            return new d(this.doc, e, t, n)
        }), e.defineDocExtension("getSearchCursor", function(e, t, n) {
            return new d(this, e, t, n)
        }), e.defineExtension("selectMatches", function(t, n) {
            for (var r = [], i = this.getSearchCursor(t, this.getCursor("from"), n); i.findNext() && !(e.cmpPos(i.to(), this.getCursor("to")) > 0);) r.push({
                anchor: i.from(),
                head: i.to()
            });
            r.length && this.setSelections(r, 0)
        })
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        function t(e, t, n) {
            for (var r = n.paragraphStart || e.getHelper(t, "paragraphStart"), i = t.line, o = e.firstLine(); i > o; --i) {
                var a = e.getLine(i);
                if (r && r.test(a)) break;
                if (!/\S/.test(a)) {
                    ++i;
                    break
                }
            }
            for (var l = n.paragraphEnd || e.getHelper(t, "paragraphEnd"), s = t.line + 1, c = e.lastLine(); s <= c; ++s) {
                a = e.getLine(s);
                if (l && l.test(a)) {
                    ++s;
                    break
                }
                if (!/\S/.test(a)) break
            }
            return {
                from: i,
                to: s
            }
        }
        function n(e, t, n, r) {
            for (var i = t; i < e.length && " " == e.charAt(i);) i++;
            for (; i > 0 && !n.test(e.slice(i - 1, i + 1)); --i);
            for (var o = !0;; o = !1) {
                var a = i;
                if (r)
                    for (;
                        " " == e.charAt(a - 1);) --a;
                if (0 != a || !o) return {
                    from: a,
                    to: i
                };
                i = t
            }
        }
        function r(t, r, o, a) {
            r = t.clipPos(r), o = t.clipPos(o);
            var l = a.column || 80,
                s = a.wrapOn || /\s\S|-[^\.\d]/,
                c = !1 !== a.killTrailingSpace,
                u = [],
                f = "",
                d = r.line,
                h = t.getRange(r, o, !1);
            if (!h.length) return null;
            var p = h[0].match(/^[ \t]*/)[0];
            p.length >= l && (l = p.length + 1);
            for (var m = 0; m < h.length; ++m) {
                var g = h[m],
                    v = f.length,
                    y = 0;
                f && g && !s.test(f.charAt(f.length - 1) + g.charAt(0)) && (f += " ", y = 1);
                var b = "";
                if (m && (b = g.match(/^\s*/)[0], g = g.slice(b.length)), f += g, m) {
                    var x = f.length > l && p == b && n(f, l, s, c);
                    x && x.from == v && x.to == v + y ? (f = p + g, ++d) : u.push({
                        text: [y ? " " : ""],
                        from: i(d, v),
                        to: i(d + 1, b.length)
                    })
                }
                for (; f.length > l;) {
                    var k = n(f, l, s, c);
                    u.push({
                        text: ["", p],
                        from: i(d, k.from),
                        to: i(d, k.to)
                    }), f = p + f.slice(k.to), ++d
                }
            }
            return u.length && t.operation(function() {
                for (var n = 0; n < u.length; ++n) {
                    var r = u[n];
                    (r.text || e.cmpPos(r.from, r.to)) && t.replaceRange(r.text, r.from, r.to)
                }
            }), u.length ? {
                from: u[0].from,
                to: e.changeEnd(u[u.length - 1])
            } : null
        }
        var i = e.Pos;
        e.defineExtension("wrapParagraph", function(e, n) {
            n = n || {}, e || (e = this.getCursor());
            var o = t(this, e, n);
            return r(this, i(o.from, 0), i(o.to - 1), n)
        }), e.commands.wrapLines = function(e) {
            e.operation(function() {
                for (var n = e.listSelections(), o = e.lastLine() + 1, a = n.length - 1; a >= 0; a--) {
                    var l, s = n[a];
                    if (s.empty()) {
                        var c = t(e, s.head, {});
                        l = {
                            from: i(c.from, 0),
                            to: i(c.to - 1)
                        }
                    } else l = {
                        from: s.from(),
                        to: s.to()
                    };
                    l.to.line >= o || (o = l.from.line, r(e, l.from, l.to, {}))
                }
            })
        }, e.defineExtension("wrapRange", function(e, t, n) {
            return r(this, e, t, n || {})
        }), e.defineExtension("wrapParagraphsInRange", function(e, n, o) {
            o = o || {};
            for (var a = this, l = [], s = e.line; s <= n.line;) {
                var c = t(a, i(s, 0), o);
                l.push(c), s = c.to
            }
            var u = !1;
            return l.length && a.operation(function() {
                for (var e = l.length - 1; e >= 0; --e) u = u || r(a, i(l[e].from, 0), i(l[e].to - 1), o)
            }), u
        })
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../lib/codemirror"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        function t(e) {
            l = e.getModeAt({
                line: 0,
                ch: 0
            }), s = l.helperType || l.name, c = u.cmModeToType(s)
        }
        function n(e) {
            var t = i(),
                n = o(),
                r = {
                    indent: !0,
                    lineComment: t,
                    blockCommentStart: n.start,
                    blockCommentEnd: n.end
                };
            e.toggleComment(r)
        }
        function r(e) {
            var t = o(),
                n = i(),
                r = a(),
                l = {
                    fullLines: !(t.end && " " !== t.end),
                    lineComment: n,
                    blockCommentStart: t.start,
                    blockCommentEnd: t.end,
                    blockCommentIndent: r
                };
            e.toggleBlockComment(l)
        }
        function i() {
            var e = l.lineComment || null;
            switch (c) {
                case "html":
                    switch (s) {
                        case "slim":
                            return "/";
                        case "haml":
                            return "-#";
                        case "pug":
                            return "//-"
                    }
                    break;
                case "css":
                    switch (s) {
                        case "scss":
                        case "sass":
                        case "less":
                        case "stylus":
                            return "//"
                    }
                    break;
                case "js":
                    switch (s) {
                        case "coffeescript":
                        case "livescript":
                            return "#";
                        default:
                            return "//"
                    }
            }
            return e
        }
        function o() {
            var e = l.blockCommentStart || "/*",
                t = l.blockCommentEnd || "*/";
            switch (c) {
                case "html":
                    switch (s) {
                        case "slim":
                            return {
                                start: "/! ",
                                end: " "
                            };
                        case "haml":
                            return {
                                start: "/ ",
                                end: " "
                            };
                        case "pug":
                            return {
                                start: "// ",
                                end: " "
                            };
                        default:
                            return {
                                start: "<!--",
                                end: "-->"
                            }
                    }
                case "js":
                    if ("coffeescript" === s) return {
                        start: "###",
                        end: "###"
                    }
            }
            return {
                start: e,
                end: t
            }
        }
        function a() {
            if ("html" !== c) return !1;
            switch (s) {
                case "slim":
                case "haml":
                case "pug":
                    return !0;
                default:
                    return !1
            }
        }
        var l, s, c, u = {
                _HTML_TYPES: ["html", "xml", "haml", "markdown", "slim", "pug", "application/x-slim"],
                _CSS_TYPES: ["css", "less", "scss", "sass", "stylus", "text/css", "text/x-sass", "text/x-scss", "text/x-less", "text/x-styl"],
                _JS_TYPES: ["javascript", "coffeescript", "livescript", "typescript", "text/javascript", "text/x-coffeescript", "text/x-livescript", "text/typescript"],
                cmModeToType: function(e) {
                    var t = this._getSafeInputMode(e);
                    return this._getType(t)
                },
                _getSafeInputMode: function(e) {
                    return ("string" == typeof e ? e : e.name).toLowerCase()
                },
                _getType: function(e) {
                    return -1 !== this._HTML_TYPES.indexOf(e) ? "html" : -1 !== this._CSS_TYPES.indexOf(e) ? "css" : -1 !== this._JS_TYPES.indexOf(e) ? "js" : "unknown"
                }
            },
            f = e.commands;
        f.toggleCommentIndented = function(e) {
            t(e), n(e)
        }, f.toggleBlockComment = function(e) {
            t(e), r(e)
        };
        var d = e.keyMap;
        d.macExtendedBase = {
            "Cmd-Alt-/": "toggleBlockComment",
            "Cmd-/": "toggleCommentIndented",
            fallthrough: "macDefault"
        }, e.normalizeKeyMap(d.macExtendedBase), d.pcExtendedBase = {
            "Ctrl-Alt-/": "toggleBlockComment",
            "Ctrl-/": "toggleCommentIndented",
            fallthrough: "pcDefault"
        }, e.normalizeKeyMap(d.pcExtendedBase);
        var h = d["default"] == d.macDefault;
        d.extendedBase = h ? d.macExtendedBase : d.pcExtendedBase
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../lib/codemirror"), require("../addon/search/searchcursor"), require("../addon/edit/matchbrackets")) : "function" == typeof define && define.amd ? define(["../lib/codemirror", "../addon/search/searchcursor", "../addon/edit/matchbrackets"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        function t(t, n, r) {
            if (r < 0 && 0 == n.ch) return t.clipPos(h(n.line - 1));
            var i = t.getLine(n.line);
            if (r > 0 && n.ch >= i.length) return t.clipPos(h(n.line + 1, 0));
            for (var o, a = "start", l = n.ch, s = r < 0 ? 0 : i.length, c = 0; l != s; l += r, c++) {
                var u = i.charAt(r < 0 ? l - 1 : l),
                    f = "_" != u && e.isWordChar(u) ? "w" : "o";
                if ("w" == f && u.toUpperCase() == u && (f = "W"), "start" == a) "o" != f && (a = "in", o = f);
                else if ("in" == a && o != f) {
                    if ("w" == o && "W" == f && r < 0 && l--, "W" == o && "w" == f && r > 0) {
                        o = "w";
                        continue
                    }
                    break
                }
            }
            return h(n.line, l)
        }
        function n(e, n) {
            e.extendSelectionsBy(function(r) {
                return e.display.shift || e.doc.extend || r.empty() ? t(e.doc, r.head, n) : n < 0 ? r.from() : r.to()
            })
        }
        function r(t, n) {
            if (t.isReadOnly()) return e.Pass;
            t.operation(function() {
                for (var e = t.listSelections().length, r = [], i = -1, o = 0; o < e; o++) {
                    var a = t.listSelections()[o].head;
                    if (!(a.line <= i)) {
                        var l = h(a.line + (n ? 0 : 1), 0);
                        t.replaceRange("\n", l, null, "+insertLine"), t.indentLine(l.line, null, !0), r.push({
                            head: l,
                            anchor: l
                        }), i = a.line + 1
                    }
                }
                t.setSelections(r)
            }), t.execCommand("indentAuto")
        }
        function i(t, n) {
            for (var r = n.ch, i = r, o = t.getLine(n.line); r && e.isWordChar(o.charAt(r - 1));) --r;
            for (; i < o.length && e.isWordChar(o.charAt(i));) ++i;
            return {
                from: h(n.line, r),
                to: h(n.line, i),
                word: o.slice(r, i)
            }
        }
        function o(e, t) {
            for (var n = e.listSelections(), r = [], i = 0; i < n.length; i++) {
                var o = n[i],
                    a = e.findPosV(o.anchor, t, "line", o.anchor.goalColumn),
                    l = e.findPosV(o.head, t, "line", o.head.goalColumn);
                a.goalColumn = null != o.anchor.goalColumn ? o.anchor.goalColumn : e.cursorCoords(o.anchor, "div").left, l.goalColumn = null != o.head.goalColumn ? o.head.goalColumn : e.cursorCoords(o.head, "div").left;
                var s = {
                    anchor: a,
                    head: l
                };
                r.push(o), r.push(s)
            }
            e.setSelections(r)
        }
        function a(e, t, n) {
            for (var r = 0; r < e.length; r++)
                if (e[r].from() == t && e[r].to() == n) return !0;
            return !1
        }
        function l(t) {
            for (var n = t.listSelections(), r = [], i = 0; i < n.length; i++) {
                var o = n[i],
                    a = o.head,
                    l = t.scanForBracket(a, -1);
                if (!l) return !1;
                for (;;) {
                    var s = t.scanForBracket(a, 1);
                    if (!s) return !1;
                    if (s.ch == p.charAt(p.indexOf(l.ch) + 1)) {
                        var c = h(l.pos.line, l.pos.ch + 1);
                        if (0 != e.cmpPos(c, o.from()) || 0 != e.cmpPos(s.pos, o.to())) {
                            r.push({
                                anchor: c,
                                head: s.pos
                            });
                            break
                        }
                        if (!(l = t.scanForBracket(l.pos, -1))) return !1
                    }
                    a = h(s.pos.line, s.pos.ch + 1)
                }
            }
            return t.setSelections(r), !0
        }
        function s(t, n) {
            if (t.isReadOnly()) return e.Pass;
            for (var r, i = t.listSelections(), o = [], a = 0; a < i.length; a++) {
                var l = i[a];
                if (!l.empty()) {
                    for (var s = l.from().line, c = l.to().line; a < i.length - 1 && i[a + 1].from().line == c;) c = i[++a].to().line;
                    i[a].to().ch || c--, o.push(s, c)
                }
            }
            o.length ? r = !0 : o.push(t.firstLine(), t.lastLine()), t.operation(function() {
                for (var e = [], i = 0; i < o.length; i += 2) {
                    var a = o[i],
                        l = o[i + 1],
                        s = h(a, 0),
                        c = h(l),
                        u = t.getRange(s, c, !1);
                    n ? u.sort() : u.sort(function(e, t) {
                        var n = e.toUpperCase(),
                            r = t.toUpperCase();
                        return n != r && (e = n, t = r), e < t ? -1 : e == t ? 0 : 1
                    }), t.replaceRange(u, s, c), r && e.push({
                        anchor: s,
                        head: h(l + 1, 0)
                    })
                }
                r && t.setSelections(e, 0)
            })
        }
        function c(t, n) {
            t.operation(function() {
                for (var r = t.listSelections(), o = [], a = [], l = 0; l < r.length; l++) {
                    (c = r[l]).empty() ? (o.push(l), a.push("")) : a.push(n(t.getRange(c.from(), c.to())))
                }
                t.replaceSelections(a, "around", "case");
                var s;
                for (l = o.length - 1; l >= 0; l--) {
                    var c = r[o[l]];
                    if (!(s && e.cmpPos(c.head, s) > 0)) {
                        var u = i(t, c.head);
                        s = u.from, t.replaceRange(n(u.word), u.from, u.to)
                    }
                }
            })
        }
        function u(t) {
            var n = t.getCursor("from"),
                r = t.getCursor("to");
            if (0 == e.cmpPos(n, r)) {
                var o = i(t, n);
                if (!o.word) return;
                n = o.from, r = o.to
            }
            return {
                from: n,
                to: r,
                query: t.getRange(n, r),
                word: o
            }
        }
        function f(e, t) {
            var n = u(e);
            if (n) {
                var r = n.query,
                    i = e.getSearchCursor(r, t ? n.to : n.from);
                (t ? i.findNext() : i.findPrevious()) ? e.setSelection(i.from(), i.to()): (i = e.getSearchCursor(r, t ? h(e.firstLine(), 0) : e.clipPos(h(e.lastLine()))), (t ? i.findNext() : i.findPrevious()) ? e.setSelection(i.from(), i.to()) : n.word && e.setSelection(n.from, n.to))
            }
        }
        var d = e.commands,
            h = e.Pos;
        d.goSubwordLeft = function(e) {
            n(e, -1)
        }, d.goSubwordRight = function(e) {
            n(e, 1)
        }, d.scrollLineUp = function(e) {
            var t = e.getScrollInfo();
            if (!e.somethingSelected()) {
                var n = e.lineAtHeight(t.top + t.clientHeight, "local");
                e.getCursor().line >= n && e.execCommand("goLineUp")
            }
            e.scrollTo(null, t.top - e.defaultTextHeight())
        }, d.scrollLineDown = function(e) {
            var t = e.getScrollInfo();
            if (!e.somethingSelected()) {
                var n = e.lineAtHeight(t.top, "local") + 1;
                e.getCursor().line <= n && e.execCommand("goLineDown")
            }
            e.scrollTo(null, t.top + e.defaultTextHeight())
        }, d.splitSelectionByLine = function(e) {
            for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++)
                for (var i = t[r].from(), o = t[r].to(), a = i.line; a <= o.line; ++a) o.line > i.line && a == o.line && 0 == o.ch || n.push({
                    anchor: a == i.line ? i : h(a, 0),
                    head: a == o.line ? o : h(a)
                });
            e.setSelections(n, 0)
        }, d.singleSelectionTop = function(e) {
            var t = e.listSelections()[0];
            e.setSelection(t.anchor, t.head, {
                scroll: !1
            })
        }, d.selectLine = function(e) {
            for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++) {
                var i = t[r];
                n.push({
                    anchor: h(i.from().line, 0),
                    head: h(i.to().line + 1, 0)
                })
            }
            e.setSelections(n)
        }, d.insertLineAfter = function(e) {
            return r(e, !1)
        }, d.insertLineBefore = function(e) {
            return r(e, !0)
        }, d.selectNextOccurrence = function(t) {
            var n = t.getCursor("from"),
                r = t.getCursor("to"),
                o = t.state.sublimeFindFullWord == t.doc.sel;
            if (0 == e.cmpPos(n, r)) {
                var l = i(t, n);
                if (!l.word) return;
                t.setSelection(l.from, l.to), o = !0
            } else {
                var s = t.getRange(n, r),
                    c = o ? new RegExp("\\b" + s + "\\b") : s,
                    u = t.getSearchCursor(c, r),
                    f = u.findNext();
                if (f || (f = (u = t.getSearchCursor(c, h(t.firstLine(), 0))).findNext()), !f || a(t.listSelections(), u.from(), u.to())) return e.Pass;
                t.addSelection(u.from(), u.to())
            }
            o && (t.state.sublimeFindFullWord = t.doc.sel)
        }, d.addCursorToPrevLine = function(e) {
            o(e, -1)
        }, d.addCursorToNextLine = function(e) {
            o(e, 1)
        };
        var p = "(){}[]";
        d.selectScope = function(e) {
            l(e) || e.execCommand("selectAll")
        }, d.selectBetweenBrackets = function(t) {
            if (!l(t)) return e.Pass
        }, d.goToBracket = function(t) {
            t.extendSelectionsBy(function(n) {
                var r = t.scanForBracket(n.head, 1);
                if (r && 0 != e.cmpPos(r.pos, n.head)) return r.pos;
                var i = t.scanForBracket(n.head, -1);
                return i && h(i.pos.line, i.pos.ch + 1) || n.head
            })
        }, d.swapLineUp = function(t) {
            if (t.isReadOnly()) return e.Pass;
            for (var n = t.listSelections(), r = [], i = t.firstLine() - 1, o = [], a = 0; a < n.length; a++) {
                var l = n[a],
                    s = l.from().line - 1,
                    c = l.to().line;
                o.push({
                    anchor: h(l.anchor.line - 1, l.anchor.ch),
                    head: h(l.head.line - 1, l.head.ch)
                }), 0 != l.to().ch || l.empty() || --c, s > i ? r.push(s, c) : r.length && (r[r.length - 1] = c), i = c
            }
            t.operation(function() {
                for (var e = 0; e < r.length; e += 2) {
                    var n = r[e],
                        i = r[e + 1],
                        a = t.getLine(n);
                    t.replaceRange("", h(n, 0), h(n + 1, 0), "+swapLine"), i > t.lastLine() ? t.replaceRange("\n" + a, h(t.lastLine()), null, "+swapLine") : t.replaceRange(a + "\n", h(i, 0), null, "+swapLine")
                }
                t.setSelections(o), t.scrollIntoView()
            })
        }, d.swapLineDown = function(t) {
            if (t.isReadOnly()) return e.Pass;
            for (var n = t.listSelections(), r = [], i = t.lastLine() + 1, o = n.length - 1; o >= 0; o--) {
                var a = n[o],
                    l = a.to().line + 1,
                    s = a.from().line;
                0 != a.to().ch || a.empty() || l--, l < i ? r.push(l, s) : r.length && (r[r.length - 1] = s), i = s
            }
            t.operation(function() {
                for (var e = r.length - 2; e >= 0; e -= 2) {
                    var n = r[e],
                        i = r[e + 1],
                        o = t.getLine(n);
                    n == t.lastLine() ? t.replaceRange("", h(n - 1), h(n), "+swapLine") : t.replaceRange("", h(n, 0), h(n + 1, 0), "+swapLine"), t.replaceRange(o + "\n", h(i, 0), null, "+swapLine")
                }
                t.scrollIntoView()
            })
        }, d.joinLines = function(e) {
            for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++) {
                for (var i = t[r], o = i.from(), a = o.line, l = i.to().line; r < t.length - 1 && t[r + 1].from().line == l;) l = t[++r].to().line;
                n.push({
                    start: a,
                    end: l,
                    anchor: !i.empty() && o
                })
            }
            e.operation(function() {
                for (var t = 0, r = [], i = 0; i < n.length; i++) {
                    for (var o, a = n[i], l = a.anchor && h(a.anchor.line - t, a.anchor.ch), s = a.start; s <= a.end; s++) {
                        var c = s - t;
                        s == a.end && (o = h(c, e.getLine(c).length + 1)), c < e.lastLine() && (e.replaceRange(" ", h(c), h(c + 1, /^\s*/.exec(e.getLine(c + 1))[0].length)), ++t)
                    }
                    r.push({
                        anchor: l || o,
                        head: o
                    })
                }
                e.setSelections(r, 0)
            })
        }, d.duplicateLine = function(e) {
            e.operation(function() {
                for (var t = e.listSelections().length, n = 0; n < t; n++) {
                    var r = e.listSelections()[n];
                    r.empty() ? e.replaceRange(e.getLine(r.head.line) + "\n", h(r.head.line, 0)) : e.replaceRange(e.getRange(r.from(), r.to()), r.from())
                }
                e.scrollIntoView()
            })
        }, d.sortLines = function(e) {
            s(e, !0)
        }, d.sortLinesInsensitive = function(e) {
            s(e, !1)
        }, d.nextBookmark = function(e) {
            var t = e.state.sublimeBookmarks;
            if (t)
                for (; t.length;) {
                    var n = t.shift(),
                        r = n.find();
                    if (r) return t.push(n), e.setSelection(r.from, r.to)
                }
        }, d.prevBookmark = function(e) {
            var t = e.state.sublimeBookmarks;
            if (t)
                for (; t.length;) {
                    t.unshift(t.pop());
                    var n = t[t.length - 1].find();
                    if (n) return e.setSelection(n.from, n.to);
                    t.pop()
                }
        }, d.toggleBookmark = function(e) {
            for (var t = e.listSelections(), n = e.state.sublimeBookmarks || (e.state.sublimeBookmarks = []), r = 0; r < t.length; r++) {
                for (var i = t[r].from(), o = t[r].to(), a = t[r].empty() ? e.findMarksAt(i) : e.findMarks(i, o), l = 0; l < a.length; l++)
                    if (a[l].sublimeBookmark) {
                        a[l].clear();
                        for (var s = 0; s < n.length; s++) n[s] == a[l] && n.splice(s--, 1);
                        break
                    }
                l == a.length && n.push(e.markText(i, o, {
                    sublimeBookmark: !0,
                    clearWhenEmpty: !1
                }))
            }
        }, d.clearBookmarks = function(e) {
            var t = e.state.sublimeBookmarks;
            if (t)
                for (var n = 0; n < t.length; n++) t[n].clear();
            t.length = 0
        }, d.selectBookmarks = function(e) {
            var t = e.state.sublimeBookmarks,
                n = [];
            if (t)
                for (var r = 0; r < t.length; r++) {
                    var i = t[r].find();
                    i ? n.push({
                        anchor: i.from,
                        head: i.to
                    }) : t.splice(r--, 0)
                }
            n.length && e.setSelections(n, 0)
        }, d.smartBackspace = function(t) {
            if (t.somethingSelected()) return e.Pass;
            t.operation(function() {
                for (var n = t.listSelections(), r = t.getOption("indentUnit"), i = n.length - 1; i >= 0; i--) {
                    var o = n[i].head,
                        a = t.getRange({
                            line: o.line,
                            ch: 0
                        }, o),
                        l = e.countColumn(a, null, t.getOption("tabSize")),
                        s = t.findPosH(o, -1, "char", !1);
                    if (a && !/\S/.test(a) && l % r == 0) {
                        var c = new h(o.line, e.findColumn(a, l - r, r));
                        c.ch != o.ch && (s = c)
                    }
                    t.replaceRange("", s, o, "+delete")
                }
            })
        }, d.delLineRight = function(e) {
            e.operation(function() {
                for (var t = e.listSelections(), n = t.length - 1; n >= 0; n--) e.replaceRange("", t[n].anchor, h(t[n].to().line), "+delete");
                e.scrollIntoView()
            })
        }, d.upcaseAtCursor = function(e) {
            c(e, function(e) {
                return e.toUpperCase()
            })
        }, d.downcaseAtCursor = function(e) {
            c(e, function(e) {
                return e.toLowerCase()
            })
        }, d.setSublimeMark = function(e) {
            e.state.sublimeMark && e.state.sublimeMark.clear(), e.state.sublimeMark = e.setBookmark(e.getCursor())
        }, d.selectToSublimeMark = function(e) {
            var t = e.state.sublimeMark && e.state.sublimeMark.find();
            t && e.setSelection(e.getCursor(), t)
        }, d.deleteToSublimeMark = function(t) {
            var n = t.state.sublimeMark && t.state.sublimeMark.find();
            if (n) {
                var r = t.getCursor(),
                    i = n;
                if (e.cmpPos(r, i) > 0) {
                    var o = i;
                    i = r, r = o
                }
                t.state.sublimeKilled = t.getRange(r, i), t.replaceRange("", r, i)
            }
        }, d.swapWithSublimeMark = function(e) {
            var t = e.state.sublimeMark && e.state.sublimeMark.find();
            t && (e.state.sublimeMark.clear(), e.state.sublimeMark = e.setBookmark(e.getCursor()), e.setCursor(t))
        }, d.sublimeYank = function(e) {
            null != e.state.sublimeKilled && e.replaceSelection(e.state.sublimeKilled, null, "paste")
        }, d.showInCenter = function(e) {
            var t = e.cursorCoords(null, "local");
            e.scrollTo(null, (t.top + t.bottom) / 2 - e.getScrollInfo().clientHeight / 2)
        }, d.findUnder = function(e) {
            f(e, !0)
        }, d.findUnderPrevious = function(e) {
            f(e, !1)
        }, d.findAllUnder = function(e) {
            var t = u(e);
            if (t) {
                for (var n = e.getSearchCursor(t.query), r = [], i = -1; n.findNext();) r.push({
                    anchor: n.from(),
                    head: n.to()
                }), n.from().line <= t.from.line && n.from().ch <= t.from.ch && i++;
                e.setSelections(r, i)
            }
        };
        var m = e.keyMap;
        m.macSublime = {
            "Cmd-Left": "goLineStartSmart",
            "Shift-Tab": "indentLess",
            "Shift-Ctrl-K": "deleteLine",
            "Alt-Q": "wrapLines",
            "Ctrl-Left": "goSubwordLeft",
            "Ctrl-Right": "goSubwordRight",
            "Ctrl-Alt-Up": "scrollLineUp",
            "Ctrl-Alt-Down": "scrollLineDown",
            "Cmd-L": "selectLine",
            "Shift-Cmd-L": "splitSelectionByLine",
            Esc: "singleSelectionTop",
            "Cmd-Enter": "insertLineAfter",
            "Shift-Cmd-Enter": "insertLineBefore",
            "Cmd-D": "selectNextOccurrence",
            "Shift-Cmd-Space": "selectScope",
            "Shift-Cmd-M": "selectBetweenBrackets",
            "Cmd-M": "goToBracket",
            "Cmd-Ctrl-Up": "swapLineUp",
            "Cmd-Ctrl-Down": "swapLineDown",
            "Cmd-J": "joinLines",
            "Shift-Cmd-D": "duplicateLine",
            F9: "sortLines",
            "Cmd-F9": "sortLinesInsensitive",
            F2: "nextBookmark",
            "Shift-F2": "prevBookmark",
            "Cmd-F2": "toggleBookmark",
            "Shift-Cmd-F2": "clearBookmarks",
            "Alt-F2": "selectBookmarks",
            Backspace: "smartBackspace",
            "Cmd-K Cmd-K": "delLineRight",
            "Cmd-K Cmd-U": "upcaseAtCursor",
            "Cmd-K Cmd-L": "downcaseAtCursor",
            "Cmd-K Cmd-Space": "setSublimeMark",
            "Cmd-K Cmd-A": "selectToSublimeMark",
            "Cmd-K Cmd-W": "deleteToSublimeMark",
            "Cmd-K Cmd-X": "swapWithSublimeMark",
            "Cmd-K Cmd-Y": "sublimeYank",
            "Cmd-K Cmd-C": "showInCenter",
            "Cmd-K Cmd-G": "clearBookmarks",
            "Cmd-K Cmd-Backspace": "delLineLeft",
            "Cmd-K Cmd-0": "unfoldAll",
            "Cmd-K Cmd-J": "unfoldAll",
            "Ctrl-Shift-Up": "addCursorToPrevLine",
            "Ctrl-Shift-Down": "addCursorToNextLine",
            "Cmd-F3": "findUnder",
            "Shift-Cmd-F3": "findUnderPrevious",
            "Alt-F3": "findAllUnder",
            "Shift-Cmd-[": "fold",
            "Shift-Cmd-]": "unfold",
            "Cmd-I": "findIncremental",
            "Shift-Cmd-I": "findIncrementalReverse",
            "Cmd-H": "replace",
            F3: "findNext",
            "Shift-F3": "findPrev",
            fallthrough: "macExtendedBase"
        }, e.normalizeKeyMap(m.macSublime), m.pcSublime = {
            "Shift-Tab": "indentLess",
            "Shift-Ctrl-K": "deleteLine",
            "Alt-Q": "wrapLines",
            "Ctrl-T": "transposeChars",
            "Alt-Left": "goSubwordLeft",
            "Alt-Right": "goSubwordRight",
            "Ctrl-Up": "scrollLineUp",
            "Ctrl-Down": "scrollLineDown",
            "Ctrl-L": "selectLine",
            "Shift-Ctrl-L": "splitSelectionByLine",
            Esc: "singleSelectionTop",
            "Ctrl-Enter": "insertLineAfter",
            "Shift-Ctrl-Enter": "insertLineBefore",
            "Ctrl-D": "selectNextOccurrence",
            "Shift-Ctrl-Space": "selectScope",
            "Shift-Ctrl-M": "selectBetweenBrackets",
            "Ctrl-M": "goToBracket",
            "Shift-Ctrl-Up": "swapLineUp",
            "Shift-Ctrl-Down": "swapLineDown",
            "Ctrl-J": "joinLines",
            "Shift-Ctrl-D": "duplicateLine",
            F9: "sortLines",
            "Ctrl-F9": "sortLinesInsensitive",
            F2: "nextBookmark",
            "Shift-F2": "prevBookmark",
            "Ctrl-F2": "toggleBookmark",
            "Shift-Ctrl-F2": "clearBookmarks",
            "Alt-F2": "selectBookmarks",
            Backspace: "smartBackspace",
            "Ctrl-K Ctrl-K": "delLineRight",
            "Ctrl-K Ctrl-U": "upcaseAtCursor",
            "Ctrl-K Ctrl-L": "downcaseAtCursor",
            "Ctrl-K Ctrl-Space": "setSublimeMark",
            "Ctrl-K Ctrl-A": "selectToSublimeMark",
            "Ctrl-K Ctrl-W": "deleteToSublimeMark",
            "Ctrl-K Ctrl-X": "swapWithSublimeMark",
            "Ctrl-K Ctrl-Y": "sublimeYank",
            "Ctrl-K Ctrl-C": "showInCenter",
            "Ctrl-K Ctrl-G": "clearBookmarks",
            "Ctrl-K Ctrl-Backspace": "delLineLeft",
            "Ctrl-K Ctrl-0": "unfoldAll",
            "Ctrl-K Ctrl-J": "unfoldAll",
            "Ctrl-Alt-Up": "addCursorToPrevLine",
            "Ctrl-Alt-Down": "addCursorToNextLine",
            "Ctrl-F3": "findUnder",
            "Shift-Ctrl-F3": "findUnderPrevious",
            "Alt-F3": "findAllUnder",
            "Shift-Ctrl-[": "fold",
            "Shift-Ctrl-]": "unfold",
            "Ctrl-I": "findIncremental",
            "Shift-Ctrl-I": "findIncrementalReverse",
            "Ctrl-H": "replace",
            F3: "findNext",
            "Shift-F3": "findPrev",
            fallthrough: "pcExtendedBase"
        }, e.normalizeKeyMap(m.pcSublime);
        var g = m["default"] == m.macDefault;
        m.sublime = g ? m.macSublime : m.pcSublime
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        e.defineMode("coffeescript", function(e, t) {
            function n(e) {
                return new RegExp("^((" + e.join(")|(") + "))\\b")
            }
            function r(e, t) {
                if (e.sol()) {
                    null === t.scope.align && (t.scope.align = !1);
                    var n = t.scope.offset;
                    if (e.eatSpace()) {
                        var r = e.indentation();
                        return r > n && "coffee" == t.scope.type ? "indent" : r < n ? "dedent" : null
                    }
                    n > 0 && l(e, t)
                }
                if (e.eatSpace()) return null;
                var a = e.peek();
                if (e.match("####")) return e.skipToEnd(), "comment";
                if (e.match("###")) return t.tokenize = o, t.tokenize(e, t);
                if ("#" === a) return e.skipToEnd(), "comment";
                if (e.match(/^-?[0-9\.]/, !1)) {
                    var s = !1;
                    if (e.match(/^-?\d*\.\d+(e[\+\-]?\d+)?/i) && (s = !0), e.match(/^-?\d+\.\d*/) && (s = !0), e.match(/^-?\.\d+/) && (s = !0), s) return "." == e.peek() && e.backUp(1), "number";
                    var m = !1;
                    if (e.match(/^-?0x[0-9a-f]+/i) && (m = !0), e.match(/^-?[1-9]\d*(e[\+\-]?\d+)?/) && (m = !0), e.match(/^-?0(?![\dx])/i) && (m = !0), m) return "number"
                }
                if (e.match(y)) return t.tokenize = i(e.current(), !1, "string"), t.tokenize(e, t);
                if (e.match(b)) {
                    if ("/" != e.current() || e.match(/^.*\//, !1)) return t.tokenize = i(e.current(), !0, "string-2"), t.tokenize(e, t);
                    e.backUp(1)
                }
                return e.match(u) || e.match(p) ? "operator" : e.match(f) ? "punctuation" : e.match(x) ? "atom" : e.match(h) || t.prop && e.match(d) ? "property" : e.match(v) ? "keyword" : e.match(d) ? "variable" : (e.next(), c)
            }
            function i(e, n, i) {
                return function(o, a) {
                    for (; !o.eol();)
                        if (o.eatWhile(/[^'"\/\\]/), o.eat("\\")) {
                            if (o.next(), n && o.eol()) return i
                        } else {
                            if (o.match(e)) return a.tokenize = r, i;
                            o.eat(/['"\/]/)
                        }
                    return n && (t.singleLineStringErrors ? i = c : a.tokenize = r), i
                }
            }
            function o(e, t) {
                for (; !e.eol();) {
                    if (e.eatWhile(/[^#]/), e.match("###")) {
                        t.tokenize = r;
                        break
                    }
                    e.eatWhile("#")
                }
                return "comment"
            }
            function a(t, n, r) {
                r = r || "coffee";
                for (var i = 0, o = !1, a = null, l = n.scope; l; l = l.prev)
                    if ("coffee" === l.type || "}" == l.type) {
                        i = l.offset + e.indentUnit;
                        break
                    }
                    "coffee" !== r ? (o = null, a = t.column() + t.current().length) : n.scope.align && (n.scope.align = !1), n.scope = {
                    offset: i,
                    type: r,
                    prev: n.scope,
                    align: o,
                    alignOffset: a
                }
            }
            function l(e, t) {
                if (t.scope.prev) {
                    if ("coffee" === t.scope.type) {
                        for (var n = e.indentation(), r = !1, i = t.scope; i; i = i.prev)
                            if (n === i.offset) {
                                r = !0;
                                break
                            }
                        if (!r) return !0;
                        for (; t.scope.prev && t.scope.offset !== n;) t.scope = t.scope.prev;
                        return !1
                    }
                    return t.scope = t.scope.prev, !1
                }
            }
            function s(e, t) {
                var n = t.tokenize(e, t),
                    r = e.current();
                "return" === r && (t.dedent = !0), (("->" === r || "=>" === r) && e.eol() || "indent" === n) && a(e, t);
                var i = "[({".indexOf(r);
                if (-1 !== i && a(e, t, "])}".slice(i, i + 1)), m.exec(r) && a(e, t), "then" == r && l(e, t), "dedent" === n && l(e, t)) return c;
                if (-1 !== (i = "])}".indexOf(r))) {
                    for (;
                        "coffee" == t.scope.type && t.scope.prev;) t.scope = t.scope.prev;
                    t.scope.type == r && (t.scope = t.scope.prev)
                }
                return t.dedent && e.eol() && ("coffee" == t.scope.type && t.scope.prev && (t.scope = t.scope.prev), t.dedent = !1), n
            }
            var c = "error",
                u = /^(?:->|=>|\+[+=]?|-[\-=]?|\*[\*=]?|\/[\/=]?|[=!]=|<[><]?=?|>>?=?|%=?|&=?|\|=?|\^=?|\~|!|\?|(or|and|\|\||&&|\?)=)/,
                f = /^(?:[()\[\]{},:`=;]|\.\.?\.?)/,
                d = /^[_A-Za-z$][_A-Za-z$0-9]*/,
                h = /^@[_A-Za-z$][_A-Za-z$0-9]*/,
                p = n(["and", "or", "not", "is", "isnt", "in", "instanceof", "typeof"]),
                m = ["for", "while", "loop", "if", "unless", "else", "switch", "try", "catch", "finally", "class"],
                g = ["break", "by", "continue", "debugger", "delete", "do", "in", "of", "new", "return", "then", "this", "@", "throw", "when", "until", "extends"],
                v = n(m.concat(g));
            m = n(m);
            var y = /^('{3}|\"{3}|['\"])/,
                b = /^(\/{3}|\/)/,
                x = n(["Infinity", "NaN", "undefined", "null", "true", "false", "on", "off", "yes", "no"]);
            return {
                startState: function(e) {
                    return {
                        tokenize: r,
                        scope: {
                            offset: e || 0,
                            type: "coffee",
                            prev: null,
                            align: !1
                        },
                        prop: !1,
                        dedent: 0
                    }
                },
                token: function(e, t) {
                    var n = null === t.scope.align && t.scope;
                    n && e.sol() && (n.align = !1);
                    var r = s(e, t);
                    return r && "comment" != r && (n && (n.align = !0), t.prop = "punctuation" == r && "." == e.current()), r
                },
                indent: function(e, t) {
                    if (e.tokenize != r) return 0;
                    var n = e.scope,
                        i = t && "])}".indexOf(t.charAt(0)) > -1;
                    if (i)
                        for (;
                            "coffee" == n.type && n.prev;) n = n.prev;
                    var o = i && n.type === t.charAt(0);
                    return n.align ? n.alignOffset - (o ? 1 : 0) : (o ? n.prev : n).offset
                },
                lineComment: "#",
                fold: "indent"
            }
        }), e.defineMIME("application/vnd.coffeescript", "coffeescript"), e.defineMIME("text/x-coffeescript", "coffeescript"), e.defineMIME("text/coffeescript", "coffeescript")
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        function t(e) {
            for (var t = {}, n = 0; n < e.length; ++n) t[e[n].toLowerCase()] = !0;
            return t
        }
        function n(e, t) {
            for (var n, r = !1; null != (n = e.next());) {
                if (r && "/" == n) {
                    t.tokenize = null;
                    break
                }
                r = "*" == n
            }
            return ["comment", "comment"]
        }
        e.defineMode("css", function(t, n) {
            function r(e, t) {
                return p = t, e
            }
            function i(e, t) {
                var n = e.next();
                if (v[n]) {
                    var i = v[n](e, t);
                    if (!1 !== i) return i
                }
                return "@" == n ? (e.eatWhile(/[\w\\\-]/), r("def", e.current())) : "=" == n || ("~" == n || "|" == n) && e.eat("=") ? r(null, "compare") : '"' == n || "'" == n ? (t.tokenize = o(n), t.tokenize(e, t)) : "#" == n ? (e.eatWhile(/[\w\\\-]/), r("atom", "hash")) : "!" == n ? (e.match(/^\s*\w*/), r("keyword", "important")) : /\d/.test(n) || "." == n && e.eat(/\d/) ? (e.eatWhile(/[\w.%]/), r("number", "unit")) : "-" !== n ? /[,+>*\/]/.test(n) ? r(null, "select-op") : "." == n && e.match(/^-?[_a-z][_a-z0-9-]*/i) ? r("qualifier", "qualifier") : /[:;{}\[\]\(\)]/.test(n) ? r(null, n) : ("u" == n || "U" == n) && e.match(/rl(-prefix)?\(/i) || ("d" == n || "D" == n) && e.match("omain(", !0, !0) || ("r" == n || "R" == n) && e.match("egexp(", !0, !0) ? (e.backUp(1), t.tokenize = a, r("property", "word")) : /[\w\\\-]/.test(n) ? (e.eatWhile(/[\w\\\-]/), r("property", "word")) : r(null, null) : /[\d.]/.test(e.peek()) ? (e.eatWhile(/[\w.%]/), r("number", "unit")) : e.match(/^-[\w\\\-]+/) ? (e.eatWhile(/[\w\\\-]/), e.match(/^\s*:/, !1) ? r("variable-2", "variable-definition") : r("variable-2", "variable")) : e.match(/^\w+-/) ? r("meta", "meta") : void 0
            }
            function o(e) {
                return function(t, n) {
                    for (var i, o = !1; null != (i = t.next());) {
                        if (i == e && !o) {
                            ")" == e && t.backUp(1);
                            break
                        }
                        o = !o && "\\" == i
                    }
                    return (i == e || !o && ")" != e) && (n.tokenize = null), r("string", "string")
                }
            }
            function a(e, t) {
                return e.next(), e.match(/\s*[\"\')]/, !1) ? t.tokenize = null : t.tokenize = o(")"), r(null, "(")
            }
            function l(e, t, n) {
                this.type = e, this.indent = t, this.prev = n
            }
            function s(e, t, n, r) {
                return e.context = new l(n, t.indentation() + (!1 === r ? 0 : g), e.context), n
            }
            function c(e) {
                return e.context.prev && (e.context = e.context.prev), e.context.type
            }
            function u(e, t, n) {
                return N[n.context.type](e, t, n)
            }
            function f(e, t, n, r) {
                for (var i = r || 1; i > 0; i--) n.context = n.context.prev;
                return u(e, t, n)
            }
            function d(e) {
                var t = e.current().toLowerCase();
                m = M.hasOwnProperty(t) ? "atom" : T.hasOwnProperty(t) ? "keyword" : "variable"
            }
            var h = n.inline;
            n.propertyKeywords || (n = e.resolveMode("text/css"));
            var p, m, g = t.indentUnit,
                v = n.tokenHooks,
                y = n.documentTypes || {},
                b = n.mediaTypes || {},
                x = n.mediaFeatures || {},
                k = n.mediaValueKeywords || {},
                w = n.propertyKeywords || {},
                C = n.nonStandardPropertyKeywords || {},
                S = n.fontProperties || {},
                L = n.counterDescriptors || {},
                T = n.colorKeywords || {},
                M = n.valueKeywords || {},
                z = n.allowNested,
                A = n.lineComment,
                O = !0 === n.supportsAtComponent,
                N = {
                    top: function(e, t, n) {
                        if ("{" == e) return s(n, t, "block");
                        if ("}" == e && n.context.prev) return c(n);
                        if (O && /@component/i.test(e)) return s(n, t, "atComponentBlock");
                        if (/^@(-moz-)?document$/i.test(e)) return s(n, t, "documentTypes");
                        if (/^@(media|supports|(-moz-)?document|import)$/i.test(e)) return s(n, t, "atBlock");
                        if (/^@(font-face|counter-style)/i.test(e)) return n.stateArg = e, "restricted_atBlock_before";
                        if (/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(e)) return "keyframes";
                        if (e && "@" == e.charAt(0)) return s(n, t, "at");
                        if ("hash" == e) m = "builtin";
                        else if ("word" == e) m = "tag";
                        else {
                            if ("variable-definition" == e) return "maybeprop";
                            if ("interpolation" == e) return s(n, t, "interpolation");
                            if (":" == e) return "pseudo";
                            if (z && "(" == e) return s(n, t, "parens")
                        }
                        return n.context.type
                    },
                    block: function(e, t, n) {
                        if ("word" == e) {
                            var r = t.current().toLowerCase();
                            return w.hasOwnProperty(r) ? (m = "property", "maybeprop") : C.hasOwnProperty(r) ? (m = "string-2", "maybeprop") : z ? (m = t.match(/^\s*:(?:\s|$)/, !1) ? "property" : "tag", "block") : (m += " error", "maybeprop")
                        }
                        return "meta" == e ? "block" : z || "hash" != e && "qualifier" != e ? N.top(e, t, n) : (m = "error", "block")
                    },
                    maybeprop: function(e, t, n) {
                        return ":" == e ? s(n, t, "prop") : u(e, t, n)
                    },
                    prop: function(e, t, n) {
                        if (";" == e) return c(n);
                        if ("{" == e && z) return s(n, t, "propBlock");
                        if ("}" == e || "{" == e) return f(e, t, n);
                        if ("(" == e) return s(n, t, "parens");
                        if ("hash" != e || /^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(t.current())) {
                            if ("word" == e) d(t);
                            else if ("interpolation" == e) return s(n, t, "interpolation")
                        } else m += " error";
                        return "prop"
                    },
                    propBlock: function(e, t, n) {
                        return "}" == e ? c(n) : "word" == e ? (m = "property", "maybeprop") : n.context.type
                    },
                    parens: function(e, t, n) {
                        return "{" == e || "}" == e ? f(e, t, n) : ")" == e ? c(n) : "(" == e ? s(n, t, "parens") : "interpolation" == e ? s(n, t, "interpolation") : ("word" == e && d(t), "parens")
                    },
                    pseudo: function(e, t, n) {
                        return "meta" == e ? "pseudo" : "word" == e ? (m = "variable-3", n.context.type) : u(e, t, n)
                    },
                    documentTypes: function(e, t, n) {
                        return "word" == e && y.hasOwnProperty(t.current()) ? (m = "tag", n.context.type) : N.atBlock(e, t, n)
                    },
                    atBlock: function(e, t, n) {
                        if ("(" == e) return s(n, t, "atBlock_parens");
                        if ("}" == e || ";" == e) return f(e, t, n);
                        if ("{" == e) return c(n) && s(n, t, z ? "block" : "top");
                        if ("interpolation" == e) return s(n, t, "interpolation");
                        if ("word" == e) {
                            var r = t.current().toLowerCase();
                            m = "only" == r || "not" == r || "and" == r || "or" == r ? "keyword" : b.hasOwnProperty(r) ? "attribute" : x.hasOwnProperty(r) ? "property" : k.hasOwnProperty(r) ? "keyword" : w.hasOwnProperty(r) ? "property" : C.hasOwnProperty(r) ? "string-2" : M.hasOwnProperty(r) ? "atom" : T.hasOwnProperty(r) ? "keyword" : "error"
                        }
                        return n.context.type
                    },
                    atComponentBlock: function(e, t, n) {
                        return "}" == e ? f(e, t, n) : "{" == e ? c(n) && s(n, t, z ? "block" : "top", !1) : ("word" == e && (m = "error"), n.context.type)
                    },
                    atBlock_parens: function(e, t, n) {
                        return ")" == e ? c(n) : "{" == e || "}" == e ? f(e, t, n, 2) : N.atBlock(e, t, n)
                    },
                    restricted_atBlock_before: function(e, t, n) {
                        return "{" == e ? s(n, t, "restricted_atBlock") : "word" == e && "@counter-style" == n.stateArg ? (m = "variable", "restricted_atBlock_before") : u(e, t, n)
                    },
                    restricted_atBlock: function(e, t, n) {
                        return "}" == e ? (n.stateArg = null, c(n)) : "word" == e ? (m = "@font-face" == n.stateArg && !S.hasOwnProperty(t.current().toLowerCase()) || "@counter-style" == n.stateArg && !L.hasOwnProperty(t.current().toLowerCase()) ? "error" : "property", "maybeprop") : "restricted_atBlock"
                    },
                    keyframes: function(e, t, n) {
                        return "word" == e ? (m = "variable", "keyframes") : "{" == e ? s(n, t, "top") : u(e, t, n)
                    },
                    at: function(e, t, n) {
                        return ";" == e ? c(n) : "{" == e || "}" == e ? f(e, t, n) : ("word" == e ? m = "tag" : "hash" == e && (m = "builtin"), "at")
                    },
                    interpolation: function(e, t, n) {
                        return "}" == e ? c(n) : "{" == e || ";" == e ? f(e, t, n) : ("word" == e ? m = "variable" : "variable" != e && "(" != e && ")" != e && (m = "error"), "interpolation")
                    }
                };
            return {
                startState: function(e) {
                    return {
                        tokenize: null,
                        state: h ? "block" : "top",
                        stateArg: null,
                        context: new l(h ? "block" : "top", e || 0, null)
                    }
                },
                token: function(e, t) {
                    if (!t.tokenize && e.eatSpace()) return null;
                    var n = (t.tokenize || i)(e, t);
                    return n && "object" == typeof n && (p = n[1], n = n[0]), m = n, "comment" != p && (t.state = N[t.state](p, e, t)), m
                },
                indent: function(e, t) {
                    var n = e.context,
                        r = t && t.charAt(0),
                        i = n.indent;
                    return "prop" != n.type || "}" != r && ")" != r || (n = n.prev), n.prev && ("}" != r || "block" != n.type && "top" != n.type && "interpolation" != n.type && "restricted_atBlock" != n.type ? (")" != r || "parens" != n.type && "atBlock_parens" != n.type) && ("{" != r || "at" != n.type && "atBlock" != n.type) || (i = Math.max(0, n.indent - g)) : i = (n = n.prev).indent), i
                },
                electricChars: "}",
                blockCommentStart: "/*",
                blockCommentEnd: "*/",
                blockCommentContinue: " * ",
                lineComment: A,
                fold: "brace"
            }
        });
        var r = ["domain", "regexp", "url", "url-prefix"],
            i = t(r),
            o = ["all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed"],
            a = t(o),
            l = ["width", "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width", "device-height", "min-device-height", "max-device-height", "aspect-ratio", "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome", "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid", "orientation", "device-pixel-ratio", "min-device-pixel-ratio", "max-device-pixel-ratio", "pointer", "any-pointer", "hover", "any-hover"],
            s = t(l),
            c = ["landscape", "portrait", "none", "coarse", "fine", "on-demand", "hover", "interlace", "progressive"],
            u = t(c),
            f = ["align-content", "align-items", "align-self", "alignment-adjust", "alignment-baseline", "anchor-point", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "appearance", "azimuth", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "baseline-shift", "binding", "bleed", "bookmark-label", "bookmark-level", "bookmark-state", "bookmark-target", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "color", "color-profile", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "crop", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "dominant-baseline", "drop-initial-after-adjust", "drop-initial-after-align", "drop-initial-before-adjust", "drop-initial-before-align", "drop-initial-size", "drop-initial-value", "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "float-offset", "flow-from", "flow-into", "font", "font-feature-settings", "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-weight", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-gap", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-gap", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "inline-box-align", "justify-content", "justify-items", "justify-self", "left", "letter-spacing", "line-break", "line-height", "line-stacking", "line-stacking-ruby", "line-stacking-shift", "line-stacking-strategy", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marks", "marquee-direction", "marquee-loop", "marquee-play-count", "marquee-speed", "marquee-style", "max-height", "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "page-policy", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "place-content", "place-items", "place-self", "play-during", "position", "presentation-level", "punctuation-trim", "quotes", "region-break-after", "region-break-before", "region-break-inside", "region-fragment", "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness", "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "shape-image-threshold", "shape-inside", "shape-margin", "shape-outside", "size", "speak", "speak-as", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set", "tab-size", "table-layout", "target", "target-name", "target-new", "target-position", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-height", "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow", "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position", "text-wrap", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "user-select", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "volume", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "z-index", "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events", "color-interpolation", "color-interpolation-filters", "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering", "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering", "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal", "glyph-orientation-vertical", "text-anchor", "writing-mode"],
            d = t(f),
            h = ["scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-3d-light-color", "scrollbar-track-color", "shape-inside", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "zoom"],
            p = t(h),
            m = t(["font-family", "src", "unicode-range", "font-variant", "font-feature-settings", "font-stretch", "font-weight", "font-style"]),
            g = t(["additive-symbols", "fallback", "negative", "pad", "prefix", "range", "speak-as", "suffix", "symbols", "system"]),
            v = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"],
            y = t(v),
            b = ["above", "absolute", "activeborder", "additive", "activecaption", "afar", "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate", "always", "amharic", "amharic-abegede", "antialiased", "appworkspace", "arabic-indic", "armenian", "asterisks", "attr", "auto", "auto-flow", "avoid", "avoid-column", "avoid-page", "avoid-region", "background", "backwards", "baseline", "below", "bidi-override", "binary", "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "cambodian", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-decimal", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote", "col-resize", "collapse", "color", "color-burn", "color-dodge", "column", "column-reverse", "compact", "condensed", "contain", "content", "contents", "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "cyclic", "darken", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "dense", "destination-atop", "destination-in", "destination-out", "destination-over", "devanagari", "difference", "disc", "discard", "disclosure-closed", "disclosure-open", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede", "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er", "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er", "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", "ethiopic-halehame-gez", "ethiopic-halehame-om-et", "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et", "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig", "ethiopic-numeric", "ew-resize", "exclusion", "expanded", "extends", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "flex", "flex-end", "flex-start", "footnotes", "forwards", "from", "geometricPrecision", "georgian", "graytext", "grid", "groove", "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hard-light", "hebrew", "help", "hidden", "hide", "higher", "highlight", "highlighttext", "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "hue", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-flex", "inline-grid", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "japanese-formal", "japanese-informal", "justify", "kannada", "katakana", "katakana-iroha", "keep-all", "khmer", "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal", "landscape", "lao", "large", "larger", "left", "level", "lighter", "lighten", "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian", "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lower-roman", "lowercase", "ltr", "luminosity", "malayalam", "match", "matrix", "matrix3d", "media-controls-background", "media-current-time-display", "media-fullscreen-button", "media-mute-button", "media-play-button", "media-return-to-realtime-button", "media-rewind-button", "media-seek-back-button", "media-seek-forward-button", "media-slider", "media-sliderthumb", "media-time-remaining-display", "media-volume-slider", "media-volume-slider-container", "media-volume-sliderthumb", "medium", "menu", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic", "mix", "mongolian", "monospace", "move", "multiple", "multiply", "myanmar", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "octal", "opacity", "open-quote", "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset", "outside", "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused", "persian", "perspective", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radial-gradient", "radio", "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "round", "row", "row-resize", "row-reverse", "rtl", "run-in", "running", "s-resize", "sans-serif", "saturation", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "screen", "scroll", "scrollbar", "scroll-position", "se-resize", "searchfield", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "self-start", "self-end", "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama", "simp-chinese-formal", "simp-chinese-informal", "single", "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "soft-light", "solid", "somali", "source-atop", "source-in", "source-out", "source-over", "space", "space-around", "space-between", "space-evenly", "spell-out", "square", "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub", "subpixel-antialiased", "super", "sw-resize", "symbolic", "symbols", "system-ui", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "tamil", "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er", "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top", "trad-chinese-formal", "trad-chinese-informal", "transform", "translate", "translate3d", "translateX", "translateY", "translateZ", "transparent", "ultra-condensed", "ultra-expanded", "underline", "unset", "up", "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal", "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url", "var", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "words", "wrap", "wrap-reverse", "x-large", "x-small", "xor", "xx-large", "xx-small"],
            x = t(b),
            k = r.concat(o).concat(l).concat(c).concat(f).concat(h).concat(v).concat(b);
        e.registerHelper("hintWords", "css", k), e.defineMIME("text/css", {
            documentTypes: i,
            mediaTypes: a,
            mediaFeatures: s,
            mediaValueKeywords: u,
            propertyKeywords: d,
            nonStandardPropertyKeywords: p,
            fontProperties: m,
            counterDescriptors: g,
            colorKeywords: y,
            valueKeywords: x,
            tokenHooks: {
                "/": function(e, t) {
                    return !!e.eat("*") && (t.tokenize = n, n(e, t))
                }
            },
            name: "css"
        }), e.defineMIME("text/x-scss", {
            mediaTypes: a,
            mediaFeatures: s,
            mediaValueKeywords: u,
            propertyKeywords: d,
            nonStandardPropertyKeywords: p,
            colorKeywords: y,
            valueKeywords: x,
            fontProperties: m,
            allowNested: !0,
            lineComment: "//",
            tokenHooks: {
                "/": function(e, t) {
                    return e.eat("/") ? (e.skipToEnd(), ["comment", "comment"]) : e.eat("*") ? (t.tokenize = n, n(e, t)) : ["operator", "operator"]
                },
                ":": function(e) {
                    return !!e.match(/\s*\{/, !1) && [null, null]
                },
                $: function(e) {
                    return e.match(/^[\w-]+/), e.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"]
                },
                "#": function(e) {
                    return !!e.eat("{") && [null, "interpolation"]
                }
            },
            name: "css",
            helperType: "scss"
        }), e.defineMIME("text/x-less", {
            mediaTypes: a,
            mediaFeatures: s,
            mediaValueKeywords: u,
            propertyKeywords: d,
            nonStandardPropertyKeywords: p,
            colorKeywords: y,
            valueKeywords: x,
            fontProperties: m,
            allowNested: !0,
            lineComment: "//",
            tokenHooks: {
                "/": function(e, t) {
                    return e.eat("/") ? (e.skipToEnd(), ["comment", "comment"]) : e.eat("*") ? (t.tokenize = n, n(e, t)) : ["operator", "operator"]
                },
                "@": function(e) {
                    return e.eat("{") ? [null, "interpolation"] : !e.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i, !1) && (e.eatWhile(/[\w\\\-]/), e.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"])
                },
                "&": function() {
                    return ["atom", "atom"]
                }
            },
            name: "css",
            helperType: "less"
        }), e.defineMIME("text/x-gss", {
            documentTypes: i,
            mediaTypes: a,
            mediaFeatures: s,
            propertyKeywords: d,
            nonStandardPropertyKeywords: p,
            fontProperties: m,
            counterDescriptors: g,
            colorKeywords: y,
            valueKeywords: x,
            supportsAtComponent: !0,
            tokenHooks: {
                "/": function(e, t) {
                    return !!e.eat("*") && (t.tokenize = n, n(e, t))
                }
            },
            name: "css",
            helperType: "gss"
        })
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../htmlmixed/htmlmixed"), require("../ruby/ruby")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../htmlmixed/htmlmixed", "../ruby/ruby"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        e.defineMode("haml", function(t) {
            function n(e) {
                return function(t, n) {
                    return t.peek() == e && 1 == n.rubyState.tokenize.length ? (t.next(), n.tokenize = i, "closeAttributeTag") : r(t, n)
                }
            }
            function r(e, t) {
                return e.match("-#") ? (e.skipToEnd(), "comment") : a.token(e, t.rubyState)
            }
            function i(e, t) {
                var i = e.peek();
                if ("comment" == t.previousToken.style && t.indented > t.previousToken.indented) return e.skipToEnd(), "commentLine";
                if (t.startOfLine) {
                    if ("!" == i && e.match("!!")) return e.skipToEnd(), "tag";
                    if (e.match(/^%[\w:#\.]+=/)) return t.tokenize = r, "hamlTag";
                    if (e.match(/^%[\w:]+/)) return "hamlTag";
                    if ("/" == i) return e.skipToEnd(), "comment"
                }
                if ((t.startOfLine || "hamlTag" == t.previousToken.style) && ("#" == i || "." == i)) return e.match(/[\w-#\.]*/), "hamlAttribute";
                if (t.startOfLine && !e.match("-->", !1) && ("=" == i || "-" == i)) return t.tokenize = r, t.tokenize(e, t);
                if ("hamlTag" == t.previousToken.style || "closeAttributeTag" == t.previousToken.style || "hamlAttribute" == t.previousToken.style) {
                    if ("(" == i) return t.tokenize = n(")"), t.tokenize(e, t);
                    if ("{" == i && !e.match(/^\{%.*/)) return t.tokenize = n("}"), t.tokenize(e, t)
                }
                return o.token(e, t.htmlState)
            }
            var o = e.getMode(t, {
                    name: "htmlmixed"
                }),
                a = e.getMode(t, "ruby");
            return {
                startState: function() {
                    return {
                        htmlState: e.startState(o),
                        rubyState: e.startState(a),
                        indented: 0,
                        previousToken: {
                            style: null,
                            indented: 0
                        },
                        tokenize: i
                    }
                },
                copyState: function(t) {
                    return {
                        htmlState: e.copyState(o, t.htmlState),
                        rubyState: e.copyState(a, t.rubyState),
                        indented: t.indented,
                        previousToken: t.previousToken,
                        tokenize: t.tokenize
                    }
                },
                token: function(e, t) {
                    if (e.sol() && (t.indented = e.indentation(), t.startOfLine = !0), e.eatSpace()) return null;
                    var n = t.tokenize(e, t);
                    if (t.startOfLine = !1, n && "commentLine" != n && (t.previousToken = {
                            style: n,
                            indented: t.indented
                        }), e.eol() && t.tokenize == r) {
                        e.backUp(1);
                        var o = e.peek();
                        e.next(), o && "," != o && (t.tokenize = i)
                    }
                    return "hamlTag" == n ? n = "tag" : "commentLine" == n ? n = "comment" : "hamlAttribute" == n ? n = "attribute" : "closeAttributeTag" == n && (n = null), n
                }
            }
        }, "htmlmixed", "ruby"), e.defineMIME("text/x-haml", "haml")
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../xml/xml"), require("../javascript/javascript"), require("../css/css")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../xml/xml", "../javascript/javascript", "../css/css"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        function t(e, t, n) {
            var r = e.current(),
                i = r.search(t);
            return i > -1 ? e.backUp(r.length - i) : r.match(/<\/?$/) && (e.backUp(r.length), e.match(t, !1) || e.match(r)), n
        }
        function n(e) {
            var t = s[e];
            return t || (s[e] = new RegExp("\\s+" + e + "\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*"))
        }
        function r(e, t) {
            var r = e.match(n(t));
            return r ? /^\s*(.*?)\s*$/.exec(r[2])[1] : ""
        }
        function i(e, t) {
            return new RegExp((t ? "^" : "") + "</s*" + e + "s*>", "i")
        }
        function o(e, t) {
            for (var n in e)
                for (var r = t[n] || (t[n] = []), i = e[n], o = i.length - 1; o >= 0; o--) r.unshift(i[o])
        }
        function a(e, t) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                if (!i[0] || i[1].test(r(t, i[0]))) return i[2]
            }
        }
        var l = {
                script: [
                    ["lang", /(javascript|babel)/i, "javascript"],
                    ["type", /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i, "javascript"],
                    ["type", /./, "text/plain"],
                    [null, null, "javascript"]
                ],
                style: [
                    ["lang", /^css$/i, "css"],
                    ["type", /^(text\/)?(x-)?(stylesheet|css)$/i, "css"],
                    ["type", /./, "text/plain"],
                    [null, null, "css"]
                ]
            },
            s = {};
        e.defineMode("htmlmixed", function(n, r) {
            function s(r, o) {
                var l, f = c.token(r, o.htmlState),
                    d = /\btag\b/.test(f);
                if (d && !/[<>\s\/]/.test(r.current()) && (l = o.htmlState.tagName && o.htmlState.tagName.toLowerCase()) && u.hasOwnProperty(l)) o.inTag = l + " ";
                else if (o.inTag && d && />$/.test(r.current())) {
                    var h = /^([\S]+) (.*)/.exec(o.inTag);
                    o.inTag = null;
                    var p = ">" == r.current() && a(u[h[1]], h[2]),
                        m = e.getMode(n, p),
                        g = i(h[1], !0),
                        v = i(h[1], !1);
                    o.token = function(e, n) {
                        return e.match(g, !1) ? (n.token = s, n.localState = n.localMode = null, null) : t(e, v, n.localMode.token(e, n.localState))
                    }, o.localMode = m, o.localState = e.startState(m, c.indent(o.htmlState, ""))
                } else o.inTag && (o.inTag += r.current(), r.eol() && (o.inTag += " "));
                return f
            }
            var c = e.getMode(n, {
                    name: "xml",
                    htmlMode: !0,
                    multilineTagIndentFactor: r.multilineTagIndentFactor,
                    multilineTagIndentPastTag: r.multilineTagIndentPastTag
                }),
                u = {},
                f = r && r.tags,
                d = r && r.scriptTypes;
            if (o(l, u), f && o(f, u), d)
                for (var h = d.length - 1; h >= 0; h--) u.script.unshift(["type", d[h].matches, d[h].mode]);
            return {
                startState: function() {
                    return {
                        token: s,
                        inTag: null,
                        localMode: null,
                        localState: null,
                        htmlState: e.startState(c)
                    }
                },
                copyState: function(t) {
                    var n;
                    return t.localState && (n = e.copyState(t.localMode, t.localState)), {
                        token: t.token,
                        inTag: t.inTag,
                        localMode: t.localMode,
                        localState: n,
                        htmlState: e.copyState(c, t.htmlState)
                    }
                },
                token: function(e, t) {
                    return t.token(e, t)
                },
                indent: function(t, n, r) {
                    return !t.localMode || /^\s*<\//.test(n) ? c.indent(t.htmlState, n) : t.localMode.indent ? t.localMode.indent(t.localState, n, r) : e.Pass
                },
                innerMode: function(e) {
                    return {
                        state: e.localState || e.htmlState,
                        mode: e.localMode || c
                    }
                }
            }
        }, "xml", "javascript", "css"), e.defineMIME("text/html", "htmlmixed")
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../javascript/javascript"), require("../css/css"), require("../htmlmixed/htmlmixed")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../javascript/javascript", "../css/css", "../htmlmixed/htmlmixed"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        e.defineMode("pug", function(t) {
            function n() {
                this.javaScriptLine = !1, this.javaScriptLineExcludesColon = !1, this.javaScriptArguments = !1, this.javaScriptArgumentsDepth = 0, this.isInterpolating = !1, this.interpolationNesting = 0, this.jsState = e.startState(Z), this.restOfLine = "", this.isIncludeFiltered = !1, this.isEach = !1, this.lastTag = "", this.scriptType = "", this.isAttrs = !1, this.attrsNest = [], this.inAttributeName = !0, this.attributeIsType = !1, this.attrValue = "", this.indentOf = Infinity, this.indentToken = "", this.innerMode = null, this.innerState = null, this.innerModeForLine = !1
            }
            function r(e, t) {
                if (e.sol() && (t.javaScriptLine = !1, t.javaScriptLineExcludesColon = !1), t.javaScriptLine) {
                    if (t.javaScriptLineExcludesColon && ":" === e.peek()) return t.javaScriptLine = !1, void(t.javaScriptLineExcludesColon = !1);
                    var n = Z.token(e, t.jsState);
                    return e.eol() && (t.javaScriptLine = !1), n || !0
                }
            }
            function i(e, t) {
                if (t.javaScriptArguments) return 0 === t.javaScriptArgumentsDepth && "(" !== e.peek() ? void(t.javaScriptArguments = !1) : ("(" === e.peek() ? t.javaScriptArgumentsDepth++ : ")" === e.peek() && t.javaScriptArgumentsDepth--, 0 === t.javaScriptArgumentsDepth ? void(t.javaScriptArguments = !1) : Z.token(e, t.jsState) || !0)
            }
            function o(e) {
                if (e.match(/^yield\b/)) return "keyword"
            }
            function a(e) {
                if (e.match(/^(?:doctype) *([^\n]+)?/)) return V
            }
            function l(e, t) {
                if (e.match("#{")) return t.isInterpolating = !0, t.interpolationNesting = 0, "punctuation"
            }
            function s(e, t) {
                if (t.isInterpolating) {
                    if ("}" === e.peek()) {
                        if (t.interpolationNesting--, t.interpolationNesting < 0) return e.next(), t.isInterpolating = !1, "punctuation"
                    } else "{" === e.peek() && t.interpolationNesting++;
                    return Z.token(e, t.jsState) || !0
                }
            }
            function c(e, t) {
                if (e.match(/^case\b/)) return t.javaScriptLine = !0, K
            }
            function u(e, t) {
                if (e.match(/^when\b/)) return t.javaScriptLine = !0, t.javaScriptLineExcludesColon = !0, K
            }
            function f(e) {
                if (e.match(/^default\b/)) return K
            }
            function d(e, t) {
                if (e.match(/^extends?\b/)) return t.restOfLine = "string", K
            }
            function h(e, t) {
                if (e.match(/^append\b/)) return t.restOfLine = "variable", K
            }
            function p(e, t) {
                if (e.match(/^prepend\b/)) return t.restOfLine = "variable", K
            }
            function m(e, t) {
                if (e.match(/^block\b *(?:(prepend|append)\b)?/)) return t.restOfLine = "variable", K
            }
            function g(e, t) {
                if (e.match(/^include\b/)) return t.restOfLine = "string", K
            }
            function v(e, t) {
                if (e.match(/^include:([a-zA-Z0-9\-]+)/, !1) && e.match("include")) return t.isIncludeFiltered = !0, K
            }
            function y(e, t) {
                if (t.isIncludeFiltered) {
                    var n = M(e, t);
                    return t.isIncludeFiltered = !1, t.restOfLine = "string", n
                }
            }
            function b(e, t) {
                if (e.match(/^mixin\b/)) return t.javaScriptLine = !0, K
            }
            function x(e, t) {
                return e.match(/^\+([-\w]+)/) ? (e.match(/^\( *[-\w]+ *=/, !1) || (t.javaScriptArguments = !0, t.javaScriptArgumentsDepth = 0), "variable") : e.match(/^\+#{/, !1) ? (e.next(), t.mixinCallAfter = !0, l(e, t)) : void 0
            }
            function k(e, t) {
                if (t.mixinCallAfter) return t.mixinCallAfter = !1, e.match(/^\( *[-\w]+ *=/, !1) || (t.javaScriptArguments = !0, t.javaScriptArgumentsDepth = 0), !0
            }
            function w(e, t) {
                if (e.match(/^(if|unless|else if|else)\b/)) return t.javaScriptLine = !0, K
            }
            function C(e, t) {
                if (e.match(/^(- *)?(each|for)\b/)) return t.isEach = !0, K
            }
            function S(e, t) {
                if (t.isEach) {
                    if (e.match(/^ in\b/)) return t.javaScriptLine = !0, t.isEach = !1, K;
                    if (e.sol() || e.eol()) t.isEach = !1;
                    else if (e.next()) {
                        for (; !e.match(/^ in\b/, !1) && e.next(););
                        return "variable"
                    }
                }
            }
            function L(e, t) {
                if (e.match(/^while\b/)) return t.javaScriptLine = !0, K
            }
            function T(e, t) {
                var n;
                if (n = e.match(/^(\w(?:[-:\w]*\w)?)\/?/)) return t.lastTag = n[1].toLowerCase(), "script" === t.lastTag && (t.scriptType = "application/javascript"), "tag"
            }
            function M(n, r) {
                var i;
                if (n.match(/^:([\w\-]+)/)) return t && t.innerModes && (i = t.innerModes(n.current().substring(1))), i || (i = n.current().substring(1)), "string" == typeof i && (i = e.getMode(t, i)), R(n, r, i), "atom"
            }
            function z(e, t) {
                if (e.match(/^(!?=|-)/)) return t.javaScriptLine = !0, "punctuation"
            }
            function A(e) {
                if (e.match(/^#([\w-]+)/)) return G
            }
            function O(e) {
                if (e.match(/^\.([\w-]+)/)) return X
            }
            function N(e, t) {
                if ("(" == e.peek()) return e.next(), t.isAttrs = !0, t.attrsNest = [], t.inAttributeName = !0, t.attrValue = "", t.attributeIsType = !1, "punctuation"
            }
            function P(t, n) {
                if (n.isAttrs) {
                    if (Y[t.peek()] && n.attrsNest.push(Y[t.peek()]), n.attrsNest[n.attrsNest.length - 1] === t.peek()) n.attrsNest.pop();
                    else if (t.eat(")")) return n.isAttrs = !1, "punctuation";
                    if (n.inAttributeName && t.match(/^[^=,\)!]+/)) return "=" !== t.peek() && "!" !== t.peek() || (n.inAttributeName = !1, n.jsState = e.startState(Z), "script" === n.lastTag && "type" === t.current().trim().toLowerCase() ? n.attributeIsType = !0 : n.attributeIsType = !1), "attribute";
                    var r = Z.token(t, n.jsState);
                    if (n.attributeIsType && "string" === r && (n.scriptType = t.current().toString()), 0 === n.attrsNest.length && ("string" === r || "variable" === r || "keyword" === r)) try {
                        return Function("", "var x " + n.attrValue.replace(/,\s*$/, "").replace(/^!/, "")), n.inAttributeName = !0, n.attrValue = "", t.backUp(t.current().length), P(t, n)
                    } catch (i) {}
                    return n.attrValue += t.current(), r || !0
                }
            }
            function E(e, t) {
                if (e.match(/^&attributes\b/)) return t.javaScriptArguments = !0, t.javaScriptArgumentsDepth = 0, "keyword"
            }
            function F(e) {
                if (e.sol() && e.eatSpace()) return "indent"
            }
            function j(e, t) {
                if (e.match(/^ *\/\/(-)?([^\n]*)/)) return t.indentOf = e.indentation(), t.indentToken = "comment", "comment"
            }
            function I(e) {
                if (e.match(/^: */)) return "colon"
            }
            function D(e, t) {
                return e.match(/^(?:\| ?| )([^\n]+)/) ? "string" : e.match(/^(<[^\n]*)/, !1) ? (R(e, t, "htmlmixed"), t.innerModeForLine = !0, H(e, t, !0)) : void 0
            }
            function _(e, t) {
                if (e.eat(".")) {
                    var n = null;
                    return "script" === t.lastTag && -1 != t.scriptType.toLowerCase().indexOf("javascript") ? n = t.scriptType.toLowerCase().replace(/"|'/g, "") : "style" === t.lastTag && (n = "css"), R(e, t, n), "dot"
                }
            }
            function W(e) {
                return e.next(), null
            }
            function R(n, r, i) {
                i = e.mimeModes[i] || i, i = t.innerModes && t.innerModes(i) || i, i = e.mimeModes[i] || i, i = e.getMode(t, i), r.indentOf = n.indentation(), i && "null" !== i.name ? r.innerMode = i : r.indentToken = "string"
            }
            function H(t, n, r) {
                if (t.indentation() > n.indentOf || n.innerModeForLine && !t.sol() || r) return n.innerMode ? (n.innerState || (n.innerState = n.innerMode.startState ? e.startState(n.innerMode, t.indentation()) : {}), t.hideFirstChars(n.indentOf + 2, function() {
                    return n.innerMode.token(t, n.innerState) || !0
                })) : (t.skipToEnd(), n.indentToken);
                t.sol() && (n.indentOf = Infinity, n.indentToken = null, n.innerMode = null, n.innerState = null)
            }
            function B(e, t) {
                if (e.sol() && (t.restOfLine = ""), t.restOfLine) {
                    e.skipToEnd();
                    var n = t.restOfLine;
                    return t.restOfLine = "", n
                }
            }
            function q() {
                return new n
            }
            function U(e) {
                return e.copy()
            }
            function $(e, t) {
                var n = H(e, t) || B(e, t) || s(e, t) || y(e, t) || S(e, t) || P(e, t) || r(e, t) || i(e, t) || k(e, t) || o(e, t) || a(e, t) || l(e, t) || c(e, t) || u(e, t) || f(e, t) || d(e, t) || h(e, t) || p(e, t) || m(e, t) || g(e, t) || v(e, t) || b(e, t) || x(e, t) || w(e, t) || C(e, t) || L(e, t) || T(e, t) || M(e, t) || z(e, t) || A(e, t) || O(e, t) || N(e, t) || E(e, t) || F(e, t) || D(e, t) || j(e, t) || I(e, t) || _(e, t) || W(e, t);
                return !0 === n ? null : n
            }
            var K = "keyword",
                V = "meta",
                G = "builtin",
                X = "qualifier",
                Y = {
                    "{": "}",
                    "(": ")",
                    "[": "]"
                },
                Z = e.getMode(t, "javascript");
            return n.prototype.copy = function() {
                var t = new n;
                return t.javaScriptLine = this.javaScriptLine, t.javaScriptLineExcludesColon = this.javaScriptLineExcludesColon, t.javaScriptArguments = this.javaScriptArguments, t.javaScriptArgumentsDepth = this.javaScriptArgumentsDepth, t.isInterpolating = this.isInterpolating, t.interpolationNesting = this.interpolationNesting, t.jsState = e.copyState(Z, this.jsState), t.innerMode = this.innerMode, this.innerMode && this.innerState && (t.innerState = e.copyState(this.innerMode, this.innerState)), t.restOfLine = this.restOfLine, t.isIncludeFiltered = this.isIncludeFiltered, t.isEach = this.isEach, t.lastTag = this.lastTag, t.scriptType = this.scriptType, t.isAttrs = this.isAttrs, t.attrsNest = this.attrsNest.slice(), t.inAttributeName = this.inAttributeName, t.attributeIsType = this.attributeIsType, t.attrValue = this.attrValue, t.indentOf = this.indentOf, t.indentToken = this.indentToken, t.innerModeForLine = this.innerModeForLine, t
            }, {
                startState: q,
                copyState: U,
                token: $
            }
        }, "javascript", "css", "htmlmixed"), e.defineMIME("text/x-pug", "pug"), e.defineMIME("text/x-jade", "pug")
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        e.defineMode("javascript", function(t, n) {
            function r(e) {
                for (var t, n = !1, r = !1; null != (t = e.next());) {
                    if (!n) {
                        if ("/" == t && !r) return;
                        "[" == t ? r = !0 : r && "]" == t && (r = !1)
                    }
                    n = !n && "\\" == t
                }
            }
            function i(e, t, n) {
                return _e = e, We = n, t
            }
            function o(e, t) {
                var n = e.next();
                if ('"' == n || "'" == n) return t.tokenize = a(n), t.tokenize(e, t);
                if ("." == n && e.match(/^\d+(?:[eE][+\-]?\d+)?/)) return i("number", "number");
                if ("." == n && e.match("..")) return i("spread", "meta");
                if (/[\[\]{}\(\),;\:\.]/.test(n)) return i(n);
                if ("=" == n && e.eat(">")) return i("=>", "operator");
                if ("0" == n && e.match(/^(?:x[\da-f]+|o[0-7]+|b[01]+)n?/i)) return i("number", "number");
                if (/\d/.test(n)) return e.match(/^\d*(?:n|(?:\.\d*)?(?:[eE][+\-]?\d+)?)?/), i("number", "number");
                if ("/" == n) return e.eat("*") ? (t.tokenize = l, l(e, t)) : e.eat("/") ? (e.skipToEnd(), i("comment", "comment")) : De(e, t, 1) ? (r(e), e.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/), i("regexp", "string-2")) : (e.eat("="), i("operator", "operator", e.current()));
                if ("`" == n) return t.tokenize = s, s(e, t);
                if ("#" == n) return e.skipToEnd(), i("error", "error");
                if (Ve.test(n)) return ">" == n && t.lexical && ">" == t.lexical.type || (e.eat("=") ? "!" != n && "=" != n || e.eat("=") : /[<>*+\-]/.test(n) && (e.eat(n), ">" == n && e.eat(n))), i("operator", "operator", e.current());
                if ($e.test(n)) {
                    e.eatWhile($e);
                    var o = e.current();
                    if ("." != t.lastType) {
                        if (Ke.propertyIsEnumerable(o)) {
                            var c = Ke[o];
                            return i(c.type, c.style, o)
                        }
                        if ("async" == o && e.match(/^(\s|\/\*.*?\*\/)*[\[\(\w]/, !1)) return i("async", "keyword", o)
                    }
                    return i("variable", "variable", o)
                }
            }
            function a(e) {
                return function(t, n) {
                    var r, a = !1;
                    if (Be && "@" == t.peek() && t.match(Ge)) return n.tokenize = o, i("jsonld-keyword", "meta");
                    for (; null != (r = t.next()) && (r != e || a);) a = !a && "\\" == r;
                    return a || (n.tokenize = o), i("string", "string")
                }
            }
            function l(e, t) {
                for (var n, r = !1; n = e.next();) {
                    if ("/" == n && r) {
                        t.tokenize = o;
                        break
                    }
                    r = "*" == n
                }
                return i("comment", "comment")
            }
            function s(e, t) {
                for (var n, r = !1; null != (n = e.next());) {
                    if (!r && ("`" == n || "$" == n && e.eat("{"))) {
                        t.tokenize = o;
                        break
                    }
                    r = !r && "\\" == n
                }
                return i("quasi", "string-2", e.current())
            }
            function c(e, t) {
                t.fatArrowAt && (t.fatArrowAt = null);
                var n = e.string.indexOf("=>", e.start);
                if (!(n < 0)) {
                    if (Ue) {
                        var r = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start, n));
                        r && (n = r.index)
                    }
                    for (var i = 0, o = !1, a = n - 1; a >= 0; --a) {
                        var l = e.string.charAt(a),
                            s = Xe.indexOf(l);
                        if (s >= 0 && s < 3) {
                            if (!i) {
                                ++a;
                                break
                            }
                            if (0 == --i) {
                                "(" == l && (o = !0);
                                break
                            }
                        } else if (s >= 3 && s < 6) ++i;
                        else if ($e.test(l)) o = !0;
                        else {
                            if (/["'\/]/.test(l)) return;
                            if (o && !i) {
                                ++a;
                                break
                            }
                        }
                    }
                    o && !i && (t.fatArrowAt = a)
                }
            }
            function u(e, t, n, r, i, o) {
                this.indented = e, this.column = t, this.type = n, this.prev = i, this.info = o, null != r && (this.align = r)
            }
            function f(e, t) {
                for (var n = e.localVars; n; n = n.next)
                    if (n.name == t) return !0;
                for (var r = e.context; r; r = r.prev)
                    for (n = r.vars; n; n = n.next)
                        if (n.name == t) return !0
            }
            function d(e, t, n, r, i) {
                var o = e.cc;
                for (Ze.state = e, Ze.stream = i, Ze.marked = null, Ze.cc = o, Ze.style = t, e.lexical.hasOwnProperty("align") || (e.lexical.align = !0);;) {
                    if ((o.length ? o.pop() : qe ? A : M)(n, r)) {
                        for (; o.length && o[o.length - 1].lex;) o.pop()();
                        return Ze.marked ? Ze.marked : "variable" == n && f(e, r) ? "variable-2" : t
                    }
                }
            }
            function h() {
                for (var e = arguments.length - 1; e >= 0; e--) Ze.cc.push(arguments[e])
            }
            function p() {
                return h.apply(null, arguments), !0
            }
            function m(e, t) {
                for (var n = t; n; n = n.next)
                    if (n.name == e) return !0;
                return !1
            }
            function g(e) {
                var t = Ze.state;
                if (Ze.marked = "def", t.context)
                    if ("var" == t.lexical.info && t.context && t.context.block) {
                        var r = v(e, t.context);
                        if (null != r) return void(t.context = r)
                    } else if (!m(e, t.localVars)) return void(t.localVars = new x(e, t.localVars));
                n.globalVars && !m(e, t.globalVars) && (t.globalVars = new x(e, t.globalVars))
            }
            function v(e, t) {
                if (t) {
                    if (t.block) {
                        var n = v(e, t.prev);
                        return n ? n == t.prev ? t : new b(n, t.vars, !0) : null
                    }
                    return m(e, t.vars) ? t : new b(t.prev, new x(e, t.vars), !1)
                }
                return null
            }
            function y(e) {
                return "public" == e || "private" == e || "protected" == e || "abstract" == e || "readonly" == e
            }
            function b(e, t, n) {
                this.prev = e, this.vars = t, this.block = n
            }
            function x(e, t) {
                this.name = e, this.next = t
            }
            function k() {
                Ze.state.context = new b(Ze.state.context, Ze.state.localVars, !1), Ze.state.localVars = Qe
            }
            function w() {
                Ze.state.context = new b(Ze.state.context, Ze.state.localVars, !0), Ze.state.localVars = null
            }
            function C() {
                Ze.state.localVars = Ze.state.context.vars, Ze.state.context = Ze.state.context.prev
            }
            function S(e, t) {
                var n = function() {
                    var n = Ze.state,
                        r = n.indented;
                    if ("stat" == n.lexical.type) r = n.lexical.indented;
                    else
                        for (var i = n.lexical; i && ")" == i.type && i.align; i = i.prev) r = i.indented;
                    n.lexical = new u(r, Ze.stream.column(), e, null, n.lexical, t)
                };
                return n.lex = !0, n
            }
            function L() {
                var e = Ze.state;
                e.lexical.prev && (")" == e.lexical.type && (e.indented = e.lexical.indented), e.lexical = e.lexical.prev)
            }
            function T(e) {
                function t(n) {
                    return n == e ? p() : ";" == e || "}" == n || ")" == n || "]" == n ? h() : p(t)
                }
                return t
            }
            function M(e, t) {
                return "var" == e ? p(S("vardef", t), se, T(";"), L) : "keyword a" == e ? p(S("form"), N, M, L) : "keyword b" == e ? p(S("form"), M, L) : "keyword d" == e ? Ze.stream.match(/^\s*$/, !1) ? p() : p(S("stat"), E, T(";"), L) : "debugger" == e ? p(T(";")) : "{" == e ? p(S("}"), w, Y, L, C) : ";" == e ? p() : "if" == e ? ("else" == Ze.state.lexical.info && Ze.state.cc[Ze.state.cc.length - 1] == L && Ze.state.cc.pop()(), p(S("form"), N, M, L, he)) : "function" == e ? p(be) : "for" == e ? p(S("form"), pe, M, L) : "class" == e || Ue && "interface" == t ? (Ze.marked = "keyword", p(S("form"), we, L)) : "variable" == e ? Ue && "declare" == t ? (Ze.marked = "keyword", p(M)) : Ue && ("module" == t || "enum" == t || "type" == t) && Ze.stream.match(/^\s*\w/, !1) ? (Ze.marked = "keyword", "enum" == t ? p(Fe) : "type" == t ? p(ee, T("operator"), ee, T(";")) : p(S("form"), ce, T("{"), S("}"), Y, L, L)) : Ue && "namespace" == t ? (Ze.marked = "keyword", p(S("form"), A, Y, L)) : Ue && "abstract" == t ? (Ze.marked = "keyword", p(M)) : p(S("stat"), q) : "switch" == e ? p(S("form"), N, T("{"), S("}", "switch"), w, Y, L, L, C) : "case" == e ? p(A, T(":")) : "default" == e ? p(T(":")) : "catch" == e ? p(S("form"), k, z, M, L, C) : "export" == e ? p(S("stat"), Te, L) : "import" == e ? p(S("stat"), ze, L) : "async" == e ? p(M) : "@" == t ? p(A, M) : h(S("stat"), A, T(";"), L)
            }
            function z(e) {
                if ("(" == e) return p(xe, T(")"))
            }
            function A(e, t) {
                return P(e, t, !1)
            }
            function O(e, t) {
                return P(e, t, !0)
            }
            function N(e) {
                return "(" != e ? h() : p(S(")"), A, T(")"), L)
            }
            function P(e, t, n) {
                if (Ze.state.fatArrowAt == Ze.stream.start) {
                    var r = n ? W : _;
                    if ("(" == e) return p(k, S(")"), G(xe, ")"), L, T("=>"), r, C);
                    if ("variable" == e) return h(k, ce, T("=>"), r, C)
                }
                var i = n ? j : F;
                return Ye.hasOwnProperty(e) ? p(i) : "function" == e ? p(be, i) : "class" == e || Ue && "interface" == t ? (Ze.marked = "keyword", p(S("form"), ke, L)) : "keyword c" == e || "async" == e ? p(n ? O : A) : "(" == e ? p(S(")"), E, T(")"), L, i) : "operator" == e || "spread" == e ? p(n ? O : A) : "[" == e ? p(S("]"), Ee, L, i) : "{" == e ? X($, "}", null, i) : "quasi" == e ? h(I, i) : "new" == e ? p(R(n)) : "import" == e ? p(A) : p()
            }
            function E(e) {
                return e.match(/[;\}\)\],]/) ? h() : h(A)
            }
            function F(e, t) {
                return "," == e ? p(A) : j(e, t, !1)
            }
            function j(e, t, n) {
                var r = 0 == n ? F : j,
                    i = 0 == n ? A : O;
                return "=>" == e ? p(k, n ? W : _, C) : "operator" == e ? /\+\+|--/.test(t) || Ue && "!" == t ? p(r) : Ue && "<" == t && Ze.stream.match(/^([^>]|<.*?>)*>\s*\(/, !1) ? p(S(">"), G(ee, ">"), L, r) : "?" == t ? p(A, T(":"), i) : p(i) : "quasi" == e ? h(I, r) : ";" != e ? "(" == e ? X(O, ")", "call", r) : "." == e ? p(U, r) : "[" == e ? p(S("]"), E, T("]"), L, r) : Ue && "as" == t ? (Ze.marked = "keyword", p(ee, r)) : "regexp" == e ? (Ze.state.lastType = Ze.marked = "operator", Ze.stream.backUp(Ze.stream.pos - Ze.stream.start - 1), p(i)) : void 0 : void 0
            }
            function I(e, t) {
                return "quasi" != e ? h() : "${" != t.slice(t.length - 2) ? p(I) : p(A, D)
            }
            function D(e) {
                if ("}" == e) return Ze.marked = "string-2", Ze.state.tokenize = s, p(I)
            }
            function _(e) {
                return c(Ze.stream, Ze.state), h("{" == e ? M : A)
            }
            function W(e) {
                return c(Ze.stream, Ze.state), h("{" == e ? M : O)
            }
            function R(e) {
                return function(t) {
                    return "." == t ? p(e ? B : H) : "variable" == t && Ue ? p(oe, e ? j : F) : h(e ? O : A)
                }
            }
            function H(e, t) {
                if ("target" == t) return Ze.marked = "keyword", p(F)
            }
            function B(e, t) {
                if ("target" == t) return Ze.marked = "keyword", p(j)
            }
            function q(e) {
                return ":" == e ? p(L, M) : h(F, T(";"), L)
            }
            function U(e) {
                if ("variable" == e) return Ze.marked = "property", p()
            }
            function $(e, t) {
                if ("async" == e) return Ze.marked = "property", p($);
                if ("variable" == e || "keyword" == Ze.style) {
                    return Ze.marked = "property", "get" == t || "set" == t ? p(K) : (Ue && Ze.state.fatArrowAt == Ze.stream.start && (n = Ze.stream.match(/^\s*:\s*/, !1)) && (Ze.state.fatArrowAt = Ze.stream.pos + n[0].length), p(V));
                    var n
                } else {
                    if ("number" == e || "string" == e) return Ze.marked = Be ? "property" : Ze.style + " property", p(V);
                    if ("jsonld-keyword" == e) return p(V);
                    if (Ue && y(t)) return Ze.marked = "keyword", p($);
                    if ("[" == e) return p(A, Z, T("]"), V);
                    if ("spread" == e) return p(O, V);
                    if ("*" == t) return Ze.marked = "keyword", p($);
                    if (":" == e) return h(V)
                }
            }
            function K(e) {
                return "variable" != e ? h(V) : (Ze.marked = "property", p(be))
            }
            function V(e) {
                return ":" == e ? p(O) : "(" == e ? h(be) : void 0
            }
            function G(e, t, n) {
                function r(i, o) {
                    if (n ? n.indexOf(i) > -1 : "," == i) {
                        var a = Ze.state.lexical;
                        return "call" == a.info && (a.pos = (a.pos || 0) + 1), p(function(n, r) {
                            return n == t || r == t ? h() : h(e)
                        }, r)
                    }
                    return i == t || o == t ? p() : p(T(t))
                }
                return function(n, i) {
                    return n == t || i == t ? p() : h(e, r)
                }
            }
            function X(e, t, n) {
                for (var r = 3; r < arguments.length; r++) Ze.cc.push(arguments[r]);
                return p(S(t, n), G(e, t), L)
            }
            function Y(e) {
                return "}" == e ? p() : h(M, Y)
            }
            function Z(e, t) {
                if (Ue) {
                    if (":" == e) return p(ee);
                    if ("?" == t) return p(Z)
                }
            }
            function Q(e) {
                if (Ue && ":" == e) return Ze.stream.match(/^\s*\w+\s+is\b/, !1) ? p(A, J, ee) : p(ee)
            }
            function J(e, t) {
                if ("is" == t) return Ze.marked = "keyword", p()
            }
            function ee(e, t) {
                return "keyof" == t || "typeof" == t ? (Ze.marked = "keyword", p("keyof" == t ? ee : O)) : "variable" == e || "void" == t ? (Ze.marked = "type", p(ie)) : "string" == e || "number" == e || "atom" == e ? p(ie) : "[" == e ? p(S("]"), G(ee, "]", ","), L, ie) : "{" == e ? p(S("}"), G(ne, "}", ",;"), L, ie) : "(" == e ? p(G(re, ")"), te) : "<" == e ? p(G(ee, ">"), ee) : void 0
            }
            function te(e) {
                if ("=>" == e) return p(ee)
            }
            function ne(e, t) {
                return "variable" == e || "keyword" == Ze.style ? (Ze.marked = "property", p(ne)) : "?" == t ? p(ne) : ":" == e ? p(ee) : "[" == e ? p(A, Z, T("]"), ne) : void 0
            }
            function re(e, t) {
                return "variable" == e && Ze.stream.match(/^\s*[?:]/, !1) || "?" == t ? p(re) : ":" == e ? p(ee) : h(ee)
            }
            function ie(e, t) {
                return "<" == t ? p(S(">"), G(ee, ">"), L, ie) : "|" == t || "." == e || "&" == t ? p(ee) : "[" == e ? p(T("]"), ie) : "extends" == t || "implements" == t ? (Ze.marked = "keyword", p(ee)) : void 0
            }
            function oe(e, t) {
                if ("<" == t) return p(S(">"), G(ee, ">"), L, ie)
            }
            function ae() {
                return h(ee, le)
            }
            function le(e, t) {
                if ("=" == t) return p(ee)
            }
            function se(e, t) {
                return "enum" == t ? (Ze.marked = "keyword", p(Fe)) : h(ce, Z, fe, de)
            }
            function ce(e, t) {
                return Ue && y(t) ? (Ze.marked = "keyword", p(ce)) : "variable" == e ? (g(t), p()) : "spread" == e ? p(ce) : "[" == e ? X(ce, "]") : "{" == e ? X(ue, "}") : void 0
            }
            function ue(e, t) {
                return "variable" != e || Ze.stream.match(/^\s*:/, !1) ? ("variable" == e && (Ze.marked = "property"), "spread" == e ? p(ce) : "}" == e ? h() : p(T(":"), ce, fe)) : (g(t), p(fe))
            }
            function fe(e, t) {
                if ("=" == t) return p(O)
            }
            function de(e) {
                if ("," == e) return p(se)
            }
            function he(e, t) {
                if ("keyword b" == e && "else" == t) return p(S("form", "else"), M, L)
            }
            function pe(e, t) {
                return "await" == t ? p(pe) : "(" == e ? p(S(")"), me, T(")"), L) : void 0
            }
            function me(e) {
                return "var" == e ? p(se, T(";"), ve) : ";" == e ? p(ve) : "variable" == e ? p(ge) : h(A, T(";"), ve)
            }
            function ge(e, t) {
                return "in" == t || "of" == t ? (Ze.marked = "keyword", p(A)) : p(F, ve)
            }
            function ve(e, t) {
                return ";" == e ? p(ye) : "in" == t || "of" == t ? (Ze.marked = "keyword", p(A)) : h(A, T(";"), ye)
            }
            function ye(e) {
                ")" != e && p(A)
            }
            function be(e, t) {
                return "*" == t ? (Ze.marked = "keyword", p(be)) : "variable" == e ? (g(t), p(be)) : "(" == e ? p(k, S(")"), G(xe, ")"), L, Q, M, C) : Ue && "<" == t ? p(S(">"), G(ae, ">"), L, be) : void 0
            }
            function xe(e, t) {
                return "@" == t && p(A, xe), "spread" == e ? p(xe) : Ue && y(t) ? (Ze.marked = "keyword", p(xe)) : h(ce, Z, fe)
            }
            function ke(e, t) {
                return "variable" == e ? we(e, t) : Ce(e, t)
            }
            function we(e, t) {
                if ("variable" == e) return g(t), p(Ce)
            }
            function Ce(e, t) {
                return "<" == t ? p(S(">"), G(ae, ">"), L, Ce) : "extends" == t || "implements" == t || Ue && "," == e ? ("implements" == t && (Ze.marked = "keyword"), p(Ue ? ee : A, Ce)) : "{" == e ? p(S("}"), Se, L) : void 0
            }
            function Se(e, t) {
                return "async" == e || "variable" == e && ("static" == t || "get" == t || "set" == t || Ue && y(t)) && Ze.stream.match(/^\s+[\w$\xa1-\uffff]/, !1) ? (Ze.marked = "keyword", p(Se)) : "variable" == e || "keyword" == Ze.style ? (Ze.marked = "property", p(Ue ? Le : be, Se)) : "[" == e ? p(A, Z, T("]"), Ue ? Le : be, Se) : "*" == t ? (Ze.marked = "keyword", p(Se)) : ";" == e ? p(Se) : "}" == e ? p() : "@" == t ? p(A, Se) : void 0
            }
            function Le(e, t) {
                return "?" == t ? p(Le) : ":" == e ? p(ee, fe) : "=" == t ? p(O) : h(be)
            }
            function Te(e, t) {
                return "*" == t ? (Ze.marked = "keyword", p(Pe, T(";"))) : "default" == t ? (Ze.marked = "keyword", p(A, T(";"))) : "{" == e ? p(G(Me, "}"), Pe, T(";")) : h(M)
            }
            function Me(e, t) {
                return "as" == t ? (Ze.marked = "keyword", p(T("variable"))) : "variable" == e ? h(O, Me) : void 0
            }
            function ze(e) {
                return "string" == e ? p() : "(" == e ? h(A) : h(Ae, Oe, Pe)
            }
            function Ae(e, t) {
                return "{" == e ? X(Ae, "}") : ("variable" == e && g(t), "*" == t && (Ze.marked = "keyword"), p(Ne))
            }
            function Oe(e) {
                if ("," == e) return p(Ae, Oe)
            }
            function Ne(e, t) {
                if ("as" == t) return Ze.marked = "keyword", p(Ae)
            }
            function Pe(e, t) {
                if ("from" == t) return Ze.marked = "keyword", p(A)
            }
            function Ee(e) {
                return "]" == e ? p() : h(G(O, "]"))
            }
            function Fe() {
                return h(S("form"), ce, T("{"), S("}"), G(je, "}"), L, L)
            }
            function je() {
                return h(ce, fe)
            }
            function Ie(e, t) {
                return "operator" == e.lastType || "," == e.lastType || Ve.test(t.charAt(0)) || /[,.]/.test(t.charAt(0))
            }
            function De(e, t, n) {
                return t.tokenize == o && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(t.lastType) || "quasi" == t.lastType && /\{\s*$/.test(e.string.slice(0, e.pos - (n || 0)))
            }
            var _e, We, Re = t.indentUnit,
                He = n.statementIndent,
                Be = n.jsonld,
                qe = n.json || Be,
                Ue = n.typescript,
                $e = n.wordCharacters || /[\w$\xa1-\uffff]/,
                Ke = function() {
                    function e(e) {
                        return {
                            type: e,
                            style: "keyword"
                        }
                    }
                    var t = e("keyword a"),
                        n = e("keyword b"),
                        r = e("keyword c"),
                        i = e("keyword d"),
                        o = e("operator"),
                        a = {
                            type: "atom",
                            style: "atom"
                        };
                    return {
                        "if": e("if"),
                        "while": t,
                        "with": t,
                        "else": n,
                        "do": n,
                        "try": n,
                        "finally": n,
                        "return": i,
                        "break": i,
                        "continue": i,
                        "new": e("new"),
                        "delete": r,
                        "void": r,
                        "throw": r,
                        "debugger": e("debugger"),
                        "var": e("var"),
                        "const": e("var"),
                        "let": e("var"),
                        "function": e("function"),
                        "catch": e("catch"),
                        "for": e("for"),
                        "switch": e("switch"),
                        "case": e("case"),
                        "default": e("default"),
                        "in": o,
                        "typeof": o,
                        "instanceof": o,
                        "true": a,
                        "false": a,
                        "null": a,
                        undefined: a,
                        NaN: a,
                        Infinity: a,
                        "this": e("this"),
                        "class": e("class"),
                        "super": e("atom"),
                        yield: r,
                        "export": e("export"),
                        "import": e("import"),
                        "extends": r,
                        await: r
                    }
                }(),
                Ve = /[+\-*&%=<>!?|~^@]/,
                Ge = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,
                Xe = "([{}])",
                Ye = {
                    atom: !0,
                    number: !0,
                    variable: !0,
                    string: !0,
                    regexp: !0,
                    "this": !0,
                    "jsonld-keyword": !0
                },
                Ze = {
                    state: null,
                    column: null,
                    marked: null,
                    cc: null
                },
                Qe = new x("this", new x("arguments", null));
            return C.lex = !0, L.lex = !0, {
                startState: function(e) {
                    var t = {
                        tokenize: o,
                        lastType: "sof",
                        cc: [],
                        lexical: new u((e || 0) - Re, 0, "block", !1),
                        localVars: n.localVars,
                        context: n.localVars && new b(null, null, !1),
                        indented: e || 0
                    };
                    return n.globalVars && "object" == typeof n.globalVars && (t.globalVars = n.globalVars), t
                },
                token: function(e, t) {
                    if (e.sol() && (t.lexical.hasOwnProperty("align") || (t.lexical.align = !1), t.indented = e.indentation(), c(e, t)), t.tokenize != l && e.eatSpace()) return null;
                    var n = t.tokenize(e, t);
                    return "comment" == _e ? n : (t.lastType = "operator" != _e || "++" != We && "--" != We ? _e : "incdec", d(t, n, _e, We, e))
                },
                indent: function(t, r) {
                    if (t.tokenize == l) return e.Pass;
                    if (t.tokenize != o) return 0;
                    var i, a = r && r.charAt(0),
                        s = t.lexical;
                    if (!/^\s*else\b/.test(r))
                        for (var c = t.cc.length - 1; c >= 0; --c) {
                            var u = t.cc[c];
                            if (u == L) s = s.prev;
                            else if (u != he) break
                        }
                    for (;
                        ("stat" == s.type || "form" == s.type) && ("}" == a || (i = t.cc[t.cc.length - 1]) && (i == F || i == j) && !/^[,\.=+\-*:?[\(]/.test(r));) s = s.prev;
                    He && ")" == s.type && "stat" == s.prev.type && (s = s.prev);
                    var f = s.type,
                        d = a == f;
                    return "vardef" == f ? s.indented + ("operator" == t.lastType || "," == t.lastType ? s.info.length + 1 : 0) : "form" == f && "{" == a ? s.indented : "form" == f ? s.indented + Re : "stat" == f ? s.indented + (Ie(t, r) ? He || Re : 0) : "switch" != s.info || d || 0 == n.doubleIndentSwitch ? s.align ? s.column + (d ? 0 : 1) : s.indented + (d ? 0 : Re) : s.indented + (/^(?:case|default)\b/.test(r) ? Re : 2 * Re)
                },
                electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
                blockCommentStart: qe ? null : "/*",
                blockCommentEnd: qe ? null : "*/",
                blockCommentContinue: qe ? null : " * ",
                lineComment: qe ? null : "//",
                fold: "brace",
                closeBrackets: "()[]{}''\"\"``",
                helperType: qe ? "json" : "javascript",
                jsonldMode: Be,
                jsonMode: qe,
                expressionAllowed: De,
                skipExpression: function(e) {
                    var t = e.cc[e.cc.length - 1];
                    t != A && t != O || e.cc.pop()
                }
            }
        }), e.registerHelper("wordChars", "javascript", /[\w$]/), e.defineMIME("text/javascript", "javascript"), e.defineMIME("text/ecmascript", "javascript"), e.defineMIME("application/javascript", "javascript"), e.defineMIME("application/x-javascript", "javascript"), e.defineMIME("application/ecmascript", "javascript"), e.defineMIME("application/json", {
            name: "javascript",
            json: !0
        }), e.defineMIME("application/x-json", {
            name: "javascript",
            json: !0
        }), e.defineMIME("application/ld+json", {
            name: "javascript",
            jsonld: !0
        }), e.defineMIME("text/typescript", {
            name: "javascript",
            typescript: !0
        }), e.defineMIME("application/typescript", {
            name: "javascript",
            typescript: !0
        })
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../xml/xml"), require("../javascript/javascript")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../xml/xml", "../javascript/javascript"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        function t(e, t, n, r) {
            this.state = e, this.mode = t, this.depth = n, this.prev = r
        }
        function n(r) {
            return new t(e.copyState(r.mode, r.state), r.mode, r.depth, r.prev && n(r.prev))
        }
        e.defineMode("jsx", function(r, i) {
            function o(e) {
                var t = e.tagName;
                e.tagName = null;
                var n = c.indent(e, "");
                return e.tagName = t, n
            }
            function a(e, t) {
                return t.context.mode == c ? l(e, t, t.context) : s(e, t, t.context)
            }
            function l(n, i, l) {
                if (2 == l.depth) return n.match(/^.*?\*\//) ? l.depth = 1 : n.skipToEnd(), "comment";
                if ("{" == n.peek()) {
                    c.skipAttribute(l.state);
                    var s = o(l.state),
                        f = l.state.context;
                    if (f && n.match(/^[^>]*>\s*$/, !1)) {
                        for (; f.prev && !f.startOfLine;) f = f.prev;
                        f.startOfLine ? s -= r.indentUnit : l.prev.state.lexical && (s = l.prev.state.lexical.indented)
                    } else 1 == l.depth && (s += r.indentUnit);
                    return i.context = new t(e.startState(u, s), u, 0, i.context), null
                }
                if (1 == l.depth) {
                    if ("<" == n.peek()) return c.skipAttribute(l.state), i.context = new t(e.startState(c, o(l.state)), c, 0, i.context), null;
                    if (n.match("//")) return n.skipToEnd(), "comment";
                    if (n.match("/*")) return l.depth = 2, a(n, i)
                }
                var d, h = c.token(n, l.state),
                    p = n.current();
                return /\btag\b/.test(h) ? />$/.test(p) ? l.state.context ? l.depth = 0 : i.context = i.context.prev : /^</.test(p) && (l.depth = 1) : !h && (d = p.indexOf("{")) > -1 && n.backUp(p.length - d), h
            }
            function s(n, r, i) {
                if ("<" == n.peek() && u.expressionAllowed(n, i.state)) return u.skipExpression(i.state), r.context = new t(e.startState(c, u.indent(i.state, "")), c, 0, r.context), null;
                var o = u.token(n, i.state);
                if (!o && null != i.depth) {
                    var a = n.current();
                    "{" == a ? i.depth++ : "}" == a && 0 == --i.depth && (r.context = r.context.prev)
                }
                return o
            }
            var c = e.getMode(r, {
                    name: "xml",
                    allowMissing: !0,
                    multilineTagIndentPastTag: !1,
                    allowMissingTagName: !0
                }),
                u = e.getMode(r, i && i.base || "javascript");
            return {
                startState: function() {
                    return {
                        context: new t(e.startState(u), u)
                    }
                },
                copyState: function(e) {
                    return {
                        context: n(e.context)
                    }
                },
                token: a,
                indent: function(e, t, n) {
                    return e.context.mode.indent(e.context.state, t, n)
                },
                innerMode: function(e) {
                    return e.context
                }
            }
        }, "xml", "javascript"), e.defineMIME("text/jsx", "jsx"), e.defineMIME("text/typescript-jsx", {
            name: "jsx",
            base: {
                name: "javascript",
                typescript: !0
            }
        })
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        e.defineMode("livescript", function() {
            var e = function(e, t) {
                var n = t.next || "start";
                if (n) {
                    t.next = t.next;
                    var r = o[n];
                    if (r.splice) {
                        for (var i = 0; i < r.length; ++i) {
                            var a = r[i];
                            if (a.regex && e.match(a.regex)) return t.next = a.next || t.next, a.token
                        }
                        return e.next(), "error"
                    }
                    if (e.match(a = o[n])) return a.regex && e.match(a.regex) ? (t.next = a.next, a.token) : (e.next(), "error")
                }
                return e.next(), "error"
            };
            return {
                startState: function() {
                    return {
                        next: "start",
                        lastToken: {
                            style: null,
                            indent: 0,
                            content: ""
                        }
                    }
                },
                token: function(t, n) {
                    for (; t.pos == t.start;) var r = e(t, n);
                    return n.lastToken = {
                        style: r,
                        indent: t.indentation(),
                        content: t.current()
                    }, r.replace(/\./g, " ")
                },
                indent: function(e) {
                    var t = e.lastToken.indent;
                    return e.lastToken.content.match(n) && (t += 2), t
                }
            }
        });
        var t = "(?![\\d\\s])[$\\w\\xAA-\\uFFDC](?:(?!\\s)[$\\w\\xAA-\\uFFDC]|-[A-Za-z])*",
            n = RegExp("(?:[({[=:]|[-~]>|\\b(?:e(?:lse|xport)|d(?:o|efault)|t(?:ry|hen)|finally|import(?:\\s*all)?|const|var|let|new|catch(?:\\s*" + t + ")?))\\s*$"),
            r = "(?![$\\w]|-[A-Za-z]|\\s*:(?![:=]))",
            i = {
                token: "string",
                regex: ".+"
            },
            o = {
                start: [{
                    token: "comment.doc",
                    regex: "/\\*",
                    next: "comment"
                }, {
                    token: "comment",
                    regex: "#.*"
                }, {
                    token: "keyword",
                    regex: "(?:t(?:h(?:is|row|en)|ry|ypeof!?)|c(?:on(?:tinue|st)|a(?:se|tch)|lass)|i(?:n(?:stanceof)?|mp(?:ort(?:\\s+all)?|lements)|[fs])|d(?:e(?:fault|lete|bugger)|o)|f(?:or(?:\\s+own)?|inally|unction)|s(?:uper|witch)|e(?:lse|x(?:tends|port)|val)|a(?:nd|rguments)|n(?:ew|ot)|un(?:less|til)|w(?:hile|ith)|o[fr]|return|break|let|var|loop)" + r
                }, {
                    token: "constant.language",
                    regex: "(?:true|false|yes|no|on|off|null|void|undefined)" + r
                }, {
                    token: "invalid.illegal",
                    regex: "(?:p(?:ackage|r(?:ivate|otected)|ublic)|i(?:mplements|nterface)|enum|static|yield)" + r
                }, {
                    token: "language.support.class",
                    regex: "(?:R(?:e(?:gExp|ferenceError)|angeError)|S(?:tring|yntaxError)|E(?:rror|valError)|Array|Boolean|Date|Function|Number|Object|TypeError|URIError)" + r
                }, {
                    token: "language.support.function",
                    regex: "(?:is(?:NaN|Finite)|parse(?:Int|Float)|Math|JSON|(?:en|de)codeURI(?:Component)?)" + r
                }, {
                    token: "variable.language",
                    regex: "(?:t(?:hat|il|o)|f(?:rom|allthrough)|it|by|e)" + r
                }, {
                    token: "identifier",
                    regex: t + "\\s*:(?![:=])"
                }, {
                    token: "variable",
                    regex: t
                }, {
                    token: "keyword.operator",
                    regex: "(?:\\.{3}|\\s+\\?)"
                }, {
                    token: "keyword.variable",
                    regex: "(?:@+|::|\\.\\.)",
                    next: "key"
                }, {
                    token: "keyword.operator",
                    regex: "\\.\\s*",
                    next: "key"
                }, {
                    token: "string",
                    regex: "\\\\\\S[^\\s,;)}\\]]*"
                }, {
                    token: "string.doc",
                    regex: "'''",
                    next: "qdoc"
                }, {
                    token: "string.doc",
                    regex: '"""',
                    next: "qqdoc"
                }, {
                    token: "string",
                    regex: "'",
                    next: "qstring"
                }, {
                    token: "string",
                    regex: '"',
                    next: "qqstring"
                }, {
                    token: "string",
                    regex: "`",
                    next: "js"
                }, {
                    token: "string",
                    regex: "<\\[",
                    next: "words"
                }, {
                    token: "string.regex",
                    regex: "//",
                    next: "heregex"
                }, {
                    token: "string.regex",
                    regex: "\\/(?:[^[\\/\\n\\\\]*(?:(?:\\\\.|\\[[^\\]\\n\\\\]*(?:\\\\.[^\\]\\n\\\\]*)*\\])[^[\\/\\n\\\\]*)*)\\/[gimy$]{0,4}",
                    next: "key"
                }, {
                    token: "constant.numeric",
                    regex: "(?:0x[\\da-fA-F][\\da-fA-F_]*|(?:[2-9]|[12]\\d|3[0-6])r[\\da-zA-Z][\\da-zA-Z_]*|(?:\\d[\\d_]*(?:\\.\\d[\\d_]*)?|\\.\\d[\\d_]*)(?:e[+-]?\\d[\\d_]*)?[\\w$]*)"
                }, {
                    token: "lparen",
                    regex: "[({[]"
                }, {
                    token: "rparen",
                    regex: "[)}\\]]",
                    next: "key"
                }, {
                    token: "keyword.operator",
                    regex: "\\S+"
                }, {
                    token: "text",
                    regex: "\\s+"
                }],
                heregex: [{
                    token: "string.regex",
                    regex: ".*?//[gimy$?]{0,4}",
                    next: "start"
                }, {
                    token: "string.regex",
                    regex: "\\s*#{"
                }, {
                    token: "comment.regex",
                    regex: "\\s+(?:#.*)?"
                }, {
                    token: "string.regex",
                    regex: "\\S+"
                }],
                key: [{
                    token: "keyword.operator",
                    regex: "[.?@!]+"
                }, {
                    token: "identifier",
                    regex: t,
                    next: "start"
                }, {
                    token: "text",
                    regex: "",
                    next: "start"
                }],
                comment: [{
                    token: "comment.doc",
                    regex: ".*?\\*/",
                    next: "start"
                }, {
                    token: "comment.doc",
                    regex: ".+"
                }],
                qdoc: [{
                    token: "string",
                    regex: ".*?'''",
                    next: "key"
                }, i],
                qqdoc: [{
                    token: "string",
                    regex: '.*?"""',
                    next: "key"
                }, i],
                qstring: [{
                    token: "string",
                    regex: "[^\\\\']*(?:\\\\.[^\\\\']*)*'",
                    next: "key"
                }, i],
                qqstring: [{
                    token: "string",
                    regex: '[^\\\\"]*(?:\\\\.[^\\\\"]*)*"',
                    next: "key"
                }, i],
                js: [{
                    token: "string",
                    regex: "[^\\\\`]*(?:\\\\.[^\\\\`]*)*`",
                    next: "key"
                }, i],
                words: [{
                    token: "string",
                    regex: ".*?\\]>",
                    next: "key"
                }, i]
            };
        for (var a in o) {
            var l = o[a];
            if (l.splice)
                for (var s = 0, c = l.length; s < c; ++s) {
                    var u = l[s];
                    "string" == typeof u.regex && (o[a][s].regex = new RegExp("^" + u.regex))
                } else "string" == typeof u.regex && (o[a].regex = new RegExp("^" + l.regex))
        }
        e.defineMIME("text/x-livescript", "livescript")
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../xml/xml"), require("../meta")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../xml/xml", "../meta"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        e.defineMode("markdown", function(t, n) {
            function r(n) {
                if (e.findModeByName) {
                    var r = e.findModeByName(n);
                    r && (n = r.mime || r.mimes[0])
                }
                var i = e.getMode(t, n);
                return "null" == i.name ? null : i
            }
            function i(e, t, n) {
                return t.f = t.inline = n, n(e, t)
            }
            function o(e, t, n) {
                return t.f = t.block = n, n(e, t)
            }
            function a(e) {
                return !e || !/\S/.test(e.string)
            }
            function l(t) {
                if (t.linkTitle = !1, t.linkHref = !1, t.linkText = !1, t.em = !1, t.strong = !1, t.strikethrough = !1, t.quote = 0, t.indentedCode = !1, t.f == c) {
                    var n = k;
                    if (!n) {
                        var r = e.innerMode(x, t.htmlState);
                        n = "xml" == r.mode.name && null === r.state.tagStart && !r.state.context && r.state.tokenize.isInText
                    }
                    n && (t.f = h, t.block = s, t.htmlState = null)
                }
                return t.trailingSpace = 0, t.trailingSpaceNewLine = !1, t.prevLine = t.thisLine, t.thisLine = {
                    stream: null
                }, null
            }
            function s(t, o) {
                var l = t.column() === o.indentation,
                    s = a(o.prevLine.stream),
                    c = o.indentedCode,
                    d = o.prevLine.hr,
                    h = !1 !== o.list,
                    p = (o.listStack[o.listStack.length - 1] || 0) + 3;
                o.indentedCode = !1;
                var m = o.indentation;
                if (null === o.indentationDiff && (o.indentationDiff = o.indentation, h)) {
                    for (o.em = !1, o.strong = !1, o.code = !1, o.strikethrough = !1, o.list = null; m < o.listStack[o.listStack.length - 1];) o.listStack.pop(), o.listStack.length ? o.indentation = o.listStack[o.listStack.length - 1] : o.list = !1;
                    !1 !== o.list && (o.indentationDiff = m - o.listStack[o.listStack.length - 1])
                }
                var g = !(s || d || o.prevLine.header || h && c || o.prevLine.fencedCodeEnd),
                    y = (!1 === o.list || d || s) && o.indentation <= p && t.match(S),
                    b = null;
                if (o.indentationDiff >= 4 && (c || o.prevLine.fencedCodeEnd || o.prevLine.header || s)) return t.skipToEnd(), o.indentedCode = !0, w.code;
                if (t.eatSpace()) return null;
                if (l && o.indentation <= p && (b = t.match(M)) && b[1].length <= 6) return o.quote = 0, o.header = b[1].length, o.thisLine.header = !0, n.highlightFormatting && (o.formatting = "header"), o.f = o.inline, f(o);
                if (o.indentation <= p && t.eat(">")) return o.quote = l ? 1 : o.quote + 1, n.highlightFormatting && (o.formatting = "quote"), t.eatSpace(), f(o);
                if (!y && !o.setext && l && o.indentation <= p && (b = t.match(L))) {
                    var x = b[1] ? "ol" : "ul";
                    return o.indentation = m + t.current().length, o.list = !0, o.quote = 0, o.listStack.push(o.indentation), n.taskLists && t.match(T, !1) && (o.taskList = !0), o.f = o.inline, n.highlightFormatting && (o.formatting = ["list", "list-" + x]), f(o)
                }
                return l && o.indentation <= p && (b = t.match(O, !0)) ? (o.quote = 0, o.fencedEndRE = new RegExp(b[1] + "+ *$"), o.localMode = n.fencedCodeBlockHighlighting && r(b[2]), o.localMode && (o.localState = e.startState(o.localMode)), o.f = o.block = u, n.highlightFormatting && (o.formatting = "code-block"), o.code = -1, f(o)) : o.setext || !(g && h || o.quote || !1 !== o.list || o.code || y || N.test(t.string)) && (b = t.lookAhead(1)) && (b = b.match(z)) ? (o.setext ? (o.header = o.setext, o.setext = 0, t.skipToEnd(), n.highlightFormatting && (o.formatting = "header")) : (o.header = "=" == b[0].charAt(0) ? 1 : 2, o.setext = o.header), o.thisLine.header = !0, o.f = o.inline, f(o)) : y ? (t.skipToEnd(), o.hr = !0, o.thisLine.hr = !0, w.hr) : "[" === t.peek() ? i(t, o, v) : i(t, o, o.inline)
            }
            function c(t, n) {
                var r = x.token(t, n.htmlState);
                if (!k) {
                    var i = e.innerMode(x, n.htmlState);
                    ("xml" == i.mode.name && null === i.state.tagStart && !i.state.context && i.state.tokenize.isInText || n.md_inside && t.current().indexOf(">") > -1) && (n.f = h, n.block = s, n.htmlState = null)
                }
                return r
            }
            function u(e, t) {
                var r, i = t.listStack[t.listStack.length - 1] || 0,
                    a = t.indentation < i,
                    l = i + 3;
                return t.fencedEndRE && t.indentation <= l && (a || e.match(t.fencedEndRE)) ? (n.highlightFormatting && (t.formatting = "code-block"), a || (r = f(t)), t.localMode = t.localState = null, t.block = s, t.f = h, t.fencedEndRE = null, t.code = 0, t.thisLine.fencedCodeEnd = !0, a ? o(e, t, t.block) : r) : t.localMode ? t.localMode.token(e, t.localState) : (e.skipToEnd(), w.code)
            }
            function f(e) {
                var t = [];
                if (e.formatting) {
                    t.push(w.formatting), "string" == typeof e.formatting && (e.formatting = [e.formatting]);
                    for (var r = 0; r < e.formatting.length; r++) t.push(w.formatting + "-" + e.formatting[r]), "header" === e.formatting[r] && t.push(w.formatting + "-" + e.formatting[r] + "-" + e.header), "quote" === e.formatting[r] && (!n.maxBlockquoteDepth || n.maxBlockquoteDepth >= e.quote ? t.push(w.formatting + "-" + e.formatting[r] + "-" + e.quote) : t.push("error"))
                }
                if (e.taskOpen) return t.push("meta"), t.length ? t.join(" ") : null;
                if (e.taskClosed) return t.push("property"), t.length ? t.join(" ") : null;
                if (e.linkHref ? t.push(w.linkHref, "url") : (e.strong && t.push(w.strong), e.em && t.push(w.em), e.strikethrough && t.push(w.strikethrough), e.emoji && t.push(w.emoji), e.linkText && t.push(w.linkText), e.code && t.push(w.code), e.image && t.push(w.image), e.imageAltText && t.push(w.imageAltText, "link"), e.imageMarker && t.push(w.imageMarker)), e.header && t.push(w.header, w.header + "-" + e.header), e.quote && (t.push(w.quote), !n.maxBlockquoteDepth || n.maxBlockquoteDepth >= e.quote ? t.push(w.quote + "-" + e.quote) : t.push(w.quote + "-" + n.maxBlockquoteDepth)), !1 !== e.list) {
                    var i = (e.listStack.length - 1) % 3;
                    i ? 1 === i ? t.push(w.list2) : t.push(w.list3) : t.push(w.list1)
                }
                return e.trailingSpaceNewLine ? t.push("trailing-space-new-line") : e.trailingSpace && t.push("trailing-space-" + (e.trailingSpace % 2 ? "a" : "b")), t.length ? t.join(" ") : null
            }
            function d(e, t) {
                return e.match(A, !0) ? f(t) : undefined
            }
            function h(t, r) {
                var i = r.text(t, r);
                if (void 0 !== i) return i;
                if (r.list) return r.list = null, f(r);
                if (r.taskList) return " " === t.match(T, !0)[1] ? r.taskOpen = !0 : r.taskClosed = !0, n.highlightFormatting && (r.formatting = "task"), r.taskList = !1, f(r);
                if (r.taskOpen = !1, r.taskClosed = !1, r.header && t.match(/^#+$/, !0)) return n.highlightFormatting && (r.formatting = "header"), f(r);
                var a = t.next();
                if (r.linkTitle) {
                    r.linkTitle = !1;
                    var l = a;
                    "(" === a && (l = ")");
                    var s = "^\\s*(?:[^" + (l = (l + "").replace(/([.?*+^\[\]\\(){}|-])/g, "\\$1")) + "\\\\]+|\\\\\\\\|\\\\.)" + l;
                    if (t.match(new RegExp(s), !0)) return w.linkHref
                }
                if ("`" === a) {
                    var u = r.formatting;
                    n.highlightFormatting && (r.formatting = "code"), t.eatWhile("`");
                    var d = t.current().length;
                    if (0 != r.code || r.quote && 1 != d) {
                        if (d == r.code) {
                            var g = f(r);
                            return r.code = 0, g
                        }
                        return r.formatting = u, f(r)
                    }
                    return r.code = d, f(r)
                }
                if (r.code) return f(r);
                if ("\\" === a && (t.next(), n.highlightFormatting)) {
                    var v = f(r),
                        y = w.formatting + "-escape";
                    return v ? v + " " + y : y
                }
                if ("!" === a && t.match(/\[[^\]]*\] ?(?:\(|\[)/, !1)) return r.imageMarker = !0, r.image = !0, n.highlightFormatting && (r.formatting = "image"), f(r);
                if ("[" === a && r.imageMarker && t.match(/[^\]]*\](\(.*?\)| ?\[.*?\])/, !1)) return r.imageMarker = !1, r.imageAltText = !0, n.highlightFormatting && (r.formatting = "image"), f(r);
                if ("]" === a && r.imageAltText) {
                    n.highlightFormatting && (r.formatting = "image");
                    var v = f(r);
                    return r.imageAltText = !1, r.image = !1, r.inline = r.f = m, v
                }
                if ("[" === a && !r.image) return r.linkText && t.match(/^.*?\]/) ? f(r) : (r.linkText = !0, n.highlightFormatting && (r.formatting = "link"), f(r));
                if ("]" === a && r.linkText) {
                    n.highlightFormatting && (r.formatting = "link");
                    var v = f(r);
                    return r.linkText = !1, r.inline = r.f = t.match(/\(.*?\)| ?\[.*?\]/, !1) ? m : h, v
                }
                if ("<" === a && t.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1)) return r.f = r.inline = p, n.highlightFormatting && (r.formatting = "link"), (v = f(r)) ? v += " " : v = "", v + w.linkInline;
                if ("<" === a && t.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1)) return r.f = r.inline = p, n.highlightFormatting && (r.formatting = "link"), (v = f(r)) ? v += " " : v = "", v + w.linkEmail;
                if (n.xml && "<" === a && t.match(/^(!--|\?|!\[CDATA\[|[a-z][a-z0-9-]*(?:\s+[a-z_:.\-]+(?:\s*=\s*[^>]+)?)*\s*(?:>|$))/i, !1)) {
                    var b = t.string.indexOf(">", t.pos);
                    if (-1 != b) {
                        var k = t.string.substring(t.start, b);
                        /markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(k) && (r.md_inside = !0)
                    }
                    return t.backUp(1), r.htmlState = e.startState(x), o(t, r, c)
                }
                if (n.xml && "<" === a && t.match(/^\/\w*?>/)) return r.md_inside = !1, "tag";
                if ("*" === a || "_" === a) {
                    for (var C = 1, S = 1 == t.pos ? " " : t.string.charAt(t.pos - 2); C < 3 && t.eat(a);) C++;
                    var L = t.peek() || " ",
                        M = !/\s/.test(L) && (!P.test(L) || /\s/.test(S) || P.test(S)),
                        z = !/\s/.test(S) && (!P.test(S) || /\s/.test(L) || P.test(L)),
                        A = null,
                        O = null;
                    if (C % 2 && (r.em || !M || "*" !== a && z && !P.test(S) ? r.em != a || !z || "*" !== a && M && !P.test(L) || (A = !1) : A = !0), C > 1 && (r.strong || !M || "*" !== a && z && !P.test(S) ? r.strong != a || !z || "*" !== a && M && !P.test(L) || (O = !1) : O = !0), null != O || null != A) {
                        n.highlightFormatting && (r.formatting = null == A ? "strong" : null == O ? "em" : "strong em"), !0 === A && (r.em = a), !0 === O && (r.strong = a);
                        g = f(r);
                        return !1 === A && (r.em = !1), !1 === O && (r.strong = !1), g
                    }
                } else if (" " === a && (t.eat("*") || t.eat("_"))) {
                    if (" " === t.peek()) return f(r);
                    t.backUp(1)
                }
                if (n.strikethrough)
                    if ("~" === a && t.eatWhile(a)) {
                        if (r.strikethrough) {
                            n.highlightFormatting && (r.formatting = "strikethrough");
                            g = f(r);
                            return r.strikethrough = !1, g
                        }
                        if (t.match(/^[^\s]/, !1)) return r.strikethrough = !0, n.highlightFormatting && (r.formatting = "strikethrough"), f(r)
                    } else if (" " === a && t.match(/^~~/, !0)) {
                    if (" " === t.peek()) return f(r);
                    t.backUp(2)
                }
                if (n.emoji && ":" === a && t.match(/^[a-z_\d+-]+:/)) {
                    r.emoji = !0, n.highlightFormatting && (r.formatting = "emoji");
                    var N = f(r);
                    return r.emoji = !1, N
                }
                return " " === a && (t.match(/^ +$/, !1) ? r.trailingSpace++ : r.trailingSpace && (r.trailingSpaceNewLine = !0)), f(r)
            }
            function p(e, t) {
                if (">" === e.next()) {
                    t.f = t.inline = h, n.highlightFormatting && (t.formatting = "link");
                    var r = f(t);
                    return r ? r += " " : r = "", r + w.linkInline
                }
                return e.match(/^[^>]+/, !0), w.linkInline
            }
            function m(e, t) {
                if (e.eatSpace()) return null;
                var r = e.next();
                return "(" === r || "[" === r ? (t.f = t.inline = g("(" === r ? ")" : "]"), n.highlightFormatting && (t.formatting = "link-string"), t.linkHref = !0, f(t)) : "error"
            }
            function g(e) {
                return function(t, r) {
                    if (t.next() === e) {
                        r.f = r.inline = h, n.highlightFormatting && (r.formatting = "link-string");
                        var i = f(r);
                        return r.linkHref = !1, i
                    }
                    return t.match(F[e]), r.linkHref = !0, f(r)
                }
            }
            function v(e, t) {
                return e.match(/^([^\]\\]|\\.)*\]:/, !1) ? (t.f = y, e.next(), n.highlightFormatting && (t.formatting = "link"), t.linkText = !0, f(t)) : i(e, t, h)
            }
            function y(e, t) {
                if (e.match(/^\]:/, !0)) {
                    t.f = t.inline = b, n.highlightFormatting && (t.formatting = "link");
                    var r = f(t);
                    return t.linkText = !1, r
                }
                return e.match(/^([^\]\\]|\\.)+/, !0), w.linkText
            }
            function b(e, t) {
                return e.eatSpace() ? null : (e.match(/^[^\s]+/, !0), e.peek() === undefined ? t.linkTitle = !0 : e.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, !0), t.f = t.inline = h, w.linkHref + " url")
            }
            var x = e.getMode(t, "text/html"),
                k = "null" == x.name;
            n.highlightFormatting === undefined && (n.highlightFormatting = !1), n.maxBlockquoteDepth === undefined && (n.maxBlockquoteDepth = 0), n.taskLists === undefined && (n.taskLists = !1), n.strikethrough === undefined && (n.strikethrough = !1), n.emoji === undefined && (n.emoji = !1), n.fencedCodeBlockHighlighting === undefined && (n.fencedCodeBlockHighlighting = !0), n.xml === undefined && (n.xml = !0), n.tokenTypeOverrides === undefined && (n.tokenTypeOverrides = {});
            var w = {
                header: "header",
                code: "comment",
                quote: "quote",
                list1: "variable-2",
                list2: "variable-3",
                list3: "keyword",
                hr: "hr",
                image: "image",
                imageAltText: "image-alt-text",
                imageMarker: "image-marker",
                formatting: "formatting",
                linkInline: "link",
                linkEmail: "link",
                linkText: "link",
                linkHref: "string",
                em: "em",
                strong: "strong",
                strikethrough: "strikethrough",
                emoji: "builtin"
            };
            for (var C in w) w.hasOwnProperty(C) && n.tokenTypeOverrides[C] && (w[C] = n.tokenTypeOverrides[C]);
            var S = /^([*\-_])(?:\s*\1){2,}\s*$/,
                L = /^(?:[*\-+]|^[0-9]+([.)]))\s+/,
                T = /^\[(x| )\](?=\s)/i,
                M = n.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/,
                z = /^ *(?:\={1,}|-{1,})\s*$/,
                A = /^[^#!\[\]*_\\<>` "'(~:]+/,
                O = /^(~~~+|```+)[ \t]*([\w+#-]*)[^\n`]*$/,
                N = /^\s*\[[^\]]+?\]:.*$/,
                P = /[!\"#$%&\'()*+,\-\.\/:;<=>?@\[\\\]^_`{|}~\u2014]/,
                E = "    ",
                F = {
                    ")": /^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/,
                    "]": /^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\]]|\\.)*\])*?(?=\])/
                },
                j = {
                    startState: function() {
                        return {
                            f: s,
                            prevLine: {
                                stream: null
                            },
                            thisLine: {
                                stream: null
                            },
                            block: s,
                            htmlState: null,
                            indentation: 0,
                            inline: h,
                            text: d,
                            formatting: !1,
                            linkText: !1,
                            linkHref: !1,
                            linkTitle: !1,
                            code: 0,
                            em: !1,
                            strong: !1,
                            header: 0,
                            setext: 0,
                            hr: !1,
                            taskList: !1,
                            list: !1,
                            listStack: [],
                            quote: 0,
                            trailingSpace: 0,
                            trailingSpaceNewLine: !1,
                            strikethrough: !1,
                            emoji: !1,
                            fencedEndRE: null
                        }
                    },
                    copyState: function(t) {
                        return {
                            f: t.f,
                            prevLine: t.prevLine,
                            thisLine: t.thisLine,
                            block: t.block,
                            htmlState: t.htmlState && e.copyState(x, t.htmlState),
                            indentation: t.indentation,
                            localMode: t.localMode,
                            localState: t.localMode ? e.copyState(t.localMode, t.localState) : null,
                            inline: t.inline,
                            text: t.text,
                            formatting: !1,
                            linkText: t.linkText,
                            linkTitle: t.linkTitle,
                            linkHref: t.linkHref,
                            code: t.code,
                            em: t.em,
                            strong: t.strong,
                            strikethrough: t.strikethrough,
                            emoji: t.emoji,
                            header: t.header,
                            setext: t.setext,
                            hr: t.hr,
                            taskList: t.taskList,
                            list: t.list,
                            listStack: t.listStack.slice(0),
                            quote: t.quote,
                            indentedCode: t.indentedCode,
                            trailingSpace: t.trailingSpace,
                            trailingSpaceNewLine: t.trailingSpaceNewLine,
                            md_inside: t.md_inside,
                            fencedEndRE: t.fencedEndRE
                        }
                    },
                    token: function(e, t) {
                        if (t.formatting = !1, e != t.thisLine.stream) {
                            if (t.header = 0, t.hr = !1, e.match(/^\s*$/, !0)) return l(t), null;
                            if (t.prevLine = t.thisLine, t.thisLine = {
                                    stream: e
                                }, t.taskList = !1, t.trailingSpace = 0, t.trailingSpaceNewLine = !1, !t.localState && (t.f = t.block, t.f != c)) {
                                var n = e.match(/^\s*/, !0)[0].replace(/\t/g, E).length;
                                if (t.indentation = n, t.indentationDiff = null, n > 0) return null
                            }
                        }
                        return t.f(e, t)
                    },
                    innerMode: function(e) {
                        return e.block == c ? {
                            state: e.htmlState,
                            mode: x
                        } : e.localState ? {
                            state: e.localState,
                            mode: e.localMode
                        } : {
                            state: e,
                            mode: j
                        }
                    },
                    indent: function(t, n, r) {
                        return t.block == c && x.indent ? x.indent(t.htmlState, n, r) : t.localState && t.localMode.indent ? t.localMode.indent(t.localState, n, r) : e.Pass
                    },
                    blankLine: l,
                    getType: f,
                    blockCommentStart: "<!--",
                    blockCommentEnd: "-->",
                    closeBrackets: "()[]{}''\"\"``",
                    fold: "markdown"
                };
            return j
        }, "xml"), e.defineMIME("text/markdown", "markdown"), e.defineMIME("text/x-markdown", "markdown")
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        function t(e) {
            return new RegExp("^((" + e.join(")|(") + "))\\b")
        }
        function n(e) {
            return e.scopes[e.scopes.length - 1]
        }
        var r = t(["and", "or", "not", "is"]),
            i = ["as", "assert", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "lambda", "pass", "raise", "return", "try", "while", "with", "yield", "in"],
            o = ["abs", "all", "any", "bin", "bool", "bytearray", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip", "__import__", "NotImplemented", "Ellipsis", "__debug__"];
        e.registerHelper("hintWords", "python", i.concat(o)), e.defineMode("python", function(a, l) {
            function s(e, t) {
                var r = e.sol() && "\\" != t.lastToken;
                if (r && (t.indent = e.indentation()), r && "py" == n(t).type) {
                    var i = n(t).offset;
                    if (e.eatSpace()) {
                        var o = e.indentation();
                        return o > i ? d(t) : o < i && p(e, t) && "#" != e.peek() && (t.errorToken = !0), null
                    }
                    var a = c(e, t);
                    return i > 0 && p(e, t) && (a += " " + g), a
                }
                return c(e, t)
            }
            function c(e, t) {
                if (e.eatSpace()) return null;
                if (e.match(/^#.*/)) return "comment";
                if (e.match(/^[0-9\.]/, !1)) {
                    var n = !1;
                    if (e.match(/^[\d_]*\.\d+(e[\+\-]?\d+)?/i) && (n = !0), e.match(/^[\d_]+\.\d*/) && (n = !0), e.match(/^\.\d+/) && (n = !0), n) return e.eat(/J/i), "number";
                    var i = !1;
                    if (e.match(/^0x[0-9a-f_]+/i) && (i = !0), e.match(/^0b[01_]+/i) && (i = !0), e.match(/^0o[0-7_]+/i) && (i = !0), e.match(/^[1-9][\d_]*(e[\+\-]?[\d_]+)?/) && (e.eat(/J/i), i = !0), e.match(/^0(?![\dx])/i) && (i = !0), i) return e.eat(/L/i), "number"
                }
                if (e.match(L)) return -1 !== e.current().toLowerCase().indexOf("f") ? (t.tokenize = u(e.current(), t.tokenize), t.tokenize(e, t)) : (t.tokenize = f(e.current()), t.tokenize(e, t));
                for (var o = 0; o < y.length; o++)
                    if (e.match(y[o])) return "operator";
                return e.match(v) ? "punctuation" : "." == t.lastToken && e.match(S) ? "property" : e.match(T) || e.match(r) ? "keyword" : e.match(M) ? "builtin" : e.match(/^(self|cls)\b/) ? "variable-2" : e.match(S) ? "def" == t.lastToken || "class" == t.lastToken ? "def" : "variable" : (e.next(), g)
            }
            function u(e, t) {
                function n(t, n) {
                    return t.match(e) ? (n.tokenize = r, o) : t.match("{") ? "punctuation" : t.match("}") ? (n.tokenize = r, "punctuation") : c(t, n)
                }
                function r(r, a) {
                    for (; !r.eol();)
                        if (r.eatWhile(/[^'"\{\}\\]/), r.eat("\\")) {
                            if (r.next(), i && r.eol()) return o
                        } else {
                            if (r.match(e)) return a.tokenize = t, o;
                            if (r.match("{{")) return o;
                            if (r.match("{", !1)) return a.tokenize = n, r.current() ? o : (r.next(), "punctuation");
                            if (r.match("}}")) return o;
                            if (r.match("}")) return g;
                            r.eat(/['"]/)
                        }
                    if (i) {
                        if (l.singleLineStringErrors) return g;
                        a.tokenize = t
                    }
                    return o
                }
                for (;
                    "rubf".indexOf(e.charAt(0).toLowerCase()) >= 0;) e = e.substr(1);
                var i = 1 == e.length,
                    o = "string";
                return r.isString = !0, r
            }
            function f(e) {
                function t(t, i) {
                    for (; !t.eol();)
                        if (t.eatWhile(/[^'"\\]/), t.eat("\\")) {
                            if (t.next(), n && t.eol()) return r
                        } else {
                            if (t.match(e)) return i.tokenize = s, r;
                            t.eat(/['"]/)
                        }
                    if (n) {
                        if (l.singleLineStringErrors) return g;
                        i.tokenize = s
                    }
                    return r
                }
                for (;
                    "rubf".indexOf(e.charAt(0).toLowerCase()) >= 0;) e = e.substr(1);
                var n = 1 == e.length,
                    r = "string";
                return t.isString = !0, t
            }
            function d(e) {
                for (;
                    "py" != n(e).type;) e.scopes.pop();
                e.scopes.push({
                    offset: n(e).offset + a.indentUnit,
                    type: "py",
                    align: null
                })
            }
            function h(e, t, n) {
                var r = e.match(/^([\s\[\{\(]|#.*)*$/, !1) ? null : e.column() + 1;
                t.scopes.push({
                    offset: t.indent + x,
                    type: n,
                    align: r
                })
            }
            function p(e, t) {
                for (var r = e.indentation(); t.scopes.length > 1 && n(t).offset > r;) {
                    if ("py" != n(t).type) return !0;
                    t.scopes.pop()
                }
                return n(t).offset != r
            }
            function m(e, t) {
                e.sol() && (t.beginningOfLine = !0);
                var r = t.tokenize(e, t),
                    i = e.current();
                if (t.beginningOfLine && "@" == i) return e.match(S, !1) ? "meta" : C ? "operator" : g;
                if (/\S/.test(i) && (t.beginningOfLine = !1), "variable" != r && "builtin" != r || "meta" != t.lastToken || (r = "meta"), "pass" != i && "return" != i || (t.dedent += 1), "lambda" == i && (t.lambda = !0), ":" != i || t.lambda || "py" != n(t).type || d(t), 1 == i.length && !/string|comment/.test(r)) {
                    var o = "[({".indexOf(i);
                    if (-1 != o && h(e, t, "])}".slice(o, o + 1)), -1 != (o = "])}".indexOf(i))) {
                        if (n(t).type != i) return g;
                        t.indent = t.scopes.pop().offset - x
                    }
                }
                return t.dedent > 0 && e.eol() && "py" == n(t).type && (t.scopes.length > 1 && t.scopes.pop(), t.dedent -= 1), r
            }
            for (var g = "error", v = l.delimiters || l.singleDelimiters || /^[\(\)\[\]\{\}@,:`=;\.\\]/, y = [l.singleOperators, l.doubleOperators, l.doubleDelimiters, l.tripleDelimiters, l.operators || /^([-+*/%\/&|^]=?|[<>=]+|\/\/=?|\*\*=?|!=|[~!@])/], b = 0; b < y.length; b++) y[b] || y.splice(b--, 1);
            var x = l.hangingIndent || a.indentUnit,
                k = i,
                w = o;
            l.extra_keywords != undefined && (k = k.concat(l.extra_keywords)), l.extra_builtins != undefined && (w = w.concat(l.extra_builtins));
            var C = !(l.version && Number(l.version) < 3);
            if (C) {
                var S = l.identifiers || /^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;
                k = k.concat(["nonlocal", "False", "True", "None", "async", "await"]), w = w.concat(["ascii", "bytes", "exec", "print"]);
                var L = new RegExp("^(([rbuf]|(br)|(fr))?('{3}|\"{3}|['\"]))", "i")
            } else {
                S = l.identifiers || /^[_A-Za-z][_A-Za-z0-9]*/;
                k = k.concat(["exec", "print"]), w = w.concat(["apply", "basestring", "buffer", "cmp", "coerce", "execfile", "file", "intern", "long", "raw_input", "reduce", "reload", "unichr", "unicode", "xrange", "False", "True", "None"]);
                L = new RegExp("^(([rubf]|(ur)|(br))?('{3}|\"{3}|['\"]))", "i")
            }
            var T = t(k),
                M = t(w);
            return {
                startState: function(e) {
                    return {
                        tokenize: s,
                        scopes: [{
                            offset: e || 0,
                            type: "py",
                            align: null
                        }],
                        indent: e || 0,
                        lastToken: null,
                        lambda: !1,
                        dedent: 0
                    }
                },
                token: function(e, t) {
                    var n = t.errorToken;
                    n && (t.errorToken = !1);
                    var r = m(e, t);
                    return r && "comment" != r && (t.lastToken = "keyword" == r || "punctuation" == r ? e.current() : r), "punctuation" == r && (r = null), e.eol() && t.lambda && (t.lambda = !1), n ? r + " " + g : r
                },
                indent: function(t, r) {
                    if (t.tokenize != s) return t.tokenize.isString ? e.Pass : 0;
                    var i = n(t),
                        o = i.type == r.charAt(0);
                    return null != i.align ? i.align - (o ? 1 : 0) : i.offset - (o ? x : 0)
                },
                electricInput: /^\s*[\}\]\)]$/,
                closeBrackets: {
                    triples: "'\""
                },
                lineComment: "#",
                fold: "indent"
            }
        }), e.defineMIME("text/x-python", "python");
        var a = function(e) {
            return e.split(" ")
        };
        e.defineMIME("text/x-cython", {
            name: "python",
            extra_keywords: a("by cdef cimport cpdef ctypedef enum except extern gil include nogil property public readonly struct union DEF IF ELIF ELSE")
        })
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        e.defineMode("ruby", function(e) {
            function t(e) {
                for (var t = {}, n = 0, r = e.length; n < r; ++n) t[e[n]] = !0;
                return t
            }
            function n(e, t, n) {
                return n.tokenize.push(e), e(t, n)
            }
            function r(e, t) {
                if (e.sol() && e.match("=begin") && e.eol()) return t.tokenize.push(c), "comment";
                if (e.eatSpace()) return null;
                var r, o = e.next();
                if ("`" == o || "'" == o || '"' == o) return n(l(o, "string", '"' == o || "`" == o), e, t);
                if ("/" == o) return i(e) ? n(l(o, "string-2", !0), e, t) : "operator";
                if ("%" == o) {
                    var a = "string",
                        f = !0;
                    e.eat("s") ? a = "atom" : e.eat(/[WQ]/) ? a = "string" : e.eat(/[r]/) ? a = "string-2" : e.eat(/[wxq]/) && (a = "string", f = !1);
                    var d = e.eat(/[^\w\s=]/);
                    return d ? (p.propertyIsEnumerable(d) && (d = p[d]), n(l(d, a, f, !0), e, t)) : "operator"
                }
                if ("#" == o) return e.skipToEnd(), "comment";
                if ("<" == o && (r = e.match(/^<-?[\`\"\']?([a-zA-Z_?]\w*)[\`\"\']?(?:;|$)/))) return n(s(r[1]), e, t);
                if ("0" == o) return e.eat("x") ? e.eatWhile(/[\da-fA-F]/) : e.eat("b") ? e.eatWhile(/[01]/) : e.eatWhile(/[0-7]/), "number";
                if (/\d/.test(o)) return e.match(/^[\d_]*(?:\.[\d_]+)?(?:[eE][+\-]?[\d_]+)?/), "number";
                if ("?" == o) {
                    for (; e.match(/^\\[CM]-/););
                    return e.eat("\\") ? e.eatWhile(/\w/) : e.next(), "string"
                }
                if (":" == o) return e.eat("'") ? n(l("'", "atom", !1), e, t) : e.eat('"') ? n(l('"', "atom", !0), e, t) : e.eat(/[\<\>]/) ? (e.eat(/[\<\>]/), "atom") : e.eat(/[\+\-\*\/\&\|\:\!]/) ? "atom" : e.eat(/[a-zA-Z$@_\xa1-\uffff]/) ? (e.eatWhile(/[\w$\xa1-\uffff]/), e.eat(/[\?\!\=]/), "atom") : "operator";
                if ("@" == o && e.match(/^@?[a-zA-Z_\xa1-\uffff]/)) return e.eat("@"), e.eatWhile(/[\w\xa1-\uffff]/), "variable-2";
                if ("$" == o) return e.eat(/[a-zA-Z_]/) ? e.eatWhile(/[\w]/) : e.eat(/\d/) ? e.eat(/\d/) : e.next(), "variable-3";
                if (/[a-zA-Z_\xa1-\uffff]/.test(o)) return e.eatWhile(/[\w\xa1-\uffff]/), e.eat(/[\?\!]/), e.eat(":") ? "atom" : "ident";
                if ("|" != o || !t.varList && "{" != t.lastTok && "do" != t.lastTok) {
                    if (/[\(\)\[\]{}\\;]/.test(o)) return u = o, null;
                    if ("-" == o && e.eat(">")) return "arrow";
                    if (/[=+\-\/*:\.^%<>~|]/.test(o)) {
                        var h = e.eatWhile(/[=+\-\/*:\.^%<>~|]/);
                        return "." != o || h || (u = "."), "operator"
                    }
                    return null
                }
                return u = "|", null
            }
            function i(e) {
                for (var t, n = e.pos, r = 0, i = !1, o = !1; null != (t = e.next());)
                    if (o) o = !1;
                    else {
                        if ("[{(".indexOf(t) > -1) r++;
                        else if ("]})".indexOf(t) > -1) {
                            if (--r < 0) break
                        } else if ("/" == t && 0 == r) {
                            i = !0;
                            break
                        }
                        o = "\\" == t
                    }
                return e.backUp(e.pos - n), i
            }
            function o(e) {
                return e || (e = 1),
                    function(t, n) {
                        if ("}" == t.peek()) {
                            if (1 == e) return n.tokenize.pop(), n.tokenize[n.tokenize.length - 1](t, n);
                            n.tokenize[n.tokenize.length - 1] = o(e - 1)
                        } else "{" == t.peek() && (n.tokenize[n.tokenize.length - 1] = o(e + 1));
                        return r(t, n)
                    }
            }
            function a() {
                var e = !1;
                return function(t, n) {
                    return e ? (n.tokenize.pop(), n.tokenize[n.tokenize.length - 1](t, n)) : (e = !0, r(t, n))
                }
            }
            function l(e, t, n, r) {
                return function(i, l) {
                    var s, c = !1;
                    for ("read-quoted-paused" === l.context.type && (l.context = l.context.prev, i.eat("}")); null != (s = i.next());) {
                        if (s == e && (r || !c)) {
                            l.tokenize.pop();
                            break
                        }
                        if (n && "#" == s && !c) {
                            if (i.eat("{")) {
                                "}" == e && (l.context = {
                                    prev: l.context,
                                    type: "read-quoted-paused"
                                }), l.tokenize.push(o());
                                break
                            }
                            if (/[@\$]/.test(i.peek())) {
                                l.tokenize.push(a());
                                break
                            }
                        }
                        c = !c && "\\" == s
                    }
                    return t
                }
            }
            function s(e) {
                return function(t, n) {
                    return t.match(e) ? n.tokenize.pop() : t.skipToEnd(), "string"
                }
            }
            function c(e, t) {
                return e.sol() && e.match("=end") && e.eol() && t.tokenize.pop(), e.skipToEnd(), "comment"
            }
            var u, f = t(["alias", "and", "BEGIN", "begin", "break", "case", "class", "def", "defined?", "do", "else", "elsif", "END", "end", "ensure", "false", "for", "if", "in", "module", "next", "not", "or", "redo", "rescue", "retry", "return", "self", "super", "then", "true", "undef", "unless", "until", "when", "while", "yield", "nil", "raise", "throw", "catch", "fail", "loop", "callcc", "caller", "lambda", "proc", "public", "protected", "private", "require", "load", "require_relative", "extend", "autoload", "__END__", "__FILE__", "__LINE__", "__dir__"]),
                d = t(["def", "class", "case", "for", "while", "until", "module", "then", "catch", "loop", "proc", "begin"]),
                h = t(["end", "until"]),
                p = {
                    "[": "]",
                    "{": "}",
                    "(": ")"
                };
            return {
                startState: function() {
                    return {
                        tokenize: [r],
                        indented: 0,
                        context: {
                            type: "top",
                            indented: -e.indentUnit
                        },
                        continuedLine: !1,
                        lastTok: null,
                        varList: !1
                    }
                },
                token: function(e, t) {
                    u = null, e.sol() && (t.indented = e.indentation());
                    var n, r = t.tokenize[t.tokenize.length - 1](e, t),
                        i = u;
                    if ("ident" == r) {
                        var o = e.current();
                        "keyword" == (r = "." == t.lastTok ? "property" : f.propertyIsEnumerable(e.current()) ? "keyword" : /^[A-Z]/.test(o) ? "tag" : "def" == t.lastTok || "class" == t.lastTok || t.varList ? "def" : "variable") && (i = o, d.propertyIsEnumerable(o) ? n = "indent" : h.propertyIsEnumerable(o) ? n = "dedent" : "if" != o && "unless" != o || e.column() != e.indentation() ? "do" == o && t.context.indented < t.indented && (n = "indent") : n = "indent")
                    }
                    return (u || r && "comment" != r) && (t.lastTok = i), "|" == u && (t.varList = !t.varList), "indent" == n || /[\(\[\{]/.test(u) ? t.context = {
                        prev: t.context,
                        type: u || r,
                        indented: t.indented
                    } : ("dedent" == n || /[\)\]\}]/.test(u)) && t.context.prev && (t.context = t.context.prev), e.eol() && (t.continuedLine = "\\" == u || "operator" == r), r
                },
                indent: function(t, n) {
                    if (t.tokenize[t.tokenize.length - 1] != r) return 0;
                    var i = n && n.charAt(0),
                        o = t.context,
                        a = o.type == p[i] || "keyword" == o.type && /^(?:end|until|else|elsif|when|rescue)\b/.test(n);
                    return o.indented + (a ? 0 : e.indentUnit) + (t.continuedLine ? e.indentUnit : 0)
                },
                electricInput: /^\s*(?:end|rescue|elsif|else|\})$/,
                lineComment: "#",
                fold: "indent"
            }
        }), e.defineMIME("text/x-ruby", "ruby")
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../css/css")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../css/css"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        e.defineMode("sass", function(t) {
            function n(e) {
                return new RegExp("^" + e.join("|"))
            }
            function r(e) {
                return !e.peek() || e.match(/\s+$/, !1)
            }
            function i(e, t) {
                var n = e.peek();
                return ")" === n ? (e.next(), t.tokenizer = u, "operator") : "(" === n ? (e.next(), e.eatSpace(), "operator") : "'" === n || '"' === n ? (t.tokenizer = a(e.next()), "string") : (t.tokenizer = a(")", !1), "string")
            }
            function o(e, t) {
                return function(n, r) {
                    return n.sol() && n.indentation() <= e ? (r.tokenizer = u, u(n, r)) : (t && n.skipTo("*/") ? (n.next(), n.next(), r.tokenizer = u) : n.skipToEnd(), "comment")
                }
            }
            function a(e, t) {
                function n(i, o) {
                    var a = i.next(),
                        s = i.peek(),
                        c = i.string.charAt(i.pos - 2);
                    return "\\" !== a && s === e || a === e && "\\" !== c ? (a !== e && t && i.next(), r(i) && (o.cursorHalf = 0), o.tokenizer = u, "string") : "#" === a && "{" === s ? (o.tokenizer = l(n), i.next(), "operator") : "string"
                }
                return null == t && (t = !0), n
            }
            function l(e) {
                return function(t, n) {
                    return "}" === t.peek() ? (t.next(), n.tokenizer = e, "operator") : u(t, n)
                }
            }
            function s(e) {
                if (0 == e.indentCount) {
                    e.indentCount++;
                    var n = e.scopes[0].offset + t.indentUnit;
                    e.scopes.unshift({
                        offset: n
                    })
                }
            }
            function c(e) {
                1 != e.scopes.length && e.scopes.shift()
            }
            function u(e, t) {
                var n = e.peek();
                if (e.match("/*")) return t.tokenizer = o(e.indentation(), !0), t.tokenizer(e, t);
                if (e.match("//")) return t.tokenizer = o(e.indentation(), !1), t.tokenizer(e, t);
                if (e.match("#{")) return t.tokenizer = l(u), "operator";
                if ('"' === n || "'" === n) return e.next(), t.tokenizer = a(n), "string";
                if (t.cursorHalf) {
                    if ("#" === n && (e.next(), e.match(/[0-9a-fA-F]{6}|[0-9a-fA-F]{3}/))) return r(e) && (t.cursorHalf = 0), "number";
                    if (e.match(/^-?[0-9\.]+/)) return r(e) && (t.cursorHalf = 0), "number";
                    if (e.match(/^(px|em|in)\b/)) return r(e) && (t.cursorHalf = 0), "unit";
                    if (e.match(y)) return r(e) && (t.cursorHalf = 0), "keyword";
                    if (e.match(/^url/) && "(" === e.peek()) return t.tokenizer = i, r(e) && (t.cursorHalf = 0), "atom";
                    if ("$" === n) return e.next(), e.eatWhile(/[\w-]/), r(e) && (t.cursorHalf = 0), "variable-2";
                    if ("!" === n) return e.next(), t.cursorHalf = 0, e.match(/^[\w]+/) ? "keyword" : "operator";
                    if (e.match(b)) return r(e) && (t.cursorHalf = 0), "operator";
                    if (e.eatWhile(/[\w-]/)) return r(e) && (t.cursorHalf = 0), d = e.current().toLowerCase(), g.hasOwnProperty(d) ? "atom" : m.hasOwnProperty(d) ? "keyword" : p.hasOwnProperty(d) ? (t.prevProp = e.current().toLowerCase(), "property") : "tag";
                    if (r(e)) return t.cursorHalf = 0, null
                } else {
                    if ("-" === n && e.match(/^-\w+-/)) return "meta";
                    if ("." === n) {
                        if (e.next(), e.match(/^[\w-]+/)) return s(t), "qualifier";
                        if ("#" === e.peek()) return s(t), "tag"
                    }
                    if ("#" === n) {
                        if (e.next(), e.match(/^[\w-]+/)) return s(t), "builtin";
                        if ("#" === e.peek()) return s(t), "tag"
                    }
                    if ("$" === n) return e.next(), e.eatWhile(/[\w-]/), "variable-2";
                    if (e.match(/^-?[0-9\.]+/)) return "number";
                    if (e.match(/^(px|em|in)\b/)) return "unit";
                    if (e.match(y)) return "keyword";
                    if (e.match(/^url/) && "(" === e.peek()) return t.tokenizer = i, "atom";
                    if ("=" === n && e.match(/^=[\w-]+/)) return s(t), "meta";
                    if ("+" === n && e.match(/^\+[\w-]+/)) return "variable-3";
                    if ("@" === n && e.match(/@extend/) && (e.match(/\s*[\w]/) || c(t)), e.match(/^@(else if|if|media|else|for|each|while|mixin|function)/)) return s(t), "def";
                    if ("@" === n) return e.next(), e.eatWhile(/[\w-]/), "def";
                    if (e.eatWhile(/[\w-]/)) {
                        if (e.match(/ *: *[\w-\+\$#!\("']/, !1)) {
                            d = e.current().toLowerCase();
                            var f = t.prevProp + "-" + d;
                            return p.hasOwnProperty(f) ? "property" : p.hasOwnProperty(d) ? (t.prevProp = d, "property") : v.hasOwnProperty(d) ? "property" : "tag"
                        }
                        return e.match(/ *:/, !1) ? (s(t), t.cursorHalf = 1, t.prevProp = e.current().toLowerCase(), "property") : e.match(/ *,/, !1) ? "tag" : (s(t), "tag")
                    }
                    if (":" === n) return e.match(x) ? "variable-3" : (e.next(), t.cursorHalf = 1, "operator")
                }
                return e.match(b) ? "operator" : (e.next(), null)
            }
            function f(e, n) {
                e.sol() && (n.indentCount = 0);
                var r = n.tokenizer(e, n),
                    i = e.current();
                if ("@return" !== i && "}" !== i || c(n), null !== r) {
                    for (var o = e.pos - i.length + t.indentUnit * n.indentCount, a = [], l = 0; l < n.scopes.length; l++) {
                        var s = n.scopes[l];
                        s.offset <= o && a.push(s)
                    }
                    n.scopes = a
                }
                return r
            }
            var d, h = e.mimeModes["text/css"],
                p = h.propertyKeywords || {},
                m = h.colorKeywords || {},
                g = h.valueKeywords || {},
                v = h.fontProperties || {},
                y = new RegExp("^" + ["true", "false", "null", "auto"].join("|")),
                b = n(["\\(", "\\)", "=", ">", "<", "==", ">=", "<=", "\\+", "-", "\\!=", "/", "\\*", "%", "and", "or", "not", ";", "\\{", "\\}", ":"]),
                x = /^::?[a-zA-Z_][\w\-]*/;
            return {
                startState: function() {
                    return {
                        tokenizer: u,
                        scopes: [{
                            offset: 0,
                            type: "sass"
                        }],
                        indentCount: 0,
                        cursorHalf: 0,
                        definedVars: [],
                        definedMixins: []
                    }
                },
                token: function(e, t) {
                    var n = f(e, t);
                    return t.lastToken = {
                        style: n,
                        content: e.current()
                    }, n
                },
                indent: function(e) {
                    return e.scopes[0].offset
                }
            }
        }, "css"), e.defineMIME("text/x-sass", "sass")
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    // Slim Highlighting for CodeMirror copyright (c) HicknHack Software Gmbh
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../htmlmixed/htmlmixed"), require("../ruby/ruby")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../htmlmixed/htmlmixed", "../ruby/ruby"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        e.defineMode("slim", function(t) {
            function n(e, t, n) {
                var r = function(r, i) {
                    return i.tokenize = t, r.pos < e ? (r.pos = e, n) : i.tokenize(r, i)
                };
                return function(e, n) {
                    return n.tokenize = r, t(e, n)
                }
            }
            function r(e, t, r, i, o) {
                var a = e.current(),
                    l = a.search(r);
                return l > -1 && (t.tokenize = n(e.pos, t.tokenize, o), e.backUp(a.length - l - i)), o
            }
            function i(e, t) {
                e.stack = {
                    parent: e.stack,
                    style: "continuation",
                    indented: t,
                    tokenize: e.line
                }, e.line = e.tokenize
            }
            function o(e) {
                e.line == e.tokenize && (e.line = e.stack.tokenize, e.stack = e.stack.parent)
            }
            function a(e, t) {
                return function(n, r) {
                    if (o(r), n.match(/^\\$/)) return i(r, e), "lineContinuation";
                    var a = t(n, r);
                    return n.eol() && n.current().match(/(?:^|[^\\])(?:\\\\)*\\$/) && n.backUp(1), a
                }
            }
            function l(e, t) {
                return function(n, r) {
                    o(r);
                    var a = t(n, r);
                    return n.eol() && n.current().match(/,$/) && i(r, e), a
                }
            }
            function s(e, t) {
                return function(n, r) {
                    return n.peek() == e && 1 == r.rubyState.tokenize.length ? (n.next(), r.tokenize = t, "closeAttributeTag") : u(n, r)
                }
            }
            function c(t) {
                var n, r = function(e, r) {
                    if (1 == r.rubyState.tokenize.length && !r.rubyState.context.prev) {
                        if (e.backUp(1), e.eatSpace()) return r.rubyState = n, r.tokenize = t, t(e, r);
                        e.next()
                    }
                    return u(e, r)
                };
                return function(t, i) {
                    return n = i.rubyState, i.rubyState = e.startState(W), i.tokenize = r, u(t, i)
                }
            }
            function u(e, t) {
                return W.token(e, t.rubyState)
            }
            function f(e, t) {
                return e.match(/^\\$/) ? "lineContinuation" : d(e, t)
            }
            function d(e, t) {
                return e.match(/^#\{/) ? (t.tokenize = s("}", t.tokenize), null) : r(e, t, /[^\\]#\{/, 1, _.token(e, t.htmlState))
            }
            function h(e) {
                return function(t, n) {
                    var r = f(t, n);
                    return t.eol() && (n.tokenize = e), r
                }
            }
            function p(e, t, n) {
                return t.stack = {
                    parent: t.stack,
                    style: "html",
                    indented: e.column() + n,
                    tokenize: t.line
                }, t.line = t.tokenize = d, null
            }
            function m(e, t) {
                return e.skipToEnd(), t.stack.style
            }
            function g(e, t) {
                return t.stack = {
                    parent: t.stack,
                    style: "comment",
                    indented: t.indented + 1,
                    tokenize: t.line
                }, t.line = m, m(e, t)
            }
            function v(e, t) {
                return e.eat(t.stack.endQuote) ? (t.line = t.stack.line, t.tokenize = t.stack.tokenize, t.stack = t.stack.parent, null) : e.match(X) ? (t.tokenize = y, "slimAttribute") : (e.next(), null)
            }
            function y(e, t) {
                return e.match(/^==?/) ? (t.tokenize = b, null) : v(e, t)
            }
            function b(e, t) {
                var n = e.peek();
                return '"' == n || "'" == n ? (t.tokenize = I(n, "string", !0, !1, v), e.next(), t.tokenize(e, t)) : "[" == n ? c(v)(e, t) : e.match(/^(true|false|nil)\b/) ? (t.tokenize = v, "keyword") : c(v)(e, t)
            }
            function x(e, t, n) {
                return e.stack = {
                    parent: e.stack,
                    style: "wrapper",
                    indented: e.indented + 1,
                    tokenize: n,
                    line: e.line,
                    endQuote: t
                }, e.line = e.tokenize = v, null
            }
            function k(t, n) {
                if (t.match(/^#\{/)) return n.tokenize = s("}", n.tokenize), null;
                var r = new e.StringStream(t.string.slice(n.stack.indented), t.tabSize);
                r.pos = t.pos - n.stack.indented, r.start = t.start - n.stack.indented, r.lastColumnPos = t.lastColumnPos - n.stack.indented, r.lastColumnValue = t.lastColumnValue - n.stack.indented;
                var i = n.subMode.token(r, n.subState);
                return t.pos = r.pos + n.stack.indented, i
            }
            function w(e, t) {
                return t.stack.indented = e.column(), t.line = t.tokenize = k, t.tokenize(e, t)
            }
            function C(n) {
                var r = H[n],
                    i = e.mimeModes[r];
                if (i) return e.getMode(t, i);
                var o = e.modes[r];
                return o ? o(t, {
                    name: r
                }) : e.getMode(t, "null")
            }
            function S(e) {
                return R.hasOwnProperty(e) ? R[e] : R[e] = C(e)
            }
            function L(t, n) {
                var r = S(t),
                    i = e.startState(r);
                return n.subMode = r, n.subState = i, n.stack = {
                    parent: n.stack,
                    style: "sub",
                    indented: n.indented + 1,
                    tokenize: n.line
                }, n.line = n.tokenize = w, "slimSubmode"
            }
            function T(e) {
                return e.skipToEnd(), "slimDoctype"
            }
            function M(e, t) {
                if ("<" == e.peek()) return (t.tokenize = h(t.tokenize))(e, t);
                if (e.match(/^[|']/)) return p(e, t, 1);
                if (e.match(/^\/(!|\[\w+])?/)) return g(e, t);
                if (e.match(/^(-|==?[<>]?)/)) return t.tokenize = a(e.column(), l(e.column(), u)), "slimSwitch";
                if (e.match(/^doctype\b/)) return t.tokenize = T, "keyword";
                var n = e.match(B);
                return n ? L(n[1], t) : A(e, t)
            }
            function z(e, t) {
                return t.startOfLine ? M(e, t) : A(e, t)
            }
            function A(e, t) {
                return e.eat("*") ? (t.tokenize = c(O), null) : e.match(V) ? (t.tokenize = O, "slimTag") : N(e, t)
            }
            function O(e, t) {
                return e.match(/^(<>?|><?)/) ? (t.tokenize = N, null) : N(e, t)
            }
            function N(e, t) {
                return e.match(Z) ? (t.tokenize = N, "slimId") : e.match(Y) ? (t.tokenize = N, "slimClass") : P(e, t)
            }
            function P(e, t) {
                return e.match(/^([\[\{\(])/) ? x(t, U[RegExp.$1], P) : e.match(G) ? (t.tokenize = E, "slimAttribute") : "*" == e.peek() ? (e.next(), t.tokenize = c(D), null) : D(e, t)
            }
            function E(e, t) {
                return e.match(/^==?/) ? (t.tokenize = F, null) : P(e, t)
            }
            function F(e, t) {
                var n = e.peek();
                return '"' == n || "'" == n ? (t.tokenize = I(n, "string", !0, !1, P), e.next(), t.tokenize(e, t)) : "[" == n ? c(P)(e, t) : ":" == n ? c(j)(e, t) : e.match(/^(true|false|nil)\b/) ? (t.tokenize = P, "keyword") : c(P)(e, t)
            }
            function j(e, t) {
                return e.backUp(1), e.match(/^[^\s],(?=:)/) ? (t.tokenize = c(j), null) : (e.next(), P(e, t))
            }
            function I(e, t, n, r, a) {
                return function(l, c) {
                    o(c);
                    var u = 0 == l.current().length;
                    if (l.match(/^\\$/, u)) return u ? (i(c, c.indented), "lineContinuation") : t;
                    if (l.match(/^#\{/, u)) return u ? (c.tokenize = s("}", c.tokenize), null) : t;
                    for (var f, d = !1; null != (f = l.next());) {
                        if (f == e && (r || !d)) {
                            c.tokenize = a;
                            break
                        }
                        if (n && "#" == f && !d && l.eat("{")) {
                            l.backUp(2);
                            break
                        }
                        d = !d && "\\" == f
                    }
                    return l.eol() && d && l.backUp(1), t
                }
            }
            function D(e, t) {
                return e.match(/^==?/) ? (t.tokenize = u, "slimSwitch") : e.match(/^\/$/) ? (t.tokenize = z, null) : e.match(/^:/) ? (t.tokenize = A, "slimSwitch") : (p(e, t, 0), t.tokenize(e, t))
            }
            var _ = e.getMode(t, {
                    name: "htmlmixed"
                }),
                W = e.getMode(t, "ruby"),
                R = {
                    html: _,
                    ruby: W
                },
                H = {
                    ruby: "ruby",
                    javascript: "javascript",
                    css: "text/css",
                    sass: "text/x-sass",
                    scss: "text/x-scss",
                    less: "text/x-less",
                    styl: "text/x-styl",
                    coffee: "coffeescript",
                    asciidoc: "text/x-asciidoc",
                    markdown: "text/x-markdown",
                    textile: "text/x-textile",
                    creole: "text/x-creole",
                    wiki: "text/x-wiki",
                    mediawiki: "text/x-mediawiki",
                    rdoc: "text/x-rdoc",
                    builder: "text/x-builder",
                    nokogiri: "text/x-nokogiri",
                    erb: "application/x-erb"
                },
                B = function(e) {
                    var t = [];
                    for (var n in e) t.push(n);
                    return new RegExp("^(" + t.join("|") + "):")
                }(H),
                q = {
                    commentLine: "comment",
                    slimSwitch: "operator special",
                    slimTag: "tag",
                    slimId: "attribute def",
                    slimClass: "attribute qualifier",
                    slimAttribute: "attribute",
                    slimSubmode: "keyword special",
                    closeAttributeTag: null,
                    slimDoctype: null,
                    lineContinuation: null
                },
                U = {
                    "{": "}",
                    "[": "]",
                    "(": ")"
                },
                $ = "_a-zA-Z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd",
                K = $ + "\\-0-9\xb7\u0300-\u036f\u203f-\u2040",
                V = new RegExp("^[:" + $ + "](?::[" + K + "]|[" + K + "]*)"),
                G = new RegExp("^[:" + $ + "][:\\." + K + "]*(?=\\s*=)"),
                X = new RegExp("^[:" + $ + "][:\\." + K + "]*"),
                Y = /^\.-?[_a-zA-Z]+[\w\-]*/,
                Z = /^#[_a-zA-Z]+[\w\-]*/,
                Q = {
                    startState: function() {
                        return {
                            htmlState: e.startState(_),
                            rubyState: e.startState(W),
                            stack: null,
                            last: null,
                            tokenize: z,
                            line: z,
                            indented: 0
                        }
                    },
                    copyState: function(t) {
                        return {
                            htmlState: e.copyState(_, t.htmlState),
                            rubyState: e.copyState(W, t.rubyState),
                            subMode: t.subMode,
                            subState: t.subMode && e.copyState(t.subMode, t.subState),
                            stack: t.stack,
                            last: t.last,
                            tokenize: t.tokenize,
                            line: t.line
                        }
                    },
                    token: function(e, t) {
                        if (e.sol())
                            for (t.indented = e.indentation(), t.startOfLine = !0, t.tokenize = t.line; t.stack && t.stack.indented > t.indented && "slimSubmode" != t.last;) t.line = t.tokenize = t.stack.tokenize, t.stack = t.stack.parent, t.subMode = null, t.subState = null;
                        if (e.eatSpace()) return null;
                        var n = t.tokenize(e, t);
                        return t.startOfLine = !1, n && (t.last = n), q.hasOwnProperty(n) ? q[n] : n
                    },
                    blankLine: function(e) {
                        if (e.subMode && e.subMode.blankLine) return e.subMode.blankLine(e.subState)
                    },
                    innerMode: function(e) {
                        return e.subMode ? {
                            state: e.subState,
                            mode: e.subMode
                        } : {
                            state: e,
                            mode: Q
                        }
                    }
                };
            return Q
        }, "htmlmixed", "ruby"), e.defineMIME("text/x-slim", "slim"), e.defineMIME("application/x-slim", "slim")
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        function t(e) {
            return e = e.sort(function(e, t) {
                return t > e
            }), new RegExp("^((" + e.join(")|(") + "))\\b")
        }
        function n(e) {
            for (var t = {}, n = 0; n < e.length; ++n) t[e[n]] = !0;
            return t
        }
        function r(e) {
            return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        }
        e.defineMode("stylus", function(e) {
            function g(e, t) {
                if (ie = e.string.match(/(^[\w-]+\s*=\s*$)|(^\s*[\w-]+\s*=\s*[\w-])|(^\s*(\.|#|@|\$|\&|\[|\d|\+|::?|\{|\>|~|\/)?\s*[\w-]*([a-z0-9-]|\*|\/\*)(\(|,)?)/), t.context.line.firstWord = ie ? ie[0].replace(/^\s*/, "") : "", t.context.line.indent = e.indentation(), I = e.peek(), e.match("//")) return e.skipToEnd(), ["comment", "comment"];
                if (e.match("/*")) return t.tokenize = v, v(e, t);
                if ('"' == I || "'" == I) return e.next(), t.tokenize = y(I), t.tokenize(e, t);
                if ("@" == I) return e.next(), e.eatWhile(/[\w\\-]/), ["def", e.current()];
                if ("#" == I) {
                    if (e.next(), e.match(/^[0-9a-f]{3}([0-9a-f]([0-9a-f]{2}){0,2})?\b/i)) return ["atom", "atom"];
                    if (e.match(/^[a-z][\w-]*/i)) return ["builtin", "hash"]
                }
                return e.match(ne) ? ["meta", "vendor-prefixes"] : e.match(/^-?[0-9]?\.?[0-9]/) ? (e.eatWhile(/[a-z%]/i), ["number", "unit"]) : "!" == I ? (e.next(), [e.match(/^(important|optional)/i) ? "keyword" : "operator", "important"]) : "." == I && e.match(/^\.[a-z][\w-]*/i) ? ["qualifier", "qualifier"] : e.match(X) ? ("(" == e.peek() && (t.tokenize = b), ["property", "word"]) : e.match(/^[a-z][\w-]*\(/i) ? (e.backUp(1), ["keyword", "mixin"]) : e.match(/^(\+|-)[a-z][\w-]*\(/i) ? (e.backUp(1), ["keyword", "block-mixin"]) : e.string.match(/^\s*&/) && e.match(/^[-_]+[a-z][\w-]*/) ? ["qualifier", "qualifier"] : e.match(/^(\/|&)(-|_|:|\.|#|[a-z])/) ? (e.backUp(1), ["variable-3", "reference"]) : e.match(/^&{1}\s*$/) ? ["variable-3", "reference"] : e.match(ee) ? ["operator", "operator"] : e.match(/^\$?[-_]*[a-z0-9]+[\w-]*/i) ? e.match(/^(\.|\[)[\w-\'\"\]]+/i, !1) && !L(e.current()) ? (e.match(/\./), ["variable-2", "variable-name"]) : ["variable-2", "word"] : e.match(J) ? ["operator", e.current()] : /[:;,{}\[\]\(\)]/.test(I) ? (e.next(), [null, I]) : (e.next(), [null, null])
            }
            function v(e, t) {
                for (var n, r = !1; null != (n = e.next());) {
                    if (r && "/" == n) {
                        t.tokenize = null;
                        break
                    }
                    r = "*" == n
                }
                return ["comment", "comment"]
            }
            function y(e) {
                return function(t, n) {
                    for (var r, i = !1; null != (r = t.next());) {
                        if (r == e && !i) {
                            ")" == e && t.backUp(1);
                            break
                        }
                        i = !i && "\\" == r
                    }
                    return (r == e || !i && ")" != e) && (n.tokenize = null), ["string", "string"]
                }
            }
            function b(e, t) {
                return e.next(), e.match(/\s*[\"\')]/, !1) ? t.tokenize = null : t.tokenize = y(")"), [null, "("]
            }
            function x(e, t, n, r) {
                this.type = e, this.indent = t, this.prev = n, this.line = r || {
                    firstWord: "",
                    indent: 0
                }
            }
            function k(e, t, n, r) {
                return r = r >= 0 ? r : R, e.context = new x(n, t.indentation() + r, e.context), n
            }
            function w(e, t) {
                var n = e.context.indent - R;
                return t = t || !1, e.context = e.context.prev, t && (e.context.indent = n), e.context.type
            }
            function C(e, t, n) {
                return oe[n.context.type](e, t, n)
            }
            function S(e, t, n, r) {
                for (var i = r || 1; i > 0; i--) n.context = n.context.prev;
                return C(e, t, n)
            }
            function L(e) {
                return e.toLowerCase() in B
            }
            function T(e) {
                return (e = e.toLowerCase()) in U || e in Q
            }
            function M(e) {
                return e.toLowerCase() in te
            }
            function z(e) {
                return e.toLowerCase().match(ne)
            }
            function A(e) {
                var t = e.toLowerCase(),
                    n = "variable-2";
                return L(e) ? n = "tag" : M(e) ? n = "block-keyword" : T(e) ? n = "property" : t in K || t in re ? n = "atom" : "return" == t || t in V ? n = "keyword" : e.match(/^[A-Z]/) && (n = "string"), n
            }
            function O(e, t) {
                return F(t) && ("{" == e || "]" == e || "hash" == e || "qualifier" == e) || "block-mixin" == e
            }
            function N(e, t) {
                return "{" == e && t.match(/^\s*\$?[\w-]+/i, !1)
            }
            function P(e, t) {
                return ":" == e && t.match(/^[a-z-]+/, !1)
            }
            function E(e) {
                return e.sol() || e.string.match(new RegExp("^\\s*" + r(e.current())))
            }
            function F(e) {
                return e.eol() || e.match(/^\s*$/, !1)
            }
            function j(e) {
                var t = /^\s*[-_]*[a-z0-9]+[\w-]*/i,
                    n = "string" == typeof e ? e.match(t) : e.string.match(t);
                return n ? n[0].replace(/^\s*/, "") : ""
            }
            for (var I, D, _, W, R = e.indentUnit, H = "", B = n(i), q = /^(a|b|i|s|col|em)$/i, U = n(s), $ = n(c), K = n(d), V = n(f), G = n(o), X = t(o), Y = n(l), Z = n(a), Q = n(u), J = /^\s*([.]{2,3}|&&|\|\||\*\*|[?!=:]?=|[-+*\/%<>]=?|\?:|\~)/, ee = t(h), te = n(p), ne = new RegExp(/^\-(moz|ms|o|webkit)-/i), re = n(m), ie = "", oe = {}; H.length < R;) H += " ";
            return oe.block = function(e, t, n) {
                if ("comment" == e && E(t) || "," == e && F(t) || "mixin" == e) return k(n, t, "block", 0);
                if (N(e, t)) return k(n, t, "interpolation");
                if (F(t) && "]" == e && !/^\s*(\.|#|:|\[|\*|&)/.test(t.string) && !L(j(t))) return k(n, t, "block", 0);
                if (O(e, t)) return k(n, t, "block");
                if ("}" == e && F(t)) return k(n, t, "block", 0);
                if ("variable-name" == e) return t.string.match(/^\s?\$[\w-\.\[\]\'\"]+$/) || M(j(t)) ? k(n, t, "variableName") : k(n, t, "variableName", 0);
                if ("=" == e) return F(t) || M(j(t)) ? k(n, t, "block") : k(n, t, "block", 0);
                if ("*" == e && (F(t) || t.match(/\s*(,|\.|#|\[|:|{)/, !1))) return W = "tag", k(n, t, "block");
                if (P(e, t)) return k(n, t, "pseudo");
                if (/@(font-face|media|supports|(-moz-)?document)/.test(e)) return k(n, t, F(t) ? "block" : "atBlock");
                if (/@(-(moz|ms|o|webkit)-)?keyframes$/.test(e)) return k(n, t, "keyframes");
                if (/@extends?/.test(e)) return k(n, t, "extend", 0);
                if (e && "@" == e.charAt(0)) return t.indentation() > 0 && T(t.current().slice(1)) ? (W = "variable-2", "block") : /(@import|@require|@charset)/.test(e) ? k(n, t, "block", 0) : k(n, t, "block");
                if ("reference" == e && F(t)) return k(n, t, "block");
                if ("(" == e) return k(n, t, "parens");
                if ("vendor-prefixes" == e) return k(n, t, "vendorPrefixes");
                if ("word" == e) {
                    var r = t.current();
                    if ("property" == (W = A(r))) return E(t) ? k(n, t, "block", 0) : (W = "atom", "block");
                    if ("tag" == W) {
                        if (/embed|menu|pre|progress|sub|table/.test(r) && T(j(t))) return W = "atom", "block";
                        if (t.string.match(new RegExp("\\[\\s*" + r + "|" + r + "\\s*\\]"))) return W = "atom", "block";
                        if (q.test(r) && (E(t) && t.string.match(/=/) || !E(t) && !t.string.match(/^(\s*\.|#|\&|\[|\/|>|\*)/) && !L(j(t)))) return W = "variable-2", M(j(t)) ? "block" : k(n, t, "block", 0);
                        if (F(t)) return k(n, t, "block")
                    }
                    if ("block-keyword" == W) return W = "keyword", t.current(/(if|unless)/) && !E(t) ? "block" : k(n, t, "block");
                    if ("return" == r) return k(n, t, "block", 0);
                    if ("variable-2" == W && t.string.match(/^\s?\$[\w-\.\[\]\'\"]+$/)) return k(n, t, "block")
                }
                return n.context.type
            }, oe.parens = function(e, t, n) {
                if ("(" == e) return k(n, t, "parens");
                if (")" == e) return "parens" == n.context.prev.type ? w(n) : t.string.match(/^[a-z][\w-]*\(/i) && F(t) || M(j(t)) || /(\.|#|:|\[|\*|&|>|~|\+|\/)/.test(j(t)) || !t.string.match(/^-?[a-z][\w-\.\[\]\'\"]*\s*=/) && L(j(t)) ? k(n, t, "block") : t.string.match(/^[\$-]?[a-z][\w-\.\[\]\'\"]*\s*=/) || t.string.match(/^\s*(\(|\)|[0-9])/) || t.string.match(/^\s+[a-z][\w-]*\(/i) || t.string.match(/^\s+[\$-]?[a-z]/i) ? k(n, t, "block", 0) : F(t) ? k(n, t, "block") : k(n, t, "block", 0);
                if (e && "@" == e.charAt(0) && T(t.current().slice(1)) && (W = "variable-2"), "word" == e) {
                    var r = t.current();
                    "tag" == (W = A(r)) && q.test(r) && (W = "variable-2"), "property" != W && "to" != r || (W = "atom")
                }
                return "variable-name" == e ? k(n, t, "variableName") : P(e, t) ? k(n, t, "pseudo") : n.context.type
            }, oe.vendorPrefixes = function(e, t, n) {
                return "word" == e ? (W = "property", k(n, t, "block", 0)) : w(n)
            }, oe.pseudo = function(e, t, n) {
                return T(j(t.string)) ? S(e, t, n) : (t.match(/^[a-z-]+/), W = "variable-3", F(t) ? k(n, t, "block") : w(n))
            }, oe.atBlock = function(e, t, n) {
                if ("(" == e) return k(n, t, "atBlock_parens");
                if (O(e, t)) return k(n, t, "block");
                if (N(e, t)) return k(n, t, "interpolation");
                if ("word" == e) {
                    var r = t.current().toLowerCase();
                    if ("tag" == (W = /^(only|not|and|or)$/.test(r) ? "keyword" : G.hasOwnProperty(r) ? "tag" : Z.hasOwnProperty(r) ? "attribute" : Y.hasOwnProperty(r) ? "property" : $.hasOwnProperty(r) ? "string-2" : A(t.current())) && F(t)) return k(n, t, "block")
                }
                return "operator" == e && /^(not|and|or)$/.test(t.current()) && (W = "keyword"), n.context.type
            }, oe.atBlock_parens = function(e, t, n) {
                if ("{" == e || "}" == e) return n.context.type;
                if (")" == e) return F(t) ? k(n, t, "block") : k(n, t, "atBlock");
                if ("word" == e) {
                    var r = t.current().toLowerCase();
                    return W = A(r), /^(max|min)/.test(r) && (W = "property"), "tag" == W && (W = q.test(r) ? "variable-2" : "atom"), n.context.type
                }
                return oe.atBlock(e, t, n)
            }, oe.keyframes = function(e, t, n) {
                return "0" == t.indentation() && ("}" == e && E(t) || "]" == e || "hash" == e || "qualifier" == e || L(t.current())) ? S(e, t, n) : "{" == e ? k(n, t, "keyframes") : "}" == e ? E(t) ? w(n, !0) : k(n, t, "keyframes") : "unit" == e && /^[0-9]+\%$/.test(t.current()) ? k(n, t, "keyframes") : "word" == e && "block-keyword" == (W = A(t.current())) ? (W = "keyword", k(n, t, "keyframes")) : /@(font-face|media|supports|(-moz-)?document)/.test(e) ? k(n, t, F(t) ? "block" : "atBlock") : "mixin" == e ? k(n, t, "block", 0) : n.context.type
            }, oe.interpolation = function(e, t, n) {
                return "{" == e && w(n) && k(n, t, "block"), "}" == e ? t.string.match(/^\s*(\.|#|:|\[|\*|&|>|~|\+|\/)/i) || t.string.match(/^\s*[a-z]/i) && L(j(t)) ? k(n, t, "block") : !t.string.match(/^(\{|\s*\&)/) || t.match(/\s*[\w-]/, !1) ? k(n, t, "block", 0) : k(n, t, "block") : "variable-name" == e ? k(n, t, "variableName", 0) : ("word" == e && "tag" == (W = A(t.current())) && (W = "atom"), n.context.type)
            }, oe.extend = function(e, t, n) {
                return "[" == e || "=" == e ? "extend" : "]" == e ? w(n) : "word" == e ? (W = A(t.current()), "extend") : w(n)
            }, oe.variableName = function(e, t, n) {
                return "string" == e || "[" == e || "]" == e || t.current().match(/^(\.|\$)/) ? (t.current().match(/^\.[\w-]+/i) && (W = "variable-2"), "variableName") : S(e, t, n)
            }, {
                startState: function(e) {
                    return {
                        tokenize: null,
                        state: "block",
                        context: new x("block", e || 0, null)
                    }
                },
                token: function(e, t) {
                    return !t.tokenize && e.eatSpace() ? null : ((D = (t.tokenize || g)(e, t)) && "object" == typeof D && (_ = D[1], D = D[0]), W = D, t.state = oe[t.state](_, e, t), W)
                },
                indent: function(e, t, n) {
                    var r = e.context,
                        i = t && t.charAt(0),
                        o = r.indent,
                        a = j(t),
                        l = n.match(/^\s*/)[0].replace(/\t/g, H).length,
                        s = e.context.prev ? e.context.prev.line.firstWord : "",
                        c = e.context.prev ? e.context.prev.line.indent : l;
                    return r.prev && ("}" == i && ("block" == r.type || "atBlock" == r.type || "keyframes" == r.type) || ")" == i && ("parens" == r.type || "atBlock_parens" == r.type) || "{" == i && "at" == r.type) ? o = r.indent - R : /(\})/.test(i) || (/@|\$|\d/.test(i) || /^\{/.test(t) || /^\s*\/(\/|\*)/.test(t) || /^\s*\/\*/.test(s) || /^\s*[\w-\.\[\]\'\"]+\s*(\?|:|\+)?=/i.test(t) || /^(\+|-)?[a-z][\w-]*\(/i.test(t) || /^return/.test(t) || M(a) ? o = l : /(\.|#|:|\[|\*|&|>|~|\+|\/)/.test(i) || L(a) ? o = /\,\s*$/.test(s) ? c : /^\s+/.test(n) && (/(\.|#|:|\[|\*|&|>|~|\+|\/)/.test(s) || L(s)) ? l <= c ? c : c + R : l : /,\s*$/.test(n) || !z(a) && !T(a) || (o = M(s) ? l <= c ? c : c + R : /^\{/.test(s) ? l <= c ? l : c + R : z(s) || T(s) ? l >= c ? c : l : /^(\.|#|:|\[|\*|&|@|\+|\-|>|~|\/)/.test(s) || /=\s*$/.test(s) || L(s) || /^\$[\w-\.\[\]\'\"]/.test(s) ? c + R : l)), o
                },
                electricChars: "}",
                lineComment: "//",
                fold: "indent"
            }
        });
        var i = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "bgsound", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "nav", "nobr", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "var", "video"],
            o = ["domain", "regexp", "url", "url-prefix"],
            a = ["all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed"],
            l = ["width", "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width", "device-height", "min-device-height", "max-device-height", "aspect-ratio", "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome", "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid"],
            s = ["align-content", "align-items", "align-self", "alignment-adjust", "alignment-baseline", "anchor-point", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "appearance", "azimuth", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "baseline-shift", "binding", "bleed", "bookmark-label", "bookmark-level", "bookmark-state", "bookmark-target", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "color", "color-profile", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "crop", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "dominant-baseline", "drop-initial-after-adjust", "drop-initial-after-align", "drop-initial-before-adjust", "drop-initial-before-align", "drop-initial-size", "drop-initial-value", "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "float-offset", "flow-from", "flow-into", "font", "font-feature-settings", "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-weight", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-position", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "inline-box-align", "justify-content", "left", "letter-spacing", "line-break", "line-height", "line-stacking", "line-stacking-ruby", "line-stacking-shift", "line-stacking-strategy", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-offset", "marks", "marquee-direction", "marquee-loop", "marquee-play-count", "marquee-speed", "marquee-style", "max-height", "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "page-policy", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "play-during", "position", "presentation-level", "punctuation-trim", "quotes", "region-break-after", "region-break-before", "region-break-inside", "region-fragment", "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness", "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "shape-image-threshold", "shape-inside", "shape-margin", "shape-outside", "size", "speak", "speak-as", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set", "tab-size", "table-layout", "target", "target-name", "target-new", "target-position", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-height", "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow", "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position", "text-wrap", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "volume", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "z-index", "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events", "color-interpolation", "color-interpolation-filters", "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering", "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering", "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal", "glyph-orientation-vertical", "text-anchor", "writing-mode", "font-smoothing", "osx-font-smoothing"],
            c = ["scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-3d-light-color", "scrollbar-track-color", "shape-inside", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "zoom"],
            u = ["font-family", "src", "unicode-range", "font-variant", "font-feature-settings", "font-stretch", "font-weight", "font-style"],
            f = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"],
            d = ["above", "absolute", "activeborder", "additive", "activecaption", "afar", "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate", "always", "amharic", "amharic-abegede", "antialiased", "appworkspace", "arabic-indic", "armenian", "asterisks", "attr", "auto", "avoid", "avoid-column", "avoid-page", "avoid-region", "background", "backwards", "baseline", "below", "bidi-override", "binary", "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "cambodian", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-decimal", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote", "col-resize", "collapse", "column", "compact", "condensed", "contain", "content", "contents", "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "cyclic", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "destination-atop", "destination-in", "destination-out", "destination-over", "devanagari", "disc", "discard", "disclosure-closed", "disclosure-open", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede", "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er", "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er", "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", "ethiopic-halehame-gez", "ethiopic-halehame-om-et", "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et", "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig", "ethiopic-numeric", "ew-resize", "expanded", "extends", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "flex", "footnotes", "forwards", "from", "geometricPrecision", "georgian", "graytext", "groove", "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hebrew", "help", "hidden", "hide", "higher", "highlight", "highlighttext", "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-flex", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "japanese-formal", "japanese-informal", "justify", "kannada", "katakana", "katakana-iroha", "keep-all", "khmer", "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal", "landscape", "lao", "large", "larger", "left", "level", "lighter", "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian", "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lower-roman", "lowercase", "ltr", "malayalam", "match", "matrix", "matrix3d", "media-controls-background", "media-current-time-display", "media-fullscreen-button", "media-mute-button", "media-play-button", "media-return-to-realtime-button", "media-rewind-button", "media-seek-back-button", "media-seek-forward-button", "media-slider", "media-sliderthumb", "media-time-remaining-display", "media-volume-slider", "media-volume-slider-container", "media-volume-sliderthumb", "medium", "menu", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic", "mix", "mongolian", "monospace", "move", "multiple", "myanmar", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "octal", "open-quote", "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset", "outside", "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused", "persian", "perspective", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radial-gradient", "radio", "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "round", "row-resize", "rtl", "run-in", "running", "s-resize", "sans-serif", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "scroll", "scrollbar", "scroll-position", "se-resize", "searchfield", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama", "simp-chinese-formal", "simp-chinese-informal", "single", "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "solid", "somali", "source-atop", "source-in", "source-out", "source-over", "space", "spell-out", "square", "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub", "subpixel-antialiased", "super", "sw-resize", "symbolic", "symbols", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "tamil", "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er", "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top", "trad-chinese-formal", "trad-chinese-informal", "translate", "translate3d", "translateX", "translateY", "translateZ", "transparent", "ultra-condensed", "ultra-expanded", "underline", "up", "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal", "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url", "var", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "words", "x-large", "x-small", "xor", "xx-large", "xx-small", "bicubic", "optimizespeed", "grayscale", "row", "row-reverse", "wrap", "wrap-reverse", "column-reverse", "flex-start", "flex-end", "space-between", "space-around", "unset"],
            h = ["in", "and", "or", "not", "is not", "is a", "is", "isnt", "defined", "if unless"],
            p = ["for", "if", "else", "unless", "from", "to"],
            m = ["null", "true", "false", "href", "title", "type", "not-allowed", "readonly", "disabled"],
            g = ["@font-face", "@keyframes", "@media", "@viewport", "@page", "@host", "@supports", "@block", "@css"],
            v = i.concat(o, a, l, s, c, f, d, u, h, p, m, g);
        e.registerHelper("hintWords", "stylus", v), e.defineMIME("text/x-styl", "stylus")
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "use strict";
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../../addon/mode/overlay"), require("../xml/xml"), require("../javascript/javascript"), require("../coffeescript/coffeescript"), require("../css/css"), require("../sass/sass"), require("../stylus/stylus"), require("../pug/pug"), require("../handlebars/handlebars")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../../addon/mode/overlay", "../xml/xml", "../javascript/javascript", "../coffeescript/coffeescript", "../css/css", "../sass/sass", "../stylus/stylus", "../pug/pug", "../handlebars/handlebars"], e) : e(CodeMirror)
    }(function(e) {
        var t = {
            script: [
                ["lang", /coffee(script)?/, "coffeescript"],
                ["type", /^(?:text|application)\/(?:x-)?coffee(?:script)?$/, "coffeescript"],
                ["lang", /^babel$/, "javascript"],
                ["type", /^text\/babel$/, "javascript"],
                ["type", /^text\/ecmascript-\d+$/, "javascript"]
            ],
            style: [
                ["lang", /^stylus$/i, "stylus"],
                ["lang", /^sass$/i, "sass"],
                ["lang", /^less$/i, "text/x-less"],
                ["lang", /^scss$/i, "text/x-scss"],
                ["type", /^(text\/)?(x-)?styl(us)?$/i, "stylus"],
                ["type", /^text\/sass/i, "sass"],
                ["type", /^(text\/)?(x-)?scss$/i, "text/x-scss"],
                ["type", /^(text\/)?(x-)?less$/i, "text/x-less"]
            ],
            template: [
                ["lang", /^vue-template$/i, "vue"],
                ["lang", /^pug$/i, "pug"],
                ["lang", /^handlebars$/i, "handlebars"],
                ["type", /^(text\/)?(x-)?pug$/i, "pug"],
                ["type", /^text\/x-handlebars-template$/i, "handlebars"],
                [null, null, "vue-template"]
            ]
        };
        e.defineMode("vue-template", function(t, n) {
            var r = {
                token: function(e) {
                    if (e.match(/^\{\{.*?\}\}/)) return "meta mustache";
                    for (; e.next() && !e.match("{{", !1););
                    return null
                }
            };
            return e.overlayMode(e.getMode(t, n.backdrop || "text/html"), r)
        }), e.defineMode("vue", function(n) {
            return e.getMode(n, {
                name: "htmlmixed",
                tags: t
            })
        }, "htmlmixed", "xml", "javascript", "coffeescript", "css", "sass", "stylus", "pug", "handlebars"), e.defineMIME("script/x-vue", "vue"), e.defineMIME("text/x-vue", "vue")
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        var t = {
                autoSelfClosers: {
                    area: !0,
                    base: !0,
                    br: !0,
                    col: !0,
                    command: !0,
                    embed: !0,
                    frame: !0,
                    hr: !0,
                    img: !0,
                    input: !0,
                    keygen: !0,
                    link: !0,
                    meta: !0,
                    param: !0,
                    source: !0,
                    track: !0,
                    wbr: !0,
                    menuitem: !0
                },
                implicitlyClosed: {
                    dd: !0,
                    li: !0,
                    optgroup: !0,
                    option: !0,
                    p: !0,
                    rp: !0,
                    rt: !0,
                    tbody: !0,
                    td: !0,
                    tfoot: !0,
                    th: !0,
                    tr: !0
                },
                contextGrabbers: {
                    dd: {
                        dd: !0,
                        dt: !0
                    },
                    dt: {
                        dd: !0,
                        dt: !0
                    },
                    li: {
                        li: !0
                    },
                    option: {
                        option: !0,
                        optgroup: !0
                    },
                    optgroup: {
                        optgroup: !0
                    },
                    p: {
                        address: !0,
                        article: !0,
                        aside: !0,
                        blockquote: !0,
                        dir: !0,
                        div: !0,
                        dl: !0,
                        fieldset: !0,
                        footer: !0,
                        form: !0,
                        h1: !0,
                        h2: !0,
                        h3: !0,
                        h4: !0,
                        h5: !0,
                        h6: !0,
                        header: !0,
                        hgroup: !0,
                        hr: !0,
                        menu: !0,
                        nav: !0,
                        ol: !0,
                        p: !0,
                        pre: !0,
                        section: !0,
                        table: !0,
                        ul: !0
                    },
                    rp: {
                        rp: !0,
                        rt: !0
                    },
                    rt: {
                        rp: !0,
                        rt: !0
                    },
                    tbody: {
                        tbody: !0,
                        tfoot: !0
                    },
                    td: {
                        td: !0,
                        th: !0
                    },
                    tfoot: {
                        tbody: !0
                    },
                    th: {
                        td: !0,
                        th: !0
                    },
                    thead: {
                        tbody: !0,
                        tfoot: !0
                    },
                    tr: {
                        tr: !0
                    }
                },
                doNotIndent: {
                    pre: !0
                },
                allowUnquoted: !0,
                allowMissing: !0,
                caseFold: !0
            },
            n = {
                autoSelfClosers: {},
                implicitlyClosed: {},
                contextGrabbers: {},
                doNotIndent: {},
                allowUnquoted: !1,
                allowMissing: !1,
                allowMissingTagName: !1,
                caseFold: !1
            };
        e.defineMode("xml", function(r, i) {
            function o(e, t) {
                function n(n) {
                    return t.tokenize = n, n(e, t)
                }
                var r = e.next();
                return "<" == r ? e.eat("!") ? e.eat("[") ? e.match("CDATA[") ? n(s("atom", "]]>")) : null : e.match("--") ? n(s("comment", "-->")) : e.match("DOCTYPE", !0, !0) ? (e.eatWhile(/[\w\._\-]/), n(c(1))) : null : e.eat("?") ? (e.eatWhile(/[\w\._\-]/), t.tokenize = s("meta", "?>"), "meta") : (w = e.eat("/") ? "closeTag" : "openTag", t.tokenize = a, "tag bracket") : "&" == r ? (e.eat("#") ? e.eat("x") ? e.eatWhile(/[a-fA-F\d]/) && e.eat(";") : e.eatWhile(/[\d]/) && e.eat(";") : e.eatWhile(/[\w\.\-:]/) && e.eat(";")) ? "atom" : "error" : (e.eatWhile(/[^&<]/), null)
            }
            function a(e, t) {
                var n = e.next();
                if (">" == n || "/" == n && e.eat(">")) return t.tokenize = o, w = ">" == n ? "endTag" : "selfcloseTag", "tag bracket";
                if ("=" == n) return w = "equals", null;
                if ("<" == n) {
                    t.tokenize = o, t.state = h, t.tagName = t.tagStart = null;
                    var r = t.tokenize(e, t);
                    return r ? r + " tag error" : "tag error"
                }
                return /[\'\"]/.test(n) ? (t.tokenize = l(n), t.stringStartCol = e.column(), t.tokenize(e, t)) : (e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), "word")
            }
            function l(e) {
                var t = function(t, n) {
                    for (; !t.eol();)
                        if (t.next() == e) {
                            n.tokenize = a;
                            break
                        }
                    return "string"
                };
                return t.isInAttribute = !0, t
            }
            function s(e, t) {
                return function(n, r) {
                    for (; !n.eol();) {
                        if (n.match(t)) {
                            r.tokenize = o;
                            break
                        }
                        n.next()
                    }
                    return e
                }
            }
            function c(e) {
                return function(t, n) {
                    for (var r; null != (r = t.next());) {
                        if ("<" == r) return n.tokenize = c(e + 1), n.tokenize(t, n);
                        if (">" == r) {
                            if (1 == e) {
                                n.tokenize = o;
                                break
                            }
                            return n.tokenize = c(e - 1), n.tokenize(t, n)
                        }
                    }
                    return "meta"
                }
            }
            function u(e, t, n) {
                this.prev = e.context, this.tagName = t, this.indent = e.indented, this.startOfLine = n, (L.doNotIndent.hasOwnProperty(t) || e.context && e.context.noIndent) && (this.noIndent = !0)
            }
            function f(e) {
                e.context && (e.context = e.context.prev)
            }
            function d(e, t) {
                for (var n;;) {
                    if (!e.context) return;
                    if (n = e.context.tagName, !L.contextGrabbers.hasOwnProperty(n) || !L.contextGrabbers[n].hasOwnProperty(t)) return;
                    f(e)
                }
            }
            function h(e, t, n) {
                return "openTag" == e ? (n.tagStart = t.column(), p) : "closeTag" == e ? m : h
            }
            function p(e, t, n) {
                return "word" == e ? (n.tagName = t.current(), C = "tag", y) : L.allowMissingTagName && "endTag" == e ? (C = "tag bracket", y(e, t, n)) : (C = "error", p)
            }
            function m(e, t, n) {
                if ("word" == e) {
                    var r = t.current();
                    return n.context && n.context.tagName != r && L.implicitlyClosed.hasOwnProperty(n.context.tagName) && f(n), n.context && n.context.tagName == r || !1 === L.matchClosing ? (C = "tag", g) : (C = "tag error", v)
                }
                return L.allowMissingTagName && "endTag" == e ? (C = "tag bracket", g(e, t, n)) : (C = "error", v)
            }
            function g(e, t, n) {
                return "endTag" != e ? (C = "error", g) : (f(n), h)
            }
            function v(e, t, n) {
                return C = "error", g(e, t, n)
            }
            function y(e, t, n) {
                if ("word" == e) return C = "attribute", b;
                if ("endTag" == e || "selfcloseTag" == e) {
                    var r = n.tagName,
                        i = n.tagStart;
                    return n.tagName = n.tagStart = null, "selfcloseTag" == e || L.autoSelfClosers.hasOwnProperty(r) ? d(n, r) : (d(n, r), n.context = new u(n, r, i == n.indented)), h
                }
                return C = "error", y
            }
            function b(e, t, n) {
                return "equals" == e ? x : (L.allowMissing || (C = "error"), y(e, t, n))
            }
            function x(e, t, n) {
                return "string" == e ? k : "word" == e && L.allowUnquoted ? (C = "string", y) : (C = "error", y(e, t, n))
            }
            function k(e, t, n) {
                return "string" == e ? k : y(e, t, n)
            }
            var w, C, S = r.indentUnit,
                L = {},
                T = i.htmlMode ? t : n;
            for (var M in T) L[M] = T[M];
            for (var M in i) L[M] = i[M];
            return o.isInText = !0, {
                startState: function(e) {
                    var t = {
                        tokenize: o,
                        state: h,
                        indented: e || 0,
                        tagName: null,
                        tagStart: null,
                        context: null
                    };
                    return null != e && (t.baseIndent = e), t
                },
                token: function(e, t) {
                    if (!t.tagName && e.sol() && (t.indented = e.indentation()), e.eatSpace()) return null;
                    w = null;
                    var n = t.tokenize(e, t);
                    return (n || w) && "comment" != n && (C = null, t.state = t.state(w || n, e, t), C && (n = "error" == C ? n + " error" : C)), n
                },
                indent: function(t, n, r) {
                    var i = t.context;
                    if (t.tokenize.isInAttribute) return t.tagStart == t.indented ? t.stringStartCol + 1 : t.indented + S;
                    if (i && i.noIndent) return e.Pass;
                    if (t.tokenize != a && t.tokenize != o) return r ? r.match(/^(\s*)/)[0].length : 0;
                    if (t.tagName) return !1 !== L.multilineTagIndentPastTag ? t.tagStart + t.tagName.length + 2 : t.tagStart + S * (L.multilineTagIndentFactor || 1);
                    if (L.alignCDATA && /<!\[CDATA\[/.test(n)) return 0;
                    var l = n && /^<(\/)?([\w_:\.-]*)/.exec(n);
                    if (l && l[1])
                        for (; i;) {
                            if (i.tagName == l[2]) {
                                i = i.prev;
                                break
                            }
                            if (!L.implicitlyClosed.hasOwnProperty(i.tagName)) break;
                            i = i.prev
                        } else if (l)
                            for (; i;) {
                                var s = L.contextGrabbers[i.tagName];
                                if (!s || !s.hasOwnProperty(l[2])) break;
                                i = i.prev
                            }
                        for (; i && i.prev && !i.startOfLine;) i = i.prev;
                    return i ? i.indent + S : t.baseIndent || 0
                },
                electricInput: /<\/[\s\w:]+>$/,
                blockCommentStart: "<!--",
                blockCommentEnd: "-->",
                configuration: L.htmlMode ? "html" : "xml",
                helperType: L.htmlMode ? "html" : "xml",
                skipAttribute: function(e) {
                    e.state == x && (e.state = y)
                }
            }
        }), e.defineMIME("text/xml", "xml"), e.defineMIME("application/xml", "xml"), e.mimeModes.hasOwnProperty("text/html") || e.defineMIME("text/html", {
            name: "xml",
            htmlMode: !0
        })
    }),
    // CodeMirror, copyright (c) by Marijn Haverbeke and others
    function(e) {
        "object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror"], e) : e(CodeMirror)
    }(function(e) {
        "use strict";
        function t(e, t, n, r, i, o) {
            this.indented = e, this.column = t, this.type = n, this.info = r, this.align = i, this.prev = o
        }
        function n(e, n, r, i) {
            var o = e.indented;
            return e.context && "statement" == e.context.type && "statement" != r && (o = e.context.indented), e.context = new t(o, n, r, i, null, e.context)
        }
        function r(e) {
            var t = e.context.type;
            return ")" != t && "]" != t && "}" != t || (e.indented = e.context.indented), e.context = e.context.prev
        }
        function i(e, t, n) {
            return "variable" == t.prevToken || "type" == t.prevToken || (!!/\S(?:[^- ]>|[*\]])\s*$|\*$/.test(e.string.slice(0, n)) || (!(!t.typeAtEndOfLine || e.column() != e.indentation()) || void 0))
        }
        function o(e) {
            for (;;) {
                if (!e || "top" == e.type) return !0;
                if ("}" == e.type && "namespace" != e.prev.info) return !1;
                e = e.prev
            }
        }
        function a(e) {
            for (var t = {}, n = e.split(" "), r = 0; r < n.length; ++r) t[n[r]] = !0;
            return t
        }
        function l(e, t) {
            return "function" == typeof e ? e(t) : e.propertyIsEnumerable(t)
        }
        function s(e, t) {
            if (!t.startOfLine) return !1;
            for (var n, r = null; n = e.peek();) {
                if ("\\" == n && e.match(/^.$/)) {
                    r = s;
                    break
                }
                if ("/" == n && e.match(/^\/[\/\*]/, !1)) break;
                e.next()
            }
            return t.tokenize = r, "meta"
        }
        function c(e, t) {
            return "type" == t.prevToken && "type"
        }
        function u(e) {
            return e.eatWhile(/[\w\.']/), "number"
        }
        function f(e, t) {
            if (e.backUp(1), e.match(/(R|u8R|uR|UR|LR)/)) {
                var n = e.match(/"([^\s\\()]{0,16})\(/);
                return !!n && (t.cpp11RawStringDelim = n[1], t.tokenize = p, p(e, t))
            }
            return e.match(/(u8|u|U|L)/) ? !!e.match(/["']/, !1) && "string" : (e.next(), !1)
        }
        function d(e) {
            var t = /(\w+)::~?(\w+)$/.exec(e);
            return t && t[1] == t[2]
        }
        function h(e, t) {
            for (var n; null != (n = e.next());)
                if ('"' == n && !e.eat('"')) {
                    t.tokenize = null;
                    break
                }
            return "string"
        }
        function p(e, t) {
            var n = t.cpp11RawStringDelim.replace(/[^\w\s]/g, "\\$&");
            return e.match(new RegExp(".*?\\)" + n + '"')) ? t.tokenize = null : e.skipToEnd(), "string"
        }
        function m(t, n) {
            function r(e) {
                if (e)
                    for (var t in e) e.hasOwnProperty(t) && i.push(t)
            }
            "string" == typeof t && (t = [t]);
            var i = [];
            r(n.keywords), r(n.types), r(n.builtin), r(n.atoms), i.length && (n.helperType = t[0], e.registerHelper("hintWords", t[0], i));
            for (var o = 0; o < t.length; ++o) e.defineMIME(t[o], n)
        }
        function g(e, t) {
            for (var n = !1; !e.eol();) {
                if (!n && e.match('"""')) {
                    t.tokenize = null;
                    break
                }
                n = "\\" == e.next() && !n
            }
            return "string"
        }
        function v(e) {
            return function(t, n) {
                for (var r; r = t.next();) {
                    if ("*" == r && t.eat("/")) {
                        if (1 == e) {
                            n.tokenize = null;
                            break
                        }
                        return n.tokenize = v(e - 1), n.tokenize(t, n)
                    }
                    if ("/" == r && t.eat("*")) return n.tokenize = v(e + 1), n.tokenize(t, n)
                }
                return "comment"
            }
        }
        function y(e) {
            return function(t, n) {
                for (var r, i = !1, o = !1; !t.eol();) {
                    if (!e && !i && t.match('"')) {
                        o = !0;
                        break
                    }
                    if (e && t.match('"""')) {
                        o = !0;
                        break
                    }
                    r = t.next(), !i && "$" == r && t.match("{") && t.skipTo("}"), i = !i && "\\" == r && !e
                }
                return !o && e || (n.tokenize = null), "string"
            }
        }
        function b(e) {
            return function(t, n) {
                for (var r, i = !1, o = !1; !t.eol();) {
                    if (!i && t.match('"') && ("single" == e || t.match('""'))) {
                        o = !0;
                        break
                    }
                    if (!i && t.match("``")) {
                        w = b(e), o = !0;
                        break
                    }
                    r = t.next(), i = "single" == e && !i && "\\" == r
                }
                return o && (n.tokenize = null), "string"
            }
        }
        e.defineMode("clike", function(a, s) {
            function c(e, t) {
                var n = e.next();
                if (S[n]) {
                    var r = S[n](e, t);
                    if (!1 !== r) return r
                }
                if ('"' == n || "'" == n) return t.tokenize = u(n), t.tokenize(e, t);
                if (A.test(n)) return h = n, null;
                if (O.test(n)) {
                    if (e.backUp(1), e.match(N)) return "number";
                    e.next()
                }
                if ("/" == n) {
                    if (e.eat("*")) return t.tokenize = f, f(e, t);
                    if (e.eat("/")) return e.skipToEnd(), "comment"
                }
                if (P.test(n)) {
                    for (; !e.match(/^\/[\/*]/, !1) && e.eat(P););
                    return "operator"
                }
                if (e.eatWhile(E), z)
                    for (; e.match(z);) e.eatWhile(E);
                var i = e.current();
                return l(y, i) ? (l(k, i) && (h = "newstatement"), l(w, i) && (p = !0), "keyword") : l(b, i) ? "type" : l(x, i) ? (l(k, i) && (h = "newstatement"), "builtin") : l(C, i) ? "atom" : "variable"
            }
            function u(e) {
                return function(t, n) {
                    for (var r, i = !1, o = !1; null != (r = t.next());) {
                        if (r == e && !i) {
                            o = !0;
                            break
                        }
                        i = !i && "\\" == r
                    }
                    return (o || !i && !L) && (n.tokenize = null), "string"
                }
            }
            function f(e, t) {
                for (var n, r = !1; n = e.next();) {
                    if ("/" == n && r) {
                        t.tokenize = null;
                        break
                    }
                    r = "*" == n
                }
                return "comment"
            }
            function d(e, t) {
                s.typeFirstDefinitions && e.eol() && o(t.context) && (t.typeAtEndOfLine = i(e, t, e.pos))
            }
            var h, p, m = a.indentUnit,
                g = s.statementIndentUnit || m,
                v = s.dontAlignCalls,
                y = s.keywords || {},
                b = s.types || {},
                x = s.builtin || {},
                k = s.blockKeywords || {},
                w = s.defKeywords || {},
                C = s.atoms || {},
                S = s.hooks || {},
                L = s.multiLineStrings,
                T = !1 !== s.indentStatements,
                M = !1 !== s.indentSwitch,
                z = s.namespaceSeparator,
                A = s.isPunctuationChar || /[\[\]{}\(\),;\:\.]/,
                O = s.numberStart || /[\d\.]/,
                N = s.number || /^(?:0x[a-f\d]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i,
                P = s.isOperatorChar || /[+\-*&%=<>!?|\/]/,
                E = s.isIdentifierChar || /[\w\$_\xa1-\uffff]/;
            return {
                startState: function(e) {
                    return {
                        tokenize: null,
                        context: new t((e || 0) - m, 0, "top", null, !1),
                        indented: 0,
                        startOfLine: !0,
                        prevToken: null
                    }
                },
                token: function(e, t) {
                    var a = t.context;
                    if (e.sol() && (null == a.align && (a.align = !1), t.indented = e.indentation(), t.startOfLine = !0), e.eatSpace()) return d(e, t), null;
                    h = p = null;
                    var l = (t.tokenize || c)(e, t);
                    if ("comment" == l || "meta" == l) return l;
                    if (null == a.align && (a.align = !0), ";" == h || ":" == h || "," == h && e.match(/^\s*(?:\/\/.*)?$/, !1))
                        for (;
                            "statement" == t.context.type;) r(t);
                    else if ("{" == h) n(t, e.column(), "}");
                    else if ("[" == h) n(t, e.column(), "]");
                    else if ("(" == h) n(t, e.column(), ")");
                    else if ("}" == h) {
                        for (;
                            "statement" == a.type;) a = r(t);
                        for ("}" == a.type && (a = r(t));
                            "statement" == a.type;) a = r(t)
                    } else h == a.type ? r(t) : T && (("}" == a.type || "top" == a.type) && ";" != h || "statement" == a.type && "newstatement" == h) && n(t, e.column(), "statement", e.current());
                    if ("variable" == l && ("def" == t.prevToken || s.typeFirstDefinitions && i(e, t, e.start) && o(t.context) && e.match(/^\s*\(/, !1)) && (l = "def"), S.token) {
                        var u = S.token(e, t, l);
                        u !== undefined && (l = u)
                    }
                    return "def" == l && !1 === s.styleDefs && (l = "variable"), t.startOfLine = !1, t.prevToken = p ? "def" : l || h, d(e, t), l
                },
                indent: function(t, n) {
                    if (t.tokenize != c && null != t.tokenize || t.typeAtEndOfLine) return e.Pass;
                    var r = t.context,
                        i = n && n.charAt(0),
                        o = i == r.type;
                    if ("statement" == r.type && "}" == i && (r = r.prev), s.dontIndentStatements)
                        for (;
                            "statement" == r.type && s.dontIndentStatements.test(r.info);) r = r.prev;
                    if (S.indent) {
                        var a = S.indent(t, r, n, m);
                        if ("number" == typeof a) return a
                    }
                    var l = r.prev && "switch" == r.prev.info;
                    if (s.allmanIndentation && /[{(]/.test(i)) {
                        for (;
                            "top" != r.type && "}" != r.type;) r = r.prev;
                        return r.indented
                    }
                    return "statement" == r.type ? r.indented + ("{" == i ? 0 : g) : !r.align || v && ")" == r.type ? ")" != r.type || o ? r.indented + (o ? 0 : m) + (o || !l || /^(?:case|default)\b/.test(n) ? 0 : m) : r.indented + g : r.column + (o ? 0 : 1)
                },
                electricInput: M ? /^\s*(?:case .*?:|default:|\{\}?|\})$/ : /^\s*[{}]$/,
                blockCommentStart: "/*",
                blockCommentEnd: "*/",
                blockCommentContinue: " * ",
                lineComment: "//",
                fold: "brace"
            }
        });
        var x = "auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile",
            k = "int long char short double float unsigned signed void size_t ptrdiff_t";
        m(["text/x-csrc", "text/x-c", "text/x-chdr"], {
            name: "clike",
            keywords: a(x),
            types: a(k + " bool _Complex _Bool float_t double_t intptr_t intmax_t int8_t int16_t int32_t int64_t uintptr_t uintmax_t uint8_t uint16_t uint32_t uint64_t"),
            blockKeywords: a("case do else for if switch while struct"),
            defKeywords: a("struct"),
            typeFirstDefinitions: !0,
            atoms: a("NULL true false"),
            hooks: {
                "#": s,
                "*": c
            },
            modeProps: {
                fold: ["brace", "include"]
            }
        }), m(["text/x-c++src", "text/x-c++hdr"], {
            name: "clike",
            keywords: a(x + " asm dynamic_cast namespace reinterpret_cast try explicit new static_cast typeid catch operator template typename class friend private this using const_cast inline public throw virtual delete mutable protected alignas alignof constexpr decltype nullptr noexcept thread_local final static_assert override"),
            types: a(k + " bool wchar_t"),
            blockKeywords: a("catch class do else finally for if struct switch try while"),
            defKeywords: a("class namespace struct enum union"),
            typeFirstDefinitions: !0,
            atoms: a("true false NULL"),
            dontIndentStatements: /^template$/,
            isIdentifierChar: /[\w\$_~\xa1-\uffff]/,
            hooks: {
                "#": s,
                "*": c,
                u: f,
                U: f,
                L: f,
                R: f,
                0: u,
                1: u,
                2: u,
                3: u,
                4: u,
                5: u,
                6: u,
                7: u,
                8: u,
                9: u,
                token: function(e, t, n) {
                    if ("variable" == n && "(" == e.peek() && (";" == t.prevToken || null == t.prevToken || "}" == t.prevToken) && d(e.current())) return "def"
                }
            },
            namespaceSeparator: "::",
            modeProps: {
                fold: ["brace", "include"]
            }
        }), m("text/x-java", {
            name: "clike",
            keywords: a("abstract assert break case catch class const continue default do else enum extends final finally float for goto if implements import instanceof interface native new package private protected public return static strictfp super switch synchronized this throw throws transient try volatile while @interface"),
            types: a("byte short int long float double boolean char void Boolean Byte Character Double Float Integer Long Number Object Short String StringBuffer StringBuilder Void"),
            blockKeywords: a("catch class do else finally for if switch try while"),
            defKeywords: a("class interface enum @interface"),
            typeFirstDefinitions: !0,
            atoms: a("true false null"),
            number: /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+\.?\d*|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,
            hooks: {
                "@": function(e) {
                    return !e.match("interface", !1) && (e.eatWhile(/[\w\$_]/), "meta")
                }
            },
            modeProps: {
                fold: ["brace", "import"]
            }
        }), m("text/x-csharp", {
            name: "clike",
            keywords: a("abstract as async await base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),
            types: a("Action Boolean Byte Char DateTime DateTimeOffset Decimal Double Func Guid Int16 Int32 Int64 Object SByte Single String Task TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),
            blockKeywords: a("catch class do else finally for foreach if struct switch try while"),
            defKeywords: a("class interface namespace struct var"),
            typeFirstDefinitions: !0,
            atoms: a("true false null"),
            hooks: {
                "@": function(e, t) {
                    return e.eat('"') ? (t.tokenize = h, h(e, t)) : (e.eatWhile(/[\w\$_]/), "meta")
                }
            }
        }), m("text/x-scala", {
            name: "clike",
            keywords: a("abstract case catch class def do else extends final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try type val var while with yield _ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble"),
            types: a("AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Int Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"),
            multiLineStrings: !0,
            blockKeywords: a("catch class enum do else finally for forSome if match switch try while"),
            defKeywords: a("class enum def object package trait type val var"),
            atoms: a("true false null"),
            indentStatements: !1,
            indentSwitch: !1,
            isOperatorChar: /[+\-*&%=<>!?|\/#:@]/,
            hooks: {
                "@": function(e) {
                    return e.eatWhile(/[\w\$_]/), "meta"
                },
                '"': function(e, t) {
                    return !!e.match('""') && (t.tokenize = g, t.tokenize(e, t))
                },
                "'": function(e) {
                    return e.eatWhile(/[\w\$_\xa1-\uffff]/), "atom"
                },
                "=": function(e, n) {
                    var r = n.context;
                    return !("}" != r.type || !r.align || !e.eat(">")) && (n.context = new t(r.indented, r.column, r.type, r.info, null, r.prev), "operator")
                },
                "/": function(e, t) {
                    return !!e.eat("*") && (t.tokenize = v(1), t.tokenize(e, t))
                }
            },
            modeProps: {
                closeBrackets: {
                    triples: '"'
                }
            }
        }), m("text/x-kotlin", {
            name: "clike",
            keywords: a("package as typealias class interface this super val operator var fun for is in This throw return annotation break continue object if else while do try when !in !is as? file import where by get set abstract enum open inner override private public internal protected catch finally out final vararg reified dynamic companion constructor init sealed field property receiver param sparam lateinit data inline noinline tailrec external annotation crossinline const operator infix suspend actual expect setparam"),
            types: a("Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void Annotation Any BooleanArray ByteArray Char CharArray DeprecationLevel DoubleArray Enum FloatArray Function Int IntArray Lazy LazyThreadSafetyMode LongArray Nothing ShortArray Unit"),
            intendSwitch: !1,
            indentStatements: !1,
            multiLineStrings: !0,
            number: /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+(\.\d+)?|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,
            blockKeywords: a("catch class do else finally for if where try while enum"),
            defKeywords: a("class val var object interface fun"),
            atoms: a("true false null this"),
            hooks: {
                "@": function(e) {
                    return e.eatWhile(/[\w\$_]/), "meta"
                },
                '"': function(e, t) {
                    return t.tokenize = y(e.match('""')), t.tokenize(e, t)
                },
                indent: function(e, t, n, r) {
                    var i = n && n.charAt(0);
                    return "}" != e.prevToken && ")" != e.prevToken || "" != n ? "operator" == e.prevToken && "}" != n || "variable" == e.prevToken && "." == i || ("}" == e.prevToken || ")" == e.prevToken) && "." == i ? 2 * r + t.indented : t.align && "}" == t.type ? t.indented + (e.context.type == (n || "").charAt(0) ? 0 : r) : void 0 : e.indented
                }
            },
            modeProps: {
                closeBrackets: {
                    triples: '"'
                }
            }
        }), m(["x-shader/x-vertex", "x-shader/x-fragment"], {
            name: "clike",
            keywords: a("sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadow const attribute uniform varying break continue discard return for while do if else struct in out inout"),
            types: a("float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4"),
            blockKeywords: a("for while do if else struct"),
            builtin: a("radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smoothstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4"),
            atoms: a("true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_PointCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TexureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers"),
            indentSwitch: !1,
            hooks: {
                "#": s
            },
            modeProps: {
                fold: ["brace", "include"]
            }
        }), m("text/x-nesc", {
            name: "clike",
            keywords: a(x + "as atomic async call command component components configuration event generic implementation includes interface module new norace nx_struct nx_union post provides signal task uses abstract extends"),
            types: a(k),
            blockKeywords: a("case do else for if switch while struct"),
            atoms: a("null true false"),
            hooks: {
                "#": s
            },
            modeProps: {
                fold: ["brace", "include"]
            }
        }), m("text/x-objectivec", {
            name: "clike",
            keywords: a(x + "inline restrict _Bool _Complex _Imaginary BOOL Class bycopy byref id IMP in inout nil oneway out Protocol SEL self super atomic nonatomic retain copy readwrite readonly"),
            types: a(k),
            atoms: a("YES NO NULL NILL ON OFF true false"),
            hooks: {
                "@": function(e) {
                    return e.eatWhile(/[\w\$]/), "keyword"
                },
                "#": s,
                indent: function(e, t, n) {
                    if ("statement" == t.type && /^@\w/.test(n)) return t.indented
                }
            },
            modeProps: {
                fold: "brace"
            }
        }), m("text/x-squirrel", {
            name: "clike",
            keywords: a("base break clone continue const default delete enum extends function in class foreach local resume return this throw typeof yield constructor instanceof static"),
            types: a(k),
            blockKeywords: a("case catch class else for foreach if switch try while"),
            defKeywords: a("function local class"),
            typeFirstDefinitions: !0,
            atoms: a("true false null"),
            hooks: {
                "#": s
            },
            modeProps: {
                fold: ["brace", "include"]
            }
        });
        var w = null;
        m("text/x-ceylon", {
            name: "clike",
            keywords: a("abstracts alias assembly assert assign break case catch class continue dynamic else exists extends finally for function given if import in interface is let module new nonempty object of out outer package return satisfies super switch then this throw try value void while"),
            types: function(e) {
                var t = e.charAt(0);
                return t === t.toUpperCase() && t !== t.toLowerCase()
            },
            blockKeywords: a("case catch class dynamic else finally for function if interface module new object switch try while"),
            defKeywords: a("class dynamic function interface module object package value"),
            builtin: a("abstract actual aliased annotation by default deprecated doc final formal late license native optional sealed see serializable shared suppressWarnings tagged throws variable"),
            isPunctuationChar: /[\[\]{}\(\),;\:\.`]/,
            isOperatorChar: /[+\-*&%=<>!?|^~:\/]/,
            numberStart: /[\d#$]/,
            number: /^(?:#[\da-fA-F_]+|\$[01_]+|[\d_]+[kMGTPmunpf]?|[\d_]+\.[\d_]+(?:[eE][-+]?\d+|[kMGTPmunpf]|)|)/i,
            multiLineStrings: !0,
            typeFirstDefinitions: !0,
            atoms: a("true false null larger smaller equal empty finished"),
            indentSwitch: !1,
            styleDefs: !1,
            hooks: {
                "@": function(e) {
                    return e.eatWhile(/[\w\$_]/), "meta"
                },
                '"': function(e, t) {
                    return t.tokenize = b(e.match('""') ? "triple" : "single"), t.tokenize(e, t)
                },
                "`": function(e, t) {
                    return !(!w || !e.match("`")) && (t.tokenize = w, w = null, t.tokenize(e, t))
                },
                "'": function(e) {
                    return e.eatWhile(/[\w\$_\xa1-\uffff]/), "atom"
                },
                token: function(e, t, n) {
                    if (("variable" == n || "type" == n) && "." == t.prevToken) return "variable-2"
                }
            },
            modeProps: {
                fold: ["brace", "import"],
                closeBrackets: {
                    triples: '"'
                }
            }
        })
    }), CodeMirror.commands.respectfulTab = function(e) {
        return e.getOption("indentWithTabs") ? e.execCommand("defaultTab") : e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertSoftTab"), !0
    };