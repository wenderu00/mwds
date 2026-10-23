"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "@/registry/marcio/ui/alert";
import { Button } from "@/registry/marcio/ui/button";
import { Checkbox } from "@/registry/marcio/ui/checkbox";
import { FormField } from "@/registry/marcio/ui/form-field";
import { Input } from "@/registry/marcio/ui/input";
import { Link } from "@/registry/marcio/ui/link";
import { toast } from "@/registry/marcio/ui/toast";

export type LoginValues = {
  email: string;
  password: string;
  remember: boolean;
};

export type LoginFormProps = {
  onLogin?: (values: LoginValues) => Promise<void>;
  forgotPasswordHref?: string;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function demoLogin(values: LoginValues) {
  await wait(700);
  if (values.password !== "mw-demo-123") throw new Error("E-mail ou senha incorretos.");
}

export function LoginForm({ onLogin = demoLogin, forgotPasswordHref = "#" }: LoginFormProps) {
  const [failure, setFailure] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ defaultValues: { email: "", password: "", remember: true }, mode: "onTouched" });

  async function onSubmit(values: LoginValues) {
    setFailure(null);
    try {
      await onLogin(values);
      toast({ tone: "success", title: "Bem-vindo de volta", description: values.email });
    } catch (error) {
      setFailure(error instanceof Error ? error.message : "Não foi possível entrar.");
    }
  }

  return (
    <form noValidate aria-label="Entrar" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {failure && (
        <Alert tone="danger" role="alert" title="Não foi possível entrar">
          {failure}
        </Alert>
      )}
      <FormField label="E-mail" error={errors.email?.message}>
        <Input
          type="email"
          autoComplete="email"
          placeholder="nome@empresa.com"
          {...register("email", {
            required: "Informe seu e-mail.",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Informe um e-mail válido." },
          })}
        />
      </FormField>
      <div className="flex flex-col gap-2">
        <FormField label="Senha" error={errors.password?.message}>
          <Input type="password" autoComplete="current-password" {...register("password", { required: "Informe sua senha." })} />
        </FormField>
        <Link href={forgotPasswordHref} variant="muted" className="self-end text-sm">
          Esqueci minha senha
        </Link>
      </div>
      <Controller
        control={control}
        name="remember"
        render={({ field }) => (
          <FormField label="Manter conectado neste dispositivo" orientation="horizontal">
            <Checkbox ref={field.ref} checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} onBlur={field.onBlur} />
          </FormField>
        )}
      />
      <Button type="submit" size="lg" loading={isSubmitting} loadingLabel="Entrando">
        Entrar
      </Button>
    </form>
  );
}
