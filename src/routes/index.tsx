import { UnlockPage } from "./unlock";
import { VaultPage } from "./vault";

export const routes = [
  { path: "/", element: UnlockPage },
  { path: "/vault", element: VaultPage },
  // { path: "/add", element: AddPage },
  // { path: "/settings", element: SettingsPage },
];
