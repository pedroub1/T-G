# 🎾⛳ Plan Complementario — Tenis & Golf

Rutina de flexibilidad, movilidad, fuerza y cardio diseñada para complementar tenis y golf.

## Deploy en Railway

### Opción A: Desde GitHub (recomendada)

1. Sube esta carpeta a un repo de GitHub
2. Ve a [railway.app](https://railway.app) e inicia sesión
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Selecciona tu repo
5. Railway detectará automáticamente el proyecto y lo desplegará
6. En **Settings → Networking**, click **"Generate Domain"** para obtener tu URL pública

### Opción B: Con Railway CLI

```bash
# Instalar CLI
npm install -g @railway/cli

# Login
railway login

# Desde esta carpeta:
railway init
railway up
```

### Opción C: Sin GitHub

1. En [railway.app](https://railway.app), click **"New Project"** → **"Empty Project"**
2. Agrega un servicio → **"Empty Service"**
3. En la pestaña **Settings**, conecta tu repo o usa CLI

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Estructura

```
├── index.html          # Entry point con meta tags móviles
├── package.json        # Dependencias y scripts
├── railway.json        # Config de Railway
├── vite.config.js      # Config de Vite
└── src/
    ├── main.jsx        # Mount de React
    └── App.jsx         # Toda la app (rutina + timer + progreso)
```
