import { useTranslation } from "react-i18next";
import { useSettingsStore } from "@/stores/settingsStore";
import {
  autoLockOptions,
  lockOnMinimizeOptions,
  type AutoLockMinutes,
  type LockOnMinimize,
} from "@/lib/lockAndVault";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LockAndVaultPage() {
  const { t } = useTranslation();
  const { settings, update } = useSettingsStore();

  const handleChangeAutoLockMinutes = async (v: AutoLockMinutes) => {
    await update({ autoLockMinutes: Number(v) });
  };

  const handleChangeLockOnMinimize = async (v: LockOnMinimize) => {
    if (v === "true") {
      await update({ lockOnMinimize: true });
    } else {
      await update({ lockOnMinimize: false });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Field>
        <FieldLabel htmlFor="autoLockMinutes">
          {t("lock-and-vault-page.select-auto-lock-time.label")}
        </FieldLabel>
        <FieldDescription>
          {t("lock-and-vault-page.select-auto-lock-time.description")}
        </FieldDescription>
        <Select
          value={String(settings?.autoLockMinutes)}
          onValueChange={handleChangeAutoLockMinutes}
        >
          <SelectTrigger id="autoLockMinutes" className="w-[180px]">
            <SelectValue
              placeholder={t("lock-and-vault-page.select-auto-lock-time.label")}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {autoLockOptions.map((o) => {
                return (
                  <SelectItem key={o.code} value={o.code}>
                    {t(o.label)}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel htmlFor="lockOnMinimize">
          {t("lock-and-vault-page.select-lock-on-minimize.label")}
        </FieldLabel>
        <FieldDescription>
          {t("lock-and-vault-page.select-lock-on-minimize.description")}
        </FieldDescription>
        <Select
          value={String(settings?.lockOnMinimize)}
          onValueChange={handleChangeLockOnMinimize}
        >
          <SelectTrigger id="lockOnMinimize" className="w-[180px]">
            <SelectValue
              placeholder={t(
                "lock-and-vault-page.select-lock-on-minimize.label",
              )}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {lockOnMinimizeOptions.map((o) => {
                return (
                  <SelectItem key={o.code} value={o.code}>
                    {t(o.label)}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}
