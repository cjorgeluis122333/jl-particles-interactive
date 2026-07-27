var ve = Object.defineProperty;
var me = (e, r, o) => r in e ? ve(e, r, { enumerable: !0, configurable: !0, writable: !0, value: o }) : e[r] = o;
var M = (e, r, o) => me(e, typeof r != "symbol" ? r + "" : r, o);
import pe, { useRef as j, useEffect as J } from "react";
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
var zt;
function ge() {
  if (zt) return ft;
  zt = 1;
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
var At;
function ye() {
  return At || (At = 1, process.env.NODE_ENV !== "production" && (function() {
    var e = pe, r = Symbol.for("react.element"), o = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), g = Symbol.for("react.profiler"), n = Symbol.for("react.provider"), s = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), l = Symbol.for("react.memo"), u = Symbol.for("react.lazy"), h = Symbol.for("react.offscreen"), f = Symbol.iterator, E = "@@iterator";
    function _(t) {
      if (t === null || typeof t != "object")
        return null;
      var a = f && t[f] || t[E];
      return typeof a == "function" ? a : null;
    }
    var N = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function x(t) {
      {
        for (var a = arguments.length, m = new Array(a > 1 ? a - 1 : 0), P = 1; P < a; P++)
          m[P - 1] = arguments[P];
        S("error", t, m);
      }
    }
    function S(t, a, m) {
      {
        var P = N.ReactDebugCurrentFrame, X = P.getStackAddendum();
        X !== "" && (a += "%s", m = m.concat([X]));
        var L = m.map(function(Y) {
          return String(Y);
        });
        L.unshift("Warning: " + a), Function.prototype.apply.call(console[t], console, L);
      }
    }
    var p = !1, C = !1, D = !1, T = !1, k = !1, O;
    O = Symbol.for("react.module.reference");
    function R(t) {
      return !!(typeof t == "string" || typeof t == "function" || t === i || t === g || k || t === c || t === y || t === v || T || t === h || p || C || D || typeof t == "object" && t !== null && (t.$$typeof === u || t.$$typeof === l || t.$$typeof === n || t.$$typeof === s || t.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      t.$$typeof === O || t.getModuleId !== void 0));
    }
    function z(t, a, m) {
      var P = t.displayName;
      if (P)
        return P;
      var X = a.displayName || a.name || "";
      return X !== "" ? m + "(" + X + ")" : m;
    }
    function w(t) {
      return t.displayName || "Context";
    }
    function b(t) {
      if (t == null)
        return null;
      if (typeof t.tag == "number" && x("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof t == "function")
        return t.displayName || t.name || null;
      if (typeof t == "string")
        return t;
      switch (t) {
        case i:
          return "Fragment";
        case o:
          return "Portal";
        case g:
          return "Profiler";
        case c:
          return "StrictMode";
        case y:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case s:
            var a = t;
            return w(a) + ".Consumer";
          case n:
            var m = t;
            return w(m._context) + ".Provider";
          case d:
            return z(t, t.render, "ForwardRef");
          case l:
            var P = t.displayName || null;
            return P !== null ? P : b(t.type) || "Memo";
          case u: {
            var X = t, L = X._payload, Y = X._init;
            try {
              return b(Y(L));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var I = Object.assign, A = 0, q, $, G, W, H, tt, U;
    function at() {
    }
    at.__reactDisabledLog = !0;
    function qt() {
      {
        if (A === 0) {
          q = console.log, $ = console.info, G = console.warn, W = console.error, H = console.group, tt = console.groupCollapsed, U = console.groupEnd;
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
        A++;
      }
    }
    function Wt() {
      {
        if (A--, A === 0) {
          var t = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: I({}, t, {
              value: q
            }),
            info: I({}, t, {
              value: $
            }),
            warn: I({}, t, {
              value: G
            }),
            error: I({}, t, {
              value: W
            }),
            group: I({}, t, {
              value: H
            }),
            groupCollapsed: I({}, t, {
              value: tt
            }),
            groupEnd: I({}, t, {
              value: U
            })
          });
        }
        A < 0 && x("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var mt = N.ReactCurrentDispatcher, pt;
    function ct(t, a, m) {
      {
        if (pt === void 0)
          try {
            throw Error();
          } catch (X) {
            var P = X.stack.trim().match(/\n( *(at )?)/);
            pt = P && P[1] || "";
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
        var m = lt.get(t);
        if (m !== void 0)
          return m;
      }
      var P;
      gt = !0;
      var X = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var L;
      L = mt.current, mt.current = null, qt();
      try {
        if (a) {
          var Y = function() {
            throw Error();
          };
          if (Object.defineProperty(Y.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(Y, []);
            } catch (Z) {
              P = Z;
            }
            Reflect.construct(t, [], Y);
          } else {
            try {
              Y.call();
            } catch (Z) {
              P = Z;
            }
            t.call(Y.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Z) {
            P = Z;
          }
          t();
        }
      } catch (Z) {
        if (Z && P && typeof Z.stack == "string") {
          for (var F = Z.stack.split(`
`), K = P.stack.split(`
`), B = F.length - 1, V = K.length - 1; B >= 1 && V >= 0 && F[B] !== K[V]; )
            V--;
          for (; B >= 1 && V >= 0; B--, V--)
            if (F[B] !== K[V]) {
              if (B !== 1 || V !== 1)
                do
                  if (B--, V--, V < 0 || F[B] !== K[V]) {
                    var et = `
` + F[B].replace(" at new ", " at ");
                    return t.displayName && et.includes("<anonymous>") && (et = et.replace("<anonymous>", t.displayName)), typeof t == "function" && lt.set(t, et), et;
                  }
                while (B >= 1 && V >= 0);
              break;
            }
        }
      } finally {
        gt = !1, mt.current = L, Wt(), Error.prepareStackTrace = X;
      }
      var ot = t ? t.displayName || t.name : "", rt = ot ? ct(ot) : "";
      return typeof t == "function" && lt.set(t, rt), rt;
    }
    function Vt(t, a, m) {
      return Ct(t, !1);
    }
    function Jt(t) {
      var a = t.prototype;
      return !!(a && a.isReactComponent);
    }
    function ut(t, a, m) {
      if (t == null)
        return "";
      if (typeof t == "function")
        return Ct(t, Jt(t));
      if (typeof t == "string")
        return ct(t);
      switch (t) {
        case y:
          return ct("Suspense");
        case v:
          return ct("SuspenseList");
      }
      if (typeof t == "object")
        switch (t.$$typeof) {
          case d:
            return Vt(t.render);
          case l:
            return ut(t.type, a, m);
          case u: {
            var P = t, X = P._payload, L = P._init;
            try {
              return ut(L(X), a, m);
            } catch {
            }
          }
        }
      return "";
    }
    var st = Object.prototype.hasOwnProperty, Pt = {}, St = N.ReactDebugCurrentFrame;
    function ht(t) {
      if (t) {
        var a = t._owner, m = ut(t.type, t._source, a ? a.type : null);
        St.setExtraStackFrame(m);
      } else
        St.setExtraStackFrame(null);
    }
    function Ut(t, a, m, P, X) {
      {
        var L = Function.call.bind(st);
        for (var Y in t)
          if (L(t, Y)) {
            var F = void 0;
            try {
              if (typeof t[Y] != "function") {
                var K = Error((P || "React class") + ": " + m + " type `" + Y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof t[Y] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw K.name = "Invariant Violation", K;
              }
              F = t[Y](a, Y, P, m, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (B) {
              F = B;
            }
            F && !(F instanceof Error) && (ht(X), x("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", P || "React class", m, Y, typeof F), ht(null)), F instanceof Error && !(F.message in Pt) && (Pt[F.message] = !0, ht(X), x("Failed %s type: %s", m, F.message), ht(null));
          }
      }
    }
    var Ht = Array.isArray;
    function yt(t) {
      return Ht(t);
    }
    function Kt(t) {
      {
        var a = typeof Symbol == "function" && Symbol.toStringTag, m = a && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return m;
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
        return x("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Kt(t)), Dt(t);
    }
    var it = N.ReactCurrentOwner, Zt = {
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
        var m = b(it.current.type);
        xt[m] || (x('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', b(it.current.type), t.ref), xt[m] = !0);
      }
    }
    function re(t, a) {
      {
        var m = function() {
          _t || (_t = !0, x("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", a));
        };
        m.isReactWarning = !0, Object.defineProperty(t, "key", {
          get: m,
          configurable: !0
        });
      }
    }
    function ne(t, a) {
      {
        var m = function() {
          Ot || (Ot = !0, x("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", a));
        };
        m.isReactWarning = !0, Object.defineProperty(t, "ref", {
          get: m,
          configurable: !0
        });
      }
    }
    var oe = function(t, a, m, P, X, L, Y) {
      var F = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: t,
        key: a,
        ref: m,
        props: Y,
        // Record the component responsible for creating this element.
        _owner: L
      };
      return F._store = {}, Object.defineProperty(F._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(F, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: P
      }), Object.defineProperty(F, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: X
      }), Object.freeze && (Object.freeze(F.props), Object.freeze(F)), F;
    };
    function se(t, a, m, P, X) {
      {
        var L, Y = {}, F = null, K = null;
        m !== void 0 && (Tt(m), F = "" + m), te(a) && (Tt(a.key), F = "" + a.key), Qt(a) && (K = a.ref, ee(a, X));
        for (L in a)
          st.call(a, L) && !Zt.hasOwnProperty(L) && (Y[L] = a[L]);
        if (t && t.defaultProps) {
          var B = t.defaultProps;
          for (L in B)
            Y[L] === void 0 && (Y[L] = B[L]);
        }
        if (F || K) {
          var V = typeof t == "function" ? t.displayName || t.name || "Unknown" : t;
          F && re(Y, V), K && ne(Y, V);
        }
        return oe(t, F, K, X, P, it.current, Y);
      }
    }
    var bt = N.ReactCurrentOwner, It = N.ReactDebugCurrentFrame;
    function nt(t) {
      if (t) {
        var a = t._owner, m = ut(t.type, t._source, a ? a.type : null);
        It.setExtraStackFrame(m);
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
          var t = b(bt.current.type);
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
          var a = t.fileName.replace(/^.*[\\\/]/, ""), m = t.lineNumber;
          return `

Check your code at ` + a + ":" + m + ".";
        }
        return "";
      }
    }
    var Nt = {};
    function ae(t) {
      {
        var a = Ft();
        if (!a) {
          var m = typeof t == "string" ? t : t.displayName || t.name;
          m && (a = `

Check the top-level render call using <` + m + ">.");
        }
        return a;
      }
    }
    function Yt(t, a) {
      {
        if (!t._store || t._store.validated || t.key != null)
          return;
        t._store.validated = !0;
        var m = ae(a);
        if (Nt[m])
          return;
        Nt[m] = !0;
        var P = "";
        t && t._owner && t._owner !== bt.current && (P = " It was passed a child from " + b(t._owner.type) + "."), nt(t), x('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', m, P), nt(null);
      }
    }
    function jt(t, a) {
      {
        if (typeof t != "object")
          return;
        if (yt(t))
          for (var m = 0; m < t.length; m++) {
            var P = t[m];
            Rt(P) && Yt(P, a);
          }
        else if (Rt(t))
          t._store && (t._store.validated = !0);
        else if (t) {
          var X = _(t);
          if (typeof X == "function" && X !== t.entries)
            for (var L = X.call(t), Y; !(Y = L.next()).done; )
              Rt(Y.value) && Yt(Y.value, a);
        }
      }
    }
    function ce(t) {
      {
        var a = t.type;
        if (a == null || typeof a == "string")
          return;
        var m;
        if (typeof a == "function")
          m = a.propTypes;
        else if (typeof a == "object" && (a.$$typeof === d || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        a.$$typeof === l))
          m = a.propTypes;
        else
          return;
        if (m) {
          var P = b(a);
          Ut(m, t.props, "prop", P, t);
        } else if (a.PropTypes !== void 0 && !Mt) {
          Mt = !0;
          var X = b(a);
          x("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", X || "Unknown");
        }
        typeof a.getDefaultProps == "function" && !a.getDefaultProps.isReactClassApproved && x("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function le(t) {
      {
        for (var a = Object.keys(t.props), m = 0; m < a.length; m++) {
          var P = a[m];
          if (P !== "children" && P !== "key") {
            nt(t), x("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", P), nt(null);
            break;
          }
        }
        t.ref !== null && (nt(t), x("Invalid attribute `ref` supplied to `React.Fragment`."), nt(null));
      }
    }
    var kt = {};
    function ue(t, a, m, P, X, L) {
      {
        var Y = R(t);
        if (!Y) {
          var F = "";
          (t === void 0 || typeof t == "object" && t !== null && Object.keys(t).length === 0) && (F += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var K = ie(X);
          K ? F += K : F += Ft();
          var B;
          t === null ? B = "null" : yt(t) ? B = "array" : t !== void 0 && t.$$typeof === r ? (B = "<" + (b(t.type) || "Unknown") + " />", F = " Did you accidentally export a JSX literal instead of a component?") : B = typeof t, x("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", B, F);
        }
        var V = se(t, a, m, X, L);
        if (V == null)
          return V;
        if (Y) {
          var et = a.children;
          if (et !== void 0)
            if (P)
              if (yt(et)) {
                for (var ot = 0; ot < et.length; ot++)
                  jt(et[ot], t);
                Object.freeze && Object.freeze(et);
              } else
                x("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              jt(et, t);
        }
        if (st.call(a, "key")) {
          var rt = b(t), Z = Object.keys(a).filter(function(fe) {
            return fe !== "key";
          }), wt = Z.length > 0 ? "{key: someKey, " + Z.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!kt[rt + wt]) {
            var de = Z.length > 0 ? "{" + Z.join(": ..., ") + ": ...}" : "{}";
            x(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, wt, rt, de, rt), kt[rt + wt] = !0;
          }
        }
        return t === i ? le(V) : ce(V), V;
      }
    }
    var he = ue;
    vt.Fragment = i, vt.jsxDEV = he;
  })()), vt;
}
var Xt;
function xe() {
  return Xt || (Xt = 1, process.env.NODE_ENV === "production" ? dt.exports = ge() : dt.exports = ye()), dt.exports;
}
var Q = xe();
function be(e, r, o, i) {
  let c = r + e.baseX, g = o + e.baseY;
  c += Math.sin(i * e.randomSpeed + e.baseY * 0.05) * 15 * e.z, g += Math.cos(i * e.randomSpeed + e.baseX * 0.05) * 15 * e.z;
  const n = c - e.x, s = g - e.y, d = n * 0.06, y = s * 0.06;
  return { forceX: d, forceY: y };
}
function Me(e, r, o, i, c, g) {
  const n = i, s = c, d = e.x - n, y = e.y - s, v = Math.max(Math.sqrt(d * d + y * y), 1);
  let l = 0, u = 0;
  const f = Math.sin(v * 0.02 - g * 3) * 2.5 * e.z;
  l += d / v * f, u += y / v * f;
  const _ = Math.cos(v * 0.01 - g * 1 + e.randomSpeed) * 0.8 * e.z, N = -y / v, x = d / v;
  return l += N * _, u += x * _, { forceX: l, forceY: u, dxCenter: d, dyCenter: y, distToCenter: v };
}
function Re(e, r) {
  let c = Math.min(r / 400, 1) * 2.5 + e.sizeBias * 1;
  c < 0.4 && (c = 0), e.scale += (c - e.scale) * 0.15;
}
function we(e, r, o, i, c, g) {
  let n = 0, s = 0;
  c === "horizontal" ? (n = 1, s = 0) : c === "diagonal" ? (n = -r / i, s = -o / i) : (n = -o / i, s = r / i);
  const d = Math.atan2(s, n), y = e.sizeBias > 0.3 ? 1 : 0, v = Math.max(0, Math.sin(g * 0.5 + e.randomSpeed * 10)), l = Math.sin(g * 3 + e.baseX * 0.1 + e.randomSpeed) * 0.5 * v * y;
  n = Math.cos(d + l), s = Math.sin(d + l);
  const u = Math.max(1 - i / 400, 0.1);
  c === "horizontal" ? (e.dirX = e.dirX * (1 - 0.2) + n * 0.2, e.dirY = e.dirY * (1 - 0.2) + s * 0.2) : (e.dirX = e.dirX * (1 - u * 0.3) + n * u * 0.3, e.dirY = e.dirY * (1 - u * 0.3) + s * u * 0.3);
  const h = Math.sqrt(e.dirX * e.dirX + e.dirY * e.dirY);
  h > 0 && (e.dirX /= h, e.dirY /= h);
}
class Ee {
  constructor(r, o, i) {
    M(this, "x");
    M(this, "y");
    M(this, "baseX");
    // Relative X to swarm center
    M(this, "baseY");
    // Relative Y to swarm center
    M(this, "z");
    M(this, "vx");
    M(this, "vy");
    M(this, "color");
    M(this, "targetColor", null);
    M(this, "colorDelay", 0);
    M(this, "angleTarget");
    M(this, "randomSpeed");
    M(this, "sizeBias");
    M(this, "scale");
    M(this, "dirX");
    M(this, "dirY");
    M(this, "initialized", !1);
    this.x = r, this.y = o, this.baseX = r, this.baseY = o, this.z = Math.random() * 1.5 + 0.2, this.vx = 0, this.vy = 0, this.color = i, this.angleTarget = Math.random() * Math.PI * 2, this.randomSpeed = Math.random() * 2 + 1, this.sizeBias = Math.random(), this.scale = 1, this.dirX = Math.cos(this.angleTarget), this.dirY = Math.sin(this.angleTarget);
  }
  update(r, o, i, c, g, n, s, d = "vertical") {
    this.initialized || (this.x = i + this.baseX, this.y = c + this.baseY, this.initialized = !0);
    const {
      forceX: y,
      forceY: v,
      dxCenter: l,
      dyCenter: u,
      distToCenter: h
    } = Me(this, r, o, i, c, s), {
      forceX: f,
      forceY: E
    } = be(this, i, c, s);
    this.vx += y + f, this.vy += v + E, this.vx *= 0.75, this.vy *= 0.75, this.x += this.vx, this.y += this.vy, Re(this, h), we(this, l, u, h, d, s), this.targetColor && (this.colorDelay -= 1, this.colorDelay <= 0 && (this.color = this.targetColor, this.targetColor = null));
  }
  draw(r, o, i = "bean") {
    if (this.scale <= 0.05) return;
    r.fillStyle = this.color;
    const c = Math.sqrt(this.baseX * this.baseX + this.baseY * this.baseY), g = Math.max(0, 1 - c / 350);
    if (r.globalAlpha = Math.min(1, (0.5 + this.z * 0.5) * Math.min(this.scale, 1) * g), !(r.globalAlpha <= 0.01))
      if (i === "circle") {
        const n = Math.max(0.1, 2 * this.scale * this.z);
        r.beginPath(), r.arc(this.x, this.y, n, 0, Math.PI * 2), r.fill();
      } else if (i === "square") {
        const n = Math.max(0.1, 2 * this.scale * this.z);
        r.fillRect(this.x - n, this.y - n, n * 2, n * 2);
      } else {
        const s = (6 + this.sizeBias * 6) * this.scale, d = Math.sin(o * 3.5 + this.baseX * 0.1 + this.randomSpeed * 5), y = 0.4 + 0.6 * ((d + 1) / 2), v = s * 0.5 * y, l = Math.max(0.8, this.z * 1.5 * this.scale * (0.8 + 0.2 * d)), u = Math.atan2(this.dirY, this.dirX);
        r.beginPath(), r.ellipse(this.x, this.y, v, l, u, 0, Math.PI * 2), r.fill();
      }
  }
}
function Ce({ config: e, backgroundColor: r }) {
  const o = j(null), i = j(null), c = j([]), g = j(0), n = j({ x: -1e3, y: -1e3, isDown: !1, active: !1 }), s = j({ x: 0, y: 0, initialized: !1 });
  J(() => {
    const l = (h) => {
      if (!o.current) return;
      const f = o.current.getBoundingClientRect();
      n.current.x = h.clientX - f.left, n.current.y = h.clientY - f.top, n.current.active = !0;
    }, u = () => {
      n.current.active = !1;
    };
    return window.addEventListener("pointermove", l), window.addEventListener("pointerleave", u), () => {
      window.removeEventListener("pointermove", l), window.removeEventListener("pointerleave", u);
    };
  }, []);
  const d = j(e), y = j(null), v = j(0);
  return J(() => {
    d.current = e;
  }, [e]), J(() => {
    if (y.current && (clearInterval(y.current), y.current = null), !e.colors || e.colors.length === 0) {
      const u = e.color || "#8B5CF6";
      c.current.forEach((h) => {
        h.targetColor = u, h.colorDelay = Math.random() * 20;
      });
      return;
    }
    const l = (u) => {
      const h = n.current.active ? n.current.x : s.current.x, f = n.current.active ? n.current.y : s.current.y;
      c.current.forEach((E) => {
        const _ = E.x - h, N = E.y - f, x = Math.sqrt(_ * _ + N * N);
        E.targetColor = u, E.colorDelay = Math.max(0, x * 0.15);
      });
    };
    return e.colorMode === "mixed" ? c.current.forEach((u, h) => {
      u.targetColor = e.colors[h % e.colors.length], u.colorDelay = Math.random() * 20;
    }) : (v.current = 0, l(e.colors[0]), e.colors.length > 1 && (y.current = setInterval(() => {
      const u = e.colors;
      v.current = (v.current + 1) % u.length, l(u[v.current]);
    }, 3e3))), () => {
      y.current && clearInterval(y.current);
    };
  }, [e.colors, e.color, e.colorMode]), J(() => {
    if (!o.current || !i.current || d.current.name === "NONE") return;
    const l = i.current, u = o.current, h = (x) => {
      for (const S of x) {
        const { width: p, height: C } = S.contentRect, D = window.devicePixelRatio || 1;
        l.width = p * D, l.height = C * D, l.style.width = `${p}px`, l.style.height = `${C}px`;
        const T = l.getContext("2d");
        T && T.scale(D, D), c.current = [];
        const O = Math.floor(350 * (d.current.density ?? 1)), R = d.current.colors, z = d.current.colorMode || "wave";
        for (let w = 0; w < O; w++) {
          const b = Math.sqrt(Math.random()) * 350, I = Math.random() * Math.PI * 2, A = Math.cos(I) * b, q = Math.sin(I) * b;
          let $;
          if (R && R.length > 0)
            $ = z === "mixed" ? R[w % R.length] : R[0];
          else if (d.current.color)
            $ = d.current.color;
          else {
            const W = 210 + Math.max(0, Math.min(1, (A + 350) / 700)) * 130 + (Math.random() * 15 - 7.5), H = 75 + Math.random() * 25, tt = 60 + Math.random() * 15;
            $ = `hsl(${W}, ${H}%, ${tt}%)`;
          }
          c.current.push(new Ee(A, q, $));
        }
      }
    }, f = new ResizeObserver(h);
    f.observe(u);
    const E = l.getContext("2d");
    let _ = 0;
    const N = () => {
      const x = u.getBoundingClientRect();
      if (E.clearRect(0, 0, x.width, x.height), r !== "transparent" && (E.fillStyle = r, E.fillRect(0, 0, x.width, x.height)), s.current.initialized || (s.current.x = x.width / 2, s.current.y = x.height / 2, s.current.initialized = !0), d.current.name === "FOLLOW_POINTER") {
        let S = x.width / 2, p = x.height / 2;
        const C = n.current.active ? n.current.x : null, D = n.current.active ? n.current.y : null;
        C !== null && D !== null && (S = C, p = D);
        const T = d.current.pointerTrackingSpeed ?? 0.06;
        s.current.x += (S - s.current.x) * T, s.current.y += (p - s.current.y) * T;
        const k = d.current.particleSpeed ?? 1;
        _ += 0.012 * k;
        const O = c.current, R = 18, z = R * R;
        for (let w = 0; w < O.length; w++) {
          const b = O[w];
          for (let I = w + 1; I < O.length; I++) {
            const A = O[I], q = b.x - A.x, $ = b.y - A.y, G = q * q + $ * $;
            if (G < z && G > 0) {
              const W = Math.sqrt(G), H = (R - W) / R, tt = q / W * H * 0.8, U = $ / W * H * 0.8;
              b.x += tt, b.y += U, A.x -= tt, A.y -= U, b.vx += tt * 0.1, b.vy += U * 0.1, A.vx -= tt * 0.1, A.vy -= U * 0.1;
            }
          }
        }
        for (const w of O) {
          w.update(C, D, s.current.x, s.current.y, x.width, x.height, _, d.current.orientation);
          const b = d.current.shape || "bean";
          w.draw(E, _, b);
        }
      }
      g.current = requestAnimationFrame(N);
    };
    return N(), () => {
      f.disconnect(), cancelAnimationFrame(g.current);
    };
  }, [r, e.density]), e.name === "NONE" ? null : /* @__PURE__ */ Q.jsxDEV("div", { ref: o, style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }, children: /* @__PURE__ */ Q.jsxDEV("canvas", { ref: i, style: { display: "block", width: "100%", height: "100%" } }, void 0, !1, {
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
    M(this, "x");
    M(this, "y");
    M(this, "vx");
    M(this, "vy");
    M(this, "radius");
    M(this, "currentColor", "#8B5CF6");
    M(this, "targetColor", null);
    M(this, "colorDelay", 0);
    this.x = r, this.y = o;
    const i = Math.random() * Math.PI * 2, c = Math.random() * 0.5 + 0.1;
    this.vx = Math.cos(i) * c, this.vy = Math.sin(i) * c, this.radius = Math.random() * 1.5 + 1;
  }
  update(r, o, i, c, g = 1, n = 0.06) {
    if (this.x += this.vx * g, this.y += this.vy * g, this.x < 0 ? (this.x = 0, this.vx *= -1) : this.x > r && (this.x = r, this.vx *= -1), this.y < 0 ? (this.y = 0, this.vy *= -1) : this.y > o && (this.y = o, this.vy *= -1), i !== null && c !== null) {
      const s = i - this.x, d = c - this.y, y = s * s + d * d, v = 150, l = v * v;
      if (y < l) {
        const u = Math.sqrt(y), h = (v - u) / v, f = n / 0.06;
        this.x -= s / u * h * 2 * f, this.y -= d / u * h * 2 * f;
      }
    }
    this.targetColor && (this.colorDelay -= 1 * g, this.colorDelay <= 0 && (this.currentColor = this.targetColor, this.targetColor = null));
  }
  draw(r, o = "circle", i = 0) {
    if (r.fillStyle = this.currentColor, o === "square")
      r.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    else if (o === "bean") {
      const c = Math.sin(i * 0.05 + this.x * 0.01 + this.y * 0.01), g = this.radius * 2 * (0.8 + 0.4 * c), n = this.radius * (0.8 + 0.2 * c), s = this.vx !== 0 || this.vy !== 0 ? Math.atan2(this.vy, this.vx) : 0;
      r.beginPath(), r.ellipse(this.x, this.y, g, n, s, 0, Math.PI * 2), r.fill();
    } else
      r.beginPath(), r.arc(this.x, this.y, this.radius, 0, Math.PI * 2), r.fill();
  }
}
function Se({ config: e, backgroundColor: r }) {
  const o = j(null), i = j(null), c = j([]), g = j(0), n = j({ x: -1e3, y: -1e3, active: !1 });
  J(() => {
    const v = (u) => {
      if (!o.current) return;
      const h = o.current.getBoundingClientRect();
      n.current.x = u.clientX - h.left, n.current.y = u.clientY - h.top, n.current.active = !0;
    }, l = () => {
      n.current.active = !1;
    };
    return window.addEventListener("pointermove", v), window.addEventListener("pointerleave", l), () => {
      window.removeEventListener("pointermove", v), window.removeEventListener("pointerleave", l);
    };
  }, []);
  const s = j(e), d = j(0), y = j(null);
  return J(() => {
    s.current = e;
  }, [e]), J(() => {
    if (y.current && (clearInterval(y.current), y.current = null), !e.colors || e.colors.length === 0) {
      const h = e.color || "#8B5CF6";
      c.current.forEach((f) => {
        f.targetColor = h, f.colorDelay = Math.random() * 20;
      });
      return;
    }
    const v = n.current.active ? n.current.x : o.current ? o.current.clientWidth / 2 : 0, l = n.current.active ? n.current.y : o.current ? o.current.clientHeight / 2 : 0, u = (h) => {
      c.current.forEach((f) => {
        const E = f.x - v, _ = f.y - l, N = Math.sqrt(E * E + _ * _);
        f.targetColor = h, f.colorDelay = Math.max(0, N * 0.2);
      });
    };
    return e.colorMode === "mixed" ? c.current.forEach((h, f) => {
      h.targetColor = e.colors[f % e.colors.length], h.colorDelay = Math.random() * 20;
    }) : (d.current = 0, u(e.colors[0]), e.colors.length > 1 && (y.current = setInterval(() => {
      const h = e.colors;
      d.current = (d.current + 1) % h.length, u(h[d.current]);
    }, 3e3))), () => {
      y.current && clearInterval(y.current);
    };
  }, [e.colors, e.color, e.colorMode]), J(() => {
    if (!o.current || !i.current) return;
    const v = i.current, l = o.current, u = (N) => {
      for (const x of N) {
        const { width: S, height: p } = x.contentRect, C = window.devicePixelRatio || 1;
        v.width = S * C, v.height = p * C, v.style.width = `${S}px`, v.style.height = `${p}px`;
        const D = v.getContext("2d");
        D && D.scale(C, C), c.current = [];
        const T = S * p, k = s.current.density ?? 1, O = Math.min(
          Math.floor(300 * k),
          Math.floor(T / 6e3 * k)
        ), R = s.current.colors, z = s.current.colorMode || "wave";
        for (let w = 0; w < O; w++) {
          const b = new Pe(Math.random() * S, Math.random() * p);
          R && R.length > 0 ? b.currentColor = z === "mixed" ? R[w % R.length] : R[0] : s.current.color && (b.currentColor = s.current.color), c.current.push(b);
        }
      }
    }, h = new ResizeObserver(u);
    h.observe(l);
    const f = v.getContext("2d");
    let E = 0;
    const _ = () => {
      E += 1;
      const N = l.getBoundingClientRect();
      f.clearRect(0, 0, N.width, N.height), r !== "transparent" && (f.fillStyle = r, f.fillRect(0, 0, N.width, N.height));
      const x = n.current.active ? n.current.x : null, S = n.current.active ? n.current.y : null, p = c.current, C = s.current.shape || "circle", D = 120, T = D * D, k = s.current.particleSpeed ?? 1, O = s.current.pointerTrackingSpeed ?? 0.06;
      for (let R = 0; R < p.length; R++) {
        const z = p[R];
        z.update(N.width, N.height, x, S, k, O), f.globalAlpha = 1, z.draw(f, C, E);
        for (let w = R + 1; w < p.length; w++) {
          const b = p[w], I = z.x - b.x, A = z.y - b.y, q = I * I + A * A;
          if (q < T) {
            const $ = 1 - Math.sqrt(q) / D;
            f.beginPath(), f.moveTo(z.x, z.y), f.lineTo(b.x, b.y), f.strokeStyle = z.currentColor, f.globalAlpha = $ * 0.5, f.lineWidth = 1, f.stroke();
          }
        }
      }
      if (f.globalAlpha = 1, x !== null && S !== null)
        for (let w = 0; w < p.length; w++) {
          const b = p[w], I = b.x - x, A = b.y - S, q = I * I + A * A;
          if (q < 22500) {
            const $ = 1 - Math.sqrt(q) / 150;
            f.beginPath(), f.moveTo(b.x, b.y), f.lineTo(x, S), f.strokeStyle = b.currentColor, f.globalAlpha = $ * 0.8, f.lineWidth = 1.5, f.stroke();
          }
        }
      f.globalAlpha = 1, g.current = requestAnimationFrame(_);
    };
    return _(), () => {
      h.disconnect(), cancelAnimationFrame(g.current);
    };
  }, [r, e.density]), /* @__PURE__ */ Q.jsxDEV("div", { ref: o, style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }, children: /* @__PURE__ */ Q.jsxDEV("canvas", { ref: i, style: { display: "block", width: "100%", height: "100%" } }, void 0, !1, {
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
  constructor(r, o, i, c) {
    M(this, "x", 0);
    M(this, "y", 0);
    M(this, "baseX");
    M(this, "baseY");
    M(this, "vx", 0);
    M(this, "vy", 0);
    M(this, "color");
    M(this, "size");
    M(this, "angle");
    M(this, "dist");
    M(this, "spring");
    M(this, "friction");
    M(this, "targetColor", null);
    M(this, "colorDelay", 0);
    this.baseX = r, this.baseY = o, this.color = i, this.size = c, this.angle = Math.atan2(o, r), this.dist = Math.sqrt(r * r + o * o);
    const g = Math.min(1, this.dist / 350);
    this.spring = 0.15 - g * 0.13, this.friction = 0.85 + g * 0.1;
  }
  update(r, o, i, c) {
    const n = 1 + Math.sin(this.angle * 3 + i * 1.2) * 0.05 + Math.cos(this.angle * 5 - i * 0.6) * 0.03, s = this.dist * c * n, d = Math.cos(this.angle) * s, y = Math.sin(this.angle) * s, v = this.dist * 0.1 * n, l = Math.sin(i * 3 + this.dist * 0.05) * v, u = r + d + Math.cos(this.angle + Math.PI / 2) * l, h = o + y + Math.sin(this.angle + Math.PI / 2) * l, f = u - this.x, E = h - this.y;
    this.vx += f * this.spring, this.vy += E * this.spring, this.vx *= this.friction, this.vy *= this.friction, this.x += this.vx, this.y += this.vy, this.targetColor && (this.colorDelay -= 1, this.colorDelay <= 0 && (this.color = this.targetColor, this.targetColor = null));
  }
  draw(r, o, i) {
    const c = Math.min(1, this.dist / 350), g = 1 + (1 - c) * (i - 1) * 1.5, n = this.size * g;
    r.globalAlpha = Math.max(0.15, 1 - c * 0.7), r.fillStyle = this.color, r.beginPath(), o === "circle" ? r.arc(this.x, this.y, n, 0, Math.PI * 2) : o === "square" ? r.rect(this.x - n, this.y - n, n * 2, n * 2) : r.ellipse(this.x, this.y, n * 1.5, n, 0, 0, Math.PI * 2), r.fill();
  }
}
function Te({ config: e, backgroundColor: r }) {
  const o = j(null), i = j(null), c = j([]), g = j(0), n = j({ x: -1e3, y: -1e3, active: !1 }), s = j({ x: 0, y: 0, initialized: !1, angle: -Math.PI / 2 });
  J(() => {
    const l = (u) => {
      if (!o.current) return;
      const h = o.current.getBoundingClientRect();
      n.current.x = u.clientX - h.left, n.current.y = u.clientY - h.top, n.current.active = !0;
    };
    return window.addEventListener("pointermove", l), () => {
      window.removeEventListener("pointermove", l);
    };
  }, []);
  const d = j(e), y = j(0), v = j(null);
  return J(() => {
    d.current = e;
  }, [e]), J(() => {
    if (v.current && (clearInterval(v.current), v.current = null), !e.colors || e.colors.length === 0) {
      const u = e.color || "#8B5CF6";
      c.current.forEach((h) => {
        h.targetColor = u, h.colorDelay = Math.random() * 20;
      });
      return;
    }
    const l = (u) => {
      c.current.forEach((h) => {
        h.targetColor = u, h.colorDelay = Math.max(0, h.dist * 0.2);
      });
    };
    return e.colorMode === "mixed" ? c.current.forEach((u, h) => {
      u.targetColor = e.colors[h % e.colors.length], u.colorDelay = Math.max(0, u.dist * 0.2) + Math.random() * 10;
    }) : (y.current = 0, l(e.colors[0]), e.colors.length > 1 && (v.current = setInterval(() => {
      const u = e.colors;
      y.current = (y.current + 1) % u.length, l(u[y.current]);
    }, 3e3))), () => {
      v.current && clearInterval(v.current);
    };
  }, [e.colors, e.color, e.colorMode]), J(() => {
    if (!o.current || !i.current) return;
    const l = i.current, u = o.current, h = (x) => {
      for (const S of x) {
        const { width: p, height: C } = S.contentRect, D = window.devicePixelRatio || 1;
        l.width = p * D, l.height = C * D, l.style.width = `${p}px`, l.style.height = `${C}px`;
        const T = l.getContext("2d");
        T && T.scale(D, D), c.current = [];
        const O = Math.floor(350 * (d.current.density ?? 1)), R = d.current.colors, z = d.current.colorMode || "wave";
        for (let w = 0; w < O; w++) {
          const b = Math.random() * Math.PI * 2, I = Math.sqrt(Math.random()) * 350, A = Math.cos(b) * I, q = Math.sin(b) * I;
          let $;
          if (R && R.length > 0)
            $ = z === "mixed" ? R[w % R.length] : R[0];
          else if (d.current.color)
            $ = d.current.color;
          else {
            const H = 260 + Math.random() * 60, tt = 70 + Math.random() * 30, U = 60 + Math.random() * 20;
            $ = `hsl(${H}, ${tt}%, ${U}%)`;
          }
          let G = 2 + Math.random() * 2;
          I > 200 && (G *= 0.6), I < 80 && (G *= 1.5);
          const W = new De(A, q, $, G);
          W.x = p / 2, W.y = C / 2, c.current.push(W);
        }
      }
    }, f = new ResizeObserver(h);
    f.observe(u);
    const E = l.getContext("2d");
    let _ = 0;
    const N = () => {
      const x = u.getBoundingClientRect();
      E.globalCompositeOperation = "source-over", r === "transparent" ? E.clearRect(0, 0, x.width, x.height) : (E.fillStyle = r, E.fillRect(0, 0, x.width, x.height)), s.current.initialized || (s.current.x = x.width / 2, s.current.y = x.height / 2, s.current.initialized = !0);
      let S = x.width / 2, p = x.height / 2;
      const C = n.current.active ? n.current.x : null, D = n.current.active ? n.current.y : null;
      C !== null && D !== null && (S = C, p = D);
      const T = S - s.current.x, k = p - s.current.y, O = Math.sqrt(T * T + k * k);
      let R = 0, z = 0;
      O > 1 ? (R = T / O, z = k / O, s.current.angle = Math.atan2(z, R)) : (R = Math.cos(s.current.angle), z = Math.sin(s.current.angle));
      const w = d.current.particleSpeed ?? 1;
      _ += 0.02 * w;
      const b = _ % 4;
      let I = 1, A = 1, q = 0;
      if (b < 1) {
        const U = b;
        I = 1 - Math.sin(U * Math.PI) * 0.3, A = 1 + Math.sin(U * Math.PI) * 0.15, q = Math.sin(U * Math.PI) * 12;
      } else {
        const U = (b - 1) / 3;
        I = 0.7 + 0.3 * Math.sin(U * Math.PI / 2), A = 1, q = 0;
      }
      const $ = d.current.pointerTrackingSpeed ?? 0.02;
      s.current.x += T * $, s.current.y += k * $, s.current.x += R * q * w, s.current.y += z * q * w;
      const W = 200 * (A + (b < 1 ? b * 0.15 : 0)), H = E.createRadialGradient(
        s.current.x,
        s.current.y,
        0,
        s.current.x,
        s.current.y,
        W
      );
      H.addColorStop(0, "rgba(80, 150, 255, 0.05)"), H.addColorStop(1, "rgba(80, 150, 255, 0)"), E.fillStyle = H, E.beginPath(), E.arc(s.current.x, s.current.y, W, 0, Math.PI * 2), E.fill();
      const tt = c.current;
      E.globalCompositeOperation = "source-over";
      for (const U of tt) {
        U.update(s.current.x, s.current.y, _, I);
        const at = d.current.shape || "circle";
        U.draw(E, at, A);
      }
      g.current = requestAnimationFrame(N);
    };
    return N(), () => {
      f.disconnect(), cancelAnimationFrame(g.current);
    };
  }, [r, e.density]), /* @__PURE__ */ Q.jsxDEV(
    "div",
    {
      ref: o,
      style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" },
      children: /* @__PURE__ */ Q.jsxDEV(
        "canvas",
        {
          ref: i,
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
  backgroundColor: i = "#050505",
  className: c = "",
  style: g,
  background: n = { name: "NONE" }
}) {
  return /* @__PURE__ */ Q.jsxDEV(
    "div",
    {
      className: c,
      style: { ..._e, width: r, height: o, backgroundColor: i, ...g },
      children: [
        n.name === "FOLLOW_POINTER" && /* @__PURE__ */ Q.jsxDEV(Ce, { config: n, backgroundColor: i }, void 0, !1, {
          fileName: "/app/applet/src/components/ParticleCanvas.tsx",
          lineNumber: 41,
          columnNumber: 9
        }, this),
        n.name === "NET" && /* @__PURE__ */ Q.jsxDEV(Se, { config: n, backgroundColor: i }, void 0, !1, {
          fileName: "/app/applet/src/components/ParticleCanvas.tsx",
          lineNumber: 44,
          columnNumber: 9
        }, this),
        n.name === "JELLYFISH" && /* @__PURE__ */ Q.jsxDEV(Te, { config: n, backgroundColor: i }, void 0, !1, {
          fileName: "/app/applet/src/components/ParticleCanvas.tsx",
          lineNumber: 47,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ Q.jsxDEV("div", { style: { position: "relative", zIndex: 10, width: "100%", height: "100%" }, children: e }, void 0, !1, {
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
  const r = j({ x: -1e3, y: -1e3, isDown: !1, active: !1 });
  return J(() => {
    const o = e.current;
    if (!o) return;
    const i = (s) => {
      const d = o.getBoundingClientRect();
      r.current.x = s.clientX - d.left, r.current.y = s.clientY - d.top, r.current.active = !0;
    }, c = () => {
      r.current.active = !1;
    }, g = () => {
      r.current.isDown = !0;
    }, n = () => {
      r.current.isDown = !1;
    };
    return o.addEventListener("pointermove", i), o.addEventListener("pointerleave", c), o.addEventListener("pointerdown", g), o.addEventListener("pointerup", n), o.style.touchAction = "none", () => {
      o.removeEventListener("pointermove", i), o.removeEventListener("pointerleave", c), o.removeEventListener("pointerdown", g), o.removeEventListener("pointerup", n);
    };
  }, [e]), r;
}
function Fe(e, r, o, i, c, g, n, s, d) {
  if (c === null || g === null || !s && d === "none")
    return { x: o, y: i };
  let y = o, v = i;
  const l = c - e, u = g - r, h = l * l + u * u, f = Math.sqrt(h);
  if (s && !n && h < 3e4) {
    const _ = (3e4 - h) / 3e4;
    y += l * _ * 0.15, v += u * _ * 0.15;
  }
  if (n && d !== "none") {
    if (d === "attract") {
      if (h < 3e4) {
        const _ = (3e4 - h) / 3e4;
        y += l * _ * 0.8, v += u * _ * 0.8;
      }
    } else if (d === "repel" && h < 5e4 && f > 0) {
      const _ = Math.pow(Math.max(0, 5e4 - h) / 5e4, 1.2);
      y -= l / f * _ * 400, v -= u / f * _ * 400;
    }
  }
  return { x: y, y: v };
}
class Lt {
  constructor(r, o, i = "255, 255, 255") {
    M(this, "x");
    M(this, "y");
    M(this, "vx");
    M(this, "vy");
    M(this, "targetX");
    M(this, "targetY");
    M(this, "baseColor");
    M(this, "opacity");
    M(this, "size");
    M(this, "sizeMultiplier");
    M(this, "friction");
    M(this, "ease");
    M(this, "easeMultiplier");
    M(this, "floatSpeed");
    M(this, "floatOffset");
    M(this, "randomSpeed");
    this.x = Math.random() * r, this.y = Math.random() * o, this.targetX = this.x, this.targetY = this.y, this.vx = 0, this.vy = 0, this.size = Math.random() * 1.8 + 0.5, this.sizeMultiplier = 1, this.baseColor = Array.isArray(i) ? i[Math.floor(Math.random() * i.length)] : i, this.opacity = 0.4 + Math.random() * 0.6, this.friction = 0.82 + Math.random() * 0.1, this.ease = 0.03 + Math.random() * 0.05, this.easeMultiplier = 1, this.floatSpeed = Math.random() * 0.02 + 5e-3, this.floatOffset = Math.random() * Math.PI * 2, this.randomSpeed = Math.random();
  }
  update(r, o, i = null, c = null, g = !1, n = !0, s = "none") {
    const { x: d, y } = Fe(
      this.x,
      this.y,
      this.targetX,
      this.targetY,
      i,
      c,
      g,
      n,
      s
    ), v = d - this.x, l = y - this.y, u = o ? 0 : Math.cos(r * 0.01 + this.y * 0.01) * 0.5, h = o ? 0 : Math.sin(r * 0.01 + this.x * 0.01) * 0.5;
    this.vx += v * (this.ease * this.easeMultiplier) + u, this.vy += l * (this.ease * this.easeMultiplier) + h, this.vx *= this.friction, this.vy *= this.friction, this.x += this.vx, this.y += this.vy;
    const f = o ? 0.2 : 2;
    this.x += Math.cos(r * this.floatSpeed + this.floatOffset) * f, this.y += Math.sin(r * this.floatSpeed + this.floatOffset) * f;
  }
  draw(r, o = "circle", i = 0) {
    r.fillStyle = `rgba(${this.baseColor}, ${this.opacity})`;
    const c = Math.max(0.1, this.size * this.sizeMultiplier);
    if (o === "square")
      r.fillRect(this.x - c, this.y - c, c * 2, c * 2);
    else if (o === "bean") {
      const g = 6 + this.size * 2 * this.sizeMultiplier, n = Math.sin(i * 0.05 + this.x * 0.01 + this.randomSpeed * 5), s = 0.4 + 0.6 * ((n + 1) / 2), d = g * 0.5 * s, y = Math.max(0.8, c * 1.5 * (0.8 + 0.2 * n)), v = this.vx !== 0 || this.vy !== 0 ? Math.atan2(this.vy, this.vx) : 0;
      r.beginPath(), r.ellipse(this.x, this.y, d, y, v, 0, Math.PI * 2), r.fill();
    } else
      r.beginPath(), r.arc(this.x, this.y, c, 0, Math.PI * 2), r.fill();
  }
}
function $t(e, r, o) {
  if (r <= 0 || o <= 0) return [];
  const i = Math.floor(r), c = Math.floor(o), g = document.createElement("canvas");
  g.width = i, g.height = c;
  const n = g.getContext("2d", { willReadFrequently: !0 });
  if (!n) return [];
  n.clearRect(0, 0, i, c);
  let s = Math.min(i, c) * 0.65;
  n.font = `bold ${s}px "Georgia", serif`;
  const d = n.measureText(e);
  d.width > i * 0.9 && (s = s * (i * 0.9) / d.width, n.font = `bold ${s}px "Georgia", serif`), n.fillStyle = "white", n.textAlign = "center", n.textBaseline = "middle", n.fillText(e, i / 2, c / 2.05);
  const v = n.getImageData(0, 0, i, c).data, l = [], u = Math.max(2, Math.floor(s / 40));
  for (let h = 0; h < c; h += u)
    for (let f = 0; f < i; f += u) {
      const E = (h * i + f) * 4;
      v[E + 3] > 128 && l.push({
        x: f + (Math.random() - 0.5) * 4,
        y: h + (Math.random() - 0.5) * 4
      });
    }
  return l;
}
function Ne(e, r, o) {
  const i = j(e);
  return J(() => {
    i.current = e;
  }, [e]), { getPixelsForText: $t, updateTextTargets: (g, n, s) => {
    var N, x;
    const d = n || ((N = o.current) == null ? void 0 : N.offsetWidth) || window.innerWidth, y = s || ((x = o.current) == null ? void 0 : x.offsetHeight) || window.innerHeight;
    if (!g) {
      r.current.forEach((p) => {
        const C = 50 + Math.random() * (d - 100), D = 50 + Math.random() * (y - 100);
        (Math.abs(C - p.x) > 20 || Math.abs(D - p.y) > 20) && (p.vx += (Math.random() - 0.5) * 20, p.vy += (Math.random() - 0.5) * 20), p.targetX = C, p.targetY = D;
      });
      return;
    }
    const v = $t(g, d, y);
    if (v.length === 0) return;
    const l = d * 0.15, u = v.map((S) => ({ pt: S, key: S.x + (Math.random() - 0.5) * l }));
    u.sort((S, p) => S.key - p.key);
    const h = u.map((S) => S.pt), f = r.current.map((S, p) => ({ i: p, key: S.x + (Math.random() - 0.5) * l }));
    f.sort((S, p) => S.key - p.key);
    const E = f.map((S) => S.i), _ = Math.ceil(Math.sqrt(E.length));
    for (let S = 0; S < E.length; S += _) {
      const p = Math.min(S + _, E.length), C = E.slice(S, p), D = [];
      for (let T = S; T < p; T++)
        D.push(h[T % h.length]);
      C.sort((T, k) => r.current[T].y - r.current[k].y), D.sort((T, k) => T.y - k.y);
      for (let T = 0; T < C.length; T++) {
        const k = C[T], O = r.current[k], R = D[T], z = R.x - O.x, w = R.y - O.y;
        if (Math.abs(z) > 20 || Math.abs(w) > 20) {
          O.vx += (Math.random() - 0.5) * 20, O.vy += (Math.random() - 0.5) * 20;
          const b = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10 + 5);
          O.vx += Math.sign(w) * b, O.vy -= Math.sign(z) * b;
        }
        O.targetX = R.x, O.targetY = R.y;
      }
    }
  }, textRef: i };
}
const Et = (e) => {
  if (!e || typeof e != "string") return "0, 0, 0";
  try {
    let r = 0, o = 0, i = 0;
    if (e.length === 4)
      r = parseInt(e[1] + e[1], 16), o = parseInt(e[2] + e[2], 16), i = parseInt(e[3] + e[3], 16);
    else if (e.length === 7)
      r = parseInt(e.substring(1, 3), 16), o = parseInt(e.substring(3, 5), 16), i = parseInt(e.substring(5, 7), 16);
    else
      return e;
    return `${r}, ${o}, ${i}`;
  } catch {
    return "0, 0, 0";
  }
};
function ke({
  text: e,
  particleColor: r = "255, 255, 255",
  particleSize: o = 1,
  particleDensity: i = 1,
  particleEase: c = 1,
  isMagnet: g = !0,
  clickMode: n = "none",
  particleShape: s = "circle",
  backgroundColor: d = "#050505"
}) {
  const y = j(null), v = j(null), l = j([]), u = j(0), h = j(0), f = Ie(v), E = j({ isMagnet: g, clickMode: n, particleShape: s, backgroundColor: d });
  E.current = { isMagnet: g, clickMode: n, particleShape: s, backgroundColor: d };
  const { updateTextTargets: _, textRef: N } = Ne(
    e,
    l,
    v
  ), x = () => Array.isArray(r) ? r.map((p) => Et(p)) : Et(r), S = (p, C, D = 1) => {
    const T = window.innerWidth < 600 ? 1500 : 3e3, k = Math.floor(T * D), O = [], R = x();
    for (let z = 0; z < k; z++) {
      const w = new Lt(p, C, R);
      w.sizeMultiplier = o, w.easeMultiplier = c, O.push(w);
    }
    l.current = O;
  };
  return J(() => {
    if (l.current.length > 0) {
      const p = x();
      l.current.forEach((C) => {
        C.baseColor = Array.isArray(p) ? p[Math.floor(Math.random() * p.length)] : p;
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
    if (l.current.length > 0 && y.current && v.current) {
      const p = window.innerWidth < 600 ? 1500 : 3e3, C = Math.floor(p * i), D = l.current.length;
      if (C > D) {
        const T = v.current.getBoundingClientRect(), k = x();
        for (let O = 0; O < C - D; O++) {
          const R = new Lt(T.width, T.height, k);
          R.sizeMultiplier = o, l.current.push(R);
        }
        _(e);
      } else C < D && l.current.splice(C);
    }
  }, [i]), J(() => {
    const p = v.current, C = y.current;
    if (!p || !C) return;
    const D = (R) => {
      for (const z of R) {
        const { width: w, height: b } = z.contentRect, I = window.devicePixelRatio || 1;
        C.width = w * I, C.height = b * I, C.style.width = `${w}px`, C.style.height = `${b}px`;
        const A = C.getContext("2d");
        A && A.scale(I, I), l.current.length === 0 && S(w, b, i), _(N.current, w, b);
      }
    }, T = new ResizeObserver(D);
    T.observe(p), "fonts" in document && document.fonts.ready.then(() => {
      v.current && _(
        N.current,
        v.current.offsetWidth,
        v.current.offsetHeight
      );
    });
    const k = C.getContext("2d"), O = () => {
      h.current++;
      const R = p.getBoundingClientRect(), { isMagnet: z, clickMode: w, particleShape: b, backgroundColor: I } = E.current;
      if (I === "transparent")
        k.clearRect(0, 0, R.width, R.height), k.globalCompositeOperation = "source-over";
      else {
        const W = Et(I);
        k.fillStyle = `rgba(${W}, 0.25)`, k.fillRect(0, 0, R.width, R.height), k.globalCompositeOperation = "screen";
      }
      const A = N.current !== "", q = f.current.active ? f.current.x : null, $ = f.current.active ? f.current.y : null, G = f.current.isDown;
      for (let W = 0; W < l.current.length; W++) {
        const H = l.current[W];
        H.update(h.current, !!A, q, $, G, z, w), H.draw(k, b, h.current);
      }
      k.globalCompositeOperation = "source-over", u.current = requestAnimationFrame(O);
    };
    return O(), () => {
      T.disconnect(), cancelAnimationFrame(u.current);
    };
  }, []), J(() => {
    _(e);
  }, [e]), /* @__PURE__ */ Q.jsxDEV(
    "div",
    {
      ref: v,
      style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" },
      children: /* @__PURE__ */ Q.jsxDEV(
        "canvas",
        {
          ref: y,
          style: { display: "block", width: "100%", height: "100%" }
        },
        void 0,
        !1,
        {
          fileName: "/app/applet/src/components/text/TextParticleEngine.tsx",
          lineNumber: 231,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "/app/applet/src/components/text/TextParticleEngine.tsx",
      lineNumber: 227,
      columnNumber: 5
    },
    this
  );
}
function ze({
  name: e = "FOLLOW_POINTER",
  config: r,
  width: o = "100%",
  height: i = "60vh",
  backgroundColor: c = "#050505",
  className: g = "",
  style: n
}) {
  const s = {
    name: e,
    shape: "bean",
    orientation: "vertical",
    ...r
  };
  return /* @__PURE__ */ Q.jsxDEV(
    Oe,
    {
      width: o,
      height: i,
      backgroundColor: c,
      className: g,
      style: n,
      background: s
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
  ze as ParticleBackground,
  Oe as ParticleCanvas,
  ke as TextParticleEngine,
  Fe as getMagnetTarget,
  Ie as useParticleInteraction,
  Ne as useTextParticles
};
