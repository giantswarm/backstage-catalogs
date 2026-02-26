# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-02-26

### Added

- Add `app-deployment` template.
- Add `charts.yaml` catalog.
- Add `python-service` template.
- Add `rds-and-elasticache-service` template.
- Add templates directory for public templates.
- Add `go-service` template.
- Add automation to update catalog content.
- Add first catalogs for components, groups, and users and basic documentation.
- Add full users catalog.

### Changed

- Change namespace for `charts.yaml` components to `giantswarm`.
- Change `githubTokenSecretRef` in `go-service` and `python-service` templates.
- Update `go-service`, `python-service` and `rds-and-elasticache-service` templates.
- Remove integrations from `go-service` template.
- Generate kratix resource request from `go-service` template.
- Generate crossplane claim from `go-service` template.
- `go-service` template improvements: use GSStepLayout for form steps; update ESO step wordings.
- Update groups catalog to include member names, use deterministic sort order.

### Removed

- Remove `users.yaml` catalog.
- Remove `components.yaml` catalog.

[Unreleased]: https://github.com/giantswarm/backstage-catalogs/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/giantswarm/backstage-catalogs/releases/tag/v0.1.0
