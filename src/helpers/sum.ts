export function sum(values: number[]): number {
  return values.reduce((accumulator, current) => (accumulator += current), 0);
}
