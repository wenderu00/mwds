import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["lead", "display-xl", "display-lg", "display-md", "display-sm", "mono-sm", "mono-xs"] }],
      tracking: [{ tracking: ["kicker"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
