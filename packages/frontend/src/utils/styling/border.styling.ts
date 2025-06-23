export function getAlternatingBorders(index: number): string {
  const borderClasses = ["border-neutral", "border-secondary", "border-accent"];
  return borderClasses[index % borderClasses.length];
}
