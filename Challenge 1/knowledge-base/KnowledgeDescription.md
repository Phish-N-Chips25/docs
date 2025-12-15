# Knowledge Description based on the meeting with the expert

The first step in the diagnosis is to decide **whether the assessment can be completed using only the URL itself** (static analysis) **or whether analysis of the destination is necessary** (rendering/inspection of HTML and behaviour). If the signals obtained from the URL are sufficient for an informed decision, the classification is made at this stage. Otherwise, proceed to analyze the content and behavior of the page.

## Phase 1 — URL analysis (pre-fetch)  

If the URL host is a literal IP address, this is considered a strong risk signal, although it is currently uncommon in real campaigns, ocurring mostly in legitimately internal development environments. If the domain includes **alternative alphabets/IDNs** (e.g., Cyrillic) or **homoglyphs** that mimic well-known brands, the risk increases significantly. If the **domain new** (short registration age) or associated with disposable campaigns, the risk is also high.  

The presence of **redirect chains** (including shorteners) and **opaque/encrypted parameters** in the query string, such as long segments that appear to be base64, it reinforces suspicion and generally prompts an escalation to Phase 2. **Excessive subdomains**, **very long URLs**, and **suspicious tokens** in the path/parameterization (e.g., _login, verify, reset, secure, update, bank, free, account_) increase the risk, especially when combined with each other or with brand similarities.

As for **HTTPS**, its presence is **no longer a distinguishing factor** since free certificates are ubiquitous). Furthermore, the **absence of HTTPS** does not, by iteself, determine phishing, but it is **aggravated** if it coexists with credential collection. Email/domain configuration signals (SPF/DMARC/DKIM, MX) can be consulted, but **have limited relevance** given current automation. **Hosting on CDNs** or generic platforms like forms and page builders **is not conclusive** and usually requires content verification.

### Combinatorial rules in Phase 1  

- If the **domain is recent** ***and*** there are **credential tokens** in the path, it is considered a **strong indication** of phishing.
- If there is **IDN/homoglyph** ***and*** **brand similarity**, the indication is strong.
- **Two or more redirects** combined with (***and***) **opaque parameters** reinforce the suspicion.
- **Literal IP** in the _host_ without legitimate internal context weighs heavily.
- **Allowlists** **reduce risk**, but **do not override** critical evidence of brand abuse or credential harvesting. Moreover they should have periodic **expiration and review**.

## Phase 2 — Destination analysis (post-fetch)

If a decision could not be made in Phase 1, the expert system should render and inspect the **HTML/DOM**. 
If **forms requesting credentials/OTP** ***or*** **exfiltration** patterns (e.g.: suspicious external endpoints, beacons) are detected, the risk increases substantially. 
If **iframes**, **obfuscated JavaScript**, **interaction blocking** such has right-click disabling ***or*** **auto-submission** behaviours are present, the suspicion is reinforced.

If **branded visual elements** (logo, favicon, typography) **are not served from the canonical source** or there is **high visual similarity** to well-known brands, using perceptual comparison, this is a strong indication. It is also important to check for **final redirect chains**, unusual **CSP/CORS** and **mixed content**.
When the URL has been extracted from **emails**, **rendering the email HTML** and visually analysing the landing page can help to confirm the decision.

## Decision, weights, and conflict resolution

The decision is supported by a **risk score** (0–100) derived from weights assigned to key signals: domain age, IDN/homoglyph/brand similarity, IP in host, suspicious tokens, number of redirects, opaque parameters, length/subdomains, reputation/allowlist, hosting platform, presence of credential forms, and signs of exfiltration.

**Recommendations:**
- **$\geq$ 80 = phishing**;
- **50-79 = suspicious (review/alert)**;
- **$\lt$ 50 = legitimate** (with monitoring).

In the case of **contradictory signals** (e.g., **valid HTTPS vs. strong brand imitation**), **signals of content and identity abuse prevail** over weak indicators such as the mere presence of TLS.

### Exceptions and false positive control

**Legitimate cases** that violate common rules should be considered:
- IPs in **internal/QA** environments;
- **CDNs** and **shared platforms** hosting legitimate pages;
- Corporate shorteners and internal collection forms.

In these scenarios, the decision should be based on multiple signals and, when necessary, **require human review**. The expert emphasised the need for context-appropriate **false positive tolerance** and **threshold adjustment** by source (email, chat, QR, etc.).

### Support sources and operations

For validation and additional context, **Microsoft Defender for Office**, **VirusTotal**, **MX Toolbox**, **Cisco Talos**, and domain checks (**WHOIS/RDAP**) can be consulted.
These tools **do not replace** rule-based assessment, but **reinforce** the decision.
Additionally, the expert agreed on **sharing anonymized real examples** (benign and malicious) and **metrics from internal simulation campaigns** for **training, threshold calibration, and borderline testing**.

## Explanation to the user

The system output should include **clear and technical justification**, for example:
`Domain created 7 days ago, contains “login”, uses 3 redirects and loads credential form; HTTPS present does not reduce risk`.
The language should avoid ambiguous terms, favoring **clarity** and **practical guidance** (block, warn, allow with monitoring).

## Operational summary

1. **Decide on the phase**: URL-only vs. destination.
2. **Apply combinatorial rules** in Phase 1 (age, IDN, tokens, IP, redirects, parameters).
3. **If necessary**, escalate to Phase 2 and analyze **DOM/behaviour** (forms, exfiltration, brand similarity).
4. **Weighted aggregation** → **score** → **class** (phishing/suspicious/legitimate) with **explanation**.
5. **Handle exceptions**, **review borderline cases** and **update** the knowledge base with real examples and simulation results.