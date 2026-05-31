var H = Object.defineProperty;
var j = (n, t, e) => t in n ? H(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var y = (n, t, e) => j(n, typeof t != "symbol" ? t + "" : t, e);
import { jsx as L } from "react/jsx-runtime";
import { useRef as E, useEffect as z } from "react";
const G = {
  position: "relative",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "1rem",
  overflow: "hidden",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  transition: "all 300ms ease-out"
};
function _({
  children: n,
  width: t = "100%",
  height: e = "60vh",
  backgroundColor: r = "#050505",
  className: a = "",
  style: l
}) {
  return /* @__PURE__ */ L(
    "div",
    {
      className: a,
      style: { ...G, width: t, height: e, backgroundColor: r, ...l },
      children: n
    }
  );
}
function K(n) {
  const t = E({ x: -1e3, y: -1e3, isDown: !1, active: !1 });
  return z(() => {
    const e = n.current;
    if (!e) return;
    const r = (D) => {
      const u = e.getBoundingClientRect();
      t.current.x = D.clientX - u.left, t.current.y = D.clientY - u.top, t.current.active = !0;
    }, a = () => {
      t.current.active = !1;
    }, l = () => {
      t.current.isDown = !0;
    }, x = () => {
      t.current.isDown = !1;
    };
    return e.addEventListener("pointermove", r), e.addEventListener("pointerleave", a), e.addEventListener("pointerdown", l), e.addEventListener("pointerup", x), e.style.touchAction = "none", () => {
      e.removeEventListener("pointermove", r), e.removeEventListener("pointerleave", a), e.removeEventListener("pointerdown", l), e.removeEventListener("pointerup", x);
    };
  }, [n]), t;
}
function U(n, t, e, r, a, l, x, D, u) {
  if (a === null || l === null || !D && u === "none")
    return { x: e, y: r };
  let g = e, h = r;
  const i = a - n, d = l - t, f = i * i + d * d, p = Math.sqrt(f);
  if (D && !x && f < 3e4) {
    const v = (3e4 - f) / 3e4;
    g += i * v * 0.15, h += d * v * 0.15;
  }
  if (x && u !== "none") {
    if (u === "attract") {
      if (f < 3e4) {
        const v = (3e4 - f) / 3e4;
        g += i * v * 0.8, h += d * v * 0.8;
      }
    } else if (u === "repel" && f < 5e4 && p > 0) {
      const v = Math.pow(Math.max(0, 5e4 - f) / 5e4, 1.2);
      g -= i / p * v * 400, h -= d / p * v * 400;
    }
  }
  return { x: g, y: h };
}
class O {
  constructor(t, e, r = "255, 255, 255") {
    y(this, "x");
    y(this, "y");
    y(this, "vx");
    y(this, "vy");
    y(this, "targetX");
    y(this, "targetY");
    y(this, "baseColor");
    y(this, "opacity");
    y(this, "size");
    y(this, "sizeMultiplier");
    y(this, "friction");
    y(this, "ease");
    y(this, "easeMultiplier");
    y(this, "floatSpeed");
    y(this, "floatOffset");
    this.x = Math.random() * t, this.y = Math.random() * e, this.targetX = this.x, this.targetY = this.y, this.vx = 0, this.vy = 0, this.size = Math.random() * 1.8 + 0.5, this.sizeMultiplier = 1, this.baseColor = Array.isArray(r) ? r[Math.floor(Math.random() * r.length)] : r, this.opacity = 0.4 + Math.random() * 0.6, this.friction = 0.82 + Math.random() * 0.1, this.ease = 0.03 + Math.random() * 0.05, this.easeMultiplier = 1, this.floatSpeed = Math.random() * 0.02 + 5e-3, this.floatOffset = Math.random() * Math.PI * 2;
  }
  update(t, e, r = null, a = null, l = !1, x = !0, D = "none") {
    const { x: u, y: g } = U(
      this.x,
      this.y,
      this.targetX,
      this.targetY,
      r,
      a,
      l,
      x,
      D
    ), h = u - this.x, i = g - this.y, d = e ? 0 : Math.cos(t * 0.01 + this.y * 0.01) * 0.5, f = e ? 0 : Math.sin(t * 0.01 + this.x * 0.01) * 0.5;
    this.vx += h * (this.ease * this.easeMultiplier) + d, this.vy += i * (this.ease * this.easeMultiplier) + f, this.vx *= this.friction, this.vy *= this.friction, this.x += this.vx, this.y += this.vy;
    const p = e ? 0.2 : 2;
    this.x += Math.cos(t * this.floatSpeed + this.floatOffset) * p, this.y += Math.sin(t * this.floatSpeed + this.floatOffset) * p;
  }
  draw(t, e = "circle") {
    t.fillStyle = `rgba(${this.baseColor}, ${this.opacity})`;
    const r = Math.max(0.1, this.size * this.sizeMultiplier);
    e === "square" ? t.fillRect(this.x - r, this.y - r, r * 2, r * 2) : (t.beginPath(), t.arc(this.x, this.y, r, 0, Math.PI * 2), t.fill());
  }
}
function A(n, t, e) {
  if (t <= 0 || e <= 0) return [];
  const r = document.createElement("canvas");
  r.width = t, r.height = e;
  const a = r.getContext("2d", { willReadFrequently: !0 });
  if (!a) return [];
  a.clearRect(0, 0, t, e);
  let l = Math.min(t, e) * 0.65;
  a.font = `bold ${l}px "Georgia", serif`;
  const x = a.measureText(n);
  x.width > t * 0.9 && (l = l * (t * 0.9) / x.width, a.font = `bold ${l}px "Georgia", serif`), a.fillStyle = "white", a.textAlign = "center", a.textBaseline = "middle", a.fillText(n, t / 2, e / 2.05);
  const u = a.getImageData(0, 0, t, e).data, g = [], h = window.innerWidth < 600 ? 6 : 8;
  for (let i = 0; i < e; i += h)
    for (let d = 0; d < t; d += h) {
      const f = (i * t + d) * 4;
      u[f + 3] > 128 && g.push({
        x: d + (Math.random() - 0.5) * 4,
        y: i + (Math.random() - 0.5) * 4
      });
    }
  return g;
}
function J(n, t, e) {
  const r = E(n);
  return z(() => {
    r.current = n;
  }, [n]), { getPixelsForText: A, updateTextTargets: (l, x, D) => {
    var S, X;
    const u = x || ((S = e.current) == null ? void 0 : S.offsetWidth) || window.innerWidth, g = D || ((X = e.current) == null ? void 0 : X.offsetHeight) || window.innerHeight;
    if (!l) {
      t.current.forEach((o) => {
        const M = 50 + Math.random() * (u - 100), b = 50 + Math.random() * (g - 100);
        (Math.abs(M - o.x) > 20 || Math.abs(b - o.y) > 20) && (o.vx += (Math.random() - 0.5) * 20, o.vy += (Math.random() - 0.5) * 20), o.targetX = M, o.targetY = b;
      });
      return;
    }
    const h = A(l, u, g);
    if (h.length === 0) return;
    const i = u * 0.15, d = h.map((s) => ({ pt: s, key: s.x + (Math.random() - 0.5) * i }));
    d.sort((s, o) => s.key - o.key);
    const f = d.map((s) => s.pt), p = t.current.map((s, o) => ({ i: o, key: s.x + (Math.random() - 0.5) * i }));
    p.sort((s, o) => s.key - o.key);
    const P = p.map((s) => s.i), v = Math.ceil(Math.sqrt(P.length));
    for (let s = 0; s < P.length; s += v) {
      const o = Math.min(s + v, P.length), M = P.slice(s, o), b = [];
      for (let c = s; c < o; c++)
        b.push(f[c % f.length]);
      M.sort((c, w) => t.current[c].y - t.current[w].y), b.sort((c, w) => c.y - w.y);
      for (let c = 0; c < M.length; c++) {
        const w = M[c], m = t.current[w], R = b[c], T = R.x - m.x, C = R.y - m.y;
        if (Math.abs(T) > 20 || Math.abs(C) > 20) {
          m.vx += (Math.random() - 0.5) * 20, m.vy += (Math.random() - 0.5) * 20;
          const I = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10 + 5);
          m.vx += Math.sign(C) * I, m.vy -= Math.sign(T) * I;
        }
        m.targetX = R.x, m.targetY = R.y;
      }
    }
  }, textRef: r };
}
const N = (n) => {
  if (!n || typeof n != "string") return "0, 0, 0";
  try {
    let t = 0, e = 0, r = 0;
    return n.length === 4 ? (t = parseInt(n[1] + n[1], 16), e = parseInt(n[2] + n[2], 16), r = parseInt(n[3] + n[3], 16)) : n.length === 7 && (t = parseInt(n.substring(1, 3), 16), e = parseInt(n.substring(3, 5), 16), r = parseInt(n.substring(5, 7), 16)), `${t}, ${e}, ${r}`;
  } catch {
    return "0, 0, 0";
  }
};
function tt({
  text: n,
  particleColor: t = "255, 255, 255",
  particleSize: e = 1,
  particleDensity: r = 1,
  particleEase: a = 1,
  isMagnet: l = !0,
  clickMode: x = "none",
  particleShape: D = "circle",
  backgroundColor: u = "#050505"
}) {
  const g = E(null), h = E(null), i = E([]), d = E(0), f = E(0), p = K(h), P = E({ isMagnet: l, clickMode: x, particleShape: D, backgroundColor: u });
  P.current = { isMagnet: l, clickMode: x, particleShape: D, backgroundColor: u };
  const { updateTextTargets: v, textRef: S } = J(n, i, h), X = (s, o, M = 1) => {
    const b = window.innerWidth < 600 ? 1500 : 3e3, c = Math.floor(b * M), w = [];
    for (let m = 0; m < c; m++) {
      const R = new O(s, o, t);
      R.sizeMultiplier = e, R.easeMultiplier = a, w.push(R);
    }
    i.current = w;
  };
  return z(() => {
    i.current.length > 0 && i.current.forEach((s) => {
      s.baseColor = Array.isArray(t) ? t[Math.floor(Math.random() * t.length)] : t;
    });
  }, [t]), z(() => {
    i.current.length > 0 && i.current.forEach((s) => {
      s.sizeMultiplier = e;
    });
  }, [e]), z(() => {
    i.current.length > 0 && i.current.forEach((s) => {
      s.easeMultiplier = a;
    });
  }, [a]), z(() => {
    if (i.current.length > 0 && g.current && h.current) {
      const s = window.innerWidth < 600 ? 1500 : 3e3, o = Math.floor(s * r), M = i.current.length;
      if (o > M) {
        const b = h.current.getBoundingClientRect();
        for (let c = 0; c < o - M; c++) {
          const w = new O(b.width, b.height, t);
          w.sizeMultiplier = e, i.current.push(w);
        }
        v(n);
      } else o < M && i.current.splice(o);
    }
  }, [r]), z(() => {
    const s = h.current, o = g.current;
    if (!s || !o) return;
    const M = (m) => {
      for (const R of m) {
        const { width: T, height: C } = R.contentRect, I = window.devicePixelRatio || 1;
        o.width = T * I, o.height = C * I, o.style.width = `${T}px`, o.style.height = `${C}px`;
        const Y = o.getContext("2d");
        Y && Y.scale(I, I), i.current.length === 0 && X(T, C, r), v(n, T, C);
      }
    }, b = new ResizeObserver(M);
    b.observe(s);
    const c = o.getContext("2d"), w = () => {
      f.current++;
      const m = s.getBoundingClientRect(), { isMagnet: R, clickMode: T, particleShape: C, backgroundColor: I } = P.current, Y = N(I);
      c.fillStyle = `rgba(${Y}, 0.25)`, c.fillRect(0, 0, m.width, m.height), c.globalCompositeOperation = "screen";
      const W = S.current !== "", q = p.current.active ? p.current.x : null, B = p.current.active ? p.current.y : null, F = p.current.isDown;
      for (let $ = 0; $ < i.current.length; $++) {
        const k = i.current[$];
        k.update(f.current, !!W, q, B, F, R, T), k.draw(c, C);
      }
      c.globalCompositeOperation = "source-over", d.current = requestAnimationFrame(w);
    };
    return w(), () => {
      b.disconnect(), cancelAnimationFrame(d.current);
    };
  }, []), z(() => {
    v(n);
  }, [n]), /* @__PURE__ */ L(
    "div",
    {
      ref: h,
      style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" },
      children: /* @__PURE__ */ L(
        "canvas",
        {
          ref: g,
          style: { display: "block", width: "100%", height: "100%" }
        }
      )
    }
  );
}
export {
  _ as ParticleCanvas,
  tt as TextParticleEngine,
  U as getMagnetTarget,
  K as useParticleInteraction,
  J as useTextParticles
};
