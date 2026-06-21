import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — className combiner.
 * Merges Tailwind classes intelligently (later classes win over earlier ones).
 *
 * @example
 * cn("px-2 py-1", "px-4")  // → "py-1 px-4" (px-4 wins)
 * cn("bg-red-500", isActive && "bg-blue-500")  // → "bg-blue-500" if active
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
