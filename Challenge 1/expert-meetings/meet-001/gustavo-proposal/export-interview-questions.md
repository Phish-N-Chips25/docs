### 🔎 Contexto geral

* Na sua experiência, quais são os sinais mais comuns que permitem identificar um URL ou website de phishing?
* Que fontes de informação externas costuma usar (listas negras, WHOIS, reputação de domínio, motores de busca, etc.)?
* Que indicadores costuma considerar mais **fiáveis** e quais são apenas "sinais de alerta"?

---

### 🌐 Análise de URL / Domínio

* Quais os padrões de URL que mais frequentemente indicam phishing (ex.: subdomínios estranhos, uso de caracteres parecidos, TLD suspeitos)?
* Até que ponto a idade de um domínio (WHOIS) é relevante?
* O que podemos inferir de um certificado SSL/TLS (válido, inválido, gratuito, inexistente)?
* Existem domínios "bons" mas usados de forma maliciosa (ex.: domínios comprometidos)? Como lidar com essa exceção?

---

### 📩 Análise de conteúdo / request

* Que aspetos de um pedido HTTP ou da página são fortes indicadores de phishing (redirecionamentos, iframes, JavaScript ofuscado, pedidos a domínios externos)?
* Existem padrões típicos em headers de requests (user-agent, origem, cookies) que ajudam a distinguir phishing?
* Em termos de conteúdo da página, que elementos (logos mal renderizados, erros ortográficos, formulários suspeitos) são mais relevantes?

---

### 📊 Critérios de decisão

* Como combina os diferentes sinais para concluir se algo é phishing? (ex.: basta um forte indicador ou precisa de vários sinais em conjunto?)
* Existem "regras de ouro" que nunca falham?
* Em que casos prefere considerar "suspeito" em vez de assumir logo phishing?

---

### ⚠️ Casos ambíguos e exceções

* Quais são os falsos positivos mais comuns?
* E os falsos negativos (phishing bem disfarçado)?
* Existem setores/domínios específicos onde é mais difícil detetar phishing?

---

### 🛠️ Ferramentas e raciocínio prático

* Que ferramentas ou métodos usa no dia a dia para apoiar esta análise?
* Se tivesse de treinar um analista júnior, quais seriam as 3–5 regras práticas que lhe transmitiria primeiro?
* Que sinais considera demasiado fracos ou irrelevantes para perder tempo a analisar?

---

### 💡 Metas para o modelo

* Se estivermos a construir um sistema baseado em regras, que heurísticas ou “se-então” acha mais úteis para automatizar?
* Que tipo de raciocínio humano (intuição, experiência) ainda é difícil formalizar em regras?
