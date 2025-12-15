## PPROGIA: Python + Prolog Architecture
**Phishing Detection Engine**

```
┌──────────────────────────────────────────────────────────┐
│              FastAPI Backend (:8000)                     │
│                                                          │
│  POST /analyze-url                                       │
│       │                                                  │
│       ▼                                                  │
│  ┌────────────────────────────────┐                     │
│  │      Rule Engine (Python)      │                     │
│  │  • URL parsing & analysis      │                     │
│  │  • Redirect chain following    │                     │
│  │  • HTTP reachability checks    │                     │
│  └──────────┬─────────────────────┘                     │
│             │                                            │
│  ┌──────────▼─────────────────────────────────────┐     │
│  │         Knowledge Integration Layer            │     │
│  │                                                 │     │
│  │  ┌──────────────┐      ┌──────────────┐       │     │
│  │  │  DNS Service │      │ DOM Analyzer │       │     │
│  │  │  • MX/A/CNAME│      │  • Playwright│       │     │
│  │  │  • SPF/DMARC │      │  • Forms/etc │       │     │
│  │  │  • TTL/Age   │      │              │       │     │
│  │  └──────┬───────┘      └──────┬───────┘       │     │
│  │         └──────────┬───────────┘               │     │
│  │                    │ Facts                     │     │
│  └────────────────────┼───────────────────────────┘     │
│                       ▼                                  │
│  ┌──────────────────────────────────┐                   │
│  │   Prolog Inference Engine        │                   │
│  │   (pyswip bridge)                │                   │
│  │   • kb_rules.pl (20+ rules)      │                   │
│  │   • kb_facts/*.pl (predicates)   │                   │
│  │   • Backward-chaining ◀──        │                   │
│  │   • Goal: is_phishing(URL)       │                   │
│  └──────────────┬───────────────────┘                   │
│                 │ Score + Rules                          │
│                 ▼                                        │
│          JSON Response                                   │
└──────────────────────────────────────────────────────────┘
```
