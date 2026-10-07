import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { render } from './render.js';

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

  it('keeps writing the fixed modes from the version', () => {
    assert.deepEqual(edit({ automaticUpgrades: 'no-upgrades' }), {
      tag: '1.2.3',
      semver: null,
      semverFilter: null,
    });
    assert.equal(edit({ automaticUpgrades: 'patch-upgrades' }).semver, '~1.2.3');
    assert.equal(edit({ automaticUpgrades: 'minor-upgrades' }).semver, '^1.2.3');
    assert.equal(
      edit({ automaticUpgrades: 'major-upgrades', includePrereleases: true }).semver,
      '>=1.2.3-0',
    );
  });
});
