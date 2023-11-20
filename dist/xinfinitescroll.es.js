import { ref as d, watch as m, reactive as w, onBeforeMount as T, nextTick as H, onBeforeUnmount as f } from "vue";
function E(p, s, u = 1e3) {
  const g = d([]), b = d(!0);
  m(
    () => s.value,
    () => {
      const { rowItemAmount: n, listData: t, rowHeight: a } = s.value, i = [];
      for (let l = 0; l < t.length; l += 1) {
        const v = Math.floor(l / n);
        i.push({
          value: t[l],
          top: v * a
        });
      }
      g.value = i;
    },
    {
      deep: !0,
      immediate: !0
    }
  );
  let e = null;
  const c = d(0), r = d(0), o = w({
    begin: 0,
    end: 0 + u
  }), h = function(n, t) {
    let a = null;
    function i() {
      a !== null && clearTimeout(a);
    }
    function l(v) {
      i(), a = setTimeout(n(v), t);
    }
    return l.cancel = i, l;
  }((n) => {
    var t;
    c.value = ((t = n.target) == null ? void 0 : t.scrollTop) || 0, o.begin = c.value - u, o.end = c.value + r.value + u;
  }, 200);
  return m(
    () => r.value,
    (n) => {
      o.begin = c.value - u, o.end = c.value + n + u;
    }
  ), T(() => {
    H(() => {
      e = document.getElementById(p), r.value = (e == null ? void 0 : e.clientHeight) || 0, o.end = r.value + u, e.addEventListener("resize", () => {
        r.value = (e == null ? void 0 : e.clientHeight) || 0;
      }), b && e.addEventListener("scroll", h);
    });
  }), f(() => {
    h.cancel();
  }), {
    wrapData: g,
    scrollTop: c,
    showArea: o
  };
}
export {
  E as infiniteScroll
};
