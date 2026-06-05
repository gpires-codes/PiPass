import { create } from "zustand";
import i18n from "@/lib/i18n";
import { getSettings, saveSettings, type Settings } from "@/lib/settings";

interface SettingsState {
  settings: Settings | null;
  load: () => Promise<void>;
  update: (updates: Partial<Settings>) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,

  load: async () => {
    const settings = await getSettings();
    set({ settings });
  },

  update: async (updates) => {
    if (updates.language) {
      await i18n.changeLanguage(updates.language);
    }
    await saveSettings(updates);
    set((state) => ({
      settings: state.settings ? { ...state.settings, ...updates } : null,
    }));
  },
}));
