import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getErrorMessage(err: any): string {
  if (err.errors && typeof err.errors === 'object') {
    const errorValues = Object.values(err.errors);
    if (errorValues.length > 0) {
      const firstError = errorValues[0];
      if (Array.isArray(firstError) && firstError.length > 0) {
        return firstError[0];
      }
      if (typeof firstError === 'string') {
        return firstError;
      }
    }
  }
  return err.message || 'An unexpected error occurred';
}
