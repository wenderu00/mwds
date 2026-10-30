import { act, render, screen } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Calendar } from "@/registry/marcio/ui/calendar";

describe("Calendar", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("não depende do relógio no HTML do servidor", () => {
    const html = renderToString(<Calendar mode="single" className="meu-calendario" />);
    expect(html).toContain('data-slot="calendar"');
    expect(html).toContain("meu-calendario");
    expect(html).not.toContain("<table");
  });

  it("hidrata sem erro quando o dia da visita é outro que o do build", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(2026, 0, 15));
    const container = document.createElement("div");
    document.body.append(container);
    container.innerHTML = renderToString(<Calendar mode="single" />);

    vi.setSystemTime(new Date(2026, 5, 20));
    const recoverable = vi.fn();
    const root = await act(async () => hydrateRoot(container, <Calendar mode="single" />, { onRecoverableError: recoverable }));

    expect(recoverable).not.toHaveBeenCalled();
    expect(errors).not.toHaveBeenCalled();
    expect(container.querySelector("table")).toBeInTheDocument();
    expect(container).toHaveTextContent(/junho 2026/i);
    await act(async () => root.unmount());
    container.remove();
  });

  it("mostra a grade de imediato quando monta no cliente", () => {
    render(<Calendar mode="single" defaultMonth={new Date(2026, 9, 1)} />);
    expect(screen.getByRole("button", { name: /15 de outubro de 2026/ })).toBeInTheDocument();
  });
});
