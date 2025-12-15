## PPROGIA: Knowledge Base & Reasoning

<div class="columns">
<div>

### Prolog Knowledge Base
**Declarative logic programming:**
- **20+ detection rules** across 6 categories:
  - URL structure (@ char, length, encoding)
  - DNS analysis (MX, SPF/DMARC, TTL)
  - Domain characteristics (age, IDN, DNSBL)
  - Redirect patterns (shorteners, chain depth)
  - DOM analysis (forms, links, entropy)
  - HTTP/TLS (scheme, certificates)
- **Fact predicates**: Modular `.pl` files
- **Backward-chaining**: Goal-driven inference
- **Gating logic**: Skip irrelevant checks

</div>
<div>

### Python Integration Layer
**Bridge between services & logic:**
- **Rule Engine**: Coordinates all analysis
- **DNS Service**: Live lookups (MX, A, CNAME, TTL)
- **DOM Analyzer**: Playwright-based page inspection
- **Redirect Follower**: Chain analysis (max 10 hops)
- **pyswip Bridge**: Python ↔ Prolog
- **Dual engine support**: Can also use Drools mock

</div>
</div>

### Tech Stack
- **Python** + **FastAPI** + **Prolog (SWI-Prolog)** + **pyswip**
- Multi-service architecture - DNS, DOM, inference separated
- Real-world validation with OpenPhish dataset
