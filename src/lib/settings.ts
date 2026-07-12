import { Store } from "@tauri-apps/plugin-store";
import type { LanguageCode } from "@/lib/i18n/languages";
import { defaultShortcuts, registerShortcut, unregisterShortcut, type Shortcut } from "@/lib/keyboardShortcuts";
import { useSettingsStore } from "@/stores/settingsStore";

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
  keyboardShortcuts: Shortcut[];
}

const defaults: Settings = {
  theme: "dark",
  lockOnMinimize: true,
  autoLockMinutes: 5,
  language: "en",
  keyboardShortcuts: defaultShortcuts,
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

export async function updateShortcut(shortcut: Shortcut, newKey: string) {
  await unregisterShortcut(shortcut.currentShortcut);

  const updated = { ...shortcut, currentShortcut: newKey };
  await registerShortcut(updated);

  const current = await getSettings();
  const shortcuts = current.keyboardShortcuts.map(s =>
    s.id === shortcut.id ? updated : s
  );

  await useSettingsStore.getState().update({ keyboardShortcuts: shortcuts });
}
