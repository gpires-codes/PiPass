import { useEffect } from "react";
import {
  getCurrentWebviewWindow,
} from "@tauri-apps/api/webviewWindow";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";

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
      <Routes>
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
    </MemoryRouter>
  );
}

export default App;
