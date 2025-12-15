---
marp: true
theme: default
paginate: true
backgroundColor: #1a1a1a
color: #e0e0e0
style: |
  section {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 28px;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    color: #e0e0e0;
  }
  h1 {
    color: #00d4ff;
    font-size: 2.2em;
    text-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  }
  h2 {
    color: #64b5f6;
    font-size: 1.5em;
  }
  h3 {
    color: #90caf9;
  }
  h4 {
    color: #bbdefb;
  }
  strong {
    color: #fff;
  }
  code {
    background: #0d1117;
    color: #79c0ff;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.85em;
    border: 1px solid #30363d;
  }
  pre {
    background: #0d1117;
    border: 1px solid #30363d;
    border-radius: 6px;
    padding: 1em;
  }
  pre code {
    background: transparent;
    border: none;
    color: #c9d1d9;
  }
  table {
    font-size: 0.75em;
    border-collapse: collapse;
  }
  table th {
    background: #0d1117;
    color: #58a6ff;
    border: 1px solid #30363d;
    padding: 0.6em;
  }
  table td {
    border: 1px solid #30363d;
    padding: 0.6em;
  }
  table tr:nth-child(even) {
    background: #161b22;
  }
  ul, ol {
    font-size: 0.95em;
  }
  li {
    margin-bottom: 0.5em;
  }
  a {
    color: #58a6ff;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  .columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
  section::after {
    color: #6e7681;
  }
  blockquote {
    border-left: 4px solid #58a6ff;
    padding-left: 1em;
    margin-left: 0;
    color: #8b949e;
  }
---

---

<!-- _class: invert -->
# Phish'n'Chips
## Intelligent Phishing Detection Systems

**Technical Demonstration**

Team 10 - MEIA ISEP

---

## Team Members

<div class="columns">
<div>

**Bruno Camarneiro**
- 1250422@ISEP.IPP.PT
- @bcamarneiro

**Gustavo Lima**
- 1221349@ISEP.IPP.PT
- @crymE-L

**Arsénio Ferraz**
- 1010137@ISEP.IPP.PT
- @arsenioferraz-trp

</div>
<div>

**César Vieira**
- 1241523@ISEP.IPP.PT
- @DarkGusta

**Rui Soares**
- 1221283@ISEP.IPP.PT
- @ruisoares283

<br><br>

**Master's in AI Engineering @ ISEP**
Focus: AI for Cybersecurity

</div>
</div>

---

## Overview

**Problem:** Phishing attacks increasingly sophisticated, traditional blacklists insufficient

**Solution:** Two expert systems using different reasoning paradigms

<div class="columns">
<div>

### Project 1: Java + Drools
- Production rules system
- Forward-chaining
- REST API (Spring Boot)
- `.drl` rule files

</div>
<div>

### Project 2: Python + Prolog
- Logic programming
- Backward-chaining
- Full-stack (FastAPI + React)
- `.pl` knowledge base

</div>
</div>

---

## Architecture 1: Java + Drools
**Standalone REST API**

```
┌───────────────────────────────────────────┐
│     REST API (Spring Boot :8080)          │
│                                           │
│  /evaluate ──▶ PhishingService            │
│                     │                     │
│              ┌──────▼────────┐            │
│              │ Drools Engine │            │
│              │ (KieSession)  │            │
│              │  • rules.drl  │            │
│              │  • Forward ⟶  │            │
│              └──────┬────────┘            │
│                     │                     │
│                 Conclusion                │
└───────────────────────────────────────────┘
```

**Key:** Data → Rules → Conclusion (reactive)

---

## Architecture 2: Python + Prolog
**Full-Stack Application**

```
┌─────────────────────────────────────┐
│   Frontend (React :3000)            │
│   UrlSearch │ Persona │ Rules       │
└──────────────┬──────────────────────┘
               │ HTTP POST
┌──────────────▼──────────────────────┐
│   Backend (FastAPI :8000)           │
│                                     │
│  ┌──────────┐     ┌──────────┐     │
│  │ Prolog   │     │ Drools   │     │
│  │ Engine   │     │ Mock     │     │
│  │(pyswip)  │     │          │     │
│  └────┬─────┘     └────┬─────┘     │
│       └────┬───────────┘            │
│            ▼                        │
│       DNS Service                   │
└─────────────────────────────────────┘
```

**Key:** Goal ← Rules ← Facts (query-driven)

---

## Architectural Comparison

| Aspect | Java + Drools | Python + Prolog |
|--------|---------------|-----------------|
| **Deployment** | Single JAR | Multi-service |
| **Reasoning** | Forward-chain | Backward-chain |
| **Interface** | REST API only | Full-stack + UI |
| **Language** | Java 17 | Python 3.11 |
| **Rules** | `.drl` files | `.pl` files |
| **Best for** | Pattern matching | Goal queries |

**Both:** Production-ready, tested with real phishing URLs, extensible

---

## Reasoning Paradigms

<div class="columns">
<div>

### Forward Chaining
#### (Drools)

```
Data → Rules → Goal
```

1. Start with facts
2. Match patterns
3. Fire rules
4. Derive conclusion

**Use when:** Data-driven, real-time event processing

</div>
<div>

### Backward Chaining
#### (Prolog)

```
Goal ← Rules ← Data
```

1. Start with goal
2. Work backwards
3. Prove hypothesis
4. Unification

**Use when:** Query-driven, logical reasoning

</div>
</div>

**Example:** Same logic, different paradigm!

---

## Rule Example: Comparison

**Drools (Forward):**
```drools
rule "Detect @ in URL"
when
    $e : Evidences(hasAtChar == "yes")
then
    insert(new Hypothesis("AT_CHAR_PRESENT", 30));
end
```

**Prolog (Backward):**
```prolog
% Rule 202: @ character present
regra(202, URL, 30, "@ character in URL") :-
    url_contains_at(URL, 1).
```

---

## Key Features

<div class="columns">
<div>

### Java + Drools
- Evidence collection
- WHOIS/TLS integration
- Playwright DOM analysis
- Concurrent testing
- **Performance:** 100+ URLs in ~40s

</div>
<div>

### Python + Prolog
- 20+ rules (6 categories)
- DNS infrastructure checks
- Smart gating logic
- Interactive UI
- **Dual engines:** Compare Prolog vs Drools

</div>
</div>

**Both validated with real phishing URLs from OpenPhish**

---

## Live Demonstration

**Project 1 - Java API:**
```bash
curl -X POST http://localhost:8080/evaluate \
  -H 'Content-Type: application/json' \
  -d '{"url": "http://suspicious-site.com"}'
```

**Project 2 - Python UI:**
- Open `http://localhost:3000`
- Toggle between Prolog/Drools engines
- See live rule highlighting

---

## Key Learnings

**1. Paradigm Selection Matters**
- Forward-chain: Best for reactive, pattern-matching
- Backward-chain: Best for goal-oriented queries

**2. Architecture Tradeoffs**
- Monolithic (Java): Simpler deployment
- Microservices (Python): Better separation

**3. Testing with Real Data Essential**
- OpenPhish feed invaluable
- Automated testing crucial
- Performance testing reveals bottlenecks

---

<!-- _class: invert -->
# Thank You!

## Questions & Discussion

**Links:**
- Python+Prolog: github.com/Phish-N-Chips25/challenge-1-poc
- Documentation: github.com/Phish-N-Chips25/docs

**Key Contributions:**
✅ Two production-ready expert systems
✅ Different reasoning paradigms compared
✅ Real-world validation
✅ Extensible architectures
