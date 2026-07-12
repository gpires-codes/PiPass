import { useEffect } from "react";
import {
  handleLocalShortcut,
  keyboardEventToShortcut,
} from "@/lib/keyboardShortcuts";
import type { Shortcut } from "@/lib/keyboardShortcuts";

export function useLocalShortcuts(shortcuts: Shortcut[], isUnlocked: boolean) {
  useEffect(() => {
    if (!isUnlocked) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const pressed = keyboardEventToShortcut(e);
      if (!pressed) return;

      const match = shortcuts.find((s) => s.currentShortcut === pressed);

      if (!match) return;

      e.preventDefault();
      handleLocalShortcut(match.id);
    };

    document.addEventListener("keydown", handleKeyDown, { capture: true });
    return () =>
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [isUnlocked, shortcuts]);
}
