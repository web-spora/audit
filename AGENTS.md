# AGENTS.md

The FesAuto marketing-audit site: a **static, Russian-language, no-build** site (plain HTML/CSS/JS, no framework, no package manager, no backend). All UI text and JS comments are in Russian.

## Structure & data flow

- `index.html` → `js/main.js` — landing/presentation. One IIFE holds the data consts (`HERO`, `SOURCES`, `DIRS`, `SEGS`, `BLOCKS`, `TIMELINE`) and renders the DOM (hero KPI counters, 4 direction blocks, plan + roadmap). No fetch/API: everything is hardcoded.
- `plan.html` → `js/plan.js` — "План масштабирования" (page 2). Data consts `PLAN` (4 groups → items `{t, d, steps[], kpi}`) and `TIMELINE`; renders accordion + `#planStats`. Checked items persist to `localStorage` under key `evo_plan_done` (first group opens by default).
- Shared `css/styles.css` — dark theme; palette is CSS vars in `:root` (`--accent: #de0e14`, `--accent-2: #ff3b40`, `--green`, `--amber`, `--bg: #0a0a0b`). Reuse the vars; don't hardcode colors.
- Headers/nav/background-glow markup is **duplicated** between the two HTML files — edit both when changing shared markup.

## Editing numbers

Numbers come from a real 12-month audit and are embedded as JS consts. Keep totals consistent (e.g., directions sum to 33 740 leads). Format displayed numbers with `toLocaleString("ru-RU")` (as existing `fmt`/`money` helpers do) — do not paste literal spaced thousands.

## Verification (no tooling installed)

`node`, `git`, `rg`, and `npm` are **not** on PATH — do not attempt npm/build/git commands. The only way to verify is headless Chrome:

- Path: `C:\Program Files\Google\Chrome\Application\chrome.exe`
- Render check (dump rendered DOM, then count expected elements, e.g. `.acc-item`, `.tl-item`, `.kpi-value`):
  `& "...chrome.exe" --headless --disable-gpu --virtual-time-budget=5000 --dump-dom "file:///C:/Users/11/Downloads/audit/index.html"`
- JS-error check: rerun adding `--enable-logging=stderr --v=0`, merge `2>&1`, filter for `Uncaught|SyntaxError|ReferenceError|TypeError|<script>:`. This catches broken data edits since both pages render client-side from JS consts.

## Windows/PowerShell gotchas

- The shell (PowerShell 5.1) **garbles Cyrillic** in command output and in `Select-String`/`Out-File` matching. For any Cyrillic content check use the Grep tool directly, or dump to a UTF-8 temp file under `C:\Users\11\AppData\Local\Temp\opencode\` and Read it. Never treat a 0-match Cyrillic grep from bash as proof of absence.
- `file://` works fine in Chrome directly (no server needed).

## Source doc

`plan_marketinga.docx` is the requirements source for `plan.html`. It's a binary zip — extract text via zip/XML (`word/document.xml`), not a text read.