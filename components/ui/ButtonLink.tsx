import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "whatsapp";

const variants: Record<Variant, string> = {
  primary: "bg-aji text-ink hover:bg-maiz",
  ghost: "border border-cream/30 text-cream hover:border-cream hover:bg-cream/5",
  whatsapp: "bg-whatsapp text-ink hover:brightness-110",
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  icon?: ReactNode;
};

/** Enlace con aspecto de botón. Transiciones en CSS: no requiere JS de cliente. */
export function ButtonLink({ variant = "primary", icon, className, children, ...rest }: Props) {
  const external = rest.href?.startsWith("http");
  return (
    <a
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-semibold tracking-wide transition-[background-color,border-color,filter,transform] duration-300 ease-out-soft active:scale-[0.98]",
        variants[variant],
        className,
      )}
    >
      {icon}
      {children}
    </a>
  );
}
