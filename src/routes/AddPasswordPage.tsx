import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVaultStore } from "@/stores/vaultStore";
import { CREDENTIAL_TYPES, type CredentialTargetType } from "@/lib/credential";
import {
  addCredentialFormSchema,
  type AddCredentialFormType,
} from "@/lib/schemas";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AddPasswordPage() {
  const { t } = useTranslation();
  const [targetType, setTargetType] = useState<CredentialTargetType>("app");
  const { credentials, addCredential } = useVaultStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addCredentialFormSchema),
  });

  function onSubmit(data: AddCredentialFormType) {
    console.log(
      `Name: ${data.name} | Identifier: ${data.identifier} | Target: ${data.target}`,
    );
  }

  return (
    <div className="flex flex-col mt-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{t("add-password-page.title")}</h1>
          <p className="text-sm">{t("add-password-page.description")}</p>
        </div>
      </div>

      <form className="w-full max-w-sm pt-12" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              {...register("name")}
              id="name"
              type="text"
              placeholder="Evil Rabbit"
            />
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="identifier">Email</FieldLabel>
            <Input
              {...register("identifier")}
              id="identifier"
              type="text"
              placeholder="email/username/phone"
            />
            <FieldDescription>
              We&apos;ll never share your email with anyone.
            </FieldDescription>
            {errors.identifier && (
              <FieldError>{errors.identifier.message}</FieldError>
            )}
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="target-type">Target type</FieldLabel>
              <Select
                value={targetType}
                onValueChange={(type) =>
                  setTargetType(type as CredentialTargetType)
                }
              >
                <SelectTrigger id="target-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CREDENTIAL_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {t(`credential-target.${type}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="target">Target</FieldLabel>
              <Input
                {...register("target")}
                id="target"
                type="text"
                placeholder="+1 (555) 123-4567"
              />
              {errors.target && (
                <FieldError>{errors.target.message}</FieldError>
              )}
            </Field>
          </div>
          <Field orientation="horizontal">
            <Button type="submit" size={"lg"}>
              <Plus /> <span>Add</span>
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
