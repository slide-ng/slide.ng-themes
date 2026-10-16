const PIE = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `chart-${n}`);

function resolver() {
  const canvas = Object.assign(document.createElement('canvas'), { width: 1, height: 1 });
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  const probe = document.createElement('i');
  document.documentElement.appendChild(probe);
  const hex = (css: string) => {
    probe.style.color = css;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = getComputedStyle(probe).color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
  };
  return { hex, done: () => probe.remove() };
}

export default () => {
  const { hex, done } = resolver();
  const token = (name: string) => hex(`var(--adev-${name})`);
  const vars: Record<string, string> = {
    background: token('page'),
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    primaryColor: token('septenary'),
    primaryTextColor: token('primary'),
    primaryBorderColor: token('quaternary'),
    secondaryColor: token('senary'),
    secondaryTextColor: token('primary'),
    secondaryBorderColor: token('quaternary'),
    tertiaryColor: token('octonary'),
    tertiaryTextColor: token('primary'),
    tertiaryBorderColor: token('quinary'),
    lineColor: token('quaternary'),
    textColor: token('primary'),
    mainBkg: token('septenary'),
    nodeBorder: token('quaternary'),
    clusterBkg: token('octonary'),
    clusterBorder: token('quinary'),
    titleColor: token('primary'),
    edgeLabelBackground: token('page'),
    actorBkg: token('septenary'),
    actorBorder: token('quaternary'),
    actorTextColor: token('primary'),
    actorLineColor: token('quinary'),
    signalColor: token('primary'),
    signalTextColor: token('primary'),
    labelBoxBkgColor: token('septenary'),
    labelBoxBorderColor: token('quaternary'),
    labelTextColor: token('primary'),
    loopTextColor: token('primary'),
    noteBkgColor: token('septenary'),
    noteBorderColor: token('quaternary'),
    noteTextColor: token('primary'),
    activationBkgColor: token('senary'),
    activationBorderColor: token('quaternary'),
    sequenceNumberColor: token('page'),
    pieTitleTextSize: '20px',
    pieTitleTextColor: token('primary'),
    pieSectionTextColor: token('chart-ink'),
    pieSectionTextSize: '15px',
    pieLegendTextColor: token('primary'),
    pieLegendTextSize: '15px',
    pieStrokeColor: token('page'),
    pieStrokeWidth: '2px',
    pieOuterStrokeColor: token('page'),
    pieOuterStrokeWidth: '0px',
    pieOpacity: '1',
  };
  PIE.forEach((name, i) => (vars[`pie${i + 1}`] = token(name)));
  done();
  return { theme: 'base', themeVariables: vars };
};
