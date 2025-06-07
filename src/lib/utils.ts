import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

//essa util é só pra o shadcn mesmo

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
