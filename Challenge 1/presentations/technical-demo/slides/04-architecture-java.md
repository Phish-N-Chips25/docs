## ENGCIA: Java + Drools Architecture
**Knowledge Engineering Approach**

```
┌────────────────────────────────────────────────────────┐
│            REST API (Spring Boot :8080)                │
│                                                        │
│  POST /evaluate                                        │
│       │                                                │
│       ▼                                                │
│  PhishingController ──▶ UrlAnalysisService            │
│                              │                         │
│                              ▼                         │
│         ┌─────────────────────────────────┐           │
│         │   Evidence Collection Layer     │           │
│         │  • UrlFeatureService            │           │
│         │  • DnsAnalysisService           │           │
│         │  • PageAnalysisService (DOM)    │           │
│         │  • WhitelistService             │           │
│         │  • RedirectChainService         │           │
│         └──────────┬──────────────────────┘           │
│                    │ Evidences                         │
│                    ▼                                   │
│         ┌──────────────────────┐                      │
│         │   PhishingService    │                      │
│         │   (Drools Engine)    │                      │
│         │   • KieSession       │                      │
│         │   • rules.drl        │                      │
│         │   • Forward-chain ⟶  │                      │
│         └──────────┬───────────┘                      │
│                    │ Conclusion                        │
│                    ▼                                   │
│              JSON Response                             │
└────────────────────────────────────────────────────────┘
```
