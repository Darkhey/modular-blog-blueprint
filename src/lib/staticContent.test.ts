import { describe, expect, it } from 'vitest';
import { safeArticleHtml } from './staticContent';
import { withEditorialRelatedLink } from '../data/editorialLinks';

describe('Static content safety and shared editorial links', () => {
  it('removes executable scripts and unsafe link destinations', () => {
    const output = safeArticleHtml('<p>Text</p><script>alert(1)</script><a href="javascript:alert(1)">Bad</a><img src="https://example.com/photo.jpg" onerror="alert(1)">');
    expect(output).not.toContain('<script');
    expect(output).not.toContain('javascript:');
    expect(output).not.toContain('onerror');
    expect(output).toContain('https://example.com/photo.jpg');
  });
  it('preserves ordinary article links and the explicit nofollow policy', () => {
    const output = safeArticleHtml('<a href="https://ahansdampf.de/handwerk/">Website</a><a href="https://ahansdampf.de" rel="nofollow">Credit</a>');
    expect(output).toContain('href="https://ahansdampf.de/handwerk/"');
    expect(output).toContain('rel="nofollow"');
  });
  it('adds the related article once, and only to the selected existing guides', () => {
    const slug = 'einblasdaemmung-fachbetrieb-einbaudichte-qualitaet';
    const once = withEditorialRelatedLink(slug, '<p>Original</p>');
    expect(once).not.toBe('<p>Original</p>');
    expect(withEditorialRelatedLink(slug, once)).toBe(once);
    expect(withEditorialRelatedLink('unrelated-post', '<p>Original</p>')).toBe('<p>Original</p>');
  });
});