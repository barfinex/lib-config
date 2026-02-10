# @barfinex/config

**`@barfinex/config`** is the **centralized configuration and environment management layer** of the [Barfinex](https://barfinex.com) ecosystem — an open-source platform for algorithmic trading, quantitative research, and digital asset infrastructure.

This package provides a unified way to **define, load, and validate configuration options** across all Barfinex services and libraries. It ensures that every microservice (detectors, advisors, connectors, etc.) works with a consistent and validated configuration source.

---

It helps to:
- provide **consistent environment variables and configuration models**;
- reduce duplication of config handling logic across services;
- improve reliability by validating required settings before service startup.

---

## 📦 Installation

To install the package, use npm or yarn:

```sh
npm install @barfinex/config
```

or

```sh
yarn add @barfinex/config
```

---

## 📚 What's Included

The `@barfinex/config` package provides:

- **Interfaces** — type-safe configuration contracts (`ConfigInterface`).
- **ConfigService** — centralized service for managing environment variables and defaults.
- **ConfigModule** — NestJS module for easy integration with microservices.
- **Validation Layer** — ensures all required configuration keys are present and valid.

---

## 🤝 Contributing

We welcome contributions to help grow the **open Barfinex standard**:

- 🛠 Open an issue or submit a PR
- 💡 Propose new configuration features or improvements
- 💬 Share feedback or use cases

Join the conversation in our Telegram community: [t.me/barfinex](https://t.me/barfinex)

---

## 📜 License

This repository is licensed under the [Apache License 2.0](LICENSE) with additional restrictions.

### Key Terms:
1. **Attribution**: Proper credit must be given to the original author, Barfin Network Limited, with a link to the official website: [https://barfinex.com/](https://barfinex.com/).
2. **Non-Commercial Use**: The use of this codebase for commercial purposes is prohibited without explicit written permission.
3. **Display Requirements**: For non-commercial use, the following must be displayed:
   - The name "Barfin Network Limited".
   - The official logo.
   - A working link to [https://barfinex.com/](https://barfinex.com/).

For further details or to request commercial use permissions, contact **Barfin Network Limited** through the official website.
