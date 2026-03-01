# @barfinex/config

**Centralized configuration and environment management** for the [Barfinex](https://barfinex.com) ecosystem — the open platform for algorithmic trading where data, signals, and decisions flow in one controllable system.

This library provides a **unified, type-safe way** to load and validate configuration across Barfinex services (Provider, Detector, connectors, and apps). One source of truth for env vars and settings means fewer surprises in production and faster onboarding.

---

## What it does

- **Typed configuration** — `ConfigInterface` and `ConfigService` for consistent contracts across services.
- **Environment & files** — load from environment variables and optional config files with validation.
- **NestJS integration** — `ConfigModule` plugs into your Nest app so any service can inject config.
- **Startup safety** — validate required keys before the app starts; fail fast with clear errors.

Use it in Provider, Detector, or any Barfinex microservice so they all speak the same configuration language.

---

## Installation

```sh
npm install @barfinex/config
```

or

```sh
yarn add @barfinex/config
```

---

## What's included

| Export | Purpose |
|--------|--------|
| `ConfigModule` | NestJS module for DI and config loading. |
| `ConfigService` | Service to read and validate env/config values. |
| `ConfigInterface` | TypeScript interfaces for configuration contracts. |

---

## Documentation

- **Barfinex overview** — [First Steps](https://barfinex.com/docs/first-steps), [Architecture](https://barfinex.com/docs/architecture), [Glossary](https://barfinex.com/docs/glossary).
- **Provider & deployment** — [Installation provider](https://barfinex.com/docs/installation-provider), [Docker Compose for Provider](https://barfinex.com/docs/installation-provider-docker-compose), [Understanding Provider Logs](https://barfinex.com/docs/installation-provider-logs).
- **Detector** — [Installation detector](https://barfinex.com/docs/installation-detector).
- **Studio** — [Terminal Configuration](https://barfinex.com/docs/configuration-studio), [Registering Provider in Studio](https://barfinex.com/docs/configuration-studio-provider).
- **APIs & troubleshooting** — [Building with the API](https://barfinex.com/docs/frontend-api), [Provider API reference](https://barfinex.com/docs/provider-api), [Typical problems and solutions](https://barfinex.com/docs/troubleshooting).

---

## Contributing

Ideas and PRs are welcome: open an [issue](https://github.com/barfinex/lib-config/issues) or submit a pull request. Join the community: [Telegram](https://t.me/barfinex) · [GitHub](https://github.com/barfinex).

---

## License

Licensed under the [Apache License 2.0](LICENSE) with additional terms. Attribution to **Barfin Network Limited** and a link to [https://barfinex.com](https://barfinex.com) are required. Commercial use requires explicit permission. See [LICENSE](LICENSE) and the [Barfinex site](https://barfinex.com) for details.
