
# Sivaxi Frontend

Sivaxi is a multi-application Angular workspace designed to support independently developed frontend applications through a Micro-Frontend (MFE) architecture.

The workspace uses Docker Compose for local development, Traefik for hostname-based routing, and Native Federation for integrating Angular applications.

The Shell provides the shared Sivaxi landing page and navigation, while Vixi and Portfolio remain independently developed applications.

## Architecture

### Applications

| Application | Role | Local URL |
|---|---|---|
| Shell | Sivaxi landing page, shared layout, and MFE host | http://localhost:4200 |
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
- Tailwind CSS for the Shell landing page styling

## Project Structure

```text
sivaxi/
├── projects/
│   ├── shell/
│   │   ├── public/
│   │   │   └── federation.manifest.json
│   │   ├── src/
│   │   │   └── app/
│   │   │       ├── home/
│   │   │       │   ├── home.ts
│   │   │       │   ├── home.html
│   │   │       │   └── components/
│   │   │       │       ├── site-header/
│   │   │       │       ├── hero-section/
│   │   │       │       ├── engineering-principles/
│   │   │       │       ├── products-section/
│   │   │       │       ├── technology-section/
│   │   │       │       └── site-footer/
│   │   │       ├── app.ts
│   │   │       ├── app.html
│   │   │       ├── app.config.ts
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

*Note: This tree highlights the files relevant to the current frontend and federation setup. Other workspace configuration files are omitted.*

## Prerequisites

Install the following tools:

- Node.js 24 or a compatible supported version
- npm
- Docker Engine
- Docker Compose

The current development environment uses Node.js 24 and npm.

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

Open the applications using the local URLs listed in the Architecture section.

### 3. Run in the background

```bash
docker compose up -d
```

### 4. View logs

View logs for all services:

```bash
docker compose logs -f
```

View logs for an individual service:

```bash
docker compose logs -f shell
docker compose logs -f vixi
docker compose logs -f portfolio
```

### 5. Restart a service

If federation configuration changes but exposed-module metadata appears stale, restart the affected service:

```bash
docker compose restart portfolio
```

Use `vixi` or `shell` when restarting those services instead.

Ordinary source edits should generally trigger automatic rebuilds. Some configuration changes may require a service restart.

### 6. Stop the environment

```bash
docker compose down
```

Stopping the containers does not delete the source code.

## Routing

Traefik routes incoming HTTP requests according to the hostname.

| Hostname | Destination |
|---|---|
| `localhost` | Shell |
| `vixi.localhost` | Vixi |
| `portfolio.localhost` | Portfolio |

All three Angular development servers use port `4200` inside their respective containers. Traefik exposes port `4200` on the host and forwards requests to the appropriate service.

The `.localhost` hostnames are intended for local development and generally require no additional DNS configuration.

### Shell navigation

The Shell also provides application-level routes:

| Shell route | Destination |
|---|---|
| `/` | Sivaxi landing page |
| `/vixi` | Vixi remote |
| `/portfolio` | Portfolio remote |

These paths are handled by Angular Router inside the Shell. They are distinct from the standalone remote hostnames managed by Traefik.

## Sivaxi Landing Page

The Shell contains the main Sivaxi landing page. Its sections are implemented as focused standalone Angular components to keep the page maintainable and make future changes easier.

### Component Structure

| Component | Responsibility |
|---|---|
| `SiteHeader` | Sivaxi branding and primary navigation |
| `HeroSection` | Main introduction, messaging, and calls to action |
| `EngineeringPrinciples` | Engineering philosophy and guiding principles |
| `ProductsSection` | Vixi AI, Engineering Portfolio, and future projects |
| `TechnologySection` | Software engineering, AI, infrastructure, and connected systems |
| `SiteFooter` | Brand information, GitHub link, and copyright |

The `Home` component composes these sections in page order.

### Home Composition

The intended page composition is:

```html
<app-site-header />

<main>
  <app-hero-section />
  <app-engineering-principles />
  <app-products-section />
  <app-technology-section />
</main>

<app-site-footer />
```

Each section owns its own template and can be updated without placing the entire landing page in a single HTML file.

### Styling

The landing page uses Tailwind CSS utility classes alongside shared Sivaxi theme variables and custom artwork styles.

The current brand accent is Mineral Jade (`#3D8C78`).

Shared styling should remain in the existing global stylesheet where appropriate, particularly styles for the abstract hero artwork, theme variables, and common design elements.

Navigation anchors should use unique section IDs to avoid ambiguous in-page navigation.

## Micro-Frontend Design

```text
                         Browser
                            |
                         Traefik
                   /         |          \
                  /          |           \
               Shell        Vixi       Portfolio
              (Host)       (Remote)     (Remote)
                |
         Sivaxi Landing Page
                |
       Native Federation
         /           \
      Vixi          Portfolio
    (Routes)         (Routes)
```

