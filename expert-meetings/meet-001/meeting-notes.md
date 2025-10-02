# Notas da Reunião com o Perito (Phishing Detection)

## 1. Indicadores Técnicos de Phishing

* **Idade do domínio**
  * Domínios muito recentes são fortemente suspeitos.
  * Domínios de Content Delivery Networks (CDNs) também podem ser usados para páginas falsas.

* **Domain Generation Algorithms (DGAs)**
  * Atacantes usam DGAs para registar rapidamente domínios para campanhas de phishing.

* **Inserção de credenciais**
  * Se a página tem campos de autenticação/capacidade de recolher credenciais → forte indicador de phishing.

* **Redirecionamentos em cadeia**
  * Links que redirecionam várias vezes para mascarar o destino final.

* **Links embutidos em ficheiros**
  * Ex.: ficheiros `.txt`, `.zip`, `.html` com links maliciosos.

* **Encoding de URLs**
  * Técnicas de codificação usadas para disfarçar o link real.

* **Uso de logotipos de marcas**
  * Procura ativa por logotipos em páginas HTML.

* **Alfabetos alternativos (homógrafos)**
  * Registo de domínios com caracteres cirílicos ou semelhantes para imitar o alfabeto latino.

## 2. Marcas Mais Visadas

* "Top 10" marcas globais frequentemente usadas em campanhas de phishing.
  *(detalhes específicos podem ser listados em análise futura)*

## 3. Indicadores com Impacto Baixo

* Utilização direta de **IP como host**.
* Presença de **HTTP em vez de HTTPS**.

## 4. Técnicas e Ferramentas de Defesa

* **Defender for Office** (proteção contra links e anexos maliciosos).
* **MXToolbox** (análise de DNS e SPF records).
* **SPF Records** (validação de remetentes de emails).
* **VirusTotal** (análise de URLs/domínios).
* **Ferramentas de reputação de domínios**:
  * Cisco Talos
  * Outras bases de dados de reputação.
