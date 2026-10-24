import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectAccessibleInThemes } from "@/test/a11y";
import { CodeBlock } from "./code-block";

const layout = `export default function RootLayout() {\n  return <html lang="pt-BR" />;\n}`;

describe("CodeBlock", () => {
  it("copia o código exato e avisa que copiou", async () => {
    const user = userEvent.setup();
    render(<CodeBlock title="app/layout.tsx" code={layout} />);

    await user.click(screen.getByRole("button", { name: "Copiar app/layout.tsx" }));

    expect(await screen.findByText("Copiado")).toBeInTheDocument();
    expect(await navigator.clipboard.readText()).toBe(layout);
  });

  it("limpa o aviso depois de um tempo, para um novo clique ser anunciado de novo", async () => {
    const user = userEvent.setup();
    render(<CodeBlock title="terminal" code="npm run dev" />);

    await user.click(screen.getByRole("button", { name: "Copiar terminal" }));
    expect(await screen.findByText("Copiado")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByRole("status")).toBeEmptyDOMElement(), { timeout: 3000 });
  });

  it("avisa quando não consegue copiar", async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(new Error("negado"));
    render(<CodeBlock title="terminal" code="npx shadcn@latest add @marcio/button" />);

    await user.click(screen.getByRole("button", { name: "Copiar terminal" }));

    expect(await screen.findByText("Não foi possível copiar")).toBeInTheDocument();
    expect(screen.queryByText("Copiado")).not.toBeInTheDocument();
  });

  it("não tem violações de axe nos dois temas", async () => {
    await expectAccessibleInThemes(<CodeBlock title="terminal" code="npm run dev" />);
  });
});
