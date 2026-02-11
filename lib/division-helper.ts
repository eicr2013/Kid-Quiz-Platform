/**
 * Helper to generate division pairs that divide evenly
 */
export function generateEvenDivisionPair(divisorMin: number, divisorMax: number, resultMin: number, resultMax: number): { dividend: number, divisor: number } {
  const divisor = Math.floor(Math.random() * (divisorMax - divisorMin + 1)) + divisorMin;
  const quotient = Math.floor(Math.random() * (resultMax - resultMin + 1)) + resultMin;
  const dividend = divisor * quotient;
  
  return { dividend, divisor };
}

/**
 * Check if a division has no remainder
 */
export function dividesEvenly(dividend: number, divisor: number): boolean {
  return dividend % divisor === 0;
}
