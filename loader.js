// Scriptable loader — paste into a new script in the Scriptable iOS app once.
// On every refresh it fetches widget.js from this repo and runs it, so you
// can update the widget by pushing to GitHub instead of editing on phone.
//
// Cache-busting: GitHub's raw CDN caches ~5 min and ignores Cache-Control on
// requests. Appending a unique query string forces a fresh fetch every time.

const REMOTE_URL =
  "https://raw.githubusercontent.com/thejaminator/scriptable-github-widget/main/widget.js";

async function loadRemote(url) {
  const bust = `?_=${Date.now()}`;
  const req = new Request(url + bust);
  req.headers = {
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
  };
  return await req.loadString();
}

const source = await loadRemote(REMOTE_URL);
const run = new Function(
  "Script",
  "config",
  "args",
  "Request",
  "ListWidget",
  "Color",
  "Font",
  "LinearGradient",
  "Size",
  "DrawContext",
  `return (async () => { ${source} })();`,
);
await run(
  Script,
  config,
  args,
  Request,
  ListWidget,
  Color,
  Font,
  LinearGradient,
  Size,
  DrawContext,
);
