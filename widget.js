// The actual widget. Edit this file, push to GitHub, and the iPhone widget
// picks it up on next refresh — no need to touch Scriptable on the phone.

const GITHUB_USER = "thejaminator";

async function fetchLatestRepo(user) {
  const url = `https://api.github.com/users/${user}/repos?sort=pushed&per_page=1`;
  const req = new Request(url);
  req.headers = { Accept: "application/vnd.github+json" };
  const data = await req.loadJSON();
  return data && data[0] ? data[0] : null;
}

function formatRelative(iso) {
  const then = new Date(iso).getTime();
  const mins = Math.max(0, Math.round((Date.now() - then) / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

const widget = new ListWidget();
widget.backgroundColor = new Color("#0d1117");
widget.setPadding(14, 14, 14, 14);

const header = widget.addText(`@${GITHUB_USER}`);
header.font = Font.boldSystemFont(14);
header.textColor = new Color("#58a6ff");

widget.addSpacer(6);

try {
  const repo = await fetchLatestRepo(GITHUB_USER);
  if (repo) {
    const name = widget.addText(repo.name);
    name.font = Font.semiboldSystemFont(16);
    name.textColor = new Color("#e6edf3");

    widget.addSpacer(4);

    const meta = widget.addText(
      `★ ${repo.stargazers_count}  ·  ${formatRelative(repo.pushed_at)}`,
    );
    meta.font = Font.systemFont(11);
    meta.textColor = new Color("#8b949e");
  } else {
    const empty = widget.addText("No repos found");
    empty.textColor = new Color("#8b949e");
  }
} catch (err) {
  const errText = widget.addText(`Error: ${err.message}`);
  errText.font = Font.systemFont(10);
  errText.textColor = new Color("#f85149");
}

widget.addSpacer();

const footer = widget.addText(`Updated ${new Date().toLocaleTimeString()}`);
footer.font = Font.systemFont(9);
footer.textColor = new Color("#6e7681");

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  await widget.presentSmall();
}
Script.complete();
