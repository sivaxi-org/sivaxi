# Sivaxi Frontend

Sivaxi is a multi-application Angular workspace designed to support independently developed frontend applications using a Micro-Frontend (MFE) architecture.

The workspace uses Docker Compose for local development, Traefik for hostname-based routing, and Native Federation for integrating Angular applications.

## Architecture

### Applications

| Application | Role | Local URL |
|---|---|---|
| Shell | Host application and shared Sivaxi layout | http://localhost:4200 |
| Vixi | AI assistant application | http://vixi.localhost:4200 |
| Portfolio | Portfolio and engineering projects | http://portfolio.localhost:4200 |

### Technology Stack

- Angular 22
- TypeScript
- Native Federation — Angular Architects
- Node.js 24
- npm
- Docker and Docker Compose
- Traefik v3

## Project Structure

```text
sivaxi/
├── projects/
│   ├── shell/
│   │   ├── public/
│   │   │   └── federation.manifest.json
│   │   ├── src/
│   │   │   └── app/
│   │   │       └── app.routes.ts
│   │   └── federation.config.mjs
│   ├── vixi/
│   │   ├── src/
│   │   │   └── app/
│   │   │       ├── app.ts
│   │   │       └── app.routes.ts
│   │   └── federation.config.mjs
│   └── portfolio/
│       ├── src/
│       │   └── app/
│       │       ├── app.ts
│       │       └── app.routes.ts
│       └── federation.config.mjs
├── Dockerfile.dev
├── compose.yaml
├── package.json
├── package-lock.json
└── README.md
```

*Note: The structure above highlights the files relevant to the current federation setup. Other workspace configuration files are omitted.*

## Prerequisites

Install the following tools:

- Node.js 24 or a compatible supported version
- npm
- Docker Engine
- Docker Compose

The existing development environment uses Node.js 24 and npm.

## Getting Started

### 1. Open the workspace

```bash
cd ~/Desktop/sivaxi
```

### 2. Start the development environment

```bash
docker compose up --build
```

Docker Compose starts the following services:

- Traefik reverse proxy
- Shell Angular application
- Vixi Angular application
- Portfolio Angular application

Open the applications in your browser using the URLs listed above.

### 3. Run in the background

```bash
docker compose up -d
```

### 4. View logs

```bash
docker compose logs -f
```

To view logs for an individual service:

```bash
docker compose logs -f shell
docker compose logs -f vixi
docker compose logs -f portfolio
```

### 5. Restart a service

If a remote's federation configuration changes but its exposed-module metadata appears stale, restart that service:

```bash
docker compose restart portfolio
```

Use `vixi` or `shell` instead when restarting those services. A restart may be needed after certain configuration changes; ordinary source edits should generally trigger automatic rebuilds.

### 6. Stop the environment

```bash
docker compose down
```

Stopping the containers does not delete the source code.

## Routing

Traefik routes incoming HTTP requests according to the hostname:

| Hostname | Destination |
|---|---|
| `localhost` | Shell |
| `vixi.localhost` | Vixi |
| `portfolio.localhost` | Portfolio |

All three Angular development servers use port `4200` inside their respective containers. Traefik exposes port `4200` on the host and forwards requests to the appropriate service.

The `.localhost` hostnames are intended for local development and generally require no additional DNS configuration.

## Micro-Frontend Design

```text
                         Browser
                            |
                         Traefik
                            |
                          Shell
                      (Host Application)
                        /         \
                       /           \
                    Vixi          Portfolio
                  (Remote)         (Remote)
                       \           /
                  Native Federation
```

### Shell — Host

Responsibilities:

- Provide the common Sivaxi layout and navigation.
- Initialize Native Federation using the federation manifest.
- Register remote entry URLs.
- Load remote route configurations dynamically.
- Compose the applications under Shell's routing structure.

### Vixi — Remote

Responsibilities:

- Own Vixi-specific features and routes.
- Maintain its own application code.
- Expose its route configuration for Shell to load.

### Portfolio — Remote

Responsibilities:

- Own portfolio pages and project-related features.
- Maintain its own application code.
- Expose its route configuration for Shell to load.

Each remote maintains its own feature boundaries rather than placing all application logic inside Shell.

## Native Federation Implementation

### Shell remote manifest

The Shell's `federation.manifest.json` registers the remote entry points:

```json
{
  "vixi": "http://vixi.localhost:4200/remoteEntry.json",
  "portfolio": "http://portfolio.localhost:4200/remoteEntry.json"
}
```

### Remote route exposure

Vixi and Portfolio expose their route configurations through their respective `federation.config.mjs` files.

The current exposure pattern is:

```javascript
exposes: {
  './Routes': './projects/vixi/src/app/app.routes.ts',
},
```

Portfolio uses the equivalent path for its own `app.routes.ts`.

Each remote route file statically imports its root component and supplies it to Angular Router:

```typescript
import { Routes } from '@angular/router';
import { App } from './app';

export const routes: Routes = [
  {
    path: '',
    component: App,
  },
];
```

### Shell route loading

Shell loads the remote route configurations using `loadRemoteModule` and `loadChildren`:

```typescript
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'vixi',
  },
  {
    path: 'vixi',
    loadChildren: () =>
      loadRemoteModule('vixi', './Routes').then((m) => m.routes),
  },
  {
    path: 'portfolio',
    loadChildren: () =>
      loadRemoteModule('portfolio', './Routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: 'vixi',
  },
];
```

This allows Shell to compose the remote applications through their route configurations.

> The snippets document the current intended configuration. If the files change during subsequent development, keep this README synchronized with the actual workspace.

## Docker Development Environment

- `Dockerfile.dev` provides the Node.js development environment.
- Docker Compose runs the Angular applications and Traefik.
- The workspace source is mounted into the development containers so code changes can trigger rebuilds.
- A named `node_modules` volume is used for container dependencies.
- Angular development servers bind to an address accessible from other containers.
- Traefik routes browser requests to the correct Angular service.

## Development Guidelines

- Keep each application's features inside its own project.
- Avoid unnecessary coupling between Shell and the remotes.
- Expose only the routes or modules that other applications need.
- Share dependencies only when there is a clear benefit.
- Keep Docker Compose responsible for local service orchestration.
- Keep Traefik responsible for local hostname routing.
- Prefer small, focused changes and avoid unnecessary testing.
- Update this README when federation or deployment configuration changes.

## Current Status

- [x] Angular workspace created.
- [x] Shell, Vixi and Portfolio applications created.
- [x] Docker Compose development environment configured.
- [x] Traefik hostname routing working locally.
- [x] Native Federation package installed in the development environment.
- [x] Shell configured with a remote federation manifest.
- [x] Vixi route exposure configured.
- [x] Portfolio route exposure configured.
- [x] Shell configured to load both remote route configurations.
- [x] Federation metadata issue resolved by restarting the affected container.
- [ ] Verify navigation into both remotes from Shell after the latest changes.
- [ ] Confirm clean browser console output during integrated navigation.
- [ ] Production builds and deployment configuration.
- [ ] Production remote URL and asset configuration.

## Future Deployment

The current Docker setup is intended for local development. Production deployment will require:

- Configuring the host and remote entry URLs for deployed environments.
- Ensuring remote assets are reachable from the host application.
- Defining dependency compatibility and versioning practices.
- Establishing a deployment and release strategy for independently developed remotes.
- Verifying production builds and integrated routing.

Production hosting and deployment details will be documented once the deployment architecture is finalized.
