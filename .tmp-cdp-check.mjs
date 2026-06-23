const VER = await (await fetch("http://localhost:9222/json/version")).json();
const browserWs = new WebSocket(VER.webSocketDebuggerUrl);

let msgId = 1;
const pending = new Map();

function send(ws, method, params = {}, sessionId) {
  return new Promise((resolve) => {
    const id = msgId++;
    pending.set(id, resolve);
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    ws.send(JSON.stringify(payload));
  });
}

function wireResolver(ws) {
  ws.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  });
}

await new Promise((r) => (browserWs.onopen = r));
wireResolver(browserWs);

const { targetId } = await send(browserWs, "Target.createTarget", { url: "about:blank" });
const { sessionId } = await send(browserWs, "Target.attachToTarget", { targetId, flatten: true });

await send(browserWs, "Page.enable", {}, sessionId);
await send(browserWs, "Emulation.setDeviceMetricsOverride", {
  width: 1366,
  height: 1000,
  deviceScaleFactor: 1,
  mobile: false,
}, sessionId);

await send(browserWs, "Page.navigate", { url: "http://localhost:3000" }, sessionId);
await new Promise((r) => setTimeout(r, 3500));

// Dismiss the promo/announcement modal (its close button is the "✕" glyph button).
await send(browserWs, "Runtime.evaluate", {
  expression: `
    (function () {
      const closeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === "✕");
      if (closeBtn) { closeBtn.click(); return true; }
      return false;
    })()
  `,
  returnByValue: true,
}, sessionId);
await new Promise((r) => setTimeout(r, 500));

// Diagnose the desktop nav layout: list every top-level item's rect, plus the ul/nav container widths.
const diag = await send(browserWs, "Runtime.evaluate", {
  expression: `
    JSON.stringify((function () {
      const ul = document.querySelector("nav.hidden.xl\\\\:block ul");
      const lis = Array.from(ul.children);
      return {
        ulScrollWidth: ul.scrollWidth,
        ulClientWidth: ul.clientWidth,
        ulRect: ul.getBoundingClientRect(),
        items: lis.map(li => {
          const r = li.getBoundingClientRect();
          return { text: li.textContent.trim().slice(0, 20), left: r.left, right: r.right, width: r.width };
        }),
      };
    })())
  `,
  returnByValue: true,
}, sessionId);
console.log("DIAG:", diag.result.value);

// Find the "Login" nav button/link bounding box via JS in-page, then dispatch a real mouse move to it.
const evalResult = await send(browserWs, "Runtime.evaluate", {
  expression: `
    (function () {
      const items = Array.from(document.querySelectorAll("nav a, nav button"));
      const loginEl = items.find(el => el.textContent.trim() === "Login");
      if (!loginEl) return null;
      const r = loginEl.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    })()
  `,
  returnByValue: true,
}, sessionId);

const point = evalResult.result.value;
if (!point) {
  console.log("LOGIN_NOT_FOUND");
} else {
  await send(browserWs, "Input.dispatchMouseEvent", {
    type: "mouseMoved",
    x: point.x,
    y: point.y,
  }, sessionId);

  await new Promise((r) => setTimeout(r, 600));

  const shot = await send(browserWs, "Page.captureScreenshot", {
    format: "png",
    clip: { x: 0, y: 140, width: 400, height: 80, scale: 2 },
  }, sessionId);
  const fs = await import("fs");
  fs.writeFileSync("./.tmp-login-dropdown.png", Buffer.from(shot.data, "base64"));
  console.log("SCREENSHOT_SAVED");
}

process.exit(0);
