// Cute bouncy rabbit + fox widget, designed for the Medium (2×4) size.
//
// iOS widgets render once per system refresh (every ~5–15 min), so this isn't
// true animation — instead, each refresh picks a "frame" from a bounce cycle,
// and the rabbit + fox land in different positions every time you glance.
// Rabbit and fox are offset by half a cycle so when one's up, the other's down.

const FRAMES = [22, 14, 6, 0, 0, 6, 14, 22]; // top-spacer pts; smaller = higher
const tick = Math.floor(Date.now() / 1500) % FRAMES.length;
const rabbitOffset = FRAMES[tick];
const foxOffset = FRAMES[(tick + Math.floor(FRAMES.length / 2)) % FRAMES.length];

const SKY_TOP = new Color("#fde4f2");
const SKY_BOTTOM = new Color("#ffd6a5");
const GRASS = new Color("#a8e6a3");
const TEXT_DIM = new Color("#8a5a7a");

const widget = new ListWidget();
const gradient = new LinearGradient();
gradient.colors = [SKY_TOP, SKY_BOTTOM];
gradient.locations = [0, 1];
widget.backgroundGradient = gradient;
widget.setPadding(10, 14, 10, 14);

const title = widget.addText("bouncy friends ✨");
title.font = Font.semiboldRoundedSystemFont(13);
title.textColor = TEXT_DIM;
title.centerAlignText();

widget.addSpacer(4);

const scene = widget.addStack();
scene.layoutHorizontally();
scene.centerAlignContent();
scene.spacing = 24;
scene.addSpacer();

function addAnimal(parent, emoji, topOffset) {
  const col = parent.addStack();
  col.layoutVertically();
  col.centerAlignContent();
  col.addSpacer(topOffset);
  const face = col.addText(emoji);
  face.font = Font.systemFont(54);
  face.centerAlignText();
  col.addSpacer(22 - topOffset);
  return col;
}

addAnimal(scene, "🐰", rabbitOffset);
scene.addSpacer(8);
addAnimal(scene, "🦊", foxOffset);

scene.addSpacer();

// "ground" line
const ground = widget.addStack();
ground.layoutHorizontally();
ground.backgroundColor = GRASS;
ground.size = new Size(0, 4);
ground.cornerRadius = 2;
ground.addSpacer();

widget.addSpacer(2);

const stamp = widget.addText(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
stamp.font = Font.systemFont(9);
stamp.textColor = TEXT_DIM;
stamp.centerAlignText();

if (config.runsInWidget) {
  Script.setWidget(widget);
  // hint to iOS that we'd like a refresh sooner; iOS may ignore for battery
  widget.refreshAfterDate = new Date(Date.now() + 60 * 1000);
} else {
  await widget.presentMedium();
}
Script.complete();
