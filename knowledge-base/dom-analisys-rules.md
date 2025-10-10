# DOM Analysis KB Rules

## Prerequisites for Analysis

**Mandatory Technical Requirement**: All analysis must be performed on a fully rendered DOM object after JavaScript execution. Modern websites universally use JavaScript, and malicious functionality is often obfuscated within JavaScript code. Static HTML analysis is insufficient and will miss critical phishing indicators.

## Category 1: Forms and Sensitive Information Harvesting

These rules target elements that attempt to capture credentials, indicating a primary phishing function.

### C1.A - Sensitive Input Fields Detection

**Technical Logic (Binary/Fuzzy):**
Binary Logic: Check if the fully rendered DOM object includes any of these sensitive input fields:
- **Authentication**: `<input type="password">`, `<input type="email">`, `<input name="username">`, `<input name="login">`
- **Payment Information**: `<input type="tel">` (phone), `<input name="card">`, `<input name="cvv">`, `<input name="expiry">`, `<input name="billing">`
- **Personal Data**: `<input name="ssn">`, `<input name="social">`, `<input name="dob">`, `<input name="address">`
- **Financial**: `<input name="account">`, `<input name="routing">`, `<input name="pin">`
- **Generic Sensitive**: Any input with `autocomplete="password"`, `autocomplete="credit-card"`, or similar sensitive autocomplete values

**Implementation:**
1. **Query DOM for input elements**: Use `document.querySelectorAll('input')` to find all input fields
2. **Check input types**: Look for `type="password"`, `type="email"`, `type="tel"`
3. **Check input names**: Search for sensitive name attributes (username, card, cvv, ssn, etc.)
4. **Check autocomplete attributes**: Look for sensitive autocomplete values
5. **Count sensitive fields**: Count total number of sensitive input fields found

**Scoring Logic:**
- **1+ sensitive fields**: Add positive weight (strong phishing indicator)
- **Multiple sensitive fields**: Increase weight multiplier (higher confidence)
- **No sensitive fields**: Add negative weight (legitimate site)

**Suggested Weight / Outcome:**
High Positive Weight (Direct Classification). If YES, this is a strong indicator. In a hierarchical decision model, this feature can lead directly down a classification path toward "phishing confirmed". Multiple sensitive fields increase the confidence score.

### C1.B - Data Exfiltration Analysis (Network Requests & Event Handlers)

**Technical Logic (Binary/Fuzzy):**
Quantified Feature (Data Exfiltration Score) / Fuzzy Logic: After full DOM rendering and JavaScript execution, monitor all network requests triggered by user interactions (form submissions, button clicks, input events). Analyze:
- **Network Requests**: Check if sensitive data (credentials, payment info) is sent to external domains or suspicious endpoints
- **Event Handlers**: Detect JavaScript event listeners attached to any element (not just forms) that could trigger data exfiltration
- **Dynamic Form Actions**: Check if form actions are modified by JavaScript after page load
- **AJAX/Fetch Requests**: Monitor programmatic requests that bypass traditional form submissions

**Implementation:**
1. **Monitor network requests**: Use browser dev tools or network monitoring to capture all requests
2. **Check request destinations**: Analyze where sensitive data is being sent (external vs internal domains)
3. **Detect event handlers**: Use `getEventListeners()` or similar to find attached JavaScript events
4. **Monitor form actions**: Check if form action attributes are modified by JavaScript
5. **Track AJAX requests**: Monitor XMLHttpRequest and fetch API calls for data exfiltration

**Scoring Logic:**
- **Data Exfiltration Score = +1**: If sensitive data is sent to external domains or suspicious endpoints (strong phishing indicator)
- **Data Exfiltration Score = -1**: If data stays within legitimate domains (legitimate behavior)
- **Data Exfiltration Score = 0**: If no sensitive data transmission detected

**Suggested Weight / Outcome:**
High Positive Weight (Quantified Feature). The Data Exfiltration Score is a strong signal because modern phishing often uses JavaScript to dynamically route data. A score of +1 should add significant weight to the final phishing probability calculation.

### C1.C - Semantic Cues (Urgency/Credential Language) ⚠️ **COMPLEX IMPLEMENTATION**

