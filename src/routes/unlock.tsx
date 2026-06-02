import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Toggle } from "../components/ui/toggle";
import { Field, FieldGroup, FieldLabel } from "../components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../components/ui/input-group";
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";

export function UnlockPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleUnlock = async () => {
    navigate("/vault", { replace: true });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleUnlock();
      }}
      className="w-full"
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex size-8 items-center justify-center rounded-md">
            <LockIcon className="size-6" />
          </div>
          <span className="sr-only">PiPass logo</span>
          <h1 className="text-xl font-bold">PiPass</h1>
        </div>
        <Field>
          <FieldLabel htmlFor="inline-end-input">Senha</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="inline-end-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputGroupAddon align="inline-end">
              <Toggle
                aria-label="Toggle password visibility"
                size="sm"
                variant="default"
                pressed={showPassword}
                onPressedChange={setShowPassword}
              >
                {showPassword ? (
                  <EyeOffIcon className="size-4" />
                ) : (
                  <EyeIcon className="size-4" />
                )}
              </Toggle>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Button type="submit" className="w-full">
          Desbloquear
        </Button>
      </FieldGroup>
    </form>
  );
}
