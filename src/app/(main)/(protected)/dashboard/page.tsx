"use client";

import Link from "next/link";
import QRCode from "react-qr-code";
import { useEffect, useMemo, useState } from "react";

type User = { id: string; email: string; name: string };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const NavItem = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition
               hover:bg-black/5 text-black/70
               dark:text-white/75 dark:hover:bg-white/5"
  >
    <span className="h-2 w-2 rounded-full bg-black/40 dark:bg-white/40" />
    {label}
  </Link>
);

const Card = ({
  title,
  children,
  action,
  subtle = false,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  subtle?: boolean;
}) => (
  <div
    className={[
      "rounded-2xl p-5 backdrop-blur-xl",
      subtle
        ? "bg-white/70 border border-white/50 shadow-[0_10px_30px_rgba(0,0,0,.08)] " +
          "dark:bg-white/5 dark:border-white/10 dark:shadow-[0_10px_30px_rgba(0,0,0,.35)]"
        : "card-glass",
    ].join(" ")}
  >
    <div className="flex items-center justify-between">
      <h3 className="font-medium">{title}</h3>
      {action}
    </div>
    <div className="mt-3 text-sm text-black/70 dark:text-white/70">{children}</div>
  </div>
);

function initials(name?: string) {
  return (name ?? "User")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
}

const BRAND = {
  instagram: { chip: "from-pink-500 to-violet-500", label: "IG" },
  linkedin:  { chip: "from-sky-500 to-blue-600",   label: "IN" },
  tiktok:    { chip: "from-zinc-900 to-zinc-700",  label: "TT" },
  x:         { chip: "from-neutral-900 to-neutral-700", label: "X" },
} as const;

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isOwner] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) { try { setUser(JSON.parse(raw)); } catch {} }

    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const profileUrl = useMemo(() => `${SITE_URL}/u/${user?.id ?? "me"}`, [user?.id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("onboarding:complete");
    window.location.href = "/login";
  };

  const social = [
    { key: "instagram", label: "Instagram", handle: "@your_ig", href: "https://instagram.com/your_ig" },
    { key: "linkedin",  label: "LinkedIn",  handle: "your-name", href: "https://linkedin.com/in/your-name" },
    { key: "tiktok",    label: "TikTok",    handle: "@your_tt", href: "https://tiktok.com/@your_tt" },
    { key: "x",         label: "X (Twitter)", handle: "@your_x", href: "https://x.com/your_x" },
  ];

  return (
    <div className="relative w-full min-h-[100svh] overflow-hidden text-neutral-900 dark:text-white transition-colors duration-300 bg-[#FAFAFC] dark:bg-[#0A0A0C]">
      {/* Background luxury transparent */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,.95) 0%, rgba(245,245,245,.9) 50%, rgba(255,255,255,1) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 dark:opacity-100"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,12,1) 0%, rgba(20,20,24,.95) 50%, rgba(10,10,12,1) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[.06] dark:opacity-[.10]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 container max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-6 rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl p-4 shadow-[0_10px_30px_rgba(0,0,0,.08)] dark:bg-white/5 dark:border-white/10 dark:shadow-[0_10px_30px_rgba(0,0,0,.35)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold">
                Selamat Datang, {user?.name?.split(" ")?.[0] ?? "Friend"}
              </h1>
              {/* <p className="text-sm text-black/60 dark:text-white/60">Your key metrics at a glance.</p> */}
            </div>
            <button
              onClick={handleLogout}
              className="rounded-xl px-4 py-2 text-sm font-medium border border-black/10 bg-white/70 hover:bg-white transition dark:border-white/10 dark:bg-white/10 dark:text-white"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-3 lg:col-span-2">
            <div className="sticky top-6 rounded-2xl p-4 backdrop-blur-xl bg-white/70 border border-white/50 shadow-[0_10px_30px_rgba(0,0,0,.08)] dark:bg-white/5 dark:border-white/10 dark:shadow-[0_10px_30px_rgba(0,0,0,.35)]">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-black text-white grid place-items-center text-sm font-semibold dark:bg-white dark:text-black shadow">
                  {initials(user?.name)}
                </div>
                <div>
                  <p className="text-sm font-medium">{user?.name ?? "Guest"}</p>
                  <p className="text-xs text-black/60 dark:text-white/60">Digital Card</p>
                </div>
              </div>

              <nav className="mt-4 space-y-1">
                {isOwner && <NavItem href="/settings" label="Setting Profile" />}
                <NavItem href="/contacts" label="Contacts" />
                <NavItem href="/qrcode" label="QR Code" />
                <NavItem href="/portfolio" label="Portofolio" />
                <NavItem href="/team" label="Team" />
              </nav>
            </div>
          </aside>

          {/* Main */}
          <main className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* My Links */}
              <Card
                title="My Links"
                action={<Link href="/links" className="text-sm link-muted">View All</Link>}
              >
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {social.map((s) => (
                    <a
                      key={s.key}
                      href={s.href}
                      target="_blank"
                      className="group rounded-xl border border-white/60 bg-white/70 p-4 transition hover:shadow-md dark:bg-white/10 dark:border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-xl grid place-items-center text-xs font-semibold text-white bg-gradient-to-br ${
                          BRAND[s.key as keyof typeof BRAND]?.chip || "from-neutral-600 to-neutral-800"
                        }`}>
                          {BRAND[s.key as keyof typeof BRAND]?.label ?? "LN"}
                        </div>
                        <div>
                          <p className="text-sm font-medium group-hover:underline">{s.label}</p>
                          <p className="text-xs text-black/60 dark:text-white/60">{s.handle}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button
                          className="inline-flex items-center rounded-lg border border-black/10 bg-white/70 px-3 py-1.5 text-xs hover:bg-white dark:bg-white/10 dark:border-white/10 dark:text-white"
                          onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(s.href); }}
                        >
                          Copy
                        </button>
                        <span className="inline-flex items-center rounded-lg border border-black/10 bg-white/70 px-3 py-1.5 text-xs dark:bg-white/10 dark:border-white/10 dark:text-white">
                          Open
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </Card>

              {/* QR Code */}
              <Card title="QR Code" subtle>
                <div className="grid place-items-center py-2">
                  <div className="rounded-2xl border border-white/60 bg-white/80 p-4 dark:bg-white/10 dark:border-white/10">
                    <QRCode
                      value={profileUrl}
                      size={176}
                      bgColor="transparent"
                      fgColor={isDark ? "#ffffff" : "#000000"}
                      style={{ height: "176px", width: "176px" }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-black/60 dark:text-white/60 break-all text-center" suppressHydrationWarning>
                    {profileUrl}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      className="inline-flex items-center rounded-lg border border-black/10 bg-white/70 px-3 py-1.5 text-xs hover:bg-white dark:bg-white/10 dark:border-white/10 dark:text-white"
                      onClick={() => navigator.clipboard.writeText(profileUrl)}
                    >
                      Copy Link
                    </button>
                    <Link
                      href="/qrcode"
                      className="inline-flex items-center rounded-lg border border-black/10 bg-white/70 px-3 py-1.5 text-xs hover:bg-white dark:bg-white/10 dark:border-white/10 dark:text-white"
                    >
                      Fullscreen
                    </Link>
                  </div>
                </div>
              </Card>

              {/* Tips */}
              <Card title="Tips" subtle>
                <ul className="space-y-2">
                  <li>Gunakan username singkat untuk URL profil.</li>
                  <li>Tambahkan foto terbaik Anda pada profil.</li>
                  <li>Bagikan QR saat bertemu tatap muka.</li>
                </ul>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}