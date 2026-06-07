var J = Object.defineProperty;
var K = (t, e, n) => e in t ? J(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var g = (t, e, n) => K(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as $, jsxs as _ } from "react/jsx-runtime";
import { useRef as I, useEffect as L } from "react";
function U(t, e, n, i) {
  let s = e + t.baseX, m = n + t.baseY;
  s += Math.sin(i * t.randomSpeed + t.baseY * 0.05) * 15 * t.z, m += Math.cos(i * t.randomSpeed + t.baseX * 0.05) * 15 * t.z;
  const r = s - t.x, o = m - t.y, h = r * 0.06, y = o * 0.06;
  return { forceX: h, forceY: y };
}
function Q(t, e, n, i, s, m) {
  const r = i, o = s, h = t.x - r, y = t.y - o, d = Math.max(Math.sqrt(h * h + y * y), 1);
  let c = 0, a = 0;
  const u = Math.sin(d * 0.02 - m * 3) * 2.5 * t.z;
  c += h / d * u, a += y / d * u;
  const P = Math.cos(d * 0.01 - m * 1 + t.randomSpeed) * 0.8 * t.z, q = -y / d, b = h / d;
  return c += q * P, a += b * P, { forceX: c, forceY: a, dxCenter: h, dyCenter: y, distToCenter: d };
}
function V(t, e) {
  let s = Math.min(e / 400, 1) * 2.5 + t.sizeBias * 1;
  s < 0.4 && (s = 0), t.scale += (s - t.scale) * 0.15;
}
function Z(t, e, n, i, s, m) {
  let r = 0, o = 0;
  s === "horizontal" ? (r = 1, o = 0) : s === "diagonal" ? (r = -e / i, o = -n / i) : (r = -n / i, o = e / i);
  const h = Math.atan2(o, r), y = t.sizeBias > 0.3 ? 1 : 0, d = Math.max(0, Math.sin(m * 0.5 + t.randomSpeed * 10)), c = Math.sin(m * 3 + t.baseX * 0.1 + t.randomSpeed) * 0.5 * d * y;
  r = Math.cos(h + c), o = Math.sin(h + c);
  const a = Math.max(1 - i / 400, 0.1);
  s === "horizontal" ? (t.dirX = t.dirX * (1 - 0.2) + r * 0.2, t.dirY = t.dirY * (1 - 0.2) + o * 0.2) : (t.dirX = t.dirX * (1 - a * 0.3) + r * a * 0.3, t.dirY = t.dirY * (1 - a * 0.3) + o * a * 0.3);
  const l = Math.sqrt(t.dirX * t.dirX + t.dirY * t.dirY);
  l > 0 && (t.dirX /= l, t.dirY /= l);
}
class tt {
  constructor(e, n, i) {
    g(this, "x");
    g(this, "y");
    g(this, "baseX");
    // Relative X to swarm center
    g(this, "baseY");
    // Relative Y to swarm center
    g(this, "z");
    g(this, "vx");
    g(this, "vy");
    g(this, "color");
    g(this, "targetColor", null);
    g(this, "colorDelay", 0);
    g(this, "angleTarget");
    g(this, "randomSpeed");
    g(this, "sizeBias");
    g(this, "scale");
    g(this, "dirX");
    g(this, "dirY");
    g(this, "initialized", !1);
    this.x = e, this.y = n, this.baseX = e, this.baseY = n, this.z = Math.random() * 1.5 + 0.2, this.vx = 0, this.vy = 0, this.color = i, this.angleTarget = Math.random() * Math.PI * 2, this.randomSpeed = Math.random() * 2 + 1, this.sizeBias = Math.random(), this.scale = 1, this.dirX = Math.cos(this.angleTarget), this.dirY = Math.sin(this.angleTarget);
  }
  update(e, n, i, s, m, r, o, h = "vertical") {
    this.initialized || (this.x = i + this.baseX, this.y = s + this.baseY, this.initialized = !0);
    const {
      forceX: y,
      forceY: d,
      dxCenter: c,
      dyCenter: a,
      distToCenter: l
    } = Q(this, e, n, i, s, o), {
      forceX: u,
      forceY: w
    } = U(this, i, s, o);
    this.vx += y + u, this.vy += d + w, this.vx *= 0.75, this.vy *= 0.75, this.x += this.vx, this.y += this.vy, V(this, l), Z(this, c, a, l, h, o), this.targetColor && (this.colorDelay -= 1, this.colorDelay <= 0 && (this.color = this.targetColor, this.targetColor = null));
  }
  draw(e, n, i = "bean") {
    if (this.scale <= 0.05) return;
    e.fillStyle = this.color;
    const s = Math.sqrt(this.baseX * this.baseX + this.baseY * this.baseY), m = Math.max(0, 1 - s / 350);
    if (e.globalAlpha = Math.min(1, (0.5 + this.z * 0.5) * Math.min(this.scale, 1) * m), !(e.globalAlpha <= 0.01))
      if (i === "circle") {
        const r = Math.max(0.1, 2 * this.scale * this.z);
        e.beginPath(), e.arc(this.x, this.y, r, 0, Math.PI * 2), e.fill();
      } else if (i === "square") {
        const r = Math.max(0.1, 2 * this.scale * this.z);
        e.fillRect(this.x - r, this.y - r, r * 2, r * 2);
      } else {
        const o = (6 + this.sizeBias * 6) * this.scale, h = Math.sin(n * 3.5 + this.baseX * 0.1 + this.randomSpeed * 5), y = 0.4 + 0.6 * ((h + 1) / 2), d = o * 0.5 * y, c = Math.max(0.8, this.z * 1.5 * this.scale * (0.8 + 0.2 * h)), a = Math.atan2(this.dirY, this.dirX);
        e.beginPath(), e.ellipse(this.x, this.y, d, c, a, 0, Math.PI * 2), e.fill();
      }
  }
}
function et({ config: t, backgroundColor: e }) {
  const n = I(null), i = I(null), s = I([]), m = I(0), r = I({ x: -1e3, y: -1e3, isDown: !1, active: !1 }), o = I({ x: 0, y: 0, initialized: !1 });
  L(() => {
    const c = (l) => {
      if (!n.current) return;
      const u = n.current.getBoundingClientRect();
      r.current.x = l.clientX - u.left, r.current.y = l.clientY - u.top, r.current.active = !0;
    }, a = () => {
      r.current.active = !1;
    };
    return window.addEventListener("pointermove", c), window.addEventListener("pointerleave", a), () => {
      window.removeEventListener("pointermove", c), window.removeEventListener("pointerleave", a);
    };
  }, []);
  const h = I(t), y = I(null), d = I(0);
  return L(() => {
    h.current = t;
  }, [t]), L(() => {
    if (y.current && (clearInterval(y.current), y.current = null), !t.colors || t.colors.length === 0) {
      const a = t.color || "#8B5CF6";
      s.current.forEach((l) => {
        l.targetColor = a, l.colorDelay = Math.random() * 20;
      });
      return;
    }
    const c = (a) => {
      const l = r.current.active ? r.current.x : o.current.x, u = r.current.active ? r.current.y : o.current.y;
      s.current.forEach((w) => {
        const P = w.x - l, q = w.y - u, b = Math.sqrt(P * P + q * q);
        w.targetColor = a, w.colorDelay = Math.max(0, b * 0.15);
      });
    };
    return t.colorMode === "mixed" ? s.current.forEach((a, l) => {
      a.targetColor = t.colors[l % t.colors.length], a.colorDelay = Math.random() * 20;
    }) : (d.current = 0, c(t.colors[0]), t.colors.length > 1 && (y.current = setInterval(() => {
      const a = t.colors;
      d.current = (d.current + 1) % a.length, c(a[d.current]);
    }, 3e3))), () => {
      y.current && clearInterval(y.current);
    };
  }, [t.colors, t.color, t.colorMode]), L(() => {
    if (!n.current || !i.current || h.current.name === "NONE") return;
    const c = i.current, a = n.current, l = (b) => {
      for (const C of b) {
        const { width: f, height: p } = C.contentRect, R = window.devicePixelRatio || 1;
        c.width = f * R, c.height = p * R, c.style.width = `${f}px`, c.style.height = `${p}px`;
        const S = c.getContext("2d");
        S && S.scale(R, R), s.current = [];
        const z = Math.floor(350 * (h.current.density ?? 1)), v = h.current.colors, X = h.current.colorMode || "wave";
        for (let M = 0; M < z; M++) {
          const x = Math.sqrt(Math.random()) * 350, Y = Math.random() * Math.PI * 2, E = Math.cos(Y) * x, T = Math.sin(Y) * x;
          let F;
          if (v && v.length > 0)
            F = X === "mixed" ? v[M % v.length] : v[0];
          else if (h.current.color)
            F = h.current.color;
          else {
            const A = 210 + Math.max(0, Math.min(1, (E + 350) / 700)) * 130 + (Math.random() * 15 - 7.5), O = 75 + Math.random() * 25, N = 60 + Math.random() * 15;
            F = `hsl(${A}, ${O}%, ${N}%)`;
          }
          s.current.push(new tt(E, T, F));
        }
      }
    }, u = new ResizeObserver(l);
    u.observe(a);
    const w = c.getContext("2d");
    let P = 0;
    const q = () => {
      const b = a.getBoundingClientRect();
      if (w.clearRect(0, 0, b.width, b.height), e !== "transparent" && (w.fillStyle = e, w.fillRect(0, 0, b.width, b.height)), o.current.initialized || (o.current.x = b.width / 2, o.current.y = b.height / 2, o.current.initialized = !0), h.current.name === "FOLLOW_POINTER") {
        let C = b.width / 2, f = b.height / 2;
        const p = r.current.active ? r.current.x : null, R = r.current.active ? r.current.y : null;
        p !== null && R !== null && (C = p, f = R);
        const S = h.current.pointerTrackingSpeed ?? 0.06;
        o.current.x += (C - o.current.x) * S, o.current.y += (f - o.current.y) * S;
        const D = h.current.particleSpeed ?? 1;
        P += 0.012 * D;
        const z = s.current, v = 18, X = v * v;
        for (let M = 0; M < z.length; M++) {
          const x = z[M];
          for (let Y = M + 1; Y < z.length; Y++) {
            const E = z[Y], T = x.x - E.x, F = x.y - E.y, W = T * T + F * F;
            if (W < X && W > 0) {
              const A = Math.sqrt(W), O = (v - A) / v, N = T / A * O * 0.8, B = F / A * O * 0.8;
              x.x += N, x.y += B, E.x -= N, E.y -= B, x.vx += N * 0.1, x.vy += B * 0.1, E.vx -= N * 0.1, E.vy -= B * 0.1;
            }
          }
        }
        for (const M of z) {
          M.update(p, R, o.current.x, o.current.y, b.width, b.height, P, h.current.orientation);
          const x = h.current.shape || "bean";
          M.draw(w, P, x);
        }
      }
      m.current = requestAnimationFrame(q);
    };
    return q(), () => {
      u.disconnect(), cancelAnimationFrame(m.current);
    };
  }, [e, t.density]), t.name === "NONE" ? null : /* @__PURE__ */ $("div", { ref: n, style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }, children: /* @__PURE__ */ $("canvas", { ref: i, style: { display: "block", width: "100%", height: "100%" } }) });
}
class nt {
  constructor(e, n) {
    g(this, "x");
    g(this, "y");
    g(this, "vx");
    g(this, "vy");
    g(this, "radius");
    g(this, "currentColor", "#8B5CF6");
    g(this, "targetColor", null);
    g(this, "colorDelay", 0);
    this.x = e, this.y = n;
    const i = Math.random() * Math.PI * 2, s = Math.random() * 0.5 + 0.1;
    this.vx = Math.cos(i) * s, this.vy = Math.sin(i) * s, this.radius = Math.random() * 1.5 + 1;
  }
  update(e, n, i, s, m = 1, r = 0.06) {
    if (this.x += this.vx * m, this.y += this.vy * m, this.x < 0 ? (this.x = 0, this.vx *= -1) : this.x > e && (this.x = e, this.vx *= -1), this.y < 0 ? (this.y = 0, this.vy *= -1) : this.y > n && (this.y = n, this.vy *= -1), i !== null && s !== null) {
      const o = i - this.x, h = s - this.y, y = o * o + h * h, d = 150, c = d * d;
      if (y < c) {
        const a = Math.sqrt(y), l = (d - a) / d, u = r / 0.06;
        this.x -= o / a * l * 2 * u, this.y -= h / a * l * 2 * u;
      }
    }
    this.targetColor && (this.colorDelay -= 1 * m, this.colorDelay <= 0 && (this.currentColor = this.targetColor, this.targetColor = null));
  }
  draw(e, n = "circle", i = 0) {
    if (e.fillStyle = this.currentColor, n === "square")
      e.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    else if (n === "bean") {
      const s = Math.sin(i * 0.05 + this.x * 0.01 + this.y * 0.01), m = this.radius * 2 * (0.8 + 0.4 * s), r = this.radius * (0.8 + 0.2 * s), o = this.vx !== 0 || this.vy !== 0 ? Math.atan2(this.vy, this.vx) : 0;
      e.beginPath(), e.ellipse(this.x, this.y, m, r, o, 0, Math.PI * 2), e.fill();
    } else
      e.beginPath(), e.arc(this.x, this.y, this.radius, 0, Math.PI * 2), e.fill();
  }
}
function rt({ config: t, backgroundColor: e }) {
  const n = I(null), i = I(null), s = I([]), m = I(0), r = I({ x: -1e3, y: -1e3, active: !1 });
  L(() => {
    const d = (a) => {
      if (!n.current) return;
      const l = n.current.getBoundingClientRect();
      r.current.x = a.clientX - l.left, r.current.y = a.clientY - l.top, r.current.active = !0;
    }, c = () => {
      r.current.active = !1;
    };
    return window.addEventListener("pointermove", d), window.addEventListener("pointerleave", c), () => {
      window.removeEventListener("pointermove", d), window.removeEventListener("pointerleave", c);
    };
  }, []);
  const o = I(t), h = I(0), y = I(null);
  return L(() => {
    o.current = t;
  }, [t]), L(() => {
    if (y.current && (clearInterval(y.current), y.current = null), !t.colors || t.colors.length === 0) {
      const l = t.color || "#8B5CF6";
      s.current.forEach((u) => {
        u.targetColor = l, u.colorDelay = Math.random() * 20;
      });
      return;
    }
    const d = r.current.active ? r.current.x : n.current ? n.current.clientWidth / 2 : 0, c = r.current.active ? r.current.y : n.current ? n.current.clientHeight / 2 : 0, a = (l) => {
      s.current.forEach((u) => {
        const w = u.x - d, P = u.y - c, q = Math.sqrt(w * w + P * P);
        u.targetColor = l, u.colorDelay = Math.max(0, q * 0.2);
      });
    };
    return t.colorMode === "mixed" ? s.current.forEach((l, u) => {
      l.targetColor = t.colors[u % t.colors.length], l.colorDelay = Math.random() * 20;
    }) : (h.current = 0, a(t.colors[0]), t.colors.length > 1 && (y.current = setInterval(() => {
      const l = t.colors;
      h.current = (h.current + 1) % l.length, a(l[h.current]);
    }, 3e3))), () => {
      y.current && clearInterval(y.current);
    };
  }, [t.colors, t.color, t.colorMode]), L(() => {
    if (!n.current || !i.current) return;
    const d = i.current, c = n.current, a = (q) => {
      for (const b of q) {
        const { width: C, height: f } = b.contentRect, p = window.devicePixelRatio || 1;
        d.width = C * p, d.height = f * p, d.style.width = `${C}px`, d.style.height = `${f}px`;
        const R = d.getContext("2d");
        R && R.scale(p, p), s.current = [];
        const S = C * f, D = o.current.density ?? 1, z = Math.min(
          Math.floor(300 * D),
          Math.floor(S / 6e3 * D)
        ), v = o.current.colors, X = o.current.colorMode || "wave";
        for (let M = 0; M < z; M++) {
          const x = new nt(Math.random() * C, Math.random() * f);
          v && v.length > 0 ? x.currentColor = X === "mixed" ? v[M % v.length] : v[0] : o.current.color && (x.currentColor = o.current.color), s.current.push(x);
        }
      }
    }, l = new ResizeObserver(a);
    l.observe(c);
    const u = d.getContext("2d");
    let w = 0;
    const P = () => {
      w += 1;
      const q = c.getBoundingClientRect();
      u.clearRect(0, 0, q.width, q.height), e !== "transparent" && (u.fillStyle = e, u.fillRect(0, 0, q.width, q.height));
      const b = r.current.active ? r.current.x : null, C = r.current.active ? r.current.y : null, f = s.current, p = o.current.shape || "circle", R = 120, S = R * R, D = o.current.particleSpeed ?? 1, z = o.current.pointerTrackingSpeed ?? 0.06;
      for (let v = 0; v < f.length; v++) {
        const X = f[v];
        X.update(q.width, q.height, b, C, D, z), u.globalAlpha = 1, X.draw(u, p, w);
        for (let M = v + 1; M < f.length; M++) {
          const x = f[M], Y = X.x - x.x, E = X.y - x.y, T = Y * Y + E * E;
          if (T < S) {
            const F = 1 - Math.sqrt(T) / R;
            u.beginPath(), u.moveTo(X.x, X.y), u.lineTo(x.x, x.y), u.strokeStyle = X.currentColor, u.globalAlpha = F * 0.5, u.lineWidth = 1, u.stroke();
          }
        }
      }
      if (u.globalAlpha = 1, b !== null && C !== null)
        for (let M = 0; M < f.length; M++) {
          const x = f[M], Y = x.x - b, E = x.y - C, T = Y * Y + E * E;
          if (T < 22500) {
            const F = 1 - Math.sqrt(T) / 150;
            u.beginPath(), u.moveTo(x.x, x.y), u.lineTo(b, C), u.strokeStyle = x.currentColor, u.globalAlpha = F * 0.8, u.lineWidth = 1.5, u.stroke();
          }
        }
      u.globalAlpha = 1, m.current = requestAnimationFrame(P);
    };
    return P(), () => {
      l.disconnect(), cancelAnimationFrame(m.current);
    };
  }, [e, t.density]), /* @__PURE__ */ $("div", { ref: n, style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }, children: /* @__PURE__ */ $("canvas", { ref: i, style: { display: "block", width: "100%", height: "100%" } }) });
}
class st {
  constructor(e, n, i, s) {
    g(this, "x", 0);
    g(this, "y", 0);
    g(this, "baseX");
    g(this, "baseY");
    g(this, "vx", 0);
    g(this, "vy", 0);
    g(this, "color");
    g(this, "size");
    g(this, "angle");
    g(this, "dist");
    g(this, "spring");
    g(this, "friction");
    g(this, "targetColor", null);
    g(this, "colorDelay", 0);
    this.baseX = e, this.baseY = n, this.color = i, this.size = s, this.angle = Math.atan2(n, e), this.dist = Math.sqrt(e * e + n * n);
    const m = Math.min(1, this.dist / 350);
    this.spring = 0.15 - m * 0.13, this.friction = 0.85 + m * 0.1;
  }
  update(e, n, i, s) {
    const r = 1 + Math.sin(this.angle * 3 + i * 1.2) * 0.05 + Math.cos(this.angle * 5 - i * 0.6) * 0.03, o = this.dist * s * r, h = Math.cos(this.angle) * o, y = Math.sin(this.angle) * o, d = this.dist * 0.1 * r, c = Math.sin(i * 3 + this.dist * 0.05) * d, a = e + h + Math.cos(this.angle + Math.PI / 2) * c, l = n + y + Math.sin(this.angle + Math.PI / 2) * c, u = a - this.x, w = l - this.y;
    this.vx += u * this.spring, this.vy += w * this.spring, this.vx *= this.friction, this.vy *= this.friction, this.x += this.vx, this.y += this.vy, this.targetColor && (this.colorDelay -= 1, this.colorDelay <= 0 && (this.color = this.targetColor, this.targetColor = null));
  }
  draw(e, n, i) {
    const s = Math.min(1, this.dist / 350), m = 1 + (1 - s) * (i - 1) * 1.5, r = this.size * m;
    e.globalAlpha = Math.max(0.15, 1 - s * 0.7), e.fillStyle = this.color, e.beginPath(), n === "circle" ? e.arc(this.x, this.y, r, 0, Math.PI * 2) : n === "square" ? e.rect(this.x - r, this.y - r, r * 2, r * 2) : e.ellipse(this.x, this.y, r * 1.5, r, 0, 0, Math.PI * 2), e.fill();
  }
}
function ot({ config: t, backgroundColor: e }) {
  const n = I(null), i = I(null), s = I([]), m = I(0), r = I({ x: -1e3, y: -1e3, active: !1 }), o = I({ x: 0, y: 0, initialized: !1, angle: -Math.PI / 2 });
  L(() => {
    const c = (a) => {
      if (!n.current) return;
      const l = n.current.getBoundingClientRect();
      r.current.x = a.clientX - l.left, r.current.y = a.clientY - l.top, r.current.active = !0;
    };
    return window.addEventListener("pointermove", c), () => {
      window.removeEventListener("pointermove", c);
    };
  }, []);
  const h = I(t), y = I(0), d = I(null);
  return L(() => {
    h.current = t;
  }, [t]), L(() => {
    if (d.current && (clearInterval(d.current), d.current = null), !t.colors || t.colors.length === 0) {
      const a = t.color || "#8B5CF6";
      s.current.forEach((l) => {
        l.targetColor = a, l.colorDelay = Math.random() * 20;
      });
      return;
    }
    const c = (a) => {
      s.current.forEach((l) => {
        l.targetColor = a, l.colorDelay = Math.max(0, l.dist * 0.2);
      });
    };
    return t.colorMode === "mixed" ? s.current.forEach((a, l) => {
      a.targetColor = t.colors[l % t.colors.length], a.colorDelay = Math.max(0, a.dist * 0.2) + Math.random() * 10;
    }) : (y.current = 0, c(t.colors[0]), t.colors.length > 1 && (d.current = setInterval(() => {
      const a = t.colors;
      y.current = (y.current + 1) % a.length, c(a[y.current]);
    }, 3e3))), () => {
      d.current && clearInterval(d.current);
    };
  }, [t.colors, t.color, t.colorMode]), L(() => {
    if (!n.current || !i.current) return;
    const c = i.current, a = n.current, l = (b) => {
      for (const C of b) {
        const { width: f, height: p } = C.contentRect, R = window.devicePixelRatio || 1;
        c.width = f * R, c.height = p * R, c.style.width = `${f}px`, c.style.height = `${p}px`;
        const S = c.getContext("2d");
        S && S.scale(R, R), s.current = [];
        const z = Math.floor(350 * (h.current.density ?? 1)), v = h.current.colors, X = h.current.colorMode || "wave";
        for (let M = 0; M < z; M++) {
          const x = Math.random() * Math.PI * 2, Y = Math.sqrt(Math.random()) * 350, E = Math.cos(x) * Y, T = Math.sin(x) * Y;
          let F;
          if (v && v.length > 0)
            F = X === "mixed" ? v[M % v.length] : v[0];
          else if (h.current.color)
            F = h.current.color;
          else {
            const O = 260 + Math.random() * 60, N = 70 + Math.random() * 30, B = 60 + Math.random() * 20;
            F = `hsl(${O}, ${N}%, ${B}%)`;
          }
          let W = 2 + Math.random() * 2;
          Y > 200 && (W *= 0.6), Y < 80 && (W *= 1.5);
          const A = new st(E, T, F, W);
          A.x = f / 2, A.y = p / 2, s.current.push(A);
        }
      }
    }, u = new ResizeObserver(l);
    u.observe(a);
    const w = c.getContext("2d");
    let P = 0;
    const q = () => {
      const b = a.getBoundingClientRect();
      w.globalCompositeOperation = "source-over", e === "transparent" ? w.clearRect(0, 0, b.width, b.height) : (w.fillStyle = e, w.fillRect(0, 0, b.width, b.height)), o.current.initialized || (o.current.x = b.width / 2, o.current.y = b.height / 2, o.current.initialized = !0);
      let C = b.width / 2, f = b.height / 2;
      const p = r.current.active ? r.current.x : null, R = r.current.active ? r.current.y : null;
      p !== null && R !== null && (C = p, f = R);
      const S = C - o.current.x, D = f - o.current.y, z = Math.sqrt(S * S + D * D);
      let v = 0, X = 0;
      z > 1 ? (v = S / z, X = D / z, o.current.angle = Math.atan2(X, v)) : (v = Math.cos(o.current.angle), X = Math.sin(o.current.angle));
      const M = h.current.particleSpeed ?? 1;
      P += 0.02 * M;
      const x = P % 4;
      let Y = 1, E = 1, T = 0;
      if (x < 1) {
        const B = x;
        Y = 1 - Math.sin(B * Math.PI) * 0.3, E = 1 + Math.sin(B * Math.PI) * 0.15, T = Math.sin(B * Math.PI) * 12;
      } else {
        const B = (x - 1) / 3;
        Y = 0.7 + 0.3 * Math.sin(B * Math.PI / 2), E = 1, T = 0;
      }
      const F = h.current.pointerTrackingSpeed ?? 0.02;
      o.current.x += S * F, o.current.y += D * F, o.current.x += v * T * M, o.current.y += X * T * M;
      const A = 200 * (E + (x < 1 ? x * 0.15 : 0)), O = w.createRadialGradient(
        o.current.x,
        o.current.y,
        0,
        o.current.x,
        o.current.y,
        A
      );
      O.addColorStop(0, "rgba(80, 150, 255, 0.05)"), O.addColorStop(1, "rgba(80, 150, 255, 0)"), w.fillStyle = O, w.beginPath(), w.arc(o.current.x, o.current.y, A, 0, Math.PI * 2), w.fill();
      const N = s.current;
      w.globalCompositeOperation = "source-over";
      for (const B of N) {
        B.update(o.current.x, o.current.y, P, Y);
        const G = h.current.shape || "circle";
        B.draw(w, G, E);
      }
      m.current = requestAnimationFrame(q);
    };
    return q(), () => {
      u.disconnect(), cancelAnimationFrame(m.current);
    };
  }, [e, t.density]), /* @__PURE__ */ $(
    "div",
    {
      ref: n,
      style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" },
      children: /* @__PURE__ */ $(
        "canvas",
        {
          ref: i,
          style: { display: "block", width: "100%", height: "100%", pointerEvents: "none" }
        }
      )
    }
  );
}
const it = {
  position: "relative",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "1rem",
  overflow: "hidden",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  transition: "all 300ms ease-out"
};
function ft({
  children: t,
  width: e = "100%",
  height: n = "60vh",
  backgroundColor: i = "#050505",
  className: s = "",
  style: m,
  background: r = { name: "NONE" }
}) {
  return /* @__PURE__ */ _(
    "div",
    {
      className: s,
      style: { ...it, width: e, height: n, backgroundColor: i, ...m },
      children: [
        r.name === "FOLLOW_POINTER" && /* @__PURE__ */ $(et, { config: r, backgroundColor: i }),
        r.name === "NET" && /* @__PURE__ */ $(rt, { config: r, backgroundColor: i }),
        r.name === "JELLYFISH" && /* @__PURE__ */ $(ot, { config: r, backgroundColor: i }),
        /* @__PURE__ */ $("div", { style: { position: "relative", zIndex: 10, width: "100%", height: "100%" }, children: t })
      ]
    }
  );
}
function ct(t) {
  const e = I({ x: -1e3, y: -1e3, isDown: !1, active: !1 });
  return L(() => {
    const n = t.current;
    if (!n) return;
    const i = (o) => {
      const h = n.getBoundingClientRect();
      e.current.x = o.clientX - h.left, e.current.y = o.clientY - h.top, e.current.active = !0;
    }, s = () => {
      e.current.active = !1;
    }, m = () => {
      e.current.isDown = !0;
    }, r = () => {
      e.current.isDown = !1;
    };
    return n.addEventListener("pointermove", i), n.addEventListener("pointerleave", s), n.addEventListener("pointerdown", m), n.addEventListener("pointerup", r), n.style.touchAction = "none", () => {
      n.removeEventListener("pointermove", i), n.removeEventListener("pointerleave", s), n.removeEventListener("pointerdown", m), n.removeEventListener("pointerup", r);
    };
  }, [t]), e;
}
function at(t, e, n, i, s, m, r, o, h) {
  if (s === null || m === null || !o && h === "none")
    return { x: n, y: i };
  let y = n, d = i;
  const c = s - t, a = m - e, l = c * c + a * a, u = Math.sqrt(l);
  if (o && !r && l < 3e4) {
    const P = (3e4 - l) / 3e4;
    y += c * P * 0.15, d += a * P * 0.15;
  }
  if (r && h !== "none") {
    if (h === "attract") {
      if (l < 3e4) {
        const P = (3e4 - l) / 3e4;
        y += c * P * 0.8, d += a * P * 0.8;
      }
    } else if (h === "repel" && l < 5e4 && u > 0) {
      const P = Math.pow(Math.max(0, 5e4 - l) / 5e4, 1.2);
      y -= c / u * P * 400, d -= a / u * P * 400;
    }
  }
  return { x: y, y: d };
}
class H {
  constructor(e, n, i = "255, 255, 255") {
    g(this, "x");
    g(this, "y");
    g(this, "vx");
    g(this, "vy");
    g(this, "targetX");
    g(this, "targetY");
    g(this, "baseColor");
    g(this, "opacity");
    g(this, "size");
    g(this, "sizeMultiplier");
    g(this, "friction");
    g(this, "ease");
    g(this, "easeMultiplier");
    g(this, "floatSpeed");
    g(this, "floatOffset");
    g(this, "randomSpeed");
    this.x = Math.random() * e, this.y = Math.random() * n, this.targetX = this.x, this.targetY = this.y, this.vx = 0, this.vy = 0, this.size = Math.random() * 1.8 + 0.5, this.sizeMultiplier = 1, this.baseColor = Array.isArray(i) ? i[Math.floor(Math.random() * i.length)] : i, this.opacity = 0.4 + Math.random() * 0.6, this.friction = 0.82 + Math.random() * 0.1, this.ease = 0.03 + Math.random() * 0.05, this.easeMultiplier = 1, this.floatSpeed = Math.random() * 0.02 + 5e-3, this.floatOffset = Math.random() * Math.PI * 2, this.randomSpeed = Math.random();
  }
  update(e, n, i = null, s = null, m = !1, r = !0, o = "none") {
    const { x: h, y } = at(
      this.x,
      this.y,
      this.targetX,
      this.targetY,
      i,
      s,
      m,
      r,
      o
    ), d = h - this.x, c = y - this.y, a = n ? 0 : Math.cos(e * 0.01 + this.y * 0.01) * 0.5, l = n ? 0 : Math.sin(e * 0.01 + this.x * 0.01) * 0.5;
    this.vx += d * (this.ease * this.easeMultiplier) + a, this.vy += c * (this.ease * this.easeMultiplier) + l, this.vx *= this.friction, this.vy *= this.friction, this.x += this.vx, this.y += this.vy;
    const u = n ? 0.2 : 2;
    this.x += Math.cos(e * this.floatSpeed + this.floatOffset) * u, this.y += Math.sin(e * this.floatSpeed + this.floatOffset) * u;
  }
  draw(e, n = "circle", i = 0) {
    e.fillStyle = `rgba(${this.baseColor}, ${this.opacity})`;
    const s = Math.max(0.1, this.size * this.sizeMultiplier);
    if (n === "square")
      e.fillRect(this.x - s, this.y - s, s * 2, s * 2);
    else if (n === "bean") {
      const m = 6 + this.size * 2 * this.sizeMultiplier, r = Math.sin(i * 0.05 + this.x * 0.01 + this.randomSpeed * 5), o = 0.4 + 0.6 * ((r + 1) / 2), h = m * 0.5 * o, y = Math.max(0.8, s * 1.5 * (0.8 + 0.2 * r)), d = this.vx !== 0 || this.vy !== 0 ? Math.atan2(this.vy, this.vx) : 0;
      e.beginPath(), e.ellipse(this.x, this.y, h, y, d, 0, Math.PI * 2), e.fill();
    } else
      e.beginPath(), e.arc(this.x, this.y, s, 0, Math.PI * 2), e.fill();
  }
}
function j(t, e, n) {
  if (e <= 0 || n <= 0) return [];
  const i = document.createElement("canvas");
  i.width = e, i.height = n;
  const s = i.getContext("2d", { willReadFrequently: !0 });
  if (!s) return [];
  s.clearRect(0, 0, e, n);
  let m = Math.min(e, n) * 0.65;
  s.font = `bold ${m}px "Georgia", serif`;
  const r = s.measureText(t);
  r.width > e * 0.9 && (m = m * (e * 0.9) / r.width, s.font = `bold ${m}px "Georgia", serif`), s.fillStyle = "white", s.textAlign = "center", s.textBaseline = "middle", s.fillText(t, e / 2, n / 2.05);
  const h = s.getImageData(0, 0, e, n).data, y = [], d = window.innerWidth < 600 ? 6 : 8;
  for (let c = 0; c < n; c += d)
    for (let a = 0; a < e; a += d) {
      const l = (c * e + a) * 4;
      h[l + 3] > 128 && y.push({
        x: a + (Math.random() - 0.5) * 4,
        y: c + (Math.random() - 0.5) * 4
      });
    }
  return y;
}
function lt(t, e, n) {
  const i = I(t);
  return L(() => {
    i.current = t;
  }, [t]), { getPixelsForText: j, updateTextTargets: (m, r, o) => {
    var q, b;
    const h = r || ((q = n.current) == null ? void 0 : q.offsetWidth) || window.innerWidth, y = o || ((b = n.current) == null ? void 0 : b.offsetHeight) || window.innerHeight;
    if (!m) {
      e.current.forEach((f) => {
        const p = 50 + Math.random() * (h - 100), R = 50 + Math.random() * (y - 100);
        (Math.abs(p - f.x) > 20 || Math.abs(R - f.y) > 20) && (f.vx += (Math.random() - 0.5) * 20, f.vy += (Math.random() - 0.5) * 20), f.targetX = p, f.targetY = R;
      });
      return;
    }
    const d = j(m, h, y);
    if (d.length === 0) return;
    const c = h * 0.15, a = d.map((C) => ({ pt: C, key: C.x + (Math.random() - 0.5) * c }));
    a.sort((C, f) => C.key - f.key);
    const l = a.map((C) => C.pt), u = e.current.map((C, f) => ({ i: f, key: C.x + (Math.random() - 0.5) * c }));
    u.sort((C, f) => C.key - f.key);
    const w = u.map((C) => C.i), P = Math.ceil(Math.sqrt(w.length));
    for (let C = 0; C < w.length; C += P) {
      const f = Math.min(C + P, w.length), p = w.slice(C, f), R = [];
      for (let S = C; S < f; S++)
        R.push(l[S % l.length]);
      p.sort((S, D) => e.current[S].y - e.current[D].y), R.sort((S, D) => S.y - D.y);
      for (let S = 0; S < p.length; S++) {
        const D = p[S], z = e.current[D], v = R[S], X = v.x - z.x, M = v.y - z.y;
        if (Math.abs(X) > 20 || Math.abs(M) > 20) {
          z.vx += (Math.random() - 0.5) * 20, z.vy += (Math.random() - 0.5) * 20;
          const x = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10 + 5);
          z.vx += Math.sign(M) * x, z.vy -= Math.sign(X) * x;
        }
        z.targetX = v.x, z.targetY = v.y;
      }
    }
  }, textRef: i };
}
const k = (t) => {
  if (!t || typeof t != "string") return "0, 0, 0";
  try {
    let e = 0, n = 0, i = 0;
    if (t.length === 4)
      e = parseInt(t[1] + t[1], 16), n = parseInt(t[2] + t[2], 16), i = parseInt(t[3] + t[3], 16);
    else if (t.length === 7)
      e = parseInt(t.substring(1, 3), 16), n = parseInt(t.substring(3, 5), 16), i = parseInt(t.substring(5, 7), 16);
    else
      return t;
    return `${e}, ${n}, ${i}`;
  } catch {
    return "0, 0, 0";
  }
};
function yt({
  text: t,
  particleColor: e = "255, 255, 255",
  particleSize: n = 1,
  particleDensity: i = 1,
  particleEase: s = 1,
  isMagnet: m = !0,
  clickMode: r = "none",
  particleShape: o = "circle",
  backgroundColor: h = "#050505"
}) {
  const y = I(null), d = I(null), c = I([]), a = I(0), l = I(0), u = ct(d), w = I({ isMagnet: m, clickMode: r, particleShape: o, backgroundColor: h });
  w.current = { isMagnet: m, clickMode: r, particleShape: o, backgroundColor: h };
  const { updateTextTargets: P, textRef: q } = lt(
    t,
    c,
    d
  ), b = () => Array.isArray(e) ? e.map((f) => k(f)) : k(e), C = (f, p, R = 1) => {
    const S = window.innerWidth < 600 ? 1500 : 3e3, D = Math.floor(S * R), z = [], v = b();
    for (let X = 0; X < D; X++) {
      const M = new H(f, p, v);
      M.sizeMultiplier = n, M.easeMultiplier = s, z.push(M);
    }
    c.current = z;
  };
  return L(() => {
    if (c.current.length > 0) {
      const f = b();
      c.current.forEach((p) => {
        p.baseColor = Array.isArray(f) ? f[Math.floor(Math.random() * f.length)] : f;
      });
    }
  }, [e]), L(() => {
    c.current.length > 0 && c.current.forEach((f) => {
      f.sizeMultiplier = n;
    });
  }, [n]), L(() => {
    c.current.length > 0 && c.current.forEach((f) => {
      f.easeMultiplier = s;
    });
  }, [s]), L(() => {
    if (c.current.length > 0 && y.current && d.current) {
      const f = window.innerWidth < 600 ? 1500 : 3e3, p = Math.floor(f * i), R = c.current.length;
      if (p > R) {
        const S = d.current.getBoundingClientRect(), D = b();
        for (let z = 0; z < p - R; z++) {
          const v = new H(S.width, S.height, D);
          v.sizeMultiplier = n, c.current.push(v);
        }
        P(t);
      } else p < R && c.current.splice(p);
    }
  }, [i]), L(() => {
    const f = d.current, p = y.current;
    if (!f || !p) return;
    const R = (v) => {
      for (const X of v) {
        const { width: M, height: x } = X.contentRect, Y = window.devicePixelRatio || 1;
        p.width = M * Y, p.height = x * Y, p.style.width = `${M}px`, p.style.height = `${x}px`;
        const E = p.getContext("2d");
        E && E.scale(Y, Y), c.current.length === 0 && C(M, x, i), P(t, M, x);
      }
    }, S = new ResizeObserver(R);
    S.observe(f);
    const D = p.getContext("2d"), z = () => {
      l.current++;
      const v = f.getBoundingClientRect(), { isMagnet: X, clickMode: M, particleShape: x, backgroundColor: Y } = w.current;
      if (Y === "transparent")
        D.clearRect(0, 0, v.width, v.height), D.globalCompositeOperation = "source-over";
      else {
        const A = k(Y);
        D.fillStyle = `rgba(${A}, 0.25)`, D.fillRect(0, 0, v.width, v.height), D.globalCompositeOperation = "screen";
      }
      const E = q.current !== "", T = u.current.active ? u.current.x : null, F = u.current.active ? u.current.y : null, W = u.current.isDown;
      for (let A = 0; A < c.current.length; A++) {
        const O = c.current[A];
        O.update(l.current, !!E, T, F, W, X, M), O.draw(D, x, l.current);
      }
      D.globalCompositeOperation = "source-over", a.current = requestAnimationFrame(z);
    };
    return z(), () => {
      S.disconnect(), cancelAnimationFrame(a.current);
    };
  }, []), L(() => {
    P(t);
  }, [t]), /* @__PURE__ */ $(
    "div",
    {
      ref: d,
      style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" },
      children: /* @__PURE__ */ $(
        "canvas",
        {
          ref: y,
          style: { display: "block", width: "100%", height: "100%" }
        }
      )
    }
  );
}
export {
  ft as ParticleCanvas,
  yt as TextParticleEngine,
  at as getMagnetTarget,
  ct as useParticleInteraction,
  lt as useTextParticles
};
