export default function prefersDark(): boolean {
  if (window) {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    return darkThemeMq.matches ? true : false;
  }
  return true;
}
