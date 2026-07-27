var ve = Object.defineProperty;
var me = (e, r, o) => r in e ? ve(e, r, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[r] = o;
var w = (e, r, o) => me(e, typeof r != "symbol" ? r + "" : r, o);
import pe, { useRef as z, useEffect as J } from "react";
var dt = { exports: {} }, ft = {};
/**
 * @license React
 * react-jsx-dev-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kt;
function ge() {
  if (kt) return ft;
  kt = 1;
  var e = Symbol.for("react.fragment");
  return ft.Fragment = e, ft.jsxDEV = void 0, ft;
}
var vt = {};
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zt;
function ye() {
  return zt || (zt = 1, process.env.NODE_ENV !== "production" && (function() {
    var e = pe, r = Symbol.for("react.element"), o = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), n = Symbol.for("react.provider"), i = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), l = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), d = Symbol.for("react.offscreen"), v = Symbol.iterator, P = "@@iterator";
    function S(t) {
      if (t === null || typeof t != "object")
        return null;
      var a = v && t[v] || t[P];
      return typeof a == "function" ? a : null;
    }
    var D = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function m(t) {
      {
        for (var a = arguments.length, g = new Array(a > 1 ? a - 1 : 0), C = 1; C < a; C++)
          g[C - 1] = arguments[C];
        F("error", t, g);
      }
    }
    function F(t, a, g) {
      {
        var C = D.ReactDebugCurrentFrame, X = C.getStackAddendum();
        X !== "" && (a += "%s", g = g.concat([X]));
        var L = g.map(function(k) {
          return String(k);
        });
        L.unshift("Warning: " + a), Function.prototype.apply.call(console[t], console, L);
      }
    }
    var p = !1, b = !1, T = !1, j = !1, _ = !1, I;
    I = Symbol.for("react.module.reference");
    function M(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === s || t === x || _ || t === c || t === y || t === f || j || t === d || p || b || T || typeof t == "object" && t !== null && (t.$$typeof === h || t.$$typeof === l || t.$$typeof === n || t.$$typeof === i || t.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === I || t.getModuleId !== void 0));
    }
    function A(t, a, g) {
      var C = t.displayName;
      if (C)
        return C;
      var X = a.displayName || a.name || "";
      return X !== "" ? g + "(" + X + ")" : g;
    }
    function E(t) {
      return t.displayName || "Context";
    }
    function R(t) {
      if (t == null)
        return null;
      if (typeof t.tag == "number" && m("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
      switch (t) {
        case s:
          return "Fragment";
        case o:
          return "Portal";
        case x:
          return "Profiler";
        case c:
          return "StrictMode";
        case y:
          return "Suspense";
        case f:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case i:
            var a = t;
            return E(a) + ".Consumer";
          case n:
            var g = t;
            return E(g._context) + ".Provider";
          case u:
            return A(t, t.render, "ForwardRef");
          case l:
            var C = t.displayName || null;
            return C !== null ? C : R(t.type) || "Memo";
          case h: {
            var X = t, L = X._payload, k = X._init;
            try {
              return R(k(L));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var O = Object.assign, Y = 0, W, $, Z, U, K, q, B;
    function at() {
    }
    at.__reactDisabledLog = !0;
    function Wt() {
      {
        if (Y === 0) {
          W = console.log, $ = console.info, Z = console.warn, U = console.error, K = console.group, q = console.groupCollapsed, B = console.groupEnd;
          var t = {
            configurable: !0,
            enumerable: !0,
            value: at,
            writable: !0
          };
          Object.defineProperties(console, {
            info: t,
            log: t,
            warn: t,
            error: t,
            group: t,
            groupCollapsed: t,
            groupEnd: t
          });
        }
        Y++;
      }
    }
    function qt() {
      {
        if (Y--, Y === 0) {
          var t = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: O({}, t, {
              value: W
            }),
            info: O({}, t, {
              value: $
            }),
            warn: O({}, t, {
              value: Z
            }),
            error: O({}, t, {
              value: U
            }),
            group: O({}, t, {
              value: K
            }),
            groupCollapsed: O({}, t, {
              value: q
            }),
            groupEnd: O({}, t, {
              value: B
            })
          });
        }
        Y < 0 && m("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var mt = D.ReactCurrentDispatcher, pt;
    function ct(t, a, g) {
      {
        if (pt === void 0)
          try {
            throw Error();
          } catch (X) {
            var C = X.stack.trim().match(/\n( *(at )?)/);
            pt = C && C[1] || "";
          }
        return `
` + pt + t;
      }
    }
    var gt = !1, lt;
    {
      var Bt = typeof WeakMap == "function" ? WeakMap : Map;
      lt = new Bt();
    }
    function Ct(t, a) {
      if (!t || gt)
        return "";
      {
        var g = lt.get(t);
        if (g !== void 0)
          return g;
      }
      var C;
      gt = !0;
      var X = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var L;
      L = mt.current, mt.current = null, Wt();
      try {
        if (a) {
          var k = function() {
            throw Error();
          };
          if (Object.defineProperty(k.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(k, []);
            } catch (Q) {
              C = Q;
            }
            Reflect.construct(t, [], k);
          } else {
            try {
              k.call();
            } catch (Q) {
              C = Q;
            }
            t.call(k.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Q) {
            C = Q;
          }
          t();
        }
      } catch (Q) {
        if (Q && C && typeof Q.stack == "string") {
          for (var N = Q.stack.split(`
`), G = C.stack.split(`
`), V = N.length - 1, H = G.length - 1; V >= 1 && H >= 0 && N[V] !== G[H]; )
            H--;
          for (; V >= 1 && H >= 0; V--, H--)
            if (N[V] !== G[H]) {
              if (V !== 1 || H !== 1)
                do
                  if (V--, H--, H < 0 || N[V] !== G[H]) {
                    var et = `
` + N[V].replace(" at new ", " at ");
                    return t.displayName && et.includes("<anonymous>") && (et = et.replace("<anonymous>", t.displayName)), typeof t == "function" && lt.set(t, et), et;
                  }
                while (V >= 1 && H >= 0);
              break;
            }
        }
      } finally {
        gt = !1, mt.current = L, qt(), Error.prepareStackTrace = X;
      }
      var ot = t ? t.displayName || t.name : "", rt = ot ? ct(ot) : "";
      return typeof t == "function" && lt.set(t, rt), rt;
    }
    function Vt(t, a, g) {
      return Ct(t, !1);
    }
    function Ht(t) {
      var a = t.prototype;
      return !!(a && a.isReactComponent);
    }
    function ut(t, a, g) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return Ct(t, Ht(t));
      if (typeof t == "string")
        return ct(t);
      switch (t) {
        case y:
          return ct("Suspense");
        case f:
          return ct("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case u:
            return Vt(t.render);
          case l:
            return ut(t.type, a, g);
          case h: {
            var C = t, X = C._payload, L = C._init;
            try {
              return ut(L(X), a, g);
            } catch {
            }
          }
        }
      return "";
    }
    var st = Object.prototype.hasOwnProperty, Pt = {}, St = D.ReactDebugCurrentFrame;
    function ht(t) {
      if (t) {
        var a = t._owner, g = ut(t.type, t._source, a ? a.type : null);
        St.setExtraStackFrame(g);
      } else
        St.setExtraStackFrame(null);
    }
    function Jt(t, a, g, C, X) {
      {
        var L = Function.call.bind(st);
        for (var k in t)
          if (L(t, k)) {
            var N = void 0;
            try {
              if (typeof t[k] != "function") {
                var G = Error((C || "React class") + ": " + g + " type `" + k + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[k] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw G.name = "Invariant Violation", G;
              }
              N = t[k](a, k, C, g, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (V) {
              N = V;
            }
            N && !(N instanceof Error) && (ht(X), m("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", C || "React class", g, k, typeof N), ht(null)), N instanceof Error && !(N.message in Pt) && (Pt[N.message] = !0, ht(X), m("Failed %s type: %s", g, N.message), ht(null));
          }
      }
    }
    var Ut = Array.isArray;
    function yt(t) {
      return Ut(t);
    }
    function Kt(t) {
      {
        var a = typeof Symbol == "function" && Symbol.toStringTag, g = a && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return g;
      }
    }
    function Gt(t) {
      try {
        return Dt(t), !1;
      } catch {
        return !0;
      }
    }
    function Dt(t) {
      return "" + t;
    }
    function Tt(t) {
      if (Gt(t))
        return m("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Kt(t)), Dt(t);
    }
    var it = D.ReactCurrentOwner, Zt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, _t, Ot, xt;
    xt = {};
    function Qt(t) {
      if (st.call(t, "ref")) {
        var a = Object.getOwnPropertyDescriptor(t, "ref").get;
        if (a && a.isReactWarning)
          return !1;
      }
      return t.ref !== void 0;
    }
    function te(t) {
      if (st.call(t, "key")) {
        var a = Object.getOwnPropertyDescriptor(t, "key").get;
        if (a && a.isReactWarning)
          return !1;
      }
      return t.key !== void 0;
    }
    function ee(t, a) {
      if (typeof t.ref == "string" && it.current && a && it.current.stateNode !== a) {
        var g = R(it.current.type);
        xt[g] || (m('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', R(it.current.type), t.ref), xt[g] = !0);
      }
    }
    function re(t, a) {
      {
        var g = function() {
          _t || (_t = !0, m("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", a));
        };
        g.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: g,
          configurable: !0
        });
      }
    }
    function ne(t, a) {
      {
        var g = function() {
          Ot || (Ot = !0, m("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", a));
        };
        g.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: g,
          configurable: !0
        });
      }
    }
    var oe = function(t, a, g, C, X, L, k) {
      var N = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: t,
        key: a,
        ref: g,
        props: k,
        // Record the component responsible for creating this element.
        _owner: L
      };
      return N._store = {}, Object.defineProperty(N._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(N, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: C
      }), Object.defineProperty(N, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: X
      }), Object.freeze && (Object.freeze(N.props), Object.freeze(N)), N;
    };
    function se(t, a, g, C, X) {
      {
        var L, k = {}, N = null, G = null;
        g !== void 0 && (Tt(g), N = "" + g), te(a) && (Tt(a.key), N = "" + a.key), Qt(a) && (G = a.ref, ee(a, X));
        for (L in a)
          st.call(a, L) && !Zt.hasOwnProperty(L) && (k[L] = a[L]);
        if (t && t.defaultProps) {
          var V = t.defaultProps;
          for (L in V)
            k[L] === void 0 && (k[L] = V[L]);
        }
        if (N || G) {
          var H = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          N && re(k, H), G && ne(k, H);
        }
        return oe(t, N, G, X, C, it.current, k);
      }
    }
    var bt = D.ReactCurrentOwner, It = D.ReactDebugCurrentFrame;
    function nt(t) {
      if (t) {
        var a = t._owner, g = ut(t.type, t._source, a ? a.type : null);
        It.setExtraStackFrame(g);
      } else
        It.setExtraStackFrame(null);
    }
    var Mt;
    Mt = !1;
    function Rt(t) {
      return typeof t == "object" && t !== null && t.$$typeof === r;
    }
    function Ft() {
      {
        if (bt.current) {
          var t = R(bt.current.type);
          if (t)
            return `

Check the render method of \`` + t + "`.";
        }
        return "";
      }
    }
    function ie(t) {
      {
        if (t !== void 0) {
          var a = t.fileName.replace(/^.*[\\\/]/, ""), g = t.lineNumber;
          return `

Check your code at ` + a + ":" + g + ".";
        }
        return "";
      }
    }
    var Yt = {};
    function ae(t) {
      {
        var a = Ft();
        if (!a) {
          var g = typeof t == "string" ? t : t.displayName || t.name;
          g && (a = `

Check the top-level render call using <` + g + ">.");
        }
        return a;
      }
    }
    function Nt(t, a) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var g = ae(a);
        if (Yt[g])
          return;
        Yt[g] = !0;
        var C = "";
        t && t._owner && t._owner !== bt.current && (C = " It was passed a child from " + R(t._owner.type) + "."), nt(t), m('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', g, C), nt(null);
      }
    }
    function At(t, a) {
      {
        if (typeof t != "object")
          return;
        if (yt(t))
          for (var g = 0; g < t.length; g++) {
            var C = t[g];
            Rt(C) && Nt(C, a);
          }
        else if (Rt(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var X = S(t);
          if (typeof X == "function" && X !== t.entries)
            for (var L = X.call(t), k; !(k = L.next()).done; )
              Rt(k.value) && Nt(k.value, a);
        }
      }
    }
    function ce(t) {
      {
        var a = t.type;
        if (a == null || typeof a == "string")
          return;
        var g;
        if (typeof a == "function")
          g = a.propTypes;
        else if (typeof a == "object" && (a.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        a.$$typeof === l))
          g = a.propTypes;
        else
          return;
        if (g) {
          var C = R(a);
          Jt(g, t.props, "prop", C, t);
        } else if (a.PropTypes !== void 0 && !Mt) {
          Mt = !0;
          var X = R(a);
          m("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", X || "Unknown");
        }
        typeof a.getDefaultProps == "function" && !a.getDefaultProps.isReactClassApproved && m("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function le(t) {
      {
        for (var a = Object.keys(t.props), g = 0; g < a.length; g++) {
          var C = a[g];
          if (C !== "children" && C !== "key") {
            nt(t), m("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", C), nt(null);
            break;
          }
        }
        t.ref !== null && (nt(t), m("Invalid attribute `ref` supplied to `React.Fragment`."), nt(null));
      }
    }
    var jt = {};
    function ue(t, a, g, C, X, L) {
      {
        var k = M(t);
        if (!k) {
          var N = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (N += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var G = ie(X);
          G ? N += G : N += Ft();
          var V;
          t === null ? V = "null" : yt(t) ? V = "array" : t !== void 0 && t.$$typeof === r ? (V = "<" + (R(t.type) || "Unknown") + " />", N = " Did you accidentally export a JSX literal instead of a component?") : V = typeof t, m("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", V, N);
        }
        var H = se(t, a, g, X, L);
        if (H == null)
          return H;
        if (k) {
          var et = a.children;
          if (et !== void 0)
            if (C)
              if (yt(et)) {
                for (var ot = 0; ot < et.length; ot++)
                  At(et[ot], t);
                Object.freeze && Object.freeze(et);
              } else
                m("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              At(et, t);
        }
        if (st.call(a, "key")) {
          var rt = R(t), Q = Object.keys(a).filter(function(fe) {
            return fe !== "key";
          }), wt = Q.length > 0 ? "{key: someKey, " + Q.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!jt[rt + wt]) {
            var de = Q.length > 0 ? "{" + Q.join(": ..., ") + ": ...}" : "{}";
            m(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, wt, rt, de, rt), jt[rt + wt] = !0;
          }
        }
        return t === s ? le(H) : ce(H), H;
      }
    }
    var he = ue;
    vt.Fragment = s, vt.jsxDEV = he;
  })()), vt;
}
var Xt;
function xe() {
  return Xt || (Xt = 1, process.env.NODE_ENV === "production" ? dt.exports = ge() : dt.exports = ye()), dt.exports;
}
var tt = xe();
function be(e, r, o, s) {
  let c = r + e.baseX, x = o + e.baseY;
  c += Math.sin(s * e.randomSpeed + e.baseY * 0.05) * 15 * e.z, x += Math.cos(s * e.randomSpeed + e.baseX * 0.05) * 15 * e.z;
  const n = c - e.x, i = x - e.y, u = n * 0.06, y = i * 0.06;
  return { forceX: u, forceY: y };
}
function Me(e, r, o, s, c, x) {
  const n = s, i = c, u = e.x - n, y = e.y - i, f = Math.max(Math.sqrt(u * u + y * y), 1);
  let l = 0, h = 0;
  const v = Math.sin(f * 0.02 - x * 3) * 2.5 * e.z;
  l += u / f * v, h += y / f * v;
  const S = Math.cos(f * 0.01 - x * 1 + e.randomSpeed) * 0.8 * e.z, D = -y / f, m = u / f;
  return l += D * S, h += m * S, { forceX: l, forceY: h, dxCenter: u, dyCenter: y, distToCenter: f };
}
function Re(e, r) {
  let c = Math.min(r / 400, 1) * 2.5 + e.sizeBias * 1;
  c < 0.4 && (c = 0), e.scale += (c - e.scale) * 0.15;
}
function we(e, r, o, s, c, x) {
  let n = 0, i = 0;
  c === "horizontal" ? (n = 1, i = 0) : c === "diagonal" ? (n = -r / s, i = -o / s) : (n = -o / s, i = r / s);
  const u = Math.atan2(i, n), y = e.sizeBias > 0.3 ? 1 : 0, f = Math.max(0, Math.sin(x * 0.5 + e.randomSpeed * 10)), l = Math.sin(x * 3 + e.baseX * 0.1 + e.randomSpeed) * 0.5 * f * y;
  n = Math.cos(u + l), i = Math.sin(u + l);
  const h = Math.max(1 - s / 400, 0.1);
  c === "horizontal" ? (e.dirX = e.dirX * (1 - 0.2) + n * 0.2, e.dirY = e.dirY * (1 - 0.2) + i * 0.2) : (e.dirX = e.dirX * (1 - h * 0.3) + n * h * 0.3, e.dirY = e.dirY * (1 - h * 0.3) + i * h * 0.3);
  const d = Math.sqrt(e.dirX * e.dirX + e.dirY * e.dirY);
  d > 0 && (e.dirX /= d, e.dirY /= d);
}
class Ee {
  constructor(r, o, s) {
    w(this, "x");
    w(this, "y");
    w(this, "baseX");
    // Relative X to swarm center
    w(this, "baseY");
    // Relative Y to swarm center
    w(this, "z");
    w(this, "vx");
    w(this, "vy");
    w(this, "color");
    w(this, "targetColor", null);
    w(this, "colorDelay", 0);
    w(this, "angleTarget");
    w(this, "randomSpeed");
    w(this, "sizeBias");
    w(this, "scale");
    w(this, "dirX");
    w(this, "dirY");
    w(this, "initialized", !1);
    this.x = r, this.y = o, this.baseX = r, this.baseY = o, this.z = Math.random() * 1.5 + 0.2, this.vx = 0, this.vy = 0, this.color = s, this.angleTarget = Math.random() * Math.PI * 2, this.randomSpeed = Math.random() * 2 + 1, this.sizeBias = Math.random(), this.scale = 1, this.dirX = Math.cos(this.angleTarget), this.dirY = Math.sin(this.angleTarget);
  }
  update(r, o, s, c, x, n, i, u = "vertical") {
    this.initialized || (this.x = s + this.baseX, this.y = c + this.baseY, this.initialized = !0);
    const {
      forceX: y,
      forceY: f,
      dxCenter: l,
      dyCenter: h,
      distToCenter: d
    } = Me(this, r, o, s, c, i), {
      forceX: v,
      forceY: P
    } = be(this, s, c, i);
    this.vx += y + v, this.vy += f + P, this.vx *= 0.75, this.vy *= 0.75, this.x += this.vx, this.y += this.vy, Re(this, d), we(this, l, h, d, u, i), this.targetColor && (this.colorDelay -= 1, this.colorDelay <= 0 && (this.color = this.targetColor, this.targetColor = null));
  }
  draw(r, o, s = "bean") {
    if (this.scale <= 0.05) return;
    r.fillStyle = this.color;
    const c = Math.sqrt(this.baseX * this.baseX + this.baseY * this.baseY), x = Math.max(0, 1 - c / 350);
    if (r.globalAlpha = Math.min(1, (0.5 + this.z * 0.5) * Math.min(this.scale, 1) * x), !(r.globalAlpha <= 0.01))
      if (s === "circle") {
        const n = Math.max(0.1, 2 * this.scale * this.z);
        r.beginPath(), r.arc(this.x, this.y, n, 0, Math.PI * 2), r.fill();
      } else if (s === "square") {
        const n = Math.max(0.1, 2 * this.scale * this.z);
        r.fillRect(this.x - n, this.y - n, n * 2, n * 2);
      } else {
        const i = (6 + this.sizeBias * 6) * this.scale, u = Math.sin(o * 3.5 + this.baseX * 0.1 + this.randomSpeed * 5), y = 0.4 + 0.6 * ((u + 1) / 2), f = i * 0.5 * y, l = Math.max(0.8, this.z * 1.5 * this.scale * (0.8 + 0.2 * u)), h = Math.atan2(this.dirY, this.dirX);
        r.beginPath(), r.ellipse(this.x, this.y, f, l, h, 0, Math.PI * 2), r.fill();
      }
  }
}
function Ce({ config: e, backgroundColor: r }) {
  const o = z(null), s = z(null), c = z([]), x = z(0), n = z({ x: -1e3, y: -1e3, isDown: !1, active: !1 }), i = z({ x: 0, y: 0, initialized: !1 });
  J(() => {
    const l = (d) => {
      if (!o.current) return;
      const v = o.current.getBoundingClientRect();
      n.current.x = d.clientX - v.left, n.current.y = d.clientY - v.top, n.current.active = !0;
    }, h = () => {
      n.current.active = !1;
    };
    return window.addEventListener("pointermove", l), window.addEventListener("pointerleave", h), () => {
      window.removeEventListener("pointermove", l), window.removeEventListener("pointerleave", h);
    };
  }, []);
  const u = z(e), y = z(null), f = z(0);
  return J(() => {
    u.current = e;
  }, [e]), J(() => {
    if (y.current && (clearInterval(y.current), y.current = null), !e.colors || e.colors.length === 0) {
      const h = e.color || "#8B5CF6";
      c.current.forEach((d) => {
        d.targetColor = h, d.colorDelay = Math.random() * 20;
      });
      return;
    }
    const l = (h) => {
      const d = n.current.active ? n.current.x : i.current.x, v = n.current.active ? n.current.y : i.current.y;
      c.current.forEach((P) => {
        const S = P.x - d, D = P.y - v, m = Math.sqrt(S * S + D * D);
        P.targetColor = h, P.colorDelay = Math.max(0, m * 0.15);
      });
    };
    return e.colorMode === "mixed" ? c.current.forEach((h, d) => {
      h.targetColor = e.colors[d % e.colors.length], h.colorDelay = Math.random() * 20;
    }) : (f.current = 0, l(e.colors[0]), e.colors.length > 1 && (y.current = setInterval(() => {
      const h = e.colors;
      f.current = (f.current + 1) % h.length, l(h[f.current]);
    }, 3e3))), () => {
      y.current && clearInterval(y.current);
    };
  }, [e.colors, e.color, e.colorMode]), J(() => {
    if (!o.current || !s.current || u.current.name === "NONE") return;
    const l = s.current, h = o.current, d = (m) => {
      for (const F of m) {
        const { width: p, height: b } = F.contentRect, T = window.devicePixelRatio || 1;
        l.width = p * T, l.height = b * T, l.style.width = `${p}px`, l.style.height = `${b}px`;
        const j = l.getContext("2d");
        j && j.scale(T, T), c.current = [];
        const I = Math.floor(350 * (u.current.density ?? 1)), M = u.current.colors, A = u.current.colorMode || "wave";
        for (let E = 0; E < I; E++) {
          const R = Math.sqrt(Math.random()) * 350, O = Math.random() * Math.PI * 2, Y = Math.cos(O) * R, W = Math.sin(O) * R;
          let $;
          if (M && M.length > 0)
            $ = A === "mixed" ? M[E % M.length] : M[0];
          else if (u.current.color)
            $ = u.current.color;
          else {
            const U = 210 + Math.max(0, Math.min(1, (Y + 350) / 700)) * 130 + (Math.random() * 15 - 7.5), K = 75 + Math.random() * 25, q = 60 + Math.random() * 15;
            $ = `hsl(${U}, ${K}%, ${q}%)`;
          }
          c.current.push(new Ee(Y, W, $));
        }
      }
    }, v = new ResizeObserver(d);
    v.observe(h);
    const P = l.getContext("2d");
    let S = 0;
    const D = () => {
      const m = h.getBoundingClientRect();
      if (P.clearRect(0, 0, m.width, m.height), r !== "transparent" && (P.fillStyle = r, P.fillRect(0, 0, m.width, m.height)), i.current.initialized || (i.current.x = m.width / 2, i.current.y = m.height / 2, i.current.initialized = !0), u.current.name === "FOLLOW_POINTER") {
        let F = m.width / 2, p = m.height / 2;
        const b = n.current.active ? n.current.x : null, T = n.current.active ? n.current.y : null;
        b !== null && T !== null && (F = b, p = T);
        const j = u.current.pointerTrackingSpeed ?? 0.06;
        i.current.x += (F - i.current.x) * j, i.current.y += (p - i.current.y) * j;
        const _ = u.current.particleSpeed ?? 1;
        S += 0.012 * _;
        const I = c.current, M = 18, A = M * M;
        for (let E = 0; E < I.length; E++) {
          const R = I[E];
          for (let O = E + 1; O < I.length; O++) {
            const Y = I[O], W = R.x - Y.x, $ = R.y - Y.y, Z = W * W + $ * $;
            if (Z < A && Z > 0) {
              const U = Math.sqrt(Z), K = (M - U) / M, q = W / U * K * 0.8, B = $ / U * K * 0.8;
              R.x += q, R.y += B, Y.x -= q, Y.y -= B, R.vx += q * 0.1, R.vy += B * 0.1, Y.vx -= q * 0.1, Y.vy -= B * 0.1;
            }
          }
        }
        for (const E of I) {
          E.update(b, T, i.current.x, i.current.y, m.width, m.height, S, u.current.orientation);
          const R = u.current.shape || "bean";
          E.draw(P, S, R);
        }
      }
      x.current = requestAnimationFrame(D);
    };
    return D(), () => {
      v.disconnect(), cancelAnimationFrame(x.current);
    };
  }, [r, e.density]), e.name === "NONE" ? null : /* @__PURE__ */ tt.jsxDEV("div", { ref: o, style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }, children: /* @__PURE__ */ tt.jsxDEV("canvas", { ref: s, style: { display: "block", width: "100%", height: "100%" } }, void 0, !1, {
    fileName: "/app/applet/src/components/background/BackgroundParticleEngine.tsx",
    lineNumber: 250,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/applet/src/components/background/BackgroundParticleEngine.tsx",
    lineNumber: 249,
    columnNumber: 5
  }, this);
}
class Pe {
  constructor(r, o) {
    w(this, "x");
    w(this, "y");
    w(this, "vx");
    w(this, "vy");
    w(this, "radius");
    w(this, "currentColor", "#8B5CF6");
    w(this, "targetColor", null);
    w(this, "colorDelay", 0);
    this.x = r, this.y = o;
    const s = Math.random() * Math.PI * 2, c = Math.random() * 0.5 + 0.1;
    this.vx = Math.cos(s) * c, this.vy = Math.sin(s) * c, this.radius = Math.random() * 1.5 + 1;
  }
  update(r, o, s, c, x = 1, n = 0.06) {
    if (this.x += this.vx * x, this.y += this.vy * x, this.x < 0 ? (this.x = 0, this.vx *= -1) : this.x > r && (this.x = r, this.vx *= -1), this.y < 0 ? (this.y = 0, this.vy *= -1) : this.y > o && (this.y = o, this.vy *= -1), s !== null && c !== null) {
      const i = s - this.x, u = c - this.y, y = i * i + u * u, f = 150, l = f * f;
      if (y < l) {
        const h = Math.sqrt(y), d = (f - h) / f, v = n / 0.06;
        this.x -= i / h * d * 2 * v, this.y -= u / h * d * 2 * v;
      }
    }
    this.targetColor && (this.colorDelay -= 1 * x, this.colorDelay <= 0 && (this.currentColor = this.targetColor, this.targetColor = null));
  }
  draw(r, o = "circle", s = 0) {
    if (r.fillStyle = this.currentColor, o === "square")
      r.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    else if (o === "bean") {
      const c = Math.sin(s * 0.05 + this.x * 0.01 + this.y * 0.01), x = this.radius * 2 * (0.8 + 0.4 * c), n = this.radius * (0.8 + 0.2 * c), i = this.vx !== 0 || this.vy !== 0 ? Math.atan2(this.vy, this.vx) : 0;
      r.beginPath(), r.ellipse(this.x, this.y, x, n, i, 0, Math.PI * 2), r.fill();
    } else
      r.beginPath(), r.arc(this.x, this.y, this.radius, 0, Math.PI * 2), r.fill();
  }
}
function Se({ config: e, backgroundColor: r }) {
  const o = z(null), s = z(null), c = z([]), x = z(0), n = z({ x: -1e3, y: -1e3, active: !1 });
  J(() => {
    const f = (h) => {
      if (!o.current) return;
      const d = o.current.getBoundingClientRect();
      n.current.x = h.clientX - d.left, n.current.y = h.clientY - d.top, n.current.active = !0;
    }, l = () => {
      n.current.active = !1;
    };
    return window.addEventListener("pointermove", f), window.addEventListener("pointerleave", l), () => {
      window.removeEventListener("pointermove", f), window.removeEventListener("pointerleave", l);
    };
  }, []);
  const i = z(e), u = z(0), y = z(null);
  return J(() => {
    i.current = e;
  }, [e]), J(() => {
    if (y.current && (clearInterval(y.current), y.current = null), !e.colors || e.colors.length === 0) {
      const d = e.color || "#8B5CF6";
      c.current.forEach((v) => {
        v.targetColor = d, v.colorDelay = Math.random() * 20;
      });
      return;
    }
    const f = n.current.active ? n.current.x : o.current ? o.current.clientWidth / 2 : 0, l = n.current.active ? n.current.y : o.current ? o.current.clientHeight / 2 : 0, h = (d) => {
      c.current.forEach((v) => {
        const P = v.x - f, S = v.y - l, D = Math.sqrt(P * P + S * S);
        v.targetColor = d, v.colorDelay = Math.max(0, D * 0.2);
      });
    };
    return e.colorMode === "mixed" ? c.current.forEach((d, v) => {
      d.targetColor = e.colors[v % e.colors.length], d.colorDelay = Math.random() * 20;
    }) : (u.current = 0, h(e.colors[0]), e.colors.length > 1 && (y.current = setInterval(() => {
      const d = e.colors;
      u.current = (u.current + 1) % d.length, h(d[u.current]);
    }, 3e3))), () => {
      y.current && clearInterval(y.current);
    };
  }, [e.colors, e.color, e.colorMode]), J(() => {
    if (!o.current || !s.current) return;
    const f = s.current, l = o.current, h = (D) => {
      for (const m of D) {
        const { width: F, height: p } = m.contentRect, b = window.devicePixelRatio || 1;
        f.width = F * b, f.height = p * b, f.style.width = `${F}px`, f.style.height = `${p}px`;
        const T = f.getContext("2d");
        T && T.scale(b, b), c.current = [];
        const j = F * p, _ = i.current.density ?? 1, I = Math.min(
          Math.floor(300 * _),
          Math.floor(j / 6e3 * _)
        ), M = i.current.colors, A = i.current.colorMode || "wave";
        for (let E = 0; E < I; E++) {
          const R = new Pe(Math.random() * F, Math.random() * p);
          M && M.length > 0 ? R.currentColor = A === "mixed" ? M[E % M.length] : M[0] : i.current.color && (R.currentColor = i.current.color), c.current.push(R);
        }
      }
    }, d = new ResizeObserver(h);
    d.observe(l);
    const v = f.getContext("2d");
    let P = 0;
    const S = () => {
      P += 1;
      const D = l.getBoundingClientRect();
      v.clearRect(0, 0, D.width, D.height), r !== "transparent" && (v.fillStyle = r, v.fillRect(0, 0, D.width, D.height));
      const m = n.current.active ? n.current.x : null, F = n.current.active ? n.current.y : null, p = c.current, b = i.current.shape || "circle", T = 120, j = T * T, _ = i.current.particleSpeed ?? 1, I = i.current.pointerTrackingSpeed ?? 0.06;
      for (let M = 0; M < p.length; M++) {
        const A = p[M];
        A.update(D.width, D.height, m, F, _, I), v.globalAlpha = 1, A.draw(v, b, P);
        for (let E = M + 1; E < p.length; E++) {
          const R = p[E], O = A.x - R.x, Y = A.y - R.y, W = O * O + Y * Y;
          if (W < j) {
            const $ = 1 - Math.sqrt(W) / T;
            v.beginPath(), v.moveTo(A.x, A.y), v.lineTo(R.x, R.y), v.strokeStyle = A.currentColor, v.globalAlpha = $ * 0.5, v.lineWidth = 1, v.stroke();
          }
        }
      }
      if (v.globalAlpha = 1, m !== null && F !== null)
        for (let E = 0; E < p.length; E++) {
          const R = p[E], O = R.x - m, Y = R.y - F, W = O * O + Y * Y;
          if (W < 22500) {
            const $ = 1 - Math.sqrt(W) / 150;
            v.beginPath(), v.moveTo(R.x, R.y), v.lineTo(m, F), v.strokeStyle = R.currentColor, v.globalAlpha = $ * 0.8, v.lineWidth = 1.5, v.stroke();
          }
        }
      v.globalAlpha = 1, x.current = requestAnimationFrame(S);
    };
    return S(), () => {
      d.disconnect(), cancelAnimationFrame(x.current);
    };
  }, [r, e.density]), /* @__PURE__ */ tt.jsxDEV("div", { ref: o, style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }, children: /* @__PURE__ */ tt.jsxDEV("canvas", { ref: s, style: { display: "block", width: "100%", height: "100%" } }, void 0, !1, {
    fileName: "/app/applet/src/components/background/NetParticleEngine.tsx",
    lineNumber: 318,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/applet/src/components/background/NetParticleEngine.tsx",
    lineNumber: 317,
    columnNumber: 5
  }, this);
}
class De {
  constructor(r, o, s, c) {
    w(this, "x", 0);
    w(this, "y", 0);
    w(this, "baseX");
    w(this, "baseY");
    w(this, "vx", 0);
    w(this, "vy", 0);
    w(this, "color");
    w(this, "size");
    w(this, "angle");
    w(this, "dist");
    w(this, "spring");
    w(this, "friction");
    w(this, "targetColor", null);
    w(this, "colorDelay", 0);
    this.baseX = r, this.baseY = o, this.color = s, this.size = c, this.angle = Math.atan2(o, r), this.dist = Math.sqrt(r * r + o * o);
    const x = Math.min(1, this.dist / 350);
    this.spring = 0.15 - x * 0.13, this.friction = 0.85 + x * 0.1;
  }
  update(r, o, s, c) {
    const n = 1 + Math.sin(this.angle * 3 + s * 1.2) * 0.05 + Math.cos(this.angle * 5 - s * 0.6) * 0.03, i = this.dist * c * n, u = Math.cos(this.angle) * i, y = Math.sin(this.angle) * i, f = this.dist * 0.1 * n, l = Math.sin(s * 3 + this.dist * 0.05) * f, h = r + u + Math.cos(this.angle + Math.PI / 2) * l, d = o + y + Math.sin(this.angle + Math.PI / 2) * l, v = h - this.x, P = d - this.y;
    this.vx += v * this.spring, this.vy += P * this.spring, this.vx *= this.friction, this.vy *= this.friction, this.x += this.vx, this.y += this.vy, this.targetColor && (this.colorDelay -= 1, this.colorDelay <= 0 && (this.color = this.targetColor, this.targetColor = null));
  }
  draw(r, o, s) {
    const c = Math.min(1, this.dist / 350), x = 1 + (1 - c) * (s - 1) * 1.5, n = this.size * x;
    r.globalAlpha = Math.max(0.15, 1 - c * 0.7), r.fillStyle = this.color, r.beginPath(), o === "circle" ? r.arc(this.x, this.y, n, 0, Math.PI * 2) : o === "square" ? r.rect(this.x - n, this.y - n, n * 2, n * 2) : r.ellipse(this.x, this.y, n * 1.5, n, 0, 0, Math.PI * 2), r.fill();
  }
}
function Te({ config: e, backgroundColor: r }) {
  const o = z(null), s = z(null), c = z([]), x = z(0), n = z({ x: -1e3, y: -1e3, active: !1 }), i = z({ x: 0, y: 0, initialized: !1, angle: -Math.PI / 2 });
  J(() => {
    const l = (h) => {
      if (!o.current) return;
      const d = o.current.getBoundingClientRect();
      n.current.x = h.clientX - d.left, n.current.y = h.clientY - d.top, n.current.active = !0;
    };
    return window.addEventListener("pointermove", l), () => {
      window.removeEventListener("pointermove", l);
    };
  }, []);
  const u = z(e), y = z(0), f = z(null);
  return J(() => {
    u.current = e;
  }, [e]), J(() => {
    if (f.current && (clearInterval(f.current), f.current = null), !e.colors || e.colors.length === 0) {
      const h = e.color || "#8B5CF6";
      c.current.forEach((d) => {
        d.targetColor = h, d.colorDelay = Math.random() * 20;
      });
      return;
    }
    const l = (h) => {
      c.current.forEach((d) => {
        d.targetColor = h, d.colorDelay = Math.max(0, d.dist * 0.2);
      });
    };
    return e.colorMode === "mixed" ? c.current.forEach((h, d) => {
      h.targetColor = e.colors[d % e.colors.length], h.colorDelay = Math.max(0, h.dist * 0.2) + Math.random() * 10;
    }) : (y.current = 0, l(e.colors[0]), e.colors.length > 1 && (f.current = setInterval(() => {
      const h = e.colors;
      y.current = (y.current + 1) % h.length, l(h[y.current]);
    }, 3e3))), () => {
      f.current && clearInterval(f.current);
    };
  }, [e.colors, e.color, e.colorMode]), J(() => {
    if (!o.current || !s.current) return;
    const l = s.current, h = o.current, d = (m) => {
      for (const F of m) {
        const { width: p, height: b } = F.contentRect, T = window.devicePixelRatio || 1;
        l.width = p * T, l.height = b * T, l.style.width = `${p}px`, l.style.height = `${b}px`;
        const j = l.getContext("2d");
        j && j.scale(T, T), c.current = [];
        const I = Math.floor(350 * (u.current.density ?? 1)), M = u.current.colors, A = u.current.colorMode || "wave";
        for (let E = 0; E < I; E++) {
          const R = Math.random() * Math.PI * 2, O = Math.sqrt(Math.random()) * 350, Y = Math.cos(R) * O, W = Math.sin(R) * O;
          let $;
          if (M && M.length > 0)
            $ = A === "mixed" ? M[E % M.length] : M[0];
          else if (u.current.color)
            $ = u.current.color;
          else {
            const K = 260 + Math.random() * 60, q = 70 + Math.random() * 30, B = 60 + Math.random() * 20;
            $ = `hsl(${K}, ${q}%, ${B}%)`;
          }
          let Z = 2 + Math.random() * 2;
          O > 200 && (Z *= 0.6), O < 80 && (Z *= 1.5);
          const U = new De(Y, W, $, Z);
          U.x = p / 2, U.y = b / 2, c.current.push(U);
        }
      }
    }, v = new ResizeObserver(d);
    v.observe(h);
    const P = l.getContext("2d");
    let S = 0;
    const D = () => {
      const m = h.getBoundingClientRect();
      P.globalCompositeOperation = "source-over", r === "transparent" ? P.clearRect(0, 0, m.width, m.height) : (P.fillStyle = r, P.fillRect(0, 0, m.width, m.height)), i.current.initialized || (i.current.x = m.width / 2, i.current.y = m.height / 2, i.current.initialized = !0);
      let F = m.width / 2, p = m.height / 2;
      const b = n.current.active ? n.current.x : null, T = n.current.active ? n.current.y : null;
      b !== null && T !== null && (F = b, p = T);
      const j = F - i.current.x, _ = p - i.current.y, I = Math.sqrt(j * j + _ * _);
      let M = 0, A = 0;
      I > 1 ? (M = j / I, A = _ / I, i.current.angle = Math.atan2(A, M)) : (M = Math.cos(i.current.angle), A = Math.sin(i.current.angle));
      const E = u.current.particleSpeed ?? 1;
      S += 0.02 * E;
      const R = S % 4;
      let O = 1, Y = 1, W = 0;
      if (R < 1) {
        const B = R;
        O = 1 - Math.sin(B * Math.PI) * 0.3, Y = 1 + Math.sin(B * Math.PI) * 0.15, W = Math.sin(B * Math.PI) * 12;
      } else {
        const B = (R - 1) / 3;
        O = 0.7 + 0.3 * Math.sin(B * Math.PI / 2), Y = 1, W = 0;
      }
      const $ = u.current.pointerTrackingSpeed ?? 0.02;
      i.current.x += j * $, i.current.y += _ * $, i.current.x += M * W * E, i.current.y += A * W * E;
      const U = 200 * (Y + (R < 1 ? R * 0.15 : 0)), K = P.createRadialGradient(
        i.current.x,
        i.current.y,
        0,
        i.current.x,
        i.current.y,
        U
      );
      K.addColorStop(0, "rgba(80, 150, 255, 0.05)"), K.addColorStop(1, "rgba(80, 150, 255, 0)"), P.fillStyle = K, P.beginPath(), P.arc(i.current.x, i.current.y, U, 0, Math.PI * 2), P.fill();
      const q = c.current;
      P.globalCompositeOperation = "source-over";
      for (const B of q) {
        B.update(i.current.x, i.current.y, S, O);
        const at = u.current.shape || "circle";
        B.draw(P, at, Y);
      }
      x.current = requestAnimationFrame(D);
    };
    return D(), () => {
      v.disconnect(), cancelAnimationFrame(x.current);
    };
  }, [r, e.density]), /* @__PURE__ */ tt.jsxDEV(
    "div",
    {
      ref: o,
      style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" },
      children: /* @__PURE__ */ tt.jsxDEV(
        "canvas",
        {
          ref: s,
          style: { display: "block", width: "100%", height: "100%", pointerEvents: "none" }
        },
        void 0,
        !1,
        {
          fileName: "/app/applet/src/components/background/JellyfishParticleEngine.tsx",
          lineNumber: 360,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "/app/applet/src/components/background/JellyfishParticleEngine.tsx",
      lineNumber: 356,
      columnNumber: 5
    },
    this
  );
}
const _e = {
  position: "relative",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "1rem",
  overflow: "hidden",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  transition: "all 300ms ease-out"
};
function Oe({
  children: e,
  width: r = "100%",
  height: o = "60vh",
  backgroundColor: s = "#050505",
  className: c = "",
  style: x,
  background: n = { name: "NONE" }
}) {
  return /* @__PURE__ */ tt.jsxDEV(
    "div",
    {
      className: c,
      style: { ..._e, width: r, height: o, backgroundColor: s, ...x },
      children: [
        n.name === "FOLLOW_POINTER" && /* @__PURE__ */ tt.jsxDEV(Ce, { config: n, backgroundColor: s }, void 0, !1, {
          fileName: "/app/applet/src/components/ParticleCanvas.tsx",
          lineNumber: 41,
          columnNumber: 9
        }, this),
        n.name === "NET" && /* @__PURE__ */ tt.jsxDEV(Se, { config: n, backgroundColor: s }, void 0, !1, {
          fileName: "/app/applet/src/components/ParticleCanvas.tsx",
          lineNumber: 44,
          columnNumber: 9
        }, this),
        n.name === "JELLYFISH" && /* @__PURE__ */ tt.jsxDEV(Te, { config: n, backgroundColor: s }, void 0, !1, {
          fileName: "/app/applet/src/components/ParticleCanvas.tsx",
          lineNumber: 47,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ tt.jsxDEV("div", { style: { position: "relative", zIndex: 10, width: "100%", height: "100%" }, children: e }, void 0, !1, {
          fileName: "/app/applet/src/components/ParticleCanvas.tsx",
          lineNumber: 49,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "/app/applet/src/components/ParticleCanvas.tsx",
      lineNumber: 36,
      columnNumber: 5
    },
    this
  );
}
function Ie(e) {
  const r = z({ x: -1e3, y: -1e3, isDown: !1, active: !1 });
  return J(() => {
    const o = e.current;
    if (!o) return;
    const s = (i) => {
      const u = o.getBoundingClientRect();
      r.current.x = i.clientX - u.left, r.current.y = i.clientY - u.top, r.current.active = !0;
    }, c = () => {
      r.current.active = !1;
    }, x = () => {
      r.current.isDown = !0;
    }, n = () => {
      r.current.isDown = !1;
    };
    return o.addEventListener("pointermove", s), o.addEventListener("pointerleave", c), o.addEventListener("pointerdown", x), o.addEventListener("pointerup", n), o.style.touchAction = "none", () => {
      o.removeEventListener("pointermove", s), o.removeEventListener("pointerleave", c), o.removeEventListener("pointerdown", x), o.removeEventListener("pointerup", n);
    };
  }, [e]), r;
}
function Fe(e, r, o, s, c, x, n, i, u) {
  if (c === null || x === null || !i && u === "none")
    return { x: o, y: s };
  let y = o, f = s;
  const l = c - e, h = x - r, d = l * l + h * h, v = Math.sqrt(d);
  if (i && !n && d < 3e4) {
    const S = (3e4 - d) / 3e4;
    y += l * S * 0.15, f += h * S * 0.15;
  }
  if (n && u !== "none") {
    if (u === "attract") {
      if (d < 3e4) {
        const S = (3e4 - d) / 3e4;
        y += l * S * 0.8, f += h * S * 0.8;
      }
    } else if (u === "repel" && d < 5e4 && v > 0) {
      const S = Math.pow(Math.max(0, 5e4 - d) / 5e4, 1.2);
      y -= l / v * S * 400, f -= h / v * S * 400;
    }
  }
  return { x: y, y: f };
}
class Lt {
  constructor(r, o, s = "255, 255, 255") {
    w(this, "x");
    w(this, "y");
    w(this, "vx");
    w(this, "vy");
    w(this, "targetX");
    w(this, "targetY");
    w(this, "baseColor");
    w(this, "opacity");
    w(this, "size");
    w(this, "sizeMultiplier");
    w(this, "friction");
    w(this, "ease");
    w(this, "easeMultiplier");
    w(this, "floatSpeed");
    w(this, "floatOffset");
    w(this, "randomSpeed");
    this.x = Math.random() * r, this.y = Math.random() * o, this.targetX = this.x, this.targetY = this.y, this.vx = 0, this.vy = 0, this.size = Math.random() * 1.8 + 0.5, this.sizeMultiplier = 1, this.baseColor = Array.isArray(s) ? s[Math.floor(Math.random() * s.length)] : s, this.opacity = 0.4 + Math.random() * 0.6, this.friction = 0.82 + Math.random() * 0.1, this.ease = 0.03 + Math.random() * 0.05, this.easeMultiplier = 1, this.floatSpeed = Math.random() * 0.02 + 5e-3, this.floatOffset = Math.random() * Math.PI * 2, this.randomSpeed = Math.random();
  }
  update(r, o, s = null, c = null, x = !1, n = !0, i = "none") {
    const { x: u, y } = Fe(
      this.x,
      this.y,
      this.targetX,
      this.targetY,
      s,
      c,
      x,
      n,
      i
    ), f = u - this.x, l = y - this.y, h = o ? 0 : Math.cos(r * 0.01 + this.y * 0.01) * 0.5, d = o ? 0 : Math.sin(r * 0.01 + this.x * 0.01) * 0.5;
    this.vx += f * (this.ease * this.easeMultiplier) + h, this.vy += l * (this.ease * this.easeMultiplier) + d, this.vx *= this.friction, this.vy *= this.friction, this.x += this.vx, this.y += this.vy;
    const v = o ? 0.2 : 2;
    this.x += Math.cos(r * this.floatSpeed + this.floatOffset) * v, this.y += Math.sin(r * this.floatSpeed + this.floatOffset) * v;
  }
  draw(r, o = "circle", s = 0) {
    r.fillStyle = `rgba(${this.baseColor}, ${this.opacity})`;
    const c = Math.max(0.1, this.size * this.sizeMultiplier);
    if (o === "square")
      r.fillRect(this.x - c, this.y - c, c * 2, c * 2);
    else if (o === "bean") {
      const x = 6 + this.size * 2 * this.sizeMultiplier, n = Math.sin(s * 0.05 + this.x * 0.01 + this.randomSpeed * 5), i = 0.4 + 0.6 * ((n + 1) / 2), u = x * 0.5 * i, y = Math.max(0.8, c * 1.5 * (0.8 + 0.2 * n)), f = this.vx !== 0 || this.vy !== 0 ? Math.atan2(this.vy, this.vx) : 0;
      r.beginPath(), r.ellipse(this.x, this.y, u, y, f, 0, Math.PI * 2), r.fill();
    } else
      r.beginPath(), r.arc(this.x, this.y, c, 0, Math.PI * 2), r.fill();
  }
}
function $t(e, r, o) {
  if (r <= 0 || o <= 0) return [];
  const s = Math.floor(r), c = Math.floor(o), x = document.createElement("canvas");
  x.width = s, x.height = c;
  const n = x.getContext("2d", { willReadFrequently: !0 });
  if (!n) return [];
  n.clearRect(0, 0, s, c);
  const i = Array.isArray(e), u = i ? e : [e];
  if (u.length === 0 || u.every((m) => !m)) return [];
  let y = Math.min(s, c) * (i ? 0.4 : 0.65);
  n.font = `bold ${y}px "Georgia", serif`;
  let f = 0;
  u.forEach((m) => {
    const F = n.measureText(m);
    F.width > f && (f = F.width);
  }), f > s * 0.9 && (y = y * (s * 0.9) / f);
  const h = y * 1.2 * u.length;
  h > c * 0.8 && (y = y * (c * 0.8) / h), n.font = `bold ${y}px "Georgia", serif`, n.fillStyle = "white", n.textAlign = "center", n.textBaseline = "middle";
  const d = (c - y * 1.2 * (u.length - 1)) / (i ? 2 : 2.05);
  u.forEach((m, F) => {
    n.fillText(m, s / 2, d + F * y * 1.2);
  });
  const P = n.getImageData(0, 0, s, c).data, S = [], D = Math.max(2, Math.floor(y / (i ? 30 : 40)));
  for (let m = 0; m < c; m += D)
    for (let F = 0; F < s; F += D) {
      const p = (m * s + F) * 4, b = P[p + 3];
      Math.random() * 255 < b && S.push({
        x: F + (Math.random() - 0.5) * D,
        y: m + (Math.random() - 0.5) * D
      });
    }
  return S;
}
function Ye(e, r, o) {
  const s = z(e);
  return J(() => {
    s.current = e;
  }, [e]), { getPixelsForText: $t, updateTextTargets: (x, n, i) => {
    var m, F;
    const u = n || ((m = o.current) == null ? void 0 : m.offsetWidth) || window.innerWidth, y = i || ((F = o.current) == null ? void 0 : F.offsetHeight) || window.innerHeight;
    if (Array.isArray(x) ? x.length === 0 || x.every((p) => !p) : !x) {
      r.current.forEach((b) => {
        const T = 50 + Math.random() * (u - 100), j = 50 + Math.random() * (y - 100);
        (Math.abs(T - b.x) > 20 || Math.abs(j - b.y) > 20) && (b.vx += (Math.random() - 0.5) * 20, b.vy += (Math.random() - 0.5) * 20), b.targetX = T, b.targetY = j;
      });
      return;
    }
    const l = $t(x, u, y);
    if (l.length === 0) return;
    const h = u * 0.15, d = l.map((p) => ({ pt: p, key: p.x + (Math.random() - 0.5) * h }));
    d.sort((p, b) => p.key - b.key);
    const v = d.map((p) => p.pt), P = r.current.map((p, b) => ({ i: b, key: p.x + (Math.random() - 0.5) * h }));
    P.sort((p, b) => p.key - b.key);
    const S = P.map((p) => p.i), D = Math.ceil(Math.sqrt(S.length));
    for (let p = 0; p < S.length; p += D) {
      const b = Math.min(p + D, S.length), T = S.slice(p, b), j = [];
      for (let _ = p; _ < b; _++) {
        const I = Math.floor(_ / S.length * v.length);
        j.push(v[I]);
      }
      T.sort((_, I) => r.current[_].y - r.current[I].y), j.sort((_, I) => _.y - I.y);
      for (let _ = 0; _ < T.length; _++) {
        const I = T[_], M = r.current[I], A = j[_], E = A.x - M.x, R = A.y - M.y;
        if (Math.abs(E) > 20 || Math.abs(R) > 20) {
          M.vx += (Math.random() - 0.5) * 20, M.vy += (Math.random() - 0.5) * 20;
          const O = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10 + 5);
          M.vx += Math.sign(R) * O, M.vy -= Math.sign(E) * O;
        }
        M.targetX = A.x, M.targetY = A.y;
      }
    }
  }, textRef: s };
}
const Et = (e) => {
  if (!e || typeof e != "string") return "0, 0, 0";
  try {
    let r = 0, o = 0, s = 0;
    if (e.length === 4)
      r = parseInt(e[1] + e[1], 16), o = parseInt(e[2] + e[2], 16), s = parseInt(e[3] + e[3], 16);
    else if (e.length === 7)
      r = parseInt(e.substring(1, 3), 16), o = parseInt(e.substring(3, 5), 16), s = parseInt(e.substring(5, 7), 16);
    else
      return e;
    return `${r}, ${o}, ${s}`;
  } catch {
    return "0, 0, 0";
  }
};
function je({
  text: e,
  particleColor: r = "255, 255, 255",
  particleSize: o = 1,
  particleDensity: s = 1,
  particleEase: c = 1,
  isMagnet: x = !0,
  clickMode: n = "none",
  particleShape: i = "circle",
  backgroundColor: u = "#050505"
}) {
  const y = z(null), f = z(null), l = z([]), h = z(0), d = z(0), v = Ie(f), P = z({ isMagnet: x, clickMode: n, particleShape: i, backgroundColor: u });
  P.current = { isMagnet: x, clickMode: n, particleShape: i, backgroundColor: u };
  const { updateTextTargets: S, textRef: D } = Ye(
    e,
    l,
    f
  ), m = () => Array.isArray(r) ? r.map((p) => Et(p)) : Et(r), F = (p, b, T = 1) => {
    const j = window.innerWidth < 600 ? 1500 : 3e3, _ = Math.floor(j * T), I = [], M = m();
    for (let A = 0; A < _; A++) {
      const E = new Lt(p, b, M);
      E.sizeMultiplier = o, E.easeMultiplier = c, I.push(E);
    }
    l.current = I;
  };
  return J(() => {
    if (l.current.length > 0) {
      const p = m();
      l.current.forEach((b) => {
        b.baseColor = Array.isArray(p) ? p[Math.floor(Math.random() * p.length)] : p;
      });
    }
  }, [r]), J(() => {
    l.current.length > 0 && l.current.forEach((p) => {
      p.sizeMultiplier = o;
    });
  }, [o]), J(() => {
    l.current.length > 0 && l.current.forEach((p) => {
      p.easeMultiplier = c;
    });
  }, [c]), J(() => {
    if (l.current.length > 0 && y.current && f.current) {
      const p = window.innerWidth < 600 ? 1500 : 3e3, b = Math.floor(p * s), T = l.current.length;
      if (b > T) {
        const j = f.current.getBoundingClientRect(), _ = m();
        for (let I = 0; I < b - T; I++) {
          const M = new Lt(j.width, j.height, _);
          M.sizeMultiplier = o, l.current.push(M);
        }
        S(e);
      } else b < T && l.current.splice(b);
    }
  }, [s]), J(() => {
    const p = f.current, b = y.current;
    if (!p || !b) return;
    const T = (M) => {
      for (const A of M) {
        const { width: E, height: R } = A.contentRect, O = window.devicePixelRatio || 1;
        b.width = E * O, b.height = R * O, b.style.width = `${E}px`, b.style.height = `${R}px`;
        const Y = b.getContext("2d");
        Y && Y.scale(O, O), l.current.length === 0 && F(E, R, s), S(D.current, E, R);
      }
    }, j = new ResizeObserver(T);
    j.observe(p), "fonts" in document && document.fonts.ready.then(() => {
      f.current && S(
        D.current,
        f.current.offsetWidth,
        f.current.offsetHeight
      );
    });
    const _ = b.getContext("2d"), I = () => {
      d.current++;
      const M = p.getBoundingClientRect(), { isMagnet: A, clickMode: E, particleShape: R, backgroundColor: O } = P.current;
      if (O === "transparent")
        _.clearRect(0, 0, M.width, M.height), _.globalCompositeOperation = "source-over";
      else {
        const q = Et(O);
        _.fillStyle = `rgba(${q}, 0.25)`, _.fillRect(0, 0, M.width, M.height), _.globalCompositeOperation = "screen";
      }
      const Y = D.current, $ = !(Array.isArray(Y) ? Y.length === 0 || Y.every((q) => !q) : !Y), Z = v.current.active ? v.current.x : null, U = v.current.active ? v.current.y : null, K = v.current.isDown;
      for (let q = 0; q < l.current.length; q++) {
        const B = l.current[q];
        B.update(d.current, !!$, Z, U, K, A, E), B.draw(_, R, d.current);
      }
      _.globalCompositeOperation = "source-over", h.current = requestAnimationFrame(I);
    };
    return I(), () => {
      j.disconnect(), cancelAnimationFrame(h.current);
    };
  }, []), J(() => {
    S(e);
  }, [e]), /* @__PURE__ */ tt.jsxDEV(
    "div",
    {
      ref: f,
      style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" },
      children: /* @__PURE__ */ tt.jsxDEV(
        "canvas",
        {
          ref: y,
          style: { display: "block", width: "100%", height: "100%" }
        },
        void 0,
        !1,
        {
          fileName: "/app/applet/src/components/text/TextParticleEngine.tsx",
          lineNumber: 235,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "/app/applet/src/components/text/TextParticleEngine.tsx",
      lineNumber: 231,
      columnNumber: 5
    },
    this
  );
}
function ke({
  name: e = "FOLLOW_POINTER",
  config: r,
  width: o = "100%",
  height: s = "60vh",
  backgroundColor: c = "#050505",
  className: x = "",
  style: n
}) {
  const i = {
    name: e,
    shape: "bean",
    orientation: "vertical",
    ...r
  };
  return /* @__PURE__ */ tt.jsxDEV(
    Oe,
    {
      width: o,
      height: s,
      backgroundColor: c,
      className: x,
      style: n,
      background: i
    },
    void 0,
    !1,
    {
      fileName: "/app/applet/src/components/background/ParticleBackground.tsx",
      lineNumber: 32,
      columnNumber: 5
    },
    this
  );
}
export {
  ke as ParticleBackground,
  Oe as ParticleCanvas,
  je as TextParticleEngine,
  Fe as getMagnetTarget,
  Ie as useParticleInteraction,
  Ye as useTextParticles
};
