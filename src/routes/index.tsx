import { createFileRoute } from "@tanstack/react-router";
import { HeroTexture } from "@/components/HeroTexture";

const DOWNLOAD_URL =
  "https://github.com/Shivraj-crypto/yourcode-downloads/releases/latest/download/YourCode-Windows-x64-Setup.exe";
const VERSION = "0.1.0";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YourCode for Windows — Offline Python Coding Challenges" },
      {
        name: "description",
        content:
          "Download YourCode for Windows. Solve Python coding challenges fully offline with bundled Python, instant judging and local saves.",
      },
      { property: "og:title", content: "YourCode for Windows" },
      {
        property: "og:description",
        content: "Your machine. Your code. Your rules. Offline Python coding challenges for Windows.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FEATURES = [
  { t: "Python, bundled", d: "Python ships inside the installer. No setup, no pip, no first-run downloads." },
  { t: "Fully offline", d: "Every problem, test and save works without an internet connection." },
  { t: "Local saves", d: "Drafts and submissions are stored on your disk with crash-safe storage." },
  { t: "Sandboxed runs", d: "Each run is isolated with time, memory and output limits." },
  { t: "Backup & restore", d: "Move your progress between the browser and desktop from your profile." },
  { t: "Lightweight", d: "Small install and fast startup, built on the native Windows web view." },
];

function WinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M3 5.5 10.5 4.5v7H3zM11.5 4.4 21 3v8.5h-9.5zM3 12.5h7.5v7L3 18.5zM11.5 12.5H21V21l-9.5-1.4z" />
    </svg>
  );
}

function DownloadButton() {
  return (
    <a
      href={DOWNLOAD_URL}
      className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
      <WinIcon /> Download for Windows
    </a>
  );
}

function Preview() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5 text-xs text-muted-foreground">
        <span>YourCode</span>
        <span className="font-mono">max_subarray.py</span>
      </div>
      <div className="grid md:grid-cols-[1fr_1.3fr]">
        <div className="border-b border-border p-6 md:border-b-0 md:border-r">
          <p className="font-mono text-xs text-primary">Medium</p>
          <h3 className="mt-2 font-semibold">Largest Sum Contiguous Subarray</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Given an array of integers, return the largest sum of any contiguous slice.
          </p>
        </div>
        <pre className="p-6 font-mono text-sm leading-6 text-muted-foreground">
{`def max_subarray(nums):
    best = cur = nums[0]
    for x in nums[1:]:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best`}
        </pre>
      </div>
      <div className="flex items-center gap-3 border-t border-border px-4 py-2.5 font-mono text-xs text-muted-foreground">
        <span className="text-code-key">● Accepted</span>
        <span>12/12 tests · 4 ms</span>
      </div>
    </div>
  );
}

function Index() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="font-bold tracking-tight">
            YourCode<span className="text-primary">.</span>
          </span>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hidden hover:text-foreground sm:inline">Features</a>
            <a href="#install" className="hidden hover:text-foreground sm:inline">Install</a>
            <a href={DOWNLOAD_URL} className="text-foreground hover:text-primary">Download</a>
          </div>
        </nav>
      </header>

      <section id="download" className="relative overflow-hidden">
        <HeroTexture />
        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-20">
          <p className="font-mono text-xs uppercase tracking-wider text-primary">YourCode for Windows</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight">
            YourCode<span className="text-primary">.</span>
          </h1>
          <p className="mt-3 max-w-lg text-lg text-muted-foreground">
            Your machine. Your code. Your rules. Solve Python coding challenges entirely offline.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <DownloadButton />
            <span className="font-mono text-xs text-muted-foreground">v{VERSION} · Windows 10 / 11 · x64</span>
          </div>
          <div className="mt-16"><Preview /></div>
        </div>
      </section>


      <section id="features" className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.t} className="rounded-lg border border-border bg-card p-5">
                <h3 className="font-semibold">{f.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="install" className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Download", "Get the .exe installer."],
              ["Install", "Per-user install, no admin rights needed."],
              ["Solve", "Open a problem and press Run."],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-lg border border-border p-5">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <h3 className="mt-2 font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted-foreground">
            The installer isn't code-signed yet, so Windows SmartScreen may show a warning. Choose{" "}
            <span className="text-foreground">More info → Run anyway</span> to continue.
          </p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-6 py-16 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Ready to start?</h2>
            <p className="mt-1 text-muted-foreground">Free, no account required.</p>
          </div>
          <DownloadButton />
        </div>
      </section>

      <footer className="border-t border-border px-6 py-6 text-center text-xs text-muted-foreground">
        © YourCode · v{VERSION}
      </footer>
    </main>
  );
}
