// The address logic of the demo theme switcher, no browser needed (the .ts file has no imports, so Node can load it).
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { THEMES, demoUrl, detectSite } from '../examples/components/demo-switcher-urls.ts';

describe('detectSite', () => {
  it('knows the five themes', () => {
    assert.deepEqual(THEMES, ['adev', 'seriph', 'shibainu', 'bricks', 'apple-basic']);
  });
  it('reads GitHub Pages addresses and links to the siblings', () => {
    for (const path of [
      '/slide.ng-themes/bricks/',
      '/slide.ng-themes/bricks/index.html',
      '/slide.ng-themes/bricks',
    ]) {
      const site = detectSite(path);
      assert.equal(site?.theme, 'bricks', path);
      assert.equal(site?.url('apple-basic'), '../apple-basic/');
    }
  });
  it('reads slide-ng.dev addresses and links to the siblings', () => {
    for (const path of ['/demos/theme-adev/', '/demos/theme-adev/index.html']) {
      const site = detectSite(path);
      assert.equal(site?.theme, 'adev', path);
      assert.equal(site?.url('shibainu'), '/demos/theme-shibainu/');
    }
  });
  it('reads a theme name with a dash on both sites', () => {
    assert.equal(detectSite('/slide.ng-themes/apple-basic/')?.theme, 'apple-basic');
    assert.equal(detectSite('/demos/theme-apple-basic/')?.theme, 'apple-basic');
  });
  it('returns null where it does not know the place', () => {
    for (const path of [
      '/',
      '/1',
      '/adev/',
      '/demos/theme-nope/',
      '/slide.ng-themes/',
      '/demos/tour/',
    ])
      assert.equal(detectSite(path), null, path);
  });
});

describe('demoUrl', () => {
  const pages = detectSite('/slide.ng-themes/seriph/');
  const docs = detectSite('/demos/theme-seriph/');
  it('keeps the slide number in the hash', () => {
    assert.equal(demoUrl(pages, 'adev', 12), '../adev/#/12');
    assert.equal(demoUrl(docs, 'adev', 12), '/demos/theme-adev/#/12');
  });
  it('starts at slide 1 when the number makes no sense', () => {
    for (const n of [0, -3, 2.5, NaN, undefined])
      assert.equal(demoUrl(pages, 'bricks', n), '../bricks/#/1');
  });
});
