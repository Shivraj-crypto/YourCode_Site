<p align="center">
  <img src="./public/yourcode-wordmark.png" alt="YourCode" width="420">
</p>
# YourCode

**Your machine. Your code. Your rules.**

A local-first coding-practice app in the spirit of LeetCode — problem statements, a real Python editor, and instant judging — with **no server, no accounts, and no cloud**. Everything runs on your own machine: the code you write, the results you get, and the history you keep all stay local.

## Why this exists

Most practice sites hold your submissions, progress, and drafts on their servers and need an account (and often a connection) to work. YourCode inverts that:

- **Nothing leaves your machine.** Your answers and progress are never uploaded, because there is nowhere to upload them to.
- **It works offline.** The Windows desktop build ships the Python runtime with it, so you can practise on a plane.
- **One person, one file.** It is built for a single user, so there is no user table, no auth, and no rate limit — just a database file you can copy, back up, or delete.
- **Questions are files, not a database seed.** A new problem is one JSON file in `sums/`; the app generates its page, editor, tests, and company counts from it.

## What you get

- **Home** — hero plus a paginated company directory (65 companies, logos bundled locally so they render offline) with per-company question counts.
- **Problems** — searchable, filterable, sortable list with difficulty and company tags, Solved/Continue badges, and a "Random problem" button that jumps to something you have not solved yet.
- **Problem workspace** — Description and Submissions tabs, a CodeMirror Python editor (syntax colours, auto-indent, autocomplete, folding, Ctrl/Cmd+scroll zoom), smoothly resizable panels, editable custom inputs, and Run/Submit with an actual-versus-expected diff.
- **Company preparation** — "Prepare for Cisco" walks you through that company's questions in order; Skip moves on without marking anything solved, and Home offers "Continue your preparation for …" where you left off.
- **Profile** — solved/attempted counts, activity heatmap, streaks, recent submissions, editable name and photo, and a full reset. No ratings or rankings: it is a local app, so there is nobody to rank against.
- **Safe execution** — every run happens in a throwaway browser worker with a 2-second time limit, a 128 MiB Python heap cap, and a 64 KiB output cap, so an infinite loop dies instead of hanging the page.

## Running it

Install [Bun](https://bun.sh), then:

```sh
bun install
bun run dev:local
```

Open `http://127.0.0.1:8080`. The `dev:local` command starts a small companion process that stores drafts, custom inputs, submissions, and profile data in `~/.yourcode/yourcode.sqlite`, so every browser on the machine sees the same history.

```sh
bun run dev            # same app, but data lives in this browser only (IndexedDB)
bun run storage:local  # companion only, for an already-running app
bun run test           # test suite
```

Set `YOURCODE_DB` to move the SQLite file, `YOURCODE_STORAGE_PORT` to change its port, and `YOURCODE_ORIGINS` to an exact origin allowlist if needed. The companion binds only to `127.0.0.1:4319` and refuses other origins — never expose it to a network.

Without the companion, the app falls back to IndexedDB, which is per-browser and cannot share data between browsers. On first use the web version downloads its pinned Pyodide assets; the desktop build bundles them.

## Adding a question

Put one structured JSON file per problem in [`sums/`](./sums/README.md): copy `sums/.template.json`, or paste a raw statement into an AI and ask it to format it using the instructions in `sums/README.md`. Then:

```sh
bun run problems:sync    # regenerate pages, registry, and counts
bun run problems:check   # validate without changing anything
```

Startup and build commands sync automatically. Question files are declarative data — code inside them is never executed — so new problems use their official test cases unless you add a trusted reference implementation for custom inputs. Hand-written problems are untouched by the sync. `sums/reverse-string.json` is the working example.

Added questions reach an installed desktop app only after the installer is rebuilt.

## Windows desktop

A separate Tauri 2 target reuses the same routes, components, styling, Python worker, and storage adapters, and swaps browser storage for native SQLite in app data (with a one-time migration from IndexedDB). The web build is unchanged.

```sh
bun run desktop:dev     # development window
bun run desktop:build   # installer under src-tauri/target/release/bundle/nsis/
```

Windows installers must be built on Windows with the MSVC toolchain. See [DESKTOP.md](./DESKTOP.md) for prerequisites, storage details, and verification notes.

## Releases

`.github/workflows/desktop-windows.yml` builds a Windows x64 NSIS installer on every push to the default branch (including a push that only adds a `sums/*.json` file), on `desktop-v*` tags, or manually. After tests pass, it publishes to the separate public [`yourcode-downloads`](https://github.com/Shivraj-crypto/yourcode-downloads) repository using the `INSTALLER_TOKEN` secret, so the source repository can stay private.

The asset name never changes, so a landing page can link straight to the newest installer:

```text
https://github.com/Shivraj-crypto/yourcode-downloads/releases/latest/download/YourCode-Windows-x64-Setup.exe
```

Each release also carries a `.sha256` file. The installer is unsigned, so Windows will warn about an unknown publisher until you sign builds with your own certificate.

## Layout

```text
src/            pages, components, storage and judging logic
  routes/       Home, Problems, Profile, company pages, problem pages
  components/   shared UI: ProblemPanel, workspaces, footer, preparation
  lib/          registry, progress, shortcuts, backup, limits
src-tauri/      Tauri 2 desktop shell, native SQLite storage crate, installer art
sums/           one JSON file per question
scripts/        problem sync, local storage companion, desktop prep, release policy
desktop/        offline Python and font assets for the desktop bundle
```

## Stack

React 19 · TanStack Start · Vite · TypeScript · Tailwind CSS v4 · CodeMirror 6 · Pyodide 0.26.4 in disposable Web Workers · Tauri 2 with rusqlite · Vitest
