import { render, type RenderResult } from "@testing-library/react";
import type { ReactElement } from "react";
import { expect } from "vitest";
import { configureAxe } from "vitest-axe";

export const themes = ["dark", "light"] as const;
export type Theme = (typeof themes)[number];

export const axe = configureAxe({
  rules: {
    "color-contrast": { enabled: false },
    region: { enabled: false },
  },
});

export function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function renderInTheme(theme: Theme, ui: ReactElement): RenderResult {
  setTheme(theme);
  return render(ui);
}

export async function expectAccessibleInThemes(ui: ReactElement) {
  for (const theme of themes) {
    const { container, unmount } = renderInTheme(theme, ui);
    expect(await axe(container)).toHaveNoViolations();
    unmount();
  }
}
