import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { MoveLeft } from "lucide-react";

export function VaultPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <MoveLeft /> Voltar
      </Button>
    </div>
  );
}
