import type { Metadata } from "next";
import { AdminShell } from "@/registry/marcio/blocks/admin-shell/admin-shell";
import { SettingsTabs } from "@/registry/marcio/blocks/settings/settings-tabs";
import { PageHeader } from "@/registry/marcio/ui/page-header";

export const metadata: Metadata = { title: "Configurações" };

export default function SettingsPage() {
  return (
    <AdminShell active="configuracoes" breadcrumb={[{ label: "Início", href: "/dashboard" }, { label: "Configurações" }]}>
      <PageHeader kicker="Conta" title="Configurações" description="Perfil, aparência, notificações e conta." />
      <SettingsTabs />
    </AdminShell>
  );
}
