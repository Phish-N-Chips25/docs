# Preparation Guide - Expert meeting #001

## Overview

This document outlines detection methods and implementation approaches for phishing URL detection, along with critical analysis of their limitations and challenges. The goal is to prepare informed questions for an expert consultation on building a practical phishing detection system.

---

## Detection Methods

### 1. Basic URL Analysis

**What to detect:**

- **Length**: Very long URLs or with excessive parameters
- **Spelling**: Domains imitating well-known brands (e.g., `paypa1.com`)
- **Subdomains**: Brand names in subdomains of different domains (e.g., `login.secure.paypal.com.badsite.ru`)
- **IP addresses**: Direct IP addresses instead of domain names
- **Suspicious TLDs**: Top-level domains with higher abuse rates

**Implementation approaches:**

- Compare against top 1000 domains (Alexa/SimilarWeb)
- Use edit distance algorithms (Levenshtein distance)
- Detect character substitutions (0→O, 1→l, 5→S)
- Regex patterns for IP detection
- Maintain TLD reputation databases

**Key challenges:**

- URL shorteners complicate length analysis
- Requires maintaining updated brand lists
- Legitimate sites use many subdomains (CDNs, microservices)
- Some legitimate services use IPs (internal tools)
- TLD bias - legitimate sites use newer TLDs too

### 2. Reputation Analysis

**What to detect:**

- **Domain age**: New domains often used for phishing
- **Registration country**: Geographic patterns of abuse
- **DNS servers**: Suspicious or bulletproof hosting providers
- **Blacklist status**: Known malicious domains

**Implementation approaches:**

- Query WHOIS databases for registration info
- Check multiple blacklist APIs (Google Safe Browsing, PhishTank, OpenPhish)
- Maintain local cache for performance
- Handle API rate limits

**Key challenges:**

- Privacy protection services hide real registration data
- Legitimate new domains exist (startups, product launches)
- Blacklists have false positives
- New threats aren't immediately listed
- API dependencies and downtime

### 3. Content Analysis

**What to detect:**

- **SSL/TLS certificates**: Validity, issuer reputation, self-signed certificates
- **Visual mimicry**: Pages copying login pages of known services
- **Suspicious code**: JavaScript that captures input or performs hidden redirects

**Implementation approaches:**

- Check certificate validity and transparency logs
- Screenshot comparison and OCR text analysis
- Visual similarity algorithms and brand logo detection
- Static code analysis for obfuscated JavaScript
- Analyze form submissions and redirects

**Key challenges:**

