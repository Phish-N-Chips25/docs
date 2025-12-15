# State of the Art on Malicious Address Detection in Web Applications

The detection of malicious addresses in web applications has evolved significantly in recent years, moving from simple blacklists to sophisticated systems based on static URL analysis, dynamic DOM examination, and DNS infrastructure analysis. Recent literature highlights multifaceted approaches that combine structural URL characteristics, redirection behavior, fully rendered DOM analysis, and correlation of multiple threat intelligence sources, supported by rule frameworks and real-time tools.

## 1. Static URL Analysis (Phase 1)

Pre-fetch URL analysis enables identifying risk signals before loading additional content. Patil & Dhage[1] proposed an anti-phishing framework that extracts characteristics such as URL length, presence of suspicious parameters, and domain age. Aravindhan et al.[2] demonstrated that combining indicators (credential tokens, number of subdomains, IDNs/homoglyphs) significantly increases detection accuracy.

**Recent advances in 2023-2024** include the development of hybrid methods that combine static analysis with machine learning techniques. Nishitha et al. (2023)[3] proposed a hybrid model integrating Back Propagation Neural Network (BPNN) with XGBoost for URL-based feature analysis, achieving 97.5% precision in phishing detection. Analyzed characteristics include URL length, number of dots, presence of IP addresses, HTTPS protocol usage, '@' and '//' symbols, hyphen usage, domain age, and presence of URL shortening services.

## 2. Redirection Discovery and Open Redirects

HTTP redirections are widely exploited to mask malware servers. Mekky et al.[4] used decision tree-based classifiers to distinguish malicious chains. Wang & Wu[5] developed the URFDS system to identify unvalidated redirections in web applications, while Martinho et al.[6] launched the ORAT tool for automated Open Redirect vulnerability testing.

Modern redirection analysis incorporates graph analysis and navigation tree techniques to reconstruct complete redirection chains, enabling identification of suspicious behavioral patterns that may indicate malicious activity.

## 3. DOM Analysis and Dynamic Behavior (Phase 2)

### 3.1 DOM Analysis Techniques

Fully rendered DOM analysis represents a significant evolution in web threat detection, capturing indicators that do not appear in static HTML. This approach examines page content after JavaScript execution and complete rendering.

**Implementable DOM analysis rules:**

- **C1.A – Sensitive Input Fields**: detection of `<input type="password">`, `<input name="username">`, and `autocomplete="credit-card"` fields, adding high weight to phishing score.
- **C1.B – Data Exfiltration Analysis**: monitoring of AJAX requests and handlers that exfiltrate data to external domains.
- **C2.A – Link Features**: calculation of (L_null + L_external)/L_all ratio for `<a>`, `<img>`, `<link>` elements.
- **C3.B – DOM Entropy**: Shannon entropy of rendered text, with threshold at 5.2 (value < 5.2 indicates suspicious pattern).
- **C4.B – Page Title Obfuscation**: analysis of `<title>` for random strings or absence of brand name.

### 3.2 Dynamic Behavioral Analysis

Recent studies emphasize the importance of real-time behavioral analysis. Rose et al. (2022)[7] developed browser extensions that monitor post-rendering DOM and network activity to detect phishing in real-time. This approach enables identifying dynamic DOM modifications that may indicate malicious activity.

## 4. Browser Extensions and Real-Time Tools

Tools like the Chrome extension by Rose et al.[7] monitor post-rendering DOM and network for real-time phishing detection. "Somethingphishy" (Peren et al., 2025)[8] applies logistic regression for dynamic URL classification, integrating static and dynamic analysis phases for maximum coverage.

The integration of real-time analysis with machine learning techniques enables continuous adaptation to new threats, providing dynamic protection against zero-day attacks.

## 5. Advanced Machine Learning and Deep Learning

### 5.1 Ensemble Learning Techniques

Omolara et al. (2025)[9] proposed the DaE2 (Diverse and Efficient Ensemble) model, which intelligently combines multiple machine learning algorithms. This heterogeneous ensemble optimizes base model selection, maximizes complementarity between algorithms, and minimizes computational costs.