**Technical Logic (Binary/Fuzzy):**
**LLM-Based Analysis Required**: This detection requires sophisticated linguistic and contextual analysis that goes far beyond simple keyword matching. Modern phishing uses constantly evolving social engineering tactics and context-dependent phrasing to bypass basic rules.

**Implementation Requirements:**
- **Content Semantic Agent**: Dedicated LLM-based agent (e.g., PhishDebate framework) that performs natural language analysis of visible website content
- **Contextual Reasoning**: Must capture subtle manipulative language, urgency tactics, and social engineering cues that simple heuristics miss
- **Interpretable Output**: Returns classification (phishing/legitimate) with numerical confidence score (0-1) and supporting evidence
- **Beyond Keywords**: While attackers use known keywords like "login" or "virus", modern analysis must detect emotional manipulation, urgency indicators, and credential harvesting language through semantic understanding

**Suggested Weight / Outcome:**
Significant Contextual Weight. The LLM-based Content Semantic Agent returns a numerical confidence score (0 to 1) based on sophisticated language analysis. This score is fused with other features in the final determination. **Note: This requires advanced NLP infrastructure and is not suitable for simple rule-based implementations.**

## Category 2: External Resources and Links (Foreign Domain Usage)

These rules look for evidence that a site is importing legitimate brand assets while running the attack infrastructure from a different, potentially sketchy, domain.

### C2.A - Link Features (Null/Foreign Links)

**Technical Logic (Binary/Fuzzy):**
Quantified Feature ($F_2$): Count the total number of links ($L_{all}$), null links ($L_{null}$), and external links to other sites ($L_{external}$) from tags like `<a>`, `<img>`, `<link>`. Calculate the ratio of malicious links: $F_2 = (L_{null} + L_{external}) / L_{all}$.

**Implementation:**
1. **Extract all links**: Use `document.querySelectorAll('a, img, link')` to find all link elements
2. **Count total links**: Count all link elements found ($L_{all}$)
3. **Identify null links**: Count links with empty or null href/src attributes ($L_{null}$)
4. **Identify external links**: Count links pointing to different domains ($L_{external}$)
5. **Calculate ratio**: Compute $F_2 = (L_{null} + L_{external}) / L_{all}$

**Scoring Logic:**
- **High ratio (>0.7)**: Strong positive weight (highly suspicious)
- **Medium ratio (0.3-0.7)**: Moderate positive weight (somewhat suspicious)
- **Low ratio (<0.3)**: Negative weight (legitimate site)

**Suggested Weight / Outcome:**
Medium Positive Weight (Quantified Feature). The more null links and foreign links, the higher the probability that the page is phishing. A high ratio means a stronger phishing indication.

### C2.B - Dependent Request Ratio (Images/Media)

**Technical Logic (Binary/Fuzzy):**
Fuzzy Logic (Ratio): Calculate the ratio of images and other media originating from a domain different from the hosting domain. Phishing sites often request media (e.g., logos) from the legitimate source they are mimicking.

**Implementation:**
1. **Extract media elements**: Use `document.querySelectorAll('img, video, audio, source')` to find all media elements
2. **Get current domain**: Extract the current page's domain
3. **Check source domains**: For each media element, check if src/href points to external domain
4. **Count external vs internal**: Count external media resources vs internal ones
5. **Calculate ratio**: Compute ratio of external media to total media

**Scoring Logic:**
- **High ratio (>0.8)**: Strong positive weight (highly suspicious - likely phishing)
- **Medium ratio (0.4-0.8)**: Moderate positive weight (somewhat suspicious)
- **Low ratio (<0.4)**: Negative weight (legitimate site)

**Suggested Weight / Outcome:**
Medium to High Positive Weight. A high ratio (many external resources/few local ones) is an indicator of phishing. The scoring algorithm should increase the final weight as this ratio increases.

## Category 3: HTML/DOM Structure and Code Anomalies

These rules focus on the characteristics of the page's code and layout structure, analyzing the fully executed DOM object for structural patterns and anomalies.

### C3.A - Structural Homology/Similarity ⚠️ **COMPLEX IMPLEMENTATION**