- Many legitimate sites use free certificates (Let's Encrypt)
- Some phishing sites use valid certificates
- Requires maintaining comprehensive brand databases
- Modern websites use complex JavaScript legitimately
- Obfuscation is common for performance, not just malicious purposes

### 4. Behavioral Analysis

**What to detect:**

- **Sandbox behavior**: Execute site in isolated environment and observe
- **Network traffic**: Connections to IPs/domains with poor reputation

**Implementation approaches:**

- Use headless browsers (Selenium, Playwright)
- Monitor network requests and track redirects
- Analyze JavaScript execution
- Check outbound connections against IP reputation databases
- Analyze traffic patterns (timing, volume, destinations)

**Key challenges:**

- Resource intensive and slow (minutes per site)
- Sophisticated attackers can detect and evade sandboxes
- Some sites block automated access or require CAPTCHAs
- Legitimate sites connect to many external services
- Privacy concerns with traffic monitoring
- Legal issues with automated access

---

## Implementation Approaches

### Rule-Based Systems

- **How**: Manually define detection rules based on the methods above
- **Example**: "if URL length > 100, then flag as suspicious"
- **Pros**: Fast, transparent, easy to understand
- **Cons**: Requires manual updates for new threats, limited adaptability

### Machine Learning / Heuristics

- **How**: Automatically learn patterns from detection methods
- **Process**: Extract URL features → train models with datasets → automatic classification
- **Datasets**: PhishTank, UCI ML datasets
- **Pros**: Adapts to new threats, processes large volumes
- **Cons**: Requires training data, can be opaque, needs ongoing maintenance

### Hybrid Approaches

- **How**: Combine rule-based systems with ML
- **Strategy**: Use rules for obvious cases, ML for complex/uncertain cases
- **Pros**: Leverages strengths of both approaches
- **Cons**: More complex to implement and maintain

---

## Critical Analysis & Research Gaps

### What We Don't Know

- **URL length thresholds**: No definitive research-backed thresholds
- **Subdomain counts**: No proven suspicious level counts
- **Domain age limits**: "30 days" is commonly assumed but not research-backed
- **TLD bias**: Some TLDs have higher abuse rates, but legitimate sites use them too

### Common False Positives

- **Legitimate long URLs**: URL shorteners, complex applications
- **New domains**: Startups, product launches, domain transfers
- **Privacy protection**: Many legitimate sites use WHOIS privacy
- **Complex JavaScript**: Modern sites use obfuscation for performance
- **External connections**: CDNs, analytics, ads, third-party services

### Implementation Challenges

- **Resource requirements**: Behavioral analysis is computationally expensive
- **Evasion techniques**: Sophisticated attackers can detect and avoid analysis
- **Maintenance overhead**: Requires constant updates to databases and rules
- **Legal/privacy issues**: Automated access and traffic monitoring concerns
- **API dependencies**: External services can be down or rate-limited

---

## Questions to Ask the Expert

### Project Scope & Approach

1. **Which detection methods should we prioritize for our project scope?**
   - *Initial recommendation*: Start with Basic URL Analysis + Reputation Analysis for fast implementation

2. **Which implementation approach makes the most sense - rule-based, ML, or hybrid?**
   - *Consideration*: Rule-based for quick MVP, ML for scalability, hybrid for best of both worlds

3. **Should we focus on a practical proof of concept (plugin) or academic analysis (ML model)? (maybe question to a teacher)**
   - *Consideration*: Practical proof of concept provides immediate user value and easier validation

### Technical Implementation

1. **Which datasets or tools do you recommend to start with?**
   - *Suggested resources*: PhishTank (training data), Google Safe Browsing API (real-time), URLVoid (reputation), Selenium/Playwright (content analysis)

2. **How can we integrate static detection (URL features) with dynamic detection (sandbox/traffic analysis)?**
   - *Approach*: Use static detection as first filter, then dynamic analysis for suspicious URLs

3. **What are the actual thresholds used in practice for domain age, URL length, subdomain counts?**
   - *Need*: Research-backed numbers, not assumptions

### Legal & Ethical Considerations

1. **What legal/ethical limitations should we consider when collecting and testing phishing URLs?**
   - *Key considerations*: Only test on owned URLs or with permission, use sandboxed environments, respect robots.txt and rate limits, consider data privacy regulations (GDPR, etc.)

2. **How do you handle false positives from blacklists and reputation services?**
   - *Challenge*: Legitimate sites can be incorrectly flagged

### Real-World Challenges

1. **How do you deal with sophisticated attackers who can detect and evade sandboxes?**
   - *Challenge*: Advanced evasion techniques

2. **What's the best way to maintain brand databases and keep detection rules updated?**
    - *Challenge*: Ongoing maintenance requirements

---

## Next Steps

### Immediate Actions

- Choose an initial approach based on expert's advice
- Define the project scope and requirements
- Collect an initial dataset of benign and malicious URLs
- Create an incremental development plan (MVP → gradual improvement)

### Additional Considerations

- **Threat modeling**: Define what types of phishing attacks to prioritize
- **Performance requirements**: Clarify real-time vs batch processing needs
- **User experience**: Plan for handling false positives/negatives in the UI
- **Deployment strategy**: Consider how the detection system will be deployed and updated

---

## Key Takeaways

1. **No silver bullets**: All detection methods have significant limitations
2. **False positives are inevitable**: Legitimate sites can trigger suspicious behavior alerts
3. **Research gaps exist**: Many "common knowledge" thresholds lack proper research backing
4. **Implementation complexity**: Real-world systems require careful handling of edge cases
5. **Ongoing maintenance**: Detection systems need constant updates and monitoring

This preparation should enable a productive discussion with the expert about practical implementation challenges and realistic expectations for a phishing detection system.
