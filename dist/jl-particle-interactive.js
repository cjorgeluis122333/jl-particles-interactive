var vt = Object.defineProperty;
var mt = (t, r, o) => r in t ? vt(t, r, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[r] = o;
var M = (t, r, o) => mt(t, typeof r != "symbol" ? r + "" : r, o);
import pt, { useRef as k, useEffect as J } from "react";
var de = { exports: {} }, fe = {};
/**
 * @license React
 * react-jsx-dev-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ze;
function gt() {
  if (ze) return fe;
  ze = 1;
  var t = Symbol.for("react.fragment");
  return fe.Fragment = t, fe.jsxDEV = void 0, fe;
}
var ve = {};
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ae;
function yt() {
  return Ae || (Ae = 1, process.env.NODE_ENV !== "production" && (function() {
    var t = pt, r = Symbol.for("react.element"), o = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), g = Symbol.for("react.profiler"), n = Symbol.for("react.provider"), s = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), l = Symbol.for("react.memo"), u = Symbol.for("react.lazy"), h = Symbol.for("react.offscreen"), f = Symbol.iterator, w = "@@iterator";
    function _(e) {
      if (e === null || typeof e != "object")
        return null;
      var a = f && e[f] || e[w];
      return typeof a == "function" ? a : null;
    }
    var Y = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function x(e) {
      {
        for (var a = arguments.length, m = new Array(a > 1 ? a - 1 : 0), P = 1; P < a; P++)
          m[P - 1] = arguments[P];
        S("error", e, m);
      }
    }
    function S(e, a, m) {
      {
        var P = Y.ReactDebugCurrentFrame, X = P.getStackAddendum();
        X !== "" && (a += "%s", m = m.concat([X]));
        var L = m.map(function(j) {
          return String(j);
        });
        L.unshift("Warning: " + a), Function.prototype.apply.call(console[e], console, L);
      }
    }
    var p = !1, C = !1, T = !1, D = !1, I = !1, O;
    O = Symbol.for("react.module.reference");
    function R(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === i || e === g || I || e === c || e === y || e === v || D || e === h || p || C || T || typeof e == "object" && e !== null && (e.$$typeof === u || e.$$typeof === l || e.$$typeof === n || e.$$typeof === s || e.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === O || e.getModuleId !== void 0));
    }
    function z(e, a, m) {
      var P = e.displayName;
      if (P)
        return P;
      var X = a.displayName || a.name || "";
      return X !== "" ? m + "(" + X + ")" : m;
    }
    function E(e) {
      return e.displayName || "Context";
    }
    function b(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && x("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
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
      if (typeof e == "object")
        switch (e.$$typeof) {
          case s:
            var a = e;
            return E(a) + ".Consumer";
          case n:
            var m = e;
            return E(m._context) + ".Provider";
          case d:
            return z(e, e.render, "ForwardRef");
          case l:
            var P = e.displayName || null;
            return P !== null ? P : b(e.type) || "Memo";
          case u: {
            var X = e, L = X._payload, j = X._init;
            try {
              return b(j(L));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var F = Object.assign, A = 0, q, $, G, W, H, ee, U;
    function ae() {
    }
    ae.__reactDisabledLog = !0;
    function qe() {
      {
        if (A === 0) {
          q = console.log, $ = console.info, G = console.warn, W = console.error, H = console.group, ee = console.groupCollapsed, U = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ae,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        A++;
      }
    }
    function We() {
      {
        if (A--, A === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: F({}, e, {
              value: q
            }),
            info: F({}, e, {
              value: $
            }),
            warn: F({}, e, {
              value: G
            }),
            error: F({}, e, {
              value: W
            }),
            group: F({}, e, {
              value: H
            }),
            groupCollapsed: F({}, e, {
              value: ee
            }),
            groupEnd: F({}, e, {
              value: U
            })
          });
        }
        A < 0 && x("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var me = Y.ReactCurrentDispatcher, pe;
    function ce(e, a, m) {
      {
        if (pe === void 0)
          try {
            throw Error();
          } catch (X) {
            var P = X.stack.trim().match(/\n( *(at )?)/);
            pe = P && P[1] || "";
          }
        return `
` + pe + e;
      }
    }
    var ge = !1, le;
    {
      var Be = typeof WeakMap == "function" ? WeakMap : Map;
      le = new Be();
    }
    function Ce(e, a) {
      if (!e || ge)
        return "";
      {
        var m = le.get(e);
        if (m !== void 0)
          return m;
      }
      var P;
      ge = !0;
      var X = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var L;
      L = me.current, me.current = null, qe();
      try {
        if (a) {
          var j = function() {
            throw Error();
          };
          if (Object.defineProperty(j.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(j, []);
            } catch (Z) {
              P = Z;
            }
            Reflect.construct(e, [], j);
          } else {
            try {
              j.call();
            } catch (Z) {
              P = Z;
            }
            e.call(j.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Z) {
            P = Z;
          }
          e();
        }
      } catch (Z) {
        if (Z && P && typeof Z.stack == "string") {
          for (var N = Z.stack.split(`
`), K = P.stack.split(`
`), B = N.length - 1, V = K.length - 1; B >= 1 && V >= 0 && N[B] !== K[V]; )
            V--;
          for (; B >= 1 && V >= 0; B--, V--)
            if (N[B] !== K[V]) {
              if (B !== 1 || V !== 1)
                do
                  if (B--, V--, V < 0 || N[B] !== K[V]) {
                    var te = `
` + N[B].replace(" at new ", " at ");
                    return e.displayName && te.includes("<anonymous>") && (te = te.replace("<anonymous>", e.displayName)), typeof e == "function" && le.set(e, te), te;
                  }
                while (B >= 1 && V >= 0);
              break;
            }
        }
      } finally {
        ge = !1, me.current = L, We(), Error.prepareStackTrace = X;
      }
      var oe = e ? e.displayName || e.name : "", re = oe ? ce(oe) : "";
      return typeof e == "function" && le.set(e, re), re;
    }
    function Ve(e, a, m) {
      return Ce(e, !1);
    }
    function Je(e) {
      var a = e.prototype;
      return !!(a && a.isReactComponent);
    }
    function ue(e, a, m) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ce(e, Je(e));
      if (typeof e == "string")
        return ce(e);
      switch (e) {
        case y:
          return ce("Suspense");
        case v:
          return ce("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case d:
            return Ve(e.render);
          case l:
            return ue(e.type, a, m);
          case u: {
            var P = e, X = P._payload, L = P._init;
            try {
              return ue(L(X), a, m);
            } catch {
            }
          }
        }
      return "";
    }
    var se = Object.prototype.hasOwnProperty, Pe = {}, Se = Y.ReactDebugCurrentFrame;
    function he(e) {
      if (e) {
        var a = e._owner, m = ue(e.type, e._source, a ? a.type : null);
        Se.setExtraStackFrame(m);
      } else
        Se.setExtraStackFrame(null);
    }
    function Ue(e, a, m, P, X) {
      {
        var L = Function.call.bind(se);
        for (var j in e)
          if (L(e, j)) {
            var N = void 0;
            try {
              if (typeof e[j] != "function") {
                var K = Error((P || "React class") + ": " + m + " type `" + j + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[j] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw K.name = "Invariant Violation", K;
              }
              N = e[j](a, j, P, m, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (B) {
              N = B;
            }
            N && !(N instanceof Error) && (he(X), x("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", P || "React class", m, j, typeof N), he(null)), N instanceof Error && !(N.message in Pe) && (Pe[N.message] = !0, he(X), x("Failed %s type: %s", m, N.message), he(null));
          }
      }
    }
    var He = Array.isArray;
    function ye(e) {
      return He(e);
    }
    function Ke(e) {
      {
        var a = typeof Symbol == "function" && Symbol.toStringTag, m = a && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return m;
      }
    }
    function Ge(e) {
      try {
        return De(e), !1;
      } catch {
        return !0;
      }
    }
    function De(e) {
      return "" + e;
    }
    function Te(e) {
      if (Ge(e))
        return x("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ke(e)), De(e);
    }
    var ie = Y.ReactCurrentOwner, Ze = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, _e, Oe, xe;
    xe = {};
    function Qe(e) {
      if (se.call(e, "ref")) {
        var a = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (a && a.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function et(e) {
      if (se.call(e, "key")) {
        var a = Object.getOwnPropertyDescriptor(e, "key").get;
        if (a && a.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function tt(e, a) {
      if (typeof e.ref == "string" && ie.current && a && ie.current.stateNode !== a) {
        var m = b(ie.current.type);
        xe[m] || (x('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', b(ie.current.type), e.ref), xe[m] = !0);
      }
    }
    function rt(e, a) {
      {
        var m = function() {
          _e || (_e = !0, x("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", a));
        };
        m.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: m,
          configurable: !0
        });
      }
    }
    function nt(e, a) {
      {
        var m = function() {
          Oe || (Oe = !0, x("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", a));
        };
        m.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: m,
          configurable: !0
        });
      }
    }
    var ot = function(e, a, m, P, X, L, j) {
      var N = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: r,
        // Built-in properties that belong on the element
        type: e,
        key: a,
        ref: m,
        props: j,
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
        value: P
      }), Object.defineProperty(N, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: X
      }), Object.freeze && (Object.freeze(N.props), Object.freeze(N)), N;
    };
    function st(e, a, m, P, X) {
      {
        var L, j = {}, N = null, K = null;
        m !== void 0 && (Te(m), N = "" + m), et(a) && (Te(a.key), N = "" + a.key), Qe(a) && (K = a.ref, tt(a, X));
        for (L in a)
          se.call(a, L) && !Ze.hasOwnProperty(L) && (j[L] = a[L]);
        if (e && e.defaultProps) {
          var B = e.defaultProps;
          for (L in B)
            j[L] === void 0 && (j[L] = B[L]);
        }
        if (N || K) {
          var V = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          N && rt(j, V), K && nt(j, V);
        }
        return ot(e, N, K, X, P, ie.current, j);
      }
    }
    var be = Y.ReactCurrentOwner, Ie = Y.ReactDebugCurrentFrame;
    function ne(e) {
      if (e) {
        var a = e._owner, m = ue(e.type, e._source, a ? a.type : null);
        Ie.setExtraStackFrame(m);
      } else
        Ie.setExtraStackFrame(null);
    }
    var Me;
    Me = !1;
    function Re(e) {
      return typeof e == "object" && e !== null && e.$$typeof === r;
    }
    function Fe() {
      {
        if (be.current) {
          var e = b(be.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function it(e) {
      {
        if (e !== void 0) {
          var a = e.fileName.replace(/^.*[\\\/]/, ""), m = e.lineNumber;
          return `

Check your code at ` + a + ":" + m + ".";
        }
        return "";
      }
    }
    var Ne = {};
    function at(e) {
      {
        var a = Fe();
        if (!a) {
          var m = typeof e == "string" ? e : e.displayName || e.name;
          m && (a = `

Check the top-level render call using <` + m + ">.");
        }
        return a;
      }
    }
    function Ye(e, a) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var m = at(a);
        if (Ne[m])
          return;
        Ne[m] = !0;
        var P = "";
        e && e._owner && e._owner !== be.current && (P = " It was passed a child from " + b(e._owner.type) + "."), ne(e), x('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', m, P), ne(null);
      }
    }
    function je(e, a) {
      {
        if (typeof e != "object")
          return;
        if (ye(e))
          for (var m = 0; m < e.length; m++) {
            var P = e[m];
            Re(P) && Ye(P, a);
          }
        else if (Re(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var X = _(e);
          if (typeof X == "function" && X !== e.entries)
            for (var L = X.call(e), j; !(j = L.next()).done; )
              Re(j.value) && Ye(j.value, a);
        }
      }
    }
    function ct(e) {
      {
        var a = e.type;
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
          Ue(m, e.props, "prop", P, e);
        } else if (a.PropTypes !== void 0 && !Me) {
          Me = !0;
          var X = b(a);
          x("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", X || "Unknown");
        }
        typeof a.getDefaultProps == "function" && !a.getDefaultProps.isReactClassApproved && x("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function lt(e) {
      {
        for (var a = Object.keys(e.props), m = 0; m < a.length; m++) {
          var P = a[m];
          if (P !== "children" && P !== "key") {
            ne(e), x("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", P), ne(null);
            break;
          }
        }
        e.ref !== null && (ne(e), x("Invalid attribute `ref` supplied to `React.Fragment`."), ne(null));
      }
    }
    var ke = {};
    function ut(e, a, m, P, X, L) {
      {
        var j = R(e);
        if (!j) {
          var N = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (N += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var K = it(X);
          K ? N += K : N += Fe();
          var B;
          e === null ? B = "null" : ye(e) ? B = "array" : e !== void 0 && e.$$typeof === r ? (B = "<" + (b(e.type) || "Unknown") + " />", N = " Did you accidentally export a JSX literal instead of a component?") : B = typeof e, x("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", B, N);
        }
        var V = st(e, a, m, X, L);
        if (V == null)
          return V;
        if (j) {
          var te = a.children;
          if (te !== void 0)
            if (P)
              if (ye(te)) {
                for (var oe = 0; oe < te.length; oe++)
                  je(te[oe], e);
                Object.freeze && Object.freeze(te);
              } else
                x("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              je(te, e);
        }
        if (se.call(a, "key")) {
          var re = b(e), Z = Object.keys(a).filter(function(ft) {
            return ft !== "key";
          }), we = Z.length > 0 ? "{key: someKey, " + Z.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!ke[re + we]) {
            var dt = Z.length > 0 ? "{" + Z.join(": ..., ") + ": ...}" : "{}";
            x(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, we, re, dt, re), ke[re + we] = !0;
          }
        }
        return e === i ? lt(V) : ct(V), V;
      }
    }
    var ht = ut;
    ve.Fragment = i, ve.jsxDEV = ht;
  })()), ve;
}
var Xe;
function xt() {
  return Xe || (Xe = 1, process.env.NODE_ENV === "production" ? de.exports = gt() : de.exports = yt()), de.exports;
}
var Q = xt();
function bt(t, r, o, i) {
  let c = r + t.baseX, g = o + t.baseY;
  c += Math.sin(i * t.randomSpeed + t.baseY * 0.05) * 15 * t.z, g += Math.cos(i * t.randomSpeed + t.baseX * 0.05) * 15 * t.z;
  const n = c - t.x, s = g - t.y, d = n * 0.06, y = s * 0.06;
  return { forceX: d, forceY: y };
}
function Mt(t, r, o, i, c, g) {
  const n = i, s = c, d = t.x - n, y = t.y - s, v = Math.max(Math.sqrt(d * d + y * y), 1);
  let l = 0, u = 0;
  const f = Math.sin(v * 0.02 - g * 3) * 2.5 * t.z;
  l += d / v * f, u += y / v * f;
  const _ = Math.cos(v * 0.01 - g * 1 + t.randomSpeed) * 0.8 * t.z, Y = -y / v, x = d / v;
  return l += Y * _, u += x * _, { forceX: l, forceY: u, dxCenter: d, dyCenter: y, distToCenter: v };
}
function Rt(t, r) {
  let c = Math.min(r / 400, 1) * 2.5 + t.sizeBias * 1;
  c < 0.4 && (c = 0), t.scale += (c - t.scale) * 0.15;
}
function wt(t, r, o, i, c, g) {
  let n = 0, s = 0;
  c === "horizontal" ? (n = 1, s = 0) : c === "diagonal" ? (n = -r / i, s = -o / i) : (n = -o / i, s = r / i);
  const d = Math.atan2(s, n), y = t.sizeBias > 0.3 ? 1 : 0, v = Math.max(0, Math.sin(g * 0.5 + t.randomSpeed * 10)), l = Math.sin(g * 3 + t.baseX * 0.1 + t.randomSpeed) * 0.5 * v * y;
  n = Math.cos(d + l), s = Math.sin(d + l);
  const u = Math.max(1 - i / 400, 0.1);
  c === "horizontal" ? (t.dirX = t.dirX * (1 - 0.2) + n * 0.2, t.dirY = t.dirY * (1 - 0.2) + s * 0.2) : (t.dirX = t.dirX * (1 - u * 0.3) + n * u * 0.3, t.dirY = t.dirY * (1 - u * 0.3) + s * u * 0.3);
  const h = Math.sqrt(t.dirX * t.dirX + t.dirY * t.dirY);
  h > 0 && (t.dirX /= h, t.dirY /= h);
}
class Et {
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
    } = Mt(this, r, o, i, c, s), {
      forceX: f,
      forceY: w
    } = bt(this, i, c, s);
    this.vx += y + f, this.vy += v + w, this.vx *= 0.75, this.vy *= 0.75, this.x += this.vx, this.y += this.vy, Rt(this, h), wt(this, l, u, h, d, s), this.targetColor && (this.colorDelay -= 1, this.colorDelay <= 0 && (this.color = this.targetColor, this.targetColor = null));
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
function Ct({ config: t, backgroundColor: r }) {
  const o = k(null), i = k(null), c = k([]), g = k(0), n = k({ x: -1e3, y: -1e3, isDown: !1, active: !1 }), s = k({ x: 0, y: 0, initialized: !1 });
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
  const d = k(t), y = k(null), v = k(0);
  return J(() => {
    d.current = t;
  }, [t]), J(() => {
    if (y.current && (clearInterval(y.current), y.current = null), !t.colors || t.colors.length === 0) {
      const u = t.color || "#8B5CF6";
      c.current.forEach((h) => {
        h.targetColor = u, h.colorDelay = Math.random() * 20;
      });
      return;
    }
    const l = (u) => {
      const h = n.current.active ? n.current.x : s.current.x, f = n.current.active ? n.current.y : s.current.y;
      c.current.forEach((w) => {
        const _ = w.x - h, Y = w.y - f, x = Math.sqrt(_ * _ + Y * Y);
        w.targetColor = u, w.colorDelay = Math.max(0, x * 0.15);
      });
    };
    return t.colorMode === "mixed" ? c.current.forEach((u, h) => {
      u.targetColor = t.colors[h % t.colors.length], u.colorDelay = Math.random() * 20;
    }) : (v.current = 0, l(t.colors[0]), t.colors.length > 1 && (y.current = setInterval(() => {
      const u = t.colors;
      v.current = (v.current + 1) % u.length, l(u[v.current]);
    }, 3e3))), () => {
      y.current && clearInterval(y.current);
    };
  }, [t.colors, t.color, t.colorMode]), J(() => {
    if (!o.current || !i.current || d.current.name === "NONE") return;
    const l = i.current, u = o.current, h = (x) => {
      for (const S of x) {
        const { width: p, height: C } = S.contentRect, T = window.devicePixelRatio || 1;
        l.width = p * T, l.height = C * T, l.style.width = `${p}px`, l.style.height = `${C}px`;
        const D = l.getContext("2d");
        D && D.scale(T, T), c.current = [];
        const O = Math.floor(350 * (d.current.density ?? 1)), R = d.current.colors, z = d.current.colorMode || "wave";
        for (let E = 0; E < O; E++) {
          const b = Math.sqrt(Math.random()) * 350, F = Math.random() * Math.PI * 2, A = Math.cos(F) * b, q = Math.sin(F) * b;
          let $;
          if (R && R.length > 0)
            $ = z === "mixed" ? R[E % R.length] : R[0];
          else if (d.current.color)
            $ = d.current.color;
          else {
            const W = 210 + Math.max(0, Math.min(1, (A + 350) / 700)) * 130 + (Math.random() * 15 - 7.5), H = 75 + Math.random() * 25, ee = 60 + Math.random() * 15;
            $ = `hsl(${W}, ${H}%, ${ee}%)`;
          }
          c.current.push(new Et(A, q, $));
        }
      }
    }, f = new ResizeObserver(h);
    f.observe(u);
    const w = l.getContext("2d");
    let _ = 0;
    const Y = () => {
      const x = u.getBoundingClientRect();
      if (w.clearRect(0, 0, x.width, x.height), r !== "transparent" && (w.fillStyle = r, w.fillRect(0, 0, x.width, x.height)), s.current.initialized || (s.current.x = x.width / 2, s.current.y = x.height / 2, s.current.initialized = !0), d.current.name === "FOLLOW_POINTER") {
        let S = x.width / 2, p = x.height / 2;
        const C = n.current.active ? n.current.x : null, T = n.current.active ? n.current.y : null;
        C !== null && T !== null && (S = C, p = T);
        const D = d.current.pointerTrackingSpeed ?? 0.06;
        s.current.x += (S - s.current.x) * D, s.current.y += (p - s.current.y) * D;
        const I = d.current.particleSpeed ?? 1;
        _ += 0.012 * I;
        const O = c.current, R = 18, z = R * R;
        for (let E = 0; E < O.length; E++) {
          const b = O[E];
          for (let F = E + 1; F < O.length; F++) {
            const A = O[F], q = b.x - A.x, $ = b.y - A.y, G = q * q + $ * $;
            if (G < z && G > 0) {
              const W = Math.sqrt(G), H = (R - W) / R, ee = q / W * H * 0.8, U = $ / W * H * 0.8;
              b.x += ee, b.y += U, A.x -= ee, A.y -= U, b.vx += ee * 0.1, b.vy += U * 0.1, A.vx -= ee * 0.1, A.vy -= U * 0.1;
            }
          }
        }
        for (const E of O) {
          E.update(C, T, s.current.x, s.current.y, x.width, x.height, _, d.current.orientation);
          const b = d.current.shape || "bean";
          E.draw(w, _, b);
        }
      }
      g.current = requestAnimationFrame(Y);
    };
    return Y(), () => {
      f.disconnect(), cancelAnimationFrame(g.current);
    };
  }, [r, t.density]), t.name === "NONE" ? null : /* @__PURE__ */ Q.jsxDEV("div", { ref: o, style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }, children: /* @__PURE__ */ Q.jsxDEV("canvas", { ref: i, style: { display: "block", width: "100%", height: "100%" } }, void 0, !1, {
    fileName: "/app/applet/src/components/background/BackgroundParticleEngine.tsx",
    lineNumber: 250,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/applet/src/components/background/BackgroundParticleEngine.tsx",
    lineNumber: 249,
    columnNumber: 5
  }, this);
}
class Pt {
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
function St({ config: t, backgroundColor: r }) {
  const o = k(null), i = k(null), c = k([]), g = k(0), n = k({ x: -1e3, y: -1e3, active: !1 });
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
  const s = k(t), d = k(0), y = k(null);
  return J(() => {
    s.current = t;
  }, [t]), J(() => {
    if (y.current && (clearInterval(y.current), y.current = null), !t.colors || t.colors.length === 0) {
      const h = t.color || "#8B5CF6";
      c.current.forEach((f) => {
        f.targetColor = h, f.colorDelay = Math.random() * 20;
      });
      return;
    }
    const v = n.current.active ? n.current.x : o.current ? o.current.clientWidth / 2 : 0, l = n.current.active ? n.current.y : o.current ? o.current.clientHeight / 2 : 0, u = (h) => {
      c.current.forEach((f) => {
        const w = f.x - v, _ = f.y - l, Y = Math.sqrt(w * w + _ * _);
        f.targetColor = h, f.colorDelay = Math.max(0, Y * 0.2);
      });
    };
    return t.colorMode === "mixed" ? c.current.forEach((h, f) => {
      h.targetColor = t.colors[f % t.colors.length], h.colorDelay = Math.random() * 20;
    }) : (d.current = 0, u(t.colors[0]), t.colors.length > 1 && (y.current = setInterval(() => {
      const h = t.colors;
      d.current = (d.current + 1) % h.length, u(h[d.current]);
    }, 3e3))), () => {
      y.current && clearInterval(y.current);
    };
  }, [t.colors, t.color, t.colorMode]), J(() => {
    if (!o.current || !i.current) return;
    const v = i.current, l = o.current, u = (Y) => {
      for (const x of Y) {
        const { width: S, height: p } = x.contentRect, C = window.devicePixelRatio || 1;
        v.width = S * C, v.height = p * C, v.style.width = `${S}px`, v.style.height = `${p}px`;
        const T = v.getContext("2d");
        T && T.scale(C, C), c.current = [];
        const D = S * p, I = s.current.density ?? 1, O = Math.min(
          Math.floor(300 * I),
          Math.floor(D / 6e3 * I)
        ), R = s.current.colors, z = s.current.colorMode || "wave";
        for (let E = 0; E < O; E++) {
          const b = new Pt(Math.random() * S, Math.random() * p);
          R && R.length > 0 ? b.currentColor = z === "mixed" ? R[E % R.length] : R[0] : s.current.color && (b.currentColor = s.current.color), c.current.push(b);
        }
      }
    }, h = new ResizeObserver(u);
    h.observe(l);
    const f = v.getContext("2d");
    let w = 0;
    const _ = () => {
      w += 1;
      const Y = l.getBoundingClientRect();
      f.clearRect(0, 0, Y.width, Y.height), r !== "transparent" && (f.fillStyle = r, f.fillRect(0, 0, Y.width, Y.height));
      const x = n.current.active ? n.current.x : null, S = n.current.active ? n.current.y : null, p = c.current, C = s.current.shape || "circle", T = 120, D = T * T, I = s.current.particleSpeed ?? 1, O = s.current.pointerTrackingSpeed ?? 0.06;
      for (let R = 0; R < p.length; R++) {
        const z = p[R];
        z.update(Y.width, Y.height, x, S, I, O), f.globalAlpha = 1, z.draw(f, C, w);
        for (let E = R + 1; E < p.length; E++) {
          const b = p[E], F = z.x - b.x, A = z.y - b.y, q = F * F + A * A;
          if (q < D) {
            const $ = 1 - Math.sqrt(q) / T;
            f.beginPath(), f.moveTo(z.x, z.y), f.lineTo(b.x, b.y), f.strokeStyle = z.currentColor, f.globalAlpha = $ * 0.5, f.lineWidth = 1, f.stroke();
          }
        }
      }
      if (f.globalAlpha = 1, x !== null && S !== null)
        for (let E = 0; E < p.length; E++) {
          const b = p[E], F = b.x - x, A = b.y - S, q = F * F + A * A;
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
  }, [r, t.density]), /* @__PURE__ */ Q.jsxDEV("div", { ref: o, style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }, children: /* @__PURE__ */ Q.jsxDEV("canvas", { ref: i, style: { display: "block", width: "100%", height: "100%" } }, void 0, !1, {
    fileName: "/app/applet/src/components/background/NetParticleEngine.tsx",
    lineNumber: 318,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/applet/src/components/background/NetParticleEngine.tsx",
    lineNumber: 317,
    columnNumber: 5
  }, this);
}
class Dt {
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
    const n = 1 + Math.sin(this.angle * 3 + i * 1.2) * 0.05 + Math.cos(this.angle * 5 - i * 0.6) * 0.03, s = this.dist * c * n, d = Math.cos(this.angle) * s, y = Math.sin(this.angle) * s, v = this.dist * 0.1 * n, l = Math.sin(i * 3 + this.dist * 0.05) * v, u = r + d + Math.cos(this.angle + Math.PI / 2) * l, h = o + y + Math.sin(this.angle + Math.PI / 2) * l, f = u - this.x, w = h - this.y;
    this.vx += f * this.spring, this.vy += w * this.spring, this.vx *= this.friction, this.vy *= this.friction, this.x += this.vx, this.y += this.vy, this.targetColor && (this.colorDelay -= 1, this.colorDelay <= 0 && (this.color = this.targetColor, this.targetColor = null));
  }
  draw(r, o, i) {
    const c = Math.min(1, this.dist / 350), g = 1 + (1 - c) * (i - 1) * 1.5, n = this.size * g;
    r.globalAlpha = Math.max(0.15, 1 - c * 0.7), r.fillStyle = this.color, r.beginPath(), o === "circle" ? r.arc(this.x, this.y, n, 0, Math.PI * 2) : o === "square" ? r.rect(this.x - n, this.y - n, n * 2, n * 2) : r.ellipse(this.x, this.y, n * 1.5, n, 0, 0, Math.PI * 2), r.fill();
  }
}
function Tt({ config: t, backgroundColor: r }) {
  const o = k(null), i = k(null), c = k([]), g = k(0), n = k({ x: -1e3, y: -1e3, active: !1 }), s = k({ x: 0, y: 0, initialized: !1, angle: -Math.PI / 2 });
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
  const d = k(t), y = k(0), v = k(null);
  return J(() => {
    d.current = t;
  }, [t]), J(() => {
    if (v.current && (clearInterval(v.current), v.current = null), !t.colors || t.colors.length === 0) {
      const u = t.color || "#8B5CF6";
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
    return t.colorMode === "mixed" ? c.current.forEach((u, h) => {
      u.targetColor = t.colors[h % t.colors.length], u.colorDelay = Math.max(0, u.dist * 0.2) + Math.random() * 10;
    }) : (y.current = 0, l(t.colors[0]), t.colors.length > 1 && (v.current = setInterval(() => {
      const u = t.colors;
      y.current = (y.current + 1) % u.length, l(u[y.current]);
    }, 3e3))), () => {
      v.current && clearInterval(v.current);
    };
  }, [t.colors, t.color, t.colorMode]), J(() => {
    if (!o.current || !i.current) return;
    const l = i.current, u = o.current, h = (x) => {
      for (const S of x) {
        const { width: p, height: C } = S.contentRect, T = window.devicePixelRatio || 1;
        l.width = p * T, l.height = C * T, l.style.width = `${p}px`, l.style.height = `${C}px`;
        const D = l.getContext("2d");
        D && D.scale(T, T), c.current = [];
        const O = Math.floor(350 * (d.current.density ?? 1)), R = d.current.colors, z = d.current.colorMode || "wave";
        for (let E = 0; E < O; E++) {
          const b = Math.random() * Math.PI * 2, F = Math.sqrt(Math.random()) * 350, A = Math.cos(b) * F, q = Math.sin(b) * F;
          let $;
          if (R && R.length > 0)
            $ = z === "mixed" ? R[E % R.length] : R[0];
          else if (d.current.color)
            $ = d.current.color;
          else {
            const H = 260 + Math.random() * 60, ee = 70 + Math.random() * 30, U = 60 + Math.random() * 20;
            $ = `hsl(${H}, ${ee}%, ${U}%)`;
          }
          let G = 2 + Math.random() * 2;
          F > 200 && (G *= 0.6), F < 80 && (G *= 1.5);
          const W = new Dt(A, q, $, G);
          W.x = p / 2, W.y = C / 2, c.current.push(W);
        }
      }
    }, f = new ResizeObserver(h);
    f.observe(u);
    const w = l.getContext("2d");
    let _ = 0;
    const Y = () => {
      const x = u.getBoundingClientRect();
      w.globalCompositeOperation = "source-over", r === "transparent" ? w.clearRect(0, 0, x.width, x.height) : (w.fillStyle = r, w.fillRect(0, 0, x.width, x.height)), s.current.initialized || (s.current.x = x.width / 2, s.current.y = x.height / 2, s.current.initialized = !0);
      let S = x.width / 2, p = x.height / 2;
      const C = n.current.active ? n.current.x : null, T = n.current.active ? n.current.y : null;
      C !== null && T !== null && (S = C, p = T);
      const D = S - s.current.x, I = p - s.current.y, O = Math.sqrt(D * D + I * I);
      let R = 0, z = 0;
      O > 1 ? (R = D / O, z = I / O, s.current.angle = Math.atan2(z, R)) : (R = Math.cos(s.current.angle), z = Math.sin(s.current.angle));
      const E = d.current.particleSpeed ?? 1;
      _ += 0.02 * E;
      const b = _ % 4;
      let F = 1, A = 1, q = 0;
      if (b < 1) {
        const U = b;
        F = 1 - Math.sin(U * Math.PI) * 0.3, A = 1 + Math.sin(U * Math.PI) * 0.15, q = Math.sin(U * Math.PI) * 12;
      } else {
        const U = (b - 1) / 3;
        F = 0.7 + 0.3 * Math.sin(U * Math.PI / 2), A = 1, q = 0;
      }
      const $ = d.current.pointerTrackingSpeed ?? 0.02;
      s.current.x += D * $, s.current.y += I * $, s.current.x += R * q * E, s.current.y += z * q * E;
      const W = 200 * (A + (b < 1 ? b * 0.15 : 0)), H = w.createRadialGradient(
        s.current.x,
        s.current.y,
        0,
        s.current.x,
        s.current.y,
        W
      );
      H.addColorStop(0, "rgba(80, 150, 255, 0.05)"), H.addColorStop(1, "rgba(80, 150, 255, 0)"), w.fillStyle = H, w.beginPath(), w.arc(s.current.x, s.current.y, W, 0, Math.PI * 2), w.fill();
      const ee = c.current;
      w.globalCompositeOperation = "source-over";
      for (const U of ee) {
        U.update(s.current.x, s.current.y, _, F);
        const ae = d.current.shape || "circle";
        U.draw(w, ae, A);
      }
      g.current = requestAnimationFrame(Y);
    };
    return Y(), () => {
      f.disconnect(), cancelAnimationFrame(g.current);
    };
  }, [r, t.density]), /* @__PURE__ */ Q.jsxDEV(
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
const _t = {
  position: "relative",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "1rem",
  overflow: "hidden",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  transition: "all 300ms ease-out"
};
function Ot({
  children: t,
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
      style: { ..._t, width: r, height: o, backgroundColor: i, ...g },
      children: [
        n.name === "FOLLOW_POINTER" && /* @__PURE__ */ Q.jsxDEV(Ct, { config: n, backgroundColor: i }, void 0, !1, {
          fileName: "/app/applet/src/components/ParticleCanvas.tsx",
          lineNumber: 41,
          columnNumber: 9
        }, this),
        n.name === "NET" && /* @__PURE__ */ Q.jsxDEV(St, { config: n, backgroundColor: i }, void 0, !1, {
          fileName: "/app/applet/src/components/ParticleCanvas.tsx",
          lineNumber: 44,
          columnNumber: 9
        }, this),
        n.name === "JELLYFISH" && /* @__PURE__ */ Q.jsxDEV(Tt, { config: n, backgroundColor: i }, void 0, !1, {
          fileName: "/app/applet/src/components/ParticleCanvas.tsx",
          lineNumber: 47,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ Q.jsxDEV("div", { style: { position: "relative", zIndex: 10, width: "100%", height: "100%" }, children: t }, void 0, !1, {
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
function It(t) {
  const r = k({ x: -1e3, y: -1e3, isDown: !1, active: !1 });
  return J(() => {
    const o = t.current;
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
  }, [t]), r;
}
function Ft(t, r, o, i, c, g, n, s, d) {
  if (c === null || g === null || !s && d === "none")
    return { x: o, y: i };
  let y = o, v = i;
  const l = c - t, u = g - r, h = l * l + u * u, f = Math.sqrt(h);
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
class Le {
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
    const { x: d, y } = Ft(
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
function $e(t, r, o) {
  if (r <= 0 || o <= 0) return [];
  const i = Math.floor(r), c = Math.floor(o), g = document.createElement("canvas");
  g.width = i, g.height = c;
  const n = g.getContext("2d", { willReadFrequently: !0 });
  if (!n) return [];
  n.clearRect(0, 0, i, c);
  let s = Math.min(i, c) * 0.65;
  n.font = `bold ${s}px "Georgia", serif`;
  const d = n.measureText(t);
  d.width > i * 0.9 && (s = s * (i * 0.9) / d.width, n.font = `bold ${s}px "Georgia", serif`), n.fillStyle = "white", n.textAlign = "center", n.textBaseline = "middle", n.fillText(t, i / 2, c / 2.05);
  const v = n.getImageData(0, 0, i, c).data, l = [], u = Math.max(2, Math.floor(s / 40));
  for (let h = 0; h < c; h += u)
    for (let f = 0; f < i; f += u) {
      const w = (h * i + f) * 4;
      v[w + 3] > 128 && l.push({
        x: f + (Math.random() - 0.5) * 4,
        y: h + (Math.random() - 0.5) * 4
      });
    }
  return l;
}
function Nt(t, r, o) {
  const i = k(t);
  return J(() => {
    i.current = t;
  }, [t]), { getPixelsForText: $e, updateTextTargets: (g, n, s) => {
    var Y, x;
    const d = n || ((Y = o.current) == null ? void 0 : Y.offsetWidth) || window.innerWidth, y = s || ((x = o.current) == null ? void 0 : x.offsetHeight) || window.innerHeight;
    if (!g) {
      r.current.forEach((p) => {
        const C = 50 + Math.random() * (d - 100), T = 50 + Math.random() * (y - 100);
        (Math.abs(C - p.x) > 20 || Math.abs(T - p.y) > 20) && (p.vx += (Math.random() - 0.5) * 20, p.vy += (Math.random() - 0.5) * 20), p.targetX = C, p.targetY = T;
      });
      return;
    }
    const v = $e(g, d, y);
    if (v.length === 0) return;
    const l = d * 0.15, u = v.map((S) => ({ pt: S, key: S.x + (Math.random() - 0.5) * l }));
    u.sort((S, p) => S.key - p.key);
    const h = u.map((S) => S.pt), f = r.current.map((S, p) => ({ i: p, key: S.x + (Math.random() - 0.5) * l }));
    f.sort((S, p) => S.key - p.key);
    const w = f.map((S) => S.i), _ = Math.ceil(Math.sqrt(w.length));
    for (let S = 0; S < w.length; S += _) {
      const p = Math.min(S + _, w.length), C = w.slice(S, p), T = [];
      for (let D = S; D < p; D++) {
        let I;
        w.length >= h.length ? I = D % h.length : I = Math.floor(D / w.length * h.length), T.push(h[I]);
      }
      C.sort((D, I) => r.current[D].y - r.current[I].y), T.sort((D, I) => D.y - I.y);
      for (let D = 0; D < C.length; D++) {
        const I = C[D], O = r.current[I], R = T[D], z = R.x - O.x, E = R.y - O.y;
        if (Math.abs(z) > 20 || Math.abs(E) > 20) {
          O.vx += (Math.random() - 0.5) * 20, O.vy += (Math.random() - 0.5) * 20;
          const b = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10 + 5);
          O.vx += Math.sign(E) * b, O.vy -= Math.sign(z) * b;
        }
        O.targetX = R.x, O.targetY = R.y;
      }
    }
  }, textRef: i };
}
const Ee = (t) => {
  if (!t || typeof t != "string") return "0, 0, 0";
  try {
    let r = 0, o = 0, i = 0;
    if (t.length === 4)
      r = parseInt(t[1] + t[1], 16), o = parseInt(t[2] + t[2], 16), i = parseInt(t[3] + t[3], 16);
    else if (t.length === 7)
      r = parseInt(t.substring(1, 3), 16), o = parseInt(t.substring(3, 5), 16), i = parseInt(t.substring(5, 7), 16);
    else
      return t;
    return `${r}, ${o}, ${i}`;
  } catch {
    return "0, 0, 0";
  }
};
function kt({
  text: t,
  particleColor: r = "255, 255, 255",
  particleSize: o = 1,
  particleDensity: i = 1,
  particleEase: c = 1,
  isMagnet: g = !0,
  clickMode: n = "none",
  particleShape: s = "circle",
  backgroundColor: d = "#050505"
}) {
  const y = k(null), v = k(null), l = k([]), u = k(0), h = k(0), f = It(v), w = k({ isMagnet: g, clickMode: n, particleShape: s, backgroundColor: d });
  w.current = { isMagnet: g, clickMode: n, particleShape: s, backgroundColor: d };
  const { updateTextTargets: _, textRef: Y } = Nt(
    t,
    l,
    v
  ), x = () => Array.isArray(r) ? r.map((p) => Ee(p)) : Ee(r), S = (p, C, T = 1) => {
    const D = window.innerWidth < 600 ? 1500 : 3e3, I = Math.floor(D * T), O = [], R = x();
    for (let z = 0; z < I; z++) {
      const E = new Le(p, C, R);
      E.sizeMultiplier = o, E.easeMultiplier = c, O.push(E);
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
      const p = window.innerWidth < 600 ? 1500 : 3e3, C = Math.floor(p * i), T = l.current.length;
      if (C > T) {
        const D = v.current.getBoundingClientRect(), I = x();
        for (let O = 0; O < C - T; O++) {
          const R = new Le(D.width, D.height, I);
          R.sizeMultiplier = o, l.current.push(R);
        }
        _(t);
      } else C < T && l.current.splice(C);
    }
  }, [i]), J(() => {
    const p = v.current, C = y.current;
    if (!p || !C) return;
    const T = (R) => {
      for (const z of R) {
        const { width: E, height: b } = z.contentRect, F = window.devicePixelRatio || 1;
        C.width = E * F, C.height = b * F, C.style.width = `${E}px`, C.style.height = `${b}px`;
        const A = C.getContext("2d");
        A && A.scale(F, F), l.current.length === 0 && S(E, b, i), _(Y.current, E, b);
      }
    }, D = new ResizeObserver(T);
    D.observe(p), "fonts" in document && document.fonts.ready.then(() => {
      v.current && _(
        Y.current,
        v.current.offsetWidth,
        v.current.offsetHeight
      );
    });
    const I = C.getContext("2d"), O = () => {
      h.current++;
      const R = p.getBoundingClientRect(), { isMagnet: z, clickMode: E, particleShape: b, backgroundColor: F } = w.current;
      if (F === "transparent")
        I.clearRect(0, 0, R.width, R.height), I.globalCompositeOperation = "source-over";
      else {
        const W = Ee(F);
        I.fillStyle = `rgba(${W}, 0.25)`, I.fillRect(0, 0, R.width, R.height), I.globalCompositeOperation = "screen";
      }
      const A = Y.current !== "", q = f.current.active ? f.current.x : null, $ = f.current.active ? f.current.y : null, G = f.current.isDown;
      for (let W = 0; W < l.current.length; W++) {
        const H = l.current[W];
        H.update(h.current, !!A, q, $, G, z, E), H.draw(I, b, h.current);
      }
      I.globalCompositeOperation = "source-over", u.current = requestAnimationFrame(O);
    };
    return O(), () => {
      D.disconnect(), cancelAnimationFrame(u.current);
    };
  }, []), J(() => {
    _(t);
  }, [t]), /* @__PURE__ */ Q.jsxDEV(
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
function zt({
  name: t = "FOLLOW_POINTER",
  config: r,
  width: o = "100%",
  height: i = "60vh",
  backgroundColor: c = "#050505",
  className: g = "",
  style: n
}) {
  const s = {
    name: t,
    shape: "bean",
    orientation: "vertical",
    ...r
  };
  return /* @__PURE__ */ Q.jsxDEV(
    Ot,
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
  zt as ParticleBackground,
  Ot as ParticleCanvas,
  kt as TextParticleEngine,
  Ft as getMagnetTarget,
  It as useParticleInteraction,
  Nt as useTextParticles
};
