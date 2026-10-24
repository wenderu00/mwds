"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { isValidCpf } from "@/registry/marcio/lib/br";
import { Button } from "@/registry/marcio/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/marcio/ui/card";
import { Checkbox } from "@/registry/marcio/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/marcio/ui/dialog";
import { FormField } from "@/registry/marcio/ui/form-field";
import { Input } from "@/registry/marcio/ui/input";
import { Link } from "@/registry/marcio/ui/link";
import { MaskedInput } from "@/registry/marcio/ui/masked-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/marcio/ui/select";
import { Switch } from "@/registry/marcio/ui/switch";
import { Textarea } from "@/registry/marcio/ui/textarea";
import { toast } from "@/registry/marcio/ui/toast";

type SignupValues = {
  name: string;
  cpf: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  bio: string;
  terms: boolean;
  newsletter: boolean;
};

const defaultValues: SignupValues = {
  name: "",
  cpf: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  bio: "",
  terms: false,
  newsletter: true,
};

const bioLimit = 280;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function SignupForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({ defaultValues, mode: "onTouched" });

  const bioLength = useWatch({ control, name: "bio" }).length;

  async function onSubmit(values: SignupValues) {
    await wait(900);
    toast({
      tone: "success",
      title: "Conta criada",
      description: `Enviamos um e-mail de confirmação para ${values.email}.`,
    });
    reset();
    setFocus("name");
  }

  return (
    <Card className="gap-8 p-6 md:p-8">
      <CardHeader>
        <CardTitle>Dados da conta</CardTitle>
        <CardDescription>Campos com asterisco são obrigatórios.</CardDescription>
      </CardHeader>

      <form
        noValidate
        aria-label="Criar conta"
        onSubmit={handleSubmit(onSubmit, () => toast({ tone: "danger", title: "Revise o formulário", description: "Alguns campos precisam de atenção." }))}
        className="flex flex-col gap-8"
      >
        <CardContent className="gap-5">
          <FormField label="Nome completo" required error={errors.name?.message}>
            <Input autoComplete="name" {...register("name", { required: "Informe seu nome.", minLength: { value: 3, message: "Use pelo menos 3 letras." } })} />
          </FormField>

          <Controller
            control={control}
            name="cpf"
            rules={{
              required: "Informe seu CPF.",
              validate: (cpf) => isValidCpf(cpf) || "Confira o CPF: os dígitos finais não batem.",
            }}
            render={({ field, fieldState }) => (
              <FormField label="CPF" required error={fieldState.error?.message}>
                <MaskedInput mask="cpf" ref={field.ref} name={field.name} value={field.value} onValueChange={field.onChange} onBlur={field.onBlur} />
              </FormField>
            )}
          />

          <FormField label="E-mail" required description="Usado para entrar e receber avisos." error={errors.email?.message}>
            <Input
              type="email"
              autoComplete="email"
              placeholder="nome@empresa.com"
              {...register("email", {
                required: "Informe seu e-mail.",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Informe um e-mail válido, como nome@empresa.com." },
              })}
            />
          </FormField>

          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Senha" required description="Mínimo de 8 caracteres, com um número." error={errors.password?.message}>
              <Input
                type="password"
                autoComplete="new-password"
                {...register("password", {
                  required: "Crie uma senha.",
                  minLength: { value: 8, message: "A senha precisa de pelo menos 8 caracteres." },
                  pattern: { value: /\d/, message: "Inclua pelo menos um número." },
                })}
              />
            </FormField>
            <FormField label="Confirme a senha" required error={errors.confirmPassword?.message}>
              <Input
                type="password"
                autoComplete="new-password"
                {...register("confirmPassword", {
                  required: "Repita a senha.",
                  validate: (value, all) => value === all.password || "As senhas não conferem.",
                })}
              />
            </FormField>
          </div>

          <Controller
            control={control}
            name="role"
            rules={{ required: "Escolha um perfil." }}
            render={({ field, fieldState }) => (
              <FormField label="Perfil" required error={fieldState.error?.message}>
                <Select value={field.value} onValueChange={field.onChange} name={field.name}>
                  <SelectTrigger ref={field.ref} onBlur={field.onBlur}>
                    <SelectValue placeholder="Escolha um perfil" />
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

          <FormField
            label="Sobre você"
            description={`${bioLength} de ${bioLimit} caracteres.`}
            error={errors.bio?.message}
          >
            <Textarea
              placeholder="Conte em poucas linhas o que você faz."
              {...register("bio", { maxLength: { value: bioLimit, message: `Use no máximo ${bioLimit} caracteres.` } })}
            />
          </FormField>

          <Controller
            control={control}
            name="newsletter"
            render={({ field }) => (
              <FormField label="Receber novidades por e-mail" orientation="horizontal" description="No máximo um e-mail por mês.">
                <Switch ref={field.ref} checked={field.value} onCheckedChange={field.onChange} onBlur={field.onBlur} />
              </FormField>
            )}
          />

          <Controller
            control={control}
            name="terms"
            rules={{ validate: (value) => value || "Aceite os termos para continuar." }}
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-2">
                <FormField label="Li e aceito os termos de uso" orientation="horizontal" required error={fieldState.error?.message}>
                  <Checkbox ref={field.ref} checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} onBlur={field.onBlur} />
                </FormField>
                <Dialog>
                  <DialogTrigger asChild>
                    <Link asChild variant="muted" className="w-fit text-sm">
                      <button type="button">Ler os termos de uso</button>
                    </Link>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Termos de uso</DialogTitle>
                      <DialogDescription>Resumo do que você aceita ao criar a conta.</DialogDescription>
                    </DialogHeader>
                    <ul className="flex list-disc flex-col gap-2 pl-5 text-ink-soft marker:text-accent-text">
                      <li>Seus dados ficam guardados apenas enquanto a conta existir.</li>
                      <li>Você pode exportar ou apagar tudo a qualquer momento.</li>
                      <li>Não compartilhamos informações com terceiros.</li>
                    </ul>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="secondary">Fechar</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button onClick={() => field.onChange(true)}>Aceitar termos</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          />
        </CardContent>

        <CardFooter className="justify-end">
          <Button type="button" variant="ghost" onClick={() => reset()} disabled={isSubmitting}>
            Limpar
          </Button>
          <Button type="submit" size="lg" loading={isSubmitting} loadingLabel="Criando conta">
            Criar conta
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
