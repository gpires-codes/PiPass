import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { MoveRight } from "lucide-react";

export function UnlockPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Input />
      <Button onClick={() => navigate("/vault")}>
        <MoveRight /> Entrar
      </Button>
    </div>
  );
}
