// Medium (2×4) widget: bunny + fox bouncing on the left, bubble tea on the right.
// iOS widgets are static snapshots — "animation" is a frame index that advances
// per refresh, so each refresh shows a different bounce position.

const FRAMES = [22, 14, 6, 0, 0, 6, 14, 22]; // top-spacer pts; smaller = higher
const tick = Math.floor(Date.now() / 1500) % FRAMES.length;
const rabbitOffset = FRAMES[tick];
const foxOffset = FRAMES[(tick + Math.floor(FRAMES.length / 2)) % FRAMES.length];

const SKY_TOP = new Color("#fde4f2");
const SKY_BOTTOM = new Color("#ffd6a5");
const TEXT_DIM = new Color("#8a5a7a");

const widget = new ListWidget();
const gradient = new LinearGradient();
gradient.colors = [SKY_TOP, SKY_BOTTOM];
gradient.locations = [0, 1];
widget.backgroundGradient = gradient;
widget.setPadding(10, 12, 10, 12);

const main = widget.addStack();
main.layoutHorizontally();
main.centerAlignContent();

// LEFT: bouncing animals
const left = main.addStack();
left.layoutHorizontally();
left.centerAlignContent();
left.spacing = 4;

function addAnimal(parent, emoji, topOffset, vehicle) {
  const col = parent.addStack();
  col.layoutVertically();
  col.centerAlignContent();
  col.addSpacer(topOffset);
  const face = col.addText(emoji);
  face.font = Font.systemFont(40);
  face.centerAlignText();
  if (vehicle) {
    const v = col.addText(vehicle);
    v.font = Font.systemFont(22);
    v.centerAlignText();
  } else {
    col.addSpacer(26);
  }
  col.addSpacer(22 - topOffset);
  return col;
}

addAnimal(left, "🐰", rabbitOffset, null);
addAnimal(left, "🦊", foxOffset, null);

main.addSpacer();

// RIGHT: bubble tea
const right = main.addStack();
right.layoutVertically();
right.centerAlignContent();

const heading = right.addText("1000 bubble tea a day");
heading.font = Font.boldRoundedSystemFont(13);
heading.textColor = TEXT_DIM;
heading.centerAlignText();
heading.minimumScaleFactor = 0.7;

right.addSpacer(4);

const teaRows = ["🧋🧋🧋🧋🧋", "🧋🧋🧋🧋🧋", "🧋🧋🧋🧋🧋"];
for (const row of teaRows) {
  const t = right.addText(row);
  t.font = Font.systemFont(16);
  t.centerAlignText();
  t.minimumScaleFactor = 0.5;
}

if (config.runsInWidget) {
  Script.setWidget(widget);
  widget.refreshAfterDate = new Date(Date.now() + 60 * 1000);
} else {
  await widget.presentMedium();
}
Script.complete();