Abad et al. (2023)[10] demonstrated the effectiveness of Random Forests in malicious URL classification, combining Support Vector Machines (SVMs), Decision Trees (DTs), and k-Nearest Neighbors (KNNs) with Bayesian optimization. Results show that RFs offer high precision, recall, and F1-scores, while SVMs provide competitive performance with longer training time.

### 5.2 Natural Language Processing (NLP)

Çelik et al. (2025)[11] developed a pioneering NLP-based approach for phishing detection in financial systems. The method combines semantic similarity analysis with TF-IDF (Term Frequency-Inverse Document Frequency) to identify keywords in phishing emails, achieving 79.8% precision in TF-IDF analysis and 67.2% in semantic analysis.

The application of NLP techniques enables contextual analysis of web content, identifying suspicious linguistic patterns that may indicate phishing attempts or other threats.

## 6. DNS Infrastructure and Domain Analysis

DNS research focuses on spoofing vulnerabilities and graph analysis:

- Jony et al.[12] explored DNS spoofing threats in LANs.
- Varshney & Shah[13] proposed DNS policies for detecting malicious modifications.
- Ishida et al.[14] employed DNS graphs associated with digital certificates to detect phishing.
- Bayer et al.[15] created resilient whitelists to reduce false positives.
- Murakami et al.[16] and Takanashi & Kimura[17] investigated DoT and DoH protocols for secure name resolution.

## 7. Multi-Source Intelligence and Advanced Systems

### 7.1 Threat Intelligence Integration

Recent systems combine multiple threat intelligence sources (VirusTotal, Cisco Talos, PhishTank) and domain data. Hranický et al. (2024)[18] combined multi-source data and statistical models for robust phishing detection, demonstrating that correlation of different information sources significantly increases detection accuracy.

### 7.2 Advanced Scoring Systems

The development of sophisticated scoring systems enables gradual threat classification:
- Score 0-49: Legitimate URLs
- Score 50-79: Suspicious URLs (requires additional analysis)
- Score 80-100: Malicious URLs (immediate blocking)

## 8. Specific Contexts and Edge Computing

Rashmitha & Sumana[19] demonstrated fraud detection in edge computing, applying phishing rules on resource-constrained devices. This approach is particularly relevant for IoT and mobile devices where computational resources are limited.

Gupta & Kumaraguru[20] analyzed the effectiveness of anti-phishing landing pages and evolution of evasion techniques, providing insights on how attackers adapt their strategies to circumvent security measures.

## 9. Emerging Trends and Future Challenges

### 9.1 Artificial Intelligence and Adaptive Threats

The ENISA Threat Landscape 2024 report[21] identifies seven main cybersecurity threats, with availability threats leading, followed by ransomware and data threats. The democratization of AI technologies through public Large Language Models (LLMs) is being exploited by attackers to sophisticate their techniques.

### 9.2 Evolution of Phishing Techniques

The Kroll Q4 2024 report[22] confirms that 2024 was a year of fragmentation and rapid evolution for cyber threats. Email compromise emerged as the most commonly observed threat type, while ransomware attacks, although diminished in volume, continue to be a serious threat to sectors like financial services and healthcare.

### 9.3 Vulnerability Analysis

The Qualys report[23] shows that the number of reported CVEs increased from 14,249 in 2022 to 22,254 in 2024, representing 56% growth. Only 0.91% of these vulnerabilities were weaponized, highlighting the importance of risk-based prioritization.

## 10. Technical Implementation: Prolog & Drools

### 10.1 Biphasic Analysis Model

The biphasic analysis model (Phase 1: URLs; Phase 2: DOM) can be efficiently implemented with Prolog and Drools rules:

**Phase 1 - Static Analysis (Prolog):**
```prolog
url_malicious(URL) :-
    url_length(URL, Length), Length > 75,
    suspicious_patterns(URL),
    domain_age(URL, Age), Age < 30.
```

**Phase 2 - Dynamic Analysis (Drools):**
```java
rule "Sensitive Input Detection"
when
    $page: WebPage(containsPasswordFields == true)
    $page: WebPage(containsUsernameFields == true)
then
    modify($page) { addRiskScore(25) }
end
```

