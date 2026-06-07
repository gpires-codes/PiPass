import { useTranslation } from "react-i18next";
import { useSettingsStore } from "@/stores/settingsStore";
import { autoLockOptions, type AutoLockMinutes } from "@/lib/lockAndVault";
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

  const handleOnChange = async (v: AutoLockMinutes) => {
    await update({ autoLockMinutes: Number(v) });
  };

  return (
    <div>
      <Field>
        <FieldLabel htmlFor="lock-and-vault-input">
          {t("lock-and-vault-page.select-auto-lock-time.label")}
        </FieldLabel>
        <FieldDescription>
          {t("lock-and-vault-page.select-auto-lock-time.description")}
        </FieldDescription>
        <Select
          value={String(settings?.autoLockMinutes)}
          onValueChange={handleOnChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder={t("lock-and-vault-page.select-auto-lock-time.label")}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {autoLockOptions.map((o) => {
                return <SelectItem key={o.code} value={o.code}>{t(o.label)}</SelectItem>;
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}
