# Scores
**low=5, medium=15, high=30**.

# 1) Presença de IP

```drl
rule "URL - Host is IP"
salience 80
when
  $u : Url(hasIpHost == true)
  $a : UrlAssessment(url == $u)
then
  modify($a){
    setRisk($a.getRisk() + 15),
    addReason("Host is an IP address")
  };
end
```

---

# 2) Parâmetros Encriptados

```drl
rule "URL - Encoded parameters (count)"
salience 70
when
  $u : Url($q : query, this != null, encodedParamCount > 0)
  $a : UrlAssessment(url == $u)
then
  int delta = Math.min(3 * $u.getEncodedParamCount(), 20);
  modify($a){
    setRisk($a.getRisk() + delta),
    addReason("Encoded parameters in query (" + $u.getEncodedParamCount() + ")")
  };
end

rule "URL - Suspicious opaque blob"
salience 75
when
  $u : Url(hasSuspiciousBlob == true)
  $a : UrlAssessment(url == $u)
then
  modify($a){
    setRisk($a.getRisk() + 20),
    addReason("Suspicious opaque blob in query")
  };
end
```

---

# 3) Substituição de Caracteres / Homógrafos

```drl
rule "Domain - Leet/character substitution"
salience 85
when
  $u : Url($h : host, this != null, leetSubstitutionCount > 0)
  $a : UrlAssessment(url == $u)
then
  int delta = Math.min(5 * $u.getLeetSubstitutionCount(), 25);
  modify($a){
    setRisk($a.getRisk() + delta),
    addReason("Leet/char substitutions in domain (" + $u.getLeetSubstitutionCount() + ")")
  };
end

rule "Domain - Confusable Unicode"
salience 90
when
  $u : Url(confusableCharCount >= 1)
  $a : UrlAssessment(url == $u)
then
  modify($a){
    setRisk($a.getRisk() + 30),
    addReason("Confusable Unicode in domain label")
  };
end
```

---

# 4) Comprimento Excessivo

```drl
rule "URL - Excessive length"
salience 75
when
  $u : Url(length > 120)
  $a : UrlAssessment(url == $u)
then
  modify($a){
    setRisk($a.getRisk() + 15),
    addReason("Excessive URL length (>120)")
  };
end

rule "URL - Deep path or many subdomains"
salience 60
when
  $u : Url(pathDepth >= 6 || subdomainCount >= 4)
  $a : UrlAssessment(url == $u)
then
  modify($a){
    setRisk($a.getRisk() + 10),
    addReason("Deep path or many subdomains")
  };
end

rule "URL - Misleading host pattern"
salience 88
when
  $u : Url(host matches "(?i).+\\.(login|secure|account|verify)\\.[^.]+\\.[^.]+$")
  $a : UrlAssessment(url == $u)
then
  modify($a){
    setRisk($a.getRisk() + 20),
    addReason("Misleading host pattern (brand-like subdomain before attacker domain)")
  };
end
```

---

# 5) TLD Suspeito ou Fora do Padrão

```drl
// Suspicious TLD via reputation fact
rule "TLD - Suspicious by reputation"
salience 80
when
  $u : Url($t : tld)
  TldReputation(tld == $t, isSuspicious == true)
  $a : UrlAssessment(url == $u)
then
  modify($a){
    setRisk($a.getRisk() + 15),
    addReason("Suspicious TLD (" + $t + ")")
  };
end

rule "TLD - Suspicious static set"
salience 70
when
  $u : Url($t : tld, this != null, $t memberOf (new java.util.HashSet(java.util.Arrays.asList("xyz","top","club","info","click","link"))))
  $a : UrlAssessment(url == $u)
then
  modify($a){
    setRisk($a.getRisk() + 10),
    addReason("Low-reputation TLD (" + $t + ")")
  };
end
```
