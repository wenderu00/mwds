"use client";

import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Alert } from "@/registry/marcio/ui/alert";
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
import { Avatar } from "@/registry/marcio/ui/avatar";
import { Button } from "@/registry/marcio/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/marcio/ui/card";
import { Combobox } from "@/registry/marcio/ui/combobox";
import { FormField } from "@/registry/marcio/ui/form-field";
import { Input } from "@/registry/marcio/ui/input";
import { RadioGroup, RadioGroupOption } from "@/registry/marcio/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/marcio/ui/select";
import { Switch } from "@/registry/marcio/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/marcio/ui/tabs";
import { Textarea } from "@/registry/marcio/ui/textarea";
import { setTheme, useTheme, type ThemeChoice } from "@/registry/marcio/ui/theme-toggle";
import { toast } from "@/registry/marcio/ui/toast";

type ProfileValues = { name: string; email: string; role: string; bio: string };

const timezones = [
  { value: "America/Recife", label: "Recife (UTC−3)" },
  { value: "America/Sao_Paulo", label: "São Paulo (UTC−3)" },
  { value: "America/Manaus", label: "Manaus (UTC−4)" },
  { value: "America/Rio_Branco", label: "Rio Branco (UTC−5)" },
  { value: "America/Noronha", label: "Fernando de Noronha (UTC−2)" },
  { value: "Europe/Lisbon", label: "Lisboa (UTC+0)" },
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function ProfileForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<ProfileValues>({
    defaultValues: { name: "Márcio Wendell", email: "marcio@exemplo.com", role: "dev", bio: "" },
    mode: "onTouched",
  });
  const name = useWatch({ control, name: "name" });

  async function onSubmit(values: ProfileValues) {
    await wait(600);
    reset(values);
    toast({ tone: "success", title: "Perfil atualizado" });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">Perfil</CardTitle>
        <CardDescription>Como você aparece para a equipe.</CardDescription>
      </CardHeader>
      <form noValidate aria-label="Perfil" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <CardContent className="gap-5">
          <div className="flex items-center gap-4">
            <Avatar name={name || "?"} size="lg" />
            <p className="text-sm text-ink-muted">A foto vem do seu provedor de login. Sem foto, usamos suas iniciais.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Nome" required error={errors.name?.message}>
              <Input autoComplete="name" {...register("name", { required: "Informe seu nome." })} />
            </FormField>
            <FormField label="E-mail" required error={errors.email?.message}>
              <Input
                type="email"
                autoComplete="email"
                {...register("email", {
                  required: "Informe seu e-mail.",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Informe um e-mail válido." },
                })}
              />
            </FormField>
          </div>
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <FormField label="Função">
                <Select value={field.value} onValueChange={field.onChange} name={field.name}>
                  <SelectTrigger ref={field.ref} onBlur={field.onBlur}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dev">Desenvolvimento</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="produto">Produto</SelectItem>
                    <SelectItem value="gestao">Gestão</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            )}
          />
          <FormField label="Sobre você" description="Aparece no seu cartão de perfil." error={errors.bio?.message}>
            <Textarea rows={3} {...register("bio", { maxLength: { value: 280, message: "Use no máximo 280 caracteres." } })} />
          </FormField>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="button" variant="ghost" disabled={!isDirty || isSubmitting} onClick={() => reset()}>
            Descartar
          </Button>
          <Button type="submit" loading={isSubmitting} loadingLabel="Salvando">
            Salvar perfil
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function Preferences() {
  const theme = useTheme();
  const [density, setDensity] = useState(() => (typeof document === "undefined" ? "normal" : (document.documentElement.dataset.density ?? "normal")));
  const [timezone, setTimezone] = useState("America/Recife");
  const [notifications, setNotifications] = useState({ email: true, weekly: true, mentions: false });

  function changeDensity(value: string) {
    setDensity(value);
    if (value === "normal") document.documentElement.removeAttribute("data-density");
    else document.documentElement.setAttribute("data-density", value);
  }

  function toggle(key: keyof typeof notifications, value: boolean) {
    setNotifications((current) => ({ ...current, [key]: value }));
    toast({ title: value ? "Notificação ativada" : "Notificação desativada" });
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle as="h2">Aparência</CardTitle>
          <CardDescription>As mudanças valem na hora, só neste navegador.</CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <FormField label="Tema">
            <RadioGroup value={theme} onValueChange={(value) => setTheme(value as ThemeChoice)}>
              <RadioGroupOption value="system" label="Seguir o sistema" description="Escuro ou claro conforme o sistema operacional." />
              <RadioGroupOption value="dark" label="Escuro" />
              <RadioGroupOption value="light" label="Claro" />
            </RadioGroup>
          </FormField>
          <FormField label="Densidade" description="Altura dos controles e espaço das linhas de tabela.">
            <RadioGroup value={density} onValueChange={changeDensity} orientation="horizontal" className="flex flex-wrap gap-6">
              <RadioGroupOption value="compacta" label="Compacta" />
              <RadioGroupOption value="normal" label="Normal" />
              <RadioGroupOption value="ampla" label="Ampla" />
            </RadioGroup>
          </FormField>
          <FormField label="Fuso horário" className="max-w-sm">
            <Combobox options={timezones} value={timezone} onValueChange={(value) => setTimezone(value || timezone)} searchPlaceholder="Buscar cidade" />
          </FormField>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h2">Notificações</CardTitle>
          <CardDescription>Escolha o que chega por e-mail.</CardDescription>
        </CardHeader>
        <CardContent className="gap-5">
          <FormField label="Avisos de prazo" orientation="horizontal" description="Um dia antes de cada entrega.">
            <Switch checked={notifications.email} onCheckedChange={(value) => toggle("email", value)} />
          </FormField>
          <FormField label="Resumo semanal" orientation="horizontal" description="Toda segunda, às 8h.">
            <Switch checked={notifications.weekly} onCheckedChange={(value) => toggle("weekly", value)} />
          </FormField>
          <FormField label="Menções em comentários" orientation="horizontal">
            <Switch checked={notifications.mentions} onCheckedChange={(value) => toggle("mentions", value)} />
          </FormField>
        </CardContent>
      </Card>
    </div>
  );
}

function Account() {
  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">Conta</CardTitle>
        <CardDescription>Ações permanentes.</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert tone="danger" title="Excluir conta">
          Apaga seus projetos, horas registradas e comentários. Não dá para desfazer.
        </Alert>
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="danger">Excluir minha conta</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir sua conta?</AlertDialogTitle>
              <AlertDialogDescription>Todos os seus dados serão apagados. Essa ação não pode ser desfeita.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => toast({ tone: "info", title: "Nada foi excluído", description: "Esta é uma tela de demonstração." })}>
                Excluir conta
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

export function SettingsTabs() {
  return (
    <Tabs defaultValue="perfil">
      <TabsList aria-label="Seções das configurações">
        <TabsTrigger value="perfil">perfil</TabsTrigger>
        <TabsTrigger value="preferencias">preferências</TabsTrigger>
        <TabsTrigger value="conta">conta</TabsTrigger>
      </TabsList>
      <TabsContent value="perfil">
        <ProfileForm />
      </TabsContent>
      <TabsContent value="preferencias">
        <Preferences />
      </TabsContent>
      <TabsContent value="conta">
        <Account />
      </TabsContent>
    </Tabs>
  );
}
