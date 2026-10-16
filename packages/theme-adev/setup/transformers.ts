const ALERT =
  /(^|\n\n)(NOTE|TIP|TODO|QUESTION|SUMMARY|TLDR|CRITICAL|IMPORTANT|HELPFUL): ?([^\n]*(?:\n[^\n]+)*)/g;
const FENCE = /^[ \t]*(```|~~~)/gm;

const escapeBraces = (text: string) =>
  text
    .split(/(`+[^`]*`+)/)
    .map((part, i) => (i % 2 ? part : part.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;')))
    .join('');

const inFence = (source: string, offset: number) =>
  (source.slice(0, offset).match(FENCE) ?? []).length % 2 === 1;

export default () => ({
  pre: [
    ({ s }: { s: { replace: (re: RegExp, fn: (...args: any[]) => string) => unknown } }) => {
      s.replace(
        ALERT,
        (all: string, lead: string, kind: string, text: string, offset: number, source: string) =>
          inFence(source, offset) || /^[ \t]*(```|~~~)/m.test(text)
            ? all
            : `${lead}<adev-alert kind="${kind.toLowerCase()}">${escapeBraces(text.trim())}</adev-alert>`,
      );
    },
  ],
});
