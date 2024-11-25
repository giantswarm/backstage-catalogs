# Backstage catalogs by Giant Swarm

This repository provides public Backstage catalogs for Giant Swarm customers.

Catalog files are stored in the [`catalogs`](https://github.com/giantswarm/backstage-catalogs/tree/main/catalogs) directory.

All entities in these catalogs use the `giantswarm` namespace.

## Catalogs

### Components

File: [components.yaml](https://github.com/giantswarm/backstage-catalogs/blob/main/catalogs/components.yaml)

The components catalog consist of apps published in the public app catalogs by Giant Swarm, represented as `Component` entities. For each app, only information on the latest release is included.

### Groups

File: [groups.yaml](https://github.com/giantswarm/backstage-catalogs/blob/main/catalogs/groups.yaml)

The groups catalog provides information on some Giant Swarm product engineering teams, in the form of `Group` entities. Components in the components catalog are usually associated with one of these teams to indicate the team responsible for the component. In some cases, the owner team named on the component no longer exists as a team at Giant Swarm. In this case you will not find a corresponding group entity in the groups catalog.

### Users

File: [users.yaml](https://github.com/giantswarm/backstage-catalogs/blob/main/catalogs/users.yaml)

This catalog includes the team members of the Giant Swarm teams included in the groups catalog, as well as other Giant Swarm employees.

### Templates

Folder: [templates](https://github.com/giantswarm/backstage-catalogs/tree/main/templates)

Scaffolder templates. Note: not all are functional.

## Usage

To have these catalogs read from your Backstage instance, configure your app config like this:

```yaml
catalog:
  locations:
    - type: url
      target: https://github.com/giantswarm/backstage-catalogs/blob/main/catalogs/components.yaml
      rules:
        allow:
          - Component
    - type: url
      target: https://github.com/giantswarm/backstage-catalogs/blob/main/catalogs/groups.yaml
      rules:
        allow:
          - Group
    - type: url
      target: https://github.com/giantswarm/backstage-catalogs/blob/main/catalogs/users.yaml
      rules:
        allow:
          - User
```
