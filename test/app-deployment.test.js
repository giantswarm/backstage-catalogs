import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import { render } from './render.js';

const writtenRanges = JSON.parse(
  readFileSync(new URL('./fixtures/app-deployment-written-ranges.json', import.meta.url), 'utf8'),
);

const manifest = new URL(
  '../templates/app-deployment/template/manifest.yaml',
  import.meta.url,
).pathname;

// What the edit template passes, as the deployment page's Edit button
// pre-fills it.
function edit(values) {
  const [ociRepository] = render(manifest, {
    name: 'hello-world',
    namespace: 'org-acme',
    chartTag: '1.2.3',
    automaticUpgrades: 'no-upgrades',
    valueSources: [],
    secretValuesMap: '{}',
    editMode: true,
    ...values,
  });
  assert.equal(ociRepository.kind, 'OCIRepository');
  return ociRepository.spec.ref;
}

describe('app-deployment edit', () => {
  it('keeps an upper-bounded custom range unchanged', () => {
    const ref = edit({
      automaticUpgrades: 'custom-range',
      semverRange: '>=1.0.0 <3.0.0',
    });
    assert.deepEqual(ref, { tag: null, semver: '>=1.0.0 <3.0.0', semverFilter: null });
  });

  it('keeps a pre-release range unchanged', () => {
    const ref = edit({
      automaticUpgrades: 'custom-range',
      semverRange: '>=0.0.0-0',
    });
    assert.deepEqual(ref, { tag: null, semver: '>=0.0.0-0', semverFilter: null });
  });

  it('writes a custom range verbatim, whatever the version and pre-release fields say', () => {
    const ref = edit({
      automaticUpgrades: 'custom-range',
      semverRange: ' >=2.0.0-0 <2.5.0 || 3.x ',
      chartTag: '9.9.9',
      includePrereleases: true,
      semverFilter: '.*-rc\\..*',
    });
    assert.deepEqual(ref, {
      tag: null,
      semver: '>=2.0.0-0 <2.5.0 || 3.x',
      semverFilter: '.*-rc\\..*',
    });
  });

  // The ranges the deployment page's Edit button expects; giantswarm/backstage
  // checks its side against a copy of the same fixture.
  for (const { mode, chartVersion, includePrereleases, semver } of writtenRanges.cases) {
    it(`writes ${semver ?? 'a pinned tag'} for ${mode} of ${chartVersion}${includePrereleases ? ' with pre-releases' : ''}`, () => {
      assert.deepEqual(
        edit({ automaticUpgrades: mode, chartTag: chartVersion, includePrereleases }),
        semver === null
          ? { tag: chartVersion, semver: null, semverFilter: null }
          : { tag: null, semver, semverFilter: null },
      );
    });
  }
});
