---
marp: true
theme: default
paginate: true
backgroundColor: #1a1a1a
color: #e0e0e0
style: |
  section {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 28px;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    color: #e0e0e0;
  }
  h1 {
    color: #00d4ff;
    font-size: 2.2em;
    text-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
  }
  h2 {
    color: #64b5f6;
    font-size: 1.5em;
  }
  h3 {
    color: #90caf9;
  }
  h4 {
    color: #bbdefb;
  }
  strong {
    color: #fff;
  }
  code {
    background: #0d1117;
    color: #79c0ff;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-size: 0.85em;
    border: 1px solid #30363d;
  }
  pre {
    background: #0d1117;
    border: 1px solid #30363d;
    border-radius: 6px;
    padding: 1em;
  }
  pre code {
    background: transparent;
    border: none;
    color: #c9d1d9;
  }
  table {
    font-size: 0.75em;
    border-collapse: collapse;
  }
  table th {
    background: #0d1117;
    color: #58a6ff;
    border: 1px solid #30363d;
    padding: 0.6em;
  }
  table td {
    border: 1px solid #30363d;
    padding: 0.6em;
  }
  table tr:nth-child(even) {
    background: #161b22;
  }
  ul, ol {
    font-size: 0.95em;
  }
  li {
    margin-bottom: 0.5em;
  }
  a {
    color: #58a6ff;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  .columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
  section::after {
    color: #6e7681;
  }
  blockquote {
    border-left: 4px solid #58a6ff;
    padding-left: 1em;
    margin-left: 0;
    color: #8b949e;
  }
---
