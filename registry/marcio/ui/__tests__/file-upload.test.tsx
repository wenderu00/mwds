import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FileUpload, formatBytes, matchesAccept } from "@/registry/marcio/ui/file-upload";
import { FormField } from "@/registry/marcio/ui/form-field";
import { expectAccessibleInThemes } from "@/test/a11y";

const pdf = (name = "contrato.pdf", size = 1024) => new File([new Uint8Array(size)], name, { type: "application/pdf" });
const png = (name = "foto.png") => new File(["x"], name, { type: "image/png" });

describe("utilitários do FileUpload", () => {
  it("formata tamanhos em pt-BR", () => {
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(2048)).toBe("2 KB");
    expect(formatBytes(2.5 * 1024 * 1024)).toBe("2,5 MB");
  });

  it("segue a regra do atributo accept", () => {
    expect(matchesAccept(pdf(), ".pdf")).toBe(true);
    expect(matchesAccept(png(), "image/*")).toBe(true);
    expect(matchesAccept(png(), "application/pdf,.doc")).toBe(false);
    expect(matchesAccept(png())).toBe(true);
  });
});

describe("FileUpload", () => {
  it("adiciona pela seleção e remove pela lista, devolvendo o foco ao campo", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <FormField label="Anexos">
        <FileUpload multiple onValueChange={onValueChange} />
      </FormField>,
    );
    const input = screen.getByLabelText(/anexos/i, { selector: "input" });
    await user.upload(input, [pdf(), pdf("proposta.pdf", 3000)]);
    expect(onValueChange).toHaveBeenLastCalledWith([expect.objectContaining({ name: "contrato.pdf" }), expect.objectContaining({ name: "proposta.pdf" })]);
    const list = screen.getByRole("list", { name: "Arquivos selecionados" });
    expect(list).toHaveTextContent("contrato.pdf");
    expect(list).toHaveTextContent("2,9 KB");

    await user.click(screen.getByRole("button", { name: "Remover contrato.pdf" }));
    expect(screen.queryByText("contrato.pdf")).not.toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it("recusa tipo e tamanho com mensagens que dizem como resolver", async () => {
    const user = userEvent.setup({ applyAccept: false });
    const onReject = vi.fn();
    render(<FileUpload aria-label="Contrato" accept=".pdf" acceptLabel="PDF" maxSize={2048} multiple onReject={onReject} />);
    await user.upload(screen.getByLabelText("Contrato"), [png(), pdf("grande.pdf", 4096), pdf("ok.pdf", 100)]);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("foto.png: esse tipo de arquivo não é aceito. Envie PDF.");
    expect(alert).toHaveTextContent("grande.pdf: o arquivo tem 4 KB e o limite é 2 KB. Escolha um arquivo menor.");
    expect(onReject).toHaveBeenCalledWith([expect.objectContaining({ reason: "type" }), expect.objectContaining({ reason: "size" })]);
    expect(screen.getByRole("list", { name: "Arquivos selecionados" })).toHaveTextContent("ok.pdf");
  });

  it("respeita maxFiles", async () => {
    const user = userEvent.setup();
    render(<FileUpload aria-label="Fotos" multiple maxFiles={1} />);
    await user.upload(screen.getByLabelText("Fotos"), [png("a.png"), png("b.png")]);
    expect(screen.getByRole("alert")).toHaveTextContent("b.png: o limite é de 1 arquivo. Remova um para adicionar outro.");
  });

  it("sem multiple, o arquivo novo substitui o anterior", async () => {
    const user = userEvent.setup();
    render(<FileUpload aria-label="Contrato" />);
    const input = screen.getByLabelText("Contrato");
    await user.upload(input, pdf("v1.pdf"));
    await user.upload(input, pdf("v2.pdf"));
    expect(screen.queryByText("v1.pdf")).not.toBeInTheDocument();
    expect(screen.getByText("v2.pdf")).toBeInTheDocument();
  });

  it("aceita arquivos soltos na área", () => {
    const { container } = render(<FileUpload aria-label="Contrato" />);
    const zone = container.querySelector("label")!;
    fireEvent.dragOver(zone, { dataTransfer: { files: [] } });
    expect(zone).toHaveAttribute("data-dragging", "true");
    fireEvent.drop(zone, { dataTransfer: { files: [pdf()] } });
    expect(zone).not.toHaveAttribute("data-dragging");
    expect(screen.getByText("contrato.pdf")).toBeInTheDocument();
  });

  it("passa no axe nos dois temas", async () => {
    await expectAccessibleInThemes(
      <FormField label="Anexos" description="Até 3 arquivos.">
        <FileUpload multiple hint="PDF ou PNG, até 5 MB" defaultValue={[pdf()]} />
      </FormField>,
    );
  });
});
