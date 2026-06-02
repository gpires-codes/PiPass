import { useEffect, type ReactNode } from "react";
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";
import { BaseLayout } from "./BaseLayout";

interface VaultLayoutProps {
  children: ReactNode;
}

export function VaultLayout({ children }: VaultLayoutProps) {
  useEffect(() => {
    const currentWindow = getCurrentWindow();
    currentWindow.setSize(new LogicalSize(1280, 720));
    currentWindow.center();
  }, []);

  return (
    <BaseLayout className="items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
      <main className="w-full max-w-sm">{children}</main>
    </BaseLayout>
  );
}
