# ForgeOS Alpha

Bare-metal, Linux-first, single-user workstation for Forge Web3 security research, auditing, and architecture work.

## Alpha scope

- Bare-metal React UI
- Collapsible sidebar
- Work Board
- Context panel
- Real terminal bridge using `xterm.js` + `node-pty`
- Backend health endpoint
- Ollama local model status endpoint
- Work console message API
- Project/workspace config
- External tool links
- Smoke tests

No auth. No multi-user. No plugin marketplace. No agent swarm.

## Defaults

```text
Frontend: http://127.0.0.1:5173
Backend:  http://127.0.0.1:4242
Ollama:   http://127.0.0.1:11434
Shell:    /bin/bash
```

## Quick start

```bash
cd forge-os-alpha
npm install
npm run dev
```

In another terminal:

```bash
npm run smoke
npm run test:all
```

If `node-pty` fails to build:

```bash
sudo apt update
sudo apt install -y build-essential python3 make g++
npm install
```

## Ollama

ForgeOS works if Ollama has no models installed. Recommended tiny local coder:

```bash
ollama pull qwen2.5-coder:1.5b
```
