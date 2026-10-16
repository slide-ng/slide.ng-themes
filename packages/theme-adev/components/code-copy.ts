export const COPY_ICON =
  'M9 3h9a2 2 0 0 1 2 2v11h-2V5H9Zm-3 4h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm0 2v10h9V9Z';
export const COPIED_ICON = 'M9.55 18 3.85 12.3l1.43-1.43 4.27 4.27 9.17-9.17 1.43 1.43Z';

export async function copyCode(host: HTMLElement): Promise<boolean> {
  const source = host.querySelector('.slidev-code') ?? host.querySelector('[class$="-body"]');
  const text = source?.textContent;
  if (!text) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
