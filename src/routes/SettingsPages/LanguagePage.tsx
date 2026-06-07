import { useTranslation } from "react-i18next";
import { useSettingsStore } from "@/stores/settingsStore";
import { languages, type LanguageCode } from "@/lib/i18n/languages";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguagePage() {
  const { t } = useTranslation();
  const { settings, update } = useSettingsStore();

  const handleOnChange = async (v: LanguageCode) => {
    await update({ language: v });
  };

  return (
    <div>
      <Field>
        <FieldLabel htmlFor="language-input">
          {t("settings.language")}
        </FieldLabel>
        <FieldDescription>
          {t("language-page.select-language-description")}
        </FieldDescription>
        <Select value={settings?.language} onValueChange={handleOnChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("settings.language")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {languages.map((l) => {
                return <SelectItem key={l.code} value={l.code}>{t(l.label)}</SelectItem>;
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}
