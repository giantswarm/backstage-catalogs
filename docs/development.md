# Developing on backstage-catalogs

## Template tests

`test/` renders the scaffolder templates' manifests the way Backstage's `fetch:template` does and checks the output. Run them with:

```sh
cd test
npm ci
npm test
```

The workflow `Template tests` runs them on every pull request.
