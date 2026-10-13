# Sivaxi Frontend

Sivaxi is a multi-application Angular workspace designed to support independently developed frontend applications through a Micro-Frontend (MFE) architecture.

The workspace uses Docker Compose for local development, Traefik for hostname-based routing, and Native Federation for integrating Angular applications.

The Shell provides the shared Sivaxi landing page and navigation, while Vixi and Portfolio remain independently developed applications.

## Architecture

### Applications

| Application | Role | Local URL |
|---|---|---|
| Shell | Sivaxi landing page and MFE host | `http://shell.sivaxi.test` |
| Vixi | AI assistant application | `http://vixi.sivaxi.test` |
| Portfolio | Portfolio and engineering projects | `http://portfolio.sivaxi.test` |

### Technology Stack

- Angular 22
- TypeScript
- Native Federation — Angular Architects
- Node.js 24
- npm
- Docker and Docker Compose
- Traefik v3
- Tailwind CSS
- Shared Angular libraries and branding assets

## Project Structure

```text
sivaxi/
├── projects/
│   ├── shell/
│   │   ├── public/
│   │   │   └── federation.manifest.json
│   │   ├── src/
│   │   │   ├── main.ts
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
│   ├── portfolio/
│   │   ├── src/
│   │   │   └── app/
│   │   │       ├── app.ts
│   │   │       └── app.routes.ts
│   │   └── federation.config.mjs
│   └── shared/
│       ├── public/
│       │   └── assets/
│       │       └── logos/
│       └── src/
│           ├── lib/
│           └── public-api.ts
├── Dockerfile.dev
├── compose.yaml
├── package.json
├── package-lock.json
└── README.md
```

*This tree highlights the files relevant to the current frontend and federation setup. Other workspace configuration files are omitted.*

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

### 2. Configure local hostnames

Add the following entries to `/etc/hosts`:

```text
127.0.0.1 shell.sivaxi.test
127.0.0.1 vixi.sivaxi.test
127.0.0.1 portfolio.sivaxi.test
```

These entries resolve the local application hostnames to the development machine. Traefik uses the hostname to route requests to the corresponding container.

### 3. Start the development environment

```bash
docker compose up --build
```

Docker Compose starts the following services:

- Traefik reverse proxy
- Shell Angular application
- Vixi Angular application
- Portfolio Angular application

Open the applications using the local URLs listed in the Architecture section.

### 4. Run in the background

```bash
docker compose up -d
```

### 5. View logs

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

### 6. Restart a service

Restart the affected service when configuration changes require a fresh development-server startup:

```bash
docker compose restart portfolio
```

Replace `portfolio` with `shell` or `vixi` when appropriate.

Ordinary source changes should generally trigger automatic rebuilds. Some federation or build configuration changes may require restarting or rebuilding the affected container.

### 7. Stop the environment

```bash
docker compose down
```

Stopping the containers does not delete the source code.

## Routing

Traefik routes incoming HTTP requests according to their hostname.

| Hostname | Destination |
|---|---|
| `shell.sivaxi.test` | Shell |
| `vixi.sivaxi.test` | Vixi |
| `portfolio.sivaxi.test` | Portfolio |

All three Angular development servers listen on port `4200` inside their respective containers. Traefik exposes port `4200` on the host and forwards requests to the appropriate service.

The `.sivaxi.test` domains are intended for local development. Unlike the special `.localhost` domain, custom `.test` hostnames need local hostname resolution, such as the `/etc/hosts` entries above.

## Shell Navigation

The Shell provides both its own landing page and routes for integrated remote applications.

| Shell route | Destination |
|---|---|
| `/` | Sivaxi landing page |
| `/vixi` | Vixi remote route |
| `/portfolio/home` | Portfolio home route |

These paths are handled by Angular Router inside the Shell. They are different from the standalone application domains managed by Traefik.

Portfolio can also be accessed independently:

- `http://portfolio.sivaxi.test/home`

Use Angular `routerLink` for navigation within the Shell. Use an absolute application URL with `href` when navigating to a different standalone application.

## Sivaxi Landing Page

The Shell contains the main Sivaxi landing page. Its sections are implemented as focused Angular components to keep the page maintainable and make future changes easier.

### Component Structure

| Component | Responsibility |
|---|---|
| `SiteHeader` | Sivaxi branding and primary navigation |
| `HeroSection` | Main introduction, messaging, and calls to action |
| `EngineeringPrinciples` | Engineering philosophy and guiding principles |
| `ProductsSection` | Vixi AI, Engineering Portfolio, and future projects |
| `TechnologySection` | Software engineering, AI, infrastructure, and connected systems |
| `SiteFooter` | Branding, footer navigation, GitHub link, and copyright |

