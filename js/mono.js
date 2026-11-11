(() => {
  // js/calc.js
  var APP_VERSION = "3.0.0";
  var LS_V3 = "mono_finance_v3";
  var LS_V2 = "mono_finance_v2";
  var LS_V1 = "mono_finance_v1";
  var CATS = {
    food: { n: "\u0E2D\u0E32\u0E2B\u0E32\u0E23 & \u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21", i: "utensils", c: "#3f7d32", t: "expense" },
    transport: { n: "\u0E40\u0E14\u0E34\u0E19\u0E17\u0E32\u0E07", i: "car", c: "#2457c5", t: "expense" },
    shopping: { n: "\u0E0A\u0E49\u0E2D\u0E1B\u0E1B\u0E34\u0E49\u0E07", i: "bag", c: "#a15a48", t: "expense" },
    housing: { n: "\u0E17\u0E35\u0E48\u0E1E\u0E31\u0E01", i: "home", c: "#1f3a6b", t: "expense" },
    bills: { n: "\u0E04\u0E48\u0E32\u0E19\u0E49\u0E33 \u0E44\u0E1F \u0E40\u0E19\u0E47\u0E15", i: "zap", c: "#5c6b80", t: "expense" },
    health: { n: "\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E", i: "heart", c: "#0f7a6a", t: "expense" },
    fun: { n: "\u0E1A\u0E31\u0E19\u0E40\u0E17\u0E34\u0E07", i: "film", c: "#5b3fbf", t: "expense" },
    debt: { n: "\u0E0A\u0E33\u0E23\u0E30\u0E2B\u0E19\u0E35\u0E49", i: "card", c: "#9d1c1c", t: "expense" },
    other: { n: "\u0E2D\u0E37\u0E48\u0E19 \u0E46", i: "more", c: "#8a6a2f", t: "expense" },
    salary: { n: "\u0E40\u0E07\u0E34\u0E19\u0E40\u0E14\u0E37\u0E2D\u0E19", i: "banknote", c: "#1f7a3a", t: "income" },
    freelance: { n: "\u0E07\u0E32\u0E19\u0E40\u0E2A\u0E23\u0E34\u0E21", i: "briefcase", c: "#0c6f86", t: "income" },
    invest: { n: "\u0E1C\u0E25\u0E15\u0E2D\u0E1A\u0E41\u0E17\u0E19\u0E25\u0E07\u0E17\u0E38\u0E19", i: "trend-up", c: "#0c7a52", t: "income" },
    otherin: { n: "\u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A\u0E2D\u0E37\u0E48\u0E19 \u0E46", i: "coin", c: "#8a6412", t: "income" }
  };
  var SYS = {
    transfer: { n: "\u0E42\u0E2D\u0E19\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1A\u0E31\u0E0D\u0E0A\u0E35", i: "swap", c: "#3d5f93", t: "transfer" },
    saving: { n: "\u0E2D\u0E2D\u0E21\u0E40\u0E07\u0E34\u0E19", i: "target", c: "#5b3fbf", t: "saving" }
  };
  var ACC_T = {
    bank: { n: "\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23", i: "bank", c: "#1c4f9c" },
    cash: { n: "\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14", i: "banknote", c: "#1f7a3a" },
    wallet: { n: "e-Wallet", i: "phone", c: "#6d3dba" },
    card: { n: "\u0E1A\u0E31\u0E15\u0E23/\u0E2D\u0E37\u0E48\u0E19 \u0E46", i: "card", c: "#8a6412" }
  };
  var DEF_BUD = {
    food: 8e3,
    transport: 5e3,
    shopping: 6e3,
    housing: 8e3,
    bills: 2e3,
    health: 1500,
    fun: 2500,
    other: 2e3
  };
  var BUD_IDS = Object.keys(DEF_BUD);
  var PATTERNS = ["none", "dots", "grid", "lines", "waves", "cross"];
  var TYPES = ["income", "expense", "transfer", "saving"];
  var ICON_IDS = [
    "utensils",
    "car",
    "bag",
    "home",
    "zap",
    "heart",
    "film",
    "card",
    "more",
    "banknote",
    "briefcase",
    "trend-up",
    "coin",
    "plane",
    "shield",
    "target",
    "phone",
    "receipt",
    "wallet",
    "repeat",
    "swap",
    "gift"
  ];
  var CAT_COLORS = ["#3f7d32", "#2457c5", "#a15a48", "#1f3a6b", "#5c6b80", "#0f7a6a", "#5b3fbf", "#9d1c1c", "#8a6a2f", "#0c6f86", "#8a6412", "#1f7a3a"];
  var PAD = (n) => String(n).padStart(2, "0");
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }
  function monthKey(d) {
    const x = d instanceof Date ? d : new Date(d);
    return x.getFullYear() + "-" + PAD(x.getMonth() + 1);
  }
  function dayKey(d) {
    const x = d instanceof Date ? d : new Date(d);
    return monthKey(x) + "-" + PAD(x.getDate());
  }
  function shiftKey(k, n) {
    const [y, m] = String(k).split("-").map(Number);
    return monthKey(new Date(y, m - 1 + n, 1));
  }
  function daysIn(k) {
    const [y, m] = String(k).split("-").map(Number);
    return new Date(y, m, 0).getDate();
  }
  function money(v) {
    if (typeof v === "number") {
      if (!Number.isFinite(v)) return NaN;
      return Math.round(v * 100) / 100;
    }
    let s = String(v ?? "").trim().replace(/฿/g, "").replace(/\s/g, "");
    if (!s) return NaN;
    if (/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) s = s.replace(/,/g, "");
    else if (/^-?\d+,\d{1,2}$/.test(s)) s = s.replace(",", ".");
    else s = s.replace(/,/g, "");
    const n = Number(s);
    if (!Number.isFinite(n)) return NaN;
    return Math.round(n * 100) / 100;
  }
  function baht(n, dec = 2) {
    const v = Number(n) || 0;
    const sign = v < -4e-3 ? "-" : "";
    return sign + "\u0E3F" + Math.abs(v).toLocaleString("th-TH", {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec
    });
  }
  function num(n) {
    return Number(n || 0).toLocaleString("th-TH", { maximumFractionDigits: 0 });
  }
  function compact(v) {
    const n = Number(v) || 0;
    const a = Math.abs(n);
    const sign = n < 0 ? "-" : "";
    const trim = (x) => String(x).replace(/\.0$/, "");
    if (a >= 1e6) return sign + trim((a / 1e6).toFixed(1)) + "\u0E25\u0E49\u0E32\u0E19";
    if (a >= 1e4) return sign + trim((a / 1e3).toFixed(a >= 1e5 ? 0 : 1)) + "\u0E1E\u0E31\u0E19";
    if (a >= 1e3) return sign + trim((a / 1e3).toFixed(1)) + "\u0E1E\u0E31\u0E19";
    return sign + String(Math.round(a));
  }
  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[c]);
  }
  function safeId(s) {
    const v = String(s ?? "").replace(/[^\w-]/g, "");
    return v || uid();
  }
  function monthLabel(k) {
    const [y, m] = String(k).split("-");
    return new Date(+y, +m - 1, 1).toLocaleDateString("th-TH", { month: "short", year: "numeric" });
  }
  function monthShort(k) {
    const [y, m] = String(k).split("-");
    return new Date(+y, +m - 1, 1).toLocaleDateString("th-TH", { month: "short" });
  }
  function monthLong(k) {
    const [y, m] = String(k).split("-");
    return new Date(+y, +m - 1, 1).toLocaleDateString("th-TH", { month: "long", year: "numeric" });
  }
  function fmtDate(s) {
    return new Date(s).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" });
  }
  function clock(d) {
    return new Date(d).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
  }
  function catalog(db2) {
    const map = {};
    for (const [id, c] of Object.entries(CATS)) map[id] = { ...c, id, builtin: true };
    for (const c of db2?.categories || []) {
      if (!c || !c.id || map[c.id]) continue;
      map[c.id] = {
        id: c.id,
        n: String(c.name || "\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48"),
        i: ICON_IDS.includes(c.icon) ? c.icon : "more",
        c: /^#[0-9a-fA-F]{6}$/.test(c.color || "") ? c.color : "#5c6b80",
        t: c.type === "income" ? "income" : "expense",
        builtin: false
      };
    }
    return map;
  }
  function catOf(db2, t) {
    const map = catalog(db2);
    if (t?.cat && map[t.cat]) return map[t.cat];
    if (t?.type === "transfer") return { ...SYS.transfer, id: "transfer" };
    if (t?.type === "saving") return { ...SYS.saving, id: "saving" };
    if (t?.cat) return { id: t.cat, n: "\u0E2B\u0E21\u0E27\u0E14\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E21\u0E35\u0E41\u0E25\u0E49\u0E27", i: "more", c: "#5c6b80", t: t.type || "expense", builtin: false };
    return { ...map.other, id: "other" };
  }
  function budgetIds(db2) {
    return Object.values(catalog(db2)).filter((c) => c.t === "expense" && c.id !== "debt").map((c) => c.id);
  }
  function emptyBudgets() {
    const b = { ...DEF_BUD };
    for (const k of Object.keys(b)) b[k] = 0;
    return b;
  }
  function emptyBook() {
    return {
      v: 3,
      demo: false,
      profile: { name: "", photo: "" },
      theme: "auto",
      pattern: "none",
      privacy: false,
      lastExport: "",
      txSinceExport: 0,
      lastAcc: "",
      updated: "",
      migratedFrom: "",
      accounts: [{ id: "acc_cash", name: "\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14", type: "cash", initial: 0, reserve: 0 }],
      budgets: emptyBudgets(),
      categories: [],
      goals: [],
      debts: [],
      recurring: [],
      tx: []
    };
  }
  function photoOk(ph) {
    return typeof ph === "string" && ph.length < 3e5 && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(ph);
  }
  function sanitize(d) {
    if (!d || typeof d !== "object" || !Array.isArray(d.tx)) throw new Error("bad");
    const out = {
      v: 3,
      demo: !!d.demo,
      profile: {
        name: String(d.profile?.name || "").slice(0, 30),
        photo: photoOk(d.profile?.photo) ? d.profile.photo : ""
      },
      theme: d.theme === "dark" || d.theme === "light" ? d.theme : "auto",
      pattern: PATTERNS.includes(d.pattern) ? d.pattern : "none",
      privacy: !!d.privacy,
      lastExport: typeof d.lastExport === "string" ? d.lastExport : "",
      txSinceExport: Math.max(0, Math.floor(+d.txSinceExport || 0)),
      lastAcc: "",
      updated: typeof d.updated === "string" ? d.updated : "",
      migratedFrom: typeof d.migratedFrom === "string" ? d.migratedFrom : "",
      accounts: [],
      budgets: { ...DEF_BUD },
      categories: [],
      goals: [],
      debts: [],
      recurring: [],
      tx: []
    };
    out.accounts = (Array.isArray(d.accounts) ? d.accounts : []).filter((a) => a && a.name).map((a) => ({
      id: safeId(a.id),
      name: String(a.name).slice(0, 40),
      type: ACC_T[a.type] ? a.type : "bank",
      initial: +a.initial || 0,
      reserve: Math.max(0, +a.reserve || 0)
    }));
    if (!out.accounts.length) out.accounts = [{ id: "acc_bank", name: "\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E2B\u0E25\u0E31\u0E01", type: "bank", initial: 0, reserve: 0 }];
    const ids = new Set(out.accounts.map((a) => a.id));
    const first = out.accounts[0].id;
    out.lastAcc = ids.has(d.lastAcc) ? d.lastAcc : "";
    out.categories = (Array.isArray(d.categories) ? d.categories : []).filter((c) => c && c.name && !CATS[c.id]).map((c) => ({
      id: safeId(c.id),
      name: String(c.name).slice(0, 40),
      icon: ICON_IDS.includes(c.icon) ? c.icon : "more",
      color: /^#[0-9a-fA-F]{6}$/.test(c.color || "") ? c.color : "#5c6b80",
      type: c.type === "income" ? "income" : "expense"
    }));
    const customIds = new Set(out.categories.map((c) => c.id));
    const budgetOk = /* @__PURE__ */ new Set([...BUD_IDS, ...out.categories.filter((c) => c.type === "expense").map((c) => c.id)]);
    for (const [k, v] of Object.entries(d.budgets || {})) {
      if (budgetOk.has(k)) out.budgets[k] = Math.max(0, +v || 0);
    }
    for (const c of out.categories) {
      if (c.type === "expense" && out.budgets[c.id] == null) out.budgets[c.id] = 0;
    }
    out.goals = (Array.isArray(d.goals) ? d.goals : []).filter((g) => g && g.name && +g.target > 0).map((g) => ({
      id: safeId(g.id),
      name: String(g.name).slice(0, 40),
      target: +g.target,
      img: /^https?:\/\//i.test(g.img || "") ? String(g.img) : "",
      icon: String(g.icon || "target"),
      deadline: /^\d{4}-\d{2}-\d{2}/.test(g.deadline || "") ? String(g.deadline).slice(0, 10) : ""
    }));
    out.debts = (Array.isArray(d.debts) ? d.debts : []).filter((x) => x && x.name && +x.total > 0).map((x) => ({
      id: safeId(x.id),
      name: String(x.name).slice(0, 40),
      total: +x.total,
      paidInit: Math.min(+x.total, Math.max(0, +x.paidInit || 0))
    }));
    out.recurring = (Array.isArray(d.recurring) ? d.recurring : []).filter((r) => r && (r.type === "income" || r.type === "expense") && +r.amount > 0).map((r) => ({
      id: safeId(r.id),
      type: r.type,
      cat: CATS[r.cat] || customIds.has(r.cat) ? r.cat : r.type === "income" ? "otherin" : "other",
      amount: +r.amount,
      note: String(r.note || "").slice(0, 80),
      acc: ids.has(r.acc) ? r.acc : first,
      day: Math.min(31, Math.max(1, +r.day || 1)),
      last: /^\d{4}-\d{2}$/.test(r.last || "") ? r.last : ""
    }));
    out.tx = d.tx.filter((t) => t && TYPES.includes(t.type) && Number.isFinite(+t.amount) && !Number.isNaN(new Date(t.date).getTime())).map((t) => {
      const o = {
        id: safeId(t.id),
        type: t.type,
        amount: money(t.amount),
        note: String(t.note || "").slice(0, 80),
        date: new Date(t.date).toISOString(),
        acc: ids.has(t.acc) ? t.acc : first
      };
      if (t.cat && (CATS[t.cat] || customIds.has(safeId(t.cat)) || safeId(t.cat))) o.cat = CATS[t.cat] ? t.cat : safeId(t.cat);
      if (t.type === "transfer") o.to = ids.has(t.to) ? t.to : first;
      if (t.goal) o.goal = safeId(t.goal);
      if (t.debt) o.debt = safeId(t.debt);
      if (t.rec) o.rec = safeId(t.rec);
      return o;
    });
    return out;
  }
  function migrateV1(o) {
    const accounts = [
      { id: "acc_bank", name: "\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E2D\u0E2D\u0E21\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E4C", type: "bank", initial: 0, reserve: 0 },
      { id: "acc_cash", name: "\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14", type: "cash", initial: 0, reserve: 0 },
      { id: "acc_wallet", name: "e-Wallet", type: "wallet", initial: 0, reserve: 0 }
    ];
    const tx = (o.tx || []).map((t) => ({ ...t, acc: "acc_bank" }));
    const goals = (o.goals || []).map((g) => {
      for (const h of g.history || []) {
        tx.push({
          id: uid(),
          type: "saving",
          amount: h.amount,
          note: "\u0E2D\u0E2D\u0E21: " + (g.name || ""),
          date: h.date,
          acc: "acc_bank",
          goal: g.id
        });
      }
      return { id: g.id, name: g.name, target: g.target, img: g.img || "", icon: "target", deadline: "" };
    });
    const debts = (o.debts || []).map((d) => ({
      id: d.id,
      name: d.name,
      total: d.total,
      paidInit: d.paid || d.paidInit || 0
    }));
    return sanitize({
      v: 3,
      demo: false,
      profile: { name: String(o.profile?.name || "").slice(0, 30) },
      theme: o.theme,
      pattern: o.pattern,
      accounts,
      budgets: { ...DEF_BUD, ...o.budgets || {} },
      goals,
      debts,
      recurring: [],
      tx,
      migratedFrom: "mono_finance_v1"
    });
  }
  function loadState(storage) {
    const read = (key) => {
      try {
        const raw = storage.getItem(key);
        if (!raw) return null;
        return JSON.parse(raw);
      } catch {
        return null;
      }
    };
    const v3 = read(LS_V3);
    if (v3 && Array.isArray(v3.tx)) {
      try {
        return { db: sanitize(v3), source: "v3" };
      } catch {
      }
    }
    const v2 = read(LS_V2);
    if (v2 && (v2.v === 2 || Array.isArray(v2.tx))) {
      try {
        const db2 = sanitize({ ...v2, v: 3, migratedFrom: "mono_finance_v2" });
        return { db: db2, source: "v2" };
      } catch {
      }
    }
    const v1 = read(LS_V1);
    if (v1 && Array.isArray(v1.tx)) {
      try {
        return { db: migrateV1(v1), source: "v1" };
      } catch {
      }
    }
    return { db: emptyBook(), source: "empty" };
  }
  function seed(now = /* @__PURE__ */ new Date()) {
    let s = 7;
    const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const pick = (a) => a[Math.floor(r() * a.length)];
    const start = shiftKey(monthKey(now), -6);
    const book = {
      v: 3,
      demo: true,
      profile: { name: "\u0E21\u0E32\u0E22", photo: "" },
      theme: "auto",
      pattern: "none",
      privacy: false,
      lastExport: "",
      txSinceExport: 0,
      lastAcc: "acc_wallet",
      updated: "",
      migratedFrom: "",
      accounts: [
        { id: "acc_bank", name: "\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E2D\u0E2D\u0E21\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E4C", type: "bank", initial: 15e3, reserve: 0 },
        { id: "acc_cash", name: "\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14", type: "cash", initial: 1500, reserve: 0 },
        { id: "acc_wallet", name: "e-Wallet", type: "wallet", initial: 800, reserve: 0 }
      ],
      budgets: { ...DEF_BUD },
      categories: [],
      goals: [
        { id: "g_japan", name: "\u0E17\u0E48\u0E2D\u0E07\u0E40\u0E17\u0E35\u0E48\u0E22\u0E27\u0E0D\u0E35\u0E48\u0E1B\u0E38\u0E48\u0E19", target: 5e4, img: "", icon: "plane", deadline: dayKey(new Date(now.getFullYear(), now.getMonth() + 6, 1)) },
        { id: "g_emer", name: "\u0E01\u0E2D\u0E07\u0E17\u0E38\u0E19\u0E09\u0E38\u0E01\u0E40\u0E09\u0E34\u0E19", target: 1e5, img: "", icon: "shield", deadline: "" }
      ],
      debts: [
        { id: "d_card", name: "\u0E1A\u0E31\u0E15\u0E23\u0E40\u0E04\u0E23\u0E14\u0E34\u0E15", total: 2e4, paidInit: 2e3 },
        { id: "d_phone", name: "\u0E1C\u0E48\u0E2D\u0E19\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C", total: 24e3, paidInit: 8e3 }
      ],
      recurring: [
        { id: "r1", type: "income", cat: "salary", amount: 45e3, note: "\u0E40\u0E07\u0E34\u0E19\u0E40\u0E14\u0E37\u0E2D\u0E19", acc: "acc_bank", day: 1, last: start },
        { id: "r2", type: "expense", cat: "housing", amount: 7500, note: "\u0E04\u0E48\u0E32\u0E40\u0E0A\u0E48\u0E32\u0E04\u0E2D\u0E19\u0E42\u0E14", acc: "acc_bank", day: 5, last: start },
        { id: "r3", type: "expense", cat: "bills", amount: 599, note: "\u0E04\u0E48\u0E32\u0E2D\u0E34\u0E19\u0E40\u0E17\u0E2D\u0E23\u0E4C\u0E40\u0E19\u0E47\u0E15", acc: "acc_bank", day: 10, last: start }
      ],
      tx: []
    };
    const add = (type, cat, amount, note, d, acc, extra = {}) => {
      if (d <= now) book.tx.push({ id: uid(), type, cat, amount: Math.round(amount), note, date: d.toISOString(), acc, ...extra });
    };
    for (let m = 5; m >= 0; m--) {
      const y = now.getFullYear();
      const mo = now.getMonth() - m;
      const last = m === 0 ? now.getDate() : new Date(y, mo + 1, 0).getDate();
      add("income", "freelance", 8e3 + r() * 12e3, "\u0E07\u0E32\u0E19\u0E1F\u0E23\u0E35\u0E41\u0E25\u0E19\u0E0B\u0E4C", new Date(y, mo, 15, 18), "acc_bank");
      add("saving", null, 5e3, "\u0E2D\u0E2D\u0E21: \u0E17\u0E48\u0E2D\u0E07\u0E40\u0E17\u0E35\u0E48\u0E22\u0E27\u0E0D\u0E35\u0E48\u0E1B\u0E38\u0E48\u0E19", new Date(y, mo, 2, 9), "acc_bank", { goal: "g_japan" });
      add("saving", null, 3e3, "\u0E2D\u0E2D\u0E21: \u0E01\u0E2D\u0E07\u0E17\u0E38\u0E19\u0E09\u0E38\u0E01\u0E40\u0E09\u0E34\u0E19", new Date(y, mo, 2, 9, 5), "acc_bank", { goal: "g_emer" });
      add("expense", "debt", 2e3, "\u0E0A\u0E33\u0E23\u0E30: \u0E1A\u0E31\u0E15\u0E23\u0E40\u0E04\u0E23\u0E14\u0E34\u0E15", new Date(y, mo, 25, 10), "acc_bank", { debt: "d_card" });
      add("expense", "debt", 2e3, "\u0E0A\u0E33\u0E23\u0E30: \u0E1C\u0E48\u0E2D\u0E19\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C", new Date(y, mo, 25, 10, 5), "acc_bank", { debt: "d_phone" });
      add("transfer", null, 5e3, "\u0E40\u0E15\u0E34\u0E21\u0E40\u0E07\u0E34\u0E19 e-Wallet", new Date(y, mo, 1, 12), "acc_bank", { to: "acc_wallet" });
      add("transfer", null, 2500, "\u0E16\u0E2D\u0E19\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14", new Date(y, mo, 3, 12), "acc_bank", { to: "acc_cash" });
      for (let d = 1; d <= last; d++) {
        if (m === 0 && d === last) continue;
        add("expense", "food", 60 + r() * 240, pick(["\u0E02\u0E49\u0E32\u0E27\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E19", "\u0E01\u0E32\u0E41\u0E1F", "\u0E0A\u0E32\u0E1A\u0E39", "\u0E02\u0E49\u0E32\u0E27\u0E40\u0E22\u0E47\u0E19", "\u0E0A\u0E32\u0E19\u0E21"]), new Date(y, mo, d, 12, Math.floor(r() * 59)), pick(["acc_wallet", "acc_cash", "acc_bank"]));
        if (r() > 0.35) add("expense", "transport", 40 + r() * 120, pick(["BTS", "MRT", "Grab", "\u0E40\u0E15\u0E34\u0E21\u0E19\u0E49\u0E33\u0E21\u0E31\u0E19"]), new Date(y, mo, d, 8, Math.floor(r() * 59)), pick(["acc_wallet", "acc_bank"]));
        if (r() > 0.82) add("expense", "shopping", 300 + r() * 1500, pick(["Shopee", "Lazada", "Uniqlo", "\u0E0B\u0E39\u0E40\u0E1B\u0E2D\u0E23\u0E4C\u0E21\u0E32\u0E23\u0E4C\u0E40\u0E01\u0E47\u0E15"]), new Date(y, mo, d, 19, Math.floor(r() * 59)), "acc_bank");
        if (r() > 0.92) add("expense", "fun", 150 + r() * 600, pick(["\u0E14\u0E39\u0E2B\u0E19\u0E31\u0E07", "Netflix", "\u0E04\u0E2D\u0E19\u0E40\u0E2A\u0E34\u0E23\u0E4C\u0E15"]), new Date(y, mo, d, 20), "acc_bank");
        if (r() > 0.95) add("expense", "health", 200 + r() * 800, pick(["\u0E22\u0E32", "\u0E2B\u0E32\u0E2B\u0E21\u0E2D\u0E1F\u0E31\u0E19", "\u0E1F\u0E34\u0E15\u0E40\u0E19\u0E2A"]), new Date(y, mo, d, 17), "acc_bank");
        if (r() > 0.93) add("expense", "other", 100 + r() * 500, pick(["\u0E02\u0E2D\u0E07\u0E02\u0E27\u0E31\u0E0D", "\u0E17\u0E33\u0E1A\u0E38\u0E0D", "\u0E04\u0E48\u0E32\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C"]), new Date(y, mo, d, 16), "acc_cash");
      }
    }
    const T = (h, mi) => new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, mi);
    add("expense", "food", 95, "\u0E01\u0E32\u0E41\u0E1F", T(8, 20), "acc_wallet");
    add("expense", "transport", 42, "BTS", T(8, 50), "acc_wallet");
    return sanitize(book);
  }
  function runRecurring(db2, now = /* @__PURE__ */ new Date()) {
    const cur = monthKey(now);
    let added = 0;
    for (const r of db2.recurring || []) {
      let k = r.last ? shiftKey(r.last, 1) : cur;
      while (k <= cur) {
        const [y, m] = k.split("-").map(Number);
        const d = new Date(y, m - 1, Math.min(r.day, daysIn(k)), 9, 0);
        if (d > now) break;
        db2.tx.push({
          id: uid(),
          type: r.type,
          cat: r.cat,
          amount: r.amount,
          note: r.note,
          date: d.toISOString(),
          acc: r.acc,
          rec: r.id
        });
        r.last = k;
        added += 1;
        k = shiftKey(k, 1);
      }
    }
    return added;
  }
  function sumIf(db2, pred) {
    return db2.tx.reduce((a, t) => pred(t) ? a + t.amount : a, 0);
  }
  function monthSum(db2, type, k, cat) {
    return sumIf(db2, (t) => t.type === type && monthKey(t.date) === k && (!cat || t.cat === cat));
  }
  function monthSumTo(db2, type, k, day) {
    return sumIf(db2, (t) => t.type === type && monthKey(t.date) === k && new Date(t.date).getDate() <= day);
  }
  function accBal(db2, id, k) {
    const a = db2.accounts.find((x) => x.id === id);
    let b = a ? +a.initial || 0 : 0;
    for (const t of db2.tx) {
      if (k && monthKey(t.date) > k) continue;
      if (t.type === "income" && t.acc === id) b += t.amount;
      else if ((t.type === "expense" || t.type === "saving") && t.acc === id) b -= t.amount;
      else if (t.type === "transfer") {
        if (t.acc === id) b -= t.amount;
        if (t.to === id) b += t.amount;
      }
    }
    return b;
  }
  function totalBal(db2, k) {
    return db2.accounts.reduce((s, a) => s + accBal(db2, a.id, k), 0);
  }
  function goalSaved(db2, g, k) {
    return sumIf(db2, (t) => t.type === "saving" && t.goal === g.id && (!k || monthKey(t.date) <= k));
  }
  function savingsAt(db2, k) {
    return db2.goals.reduce((s, g) => s + goalSaved(db2, g, k), 0);
  }
  function debtPaid(db2, d) {
    return (+d.paidInit || 0) + sumIf(db2, (t) => t.debt === d.id);
  }
  function debtLeft(db2) {
    return db2.debts.reduce((s, d) => s + Math.max(0, d.total - debtPaid(db2, d)), 0);
  }
  function netWorth(db2) {
    return totalBal(db2) + savingsAt(db2) - debtLeft(db2);
  }
  function reservedTotal(db2) {
    return db2.accounts.reduce((s, a) => s + Math.max(0, +a.reserve || 0), 0);
  }
  function nextRecurringDate(r, now = /* @__PURE__ */ new Date()) {
    const cur = monthKey(now);
    const k = r.last ? shiftKey(r.last, 1) : cur;
    const [y, m] = k.split("-").map(Number);
    return new Date(y, m - 1, Math.min(r.day, daysIn(k)), 9, 0);
  }
  function upcomingRecurring(db2, now = /* @__PURE__ */ new Date()) {
    const cur = monthKey(now);
    const items = [];
    let total = 0;
    for (const r of db2.recurring || []) {
      if (r.type !== "expense") continue;
      const d = nextRecurringDate(r, now);
      if (d > now && monthKey(d) === cur) {
        items.push({ ...r, due: d.toISOString() });
        total += r.amount;
      }
    }
    return { total, items };
  }
  function safeToSpend(db2, now = /* @__PURE__ */ new Date()) {
    const balance = totalBal(db2);
    const reserve = reservedTotal(db2);
    const upcoming = upcomingRecurring(db2, now).total;
    return {
      balance,
      reserve,
      upcoming,
      safe: balance - reserve - upcoming
    };
  }
  function dayStats(db2, now = /* @__PURE__ */ new Date()) {
    const k = monthKey(now);
    const dim = daysIn(k);
    const d = now.getDate();
    const left = dim - d + 1;
    const tk = dayKey(now);
    const ids = budgetIds(db2);
    const totalB = ids.reduce((s, c) => s + (db2.budgets[c] || 0), 0);
    let spentToday = 0;
    let spentMonth = 0;
    for (const t of db2.tx) {
      if (t.type !== "expense" || t.cat === "debt" || !ids.includes(t.cat) || monthKey(t.date) !== k) continue;
      spentMonth += t.amount;
      if (dayKey(t.date) === tk) spentToday += t.amount;
    }
    const before = spentMonth - spentToday;
    const allow = totalB > 0 ? Math.max(0, (totalB - before) / left) : 0;
    return { totalB, allow, spentToday, spentMonth, before, left, over: totalB > 0 && spentToday > allow + 5e-3 };
  }
  function monthlyRate(db2, pred, now = /* @__PURE__ */ new Date()) {
    const tx = db2.tx.filter(pred);
    if (!tx.length) return 0;
    const cur = monthKey(now);
    let first = cur;
    for (const t of tx) {
      const k = monthKey(t.date);
      if (k < first) first = k;
    }
    const ms = [1, 2, 3].map((i) => shiftKey(cur, -i)).filter((k) => k >= first);
    if (!ms.length) return 0;
    const total = ms.reduce((s, k) => s + tx.reduce((a, t) => monthKey(t.date) === k ? a + t.amount : a, 0), 0);
    return total / ms.length;
  }
  function monthsLeft(deadline, now = /* @__PURE__ */ new Date()) {
    const d = /* @__PURE__ */ new Date(deadline + "T00:00:00");
    return Math.max(1, (d.getFullYear() - now.getFullYear()) * 12 + d.getMonth() - now.getMonth());
  }
  function sortTx(db2) {
    db2.tx.sort((a, b) => b.date.localeCompare(a.date));
  }

  // js/charts.js
  function niceStep(max, n = 4) {
    const raw = Math.max(max, 1) / n;
    const e = 10 ** Math.floor(Math.log10(raw));
    const f = raw / e;
    return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * e;
  }
  function attachTip(el, xOf, html, guide, hl) {
    let tip = el.querySelector(".chart-tip");
    if (!tip) return;
    const g = el.querySelector(".guide");
    const show2 = (i) => {
      const x = xOf(i);
      if (hl) hl(i);
      if (g) {
        g.setAttribute("x1", x);
        g.setAttribute("x2", x);
        g.style.display = "";
      }
      tip.innerHTML = html(i);
      tip.hidden = false;
      const w = tip.offsetWidth;
      const W = el.clientWidth;
      tip.style.left = Math.max(0, Math.min(W - w, x + 12 > W - w ? x - w - 12 : x + 12)) + "px";
    };
    const hide = () => {
      tip.hidden = true;
      if (g) g.style.display = "none";
      if (hl) hl(-1);
    };
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const touch = e.touches ? e.touches[0] : e;
      show2(guide(touch.clientX - r.left));
    };
    el.onpointermove = move;
    el.onpointerdown = move;
    el.onpointerleave = hide;
    el.onpointercancel = hide;
  }
  function drawLine(el, labels, series, tipTitle, opt) {
    const W = el.clientWidth;
    const H = el.clientHeight;
    if (!W || !H || !labels.length) return;
    const m = { l: 42, r: 10, t: 12, b: 24 };
    const iw = W - m.l - m.r;
    const ih = H - m.t - m.b;
    const n = labels.length;
    const all = series.flatMap((s2) => s2.data);
    const mx = Math.max(1, ...all);
    let step = niceStep(mx);
    let base = 0;
    let top = step * 4;
    if (opt && opt.zoom) {
      const lo = Math.min(...all);
      step = niceStep(Math.max(1, mx * 0.1, (mx - lo) * 1.25));
      base = Math.max(0, Math.floor(lo / step) * step);
      top = base + step * 4;
      while (top < mx) {
        step *= 2;
        base = Math.max(0, Math.floor(lo / step) * step);
        top = base + step * 4;
      }
    }
    const rng = top - base || 1;
    const X = (i) => m.l + (n > 1 ? i / (n - 1) * iw : iw / 2);
    const Y = (v) => m.t + ih - (v - base) / rng * ih;
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="\u0E01\u0E23\u0E32\u0E1F">`;
    for (let k = 0; k <= 4; k++) {
      const y = Y(base + k * step);
      s += `<line class="gl" x1="${m.l}" x2="${W - m.r}" y1="${y}" y2="${y}"/><text class="ax" x="${m.l - 6}" y="${y + 4}" text-anchor="end">${esc(compactAxis(base + k * step))}</text>`;
    }
    const every = Math.ceil(n / Math.max(2, Math.floor(iw / 46)));
    labels.forEach((l, i) => {
      if ((n - 1 - i) % every === 0) {
        const anchor = i === 0 ? "start" : i === n - 1 ? "end" : "middle";
        s += `<text class="ax" x="${X(i)}" y="${H - 6}" text-anchor="${anchor}">${esc(l)}</text>`;
      }
    });
    series.forEach((sr) => {
      const pts = sr.data.map((v, i) => [X(i), Y(v)]);
      const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join("");
      s += `<path class="ar" d="${line}L${X(n - 1).toFixed(1)} ${Y(base)}L${X(0).toFixed(1)} ${Y(base)}Z" style="fill:${sr.color};fill-opacity:.12"/>`;
      s += `<path class="ln" d="${line}" fill="none" style="stroke:${sr.color}" stroke-width="2.25" stroke-linejoin="round" stroke-linecap="round"/>`;
      if (n <= 16) {
        pts.forEach((p) => {
          s += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3" style="fill:var(--surface);stroke:${sr.color}" stroke-width="2"/>`;
        });
      }
    });
    s += `<line class="guide" y1="${m.t}" y2="${m.t + ih}" style="display:none"/>`;
    s += series.map((sr) => `<circle class="hd" r="5" style="display:none;fill:var(--surface);stroke:${sr.color}" stroke-width="2.5"/>`).join("");
    s += `</svg><div class="chart-tip" hidden></div>`;
    el.innerHTML = s;
    attachTip(
      el,
      X,
      (i) => `<div class="tt">${esc(tipTitle(i))}</div>` + series.map((sr) => `<div><i class="dot" style="background:${sr.color}"></i>${esc(sr.name)} <b>${baht(sr.data[i], 0)}</b></div>`).join(""),
      (x) => Math.max(0, Math.min(n - 1, Math.round((x - m.l) / iw * (n - 1)))),
      (i) => {
        el.querySelectorAll(".hd").forEach((c, si) => {
          if (i < 0) {
            c.style.display = "none";
            return;
          }
          c.style.display = "";
          c.setAttribute("cx", X(i));
          c.setAttribute("cy", Y(series[si].data[i]));
        });
      }
    );
  }
  function drawCombo(el, labels, inc, exp, rate) {
    const W = el.clientWidth;
    const H = el.clientHeight;
    if (!W || !H || !labels.length) return;
    const m = { l: 42, r: 8, t: 12, b: 42 };
    const iw = W - m.l - m.r;
    const ih = H - m.t - m.b;
    const n = labels.length;
    const gw = iw / n;
    const mx = Math.max(1, ...inc, ...exp);
    const step = niceStep(mx);
    const top = step * 4;
    const Y = (v) => m.t + ih - v / top * ih;
    const bw = Math.max(5, Math.min(22, (gw - 14) / 2));
    const cx = (i) => m.l + gw * i + gw / 2;
    let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="\u0E01\u0E23\u0E32\u0E1F\u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19">`;
    for (let k = 0; k <= 4; k++) {
      const y = Y(k * step);
      s += `<line class="gl" x1="${m.l}" x2="${W - m.r}" y1="${y}" y2="${y}"/><text class="ax" x="${m.l - 6}" y="${y + 4}" text-anchor="end">${esc(compactAxis(k * step))}</text>`;
    }
    labels.forEach((l, i) => {
      const x = cx(i);
      const ihh = Math.max(0, Y(0) - Y(inc[i]));
      const eh = Math.max(0, Y(0) - Y(exp[i]));
      s += `<rect x="${(x - bw - 1).toFixed(1)}" y="${Y(inc[i]).toFixed(1)}" width="${bw}" height="${ihh.toFixed(1)}" rx="3" style="fill:var(--accent-line)"/>`;
      s += `<rect x="${(x + 1).toFixed(1)}" y="${Y(exp[i]).toFixed(1)}" width="${bw}" height="${eh.toFixed(1)}" rx="3" style="fill:var(--series-b)"/>`;
      s += `<text class="ax" x="${x}" y="${H - 22}" text-anchor="middle">${esc(l)}</text>`;
      s += `<text class="ax2" x="${x}" y="${H - 6}" text-anchor="middle">${rate[i] == null ? "\u2013" : rate[i] + "%"}</text>`;
    });
    s += `<line class="guide" y1="${m.t}" y2="${m.t + ih}" style="display:none"/></svg><div class="chart-tip" hidden></div>`;
    el.innerHTML = s;
    attachTip(
      el,
      cx,
      (i) => `<div class="tt">${esc(labels[i])}</div><div><i class="dot" style="background:var(--accent-line)"></i>\u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A <b>${baht(inc[i], 0)}</b></div><div><i class="dot" style="background:var(--series-b)"></i>\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22 <b>${baht(exp[i], 0)}</b></div><div>\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E2D\u0E2D\u0E21 <b>${rate[i] == null ? "\u2013" : rate[i] + "%"}</b></div>`,
      (x) => Math.max(0, Math.min(n - 1, Math.floor((x - m.l) / gw)))
    );
  }
  function spark(values) {
    const a = values.length ? values : [0, 0];
    const w = 64;
    const h = 24;
    const mx = Math.max(...a);
    const mn = Math.min(...a);
    const r = mx - mn || 1;
    const p = a.map((v, i) => [2 + i / (a.length - 1 || 1) * (w - 4), h - 3 - (v - mn) / r * (h - 6)]);
    return `<svg class="spark" viewBox="0 0 ${w} ${h}" aria-hidden="true"><polyline points="${p.map((q) => q[0].toFixed(1) + "," + q[1].toFixed(1)).join(" ")}"/><circle cx="${p[p.length - 1][0].toFixed(1)}" cy="${p[p.length - 1][1].toFixed(1)}" r="2.4"/></svg>`;
  }
  function compactAxis(v) {
    const a = Math.abs(v);
    if (a >= 1e6) return (v / 1e6).toFixed(1).replace(/\.0$/, "") + "\u0E25";
    if (a >= 1e3) return (v / 1e3).toFixed(a >= 1e4 ? 0 : 1).replace(/\.0$/, "") + "\u0E1E\u0E31\u0E19";
    return String(Math.round(v));
  }

  // js/app.js
  var $ = (s, r = document) => r.querySelector(s);
  var $$ = (s, r = document) => [...r.querySelectorAll(s)];
  var ICONS = new Set($$('symbol[id^="i-"]').map((s) => s.id.slice(2)));
  var ALIAS = { "shield-check": "shield", "piggy-bank": "target" };
  var META = {
    dashboard: ["\u0E2B\u0E19\u0E49\u0E32\u0E2B\u0E25\u0E31\u0E01", "", true],
    transactions: ["\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E18\u0E38\u0E23\u0E01\u0E23\u0E23\u0E21", "\u0E04\u0E49\u0E19\u0E2B\u0E32 \u0E41\u0E01\u0E49 \u0E41\u0E25\u0E30\u0E2A\u0E48\u0E07\u0E2D\u0E2D\u0E01\u0E44\u0E14\u0E49\u0E08\u0E32\u0E01\u0E2B\u0E19\u0E49\u0E32\u0E19\u0E35\u0E49", true],
    accounts: ["\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E02\u0E2D\u0E07\u0E09\u0E31\u0E19", "\u0E41\u0E22\u0E01\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14 \u0E18\u0E19\u0E32\u0E04\u0E32\u0E23 \u0E41\u0E25\u0E30\u0E27\u0E2D\u0E25\u0E40\u0E25\u0E47\u0E15", false],
    budget: ["\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13", "\u0E27\u0E07\u0E40\u0E07\u0E34\u0E19\u0E15\u0E48\u0E2D\u0E40\u0E14\u0E37\u0E2D\u0E19 \u0E41\u0E01\u0E49\u0E41\u0E25\u0E49\u0E27\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E17\u0E31\u0E19\u0E17\u0E35", true],
    goals: ["\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E01\u0E32\u0E23\u0E2D\u0E2D\u0E21", "\u0E40\u0E07\u0E34\u0E19\u0E17\u0E35\u0E48\u0E2D\u0E2D\u0E21\u0E08\u0E30\u0E16\u0E39\u0E01\u0E22\u0E49\u0E32\u0E22\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E1A\u0E31\u0E0D\u0E0A\u0E35", false],
    analytics: ["\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E01\u0E32\u0E23\u0E40\u0E07\u0E34\u0E19", "\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E08\u0E32\u0E01\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E44\u0E27\u0E49\u0E08\u0E23\u0E34\u0E07", true],
    calendar: ["\u0E1B\u0E0F\u0E34\u0E17\u0E34\u0E19", "\u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A\u0E41\u0E25\u0E30\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22\u0E23\u0E32\u0E22\u0E27\u0E31\u0E19", true],
    debts: ["\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E2B\u0E19\u0E35\u0E49", "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E08\u0E48\u0E32\u0E22\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E08\u0E23\u0E34\u0E07", false],
    settings: ["\u0E01\u0E32\u0E23\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32", "\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E44\u0E21\u0E48\u0E1A\u0E48\u0E2D\u0E22\u0E2D\u0E22\u0E39\u0E48\u0E17\u0E35\u0E48\u0E19\u0E35\u0E48", false]
  };
  var db;
  var view = "dashboard";
  var curMonth = monthKey(/* @__PURE__ */ new Date());
  var mType = "expense";
  var mCat = "food";
  var editId = null;
  var editCtx = null;
  var selDay = null;
  var catTouched = false;
  var quickList = [];
  var noteCat = {};
  var pickColor = CAT_COLORS[0];
  var pickIcon = "utensils";
  var deferredPrompt = null;
  var toastTimer = 0;
  var redraw = {};
  var ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver((entries) => {
    for (const e of entries) {
      const fn = redraw[e.target.id];
      if (fn && e.contentRect.width > 20) fn();
    }
  }) : null;
  function ic(name) {
    const n = ICONS.has(name) ? name : ALIAS[name] && ICONS.has(ALIAS[name]) ? ALIAS[name] : "target";
    return `<svg class="i" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  }
  var accName = (id) => db.accounts.find((a) => a.id === id)?.name || "\u2013";
  var shown = (n, dec = 2) => db.privacy ? "\u0E3F\u2022\u2022\u2022\u2022" : baht(n, dec);
  var shownNum = (n) => db.privacy ? "\u2022\u2022\u2022\u2022" : num(n);
  function toast(msg, undo) {
    const t = $("#toast");
    const u = $("#toast-undo");
    $("#toast-msg").textContent = msg;
    u.hidden = !undo;
    u.onclick = () => {
      if (undo) undo();
      t.classList.remove("show");
    };
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), undo ? 6e3 : 2600);
  }
  function ask(title, msg, ok = "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19", danger = false) {
    return new Promise((res) => {
      const d = $("#dlg-confirm");
      $("#cf-title").textContent = title;
      $("#cf-msg").textContent = msg;
      const b = $("#cf-ok");
      b.textContent = ok;
      b.className = "btn " + (danger ? "btn-danger" : "btn-primary");
      const open = () => {
        d.addEventListener("close", () => res(d.returnValue === "ok"), { once: true });
        d.returnValue = "";
        d.showModal();
      };
      if (d.open) {
        d.addEventListener("close", () => open(), { once: true });
        d.close("cancel");
      } else open();
    });
  }
  function save() {
    sortTx(db);
    db.updated = (/* @__PURE__ */ new Date()).toISOString();
    try {
      localStorage.setItem(LS_V3, JSON.stringify(db));
      storageOk = true;
    } catch {
      storageOk = false;
    }
  }
  var storageOk = true;
  function commit(msg, undo) {
    save();
    renderMonthSelect();
    renderAll();
    if (msg) toast(msg, undo);
  }
  function localValue(date) {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  }
  function relTime(d) {
    const t = dayKey(d);
    const now = /* @__PURE__ */ new Date();
    if (t === dayKey(now)) return "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 " + clock(d);
    const y = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    if (t === dayKey(y)) return "\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E27\u0E32\u0E19 " + clock(d);
    return new Date(d).toLocaleDateString("th-TH", { day: "numeric", month: "short" }) + " " + clock(d);
  }
  function dayLabel(d) {
    const k = dayKey(d);
    const n = /* @__PURE__ */ new Date();
    if (k === dayKey(n)) return "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49";
    if (k === dayKey(new Date(n.getFullYear(), n.getMonth(), n.getDate() - 1))) return "\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E27\u0E32\u0E19";
    return d.toLocaleDateString("th-TH", { weekday: "long", day: "numeric", month: "short" });
  }
  function delta(v, pv, inverse) {
    if (!pv || Math.abs(v - pv) < 5e-3) return '<span class="delta flat">\u0E04\u0E07\u0E17\u0E35\u0E48</span>';
    const ch = (v - pv) / Math.abs(pv) * 100;
    const up = ch >= 0;
    const good = inverse ? !up : up;
    return `<span class="delta ${good ? "good" : "bad"}">${up ? "\u25B2" : "\u25BC"} ${Math.abs(ch).toFixed(1)}%</span>`;
  }
  function emptyBox(title, sub, act) {
    return `<div class="empty-st"><span class="es">${ic("receipt")}</span><b>${title}</b>${sub ? `<p class="muted sm">${sub}</p>` : ""}${act || ""}</div>`;
  }
  function txAmt(t) {
    const a = shown(Math.abs(t.amount));
    if (t.type === "income") return `<span class="amt in maskable">+${a}</span>`;
    if (t.type === "expense") return `<span class="amt out maskable">-${a}</span>`;
    if (t.type === "saving") return `<span class="amt neu maskable">${t.amount >= 0 ? "\u2192" : "\u2190"} ${a}</span>`;
    return `<span class="amt neu maskable">\u21C4 ${a}</span>`;
  }
  function txItem(t, acts) {
    const c = catOf(db, t);
    const acc = esc(accName(t.acc)) + (t.to ? " \u2192 " + esc(accName(t.to)) : "");
    const buttons = acts ? `<div class="acts">
      <button class="icon-btn sm" type="button" data-act="edit-tx" data-id="${esc(t.id)}" aria-label="\u0E41\u0E01\u0E49\u0E44\u0E02 ${esc(t.note || c.n)}">${ic("edit")}</button>
      <button class="icon-btn sm" type="button" data-act="dup-tx" data-id="${esc(t.id)}" aria-label="\u0E17\u0E33\u0E0B\u0E49\u0E33 ${esc(t.note || c.n)}">${ic("copy")}</button>
      <button class="icon-btn sm del" type="button" data-act="del-tx" data-id="${esc(t.id)}" aria-label="\u0E25\u0E1A ${esc(t.note || c.n)}">${ic("trash")}</button>
    </div>` : "";
    return `<div class="tx"><span class="cat-ic sm" style="--c:${c.c}">${ic(c.i)}</span><div class="tx-m"><b>${esc(t.note || c.n)}</b><small>${esc(relTime(t.date))} \xB7 ${esc(c.n)} \xB7 ${acc}${t.rec ? " \xB7 \u0E1B\u0E23\u0E30\u0E08\u0E33" : ""}</small></div><div>${txAmt(t)}</div>${buttons}</div>`;
  }
  function mountChart(id, fn) {
    redraw[id] = fn;
    const el = document.getElementById(id);
    if (!el) return;
    if (ro && !el.dataset.ro) {
      ro.observe(el);
      el.dataset.ro = "1";
    }
    if (el.clientWidth > 20) fn();
  }
  function statCard(color, icon, label, value, foot) {
    const text = typeof value === "number" ? shown(value, 0) : value;
    return `<article class="card stat"><div class="stat-top"><span class="stat-ic" style="--c:${color}">${ic(icon)}</span><span>${esc(label)}</span></div><div class="stat-val maskable">${text}</div><div class="stat-foot">${foot || ""}</div></article>`;
  }
  var mq = matchMedia("(prefers-color-scheme: dark)");
  var effDark = () => db.theme === "dark" || db.theme !== "light" && mq.matches;
  function applyTheme() {
    const dark = effDark();
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.dataset.pat = db.pattern || "none";
    document.documentElement.classList.toggle("privacy", !!db.privacy);
    const meta = $("#theme-color");
    if (meta) meta.content = dark ? "#0b1220" : "#e6ebf2";
    const btn = $("#theme-btn");
    btn.innerHTML = ic(dark ? "sun" : "moon");
    const label = dark ? "\u0E2A\u0E25\u0E31\u0E1A\u0E40\u0E1B\u0E47\u0E19\u0E42\u0E2B\u0E21\u0E14\u0E2A\u0E27\u0E48\u0E32\u0E07" : "\u0E2A\u0E25\u0E31\u0E1A\u0E40\u0E1B\u0E47\u0E19\u0E42\u0E2B\u0E21\u0E14\u0E21\u0E37\u0E14";
    btn.setAttribute("aria-label", label);
    $("#privacy-btn").setAttribute("aria-pressed", String(!!db.privacy));
    $("#privacy-btn").setAttribute("aria-label", db.privacy ? "\u0E41\u0E2A\u0E14\u0E07\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E07\u0E34\u0E19" : "\u0E0B\u0E48\u0E2D\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E07\u0E34\u0E19");
    $("#privacy-btn").innerHTML = ic(db.privacy ? "eye-off" : "eye");
  }
  function setTheme(t) {
    db.theme = t;
    save();
    applyTheme();
    renderAll();
  }
  if (mq.addEventListener) mq.addEventListener("change", () => {
    if (db.theme === "auto") {
      applyTheme();
      renderAll();
    }
  });
  function initialOf(name) {
    const s = (name || "").replace(/^[เแโใไ]+/, "").trim();
    return (s.charAt(0) || "M").toUpperCase();
  }
  function renderProfile() {
    const n = (db.profile.name || "").trim();
    const photo = db.profile.photo ? `<img src="${esc(db.profile.photo)}" alt="">` : esc(initialOf(n));
    $("#side-avatar").innerHTML = photo;
    $("#set-avatar").innerHTML = photo;
    $("#side-name").textContent = n || "\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E02\u0E2D\u0E07\u0E09\u0E31\u0E19";
    const input = $("#profile-name");
    if (document.activeElement !== input) input.value = db.profile.name || "";
    $("#photo-del").hidden = !db.profile.photo;
    $$("#theme-seg button").forEach((b) => b.classList.toggle("on", b.dataset.th === db.theme));
    $$("#pat-seg button").forEach((b) => b.classList.toggle("on", b.dataset.pat === db.pattern));
    $("#privacy-toggle").checked = !!db.privacy;
  }
  function renderMonthSelect() {
    const now = monthKey(/* @__PURE__ */ new Date());
    const oldest = db.tx.length ? db.tx.reduce((m, t) => monthKey(t.date) < m ? monthKey(t.date) : m, now) : now;
    let k = now;
    const opts = [];
    while (k >= oldest && opts.length < 36) {
      opts.push(k);
      k = shiftKey(k, -1);
    }
    if (!opts.includes(curMonth)) opts.push(curMonth);
    opts.sort().reverse();
    const oi = opts.indexOf(curMonth);
    $("#m-prev").disabled = oi >= opts.length - 1;
    $("#m-next").disabled = oi <= 0;
    $("#month").innerHTML = opts.map((key) => `<option value="${key}" ${key === curMonth ? "selected" : ""}>${key === now ? "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49 (" + monthLabel(key) + ")" : monthLabel(key)}</option>`).join("");
  }
  function alerts() {
    const out = [];
    const now = /* @__PURE__ */ new Date();
    const k = monthKey(now);
    for (const c of budgetIds(db)) {
      const b = db.budgets[c] || 0;
      const s = monthSum(db, "expense", k, c);
      if (b && s / b >= 0.8) out.push({ i: "alert", t: `${catOf(db, { cat: c, type: "expense" }).n} \u0E43\u0E0A\u0E49\u0E44\u0E1B ${Math.round(s / b * 100)}% \u0E02\u0E2D\u0E07\u0E27\u0E07\u0E40\u0E07\u0E34\u0E19` });
    }
    for (const r of db.recurring || []) {
      const d = new Date(nextDue(r, now));
      const diff = (d - now) / 864e5;
      if (diff >= 0 && diff <= 3) out.push({ i: "calendar", t: `${r.note || catOf(db, r).n} ${baht(r.amount, 0)} \u0E08\u0E30\u0E16\u0E39\u0E01\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48 ${d.getDate()}` });
    }
    for (const a of db.accounts) {
      const b = accBal(db, a.id);
      if (b < -4e-3) out.push({ i: "wallet", t: `${a.name} \u0E22\u0E2D\u0E14\u0E15\u0E34\u0E14\u0E25\u0E1A ${baht(b)}` });
    }
    const rs = dayStats(db, now);
    if (rs.totalB > 0 && rs.over) out.push({ i: "alert", t: `\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49\u0E43\u0E0A\u0E49\u0E40\u0E01\u0E34\u0E19\u0E07\u0E1A\u0E23\u0E32\u0E22\u0E27\u0E31\u0E19 ${baht(rs.spentToday - rs.allow, 0)}` });
    if (!storageOk) out.push({ i: "alert", t: "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E25\u0E07\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 \u0E04\u0E27\u0E23\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E44\u0E1F\u0E25\u0E4C" });
    return out;
  }
  function nextDue(r, now) {
    const cur = monthKey(now);
    const key = r.last ? shiftKey(r.last, 1) : cur;
    const [y, m] = key.split("-").map(Number);
    const dim = new Date(y, m, 0).getDate();
    return new Date(y, m - 1, Math.min(r.day, dim), 9, 0).toISOString();
  }
  function renderBell() {
    const al = alerts();
    $("#badge").textContent = String(al.length);
    $("#badge").hidden = !al.length;
    $("#bell").setAttribute("aria-label", al.length ? `\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19 ${al.length} \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23` : "\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19");
    $("#notif").innerHTML = al.length ? al.map((a) => `<p><span>${ic(a.i)}</span><span>${esc(a.t)}</span></p>`).join("") : '<p class="none">\u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E32\u0E23\u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19</p>';
  }
  function renderBalance() {
    const k = curMonth;
    const nowK = monthKey(/* @__PURE__ */ new Date());
    const v = totalBal(db, k);
    const pv = totalBal(db, shiftKey(k, -1));
    const net = monthSum(db, "income", k) - monthSum(db, "expense", k);
    $("#bal-label").textContent = k === nowK ? "\u0E40\u0E07\u0E34\u0E19\u0E43\u0E19\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E15\u0E2D\u0E19\u0E19\u0E35\u0E49" : "\u0E40\u0E07\u0E34\u0E19\u0E43\u0E19\u0E1A\u0E31\u0E0D\u0E0A\u0E35 \u0E13 \u0E2A\u0E34\u0E49\u0E19" + monthLong(k);
    $("#bal-v").textContent = shown(v, 0);
    $("#bal-sub").innerHTML = `${delta(v, pv, false)}<span>\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E2A\u0E34\u0E49\u0E19\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E01\u0E48\u0E2D\u0E19</span><span>\xB7 \u0E2A\u0E38\u0E17\u0E18\u0E34\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49 <b class="${net >= 0 ? "amt in" : "amt out"}">${shown(net, 0)}</b></span>`;
    const safe = $("#safe-box");
    const day = $("#bal-day");
    if (k !== nowK) {
      safe.hidden = true;
      day.hidden = true;
    } else {
      safe.hidden = false;
      const s = safeToSpend(db);
      const fresh = !db.tx.length && Math.abs(s.balance) < 5e-3 && !(db.recurring || []).length;
      safe.innerHTML = fresh ? `<p class="safe-k">\u0E40\u0E23\u0E34\u0E48\u0E21\u0E08\u0E32\u0E01\u0E40\u0E07\u0E34\u0E19\u0E17\u0E35\u0E48\u0E21\u0E35\u0E08\u0E23\u0E34\u0E07</p><p class="safe-math">\u0E43\u0E2A\u0E48\u0E22\u0E2D\u0E14\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19\u0E17\u0E35\u0E48\u0E1A\u0E31\u0E0D\u0E0A\u0E35 \u0E41\u0E25\u0E49\u0E27\u0E08\u0E14\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E23\u0E01 \u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E08\u0E30\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E43\u0E2A\u0E48\u0E43\u0E2B\u0E49\u0E40\u0E2D\u0E07</p><button class="btn btn-primary btn-sm" type="button" data-act="add" style="margin-top:10px">\u0E08\u0E14\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E23\u0E01</button>` : `<div class="safe-k">\u0E43\u0E0A\u0E49\u0E44\u0E14\u0E49\u0E15\u0E2D\u0E19\u0E19\u0E35\u0E49</div><b class="safe-val maskable">${shown(s.safe, 0)}</b><p class="safe-math">\u0E40\u0E07\u0E34\u0E19\u0E43\u0E19\u0E1A\u0E31\u0E0D\u0E0A\u0E35 ${shown(s.balance, 0)} \u2212 \u0E01\u0E31\u0E19\u0E44\u0E27\u0E49 ${shown(s.reserve, 0)} \u2212 \u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E16\u0E36\u0E07 ${shown(s.upcoming, 0)}</p>`;
      day.hidden = false;
      const ds = dayStats(db);
      if (!(ds.totalB > 0)) {
        day.innerHTML = `<p class="safe-math">\u0E15\u0E31\u0E49\u0E07\u0E27\u0E07\u0E40\u0E07\u0E34\u0E19\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 \u0E41\u0E25\u0E49\u0E27\u0E08\u0E30\u0E40\u0E2B\u0E47\u0E19\u0E27\u0E48\u0E32\u0E07\u0E1A\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E40\u0E17\u0E48\u0E32\u0E44\u0E2B\u0E23\u0E48 <a class="link" href="#/budget">\u0E15\u0E31\u0E49\u0E07\u0E27\u0E07\u0E40\u0E07\u0E34\u0E19</a></p>`;
      } else {
        const rem = ds.allow - ds.spentToday;
        const p = ds.allow > 0 ? ds.spentToday / ds.allow * 100 : ds.spentToday > 0 ? 100 : 0;
        day.innerHTML = `<div class="top"><span>\u0E07\u0E1A\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 \xB7 \u0E44\u0E21\u0E48\u0E19\u0E31\u0E1A\u0E0A\u0E33\u0E23\u0E30\u0E2B\u0E19\u0E35\u0E49</span><b>${rem >= 0 ? "\u0E43\u0E0A\u0E49\u0E44\u0E14\u0E49\u0E2D\u0E35\u0E01 " + shown(rem, 0) : "\u0E40\u0E01\u0E34\u0E19 " + shown(-rem, 0)}</b></div><div class="bar ${p > 100 ? "over" : p >= 85 ? "warn" : ""}"><i style="width:${Math.min(100, p)}%"></i></div><p class="safe-math">\u0E43\u0E0A\u0E49 ${shown(ds.spentToday, 0)} \u0E08\u0E32\u0E01 ${shown(ds.allow, 0)} \xB7 \u0E40\u0E2B\u0E25\u0E37\u0E2D ${ds.left} \u0E27\u0E31\u0E19\u0E43\u0E19\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49</p>`;
      }
    }
    const ks = [5, 4, 3, 2, 1, 0].map((i) => shiftKey(k, -i));
    const data = ks.map((x) => Math.max(0, totalBal(db, x)));
    const chartWrap = $("#ch-bal").closest(".hero-chart");
    if (chartWrap) chartWrap.hidden = db.tx.length === 0;
    mountChart("ch-bal", () => drawLine($("#ch-bal"), ks.map(monthShort), [{ name: "\u0E40\u0E07\u0E34\u0E19\u0E43\u0E19\u0E1A\u0E31\u0E0D\u0E0A\u0E35", data, color: "var(--accent-line)" }], (i) => monthLong(ks[i]), { zoom: true }));
  }
  function renderStats() {
    const k = curMonth;
    const p = shiftKey(k, -1);
    const part = k === monthKey(/* @__PURE__ */ new Date());
    const day = (/* @__PURE__ */ new Date()).getDate();
    const rows = [
      ["var(--income)", "banknote", "\u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A", (x) => monthSum(db, "income", x), "income"],
      ["var(--expense)", "receipt", "\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22", (x) => monthSum(db, "expense", x), "expense"],
      ["var(--blue)", "target", "\u0E40\u0E07\u0E34\u0E19\u0E43\u0E19\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22", (x) => savingsAt(db, x), null]
    ];
    $("#d-stats").innerHTML = rows.map(([color, icon, label, f, ty]) => {
      const v = f(k);
      const pv = part && ty ? monthSumTo(db, ty, p, day) : f(p);
      const foot = `${delta(v, pv, ty === "expense")}<span>${part && ty ? "\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19" : "\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E01\u0E48\u0E2D\u0E19"}</span>${spark([5, 4, 3, 2, 1, 0].map((i) => f(shiftKey(k, -i))))}`;
      return statCard(color, icon, label, v, foot);
    }).join("");
  }
  function viewEnd() {
    if (curMonth === monthKey(/* @__PURE__ */ new Date())) return /* @__PURE__ */ new Date();
    const [y, m] = curMonth.split("-");
    return new Date(+y, +m, 0);
  }
  function renderFlow() {
    const n = +$("#range").value || 30;
    const end = viewEnd();
    const map = {};
    for (const t of db.tx) {
      if (t.type !== "income" && t.type !== "expense") continue;
      const key = dayKey(t.date);
      map[key] = map[key] || { income: 0, expense: 0 };
      map[key][t.type] += t.amount;
    }
    const labels = [];
    const full = [];
    const inc = [];
    const exp = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(end.getFullYear(), end.getMonth(), end.getDate() - i);
      const key = dayKey(d);
      labels.push(d.getDate() + "/" + (d.getMonth() + 1));
      full.push(d.toLocaleDateString("th-TH", { weekday: "short", day: "numeric", month: "short" }));
      inc.push(map[key]?.income || 0);
      exp.push(map[key]?.expense || 0);
    }
    mountChart("ch-flow", () => drawLine($("#ch-flow"), labels, [
      { name: "\u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A", data: inc, color: "var(--accent-line)" },
      { name: "\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22", data: exp, color: "var(--series-b)" }
    ], (i) => full[i]));
  }
  function renderDonut() {
    const map = catalog(db);
    const rows = Object.values(map).filter((c) => c.t === "expense").map((c) => ({ c, v: monthSum(db, "expense", curMonth, c.id) })).filter((o) => o.v > 0).sort((a, b) => b.v - a.v);
    const top = rows.slice(0, 5);
    const rest = rows.slice(5).reduce((s2, o) => s2 + o.v, 0);
    if (rest > 0) top.push({ c: { id: "rest", n: "\u0E17\u0E35\u0E48\u0E40\u0E2B\u0E25\u0E37\u0E2D", c: "#8b97a8" }, v: rest });
    const total = top.reduce((s2, o) => s2 + o.v, 0);
    $("#donut-total").textContent = db.privacy ? "\u2022\u2022\u2022\u2022" : num(total);
    const R = 54;
    const C = 2 * Math.PI * R;
    let off = 0;
    let s = `<svg viewBox="0 0 140 140" role="img" aria-label="\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22"><circle cx="70" cy="70" r="${R}" fill="none" stroke="var(--surface-2)" stroke-width="16"/>`;
    if (total) {
      top.forEach((o) => {
        const len = o.v / total * C;
        const vis = Math.max(0, len - (top.length > 1 ? 2 : 0));
        s += `<circle cx="70" cy="70" r="${R}" fill="none" stroke="${o.c.c}" stroke-width="16" stroke-dasharray="${vis.toFixed(2)} ${(C - vis).toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}" transform="rotate(-90 70 70)"><title>${esc(o.c.n)}</title></circle>`;
        off += len;
      });
    }
    $("#donut-svg").innerHTML = s + "</svg>";
    $("#donut-legend").innerHTML = top.length ? top.map((o) => `<li><i class="dot" style="background:${o.c.c}"></i><span>${esc(o.c.n)}</span><b>${Math.round(o.v / total * 100)}%</b></li>`).join("") : '<li class="muted">\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22\u0E43\u0E19\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49</li>';
  }
  function renderQuick() {
    const since = Date.now() - 90 * 864e5;
    const map = /* @__PURE__ */ new Map();
    for (const t of db.tx) {
      if (new Date(t.date).getTime() < since) continue;
      if (t.type !== "expense" || !t.note || t.debt || t.goal) continue;
      const key = t.note + "|" + t.cat;
      const hit = map.get(key);
      if (hit) hit.n += 1;
      else map.set(key, { note: t.note, cat: t.cat, amount: t.amount, acc: t.acc, n: 1 });
    }
    const items = [...map.values()].sort((a, b) => b.n - a.n).slice(0, 4);
    if (items.length) {
      window.__dashQuick = items;
      $("#quick-add").innerHTML = `<h2 class="sec">\u0E08\u0E14\u0E0B\u0E49\u0E33\u0E08\u0E32\u0E01\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13</h2><div class="quick">${items.map((q, i) => {
        const c = catOf(db, { cat: q.cat, type: "expense" });
        return `<button type="button" class="qchip" data-act="dash-quick" data-id="${i}"><span class="cat-ic sm" style="--c:${c.c}">${ic(c.i)}</span><span>${esc(q.note)}</span><b>${shownNum(q.amount)}</b></button>`;
      }).join("")}</div>`;
    } else {
      window.__dashQuick = [];
      const starters = [["expense", "food", "\u0E08\u0E14\u0E2D\u0E32\u0E2B\u0E32\u0E23"], ["expense", "transport", "\u0E08\u0E14\u0E40\u0E14\u0E34\u0E19\u0E17\u0E32\u0E07"], ["expense", "shopping", "\u0E08\u0E14\u0E02\u0E2D\u0E07\u0E43\u0E0A\u0E49"], ["income", "salary", "\u0E08\u0E14\u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A"]];
      $("#quick-add").innerHTML = `<h2 class="sec">\u0E08\u0E14\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23</h2><div class="quick">${starters.map(([type, cat, label]) => `<button type="button" class="qchip" data-act="add" data-type="${type}" data-cat="${cat}">${ic(CATS[cat].i)} ${label}</button>`).join("")}</div>`;
    }
  }
  function budgetBits(id, input) {
    const c = catOf(db, { cat: id, type: "expense" });
    const spent = monthSum(db, "expense", curMonth, id);
    const cap = db.budgets[id] || 0;
    const p = cap ? spent / cap * 100 : 0;
    const left = cap - spent;
    const prev = monthSum(db, "expense", shiftKey(curMonth, -1), id);
    const days = curMonth === monthKey(/* @__PURE__ */ new Date()) ? new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth() + 1, 0).getDate() - (/* @__PURE__ */ new Date()).getDate() + 1 : 0;
    const foot = !cap ? `\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E01\u0E48\u0E2D\u0E19\u0E43\u0E0A\u0E49 ${shown(prev, 0)}` : left >= 0 ? `\u0E40\u0E2B\u0E25\u0E37\u0E2D ${shown(left, 0)}${days ? " \xB7 \u0E27\u0E31\u0E19\u0E25\u0E30 " + shown(left / days, 0) : ""}` : `\u0E40\u0E01\u0E34\u0E19 ${shown(-left, 0)}`;
    return `<div class="brow"><span class="cat-ic sm" style="--c:${c.c}">${ic(c.i)}</span><div><div class="brow-top"><b>${esc(c.n)}</b><span class="maskable"><b>${shown(spent, 0)}</b> <span class="muted">/ ${shownNum(cap)}</span></span></div><div class="bar ${p > 100 ? "over" : p >= 80 ? "warn" : ""}"><i style="width:${Math.min(100, p)}%"></i></div><div class="brow-foot"><span>${foot}</span><span>${cap ? Math.round(p) + "%" : ""}</span></div>${input ? `<label class="lbl" style="margin-top:8px">\u0E27\u0E07\u0E40\u0E07\u0E34\u0E19\u0E1A\u0E32\u0E17<input class="input" inputmode="decimal" value="${cap || ""}" data-budget="${esc(id)}" aria-label="\u0E27\u0E07\u0E40\u0E07\u0E34\u0E19 ${esc(c.n)}" placeholder="0"></label><p class="hint">\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E01\u0E48\u0E2D\u0E19\u0E43\u0E0A\u0E49 ${shown(prev, 0)}</p>` : ""}</div></div>`;
  }
  function insights() {
    const k = curMonth;
    const p = shiftKey(k, -1);
    const out = [];
    const over = budgetIds(db).filter((c) => db.budgets[c] && monthSum(db, "expense", k, c) > db.budgets[c]);
    if (over.length) out.push("\u0E40\u0E01\u0E34\u0E19\u0E27\u0E07\u0E40\u0E07\u0E34\u0E19\u0E41\u0E25\u0E49\u0E27\u0E17\u0E35\u0E48 " + over.map((c) => catOf(db, { cat: c, type: "expense" }).n).join(", "));
    let best = null;
    for (const c of budgetIds(db)) {
      const a = monthSum(db, "expense", k, c);
      const b = monthSum(db, "expense", p, c);
      if (b > 300) {
        const ch = (a - b) / b * 100;
        if (!best || ch > best.ch) best = { c, ch };
      }
    }
    if (best && best.ch > 8) out.push(`${catOf(db, { cat: best.c, type: "expense" }).n} \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E01\u0E48\u0E2D\u0E19 ${Math.round(best.ch)}%`);
    const inc = monthSum(db, "income", k);
    const exp = monthSum(db, "expense", k);
    if (inc) {
      const r = Math.round((inc - exp) / inc * 100);
      out.push(r >= 20 ? `\u0E40\u0E2B\u0E25\u0E37\u0E2D ${r}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49` : `\u0E40\u0E2B\u0E25\u0E37\u0E2D ${r}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A \u0E16\u0E49\u0E32\u0E2D\u0E22\u0E32\u0E01\u0E40\u0E01\u0E47\u0E1A\u0E43\u0E2B\u0E49\u0E44\u0E14\u0E49\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 20% \u0E25\u0E2D\u0E07\u0E25\u0E14\u0E01\u0E49\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E43\u0E2B\u0E0D\u0E48\u0E2A\u0E38\u0E14`);
    }
    const g = db.goals.find((g2) => goalSaved(db, g2) < g2.target);
    if (g) out.push(`\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 \u201C${g.name}\u201D \u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27 ${Math.round(goalSaved(db, g) / g.target * 100)}%`);
    if (!out.length) out.push(db.tx.length ? "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E15\u0E37\u0E2D\u0E19" : "\u0E1E\u0E2D\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 \u0E2A\u0E23\u0E38\u0E1B\u0E15\u0E23\u0E07\u0E19\u0E35\u0E49\u0E08\u0E30\u0E2D\u0E48\u0E32\u0E19\u0E08\u0E32\u0E01\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13");
    return out;
  }
  function renderDashboard() {
    $("#demo-bar").hidden = !db.demo;
    const backup = $("#backup-note");
    const stale = db.txSinceExport >= 12;
    backup.hidden = !stale || db.demo;
    if (stale) $("#backup-text").textContent = `\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E43\u0E2B\u0E21\u0E48 ${db.txSinceExport} \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1F\u0E25\u0E4C`;
    renderBalance();
    renderStats();
    renderQuick();
    renderFlow();
    renderDonut();
    $("#d-recent").innerHTML = db.tx.slice(0, 5).map((t) => txItem(t, false)).join("") || emptyBox("\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E08\u0E14\u0E08\u0E30\u0E42\u0E1C\u0E25\u0E48\u0E17\u0E35\u0E48\u0E19\u0E35\u0E48", '<button class="btn btn-primary btn-sm" type="button" data-act="add">\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23</button>');
    const watched = budgetIds(db).filter((c) => db.budgets[c]).sort((a, b) => monthSum(db, "expense", curMonth, b) / db.budgets[b] - monthSum(db, "expense", curMonth, a) / db.budgets[a]).slice(0, 3);
    $("#d-budget").innerHTML = watched.length ? watched.map((c) => budgetBits(c, false)).join("") : emptyBox("\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E15\u0E31\u0E49\u0E07\u0E27\u0E07\u0E40\u0E07\u0E34\u0E19", "\u0E15\u0E31\u0E49\u0E07\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E1E\u0E23\u0E49\u0E2D\u0E21 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E27\u0E07\u0E40\u0E07\u0E34\u0E19\u0E2B\u0E25\u0E2D\u0E01", '<a class="btn btn-sm" href="#/budget">\u0E15\u0E31\u0E49\u0E07\u0E27\u0E07\u0E40\u0E07\u0E34\u0E19</a>');
    $("#d-goal").innerHTML = db.goals.slice(0, 2).map((g) => {
      const s = goalSaved(db, g);
      const p = Math.min(100, s / g.target * 100);
      return `<div class="brow"><span class="cat-ic sm" style="--c:#a15a48">${ic(g.icon || "target")}</span><div><div class="brow-top"><b>${esc(g.name)}</b><span class="maskable">${shown(s, 0)}</span></div><div class="bar"><i style="width:${p}%"></i></div></div></div>`;
    }).join("") || emptyBox("\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22", "", '<a class="btn btn-sm" href="#/goals">\u0E15\u0E31\u0E49\u0E07\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22</a>');
    $("#d-tip").innerHTML = insights().slice(0, 3).map((t) => `<div class="tip">${ic("bulb")}<div>${esc(t)}</div></div>`).join("");
  }
  function filteredTx() {
    const q = $("#q").value.trim().toLowerCase();
    const ty = $("#f-type").value;
    const ca = $("#f-cat").value;
    const ac = $("#f-acc").value;
    const all = $("#f-all").checked;
    let out = db.tx.filter((t) => (all || monthKey(t.date) === curMonth) && (!ty || t.type === ty) && (!ca || t.cat === ca) && (!ac || t.acc === ac || t.to === ac) && (!q || ((t.note || "") + " " + catOf(db, t).n + " " + accName(t.acc) + " " + t.amount).toLowerCase().includes(q)));
    const so = $("#f-sort").value;
    if (so === "old") out = [...out].reverse();
    else if (so === "big") out = [...out].sort((a, b) => b.amount - a.amount);
    else if (so === "small") out = [...out].sort((a, b) => a.amount - b.amount);
    else out = [...out];
    return out;
  }
  function renderTx() {
    const accSel = $("#f-acc");
    const keep = accSel.value;
    accSel.innerHTML = '<option value="">\u0E17\u0E38\u0E01\u0E1A\u0E31\u0E0D\u0E0A\u0E35</option>' + db.accounts.map((a) => `<option value="${esc(a.id)}">${esc(a.name)}</option>`).join("");
    if ([...accSel.options].some((o) => o.value === keep)) accSel.value = keep;
    const catSel = $("#f-cat");
    const keepC = catSel.value;
    catSel.innerHTML = '<option value="">\u0E17\u0E38\u0E01\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48</option>' + Object.values(catalog(db)).map((c) => `<option value="${esc(c.id)}">${esc(c.n)}</option>`).join("");
    if ([...catSel.options].some((o) => o.value === keepC)) catSel.value = keepC;
    const list = filteredTx();
    const inc = list.reduce((s, t) => s + (t.type === "income" ? t.amount : 0), 0);
    const exp = list.reduce((s, t) => s + (t.type === "expense" ? t.amount : 0), 0);
    $("#tx-sum").innerHTML = `<span><small>\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23</small><b>${list.length}</b></span><span><small>\u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A</small><b class="amt in">${shown(inc)}</b></span><span><small>\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22</small><b class="amt out">${shown(exp)}</b></span><span class="net"><small>\u0E2A\u0E38\u0E17\u0E18\u0E34</small><b>${shown(inc - exp)}</b></span>`;
    const so = $("#f-sort").value;
    const grouped = so === "new" || so === "old";
    let last = "";
    const html = list.slice(0, 500).map((t) => {
      let head = "";
      const k = dayKey(t.date);
      if (grouped && k !== last) {
        last = k;
        const net = list.filter((x) => dayKey(x.date) === k).reduce((s, x) => s + (x.type === "income" ? x.amount : x.type === "expense" ? -x.amount : 0), 0);
        head = `<div class="dayhead"><span>${esc(dayLabel(new Date(t.date)))}</span>${net ? `<span class="${net > 0 ? "amt in" : "amt out"}">${shown(net, 0)}</span>` : ""}</div>`;
      }
      return head + txItem(t, true);
    }).join("");
    const more = list.length > 500 ? '<p class="hint">\u0E41\u0E2A\u0E14\u0E07 500 \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E23\u0E01\u0E02\u0E2D\u0E07\u0E15\u0E31\u0E27\u0E01\u0E23\u0E2D\u0E07\u0E19\u0E35\u0E49</p>' : "";
    $("#tx-list").innerHTML = html || (db.tx.length ? emptyBox("\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E19", "\u0E25\u0E2D\u0E07\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E04\u0E33\u0E04\u0E49\u0E19\u0E2B\u0E23\u0E37\u0E2D\u0E15\u0E31\u0E27\u0E01\u0E23\u0E2D\u0E07") : emptyBox("\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E23\u0E01\u0E44\u0E14\u0E49\u0E08\u0E32\u0E01\u0E1B\u0E38\u0E48\u0E21\u0E40\u0E1E\u0E34\u0E48\u0E21", '<button class="btn btn-primary btn-sm" type="button" data-act="add">\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23</button>')) + more;
  }
  function renderAccounts() {
    const bal = totalBal(db);
    const sav = savingsAt(db);
    const debt = debtLeft(db);
    $("#nw").innerHTML = [
      statCard("var(--lime-deep)", "scale", "\u0E04\u0E27\u0E32\u0E21\u0E21\u0E31\u0E48\u0E07\u0E04\u0E31\u0E48\u0E07\u0E2A\u0E38\u0E17\u0E18\u0E34", netWorth(db), "<span>\u0E1A\u0E31\u0E0D\u0E0A\u0E35 + \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 \u2212 \u0E2B\u0E19\u0E35\u0E49</span>"),
      statCard("var(--blue)", "wallet", "\u0E40\u0E07\u0E34\u0E19\u0E43\u0E19\u0E1A\u0E31\u0E0D\u0E0A\u0E35", bal, ""),
      statCard("#a15a48", "target", "\u0E40\u0E07\u0E34\u0E19\u0E43\u0E19\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22", sav, ""),
      statCard("var(--expense)", "card", "\u0E2B\u0E19\u0E35\u0E49\u0E04\u0E07\u0E04\u0E49\u0E32\u0E07", debt, "")
    ].join("");
    const k = monthKey(/* @__PURE__ */ new Date());
    $("#acc-list").innerHTML = db.accounts.map((a) => {
      const T = ACC_T[a.type] || ACC_T.bank;
      const b = accBal(db, a.id);
      const inn = db.tx.reduce((s, t) => s + (monthKey(t.date) === k && (t.type === "income" && t.acc === a.id || t.type === "transfer" && t.to === a.id) ? t.amount : 0), 0);
      const out = db.tx.reduce((s, t) => s + (monthKey(t.date) === k && t.acc === a.id && t.type !== "income" ? t.amount : 0), 0);
      return `<article class="card"><div class="card-head"><h3 class="card-title"><span class="cat-ic sm" style="--c:${T.c}">${ic(T.i)}</span>${esc(a.name)}</h3><div class="acts" style="grid-column:auto"><button class="icon-btn sm" type="button" data-act="edit-acc" data-id="${esc(a.id)}" aria-label="\u0E41\u0E01\u0E49\u0E44\u0E02 ${esc(a.name)}">${ic("edit")}</button><button class="icon-btn sm del" type="button" data-act="del-acc" data-id="${esc(a.id)}" aria-label="\u0E25\u0E1A ${esc(a.name)}">${ic("trash")}</button></div></div><p class="muted sm">${T.n}${a.reserve ? " \xB7 \u0E01\u0E31\u0E19\u0E44\u0E27\u0E49 " + shown(a.reserve, 0) : ""}</p><p class="stat-val" style="color:${b < 0 ? "var(--expense)" : "inherit"}">${shown(b)}</p><div class="kv"><span>\u0E40\u0E02\u0E49\u0E32\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49</span><b class="amt in">${shown(inn, 0)}</b></div><div class="kv"><span>\u0E2D\u0E2D\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49</span><b class="amt out">${shown(out, 0)}</b></div><button class="btn btn-block" type="button" style="margin-top:10px" data-act="transfer" data-id="${esc(a.id)}">${ic("swap")}\u0E42\u0E2D\u0E19\u0E40\u0E07\u0E34\u0E19</button></article>`;
    }).join("");
  }
  function renderBudget() {
    const ids = budgetIds(db);
    const cap = ids.reduce((s, c) => s + (db.budgets[c] || 0), 0);
    const used = ids.reduce((s, c) => s + monthSum(db, "expense", curMonth, c), 0);
    $("#bud-sum").innerHTML = [
      statCard("var(--blue)", "target", "\u0E27\u0E07\u0E40\u0E07\u0E34\u0E19\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49", cap, ""),
      statCard("var(--expense)", "receipt", "\u0E43\u0E0A\u0E49\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27", used, ""),
      statCard(cap - used >= 0 ? "var(--income)" : "var(--expense)", "wallet", cap - used >= 0 ? "\u0E04\u0E07\u0E40\u0E2B\u0E25\u0E37\u0E2D" : "\u0E40\u0E01\u0E34\u0E19\u0E27\u0E07\u0E40\u0E07\u0E34\u0E19", cap - used, "")
    ].join("");
    $("#budget-list").innerHTML = ids.map((c) => budgetBits(c, true)).join("");
  }
  function goalCard(g) {
    const s = goalSaved(db, g);
    const p = Math.min(100, s / g.target * 100);
    const left = Math.max(0, g.target - s);
    const need = !left ? "\u0E16\u0E36\u0E07\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E41\u0E25\u0E49\u0E27" : g.deadline ? `\u0E2D\u0E2D\u0E21\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E25\u0E30 ${shown(left / monthsLeft(g.deadline), 0)} \u0E43\u0E2B\u0E49\u0E17\u0E31\u0E19 ${fmtDate(g.deadline)}` : `\u0E02\u0E32\u0E14\u0E2D\u0E35\u0E01 ${shown(left, 0)}`;
    const pic = g.img ? `<img src="${esc(g.img)}" alt="" style="width:36px;height:36px;border-radius:10px;object-fit:cover" data-fb="1">` : `<span class="cat-ic sm" style="--c:#a15a48">${ic(g.icon || "target")}</span>`;
    return `<article class="card" data-card="${esc(g.id)}"><div class="card-head"><h3 class="card-title">${pic}${esc(g.name)}</h3><div class="acts" style="grid-column:auto"><button class="icon-btn sm" type="button" data-act="edit-goal" data-id="${esc(g.id)}" aria-label="\u0E41\u0E01\u0E49\u0E44\u0E02 ${esc(g.name)}">${ic("edit")}</button><button class="icon-btn sm del" type="button" data-act="del-goal" data-id="${esc(g.id)}" aria-label="\u0E25\u0E1A ${esc(g.name)}">${ic("trash")}</button></div></div><p><b class="stat-val">${shown(s, 0)}</b> <span class="muted">/ ${shownNum(g.target)}</span></p><div class="prog"><div class="bar"><i style="width:${p}%"></i></div><b>${Math.round(p)}%</b></div><p class="hint">${need}</p>${goalEta(g, s)}${left ? `<div class="two"><input class="input" data-f="amt" inputmode="decimal" placeholder="\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E07\u0E34\u0E19" aria-label="\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A ${esc(g.name)}"><select class="select" data-f="acc" aria-label="\u0E1A\u0E31\u0E0D\u0E0A\u0E35">${db.accounts.map((a) => `<option value="${esc(a.id)}">${esc(a.name)}</option>`).join("")}</select></div><div class="two" style="margin-top:8px"><button class="btn btn-primary" type="button" data-act="goal-add" data-id="${esc(g.id)}">\u0E2D\u0E2D\u0E21\u0E40\u0E1E\u0E34\u0E48\u0E21</button><button class="btn" type="button" data-act="goal-sub" data-id="${esc(g.id)}">\u0E16\u0E2D\u0E19\u0E01\u0E25\u0E31\u0E1A</button></div>` : ""}</article>`;
  }
  function goalEta(g, saved) {
    const left = g.target - saved;
    if (left <= 0) return "";
    const rate = monthlyRate(db, (t) => t.type === "saving" && t.goal === g.id);
    if (rate <= 0) return "";
    const m = Math.ceil(left / rate);
    if (m > 240) return `<p class="hint">\u0E17\u0E35\u0E48\u0E08\u0E31\u0E07\u0E2B\u0E27\u0E30\u0E2A\u0E38\u0E17\u0E18\u0E34\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E25\u0E30 ${shown(rate, 0)} \u0E08\u0E30\u0E19\u0E32\u0E19\u0E01\u0E27\u0E48\u0E32 20 \u0E1B\u0E35</p>`;
    const dt = /* @__PURE__ */ new Date();
    dt.setDate(1);
    dt.setMonth(dt.getMonth() + m);
    const late = g.deadline && dt > /* @__PURE__ */ new Date(g.deadline + "T00:00:00");
    return `<p class="hint">\u0E17\u0E35\u0E48\u0E08\u0E31\u0E07\u0E2B\u0E27\u0E30\u0E2A\u0E38\u0E17\u0E18\u0E34\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E25\u0E30 ${shown(rate, 0)} \u0E08\u0E30\u0E16\u0E36\u0E07\u0E23\u0E32\u0E27 ${dt.toLocaleDateString("th-TH", { month: "short", year: "numeric" })}${late ? " \u0E0A\u0E49\u0E32\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14" : ""}</p>`;
  }
  function renderGoals() {
    $("#goal-list").innerHTML = db.goals.map(goalCard).join("") || `<article class="card">${emptyBox("\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22", "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E08\u0E32\u0E01\u0E1F\u0E2D\u0E23\u0E4C\u0E21\u0E14\u0E49\u0E32\u0E19\u0E25\u0E48\u0E32\u0E07 \u0E41\u0E25\u0E49\u0E27\u0E04\u0E48\u0E2D\u0E22\u0E2D\u0E2D\u0E21\u0E17\u0E35\u0E25\u0E30\u0E01\u0E49\u0E2D\u0E19")}</article>`;
  }
  function renderAnalytics() {
    const ks = [5, 4, 3, 2, 1, 0].map((i) => shiftKey(curMonth, -i));
    const I = ks.map((k) => monthSum(db, "income", k));
    const E = ks.map((k) => monthSum(db, "expense", k));
    const R = I.map((v, i) => v ? Math.round((v - E[i]) / v * 100) : null);
    mountChart("ch-ana", () => drawCombo($("#ch-ana"), ks.map(monthShort), I, E, R));
    const exp = monthSum(db, "expense", curMonth);
    const inc = monthSum(db, "income", curMonth);
    const isCur = curMonth === monthKey(/* @__PURE__ */ new Date());
    const days = isCur ? (/* @__PURE__ */ new Date()).getDate() : new Date(+curMonth.slice(0, 4), +curMonth.slice(5), 0).getDate();
    const rate = inc ? Math.round((inc - exp) / inc * 100) : null;
    const top = budgetIds(db).map((c) => ({ c, v: monthSum(db, "expense", curMonth, c) })).sort((a, b) => b.v - a.v)[0];
    const big = db.tx.filter((t) => t.type === "expense" && monthKey(t.date) === curMonth).sort((a, b) => b.amount - a.amount)[0];
    $("#ana-stats").innerHTML = [
      statCard(rate != null && rate < 0 ? "var(--expense)" : "var(--income)", "scale", "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E2D\u0E2D\u0E21", rate == null ? "\u2013" : rate + "%", "<span>\u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49</span>"),
      statCard("var(--blue)", "calendar", "\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E15\u0E48\u0E2D\u0E27\u0E31\u0E19", days ? exp / days : 0, ""),
      statCard("var(--violet)", "trend", isCur ? "\u0E16\u0E49\u0E32\u0E43\u0E0A\u0E49\u0E40\u0E17\u0E48\u0E32\u0E19\u0E35\u0E49\u0E17\u0E31\u0E49\u0E07\u0E40\u0E14\u0E37\u0E2D\u0E19" : "\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22\u0E17\u0E31\u0E49\u0E07\u0E40\u0E14\u0E37\u0E2D\u0E19", isCur && days ? exp / days * new Date((/* @__PURE__ */ new Date()).getFullYear(), (/* @__PURE__ */ new Date()).getMonth() + 1, 0).getDate() : exp, "")
    ].join("");
    const rows = [["\u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A", shown(inc, 0)], ["\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22", shown(exp, 0)]];
    if (top && top.v) rows.push(["\u0E2B\u0E21\u0E27\u0E14\u0E17\u0E35\u0E48\u0E21\u0E32\u0E01\u0E2A\u0E38\u0E14", esc(catOf(db, { cat: top.c, type: "expense" }).n)]);
    if (big) rows.push(["\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22\u0E01\u0E49\u0E2D\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E2A\u0E38\u0E14", esc(big.note || catOf(db, big).n) + " " + shown(big.amount, 0)]);
    const week = weekCompare();
    rows.push(["\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E19\u0E35\u0E49\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E01\u0E48\u0E2D\u0E19", week]);
    $("#ana-kv").innerHTML = rows.map(([k, v]) => `<div class="kv"><span>${k}</span><b>${v}</b></div>`).join("");
    $("#ana-text").innerHTML = insights().map((t) => `<div class="tip">${ic("bulb")}<div>${esc(t)}</div></div>`).join("");
  }
  function weekCompare() {
    const now = /* @__PURE__ */ new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
    const prev = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 13);
    const sumRange = (a, b) => db.tx.reduce((s, t) => {
      const d = new Date(t.date);
      return s + (t.type === "expense" && d >= a && d <= b ? t.amount : 0);
    }, 0);
    const cur = sumRange(start, now);
    const old = sumRange(prev, new Date(start.getTime() - 1));
    if (!cur && !old) return "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E19\u0E35\u0E49";
    return `${shown(cur, 0)} / \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E01\u0E48\u0E2D\u0E19 ${shown(old, 0)}`;
  }
  function renderCalendar() {
    const [y, m] = curMonth.split("-").map(Number);
    const first = new Date(y, m - 1, 1).getDay();
    const dim = new Date(y, m, 0).getDate();
    const today = dayKey(/* @__PURE__ */ new Date());
    const day = {};
    for (const t of db.tx) {
      if (monthKey(t.date) !== curMonth || t.type !== "income" && t.type !== "expense") continue;
      const k = dayKey(t.date);
      day[k] = day[k] || { i: 0, e: 0 };
      day[k][t.type === "income" ? "i" : "e"] += t.amount;
    }
    $("#cal-title").textContent = monthLong(curMonth);
    if (!selDay || !selDay.startsWith(curMonth)) selDay = curMonth === monthKey(/* @__PURE__ */ new Date()) ? today : null;
    let html = ["\u0E2D\u0E32", "\u0E08", "\u0E2D", "\u0E1E", "\u0E1E\u0E24", "\u0E28", "\u0E2A"].map((d) => `<div class="h">${d}</div>`).join("") + '<div class="blank"></div>'.repeat(first);
    for (let d = 1; d <= dim; d++) {
      const k = `${curMonth}-${String(d).padStart(2, "0")}`;
      const v = day[k] || { i: 0, e: 0 };
      html += `<button type="button" class="d ${k === today ? "today" : ""} ${k > today ? "fut" : ""} ${k === selDay ? "sel" : ""}" data-act="day" data-id="${k}" aria-label="\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48 ${d}${v.i ? " \u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A " + num(v.i) : ""}${v.e ? " \u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22 " + num(v.e) : ""}"><b>${d}</b>${v.i ? `<span class="amt in">+${db.privacy ? "\u2022" : compact(v.i)}</span>` : ""}${v.e ? `<span class="amt out">-${db.privacy ? "\u2022" : compact(v.e)}</span>` : ""}</button>`;
    }
    $("#cal").innerHTML = html;
    if (selDay && selDay.startsWith(curMonth)) {
      const list = db.tx.filter((t) => dayKey(t.date) === selDay);
      $("#day-title").textContent = "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48 " + fmtDate(selDay + "T12:00:00");
      $("#day-list").innerHTML = list.map((t) => txItem(t, true)).join("") || '<div class="empty">\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E43\u0E19\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49</div>';
    } else {
      $("#day-title").textContent = "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E27\u0E31\u0E19\u0E43\u0E19\u0E1B\u0E0F\u0E34\u0E17\u0E34\u0E19";
      $("#day-list").innerHTML = "";
    }
  }
  function renderDebts() {
    $("#debt-list").innerHTML = db.debts.map((d) => {
      const paid = debtPaid(db, d);
      const left = Math.max(0, d.total - paid);
      const p = Math.min(100, paid / d.total * 100);
      const rate = monthlyRate(db, (t) => t.debt === d.id);
      let eta = "";
      if (left > 0 && rate > 0) {
        const m = Math.ceil(left / rate);
        const dt = /* @__PURE__ */ new Date();
        dt.setDate(1);
        dt.setMonth(dt.getMonth() + m);
        eta = `<p class="hint">\u0E16\u0E49\u0E32\u0E08\u0E48\u0E32\u0E22\u0E15\u0E48\u0E2D\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E25\u0E30 ${shown(rate, 0)} \u0E08\u0E30\u0E2B\u0E21\u0E14\u0E23\u0E32\u0E27 ${m > 240 ? "\u0E19\u0E32\u0E19\u0E01\u0E27\u0E48\u0E32 20 \u0E1B\u0E35" : dt.toLocaleDateString("th-TH", { month: "short", year: "numeric" })}</p>`;
      }
      return `<article class="card" data-card="${esc(d.id)}"><div class="card-head"><h3 class="card-title"><span class="cat-ic sm" style="--c:#1f3a6b">${ic("card")}</span>${esc(d.name)}</h3><div class="acts" style="grid-column:auto"><button class="icon-btn sm" type="button" data-act="edit-debt" data-id="${esc(d.id)}" aria-label="\u0E41\u0E01\u0E49\u0E44\u0E02 ${esc(d.name)}">${ic("edit")}</button><button class="icon-btn sm del" type="button" data-act="del-debt" data-id="${esc(d.id)}" aria-label="\u0E25\u0E1A ${esc(d.name)}">${ic("trash")}</button></div></div><p>\u0E04\u0E07\u0E40\u0E2B\u0E25\u0E37\u0E2D <b class="stat-val" style="color:${left ? "var(--expense)" : "var(--income)"}">${shown(left, 0)}</b> <span class="muted">\u0E08\u0E32\u0E01 ${shownNum(d.total)}</span></p><div class="prog"><div class="bar"><i style="width:${p}%"></i></div><b>${Math.round(p)}%</b></div>${eta}${left ? `<div class="two"><input class="input" data-f="amt" inputmode="decimal" placeholder="\u0E22\u0E2D\u0E14\u0E0A\u0E33\u0E23\u0E30" aria-label="\u0E22\u0E2D\u0E14\u0E0A\u0E33\u0E23\u0E30 ${esc(d.name)}"><select class="select" data-f="acc" aria-label="\u0E1A\u0E31\u0E0D\u0E0A\u0E35">${db.accounts.map((a) => `<option value="${esc(a.id)}">${esc(a.name)}</option>`).join("")}</select></div><button class="btn btn-primary btn-block" type="button" style="margin-top:8px" data-act="pay-debt" data-id="${esc(d.id)}">\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E0A\u0E33\u0E23\u0E30</button>` : '<p class="hint">\u0E1B\u0E25\u0E14\u0E2B\u0E19\u0E35\u0E49\u0E01\u0E49\u0E2D\u0E19\u0E19\u0E35\u0E49\u0E41\u0E25\u0E49\u0E27</p>'}</article>`;
    }).join("") || `<article class="card">${emptyBox("\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E2B\u0E19\u0E35\u0E49\u0E43\u0E19\u0E2A\u0E21\u0E38\u0E14", "\u0E16\u0E49\u0E32\u0E21\u0E35 \u0E04\u0E48\u0E2D\u0E22\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E08\u0E32\u0E01\u0E1F\u0E2D\u0E23\u0E4C\u0E21\u0E14\u0E49\u0E32\u0E19\u0E25\u0E48\u0E32\u0E07")}</article>`;
  }
  function renderSettings() {
    renderProfile();
    $("#version-line").textContent = "\u0E23\u0E38\u0E48\u0E19 " + APP_VERSION;
    const when = db.lastExport ? new Date(db.lastExport).toLocaleString("th-TH", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E40\u0E04\u0E22";
    $("#backup-status").textContent = `\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E44\u0E1F\u0E25\u0E4C\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14: ${when} \xB7 \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E43\u0E2B\u0E21\u0E48\u0E19\u0E31\u0E1A\u0E08\u0E32\u0E01\u0E19\u0E31\u0E49\u0E19 ${db.txSinceExport}`;
    $("#cat-list").innerHTML = (db.categories || []).map((c) => `<div class="tx"><span class="cat-ic sm" style="--c:${c.color}">${ic(c.icon)}</span><div class="tx-m"><b>${esc(c.name)}</b><small>${c.type === "income" ? "\u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A" : "\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22"}</small></div><button class="icon-btn sm del" type="button" data-act="del-cat" data-id="${esc(c.id)}" aria-label="\u0E25\u0E1A\u0E2B\u0E21\u0E27\u0E14 ${esc(c.name)}">${ic("trash")}</button></div>`).join("") || '<p class="hint" style="margin-top:0">\u0E2B\u0E21\u0E27\u0E14\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19\u0E16\u0E39\u0E01\u0E25\u0E47\u0E2D\u0E01\u0E44\u0E27\u0E49 \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E2B\u0E21\u0E27\u0E14\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13\u0E44\u0E14\u0E49\u0E14\u0E49\u0E32\u0E19\u0E25\u0E48\u0E32\u0E07</p>';
    $$("#cat-colors button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.color === pickColor)));
    $$("#cat-icons button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.icon === pickIcon)));
    $("#rec-list").innerHTML = (db.recurring || []).map((r) => {
      const c = catOf(db, r);
      return `<div class="tx"><span class="cat-ic sm" style="--c:${c.c}">${ic(c.i)}</span><div class="tx-m"><b>${esc(r.note || c.n)}</b><small>\u0E17\u0E38\u0E01\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48 ${r.day} \xB7 ${esc(accName(r.acc))}</small></div><span class="${r.type === "income" ? "amt in" : "amt out"}">${shown(r.amount, 0)}</span><div class="acts"><button class="icon-btn sm" type="button" data-act="edit-rec" data-id="${esc(r.id)}" aria-label="\u0E41\u0E01\u0E49\u0E44\u0E02\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E08\u0E33 ${esc(r.note || c.n)}">${ic("edit")}</button><button class="icon-btn sm del" type="button" data-act="del-rec" data-id="${esc(r.id)}" aria-label="\u0E2B\u0E22\u0E38\u0E14\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E08\u0E33 ${esc(r.note || c.n)}">${ic("x")}</button></div></div>`;
    }).join("") || '<div class="empty">\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E08\u0E33</div>';
  }
  var RENDER = {
    dashboard: renderDashboard,
    transactions: renderTx,
    accounts: renderAccounts,
    budget: renderBudget,
    goals: renderGoals,
    analytics: renderAnalytics,
    calendar: renderCalendar,
    debts: renderDebts,
    settings: renderSettings
  };
  function renderAll() {
    const meta = META[view];
    $("#page-title").textContent = meta[0];
    $("#page-sub").textContent = view === "dashboard" ? (/* @__PURE__ */ new Date()).toLocaleDateString("th-TH", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : meta[1];
    $("#mnav").hidden = !meta[2];
    $("#notice").hidden = storageOk;
    $("#last-upd").textContent = "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14: " + (db.updated ? new Date(db.updated).toLocaleString("th-TH", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "\u2013");
    renderProfile();
    renderBell();
    RENDER[view]();
    applyTheme();
  }
  function show(v) {
    view = META[v] ? v : "dashboard";
    $$("#nav a, #tabbar a").forEach((a) => {
      if (a.dataset.view === view) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    $$(".view").forEach((s) => s.classList.toggle("active", s.id === "v-" + view));
    $("#tab-more").classList.toggle("on", !["dashboard", "transactions", "budget"].includes(view));
    closeMenu();
    $("#content").scrollTop = 0;
    document.title = view === "dashboard" ? "MONO \u2013 \u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E01\u0E32\u0E23\u0E40\u0E07\u0E34\u0E19" : META[view][0] + " \xB7 MONO";
    renderAll();
  }
  function route() {
    const name = (location.hash.match(/^#\/([a-z]+)/) || [])[1];
    return META[name] ? name : "dashboard";
  }
  function go(v) {
    if (!META[v]) v = "dashboard";
    try {
      history.replaceState(null, "", "#/" + v);
    } catch {
    }
    show(v);
  }
  function accOptions(sel) {
    return db.accounts.map((a) => `<option value="${esc(a.id)}" ${a.id === sel ? "selected" : ""}>${esc(a.name)}</option>`).join("");
  }
  function fillModal() {
    const tr = mType === "transfer";
    const locked = !!(editId && db.tx.find((t) => t.id === editId)?.debt);
    $$("#seg button").forEach((b) => {
      const on = b.dataset.t === mType;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", String(on));
      b.disabled = !!locked && b.dataset.t !== "expense" || b.dataset.t === "transfer" && db.accounts.length < 2;
    });
    $("#m-cat-wrap").hidden = tr;
    $("#m-to-wrap").hidden = !tr;
    $("#m-rec-wrap").hidden = tr || !!editId;
    quickList = tr || editId ? [] : frequent(mType);
    $("#m-quick-wrap").hidden = !quickList.length;
    $("#m-quick").innerHTML = quickList.map((q, i) => {
      const c = catOf(db, { cat: q.cat, type: mType });
      return `<button type="button" class="qchip" data-q="${i}"><span class="cat-ic sm" style="--c:${c.c}">${ic(c.i)}</span><span>${esc(q.note)}</span><b>${num(q.amount)}</b></button>`;
    }).join("");
    $("#m-acc-l").textContent = tr ? "\u0E08\u0E32\u0E01\u0E1A\u0E31\u0E0D\u0E0A\u0E35" : mType === "income" ? "\u0E40\u0E02\u0E49\u0E32\u0E1A\u0E31\u0E0D\u0E0A\u0E35" : "\u0E08\u0E48\u0E32\u0E22\u0E08\u0E32\u0E01\u0E1A\u0E31\u0E0D\u0E0A\u0E35";
    const cats = Object.values(catalog(db)).filter((c) => c.t === mType);
    if (!tr && !cats.some((c) => c.id === mCat)) mCat = cats[0]?.id || "other";
    noteCat = {};
    const seen = [];
    for (const t of db.tx) {
      const c = catalog(db)[t.cat];
      if (!c || c.t !== mType || t.goal || t.debt || !t.note || noteCat[t.note] != null) continue;
      noteCat[t.note] = t.cat;
      seen.push(t.note);
      if (seen.length >= 40) break;
    }
    $("#note-list").innerHTML = seen.map((n) => `<option value="${esc(n)}">`).join("");
    $("#m-cats").innerHTML = cats.map((c) => `<button type="button" class="chip" style="--c:${c.c}" data-c="${esc(c.id)}" aria-pressed="${c.id === mCat}">${ic(c.i)}${esc(c.n)}</button>`).join("");
  }
  function frequent(type) {
    const since = Date.now() - 90 * 864e5;
    const map = /* @__PURE__ */ new Map();
    for (const t of db.tx) {
      if (new Date(t.date).getTime() < since) continue;
      const c = catalog(db)[t.cat];
      if (!c || c.t !== type || t.goal || t.debt || t.rec || !t.note) continue;
      const key = t.note + "|" + t.cat;
      if (!map.has(key)) map.set(key, { note: t.note, cat: t.cat, amount: t.amount, acc: t.acc, n: 1 });
      else map.get(key).n += 1;
    }
    return [...map.values()].sort((a, b) => b.n - a.n).slice(0, 6);
  }
  function openModal(type = "expense", preset = {}, id = null) {
    const dlg = $("#dlg-tx");
    if (dlg.open) dlg.close();
    editId = id;
    mType = type === "income" || type === "transfer" || type === "expense" ? type : "expense";
    if (mType === "transfer" && db.accounts.length < 2) {
      toast("\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 2 \u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E08\u0E36\u0E07\u0E08\u0E30\u0E42\u0E2D\u0E19\u0E44\u0E14\u0E49");
      mType = "expense";
      if (preset && preset.forceTransfer) return;
    }
    if (preset.cat && catalog(db)[preset.cat]) mCat = preset.cat;
    catTouched = !!preset.cat;
    $("#m-title").textContent = id ? "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23" : mType === "transfer" ? "\u0E42\u0E2D\u0E19\u0E40\u0E07\u0E34\u0E19\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1A\u0E31\u0E0D\u0E0A\u0E35" : "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23";
    const when = preset.date ? new Date(preset.date) : /* @__PURE__ */ new Date();
    $("#m-date").value = localValue(when);
    $("#m-amt").value = preset.amount ? String(preset.amount) : "";
    $("#m-note").value = preset.note || "";
    $("#m-rec").checked = false;
    $("#m-err").textContent = "";
    const acc = db.accounts.some((a) => a.id === (preset.acc || db.lastAcc)) ? preset.acc || db.lastAcc : db.accounts[0]?.id;
    $("#m-acc").innerHTML = accOptions(acc);
    const other = preset.to || db.accounts.find((a) => a.id !== acc)?.id;
    $("#m-to").innerHTML = accOptions(other);
    fillModal();
    dlg.showModal();
    $("#m-amt").focus();
  }
  $("#tx-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const err = (m) => {
      $("#m-err").textContent = m;
    };
    err("");
    const amount = money($("#m-amt").value);
    if (!(amount > 0)) return err("\u0E43\u0E2A\u0E48\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E07\u0E34\u0E19\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 0");
    const dt = new Date($("#m-date").value);
    if (Number.isNaN(dt.getTime())) return err("\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
    if (!db.accounts.length) return err("\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E01\u0E48\u0E2D\u0E19");
    const wasOver = dayStats(db).over;
    const t = { id: editId || uid(), type: mType, amount, note: $("#m-note").value.trim().slice(0, 80), date: dt.toISOString(), acc: $("#m-acc").value };
    if (mType === "transfer") {
      t.to = $("#m-to").value;
      if (!t.to || t.to === t.acc) return err("\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E1B\u0E25\u0E32\u0E22\u0E17\u0E32\u0E07\u0E04\u0E19\u0E25\u0E30\u0E1A\u0E31\u0E0D\u0E0A\u0E35");
    } else t.cat = mCat;
    const was = !!editId;
    if (was) {
      const i = db.tx.findIndex((x) => x.id === editId);
      if (i < 0) return err("\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23");
      const merged = { ...db.tx[i], ...t };
      if (mType !== "transfer") delete merged.to;
      db.tx[i] = merged;
    } else {
      db.tx.push(t);
      db.txSinceExport += 1;
      db.lastAcc = t.acc;
      if ($("#m-rec").checked && mType !== "transfer") {
        db.recurring.push({ id: uid(), type: mType, cat: mCat, amount, note: t.note, acc: t.acc, day: dt.getDate(), last: monthKey(dt) });
      }
    }
    $("#dlg-tx").close();
    let msg = was ? "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E25\u0E49\u0E27" : "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E25\u0E49\u0E27";
    if (!was && mType === "expense") {
      const rs = dayStats(db);
      if (rs.totalB > 0 && rs.over && !wasOver) msg = `\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E41\u0E25\u0E49\u0E27 \xB7 \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49\u0E43\u0E0A\u0E49\u0E40\u0E01\u0E34\u0E19\u0E07\u0E1A\u0E23\u0E32\u0E22\u0E27\u0E31\u0E19 ${baht(rs.spentToday - rs.allow, 0)}`;
    }
    commit(msg);
  });
  $("#seg").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b || b.disabled) return;
    mType = b.dataset.t;
    $("#m-err").textContent = "";
    fillModal();
  });
  $("#m-cats").addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    catTouched = true;
    mCat = b.dataset.c;
    $$("#m-cats .chip").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  });
  $("#m-quick").addEventListener("click", (e) => {
    const b = e.target.closest("[data-q]");
    if (!b) return;
    const q = quickList[+b.dataset.q];
    if (!q) return;
    $("#m-amt").value = String(q.amount);
    $("#m-note").value = q.note;
    mCat = q.cat;
    catTouched = true;
    if (db.accounts.some((a) => a.id === q.acc)) $("#m-acc").value = q.acc;
    $$("#m-cats .chip").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.c === q.cat)));
    $("#m-amt").focus();
  });
  $("#m-note").addEventListener("input", (e) => {
    const c = noteCat[e.target.value];
    if (c && !catTouched && !editId && mType !== "transfer") {
      mCat = c;
      $$("#m-cats .chip").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.c === c)));
    }
  });
  $("#keypad").addEventListener("click", (e) => {
    const b = e.target.closest("[data-key]");
    if (!b) return;
    const input = $("#m-amt");
    let v = input.value;
    const key = b.dataset.key;
    if (key === "back") v = v.slice(0, -1);
    else if (key === ".") {
      if (!v.includes(".")) v = (v || "0") + ".";
    } else {
      const parts = v.split(".");
      if (parts[1] && parts[1].length >= 2) return;
      if (!v.includes(".") && parts[0].replace("-", "").length >= 9) return;
      v += key;
    }
    input.value = v;
  });
  function openEdit(kind, id) {
    editCtx = { kind, id };
    $("#e-err").textContent = "";
    const field = (label, html2) => `<label class="lbl">${label}${html2}</label>`;
    let title = "\u0E41\u0E01\u0E49\u0E44\u0E02";
    let html = "";
    if (kind === "acc") {
      const a = db.accounts.find((x) => x.id === id);
      if (!a) return;
      title = "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E1A\u0E31\u0E0D\u0E0A\u0E35";
      html = field("\u0E0A\u0E37\u0E48\u0E2D", `<input class="input" data-k="name" maxlength="40" value="${esc(a.name)}">`) + field("\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17", `<select class="select" data-k="type">${Object.entries(ACC_T).map(([k, v]) => `<option value="${k}" ${a.type === k ? "selected" : ""}>${v.n}</option>`).join("")}</select>`) + field("\u0E22\u0E2D\u0E14\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19 (\u0E1A\u0E32\u0E17)", `<input class="input" data-k="initial" inputmode="decimal" value="${a.initial || 0}">`) + field("\u0E01\u0E31\u0E19\u0E44\u0E27\u0E49\u0E44\u0E21\u0E48\u0E43\u0E2B\u0E49\u0E19\u0E31\u0E1A\u0E43\u0E19 \u201C\u0E43\u0E0A\u0E49\u0E44\u0E14\u0E49\u0E15\u0E2D\u0E19\u0E19\u0E35\u0E49\u201D (\u0E1A\u0E32\u0E17)", `<input class="input" data-k="reserve" inputmode="decimal" value="${a.reserve || 0}">`);
    } else if (kind === "goal") {
      const g = db.goals.find((x) => x.id === id);
      if (!g) return;
      title = "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22";
      html = field("\u0E0A\u0E37\u0E48\u0E2D", `<input class="input" data-k="name" maxlength="40" value="${esc(g.name)}">`) + field("\u0E22\u0E2D\u0E14\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22", `<input class="input" data-k="target" inputmode="decimal" value="${g.target}">`) + field("\u0E04\u0E23\u0E1A\u0E01\u0E33\u0E2B\u0E19\u0E14", `<input class="input" data-k="deadline" type="date" value="${esc(g.deadline || "")}">`) + field("\u0E25\u0E34\u0E07\u0E01\u0E4C\u0E23\u0E39\u0E1B", `<input class="input" data-k="img" type="url" value="${esc(g.img || "")}">`);
    } else if (kind === "debt") {
      const d2 = db.debts.find((x) => x.id === id);
      if (!d2) return;
      title = "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E2B\u0E19\u0E35\u0E49";
      html = field("\u0E0A\u0E37\u0E48\u0E2D", `<input class="input" data-k="name" maxlength="40" value="${esc(d2.name)}">`) + field("\u0E22\u0E2D\u0E14\u0E2B\u0E19\u0E35\u0E49\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14", `<input class="input" data-k="total" inputmode="decimal" value="${d2.total}">`) + field("\u0E08\u0E48\u0E32\u0E22\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27\u0E01\u0E48\u0E2D\u0E19\u0E43\u0E0A\u0E49\u0E41\u0E2D\u0E1B", `<input class="input" data-k="paidInit" inputmode="decimal" value="${d2.paidInit || 0}">`);
    } else if (kind === "rec") {
      const r = db.recurring.find((x) => x.id === id);
      if (!r) return;
      title = "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E08\u0E33";
      html = field("\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14", `<input class="input" data-k="note" maxlength="80" value="${esc(r.note || "")}">`) + field("\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E07\u0E34\u0E19", `<input class="input" data-k="amount" inputmode="decimal" value="${r.amount}">`) + field("\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E02\u0E2D\u0E07\u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19", `<input class="input" data-k="day" inputmode="numeric" value="${r.day}">`) + field("\u0E1A\u0E31\u0E0D\u0E0A\u0E35", `<select class="select" data-k="acc">${accOptions(r.acc)}</select>`);
    } else if (kind === "saving") {
      const t = db.tx.find((x) => x.id === id);
      if (!t) return;
      title = "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E01\u0E32\u0E23\u0E2D\u0E2D\u0E21";
      html = field("\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E07\u0E34\u0E19 (\u0E15\u0E34\u0E14\u0E25\u0E1A\u0E04\u0E37\u0E2D\u0E16\u0E2D\u0E19)", `<input class="input" data-k="amount" inputmode="decimal" value="${t.amount}">`) + field("\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14", `<input class="input" data-k="note" maxlength="80" value="${esc(t.note || "")}">`) + field("\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", `<input class="input" data-k="date" type="datetime-local" value="${localValue(t.date)}">`) + field("\u0E1A\u0E31\u0E0D\u0E0A\u0E35", `<select class="select" data-k="acc">${accOptions(t.acc)}</select>`);
    }
    $("#e-title").textContent = title;
    $("#e-fields").innerHTML = html;
    const d = $("#dlg-edit");
    if (d.open) d.close();
    d.showModal();
    const first = $("#e-fields input, #e-fields select");
    if (first) first.focus();
  }
  $("#edit-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!editCtx) return;
    const val = (k) => $(`#e-fields [data-k="${k}"]`)?.value ?? "";
    const fail = (m) => {
      $("#e-err").textContent = m;
    };
    if (editCtx.kind === "acc") {
      const a = db.accounts.find((x) => x.id === editCtx.id);
      const name = val("name").trim();
      const initial = money(val("initial"));
      const reserve = money(val("reserve") || 0);
      if (!name) return fail("\u0E43\u0E2A\u0E48\u0E0A\u0E37\u0E48\u0E2D\u0E1A\u0E31\u0E0D\u0E0A\u0E35");
      if (!Number.isFinite(initial) || !Number.isFinite(reserve) || reserve < 0) return fail("\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
      Object.assign(a, { name: name.slice(0, 40), type: val("type"), initial, reserve });
    } else if (editCtx.kind === "goal") {
      const g = db.goals.find((x) => x.id === editCtx.id);
      const name = val("name").trim();
      const target = money(val("target"));
      const img = val("img").trim();
      if (!name) return fail("\u0E43\u0E2A\u0E48\u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22");
      if (!(target > 0)) return fail("\u0E22\u0E2D\u0E14\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 0");
      if (img && !/^https?:\/\//i.test(img)) return fail("\u0E25\u0E34\u0E07\u0E01\u0E4C\u0E23\u0E39\u0E1B\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E36\u0E49\u0E19\u0E15\u0E49\u0E19\u0E14\u0E49\u0E27\u0E22 http:// \u0E2B\u0E23\u0E37\u0E2D https://");
      Object.assign(g, { name: name.slice(0, 40), target, deadline: val("deadline"), img });
    } else if (editCtx.kind === "debt") {
      const d = db.debts.find((x) => x.id === editCtx.id);
      const name = val("name").trim();
      const total = money(val("total"));
      const paidInit = money(val("paidInit") || 0);
      if (!name) return fail("\u0E43\u0E2A\u0E48\u0E0A\u0E37\u0E48\u0E2D\u0E2B\u0E19\u0E35\u0E49");
      if (!(total > 0)) return fail("\u0E22\u0E2D\u0E14\u0E2B\u0E19\u0E35\u0E49\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 0");
      if (paidInit < 0 || paidInit > total) return fail("\u0E22\u0E2D\u0E14\u0E17\u0E35\u0E48\u0E08\u0E48\u0E32\u0E22\u0E41\u0E25\u0E49\u0E27\u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07 0 \u0E01\u0E31\u0E1A\u0E22\u0E2D\u0E14\u0E2B\u0E19\u0E35\u0E49");
      Object.assign(d, { name: name.slice(0, 40), total, paidInit });
    } else if (editCtx.kind === "rec") {
      const r = db.recurring.find((x) => x.id === editCtx.id);
      const amount = money(val("amount"));
      const day = Math.round(+val("day"));
      if (!(amount > 0)) return fail("\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E07\u0E34\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 0");
      if (day < 1 || day > 31) return fail("\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07 1 \u0E16\u0E36\u0E07 31");
      Object.assign(r, { note: val("note").trim().slice(0, 80), amount, day, acc: val("acc") });
    } else if (editCtx.kind === "saving") {
      const t = db.tx.find((x) => x.id === editCtx.id);
      const amount = money(val("amount"));
      const dt = new Date(val("date"));
      if (!amount) return fail("\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E07\u0E34\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E40\u0E1B\u0E47\u0E19 0");
      if (Number.isNaN(dt.getTime())) return fail("\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07");
      Object.assign(t, { amount, note: val("note").trim().slice(0, 80), date: dt.toISOString(), acc: val("acc") });
    }
    $("#dlg-edit").close();
    commit("\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E41\u0E01\u0E49\u0E44\u0E02\u0E41\u0E25\u0E49\u0E27");
  });
  function goalMove(id, dir, btn) {
    const g = db.goals.find((x) => x.id === id);
    const box = btn.closest("[data-card]");
    const v = money(box.querySelector("[data-f=amt]").value);
    const acc = box.querySelector("[data-f=acc]").value;
    if (!(v > 0)) return toast("\u0E43\u0E2A\u0E48\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E07\u0E34\u0E19");
    if (dir < 0 && v > goalSaved(db, g) + 1e-3) return toast("\u0E16\u0E2D\u0E19\u0E44\u0E14\u0E49\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19 " + baht(goalSaved(db, g), 0));
    const go2 = () => {
      db.tx.push({ id: uid(), type: "saving", amount: money(v * dir), note: (dir > 0 ? "\u0E2D\u0E2D\u0E21: " : "\u0E16\u0E2D\u0E19\u0E08\u0E32\u0E01: ") + g.name, date: (/* @__PURE__ */ new Date()).toISOString(), acc, goal: id });
      db.txSinceExport += 1;
      commit(dir > 0 ? "\u0E2D\u0E2D\u0E21\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E25\u0E49\u0E27" : "\u0E16\u0E2D\u0E19\u0E01\u0E25\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E41\u0E25\u0E49\u0E27");
    };
    if (dir > 0 && accBal(db, acc) + 1e-3 < v) ask("\u0E22\u0E2D\u0E14\u0E43\u0E19\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E44\u0E21\u0E48\u0E1E\u0E2D", `\u201C${accName(acc)}\u201D \u0E21\u0E35\u0E44\u0E21\u0E48\u0E1E\u0E2D\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E22\u0E2D\u0E14\u0E19\u0E35\u0E49 \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E15\u0E48\u0E2D\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48`, "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E15\u0E48\u0E2D").then((ok) => ok && go2());
    else go2();
  }
  function download(name, text, type) {
    const a = document.createElement("a");
    const u = URL.createObjectURL(new Blob([text], { type }));
    a.href = u;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(u), 1500);
  }
  function markExported() {
    db.lastExport = (/* @__PURE__ */ new Date()).toISOString();
    db.txSinceExport = 0;
    save();
  }
  function exportJSON() {
    download("mono-backup-" + dayKey(/* @__PURE__ */ new Date()) + ".json", JSON.stringify(db, null, 2), "application/json");
    markExported();
    toast("\u0E14\u0E32\u0E27\u0E19\u0E4C\u0E42\u0E2B\u0E25\u0E14\u0E44\u0E1F\u0E25\u0E4C\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E41\u0E25\u0E49\u0E27");
    renderAll();
  }
  function exportCSV() {
    const list = view === "transactions" ? filteredTx() : db.tx;
    const safe = (s) => /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
    const head = ["\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17", "\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48", "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14", "\u0E1A\u0E31\u0E0D\u0E0A\u0E35", "\u0E44\u0E1B\u0E22\u0E31\u0E07\u0E1A\u0E31\u0E0D\u0E0A\u0E35", "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E07\u0E34\u0E19"];
    const types = { income: "\u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A", expense: "\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22", transfer: "\u0E42\u0E2D\u0E19", saving: "\u0E2D\u0E2D\u0E21" };
    const rows = [head].concat(list.map((t) => [
      new Date(t.date).toLocaleString("th-TH"),
      types[t.type] || t.type,
      catOf(db, t).n,
      safe(t.note || ""),
      accName(t.acc),
      t.to ? accName(t.to) : "",
      t.type === "income" ? t.amount : t.type === "saving" ? t.amount : -Math.abs(t.amount)
    ]));
    const csv = "\uFEFF" + rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    download("mono-transactions-" + dayKey(/* @__PURE__ */ new Date()) + ".csv", csv, "text/csv");
    toast("\u0E2A\u0E48\u0E07\u0E2D\u0E2D\u0E01 CSV \u0E41\u0E25\u0E49\u0E27");
  }
  async function shareBackup() {
    const text = JSON.stringify(db, null, 2);
    const name = "mono-backup-" + dayKey(/* @__PURE__ */ new Date()) + ".json";
    const file = new File([text], name, { type: "application/json" });
    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) await navigator.share({ files: [file], title: "\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 MONO" });
      else if (navigator.share) await navigator.share({ title: "\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 MONO", text });
      else {
        exportJSON();
        return;
      }
      markExported();
      toast("\u0E41\u0E0A\u0E23\u0E4C\u0E44\u0E1F\u0E25\u0E4C\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E41\u0E25\u0E49\u0E27");
      renderAll();
    } catch (e) {
      if (e && e.name === "AbortError") return;
      exportJSON();
    }
  }
  async function copySummary() {
    const k = curMonth;
    const text = [`MONO ${monthLong(k)}`, `\u0E23\u0E32\u0E22\u0E23\u0E31\u0E1A ${baht(monthSum(db, "income", k), 0)}`, `\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22 ${baht(monthSum(db, "expense", k), 0)}`, `\u0E2A\u0E38\u0E17\u0E18\u0E34 ${baht(monthSum(db, "income", k) - monthSum(db, "expense", k), 0)}`].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      toast("\u0E04\u0E31\u0E14\u0E25\u0E2D\u0E01\u0E2A\u0E23\u0E38\u0E1B\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E41\u0E25\u0E49\u0E27");
    } catch {
      download("mono-summary-" + k + ".txt", text, "text/plain");
      toast("\u0E14\u0E32\u0E27\u0E19\u0E4C\u0E42\u0E2B\u0E25\u0E14\u0E2A\u0E23\u0E38\u0E1B\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E41\u0E25\u0E49\u0E27");
    }
  }
  function importData(file) {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        let data = JSON.parse(String(reader.result));
        if (Array.isArray(data?.goals) && data.goals.some((g) => Array.isArray(g?.history))) data = migrateV1(data);
        else data = sanitize(data);
        if (!await ask("\u0E19\u0E33\u0E40\u0E02\u0E49\u0E32\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", `\u0E1E\u0E1A ${data.tx.length} \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E43\u0E19\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E19\u0E35\u0E49\u0E08\u0E30\u0E16\u0E39\u0E01\u0E41\u0E17\u0E19\u0E17\u0E35\u0E48`, "\u0E19\u0E33\u0E40\u0E02\u0E49\u0E32")) return;
        db = data;
        runRecurring(db, /* @__PURE__ */ new Date());
        curMonth = monthKey(/* @__PURE__ */ new Date());
        applyTheme();
        commit("\u0E19\u0E33\u0E40\u0E02\u0E49\u0E32\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E41\u0E25\u0E49\u0E27");
      } catch {
        toast("\u0E44\u0E1F\u0E25\u0E4C\u0E19\u0E35\u0E49\u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 MONO");
      }
    };
    reader.onerror = () => toast("\u0E2D\u0E48\u0E32\u0E19\u0E44\u0E1F\u0E25\u0E4C\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08");
    reader.readAsText(file);
  }
  function openMenu() {
    $("#sidebar").classList.add("open");
    $("#scrim").classList.add("show");
    $("#menu-btn").setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    $("#sidebar").classList.remove("open");
    $("#scrim").classList.remove("show");
    $("#menu-btn").setAttribute("aria-expanded", "false");
  }
  var ACT = {
    add: (_id, b) => openModal(b?.dataset.type || "expense", { cat: b?.dataset.cat, forceTransfer: false }),
    "close-tx": () => $("#dlg-tx").close(),
    "close-edit": () => $("#dlg-edit").close(),
    "close-install": () => $("#dlg-install").close(),
    "hide-demo": () => {
      db.demo = false;
      commit("\u0E0B\u0E48\u0E2D\u0E19\u0E41\u0E1A\u0E19\u0E40\u0E19\u0E2D\u0E23\u0E4C\u0E41\u0E25\u0E49\u0E27");
    },
    "start-mine": async () => {
      if (!await ask("\u0E40\u0E23\u0E34\u0E48\u0E21\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E02\u0E2D\u0E07\u0E09\u0E31\u0E19", "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E08\u0E30\u0E16\u0E39\u0E01\u0E25\u0E1A \u0E41\u0E25\u0E30\u0E2A\u0E21\u0E38\u0E14\u0E08\u0E30\u0E27\u0E48\u0E32\u0E07\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E43\u0E2B\u0E49\u0E43\u0E2A\u0E48\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13", "\u0E40\u0E23\u0E34\u0E48\u0E21\u0E2A\u0E21\u0E38\u0E14\u0E27\u0E48\u0E32\u0E07", true)) return;
      const keep = { profile: { name: "", photo: "" }, theme: db.theme, pattern: db.pattern, privacy: db.privacy };
      db = emptyBook();
      db.theme = keep.theme;
      db.pattern = keep.pattern;
      db.privacy = keep.privacy;
      curMonth = monthKey(/* @__PURE__ */ new Date());
      commit("\u0E40\u0E23\u0E34\u0E48\u0E21\u0E2A\u0E21\u0E38\u0E14\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13\u0E41\u0E25\u0E49\u0E27");
    },
    "suggest-budget": async () => {
      if (!await ask("\u0E43\u0E2A\u0E48\u0E27\u0E07\u0E40\u0E07\u0E34\u0E19\u0E41\u0E19\u0E30\u0E19\u0E33", "\u0E2D\u0E32\u0E2B\u0E32\u0E23 8,000 \xB7 \u0E40\u0E14\u0E34\u0E19\u0E17\u0E32\u0E07 5,000 \xB7 \u0E0A\u0E49\u0E2D\u0E1B\u0E1B\u0E34\u0E49\u0E07 6,000 \xB7 \u0E17\u0E35\u0E48\u0E1E\u0E31\u0E01 8,000 \xB7 \u0E1A\u0E34\u0E25 2,000 \xB7 \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E 1,500 \xB7 \u0E1A\u0E31\u0E19\u0E40\u0E17\u0E34\u0E07 2,500 \xB7 \u0E2D\u0E37\u0E48\u0E19 \u0E46 2,000\n\u0E2B\u0E21\u0E27\u0E14\u0E17\u0E35\u0E48\u0E04\u0E38\u0E13\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19", "\u0E43\u0E2A\u0E48\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02")) return;
      const old = { ...db.budgets };
      Object.assign(db.budgets, DEF_BUD);
      commit("\u0E43\u0E2A\u0E48\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E41\u0E19\u0E30\u0E19\u0E33\u0E41\u0E25\u0E49\u0E27", () => {
        db.budgets = old;
        commit("\u0E04\u0E37\u0E19\u0E27\u0E07\u0E40\u0E07\u0E34\u0E19\u0E40\u0E14\u0E34\u0E21\u0E41\u0E25\u0E49\u0E27");
      });
    },
    "auto-budget": async () => {
      const nowK = monthKey(/* @__PURE__ */ new Date());
      const ms = [1, 2, 3].map((i) => shiftKey(nowK, -i)).filter((m) => monthSum(db, "expense", m) > 0);
      if (!ms.length) return toast("\u0E22\u0E31\u0E07\u0E21\u0E35\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07\u0E44\u0E21\u0E48\u0E1E\u0E2D");
      const next = {};
      for (const c of budgetIds(db)) {
        const avg = ms.reduce((s, m) => s + monthSum(db, "expense", m, c), 0) / ms.length;
        if (avg > 0) next[c] = Math.max(100, Math.round(avg / 100) * 100);
      }
      if (!Object.keys(next).length) return toast("\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E2B\u0E21\u0E27\u0E14\u0E17\u0E35\u0E48\u0E21\u0E35\u0E23\u0E32\u0E22\u0E08\u0E48\u0E32\u0E22\u0E1E\u0E2D\u0E43\u0E2B\u0E49\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22");
      if (!await ask("\u0E15\u0E31\u0E49\u0E07\u0E08\u0E32\u0E01\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22", `\u0E43\u0E0A\u0E49\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${ms.length} \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14 \u0E40\u0E09\u0E1E\u0E32\u0E30\u0E2B\u0E21\u0E27\u0E14\u0E17\u0E35\u0E48\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23`, "\u0E15\u0E31\u0E49\u0E07\u0E27\u0E07\u0E40\u0E07\u0E34\u0E19")) return;
      const old = { ...db.budgets };
      Object.assign(db.budgets, next);
      commit("\u0E15\u0E31\u0E49\u0E07\u0E27\u0E07\u0E40\u0E07\u0E34\u0E19\u0E08\u0E32\u0E01\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E41\u0E25\u0E49\u0E27", () => {
        db.budgets = old;
        commit("\u0E04\u0E37\u0E19\u0E27\u0E07\u0E40\u0E07\u0E34\u0E19\u0E40\u0E14\u0E34\u0E21\u0E41\u0E25\u0E49\u0E27");
      });
    },
    "edit-tx": (id) => {
      const t = db.tx.find((x) => x.id === id);
      if (!t) return;
      if (t.type === "saving") openEdit("saving", id);
      else openModal(t.type === "transfer" ? "transfer" : t.type, t, id);
    },
    "dup-tx": (id) => {
      const t = db.tx.find((x) => x.id === id);
      if (!t) return;
      const copy = { ...t, id: uid(), date: (/* @__PURE__ */ new Date()).toISOString() };
      delete copy.rec;
      db.tx.push(copy);
      db.txSinceExport += 1;
      commit("\u0E17\u0E33\u0E0B\u0E49\u0E33\u0E40\u0E1B\u0E47\u0E19\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E07\u0E15\u0E2D\u0E19\u0E19\u0E35\u0E49\u0E41\u0E25\u0E49\u0E27");
    },
    "del-tx": (id) => {
      const i = db.tx.findIndex((t2) => t2.id === id);
      if (i < 0) return;
      const [t] = db.tx.splice(i, 1);
      commit("\u0E25\u0E1A\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E25\u0E49\u0E27", () => {
        db.tx.push(t);
        commit("\u0E19\u0E33\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E01\u0E25\u0E31\u0E1A\u0E41\u0E25\u0E49\u0E27");
      });
    },
    transfer: (id) => openModal("transfer", { acc: id, forceTransfer: true }),
    day: (id) => {
      selDay = id;
      renderCalendar();
    },
    "goal-add": (id, b) => goalMove(id, 1, b),
    "goal-sub": (id, b) => goalMove(id, -1, b),
    "edit-goal": (id) => openEdit("goal", id),
    "edit-acc": (id) => openEdit("acc", id),
    "edit-debt": (id) => openEdit("debt", id),
    "edit-rec": (id) => openEdit("rec", id),
    "del-goal": async (id) => {
      const g = db.goals.find((x) => x.id === id);
      if (!g) return;
      const s = goalSaved(db, g);
      if (!await ask("\u0E25\u0E1A\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22", `\u0E25\u0E1A \u201C${g.name}\u201D?` + (s > 0 ? `
\u0E40\u0E07\u0E34\u0E19\u0E17\u0E35\u0E48\u0E2D\u0E2D\u0E21\u0E44\u0E27\u0E49 ${baht(s, 0)} \u0E08\u0E30\u0E16\u0E39\u0E01\u0E04\u0E37\u0E19\u0E40\u0E02\u0E49\u0E32 ${db.accounts[0]?.name || "\u0E1A\u0E31\u0E0D\u0E0A\u0E35"}` : ""), "\u0E25\u0E1A", true)) return;
      if (s && db.accounts[0]) {
        db.tx.push({ id: uid(), type: "saving", amount: -s, note: "\u0E04\u0E37\u0E19\u0E40\u0E07\u0E34\u0E19\u0E08\u0E32\u0E01\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22: " + g.name, date: (/* @__PURE__ */ new Date()).toISOString(), acc: db.accounts[0].id, goal: id });
        db.txSinceExport += 1;
      }
      db.goals = db.goals.filter((x) => x.id !== id);
      commit("\u0E25\u0E1A\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E41\u0E25\u0E49\u0E27");
    },
    "pay-debt": (id, b) => {
      const d = db.debts.find((x) => x.id === id);
      const box = b.closest("[data-card]");
      const left = d.total - debtPaid(db, d);
      let v = money(box.querySelector("[data-f=amt]").value);
      if (!(v > 0)) return toast("\u0E43\u0E2A\u0E48\u0E22\u0E2D\u0E14\u0E0A\u0E33\u0E23\u0E30");
      v = Math.min(v, left);
      db.tx.push({ id: uid(), type: "expense", cat: "debt", amount: v, note: "\u0E0A\u0E33\u0E23\u0E30: " + d.name, date: (/* @__PURE__ */ new Date()).toISOString(), acc: box.querySelector("[data-f=acc]").value, debt: id });
      db.txSinceExport += 1;
      commit("\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E0A\u0E33\u0E23\u0E30 " + baht(v, 0) + " \u0E41\u0E25\u0E49\u0E27");
    },
    "del-debt": async (id) => {
      if (!await ask("\u0E25\u0E1A\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E2B\u0E19\u0E35\u0E49", "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E17\u0E35\u0E48\u0E08\u0E48\u0E32\u0E22\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27\u0E22\u0E31\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E18\u0E38\u0E23\u0E01\u0E23\u0E23\u0E21", "\u0E25\u0E1A", true)) return;
      db.debts = db.debts.filter((d) => d.id !== id);
      commit("\u0E25\u0E1A\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E2B\u0E19\u0E35\u0E49\u0E41\u0E25\u0E49\u0E27");
    },
    "del-acc": async (id) => {
      if (db.accounts.length <= 1) return toast("\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E2B\u0E25\u0E37\u0E2D\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 1 \u0E1A\u0E31\u0E0D\u0E0A\u0E35");
      if (db.tx.some((t) => t.acc === id || t.to === id) || (db.recurring || []).some((r) => r.acc === id)) return toast("\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E19\u0E35\u0E49\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E2D\u0E22\u0E39\u0E48 \u0E22\u0E49\u0E32\u0E22\u0E2B\u0E23\u0E37\u0E2D\u0E25\u0E1A\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E01\u0E48\u0E2D\u0E19");
      if (!await ask("\u0E25\u0E1A\u0E1A\u0E31\u0E0D\u0E0A\u0E35", "\u0E25\u0E1A\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", "\u0E25\u0E1A", true)) return;
      db.accounts = db.accounts.filter((a) => a.id !== id);
      commit("\u0E25\u0E1A\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E41\u0E25\u0E49\u0E27");
    },
    "del-rec": async (id) => {
      if (!await ask("\u0E2B\u0E22\u0E38\u0E14\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E08\u0E33", "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E44\u0E1B\u0E41\u0E25\u0E49\u0E27\u0E08\u0E30\u0E22\u0E31\u0E07\u0E2D\u0E22\u0E39\u0E48", "\u0E2B\u0E22\u0E38\u0E14", true)) return;
      db.recurring = db.recurring.filter((r) => r.id !== id);
      commit("\u0E2B\u0E22\u0E38\u0E14\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E41\u0E25\u0E49\u0E27");
    },
    "del-cat": (id) => {
      if (db.tx.some((t) => t.cat === id) || (db.recurring || []).some((r) => r.cat === id)) return toast("\u0E2B\u0E21\u0E27\u0E14\u0E19\u0E35\u0E49\u0E21\u0E35\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E2D\u0E22\u0E39\u0E48 \u0E08\u0E36\u0E07\u0E22\u0E31\u0E07\u0E25\u0E1A\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49");
      db.categories = db.categories.filter((c) => c.id !== id);
      delete db.budgets[id];
      commit("\u0E25\u0E1A\u0E2B\u0E21\u0E27\u0E14\u0E41\u0E25\u0E49\u0E27");
    },
    "dash-quick": (id) => {
      const q = (window.__dashQuick || [])[+id];
      if (q) openModal("expense", q);
    },
    "export-json": () => exportJSON(),
    "export-csv": () => exportCSV(),
    "share-backup": () => shareBackup(),
    "copy-summary": () => copySummary(),
    "photo-del": () => {
      db.profile.photo = "";
      commit("\u0E40\u0E2D\u0E32\u0E23\u0E39\u0E1B\u0E2D\u0E2D\u0E01\u0E41\u0E25\u0E49\u0E27");
    },
    "reset-demo": async () => {
      if (!await ask("\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07", "\u0E2A\u0E21\u0E38\u0E14\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E08\u0E30\u0E16\u0E39\u0E01\u0E41\u0E17\u0E19\u0E17\u0E35\u0E48\u0E14\u0E49\u0E27\u0E22\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E02\u0E2D\u0E07 \u201C\u0E21\u0E32\u0E22\u201D \u0E0B\u0E36\u0E48\u0E07\u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13", "\u0E41\u0E17\u0E19\u0E17\u0E35\u0E48\u0E14\u0E49\u0E27\u0E22\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07", true)) return;
      db = seed(/* @__PURE__ */ new Date());
      runRecurring(db, /* @__PURE__ */ new Date());
      curMonth = monthKey(/* @__PURE__ */ new Date());
      applyTheme();
      commit("\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E41\u0E25\u0E49\u0E27 \u0E41\u0E1A\u0E19\u0E40\u0E19\u0E2D\u0E23\u0E4C\u0E08\u0E30\u0E1A\u0E2D\u0E01\u0E44\u0E27\u0E49\u0E15\u0E25\u0E2D\u0E14");
    },
    "clear-all": async () => {
      if (!await ask("\u0E25\u0E49\u0E32\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14", "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 \u0E1A\u0E31\u0E0D\u0E0A\u0E35 \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 \u0E41\u0E25\u0E30\u0E2B\u0E19\u0E35\u0E49\u0E43\u0E19\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E19\u0E35\u0E49\u0E08\u0E30\u0E2B\u0E32\u0E22 \u0E01\u0E39\u0E49\u0E08\u0E32\u0E01\u0E41\u0E2D\u0E1B\u0E19\u0E35\u0E49\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 \u0E04\u0E27\u0E23\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E44\u0E1F\u0E25\u0E4C\u0E01\u0E48\u0E2D\u0E19", "\u0E25\u0E49\u0E32\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", true)) return;
      const theme = db.theme;
      const pattern = db.pattern;
      const privacy = db.privacy;
      db = emptyBook();
      db.theme = theme;
      db.pattern = pattern;
      db.privacy = privacy;
      curMonth = monthKey(/* @__PURE__ */ new Date());
      commit("\u0E25\u0E49\u0E32\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E41\u0E25\u0E49\u0E27");
    },
    install: () => openInstall()
  };
  function openInstall() {
    const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone;
    if (standalone) {
      toast("\u0E40\u0E1B\u0E34\u0E14\u0E40\u0E1B\u0E47\u0E19\u0E41\u0E2D\u0E1B\u0E2D\u0E22\u0E39\u0E48\u0E41\u0E25\u0E49\u0E27");
      return;
    }
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    $("#install-body").innerHTML = ios ? "<p>\u0E1A\u0E19 iPhone \u0E2B\u0E23\u0E37\u0E2D iPad \u0E43\u0E2B\u0E49\u0E43\u0E0A\u0E49 Safari \u0E41\u0E15\u0E30\u0E1B\u0E38\u0E48\u0E21\u0E41\u0E0A\u0E23\u0E4C \u0E41\u0E25\u0E49\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01 \u201C\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E44\u0E1B\u0E22\u0E31\u0E07\u0E2B\u0E19\u0E49\u0E32\u0E08\u0E2D\u0E42\u0E2E\u0E21\u201D \u0E41\u0E2D\u0E1B\u0E08\u0E30\u0E40\u0E1B\u0E34\u0E14\u0E41\u0E1A\u0E1A\u0E40\u0E15\u0E47\u0E21\u0E08\u0E2D\u0E41\u0E25\u0E30\u0E43\u0E0A\u0E49\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E43\u0E19\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E19\u0E35\u0E49\u0E15\u0E48\u0E2D\u0E44\u0E14\u0E49</p>" : "<p>\u0E16\u0E49\u0E32\u0E40\u0E1A\u0E23\u0E32\u0E27\u0E4C\u0E40\u0E0B\u0E2D\u0E23\u0E4C\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07 \u0E08\u0E30\u0E21\u0E35\u0E1B\u0E38\u0E48\u0E21\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07\u0E14\u0E49\u0E32\u0E19\u0E25\u0E48\u0E32\u0E07 \u0E1A\u0E19 Android Chrome \u0E16\u0E49\u0E32\u0E44\u0E21\u0E48\u0E02\u0E36\u0E49\u0E19 \u0E43\u0E2B\u0E49\u0E40\u0E1B\u0E34\u0E14\u0E40\u0E21\u0E19\u0E39 \u22EE \u0E41\u0E25\u0E49\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01 \u201C\u0E15\u0E34\u0E14\u0E15\u0E31\u0E49\u0E07\u0E41\u0E2D\u0E1B\u201D \u0E2B\u0E23\u0E37\u0E2D \u201C\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E44\u0E1B\u0E17\u0E35\u0E48\u0E2B\u0E19\u0E49\u0E32\u0E08\u0E2D\u0E2B\u0E25\u0E31\u0E01\u201D</p>";
    $("#install-go").hidden = !deferredPrompt;
    const d = $("#dlg-install");
    if (d.open) d.close();
    d.showModal();
  }
  function buildPicks() {
    $("#cat-colors").innerHTML = CAT_COLORS.map((c) => `<button type="button" data-color="${c}" aria-label="\u0E2A\u0E35 ${c}"><i class="swatch" style="background:${c}"></i></button>`).join("");
    const icons = ICON_IDS.filter((i) => !["swap", "repeat"].includes(i) && ICONS.has(i));
    $("#cat-icons").innerHTML = icons.map((i) => `<button type="button" data-icon="${i}" aria-label="\u0E44\u0E2D\u0E04\u0E2D\u0E19 ${i}">${ic(i)}</button>`).join("");
  }
  function boot() {
    buildPicks();
    const loaded = loadState(localStorage);
    db = loaded.db;
    const added = runRecurring(db, /* @__PURE__ */ new Date());
    if (added) db.txSinceExport += added;
    save();
    applyTheme();
    renderMonthSelect();
    show(route());
    document.documentElement.dataset.ready = "1";
    const setPh = () => {
      $("#q").placeholder = innerWidth <= 520 ? "\u0E04\u0E49\u0E19\u0E2B\u0E32" : "\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 \u0E2B\u0E21\u0E27\u0E14 \u0E2B\u0E23\u0E37\u0E2D\u0E1A\u0E31\u0E0D\u0E0A\u0E35";
    };
    setPh();
    addEventListener("resize", setPh);
    if ((loaded.source === "v2" || loaded.source === "v1") && added) toast(`\u0E19\u0E33\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E14\u0E34\u0E21\u0E40\u0E02\u0E49\u0E32\u0E21\u0E32\u0E41\u0E25\u0E49\u0E27 \u0E41\u0E25\u0E30\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E08\u0E33 ${added} \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 \u0E02\u0E2D\u0E07\u0E40\u0E01\u0E48\u0E32\u0E17\u0E35\u0E48\u0E04\u0E35\u0E22\u0E4C\u0E40\u0E14\u0E34\u0E21\u0E22\u0E31\u0E07\u0E2D\u0E22\u0E39\u0E48`);
    else if (loaded.source === "v2" || loaded.source === "v1") toast("\u0E19\u0E33\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E08\u0E32\u0E01\u0E41\u0E2D\u0E1B\u0E40\u0E14\u0E34\u0E21\u0E40\u0E02\u0E49\u0E32\u0E21\u0E32\u0E41\u0E25\u0E49\u0E27 \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E0A\u0E38\u0E14\u0E40\u0E01\u0E48\u0E32\u0E22\u0E31\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07");
    else if (added) toast(`\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34 ${added} \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23`);
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#/"]');
    if (a) {
      e.preventDefault();
      go(a.getAttribute("href").slice(2));
      return;
    }
    const b = e.target.closest("[data-act]");
    if (b && ACT[b.dataset.act]) ACT[b.dataset.act](b.dataset.id, b, e);
    if (!e.target.closest(".pop")) {
      $("#notif").hidden = true;
      $("#bell").setAttribute("aria-expanded", "false");
    }
  });
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset && t.dataset.budget) {
      const n = money(t.value);
      db.budgets[t.dataset.budget] = Math.max(0, Number.isFinite(n) ? n : 0);
      commit("\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E27\u0E07\u0E40\u0E07\u0E34\u0E19\u0E41\u0E25\u0E49\u0E27");
    }
  });
  $("#m-prev").addEventListener("click", () => stepMonth(1));
  $("#m-next").addEventListener("click", () => stepMonth(-1));
  function stepMonth(dir) {
    const opts = [...$("#month").options].map((o) => o.value);
    const n = opts[opts.indexOf(curMonth) + dir];
    if (!n) return;
    curMonth = n;
    selDay = null;
    renderMonthSelect();
    renderAll();
  }
  $("#month").addEventListener("change", (e) => {
    curMonth = e.target.value;
    selDay = null;
    renderMonthSelect();
    renderAll();
  });
  $("#range").addEventListener("change", () => {
    if (view === "dashboard") renderFlow();
  });
  $("#q").addEventListener("input", () => {
    if ($("#q").value.trim() && view !== "transactions") go("transactions");
    else if (view === "transactions") renderTx();
  });
  ["#f-type", "#f-cat", "#f-acc", "#f-sort", "#f-all"].forEach((s) => $(s).addEventListener("change", () => {
    if (view === "transactions") renderTx();
  }));
  $("#bell").addEventListener("click", (e) => {
    e.stopPropagation();
    const n = $("#notif");
    n.hidden = !n.hidden;
    $("#bell").setAttribute("aria-expanded", String(!n.hidden));
  });
  $("#theme-btn").addEventListener("click", () => setTheme(effDark() ? "light" : "dark"));
  $("#privacy-btn").addEventListener("click", () => {
    db.privacy = !db.privacy;
    save();
    applyTheme();
    renderAll();
  });
  $("#privacy-toggle").addEventListener("change", (e) => {
    db.privacy = e.target.checked;
    save();
    applyTheme();
    renderAll();
  });
  $$("#theme-seg button").forEach((b) => b.addEventListener("click", () => setTheme(b.dataset.th)));
  $$("#pat-seg button").forEach((b) => b.addEventListener("click", () => {
    db.pattern = b.dataset.pat;
    save();
    applyTheme();
    renderAll();
  }));
  $("#menu-btn").addEventListener("click", openMenu);
  $("#tab-more").addEventListener("click", openMenu);
  $("#scrim").addEventListener("click", closeMenu);
  $("#content").addEventListener("scroll", () => $(".topbar").classList.toggle("scrolled", $("#content").scrollTop > 4), { passive: true });
  $("#profile-name").addEventListener("input", (e) => {
    db.profile.name = e.target.value.slice(0, 30);
    save();
    const n = db.profile.name.trim();
    $("#side-name").textContent = n || "\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E02\u0E2D\u0E07\u0E09\u0E31\u0E19";
    if (!db.profile.photo) {
      const letter = esc(initialOf(n));
      $("#side-avatar").textContent = initialOf(n);
      $("#set-avatar").textContent = initialOf(n);
      void letter;
    }
  });
  $("#photo-file").addEventListener("change", async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    try {
      db.profile.photo = await compressPhoto(file);
      commit("\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E23\u0E39\u0E1B\u0E41\u0E25\u0E49\u0E27");
    } catch {
      toast("\u0E43\u0E0A\u0E49\u0E23\u0E39\u0E1B\u0E17\u0E35\u0E48\u0E40\u0E25\u0E47\u0E01\u0E01\u0E27\u0E48\u0E32\u0E19\u0E35\u0E49 \u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1B\u0E47\u0E19 jpg png webp");
    }
  });
  $("#import-file").addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (file) importData(file);
  });
  $("#acc-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#a-name").value.trim();
    if (!name) return;
    const initial = money($("#a-init").value || 0);
    db.accounts.push({ id: uid(), name: name.slice(0, 40), type: $("#a-type").value, initial: Number.isFinite(initial) ? initial : 0, reserve: 0 });
    e.target.reset();
    commit("\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E41\u0E25\u0E49\u0E27");
  });
  $("#goal-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const img = $("#g-img").value.trim();
    if (img && !/^https?:\/\//i.test(img)) return toast("\u0E25\u0E34\u0E07\u0E01\u0E4C\u0E23\u0E39\u0E1B\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E36\u0E49\u0E19\u0E15\u0E49\u0E19\u0E14\u0E49\u0E27\u0E22 http:// \u0E2B\u0E23\u0E37\u0E2D https://");
    const target = money($("#g-target").value);
    if (!(target > 0)) return toast("\u0E22\u0E2D\u0E14\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 0");
    db.goals.push({ id: uid(), name: $("#g-name").value.trim().slice(0, 40), target, deadline: $("#g-date").value, img, icon: "target" });
    e.target.reset();
    commit("\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E41\u0E25\u0E49\u0E27");
  });
  $("#debt-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const total = money($("#d-total").value);
    const paid = money($("#d-paid").value || 0) || 0;
    if (!(total > 0)) return toast("\u0E22\u0E2D\u0E14\u0E2B\u0E19\u0E35\u0E49\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 0");
    if (paid < 0 || paid > total) return toast("\u0E22\u0E2D\u0E14\u0E17\u0E35\u0E48\u0E08\u0E48\u0E32\u0E22\u0E41\u0E25\u0E49\u0E27\u0E15\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19\u0E22\u0E2D\u0E14\u0E2B\u0E19\u0E35\u0E49");
    db.debts.push({ id: uid(), name: $("#d-name").value.trim().slice(0, 40), total, paidInit: paid });
    e.target.reset();
    commit("\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E2B\u0E19\u0E35\u0E49\u0E41\u0E25\u0E49\u0E27");
  });
  $("#cat-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#cat-name").value.trim();
    if (!name) return;
    const id = "c" + uid();
    const type = $("#cat-type").value === "income" ? "income" : "expense";
    db.categories.push({ id, name: name.slice(0, 40), icon: pickIcon, color: pickColor, type });
    if (type === "expense") db.budgets[id] = 0;
    e.target.reset();
    commit("\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E2B\u0E21\u0E27\u0E14\u0E41\u0E25\u0E49\u0E27");
  });
  $("#cat-colors").addEventListener("click", (e) => {
    const b = e.target.closest("[data-color]");
    if (!b) return;
    pickColor = b.dataset.color;
    $$("#cat-colors button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  });
  $("#cat-icons").addEventListener("click", (e) => {
    const b = e.target.closest("[data-icon]");
    if (!b) return;
    pickIcon = b.dataset.icon;
    $$("#cat-icons button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  });
  $("#install-go").addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    try {
      await deferredPrompt.userChoice;
    } catch {
    }
    deferredPrompt = null;
    $("#dlg-install").close();
  });
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
  ["#dlg-tx", "#dlg-edit", "#dlg-install"].forEach((sel) => {
    const d = $(sel);
    d.addEventListener("click", (e) => {
      if (e.target === d) d.close();
    });
    d.addEventListener("cancel", (e) => {
      e.preventDefault();
      d.close();
    });
  });
  $("#dlg-confirm").addEventListener("click", (e) => {
    if (e.target.id === "dlg-confirm") e.target.close("cancel");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
      $("#notif").hidden = true;
      return;
    }
    if (e.target.closest("input, select, textarea") || e.metaKey || e.ctrlKey || e.altKey || $("dialog[open]")) return;
    if (e.key === "/") {
      e.preventDefault();
      $("#q").focus();
    }
    if (e.key === "n" || e.key === "N" || e.key === "\u0E14") {
      e.preventDefault();
      openModal();
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible" || !db) return;
    const n = runRecurring(db, /* @__PURE__ */ new Date());
    if (n) {
      db.txSinceExport += n;
      commit(`\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E08\u0E33 ${n} \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23`);
    }
  });
  window.addEventListener("hashchange", () => show(route()));
  async function compressPhoto(file) {
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) throw new Error("type");
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 256 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    let q = 0.82;
    let url = canvas.toDataURL("image/jpeg", q);
    while (url.length > 28e4 && q > 0.45) {
      q -= 0.1;
      url = canvas.toDataURL("image/jpeg", q);
    }
    if (url.length >= 3e5) throw new Error("big");
    return url;
  }
  if (document.body.dataset.pwa === "1" && "serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register(new URL("sw.js", location.href)).catch(() => {
    });
  }
  boot();
})();
