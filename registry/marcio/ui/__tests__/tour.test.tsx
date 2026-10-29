import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef, useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Tour, type TourStep } from "@/registry/marcio/ui/tour";
import { expectAccessibleInThemes } from "@/test/a11y";

const steps: TourStep[] = [
  { target: "#timer", title: "O timer", content: "Aqui você vê o tempo restante." },
  { target: "#tarefas", title: "Tarefas", content: "Liste o que vai fazer.", placement: "right" },
  { title: "Pronto", content: "Bom foco." },
];

function Page({ initialOpen = false, onFinish = () => {}, onSkip = () => {} }: { initialOpen?: boolean; onFinish?: () => void; onSkip?: (step: number) => void }) {
  const [open, setOpen] = useState(initialOpen);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Ver tour
      </button>
      <div id="timer">25:00</div>
      <ul id="tarefas">
        <li>Escrever</li>
      </ul>
      <Tour steps={steps} open={open} onOpenChange={setOpen} onFinish={onFinish} onSkip={onSkip} />
    </>
  );
}

const tour = () => screen.getByRole("dialog");

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Tour", () => {
  it("é um diálogo modal com o nome do passo, contador e botões", async () => {
    const user = userEvent.setup();
    render(<Page />);
    await user.click(screen.getByRole("button", { name: "Ver tour" }));
    expect(tour()).toHaveAccessibleName("O timer");
    expect(tour()).toHaveAttribute("aria-modal", "true");
    expect(tour()).toHaveAccessibleDescription(/Aqui você vê o tempo restante\./);
    expect(within(tour()).getByText("1 de 3")).toBeInTheDocument();
    expect(within(tour()).getByRole("button", { name: "Pular" })).toBeInTheDocument();
    expect(within(tour()).queryByRole("button", { name: "Voltar" })).not.toBeInTheDocument();
    expect(within(tour()).getByRole("button", { name: "Avançar" })).toHaveFocus();
  });

  it("só escuta rolagem e redimensionamento enquanto está aberto", async () => {
    const user = userEvent.setup();
    const add = vi.spyOn(window, "addEventListener");
    const remove = vi.spyOn(window, "removeEventListener");
    const listening = (spy: typeof add, type: string) => spy.mock.calls.filter(([event]) => event === type).length;
    render(<Page />);
    expect(listening(add, "scroll")).toBe(0);
    expect(listening(add, "resize")).toBe(0);
    await user.click(screen.getByRole("button", { name: "Ver tour" }));
    expect(listening(add, "scroll")).toBeGreaterThan(0);
    await user.keyboard("{Escape}");
    expect(listening(remove, "scroll")).toBe(listening(add, "scroll"));
  });

  it("abre sozinho com defaultOpen e fecha sem open controlado", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Tour steps={steps} defaultOpen onOpenChange={onOpenChange} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("avança, volta e anuncia cada passo novo", async () => {
    const user = userEvent.setup();
    render(<Page initialOpen />);
    await user.click(screen.getByRole("button", { name: "Avançar" }));
    const status = within(tour()).getByRole("status");
    expect(status).toHaveTextContent("Tarefas");
    expect(status).toHaveTextContent("Liste o que vai fazer.");
    expect(status).toHaveTextContent("2 de 3");
    expect(tour()).toHaveAccessibleName("Tarefas");
    await user.click(screen.getByRole("button", { name: "Voltar" }));
    expect(within(tour()).getByRole("status")).toHaveTextContent("1 de 3");
    expect(screen.getByRole("button", { name: "Avançar" })).toHaveFocus();
  });

  it("no último passo mostra Entendi, que encerra e chama onFinish", async () => {
    const user = userEvent.setup();
    const onFinish = vi.fn();
    const onSkip = vi.fn();
    render(<Page initialOpen onFinish={onFinish} onSkip={onSkip} />);
    await user.click(screen.getByRole("button", { name: "Avançar" }));
    await user.click(screen.getByRole("button", { name: "Avançar" }));
    expect(screen.queryByRole("button", { name: "Avançar" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Entendi" }));
    expect(onFinish).toHaveBeenCalledTimes(1);
    expect(onSkip).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it.each([
    ["o botão Pular", (user: ReturnType<typeof userEvent.setup>) => user.click(screen.getByRole("button", { name: "Pular" }))],
    ["Esc", (user: ReturnType<typeof userEvent.setup>) => user.keyboard("{Escape}")],
  ])("%s pula o tour no passo atual", async (_name, skip) => {
    const user = userEvent.setup();
    const onSkip = vi.fn();
    const onFinish = vi.fn();
    render(<Page initialOpen onSkip={onSkip} onFinish={onFinish} />);
    await user.click(screen.getByRole("button", { name: "Avançar" }));
    await skip(user);
    expect(onSkip).toHaveBeenCalledWith(1);
    expect(onFinish).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("não fecha com clique fora do balão", async () => {
    render(<Page initialOpen />);
    // O Radix só passa a escutar o pointerdown de fora no tick seguinte à abertura.
    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));
    // O modal põe pointer-events: none no body, então o user-event não clica fora.
    fireEvent.pointerDown(document.body);
    fireEvent.click(document.body);
    expect(tour()).toBeInTheDocument();
  });

  it("prende o foco no balão e devolve ao elemento de origem ao fechar", async () => {
    const user = userEvent.setup();
    render(<Page />);
    const opener = screen.getByRole("button", { name: "Ver tour" });
    await user.click(opener);
    await user.click(screen.getByRole("button", { name: "Avançar" }));
    for (let i = 0; i < 5; i++) {
      await user.tab();
      expect(tour()).toContainElement(document.activeElement as HTMLElement);
    }
    await user.keyboard("{Escape}");
    expect(opener).toHaveFocus();
  });

  it("no modo controlado só muda de passo pelo onStepChange", async () => {
    const user = userEvent.setup();
    const onStepChange = vi.fn();
    render(<Tour steps={steps} open onOpenChange={() => {}} step={1} onStepChange={onStepChange} />);
    expect(within(tour()).getByText("2 de 3")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Avançar" }));
    expect(onStepChange).toHaveBeenCalledWith(2);
    expect(within(tour()).getByText("2 de 3")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Voltar" }));
    expect(onStepChange).toHaveBeenCalledWith(0);
  });

  it("volta ao primeiro passo quando reabre sem step controlado", async () => {
    const user = userEvent.setup();
    render(<Page />);
    await user.click(screen.getByRole("button", { name: "Ver tour" }));
    await user.click(screen.getByRole("button", { name: "Avançar" }));
    await user.keyboard("{Escape}");
    await user.click(screen.getByRole("button", { name: "Ver tour" }));
    expect(within(tour()).getByText("1 de 3")).toBeInTheDocument();
  });

  it("recorta a camada escura em volta do alvo, com o raio de card", () => {
    render(<Page initialOpen />);
    const target = document.getElementById("timer")!;
    vi.spyOn(target, "getBoundingClientRect").mockReturnValue(new DOMRect(100, 50, 200, 40));
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });
    const spotlight = document.querySelector<HTMLElement>("[data-slot=tour-spotlight]")!;
    expect(spotlight).toHaveAttribute("aria-hidden", "true");
    expect(spotlight).toHaveClass("rounded-card");
    expect(spotlight).toHaveClass("outline-scrim");
    expect(spotlight.style).toMatchObject({ top: "42px", left: "92px", width: "216px", height: "56px" });
  });

  it("sem alvo, centraliza o balão sobre a camada escura inteira", async () => {
    const user = userEvent.setup();
    render(<Page initialOpen />);
    await user.click(screen.getByRole("button", { name: "Avançar" }));
    await user.click(screen.getByRole("button", { name: "Avançar" }));
    expect(document.querySelector("[data-slot=tour-spotlight]")).not.toBeInTheDocument();
    expect(document.querySelector("[data-slot=tour-overlay]")).toHaveClass("bg-scrim");
    expect(tour()).toHaveAttribute("data-placement", "center");
  });

  it("aceita ref como alvo e repassa o placement", () => {
    function WithRef() {
      const ref = useRef<HTMLButtonElement>(null);
      return (
        <>
          <button ref={ref} type="button">
            Iniciar
          </button>
          <Tour steps={[{ target: ref, content: "Comece por aqui.", placement: "left" }]} open onOpenChange={() => {}} />
        </>
      );
    }
    render(<WithRef />);
    expect(document.querySelector("[data-slot=tour-spotlight]")).toBeInTheDocument();
    expect(tour()).toHaveAttribute("data-placement", "left");
    expect(tour()).toHaveAccessibleName("Tour guiado");
  });

  it("alvo que não existe na página vira passo centralizado", () => {
    render(<Tour steps={[{ target: "#nao-existe", content: "Oi." }]} open onOpenChange={() => {}} />);
    expect(document.querySelector("[data-slot=tour-spotlight]")).not.toBeInTheDocument();
    expect(tour()).toHaveAttribute("data-placement", "center");
  });

  it.each([
    [false, "smooth"],
    [true, "auto"],
  ])("rola o alvo até ficar visível (movimento reduzido: %s)", async (reduced, behavior) => {
    vi.stubGlobal("matchMedia", (query: string) => ({ matches: reduced && query === "(prefers-reduced-motion: reduce)", media: query, addEventListener() {}, removeEventListener() {} }));
    const scroll = vi.spyOn(Element.prototype, "scrollIntoView");
    const user = userEvent.setup();
    render(<Page initialOpen />);
    expect(scroll.mock.contexts.at(-1)).toBe(document.getElementById("timer"));
    expect(scroll).toHaveBeenLastCalledWith({ block: "center", inline: "nearest", behavior });
    await user.click(screen.getByRole("button", { name: "Avançar" }));
    expect(scroll.mock.contexts.at(-1)).toBe(document.getElementById("tarefas"));
  });

  it("aceita rótulos próprios", () => {
    render(
      <Tour
        steps={steps}
        open
        onOpenChange={() => {}}
        step={2}
        labels={{ skip: "Skip", back: "Back", next: "Next", finish: "Done", counter: (current, total) => `${current} of ${total}` }}
      />,
    );
    expect(screen.getByRole("button", { name: "Skip" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Done" })).toBeInTheDocument();
    expect(screen.getByText("3 of 3")).toBeInTheDocument();
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(<Page initialOpen />);
  });
});
