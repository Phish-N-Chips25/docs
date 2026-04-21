import Section from "./Section";
import { useLanguage } from "../context/LanguageContext";

export default function Limitations() {
  const { t } = useLanguage();
  const items = t("limitations.items");

  return (
    <Section
      id="limitations"
      eyebrow={t("limitations.eyebrow")}
      title={t("limitations.title")}
      lead={t("limitations.lead")}
    >
      {/* Grid de limitações */}
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
        {items.map((item, i) => (
          <div key={i} className="border-l-2 border-signal-red/40 pl-6 py-2">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-mono text-xs text-signal-red tabular-nums">
                0{i + 1}
              </span>
              <h3 className="font-display font-light text-xl md:text-2xl text-paper-100 leading-tight">
                {item.title}
              </h3>
            </div>
            <p className="text-paper-300 leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>

      {/* Teaser Challenge 4 — destaque forte */}
      <div className="forensic-card p-8 md:p-10 relative overflow-hidden">
        {/* Decoração: scan line animada */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute left-0 right-0 h-px bg-phosphor animate-scan" />
        </div>

        <div className="flex items-center gap-3 mb-8">
          <span className="w-4 h-px bg-phosphor" />
          <span className="eyebrow">Next ▸</span>
        </div>

        <h3 className="font-display font-light text-4xl md:text-5xl lg:text-6xl text-paper-100 mb-8 leading-tight text-balance max-w-4xl">
          {t("limitations.teaserTitle")}
        </h3>

        <p className="text-paper-300 text-lg md:text-xl max-w-3xl leading-relaxed mb-10 text-pretty">
          {t("limitations.teaserBody")}
        </p>

        <div className="flex flex-wrap gap-2">
          {[
            "SIEM connectors",
            "IAM integration",
            "Signal fusion",
            "Multi-agent systems",
            "IoT & robotics nodes",
            "Real-time correlation",
            "ATT&CK enrichment",
          ].map((chip) => (
            <span
              key={chip}
              className="font-mono text-[0.7rem] uppercase tracking-widest px-3 py-1.5 border border-phosphor/40 text-phosphor"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
