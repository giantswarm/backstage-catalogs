# Changelog

All notable changes to this project will be documented in this file.

Since we don't do releases in this repository, we use the date of the
change to structure the log.

## 2026-01-08

- Add `charts.yaml` catalog

## 2025-07-01

### Changes

- Change `githubTokenSecretRef` in `go-service` and `python-service` templates.

## 2025-05-29

### Changes

- Update `go-service`, `python-service` and `rds-and-elasticache-service` templates.

## 2024-11-19

### Added

- Add `python-service` template.

## 2024-09-25

### Added

- Add `rds-and-elasticache-service` template.

## 2024-09-17

### Changes

- Remove integrations from `go-service` template.

## 2024-09-03

### Changes

- Generate kratix resource request from `go-service` template.

## 2024-08-27

### Changes

- Generate crossplane claim from `go-service` template.

## 2024-08-21

### Changes

- `go-service` template improvements:
  - use GSStepLayout for form steps;
  - update ESO step wordings.

## 2024-07-25

- Added templates directory for public templates.
- Added go-service template.

## 2024-07-10

- Added automation to update catalog content.

## 2024-06-19

- Added first catalogs for components, groups, and users and basic documentation.
- Updated groups catalog to include member names, use deterministic sort order.
- Add full users catalog
