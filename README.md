# scriptable-github-widget

iPhone home-screen widget powered by [Scriptable](https://scriptable.app). The
widget on the phone is a 20-line **loader** that fetches `widget.js` from this
repo on every refresh and executes it. To change the widget, edit `widget.js`
and `git push` — no need to touch the phone.

## How it works

```
iPhone widget
   └── loader.js  (pasted into Scriptable, rarely changes)
         └── fetches https://raw.githubusercontent.com/.../widget.js
               └── runs it inside Scriptable's JS context
```

## Setup (one-time)

1. Install [Scriptable](https://apps.apple.com/app/scriptable/id1405459188) on
   your iPhone.
2. Push this repo to GitHub (instructions below).
3. In Scriptable, tap **+** to create a new script. Paste the contents of
   `loader.js`. Name it whatever you want.
4. Long-press the home screen → **+** → search **Scriptable** → add the widget.
5. Long-press the widget → **Edit Widget** → pick the script you just created.

## Updating the widget

Edit `widget.js`, commit, push. The widget refreshes on its own schedule
(roughly every 5–15 minutes — iOS decides). To force a refresh, open Scriptable
and run the loader manually.

## What `widget.js` has access to

Scriptable's full API: `Request`, `ListWidget`, `Color`, `Font`, `FileManager`,
`Notification`, etc. See <https://docs.scriptable.app>. The loader passes the
common globals through so they work the same as a native Scriptable script.

## Push to GitHub

```sh
gh repo create scriptable-github-widget --public --source=. --remote=origin --push
```
