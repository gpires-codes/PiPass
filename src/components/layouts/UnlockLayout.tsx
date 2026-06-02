import { useEffect, type ReactNode } from "react";
import { BaseLayout } from "./BaseLayout";
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";

interface UnlockLayoutProps {
  children: ReactNode;
}

export function UnlockLayout({ children }: UnlockLayoutProps) {
  useEffect(() => {
    const currentWindow = getCurrentWindow();
    currentWindow.setSize(new LogicalSize(600, 500));
    currentWindow.center();
  }, []);

  return (
    <BaseLayout className="items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
      <div className="w-full max-w-sm">{children}</div>
    </BaseLayout>
  );
}
