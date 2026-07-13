# Contributing to Hexagon Badge Generator

Thanks for your interest in contributing! This document covers how to get set
up and how to submit changes.

By participating in this project, you agree to abide by the
[Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm

### Setup

```bash
git clone https://github.com/PhyoeBlitz/badge-generate.git
cd badge-generate
npm install
npm run dev
```

The app runs at `http://localhost:5173/badge-generate/`.

## Development Workflow

1. Fork the repository and create a branch off `main`:
   ```bash
   git checkout -b feature/short-description
   ```
2. Make your changes.
3. Run the checks before committing:
   ```bash
   npm run lint
   npm run build
   ```
4. Commit using a clear, descriptive message.
5. Push your branch and open a Pull Request against `main`.

## Pull Request Guidelines

- Keep PRs focused on a single change; avoid bundling unrelated fixes.
- Describe *what* changed and *why* in the PR description.
- Link any related issues (e.g. `Closes #12`).
- Make sure `npm run lint` and `npm run build` both pass.
- Add or update the README if your change affects usage or setup.

## Reporting Bugs / Requesting Features

Please use the [issue templates](.github/ISSUE_TEMPLATE) when opening a new
issue — they help ensure we have the information needed to help.

## Security Issues

Please do not open a public issue for security vulnerabilities. See
[SECURITY.md](SECURITY.md) for how to report them responsibly.

## License

By contributing, you agree that your contributions will be licensed under the
project's [GPL-3.0 License](LICENSE).
