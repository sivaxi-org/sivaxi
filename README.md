# Sivaxi Frontend

Sivaxi is a multi-application Angular workspace designed to support independently developed frontend applications using a Micro-Frontend (MFE) architecture.

The workspace uses Docker Compose for local development and Traefik for hostname-based routing. Angular applications are planned to integrate through Native Federation.

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
│   ├── vixi/
│   └── portfolio/
├── Dockerfile.dev
├── compose.yaml
├── package.json
├── package-lock.json
└── README.md
```

The exact application configuration files may vary as federation setup progresses.

## Prerequisites

Install the following tools:

- Node.js 24 or a compatible supported version
- npm
- Docker Engine
- Docker Compose

The existing development environment uses Node.js 24 and npm.

## Getting Started

### 1. Clone or open the workspace

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

Open the applications in a browser using the URLs listed above.

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

### 5. Stop the environment

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

All three applications use port `4200` inside their respective containers. Traefik exposes port `4200` on the host.

The `.localhost` hostnames are intended for local development and generally require no additional DNS configuration.

## Micro-Frontend Design

The intended integration model is:

```text
                    Browser
                       |
                    Traefik
                       |
                     Shell
                    /     \
               Vixi       Portfolio
               Remote      Remote
```

### Shell — Host

Responsibilities:

- Provide the common Sivaxi layout and navigation.
- Load remote applications through Native Federation.
- Compose application routes.
- Potentially manage shared UI components and cross-application navigation.

### Vixi — Remote

Responsibilities:

- Own the Vixi application features and routes.
- Maintain its own application code.
- Expose selected routes or modules for Shell to load.

### Portfolio — Remote

Responsibilities:

- Own portfolio pages and project-related features.
- Maintain its own application code.
- Expose selected routes or modules for Shell to load.

Each remote should keep clear feature boundaries rather than placing all application logic inside Shell.

## Federation Implementation Plan

1. Configure Shell as the dynamic federation host.
2. Configure Vixi as a federation remote.
3. Configure Portfolio as a federation remote.
4. Register remote entry points in the host's remote configuration.
5. Load remote routes or modules from Shell.
6. Configure compatible shared dependencies where appropriate.
7. Verify integrated navigation and independent remote development.

Federation configuration and application integration are still in progress. The initial Docker and hostname-routing setup has already been confirmed working.

## Development Guidelines

- Keep each application's features inside its own project.
- Avoid unnecessary coupling between Shell and remote applications.
- Share dependencies only when there is a clear benefit.
- Keep Docker Compose responsible for local service orchestration.
- Keep Traefik responsible for local hostname routing.
- Prefer small, focused changes and avoid unnecessary testing.
- Update this README when the federation configuration and deployment workflow change.

## Current Status

- [x] Angular workspace created.
- [x] Shell, Vixi and Portfolio applications created.
- [x] Docker Compose development environment configured.
- [x] Traefik hostname routing working locally.
- [x] Module Federation architecture selected.
- [ ] Native Federation host configuration.
- [ ] Vixi remote configuration.
- [ ] Portfolio remote configuration.
- [ ] Remote integration into Shell.
- [ ] Production build and deployment configuration.

## Future Deployment

The local Docker setup is intended for development. Production deployment will require configuring the host and remote entry URLs for their deployed environments, ensuring remote assets are reachable, and defining an appropriate versioning and release strategy.

Production hosting and deployment details will be documented when the deployment architecture is finalized.
