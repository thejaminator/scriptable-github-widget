// Scriptable loader — paste this into a new script in the Scriptable iOS app.
// It fetches widget.js from your GitHub repo on every refresh and runs it,
// so you can update the widget by pushing to GitHub instead of editing on phone.

const REMOTE_URL =
  "https://raw.githubusercontent.com/thejaminator/scriptable-github-widget/main/widget.js";

async function loadRemote(url) {
  const req = new Request(url);
  req.headers = { "Cache-Control": "no-cache" };
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
  `return (async () => { ${source} })();`,
);
await run(Script, config, args, Request, ListWidget, Color, Font);
