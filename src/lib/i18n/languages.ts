export type LanguageCode = (typeof languages)[number]["code"];

export interface Language {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const languages = [
  {
    code: "en",
    label: "language-page.languages.english",
    nativeLabel: "English",
    flag: "🇺🇸",
  },
  {
    code: "pt",
    label: "language-page.languages.portuguese",
    nativeLabel: "Português",
    flag: "🇧🇷",
  },
] as const;
