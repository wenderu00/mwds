import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/marcio/ui/alert-dialog";
import { Button } from "@/registry/marcio/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/registry/marcio/ui/dialog";
import { axe, renderInTheme, themes } from "@/test/a11y";

function confirmation(onConfirm = vi.fn()) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="danger">Excluir projeto</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>
          <AlertDialogDescription>Essa ação não pode ser desfeita.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

async function clickOutside() {
  await new Promise((resolve) => setTimeout(resolve, 0));
  fireEvent.pointerDown(document.body);
  fireEvent.click(document.body);
  await new Promise((resolve) => setTimeout(resolve, 0));
}

async function open() {
  const user = userEvent.setup();
  const trigger = screen.getByRole("button", { name: "Excluir projeto" });
  await user.click(trigger);
  const dialog = await screen.findByRole("alertdialog", { name: "Excluir projeto?" });
  return { user, trigger, dialog };
}

describe("AlertDialog", () => {
  it("abre como alertdialog nomeado, descrito e com foco em Cancelar", async () => {
    render(confirmation());
    const { dialog } = await open();
    expect(dialog).toHaveAccessibleDescription("Essa ação não pode ser desfeita.");
    expect(within(dialog).getByRole("button", { name: "Cancelar" })).toHaveFocus();
  });

  it("não fecha com clique fora, ao contrário do Dialog", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Editar projeto</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Editar projeto</DialogTitle>
          <DialogDescription>Altere o nome.</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
    await user.click(screen.getByRole("button", { name: "Editar projeto" }));
    await screen.findByRole("dialog", { name: "Editar projeto" });
    await clickOutside();
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

    render(confirmation());
    await open();
    await clickOutside();
    expect(screen.getByRole("alertdialog", { name: "Excluir projeto?" })).toBeInTheDocument();
  });

  it("fecha com Esc e devolve o foco ao gatilho", async () => {
    render(confirmation());
    const { user, trigger } = await open();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it("mantém o foco entre Cancelar e a confirmação", async () => {
    render(confirmation());
    const { user, dialog } = await open();
    await user.tab();
    expect(within(dialog).getByRole("button", { name: "Excluir" })).toHaveFocus();
    await user.tab();
    expect(within(dialog).getByRole("button", { name: "Cancelar" })).toHaveFocus();
  });

  it("confirma e fecha", async () => {
    const onConfirm = vi.fn();
    render(confirmation(onConfirm));
    const { user, dialog } = await open();
    await user.click(within(dialog).getByRole("button", { name: "Excluir" }));
    expect(onConfirm).toHaveBeenCalledOnce();
    await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
  });

  it("não tem violações de axe aberto, nos dois temas", async () => {
    for (const theme of themes) {
      const { unmount } = renderInTheme(
        theme,
        <AlertDialog defaultOpen>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>
              <AlertDialogDescription>Essa ação não pode ser desfeita.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Excluir</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>,
      );
      expect(await axe(document.body)).toHaveNoViolations();
      unmount();
    }
  });
});
