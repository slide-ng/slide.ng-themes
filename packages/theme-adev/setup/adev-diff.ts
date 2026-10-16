const MARK = /[ \t]*(?:\/\/|#|\/\*|<!--)[ \t]*\[!code (\+\+|--)\][ \t]*(?:\*\/|-->)?[ \t]*$/;

let marks: Record<number, string> = {};

export const adevDiff = () => ({
  name: 'adev-diff',
  preprocess(code: string) {
    marks = {};
    return code
      .split('\n')
      .map((text, i) => {
        const found = MARK.exec(text);
        if (!found) return text;
        marks[i + 1] = found[1];
        return text.slice(0, found.index);
      })
      .join('\n');
  },
  line(this: any, node: unknown, line: number) {
    const mark = marks[line];
    if (mark) this.addClassToHast(node, ['diff', mark === '++' ? 'add' : 'remove']);
  },
});
