# Antigravity Rules: Maximize Density, Minimize Tokens

## 1. Output Strategy

- **Micro-Diffs Only**: Output ONLY changed lines using standard diff format (`- old + new`). Never reprint full files, untouched code blocks, or entire functions.
- **Zero-Why**: Provide immediate code fixes. Omit all natural language explanations, preambles, and postambles unless explicitly requested.
- **Semantic Shorthand**: Use bullet points and symbols (→, ∵, Δ, !) instead of full sentences. Strip out conversational filler.

## 2. Code Rules

- **No Redundant Comments**: Strip out comments that explain *what* the code does. Only keep highly complex *why* comments.
- **Compact Syntax**: Favor modern, dense code syntax (e.g., early returns, destructuring, map lookups) over verbose logic structures.

## 3. Budget Constraint

- **Token Cap**: If any single projected output exceeds 200 tokens, STOP. Prompt the user for permission or use internal tools (grep, jq) before outputting.