**Technical Logic (Binary/Fuzzy):**
**Advanced Template Matching Required**: This rule requires comparing the DOM structure against known legitimate and malicious templates. It involves:
- **Template Database**: Maintaining databases of legitimate website structures and known phishing kit templates
- **Vector Extraction**: Converting DOM tree structures into mathematical vectors representing tags and CSS classes
- **Distance Calculations**: Computing similarity metrics between the suspicious page and reference templates
- **Machine Learning**: Training models to recognize structural patterns of phishing vs legitimate sites

**Simplified Alternative (Academic Context):**
Basic structural analysis focusing on obvious anomalies:
- **Unusual DOM Depth**: Phishing sites often have very shallow or very deep DOM structures
- **Missing Common Elements**: Legitimate sites typically have standard elements (headers, footers, navigation)
- **Excessive Div Nesting**: Phishing kits often use excessive `<div>` nesting without semantic meaning

**Suggested Weight / Outcome:**
High Weight (if implemented). **Note: Full implementation requires extensive template databases, machine learning infrastructure, and is not suitable for simple academic projects. Consider the simplified alternative for basic detection.**

### C3.B - DOM Entropy (Complexity Check)

**Technical Logic (Binary/Fuzzy):**
Fuzzy Logic (Measurement): Calculate Shannon entropy of all text content in the DOM. Phishing websites often use filler code, repetitive patterns, or long strings of random hex characters to obfuscate content, resulting in lower entropy values.

**Implementation:**
1. **Extract all text content** from the rendered DOM (excluding HTML tags)
2. **Calculate character frequency** for each character in the text
3. **Apply Shannon entropy formula**: $H = -\sum_{i} p_i \log_2(p_i)$ where $p_i$ is the probability of character $i$
4. **Compare against threshold**: Entropy > 5.2 suggests legitimate complexity, < 5.2 suggests suspicious patterns

**Scoring Logic:**
- **High Entropy (>5.2)**: Add negative weight (legitimate sites have varied, complex content)
- **Low Entropy (<5.2)**: Add positive weight (suspicious - may indicate filler/repetitive code)
- **Very Low Entropy (<3.0)**: Strong positive weight (highly suspicious patterns)

**Suggested Weight / Outcome:**
Medium Weight (Entropy-based Scoring). Low entropy values indicate suspicious content patterns and should increase the phishing score. This is a reliable indicator because legitimate websites typically have diverse, meaningful content while phishing sites often contain repetitive or obfuscated text.

### C3.C - Base64 Encoding Detection ⚠️ **COMPLEX IMPLEMENTATION**

**Technical Logic (Binary/Fuzzy):**
**Advanced Pattern Matching Required**: This rule requires sophisticated analysis of embedded content in the DOM. While Base64 encoding detection is conceptually simple, practical implementation involves:
- **Complex regex patterns**: Matching various Base64 formats across different HTML attributes and CSS properties
- **Resource counting**: Accurately distinguishing between Base64-encoded and external resources
- **Ratio calculations**: Computing meaningful ratios that account for different types of content
- **False positive handling**: Legitimate sites may use Base64 for small icons or performance optimization

**Simplified Alternative (Academic Context):**
Basic suspicious pattern detection:
- **Excessive inline styles**: Look for pages with unusually high amounts of inline CSS
- **Missing external resources**: Check if the page has very few external CSS/JS files
- **Suspicious file extensions**: Look for unusual or missing file extensions in resource references

**Suggested Weight / Outcome:**
Medium to High Positive Weight (if implemented). **Note: Full Base64 detection requires sophisticated pattern matching and resource analysis that may be too complex for basic academic projects. Consider the simplified alternative for basic detection.**

## Category 4: Visual and Content Impersonation

These rules relate to the deceptive appearance of the page, often achieved by mimicking trusted brands.

### C4.A - Brand Impersonation/Visual Similarity ⚠️ **COMPLEX IMPLEMENTATION**

**Technical Logic (Binary/Fuzzy):**
**Computer Vision Analysis Required**: This rule requires sophisticated visual analysis that goes far beyond basic DOM inspection:
- **Image processing**: Analyzing visual layout, colors, fonts, and design elements
- **Template databases**: Maintaining databases of legitimate brand visual designs
- **Similarity algorithms**: Complex computer vision algorithms to compare visual features
- **Machine learning**: Training models to recognize visual patterns and similarities

