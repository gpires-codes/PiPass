import { Store } from "@tauri-apps/plugin-store";
import type { LanguageCode } from "@/lib/i18n/languages";

let _store: Store | null = null;

async function getStore() {
  if (!_store) {
    _store = await Store.load("settings.json");
  }
  return _store;
}

export interface Settings {
  theme: "dark" | "light" | "system";
  lockOnMinimize: boolean;
  autoLockMinutes: number;
  language: LanguageCode;
}

const defaults: Settings = {
  theme: "dark",
  lockOnMinimize: true,
  autoLockMinutes: 5,
  language: "en",
};

export async function getSettings(): Promise<Settings> {
  const store = await getStore();
  const saved = await store.get<Settings>("settings");
  return { ...defaults, ...saved };
}

export async function saveSettings(settings: Partial<Settings>) {
  const store = await getStore();
  const current = await getSettings();
  await store.set("settings", { ...current, ...settings });
  await store.save();
}
