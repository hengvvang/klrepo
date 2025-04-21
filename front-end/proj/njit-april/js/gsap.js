// JavaScript Document
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(((t = t || self).window = t.window || {}));
})(this, function (e) {
  "use strict";
  function _inheritsLoose(t, e) {
    (t.prototype = Object.create(e.prototype)),
      ((t.prototype.constructor = t).__proto__ = e);
  }
  function _assertThisInitialized(t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t;
  }
  function r(t) {
    return "string" == typeof t;
  }
  function s(t) {
    return "function" == typeof t;
  }
  function t(t) {
    return "number" == typeof t;
  }
  function u(t) {
    return void 0 === t;
  }
  function v(t) {
    return "object" == typeof t;
  }
  function w(t) {
    return !1 !== t;
  }
  function x() {
    return "undefined" != typeof window;
  }
  function y(t) {
    return s(t) || r(t);
  }
  function P(t) {
    return (i = yt(t, ot)) && Ee;
  }
  function Q(t, e) {
    return console.warn(
      "Invalid property",
      t,
      "set to",
      e,
      "Missing plugin? gsap.registerPlugin()"
    );
  }
  function R(t, e) {
    return !e && console.warn(t);
  }
  function S(t, e) {
    return (t && (ot[t] = e) && i && (i[t] = e)) || ot;
  }
  function T() {
    return 0;
  }
  function ea(t) {
    var e,
      r,
      i = t[0];
    if ((v(i) || s(i) || (t = [t]), !(e = (i._gsap || {}).harness))) {
      for (r = gt.length; r-- && !gt[r].targetTest(i); );
      e = gt[r];
    }
    for (r = t.length; r--; )
      (t[r] && (t[r]._gsap || (t[r]._gsap = new Vt(t[r], e)))) ||
        t.splice(r, 1);
    return t;
  }
  function fa(t) {
    return t._gsap || ea(Ot(t))[0]._gsap;
  }
  function ga(t, e, r) {
    return (r = t[e]) && s(r)
      ? t[e]()
      : (u(r) && t.getAttribute && t.getAttribute(e)) || r;
  }
  function ha(t, e) {
    return (t = t.split(",")).forEach(e) || t;
  }
  function ia(t) {
    return Math.round(1e5 * t) / 1e5 || 0;
  }
  function ja(t) {
    return Math.round(1e7 * t) / 1e7 || 0;
  }
  function ka(t, e) {
    var r = e.charAt(0),
      i = parseFloat(e.substr(2));
    return (
      (t = parseFloat(t)),
      "+" === r ? t + i : "-" === r ? t - i : "*" === r ? t * i : t / i
    );
  }
  function la(t, e) {
    for (var r = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < r; );
    return i < r;
  }
  function ma() {
    var t,
      e,
      r = ct.length,
      i = ct.slice(0);
    for (dt = {}, t = ct.length = 0; t < r; t++)
      (e = i[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
  }
  function na(t, e, r, i) {
    ct.length && !L && ma(),
      t.render(e, r, i || (L && e < 0 && (t._initted || t._startAt))),
      ct.length && !L && ma();
  }
  function oa(t) {
    var e = parseFloat(t);
    return (e || 0 === e) && (t + "").match(at).length < 2
      ? e
      : r(t)
      ? t.trim()
      : t;
  }
  function pa(t) {
    return t;
  }
  function qa(t, e) {
    for (var r in e) r in t || (t[r] = e[r]);
    return t;
  }
  function ta(t, e) {
    for (var r in e)
      "__proto__" !== r &&
        "constructor" !== r &&
        "prototype" !== r &&
        (t[r] = v(e[r]) ? ta(t[r] || (t[r] = {}), e[r]) : e[r]);
    return t;
  }
  function ua(t, e) {
    var r,
      i = {};
    for (r in t) r in e || (i[r] = t[r]);
    return i;
  }
  function va(t) {
    var e = t.parent || I,
      r = t.keyframes
        ? (function _setKeyframeDefaults(i) {
            return function (t, e) {
              for (var r in e)
                r in t ||
                  ("duration" === r && i) ||
                  "ease" === r ||
                  (t[r] = e[r]);
            };
          })($(t.keyframes))
        : qa;
    if (w(t.inherit))
      for (; e; ) r(t, e.vars.defaults), (e = e.parent || e._dp);
    return t;
  }
  function xa(t, e, r, i, n) {
    void 0 === r && (r = "_first"), void 0 === i && (i = "_last");
    var a,
      s = t[i];
    if (n) for (a = e[n]; s && s[n] > a; ) s = s._prev;
    return (
      s ? ((e._next = s._next), (s._next = e)) : ((e._next = t[r]), (t[r] = e)),
      e._next ? (e._next._prev = e) : (t[i] = e),
      (e._prev = s),
      (e.parent = e._dp = t),
      e
    );
  }
  function ya(t, e, r, i) {
    void 0 === r && (r = "_first"), void 0 === i && (i = "_last");
    var n = e._prev,
      a = e._next;
    n ? (n._next = a) : t[r] === e && (t[r] = a),
      a ? (a._prev = n) : t[i] === e && (t[i] = n),
      (e._next = e._prev = e.parent = null);
  }
  function za(t, e) {
    t.parent &&
      (!e || t.parent.autoRemoveChildren) &&
      t.parent.remove &&
      t.parent.remove(t),
      (t._act = 0);
  }
  function Aa(t, e) {
    if (t && (!e || e._end > t._dur || e._start < 0))
      for (var r = t; r; ) (r._dirty = 1), (r = r.parent);
    return t;
  }
  function Ca(t, e, r, i) {
    return (
      t._startAt &&
      (L
        ? t._startAt.revert(ht)
        : (t.vars.immediateRender && !t.vars.autoRevert) ||
          t._startAt.render(e, !0, i))
    );
  }
  function Ea(t) {
    return t._repeat ? Tt(t._tTime, (t = t.duration() + t._rDelay)) * t : 0;
  }
  function Ga(t, e) {
    return (
      (t - e._start) * e._ts +
      (0 <= e._ts ? 0 : e._dirty ? e.totalDuration() : e._tDur)
    );
  }
  function Ha(t) {
    return (t._end = ja(
      t._start + (t._tDur / Math.abs(t._ts || t._rts || X) || 0)
    ));
  }
  function Ia(t, e) {
    var r = t._dp;
    return (
      r &&
        r.smoothChildTiming &&
        t._ts &&
        ((t._start = ja(
          r._time -
            (0 < t._ts
              ? e / t._ts
              : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)
        )),
        Ha(t),
        r._dirty || Aa(r, t)),
      t
    );
  }
  function Ja(t, e) {
    var r;
    if (
      ((e._time || (e._initted && !e._dur)) &&
        ((r = Ga(t.rawTime(), e)),
        (!e._dur || kt(0, e.totalDuration(), r) - e._tTime > X) &&
          e.render(r, !0)),
      Aa(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
    ) {
      if (t._dur < t.duration())
        for (r = t; r._dp; )
          0 <= r.rawTime() && r.totalTime(r._tTime), (r = r._dp);
      t._zTime = -X;
    }
  }
  function Ka(e, r, i, n) {
    return (
      r.parent && za(r),
      (r._start = ja(
        (t(i) ? i : i || e !== I ? xt(e, i, r) : e._time) + r._delay
      )),
      (r._end = ja(
        r._start + (r.totalDuration() / Math.abs(r.timeScale()) || 0)
      )),
      xa(e, r, "_first", "_last", e._sort ? "_start" : 0),
      bt(r) || (e._recent = r),
      n || Ja(e, r),
      e._ts < 0 && Ia(e, e._tTime),
      e
    );
  }
  function La(t, e) {
    return (
      (ot.ScrollTrigger || Q("scrollTrigger", e)) &&
      ot.ScrollTrigger.create(e, t)
    );
  }
  function Ma(t, e, r, i, n) {
    return (
      Gt(t, e, n),
      t._initted
        ? !r &&
          t._pt &&
          !L &&
          ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) &&
          f !== Rt.frame
          ? (ct.push(t), (t._lazy = [n, i]), 1)
          : void 0
        : 1
    );
  }
  function Ra(t, e, r, i) {
    var n = t._repeat,
      a = ja(e) || 0,
      s = t._tTime / t._tDur;
    return (
      s && !i && (t._time *= a / t._dur),
      (t._dur = a),
      (t._tDur = n ? (n < 0 ? 1e10 : ja(a * (n + 1) + t._rDelay * n)) : a),
      0 < s && !i && Ia(t, (t._tTime = t._tDur * s)),
      t.parent && Ha(t),
      r || Aa(t.parent, t),
      t
    );
  }
  function Sa(t) {
    return t instanceof Xt ? Aa(t) : Ra(t, t._dur);
  }
  function Va(e, r, i) {
    var n,
      a,
      s = t(r[1]),
      o = (s ? 2 : 1) + (e < 2 ? 0 : 1),
      u = r[o];
    if ((s && (u.duration = r[1]), (u.parent = i), e)) {
      for (n = u, a = i; a && !("immediateRender" in n); )
        (n = a.vars.defaults || {}), (a = w(a.vars.inherit) && a.parent);
      (u.immediateRender = w(n.immediateRender)),
        e < 2 ? (u.runBackwards = 1) : (u.startAt = r[o - 1]);
    }
    return new Zt(r[0], u, r[1 + o]);
  }
  function Wa(t, e) {
    return t || 0 === t ? e(t) : e;
  }
  function Ya(t, e) {
    return r(t) && (e = st.exec(t)) ? e[1] : "";
  }
  function _a(t, e) {
    return (
      t &&
      v(t) &&
      "length" in t &&
      ((!e && !t.length) || (t.length - 1 in t && v(t[0]))) &&
      !t.nodeType &&
      t !== h
    );
  }
  function cb(r) {
    return (
      (r = Ot(r)[0] || R("Invalid scope") || {}),
      function (t) {
        var e = r.current || r.nativeElement || r;
        return Ot(
          t,
          e.querySelectorAll
            ? e
            : e === r
            ? R("Invalid scope") || a.createElement("div")
            : r
        );
      }
    );
  }
  function db(t) {
    return t.sort(function () {
      return 0.5 - Math.random();
    });
  }
  function eb(t) {
    if (s(t)) return t;
    var p = v(t) ? t : { each: t },
      _ = jt(p.ease),
      m = p.from || 0,
      g = parseFloat(p.base) || 0,
      y = {},
      e = 0 < m && m < 1,
      T = isNaN(m) || e,
      b = p.axis,
      w = m,
      x = m;
    return (
      r(m)
        ? (w = x = { center: 0.5, edges: 0.5, end: 1 }[m] || 0)
        : !e && T && ((w = m[0]), (x = m[1])),
      function (t, e, r) {
        var i,
          n,
          a,
          s,
          o,
          u,
          h,
          l,
          f,
          c = (r || p).length,
          d = y[c];
        if (!d) {
          if (!(f = "auto" === p.grid ? 0 : (p.grid || [1, U])[1])) {
            for (
              h = -U;
              h < (h = r[f++].getBoundingClientRect().left) && f < c;

            );
            f--;
          }
          for (
            d = y[c] = [],
              i = T ? Math.min(f, c) * w - 0.5 : m % f,
              n = f === U ? 0 : T ? (c * x) / f - 0.5 : (m / f) | 0,
              l = U,
              u = h = 0;
            u < c;
            u++
          )
            (a = (u % f) - i),
              (s = n - ((u / f) | 0)),
              (d[u] = o = b ? Math.abs("y" === b ? s : a) : K(a * a + s * s)),
              h < o && (h = o),
              o < l && (l = o);
          "random" === m && db(d),
            (d.max = h - l),
            (d.min = l),
            (d.v = c =
              (parseFloat(p.amount) ||
                parseFloat(p.each) *
                  (c < f
                    ? c - 1
                    : b
                    ? "y" === b
                      ? c / f
                      : f
                    : Math.max(f, c / f)) ||
                0) * ("edges" === m ? -1 : 1)),
            (d.b = c < 0 ? g - c : g),
            (d.u = Ya(p.amount || p.each) || 0),
            (_ = _ && c < 0 ? Yt(_) : _);
        }
        return (
          (c = (d[t] - d.min) / d.max || 0),
          ja(d.b + (_ ? _(c) : c) * d.v) + d.u
        );
      }
    );
  }
  function fb(i) {
    var n = Math.pow(10, ((i + "").split(".")[1] || "").length);
    return function (e) {
      var r = ja(Math.round(parseFloat(e) / i) * i * n);
      return (r - (r % 1)) / n + (t(e) ? 0 : Ya(e));
    };
  }
  function gb(h, e) {
    var l,
      f,
      r = $(h);
    return (
      !r &&
        v(h) &&
        ((l = r = h.radius || U),
        h.values
          ? ((h = Ot(h.values)), (f = !t(h[0])) && (l *= l))
          : (h = fb(h.increment))),
      Wa(
        e,
        r
          ? s(h)
            ? function (t) {
                return (f = h(t)), Math.abs(f - t) <= l ? f : t;
              }
            : function (e) {
                for (
                  var r,
                    i,
                    n = parseFloat(f ? e.x : e),
                    a = parseFloat(f ? e.y : 0),
                    s = U,
                    o = 0,
                    u = h.length;
                  u--;

                )
                  (r = f
                    ? (r = h[u].x - n) * r + (i = h[u].y - a) * i
                    : Math.abs(h[u] - n)) < s && ((s = r), (o = u));
                return (
                  (o = !l || s <= l ? h[o] : e),
                  f || o === e || t(e) ? o : o + Ya(e)
                );
              }
          : fb(h)
      )
    );
  }
  function hb(t, e, r, i) {
    return Wa($(t) ? !e : !0 === r ? !!(r = 0) : !i, function () {
      return $(t)
        ? t[~~(Math.random() * t.length)]
        : (r = r || 1e-5) &&
            (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) &&
            Math.floor(
              Math.round((t - r / 2 + Math.random() * (e - t + 0.99 * r)) / r) *
                r *
                i
            ) / i;
    });
  }
  function lb(e, r, t) {
    return Wa(t, function (t) {
      return e[~~r(t)];
    });
  }
  function ob(t) {
    for (var e, r, i, n, a = 0, s = ""; ~(e = t.indexOf("random(", a)); )
      (i = t.indexOf(")", e)),
        (n = "[" === t.charAt(e + 7)),
        (r = t.substr(e + 7, i - e - 7).match(n ? at : tt)),
        (s +=
          t.substr(a, e - a) + hb(n ? r : +r[0], n ? 0 : +r[1], +r[2] || 1e-5)),
        (a = i + 1);
    return s + t.substr(a, t.length - a);
  }
  function rb(t, e, r) {
    var i,
      n,
      a,
      s = t.labels,
      o = U;
    for (i in s)
      (n = s[i] - e) < 0 == !!r &&
        n &&
        o > (n = Math.abs(n)) &&
        ((a = i), (o = n));
    return a;
  }
  function tb(t) {
    return (
      za(t),
      t.scrollTrigger && t.scrollTrigger.kill(!!L),
      t.progress() < 1 && At(t, "onInterrupt"),
      t
    );
  }
  function wb(t) {
    if (x() && t) {
      var e = (t = (!t.name && t.default) || t).name,
        r = s(t),
        i =
          e && !r && t.init
            ? function () {
                this._props = [];
              }
            : t,
        n = {
          init: T,
          render: he,
          add: Qt,
          kill: ce,
          modifier: fe,
          rawVars: 0,
        },
        a = { targetTest: 0, get: 0, getSetter: ne, aliases: {}, register: 0 };
      if ((Ft(), t !== i)) {
        if (pt[e]) return;
        qa(i, qa(ua(t, n), a)),
          yt(i.prototype, yt(n, ua(t, a))),
          (pt[(i.prop = e)] = i),
          t.targetTest && (gt.push(i), (ft[e] = 1)),
          (e =
            ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) +
            "Plugin");
      }
      S(e, i), t.register && t.register(Ee, i, _e);
    } else t && Ct.push(t);
  }
  function zb(t, e, r) {
    return (
      ((6 * (t += t < 0 ? 1 : 1 < t ? -1 : 0) < 1
        ? e + (r - e) * t * 6
        : t < 0.5
        ? r
        : 3 * t < 2
        ? e + (r - e) * (2 / 3 - t) * 6
        : e) *
        St +
        0.5) |
      0
    );
  }
  function Ab(e, r, i) {
    var n,
      a,
      s,
      o,
      u,
      h,
      l,
      f,
      c,
      d,
      p = e ? (t(e) ? [e >> 16, (e >> 8) & St, e & St] : 0) : Et.black;
    if (!p) {
      if (("," === e.substr(-1) && (e = e.substr(0, e.length - 1)), Et[e]))
        p = Et[e];
      else if ("#" === e.charAt(0)) {
        if (
          (e.length < 6 &&
            (e =
              "#" +
              (n = e.charAt(1)) +
              n +
              (a = e.charAt(2)) +
              a +
              (s = e.charAt(3)) +
              s +
              (5 === e.length ? e.charAt(4) + e.charAt(4) : "")),
          9 === e.length)
        )
          return [
            (p = parseInt(e.substr(1, 6), 16)) >> 16,
            (p >> 8) & St,
            p & St,
            parseInt(e.substr(7), 16) / 255,
          ];
        p = [(e = parseInt(e.substr(1), 16)) >> 16, (e >> 8) & St, e & St];
      } else if ("hsl" === e.substr(0, 3))
        if (((p = d = e.match(tt)), r)) {
          if (~e.indexOf("="))
            return (p = e.match(et)), i && p.length < 4 && (p[3] = 1), p;
        } else
          (o = (+p[0] % 360) / 360),
            (u = p[1] / 100),
            (n =
              2 * (h = p[2] / 100) -
              (a = h <= 0.5 ? h * (u + 1) : h + u - h * u)),
            3 < p.length && (p[3] *= 1),
            (p[0] = zb(o + 1 / 3, n, a)),
            (p[1] = zb(o, n, a)),
            (p[2] = zb(o - 1 / 3, n, a));
      else p = e.match(tt) || Et.transparent;
      p = p.map(Number);
    }
    return (
      r &&
        !d &&
        ((n = p[0] / St),
        (a = p[1] / St),
        (s = p[2] / St),
        (h = ((l = Math.max(n, a, s)) + (f = Math.min(n, a, s))) / 2),
        l === f
          ? (o = u = 0)
          : ((c = l - f),
            (u = 0.5 < h ? c / (2 - l - f) : c / (l + f)),
            (o =
              l === n
                ? (a - s) / c + (a < s ? 6 : 0)
                : l === a
                ? (s - n) / c + 2
                : (n - a) / c + 4),
            (o *= 60)),
        (p[0] = ~~(o + 0.5)),
        (p[1] = ~~(100 * u + 0.5)),
        (p[2] = ~~(100 * h + 0.5))),
      i && p.length < 4 && (p[3] = 1),
      p
    );
  }
  function Bb(t) {
    var r = [],
      i = [],
      n = -1;
    return (
      t.split(Dt).forEach(function (t) {
        var e = t.match(rt) || [];
        r.push.apply(r, e), i.push((n += e.length + 1));
      }),
      (r.c = i),
      r
    );
  }
  function Cb(t, e, r) {
    var i,
      n,
      a,
      s,
      o = "",
      u = (t + o).match(Dt),
      h = e ? "hsla(" : "rgba(",
      l = 0;
    if (!u) return t;
    if (
      ((u = u.map(function (t) {
        return (
          (t = Ab(t, e, 1)) &&
          h +
            (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) +
            ")"
        );
      })),
      r && ((a = Bb(t)), (i = r.c).join(o) !== a.c.join(o)))
    )
      for (s = (n = t.replace(Dt, "1").split(rt)).length - 1; l < s; l++)
        o +=
          n[l] +
          (~i.indexOf(l)
            ? u.shift() || h + "0,0,0,0)"
            : (a.length ? a : u.length ? u : r).shift());
    if (!n) for (s = (n = t.split(Dt)).length - 1; l < s; l++) o += n[l] + u[l];
    return o + n[s];
  }
  function Fb(t) {
    var e,
      r = t.join(" ");
    if (((Dt.lastIndex = 0), Dt.test(r)))
      return (
        (e = zt.test(r)),
        (t[1] = Cb(t[1], e)),
        (t[0] = Cb(t[0], e, Bb(t[1]))),
        !0
      );
  }
  function Ob(t) {
    var e = (t + "").split("("),
      r = Bt[e[0]];
    return r && 1 < e.length && r.config
      ? r.config.apply(
          null,
          ~t.indexOf("{")
            ? [
                (function _parseObjectInString(t) {
                  for (
                    var e,
                      r,
                      i,
                      n = {},
                      a = t.substr(1, t.length - 3).split(":"),
                      s = a[0],
                      o = 1,
                      u = a.length;
                    o < u;
                    o++
                  )
                    (r = a[o]),
                      (e = o !== u - 1 ? r.lastIndexOf(",") : r.length),
                      (i = r.substr(0, e)),
                      (n[s] = isNaN(i) ? i.replace(It, "").trim() : +i),
                      (s = r.substr(e + 1).trim());
                  return n;
                })(e[1]),
              ]
            : (function _valueInParentheses(t) {
                var e = t.indexOf("(") + 1,
                  r = t.indexOf(")"),
                  i = t.indexOf("(", e);
                return t.substring(e, ~i && i < r ? t.indexOf(")", r + 1) : r);
              })(t)
                .split(",")
                .map(oa)
        )
      : Bt._CE && Lt.test(t)
      ? Bt._CE("", t)
      : r;
  }
  function Qb(t, e) {
    for (var r, i = t._first; i; )
      i instanceof Xt
        ? Qb(i, e)
        : !i.vars.yoyoEase ||
          (i._yoyo && i._repeat) ||
          i._yoyo === e ||
          (i.timeline
            ? Qb(i.timeline, e)
            : ((r = i._ease),
              (i._ease = i._yEase),
              (i._yEase = r),
              (i._yoyo = e))),
        (i = i._next);
  }
  function Sb(t, e, r, i) {
    void 0 === r &&
      (r = function easeOut(t) {
        return 1 - e(1 - t);
      }),
      void 0 === i &&
        (i = function easeInOut(t) {
          return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
        });
    var n,
      a = { easeIn: e, easeOut: r, easeInOut: i };
    return (
      ha(t, function (t) {
        for (var e in ((Bt[t] = ot[t] = a), (Bt[(n = t.toLowerCase())] = r), a))
          Bt[
            n + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")
          ] = Bt[t + "." + e] = a[e];
      }),
      a
    );
  }
  function Tb(e) {
    return function (t) {
      return t < 0.5 ? (1 - e(1 - 2 * t)) / 2 : 0.5 + e(2 * (t - 0.5)) / 2;
    };
  }
  function Ub(r, t, e) {
    function Jm(t) {
      return 1 === t ? 1 : i * Math.pow(2, -10 * t) * H((t - a) * n) + 1;
    }
    var i = 1 <= t ? t : 1,
      n = (e || (r ? 0.3 : 0.45)) / (t < 1 ? t : 1),
      a = (n / N) * (Math.asin(1 / i) || 0),
      s =
        "out" === r
          ? Jm
          : "in" === r
          ? function (t) {
              return 1 - Jm(1 - t);
            }
          : Tb(Jm);
    return (
      (n = N / n),
      (s.config = function (t, e) {
        return Ub(r, t, e);
      }),
      s
    );
  }
  function Vb(e, r) {
    function Rm(t) {
      return t ? --t * t * ((r + 1) * t + r) + 1 : 0;
    }
    void 0 === r && (r = 1.70158);
    var t =
      "out" === e
        ? Rm
        : "in" === e
        ? function (t) {
            return 1 - Rm(1 - t);
          }
        : Tb(Rm);
    return (
      (t.config = function (t) {
        return Vb(e, t);
      }),
      t
    );
  }
  var B,
    L,
    l,
    I,
    h,
    n,
    a,
    i,
    o,
    f,
    c,
    d,
    p,
    _,
    m,
    g,
    b,
    k,
    M,
    O,
    A,
    C,
    E,
    D,
    z,
    F,
    Y,
    j,
    q = {
      autoSleep: 120,
      force3D: "auto",
      nullTargetWarn: 1,
      units: { lineHeight: "" },
    },
    V = { duration: 0.5, overwrite: !1, delay: 0 },
    U = 1e8,
    X = 1 / U,
    N = 2 * Math.PI,
    W = N / 4,
    G = 0,
    K = Math.sqrt,
    J = Math.cos,
    H = Math.sin,
    Z =
      ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
      function () {},
    $ = Array.isArray,
    tt = /(?:-?\.?\d|\.)+/gi,
    et = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    rt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    it = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    nt = /[+-]=-?[.\d]+/,
    at = /[^,'"\[\]\s]+/gi,
    st = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    ot = {},
    ut = { suppressEvents: !0, isStart: !0, kill: !1 },
    ht = { suppressEvents: !0, kill: !1 },
    lt = { suppressEvents: !0 },
    ft = {},
    ct = [],
    dt = {},
    pt = {},
    _t = {},
    mt = 30,
    gt = [],
    vt = "",
    yt = function _merge(t, e) {
      for (var r in e) t[r] = e[r];
      return t;
    },
    Tt = function _animationCycle(t, e) {
      var r = Math.floor((t /= e));
      return t && r === t ? r - 1 : r;
    },
    bt = function _isFromOrFromStart(t) {
      var e = t.data;
      return "isFromStart" === e || "isStart" === e;
    },
    wt = { _start: 0, endTime: T, totalDuration: T },
    xt = function _parsePosition(t, e, i) {
      var n,
        a,
        s,
        o = t.labels,
        u = t._recent || wt,
        h = t.duration() >= U ? u.endTime(!1) : t._dur;
      return r(e) && (isNaN(e) || e in o)
        ? ((a = e.charAt(0)),
          (s = "%" === e.substr(-1)),
          (n = e.indexOf("=")),
          "<" === a || ">" === a
            ? (0 <= n && (e = e.replace(/=/, "")),
              ("<" === a ? u._start : u.endTime(0 <= u._repeat)) +
                (parseFloat(e.substr(1)) || 0) *
                  (s ? (n < 0 ? u : i).totalDuration() / 100 : 1))
            : n < 0
            ? (e in o || (o[e] = h), o[e])
            : ((a = parseFloat(e.charAt(n - 1) + e.substr(n + 1))),
              s && i && (a = (a / 100) * ($(i) ? i[0] : i).totalDuration()),
              1 < n ? _parsePosition(t, e.substr(0, n - 1), i) + a : h + a))
        : null == e
        ? h
        : +e;
    },
    kt = function _clamp(t, e, r) {
      return r < t ? t : e < r ? e : r;
    },
    Mt = [].slice,
    Ot = function toArray(t, e, i) {
      return l && !e && l.selector
        ? l.selector(t)
        : !r(t) || i || (!n && Ft())
        ? $(t)
          ? (function _flatten(t, e, i) {
              return (
                void 0 === i && (i = []),
                t.forEach(function (t) {
                  return (r(t) && !e) || _a(t, 1)
                    ? i.push.apply(i, Ot(t))
                    : i.push(t);
                }) || i
              );
            })(t, i)
          : _a(t)
          ? Mt.call(t, 0)
          : t
          ? [t]
          : []
        : Mt.call((e || a).querySelectorAll(t), 0);
    },
    Pt = function mapRange(e, t, r, i, n) {
      var a = t - e,
        s = i - r;
      return Wa(n, function (t) {
        return r + (((t - e) / a) * s || 0);
      });
    },
    At = function _callback(t, e, r) {
      var i,
        n,
        a,
        s = t.vars,
        o = s[e],
        u = l,
        h = t._ctx;
      if (o)
        return (
          (i = s[e + "Params"]),
          (n = s.callbackScope || t),
          r && ct.length && ma(),
          h && (l = h),
          (a = i ? o.apply(n, i) : o.call(n)),
          (l = u),
          a
        );
    },
    Ct = [],
    St = 255,
    Et = {
      aqua: [0, St, St],
      lime: [0, St, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, St],
      navy: [0, 0, 128],
      white: [St, St, St],
      olive: [128, 128, 0],
      yellow: [St, St, 0],
      orange: [St, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [St, 0, 0],
      pink: [St, 192, 203],
      cyan: [0, St, St],
      transparent: [St, St, St, 0],
    },
    Dt = (function () {
      var t,
        e =
          "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
      for (t in Et) e += "|" + t + "\\b";
      return new RegExp(e + ")", "gi");
    })(),
    zt = /hsl[a]?\(/,
    Rt =
      ((M = Date.now),
      (O = 500),
      (A = 33),
      (C = M()),
      (E = C),
      (z = D = 1e3 / 240),
      (g = {
        time: 0,
        frame: 0,
        tick: function tick() {
          yl(!0);
        },
        deltaRatio: function deltaRatio(t) {
          return b / (1e3 / (t || 60));
        },
        wake: function wake() {
          o &&
            (!n &&
              x() &&
              ((h = n = window),
              (a = h.document || {}),
              (ot.gsap = Ee),
              (h.gsapVersions || (h.gsapVersions = [])).push(Ee.version),
              P(i || h.GreenSockGlobals || (!h.gsap && h) || {}),
              (m = h.requestAnimationFrame),
              Ct.forEach(wb)),
            p && g.sleep(),
            (_ =
              m ||
              function (t) {
                return setTimeout(t, (z - 1e3 * g.time + 1) | 0);
              }),
            (d = 1),
            yl(2));
        },
        sleep: function sleep() {
          (m ? h.cancelAnimationFrame : clearTimeout)(p), (d = 0), (_ = T);
        },
        lagSmoothing: function lagSmoothing(t, e) {
          (O = t || 1 / 0), (A = Math.min(e || 33, O));
        },
        fps: function fps(t) {
          (D = 1e3 / (t || 240)), (z = 1e3 * g.time + D);
        },
        add: function add(n, t, e) {
          var a = t
            ? function (t, e, r, i) {
                n(t, e, r, i), g.remove(a);
              }
            : n;
          return g.remove(n), F[e ? "unshift" : "push"](a), Ft(), a;
        },
        remove: function remove(t, e) {
          ~(e = F.indexOf(t)) && F.splice(e, 1) && e <= k && k--;
        },
        _listeners: (F = []),
      })),
    Ft = function _wake() {
      return !d && Rt.wake();
    },
    Bt = {},
    Lt = /^[\d.\-M][\d.\-,\s]/,
    It = /["']/g,
    Yt = function _invertEase(e) {
      return function (t) {
        return 1 - e(1 - t);
      };
    },
    jt = function _parseEase(t, e) {
      return (t && (s(t) ? t : Bt[t] || Ob(t))) || e;
    };
  function yl(t) {
    var e,
      r,
      i,
      n,
      a = M() - E,
      s = !0 === t;
    if (
      (O < a && (C += a - A),
      (0 < (e = (i = (E += a) - C) - z) || s) &&
        ((n = ++g.frame),
        (b = i - 1e3 * g.time),
        (g.time = i /= 1e3),
        (z += e + (D <= e ? 4 : D - e)),
        (r = 1)),
      s || (p = _(yl)),
      r)
    )
      for (k = 0; k < F.length; k++) F[k](i, b, n, t);
  }
  function gn(t) {
    return t < j
      ? Y * t * t
      : t < 0.7272727272727273
      ? Y * Math.pow(t - 1.5 / 2.75, 2) + 0.75
      : t < 0.9090909090909092
      ? Y * (t -= 2.25 / 2.75) * t + 0.9375
      : Y * Math.pow(t - 2.625 / 2.75, 2) + 0.984375;
  }
  ha("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
    var r = e < 5 ? e + 1 : e;
    Sb(
      t + ",Power" + (r - 1),
      e
        ? function (t) {
            return Math.pow(t, r);
          }
        : function (t) {
            return t;
          },
      function (t) {
        return 1 - Math.pow(1 - t, r);
      },
      function (t) {
        return t < 0.5
          ? Math.pow(2 * t, r) / 2
          : 1 - Math.pow(2 * (1 - t), r) / 2;
      }
    );
  }),
    (Bt.Linear.easeNone = Bt.none = Bt.Linear.easeIn),
    Sb("Elastic", Ub("in"), Ub("out"), Ub()),
    (Y = 7.5625),
    (j = 1 / 2.75),
    Sb(
      "Bounce",
      function (t) {
        return 1 - gn(1 - t);
      },
      gn
    ),
    Sb("Expo", function (t) {
      return t ? Math.pow(2, 10 * (t - 1)) : 0;
    }),
    Sb("Circ", function (t) {
      return -(K(1 - t * t) - 1);
    }),
    Sb("Sine", function (t) {
      return 1 === t ? 1 : 1 - J(t * W);
    }),
    Sb("Back", Vb("in"), Vb("out"), Vb()),
    (Bt.SteppedEase =
      Bt.steps =
      ot.SteppedEase =
        {
          config: function config(t, e) {
            void 0 === t && (t = 1);
            var r = 1 / t,
              i = t + (e ? 0 : 1),
              n = e ? 1 : 0;
            return function (t) {
              return (((i * kt(0, 0.99999999, t)) | 0) + n) * r;
            };
          },
        }),
    (V.ease = Bt["quad.out"]),
    ha(
      "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
      function (t) {
        return (vt += t + "," + t + "Params,");
      }
    );
  var qt,
    Vt = function GSCache(t, e) {
      (this.id = G++),
        ((t._gsap = this).target = t),
        (this.harness = e),
        (this.get = e ? e.get : ga),
        (this.set = e ? e.getSetter : ne);
    },
    Ut =
      (((qt = Animation.prototype).delay = function delay(t) {
        return t || 0 === t
          ? (this.parent &&
              this.parent.smoothChildTiming &&
              this.startTime(this._start + t - this._delay),
            (this._delay = t),
            this)
          : this._delay;
      }),
      (qt.duration = function duration(t) {
        return arguments.length
          ? this.totalDuration(
              0 < this._repeat ? t + (t + this._rDelay) * this._repeat : t
            )
          : this.totalDuration() && this._dur;
      }),
      (qt.totalDuration = function totalDuration(t) {
        return arguments.length
          ? ((this._dirty = 0),
            Ra(
              this,
              this._repeat < 0
                ? t
                : (t - this._repeat * this._rDelay) / (this._repeat + 1)
            ))
          : this._tDur;
      }),
      (qt.totalTime = function totalTime(t, e) {
        if ((Ft(), !arguments.length)) return this._tTime;
        var r = this._dp;
        if (r && r.smoothChildTiming && this._ts) {
          for (Ia(this, t), !r._dp || r.parent || Ja(r, this); r && r.parent; )
            r.parent._time !==
              r._start +
                (0 <= r._ts
                  ? r._tTime / r._ts
                  : (r.totalDuration() - r._tTime) / -r._ts) &&
              r.totalTime(r._tTime, !0),
              (r = r.parent);
          !this.parent &&
            this._dp.autoRemoveChildren &&
            ((0 < this._ts && t < this._tDur) ||
              (this._ts < 0 && 0 < t) ||
              (!this._tDur && !t)) &&
            Ka(this._dp, this, this._start - this._delay);
        }
        return (
          (this._tTime !== t ||
            (!this._dur && !e) ||
            (this._initted && Math.abs(this._zTime) === X) ||
            (!t && !this._initted && (this.add || this._ptLookup))) &&
            (this._ts || (this._pTime = t), na(this, t, e)),
          this
        );
      }),
      (qt.time = function time(t, e) {
        return arguments.length
          ? this.totalTime(
              Math.min(this.totalDuration(), t + Ea(this)) %
                (this._dur + this._rDelay) || (t ? this._dur : 0),
              e
            )
          : this._time;
      }),
      (qt.totalProgress = function totalProgress(t, e) {
        return arguments.length
          ? this.totalTime(this.totalDuration() * t, e)
          : this.totalDuration()
          ? Math.min(1, this._tTime / this._tDur)
          : this.ratio;
      }),
      (qt.progress = function progress(t, e) {
        return arguments.length
          ? this.totalTime(
              this.duration() *
                (!this._yoyo || 1 & this.iteration() ? t : 1 - t) +
                Ea(this),
              e
            )
          : this.duration()
          ? Math.min(1, this._time / this._dur)
          : this.ratio;
      }),
      (qt.iteration = function iteration(t, e) {
        var r = this.duration() + this._rDelay;
        return arguments.length
          ? this.totalTime(this._time + (t - 1) * r, e)
          : this._repeat
          ? Tt(this._tTime, r) + 1
          : 1;
      }),
      (qt.timeScale = function timeScale(t) {
        if (!arguments.length) return this._rts === -X ? 0 : this._rts;
        if (this._rts === t) return this;
        var e =
          this.parent && this._ts ? Ga(this.parent._time, this) : this._tTime;
        return (
          (this._rts = +t || 0),
          (this._ts = this._ps || t === -X ? 0 : this._rts),
          this.totalTime(kt(-Math.abs(this._delay), this._tDur, e), !0),
          Ha(this),
          (function _recacheAncestors(t) {
            for (var e = t.parent; e && e.parent; )
              (e._dirty = 1), e.totalDuration(), (e = e.parent);
            return t;
          })(this)
        );
      }),
      (qt.paused = function paused(t) {
        return arguments.length
          ? (this._ps !== t &&
              ((this._ps = t)
                ? ((this._pTime =
                    this._tTime || Math.max(-this._delay, this.rawTime())),
                  (this._ts = this._act = 0))
                : (Ft(),
                  (this._ts = this._rts),
                  this.totalTime(
                    this.parent && !this.parent.smoothChildTiming
                      ? this.rawTime()
                      : this._tTime || this._pTime,
                    1 === this.progress() &&
                      Math.abs(this._zTime) !== X &&
                      (this._tTime -= X)
                  ))),
            this)
          : this._ps;
      }),
      (qt.startTime = function startTime(t) {
        if (arguments.length) {
          this._start = t;
          var e = this.parent || this._dp;
          return (
            !e || (!e._sort && this.parent) || Ka(e, this, t - this._delay),
            this
          );
        }
        return this._start;
      }),
      (qt.endTime = function endTime(t) {
        return (
          this._start +
          (w(t) ? this.totalDuration() : this.duration()) /
            Math.abs(this._ts || 1)
        );
      }),
      (qt.rawTime = function rawTime(t) {
        var e = this.parent || this._dp;
        return e
          ? t &&
            (!this._ts ||
              (this._repeat && this._time && this.totalProgress() < 1))
            ? this._tTime % (this._dur + this._rDelay)
            : this._ts
            ? Ga(e.rawTime(t), this)
            : this._tTime
          : this._tTime;
      }),
      (qt.revert = function revert(t) {
        void 0 === t && (t = lt);
        var e = L;
        return (
          (L = t),
          (this._initted || this._startAt) &&
            (this.timeline && this.timeline.revert(t),
            this.totalTime(-0.01, t.suppressEvents)),
          "nested" !== this.data && !1 !== t.kill && this.kill(),
          (L = e),
          this
        );
      }),
      (qt.globalTime = function globalTime(t) {
        for (var e = this, r = arguments.length ? t : e.rawTime(); e; )
          (r = e._start + r / (e._ts || 1)), (e = e._dp);
        return !this.parent && this._sat
          ? this._sat.vars.immediateRender
            ? -1
            : this._sat.globalTime(t)
          : r;
      }),
      (qt.repeat = function repeat(t) {
        return arguments.length
          ? ((this._repeat = t === 1 / 0 ? -2 : t), Sa(this))
          : -2 === this._repeat
          ? 1 / 0
          : this._repeat;
      }),
      (qt.repeatDelay = function repeatDelay(t) {
        if (arguments.length) {
          var e = this._time;
          return (this._rDelay = t), Sa(this), e ? this.time(e) : this;
        }
        return this._rDelay;
      }),
      (qt.yoyo = function yoyo(t) {
        return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
      }),
      (qt.seek = function seek(t, e) {
        return this.totalTime(xt(this, t), w(e));
      }),
      (qt.restart = function restart(t, e) {
        return this.play().totalTime(t ? -this._delay : 0, w(e));
      }),
      (qt.play = function play(t, e) {
        return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
      }),
      (qt.reverse = function reverse(t, e) {
        return (
          null != t && this.seek(t || this.totalDuration(), e),
          this.reversed(!0).paused(!1)
        );
      }),
      (qt.pause = function pause(t, e) {
        return null != t && this.seek(t, e), this.paused(!0);
      }),
      (qt.resume = function resume() {
        return this.paused(!1);
      }),
      (qt.reversed = function reversed(t) {
        return arguments.length
          ? (!!t !== this.reversed() &&
              this.timeScale(-this._rts || (t ? -X : 0)),
            this)
          : this._rts < 0;
      }),
      (qt.invalidate = function invalidate() {
        return (this._initted = this._act = 0), (this._zTime = -X), this;
      }),
      (qt.isActive = function isActive() {
        var t,
          e = this.parent || this._dp,
          r = this._start;
        return !(
          e &&
          !(
            this._ts &&
            this._initted &&
            e.isActive() &&
            (t = e.rawTime(!0)) >= r &&
            t < this.endTime(!0) - X
          )
        );
      }),
      (qt.eventCallback = function eventCallback(t, e, r) {
        var i = this.vars;
        return 1 < arguments.length
          ? (e
              ? ((i[t] = e),
                r && (i[t + "Params"] = r),
                "onUpdate" === t && (this._onUpdate = e))
              : delete i[t],
            this)
          : i[t];
      }),
      (qt.then = function then(t) {
        var i = this;
        return new Promise(function (e) {
          function Bo() {
            var t = i.then;
            (i.then = null),
              s(r) && (r = r(i)) && (r.then || r === i) && (i.then = t),
              e(r),
              (i.then = t);
          }
          var r = s(t) ? t : pa;
          (i._initted && 1 === i.totalProgress() && 0 <= i._ts) ||
          (!i._tTime && i._ts < 0)
            ? Bo()
            : (i._prom = Bo);
        });
      }),
      (qt.kill = function kill() {
        tb(this);
      }),
      Animation);
  function Animation(t) {
    (this.vars = t),
      (this._delay = +t.delay || 0),
      (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
        ((this._rDelay = t.repeatDelay || 0),
        (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
      (this._ts = 1),
      Ra(this, +t.duration, 1, 1),
      (this.data = t.data),
      l && (this._ctx = l).data.push(this),
      d || Rt.wake();
  }
  qa(Ut.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -X,
    _prom: 0,
    _ps: !1,
    _rts: 1,
  });
  var Xt = (function (i) {
    function Timeline(t, e) {
      var r;
      return (
        void 0 === t && (t = {}),
        ((r = i.call(this, t) || this).labels = {}),
        (r.smoothChildTiming = !!t.smoothChildTiming),
        (r.autoRemoveChildren = !!t.autoRemoveChildren),
        (r._sort = w(t.sortChildren)),
        I && Ka(t.parent || I, _assertThisInitialized(r), e),
        t.reversed && r.reverse(),
        t.paused && r.paused(!0),
        t.scrollTrigger && La(_assertThisInitialized(r), t.scrollTrigger),
        r
      );
    }
    _inheritsLoose(Timeline, i);
    var e = Timeline.prototype;
    return (
      (e.to = function to(t, e, r) {
        return Va(0, arguments, this), this;
      }),
      (e.from = function from(t, e, r) {
        return Va(1, arguments, this), this;
      }),
      (e.fromTo = function fromTo(t, e, r, i) {
        return Va(2, arguments, this), this;
      }),
      (e.set = function set(t, e, r) {
        return (
          (e.duration = 0),
          (e.parent = this),
          va(e).repeatDelay || (e.repeat = 0),
          (e.immediateRender = !!e.immediateRender),
          new Zt(t, e, xt(this, r), 1),
          this
        );
      }),
      (e.call = function call(t, e, r) {
        return Ka(this, Zt.delayedCall(0, t, e), r);
      }),
      (e.staggerTo = function staggerTo(t, e, r, i, n, a, s) {
        return (
          (r.duration = e),
          (r.stagger = r.stagger || i),
          (r.onComplete = a),
          (r.onCompleteParams = s),
          (r.parent = this),
          new Zt(t, r, xt(this, n)),
          this
        );
      }),
      (e.staggerFrom = function staggerFrom(t, e, r, i, n, a, s) {
        return (
          (r.runBackwards = 1),
          (va(r).immediateRender = w(r.immediateRender)),
          this.staggerTo(t, e, r, i, n, a, s)
        );
      }),
      (e.staggerFromTo = function staggerFromTo(t, e, r, i, n, a, s, o) {
        return (
          (i.startAt = r),
          (va(i).immediateRender = w(i.immediateRender)),
          this.staggerTo(t, e, i, n, a, s, o)
        );
      }),
      (e.render = function render(t, e, r) {
        var i,
          n,
          a,
          s,
          o,
          u,
          h,
          l,
          f,
          c,
          d,
          p,
          _ = this._time,
          m = this._dirty ? this.totalDuration() : this._tDur,
          g = this._dur,
          v = t <= 0 ? 0 : ja(t),
          y = this._zTime < 0 != t < 0 && (this._initted || !g);
        if (
          (this !== I && m < v && 0 <= t && (v = m),
          v !== this._tTime || r || y)
        ) {
          if (
            (_ !== this._time &&
              g &&
              ((v += this._time - _), (t += this._time - _)),
            (i = v),
            (f = this._start),
            (u = !(l = this._ts)),
            y && (g || (_ = this._zTime), (!t && e) || (this._zTime = t)),
            this._repeat)
          ) {
            if (
              ((d = this._yoyo),
              (o = g + this._rDelay),
              this._repeat < -1 && t < 0)
            )
              return this.totalTime(100 * o + t, e, r);
            if (
              ((i = ja(v % o)),
              v === m
                ? ((s = this._repeat), (i = g))
                : ((s = ~~(v / o)) && s === v / o && ((i = g), s--),
                  g < i && (i = g)),
              (c = Tt(this._tTime, o)),
              !_ &&
                this._tTime &&
                c !== s &&
                this._tTime - c * o - this._dur <= 0 &&
                (c = s),
              d && 1 & s && ((i = g - i), (p = 1)),
              s !== c && !this._lock)
            ) {
              var T = d && 1 & c,
                b = T === (d && 1 & s);
              if (
                (s < c && (T = !T),
                (_ = T ? 0 : g),
                (this._lock = 1),
                (this.render(_ || (p ? 0 : ja(s * o)), e, !g)._lock = 0),
                (this._tTime = v),
                !e && this.parent && At(this, "onRepeat"),
                this.vars.repeatRefresh && !p && (this.invalidate()._lock = 1),
                (_ && _ !== this._time) ||
                  u != !this._ts ||
                  (this.vars.onRepeat && !this.parent && !this._act))
              )
                return this;
              if (
                ((g = this._dur),
                (m = this._tDur),
                b &&
                  ((this._lock = 2),
                  (_ = T ? g : -1e-4),
                  this.render(_, !0),
                  this.vars.repeatRefresh && !p && this.invalidate()),
                (this._lock = 0),
                !this._ts && !u)
              )
                return this;
              Qb(this, p);
            }
          }
          if (
            (this._hasPause &&
              !this._forcing &&
              this._lock < 2 &&
              (h = (function _findNextPauseTween(t, e, r) {
                var i;
                if (e < r)
                  for (i = t._first; i && i._start <= r; ) {
                    if ("isPause" === i.data && i._start > e) return i;
                    i = i._next;
                  }
                else
                  for (i = t._last; i && i._start >= r; ) {
                    if ("isPause" === i.data && i._start < e) return i;
                    i = i._prev;
                  }
              })(this, ja(_), ja(i))) &&
              (v -= i - (i = h._start)),
            (this._tTime = v),
            (this._time = i),
            (this._act = !l),
            this._initted ||
              ((this._onUpdate = this.vars.onUpdate),
              (this._initted = 1),
              (this._zTime = t),
              (_ = 0)),
            !_ && i && !e && !s && (At(this, "onStart"), this._tTime !== v))
          )
            return this;
          if (_ <= i && 0 <= t)
            for (n = this._first; n; ) {
              if (
                ((a = n._next), (n._act || i >= n._start) && n._ts && h !== n)
              ) {
                if (n.parent !== this) return this.render(t, e, r);
                if (
                  (n.render(
                    0 < n._ts
                      ? (i - n._start) * n._ts
                      : (n._dirty ? n.totalDuration() : n._tDur) +
                          (i - n._start) * n._ts,
                    e,
                    r
                  ),
                  i !== this._time || (!this._ts && !u))
                ) {
                  (h = 0), a && (v += this._zTime = -X);
                  break;
                }
              }
              n = a;
            }
          else {
            n = this._last;
            for (var w = t < 0 ? t : i; n; ) {
              if (
                ((a = n._prev), (n._act || w <= n._end) && n._ts && h !== n)
              ) {
                if (n.parent !== this) return this.render(t, e, r);
                if (
                  (n.render(
                    0 < n._ts
                      ? (w - n._start) * n._ts
                      : (n._dirty ? n.totalDuration() : n._tDur) +
                          (w - n._start) * n._ts,
                    e,
                    r || (L && (n._initted || n._startAt))
                  ),
                  i !== this._time || (!this._ts && !u))
                ) {
                  (h = 0), a && (v += this._zTime = w ? -X : X);
                  break;
                }
              }
              n = a;
            }
          }
          if (
            h &&
            !e &&
            (this.pause(),
            (h.render(_ <= i ? 0 : -X)._zTime = _ <= i ? 1 : -1),
            this._ts)
          )
            return (this._start = f), Ha(this), this.render(t, e, r);
          this._onUpdate && !e && At(this, "onUpdate", !0),
            ((v === m && this._tTime >= this.totalDuration()) || (!v && _)) &&
              ((f !== this._start && Math.abs(l) === Math.abs(this._ts)) ||
                this._lock ||
                ((!t && g) ||
                  !((v === m && 0 < this._ts) || (!v && this._ts < 0)) ||
                  za(this, 1),
                e ||
                  (t < 0 && !_) ||
                  (!v && !_ && m) ||
                  (At(
                    this,
                    v === m && 0 <= t ? "onComplete" : "onReverseComplete",
                    !0
                  ),
                  !this._prom ||
                    (v < m && 0 < this.timeScale()) ||
                    this._prom())));
        }
        return this;
      }),
      (e.add = function add(e, i) {
        var n = this;
        if ((t(i) || (i = xt(this, i, e)), !(e instanceof Ut))) {
          if ($(e))
            return (
              e.forEach(function (t) {
                return n.add(t, i);
              }),
              this
            );
          if (r(e)) return this.addLabel(e, i);
          if (!s(e)) return this;
          e = Zt.delayedCall(0, e);
        }
        return this !== e ? Ka(this, e, i) : this;
      }),
      (e.getChildren = function getChildren(t, e, r, i) {
        void 0 === t && (t = !0),
          void 0 === e && (e = !0),
          void 0 === r && (r = !0),
          void 0 === i && (i = -U);
        for (var n = [], a = this._first; a; )
          a._start >= i &&
            (a instanceof Zt
              ? e && n.push(a)
              : (r && n.push(a),
                t && n.push.apply(n, a.getChildren(!0, e, r)))),
            (a = a._next);
        return n;
      }),
      (e.getById = function getById(t) {
        for (var e = this.getChildren(1, 1, 1), r = e.length; r--; )
          if (e[r].vars.id === t) return e[r];
      }),
      (e.remove = function remove(t) {
        return r(t)
          ? this.removeLabel(t)
          : s(t)
          ? this.killTweensOf(t)
          : (ya(this, t),
            t === this._recent && (this._recent = this._last),
            Aa(this));
      }),
      (e.totalTime = function totalTime(t, e) {
        return arguments.length
          ? ((this._forcing = 1),
            !this._dp &&
              this._ts &&
              (this._start = ja(
                Rt.time -
                  (0 < this._ts
                    ? t / this._ts
                    : (this.totalDuration() - t) / -this._ts)
              )),
            i.prototype.totalTime.call(this, t, e),
            (this._forcing = 0),
            this)
          : this._tTime;
      }),
      (e.addLabel = function addLabel(t, e) {
        return (this.labels[t] = xt(this, e)), this;
      }),
      (e.removeLabel = function removeLabel(t) {
        return delete this.labels[t], this;
      }),
      (e.addPause = function addPause(t, e, r) {
        var i = Zt.delayedCall(0, e || T, r);
        return (
          (i.data = "isPause"), (this._hasPause = 1), Ka(this, i, xt(this, t))
        );
      }),
      (e.removePause = function removePause(t) {
        var e = this._first;
        for (t = xt(this, t); e; )
          e._start === t && "isPause" === e.data && za(e), (e = e._next);
      }),
      (e.killTweensOf = function killTweensOf(t, e, r) {
        for (var i = this.getTweensOf(t, r), n = i.length; n--; )
          Nt !== i[n] && i[n].kill(t, e);
        return this;
      }),
      (e.getTweensOf = function getTweensOf(e, r) {
        for (var i, n = [], a = Ot(e), s = this._first, o = t(r); s; )
          s instanceof Zt
            ? la(s._targets, a) &&
              (o
                ? (!Nt || (s._initted && s._ts)) &&
                  s.globalTime(0) <= r &&
                  s.globalTime(s.totalDuration()) > r
                : !r || s.isActive()) &&
              n.push(s)
            : (i = s.getTweensOf(a, r)).length && n.push.apply(n, i),
            (s = s._next);
        return n;
      }),
      (e.tweenTo = function tweenTo(t, e) {
        e = e || {};
        var r,
          i = this,
          n = xt(i, t),
          a = e.startAt,
          s = e.onStart,
          o = e.onStartParams,
          u = e.immediateRender,
          h = Zt.to(
            i,
            qa(
              {
                ease: e.ease || "none",
                lazy: !1,
                immediateRender: !1,
                time: n,
                overwrite: "auto",
                duration:
                  e.duration ||
                  Math.abs(
                    (n - (a && "time" in a ? a.time : i._time)) / i.timeScale()
                  ) ||
                  X,
                onStart: function onStart() {
                  if ((i.pause(), !r)) {
                    var t =
                      e.duration ||
                      Math.abs(
                        (n - (a && "time" in a ? a.time : i._time)) /
                          i.timeScale()
                      );
                    h._dur !== t && Ra(h, t, 0, 1).render(h._time, !0, !0),
                      (r = 1);
                  }
                  s && s.apply(h, o || []);
                },
              },
              e
            )
          );
        return u ? h.render(0) : h;
      }),
      (e.tweenFromTo = function tweenFromTo(t, e, r) {
        return this.tweenTo(e, qa({ startAt: { time: xt(this, t) } }, r));
      }),
      (e.recent = function recent() {
        return this._recent;
      }),
      (e.nextLabel = function nextLabel(t) {
        return void 0 === t && (t = this._time), rb(this, xt(this, t));
      }),
      (e.previousLabel = function previousLabel(t) {
        return void 0 === t && (t = this._time), rb(this, xt(this, t), 1);
      }),
      (e.currentLabel = function currentLabel(t) {
        return arguments.length
          ? this.seek(t, !0)
          : this.previousLabel(this._time + X);
      }),
      (e.shiftChildren = function shiftChildren(t, e, r) {
        void 0 === r && (r = 0);
        for (var i, n = this._first, a = this.labels; n; )
          n._start >= r && ((n._start += t), (n._end += t)), (n = n._next);
        if (e) for (i in a) a[i] >= r && (a[i] += t);
        return Aa(this);
      }),
      (e.invalidate = function invalidate(t) {
        var e = this._first;
        for (this._lock = 0; e; ) e.invalidate(t), (e = e._next);
        return i.prototype.invalidate.call(this, t);
      }),
      (e.clear = function clear(t) {
        void 0 === t && (t = !0);
        for (var e, r = this._first; r; )
          (e = r._next), this.remove(r), (r = e);
        return (
          this._dp && (this._time = this._tTime = this._pTime = 0),
          t && (this.labels = {}),
          Aa(this)
        );
      }),
      (e.totalDuration = function totalDuration(t) {
        var e,
          r,
          i,
          n = 0,
          a = this,
          s = a._last,
          o = U;
        if (arguments.length)
          return a.timeScale(
            (a._repeat < 0 ? a.duration() : a.totalDuration()) /
              (a.reversed() ? -t : t)
          );
        if (a._dirty) {
          for (i = a.parent; s; )
            (e = s._prev),
              s._dirty && s.totalDuration(),
              o < (r = s._start) && a._sort && s._ts && !a._lock
                ? ((a._lock = 1), (Ka(a, s, r - s._delay, 1)._lock = 0))
                : (o = r),
              r < 0 &&
                s._ts &&
                ((n -= r),
                ((!i && !a._dp) || (i && i.smoothChildTiming)) &&
                  ((a._start += r / a._ts), (a._time -= r), (a._tTime -= r)),
                a.shiftChildren(-r, !1, -Infinity),
                (o = 0)),
              s._end > n && s._ts && (n = s._end),
              (s = e);
          Ra(a, a === I && a._time > n ? a._time : n, 1, 1), (a._dirty = 0);
        }
        return a._tDur;
      }),
      (Timeline.updateRoot = function updateRoot(t) {
        if ((I._ts && (na(I, Ga(t, I)), (f = Rt.frame)), Rt.frame >= mt)) {
          mt += q.autoSleep || 120;
          var e = I._first;
          if ((!e || !e._ts) && q.autoSleep && Rt._listeners.length < 2) {
            for (; e && !e._ts; ) e = e._next;
            e || Rt.sleep();
          }
        }
      }),
      Timeline
    );
  })(Ut);
  qa(Xt.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
  function ac(t, e, i, n, a, o) {
    var u, h, l, f;
    if (
      pt[t] &&
      !1 !==
        (u = new pt[t]()).init(
          a,
          u.rawVars
            ? e[t]
            : (function _processVars(t, e, i, n, a) {
                if (
                  (s(t) && (t = Kt(t, a, e, i, n)),
                  !v(t) || (t.style && t.nodeType) || $(t) || Z(t))
                )
                  return r(t) ? Kt(t, a, e, i, n) : t;
                var o,
                  u = {};
                for (o in t) u[o] = Kt(t[o], a, e, i, n);
                return u;
              })(e[t], n, a, o, i),
          i,
          n,
          o
        ) &&
      ((i._pt = h = new _e(i._pt, a, t, 0, 1, u.render, u, 0, u.priority)),
      i !== c)
    )
      for (l = i._ptLookup[i._targets.indexOf(a)], f = u._props.length; f--; )
        l[u._props[f]] = h;
    return u;
  }
  function gc(t, r, e, i) {
    var n,
      a,
      s = r.ease || i || "power1.inOut";
    if ($(r))
      (a = e[t] || (e[t] = [])),
        r.forEach(function (t, e) {
          return a.push({ t: (e / (r.length - 1)) * 100, v: t, e: s });
        });
    else
      for (n in r)
        (a = e[n] || (e[n] = [])),
          "ease" === n || a.push({ t: parseFloat(t), v: r[n], e: s });
  }
  var Nt,
    Wt,
    Qt = function _addPropTween(t, e, i, n, a, o, u, h, l, f) {
      s(n) && (n = n(a || 0, t, o));
      var c,
        d = t[e],
        p =
          "get" !== i
            ? i
            : s(d)
            ? l
              ? t[
                  e.indexOf("set") || !s(t["get" + e.substr(3)])
                    ? e
                    : "get" + e.substr(3)
                ](l)
              : t[e]()
            : d,
        _ = s(d) ? (l ? re : te) : $t;
      if (
        (r(n) &&
          (~n.indexOf("random(") && (n = ob(n)),
          "=" === n.charAt(1) &&
            ((!(c = ka(p, n) + (Ya(p) || 0)) && 0 !== c) || (n = c))),
        !f || p !== n || Wt)
      )
        return isNaN(p * n) || "" === n
          ? (d || e in t || Q(e, n),
            function _addComplexStringPropTween(t, e, r, i, n, a, s) {
              var o,
                u,
                h,
                l,
                f,
                c,
                d,
                p,
                _ = new _e(this._pt, t, e, 0, 1, ue, null, n),
                m = 0,
                g = 0;
              for (
                _.b = r,
                  _.e = i,
                  r += "",
                  (d = ~(i += "").indexOf("random(")) && (i = ob(i)),
                  a && (a((p = [r, i]), t, e), (r = p[0]), (i = p[1])),
                  u = r.match(it) || [];
                (o = it.exec(i));

              )
                (l = o[0]),
                  (f = i.substring(m, o.index)),
                  h ? (h = (h + 1) % 5) : "rgba(" === f.substr(-5) && (h = 1),
                  l !== u[g++] &&
                    ((c = parseFloat(u[g - 1]) || 0),
                    (_._pt = {
                      _next: _._pt,
                      p: f || 1 === g ? f : ",",
                      s: c,
                      c: "=" === l.charAt(1) ? ka(c, l) - c : parseFloat(l) - c,
                      m: h && h < 4 ? Math.round : 0,
                    }),
                    (m = it.lastIndex));
              return (
                (_.c = m < i.length ? i.substring(m, i.length) : ""),
                (_.fp = s),
                (nt.test(i) || d) && (_.e = 0),
                (this._pt = _)
              );
            }.call(this, t, e, p, n, _, h || q.stringFilter, l))
          : ((c = new _e(
              this._pt,
              t,
              e,
              +p || 0,
              n - (p || 0),
              "boolean" == typeof d ? se : ae,
              0,
              _
            )),
            l && (c.fp = l),
            u && c.modifier(u, this, t),
            (this._pt = c));
    },
    Gt = function _initTween(t, e, r) {
      var i,
        n,
        a,
        s,
        o,
        u,
        h,
        l,
        f,
        c,
        d,
        p,
        _,
        m = t.vars,
        g = m.ease,
        v = m.startAt,
        y = m.immediateRender,
        T = m.lazy,
        b = m.onUpdate,
        x = m.onUpdateParams,
        k = m.callbackScope,
        M = m.runBackwards,
        O = m.yoyoEase,
        P = m.keyframes,
        A = m.autoRevert,
        C = t._dur,
        S = t._startAt,
        E = t._targets,
        D = t.parent,
        z = D && "nested" === D.data ? D.vars.targets : E,
        R = "auto" === t._overwrite && !B,
        F = t.timeline;
      if (
        (!F || (P && g) || (g = "none"),
        (t._ease = jt(g, V.ease)),
        (t._yEase = O ? Yt(jt(!0 === O ? g : O, V.ease)) : 0),
        O &&
          t._yoyo &&
          !t._repeat &&
          ((O = t._yEase), (t._yEase = t._ease), (t._ease = O)),
        (t._from = !F && !!m.runBackwards),
        !F || (P && !m.stagger))
      ) {
        if (
          ((p = (l = E[0] ? fa(E[0]).harness : 0) && m[l.prop]),
          (i = ua(m, ft)),
          S &&
            (S._zTime < 0 && S.progress(1),
            e < 0 && M && y && !A
              ? S.render(-1, !0)
              : S.revert(M && C ? ht : ut),
            (S._lazy = 0)),
          v)
        ) {
          if (
            (za(
              (t._startAt = Zt.set(
                E,
                qa(
                  {
                    data: "isStart",
                    overwrite: !1,
                    parent: D,
                    immediateRender: !0,
                    lazy: !S && w(T),
                    startAt: null,
                    delay: 0,
                    onUpdate: b,
                    onUpdateParams: x,
                    callbackScope: k,
                    stagger: 0,
                  },
                  v
                )
              ))
            ),
            (t._startAt._dp = 0),
            (t._startAt._sat = t),
            e < 0 && (L || (!y && !A)) && t._startAt.revert(ht),
            y && C && e <= 0 && r <= 0)
          )
            return void (e && (t._zTime = e));
        } else if (M && C && !S)
          if (
            (e && (y = !1),
            (a = qa(
              {
                overwrite: !1,
                data: "isFromStart",
                lazy: y && !S && w(T),
                immediateRender: y,
                stagger: 0,
                parent: D,
              },
              i
            )),
            p && (a[l.prop] = p),
            za((t._startAt = Zt.set(E, a))),
            (t._startAt._dp = 0),
            (t._startAt._sat = t),
            e < 0 && (L ? t._startAt.revert(ht) : t._startAt.render(-1, !0)),
            (t._zTime = e),
            y)
          ) {
            if (!e) return;
          } else _initTween(t._startAt, X, X);
        for (
          t._pt = t._ptCache = 0, T = (C && w(T)) || (T && !C), n = 0;
          n < E.length;
          n++
        ) {
          if (
            ((h = (o = E[n])._gsap || ea(E)[n]._gsap),
            (t._ptLookup[n] = c = {}),
            dt[h.id] && ct.length && ma(),
            (d = z === E ? n : z.indexOf(o)),
            l &&
              !1 !== (f = new l()).init(o, p || i, t, d, z) &&
              ((t._pt = s =
                new _e(t._pt, o, f.name, 0, 1, f.render, f, 0, f.priority)),
              f._props.forEach(function (t) {
                c[t] = s;
              }),
              f.priority && (u = 1)),
            !l || p)
          )
            for (a in i)
              pt[a] && (f = ac(a, i, t, d, o, z))
                ? f.priority && (u = 1)
                : (c[a] = s =
                    Qt.call(t, o, a, "get", i[a], d, z, 0, m.stringFilter));
          t._op && t._op[n] && t.kill(o, t._op[n]),
            R &&
              t._pt &&
              ((Nt = t),
              I.killTweensOf(o, c, t.globalTime(e)),
              (_ = !t.parent),
              (Nt = 0)),
            t._pt && T && (dt[h.id] = 1);
        }
        u && pe(t), t._onInit && t._onInit(t);
      }
      (t._onUpdate = b),
        (t._initted = (!t._op || t._pt) && !_),
        P && e <= 0 && F.render(U, !0, !0);
    },
    Kt = function _parseFuncOrString(t, e, i, n, a) {
      return s(t)
        ? t.call(e, i, n, a)
        : r(t) && ~t.indexOf("random(")
        ? ob(t)
        : t;
    },
    Jt = vt + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
    Ht = {};
  ha(Jt + ",id,stagger,delay,duration,paused,scrollTrigger", function (t) {
    return (Ht[t] = 1);
  });
  var Zt = (function (z) {
    function Tween(e, r, i, n) {
      var a;
      "number" == typeof r && ((i.duration = r), (r = i), (i = null));
      var s,
        o,
        u,
        h,
        l,
        f,
        c,
        d,
        p = (a = z.call(this, n ? r : va(r)) || this).vars,
        _ = p.duration,
        m = p.delay,
        g = p.immediateRender,
        T = p.stagger,
        b = p.overwrite,
        x = p.keyframes,
        k = p.defaults,
        M = p.scrollTrigger,
        O = p.yoyoEase,
        P = r.parent || I,
        A = ($(e) || Z(e) ? t(e[0]) : "length" in r) ? [e] : Ot(e);
      if (
        ((a._targets = A.length
          ? ea(A)
          : R(
              "GSAP target " + e + " not found. https://greensock.com",
              !q.nullTargetWarn
            ) || []),
        (a._ptLookup = []),
        (a._overwrite = b),
        x || T || y(_) || y(m))
      ) {
        if (
          ((r = a.vars),
          (s = a.timeline =
            new Xt({
              data: "nested",
              defaults: k || {},
              targets: P && "nested" === P.data ? P.vars.targets : A,
            })).kill(),
          (s.parent = s._dp = _assertThisInitialized(a)),
          (s._start = 0),
          T || y(_) || y(m))
        ) {
          if (((h = A.length), (c = T && eb(T)), v(T)))
            for (l in T) ~Jt.indexOf(l) && ((d = d || {})[l] = T[l]);
          for (o = 0; o < h; o++)
            ((u = ua(r, Ht)).stagger = 0),
              O && (u.yoyoEase = O),
              d && yt(u, d),
              (f = A[o]),
              (u.duration = +Kt(_, _assertThisInitialized(a), o, f, A)),
              (u.delay =
                (+Kt(m, _assertThisInitialized(a), o, f, A) || 0) - a._delay),
              !T &&
                1 === h &&
                u.delay &&
                ((a._delay = m = u.delay), (a._start += m), (u.delay = 0)),
              s.to(f, u, c ? c(o, f, A) : 0),
              (s._ease = Bt.none);
          s.duration() ? (_ = m = 0) : (a.timeline = 0);
        } else if (x) {
          va(qa(s.vars.defaults, { ease: "none" })),
            (s._ease = jt(x.ease || r.ease || "none"));
          var C,
            S,
            E,
            D = 0;
          if ($(x))
            x.forEach(function (t) {
              return s.to(A, t, ">");
            }),
              s.duration();
          else {
            for (l in ((u = {}), x))
              "ease" === l || "easeEach" === l || gc(l, x[l], u, x.easeEach);
            for (l in u)
              for (
                C = u[l].sort(function (t, e) {
                  return t.t - e.t;
                }),
                  o = D = 0;
                o < C.length;
                o++
              )
                ((E = {
                  ease: (S = C[o]).e,
                  duration: ((S.t - (o ? C[o - 1].t : 0)) / 100) * _,
                })[l] = S.v),
                  s.to(A, E, D),
                  (D += E.duration);
            s.duration() < _ && s.to({}, { duration: _ - s.duration() });
          }
        }
        _ || a.duration((_ = s.duration()));
      } else a.timeline = 0;
      return (
        !0 !== b ||
          B ||
          ((Nt = _assertThisInitialized(a)), I.killTweensOf(A), (Nt = 0)),
        Ka(P, _assertThisInitialized(a), i),
        r.reversed && a.reverse(),
        r.paused && a.paused(!0),
        (g ||
          (!_ &&
            !x &&
            a._start === ja(P._time) &&
            w(g) &&
            (function _hasNoPausedAncestors(t) {
              return !t || (t._ts && _hasNoPausedAncestors(t.parent));
            })(_assertThisInitialized(a)) &&
            "nested" !== P.data)) &&
          ((a._tTime = -X), a.render(Math.max(0, -m) || 0)),
        M && La(_assertThisInitialized(a), M),
        a
      );
    }
    _inheritsLoose(Tween, z);
    var e = Tween.prototype;
    return (
      (e.render = function render(t, e, r) {
        var i,
          n,
          a,
          s,
          o,
          u,
          h,
          l,
          f,
          c = this._time,
          d = this._tDur,
          p = this._dur,
          _ = t < 0,
          m = d - X < t && !_ ? d : t < X ? 0 : t;
        if (p) {
          if (
            m !== this._tTime ||
            !t ||
            r ||
            (!this._initted && this._tTime) ||
            (this._startAt && this._zTime < 0 != _)
          ) {
            if (((i = m), (l = this.timeline), this._repeat)) {
              if (((s = p + this._rDelay), this._repeat < -1 && _))
                return this.totalTime(100 * s + t, e, r);
              if (
                ((i = ja(m % s)),
                m === d
                  ? ((a = this._repeat), (i = p))
                  : ((a = ~~(m / s)) && a === m / s && ((i = p), a--),
                    p < i && (i = p)),
                (u = this._yoyo && 1 & a) && ((f = this._yEase), (i = p - i)),
                (o = Tt(this._tTime, s)),
                i === c && !r && this._initted)
              )
                return (this._tTime = m), this;
              a !== o &&
                (l && this._yEase && Qb(l, u),
                !this.vars.repeatRefresh ||
                  u ||
                  this._lock ||
                  ((this._lock = r = 1),
                  (this.render(ja(s * a), !0).invalidate()._lock = 0)));
            }
            if (!this._initted) {
              if (Ma(this, _ ? t : i, r, e, m)) return (this._tTime = 0), this;
              if (c !== this._time) return this;
              if (p !== this._dur) return this.render(t, e, r);
            }
            if (
              ((this._tTime = m),
              (this._time = i),
              !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
              (this.ratio = h = (f || this._ease)(i / p)),
              this._from && (this.ratio = h = 1 - h),
              i && !c && !e && !a && (At(this, "onStart"), this._tTime !== m))
            )
              return this;
            for (n = this._pt; n; ) n.r(h, n.d), (n = n._next);
            (l &&
              l.render(
                t < 0 ? t : !i && u ? -X : l._dur * l._ease(i / this._dur),
                e,
                r
              )) ||
              (this._startAt && (this._zTime = t)),
              this._onUpdate &&
                !e &&
                (_ && Ca(this, t, 0, r), At(this, "onUpdate")),
              this._repeat &&
                a !== o &&
                this.vars.onRepeat &&
                !e &&
                this.parent &&
                At(this, "onRepeat"),
              (m !== this._tDur && m) ||
                this._tTime !== m ||
                (_ && !this._onUpdate && Ca(this, t, 0, !0),
                (!t && p) ||
                  !(
                    (m === this._tDur && 0 < this._ts) ||
                    (!m && this._ts < 0)
                  ) ||
                  za(this, 1),
                e ||
                  (_ && !c) ||
                  !(m || c || u) ||
                  (At(this, m === d ? "onComplete" : "onReverseComplete", !0),
                  !this._prom ||
                    (m < d && 0 < this.timeScale()) ||
                    this._prom()));
          }
        } else
          !(function _renderZeroDurationTween(t, e, r, i) {
            var n,
              a,
              s,
              o = t.ratio,
              u =
                e < 0 ||
                (!e &&
                  ((!t._start &&
                    (function _parentPlayheadIsBeforeStart(t) {
                      var e = t.parent;
                      return (
                        e &&
                        e._ts &&
                        e._initted &&
                        !e._lock &&
                        (e.rawTime() < 0 || _parentPlayheadIsBeforeStart(e))
                      );
                    })(t) &&
                    (t._initted || !bt(t))) ||
                    ((t._ts < 0 || t._dp._ts < 0) && !bt(t))))
                  ? 0
                  : 1,
              h = t._rDelay,
              l = 0;
            if (
              (h &&
                t._repeat &&
                ((l = kt(0, t._tDur, e)),
                (a = Tt(l, h)),
                t._yoyo && 1 & a && (u = 1 - u),
                a !== Tt(t._tTime, h) &&
                  ((o = 1 - u),
                  t.vars.repeatRefresh && t._initted && t.invalidate())),
              u !== o || L || i || t._zTime === X || (!e && t._zTime))
            ) {
              if (!t._initted && Ma(t, e, i, r, l)) return;
              for (
                s = t._zTime,
                  t._zTime = e || (r ? X : 0),
                  r = r || (e && !s),
                  t.ratio = u,
                  t._from && (u = 1 - u),
                  t._time = 0,
                  t._tTime = l,
                  n = t._pt;
                n;

              )
                n.r(u, n.d), (n = n._next);
              e < 0 && Ca(t, e, 0, !0),
                t._onUpdate && !r && At(t, "onUpdate"),
                l && t._repeat && !r && t.parent && At(t, "onRepeat"),
                (e >= t._tDur || e < 0) &&
                  t.ratio === u &&
                  (u && za(t, 1),
                  r ||
                    L ||
                    (At(t, u ? "onComplete" : "onReverseComplete", !0),
                    t._prom && t._prom()));
            } else t._zTime || (t._zTime = e);
          })(this, t, e, r);
        return this;
      }),
      (e.targets = function targets() {
        return this._targets;
      }),
      (e.invalidate = function invalidate(t) {
        return (
          (t && this.vars.runBackwards) || (this._startAt = 0),
          (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
          (this._ptLookup = []),
          this.timeline && this.timeline.invalidate(t),
          z.prototype.invalidate.call(this, t)
        );
      }),
      (e.resetTo = function resetTo(t, e, r, i) {
        d || Rt.wake(), this._ts || this.play();
        var n,
          a = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
        return (
          this._initted || Gt(this, a),
          (n = this._ease(a / this._dur)),
          (function _updatePropTweens(t, e, r, i, n, a, s) {
            var o,
              u,
              h,
              l,
              f = ((t._pt && t._ptCache) || (t._ptCache = {}))[e];
            if (!f)
              for (
                f = t._ptCache[e] = [], h = t._ptLookup, l = t._targets.length;
                l--;

              ) {
                if ((o = h[l][e]) && o.d && o.d._pt)
                  for (o = o.d._pt; o && o.p !== e && o.fp !== e; ) o = o._next;
                if (!o)
                  return (Wt = 1), (t.vars[e] = "+=0"), Gt(t, s), (Wt = 0), 1;
                f.push(o);
              }
            for (l = f.length; l--; )
              ((o = (u = f[l])._pt || u).s =
                (!i && 0 !== i) || n ? o.s + (i || 0) + a * o.c : i),
                (o.c = r - o.s),
                u.e && (u.e = ia(r) + Ya(u.e)),
                u.b && (u.b = o.s + Ya(u.b));
          })(this, t, e, r, i, n, a)
            ? this.resetTo(t, e, r, i)
            : (Ia(this, 0),
              this.parent ||
                xa(
                  this._dp,
                  this,
                  "_first",
                  "_last",
                  this._dp._sort ? "_start" : 0
                ),
              this.render(0))
        );
      }),
      (e.kill = function kill(t, e) {
        if ((void 0 === e && (e = "all"), !(t || (e && "all" !== e))))
          return (this._lazy = this._pt = 0), this.parent ? tb(this) : this;
        if (this.timeline) {
          var i = this.timeline.totalDuration();
          return (
            this.timeline.killTweensOf(t, e, Nt && !0 !== Nt.vars.overwrite)
              ._first || tb(this),
            this.parent &&
              i !== this.timeline.totalDuration() &&
              Ra(this, (this._dur * this.timeline._tDur) / i, 0, 1),
            this
          );
        }
        var n,
          a,
          s,
          o,
          u,
          h,
          l,
          f = this._targets,
          c = t ? Ot(t) : f,
          d = this._ptLookup,
          p = this._pt;
        if (
          (!e || "all" === e) &&
          (function _arraysMatch(t, e) {
            for (
              var r = t.length, i = r === e.length;
              i && r-- && t[r] === e[r];

            );
            return r < 0;
          })(f, c)
        )
          return "all" === e && (this._pt = 0), tb(this);
        for (
          n = this._op = this._op || [],
            "all" !== e &&
              (r(e) &&
                ((u = {}),
                ha(e, function (t) {
                  return (u[t] = 1);
                }),
                (e = u)),
              (e = (function _addAliasesToVars(t, e) {
                var r,
                  i,
                  n,
                  a,
                  s = t[0] ? fa(t[0]).harness : 0,
                  o = s && s.aliases;
                if (!o) return e;
                for (i in ((r = yt({}, e)), o))
                  if ((i in r))
                    for (n = (a = o[i].split(",")).length; n--; )
                      r[a[n]] = r[i];
                return r;
              })(f, e))),
            l = f.length;
          l--;

        )
          if (~c.indexOf(f[l]))
            for (u in ((a = d[l]),
            "all" === e
              ? ((n[l] = e), (o = a), (s = {}))
              : ((s = n[l] = n[l] || {}), (o = e)),
            o))
              (h = a && a[u]) &&
                (("kill" in h.d && !0 !== h.d.kill(u)) || ya(this, h, "_pt"),
                delete a[u]),
                "all" !== s && (s[u] = 1);
        return this._initted && !this._pt && p && tb(this), this;
      }),
      (Tween.to = function to(t, e, r) {
        return new Tween(t, e, r);
      }),
      (Tween.from = function from(t, e) {
        return Va(1, arguments);
      }),
      (Tween.delayedCall = function delayedCall(t, e, r, i) {
        return new Tween(e, 0, {
          immediateRender: !1,
          lazy: !1,
          overwrite: !1,
          delay: t,
          onComplete: e,
          onReverseComplete: e,
          onCompleteParams: r,
          onReverseCompleteParams: r,
          callbackScope: i,
        });
      }),
      (Tween.fromTo = function fromTo(t, e, r) {
        return Va(2, arguments);
      }),
      (Tween.set = function set(t, e) {
        return (
          (e.duration = 0), e.repeatDelay || (e.repeat = 0), new Tween(t, e)
        );
      }),
      (Tween.killTweensOf = function killTweensOf(t, e, r) {
        return I.killTweensOf(t, e, r);
      }),
      Tween
    );
  })(Ut);
  qa(Zt.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
    ha("staggerTo,staggerFrom,staggerFromTo", function (r) {
      Zt[r] = function () {
        var t = new Xt(),
          e = Mt.call(arguments, 0);
        return e.splice("staggerFromTo" === r ? 5 : 4, 0, 0), t[r].apply(t, e);
      };
    });
  function oc(t, e, r) {
    return t.setAttribute(e, r);
  }
  function wc(t, e, r, i) {
    i.mSet(t, e, i.m.call(i.tween, r, i.mt), i);
  }
  var $t = function _setterPlain(t, e, r) {
      return (t[e] = r);
    },
    te = function _setterFunc(t, e, r) {
      return t[e](r);
    },
    re = function _setterFuncWithParam(t, e, r, i) {
      return t[e](i.fp, r);
    },
    ne = function _getSetter(t, e) {
      return s(t[e]) ? te : u(t[e]) && t.setAttribute ? oc : $t;
    },
    ae = function _renderPlain(t, e) {
      return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e);
    },
    se = function _renderBoolean(t, e) {
      return e.set(e.t, e.p, !!(e.s + e.c * t), e);
    },
    ue = function _renderComplexString(t, e) {
      var r = e._pt,
        i = "";
      if (!t && e.b) i = e.b;
      else if (1 === t && e.e) i = e.e;
      else {
        for (; r; )
          (i =
            r.p +
            (r.m
              ? r.m(r.s + r.c * t)
              : Math.round(1e4 * (r.s + r.c * t)) / 1e4) +
            i),
            (r = r._next);
        i += e.c;
      }
      e.set(e.t, e.p, i, e);
    },
    he = function _renderPropTweens(t, e) {
      for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
    },
    fe = function _addPluginModifier(t, e, r, i) {
      for (var n, a = this._pt; a; )
        (n = a._next), a.p === i && a.modifier(t, e, r), (a = n);
    },
    ce = function _killPropTweensOf(t) {
      for (var e, r, i = this._pt; i; )
        (r = i._next),
          (i.p === t && !i.op) || i.op === t
            ? ya(this, i, "_pt")
            : i.dep || (e = 1),
          (i = r);
      return !e;
    },
    pe = function _sortPropTweensByPriority(t) {
      for (var e, r, i, n, a = t._pt; a; ) {
        for (e = a._next, r = i; r && r.pr > a.pr; ) r = r._next;
        (a._prev = r ? r._prev : n) ? (a._prev._next = a) : (i = a),
          (a._next = r) ? (r._prev = a) : (n = a),
          (a = e);
      }
      t._pt = i;
    },
    _e =
      ((PropTween.prototype.modifier = function modifier(t, e, r) {
        (this.mSet = this.mSet || this.set),
          (this.set = wc),
          (this.m = t),
          (this.mt = r),
          (this.tween = e);
      }),
      PropTween);
  function PropTween(t, e, r, i, n, a, s, o, u) {
    (this.t = e),
      (this.s = i),
      (this.c = n),
      (this.p = r),
      (this.r = a || ae),
      (this.d = s || this),
      (this.set = o || $t),
      (this.pr = u || 0),
      (this._next = t) && (t._prev = this);
  }
  ha(
    vt +
      "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
    function (t) {
      return (ft[t] = 1);
    }
  ),
    (ot.TweenMax = ot.TweenLite = Zt),
    (ot.TimelineLite = ot.TimelineMax = Xt),
    (I = new Xt({
      sortChildren: !1,
      defaults: V,
      autoRemoveChildren: !0,
      id: "root",
      smoothChildTiming: !0,
    })),
    (q.stringFilter = Fb);
  function Ec(t) {
    return (ye[t] || Te).map(function (t) {
      return t();
    });
  }
  function Fc() {
    var t = Date.now(),
      o = [];
    2 < t - Me &&
      (Ec("matchMediaInit"),
      ge.forEach(function (t) {
        var e,
          r,
          i,
          n,
          a = t.queries,
          s = t.conditions;
        for (r in a)
          (e = h.matchMedia(a[r]).matches) && (i = 1),
            e !== s[r] && ((s[r] = e), (n = 1));
        n && (t.revert(), i && o.push(t));
      }),
      Ec("matchMediaRevert"),
      o.forEach(function (t) {
        return t.onMatch(t);
      }),
      (Me = t),
      Ec("matchMedia"));
  }
  var me,
    ge = [],
    ye = {},
    Te = [],
    Me = 0,
    Oe = 0,
    Pe =
      (((me = Context.prototype).add = function add(t, i, n) {
        function Ew() {
          var t,
            e = l,
            r = a.selector;
          return (
            e && e !== a && e.data.push(a),
            n && (a.selector = cb(n)),
            (l = a),
            (t = i.apply(a, arguments)),
            s(t) && a._r.push(t),
            (l = e),
            (a.selector = r),
            (a.isReverted = !1),
            t
          );
        }
        s(t) && ((n = i), (i = t), (t = s));
        var a = this;
        return (a.last = Ew), t === s ? Ew(a) : t ? (a[t] = Ew) : Ew;
      }),
      (me.ignore = function ignore(t) {
        var e = l;
        (l = null), t(this), (l = e);
      }),
      (me.getTweens = function getTweens() {
        var e = [];
        return (
          this.data.forEach(function (t) {
            return t instanceof Context
              ? e.push.apply(e, t.getTweens())
              : t instanceof Zt &&
                  !(t.parent && "nested" === t.parent.data) &&
                  e.push(t);
          }),
          e
        );
      }),
      (me.clear = function clear() {
        this._r.length = this.data.length = 0;
      }),
      (me.kill = function kill(e, t) {
        var r = this;
        if (e) {
          var i = this.getTweens();
          this.data.forEach(function (t) {
            "isFlip" === t.data &&
              (t.revert(),
              t.getChildren(!0, !0, !1).forEach(function (t) {
                return i.splice(i.indexOf(t), 1);
              }));
          }),
            i
              .map(function (t) {
                return { g: t.globalTime(0), t: t };
              })
              .sort(function (t, e) {
                return e.g - t.g || -1;
              })
              .forEach(function (t) {
                return t.t.revert(e);
              }),
            this.data.forEach(function (t) {
              return t instanceof Xt
                ? "nested" !== t.data && t.kill()
                : !(t instanceof Zt) && t.revert && t.revert(e);
            }),
            this._r.forEach(function (t) {
              return t(e, r);
            }),
            (this.isReverted = !0);
        } else
          this.data.forEach(function (t) {
            return t.kill && t.kill();
          });
        if ((this.clear(), t))
          for (var n = ge.length; n--; )
            ge[n].id === this.id && ge.splice(n, 1);
      }),
      (me.revert = function revert(t) {
        this.kill(t || {});
      }),
      Context);
  function Context(t, e) {
    (this.selector = e && cb(e)),
      (this.data = []),
      (this._r = []),
      (this.isReverted = !1),
      (this.id = Oe++),
      t && this.add(t);
  }
  var Ae,
    Ce =
      (((Ae = MatchMedia.prototype).add = function add(t, e, r) {
        v(t) || (t = { matches: t });
        var i,
          n,
          a,
          s = new Pe(0, r || this.scope),
          o = (s.conditions = {});
        for (n in (l && !s.selector && (s.selector = l.selector),
        this.contexts.push(s),
        (e = s.add("onMatch", e)),
        (s.queries = t)))
          "all" === n
            ? (a = 1)
            : (i = h.matchMedia(t[n])) &&
              (ge.indexOf(s) < 0 && ge.push(s),
              (o[n] = i.matches) && (a = 1),
              i.addListener
                ? i.addListener(Fc)
                : i.addEventListener("change", Fc));
        return a && e(s), this;
      }),
      (Ae.revert = function revert(t) {
        this.kill(t || {});
      }),
      (Ae.kill = function kill(e) {
        this.contexts.forEach(function (t) {
          return t.kill(e, !0);
        });
      }),
      MatchMedia);
  function MatchMedia(t) {
    (this.contexts = []), (this.scope = t);
  }
  var Se = {
    registerPlugin: function registerPlugin() {
      for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
        e[r] = arguments[r];
      e.forEach(function (t) {
        return wb(t);
      });
    },
    timeline: function timeline(t) {
      return new Xt(t);
    },
    getTweensOf: function getTweensOf(t, e) {
      return I.getTweensOf(t, e);
    },
    getProperty: function getProperty(i, t, e, n) {
      r(i) && (i = Ot(i)[0]);
      var a = fa(i || {}).get,
        s = e ? pa : oa;
      return (
        "native" === e && (e = ""),
        i
          ? t
            ? s(((pt[t] && pt[t].get) || a)(i, t, e, n))
            : function (t, e, r) {
                return s(((pt[t] && pt[t].get) || a)(i, t, e, r));
              }
          : i
      );
    },
    quickSetter: function quickSetter(r, e, i) {
      if (1 < (r = Ot(r)).length) {
        var n = r.map(function (t) {
            return Ee.quickSetter(t, e, i);
          }),
          a = n.length;
        return function (t) {
          for (var e = a; e--; ) n[e](t);
        };
      }
      r = r[0] || {};
      var s = pt[e],
        o = fa(r),
        u = (o.harness && (o.harness.aliases || {})[e]) || e,
        h = s
          ? function (t) {
              var e = new s();
              (c._pt = 0),
                e.init(r, i ? t + i : t, c, 0, [r]),
                e.render(1, e),
                c._pt && he(1, c);
            }
          : o.set(r, u);
      return s
        ? h
        : function (t) {
            return h(r, u, i ? t + i : t, o, 1);
          };
    },
    quickTo: function quickTo(t, i, e) {
      function Wx(t, e, r) {
        return n.resetTo(i, t, e, r);
      }
      var r,
        n = Ee.to(
          t,
          yt((((r = {})[i] = "+=0.1"), (r.paused = !0), r), e || {})
        );
      return (Wx.tween = n), Wx;
    },
    isTweening: function isTweening(t) {
      return 0 < I.getTweensOf(t, !0).length;
    },
    defaults: function defaults(t) {
      return t && t.ease && (t.ease = jt(t.ease, V.ease)), ta(V, t || {});
    },
    config: function config(t) {
      return ta(q, t || {});
    },
    registerEffect: function registerEffect(t) {
      var i = t.name,
        n = t.effect,
        e = t.plugins,
        a = t.defaults,
        r = t.extendTimeline;
      (e || "").split(",").forEach(function (t) {
        return (
          t && !pt[t] && !ot[t] && R(i + " effect requires " + t + " plugin.")
        );
      }),
        (_t[i] = function (t, e, r) {
          return n(Ot(t), qa(e || {}, a), r);
        }),
        r &&
          (Xt.prototype[i] = function (t, e, r) {
            return this.add(_t[i](t, v(e) ? e : (r = e) && {}, this), r);
          });
    },
    registerEase: function registerEase(t, e) {
      Bt[t] = jt(e);
    },
    parseEase: function parseEase(t, e) {
      return arguments.length ? jt(t, e) : Bt;
    },
    getById: function getById(t) {
      return I.getById(t);
    },
    exportRoot: function exportRoot(t, e) {
      void 0 === t && (t = {});
      var r,
        i,
        n = new Xt(t);
      for (
        n.smoothChildTiming = w(t.smoothChildTiming),
          I.remove(n),
          n._dp = 0,
          n._time = n._tTime = I._time,
          r = I._first;
        r;

      )
        (i = r._next),
          (!e &&
            !r._dur &&
            r instanceof Zt &&
            r.vars.onComplete === r._targets[0]) ||
            Ka(n, r, r._start - r._delay),
          (r = i);
      return Ka(I, n, 0), n;
    },
    context: function context(t, e) {
      return t ? new Pe(t, e) : l;
    },
    matchMedia: function matchMedia(t) {
      return new Ce(t);
    },
    matchMediaRefresh: function matchMediaRefresh() {
      return (
        ge.forEach(function (t) {
          var e,
            r,
            i = t.conditions;
          for (r in i) i[r] && ((i[r] = !1), (e = 1));
          e && t.revert();
        }) || Fc()
      );
    },
    addEventListener: function addEventListener(t, e) {
      var r = ye[t] || (ye[t] = []);
      ~r.indexOf(e) || r.push(e);
    },
    removeEventListener: function removeEventListener(t, e) {
      var r = ye[t],
        i = r && r.indexOf(e);
      0 <= i && r.splice(i, 1);
    },
    utils: {
      wrap: function wrap(e, t, r) {
        var i = t - e;
        return $(e)
          ? lb(e, wrap(0, e.length), t)
          : Wa(r, function (t) {
              return ((i + ((t - e) % i)) % i) + e;
            });
      },
      wrapYoyo: function wrapYoyo(e, t, r) {
        var i = t - e,
          n = 2 * i;
        return $(e)
          ? lb(e, wrapYoyo(0, e.length - 1), t)
          : Wa(r, function (t) {
              return e + (i < (t = (n + ((t - e) % n)) % n || 0) ? n - t : t);
            });
      },
      distribute: eb,
      random: hb,
      snap: gb,
      normalize: function normalize(t, e, r) {
        return Pt(t, e, 0, 1, r);
      },
      getUnit: Ya,
      clamp: function clamp(e, r, t) {
        return Wa(t, function (t) {
          return kt(e, r, t);
        });
      },
      splitColor: Ab,
      toArray: Ot,
      selector: cb,
      mapRange: Pt,
      pipe: function pipe() {
        for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
          e[r] = arguments[r];
        return function (t) {
          return e.reduce(function (t, e) {
            return e(t);
          }, t);
        };
      },
      unitize: function unitize(e, r) {
        return function (t) {
          return e(parseFloat(t)) + (r || Ya(t));
        };
      },
      interpolate: function interpolate(e, i, t, n) {
        var a = isNaN(e + i)
          ? 0
          : function (t) {
              return (1 - t) * e + t * i;
            };
        if (!a) {
          var s,
            o,
            u,
            h,
            l,
            f = r(e),
            c = {};
          if ((!0 === t && (n = 1) && (t = null), f))
            (e = { p: e }), (i = { p: i });
          else if ($(e) && !$(i)) {
            for (u = [], h = e.length, l = h - 2, o = 1; o < h; o++)
              u.push(interpolate(e[o - 1], e[o]));
            h--,
              (a = function func(t) {
                t *= h;
                var e = Math.min(l, ~~t);
                return u[e](t - e);
              }),
              (t = i);
          } else n || (e = yt($(e) ? [] : {}, e));
          if (!u) {
            for (s in i) Qt.call(c, e, s, "get", i[s]);
            a = function func(t) {
              return he(t, c) || (f ? e.p : e);
            };
          }
        }
        return Wa(t, a);
      },
      shuffle: db,
    },
    install: P,
    effects: _t,
    ticker: Rt,
    updateRoot: Xt.updateRoot,
    plugins: pt,
    globalTimeline: I,
    core: {
      PropTween: _e,
      globals: S,
      Tween: Zt,
      Timeline: Xt,
      Animation: Ut,
      getCache: fa,
      _removeLinkedListItem: ya,
      reverting: function reverting() {
        return L;
      },
      context: function context(t) {
        return t && l && (l.data.push(t), (t._ctx = l)), l;
      },
      suppressOverwrites: function suppressOverwrites(t) {
        return (B = t);
      },
    },
  };
  ha("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
    return (Se[t] = Zt[t]);
  }),
    Rt.add(Xt.updateRoot),
    (c = Se.to({}, { duration: 0 }));
  function Jc(t, e) {
    for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
      r = r._next;
    return r;
  }
  function Lc(t, a) {
    return {
      name: t,
      rawVars: 1,
      init: function init(t, n, e) {
        e._onInit = function (t) {
          var e, i;
          if (
            (r(n) &&
              ((e = {}),
              ha(n, function (t) {
                return (e[t] = 1);
              }),
              (n = e)),
            a)
          ) {
            for (i in ((e = {}), n)) e[i] = a(n[i]);
            n = e;
          }
          !(function _addModifiers(t, e) {
            var r,
              i,
              n,
              a = t._targets;
            for (r in e)
              for (i = a.length; i--; )
                (n = (n = t._ptLookup[i][r]) && n.d) &&
                  (n._pt && (n = Jc(n, r)),
                  n && n.modifier && n.modifier(e[r], t, a[i], r));
          })(t, n);
        };
      },
    };
  }
  var Ee =
    Se.registerPlugin(
      {
        name: "attr",
        init: function init(t, e, r, i, n) {
          var a, s, o;
          for (a in ((this.tween = r), e))
            (o = t.getAttribute(a) || ""),
              ((s = this.add(
                t,
                "setAttribute",
                (o || 0) + "",
                e[a],
                i,
                n,
                0,
                0,
                a
              )).op = a),
              (s.b = o),
              this._props.push(a);
        },
        render: function render(t, e) {
          for (var r = e._pt; r; )
            L ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), (r = r._next);
        },
      },
      {
        name: "endArray",
        init: function init(t, e) {
          for (var r = e.length; r--; )
            this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1);
        },
      },
      Lc("roundProps", fb),
      Lc("modifiers"),
      Lc("snap", gb)
    ) || Se;
  (Zt.version = Xt.version = Ee.version = "x.x.x"), (o = 1), x() && Ft();
  function vd(t, e) {
    return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
  }
  function wd(t, e) {
    return e.set(
      e.t,
      e.p,
      1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
      e
    );
  }
  function xd(t, e) {
    return e.set(
      e.t,
      e.p,
      t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
      e
    );
  }
  function yd(t, e) {
    var r = e.s + e.c * t;
    e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
  }
  function zd(t, e) {
    return e.set(e.t, e.p, t ? e.e : e.b, e);
  }
  function Ad(t, e) {
    return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
  }
  function Bd(t, e, r) {
    return (t.style[e] = r);
  }
  function Cd(t, e, r) {
    return t.style.setProperty(e, r);
  }
  function Dd(t, e, r) {
    return (t._gsap[e] = r);
  }
  function Ed(t, e, r) {
    return (t._gsap.scaleX = t._gsap.scaleY = r);
  }
  function Fd(t, e, r, i, n) {
    var a = t._gsap;
    (a.scaleX = a.scaleY = r), a.renderTransform(n, a);
  }
  function Gd(t, e, r, i, n) {
    var a = t._gsap;
    (a[e] = r), a.renderTransform(n, a);
  }
  function Jd(t, e) {
    var r = this,
      i = this.target,
      n = i.style;
    if (t in ar && n) {
      if (((this.tfm = this.tfm || {}), "transform" === t))
        return cr.transform.split(",").forEach(function (t) {
          return Jd.call(r, t, e);
        });
      if (
        (~(t = cr[t] || t).indexOf(",")
          ? t.split(",").forEach(function (t) {
              return (r.tfm[t] = yr(i, t));
            })
          : (this.tfm[t] = i._gsap.x ? i._gsap[t] : yr(i, t)),
        0 <= this.props.indexOf(dr))
      )
        return;
      i._gsap.svg &&
        ((this.svgo = i.getAttribute("data-svg-origin")),
        this.props.push(pr, e, "")),
        (t = dr);
    }
    (n || e) && this.props.push(t, e, n[t]);
  }
  function Kd(t) {
    t.translate &&
      (t.removeProperty("translate"),
      t.removeProperty("scale"),
      t.removeProperty("rotate"));
  }
  function Ld() {
    var t,
      e,
      r = this.props,
      i = this.target,
      n = i.style,
      a = i._gsap;
    for (t = 0; t < r.length; t += 3)
      r[t + 1]
        ? (i[r[t]] = r[t + 2])
        : r[t + 2]
        ? (n[r[t]] = r[t + 2])
        : n.removeProperty(
            "--" === r[t].substr(0, 2)
              ? r[t]
              : r[t].replace(hr, "-$1").toLowerCase()
          );
    if (this.tfm) {
      for (e in this.tfm) a[e] = this.tfm[e];
      a.svg &&
        (a.renderTransform(),
        i.setAttribute("data-svg-origin", this.svgo || "")),
        ((t = Ie()) && t.isStart) || n[dr] || (Kd(n), (a.uncache = 1));
    }
  }
  function Md(t, e) {
    var r = { target: t, props: [], revert: Ld, save: Jd };
    return (
      t._gsap || Ee.core.getCache(t),
      e &&
        e.split(",").forEach(function (t) {
          return r.save(t);
        }),
      r
    );
  }
  function Od(t, e) {
    var r = ze.createElementNS
      ? ze.createElementNS(
          (e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
          t
        )
      : ze.createElement(t);
    return r.style ? r : ze.createElement(t);
  }
  function Pd(t, e, r) {
    var i = getComputedStyle(t);
    return (
      i[e] ||
      i.getPropertyValue(e.replace(hr, "-$1").toLowerCase()) ||
      i.getPropertyValue(e) ||
      (!r && Pd(t, mr(e) || e, 1)) ||
      ""
    );
  }
  function Sd() {
    (function _windowExists() {
      return "undefined" != typeof window;
    })() &&
      window.document &&
      ((De = window),
      (ze = De.document),
      (Re = ze.documentElement),
      (Be = Od("div") || { style: {} }),
      Od("div"),
      (dr = mr(dr)),
      (pr = dr + "Origin"),
      (Be.style.cssText =
        "border-width:0;line-height:0;position:absolute;padding:0"),
      (Ye = !!mr("perspective")),
      (Ie = Ee.core.reverting),
      (Fe = 1));
  }
  function Td(t) {
    var e,
      r = Od(
        "svg",
        (this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns")) ||
          "http://www.w3.org/2000/svg"
      ),
      i = this.parentNode,
      n = this.nextSibling,
      a = this.style.cssText;
    if (
      (Re.appendChild(r),
      r.appendChild(this),
      (this.style.display = "block"),
      t)
    )
      try {
        (e = this.getBBox()),
          (this._gsapBBox = this.getBBox),
          (this.getBBox = Td);
      } catch (t) {}
    else this._gsapBBox && (e = this._gsapBBox());
    return (
      i && (n ? i.insertBefore(this, n) : i.appendChild(this)),
      Re.removeChild(r),
      (this.style.cssText = a),
      e
    );
  }
  function Ud(t, e) {
    for (var r = e.length; r--; )
      if (t.hasAttribute(e[r])) return t.getAttribute(e[r]);
  }
  function Vd(e) {
    var r;
    try {
      r = e.getBBox();
    } catch (t) {
      r = Td.call(e, !0);
    }
    return (
      (r && (r.width || r.height)) || e.getBBox === Td || (r = Td.call(e, !0)),
      !r || r.width || r.x || r.y
        ? r
        : {
            x: +Ud(e, ["x", "cx", "x1"]) || 0,
            y: +Ud(e, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0,
          }
    );
  }
  function Wd(t) {
    return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !Vd(t));
  }
  function Xd(t, e) {
    if (e) {
      var r = t.style;
      e in ar && e !== pr && (e = dr),
        r.removeProperty
          ? (("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6)) ||
              (e = "-" + e),
            r.removeProperty(e.replace(hr, "-$1").toLowerCase()))
          : r.removeAttribute(e);
    }
  }
  function Yd(t, e, r, i, n, a) {
    var s = new _e(t._pt, e, r, 0, 1, a ? Ad : zd);
    return ((t._pt = s).b = i), (s.e = n), t._props.push(r), s;
  }
  function _d(t, e, r, i) {
    var n,
      a,
      s,
      o,
      u = parseFloat(r) || 0,
      h = (r + "").trim().substr((u + "").length) || "px",
      l = Be.style,
      f = lr.test(e),
      c = "svg" === t.tagName.toLowerCase(),
      d = (c ? "client" : "offset") + (f ? "Width" : "Height"),
      p = "px" === i,
      _ = "%" === i;
    return i === h || !u || gr[i] || gr[h]
      ? u
      : ("px" === h || p || (u = _d(t, e, r, "px")),
        (o = t.getCTM && Wd(t)),
        (!_ && "%" !== h) || (!ar[e] && !~e.indexOf("adius"))
          ? ((l[f ? "width" : "height"] = 100 + (p ? h : i)),
            (a =
              ~e.indexOf("adius") || ("em" === i && t.appendChild && !c)
                ? t
                : t.parentNode),
            o && (a = (t.ownerSVGElement || {}).parentNode),
            (a && a !== ze && a.appendChild) || (a = ze.body),
            (s = a._gsap) &&
            _ &&
            s.width &&
            f &&
            s.time === Rt.time &&
            !s.uncache
              ? ia((u / s.width) * 100)
              : ((!_ && "%" !== h) ||
                  vr[Pd(a, "display")] ||
                  (l.position = Pd(t, "position")),
                a === t && (l.position = "static"),
                a.appendChild(Be),
                (n = Be[d]),
                a.removeChild(Be),
                (l.position = "absolute"),
                f && _ && (((s = fa(a)).time = Rt.time), (s.width = a[d])),
                ia(p ? (n * u) / 100 : n && u ? (100 / n) * u : 0)))
          : ((n = o ? t.getBBox()[f ? "width" : "height"] : t[d]),
            ia(_ ? (u / n) * 100 : (u / 100) * n)));
  }
  function be(t, e, r, i) {
    if (!r || "none" === r) {
      var n = mr(e, t, 1),
        a = n && Pd(t, n, 1);
      a && a !== r
        ? ((e = n), (r = a))
        : "borderColor" === e && (r = Pd(t, "borderTopColor"));
    }
    var s,
      o,
      u,
      h,
      l,
      f,
      c,
      d,
      p,
      _,
      m,
      g = new _e(this._pt, t.style, e, 0, 1, ue),
      v = 0,
      y = 0;
    if (
      ((g.b = r),
      (g.e = i),
      (r += ""),
      "auto" === (i += "") &&
        ((t.style[e] = i), (i = Pd(t, e) || i), (t.style[e] = r)),
      Fb((s = [r, i])),
      (i = s[1]),
      (u = (r = s[0]).match(rt) || []),
      (i.match(rt) || []).length)
    ) {
      for (; (o = rt.exec(i)); )
        (c = o[0]),
          (p = i.substring(v, o.index)),
          l
            ? (l = (l + 1) % 5)
            : ("rgba(" !== p.substr(-5) && "hsla(" !== p.substr(-5)) || (l = 1),
          c !== (f = u[y++] || "") &&
            ((h = parseFloat(f) || 0),
            (m = f.substr((h + "").length)),
            "=" === c.charAt(1) && (c = ka(h, c) + m),
            (d = parseFloat(c)),
            (_ = c.substr((d + "").length)),
            (v = rt.lastIndex - _.length),
            _ ||
              ((_ = _ || q.units[e] || m),
              v === i.length && ((i += _), (g.e += _))),
            m !== _ && (h = _d(t, e, f, _) || 0),
            (g._pt = {
              _next: g._pt,
              p: p || 1 === y ? p : ",",
              s: h,
              c: d - h,
              m: (l && l < 4) || "zIndex" === e ? Math.round : 0,
            }));
      g.c = v < i.length ? i.substring(v, i.length) : "";
    } else g.r = "display" === e && "none" === i ? Ad : zd;
    return nt.test(i) && (g.e = 0), (this._pt = g);
  }
  function de(t) {
    var e = t.split(" "),
      r = e[0],
      i = e[1] || "50%";
    return (
      ("top" !== r && "bottom" !== r && "left" !== i && "right" !== i) ||
        ((t = r), (r = i), (i = t)),
      (e[0] = Tr[r] || r),
      (e[1] = Tr[i] || i),
      e.join(" ")
    );
  }
  function ee(t, e) {
    if (e.tween && e.tween._time === e.tween._dur) {
      var r,
        i,
        n,
        a = e.t,
        s = a.style,
        o = e.u,
        u = a._gsap;
      if ("all" === o || !0 === o) (s.cssText = ""), (i = 1);
      else
        for (n = (o = o.split(",")).length; -1 < --n; )
          (r = o[n]),
            ar[r] && ((i = 1), (r = "transformOrigin" === r ? pr : dr)),
            Xd(a, r);
      i &&
        (Xd(a, dr),
        u &&
          (u.svg && a.removeAttribute("transform"),
          kr(a, 1),
          (u.uncache = 1),
          Kd(s)));
    }
  }
  function ie(t) {
    return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
  }
  function je(t) {
    var e = Pd(t, dr);
    return ie(e) ? wr : e.substr(7).match(et).map(ia);
  }
  function ke(t, e) {
    var r,
      i,
      n,
      a,
      s = t._gsap || fa(t),
      o = t.style,
      u = je(t);
    return s.svg && t.getAttribute("transform")
      ? "1,0,0,1,0,0" ===
        (u = [
          (n = t.transform.baseVal.consolidate().matrix).a,
          n.b,
          n.c,
          n.d,
          n.e,
          n.f,
        ]).join(",")
        ? wr
        : u
      : (u !== wr ||
          t.offsetParent ||
          t === Re ||
          s.svg ||
          ((n = o.display),
          (o.display = "block"),
          ((r = t.parentNode) && t.offsetParent) ||
            ((a = 1), (i = t.nextElementSibling), Re.appendChild(t)),
          (u = je(t)),
          n ? (o.display = n) : Xd(t, "display"),
          a &&
            (i
              ? r.insertBefore(t, i)
              : r
              ? r.appendChild(t)
              : Re.removeChild(t))),
        e && 6 < u.length ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u);
  }
  function le(t, e, r, i, n, a) {
    var s,
      o,
      u,
      h = t._gsap,
      l = n || ke(t, !0),
      f = h.xOrigin || 0,
      c = h.yOrigin || 0,
      d = h.xOffset || 0,
      p = h.yOffset || 0,
      _ = l[0],
      m = l[1],
      g = l[2],
      v = l[3],
      y = l[4],
      T = l[5],
      b = e.split(" "),
      w = parseFloat(b[0]) || 0,
      x = parseFloat(b[1]) || 0;
    r
      ? l !== wr &&
        (o = _ * v - m * g) &&
        ((u = w * (-m / o) + x * (_ / o) - (_ * T - m * y) / o),
        (w = w * (v / o) + x * (-g / o) + (g * T - v * y) / o),
        (x = u))
      : ((w = (s = Vd(t)).x + (~b[0].indexOf("%") ? (w / 100) * s.width : w)),
        (x = s.y + (~(b[1] || b[0]).indexOf("%") ? (x / 100) * s.height : x))),
      i || (!1 !== i && h.smooth)
        ? ((y = w - f),
          (T = x - c),
          (h.xOffset = d + (y * _ + T * g) - y),
          (h.yOffset = p + (y * m + T * v) - T))
        : (h.xOffset = h.yOffset = 0),
      (h.xOrigin = w),
      (h.yOrigin = x),
      (h.smooth = !!i),
      (h.origin = e),
      (h.originIsAbsolute = !!r),
      (t.style[pr] = "0px 0px"),
      a &&
        (Yd(a, h, "xOrigin", f, w),
        Yd(a, h, "yOrigin", c, x),
        Yd(a, h, "xOffset", d, h.xOffset),
        Yd(a, h, "yOffset", p, h.yOffset)),
      t.setAttribute("data-svg-origin", w + " " + x);
  }
  function oe(t, e, r) {
    var i = Ya(e);
    return ia(parseFloat(e) + parseFloat(_d(t, "x", r + "px", i))) + i;
  }
  function ve(t, e, i, n, a) {
    var s,
      o,
      u = 360,
      h = r(a),
      l = parseFloat(a) * (h && ~a.indexOf("rad") ? sr : 1) - n,
      f = n + l + "deg";
    return (
      h &&
        ("short" === (s = a.split("_")[1]) &&
          (l %= u) !== l % 180 &&
          (l += l < 0 ? u : -u),
        "cw" === s && l < 0
          ? (l = ((l + 36e9) % u) - ~~(l / u) * u)
          : "ccw" === s && 0 < l && (l = ((l - 36e9) % u) - ~~(l / u) * u)),
      (t._pt = o = new _e(t._pt, e, i, n, l, wd)),
      (o.e = f),
      (o.u = "deg"),
      t._props.push(i),
      o
    );
  }
  function we(t, e) {
    for (var r in e) t[r] = e[r];
    return t;
  }
  function xe(t, e, r) {
    var i,
      n,
      a,
      s,
      o,
      u,
      h,
      l = we({}, r._gsap),
      f = r.style;
    for (n in (l.svg
      ? ((a = r.getAttribute("transform")),
        r.setAttribute("transform", ""),
        (f[dr] = e),
        (i = kr(r, 1)),
        Xd(r, dr),
        r.setAttribute("transform", a))
      : ((a = getComputedStyle(r)[dr]),
        (f[dr] = e),
        (i = kr(r, 1)),
        (f[dr] = a)),
    ar))
      (a = l[n]) !== (s = i[n]) &&
        "perspective,force3D,transformOrigin,svgOrigin".indexOf(n) < 0 &&
        ((o = Ya(a) !== (h = Ya(s)) ? _d(r, n, a, h) : parseFloat(a)),
        (u = parseFloat(s)),
        (t._pt = new _e(t._pt, i, n, o, u - o, vd)),
        (t._pt.u = h || 0),
        t._props.push(n));
    we(i, l);
  }
  var De,
    ze,
    Re,
    Fe,
    Be,
    Le,
    Ie,
    Ye,
    qe = Bt.Power0,
    Ve = Bt.Power1,
    Ue = Bt.Power2,
    Xe = Bt.Power3,
    Ne = Bt.Power4,
    We = Bt.Linear,
    Qe = Bt.Quad,
    Ge = Bt.Cubic,
    Ke = Bt.Quart,
    Je = Bt.Quint,
    He = Bt.Strong,
    Ze = Bt.Elastic,
    $e = Bt.Back,
    tr = Bt.SteppedEase,
    er = Bt.Bounce,
    rr = Bt.Sine,
    ir = Bt.Expo,
    nr = Bt.Circ,
    ar = {},
    sr = 180 / Math.PI,
    or = Math.PI / 180,
    ur = Math.atan2,
    hr = /([A-Z])/g,
    lr = /(left|right|width|margin|padding|x)/i,
    fr = /[\s,\(]\S/,
    cr = {
      autoAlpha: "opacity,visibility",
      scale: "scaleX,scaleY",
      alpha: "opacity",
    },
    dr = "transform",
    pr = dr + "Origin",
    _r = "O,Moz,ms,Ms,Webkit".split(","),
    mr = function _checkPropPrefix(t, e, r) {
      var i = (e || Be).style,
        n = 5;
      if (t in i && !r) return t;
      for (
        t = t.charAt(0).toUpperCase() + t.substr(1);
        n-- && !(_r[n] + t in i);

      );
      return n < 0 ? null : (3 === n ? "ms" : 0 <= n ? _r[n] : "") + t;
    },
    gr = { deg: 1, rad: 1, turn: 1 },
    vr = { grid: 1, flex: 1 },
    yr = function _get(t, e, r, i) {
      var n;
      return (
        Fe || Sd(),
        e in cr &&
          "transform" !== e &&
          ~(e = cr[e]).indexOf(",") &&
          (e = e.split(",")[0]),
        ar[e] && "transform" !== e
          ? ((n = kr(t, i)),
            (n =
              "transformOrigin" !== e
                ? n[e]
                : n.svg
                ? n.origin
                : Mr(Pd(t, pr)) + " " + n.zOrigin + "px"))
          : ((n = t.style[e]) &&
              "auto" !== n &&
              !i &&
              !~(n + "").indexOf("calc(")) ||
            (n =
              (br[e] && br[e](t, e, r)) ||
              Pd(t, e) ||
              ga(t, e) ||
              ("opacity" === e ? 1 : 0)),
        r && !~(n + "").trim().indexOf(" ") ? _d(t, e, n, r) + r : n
      );
    },
    Tr = {
      top: "0%",
      bottom: "100%",
      left: "0%",
      right: "100%",
      center: "50%",
    },
    br = {
      clearProps: function clearProps(t, e, r, i, n) {
        if ("isFromStart" !== n.data) {
          var a = (t._pt = new _e(t._pt, e, r, 0, 0, ee));
          return (a.u = i), (a.pr = -10), (a.tween = n), t._props.push(r), 1;
        }
      },
    },
    wr = [1, 0, 0, 1, 0, 0],
    xr = {},
    kr = function _parseTransform(t, e) {
      var r = t._gsap || new Vt(t);
      if ("x" in r && !e && !r.uncache) return r;
      var i,
        n,
        a,
        s,
        o,
        u,
        h,
        l,
        f,
        c,
        d,
        p,
        _,
        m,
        g,
        v,
        y,
        T,
        b,
        w,
        x,
        k,
        M,
        O,
        P,
        A,
        C,
        S,
        E,
        D,
        z,
        R,
        F = t.style,
        B = r.scaleX < 0,
        L = "deg",
        I = getComputedStyle(t),
        Y = Pd(t, pr) || "0";
      return (
        (i = n = a = u = h = l = f = c = d = 0),
        (s = o = 1),
        (r.svg = !(!t.getCTM || !Wd(t))),
        I.translate &&
          (("none" === I.translate &&
            "none" === I.scale &&
            "none" === I.rotate) ||
            (F[dr] =
              ("none" !== I.translate
                ? "translate3d(" +
                  (I.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                  ") "
                : "") +
              ("none" !== I.rotate ? "rotate(" + I.rotate + ") " : "") +
              ("none" !== I.scale
                ? "scale(" + I.scale.split(" ").join(",") + ") "
                : "") +
              ("none" !== I[dr] ? I[dr] : "")),
          (F.scale = F.rotate = F.translate = "none")),
        (m = ke(t, r.svg)),
        r.svg &&
          ((O = r.uncache
            ? ((P = t.getBBox()),
              (Y = r.xOrigin - P.x + "px " + (r.yOrigin - P.y) + "px"),
              "")
            : !e && t.getAttribute("data-svg-origin")),
          le(t, O || Y, !!O || r.originIsAbsolute, !1 !== r.smooth, m)),
        (p = r.xOrigin || 0),
        (_ = r.yOrigin || 0),
        m !== wr &&
          ((T = m[0]),
          (b = m[1]),
          (w = m[2]),
          (x = m[3]),
          (i = k = m[4]),
          (n = M = m[5]),
          6 === m.length
            ? ((s = Math.sqrt(T * T + b * b)),
              (o = Math.sqrt(x * x + w * w)),
              (u = T || b ? ur(b, T) * sr : 0),
              (f = w || x ? ur(w, x) * sr + u : 0) &&
                (o *= Math.abs(Math.cos(f * or))),
              r.svg && ((i -= p - (p * T + _ * w)), (n -= _ - (p * b + _ * x))))
            : ((R = m[6]),
              (D = m[7]),
              (C = m[8]),
              (S = m[9]),
              (E = m[10]),
              (z = m[11]),
              (i = m[12]),
              (n = m[13]),
              (a = m[14]),
              (h = (g = ur(R, E)) * sr),
              g &&
                ((O = k * (v = Math.cos(-g)) + C * (y = Math.sin(-g))),
                (P = M * v + S * y),
                (A = R * v + E * y),
                (C = k * -y + C * v),
                (S = M * -y + S * v),
                (E = R * -y + E * v),
                (z = D * -y + z * v),
                (k = O),
                (M = P),
                (R = A)),
              (l = (g = ur(-w, E)) * sr),
              g &&
                ((v = Math.cos(-g)),
                (z = x * (y = Math.sin(-g)) + z * v),
                (T = O = T * v - C * y),
                (b = P = b * v - S * y),
                (w = A = w * v - E * y)),
              (u = (g = ur(b, T)) * sr),
              g &&
                ((O = T * (v = Math.cos(g)) + b * (y = Math.sin(g))),
                (P = k * v + M * y),
                (b = b * v - T * y),
                (M = M * v - k * y),
                (T = O),
                (k = P)),
              h &&
                359.9 < Math.abs(h) + Math.abs(u) &&
                ((h = u = 0), (l = 180 - l)),
              (s = ia(Math.sqrt(T * T + b * b + w * w))),
              (o = ia(Math.sqrt(M * M + R * R))),
              (g = ur(k, M)),
              (f = 2e-4 < Math.abs(g) ? g * sr : 0),
              (d = z ? 1 / (z < 0 ? -z : z) : 0)),
          r.svg &&
            ((O = t.getAttribute("transform")),
            (r.forceCSS = t.setAttribute("transform", "") || !ie(Pd(t, dr))),
            O && t.setAttribute("transform", O))),
        90 < Math.abs(f) &&
          Math.abs(f) < 270 &&
          (B
            ? ((s *= -1),
              (f += u <= 0 ? 180 : -180),
              (u += u <= 0 ? 180 : -180))
            : ((o *= -1), (f += f <= 0 ? 180 : -180))),
        (e = e || r.uncache),
        (r.x =
          i -
          ((r.xPercent =
            i &&
            ((!e && r.xPercent) ||
              (Math.round(t.offsetWidth / 2) === Math.round(-i) ? -50 : 0)))
            ? (t.offsetWidth * r.xPercent) / 100
            : 0) +
          "px"),
        (r.y =
          n -
          ((r.yPercent =
            n &&
            ((!e && r.yPercent) ||
              (Math.round(t.offsetHeight / 2) === Math.round(-n) ? -50 : 0)))
            ? (t.offsetHeight * r.yPercent) / 100
            : 0) +
          "px"),
        (r.z = a + "px"),
        (r.scaleX = ia(s)),
        (r.scaleY = ia(o)),
        (r.rotation = ia(u) + L),
        (r.rotationX = ia(h) + L),
        (r.rotationY = ia(l) + L),
        (r.skewX = f + L),
        (r.skewY = c + L),
        (r.transformPerspective = d + "px"),
        (r.zOrigin = parseFloat(Y.split(" ")[2]) || 0) && (F[pr] = Mr(Y)),
        (r.xOffset = r.yOffset = 0),
        (r.force3D = q.force3D),
        (r.renderTransform = r.svg ? Er : Ye ? Sr : Or),
        (r.uncache = 0),
        r
      );
    },
    Mr = function _firstTwoOnly(t) {
      return (t = t.split(" "))[0] + " " + t[1];
    },
    Or = function _renderNon3DTransforms(t, e) {
      (e.z = "0px"),
        (e.rotationY = e.rotationX = "0deg"),
        (e.force3D = 0),
        Sr(t, e);
    },
    Pr = "0deg",
    Ar = "0px",
    Cr = ") ",
    Sr = function _renderCSSTransforms(t, e) {
      var r = e || this,
        i = r.xPercent,
        n = r.yPercent,
        a = r.x,
        s = r.y,
        o = r.z,
        u = r.rotation,
        h = r.rotationY,
        l = r.rotationX,
        f = r.skewX,
        c = r.skewY,
        d = r.scaleX,
        p = r.scaleY,
        _ = r.transformPerspective,
        m = r.force3D,
        g = r.target,
        v = r.zOrigin,
        y = "",
        T = ("auto" === m && t && 1 !== t) || !0 === m;
      if (v && (l !== Pr || h !== Pr)) {
        var b,
          w = parseFloat(h) * or,
          x = Math.sin(w),
          k = Math.cos(w);
        (w = parseFloat(l) * or),
          (b = Math.cos(w)),
          (a = oe(g, a, x * b * -v)),
          (s = oe(g, s, -Math.sin(w) * -v)),
          (o = oe(g, o, k * b * -v + v));
      }
      _ !== Ar && (y += "perspective(" + _ + Cr),
        (i || n) && (y += "translate(" + i + "%, " + n + "%) "),
        (!T && a === Ar && s === Ar && o === Ar) ||
          (y +=
            o !== Ar || T
              ? "translate3d(" + a + ", " + s + ", " + o + ") "
              : "translate(" + a + ", " + s + Cr),
        u !== Pr && (y += "rotate(" + u + Cr),
        h !== Pr && (y += "rotateY(" + h + Cr),
        l !== Pr && (y += "rotateX(" + l + Cr),
        (f === Pr && c === Pr) || (y += "skew(" + f + ", " + c + Cr),
        (1 === d && 1 === p) || (y += "scale(" + d + ", " + p + Cr),
        (g.style[dr] = y || "translate(0, 0)");
    },
    Er = function _renderSVGTransforms(t, e) {
      var r,
        i,
        n,
        a,
        s,
        o = e || this,
        u = o.xPercent,
        h = o.yPercent,
        l = o.x,
        f = o.y,
        c = o.rotation,
        d = o.skewX,
        p = o.skewY,
        _ = o.scaleX,
        m = o.scaleY,
        g = o.target,
        v = o.xOrigin,
        y = o.yOrigin,
        T = o.xOffset,
        b = o.yOffset,
        w = o.forceCSS,
        x = parseFloat(l),
        k = parseFloat(f);
      (c = parseFloat(c)),
        (d = parseFloat(d)),
        (p = parseFloat(p)) && ((d += p = parseFloat(p)), (c += p)),
        c || d
          ? ((c *= or),
            (d *= or),
            (r = Math.cos(c) * _),
            (i = Math.sin(c) * _),
            (n = Math.sin(c - d) * -m),
            (a = Math.cos(c - d) * m),
            d &&
              ((p *= or),
              (s = Math.tan(d - p)),
              (n *= s = Math.sqrt(1 + s * s)),
              (a *= s),
              p &&
                ((s = Math.tan(p)), (r *= s = Math.sqrt(1 + s * s)), (i *= s))),
            (r = ia(r)),
            (i = ia(i)),
            (n = ia(n)),
            (a = ia(a)))
          : ((r = _), (a = m), (i = n = 0)),
        ((x && !~(l + "").indexOf("px")) || (k && !~(f + "").indexOf("px"))) &&
          ((x = _d(g, "x", l, "px")), (k = _d(g, "y", f, "px"))),
        (v || y || T || b) &&
          ((x = ia(x + v - (v * r + y * n) + T)),
          (k = ia(k + y - (v * i + y * a) + b))),
        (u || h) &&
          ((s = g.getBBox()),
          (x = ia(x + (u / 100) * s.width)),
          (k = ia(k + (h / 100) * s.height))),
        (s =
          "matrix(" +
          r +
          "," +
          i +
          "," +
          n +
          "," +
          a +
          "," +
          x +
          "," +
          k +
          ")"),
        g.setAttribute("transform", s),
        w && (g.style[dr] = s);
    };
  ha("padding,margin,Width,Radius", function (e, r) {
    var t = "Right",
      i = "Bottom",
      n = "Left",
      o = (r < 3 ? ["Top", t, i, n] : ["Top" + n, "Top" + t, i + t, i + n]).map(
        function (t) {
          return r < 2 ? e + t : "border" + t + e;
        }
      );
    br[1 < r ? "border" + e : e] = function (e, t, r, i, n) {
      var a, s;
      if (arguments.length < 4)
        return (
          (a = o.map(function (t) {
            return yr(e, t, r);
          })),
          5 === (s = a.join(" ")).split(a[0]).length ? a[0] : s
        );
      (a = (i + "").split(" ")),
        (s = {}),
        o.forEach(function (t, e) {
          return (s[t] = a[e] = a[e] || a[((e - 1) / 2) | 0]);
        }),
        e.init(t, s, n);
    };
  });
  var Dr,
    zr,
    Rr,
    Fr = {
      name: "css",
      register: Sd,
      targetTest: function targetTest(t) {
        return t.style && t.nodeType;
      },
      init: function init(t, e, i, n, a) {
        var s,
          o,
          u,
          h,
          l,
          f,
          c,
          d,
          p,
          _,
          m,
          g,
          v,
          y,
          T,
          b,
          w = this._props,
          x = t.style,
          k = i.vars.startAt;
        for (c in (Fe || Sd(),
        (this.styles = this.styles || Md(t)),
        (b = this.styles.props),
        (this.tween = i),
        e))
          if (
            "autoRound" !== c &&
            ((o = e[c]), !pt[c] || !ac(c, e, i, n, t, a))
          )
            if (
              ((l = typeof o),
              (f = br[c]),
              "function" === l && (l = typeof (o = o.call(i, n, t, a))),
              "string" === l && ~o.indexOf("random(") && (o = ob(o)),
              f)
            )
              f(this, t, c, o, i) && (T = 1);
            else if ("--" === c.substr(0, 2))
              (s = (getComputedStyle(t).getPropertyValue(c) + "").trim()),
                (o += ""),
                (Dt.lastIndex = 0),
                Dt.test(s) || ((d = Ya(s)), (p = Ya(o))),
                p ? d !== p && (s = _d(t, c, s, p) + p) : d && (o += d),
                this.add(x, "setProperty", s, o, n, a, 0, 0, c),
                w.push(c),
                b.push(c, 0, x[c]);
            else if ("undefined" !== l) {
              if (
                (k && c in k
                  ? ((s =
                      "function" == typeof k[c] ? k[c].call(i, n, t, a) : k[c]),
                    r(s) && ~s.indexOf("random(") && (s = ob(s)),
                    Ya(s + "") || (s += q.units[c] || Ya(yr(t, c)) || ""),
                    "=" === (s + "").charAt(1) && (s = yr(t, c)))
                  : (s = yr(t, c)),
                (h = parseFloat(s)),
                (_ = "string" === l && "=" === o.charAt(1) && o.substr(0, 2)) &&
                  (o = o.substr(2)),
                (u = parseFloat(o)),
                c in cr &&
                  ("autoAlpha" === c &&
                    (1 === h &&
                      "hidden" === yr(t, "visibility") &&
                      u &&
                      (h = 0),
                    b.push("visibility", 0, x.visibility),
                    Yd(
                      this,
                      x,
                      "visibility",
                      h ? "inherit" : "hidden",
                      u ? "inherit" : "hidden",
                      !u
                    )),
                  "scale" !== c &&
                    "transform" !== c &&
                    ~(c = cr[c]).indexOf(",") &&
                    (c = c.split(",")[0])),
                (m = c in ar))
              )
                if (
                  (this.styles.save(c),
                  g ||
                    (((v = t._gsap).renderTransform && !e.parseTransform) ||
                      kr(t, e.parseTransform),
                    (y = !1 !== e.smoothOrigin && v.smooth),
                    ((g = this._pt =
                      new _e(
                        this._pt,
                        x,
                        dr,
                        0,
                        1,
                        v.renderTransform,
                        v,
                        0,
                        -1
                      )).dep = 1)),
                  "scale" === c)
                )
                  (this._pt = new _e(
                    this._pt,
                    v,
                    "scaleY",
                    v.scaleY,
                    (_ ? ka(v.scaleY, _ + u) : u) - v.scaleY || 0,
                    vd
                  )),
                    (this._pt.u = 0),
                    w.push("scaleY", c),
                    (c += "X");
                else {
                  if ("transformOrigin" === c) {
                    b.push(pr, 0, x[pr]),
                      (o = de(o)),
                      v.svg
                        ? le(t, o, 0, y, 0, this)
                        : ((p = parseFloat(o.split(" ")[2]) || 0) !==
                            v.zOrigin && Yd(this, v, "zOrigin", v.zOrigin, p),
                          Yd(this, x, c, Mr(s), Mr(o)));
                    continue;
                  }
                  if ("svgOrigin" === c) {
                    le(t, o, 1, y, 0, this);
                    continue;
                  }
                  if (c in xr) {
                    ve(this, v, c, h, _ ? ka(h, _ + o) : o);
                    continue;
                  }
                  if ("smoothOrigin" === c) {
                    Yd(this, v, "smooth", v.smooth, o);
                    continue;
                  }
                  if ("force3D" === c) {
                    v[c] = o;
                    continue;
                  }
                  if ("transform" === c) {
                    xe(this, o, t);
                    continue;
                  }
                }
              else c in x || (c = mr(c) || c);
              if (
                m ||
                ((u || 0 === u) && (h || 0 === h) && !fr.test(o) && c in x)
              )
                (u = u || 0),
                  (d = (s + "").substr((h + "").length)) !==
                    (p = Ya(o) || (c in q.units ? q.units[c] : d)) &&
                    (h = _d(t, c, s, p)),
                  (this._pt = new _e(
                    this._pt,
                    m ? v : x,
                    c,
                    h,
                    (_ ? ka(h, _ + u) : u) - h,
                    m || ("px" !== p && "zIndex" !== c) || !1 === e.autoRound
                      ? vd
                      : yd
                  )),
                  (this._pt.u = p || 0),
                  d !== p && "%" !== p && ((this._pt.b = s), (this._pt.r = xd));
              else if (c in x) be.call(this, t, c, s, _ ? _ + o : o);
              else if (c in t) this.add(t, c, s || t[c], _ ? _ + o : o, n, a);
              else if ("parseTransform" !== c) {
                Q(c, o);
                continue;
              }
              m || (c in x ? b.push(c, 0, x[c]) : b.push(c, 1, s || t[c])),
                w.push(c);
            }
        T && pe(this);
      },
      render: function render(t, e) {
        if (e.tween._time || !Ie())
          for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
        else e.styles.revert();
      },
      get: yr,
      aliases: cr,
      getSetter: function getSetter(t, e, r) {
        var i = cr[e];
        return (
          i && i.indexOf(",") < 0 && (e = i),
          e in ar && e !== pr && (t._gsap.x || yr(t, "x"))
            ? r && Le === r
              ? "scale" === e
                ? Ed
                : Dd
              : (Le = r || {}) && ("scale" === e ? Fd : Gd)
            : t.style && !u(t.style[e])
            ? Bd
            : ~e.indexOf("-")
            ? Cd
            : ne(t, e)
        );
      },
      core: { _removeProperty: Xd, _getMatrix: ke },
    };
  (Ee.utils.checkPrefix = mr),
    (Ee.core.getStyleSaver = Md),
    (Rr = ha(
      (Dr = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") +
        "," +
        (zr = "rotation,rotationX,rotationY,skewX,skewY") +
        ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
      function (t) {
        ar[t] = 1;
      }
    )),
    ha(zr, function (t) {
      (q.units[t] = "deg"), (xr[t] = 1);
    }),
    (cr[Rr[13]] = Dr + "," + zr),
    ha(
      "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
      function (t) {
        var e = t.split(":");
        cr[e[1]] = Rr[e[0]];
      }
    ),
    ha(
      "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
      function (t) {
        q.units[t] = "px";
      }
    ),
    Ee.registerPlugin(Fr);
  var Br = Ee.registerPlugin(Fr) || Ee,
    Lr = Br.core.Tween;
  (e.Back = $e),
    (e.Bounce = er),
    (e.CSSPlugin = Fr),
    (e.Circ = nr),
    (e.Cubic = Ge),
    (e.Elastic = Ze),
    (e.Expo = ir),
    (e.Linear = We),
    (e.Power0 = qe),
    (e.Power1 = Ve),
    (e.Power2 = Ue),
    (e.Power3 = Xe),
    (e.Power4 = Ne),
    (e.Quad = Qe),
    (e.Quart = Ke),
    (e.Quint = Je),
    (e.Sine = rr),
    (e.SteppedEase = tr),
    (e.Strong = He),
    (e.TimelineLite = Xt),
    (e.TimelineMax = Xt),
    (e.TweenLite = Zt),
    (e.TweenMax = Lr),
    (e.default = Br),
    (e.gsap = Br);
  if (typeof window === "undefined" || window !== e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
  } else {
    delete e.default;
  }
});

!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t(((e = e || self).window = e.window || {}));
})(this, function (e) {
  "use strict";
  function _defineProperties(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        "value" in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }
  function r() {
    return (
      Se ||
      ("undefined" != typeof window &&
        (Se = window.gsap) &&
        Se.registerPlugin &&
        Se)
    );
  }
  function z(e, t) {
    return ~ze.indexOf(e) && ze[ze.indexOf(e) + 1][t];
  }
  function A(e) {
    return !!~t.indexOf(e);
  }
  function B(e, t, r, n, i) {
    return e.addEventListener(t, r, { passive: !n, capture: !!i });
  }
  function C(e, t, r, n) {
    return e.removeEventListener(t, r, !!n);
  }
  function F() {
    return (De && De.isPressed) || qe.cache++;
  }
  function G(r, n) {
    function Yc(e) {
      if (e || 0 === e) {
        i && (Te.history.scrollRestoration = "manual");
        var t = De && De.isPressed;
        (e = Yc.v = Math.round(e) || (De && De.iOS ? 1 : 0)),
          r(e),
          (Yc.cacheID = qe.cache),
          t && o("ss", e);
      } else (n || qe.cache !== Yc.cacheID || o("ref")) && ((Yc.cacheID = qe.cache), (Yc.v = r()));
      return Yc.v + Yc.offset;
    }
    return (Yc.offset = 0), r && Yc;
  }
  function J(e, t) {
    return (
      ((t && t._ctx && t._ctx.selector) || Se.utils.toArray)(e)[0] ||
      ("string" == typeof e && !1 !== Se.config().nullTargetWarn
        ? console.warn("Element not found:", e)
        : null)
    );
  }
  function K(t, e) {
    var r = e.s,
      n = e.sc;
    A(t) && (t = ke.scrollingElement || Ee);
    var i = qe.indexOf(t),
      o = n === Ie.sc ? 1 : 2;
    ~i || (i = qe.push(t) - 1), qe[i + o] || t.addEventListener("scroll", F);
    var a = qe[i + o],
      s =
        a ||
        (qe[i + o] =
          G(z(t, r), !0) ||
          (A(t)
            ? n
            : G(function (e) {
                return arguments.length ? (t[r] = e) : t[r];
              })));
    return (
      (s.target = t),
      a || (s.smooth = "smooth" === Se.getProperty(t, "scrollBehavior")),
      s
    );
  }
  function L(e, t, i) {
    function vd(e, t) {
      var r = Fe();
      t || n < r - s
        ? ((a = o), (o = e), (l = s), (s = r))
        : i
        ? (o += e)
        : (o = a + ((e - a) / (r - l)) * (s - l));
    }
    var o = e,
      a = e,
      s = Fe(),
      l = s,
      n = t || 50,
      c = Math.max(500, 3 * n);
    return {
      update: vd,
      reset: function reset() {
        (a = o = i ? 0 : o), (l = s = 0);
      },
      getVelocity: function getVelocity(e) {
        var t = l,
          r = a,
          n = Fe();
        return (
          (!e && 0 !== e) || e === o || vd(e),
          s === l || c < n - l
            ? 0
            : ((o + (i ? r : -r)) / ((i ? n : s) - t)) * 1e3
        );
      },
    };
  }
  function M(e, t) {
    return (
      t && !e._gsapAllow && e.preventDefault(),
      e.changedTouches ? e.changedTouches[0] : e
    );
  }
  function N(e) {
    var t = Math.max.apply(Math, e),
      r = Math.min.apply(Math, e);
    return Math.abs(t) >= Math.abs(r) ? t : r;
  }
  function O() {
    (Ae = Se.core.globals().ScrollTrigger) &&
      Ae.core &&
      (function _integrate() {
        var e = Ae.core,
          r = e.bridge || {},
          t = e._scrollers,
          n = e._proxies;
        t.push.apply(t, qe),
          n.push.apply(n, ze),
          (qe = t),
          (ze = n),
          (o = function _bridge(e, t) {
            return r[e](t);
          });
      })();
  }
  function P(e) {
    return (
      (Se = e || r()) &&
        "undefined" != typeof document &&
        document.body &&
        ((Te = window),
        (Ee = (ke = document).documentElement),
        (Pe = ke.body),
        (t = [Te, ke, Ee, Pe]),
        Se.utils.clamp,
        (Be = Se.core.context || function () {}),
        (Oe = "onpointerenter" in Pe ? "pointer" : "mouse"),
        (Me = k.isTouch =
          Te.matchMedia &&
          Te.matchMedia("(hover: none), (pointer: coarse)").matches
            ? 1
            : "ontouchstart" in Te ||
              0 < navigator.maxTouchPoints ||
              0 < navigator.msMaxTouchPoints
            ? 2
            : 0),
        (Re = k.eventTypes =
          (
            "ontouchstart" in Ee
              ? "touchstart,touchmove,touchcancel,touchend"
              : "onpointerdown" in Ee
              ? "pointerdown,pointermove,pointercancel,pointerup"
              : "mousedown,mousemove,mouseup,mouseup"
          ).split(",")),
        setTimeout(function () {
          return (i = 0);
        }, 500),
        O(),
        (Ce = 1)),
      Ce
    );
  }
  var Se,
    Ce,
    Te,
    ke,
    Ee,
    Pe,
    Me,
    Oe,
    Ae,
    t,
    De,
    Re,
    Be,
    i = 1,
    Ye = [],
    qe = [],
    ze = [],
    Fe = Date.now,
    o = function _bridge(e, t) {
      return t;
    },
    n = "scrollLeft",
    a = "scrollTop",
    Le = {
      s: n,
      p: "left",
      p2: "Left",
      os: "right",
      os2: "Right",
      d: "width",
      d2: "Width",
      a: "x",
      sc: G(function (e) {
        return arguments.length
          ? Te.scrollTo(e, Ie.sc())
          : Te.pageXOffset || ke[n] || Ee[n] || Pe[n] || 0;
      }),
    },
    Ie = {
      s: a,
      p: "top",
      p2: "Top",
      os: "bottom",
      os2: "Bottom",
      d: "height",
      d2: "Height",
      a: "y",
      op: Le,
      sc: G(function (e) {
        return arguments.length
          ? Te.scrollTo(Le.sc(), e)
          : Te.pageYOffset || ke[a] || Ee[a] || Pe[a] || 0;
      }),
    };
  (Le.op = Ie), (qe.cache = 0);
  var k =
    ((Observer.prototype.init = function init(e) {
      Ce || P(Se) || console.warn("Please gsap.registerPlugin(Observer)"),
        Ae || O();
      var i = e.tolerance,
        a = e.dragMinimum,
        t = e.type,
        o = e.target,
        r = e.lineHeight,
        n = e.debounce,
        s = e.preventDefault,
        l = e.onStop,
        c = e.onStopDelay,
        u = e.ignore,
        f = e.wheelSpeed,
        p = e.event,
        d = e.onDragStart,
        h = e.onDragEnd,
        g = e.onDrag,
        v = e.onPress,
        b = e.onRelease,
        m = e.onRight,
        y = e.onLeft,
        x = e.onUp,
        _ = e.onDown,
        w = e.onChangeX,
        S = e.onChangeY,
        T = e.onChange,
        k = e.onToggleX,
        E = e.onToggleY,
        D = e.onHover,
        R = e.onHoverEnd,
        Y = e.onMove,
        q = e.ignoreCheck,
        z = e.isNormalizer,
        I = e.onGestureStart,
        X = e.onGestureEnd,
        H = e.onWheel,
        W = e.onEnable,
        G = e.onDisable,
        j = e.onClick,
        V = e.scrollSpeed,
        U = e.capture,
        Q = e.allowClicks,
        Z = e.lockAxis,
        $ = e.onLockAxis;
      function We() {
        return (ye = Fe());
      }
      function Xe(e, t) {
        return (
          ((se.event = e) && u && ~u.indexOf(e.target)) ||
          (t && he && "touch" !== e.pointerType) ||
          (q && q(e, t))
        );
      }
      function Ze() {
        var e = (se.deltaX = N(be)),
          t = (se.deltaY = N(me)),
          r = Math.abs(e) >= i,
          n = Math.abs(t) >= i;
        T && (r || n) && T(se, e, t, be, me),
          r &&
            (m && 0 < se.deltaX && m(se),
            y && se.deltaX < 0 && y(se),
            w && w(se),
            k && se.deltaX < 0 != le < 0 && k(se),
            (le = se.deltaX),
            (be[0] = be[1] = be[2] = 0)),
          n &&
            (_ && 0 < se.deltaY && _(se),
            x && se.deltaY < 0 && x(se),
            S && S(se),
            E && se.deltaY < 0 != ce < 0 && E(se),
            (ce = se.deltaY),
            (me[0] = me[1] = me[2] = 0)),
          (ne || re) && (Y && Y(se), re && (g(se), (re = !1)), (ne = !1)),
          oe && !(oe = !1) && $ && $(se),
          ie && (H(se), (ie = !1)),
          (ee = 0);
      }
      function $e(e, t, r) {
        (be[r] += e),
          (me[r] += t),
          se._vx.update(e),
          se._vy.update(t),
          n ? (ee = ee || requestAnimationFrame(Ze)) : Ze();
      }
      function _e(e, t) {
        Z &&
          !ae &&
          ((se.axis = ae = Math.abs(e) > Math.abs(t) ? "x" : "y"), (oe = !0)),
          "y" !== ae && ((be[2] += e), se._vx.update(e, !0)),
          "x" !== ae && ((me[2] += t), se._vy.update(t, !0)),
          n ? (ee = ee || requestAnimationFrame(Ze)) : Ze();
      }
      function af(e) {
        if (!Xe(e, 1)) {
          var t = (e = M(e, s)).clientX,
            r = e.clientY,
            n = t - se.x,
            i = r - se.y,
            o = se.isDragging;
          (se.x = t),
            (se.y = r),
            (o ||
              Math.abs(se.startX - t) >= a ||
              Math.abs(se.startY - r) >= a) &&
              (g && (re = !0),
              o || (se.isDragging = !0),
              _e(n, i),
              o || (d && d(se)));
        }
      }
      function df(e) {
        return (
          e.touches &&
          1 < e.touches.length &&
          (se.isGesturing = !0) &&
          I(e, se.isDragging)
        );
      }
      function ef() {
        return (se.isGesturing = !1) || X(se);
      }
      function ff(e) {
        if (!Xe(e)) {
          var t = ue(),
            r = fe();
          $e((t - pe) * V, (r - de) * V, 1),
            (pe = t),
            (de = r),
            l && te.restart(!0);
        }
      }
      function gf(e) {
        if (!Xe(e)) {
          (e = M(e, s)), H && (ie = !0);
          var t =
            (1 === e.deltaMode ? r : 2 === e.deltaMode ? Te.innerHeight : 1) *
            f;
          $e(e.deltaX * t, e.deltaY * t, 0), l && !z && te.restart(!0);
        }
      }
      function hf(e) {
        if (!Xe(e)) {
          var t = e.clientX,
            r = e.clientY,
            n = t - se.x,
            i = r - se.y;
          (se.x = t), (se.y = r), (ne = !0), (n || i) && _e(n, i);
        }
      }
      function jf(e) {
        (se.event = e), D(se);
      }
      function kf(e) {
        (se.event = e), R(se);
      }
      function lf(e) {
        return Xe(e) || (M(e, s) && j(se));
      }
      (this.target = o = J(o) || Ee),
        (this.vars = e),
        (u = u && Se.utils.toArray(u)),
        (i = i || 1e-9),
        (a = a || 0),
        (f = f || 1),
        (V = V || 1),
        (t = t || "wheel,touch,pointer"),
        (n = !1 !== n),
        (r = r || parseFloat(Te.getComputedStyle(Pe).lineHeight) || 22);
      var ee,
        te,
        re,
        ne,
        ie,
        oe,
        ae,
        se = this,
        le = 0,
        ce = 0,
        ue = K(o, Le),
        fe = K(o, Ie),
        pe = ue(),
        de = fe(),
        he =
          ~t.indexOf("touch") &&
          !~t.indexOf("pointer") &&
          "pointerdown" === Re[0],
        ge = A(o),
        ve = o.ownerDocument || ke,
        be = [0, 0, 0],
        me = [0, 0, 0],
        ye = 0,
        xe = (se.onPress = function (e) {
          Xe(e, 1) ||
            (e && e.button) ||
            ((se.axis = ae = null),
            te.pause(),
            (se.isPressed = !0),
            (e = M(e)),
            (le = ce = 0),
            (se.startX = se.x = e.clientX),
            (se.startY = se.y = e.clientY),
            se._vx.reset(),
            se._vy.reset(),
            B(z ? o : ve, Re[1], af, s, !0),
            (se.deltaX = se.deltaY = 0),
            v && v(se));
        }),
        we = (se.onRelease = function (t) {
          if (!Xe(t, 1)) {
            C(z ? o : ve, Re[1], af, !0);
            var e = !isNaN(se.y - se.startY),
              r =
                se.isDragging &&
                (3 < Math.abs(se.x - se.startX) ||
                  3 < Math.abs(se.y - se.startY)),
              n = M(t);
            !r &&
              e &&
              (se._vx.reset(),
              se._vy.reset(),
              s &&
                Q &&
                Se.delayedCall(0.08, function () {
                  if (300 < Fe() - ye && !t.defaultPrevented)
                    if (t.target.click) t.target.click();
                    else if (ve.createEvent) {
                      var e = ve.createEvent("MouseEvents");
                      e.initMouseEvent(
                        "click",
                        !0,
                        !0,
                        Te,
                        1,
                        n.screenX,
                        n.screenY,
                        n.clientX,
                        n.clientY,
                        !1,
                        !1,
                        !1,
                        !1,
                        0,
                        null
                      ),
                        t.target.dispatchEvent(e);
                    }
                })),
              (se.isDragging = se.isGesturing = se.isPressed = !1),
              l && !z && te.restart(!0),
              h && r && h(se),
              b && b(se, r);
          }
        });
      (te = se._dc =
        Se.delayedCall(c || 0.25, function onStopFunc() {
          se._vx.reset(), se._vy.reset(), te.pause(), l && l(se);
        }).pause()),
        (se.deltaX = se.deltaY = 0),
        (se._vx = L(0, 50, !0)),
        (se._vy = L(0, 50, !0)),
        (se.scrollX = ue),
        (se.scrollY = fe),
        (se.isDragging = se.isGesturing = se.isPressed = !1),
        Be(this),
        (se.enable = function (e) {
          return (
            se.isEnabled ||
              (B(ge ? ve : o, "scroll", F),
              0 <= t.indexOf("scroll") && B(ge ? ve : o, "scroll", ff, s, U),
              0 <= t.indexOf("wheel") && B(o, "wheel", gf, s, U),
              ((0 <= t.indexOf("touch") && Me) || 0 <= t.indexOf("pointer")) &&
                (B(o, Re[0], xe, s, U),
                B(ve, Re[2], we),
                B(ve, Re[3], we),
                Q && B(o, "click", We, !1, !0),
                j && B(o, "click", lf),
                I && B(ve, "gesturestart", df),
                X && B(ve, "gestureend", ef),
                D && B(o, Oe + "enter", jf),
                R && B(o, Oe + "leave", kf),
                Y && B(o, Oe + "move", hf)),
              (se.isEnabled = !0),
              e && e.type && xe(e),
              W && W(se)),
            se
          );
        }),
        (se.disable = function () {
          se.isEnabled &&
            (Ye.filter(function (e) {
              return e !== se && A(e.target);
            }).length || C(ge ? ve : o, "scroll", F),
            se.isPressed &&
              (se._vx.reset(), se._vy.reset(), C(z ? o : ve, Re[1], af, !0)),
            C(ge ? ve : o, "scroll", ff, U),
            C(o, "wheel", gf, U),
            C(o, Re[0], xe, U),
            C(ve, Re[2], we),
            C(ve, Re[3], we),
            C(o, "click", We, !0),
            C(o, "click", lf),
            C(ve, "gesturestart", df),
            C(ve, "gestureend", ef),
            C(o, Oe + "enter", jf),
            C(o, Oe + "leave", kf),
            C(o, Oe + "move", hf),
            (se.isEnabled = se.isPressed = se.isDragging = !1),
            G && G(se));
        }),
        (se.kill = se.revert =
          function () {
            se.disable();
            var e = Ye.indexOf(se);
            0 <= e && Ye.splice(e, 1), De === se && (De = 0);
          }),
        Ye.push(se),
        z && A(o) && (De = se),
        se.enable(p);
    }),
    (function _createClass(e, t, r) {
      return (
        t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), e
      );
    })(Observer, [
      {
        key: "velocityX",
        get: function get() {
          return this._vx.getVelocity();
        },
      },
      {
        key: "velocityY",
        get: function get() {
          return this._vy.getVelocity();
        },
      },
    ]),
    Observer);
  function Observer(e) {
    this.init(e);
  }
  (k.version = "x.x.x"),
    (k.create = function (e) {
      return new k(e);
    }),
    (k.register = P),
    (k.getAll = function () {
      return Ye.slice();
    }),
    (k.getById = function (t) {
      return Ye.filter(function (e) {
        return e.vars.id === t;
      })[0];
    }),
    r() && Se.registerPlugin(k);
  function ya(e, t, r) {
    var n = pt(e) && ("clamp(" === e.substr(0, 6) || -1 < e.indexOf("max"));
    return (r["_" + t + "Clamp"] = n) ? e.substr(6, e.length - 7) : e;
  }
  function za(e, t) {
    return !t || (pt(e) && "clamp(" === e.substr(0, 6))
      ? e
      : "clamp(" + e + ")";
  }
  function Ba() {
    return (et = 1);
  }
  function Ca() {
    return (et = 0);
  }
  function Da(e) {
    return e;
  }
  function Ea(e) {
    return Math.round(1e5 * e) / 1e5 || 0;
  }
  function Fa() {
    return "undefined" != typeof window;
  }
  function Ga() {
    return Ne || (Fa() && (Ne = window.gsap) && Ne.registerPlugin && Ne);
  }
  function Ha(e) {
    return !!~l.indexOf(e);
  }
  function Ia(e) {
    return (
      z(e, "getBoundingClientRect") ||
      (Ha(e)
        ? function () {
            return (Rt.width = He.innerWidth), (Rt.height = He.innerHeight), Rt;
          }
        : function () {
            return Ct(e);
          })
    );
  }
  function La(e, t) {
    var r = t.s,
      n = t.d2,
      i = t.d,
      o = t.a;
    return Math.max(
      0,
      (r = "scroll" + n) && (o = z(e, r))
        ? o() - Ia(e)()[i]
        : Ha(e)
        ? (je[r] || Je[r]) -
          (He["inner" + n] || je["client" + n] || Je["client" + n])
        : e[r] - e["offset" + n]
    );
  }
  function Ma(e, t) {
    for (var r = 0; r < h.length; r += 3)
      (t && !~t.indexOf(h[r + 1])) || e(h[r], h[r + 1], h[r + 2]);
  }
  function Oa(e) {
    return "function" == typeof e;
  }
  function Pa(e) {
    return "number" == typeof e;
  }
  function Qa(e) {
    return "object" == typeof e;
  }
  function Ra(e, t, r) {
    return e && e.progress(t ? 0 : 1) && r && e.pause();
  }
  function Sa(e, t) {
    if (e.enabled) {
      var r = t(e);
      r && r.totalTime && (e.callbackAnimation = r);
    }
  }
  function hb(e) {
    return He.getComputedStyle(e);
  }
  function jb(e, t) {
    for (var r in t) r in e || (e[r] = t[r]);
    return e;
  }
  function lb(e, t) {
    var r = t.d2;
    return e["offset" + r] || e["client" + r] || 0;
  }
  function mb(e) {
    var t,
      r = [],
      n = e.labels,
      i = e.duration();
    for (t in n) r.push(n[t] / i);
    return r;
  }
  function ob(i) {
    var o = Ne.utils.snap(i),
      a =
        Array.isArray(i) &&
        i.slice(0).sort(function (e, t) {
          return e - t;
        });
    return a
      ? function (e, t, r) {
          var n;
          if ((void 0 === r && (r = 0.001), !t)) return o(e);
          if (0 < t) {
            for (e -= r, n = 0; n < a.length; n++) if (a[n] >= e) return a[n];
            return a[n - 1];
          }
          for (n = a.length, e += r; n--; ) if (a[n] <= e) return a[n];
          return a[0];
        }
      : function (e, t, r) {
          void 0 === r && (r = 0.001);
          var n = o(e);
          return !t || Math.abs(n - e) < r || n - e < 0 == t < 0
            ? n
            : o(t < 0 ? e - i : e + i);
        };
  }
  function qb(t, r, e, n) {
    return e.split(",").forEach(function (e) {
      return t(r, e, n);
    });
  }
  function rb(e, t, r, n, i) {
    return e.addEventListener(t, r, { passive: !n, capture: !!i });
  }
  function sb(e, t, r, n) {
    return e.removeEventListener(t, r, !!n);
  }
  function tb(e, t, r) {
    (r = r && r.wheelHandler) && (e(t, "wheel", r), e(t, "touchmove", r));
  }
  function xb(e, t) {
    if (pt(e)) {
      var r = e.indexOf("="),
        n = ~r ? (e.charAt(r - 1) + 1) * parseFloat(e.substr(r + 1)) : 0;
      ~r && (e.indexOf("%") > r && (n *= t / 100), (e = e.substr(0, r - 1))),
        (e =
          n +
          (e in Y
            ? Y[e] * t
            : ~e.indexOf("%")
            ? (parseFloat(e) * t) / 100
            : parseFloat(e) || 0));
    }
    return e;
  }
  function yb(e, t, r, n, i, o, a, s) {
    var l = i.startColor,
      c = i.endColor,
      u = i.fontSize,
      f = i.indent,
      p = i.fontWeight,
      d = Ge.createElement("div"),
      h = Ha(r) || "fixed" === z(r, "pinType"),
      g = -1 !== e.indexOf("scroller"),
      v = h ? Je : r,
      b = -1 !== e.indexOf("start"),
      m = b ? l : c,
      y =
        "border-color:" +
        m +
        ";font-size:" +
        u +
        ";color:" +
        m +
        ";font-weight:" +
        p +
        ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
    return (
      (y += "position:" + ((g || s) && h ? "fixed;" : "absolute;")),
      (!g && !s && h) ||
        (y += (n === Ie ? T : D) + ":" + (o + parseFloat(f)) + "px;"),
      a &&
        (y +=
          "box-sizing:border-box;text-align:left;width:" +
          a.offsetWidth +
          "px;"),
      (d._isStart = b),
      d.setAttribute("class", "gsap-marker-" + e + (t ? " marker-" + t : "")),
      (d.style.cssText = y),
      (d.innerText = t || 0 === t ? e + "-" + t : e),
      v.children[0] ? v.insertBefore(d, v.children[0]) : v.appendChild(d),
      (d._offset = d["offset" + n.op.d2]),
      q(d, 0, n, b),
      d
    );
  }
  function Db() {
    return 34 < ct() - ut && (w = w || requestAnimationFrame(V));
  }
  function Eb() {
    (v && v.isPressed && !(v.startX > Je.clientWidth)) ||
      (qe.cache++,
      v ? (w = w || requestAnimationFrame(V)) : V(),
      ut || H("scrollStart"),
      (ut = ct()));
  }
  function Fb() {
    (y = He.innerWidth), (m = He.innerHeight);
  }
  function Gb() {
    qe.cache++,
      Qe ||
        g ||
        Ge.fullscreenElement ||
        Ge.webkitFullscreenElement ||
        (b &&
          y === He.innerWidth &&
          !(Math.abs(He.innerHeight - m) > 0.25 * He.innerHeight)) ||
        c.restart(!0);
  }
  function Jb() {
    return sb(ee, "scrollEnd", Jb) || Ot(!0);
  }
  function Mb(e) {
    for (var t = 0; t < W.length; t += 5)
      (!e || (W[t + 4] && W[t + 4].query === e)) &&
        ((W[t].style.cssText = W[t + 1]),
        W[t].getBBox && W[t].setAttribute("transform", W[t + 2] || ""),
        (W[t + 3].uncache = 1));
  }
  function Nb(e, t) {
    var r;
    for (tt = 0; tt < Et.length; tt++)
      !(r = Et[tt]) ||
        (t && r._ctx !== t) ||
        (e ? r.kill(1) : r.revert(!0, !0));
    t && Mb(t), t || H("revert");
  }
  function Ob(e, t) {
    qe.cache++,
      (!t && ot) ||
        qe.forEach(function (e) {
          return Oa(e) && e.cacheID++ && (e.rec = 0);
        }),
      pt(e) && (He.history.scrollRestoration = _ = e);
  }
  function _b(e, t, r, n) {
    if (!e._gsap.swappedIn) {
      for (var i, o = U.length, a = t.style, s = e.style; o--; )
        a[(i = U[o])] = r[i];
      (a.position = "absolute" === r.position ? "absolute" : "relative"),
        "inline" === r.display && (a.display = "inline-block"),
        (s[D] = s[T] = "auto"),
        (a.flexBasis = r.flexBasis || "auto"),
        (a.overflow = "visible"),
        (a.boxSizing = "border-box"),
        (a[ht] = lb(e, Le) + St),
        (a[gt] = lb(e, Ie) + St),
        (a[xt] = s[_t] = s.top = s.left = "0"),
        Dt(n),
        (s[ht] = s.maxWidth = r[ht]),
        (s[gt] = s.maxHeight = r[gt]),
        (s[xt] = r[xt]),
        e.parentNode !== t &&
          (e.parentNode.insertBefore(t, e), t.appendChild(e)),
        (e._gsap.swappedIn = !0);
    }
  }
  function cc(e) {
    for (var t = Q.length, r = e.style, n = [], i = 0; i < t; i++)
      n.push(Q[i], r[Q[i]]);
    return (n.t = e), n;
  }
  function fc(e, t, r, n, i, o, a, s, l, c, u, f, p, d) {
    Oa(e) && (e = e(s)),
      pt(e) &&
        "max" === e.substr(0, 3) &&
        (e = f + ("=" === e.charAt(4) ? xb("0" + e.substr(3), r) : 0));
    var h,
      g,
      v,
      b = p ? p.time() : 0;
    if ((p && p.seek(0), isNaN(e) || (e = +e), Pa(e)))
      p &&
        (e = Ne.utils.mapRange(
          p.scrollTrigger.start,
          p.scrollTrigger.end,
          0,
          f,
          e
        )),
        a && q(a, r, n, !0);
    else {
      Oa(t) && (t = t(s));
      var m,
        y,
        x,
        _,
        w = (e || "0").split(" ");
      (v = J(t, s) || Je),
        ((m = Ct(v) || {}) && (m.left || m.top)) ||
          "none" !== hb(v).display ||
          ((_ = v.style.display),
          (v.style.display = "block"),
          (m = Ct(v)),
          _ ? (v.style.display = _) : v.style.removeProperty("display")),
        (y = xb(w[0], m[n.d])),
        (x = xb(w[1] || "0", r)),
        (e = m[n.p] - l[n.p] - c + y + i - x),
        a && q(a, x, n, r - x < 20 || (a._isStart && 20 < x)),
        (r -= r - x);
    }
    if ((d && ((s[d] = e || -0.001), e < 0 && (e = 0)), o)) {
      var S = e + r,
        C = o._isStart;
      (h = "scroll" + n.d2),
        q(
          o,
          S,
          n,
          (C && 20 < S) ||
            (!C && (u ? Math.max(Je[h], je[h]) : o.parentNode[h]) <= S + 1)
        ),
        u &&
          ((l = Ct(a)),
          u && (o.style[n.op.p] = l[n.op.p] - n.op.m - o._offset + St));
    }
    return (
      p &&
        v &&
        ((h = Ct(v)),
        p.seek(f),
        (g = Ct(v)),
        (p._caScrollDist = h[n.p] - g[n.p]),
        (e = (e / p._caScrollDist) * f)),
      p && p.seek(b),
      p ? e : Math.round(e)
    );
  }
  function hc(e, t, r, n) {
    if (e.parentNode !== t) {
      var i,
        o,
        a = e.style;
      if (t === Je) {
        for (i in ((e._stOrig = a.cssText), (o = hb(e))))
          +i ||
            $.test(i) ||
            !o[i] ||
            "string" != typeof a[i] ||
            "0" === i ||
            (a[i] = o[i]);
        (a.top = r), (a.left = n);
      } else a.cssText = e._stOrig;
      (Ne.core.getCache(e).uncache = 1), t.appendChild(e);
    }
  }
  function ic(r, e, n) {
    var i = e,
      o = i;
    return function (e) {
      var t = Math.round(r());
      return (
        t !== i &&
          t !== o &&
          3 < Math.abs(t - i) &&
          3 < Math.abs(t - o) &&
          ((e = t), n && n()),
        (o = i),
        (i = e)
      );
    };
  }
  function jc(e, t, r) {
    var n = {};
    (n[t.p] = "+=" + r), Ne.set(e, n);
  }
  function kc(c, e) {
    function pk(e, t, r, n, i) {
      var o = pk.tween,
        a = t.onComplete,
        s = {};
      r = r || u();
      var l = ic(u, r, function () {
        o.kill(), (pk.tween = 0);
      });
      return (
        (i = (n && i) || 0),
        (n = n || e - r),
        o && o.kill(),
        (t[f] = e),
        ((t.modifiers = s)[f] = function () {
          return l(r + n * o.ratio + i * o.ratio * o.ratio);
        }),
        (t.onUpdate = function () {
          qe.cache++, V();
        }),
        (t.onComplete = function () {
          (pk.tween = 0), a && a.call(o);
        }),
        (o = pk.tween = Ne.to(c, t))
      );
    }
    var u = K(c, e),
      f = "_scroll" + e.p2;
    return (
      ((c[f] = u).wheelHandler = function () {
        return pk.tween && pk.tween.kill() && (pk.tween = 0);
      }),
      rb(c, "wheel", u.wheelHandler),
      ee.isTouch && rb(c, "touchmove", u.wheelHandler),
      pk
    );
  }
  var Ne,
    s,
    He,
    Ge,
    je,
    Je,
    l,
    c,
    Ve,
    Ue,
    Ke,
    u,
    Qe,
    et,
    f,
    tt,
    p,
    d,
    h,
    rt,
    nt,
    g,
    v,
    b,
    m,
    y,
    E,
    x,
    _,
    it,
    w,
    ot,
    at,
    st,
    lt = 1,
    ct = Date.now,
    S = ct(),
    ut = 0,
    ft = 0,
    pt = function _isString(e) {
      return "string" == typeof e;
    },
    dt = Math.abs,
    T = "right",
    D = "bottom",
    ht = "width",
    gt = "height",
    vt = "Right",
    bt = "Left",
    mt = "Top",
    yt = "Bottom",
    xt = "padding",
    _t = "margin",
    wt = "Width",
    R = "Height",
    St = "px",
    Ct = function _getBounds(e, t) {
      var r =
          t &&
          "matrix(1, 0, 0, 1, 0, 0)" !== hb(e)[f] &&
          Ne.to(e, {
            x: 0,
            y: 0,
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            skewX: 0,
            skewY: 0,
          }).progress(1),
        n = e.getBoundingClientRect();
      return r && r.progress(0).kill(), n;
    },
    Tt = {
      startColor: "green",
      endColor: "red",
      indent: 0,
      fontSize: "16px",
      fontWeight: "normal",
    },
    kt = { toggleActions: "play", anticipatePin: 0 },
    Y = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
    q = function _positionMarker(e, t, r, n) {
      var i = { display: "block" },
        o = r[n ? "os2" : "p2"],
        a = r[n ? "p2" : "os2"];
      (e._isFlipped = n),
        (i[r.a + "Percent"] = n ? -100 : 0),
        (i[r.a] = n ? "1px" : 0),
        (i["border" + o + wt] = 1),
        (i["border" + a + wt] = 0),
        (i[r.p] = t + "px"),
        Ne.set(e, i);
    },
    Et = [],
    Pt = {},
    I = {},
    X = [],
    H = function _dispatch(e) {
      return (
        (I[e] &&
          I[e].map(function (e) {
            return e();
          })) ||
        X
      );
    },
    W = [],
    Mt = 0,
    Ot = function _refreshAll(e, t) {
      if (!ut || e) {
        (ot = ee.isRefreshing = !0),
          qe.forEach(function (e) {
            return Oa(e) && ++e.cacheID && (e.rec = e());
          });
        var r = H("refreshInit");
        rt && ee.sort(),
          t || Nb(),
          qe.forEach(function (e) {
            Oa(e) &&
              (e.smooth && (e.target.style.scrollBehavior = "auto"), e(0));
          }),
          Et.slice(0).forEach(function (e) {
            return e.refresh();
          }),
          Et.forEach(function (e, t) {
            if (e._subPinOffset && e.pin) {
              var r = e.vars.horizontal ? "offsetWidth" : "offsetHeight",
                n = e.pin[r];
              e.revert(!0, 1), e.adjustPinSpacing(e.pin[r] - n), e.refresh();
            }
          }),
          Et.forEach(function (e) {
            var t = La(e.scroller, e._dir);
            ("max" === e.vars.end || (e._endClamp && e.end > t)) &&
              e.setPositions(e.start, Math.max(e.start + 1, t), !0);
          }),
          r.forEach(function (e) {
            return e && e.render && e.render(-1);
          }),
          qe.forEach(function (e) {
            Oa(e) &&
              (e.smooth &&
                requestAnimationFrame(function () {
                  return (e.target.style.scrollBehavior = "smooth");
                }),
              e.rec && e(e.rec));
          }),
          Ob(_, 1),
          c.pause(),
          Mt++,
          V((ot = 2)),
          Et.forEach(function (e) {
            return Oa(e.vars.onRefresh) && e.vars.onRefresh(e);
          }),
          (ot = ee.isRefreshing = !1),
          H("refresh");
      } else rb(ee, "scrollEnd", Jb);
    },
    j = 0,
    At = 1,
    V = function _updateAll(e) {
      if (!ot || 2 === e) {
        (ee.isUpdating = !0), st && st.update(0);
        var t = Et.length,
          r = ct(),
          n = 50 <= r - S,
          i = t && Et[0].scroll();
        if (
          ((At = i < j ? -1 : 1),
          ot || (j = i),
          n &&
            (ut && !et && 200 < r - ut && ((ut = 0), H("scrollEnd")),
            (Ke = S),
            (S = r)),
          At < 0)
        ) {
          for (tt = t; 0 < tt--; ) Et[tt] && Et[tt].update(0, n);
          At = 1;
        } else for (tt = 0; tt < t; tt++) Et[tt] && Et[tt].update(0, n);
        ee.isUpdating = !1;
      }
      w = 0;
    },
    U = [
      "left",
      "top",
      D,
      T,
      _t + yt,
      _t + vt,
      _t + mt,
      _t + bt,
      "display",
      "flexShrink",
      "float",
      "zIndex",
      "gridColumnStart",
      "gridColumnEnd",
      "gridRowStart",
      "gridRowEnd",
      "gridArea",
      "justifySelf",
      "alignSelf",
      "placeSelf",
      "order",
    ],
    Q = U.concat([
      ht,
      gt,
      "boxSizing",
      "max" + wt,
      "max" + R,
      "position",
      _t,
      xt,
      xt + mt,
      xt + vt,
      xt + yt,
      xt + bt,
    ]),
    Z = /([A-Z])/g,
    Dt = function _setState(e) {
      if (e) {
        var t,
          r,
          n = e.t.style,
          i = e.length,
          o = 0;
        for ((e.t._gsap || Ne.core.getCache(e.t)).uncache = 1; o < i; o += 2)
          (r = e[o + 1]),
            (t = e[o]),
            r
              ? (n[t] = r)
              : n[t] && n.removeProperty(t.replace(Z, "-$1").toLowerCase());
      }
    },
    Rt = { left: 0, top: 0 },
    $ = /(webkit|moz|length|cssText|inset)/i,
    ee =
      ((ScrollTrigger.prototype.init = function init(M, O) {
        if (
          ((this.progress = this.start = 0), this.vars && this.kill(!0, !0), ft)
        ) {
          var A,
            n,
            d,
            D,
            R,
            B,
            Y,
            q,
            F,
            L,
            I,
            e,
            X,
            N,
            H,
            W,
            G,
            j,
            t,
            V,
            b,
            U,
            Q,
            m,
            Z,
            y,
            $,
            x,
            r,
            _,
            w,
            ee,
            i,
            h,
            te,
            re,
            ne,
            S,
            o,
            C = (M = jb(pt(M) || Pa(M) || M.nodeType ? { trigger: M } : M, kt))
              .onUpdate,
            T = M.toggleClass,
            a = M.id,
            k = M.onToggle,
            ie = M.onRefresh,
            E = M.scrub,
            oe = M.trigger,
            ae = M.pin,
            se = M.pinSpacing,
            le = M.invalidateOnRefresh,
            P = M.anticipatePin,
            s = M.onScrubComplete,
            g = M.onSnapComplete,
            ce = M.once,
            ue = M.snap,
            fe = M.pinReparent,
            l = M.pinSpacer,
            pe = M.containerAnimation,
            de = M.fastScrollEnd,
            he = M.preventOverlaps,
            ge =
              M.horizontal || (M.containerAnimation && !1 !== M.horizontal)
                ? Le
                : Ie,
            ve = !E && 0 !== E,
            be = J(M.scroller || He),
            c = Ne.core.getCache(be),
            me = Ha(be),
            ye =
              "fixed" ===
              ("pinType" in M
                ? M.pinType
                : z(be, "pinType") || (me && "fixed")),
            xe = [M.onEnter, M.onLeave, M.onEnterBack, M.onLeaveBack],
            _e = ve && M.toggleActions.split(" "),
            we = "markers" in M ? M.markers : kt.markers,
            Se = me ? 0 : parseFloat(hb(be)["border" + ge.p2 + wt]) || 0,
            Ce = this,
            Te =
              M.onRefreshInit &&
              function () {
                return M.onRefreshInit(Ce);
              },
            ke = (function _getSizeFunc(e, t, r) {
              var n = r.d,
                i = r.d2,
                o = r.a;
              return (o = z(e, "getBoundingClientRect"))
                ? function () {
                    return o()[n];
                  }
                : function () {
                    return (t ? He["inner" + i] : e["client" + i]) || 0;
                  };
            })(be, me, ge),
            Ee = (function _getOffsetsFunc(e, t) {
              return !t || ~ze.indexOf(e)
                ? Ia(e)
                : function () {
                    return Rt;
                  };
            })(be, me),
            Pe = 0,
            Me = 0,
            Oe = 0,
            Ae = K(be, ge);
          if (
            ((Ce._startClamp = Ce._endClamp = !1),
            (Ce._dir = ge),
            (P *= 45),
            (Ce.scroller = be),
            (Ce.scroll = pe ? pe.time.bind(pe) : Ae),
            (D = Ae()),
            (Ce.vars = M),
            (O = O || M.animation),
            "refreshPriority" in M &&
              ((rt = 1), -9999 === M.refreshPriority && (st = Ce)),
            (c.tweenScroll = c.tweenScroll || {
              top: kc(be, Ie),
              left: kc(be, Le),
            }),
            (Ce.tweenTo = A = c.tweenScroll[ge.p]),
            (Ce.scrubDuration = function (e) {
              (i = Pa(e) && e)
                ? ee
                  ? ee.duration(e)
                  : (ee = Ne.to(O, {
                      ease: "expo",
                      totalProgress: "+=0",
                      duration: i,
                      paused: !0,
                      onComplete: function onComplete() {
                        return s && s(Ce);
                      },
                    }))
                : (ee && ee.progress(1).kill(), (ee = 0));
            }),
            O &&
              ((O.vars.lazy = !1),
              (O._initted && !Ce.isReverted) ||
                (!1 !== O.vars.immediateRender &&
                  !1 !== M.immediateRender &&
                  O.duration() &&
                  O.render(0, !0, !0)),
              (Ce.animation = O.pause()),
              (O.scrollTrigger = Ce).scrubDuration(E),
              (_ = 0),
              (a = a || O.vars.id)),
            ue &&
              ((Qa(ue) && !ue.push) || (ue = { snapTo: ue }),
              "scrollBehavior" in Je.style &&
                Ne.set(me ? [Je, je] : be, { scrollBehavior: "auto" }),
              qe.forEach(function (e) {
                return (
                  Oa(e) &&
                  e.target === (me ? Ge.scrollingElement || je : be) &&
                  (e.smooth = !1)
                );
              }),
              (d = Oa(ue.snapTo)
                ? ue.snapTo
                : "labels" === ue.snapTo
                ? (function _getClosestLabel(t) {
                    return function (e) {
                      return Ne.utils.snap(mb(t), e);
                    };
                  })(O)
                : "labelsDirectional" === ue.snapTo
                ? (function _getLabelAtDirection(r) {
                    return function (e, t) {
                      return ob(mb(r))(e, t.direction);
                    };
                  })(O)
                : !1 !== ue.directional
                ? function (e, t) {
                    return ob(ue.snapTo)(e, ct() - Me < 500 ? 0 : t.direction);
                  }
                : Ne.utils.snap(ue.snapTo)),
              (h = ue.duration || { min: 0.1, max: 2 }),
              (h = Qa(h) ? Ue(h.min, h.max) : Ue(h, h)),
              (te = Ne.delayedCall(ue.delay || i / 2 || 0.1, function () {
                var e = Ae(),
                  t = ct() - Me < 500,
                  r = A.tween;
                if (
                  !(t || Math.abs(Ce.getVelocity()) < 10) ||
                  r ||
                  et ||
                  Pe === e
                )
                  Ce.isActive && Pe !== e && te.restart(!0);
                else {
                  var n = (e - B) / N,
                    i = O && !ve ? O.totalProgress() : n,
                    o = t ? 0 : ((i - w) / (ct() - Ke)) * 1e3 || 0,
                    a = Ne.utils.clamp(-n, 1 - n, (dt(o / 2) * o) / 0.185),
                    s = n + (!1 === ue.inertia ? 0 : a),
                    l = Ue(0, 1, d(s, Ce)),
                    c = Math.round(B + l * N),
                    u = ue.onStart,
                    f = ue.onInterrupt,
                    p = ue.onComplete;
                  if (e <= Y && B <= e && c !== e) {
                    if (r && !r._initted && r.data <= dt(c - e)) return;
                    !1 === ue.inertia && (a = l - n),
                      A(
                        c,
                        {
                          duration: h(
                            dt(
                              (0.185 * Math.max(dt(s - i), dt(l - i))) /
                                o /
                                0.05 || 0
                            )
                          ),
                          ease: ue.ease || "power3",
                          data: dt(c - e),
                          onInterrupt: function onInterrupt() {
                            return te.restart(!0) && f && f(Ce);
                          },
                          onComplete: function onComplete() {
                            Ce.update(),
                              (Pe = Ae()),
                              (_ = w =
                                O && !ve ? O.totalProgress() : Ce.progress),
                              g && g(Ce),
                              p && p(Ce);
                          },
                        },
                        e,
                        a * N,
                        c - e - a * N
                      ),
                      u && u(Ce, A.tween);
                  }
                }
              }).pause())),
            a && (Pt[a] = Ce),
            (o =
              (o =
                (oe = Ce.trigger = J(oe || (!0 !== ae && ae))) &&
                oe._gsap &&
                oe._gsap.stRevert) && o(Ce)),
            (ae = !0 === ae ? oe : J(ae)),
            pt(T) && (T = { targets: oe, className: T }),
            ae &&
              (!1 === se ||
                se === _t ||
                (se =
                  !(
                    !se &&
                    ae.parentNode &&
                    ae.parentNode.style &&
                    "flex" === hb(ae.parentNode).display
                  ) && xt),
              (Ce.pin = ae),
              (n = Ne.core.getCache(ae)).spacer
                ? (H = n.pinState)
                : (l &&
                    ((l = J(l)) &&
                      !l.nodeType &&
                      (l = l.current || l.nativeElement),
                    (n.spacerIsNative = !!l),
                    l && (n.spacerState = cc(l))),
                  (n.spacer = j = l || Ge.createElement("div")),
                  j.classList.add("pin-spacer"),
                  a && j.classList.add("pin-spacer-" + a),
                  (n.pinState = H = cc(ae))),
              !1 !== M.force3D && Ne.set(ae, { force3D: !0 }),
              (Ce.spacer = j = n.spacer),
              (r = hb(ae)),
              (m = r[se + ge.os2]),
              (V = Ne.getProperty(ae)),
              (b = Ne.quickSetter(ae, ge.a, St)),
              _b(ae, j, r),
              (G = cc(ae))),
            we)
          ) {
            (e = Qa(we) ? jb(we, Tt) : Tt),
              (L = yb("scroller-start", a, be, ge, e, 0)),
              (I = yb("scroller-end", a, be, ge, e, 0, L)),
              (t = L["offset" + ge.op.d2]);
            var u = J(z(be, "content") || be);
            (q = this.markerStart = yb("start", a, u, ge, e, t, 0, pe)),
              (F = this.markerEnd = yb("end", a, u, ge, e, t, 0, pe)),
              pe && (S = Ne.quickSetter([q, F], ge.a, St)),
              ye ||
                (ze.length && !0 === z(be, "fixedMarkers")) ||
                ((function _makePositionable(e) {
                  var t = hb(e).position;
                  e.style.position =
                    "absolute" === t || "fixed" === t ? t : "relative";
                })(me ? Je : be),
                Ne.set([L, I], { force3D: !0 }),
                (y = Ne.quickSetter(L, ge.a, St)),
                (x = Ne.quickSetter(I, ge.a, St)));
          }
          if (pe) {
            var f = pe.vars.onUpdate,
              p = pe.vars.onUpdateParams;
            pe.eventCallback("onUpdate", function () {
              Ce.update(0, 0, 1), f && f.apply(pe, p || []);
            });
          }
          if (
            ((Ce.previous = function () {
              return Et[Et.indexOf(Ce) - 1];
            }),
            (Ce.next = function () {
              return Et[Et.indexOf(Ce) + 1];
            }),
            (Ce.revert = function (e, t) {
              if (!t) return Ce.kill(!0);
              var r = !1 !== e || !Ce.enabled,
                n = Qe;
              r !== Ce.isReverted &&
                (r &&
                  ((re = Math.max(Ae(), Ce.scroll.rec || 0)),
                  (Oe = Ce.progress),
                  (ne = O && O.progress())),
                q &&
                  [q, F, L, I].forEach(function (e) {
                    return (e.style.display = r ? "none" : "block");
                  }),
                r && (Qe = Ce).update(r),
                !ae ||
                  (fe && Ce.isActive) ||
                  (r
                    ? (function _swapPinOut(e, t, r) {
                        Dt(r);
                        var n = e._gsap;
                        if (n.spacerIsNative) Dt(n.spacerState);
                        else if (e._gsap.swappedIn) {
                          var i = t.parentNode;
                          i && (i.insertBefore(e, t), i.removeChild(t));
                        }
                        e._gsap.swappedIn = !1;
                      })(ae, j, H)
                    : _b(ae, j, hb(ae), Z)),
                r || Ce.update(r),
                (Qe = n),
                (Ce.isReverted = r));
            }),
            (Ce.refresh = function (e, t, r, n) {
              if ((!Qe && Ce.enabled) || t)
                if (ae && e && ut) rb(ScrollTrigger, "scrollEnd", Jb);
                else {
                  !ot && Te && Te(Ce),
                    (Qe = Ce),
                    A.tween && (A.tween.kill(), (A.tween = 0)),
                    ee && ee.pause(),
                    le && O && O.revert({ kill: !1 }).invalidate(),
                    Ce.isReverted || Ce.revert(!0, !0),
                    (Ce._subPinOffset = !1);
                  var i,
                    o,
                    a,
                    s,
                    l,
                    c,
                    u,
                    f,
                    p,
                    d,
                    h,
                    g,
                    v,
                    b = ke(),
                    m = Ee(),
                    y = pe ? pe.duration() : La(be, ge),
                    x = N <= 0.01,
                    _ = 0,
                    w = n || 0,
                    S = Qa(r) ? r.end : M.end,
                    C = M.endTrigger || oe,
                    T = Qa(r)
                      ? r.start
                      : M.start ||
                        (0 !== M.start && oe ? (ae ? "0 0" : "0 100%") : 0),
                    k = (Ce.pinnedContainer =
                      M.pinnedContainer && J(M.pinnedContainer, Ce)),
                    E = (oe && Math.max(0, Et.indexOf(Ce))) || 0,
                    P = E;
                  for (
                    we &&
                    Qa(r) &&
                    ((g = Ne.getProperty(L, ge.p)),
                    (v = Ne.getProperty(I, ge.p)));
                    P--;

                  )
                    (c = Et[P]).end || c.refresh(0, 1) || (Qe = Ce),
                      !(u = c.pin) ||
                        (u !== oe && u !== ae && u !== k) ||
                        c.isReverted ||
                        ((d = d || []).unshift(c), c.revert(!0, !0)),
                      c !== Et[P] && (E--, P--);
                  for (
                    Oa(T) && (T = T(Ce)),
                      T = ya(T, "start", Ce),
                      B =
                        fc(
                          T,
                          oe,
                          b,
                          ge,
                          Ae(),
                          q,
                          L,
                          Ce,
                          m,
                          Se,
                          ye,
                          y,
                          pe,
                          Ce._startClamp && "_startClamp"
                        ) || (ae ? -0.001 : 0),
                      Oa(S) && (S = S(Ce)),
                      pt(S) &&
                        !S.indexOf("+=") &&
                        (~S.indexOf(" ")
                          ? (S = (pt(T) ? T.split(" ")[0] : "") + S)
                          : ((_ = xb(S.substr(2), b)),
                            (S = pt(T)
                              ? T
                              : (pe
                                  ? Ne.utils.mapRange(
                                      0,
                                      pe.duration(),
                                      pe.scrollTrigger.start,
                                      pe.scrollTrigger.end,
                                      B
                                    )
                                  : B) + _),
                            (C = oe))),
                      S = ya(S, "end", Ce),
                      Y =
                        Math.max(
                          B,
                          fc(
                            S || (C ? "100% 0" : y),
                            C,
                            b,
                            ge,
                            Ae() + _,
                            F,
                            I,
                            Ce,
                            m,
                            Se,
                            ye,
                            y,
                            pe,
                            Ce._endClamp && "_endClamp"
                          )
                        ) || -0.001,
                      _ = 0,
                      P = E;
                    P--;

                  )
                    (u = (c = Et[P]).pin) &&
                      c.start - c._pinPush <= B &&
                      !pe &&
                      0 < c.end &&
                      ((i =
                        c.end -
                        (Ce._startClamp ? Math.max(0, c.start) : c.start)),
                      ((u === oe && c.start - c._pinPush < B) || u === k) &&
                        isNaN(T) &&
                        (_ += i * (1 - c.progress)),
                      u === ae && (w += i));
                  if (
                    ((B += _),
                    (Y += _),
                    Ce._startClamp && (Ce._startClamp += _),
                    Ce._endClamp &&
                      !ot &&
                      ((Ce._endClamp = Y || -0.001),
                      (Y = Math.min(Y, La(be, ge)))),
                    (N = Y - B || ((B -= 0.01) && 0.001)),
                    x &&
                      (Oe = Ne.utils.clamp(0, 1, Ne.utils.normalize(B, Y, re))),
                    (Ce._pinPush = w),
                    q &&
                      _ &&
                      (((i = {})[ge.a] = "+=" + _),
                      k && (i[ge.p] = "-=" + Ae()),
                      Ne.set([q, F], i)),
                    ae)
                  )
                    (i = hb(ae)),
                      (s = ge === Ie),
                      (a = Ae()),
                      (U = parseFloat(V(ge.a)) + w),
                      !y &&
                        1 < Y &&
                        ((h = {
                          style: (h = (me ? Ge.scrollingElement || je : be)
                            .style),
                          value: h["overflow" + ge.a.toUpperCase()],
                        }),
                        me &&
                          "scroll" !==
                            hb(Je)["overflow" + ge.a.toUpperCase()] &&
                          (h.style["overflow" + ge.a.toUpperCase()] =
                            "scroll")),
                      _b(ae, j, i),
                      (G = cc(ae)),
                      (o = Ct(ae, !0)),
                      (f = ye && K(be, s ? Le : Ie)()),
                      se &&
                        (((Z = [se + ge.os2, N + w + St]).t = j),
                        (P = se === xt ? lb(ae, ge) + N + w : 0) &&
                          Z.push(ge.d, P + St),
                        Dt(Z),
                        k &&
                          Et.forEach(function (e) {
                            e.pin === k &&
                              !1 !== e.vars.pinSpacing &&
                              (e._subPinOffset = !0);
                          }),
                        ye && Ae(re)),
                      ye &&
                        (((l = {
                          top: o.top + (s ? a - B : f) + St,
                          left: o.left + (s ? f : a - B) + St,
                          boxSizing: "border-box",
                          position: "fixed",
                        })[ht] = l.maxWidth =
                          Math.ceil(o.width) + St),
                        (l[gt] = l.maxHeight = Math.ceil(o.height) + St),
                        (l[_t] =
                          l[_t + mt] =
                          l[_t + vt] =
                          l[_t + yt] =
                          l[_t + bt] =
                            "0"),
                        (l[xt] = i[xt]),
                        (l[xt + mt] = i[xt + mt]),
                        (l[xt + vt] = i[xt + vt]),
                        (l[xt + yt] = i[xt + yt]),
                        (l[xt + bt] = i[xt + bt]),
                        (W = (function _copyState(e, t, r) {
                          for (
                            var n, i = [], o = e.length, a = r ? 8 : 0;
                            a < o;
                            a += 2
                          )
                            (n = e[a]), i.push(n, n in t ? t[n] : e[a + 1]);
                          return (i.t = e.t), i;
                        })(H, l, fe)),
                        ot && Ae(0)),
                      O
                        ? ((p = O._initted),
                          nt(1),
                          O.render(O.duration(), !0, !0),
                          (Q = V(ge.a) - U + N + w),
                          ($ = 1 < Math.abs(N - Q)),
                          ye && $ && W.splice(W.length - 2, 2),
                          O.render(0, !0, !0),
                          p || O.invalidate(!0),
                          O.parent || O.totalTime(O.totalTime()),
                          nt(0))
                        : (Q = N),
                      h &&
                        (h.value
                          ? (h.style["overflow" + ge.a.toUpperCase()] = h.value)
                          : h.style.removeProperty("overflow-" + ge.a));
                  else if (oe && Ae() && !pe)
                    for (o = oe.parentNode; o && o !== Je; )
                      o._pinOffset &&
                        ((B -= o._pinOffset), (Y -= o._pinOffset)),
                        (o = o.parentNode);
                  d &&
                    d.forEach(function (e) {
                      return e.revert(!1, !0);
                    }),
                    (Ce.start = B),
                    (Ce.end = Y),
                    (D = R = ot ? re : Ae()),
                    pe || ot || (D < re && Ae(re), (Ce.scroll.rec = 0)),
                    Ce.revert(!1, !0),
                    (Me = ct()),
                    te &&
                      ((Pe = -1),
                      Ce.isActive && Ae(B + N * Oe),
                      te.restart(!0)),
                    (Qe = 0),
                    O &&
                      ve &&
                      (O._initted || ne) &&
                      O.progress() !== ne &&
                      O.progress(ne || 0, !0).render(O.time(), !0, !0),
                    (x || Oe !== Ce.progress || pe) &&
                      (O &&
                        !ve &&
                        O.totalProgress(
                          pe && B < -0.001 && !Oe
                            ? Ne.utils.normalize(B, Y, 0)
                            : Oe,
                          !0
                        ),
                      (Ce.progress = x || (D - B) / N === Oe ? 0 : Oe)),
                    ae && se && (j._pinOffset = Math.round(Ce.progress * Q)),
                    ee && ee.invalidate(),
                    isNaN(g) ||
                      ((g -= Ne.getProperty(L, ge.p)),
                      (v -= Ne.getProperty(I, ge.p)),
                      jc(L, ge, g),
                      jc(q, ge, g - (n || 0)),
                      jc(I, ge, v),
                      jc(F, ge, v - (n || 0))),
                    x && !ot && Ce.update(),
                    !ie || ot || X || ((X = !0), ie(Ce), (X = !1));
                }
            }),
            (Ce.getVelocity = function () {
              return ((Ae() - R) / (ct() - Ke)) * 1e3 || 0;
            }),
            (Ce.endAnimation = function () {
              Ra(Ce.callbackAnimation),
                O &&
                  (ee
                    ? ee.progress(1)
                    : O.paused()
                    ? ve || Ra(O, Ce.direction < 0, 1)
                    : Ra(O, O.reversed()));
            }),
            (Ce.labelToScroll = function (e) {
              return (
                (O &&
                  O.labels &&
                  (B || Ce.refresh() || B) +
                    (O.labels[e] / O.duration()) * N) ||
                0
              );
            }),
            (Ce.getTrailing = function (t) {
              var e = Et.indexOf(Ce),
                r =
                  0 < Ce.direction ? Et.slice(0, e).reverse() : Et.slice(e + 1);
              return (
                pt(t)
                  ? r.filter(function (e) {
                      return e.vars.preventOverlaps === t;
                    })
                  : r
              ).filter(function (e) {
                return 0 < Ce.direction ? e.end <= B : e.start >= Y;
              });
            }),
            (Ce.update = function (e, t, r) {
              if (!pe || r || e) {
                var n,
                  i,
                  o,
                  a,
                  s,
                  l,
                  c,
                  u = !0 === ot ? re : Ce.scroll(),
                  f = e ? 0 : (u - B) / N,
                  p = f < 0 ? 0 : 1 < f ? 1 : f || 0,
                  d = Ce.progress;
                if (
                  (t &&
                    ((R = D),
                    (D = pe ? Ae() : u),
                    ue && ((w = _), (_ = O && !ve ? O.totalProgress() : p))),
                  P &&
                    !p &&
                    ae &&
                    !Qe &&
                    !lt &&
                    ut &&
                    B < u + ((u - R) / (ct() - Ke)) * P &&
                    (p = 1e-4),
                  p !== d && Ce.enabled)
                ) {
                  if (
                    ((a =
                      (s =
                        (n = Ce.isActive = !!p && p < 1) != (!!d && d < 1)) ||
                      !!p != !!d),
                    (Ce.direction = d < p ? 1 : -1),
                    (Ce.progress = p),
                    a &&
                      !Qe &&
                      ((i = p && !d ? 0 : 1 === p ? 1 : 1 === d ? 2 : 3),
                      ve &&
                        ((o =
                          (!s && "none" !== _e[i + 1] && _e[i + 1]) || _e[i]),
                        (c =
                          O && ("complete" === o || "reset" === o || o in O)))),
                    he &&
                      (s || c) &&
                      (c || E || !O) &&
                      (Oa(he)
                        ? he(Ce)
                        : Ce.getTrailing(he).forEach(function (e) {
                            return e.endAnimation();
                          })),
                    ve ||
                      (!ee || Qe || lt
                        ? O && O.totalProgress(p, !(!Qe || (!Me && !e)))
                        : (ee._dp._time - ee._start !== ee._time &&
                            ee.render(ee._dp._time - ee._start),
                          ee.resetTo
                            ? ee.resetTo("totalProgress", p, O._tTime / O._tDur)
                            : ((ee.vars.totalProgress = p),
                              ee.invalidate().restart()))),
                    ae)
                  )
                    if ((e && se && (j.style[se + ge.os2] = m), ye)) {
                      if (a) {
                        if (
                          ((l =
                            !e && d < p && u < Y + 1 && u + 1 >= La(be, ge)),
                          fe)
                        )
                          if (e || (!n && !l)) hc(ae, j);
                          else {
                            var h = Ct(ae, !0),
                              g = u - B;
                            hc(
                              ae,
                              Je,
                              h.top + (ge === Ie ? g : 0) + St,
                              h.left + (ge === Ie ? 0 : g) + St
                            );
                          }
                        Dt(n || l ? W : G),
                          ($ && p < 1 && n) || b(U + (1 !== p || l ? 0 : Q));
                      }
                    } else b(Ea(U + Q * p));
                  !ue || A.tween || Qe || lt || te.restart(!0),
                    T &&
                      (s || (ce && p && (p < 1 || !it))) &&
                      Ve(T.targets).forEach(function (e) {
                        return e.classList[n || ce ? "add" : "remove"](
                          T.className
                        );
                      }),
                    !C || ve || e || C(Ce),
                    a && !Qe
                      ? (ve &&
                          (c &&
                            ("complete" === o
                              ? O.pause().totalProgress(1)
                              : "reset" === o
                              ? O.restart(!0).pause()
                              : "restart" === o
                              ? O.restart(!0)
                              : O[o]()),
                          C && C(Ce)),
                        (!s && it) ||
                          (k && s && Sa(Ce, k),
                          xe[i] && Sa(Ce, xe[i]),
                          ce && (1 === p ? Ce.kill(!1, 1) : (xe[i] = 0)),
                          s || (xe[(i = 1 === p ? 1 : 3)] && Sa(Ce, xe[i]))),
                        de &&
                          !n &&
                          Math.abs(Ce.getVelocity()) > (Pa(de) ? de : 2500) &&
                          (Ra(Ce.callbackAnimation),
                          ee
                            ? ee.progress(1)
                            : Ra(O, "reverse" === o ? 1 : !p, 1)))
                      : ve && C && !Qe && C(Ce);
                }
                if (x) {
                  var v = pe
                    ? (u / pe.duration()) * (pe._caScrollDist || 0)
                    : u;
                  y(v + (L._isFlipped ? 1 : 0)), x(v);
                }
                S && S((-u / pe.duration()) * (pe._caScrollDist || 0));
              }
            }),
            (Ce.enable = function (e, t) {
              Ce.enabled ||
                ((Ce.enabled = !0),
                rb(be, "resize", Gb),
                rb(me ? Ge : be, "scroll", Eb),
                Te && rb(ScrollTrigger, "refreshInit", Te),
                !1 !== e && ((Ce.progress = Oe = 0), (D = R = Pe = Ae())),
                !1 !== t && Ce.refresh());
            }),
            (Ce.getTween = function (e) {
              return e && A ? A.tween : ee;
            }),
            (Ce.setPositions = function (e, t, r, n) {
              if (pe) {
                var i = pe.scrollTrigger,
                  o = pe.duration(),
                  a = i.end - i.start;
                (e = i.start + (a * e) / o), (t = i.start + (a * t) / o);
              }
              Ce.refresh(
                !1,
                !1,
                {
                  start: za(e, r && !!Ce._startClamp),
                  end: za(t, r && !!Ce._endClamp),
                },
                n
              ),
                Ce.update();
            }),
            (Ce.adjustPinSpacing = function (e) {
              if (Z && e) {
                var t = Z.indexOf(ge.d) + 1;
                (Z[t] = parseFloat(Z[t]) + e + St),
                  (Z[1] = parseFloat(Z[1]) + e + St),
                  Dt(Z);
              }
            }),
            (Ce.disable = function (e, t) {
              if (
                Ce.enabled &&
                (!1 !== e && Ce.revert(!0, !0),
                (Ce.enabled = Ce.isActive = !1),
                t || (ee && ee.pause()),
                (re = 0),
                n && (n.uncache = 1),
                Te && sb(ScrollTrigger, "refreshInit", Te),
                te && (te.pause(), A.tween && A.tween.kill() && (A.tween = 0)),
                !me)
              ) {
                for (var r = Et.length; r--; )
                  if (Et[r].scroller === be && Et[r] !== Ce) return;
                sb(be, "resize", Gb), sb(be, "scroll", Eb);
              }
            }),
            (Ce.kill = function (e, t) {
              Ce.disable(e, t), ee && !t && ee.kill(), a && delete Pt[a];
              var r = Et.indexOf(Ce);
              0 <= r && Et.splice(r, 1),
                r === tt && 0 < At && tt--,
                (r = 0),
                Et.forEach(function (e) {
                  return e.scroller === Ce.scroller && (r = 1);
                }),
                r || ot || (Ce.scroll.rec = 0),
                O &&
                  ((O.scrollTrigger = null),
                  e && O.revert({ kill: !1 }),
                  t || O.kill()),
                q &&
                  [q, F, L, I].forEach(function (e) {
                    return e.parentNode && e.parentNode.removeChild(e);
                  }),
                st === Ce && (st = 0),
                ae &&
                  (n && (n.uncache = 1),
                  (r = 0),
                  Et.forEach(function (e) {
                    return e.pin === ae && r++;
                  }),
                  r || (n.spacer = 0)),
                M.onKill && M.onKill(Ce);
            }),
            Et.push(Ce),
            Ce.enable(!1, !1),
            o && o(Ce),
            O && O.add && !N)
          ) {
            var v = Ce.update;
            (Ce.update = function () {
              (Ce.update = v), B || Y || Ce.refresh();
            }),
              Ne.delayedCall(0.01, Ce.update),
              (N = 0.01),
              (B = Y = 0);
          } else Ce.refresh();
          ae &&
            (function _queueRefreshAll() {
              if (at !== Mt) {
                var e = (at = Mt);
                requestAnimationFrame(function () {
                  return e === Mt && Ot(!0);
                });
              }
            })();
        } else this.update = this.refresh = this.kill = Da;
      }),
      (ScrollTrigger.register = function register(e) {
        return (
          s ||
            ((Ne = e || Ga()),
            Fa() && window.document && ScrollTrigger.enable(),
            (s = ft)),
          s
        );
      }),
      (ScrollTrigger.defaults = function defaults(e) {
        if (e) for (var t in e) kt[t] = e[t];
        return kt;
      }),
      (ScrollTrigger.disable = function disable(t, r) {
        (ft = 0),
          Et.forEach(function (e) {
            return e[r ? "kill" : "disable"](t);
          }),
          sb(He, "wheel", Eb),
          sb(Ge, "scroll", Eb),
          clearInterval(u),
          sb(Ge, "touchcancel", Da),
          sb(Je, "touchstart", Da),
          qb(sb, Ge, "pointerdown,touchstart,mousedown", Ba),
          qb(sb, Ge, "pointerup,touchend,mouseup", Ca),
          c.kill(),
          Ma(sb);
        for (var e = 0; e < qe.length; e += 3)
          tb(sb, qe[e], qe[e + 1]), tb(sb, qe[e], qe[e + 2]);
      }),
      (ScrollTrigger.enable = function enable() {
        if (
          ((He = window),
          (Ge = document),
          (je = Ge.documentElement),
          (Je = Ge.body),
          Ne &&
            ((Ve = Ne.utils.toArray),
            (Ue = Ne.utils.clamp),
            (x = Ne.core.context || Da),
            (nt = Ne.core.suppressOverwrites || Da),
            (_ = He.history.scrollRestoration || "auto"),
            (j = He.pageYOffset),
            Ne.core.globals("ScrollTrigger", ScrollTrigger),
            Je))
        ) {
          (ft = 1),
            (function _rafBugFix() {
              return ft && requestAnimationFrame(_rafBugFix);
            })(),
            k.register(Ne),
            (ScrollTrigger.isTouch = k.isTouch),
            (E =
              k.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
            rb(He, "wheel", Eb),
            (l = [He, Ge, je, Je]),
            Ne.matchMedia
              ? ((ScrollTrigger.matchMedia = function (e) {
                  var t,
                    r = Ne.matchMedia();
                  for (t in e) r.add(t, e[t]);
                  return r;
                }),
                Ne.addEventListener("matchMediaInit", function () {
                  return Nb();
                }),
                Ne.addEventListener("matchMediaRevert", function () {
                  return Mb();
                }),
                Ne.addEventListener("matchMedia", function () {
                  Ot(0, 1), H("matchMedia");
                }),
                Ne.matchMedia("(orientation: portrait)", function () {
                  return Fb(), Fb;
                }))
              : console.warn("Requires GSAP 3.11.0 or later"),
            Fb(),
            rb(Ge, "scroll", Eb);
          var e,
            t,
            r = Je.style,
            n = r.borderTopStyle,
            i = Ne.core.Animation.prototype;
          for (
            i.revert ||
              Object.defineProperty(i, "revert", {
                value: function value() {
                  return this.time(-0.01, !0);
                },
              }),
              r.borderTopStyle = "solid",
              e = Ct(Je),
              Ie.m = Math.round(e.top + Ie.sc()) || 0,
              Le.m = Math.round(e.left + Le.sc()) || 0,
              n ? (r.borderTopStyle = n) : r.removeProperty("border-top-style"),
              u = setInterval(Db, 250),
              Ne.delayedCall(0.5, function () {
                return (lt = 0);
              }),
              rb(Ge, "touchcancel", Da),
              rb(Je, "touchstart", Da),
              qb(rb, Ge, "pointerdown,touchstart,mousedown", Ba),
              qb(rb, Ge, "pointerup,touchend,mouseup", Ca),
              f = Ne.utils.checkPrefix("transform"),
              Q.push(f),
              s = ct(),
              c = Ne.delayedCall(0.2, Ot).pause(),
              h = [
                Ge,
                "visibilitychange",
                function () {
                  var e = He.innerWidth,
                    t = He.innerHeight;
                  Ge.hidden ? ((p = e), (d = t)) : (p === e && d === t) || Gb();
                },
                Ge,
                "DOMContentLoaded",
                Ot,
                He,
                "load",
                Ot,
                He,
                "resize",
                Gb,
              ],
              Ma(rb),
              Et.forEach(function (e) {
                return e.enable(0, 1);
              }),
              t = 0;
            t < qe.length;
            t += 3
          )
            tb(sb, qe[t], qe[t + 1]), tb(sb, qe[t], qe[t + 2]);
        }
      }),
      (ScrollTrigger.config = function config(e) {
        "limitCallbacks" in e && (it = !!e.limitCallbacks);
        var t = e.syncInterval;
        (t && clearInterval(u)) || ((u = t) && setInterval(Db, t)),
          "ignoreMobileResize" in e &&
            (b = 1 === ScrollTrigger.isTouch && e.ignoreMobileResize),
          "autoRefreshEvents" in e &&
            (Ma(sb) || Ma(rb, e.autoRefreshEvents || "none"),
            (g = -1 === (e.autoRefreshEvents + "").indexOf("resize")));
      }),
      (ScrollTrigger.scrollerProxy = function scrollerProxy(e, t) {
        var r = J(e),
          n = qe.indexOf(r),
          i = Ha(r);
        ~n && qe.splice(n, i ? 6 : 2),
          t && (i ? ze.unshift(He, t, Je, t, je, t) : ze.unshift(r, t));
      }),
      (ScrollTrigger.clearMatchMedia = function clearMatchMedia(t) {
        Et.forEach(function (e) {
          return e._ctx && e._ctx.query === t && e._ctx.kill(!0, !0);
        });
      }),
      (ScrollTrigger.isInViewport = function isInViewport(e, t, r) {
        var n = (pt(e) ? J(e) : e).getBoundingClientRect(),
          i = n[r ? ht : gt] * t || 0;
        return r
          ? 0 < n.right - i && n.left + i < He.innerWidth
          : 0 < n.bottom - i && n.top + i < He.innerHeight;
      }),
      (ScrollTrigger.positionInViewport = function positionInViewport(e, t, r) {
        pt(e) && (e = J(e));
        var n = e.getBoundingClientRect(),
          i = n[r ? ht : gt],
          o =
            null == t
              ? i / 2
              : t in Y
              ? Y[t] * i
              : ~t.indexOf("%")
              ? (parseFloat(t) * i) / 100
              : parseFloat(t) || 0;
        return r ? (n.left + o) / He.innerWidth : (n.top + o) / He.innerHeight;
      }),
      (ScrollTrigger.killAll = function killAll(e) {
        if (
          (Et.slice(0).forEach(function (e) {
            return "ScrollSmoother" !== e.vars.id && e.kill();
          }),
          !0 !== e)
        ) {
          var t = I.killAll || [];
          (I = {}),
            t.forEach(function (e) {
              return e();
            });
        }
      }),
      ScrollTrigger);
  function ScrollTrigger(e, t) {
    s ||
      ScrollTrigger.register(Ne) ||
      console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
      x(this),
      this.init(e, t);
  }
  (ee.version = "x.x.x"),
    (ee.saveStyles = function (e) {
      return e
        ? Ve(e).forEach(function (e) {
            if (e && e.style) {
              var t = W.indexOf(e);
              0 <= t && W.splice(t, 5),
                W.push(
                  e,
                  e.style.cssText,
                  e.getBBox && e.getAttribute("transform"),
                  Ne.core.getCache(e),
                  x()
                );
            }
          })
        : W;
    }),
    (ee.revert = function (e, t) {
      return Nb(!e, t);
    }),
    (ee.create = function (e, t) {
      return new ee(e, t);
    }),
    (ee.refresh = function (e) {
      return e ? Gb() : (s || ee.register()) && Ot(!0);
    }),
    (ee.update = function (e) {
      return ++qe.cache && V(!0 === e ? 2 : 0);
    }),
    (ee.clearScrollMemory = Ob),
    (ee.maxScroll = function (e, t) {
      return La(e, t ? Le : Ie);
    }),
    (ee.getScrollFunc = function (e, t) {
      return K(J(e), t ? Le : Ie);
    }),
    (ee.getById = function (e) {
      return Pt[e];
    }),
    (ee.getAll = function () {
      return Et.filter(function (e) {
        return "ScrollSmoother" !== e.vars.id;
      });
    }),
    (ee.isScrolling = function () {
      return !!ut;
    }),
    (ee.snapDirectional = ob),
    (ee.addEventListener = function (e, t) {
      var r = I[e] || (I[e] = []);
      ~r.indexOf(t) || r.push(t);
    }),
    (ee.removeEventListener = function (e, t) {
      var r = I[e],
        n = r && r.indexOf(t);
      0 <= n && r.splice(n, 1);
    }),
    (ee.batch = function (e, t) {
      function pp(e, t) {
        var r = [],
          n = [],
          i = Ne.delayedCall(o, function () {
            t(r, n), (r = []), (n = []);
          }).pause();
        return function (e) {
          r.length || i.restart(!0),
            r.push(e.trigger),
            n.push(e),
            a <= r.length && i.progress(1);
        };
      }
      var r,
        n = [],
        i = {},
        o = t.interval || 0.016,
        a = t.batchMax || 1e9;
      for (r in t)
        i[r] =
          "on" === r.substr(0, 2) && Oa(t[r]) && "onRefreshInit" !== r
            ? pp(0, t[r])
            : t[r];
      return (
        Oa(a) &&
          ((a = a()),
          rb(ee, "refresh", function () {
            return (a = t.batchMax());
          })),
        Ve(e).forEach(function (e) {
          var t = {};
          for (r in i) t[r] = i[r];
          (t.trigger = e), n.push(ee.create(t));
        }),
        n
      );
    });
  function mc(e, t, r, n) {
    return (
      n < t ? e(n) : t < 0 && e(0),
      n < r ? (n - t) / (r - t) : r < 0 ? t / (t - r) : 1
    );
  }
  function nc(e, t) {
    !0 === t
      ? e.style.removeProperty("touch-action")
      : (e.style.touchAction =
          !0 === t
            ? "auto"
            : t
            ? "pan-" + t + (k.isTouch ? " pinch-zoom" : "")
            : "none"),
      e === je && nc(Je, t);
  }
  function pc(e) {
    var t,
      r = e.event,
      n = e.target,
      i = e.axis,
      o = (r.changedTouches ? r.changedTouches[0] : r).target,
      a = o._gsap || Ne.core.getCache(o),
      s = ct();
    if (!a._isScrollT || 2e3 < s - a._isScrollT) {
      for (
        ;
        o &&
        o !== Je &&
        ((o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth) ||
          (!re[(t = hb(o)).overflowY] && !re[t.overflowX]));

      )
        o = o.parentNode;
      (a._isScroll =
        o &&
        o !== n &&
        !Ha(o) &&
        (re[(t = hb(o)).overflowY] || re[t.overflowX])),
        (a._isScrollT = s);
    }
    (!a._isScroll && "x" !== i) || (r.stopPropagation(), (r._gsapAllow = !0));
  }
  function qc(e, t, r, n) {
    return k.create({
      target: e,
      capture: !0,
      debounce: !1,
      lockAxis: !0,
      type: t,
      onWheel: (n = n && pc),
      onPress: n,
      onDrag: n,
      onScroll: n,
      onEnable: function onEnable() {
        return r && rb(Ge, k.eventTypes[0], ie, !1, !0);
      },
      onDisable: function onDisable() {
        return sb(Ge, k.eventTypes[0], ie, !0);
      },
    });
  }
  function uc(e) {
    function mq() {
      return (i = !1);
    }
    function pq() {
      (o = La(d, Ie)),
        (T = Ue(E ? 1 : 0, o)),
        f && (C = Ue(0, La(d, Le))),
        (l = Mt);
    }
    function qq() {
      (v._gsap.y = Ea(parseFloat(v._gsap.y) + b.offset) + "px"),
        (v.style.transform =
          "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
          parseFloat(v._gsap.y) +
          ", 0, 1)"),
        (b.offset = b.cacheID = 0);
    }
    function wq() {
      pq(),
        a.isActive() &&
          a.vars.scrollY > o &&
          (b() > o ? a.progress(1) && b(o) : a.resetTo("scrollY", o));
    }
    Qa(e) || (e = {}),
      (e.preventDefault = e.isNormalizer = e.allowClicks = !0),
      e.type || (e.type = "wheel,touch"),
      (e.debounce = !!e.debounce),
      (e.id = e.id || "normalizer");
    var n,
      o,
      l,
      i,
      a,
      c,
      u,
      s,
      f = e.normalizeScrollX,
      t = e.momentum,
      r = e.allowNestedScroll,
      p = e.onRelease,
      d = J(e.target) || je,
      h = Ne.core.globals().ScrollSmoother,
      g = h && h.get(),
      v =
        E &&
        ((e.content && J(e.content)) ||
          (g && !1 !== e.content && !g.smooth() && g.content())),
      b = K(d, Ie),
      m = K(d, Le),
      y = 1,
      x =
        (k.isTouch && He.visualViewport
          ? He.visualViewport.scale * He.visualViewport.width
          : He.outerWidth) / He.innerWidth,
      _ = 0,
      w = Oa(t)
        ? function () {
            return t(n);
          }
        : function () {
            return t || 2.8;
          },
      S = qc(d, e.type, !0, r),
      C = Da,
      T = Da;
    return (
      v && Ne.set(v, { y: "+=0" }),
      (e.ignoreCheck = function (e) {
        return (
          (E &&
            "touchmove" === e.type &&
            (function ignoreDrag() {
              if (i) {
                requestAnimationFrame(mq);
                var e = Ea(n.deltaY / 2),
                  t = T(b.v - e);
                if (v && t !== b.v + b.offset) {
                  b.offset = t - b.v;
                  var r = Ea((parseFloat(v && v._gsap.y) || 0) - b.offset);
                  (v.style.transform =
                    "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
                    r +
                    ", 0, 1)"),
                    (v._gsap.y = r + "px"),
                    (b.cacheID = qe.cache),
                    V();
                }
                return !0;
              }
              b.offset && qq(), (i = !0);
            })()) ||
          (1.05 < y && "touchstart" !== e.type) ||
          n.isGesturing ||
          (e.touches && 1 < e.touches.length)
        );
      }),
      (e.onPress = function () {
        i = !1;
        var e = y;
        (y = Ea(((He.visualViewport && He.visualViewport.scale) || 1) / x)),
          a.pause(),
          e !== y && nc(d, 1.01 < y || (!f && "x")),
          (c = m()),
          (u = b()),
          pq(),
          (l = Mt);
      }),
      (e.onRelease = e.onGestureStart =
        function (e, t) {
          if ((b.offset && qq(), t)) {
            qe.cache++;
            var r,
              n,
              i = w();
            f &&
              ((n = (r = m()) + (0.05 * i * -e.velocityX) / 0.227),
              (i *= mc(m, r, n, La(d, Le))),
              (a.vars.scrollX = C(n))),
              (n = (r = b()) + (0.05 * i * -e.velocityY) / 0.227),
              (i *= mc(b, r, n, La(d, Ie))),
              (a.vars.scrollY = T(n)),
              a.invalidate().duration(i).play(0.01),
              ((E && a.vars.scrollY >= o) || o - 1 <= r) &&
                Ne.to({}, { onUpdate: wq, duration: i });
          } else s.restart(!0);
          p && p(e);
        }),
      (e.onWheel = function () {
        a._ts && a.pause(), 1e3 < ct() - _ && ((l = 0), (_ = ct()));
      }),
      (e.onChange = function (e, t, r, n, i) {
        if (
          (Mt !== l && pq(),
          t && f && m(C(n[2] === t ? c + (e.startX - e.x) : m() + t - n[1])),
          r)
        ) {
          b.offset && qq();
          var o = i[2] === r,
            a = o ? u + e.startY - e.y : b() + r - i[1],
            s = T(a);
          o && a !== s && (u += s - a), b(s);
        }
        (r || t) && V();
      }),
      (e.onEnable = function () {
        nc(d, !f && "x"),
          ee.addEventListener("refresh", wq),
          rb(He, "resize", wq),
          b.smooth &&
            ((b.target.style.scrollBehavior = "auto"),
            (b.smooth = m.smooth = !1)),
          S.enable();
      }),
      (e.onDisable = function () {
        nc(d, !0),
          sb(He, "resize", wq),
          ee.removeEventListener("refresh", wq),
          S.kill();
      }),
      (e.lockAxis = !1 !== e.lockAxis),
      ((n = new k(e)).iOS = E) && !b() && b(1),
      E && Ne.ticker.add(Da),
      (s = n._dc),
      (a = Ne.to(n, {
        ease: "power4",
        paused: !0,
        scrollX: f ? "+=0.1" : "+=0",
        scrollY: "+=0.1",
        modifiers: {
          scrollY: ic(b, b(), function () {
            return a.pause();
          }),
        },
        onUpdate: V,
        onComplete: s.vars.onComplete,
      })),
      n
    );
  }
  var te,
    re = { auto: 1, scroll: 1 },
    ne = /(input|label|select|textarea)/i,
    ie = function _captureInputs(e) {
      var t = ne.test(e.target.tagName);
      (t || te) && ((e._gsapAllow = !0), (te = t));
    };
  (ee.sort = function (e) {
    return Et.sort(
      e ||
        function (e, t) {
          return (
            -1e6 * (e.vars.refreshPriority || 0) +
            e.start -
            (t.start + -1e6 * (t.vars.refreshPriority || 0))
          );
        }
    );
  }),
    (ee.observe = function (e) {
      return new k(e);
    }),
    (ee.normalizeScroll = function (e) {
      if (void 0 === e) return v;
      if (!0 === e && v) return v.enable();
      if (!1 === e) return v && v.kill();
      var t = e instanceof k ? e : uc(e);
      return v && v.target === t.target && v.kill(), Ha(t.target) && (v = t), t;
    }),
    (ee.core = {
      _getVelocityProp: L,
      _inputObserver: qc,
      _scrollers: qe,
      _proxies: ze,
      bridge: {
        ss: function ss() {
          ut || H("scrollStart"), (ut = ct());
        },
        ref: function ref() {
          return Qe;
        },
      },
    }),
    Ga() && Ne.registerPlugin(ee),
    (e.ScrollTrigger = ee),
    (e.default = ee);
  if (typeof window === "undefined" || window !== e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
  } else {
    delete e.default;
  }
});

!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t(((e = e || self).window = e.window || {}));
})(this, function (e) {
  "use strict";
  function l() {
    return "undefined" != typeof window;
  }
  function m() {
    return f || (l() && (f = window.gsap) && f.registerPlugin && f);
  }
  function n(e) {
    return "string" == typeof e;
  }
  function o(e) {
    return "function" == typeof e;
  }
  function p(e, t) {
    var o = "x" === t ? "Width" : "Height",
      n = "scroll" + o,
      r = "client" + o;
    return e === T || e === i || e === c
      ? Math.max(i[n], c[n]) - (T["inner" + o] || i[r] || c[r])
      : e[n] - e["offset" + o];
  }
  function q(e, t) {
    var o = "scroll" + ("x" === t ? "Left" : "Top");
    return (
      e === T &&
        (null != e.pageXOffset
          ? (o = "page" + t.toUpperCase() + "Offset")
          : (e = null != i[o] ? i : c)),
      function () {
        return e[o];
      }
    );
  }
  function s(e, t) {
    if (!(e = y(e)[0]) || !e.getBoundingClientRect)
      return (
        console.warn("scrollTo target doesn't exist. Using 0") || { x: 0, y: 0 }
      );
    var o = e.getBoundingClientRect(),
      n = !t || t === T || t === c,
      r = n
        ? {
            top:
              i.clientTop - (T.pageYOffset || i.scrollTop || c.scrollTop || 0),
            left:
              i.clientLeft -
              (T.pageXOffset || i.scrollLeft || c.scrollLeft || 0),
          }
        : t.getBoundingClientRect(),
      l = { x: o.left - r.left, y: o.top - r.top };
    return !n && t && ((l.x += q(t, "x")()), (l.y += q(t, "y")())), l;
  }
  function t(e, t, o, r, l) {
    return isNaN(e) || "object" == typeof e
      ? n(e) && "=" === e.charAt(1)
        ? parseFloat(e.substr(2)) * ("-" === e.charAt(0) ? -1 : 1) + r - l
        : "max" === e
        ? p(t, o) - l
        : Math.min(p(t, o), s(e, t)[o] - l)
      : parseFloat(e) - l;
  }
  function u() {
    (f = m()),
      l() &&
        f &&
        "undefined" != typeof document &&
        document.body &&
        ((T = window),
        (c = document.body),
        (i = document.documentElement),
        (y = f.utils.toArray),
        f.config({ autoKillThreshold: 7 }),
        (h = f.config()),
        (a = 1));
  }
  var f,
    a,
    T,
    i,
    c,
    y,
    h,
    v,
    r = {
      version: "x.x.x",
      name: "scrollTo",
      rawVars: 1,
      register: function register(e) {
        (f = e), u();
      },
      init: function init(e, r, l, s, i) {
        a || u();
        var p = this,
          c = f.getProperty(e, "scrollSnapType");
        (p.isWin = e === T),
          (p.target = e),
          (p.tween = l),
          (r = (function _clean(e, t, r, l) {
            if ((o(e) && (e = e(t, r, l)), "object" != typeof e))
              return n(e) && "max" !== e && "=" !== e.charAt(1)
                ? { x: e, y: e }
                : { y: e };
            if (e.nodeType) return { y: e, x: e };
            var s,
              i = {};
            for (s in e)
              i[s] = "onAutoKill" !== s && o(e[s]) ? e[s](t, r, l) : e[s];
            return i;
          })(r, s, e, i)),
          (p.vars = r),
          (p.autoKill = !!r.autoKill),
          (p.getX = q(e, "x")),
          (p.getY = q(e, "y")),
          (p.x = p.xPrev = p.getX()),
          (p.y = p.yPrev = p.getY()),
          (v = v || f.core.globals().ScrollTrigger),
          "smooth" === f.getProperty(e, "scrollBehavior") &&
            f.set(e, { scrollBehavior: "auto" }),
          c &&
            "none" !== c &&
            ((p.snap = 1),
            (p.snapInline = e.style.scrollSnapType),
            (e.style.scrollSnapType = "none")),
          null != r.x
            ? (p.add(p, "x", p.x, t(r.x, e, "x", p.x, r.offsetX || 0), s, i),
              p._props.push("scrollTo_x"))
            : (p.skipX = 1),
          null != r.y
            ? (p.add(p, "y", p.y, t(r.y, e, "y", p.y, r.offsetY || 0), s, i),
              p._props.push("scrollTo_y"))
            : (p.skipY = 1);
      },
      render: function render(e, t) {
        for (
          var o,
            n,
            r,
            l,
            s,
            i = t._pt,
            c = t.target,
            u = t.tween,
            f = t.autoKill,
            a = t.xPrev,
            y = t.yPrev,
            d = t.isWin,
            g = t.snap,
            x = t.snapInline;
          i;

        )
          i.r(e, i.d), (i = i._next);
        (o = d || !t.skipX ? t.getX() : a),
          (r = (n = d || !t.skipY ? t.getY() : y) - y),
          (l = o - a),
          (s = h.autoKillThreshold),
          t.x < 0 && (t.x = 0),
          t.y < 0 && (t.y = 0),
          f &&
            (!t.skipX && (s < l || l < -s) && o < p(c, "x") && (t.skipX = 1),
            !t.skipY && (s < r || r < -s) && n < p(c, "y") && (t.skipY = 1),
            t.skipX &&
              t.skipY &&
              (u.kill(),
              t.vars.onAutoKill &&
                t.vars.onAutoKill.apply(u, t.vars.onAutoKillParams || []))),
          d
            ? T.scrollTo(t.skipX ? o : t.x, t.skipY ? n : t.y)
            : (t.skipY || (c.scrollTop = t.y), t.skipX || (c.scrollLeft = t.x)),
          !g ||
            (1 !== e && 0 !== e) ||
            ((n = c.scrollTop),
            (o = c.scrollLeft),
            x
              ? (c.style.scrollSnapType = x)
              : c.style.removeProperty("scroll-snap-type"),
            (c.scrollTop = n + 1),
            (c.scrollLeft = o + 1),
            (c.scrollTop = n),
            (c.scrollLeft = o)),
          (t.xPrev = t.x),
          (t.yPrev = t.y),
          v && v.update();
      },
      kill: function kill(e) {
        var t = "scrollTo" === e,
          o = this._props.indexOf(e);
        return (
          (!t && "scrollTo_x" !== e) || (this.skipX = 1),
          (!t && "scrollTo_y" !== e) || (this.skipY = 1),
          -1 < o && this._props.splice(o, 1),
          !this._props.length
        );
      },
    };
  (r.max = p),
    (r.getOffset = s),
    (r.buildGetter = q),
    m() && f.registerPlugin(r),
    (e.ScrollToPlugin = r),
    (e.default = r);
  if (typeof window === "undefined" || window !== e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
  } else {
    delete e.default;
  }
});

gsap.registerPlugin(ScrollToPlugin);
$(".sidebar-topping").click(function () {
  gsap.to(window, { duration: 1, scrollTo: 0 });
});

if ($(window).width() > 1024) {
  (function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
      ? (module.exports = factory())
      : typeof define === "function" && define.amd
      ? define(factory)
      : ((global = global || self), (global.Lenis = factory()));
  })(this, function () {
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(
          target,
          _toPropertyKey(descriptor.key),
          descriptor
        );
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _extends() {
      _extends = Object.assign
        ? Object.assign.bind()
        : function (target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i];
              for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                  target[key] = source[key];
                }
              }
            }
            return target;
          };
      return _extends.apply(this, arguments);
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }
    var version = "x.x.x";
    function clamp(min, input, max) {
      return Math.max(min, Math.min(input, max));
    }
    function lerp(x, y, t) {
      return (1 - t) * x + t * y;
    }
    function damp(x, y, lambda, dt) {
      return lerp(x, y, 1 - Math.exp(-lambda * dt));
    }
    function modulo(n, d) {
      return ((n % d) + d) % d;
    }
    var Animate = (function () {
      function Animate() {}
      var _proto = Animate.prototype;
      _proto.advance = function advance(deltaTime) {
        var _this$onUpdate;
        if (!this.isRunning) return;
        var completed = false;
        if (this.lerp) {
          this.value = damp(this.value, this.to, this.lerp * 60, deltaTime);
          if (Math.round(this.value) === this.to) {
            this.value = this.to;
            completed = true;
          }
        } else {
          this.currentTime += deltaTime;
          var linearProgress = clamp(0, this.currentTime / this.duration, 1);
          completed = linearProgress >= 1;
          var easedProgress = completed ? 1 : this.easing(linearProgress);
          this.value = this.from + (this.to - this.from) * easedProgress;
        }
        (_this$onUpdate = this.onUpdate) == null
          ? void 0
          : _this$onUpdate.call(this, this.value, { completed: completed });
        if (completed) {
          this.stop();
        }
      };
      _proto.stop = function stop() {
        this.isRunning = false;
      };
      _proto.fromTo = function fromTo(from, to, _ref) {
        var _ref$lerp = _ref.lerp,
          lerp = _ref$lerp === void 0 ? 0.1 : _ref$lerp,
          _ref$duration = _ref.duration,
          duration = _ref$duration === void 0 ? 1 : _ref$duration,
          _ref$easing = _ref.easing,
          easing =
            _ref$easing === void 0
              ? function (t) {
                  return t;
                }
              : _ref$easing,
          onUpdate = _ref.onUpdate;
        this.from = this.value = from;
        this.to = to;
        this.lerp = lerp;
        this.duration = duration;
        this.easing = easing;
        this.currentTime = 0;
        this.isRunning = true;
        this.onUpdate = onUpdate;
      };
      return Animate;
    })();
    function debounce(callback, delay) {
      var timer;
      return function () {
        var args = arguments;
        var context = this;
        clearTimeout(timer);
        timer = setTimeout(function () {
          callback.apply(context, args);
        }, delay);
      };
    }
    var Dimensions = (function () {
      function Dimensions(_temp) {
        var _this = this;
        var _ref = _temp === void 0 ? {} : _temp,
          wrapper = _ref.wrapper,
          content = _ref.content,
          _ref$autoResize = _ref.autoResize,
          autoResize = _ref$autoResize === void 0 ? true : _ref$autoResize;
        this.resize = function () {
          _this.onWrapperResize();
          _this.onContentResize();
        };
        this.onWrapperResize = function () {
          if (_this.wrapper === window) {
            _this.width = window.innerWidth;
            _this.height = window.innerHeight;
          } else {
            _this.width = _this.wrapper.clientWidth;
            _this.height = _this.wrapper.clientHeight;
          }
        };
        this.onContentResize = function () {
          _this.scrollHeight = _this.content.scrollHeight;
          _this.scrollWidth = _this.content.scrollWidth;
        };
        this.wrapper = wrapper;
        this.content = content;
        if (autoResize) {
          var resize = debounce(this.resize, 250);
          if (this.wrapper !== window) {
            this.wrapperResizeObserver = new ResizeObserver(resize);
            this.wrapperResizeObserver.observe(this.wrapper);
          }
          this.contentResizeObserver = new ResizeObserver(resize);
          this.contentResizeObserver.observe(this.content);
        }
        this.resize();
      }
      var _proto = Dimensions.prototype;
      _proto.destroy = function destroy() {
        var _this$wrapperResizeOb, _this$contentResizeOb;
        (_this$wrapperResizeOb = this.wrapperResizeObserver) == null
          ? void 0
          : _this$wrapperResizeOb.disconnect();
        (_this$contentResizeOb = this.contentResizeObserver) == null
          ? void 0
          : _this$contentResizeOb.disconnect();
      };
      _createClass(Dimensions, [
        {
          key: "limit",
          get: function get() {
            return {
              x: this.scrollWidth - this.width,
              y: this.scrollHeight - this.height,
            };
          },
        },
      ]);
      return Dimensions;
    })();
    var Emitter = (function () {
      function Emitter() {
        this.events = {};
      }
      var _proto = Emitter.prototype;
      _proto.emit = function emit(event) {
        var callbacks = this.events[event] || [];
        for (var i = 0, length = callbacks.length; i < length; i++) {
          callbacks[i].apply(callbacks, [].slice.call(arguments, 1));
        }
      };
      _proto.on = function on(event, cb) {
        var _this$events$event,
          _this = this;
        ((_this$events$event = this.events[event]) == null
          ? void 0
          : _this$events$event.push(cb)) || (this.events[event] = [cb]);
        return function () {
          var _this$events$event2;
          _this.events[event] =
            (_this$events$event2 = _this.events[event]) == null
              ? void 0
              : _this$events$event2.filter(function (i) {
                  return cb !== i;
                });
        };
      };
      _proto.destroy = function destroy() {
        this.events = {};
      };
      return Emitter;
    })();
    var VirtualScroll = (function () {
      function VirtualScroll(element, _ref) {
        var _this = this;
        var _ref$wheelMultiplier = _ref.wheelMultiplier,
          wheelMultiplier =
            _ref$wheelMultiplier === void 0 ? 1 : _ref$wheelMultiplier,
          _ref$touchMultiplier = _ref.touchMultiplier,
          touchMultiplier =
            _ref$touchMultiplier === void 0 ? 2 : _ref$touchMultiplier,
          _ref$normalizeWheel = _ref.normalizeWheel,
          normalizeWheel =
            _ref$normalizeWheel === void 0 ? false : _ref$normalizeWheel;
        this.onTouchStart = function (event) {
          var _ref2 = event.targetTouches ? event.targetTouches[0] : event,
            clientX = _ref2.clientX,
            clientY = _ref2.clientY;
          _this.touchStart.x = clientX;
          _this.touchStart.y = clientY;
          _this.lastDelta = { x: 0, y: 0 };
        };
        this.onTouchMove = function (event) {
          var _ref3 = event.targetTouches ? event.targetTouches[0] : event,
            clientX = _ref3.clientX,
            clientY = _ref3.clientY;
          var deltaX = -(clientX - _this.touchStart.x) * _this.touchMultiplier;
          var deltaY = -(clientY - _this.touchStart.y) * _this.touchMultiplier;
          _this.touchStart.x = clientX;
          _this.touchStart.y = clientY;
          _this.lastDelta = { x: deltaX, y: deltaY };
          _this.emitter.emit("scroll", {
            type: "touch",
            deltaX: deltaX,
            deltaY: deltaY,
            event: event,
          });
        };
        this.onTouchEnd = function (event) {
          _this.emitter.emit("scroll", {
            type: "touch",
            inertia: true,
            deltaX: _this.lastDelta.x,
            deltaY: _this.lastDelta.y,
            event: event,
          });
        };
        this.onWheel = function (event) {
          var deltaX = event.deltaX,
            deltaY = event.deltaY;
          if (_this.normalizeWheel) {
            deltaX = clamp(-100, deltaX, 100);
            deltaY = clamp(-100, deltaY, 100);
          }
          deltaX *= _this.wheelMultiplier;
          deltaY *= _this.wheelMultiplier;
          _this.emitter.emit("scroll", {
            type: "wheel",
            deltaX: deltaX,
            deltaY: deltaY,
            event: event,
          });
        };
        this.element = element;
        this.wheelMultiplier = wheelMultiplier;
        this.touchMultiplier = touchMultiplier;
        this.normalizeWheel = normalizeWheel;
        this.touchStart = { x: null, y: null };
        this.emitter = new Emitter();
        this.element.addEventListener("wheel", this.onWheel, {
          passive: false,
        });
        this.element.addEventListener("touchstart", this.onTouchStart, {
          passive: false,
        });
        this.element.addEventListener("touchmove", this.onTouchMove, {
          passive: false,
        });
        this.element.addEventListener("touchend", this.onTouchEnd, {
          passive: false,
        });
      }
      var _proto = VirtualScroll.prototype;
      _proto.on = function on(event, callback) {
        return this.emitter.on(event, callback);
      };
      _proto.destroy = function destroy() {
        this.emitter.destroy();
        this.element.removeEventListener("wheel", this.onWheel, {
          passive: false,
        });
        this.element.removeEventListener("touchstart", this.onTouchStart, {
          passive: false,
        });
        this.element.removeEventListener("touchmove", this.onTouchMove, {
          passive: false,
        });
        this.element.removeEventListener("touchend", this.onTouchEnd, {
          passive: false,
        });
      };
      return VirtualScroll;
    })();
    var Lenis = (function () {
      function Lenis(_temp) {
        var _this = this;
        var _ref = _temp === void 0 ? {} : _temp,
          _ref$wrapper = _ref.wrapper,
          wrapper = _ref$wrapper === void 0 ? window : _ref$wrapper,
          _ref$content = _ref.content,
          content =
            _ref$content === void 0 ? document.documentElement : _ref$content,
          _ref$wheelEventsTarge = _ref.wheelEventsTarget,
          wheelEventsTarget =
            _ref$wheelEventsTarge === void 0 ? wrapper : _ref$wheelEventsTarge,
          _ref$smoothWheel = _ref.smoothWheel,
          smoothWheel = _ref$smoothWheel === void 0 ? true : _ref$smoothWheel,
          _ref$smoothTouch = _ref.smoothTouch,
          smoothTouch = _ref$smoothTouch === void 0 ? false : _ref$smoothTouch,
          _ref$syncTouch = _ref.syncTouch,
          _syncTouch = _ref$syncTouch === void 0 ? false : _ref$syncTouch,
          _ref$syncTouchLerp = _ref.syncTouchLerp,
          syncTouchLerp =
            _ref$syncTouchLerp === void 0 ? 0.1 : _ref$syncTouchLerp,
          _ref$__iosNoInertiaSy = _ref.__iosNoInertiaSyncTouchLerp,
          __iosNoInertiaSyncTouchLerp =
            _ref$__iosNoInertiaSy === void 0 ? 0.4 : _ref$__iosNoInertiaSy,
          _ref$touchInertiaMult = _ref.touchInertiaMultiplier,
          touchInertiaMultiplier =
            _ref$touchInertiaMult === void 0 ? 35 : _ref$touchInertiaMult,
          duration = _ref.duration,
          _ref$easing = _ref.easing,
          easing =
            _ref$easing === void 0
              ? function (t) {
                  return Math.min(1, 1.001 - Math.pow(2, -10 * t));
                }
              : _ref$easing,
          _ref$lerp = _ref.lerp,
          lerp = _ref$lerp === void 0 ? duration && 0.1 : _ref$lerp,
          _ref$infinite = _ref.infinite,
          infinite = _ref$infinite === void 0 ? false : _ref$infinite,
          _ref$orientation = _ref.orientation,
          orientation =
            _ref$orientation === void 0 ? "vertical" : _ref$orientation,
          _ref$gestureOrientati = _ref.gestureOrientation,
          gestureOrientation =
            _ref$gestureOrientati === void 0
              ? "vertical"
              : _ref$gestureOrientati,
          _ref$touchMultiplier = _ref.touchMultiplier,
          touchMultiplier =
            _ref$touchMultiplier === void 0 ? 1 : _ref$touchMultiplier,
          _ref$wheelMultiplier = _ref.wheelMultiplier,
          wheelMultiplier =
            _ref$wheelMultiplier === void 0 ? 1 : _ref$wheelMultiplier,
          _ref$normalizeWheel = _ref.normalizeWheel,
          normalizeWheel =
            _ref$normalizeWheel === void 0 ? false : _ref$normalizeWheel,
          _ref$autoResize = _ref.autoResize,
          autoResize = _ref$autoResize === void 0 ? true : _ref$autoResize;
        this.onVirtualScroll = function (_ref2) {
          var type = _ref2.type,
            inertia = _ref2.inertia,
            deltaX = _ref2.deltaX,
            deltaY = _ref2.deltaY,
            event = _ref2.event;
          if (event.ctrlKey) return;
          var isTouch = type === "touch";
          var isWheel = type === "wheel";
          if (
            (_this.options.gestureOrientation === "vertical" && deltaY === 0) ||
            (_this.options.gestureOrientation === "horizontal" &&
              deltaX === 0) ||
            (isTouch &&
              _this.options.gestureOrientation === "vertical" &&
              _this.scroll === 0 &&
              !_this.options.infinite &&
              deltaY <= 0)
          )
            return;
          if (
            !!event.composedPath().find(function (node) {
              return (
                (node == null
                  ? void 0
                  : node.hasAttribute == null
                  ? void 0
                  : node.hasAttribute("data-lenis-prevent")) ||
                (isTouch &&
                  (node == null
                    ? void 0
                    : node.hasAttribute == null
                    ? void 0
                    : node.hasAttribute("data-lenis-prevent-touch"))) ||
                (isWheel &&
                  (node == null
                    ? void 0
                    : node.hasAttribute == null
                    ? void 0
                    : node.hasAttribute("data-lenis-prevent-wheel")))
              );
            })
          )
            return;
          if (_this.isStopped || _this.isLocked) {
            event.preventDefault();
            return;
          }
          _this.isSmooth =
            ((_this.options.smoothTouch || _this.options.syncTouch) &&
              isTouch) ||
            (_this.options.smoothWheel && isWheel);
          if (!_this.isSmooth) {
            _this.isScrolling = false;
            _this.animate.stop();
            return;
          }
          event.preventDefault();
          var delta = deltaY;
          if (_this.options.gestureOrientation === "both") {
            delta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;
          } else if (_this.options.gestureOrientation === "horizontal") {
            delta = deltaX;
          }
          var syncTouch = isTouch && _this.options.syncTouch;
          var hasTouchInertia = isTouch && inertia && Math.abs(delta) > 1;
          if (hasTouchInertia) {
            delta = _this.velocity * _this.options.touchInertiaMultiplier;
          }
          _this.scrollTo(
            _this.targetScroll + delta,
            _extends(
              { programmatic: false },
              syncTouch && {
                lerp: hasTouchInertia
                  ? _this.syncTouchLerp
                  : _this.options.__iosNoInertiaSyncTouchLerp,
              }
            )
          );
        };
        this.onScroll = function () {
          if (!_this.isScrolling) {
            var lastScroll = _this.animatedScroll;
            _this.animatedScroll = _this.targetScroll = _this.actualScroll;
            _this.velocity = 0;
            _this.direction = Math.sign(_this.animatedScroll - lastScroll);
            _this.emit();
          }
        };
        window.lenisVersion = version;
        if (wrapper === document.documentElement || wrapper === document.body) {
          wrapper = window;
        }
        this.options = {
          wrapper: wrapper,
          content: content,
          wheelEventsTarget: wheelEventsTarget,
          smoothWheel: smoothWheel,
          smoothTouch: smoothTouch,
          syncTouch: _syncTouch,
          syncTouchLerp: syncTouchLerp,
          __iosNoInertiaSyncTouchLerp: __iosNoInertiaSyncTouchLerp,
          touchInertiaMultiplier: touchInertiaMultiplier,
          duration: duration,
          easing: easing,
          lerp: lerp,
          infinite: infinite,
          gestureOrientation: gestureOrientation,
          orientation: orientation,
          touchMultiplier: touchMultiplier,
          wheelMultiplier: wheelMultiplier,
          normalizeWheel: normalizeWheel,
          autoResize: autoResize,
        };
        this.dimensions = new Dimensions({
          wrapper: wrapper,
          content: content,
          autoResize: autoResize,
        });
        this.rootElement.classList.add("lenis");
        this.velocity = 0;
        this.isStopped = false;
        this.isSmooth = smoothWheel || smoothTouch;
        this.isScrolling = false;
        this.targetScroll = this.animatedScroll = this.actualScroll;
        this.animate = new Animate();
        this.emitter = new Emitter();
        this.options.wrapper.addEventListener("scroll", this.onScroll, {
          passive: false,
        });
        this.virtualScroll = new VirtualScroll(wheelEventsTarget, {
          touchMultiplier: touchMultiplier,
          wheelMultiplier: wheelMultiplier,
          normalizeWheel: normalizeWheel,
        });
        this.virtualScroll.on("scroll", this.onVirtualScroll);
      }
      var _proto = Lenis.prototype;
      _proto.destroy = function destroy() {
        this.emitter.destroy();
        this.options.wrapper.removeEventListener("scroll", this.onScroll, {
          passive: false,
        });
        this.virtualScroll.destroy();
        this.dimensions.destroy();
        this.rootElement.classList.remove("lenis");
        this.rootElement.classList.remove("lenis-smooth");
        this.rootElement.classList.remove("lenis-scrolling");
        this.rootElement.classList.remove("lenis-stopped");
      };
      _proto.on = function on(event, callback) {
        return this.emitter.on(event, callback);
      };
      _proto.off = function off(event, callback) {
        var _this$emitter$events$;
        this.emitter.events[event] =
          (_this$emitter$events$ = this.emitter.events[event]) == null
            ? void 0
            : _this$emitter$events$.filter(function (i) {
                return callback !== i;
              });
      };
      _proto.setScroll = function setScroll(scroll) {
        if (this.isHorizontal) {
          this.rootElement.scrollLeft = scroll;
        } else {
          this.rootElement.scrollTop = scroll;
        }
      };
      _proto.resize = function resize() {
        this.dimensions.resize();
      };
      _proto.emit = function emit() {
        this.emitter.emit("scroll", this);
      };
      _proto.reset = function reset() {
        this.isLocked = false;
        this.isScrolling = false;
        this.velocity = 0;
        this.animate.stop();
      };
      _proto.start = function start() {
        this.isStopped = false;
        this.reset();
      };
      _proto.stop = function stop() {
        this.isStopped = true;
        this.animate.stop();
        this.reset();
      };
      _proto.raf = function raf(time) {
        var deltaTime = time - (this.time || time);
        this.time = time;
        this.animate.advance(deltaTime * 0.001);
      };
      _proto.scrollTo = function scrollTo(target, _temp2) {
        var _this2 = this;
        var _ref3 = _temp2 === void 0 ? {} : _temp2,
          _ref3$offset = _ref3.offset,
          offset = _ref3$offset === void 0 ? 0 : _ref3$offset,
          _ref3$immediate = _ref3.immediate,
          immediate = _ref3$immediate === void 0 ? false : _ref3$immediate,
          _ref3$lock = _ref3.lock,
          lock = _ref3$lock === void 0 ? false : _ref3$lock,
          _ref3$duration = _ref3.duration,
          duration =
            _ref3$duration === void 0 ? this.options.duration : _ref3$duration,
          _ref3$easing = _ref3.easing,
          easing = _ref3$easing === void 0 ? this.options.easing : _ref3$easing,
          _ref3$lerp = _ref3.lerp,
          lerp =
            _ref3$lerp === void 0 ? !duration && this.options.lerp : _ref3$lerp,
          _ref3$onComplete = _ref3.onComplete,
          onComplete = _ref3$onComplete === void 0 ? null : _ref3$onComplete,
          _ref3$force = _ref3.force,
          force = _ref3$force === void 0 ? false : _ref3$force,
          _ref3$programmatic = _ref3.programmatic,
          programmatic =
            _ref3$programmatic === void 0 ? true : _ref3$programmatic;
        if (this.isStopped && !force) return;
        if (["top", "left", "start"].includes(target)) {
          target = 0;
        } else if (["bottom", "right", "end"].includes(target)) {
          target = this.limit;
        } else {
          var _target;
          var node;
          if (typeof target === "string") {
            node = document.querySelector(target);
          } else if ((_target = target) != null && _target.nodeType) {
            node = target;
          }
          if (node) {
            if (this.options.wrapper !== window) {
              var wrapperRect = this.options.wrapper.getBoundingClientRect();
              offset -= this.isHorizontal ? wrapperRect.left : wrapperRect.top;
            }
            var rect = node.getBoundingClientRect();
            target =
              (this.isHorizontal ? rect.left : rect.top) + this.animatedScroll;
          }
        }
        if (typeof target !== "number") return;
        target += offset;
        target = Math.round(target);
        if (this.options.infinite) {
          if (programmatic) {
            this.targetScroll = this.animatedScroll = this.scroll;
          }
        } else {
          target = clamp(0, target, this.limit);
        }
        if (immediate) {
          this.animatedScroll = this.targetScroll = target;
          this.setScroll(this.scroll);
          this.reset();
          this.emit();
          onComplete == null ? void 0 : onComplete();
          return;
        }
        if (!programmatic) {
          if (target === this.targetScroll) return;
          this.targetScroll = target;
        }
        this.animate.fromTo(this.animatedScroll, target, {
          duration: duration,
          easing: easing,
          lerp: lerp,
          onUpdate: function onUpdate(value, _ref4) {
            var completed = _ref4.completed;
            if (lock) _this2.isLocked = true;
            _this2.isScrolling = true;
            _this2.velocity = value - _this2.animatedScroll;
            _this2.direction = Math.sign(_this2.velocity);
            _this2.animatedScroll = value;
            _this2.setScroll(_this2.scroll);
            if (programmatic) {
              _this2.targetScroll = value;
            }
            if (completed) {
              if (lock) _this2.isLocked = false;
              requestAnimationFrame(function () {
                _this2.isScrolling = false;
              });
              _this2.velocity = 0;
              onComplete == null ? void 0 : onComplete();
            }
            _this2.emit();
          },
        });
      };
      _createClass(Lenis, [
        {
          key: "rootElement",
          get: function get() {
            return this.options.wrapper === window
              ? this.options.content
              : this.options.wrapper;
          },
        },
        {
          key: "limit",
          get: function get() {
            return this.dimensions.limit[this.isHorizontal ? "x" : "y"];
          },
        },
        {
          key: "isHorizontal",
          get: function get() {
            return this.options.orientation === "horizontal";
          },
        },
        {
          key: "actualScroll",
          get: function get() {
            return this.isHorizontal
              ? this.rootElement.scrollLeft
              : this.rootElement.scrollTop;
          },
        },
        {
          key: "scroll",
          get: function get() {
            return this.options.infinite
              ? modulo(this.animatedScroll, this.limit)
              : this.animatedScroll;
          },
        },
        {
          key: "progress",
          get: function get() {
            return this.limit === 0 ? 1 : this.scroll / this.limit;
          },
        },
        {
          key: "isSmooth",
          get: function get() {
            return this.__isSmooth;
          },
          set: function set(value) {
            if (this.__isSmooth !== value) {
              this.rootElement.classList.toggle("lenis-smooth", value);
              this.__isSmooth = value;
            }
          },
        },
        {
          key: "isScrolling",
          get: function get() {
            return this.__isScrolling;
          },
          set: function set(value) {
            if (this.__isScrolling !== value) {
              this.rootElement.classList.toggle("lenis-scrolling", value);
              this.__isScrolling = value;
            }
          },
        },
        {
          key: "isStopped",
          get: function get() {
            return this.__isStopped;
          },
          set: function set(value) {
            if (this.__isStopped !== value) {
              this.rootElement.classList.toggle("lenis-stopped", value);
              this.__isStopped = value;
            }
          },
        },
      ]);
      return Lenis;
    })();
    return Lenis;
  });
}

if ($(window).width() > 1024) {
  const lenis = new Lenis({
    duration: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  gsap.utils
    .toArray(".section-parallax .parallax-content")
    .forEach(function (section, i) {
      const heightDiff =
        section.offsetHeight - section.parentElement.offsetHeight;

      gsap.fromTo(
        section,
        {
          y: -heightDiff,
        },
        {
          scrollTrigger: {
            trigger: section.parentElement,
            scrub: true,
            invalidateOnRefresh: true,
          },
          y: 0,
          ease: "none",
        }
      );
    });
}
