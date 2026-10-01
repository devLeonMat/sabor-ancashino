import { cn } from "@/lib/cn";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-aji", className)}>
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}
