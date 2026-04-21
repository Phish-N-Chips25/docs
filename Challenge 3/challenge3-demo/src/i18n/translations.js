export const translations = {
  pt: {
    nav: {
      scenario: "Problema",
      architecture: "Produto",
      simulation: "Demo",
      results: "Impacto",
      roadmap: "Roadmap",
      team: "Equipa",
    },

    hero: {
      eyebrow: "Phish-N-Chips Demo · Challenge 3",
      title: "Seguranca simples.\nResposta imediata.\nImpacto real.",
      subtitle:
        "Uma plataforma unica que protege acesso fisico e risco digital no mesmo fluxo, com resposta automatica em segundos.",
      scroll: "percorrer",
      cta: "Ver problema",
    },

    scenario: {
      eyebrow: "01 · Problema",
      title: "Ataques modernos\nsao hibridos.",
      lead: "As equipas de seguranca recebem demasiados alertas sem contexto e reagem tarde. Enquanto isso, intrusoes digitais e fisicas evoluem em paralelo.",
      bridgeLabel: "Onde as empresas perdem tempo e dinheiro",
      bridge:
        "Ferramentas isoladas criam silos: uma equipa olha para logs, outra para controlo de acessos. O atacante nao trabalha em silos.",
      walls: [
        {
          tag: "Dor 01",
          title: "Acesso sem confianca",
          body: "Credenciais podem ser partilhadas, roubadas ou reutilizadas. Sem verificacao facial em tempo real, o ponto de entrada continua fragil.",
        },
        {
          tag: "Dor 02",
          title: "Alertas sem prioridade",
          body: "Sistemas tradicionais geram ruido e obrigam analistas a investigar manualmente. Resultado: atrasos, fadiga e risco operacional.",
        },
      ],
      note: "A nossa proposta junta identidade + deteccao + resposta numa experiencia unica para equipas de seguranca.",
    },

    architecture: {
      eyebrow: "02 · Produto",
      title: "Um produto.\nTres motores.",
      lead: "Desenhado para equipas pequenas e ambientes exigentes: implementacao local, resposta automatica e operacao simples.",
      module1: {
        number: "01",
        tag: "IDENTIDADE",
        title: "Verifica quem entra",
        desc: "Reconhecimento facial valida utilizadores autorizados em segundos e bloqueia acessos duvidosos antes de chegar ao dashboard.",
        stack: ["Face AI", "Camera", "CPU-ready", "Real-time"],
      },
      module2: {
        number: "02",
        tag: "INTELIGENCIA",
        title: "Deteta risco digital cedo",
        desc: "Monitoriza comportamento em logs e destaca apenas eventos realmente relevantes para reduzir ruido e acelerar decisao.",
        stack: ["Anomaly AI", "Threat scoring", "Context first", "Low noise"],
      },
      module3: {
        number: "03",
        tag: "RESPOSTA",
        title: "Transforma alerta em acao",
        desc: "Cada alerta chega com contexto operacional e pode acionar regras automaticas para bloquear acesso e notificar equipas.",
        stack: [
          "Action rules",
          "Audit trail",
          "Local deploy",
          "Privacy by design",
        ],
      },
    },

    results: {
      eyebrow: "04 · Impacto",
      title: "Valor que se sente\nna operacao.",
      lead: "A demo mostra ganhos de velocidade, foco e seguranca operacional. Nao e apenas deteccao: e deteccao com acao.",
      faceTitle: "Impacto principal",
      faceSubtitle:
        "Quatro sinais de valor para uma equipa de seguranca em contexto real.",

      metrics: [
        {
          label: "Tempo medio para validar identidade",
          value: "2.4",
          unit: "s",
          kind: "accuracy",
        },
        {
          label: "Tecnicas ATT&CK mapeadas",
          value: "230",
          unit: "",
          kind: "config",
        },
        {
          label: "Alertas com contexto acionavel",
          value: "100",
          unit: "%",
          kind: "accuracy",
        },
        {
          label: "Reducao estimada de triagem manual",
          value: "40",
          unit: "%",
          kind: "biometric",
        },
      ],

      tableClosedCaption: "Tabela A - Antes vs Depois",
      tableClosedNote: "Ganhos projetados com base nos resultados experimentais do prototipo.",
      tableClosed: {
        headers: [
          "Indicador",
          "Antes",
          "Depois",
          "Ganho",
          "Nota",
          "Prioridade",
        ],
        rows: [
          [
            "Tempo de triagem inicial",
            "15 min",
            "8 min",
            "-47%",
            "Mais foco",
            "Alta",
          ],
          [
            "Alertas sem contexto",
            "Elevado",
            "Baixo",
            "-55%",
            "Menos ruido",
            "Alta",
          ],
        ],
      },

      tableOpenCaption: "Tabela B - Valor para o negocio",
      tableOpenNote: "Leitura executiva para patrocinadores e decisores.",
      tableOpen: {
        headers: ["Objetivo", "Resultado", "SLA alvo", "Estado"],
        rows: [
          [
            "Proteger acesso fisico",
            "Bloqueio em tempo real",
            "< 3s",
            "Em demo",
          ],
          [
            "Acelerar resposta SOC",
            "Alerta com acao recomendada",
            "< 10s",
            "Em demo",
          ],
          [
            "Operar sem cloud obrigatoria ★",
            "Execucao local",
            "100% local",
            "Diferenciador",
          ],
        ],
      },

      sentinelTitle: "Ambito do prototipo",
      sentinelMetrics: [
        { label: "Tempo de setup inicial", value: "1", unit: "day" },
        { label: "Modulos implementados", value: "3", unit: "" },
        { label: "Average Precision (detecao anomalias)", value: "0.836", unit: "" },
        { label: "Precisao de reconhecimento facial", value: "100", unit: "%" },
      ],
    },

    limitations: {
      eyebrow: "05 · Roadmap",
      title: "Do prototipo para\nplataforma integrada.",
      lead: "O conceito esta validado. Estas sao as extensoes naturais do trabalho desenvolvido.",
      items: [
        {
          title: "Prova de conceito validada",
          body: "A versao atual demonstra os tres modulos em ambiente controlado com resultados mensuráveis.",
        },
        {
          title: "Integracao com SIEM e IAM",
          body: "A arquitetura foi desenhada para facilitar uma possivel integracao com plataformas como Splunk ou Microsoft Sentinel, bem como sistemas IAM empresariais.",
        },
        {
          title: "Fusao de sinais fisicos e digitais",
          body: "Extensao natural: correlacionar alertas de acesso fisico com eventos de log em tempo real para detetar ameacas hibridas.",
        },
        {
          title: "Possivel expansao de cenarios",
          body: "A solucao pode ser adaptada a ambientes multi-site, infraestruturas criticas e contextos com requisitos de privacidade elevados.",
        },
      ],
      teaserTitle: "Extensoes possiveis",
      teaserBody:
        "A arquitetura foi desenhada para crescer. Extensoes prioritarias incluem fusao de sinais fisico-digital em tempo real, conectores SIEM adicionais e um benchmark de reconhecimento facial em contexto aberto.",
    },

    team: {
      eyebrow: "06 · Equipa",
      title: "Quem esta a construir.",
      affiliation: "Phish-N-Chips · ISEP/IPP",
    },

    footer: {
      project: "Challenge 3 Demo · 2026",
      disciplines: "Security Product Pitch",
      repo: "Repositorio",
      report: "Resumo tecnico",
      built: "Construido com React, Vite e Tailwind",
    },

    ui: {
      language: "Idioma",
      langShort: "PT",
      altLangShort: "EN",
    },
  },

  en: {
    nav: {
      scenario: "Problem",
      architecture: "Product",
      simulation: "Demo",
      results: "Impact",
      roadmap: "Roadmap",
      team: "Team",
    },

    hero: {
      eyebrow: "Cyber-Physical Detetection System · Challenge 3",
      title: "Simple security.\nImmediate response.\nReal impact.",
      subtitle:
        "A single system that protects physical access and digital risk in one flow, with automated response in seconds.",
      scroll: "scroll",
      cta: "See problem",
    },

    scenario: {
      eyebrow: "01 · Problem",
      title: "Modern attacks\nare hybrid.",
      lead: "Security teams receive too many context-free alerts and respond too late. Meanwhile, digital and physical intrusions evolve in parallel.",
      bridgeLabel: "Where companies lose time and money",
      bridge:
        "Isolated tools create silos: one team watches logs, another watches doors. Attackers do not work in silos.",
      walls: [
        {
          tag: "Attack Vector 01",
          title: "Access without confidence",
          body: "Credentials can be shared, stolen or reused. Real-time face verification adds a new layers to resource and infrastructure access.",
        },
        {
          tag: "Attack Vector 02",
          title: "Alerts without context",
          body: "Traditional systems generate noise and require labour intensive manual investigation. Anomaly analysis with MITTRE ATT&CK mapping for actionable context protects digital infrastructure and reduces operational risk.",
        },
      ],
      note: "Our approach combines identity + detection + response in one operator experience.",
    },

    architecture: {
      eyebrow: "02 · Product",
      title: "One product.\nTwo layers.\nThree engines.",
      lead: "Built for lean teams and demanding environments: local deployment, automated response and simple operation.",
      module1: {
        number: "01",
        tag: "IDENTITY",
        title: "Verify who enters",
        desc: "Face recognition validates authorized users in seconds and blocks suspicious access.",
        stack: ["Face AI", "Camera", "CPU-ready", "Real-time"],
      },
      module2: {
        number: "02",
        tag: "INTELLIGENCE",
        title: "Detect digital risk early",
        desc: "Monitors log behavior and surfaces only truly relevant events to reduce noise and accelerate decisions.",
        stack: ["Anomaly AI", "Threat scoring", "Context first", "Low noise"],
      },
      module3: {
        number: "03",
        tag: "EXPLAINABILITY",
        title: "Turn Alerts into Actions",
        desc: "Every alert arrives with operational context, triggers automated rules to block access and notifies teams.",
        stack: [
          "Action rules",
          "Audit trail",
          "Local deploy",
          "Privacy by design",
        ],
      },
    },

    results: {
      eyebrow: "04 · Impact",
      title: "Value you can feel\nin operations.",
      lead: "The demo highlights gains in speed, focus and operational security. This is not just detection, it is detection with action.",
      faceTitle: "Core outcomes",
      faceSubtitle: "Four value signals for a real-world security team.",

      metrics: [
        {
          label: "Average time to verify identity",
          value: "2",
          unit: "s",
          kind: "accuracy",
        },
        {
          label: "ATT&CK techniques mapped",
          value: "230",
          unit: "",
          kind: "config",
        },
        {
          label: "Alerts with actionable context",
          value: "100",
          unit: "%",
          kind: "accuracy",
        },
        {
          label: "Local",
          value: "100",
          unit: "%",
          kind: "percentage",
        },
      ],

      tableClosedCaption: "Table A - Before vs After",
      tableClosedNote: "Projected gains based on experimental results from the prototype.",
      tableClosed: {
        headers: ["Indicator", "Before", "After", "Gain", "Note", "Priority"],
        rows: [
          [
            "Initial triage time",
            "15 min",
            "8 min",
            "-47%",
            "More focus",
            "High",
          ],
          ["Context-free alerts", "High", "Low", "-55%", "Less noise", "High"],
        ],
      },

      tableOpenCaption: "Table B - Business value",
      tableOpenNote: "Executive readout for sponsors and decision makers.",
      tableOpen: {
        headers: ["Goal", "Outcome", "Target SLA", "Status"],
        rows: [
          ["Protect resource access", "Real-time blocking", "< 3s", "In demo"],
          ["Speed up SOC response", "Action-ready alert", "< 10s", "In demo"],
          ["Operate without third parties ★","Local execution","100% local","Differentiator"],
        ],
      },

      sentinelTitle: "Prototype scope",
      sentinelMetrics: [
        { label: "Initial setup time", value: "4", unit: "day" },
        { label: "Modules implemented", value: "3", unit: "" },
        { label: "Average Precision (anomaly detection)", value: "83.6", unit: "%" },
        { label: "Face recognition accuracy", value: "100", unit: "%" },
      ],
    },

    limitations: {
      eyebrow: "05 · Roadmap",
      title: "From prototype to\nintegrated platform.",
      lead: "The concept is proven. These are the natural next steps from the work developed.",
      items: [
        {
          title: "Proof of concept validated",
          body: "The current version demonstrates all three modules in a controlled environment with measurable outcomes.",
        },
        {
          title: "SIEM and IAM integration",
          body: "The architecture is designed to facilitate a potential integration with platforms such as Splunk or Microsoft Sentinel, as well as enterprise IAM systems.",
        },
        {
          title: "Physical-digital signal fusion",
          body: "A natural extension: correlate physical access alerts with log events in real time to detect hybrid threats end-to-end.",
        },
        {
          title: "Broader deployment scenarios",
          body: "The solution can be adapted to multi-site environments, critical infrastructure and contexts with elevated privacy requirements.",
        },
      ],
      teaserTitle: "Possible extensions",
      teaserBody:
        "The architecture is designed to grow. Priority extensions include real-time physical-digital signal fusion, SIEM connectors and integrate into an ecosystem with robots as both monitored nodes and monitoring agents.",
    },

    team: {
      eyebrow: "06 · Team",
      title: "Who is building this.",
      affiliation: "Phish-N-Chips · ISEP/IPP",
    },

    footer: {
      project: "Challenge 3 Demo · 2026",
      disciplines: "Security Product Pitch",
      repo: "Repository",
      report: "Technical summary",
      built: "Built with React, Vite and Tailwind",
    },

    ui: {
      language: "Language",
      langShort: "EN",
      altLangShort: "PT",
    },
  },
};