**Simplified Alternative (Academic Context):**
Basic text-based brand detection:
- **Brand name mentions**: Check if the page contains text references to known brands
- **Logo alt text**: Look for `<img alt="brand-name">` attributes
- **Domain similarity**: Simple string comparison between current domain and known brand domains
- **Title brand references**: Check if page title contains brand names

**Suggested Weight / Outcome:**
High Weight (if implemented). **Note: Full visual similarity analysis requires computer vision infrastructure and is not suitable for academic projects. Consider the simplified text-based alternative.**

### C4.B - Page Title Obfuscation

**Technical Logic (Binary/Fuzzy):**
Fuzzy Logic (Randomness Check): Analyze the HTML page title for suspicious patterns that indicate obfuscation attempts.

**Implementation:**
1. **Extract page title**: Get the content of `<title>` tag using `document.title`
2. **Check for randomness**: Look for patterns like:
   - Random alphanumeric strings (e.g., "a7b9c2d4")
   - Excessive special characters or numbers
   - Very short or very long titles
   - Titles with no recognizable words
3. **Brand name absence**: Check if title lacks expected brand names
4. **Suspicious patterns**: Look for titles that seem intentionally obfuscated

**Scoring Logic:**
- **Random alphanumeric**: Strong positive weight (highly suspicious)
- **No brand name**: Moderate positive weight (suspicious)
- **Excessive special chars**: Moderate positive weight
- **Normal title**: Negative weight (legitimate)

**Suggested Weight / Outcome:**
Medium Positive Weight. Suspicious title patterns are a good indicator of phishing attempts, as legitimate sites typically have clear, descriptive titles. This is easily implementable with basic string analysis.

### C4.C - Fuzzy Matching on Brand Names ⚠️ **COMPLEX IMPLEMENTATION**

**Technical Logic (Binary/Fuzzy):**
**Advanced String Matching Required**: This rule requires sophisticated fuzzy string matching algorithms:
- **Fuzzy matching algorithms**: Levenshtein distance, Jaro-Winkler, or phonetic matching
- **Brand name databases**: Maintaining comprehensive lists of legitimate brand names and common misspellings
- **Similarity thresholds**: Determining appropriate similarity scores for different types of matches
- **Context analysis**: Understanding when similar names are legitimate vs suspicious

**Simplified Alternative (Academic Context):**
Basic exact and simple pattern matching:
- **Exact brand name matches**: Check if page content contains exact brand names
- **Simple typos**: Look for common misspellings (e.g., "goggle" instead of "google")
- **Domain variations**: Check for obvious domain typos (e.g., "gooogle.com")
- **Keyword detection**: Look for financial/payment-related keywords that might indicate impersonation

**Suggested Weight / Outcome:**
Medium to High Positive Weight (if implemented). **Note: Full fuzzy matching requires sophisticated algorithms and brand databases that may be too complex for academic projects. Consider the simplified exact matching alternative.**

---

## Implementation Summary

### **Recommended for Academic Projects (Implementable Rules):**
- **C1.A**: Sensitive Input Fields Detection
- **C1.B**: Data Exfiltration Analysis (Network Requests & Event Handlers)
- **C2.A**: Link Features (Null/Foreign Links)
- **C2.B**: Dependent Request Ratio (Images/Media)
- **C3.B**: DOM Entropy (Complexity Check)
- **C4.B**: Page Title Obfuscation

### **Complex Rules (Flagged with Simplified Alternatives):**
- **C1.C**: Semantic Cues (LLM-based analysis required)
- **C3.A**: Structural Homology (Template matching required)
- **C3.C**: Base64 Encoding Detection (Advanced pattern matching required)
- **C4.A**: Brand Impersonation (Computer vision analysis required)
- **C4.C**: Fuzzy Matching on Brand Names (Advanced string matching required)

### **Key Implementation Notes:**
1. **Prerequisites**: All analysis must be performed on fully rendered DOM objects after JavaScript execution
2. **Scoring**: Each rule provides specific scoring logic and weight recommendations
3. **Complexity Flags**: Rules marked with ⚠️ **COMPLEX IMPLEMENTATION** include simplified alternatives suitable for academic contexts
4. **Mathematical Formulas**: Where applicable, specific formulas and thresholds are provided for implementation