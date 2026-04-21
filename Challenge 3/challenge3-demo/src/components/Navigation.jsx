import Logo from "./Logo";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "../context/LanguageContext";
import { useSlideDeck } from "../context/useSlideDeck";

const NAV_ITEMS = [
  { id: "scenario", key: "nav.scenario" },
  { id: "architecture", key: "nav.architecture" },
  { id: "simulation", key: "nav.simulation" },
  { id: "results", key: "nav.results" },
  { id: "limitations", key: "nav.roadmap" },
  { id: "team", key: "nav.team" },
];

export default function Navigation() {
  const { t } = useLanguage();
  const { slide, goToId } = useSlideDeck();
  const active = slide?.id;

  // Keep focus clean on the opening hero slide.
  if (active === "hero") return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-white/95 via-white/60 to-transparent backdrop-blur-sm border-b border-ink-700/40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 h-16 flex items-center justify-between gap-6">
        <button
          onClick={() => goToId("hero")}
          className="text-paper-100 hover:text-phosphor transition-colors"
          aria-label="Início"
        >
          <Logo />
        </button>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((s) => (
            <button
              key={s.id}
              onClick={() => goToId(s.id)}
              className={`font-mono text-[0.7rem] uppercase tracking-widest transition-colors ${
                active === s.id
                  ? "text-phosphor"
                  : "text-paper-300 hover:text-paper-100"
              }`}
            >
              {t(s.key)}
            </button>
          ))}
        </nav>

        <LanguageToggle />
      </div>
    </header>
  );
}
