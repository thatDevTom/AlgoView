/** Converts the displayed Big-O label into a numeric growth function. */
export function complexityFn(expr: string): (n: number) => number {
  const key = expr
    .replace(/O\(|\)/g, "")
    .replace(/\^2/g, "²")
    .replace(/\^3/g, "³")
    .trim();

  switch (key) {
    case "1":
      return () => 1;
    case "log n":
      return (n) => Math.log2(Math.max(n, 1));
    case "n":
      return (n) => n;
    case "n log n":
      return (n) => n * Math.log2(Math.max(n, 1));
    case "n²":
      return (n) => n * n;
    case "n³":
      return (n) => n * n * n;
    default:
      return (n) => n;
  }
}
