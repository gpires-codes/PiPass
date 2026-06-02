import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Power } from "lucide-react";

export function VaultPage() {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/", { replace: true });
  };

  return (
    <div>
      <div className="fixed top-4 right-4">
        <Button variant={"secondary"} onClick={handleExit}>
          <Power />
        </Button>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Senhas Armazenadas</h1>
        <p className="text-sm">
          Gerencie suas senhas armazenadas com segurança
        </p>
      </div>
    </div>
  );
}
