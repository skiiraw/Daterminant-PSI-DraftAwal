/* Daterminant — prototipe UI (vanilla JS, hash router). */
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const back = (title, to = "#/home") => `<div class="top"><a href="${to}" aria-label="Kembali">←</a><span>${esc(title)}</span></div>`;
const stars = (n = 5) => `<span class="stars">${"★".repeat(n)}</span>`;
const money = (n) => (n < 0 ? "-" : "") + "$" + Math.abs(n).toFixed(2);

// Grafik area SVG sederhana tanpa library
function areaChart(values, color = "#f5a03c") {
  const max = Math.max(...values), min = Math.min(...values), w = 300, h = 120;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * w, h - ((v - min) / (max - min || 1)) * (h - 10) - 5]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="Grafik tren">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".35"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
    <path d="${line} L${w},${h} L0,${h} Z" fill="url(#g)"/><path d="${line}" fill="none" stroke="${color}" stroke-width="2"/></svg>`;
}
const item = (i, right) => `<div class="card row"><div class="row"><div class="icon">${i.icon}</div><div><b>${esc(i.name)}</b><div class="muted">${esc(i.time)}</div></div></div>${right}</div>`;
const feedback = () => DATA.feedback.map((f) => `<div class="card row"><div><b>${esc(f.name)}</b><div class="muted">${esc(f.text)}</div></div><span>${f.score}/5</span></div>`).join("");
const period = `<p class="muted">📅 ${DATA.period}</p>`;

// Setiap layar: { cls, nav (tab bar), render }
const screens = {
  splash: { cls: "cream", render: () => `<div class="center mt"><h1>Daterminant</h1><p class="muted">Empowering Sustainable Growth</p><p style="font-size:120px;margin:70px 0">📈</p></div><a class="btn" href="#/login">GET STARTED</a>` },
  login: { cls: "dark", render: () => `<div class="top"><a href="#/splash">✕</a></div><h1 class="mt">Login</h1><p class="muted" style="margin-bottom:28px">Securely login to your account</p>
    <form id="login"><input type="email" placeholder="Email" required /><input type="password" placeholder="Password" required />
    <label><input type="checkbox" style="width:auto;margin-right:8px" />Remember me</label><button class="btn light mt">LOG IN</button></form>
    <p class="center mt"><a href="#/login" style="color:#fff">Lupa password</a></p><p class="center muted mt">- OR Continue with -</p>
    <div class="row mt" style="justify-content:center"><button class="btn light" style="width:auto;padding:12px 22px">Google</button><button class="btn light" style="width:auto;padding:12px 22px">Facebook</button></div>
    <p class="center mt">Create An Account <a href="#/profile" style="color:#fff"><b>Sign Up</b></a></p>`,
    after: () => $("#login").addEventListener("submit", (e) => { e.preventDefault(); location.hash = "#/home"; }) },
  profile: { render: () => { const u = DATA.user; return back("User profile") + `<div class="center" style="font-size:70px">🧑‍🦱</div>
    <label>First Name</label><input value="${esc(u.first)}" /><label>Last Name</label><input value="${esc(u.last)}" />
    <label>Email Address</label><input type="email" value="${esc(u.email)}" /><label>Sector</label><input value="${esc(u.sector)}" />
    <label>Gender</label><div class="row" style="justify-content:flex-start;gap:20px;margin-bottom:20px">${["Male", "Female", "Other"].map((g) => `<label><input type="radio" name="g" style="width:auto;margin-right:6px" ${g === u.gender ? "checked" : ""}/>${g}</label>`).join("")}</div>
    <a class="btn" href="#/business">Update</a>`; } },
  business: { render: () => back("Business profile form", "#/profile") + `<label>Business Location and License (NIIB)</label><input placeholder="Business Capital" /><input placeholder="Annual Turnover" />
    <label>Business Capital and Annual Turnover:</label><input placeholder="Business Capital" /><input placeholder="Annual Turnover" /><input placeholder="Business Scale" />
    <label>Integration link:</label><input placeholder="Marketplaces" /><input placeholder="Payment Gateways" /><input placeholder="Social Media" /><a class="btn" href="#/home">Update</a>` },
  home: { nav: true, render: () => `<div class="row"><div><b style="font-size:20px">Hello, User!</b><div class="muted">200 xp</div></div><span style="font-size:24px">🔔</span></div>
    <input placeholder="🔍 Search" style="margin-top:14px" /><div class="balance">${DATA.balance}</div>
    <div class="row"><div class="card row" style="flex:1">🛍️ <b>2</b> <span class="muted">New Orders</span></div><div class="card row" style="flex:1">👥 <b>2</b> <span class="muted">Viewed your profile</span></div></div>
    <div class="row"><h2>News</h2><span class="muted">Lihat Semua</span></div><div class="card"><b>${esc(DATA.news.title)}</b><p class="muted">${esc(DATA.news.body)}</p></div>
    <div class="grid mt">${[["alert", "🫧", "Business Intelligence"], ["market", "🏪", "Market Insight"], ["customize", "👤", "Customize Improvement"], ["investment", "📊", "Investment"], ["training", "🎓", "Data Driven Business Training"], ["brainbox", "🧠", "BrainBox AI"]]
      .map(([r, i, t]) => `<a class="tile" href="#/${r}"><span>${i}</span>${t}</a>`).join("")}</div>` },
  alert: { nav: true, render: () => back("Automated Alert System") + `<h2>Growth Opportunities:</h2>${period}
    <div class="row mt"><div class="card stat">↙ Income<b>$ 5,000</b></div><div class="card stat" style="color:var(--orange)">↗ Expense<b>$ 1000</b></div></div>
    <div class="card"><b>Expenses Trends</b>${areaChart(DATA.trend)}</div><h2>Hot products</h2>${item(DATA.stock[0], '<b class="val">↗ $5.84</b>')}
    <a class="btn mt" href="#/bi">Lihat Business Intelligence</a>` },
  bi: { nav: true, render: () => back("Business Intelligence", "#/alert") + `<h2>Business Insight · Sales performance:</h2>${period}
    <div class="row mt"><div class="card stat" style="background:var(--navy);color:#fff">Loses<b>$200</b></div><div class="card stat" style="background:#f0c080">Gain<b>$60</b></div></div>
    <h2>Stock Management</h2>${DATA.stock.map((s) => item(s, `<b class="val">${s.qty}</b>`)).join("")}<div class="card"><b>Sales Forecast</b>${areaChart(DATA.trend)}</div>` },
  market: { nav: true, render: () => back("Market Insight") + period + ["Industrial Trend", "Consumer Trend"].map((t) => `<h2>${t}</h2>` + DATA.trends.map((x) => item(x, `<b class="${x.delta < 0 ? "neg" : "pos"}">${money(x.delta)}</b>`)).join("")).join("")
    + `<h2>Price Trend and Marketing</h2><div class="row">${DATA.prices.map((p) => `<div class="card" style="flex:1"><span class="muted">From</span><br><b>${esc(p.from)}</b><p style="color:#55b9d0;font-weight:600">+ $${p.value}</p></div>`).join("")}</div>` },
  customize: { nav: true, render: () => back("Customize Improvement") + period + `<div class="card mt"><b>Feedback Analysis</b>${areaChart(DATA.trend)}</div><h2>Consumer Feedback</h2>${feedback()}
    <h2>Market Insight</h2><div class="card"><b style="color:#55b9d0">$62.54</b><p class="muted">Price drop in home goods. Home essentials are 12% cheaper due to online competition.</p></div>` },
  investment: { nav: true, render: () => back("Investment and Funding Matchmaking") + `<div class="card"><b>Investment</b>${areaChart(DATA.trend)}</div>`
    + ["Recommended", "Funding"].map((t) => `<h2>${t}</h2>` + DATA.matches.map((m) => `<a href="#/store" style="text-decoration:none;color:inherit" class="card row"><span><b>${esc(m.name)}</b><div class="muted">${esc(m.type)}</div></span><b class="pos">Support</b></a>`).join("")).join("") },
  store: { nav: true, render: () => back("Roti Nenek", "#/investment") + `<div class="card center" style="font-size:60px">🎂🍰🧁</div>${stars()}<input placeholder="Descriptions" style="margin-top:10px" />
    <div class="row"><h2>Catalogs</h2><button class="btn" style="width:auto;padding:10px 20px">Add to Cart</button></div>
    ${DATA.products.map((p) => `<div class="card"><b>${esc(p.title)}</b><p class="muted">${esc(p.desc)}</p><div class="row"><div><b>${p.price} USD</b><div class="muted">${p.old}</div></div><button class="btn green">Buy now</button></div></div>`).join("")}` },
  training: { nav: true, render: () => back("Data Driven Business Training") + `<h2>Recommendations</h2>` + [1, 2, 3].map(() => `<a href="#/course" style="text-decoration:none;color:inherit" class="card"><div style="font-size:50px">🍰</div><p>${esc(DATA.course.title)}</p>${stars()}</a>`).join("") },
  course: { nav: true, render: () => { const c = DATA.course; return back(c.title, "#/training") + `<div class="card"><div class="row"><p class="muted">Learn how to start, manage, and grow your small business with practical tools and proven strategies.</p><button class="btn green">Join Now</button></div></div>
    <div class="card row"><b style="font-size:24px">${c.price}</b><span class="muted">Original Price ${c.old}<br>Discount ${c.discount}</span></div>
    <div class="row" style="align-items:flex-start"><div class="card" style="flex:1.4"><b>This course includes:</b><ul style="padding-left:18px;font-size:13px">${c.includes.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>
    <div class="card" style="flex:1"><b>Best For</b><ul style="padding-left:18px;font-size:13px">${c.bestFor.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div></div><h2>Consumer Feedback</h2>${feedback()}`; } },
  brainbox: { nav: true, render: () => back("BrainBox") + `<div class="center"><h1>BrainBox</h1><p class="muted">Remembers what user said earlier · Allows follow-up corrections with AI</p></div>
    <div class="chat mt" id="chat"><div class="msg bot">Halo! Ceritakan bisnismu, lalu aku bantu analisis.</div></div>
    <form class="chatbar" id="chatform"><input id="q" placeholder="Send a message." autocomplete="off" /><button class="btn">➤</button></form>`,
    after: () => $("#chatform").addEventListener("submit", (e) => {
      e.preventDefault(); const q = $("#q"); if (!q.value.trim()) return;
      const add = (c, t) => { const d = document.createElement("div"); d.className = "msg " + c; d.textContent = t; $("#chat").append(d); };
      add("user", q.value); q.value = "";
      // TODO: hubungkan ke endpoint AI (mis. POST /api/brainbox)
      setTimeout(() => add("bot", "Fitur AI belum terhubung. Ini placeholder respons BrainBox."), 500);
    }) },
};

function route() {
  const name = location.hash.replace("#/", "") || "splash";
  const s = screens[name] || screens.splash, el = $("#screen");
  el.className = "screen " + (s.cls || "");
  el.innerHTML = s.render(); el.scrollTop = 0;
  $("#tabbar").hidden = !s.nav;
  s.after && s.after();
}
window.addEventListener("hashchange", route);
route();
