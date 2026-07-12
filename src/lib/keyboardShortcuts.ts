import { register, unregister } from "@tauri-apps/plugin-global-shortcut";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { useVaultStore } from "@/stores/vaultStore";

export interface Shortcut {
  id: string;
  description: string;
  defaultShortcut: string;
  currentShortcut: string;
  global: boolean;
}

export const defaultShortcuts: Shortcut[] = [
  {
    id: "open-vault",
    description: "Open vault",
    defaultShortcut: "CommandOrControl+Shift+B",
    currentShortcut: "CommandOrControl+Shift+B",
    global: true,
  },
  {
    id: "open-password-menu",
    description: "Open password menu",
    defaultShortcut: "CommandOrControl+Shift+O",
    currentShortcut: "CommandOrControl+Shift+O",
    global: true,
  },
  {
    id: "lock-vault",
    description: "Lock vault",
    defaultShortcut: "CommandOrControl+L",
    currentShortcut: "CommandOrControl+L",
    global: false,
  },
];

async function handleGlobalShortcut(id: string) {
  switch (id) {
    case "open-vault": {
      const isUnlocked = useVaultStore.getState().isUnlocked;
      const label = isUnlocked ? "main" : "auth";
      const win = await WebviewWindow.getByLabel(label);
      await win?.show();
      await win?.setFocus();
      break;
    }

    case "open-password-menu": {
      break;
    }
  }
}

export async function handleLocalShortcut(id: string) {
  switch (id) {
    case "lock-vault":
      await useVaultStore.getState().lock();
      break;
    case "add-credential":
      break;
  }
}

export async function registerShortcut(shortcut: Shortcut) {
  if (!shortcut.global) return;

  try {
    await register(shortcut.currentShortcut, () =>
      handleGlobalShortcut(shortcut.id),
    );
  } catch (error) {
    console.error("Failed to register shortcut:", error);
  }
}

export async function registerAllShortcuts(shortcuts: Shortcut[]) {
  for (const shortcut of shortcuts.filter(s => s.global)) {
    await registerShortcut(shortcut);
  }
}

export async function unregisterShortcut(shortcut: string) {
  try {
    await unregister(shortcut);
  } catch (error) {
    console.error("Failed to unregister shortcut:", error);
  }
}

export function keyboardEventToShortcut(e: KeyboardEvent): string {
  const parts: string[] = [];

  if (e.ctrlKey || e.metaKey) parts.push("CommandOrControl");
  if (e.altKey) parts.push("Alt");
  if (e.shiftKey) parts.push("Shift");

  const key = e.key.toUpperCase();

  if (!["CONTROL", "META", "ALT", "SHIFT"].includes(key)) {
    parts.push(key);
  }

  return parts.join("+");
}

export function shortcutToKbd(shortcut: string): string[] {
  return shortcut
    .replace("CommandOrControl", isMac() ? "⌘" : "Ctrl")
    .replace("Shift", isMac() ? "⇧" : "Shift")
    .replace("Alt", isMac() ? "⌥" : "Alt")
    .split(/\+/g)
    .map((key) => key.trim());
}

function isMac() {
  return navigator.platform.toUpperCase().includes("MAC");
}
