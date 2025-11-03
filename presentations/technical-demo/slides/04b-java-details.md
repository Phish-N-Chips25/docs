## ENGCIA: Key Features & Components

<div class="columns">
<div>

### Evidence Collection
**Multi-layered analysis:**
- **URL Features**: @ char, IP host, homographs, length, subdomains
- **DNS Analysis**: Domain age, WHOIS lookups
- **Page Analysis**: Playwright DOM inspection, favicon, forms
- **Whitelist**: Alexa/Tranco top sites
- **Redirect Detection**: Short URLs, chain analysis

</div>
<div>

### Drools Rules Engine
**Production rules system:**
- **Forward-chaining**: Data-driven inference
- **Pattern matching**: Evidence → Hypothesis
- **Weighted scoring**: Configurable rule weights
- **Declarative rules**: `.drl` files
- **Stateless sessions**: One session per request

</div>
</div>

### Tech Stack & Performance
- **Java** + **Spring Boot** + **Drools**
- **Single JAR deployment** - Simple, portable
- **Concurrent testing**: 100+ URLs in ~40 seconds
- **Real-world validation**: OpenPhish dataset
