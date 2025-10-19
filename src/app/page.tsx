"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
  const features = [
    "Manajemen Sosial",
    "QR & Link",
    "Kustomisasi",
    "Analitik Dasar",
    "Tautan Sosial",
    "Export vCard",
  ];

  const scrollToFeatures = () => {
    const section = document.getElementById("fitur");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white transition-colors duration-300">
      {/* Hero */}
      <section className="snap-start container max-w-6xl mx-auto py-20 md:py-28 min-h-[100svh] flex items-center">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-white/10 px-3 py-1 text-sm text-neutral-700 dark:text-white/80">
              Digital Business Card
            </span>

            <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              Kenalkan diri Anda secara{" "}
              <span className="text-red-600 dark:text-red-400">elegan</span> dan instan.
            </h1>

            <p className="mt-4 text-neutral-700/80 dark:text-neutral-300 max-w-prose">
              Buat kartu bisnis digital yang bisa dibagikan via QR atau link.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="rounded-xl px-6 py-3 font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                Mulai Gratis
              </Link>
              <button
                onClick={scrollToFeatures}
                className="rounded-xl border px-5 py-3 border-neutral-300 bg-white hover:bg-neutral-100 transition dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20"
              >
                Lihat Fitur
              </button>
              <ThemeToggle />
            </div>
          </div>

          {/* Preview Card */}
          <div className="rounded-3xl p-6 md:p-8 backdrop-blur-xl bg-grey-50/70 border border-neutral-200 shadow-lg dark:bg-white/10 dark:border-white/20">
            <div className="aspect-[4/3] w-full grid place-items-center rounded-2xl border border-neutral-200 bg-white dark:border-white/20 dark:bg-white/10">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 rounded-2xl bg-neutral-900 text-white grid place-items-center dark:bg-white dark:text-black">
                  VC
                </div>
                <p className="mt-4 text-sm opacity-70">Pratinjau kartu Anda</p>
                <p className="text-lg font-medium">Nama Anda</p>
                <p className="opacity-70">Jabatan • Perusahaan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="fitur"
        className="snap-start container max-w-6xl mx-auto py-24 min-h-[100svh] flex flex-col justify-center"
      >
        <h2 className="text-3xl font-semibold mb-8">Semua yang Anda butuhkan</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 border backdrop-blur-md border-neutral-200 bg-white/70 hover:bg-white transition dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/20"
            >
              <div className="h-10 w-10 rounded-xl bg-neutral-900 text-white grid place-items-center dark:bg-white dark:text-black">
                {i + 1}
              </div>
              <h3 className="mt-4 font-medium">{t}</h3>
              <p className="text-sm opacity-70 mt-1">
                Deskripsi singkat fitur {t.toLowerCase()}.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
