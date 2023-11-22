import { ref as h, watch as k, reactive as P, onBeforeMount as R, nextTick as C, onBeforeUnmount as F } from "vue";
var G = typeof global == "object" && global && global.Object === Object && global;
const U = G;
var _ = typeof self == "object" && self && self.Object === Object && self, z = U || _ || Function("return this")();
const M = z;
var D = M.Symbol;
const S = D;
var N = Object.prototype, X = N.hasOwnProperty, q = N.toString, y = S ? S.toStringTag : void 0;
function J(e) {
  var t = X.call(e, y), r = e[y];
  try {
    e[y] = void 0;
    var u = !0;
  } catch {
  }
  var f = q.call(e);
  return u && (t ? e[y] = r : delete e[y]), f;
}
var K = Object.prototype, Q = K.toString;
function V(e) {
  return Q.call(e);
}
var Y = "[object Null]", Z = "[object Undefined]", L = S ? S.toStringTag : void 0;
function ee(e) {
  return e == null ? e === void 0 ? Z : Y : L && L in Object(e) ? J(e) : V(e);
}
function te(e) {
  return e != null && typeof e == "object";
}
var ne = "[object Symbol]";
function re(e) {
  return typeof e == "symbol" || te(e) && ee(e) == ne;
}
var ie = /\s/;
function oe(e) {
  for (var t = e.length; t-- && ie.test(e.charAt(t)); )
    ;
  return t;
}
var ae = /^\s+/;
function ce(e) {
  return e && e.slice(0, oe(e) + 1).replace(ae, "");
}
function I(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var A = 0 / 0, ue = /^[-+]0x[0-9a-f]+$/i, le = /^0b[01]+$/i, fe = /^0o[0-7]+$/i, se = parseInt;
function B(e) {
  if (typeof e == "number")
    return e;
  if (re(e))
    return A;
  if (I(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = I(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = ce(e);
  var r = le.test(e);
  return r || fe.test(e) ? se(e.slice(2), r ? 2 : 8) : ue.test(e) ? A : +e;
}
var de = function() {
  return M.Date.now();
};
const x = de;
var ge = "Expected a function", be = Math.max, me = Math.min;
function ve(e, t, r) {
  var u, f, o, c, i, a, s = 0, d = !1, l = !1, v = !0;
  if (typeof e != "function")
    throw new TypeError(ge);
  t = B(t) || 0, I(r) && (d = !!r.leading, l = "maxWait" in r, o = l ? be(B(r.maxWait) || 0, t) : o, v = "trailing" in r ? !!r.trailing : v);
  function b(n) {
    var g = u, T = f;
    return u = f = void 0, s = n, c = e.apply(T, g), c;
  }
  function m(n) {
    return s = n, i = setTimeout(p, t), d ? b(n) : c;
  }
  function j(n) {
    var g = n - a, T = n - s, w = t - g;
    return l ? me(w, o - T) : w;
  }
  function E(n) {
    var g = n - a, T = n - s;
    return a === void 0 || g >= t || g < 0 || l && T >= o;
  }
  function p() {
    var n = x();
    if (E(n))
      return $(n);
    i = setTimeout(p, j(n));
  }
  function $(n) {
    return i = void 0, v && u ? b(n) : (u = f = void 0, c);
  }
  function W() {
    i !== void 0 && clearTimeout(i), s = 0, u = a = f = i = void 0;
  }
  function H() {
    return i === void 0 ? c : $(x());
  }
  function O() {
    var n = x(), g = E(n);
    if (u = arguments, f = this, a = n, g) {
      if (i === void 0)
        return m(a);
      if (l)
        return clearTimeout(i), i = setTimeout(p, t), b(a);
    }
    return i === void 0 && (i = setTimeout(p, t)), c;
  }
  return O.cancel = W, O.flush = H, O;
}
function ye(e, t, r = 1e3) {
  const u = h([]), f = h(!0);
  k(
    () => t.value,
    () => {
      const { rowItemAmount: d, listData: l, rowHeight: v } = t.value, b = [];
      for (let m = 0; m < l.length; m += 1) {
        const j = Math.floor(m / d);
        b.push({
          value: l[m],
          top: j * v
        });
      }
      u.value = b;
    },
    {
      deep: !0,
      immediate: !0
    }
  );
  let o = null;
  const c = h(0), i = h(0), a = P({
    begin: 0,
    end: 0 + r
  }), s = ve((d) => {
    var l;
    c.value = ((l = d.target) == null ? void 0 : l.scrollTop) || 0, a.begin = c.value - r, a.end = c.value + i.value + r;
  }, 200);
  return k(
    () => i.value,
    (d) => {
      a.begin = c.value - r, a.end = c.value + d + r;
    }
  ), R(() => {
    C(() => {
      o = document.getElementById(e), i.value = (o == null ? void 0 : o.clientHeight) || 0, a.end = i.value + r, o.addEventListener("resize", () => {
        i.value = (o == null ? void 0 : o.clientHeight) || 0;
      }), f && o.addEventListener("scroll", s);
    });
  }), F(() => {
    s.cancel();
  }), {
    wrapData: u,
    scrollTop: c,
    showArea: a
  };
}
export {
  ye as infiniteScroll
};