The `Home` component composes these sections in page order.

### Styling

The landing page uses Tailwind CSS utility classes alongside shared Sivaxi theme variables and custom artwork styles.

The current brand accent is Mineral Jade (`#3D8C78`).

Shared styling should remain in the existing global stylesheet where appropriate, particularly for theme variables, abstract hero artwork, and common design elements.

Navigation anchors should use unique section IDs to support reliable in-page navigation.

The header and footer are designed to provide:

- Responsive layouts for desktop and mobile screens.
- Consistent spacing, typography, and theme variables.
- Official Sivaxi logo assets.
- Theme-aware logo selection.
- Consistent navigation and branding.

## Shared Branding and Assets

Sivaxi maintains a centralized logo collection in:

```text
projects/shared/public/assets/logos/
```

The collection includes 24 PNG logo variants, including:

- Horizontal and stacked primary wordmarks.
- Light and dark logo variants.
- Symbols and outline symbols.
- Application icons and favicons.
- Monochrome and single-color variants.
- Background-specific and photo-overlay artwork.

### Branding Constants

Shared branding references are maintained in:

```text
projects/shared/src/lib/branding.ts
```

The `SIVAXI_BRANDING` constant provides named references to the logo files, allowing application components to use descriptive names instead of repeating filenames.

Example:

```typescript
import { SIVAXI_BRANDING } from 'shared';

export class SiteFooter {
  readonly branding = SIVAXI_BRANDING;
}
```

Example template usage:

```html
<img
  [src]="branding.logos.primaryHorizontalDark"
  alt="Sivaxi"
/>
```

The branding constants should be exported through `projects/shared/src/public-api.ts` so consumers can import them through the shared library's public API.

### Centralized Asset Serving

Centralized branding definitions and centralized asset hosting are separate concerns.

The files currently reside in the shared project's `public/assets/logos/` directory. That directory is not automatically served by every application merely because it belongs to the shared project.

The intended architecture is to provide a common asset base URL so Shell, Vixi, and Portfolio do not need separate copies of the same logos.

The local and production asset URLs must be configured to point to locations that actually serve those files. The centralized asset-serving configuration remains to be completed and verified.

Avoid hardcoding application-specific asset paths throughout component templates.

### Theme-Aware Branding

The header and footer should select the appropriate logo variant according to the active theme exposed by `ThemeService`.

For example:

- Light-colored logo for dark backgrounds.
- Dark-colored logo for light backgrounds.

Components should use the actual theme-service API rather than independently inferring theme state. This keeps logo selection consistent with the application's theme.

## Environment-Aware Application Links

Application URLs are centralized separately from Shell routes.

- **Application links** point to standalone applications.
- **Shell routes** point to pages integrated into the Shell through Native Federation.

For example, application-link constants can represent the standalone Vixi and Portfolio domains, while Shell route constants represent `/vixi` and `/portfolio/home`.

Local development uses the `.sivaxi.test` domains. Production is intended to use the corresponding Sivaxi production domains.

Environment detection and URL selection should remain centralized rather than being repeated across components.

Production hostnames and remote URLs must be verified against the actual deployment configuration before release.

## Micro-Frontend Design

```text
                         Browser
                            |
                         Traefik
                   /         |          \
                  /          |           \
               Shell        Vixi       Portfolio
              (Host)      (Remote)      (Remote)
                |
        Sivaxi Landing Page
                |
        Native Federation
           /         \
        Vixi       Portfolio
       (Routes)     (Routes)
```

### Shell — Host

Responsibilities:

- Provide the shared Sivaxi landing page and navigation.
- Initialize Native Federation.
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

Native Federation enables the Shell to load application routes exposed by Vixi and Portfolio.

### Shell Initialization

The Shell initializes federation before importing its application bootstrap.

The current runtime configuration determines whether local or production remote entry URLs should be used.

Conceptually, the remote registrations are:

| Remote name | Local remote entry |
|---|---|
| `vixi` | `http://vixi.sivaxi.test/remoteEntry.json` |
| `portfolio` | `http://portfolio.sivaxi.test/remoteEntry.json` |

The production configuration must use the actual deployed remote entry URLs.

Federation initialization must complete before the Shell bootstraps so remote modules can be resolved during routing.

### Remote Route Exposure

