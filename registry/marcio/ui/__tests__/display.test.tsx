import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Badge } from "@/registry/marcio/ui/badge";
import { Link } from "@/registry/marcio/ui/link";
import { expectAccessibleInThemes } from "@/test/a11y";

describe("Badge", () => {
  it("defaults to neutral soft", () => {
    render(<Badge>rascunho</Badge>);
    expect(screen.getByText("rascunho")).toHaveClass("bg-surface", "text-ink-soft", "font-mono");
  });

  it.each([
    ["danger", "soft", ["bg-danger-soft", "text-danger-text"]],
    ["success", "solid", ["bg-success", "text-on-success"]],
    ["warning", "outline", ["border-warning-text", "text-warning-text"]],
    ["info", "soft", ["bg-info-soft", "text-info-text"]],
    ["accent", "solid", ["bg-accent", "text-on-accent"]],
  ] as const)("combines tone %s with appearance %s", (tone, appearance, expected) => {
    render(
      <Badge tone={tone} appearance={appearance}>
        status
      </Badge>,
    );
    expect(screen.getByText("status")).toHaveClass(...expected);
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>x</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(
      <div>
        <Badge tone="danger">erro</Badge>
        <Badge tone="success" appearance="solid">
          ativo
        </Badge>
        <Badge tone="accent" appearance="outline">
          novo
        </Badge>
      </div>,
    );
  });
});

describe("Link", () => {
  it("is underlined inline and focusable", async () => {
    const user = userEvent.setup();
    render(<Link href="/docs">documentação</Link>);
    const link = screen.getByRole("link", { name: "documentação" });
    expect(link).toHaveClass("underline", "text-accent-text");
    await user.tab();
    expect(link).toHaveFocus();
  });

  it("opens external links in a new tab and says so", () => {
    render(
      <Link href="https://github.com/wenderu00" external variant="standalone">
        GitHub
      </Link>,
    );
    const link = screen.getByRole("link", { name: "GitHub (abre em nova aba)" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveClass("no-underline", "hover:underline");
  });

  it("wraps a framework link with asChild", () => {
    render(
      <Link asChild variant="muted">
        <a href="/x">voltar</a>
      </Link>,
    );
    expect(screen.getByRole("link", { name: "voltar" })).toHaveClass("text-ink-muted");
  });

  it("has no axe violations", async () => {
    await expectAccessibleInThemes(
      <p>
        Leia a <Link href="/docs">documentação</Link> ou abra o{" "}
        <Link href="https://github.com" external>
          GitHub
        </Link>
        .
      </p>,
    );
  });
});
