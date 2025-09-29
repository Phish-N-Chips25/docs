# Preparation Guide - Expert meeting #001

## 1. Basic URL Analysis

- **Length**: Very long URLs or with excessive parameters.
- **Spelling**: Domains imitating well-known brands (e.g., `paypa1.com`).
- **Subdomains**: e.g., `login.secure.paypal.com.badsite.ru`.
- **IP in the domain**: Use of IP addresses instead of domain names.
- **Suspicious TLDs**: `.xyz`, `.top`, etc. (not always malicious, but common).

## 2. Reputation Analysis

- **WHOIS & DNS**: Domain age, registration country, DNS servers.
- **Blacklists**: Google Safe Browsing, PhishTank, OpenPhish.

## 3. Content Analysis

- **SSL/TLS certificate**: Validity and issuer.
- **Visual copy**: Pages mimicking login pages of known services.
- **HTML/JS code**: Scripts that capture input or perform hidden redirects.

## 4. Behavioral Analysis

- **Sandboxing**: Execute the site in an isolated environment and observe behavior.
- **Network traffic**: Connections to IPs/domains with poor reputation.

## 5. Machine Learning / Heuristics

- Extract URL *features* (length, entropy, number of parameters, etc.).
- Train models with public datasets (PhishTank, UCI ML datasets).
- Automatic classification: phishing vs. benign.

---

## Questions to Ask the Expert

1. Which of these approaches make the most sense for the scope of our project?  
2. Should we focus on a **practical proof of concept** (e.g., a plugin that alerts the user) or on an **academic analysis** (ML model, comparison of methods)?  
3. Which datasets or tools do you recommend to start with?  
4. How can we integrate static detection (URL features) with dynamic detection (sandbox/traffic analysis)?  
5. What legal/ethical limitations should we consider when collecting and testing phishing URLs?

---

## Next Steps

- Choose an initial approach (basic, reputation, or ML).  
- Define the project scope based on the expert’s advice.  
- Collect an initial dataset of benign and malicious URLs.  
- Create an incremental development plan (MVP → gradual improvement).  
