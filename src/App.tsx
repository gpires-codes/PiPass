import { useEffect, useState } from "react";
import { LogicalSize } from "@tauri-apps/api/window";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import {
  MemoryRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { useSettingsStore } from "@/stores/settingsStore";
import { startLockTimer, useVaultStore } from "@/stores/vaultStore";
import i18n from "@/lib/i18n";
import { applyTheme } from "@/lib/theme";
import { routes } from "@/routes";

function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const isUnlocked = useVaultStore((state) => state.isUnlocked);
  const [isReady, setIsReady] = useState(i18n.isInitialized);

  // Init settings
  useEffect(() => {
    useSettingsStore
      .getState()
      .load()
      .then((settings) => {
        if (settings?.language) {
          i18n.changeLanguage(settings.language);
        }
        if (settings?.theme) applyTheme(settings.theme);
        setIsReady(true);
      });
  }, []);

  // Redirect to locked page if not unlocked
  useEffect(() => {
    if (!isUnlocked && location.pathname !== "/") {
      const currentWindow = getCurrentWebviewWindow();
      currentWindow.setSize(new LogicalSize(500, 400));
      currentWindow.center();
      currentWindow.setAlwaysOnTop(true);
      currentWindow.close();
      navigate("/", { replace: true });
    }
  }, [isUnlocked, location.pathname, navigate]);

  // Check if there is activity
  useEffect(() => {
    if (!isUnlocked) return;

    const reset = () => {
      const lockFn = () => {
        useVaultStore.getState().lock();
      };
      startLockTimer(lockFn);
    };

    const timer = setTimeout(() => {
      window.addEventListener("mousemove", reset);
      window.addEventListener("keydown", reset);
    }, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", reset);
      window.removeEventListener("keydown", reset);
    };
  }, [isUnlocked]);

  if (!isReady) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routes.map((route) => {
          const Component = route.element;
          const Layout = route.layout;

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                Layout ? (
                  <Layout>
                    <Component />
                  </Layout>
                ) : (
                  <Component />
                )
              }
            />
          );
        })}
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    const init = async () => {
      const main = getCurrentWebviewWindow();
      await main.show();
    };
    init();
  }, []);

  return (
    <MemoryRouter>
      <AnimatedRoutes />
    </MemoryRouter>
  );
}

export default App;
