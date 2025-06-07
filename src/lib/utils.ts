import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

//essa util de lib é só pra connfiguração do shadcn mesmo

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
