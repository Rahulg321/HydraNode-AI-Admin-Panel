import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// function formatDate(date: Date) {
//   const options = { day: "2-digit", month: "long", year: "numeric" };
//   return new Intl.DateTimeFormat("en-US", options).format(date);
// }
