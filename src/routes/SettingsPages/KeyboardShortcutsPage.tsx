import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "@/stores/settingsStore";
import { updateShortcut } from "@/lib/settings";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  keyboardEventToShortcut,
  shortcutToKbd,
  type Shortcut,
} from "@/lib/keyboardShortcuts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Marker, MarkerContent } from "@/components/ui/marker";
import { Edit2, RotateCcw } from "lucide-react";

export function KeyboardShortcutsPage() {
  const { t } = useTranslation();
  const { settings } = useSettingsStore();
  const { keyboardShortcuts } = settings!;
  const [editingShortcut, setEditingShortcut] = useState<Shortcut | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditClick = (shortcut: Shortcut) => {
    setEditingShortcut(shortcut);
    setEditDialogOpen(true);
  };

  const handleResetClick = async (shortcut: Shortcut) => {
    await updateShortcut(shortcut, shortcut.defaultShortcut);
    await useSettingsStore.getState().load();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Edit dialog */}
      <Dialog
        defaultOpen={false}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t(
                `keyboard-shortcuts-page.shortcuts.${editingShortcut?.id}.title`,
              )}
            </DialogTitle>
            <DialogDescription>
              {t(
                `keyboard-shortcuts-page.shortcuts.${editingShortcut?.id}.description`,
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Input
                id="link"
                readOnly
                value={
                  shortcutToKbd(editingShortcut?.currentShortcut ?? "")
                    .toString()
                    .split(",")
                    .join(" + ") ?? ""
                }
                autoFocus
                onKeyDown={(e) => {
                  e.preventDefault();
                  const newShortcut = keyboardEventToShortcut(e.nativeEvent);
                  if (newShortcut && editingShortcut) {
                    setEditingShortcut({
                      ...editingShortcut,
                      currentShortcut: newShortcut,
                    });
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setEditDialogOpen(false)}
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="button"
              onClick={async () => {
                if (editingShortcut) {
                  const original = keyboardShortcuts.find(
                    (s) => s.id === editingShortcut.id,
                  )!;
                  await updateShortcut(
                    original,
                    editingShortcut.currentShortcut,
                  );
                  await useSettingsStore.getState().load();
                }
                setEditDialogOpen(false);
              }}
            >
              {t("common.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Marker variant="separator">
        <MarkerContent>{t("keyboard-shortcuts-page.global-separator-title")}</MarkerContent>
      </Marker>

      {/* Global shortcut */}
      {keyboardShortcuts.map((shortcut) => {
        if (!shortcut.global) return null;
        const shortcutKeys = shortcutToKbd(shortcut.currentShortcut);
        return (
          <Item variant="outline" key={shortcut.id}>
            <ItemContent>
              <ItemTitle>
                {t(`keyboard-shortcuts-page.shortcuts.${shortcut.id}.title`)}
              </ItemTitle>
              <ItemDescription>
                <KbdGroup key={shortcut.id}>
                  {shortcutKeys.map((key, index) => (
                    <>
                      <Kbd key={index}>{key}</Kbd>
                      {index < shortcutKeys.length - 1 && "+"}
                    </>
                  ))}
                </KbdGroup>
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button
                size="icon-sm"
                variant="outline"
                className="rounded-full"
                aria-label="Invite"
                disabled={shortcut.currentShortcut === shortcut.defaultShortcut}
                onClick={() => handleResetClick(shortcut)}
              >
                <RotateCcw />
              </Button>
              <Button
                size="icon-sm"
                variant="outline"
                className="rounded-full"
                aria-label="Invite"
                onClick={() => handleEditClick(shortcut)}
              >
                <Edit2 />
              </Button>
            </ItemActions>
          </Item>
        );
      })}

      <Marker variant="separator">
        <MarkerContent>{t("keyboard-shortcuts-page.local-separator-title")}</MarkerContent>
      </Marker>

      {/* Local shortcut */}
      {keyboardShortcuts.map((shortcut) => {
        if (shortcut.global) return null;
        const shortcutKeys = shortcutToKbd(shortcut.currentShortcut);
        return (
          <Item variant="outline" key={shortcut.id}>
            <ItemContent>
              <ItemTitle>
                {t(`keyboard-shortcuts-page.shortcuts.${shortcut.id}.title`)}
              </ItemTitle>
              <ItemDescription>
                <KbdGroup key={shortcut.id}>
                  {shortcutKeys.map((key, index) => (
                    <>
                      <Kbd key={index}>{key}</Kbd>
                      {index < shortcutKeys.length - 1 && "+"}
                    </>
                  ))}
                </KbdGroup>
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button
                size="icon-sm"
                variant="outline"
                className="rounded-full"
                aria-label="Invite"
                disabled={shortcut.currentShortcut === shortcut.defaultShortcut}
                onClick={() => handleResetClick(shortcut)}
              >
                <RotateCcw />
              </Button>
              <Button
                size="icon-sm"
                variant="outline"
                className="rounded-full"
                aria-label="Invite"
                onClick={() => handleEditClick(shortcut)}
              >
                <Edit2 />
              </Button>
            </ItemActions>
          </Item>
        );
      })}
    </div>
  );
}
