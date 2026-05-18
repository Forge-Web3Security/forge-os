# ForgeOS Alpha Install

```bash
mkdir -p ~/Projects
cp -r forge-os-alpha ~/Projects/forge-os
cd ~/Projects/forge-os
npm install
```

Start backend:

```bash
npm run dev:backend
```

Start frontend:

```bash
npm run dev:frontend
```

Open:

```text
http://127.0.0.1:5173
```

Smoke test:

```bash
npm run smoke
```

Full tests:

```bash
npm run test:all
```
