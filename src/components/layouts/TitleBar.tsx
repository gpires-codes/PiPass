import { getCurrentWindow } from "@tauri-apps/api/window";
import { Square, X } from "lucide-react";

export function TitleBar() {
  const win = getCurrentWindow();

  return (
    <div
      className="flex items-center justify-between h-6 select-none bg-muted z-100"
      data-tauri-drag-region
    >
      <span
        className="text-sm font-semibold text-zinc-400 ml-2 pointer-events-none"
        data-tauri-drag-region
      >
        PiPass
      </span>

      <div className="flex items-center gap-1 z-10">
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => win.minimize()}
          className="w-7 h-7 flex items-center justify-center rounded text-zinc-400 hover:text-white transition-colors"
        >
          ─
        </button>
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => win.toggleMaximize()}
          className="w-7 h-7 flex items-center justify-center rounded text-zinc-400 hover:text-white transition-colors"
        >
          <Square className="w-4 h-4" />
        </button>
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => win.close()}
          className="w-7 h-7 flex items-center justify-center rounded text-zinc-400 hover:text-red-400 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
