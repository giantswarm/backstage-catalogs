// Renders a template directory's manifest the way Backstage's `fetch:template`
// does (Nunjucks with `${{ }}` variables, no autoescape) followed by the edit
// template's clean-up step, and parses the resulting YAML documents.
import { readFileSync } from 'node:fs';
import nunjucks from 'nunjucks';
import { parseAllDocuments } from 'yaml';

const env = new nunjucks.Environment(null, {
  autoescape: false,
  tags: { variableStart: '${{', variableEnd: '}}' },
});
// Registered by giantswarm/backstage's scaffolder module.
env.addFilter('fromJson', value => {
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
});

export function render(path, values) {
  const text = env
    .renderString(readFileSync(path, 'utf8'), { values })
    .replace(/\n\s*\n/g, '\n');
  return parseAllDocuments(text).map(doc => {
    if (doc.errors.length) throw doc.errors[0];
    return doc.toJS();
  });
}
