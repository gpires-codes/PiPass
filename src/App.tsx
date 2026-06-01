import { routes } from "./routes";
import { MemoryRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <MemoryRouter>
      <Routes>
        {routes.map((route) => {
          const Component = route.element;
          return (
            <Route key={route.path} path={route.path} element={<Component />} />
          );
        })}
      </Routes>
    </MemoryRouter>
  );
}

export default App;
