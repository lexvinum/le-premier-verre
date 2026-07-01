import Link from "next/link";

type LPVButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "ghost";
};

export function LPVButton({
  href,
  children,
  variant = "dark",
}: LPVButtonProps) {
  const classes = {
    dark: "bg-[var(--lpv-ink)] text-white hover:bg-[var(--lpv-olive)]",
    light:
      "border border-[var(--lpv-border)] bg-[rgba(255,250,240,0.55)] text-[var(--lpv-ink)] hover:bg-white",
    ghost: "text-[var(--lpv-muted)] hover:text-[var(--lpv-ink)]",
  };

  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-full px-6 py-3 text-sm transition ${classes[variant]}`}
    >
      {children}
    </Link>
  );
}
