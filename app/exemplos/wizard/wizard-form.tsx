"use client";

import { useRef, useState } from "react";
import { Controller, useForm, type FieldPath } from "react-hook-form";
import { isValidCpf } from "@/registry/marcio/lib/br";
import { Button } from "@/registry/marcio/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/marcio/ui/card";
import { DescriptionList } from "@/registry/marcio/ui/description-list";
import { FormField } from "@/registry/marcio/ui/form-field";
import { Input } from "@/registry/marcio/ui/input";
import { MaskedInput } from "@/registry/marcio/ui/masked-input";
import { MultiSelect } from "@/registry/marcio/ui/multi-select";
import { Stepper } from "@/registry/marcio/ui/stepper";
import { Switch } from "@/registry/marcio/ui/switch";
import { toast } from "@/registry/marcio/ui/toast";

type WizardValues = {
  name: string;
  cpf: string;
  email: string;
  cep: string;
  number: string;
  city: string;
  areas: string[];
  notifications: boolean;
};

const defaultValues: WizardValues = { name: "", cpf: "", email: "", cep: "", number: "", city: "", areas: [], notifications: true };

const areas = [
  { value: "saude", label: "Saúde" },
  { value: "educacao", label: "Educação" },
  { value: "transporte", label: "Transporte" },
  { value: "cultura", label: "Cultura" },
  { value: "meio-ambiente", label: "Meio ambiente" },
  { value: "seguranca", label: "Segurança" },
];

const steps: { title: string; description: string; fields: FieldPath<WizardValues>[] }[] = [
  { title: "Dados pessoais", description: "Nome, CPF e e-mail", fields: ["name", "cpf", "email"] },
  { title: "Endereço", description: "CEP e número", fields: ["cep", "number", "city"] },
  { title: "Interesses", description: "Áreas e avisos", fields: ["areas"] },
  { title: "Revisão", description: "Confira e envie", fields: [] },
];

const formatCep = (cep: string) => (cep.length === 8 ? `${cep.slice(0, 5)}-${cep.slice(5)}` : cep);

export function WizardForm() {
  const [current, setCurrent] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const {
    register,
    control,
    trigger,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WizardValues>({ defaultValues, mode: "onTouched", shouldFocusError: true });

  function go(step: number) {
    setCurrent(step);
    // O foco vai para o título da etapa nova, para o leitor de tela anunciar onde a pessoa está.
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  async function next() {
    const valid = await trigger(steps[current]!.fields, { shouldFocus: true });
    if (valid) go(current + 1);
  }

  async function onSubmit(values: WizardValues) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast({ tone: "success", title: "Cadastro enviado", description: `Enviamos a confirmação para ${values.email}.` });
    reset();
    go(0);
  }

  const step = steps[current]!;
  const review = current === steps.length - 1;
  const values = getValues();

  return (
    <div className="flex flex-col gap-8">
      <Stepper steps={steps} current={current} onStepChange={go} aria-label="Etapas do cadastro" />
      <Card className="gap-8 p-6 md:p-8">
        <CardHeader>
          <CardTitle as="h2" ref={headingRef} tabIndex={-1} className="outline-none">
            {`${current + 1}. ${step.title}`}
          </CardTitle>
          <CardDescription>{review ? "Confira os dados antes de enviar. Para corrigir, volte à etapa." : "Campos com asterisco são obrigatórios."}</CardDescription>
        </CardHeader>
        <form
          noValidate
          aria-label="Cadastro em etapas"
          onSubmit={(event) => {
            event.preventDefault();
            if (review) void handleSubmit(onSubmit)(event);
            else void next();
          }}
          className="flex flex-col gap-8"
        >
          <CardContent className="gap-5">
            {current === 0 && (
              <>
                <FormField label="Nome completo" required error={errors.name?.message}>
                  <Input autoComplete="name" {...register("name", { required: "Informe seu nome.", minLength: { value: 3, message: "Use pelo menos 3 letras." } })} />
                </FormField>
                <Controller
                  control={control}
                  name="cpf"
                  rules={{ required: "Informe seu CPF.", validate: (cpf) => isValidCpf(cpf) || "Confira o CPF: os dígitos finais não batem." }}
                  render={({ field, fieldState }) => (
                    <FormField label="CPF" required error={fieldState.error?.message}>
                      <MaskedInput mask="cpf" ref={field.ref} name={field.name} value={field.value} onValueChange={field.onChange} onBlur={field.onBlur} />
                    </FormField>
                  )}
                />
                <FormField label="E-mail" required error={errors.email?.message}>
                  <Input
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                      required: "Informe seu e-mail.",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Informe um e-mail válido, como nome@empresa.com." },
                    })}
                  />
                </FormField>
              </>
            )}
            {current === 1 && (
              <>
                <div className="grid gap-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                  <Controller
                    control={control}
                    name="cep"
                    rules={{ required: "Informe o CEP.", validate: (cep) => cep.length === 8 || "O CEP tem 8 dígitos." }}
                    render={({ field, fieldState }) => (
                      <FormField label="CEP" required error={fieldState.error?.message}>
                        <MaskedInput mask="cep" ref={field.ref} name={field.name} value={field.value} onValueChange={field.onChange} onBlur={field.onBlur} />
                      </FormField>
                    )}
                  />
                  <FormField label="Número" required error={errors.number?.message}>
                    <Input inputMode="numeric" {...register("number", { required: "Informe o número, ou s/n." })} />
                  </FormField>
                </div>
                <FormField label="Cidade" required error={errors.city?.message}>
                  <Input autoComplete="address-level2" {...register("city", { required: "Informe a cidade." })} />
                </FormField>
              </>
            )}
            {current === 2 && (
              <>
                <Controller
                  control={control}
                  name="areas"
                  rules={{ validate: (value) => value.length > 0 || "Escolha pelo menos uma área." }}
                  render={({ field, fieldState }) => (
                    <FormField label="Áreas de interesse" required description="Você recebe novidades só dessas áreas." error={fieldState.error?.message}>
                      <MultiSelect ref={field.ref} options={areas} value={field.value} onValueChange={field.onChange} onBlur={field.onBlur} />
                    </FormField>
                  )}
                />
                <Controller
                  control={control}
                  name="notifications"
                  render={({ field }) => (
                    <FormField label="Avisos por e-mail" orientation="horizontal">
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormField>
                  )}
                />
              </>
            )}
            {review && (
              <DescriptionList
                columns={2}
                items={[
                  { term: "nome", description: values.name },
                  { term: "e-mail", description: values.email },
                  { term: "endereço", description: `${values.number}, CEP ${formatCep(values.cep)}, ${values.city}` },
                  { term: "áreas", description: values.areas.map((area) => areas.find((item) => item.value === area)?.label).join(", ") },
                  { term: "avisos por e-mail", description: values.notifications ? "sim" : "não" },
                ]}
              />
            )}
          </CardContent>
          <CardFooter className="justify-between gap-3">
            <Button type="button" variant="secondary" disabled={current === 0} onClick={() => go(current - 1)}>
              Voltar
            </Button>
            <Button type="submit" loading={isSubmitting} loadingLabel="Enviando">
              {review ? "Enviar cadastro" : "Continuar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