Vixi and Portfolio expose their route configurations through their respective `federation.config.mjs` files.

The exposure pattern for Vixi is:

```javascript
exposes: {
  './Component': './projects/vixi/src/app/app.ts',
  './Routes': './projects/vixi/src/app/app.routes.ts',
},
```

Portfolio uses the equivalent paths for its own application component and route configuration.

Keep these exposure paths aligned with the actual workspace file locations and exported symbols.

### Shell Route Loading

The Shell uses `loadRemoteModule` and `loadChildren` to load remote route configurations.

The intended route structure is:

```typescript
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
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

The actual Shell route configuration should also include the landing-page route and any required redirects.

The Portfolio remote currently defines a `home` route. Consequently, its home page is available at `/portfolio/home` when integrated into the Shell, unless an additional redirect is configured.

Remote routes should remain owned by their respective applications rather than being duplicated in the Shell.

## Docker Development Environment

- `Dockerfile.dev` provides the Node.js development environment.
- Docker Compose runs the Angular applications and Traefik.
- Workspace source is mounted into development containers so source changes can trigger rebuilds.
- A named `node_modules` volume is used for container dependencies.
- Angular development servers bind to an address accessible from other containers.
- Traefik routes browser requests to the correct Angular service.

The `.sivaxi.test` hostnames are used for browser access, while the Docker service configuration determines how Traefik reaches the containers.

## Development Guidelines

- Keep each application's features inside its own project.
- Keep the Shell landing page separate from remote-specific application logic.
- Avoid unnecessary coupling between Shell and the remotes.
- Expose only the routes or modules other applications need.
- Share dependencies only when there is a clear benefit.
- Keep Docker Compose responsible for local service orchestration.
- Keep Traefik responsible for local hostname routing.
- Use `routerLink` for internal Shell navigation.
- Use application URLs for navigation between standalone applications.
- Centralize branding references in the shared library.
- Centralize environment-aware URL selection.
- Avoid duplicating shared logos across applications.
- Preserve existing theme variables and artwork styles when refactoring templates.
- Keep section IDs unique.
- Update this README when federation, asset hosting, or deployment configuration changes.

## Current Status

### Workspace and Development Environment

- [x] Angular workspace created.
- [x] Shell, Vixi, and Portfolio applications created.
- [x] Docker Compose development environment configured.
- [x] Traefik hostname routing working locally with `.sivaxi.test` domains.
- [x] Shell and Portfolio accessible through their local domains.
- [x] Portfolio home page accessible at `http://portfolio.sivaxi.test/home`.

### Micro-Frontend Integration

- [x] Shell configured to initialize Native Federation.
- [x] Portfolio remote entry verified locally.
- [x] Portfolio route accessible through the Shell at `/portfolio/home`.
- [x] Portfolio route accessible independently.
- [ ] Resolve and verify Vixi's local `remoteEntry.json` endpoint.
- [ ] Verify integrated navigation into both remotes after the latest changes.
- [ ] Confirm clean browser-console output during integrated navigation.

### Landing Page and Branding

- [x] Landing page sections separated into focused components.
- [x] Header component created.
- [x] Hero section component created.
- [x] Engineering principles component created.
- [x] Products section component created.
- [x] Technology section component created.
- [x] Footer component created.
- [x] Sivaxi logo collection added to the shared project's public directory.
- [x] Centralized branding constants introduced.
- [x] Header and footer templates refined for responsive layouts.
- [ ] Verify that all landing-page components are connected through `Home`.
- [ ] Verify logo switching against the actual `ThemeService` implementation.
- [ ] Configure and verify centralized asset serving.
- [ ] Verify responsive layouts and in-page navigation.
- [ ] Verify product links in the integrated environment.

### Production Readiness

- [ ] Production builds and deployment configuration.
- [ ] Production remote URL and asset configuration.
- [ ] Dependency compatibility and versioning strategy.
- [ ] Independent remote deployment and release workflow.
- [ ] Production routing, refresh, and asset-loading verification.

Status should be updated as changes are tested and confirmed.

## Future Deployment

The current Docker setup is intended for local development.

Production deployment will require:

- Configuring host and remote entry URLs for deployed environments.
- Ensuring remote assets are reachable from the host application.
- Establishing a shared asset-serving strategy.
- Defining dependency compatibility and versioning practices.
- Establishing a deployment and release strategy for independently developed remotes.
- Verifying production builds and integrated routing.
- Confirming routing, refresh behavior, and asset loading in production.

Production hosting and deployment details will be documented once the deployment architecture is finalized.
