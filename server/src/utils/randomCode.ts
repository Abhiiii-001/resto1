
export function generateRandomNumber(n: number): number {
    if (n <= 0) {
      throw new Error("Parameter 'n' must be greater than 0");
    }
    const min = Math.pow(10, n - 1); // Smallest n-digit number
    const max = Math.pow(10, n) - 1; // Largest n-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
