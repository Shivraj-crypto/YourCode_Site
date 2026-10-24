<p align="center">
  <img src="./public/yourcode-wordmark.png" alt="YourCode" width="420">
</p>

`python` · `closed source` · `seed`

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

Download for Windows at [your-code-site.vercel.app](https://your-code-site.vercel.app/).