### Shell — Host

Responsibilities:

- Provide the shared Sivaxi landing page and navigation.
- Initialize Native Federation using the federation manifest.
- Register remote entry URLs.
- Load remote route configurations dynamically.
- Compose remote applications under Shell's routing structure.
- Keep shared layout and navigation separate from remote-specific features.

### Vixi — Remote

Responsibilities:

- Own Vixi-specific features and routes.
- Maintain its own application code.
- Expose its route configuration for Shell to load.
- Support independent development within the shared workspace.

### Portfolio — Remote

Responsibilities:

- Own portfolio pages and project-related features.
- Maintain its own application code.
- Expose its route configuration for Shell to load.
- Support independent development within the shared workspace.

Each remote maintains its own feature boundaries instead of placing all application logic inside Shell.

## Native Federation Implementation

### Shell remote manifest

The Shell's `federation.manifest.json` registers the remote entry points.

```json
{
  "vixi": "http://vixi.localhost:4200/remoteEntry.json",
  "portfolio": "http://portfolio.localhost:4200/remoteEntry.json"
}
```

The URLs above are intended for local development. Production deployments will need the appropriate deployed remote URLs.

### Remote route exposure

Vixi and Portfolio expose their route configurations through their respective `federation.config.mjs` files.

The exposure pattern for Vixi is:

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

This is the current intended exposure pattern. Keep the paths aligned with the actual workspace and federation configuration.

### Shell route loading

The Shell loads remote route configurations using `loadRemoteModule` and `loadChildren`.

The landing page should be the default route, while the remotes are available through `/vixi` and `/portfolio`.

The following illustrates the intended route structure. Adapt the `Home` import to the actual file and exported class names in the workspace.

```typescript
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { Home } from './home/home';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Home,
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
];
```

This route structure keeps the Sivaxi landing page accessible at the Shell root without removing the integrated remote applications.

## Docker Development Environment

- `Dockerfile.dev` provides the Node.js development environment.
- Docker Compose runs the Angular applications and Traefik.
- The workspace source is mounted into the development containers so code changes can trigger rebuilds.
- A named `node_modules` volume is used for container dependencies.
- Angular development servers bind to an address accessible from other containers.
- Traefik routes browser requests to the correct Angular service.

## Development Guidelines

- Keep each application's features inside its own project.
- Keep the Shell landing page separate from remote-specific application logic.
- Avoid unnecessary coupling between Shell and the remotes.
- Expose only the routes or modules that other applications need.
- Share dependencies only when there is a clear benefit.
- Keep Docker Compose responsible for local service orchestration.
- Keep Traefik responsible for local hostname routing.
- Prefer small, focused changes and avoid unnecessary testing.
- Keep section IDs unique.
- Preserve existing shared theme variables and artwork styles when refactoring templates.
- Update this README when federation or deployment configuration changes.

## Current Status

### Workspace and development environment

- [x] Angular workspace created.
- [x] Shell, Vixi, and Portfolio applications created.
- [x] Docker Compose development environment configured.
- [x] Traefik hostname routing working locally.
- [x] Native Federation package installed in the development environment.

### Micro-frontend integration

- [x] Shell configured with a remote federation manifest.
- [x] Vixi route exposure configured.
- [x] Portfolio route exposure configured.
- [x] Shell configured to load both remote route configurations.
- [x] Federation metadata issue resolved by restarting the affected container.
- [ ] Verify navigation into both remotes from Shell after the latest changes.
- [ ] Confirm clean browser console output during integrated navigation.

### Sivaxi landing page

- [x] Landing page sections identified and separated into standalone components.
- [x] Header component created.
- [x] Hero section component created.
- [x] Engineering principles component created.
- [x] Products section component created.
- [x] Technology section component created.
- [x] Footer component created.
- [ ] Confirm all components are connected through `Home`.
- [ ] Confirm Shell root routing displays the landing page.
- [ ] Verify responsive layouts and in-page navigation.
- [ ] Verify product links and remote navigation in the integrated environment.

### Production readiness

- [ ] Production builds and deployment configuration.
- [ ] Production remote URL and asset configuration.
- [ ] Dependency compatibility and versioning strategy.
- [ ] Independent remote deployment and release workflow.

The checkboxes describe the intended development progress and should be updated to match the actual workspace state.

## Future Deployment

The current Docker setup is intended for local development.

Production deployment will require:

- Configuring the host and remote entry URLs for deployed environments.
- Ensuring remote assets are reachable from the host application.
- Defining dependency compatibility and versioning practices.
- Establishing a deployment and release strategy for independently developed remotes.
- Verifying production builds and integrated routing.
- Confirming that routing, refresh behavior, and asset loading work in the production environment.

Production hosting and deployment details will be documented once the deployment architecture is finalized.
