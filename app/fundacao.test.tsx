import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FoundationPage from "@/app/page";
import { axe, setTheme, themes } from "@/test/a11y";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/",
}));

const foundations = ["espacamento", "raio", "elevacao", "movimento", "camadas", "layout", "icones", "densidade"];

describe("página de fundação", () => {
  it.each(foundations)("tem a seção #%s nomeada e mostrando os dois temas", (id) => {
    const { container } = render(<FoundationPage />);
    const section = container.querySelector<HTMLElement>(`section#${id}`);
    expect(section, id).not.toBeNull();
    const labelledBy = section!.getAttribute("aria-labelledby");
    expect(labelledBy && document.getElementById(labelledBy)?.textContent?.trim()).toBeTruthy();
    expect(section!.querySelector('[data-theme="dark"]'), `${id} escuro`).not.toBeNull();
    expect(section!.querySelector('[data-theme="light"]'), `${id} claro`).not.toBeNull();
  });

  it("não tem violações de axe nos dois temas (contraste fica com npm run contrast)", async () => {
    for (const theme of themes) {
      setTheme(theme);
      const { container, unmount } = render(<FoundationPage />);
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  });
});
