import Link from "next/link";
import { ArrowRight, Bot, CalendarDays, HeartHandshake, LayoutDashboard, Sparkles, Wallet } from "lucide-react";

const values = [
  {
    icon: HeartHandshake,
    title: "Emotionally supportive",
    description: "Ayunikah is designed to help couples feel calmer, closer, and more intentional while preparing for marriage.",
  },
  {
    icon: LayoutDashboard,
    title: "Beautifully organized",
    description: "Wedding tasks, budget progress, invitations, learning, and readiness live in one elegant dashboard experience.",
  },
  {
    icon: Bot,
    title: "Gently intelligent",
    description: "AI guidance helps couples discover next steps, reminders, course suggestions, and thoughtful planning prompts.",
  },
];

const modules = [
  { icon: Wallet, label: "Budget planning" },
  { icon: CalendarDays, label: "Couple timeline" },
  { icon: Sparkles, label: "Marriage readiness" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F1] text-[#4B3B39]">
      <header className="border-b border-[#F7D6D0]/70 bg-[#FFF8F1]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Ayunikah home">
            <img src="/logo.png" alt="Ayunikah logo" className="h-11 w-11 rounded-lg object-contain" />
            <span>
              <span className="block font-playfair text-xl font-bold leading-none text-[#4B3B39]">Ayunikah</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-[#C79B8B]">
                Marriage preparation
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#4B3B39]/68 md:flex">
            <Link href="/" className="hover:text-[#C79B8B]">Home</Link>
            <Link href="/#features" className="hover:text-[#C79B8B]">Features</Link>
            <Link href="/login" className="hover:text-[#C79B8B]">Login</Link>
          </nav>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-lg bg-[#C79B8B] px-4 py-2 text-sm font-bold text-white shadow-sm shadow-[#C79B8B]/20 transition-colors hover:bg-[#b88978]"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-[#F7D6D0]/65">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#FFF8F1_0%,#FFF3EE_52%,#F8EFFA_100%)]" />
        <div className="absolute right-10 top-16 h-32 w-32 rounded-full bg-[#F7D6D0]/35 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8A655C]">About Ayunikah</p>
            <h1 className="mt-4 font-playfair text-5xl font-bold leading-[1.04] text-[#4B3B39] sm:text-6xl">
              A soft digital companion for preparing a beautiful marriage.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#4B3B39]/68">
              Ayunikah combines wedding planning, relationship readiness, learning, invitations, budgeting, and AI guidance into one calm premium platform for couples preparing their future together.
            </p>
          </div>

          <div className="rounded-lg border border-white/80 bg-white/58 p-5 shadow-xl shadow-[#F7D6D0]/25 backdrop-blur-2xl">
            <div className="rounded-lg bg-[#F7D6D0]/35 p-6">
              <p className="font-playfair text-3xl font-bold leading-tight text-[#4B3B39]">
                More than a wedding planner, Ayunikah is a preparation ecosystem for the event, the relationship, and the life after.
              </p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {modules.map((module) => {
                const Icon = module.icon;

                return (
                  <div key={module.label} className="rounded-lg border border-[#F7D6D0]/55 bg-white/75 p-4">
                    <Icon className="h-5 w-5 text-[#C79B8B]" />
                    <p className="mt-3 text-sm font-bold text-[#4B3B39]/72">{module.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C79B8B]">Our purpose</p>
          <h2 className="mt-3 font-playfair text-4xl font-bold text-[#4B3B39] sm:text-5xl">
            Make preparation feel calm, romantic, and clear
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article key={value.title} className="rounded-lg border border-[#F7D6D0]/65 bg-white/65 p-6 shadow-sm shadow-[#F7D6D0]/30 backdrop-blur-xl">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#DCCFED]/35 text-[#6D5576]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-playfair text-xl font-bold text-[#4B3B39]">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4B3B39]/64">{value.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-[#F7D6D0]/65 bg-[#FFF3EE]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-playfair text-2xl font-bold">Ayunikah</p>
            <p className="mt-2 text-sm text-[#4B3B39]/62">Made with love by Lidya Ayu Sukamawandira</p>
          </div>
          <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-[#C79B8B] px-5 py-3 text-sm font-bold text-white hover:bg-[#b88978]">
            Back to Home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
