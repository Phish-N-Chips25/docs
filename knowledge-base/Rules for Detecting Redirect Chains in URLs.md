<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Rules for Detecting Redirect Chains in URLs

## Category R: Redirect Chain Detection

This category focuses on analyzing URL redirection chains, a common phishing technique where attackers use multiple redirects to obscure the final destination and evade detection.

### R1.A – Redirect Depth Analysis

**Technical Logic (Binary/Fuzzy):**
Use a fuzzy measurement of the number of consecutive redirects from the initial URL to the final destination. Phishing sites often employ long redirect chains to evade blacklists and automated analysis.

Implementation steps:

1. Follow HTTP redirects (status codes 301, 302, 303, 307, 308).
2. Count each redirect hop.
3. Enforce a maximum depth (e.g., 10) to prevent infinite loops.
4. Detect circular redirects.

Prolog predicates:

```prolog
% Count redirects
count_redirects(URL, Count) :-
    follow_redirects(URL, 0, Count).

follow_redirects(URL, Current, Final) :-
    http_get_redirect(URL, Next),
    Next \= URL,
    New is Current + 1,
    New < 10,
    follow_redirects(Next, New, Final).
follow_redirects(_, Count, Count).

% Score by depth
redirect_chain_depth_score(URL, Score) :-
    count_redirects(URL, C),
    classify_depth(C, Score).

classify_depth(C, high_risk)   :- C >= 5.
classify_depth(C, medium_risk) :- C >= 3, C < 5.
classify_depth(C, low_risk)    :- C >= 1, C < 3.
classify_depth(0, legitimate).
```

**Scoring:**

- 5+ redirects = high risk
- 3–4 redirects = medium risk
- 1–2 redirects = low risk
- 0 redirects = legitimate


### R1.B – Domain Diversity Analysis

**Technical Logic (Quantified):**
Measure the diversity of domains in the redirect chain. Phishing often uses multiple domains to impede tracking.

Implementation steps:

1. Extract domains from each URL in the chain.
2. Count unique domains.
3. Compute ratio = unique domains / total hops.

Prolog predicates:

```prolog
% Compute diversity ratio
analyze_domain_diversity(URL, Ratio) :-
    get_redirect_chain(URL, Chain),
    extract_domains(Chain, Domains),
    length(Chain, L), list_to_set(Domains, U), length(U, Uc),
    Ratio is Uc / L.

% Classify by ratio
domain_diversity_score(URL, Score) :-
    analyze_domain_diversity(URL, R),
    classify_diversity(R, Score).

classify_diversity(R, very_high_risk) :- R >= 0.8.
classify_diversity(R, high_risk)     :- R >= 0.6, R < 0.8.
classify_diversity(R, medium_risk)   :- R >= 0.4, R < 0.6.
classify_diversity(R, low_risk)      :- R < 0.4.
```

**Scoring:**

- Ratio ≥ 0.8 = very high risk
- 0.6–0.8 = high risk
- 0.4–0.6 = medium risk
- < 0.4 = low risk


### R1.C – URL Shortener Detection

**Technical Logic (Binary):**
Check if any redirect uses known URL shorteners, which are frequently abused in phishing.

Implementation steps:

1. Maintain a list of known shortener domains.
2. Count occurrences in the redirect chain.

Prolog predicates:

```prolog
% Known shorteners
url_shortener(D) :-
    member(D, ['bit.ly','tinyurl.com','t.co','goo.gl','ow.ly','is.gd','cutt.ly']).

% Count shorteners
detect_url_shorteners(URL, Count) :-
    get_redirect_chain(URL, Chain),
    extract_domains(Chain, Ds),
    include(url_shortener, Ds, Shorteners),
    length(Shorteners, Count).

% Classify usage
url_shortener_score(URL, Score) :-
    detect_url_shorteners(URL, C),
    classify_shortener(C, Score).

classify_shortener(N, very_high_risk) :- N >= 3.
classify_shortener(N, high_risk)     :- N >= 2.
classify_shortener(1, medium_risk).
classify_shortener(0, legitimate).
```


### R1.D – Redirect Timing Analysis

**Technical Logic (Fuzzy):**
Measure response times and delays between redirects. Malicious services may introduce artificial delays or exhibit anomalous timing patterns.

Implementation steps:

1. Record response times for each redirect.
2. Calculate mean and standard deviation.
3. Count outliers.
4. Score = outlier_count / total_hops.

Prolog outline:

```prolog
analyze_redirect_timing(URL, Score) :-
    measure_times(URL, Times),
    calculate_mean_std(Times, Mean, Std),
    count_outliers(Times, Mean, Std, Out),
    length(Times, Total),
    Score is Out / Total.
```


### R1.E – Blacklist/Whitelist Integration

**Technical Logic (Binary):**
Check each domain in the chain against known blacklists (e.g., OpenPhish, PhishTank) and whitelists of legitimate domains.

Implementation steps:

1. Query blacklists and whitelists.
2. Assign reputation = blacklisted, whitelisted, or unknown.
3. Compute score = (blacklist_count + 0.5·unknown_count) / total_domains.

Prolog outline:

```prolog
check_domain_reputation(D, R) :-
    ( blacklisted_domain(D) -> R=blacklisted
    ; whitelisted_domain(D)-> R=whitelisted
    ; R=unknown ).

analyze_chain_reputation(URL, Score) :-
    get_redirect_chain(URL, Chain), extract_domains(Chain, Ds),
    maplist(check_domain_reputation, Ds, Rs),
    count_reputation(Rs, B, W, U),
    Total is B+W+U,
    Score is (B + 0.5*U) / Total.
```


## Final Classification Rule

Combine individual scores into a weighted aggregate and classify:

```prolog
classify_redirect_chain(URL, Class, Confidence) :-
    redirect_chain_depth_score(URL, Ds),
    domain_diversity_score(URL, Dv),
    url_shortener_score(URL, Us),
    analyze_chain_reputation(URL, Rs),
    FinalScore is Ds*0.3 + Dv*0.25 + Us*0.25 + Rs*0.2,
    classify_score(FinalScore, Class, Confidence).

classify_score(S, phishing, high)   :- S >= 0.8.
classify_score(S, phishing, medium) :- S >= 0.6, S < 0.8.
classify_score(S, suspicious, medium):- S >= 0.4, S < 0.6.
classify_score(S, legitimate, high)  :- S < 0.4.
```


***

**Implementation Notes:**

- Use an HTTP library to follow redirects safely with timeouts.
- Enforce maximum depth to prevent loops.
- Keep URL shortener and blacklist data updated.
- For advanced analysis, include timing metrics but be wary of network variability.

