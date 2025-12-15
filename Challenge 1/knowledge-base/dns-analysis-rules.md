# Formalized DNS Rules

## A) DNS × Lexical (URL) — Phase-1 fusion

### A1. Young Domain + Credential Intent

- **IF** WHOIS/RDAP age ≤ 30 days **AND** URL shows credential tokens (e.g., `login/verify/reset`) (**URL Rule**).
    
- **THEN** add **+25** risk (strong early phish cue).
    
- **Escalate?** If redirects ≥ 2 **or** opaque/encoded blobs exist, escalate to Phase-2 if score < 80.
    
- **Complexity:** **Easy** (requires age lookup + URL tokens).
    
- **Example:** `brand-secure-update[.]xyz/register` (age 7d; token `update`).
    

### A2. Homoglyph/IDN + Off-brand NS

- **IF** domain has confusables/IDN or leet substitutions (**URL Rule**) **AND** authoritative NS are **not** in brand’s bailiwick (brand claim inferred from URL tokens/title/host).
    
- **THEN** add **+20** risk; likely impersonation infra.
    
- **Escalate?** Yes → DOM brand checks (logo/text) and foreign-media ratios.
    
- **Complexity:** **Medium** (NS in-bailiwick check) (LogoTrust might help on this).
    
- **Example:** `app-micrоsоft[.]com` (IDN confusables) serving via `ns1.randomhoster[.]com`.
    

---

## B) DNS × Redirects — Phase-1 fusion

### B1. Low-TTL + Multi-Domain Redirect Chain

- **IF** share TTL<100 ≥60% **AND** redirect chain’s **domain diversity ratio ≥ 0.6** (R1.B) or **depth ≥ 3** (R1.A) .
    
- **THEN** add **+15** risk (ephemeral infra + evasive chain).
    
- **Escalate?** Yes, unless already ≥ 80.
    
- **Complexity:** **Medium** (need redirect crawl + TTLs).
    
- **Example:** 4 hops across 3 domains; TTL=30–60s.
    

### B2. Apex CNAME + Shortener in Chain

- **IF** zone apex (`@`) is **CNAME** **AND** at least one hop uses a known shortener (R1.C) .
    
- **THEN** add **+10** risk (throwaway config + obfuscation).
    
- **Escalate?** If URL has opaque blob or credential tokens.
    
- **Complexity:** **Easy** (CNAME check + your shortener list).
    
- **Example:** `example[.]com CNAME app.host[.]io → bit.ly → final`.
    

### B3. Co-hosted with Known Phish + Chain Depth

- **IF** resolved IP/ASN co-hosts ≥3 known phishing domains (last 7 days) **AND** redirect depth ≥3 (R1.A).
    
- **THEN** add **+18** risk and consult external TI during scoring.
    
- **Escalate?** Optional; often enough for “suspicious”.
    
- **Complexity:** **Hard** (needs passive DNS/TI).
    
- **Example:** Same IP seen in OpenPhish/PhishTank + 4-hop chain.
    

---

## C) Pure DNS (standalone) — Phase-1

### C1. Suspicious TLD + Low DNS Hygiene

- **IF** TLD flagged suspicious **AND** no MX **AND** no SPF/DMARC TXT.
    
- **THEN** add **+15** risk (weak mail posture aggravates risky TLD).
    
- **Escalate?** Only if credential tokens **or** shorteners/redirect depth present.
    
- **Complexity:** **Easy**.
    
- **Example:** `.top/.xyz` domain, no MX/TXT, path `/account/verify`.
    

### C2. Excessive Subdomains/Deep Path + Low-TTL DNS

- **IF** `subdomainCount ≥ 4` **or** `pathDepth ≥ 6` **AND** ≥60% answers have TTL<100s.
    
- **THEN** add **+15** risk (kit-like infra + obfuscated URL).
    
- **Escalate?** If shorteners used or redirect depth ≥ 3.
    
- **Complexity:** **Medium** (collect TTL stats).
    
- **Example:** `login.auth.secure.client.gateway.brand-help[.]click/...` + TTL=60s.

### C3. DNSSEC Invalid Aggravator

- **IF** DNSSEC status **invalid** **AND** any of: brand similarity ≥0.7 (title/host/DOM text), credential tokens, or redirect depth ≥3.
    
- **THEN** add **+10** risk (integrity failure with abuse cues).
    
- **Complexity:** **Medium** (light RRset validation).
    
- **Example:** “Bank” look-alike; bogus RRSIGs.
    

### C4. CT Issuance Burst on New Domain

- **IF** age ≤14d **AND** ≥3 SAN/CN entries appear in CT within 72h **AND** CA diversity ≤1.
    
- **THEN** add **+12** risk (rapid certing for fresh domain).
    
- **Complexity:** **Hard** (CT polling/parse).
    
- **Example:** `auth.`, `login.`, `secure.` all certed same day by one CA.
    

### C5. Low IP/ASN Diversity + Low TTL (“Flash infra”)

- **IF** unique A/AAAA ≤1 **AND** ASN ≤1 **AND** TTL<100 share ≥50%.
    
- **THEN** add **+12** risk (disposable setup).
    
- **Complexity:** **Medium**.
    
- **Example:** single IP in single ASN, TTL=60.
    

### C6. NS Flap Early-Life

- **IF** NS changed ≥2× in first 14 days **OR** within 72h of first observation (and any other medium+ signal present).
    
- **THEN** add **+8** risk (operational instability).
    
- **Complexity:** **Hard** (history needed).
    
- **Example:** NS moved twice week-1.
    

### C7. Lame Delegation / SOA Mismatch

- **IF** delegated NS don’t answer authoritatively **OR** SOA primary inconsistent across auth set.
    
- **THEN** add **+6** risk; annotate low hygiene.
    
- **Complexity:** **Medium**.
    
- **Example:** `ns2` advertised but non-auth.
    

### C8. Allowlist Dampener (guard-railed)

- **IF** domain is allowlisted (unexpired) **AND** no high-confidence abuse cues (no strong brand similarity; no credential tokens).
    
- **THEN** Legitimate.
    
- **Complexity:** **Easy**.
    
- **Example:** internal corporate tool domain.