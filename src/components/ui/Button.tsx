import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary";

const variantClasses: Record<Variant, string> = {
  primary: "bg-kraft text-white hover:bg-kraft-dark",
  secondary: "bg-steel text-white hover:bg-steel-dark",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-md px-5 py-2.5 font-body font-medium text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal";

export function Button({
  variant = "primary",
  href,
  className = "",
  ...props
}: {
  variant?: Variant;
  href?: string;
} & ComponentPropsWithoutRef<"button">) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {props.children}
      </Link>
    );
  }

  return <button className={classes} {...props} />;
}
