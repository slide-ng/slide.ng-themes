const FENCE = /^(`{3,})([^\n`]*)\n([\s\S]*?)^\1`*[ \t]*$/gm;
const VERDICT = /\{\s*(prefer|avoid)\s*\}/;
const TITLE = /\[([^\]]*)\]/;
const SNIPPET = /^<<<[ \t]*(\S+?)(#[\w-]+)?(?:[ \t]+([^\s{]\S*))?[ \t]*(\{.*)?$/gm;
const WRAPPED = /<adev-[\w-]+[^>]*>\s*$/;

const LANGUAGES: Record<string, string> = {
  ts: 'TypeScript',
  js: 'JavaScript',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  json: 'JSON',
  md: 'Markdown',
  sh: 'Shell',
  bash: 'Shell',
  yml: 'YAML',
  yaml: 'YAML',
};

const attribute = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');

export function verdictFences(markdown: string) {
  return markdown.replace(FENCE, (all, ticks: string, info: string, code: string) => {
    const verdict = VERDICT.exec(info);
    if (!verdict) return all;
    const title = TITLE.exec(info)?.[1].trim();
    const rest = info
      .replace(VERDICT, '')
      .replace(TITLE, '')
      .replace(/[ \t]+/g, ' ')
      .trim();
    const tag = `adev-${verdict[1]}`;
    const open = title ? `<${tag} title="${attribute(title)}">` : `<${tag}>`;
    return `${open}\n\n${ticks}${rest}\n${code}${ticks}\n\n</${tag}>`;
  });
}

const FENCED = /(^(`{3,})[^\n`]*\n[\s\S]*?^\2`*[ \t]*$)/gm;

function cards(text: string) {
  return text.replace(
    SNIPPET,
    (all, path: string, _region, lang: string | undefined, _meta, offset: number) => {
      if (WRAPPED.test(text.slice(0, offset))) return all;
      const name = path.split('/').pop() ?? path;
      const extension = name.includes('.') ? name.split('.').pop()! : '';
      const key = (lang ?? extension).toLowerCase();
      const label = LANGUAGES[key] ?? (key ? key.toUpperCase() : '');
      return `<adev-code-card title="${attribute(name)}" label="${attribute(label)}">\n\n${all}\n\n</adev-code-card>`;
    },
  );
}

export function snippetCards(markdown: string) {
  const parts = markdown.split(FENCED);
  return parts.map((part, i) => (i % 3 === 0 ? cards(part) : part)).join('');
}

export default ({
  s,
}: {
  s: { toString(): string; overwrite(a: number, b: number, c: string): unknown };
}) => {
  const before = s.toString();
  const after = snippetCards(verdictFences(before));
  if (after !== before) s.overwrite(0, before.length, after);
};