### 10.2 Implementation Framework

It is recommended to initially focus on "implementable" rules (C1.A, C1.B, C2.A, C3.B, C4.B) and integrate weighted scoring inspired by existing frameworks. The integration of dynamic whitelists and digital certificate verification reinforces system robustness without relying exclusively on ML or LLM.

### 10.3 System Architecture

The recommended architecture combines:
1. **Prolog Rules Engine** for static URL analysis
2. **Drools System** for dynamic DOM rules
3. **Threat Intelligence Interface** for external data
4. **Scoring System** for risk classification
5. **Integration API** for external systems

## Conclusions

The detection of malicious addresses in web applications represents a constantly evolving domain, where the combination of multiple techniques - from static URL analysis to dynamic DOM examination and threat intelligence integration - provides the best protection. Recent advances in machine learning, especially ensemble and NLP techniques, offer new opportunities to improve detection accuracy.

Effective implementation requires a holistic approach that combines pre-fetch static analysis, dynamic DOM monitoring, integration of multiple data sources, and adaptive capabilities to respond to emerging threats. The development of Prolog and Drools-based frameworks offers a promising solution for practical implementation of these advanced techniques.

Future trends point to the need for more adaptive and intelligent systems, capable of responding in real-time to constantly evolving threats, while maintaining computational efficiency and low false positive rates.

---

## Bibliographical References

[1] Patil, D. R., & Dhage, S. N. Framework for anti-phishing: URL feature extraction and classification.

[2] Aravindhan, K., et al. Enhanced phishing detection through comprehensive URL analysis and machine learning techniques.

[3] Nishitha, U., et al. (2023). "Phishing Detection Using Machine Learning Techniques." IEEE Conference Proceedings.

[4] Mekky, H., et al. Detecting malicious HTTP redirections using trees of user browsing activity.

[5] Wang, R., & Wu, S. URFDS: Automatic detection of unvalidated redirects and forwards in web applications.

[6] Martinho, D., et al. ORAT: Automatic testing tool for open redirect vulnerabilities.

[7] Rose, S., et al. (2022). Real-time phishing detection through browser extension monitoring of DOM and network activity.

[8] Peren, J., et al. (2025). "Somethingphishy": Dynamic URL classification using logistic regression.

[9] Omolara, A.E., et al. (2025). "DaE2: Unmasking malicious URLs by leveraging diverse and efficient ensemble machine learning." Computers & Security, Vol. 147.

[10] Abad, S., et al. (2023). "Classification of Malicious URLs Using Machine Learning." PMC Journal of Cybersecurity Research.

[11] Çelik, L., et al. (2025). "Enhancing Phishing Detection in Financial Systems through Natural Language Processing." arXiv preprint arXiv:2507.04426.

[12] Jony, M. H., et al. DNS spoofing threats and countermeasures in local area networks.

[13] Varshney, G., & Shah, M. DNS-based security policies for detecting malicious domain modifications.

[14] Ishida, S., et al. Phishing detection using DNS graphs and digital certificate correlation.

[15] Bayer, U., et al. Building resilient whitelists for reducing false positives in malicious URL detection.

[16] Murakami, T., et al. Security analysis of DNS over TLS (DoT) protocol implementations.

[17] Takanashi, M., & Kimura, H. DNS over HTTPS (DoH): Security implications and deployment considerations.

[18] Hranický, R., et al. (2024). "Multi-source threat intelligence integration for robust phishing detection." Journal of Network Security, Vol. 28, No. 3.

[19] Rashmitha, K. R., & Sumana, M. Fraud detection in edge computing environments using lightweight phishing rules.

[20] Gupta, S., & Kumaraguru, P. Effectiveness of anti-phishing landing pages and evolution of evasion techniques.

[21] ENISA (2024). "ENISA Threat Landscape 2024." European Union Agency for Cybersecurity, September 2024.

[22] Kroll (2024). "Q4 2024 Cyber Threat Landscape Report: Gone Phishing." Kroll Cyber Risk Intelligence, December 2024.

[23] Qualys (2024). "Cybersecurity Threat Landscape 2024 Midyear Review." Qualys Security Research Team, August 2024.