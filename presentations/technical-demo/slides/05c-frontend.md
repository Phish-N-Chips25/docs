## PPROGIA: Frontend Interface
**Interactive Analysis Tool**

<div class="columns">
<div>

### React UI Features
- **URL Analysis**: Submit URLs for evaluation
- **Persona Selection**: Tailor output for different users:
  - Security analyst
  - Developer
  - End user
- **Engine Toggle**: Compare Prolog vs Drools results
- **Live Rule Highlighting**: See which rules triggered
- **Results Visualization**: Score breakdown & reasoning

</div>
<div>

### Architecture Role
**Not the focus, but practical:**
- Demonstrates the detection engine capabilities
- Makes testing and validation easier
- Shows real-time rule evaluation
- Useful for demos and experimentation

**Core value:** The backend inference engine, not the UI

</div>
</div>

```
React (:3000) ──HTTP POST──▶ FastAPI (:8000)
                              └──▶ Prolog Engine
```
