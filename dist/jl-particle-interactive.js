var J = Object.defineProperty;
var _ = (t, e, r) => e in t ? J(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var m = (t, e, r) => _(t, typeof e != "symbol" ? e + "" : e, r);
import { jsx as W, jsxs as K } from "react/jsx-runtime";
import { useRef as I, useEffect as A } from "react";
function U(t, e, r, o) {
  let i = e + t.baseX, g = r + t.baseY;
  i += Math.sin(o * t.randomSpeed + t.baseY * 0.05) * 15 * t.z, g += Math.cos(o * t.randomSpeed + t.baseX * 0.05) * 15 * t.z;
  const n = i - t.x, s = g - t.y, l = n * 0.06, y = s * 0.06;
  return { forceX: l, forceY: y };
}
function Q(t, e, r, o, i, g) {
  const n = o, s = i, l = t.x - n, y = t.y - s, u = Math.max(Math.sqrt(l * l + y * y), 1);
  let c = 0, a = 0;
  const d = Math.sin(u * 0.02 - g * 3) * 2.5 * t.z;
  c += l / u * d, a += y / u * d;
  const R = Math.cos(u * 0.01 - g * 1 + t.randomSpeed) * 0.8 * t.z, E = -y / u, x = l / u;
  return c += E * R, a += x * R, { forceX: c, forceY: a, dxCenter: l, dyCenter: y, distToCenter: u };
}
function V(t, e) {
  let i = Math.min(e / 400, 1) * 2.5 + t.sizeBias * 1;
  i < 0.4 && (i = 0), t.scale += (i - t.scale) * 0.15;
}
function Z(t, e, r, o, i, g) {
  let n = 0, s = 0;
  i === "horizontal" ? (n = 1, s = 0) : i === "diagonal" ? (n = -e / o, s = -r / o) : (n = -r / o, s = e / o);
  const l = Math.atan2(s, n), y = t.sizeBias > 0.3 ? 1 : 0, u = Math.max(0, Math.sin(g * 0.5 + t.randomSpeed * 10)), c = Math.sin(g * 3 + t.baseX * 0.1 + t.randomSpeed) * 0.5 * u * y;
  n = Math.cos(l + c), s = Math.sin(l + c);
  const a = Math.max(1 - o / 400, 0.1);
  i === "horizontal" ? (t.dirX = t.dirX * (1 - 0.2) + n * 0.2, t.dirY = t.dirY * (1 - 0.2) + s * 0.2) : (t.dirX = t.dirX * (1 - a * 0.3) + n * a * 0.3, t.dirY = t.dirY * (1 - a * 0.3) + s * a * 0.3);
  const h = Math.sqrt(t.dirX * t.dirX + t.dirY * t.dirY);
  h > 0 && (t.dirX /= h, t.dirY /= h);
}
class tt {
  constructor(e, r, o) {
    m(this, "x");
    m(this, "y");
    m(this, "baseX");
    // Relative X to swarm center
    m(this, "baseY");
    // Relative Y to swarm center
    m(this, "z");
    m(this, "vx");
    m(this, "vy");
    m(this, "color");
    m(this, "targetColor", null);
    m(this, "colorDelay", 0);
    m(this, "angleTarget");
    m(this, "randomSpeed");
    m(this, "sizeBias");
    m(this, "scale");
    m(this, "dirX");
    m(this, "dirY");
    m(this, "initialized", !1);
    this.x = e, this.y = r, this.baseX = e, this.baseY = r, this.z = Math.random() * 1.5 + 0.2, this.vx = 0, this.vy = 0, this.color = o, this.angleTarget = Math.random() * Math.PI * 2, this.randomSpeed = Math.random() * 2 + 1, this.sizeBias = Math.random(), this.scale = 1, this.dirX = Math.cos(this.angleTarget), this.dirY = Math.sin(this.angleTarget);
  }
  update(e, r, o, i, g, n, s, l = "vertical") {
    this.initialized || (this.x = o + this.baseX, this.y = i + this.baseY, this.initialized = !0);
    const {
      forceX: y,
      forceY: u,
      dxCenter: c,
      dyCenter: a,
      distToCenter: h
    } = Q(this, e, r, o, i, s), {
      forceX: d,
      forceY: b
    } = U(this, o, i, s);
    this.vx += y + d, this.vy += u + b, this.vx *= 0.75, this.vy *= 0.75, this.x += this.vx, this.y += this.vy, V(this, h), Z(this, c, a, h, l, s), this.targetColor && (this.colorDelay -= 1, this.colorDelay <= 0 && (this.color = this.targetColor, this.targetColor = null));
  }
  draw(e, r, o = "bean") {
    if (this.scale <= 0.05) return;
    e.fillStyle = this.color;
    const i = Math.sqrt(this.baseX * this.baseX + this.baseY * this.baseY), g = Math.max(0, 1 - i / 350);
    if (e.globalAlpha = Math.min(1, (0.5 + this.z * 0.5) * Math.min(this.scale, 1) * g), !(e.globalAlpha <= 0.01))
      if (o === "circle") {
        const n = Math.max(0.1, 2 * this.scale * this.z);
        e.beginPath(), e.arc(this.x, this.y, n, 0, Math.PI * 2), e.fill();
      } else if (o === "square") {
        const n = Math.max(0.1, 2 * this.scale * this.z);
        e.fillRect(this.x - n, this.y - n, n * 2, n * 2);
      } else {
        const s = (6 + this.sizeBias * 6) * this.scale, l = Math.sin(r * 3.5 + this.baseX * 0.1 + this.randomSpeed * 5), y = 0.4 + 0.6 * ((l + 1) / 2), u = s * 0.5 * y, c = Math.max(0.8, this.z * 1.5 * this.scale * (0.8 + 0.2 * l)), a = Math.atan2(this.dirY, this.dirX);
        e.beginPath(), e.ellipse(this.x, this.y, u, c, a, 0, Math.PI * 2), e.fill();
      }
  }
}
function et({ config: t, backgroundColor: e }) {
  const r = I(null), o = I(null), i = I([]), g = I(0), n = I({ x: -1e3, y: -1e3, isDown: !1, active: !1 }), s = I({ x: 0, y: 0, initialized: !1 });
  A(() => {
    const c = (h) => {
      if (!r.current) return;
      const d = r.current.getBoundingClientRect();
      n.current.x = h.clientX - d.left, n.current.y = h.clientY - d.top, n.current.active = !0;
    }, a = () => {
      n.current.active = !1;
    };
    return window.addEventListener("pointermove", c), window.addEventListener("pointerleave", a), () => {
      window.removeEventListener("pointermove", c), window.removeEventListener("pointerleave", a);
    };
  }, []);
  const l = I(t), y = I(null), u = I(0);
  return A(() => {
    l.current = t;
  }, [t]), A(() => {
    if (y.current && (clearInterval(y.current), y.current = null), !t.colors || t.colors.length === 0) {
      const a = t.color || "#8B5CF6";
      i.current.forEach((h) => {
        h.targetColor = a, h.colorDelay = Math.random() * 20;
      });
      return;
    }
    const c = (a) => {
      const h = n.current.active ? n.current.x : s.current.x, d = n.current.active ? n.current.y : s.current.y;
      i.current.forEach((b) => {
        const R = b.x - h, E = b.y - d, x = Math.sqrt(R * R + E * E);
        b.targetColor = a, b.colorDelay = Math.max(0, x * 0.15);
      });
    };
    return t.colorMode === "mixed" ? i.current.forEach((a, h) => {
      a.targetColor = t.colors[h % t.colors.length], a.colorDelay = Math.random() * 20;
    }) : (u.current = 0, c(t.colors[0]), t.colors.length > 1 && (y.current = setInterval(() => {
      const a = t.colors;
      u.current = (u.current + 1) % a.length, c(a[u.current]);
    }, 3e3))), () => {
      y.current && clearInterval(y.current);
    };
  }, [t.colors, t.color, t.colorMode]), A(() => {
    if (!r.current || !o.current || l.current.name === "NONE") return;
    const c = o.current, a = r.current, h = (x) => {
      for (const S of x) {
        const { width: f, height: v } = S.contentRect, C = window.devicePixelRatio || 1;
        c.width = f * C, c.height = v * C, c.style.width = `${f}px`, c.style.height = `${v}px`;
        const X = c.getContext("2d");
        X && X.scale(C, C), i.current = [];
        const z = Math.floor(350 * (l.current.density ?? 1)), M = l.current.colors, D = l.current.colorMode || "wave";
        for (let p = 0; p < z; p++) {
          const w = Math.sqrt(Math.random()) * 350, Y = Math.random() * Math.PI * 2, F = Math.cos(Y) * w, L = Math.sin(Y) * w;
          let q;
          if (M && M.length > 0)
            q = D === "mixed" ? M[p % M.length] : M[0];
          else if (l.current.color)
            q = l.current.color;
          else {
            const B = 210 + Math.max(0, Math.min(1, (F + 350) / 700)) * 130 + (Math.random() * 15 - 7.5), $ = 75 + Math.random() * 25, T = 60 + Math.random() * 15;
            q = `hsl(${B}, ${$}%, ${T}%)`;
          }
          i.current.push(new tt(F, L, q));
        }
      }
    }, d = new ResizeObserver(h);
    d.observe(a);
    const b = c.getContext("2d");
    let R = 0;
    const E = () => {
      const x = a.getBoundingClientRect();
      if (b.clearRect(0, 0, x.width, x.height), e !== "transparent" && (b.fillStyle = e, b.fillRect(0, 0, x.width, x.height)), s.current.initialized || (s.current.x = x.width / 2, s.current.y = x.height / 2, s.current.initialized = !0), l.current.name === "FOLLOW_POINTER") {
        let S = x.width / 2, f = x.height / 2;
        const v = n.current.active ? n.current.x : null, C = n.current.active ? n.current.y : null;
        v !== null && C !== null && (S = v, f = C);
        const X = l.current.pointerTrackingSpeed ?? 0.06;
        s.current.x += (S - s.current.x) * X, s.current.y += (f - s.current.y) * X;
        const P = l.current.particleSpeed ?? 1;
        R += 0.012 * P;
        const z = i.current, M = 18, D = M * M;
        for (let p = 0; p < z.length; p++) {
          const w = z[p];
          for (let Y = p + 1; Y < z.length; Y++) {
            const F = z[Y], L = w.x - F.x, q = w.y - F.y, H = L * L + q * q;
            if (H < D && H > 0) {
              const B = Math.sqrt(H), $ = (M - B) / M, T = L / B * $ * 0.8, O = q / B * $ * 0.8;
              w.x += T, w.y += O, F.x -= T, F.y -= O, w.vx += T * 0.1, w.vy += O * 0.1, F.vx -= T * 0.1, F.vy -= O * 0.1;
            }
          }
        }
        for (const p of z) {
          p.update(v, C, s.current.x, s.current.y, x.width, x.height, R, l.current.orientation);
          const w = l.current.shape || "bean";
          p.draw(b, R, w);
        }
      }
      g.current = requestAnimationFrame(E);
    };
    return E(), () => {
      d.disconnect(), cancelAnimationFrame(g.current);
    };
  }, [e, t.density]), t.name === "NONE" ? null : /* @__PURE__ */ W("div", { ref: r, style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }, children: /* @__PURE__ */ W("canvas", { ref: o, style: { display: "block", width: "100%", height: "100%" } }) });
}
class nt {
  constructor(e, r) {
    m(this, "x");
    m(this, "y");
    m(this, "vx");
    m(this, "vy");
    m(this, "radius");
    m(this, "currentColor", "#8B5CF6");
    m(this, "targetColor", null);
    m(this, "colorDelay", 0);
    this.x = e, this.y = r;
    const o = Math.random() * Math.PI * 2, i = Math.random() * 0.5 + 0.1;
    this.vx = Math.cos(o) * i, this.vy = Math.sin(o) * i, this.radius = Math.random() * 1.5 + 1;
  }
  update(e, r, o, i, g = 1, n = 0.06) {
    if (this.x += this.vx * g, this.y += this.vy * g, this.x < 0 ? (this.x = 0, this.vx *= -1) : this.x > e && (this.x = e, this.vx *= -1), this.y < 0 ? (this.y = 0, this.vy *= -1) : this.y > r && (this.y = r, this.vy *= -1), o !== null && i !== null) {
      const s = o - this.x, l = i - this.y, y = s * s + l * l, u = 150, c = u * u;
      if (y < c) {
        const a = Math.sqrt(y), h = (u - a) / u, d = n / 0.06;
        this.x -= s / a * h * 2 * d, this.y -= l / a * h * 2 * d;
      }
    }
    this.targetColor && (this.colorDelay -= 1 * g, this.colorDelay <= 0 && (this.currentColor = this.targetColor, this.targetColor = null));
  }
  draw(e, r = "circle", o = 0) {
    if (e.fillStyle = this.currentColor, r === "square")
      e.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    else if (r === "bean") {
      const i = Math.sin(o * 0.05 + this.x * 0.01 + this.y * 0.01), g = this.radius * 2 * (0.8 + 0.4 * i), n = this.radius * (0.8 + 0.2 * i), s = this.vx !== 0 || this.vy !== 0 ? Math.atan2(this.vy, this.vx) : 0;
      e.beginPath(), e.ellipse(this.x, this.y, g, n, s, 0, Math.PI * 2), e.fill();
    } else
      e.beginPath(), e.arc(this.x, this.y, this.radius, 0, Math.PI * 2), e.fill();
  }
}
function rt({ config: t, backgroundColor: e }) {
  const r = I(null), o = I(null), i = I([]), g = I(0), n = I({ x: -1e3, y: -1e3, active: !1 });
  A(() => {
    const u = (a) => {
      if (!r.current) return;
      const h = r.current.getBoundingClientRect();
      n.current.x = a.clientX - h.left, n.current.y = a.clientY - h.top, n.current.active = !0;
    }, c = () => {
      n.current.active = !1;
    };
    return window.addEventListener("pointermove", u), window.addEventListener("pointerleave", c), () => {
      window.removeEventListener("pointermove", u), window.removeEventListener("pointerleave", c);
    };
  }, []);
  const s = I(t), l = I(0), y = I(null);
  return A(() => {
    s.current = t;
  }, [t]), A(() => {
    if (y.current && (clearInterval(y.current), y.current = null), !t.colors || t.colors.length === 0) {
      const h = t.color || "#8B5CF6";
      i.current.forEach((d) => {
        d.targetColor = h, d.colorDelay = Math.random() * 20;
      });
      return;
    }
    const u = n.current.active ? n.current.x : r.current ? r.current.clientWidth / 2 : 0, c = n.current.active ? n.current.y : r.current ? r.current.clientHeight / 2 : 0, a = (h) => {
      i.current.forEach((d) => {
        const b = d.x - u, R = d.y - c, E = Math.sqrt(b * b + R * R);
        d.targetColor = h, d.colorDelay = Math.max(0, E * 0.2);
      });
    };
    return t.colorMode === "mixed" ? i.current.forEach((h, d) => {
      h.targetColor = t.colors[d % t.colors.length], h.colorDelay = Math.random() * 20;
    }) : (l.current = 0, a(t.colors[0]), t.colors.length > 1 && (y.current = setInterval(() => {
      const h = t.colors;
      l.current = (l.current + 1) % h.length, a(h[l.current]);
    }, 3e3))), () => {
      y.current && clearInterval(y.current);
    };
  }, [t.colors, t.color, t.colorMode]), A(() => {
    if (!r.current || !o.current) return;
    const u = o.current, c = r.current, a = (E) => {
      for (const x of E) {
        const { width: S, height: f } = x.contentRect, v = window.devicePixelRatio || 1;
        u.width = S * v, u.height = f * v, u.style.width = `${S}px`, u.style.height = `${f}px`;
        const C = u.getContext("2d");
        C && C.scale(v, v), i.current = [];
        const X = S * f, P = s.current.density ?? 1, z = Math.min(
          Math.floor(300 * P),
          Math.floor(X / 6e3 * P)
        ), M = s.current.colors, D = s.current.colorMode || "wave";
        for (let p = 0; p < z; p++) {
          const w = new nt(Math.random() * S, Math.random() * f);
          M && M.length > 0 ? w.currentColor = D === "mixed" ? M[p % M.length] : M[0] : s.current.color && (w.currentColor = s.current.color), i.current.push(w);
        }
      }
    }, h = new ResizeObserver(a);
    h.observe(c);
    const d = u.getContext("2d");
    let b = 0;
    const R = () => {
      b += 1;
      const E = c.getBoundingClientRect();
      d.clearRect(0, 0, E.width, E.height), e !== "transparent" && (d.fillStyle = e, d.fillRect(0, 0, E.width, E.height));
      const x = n.current.active ? n.current.x : null, S = n.current.active ? n.current.y : null, f = i.current, v = s.current.shape || "circle", C = 120, X = C * C, P = s.current.particleSpeed ?? 1, z = s.current.pointerTrackingSpeed ?? 0.06;
      for (let M = 0; M < f.length; M++) {
        const D = f[M];
        D.update(E.width, E.height, x, S, P, z), d.globalAlpha = 1, D.draw(d, v, b);
        for (let p = M + 1; p < f.length; p++) {
          const w = f[p], Y = D.x - w.x, F = D.y - w.y, L = Y * Y + F * F;
          if (L < X) {
            const q = 1 - Math.sqrt(L) / C;
            d.beginPath(), d.moveTo(D.x, D.y), d.lineTo(w.x, w.y), d.strokeStyle = D.currentColor, d.globalAlpha = q * 0.5, d.lineWidth = 1, d.stroke();
          }
        }
      }
      if (d.globalAlpha = 1, x !== null && S !== null)
        for (let p = 0; p < f.length; p++) {
          const w = f[p], Y = w.x - x, F = w.y - S, L = Y * Y + F * F;
          if (L < 22500) {
            const q = 1 - Math.sqrt(L) / 150;
            d.beginPath(), d.moveTo(w.x, w.y), d.lineTo(x, S), d.strokeStyle = w.currentColor, d.globalAlpha = q * 0.8, d.lineWidth = 1.5, d.stroke();
          }
        }
      d.globalAlpha = 1, g.current = requestAnimationFrame(R);
    };
    return R(), () => {
      h.disconnect(), cancelAnimationFrame(g.current);
    };
  }, [e, t.density]), /* @__PURE__ */ W("div", { ref: r, style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }, children: /* @__PURE__ */ W("canvas", { ref: o, style: { display: "block", width: "100%", height: "100%" } }) });
}
class st {
  constructor(e, r, o, i) {
    m(this, "x", 0);
    m(this, "y", 0);
    m(this, "baseX");
    m(this, "baseY");
    m(this, "vx", 0);
    m(this, "vy", 0);
    m(this, "color");
    m(this, "size");
    m(this, "angle");
    m(this, "dist");
    m(this, "spring");
    m(this, "friction");
    m(this, "targetColor", null);
    m(this, "colorDelay", 0);
    this.baseX = e, this.baseY = r, this.color = o, this.size = i, this.angle = Math.atan2(r, e), this.dist = Math.sqrt(e * e + r * r);
    const g = Math.min(1, this.dist / 350);
    this.spring = 0.15 - g * 0.13, this.friction = 0.85 + g * 0.1;
  }
  update(e, r, o, i) {
    const n = 1 + Math.sin(this.angle * 3 + o * 1.2) * 0.05 + Math.cos(this.angle * 5 - o * 0.6) * 0.03, s = this.dist * i * n, l = Math.cos(this.angle) * s, y = Math.sin(this.angle) * s, u = this.dist * 0.1 * n, c = Math.sin(o * 3 + this.dist * 0.05) * u, a = e + l + Math.cos(this.angle + Math.PI / 2) * c, h = r + y + Math.sin(this.angle + Math.PI / 2) * c, d = a - this.x, b = h - this.y;
    this.vx += d * this.spring, this.vy += b * this.spring, this.vx *= this.friction, this.vy *= this.friction, this.x += this.vx, this.y += this.vy, this.targetColor && (this.colorDelay -= 1, this.colorDelay <= 0 && (this.color = this.targetColor, this.targetColor = null));
  }
  draw(e, r, o) {
    const i = Math.min(1, this.dist / 350), g = 1 + (1 - i) * (o - 1) * 1.5, n = this.size * g;
    e.globalAlpha = Math.max(0.15, 1 - i * 0.7), e.fillStyle = this.color, e.beginPath(), r === "circle" ? e.arc(this.x, this.y, n, 0, Math.PI * 2) : r === "square" ? e.rect(this.x - n, this.y - n, n * 2, n * 2) : e.ellipse(this.x, this.y, n * 1.5, n, 0, 0, Math.PI * 2), e.fill();
  }
}
function ot({ config: t, backgroundColor: e }) {
  const r = I(null), o = I(null), i = I([]), g = I(0), n = I({ x: -1e3, y: -1e3, active: !1 }), s = I({ x: 0, y: 0, initialized: !1, angle: -Math.PI / 2 });
  A(() => {
    const c = (a) => {
      if (!r.current) return;
      const h = r.current.getBoundingClientRect();
      n.current.x = a.clientX - h.left, n.current.y = a.clientY - h.top, n.current.active = !0;
    };
    return window.addEventListener("pointermove", c), () => {
      window.removeEventListener("pointermove", c);
    };
  }, []);
  const l = I(t), y = I(0), u = I(null);
  return A(() => {
    l.current = t;
  }, [t]), A(() => {
    if (u.current && (clearInterval(u.current), u.current = null), !t.colors || t.colors.length === 0) {
      const a = t.color || "#8B5CF6";
      i.current.forEach((h) => {
        h.targetColor = a, h.colorDelay = Math.random() * 20;
      });
      return;
    }
    const c = (a) => {
      i.current.forEach((h) => {
        h.targetColor = a, h.colorDelay = Math.max(0, h.dist * 0.2);
      });
    };
    return t.colorMode === "mixed" ? i.current.forEach((a, h) => {
      a.targetColor = t.colors[h % t.colors.length], a.colorDelay = Math.max(0, a.dist * 0.2) + Math.random() * 10;
    }) : (y.current = 0, c(t.colors[0]), t.colors.length > 1 && (u.current = setInterval(() => {
      const a = t.colors;
      y.current = (y.current + 1) % a.length, c(a[y.current]);
    }, 3e3))), () => {
      u.current && clearInterval(u.current);
    };
  }, [t.colors, t.color, t.colorMode]), A(() => {
    if (!r.current || !o.current) return;
    const c = o.current, a = r.current, h = (x) => {
      for (const S of x) {
        const { width: f, height: v } = S.contentRect, C = window.devicePixelRatio || 1;
        c.width = f * C, c.height = v * C, c.style.width = `${f}px`, c.style.height = `${v}px`;
        const X = c.getContext("2d");
        X && X.scale(C, C), i.current = [];
        const z = Math.floor(350 * (l.current.density ?? 1)), M = l.current.colors, D = l.current.colorMode || "wave";
        for (let p = 0; p < z; p++) {
          const w = Math.random() * Math.PI * 2, Y = Math.sqrt(Math.random()) * 350, F = Math.cos(w) * Y, L = Math.sin(w) * Y;
          let q;
          if (M && M.length > 0)
            q = D === "mixed" ? M[p % M.length] : M[0];
          else if (l.current.color)
            q = l.current.color;
          else {
            const $ = 260 + Math.random() * 60, T = 70 + Math.random() * 30, O = 60 + Math.random() * 20;
            q = `hsl(${$}, ${T}%, ${O}%)`;
          }
          let H = 2 + Math.random() * 2;
          Y > 200 && (H *= 0.6), Y < 80 && (H *= 1.5);
          const B = new st(F, L, q, H);
          B.x = f / 2, B.y = v / 2, i.current.push(B);
        }
      }
    }, d = new ResizeObserver(h);
    d.observe(a);
    const b = c.getContext("2d");
    let R = 0;
    const E = () => {
      const x = a.getBoundingClientRect();
      b.globalCompositeOperation = "source-over", e === "transparent" ? b.clearRect(0, 0, x.width, x.height) : (b.fillStyle = e, b.fillRect(0, 0, x.width, x.height)), s.current.initialized || (s.current.x = x.width / 2, s.current.y = x.height / 2, s.current.initialized = !0);
      let S = x.width / 2, f = x.height / 2;
      const v = n.current.active ? n.current.x : null, C = n.current.active ? n.current.y : null;
      v !== null && C !== null && (S = v, f = C);
      const X = S - s.current.x, P = f - s.current.y, z = Math.sqrt(X * X + P * P);
      let M = 0, D = 0;
      z > 1 ? (M = X / z, D = P / z, s.current.angle = Math.atan2(D, M)) : (M = Math.cos(s.current.angle), D = Math.sin(s.current.angle));
      const p = l.current.particleSpeed ?? 1;
      R += 0.02 * p;
      const w = R % 4;
      let Y = 1, F = 1, L = 0;
      if (w < 1) {
        const O = w;
        Y = 1 - Math.sin(O * Math.PI) * 0.3, F = 1 + Math.sin(O * Math.PI) * 0.15, L = Math.sin(O * Math.PI) * 12;
      } else {
        const O = (w - 1) / 3;
        Y = 0.7 + 0.3 * Math.sin(O * Math.PI / 2), F = 1, L = 0;
      }
      const q = l.current.pointerTrackingSpeed ?? 0.02;
      s.current.x += X * q, s.current.y += P * q, s.current.x += M * L * p, s.current.y += D * L * p;
      const B = 200 * (F + (w < 1 ? w * 0.15 : 0)), $ = b.createRadialGradient(
        s.current.x,
        s.current.y,
        0,
        s.current.x,
        s.current.y,
        B
      );
      $.addColorStop(0, "rgba(80, 150, 255, 0.05)"), $.addColorStop(1, "rgba(80, 150, 255, 0)"), b.fillStyle = $, b.beginPath(), b.arc(s.current.x, s.current.y, B, 0, Math.PI * 2), b.fill();
      const T = i.current;
      b.globalCompositeOperation = "source-over";
      for (const O of T) {
        O.update(s.current.x, s.current.y, R, Y);
        const G = l.current.shape || "circle";
        O.draw(b, G, F);
      }
      g.current = requestAnimationFrame(E);
    };
    return E(), () => {
      d.disconnect(), cancelAnimationFrame(g.current);
    };
  }, [e, t.density]), /* @__PURE__ */ W(
    "div",
    {
      ref: r,
      style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" },
      children: /* @__PURE__ */ W(
        "canvas",
        {
          ref: o,
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
function ct({
  children: t,
  width: e = "100%",
  height: r = "60vh",
  backgroundColor: o = "#050505",
  className: i = "",
  style: g,
  background: n = { name: "NONE" }
}) {
  return /* @__PURE__ */ K(
    "div",
    {
      className: i,
      style: { ...it, width: e, height: r, backgroundColor: o, ...g },
      children: [
        n.name === "FOLLOW_POINTER" && /* @__PURE__ */ W(et, { config: n, backgroundColor: o }),
        n.name === "NET" && /* @__PURE__ */ W(rt, { config: n, backgroundColor: o }),
        n.name === "JELLYFISH" && /* @__PURE__ */ W(ot, { config: n, backgroundColor: o }),
        /* @__PURE__ */ W("div", { style: { position: "relative", zIndex: 10, width: "100%", height: "100%" }, children: t })
      ]
    }
  );
}
function at(t) {
  const e = I({ x: -1e3, y: -1e3, isDown: !1, active: !1 });
  return A(() => {
    const r = t.current;
    if (!r) return;
    const o = (s) => {
      const l = r.getBoundingClientRect();
      e.current.x = s.clientX - l.left, e.current.y = s.clientY - l.top, e.current.active = !0;
    }, i = () => {
      e.current.active = !1;
    }, g = () => {
      e.current.isDown = !0;
    }, n = () => {
      e.current.isDown = !1;
    };
    return r.addEventListener("pointermove", o), r.addEventListener("pointerleave", i), r.addEventListener("pointerdown", g), r.addEventListener("pointerup", n), r.style.touchAction = "none", () => {
      r.removeEventListener("pointermove", o), r.removeEventListener("pointerleave", i), r.removeEventListener("pointerdown", g), r.removeEventListener("pointerup", n);
    };
  }, [t]), e;
}
function lt(t, e, r, o, i, g, n, s, l) {
  if (i === null || g === null || !s && l === "none")
    return { x: r, y: o };
  let y = r, u = o;
  const c = i - t, a = g - e, h = c * c + a * a, d = Math.sqrt(h);
  if (s && !n && h < 3e4) {
    const R = (3e4 - h) / 3e4;
    y += c * R * 0.15, u += a * R * 0.15;
  }
  if (n && l !== "none") {
    if (l === "attract") {
      if (h < 3e4) {
        const R = (3e4 - h) / 3e4;
        y += c * R * 0.8, u += a * R * 0.8;
      }
    } else if (l === "repel" && h < 5e4 && d > 0) {
      const R = Math.pow(Math.max(0, 5e4 - h) / 5e4, 1.2);
      y -= c / d * R * 400, u -= a / d * R * 400;
    }
  }
  return { x: y, y: u };
}
class k {
  constructor(e, r, o = "255, 255, 255") {
    m(this, "x");
    m(this, "y");
    m(this, "vx");
    m(this, "vy");
    m(this, "targetX");
    m(this, "targetY");
    m(this, "baseColor");
    m(this, "opacity");
    m(this, "size");
    m(this, "sizeMultiplier");
    m(this, "friction");
    m(this, "ease");
    m(this, "easeMultiplier");
    m(this, "floatSpeed");
    m(this, "floatOffset");
    m(this, "randomSpeed");
    this.x = Math.random() * e, this.y = Math.random() * r, this.targetX = this.x, this.targetY = this.y, this.vx = 0, this.vy = 0, this.size = Math.random() * 1.8 + 0.5, this.sizeMultiplier = 1, this.baseColor = Array.isArray(o) ? o[Math.floor(Math.random() * o.length)] : o, this.opacity = 0.4 + Math.random() * 0.6, this.friction = 0.82 + Math.random() * 0.1, this.ease = 0.03 + Math.random() * 0.05, this.easeMultiplier = 1, this.floatSpeed = Math.random() * 0.02 + 5e-3, this.floatOffset = Math.random() * Math.PI * 2, this.randomSpeed = Math.random();
  }
  update(e, r, o = null, i = null, g = !1, n = !0, s = "none") {
    const { x: l, y } = lt(
      this.x,
      this.y,
      this.targetX,
      this.targetY,
      o,
      i,
      g,
      n,
      s
    ), u = l - this.x, c = y - this.y, a = r ? 0 : Math.cos(e * 0.01 + this.y * 0.01) * 0.5, h = r ? 0 : Math.sin(e * 0.01 + this.x * 0.01) * 0.5;
    this.vx += u * (this.ease * this.easeMultiplier) + a, this.vy += c * (this.ease * this.easeMultiplier) + h, this.vx *= this.friction, this.vy *= this.friction, this.x += this.vx, this.y += this.vy;
    const d = r ? 0.2 : 2;
    this.x += Math.cos(e * this.floatSpeed + this.floatOffset) * d, this.y += Math.sin(e * this.floatSpeed + this.floatOffset) * d;
  }
  draw(e, r = "circle", o = 0) {
    e.fillStyle = `rgba(${this.baseColor}, ${this.opacity})`;
    const i = Math.max(0.1, this.size * this.sizeMultiplier);
    if (r === "square")
      e.fillRect(this.x - i, this.y - i, i * 2, i * 2);
    else if (r === "bean") {
      const g = 6 + this.size * 2 * this.sizeMultiplier, n = Math.sin(o * 0.05 + this.x * 0.01 + this.randomSpeed * 5), s = 0.4 + 0.6 * ((n + 1) / 2), l = g * 0.5 * s, y = Math.max(0.8, i * 1.5 * (0.8 + 0.2 * n)), u = this.vx !== 0 || this.vy !== 0 ? Math.atan2(this.vy, this.vx) : 0;
      e.beginPath(), e.ellipse(this.x, this.y, l, y, u, 0, Math.PI * 2), e.fill();
    } else
      e.beginPath(), e.arc(this.x, this.y, i, 0, Math.PI * 2), e.fill();
  }
}
function j(t, e, r) {
  if (e <= 0 || r <= 0) return [];
  const o = Math.floor(e), i = Math.floor(r), g = document.createElement("canvas");
  g.width = o, g.height = i;
  const n = g.getContext("2d", { willReadFrequently: !0 });
  if (!n) return [];
  n.clearRect(0, 0, o, i);
  const s = Array.isArray(t), l = s ? t : [t];
  if (l.length === 0 || l.every((x) => !x)) return [];
  let y = Math.min(o, i) * (s ? 0.4 : 0.65);
  n.font = `bold ${y}px "Georgia", serif`;
  let u = 0;
  l.forEach((x) => {
    const S = n.measureText(x);
    S.width > u && (u = S.width);
  }), u > o * 0.9 && (y = y * (o * 0.9) / u);
  const a = y * 1.2 * l.length;
  a > i * 0.8 && (y = y * (i * 0.8) / a), n.font = `bold ${y}px "Georgia", serif`, n.fillStyle = "white", n.textAlign = "center", n.textBaseline = "middle";
  const h = (i - y * 1.2 * (l.length - 1)) / (s ? 2 : 2.05);
  l.forEach((x, S) => {
    n.fillText(x, o / 2, h + S * y * 1.2);
  });
  const b = n.getImageData(0, 0, o, i).data, R = [], E = Math.max(2, Math.floor(y / (s ? 30 : 40)));
  for (let x = 0; x < i; x += E)
    for (let S = 0; S < o; S += E) {
      const f = (x * o + S) * 4, v = b[f + 3];
      Math.random() * 255 < v && R.push({
        x: S + (Math.random() - 0.5) * E,
        y: x + (Math.random() - 0.5) * E
      });
    }
  return R;
}
function ht(t, e, r) {
  const o = I(t);
  return A(() => {
    o.current = t;
  }, [t]), { getPixelsForText: j, updateTextTargets: (g, n, s) => {
    var x, S;
    const l = n || ((x = r.current) == null ? void 0 : x.offsetWidth) || window.innerWidth, y = s || ((S = r.current) == null ? void 0 : S.offsetHeight) || window.innerHeight;
    if (Array.isArray(g) ? g.length === 0 || g.every((f) => !f) : !g) {
      e.current.forEach((v) => {
        const C = 50 + Math.random() * (l - 100), X = 50 + Math.random() * (y - 100);
        (Math.abs(C - v.x) > 20 || Math.abs(X - v.y) > 20) && (v.vx += (Math.random() - 0.5) * 20, v.vy += (Math.random() - 0.5) * 20), v.targetX = C, v.targetY = X;
      });
      return;
    }
    const c = j(g, l, y);
    if (c.length === 0) return;
    const a = l * 0.15, h = c.map((f) => ({ pt: f, key: f.x + (Math.random() - 0.5) * a }));
    h.sort((f, v) => f.key - v.key);
    const d = h.map((f) => f.pt), b = e.current.map((f, v) => ({ i: v, key: f.x + (Math.random() - 0.5) * a }));
    b.sort((f, v) => f.key - v.key);
    const R = b.map((f) => f.i), E = Math.ceil(Math.sqrt(R.length));
    for (let f = 0; f < R.length; f += E) {
      const v = Math.min(f + E, R.length), C = R.slice(f, v), X = [];
      for (let P = f; P < v; P++) {
        const z = Math.floor(P / R.length * d.length);
        X.push(d[z]);
      }
      C.sort((P, z) => e.current[P].y - e.current[z].y), X.sort((P, z) => P.y - z.y);
      for (let P = 0; P < C.length; P++) {
        const z = C[P], M = e.current[z], D = X[P], p = D.x - M.x, w = D.y - M.y;
        if (Math.abs(p) > 20 || Math.abs(w) > 20) {
          M.vx += (Math.random() - 0.5) * 20, M.vy += (Math.random() - 0.5) * 20;
          const Y = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 10 + 5);
          M.vx += Math.sign(w) * Y, M.vy -= Math.sign(p) * Y;
        }
        M.targetX = D.x, M.targetY = D.y;
      }
    }
  }, textRef: o };
}
const N = (t) => {
  if (!t || typeof t != "string") return "0, 0, 0";
  try {
    let e = 0, r = 0, o = 0;
    if (t.length === 4)
      e = parseInt(t[1] + t[1], 16), r = parseInt(t[2] + t[2], 16), o = parseInt(t[3] + t[3], 16);
    else if (t.length === 7)
      e = parseInt(t.substring(1, 3), 16), r = parseInt(t.substring(3, 5), 16), o = parseInt(t.substring(5, 7), 16);
    else
      return t;
    return `${e}, ${r}, ${o}`;
  } catch {
    return "0, 0, 0";
  }
};
function yt({
  text: t,
  particleColor: e = "255, 255, 255",
  particleSize: r = 1,
  particleDensity: o = 1,
  particleEase: i = 1,
  isMagnet: g = !0,
  clickMode: n = "none",
  particleShape: s = "circle",
  backgroundColor: l = "#050505"
}) {
  const y = I(null), u = I(null), c = I([]), a = I(0), h = I(0), d = at(u), b = I({ isMagnet: g, clickMode: n, particleShape: s, backgroundColor: l });
  b.current = { isMagnet: g, clickMode: n, particleShape: s, backgroundColor: l };
  const { updateTextTargets: R, textRef: E } = ht(
    t,
    c,
    u
  ), x = () => Array.isArray(e) ? e.map((f) => N(f)) : N(e), S = (f, v, C = 1) => {
    const X = window.innerWidth < 600 ? 1500 : 3e3, P = Math.floor(X * C), z = [], M = x();
    for (let D = 0; D < P; D++) {
      const p = new k(f, v, M);
      p.sizeMultiplier = r, p.easeMultiplier = i, z.push(p);
    }
    c.current = z;
  };
  return A(() => {
    if (c.current.length > 0) {
      const f = x();
      c.current.forEach((v) => {
        v.baseColor = Array.isArray(f) ? f[Math.floor(Math.random() * f.length)] : f;
      });
    }
  }, [e]), A(() => {
    c.current.length > 0 && c.current.forEach((f) => {
      f.sizeMultiplier = r;
    });
  }, [r]), A(() => {
    c.current.length > 0 && c.current.forEach((f) => {
      f.easeMultiplier = i;
    });
  }, [i]), A(() => {
    if (c.current.length > 0 && y.current && u.current) {
      const f = window.innerWidth < 600 ? 1500 : 3e3, v = Math.floor(f * o), C = c.current.length;
      if (v > C) {
        const X = u.current.getBoundingClientRect(), P = x();
        for (let z = 0; z < v - C; z++) {
          const M = new k(X.width, X.height, P);
          M.sizeMultiplier = r, c.current.push(M);
        }
        R(t);
      } else v < C && c.current.splice(v);
    }
  }, [o]), A(() => {
    const f = u.current, v = y.current;
    if (!f || !v) return;
    const C = (M) => {
      for (const D of M) {
        const { width: p, height: w } = D.contentRect, Y = window.devicePixelRatio || 1;
        v.width = p * Y, v.height = w * Y, v.style.width = `${p}px`, v.style.height = `${w}px`;
        const F = v.getContext("2d");
        F && F.scale(Y, Y), c.current.length === 0 && S(p, w, o), R(E.current, p, w);
      }
    }, X = new ResizeObserver(C);
    X.observe(f), "fonts" in document && document.fonts.ready.then(() => {
      u.current && R(
        E.current,
        u.current.offsetWidth,
        u.current.offsetHeight
      );
    });
    const P = v.getContext("2d"), z = () => {
      h.current++;
      const M = f.getBoundingClientRect(), { isMagnet: D, clickMode: p, particleShape: w, backgroundColor: Y } = b.current;
      if (Y === "transparent")
        P.clearRect(0, 0, M.width, M.height), P.globalCompositeOperation = "source-over";
      else {
        const T = N(Y);
        P.fillStyle = `rgba(${T}, 0.25)`, P.fillRect(0, 0, M.width, M.height), P.globalCompositeOperation = "screen";
      }
      const F = E.current, q = !(Array.isArray(F) ? F.length === 0 || F.every((T) => !T) : !F), H = d.current.active ? d.current.x : null, B = d.current.active ? d.current.y : null, $ = d.current.isDown;
      for (let T = 0; T < c.current.length; T++) {
        const O = c.current[T];
        O.update(h.current, !!q, H, B, $, D, p), O.draw(P, w, h.current);
      }
      P.globalCompositeOperation = "source-over", a.current = requestAnimationFrame(z);
    };
    return z(), () => {
      X.disconnect(), cancelAnimationFrame(a.current);
    };
  }, []), A(() => {
    R(t);
  }, [t]), /* @__PURE__ */ W(
    "div",
    {
      ref: u,
      style: { position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" },
      children: /* @__PURE__ */ W(
        "canvas",
        {
          ref: y,
          style: { display: "block", width: "100%", height: "100%" }
        }
      )
    }
  );
}
function gt({
  name: t = "FOLLOW_POINTER",
  config: e,
  width: r = "100%",
  height: o = "60vh",
  backgroundColor: i = "#050505",
  className: g = "",
  style: n
}) {
  const s = {
    name: t,
    shape: "bean",
    orientation: "vertical",
    ...e
  };
  return /* @__PURE__ */ W(
    ct,
    {
      width: r,
      height: o,
      backgroundColor: i,
      className: g,
      style: n,
      background: s
    }
  );
}
export {
  gt as ParticleBackground,
  ct as ParticleCanvas,
  yt as TextParticleEngine,
  lt as getMagnetTarget,
  at as useParticleInteraction,
  ht as useTextParticles
};
