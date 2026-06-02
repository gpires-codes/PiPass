import type { ReactNode } from "react";

interface BaseLayoutProps {
  children: ReactNode;
  className?: string;
}

export function BaseLayout({ children, className = "" }: BaseLayoutProps) {
  return (
    <div className={`flex min-h-screen w-full ${className}`}>
      {children}
    </div>
  );
}
