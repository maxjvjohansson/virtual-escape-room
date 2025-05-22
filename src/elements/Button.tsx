import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant =
  | "default"
  | "primary-red"
  | "primary-green"
  | "primary-purple"
  | "primary-yellow"
  | "primary-gray"
  | "disabled";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

const variantStyles: Record<Variant, string> = {
  default: "cursor-pointer",
  "primary-red":
    "bg-primary-red hover:bg-primary-red-hover text-white cursor-pointer",
  "primary-green":
    "bg-primary-green hover:bg-primary-green-hover text-white cursor-pointer",
  "primary-purple":
    "bg-primary-purple hover:bg-primary-purple-hover text-white cursor-pointer",
  "primary-yellow":
    "bg-primary-yellow hover:bg-primary-yellow-hover text-black cursor-pointer",
  "primary-gray":
    "bg-light-gray hover:bg-light-gray-hover text-black cursor-pointer",
  disabled: "bg-dark-gray text-light-gray cursor-not-allowed opacity-80",
};

export default function Button({
  children,
  variant = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold capitalize transition-all duration-200",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </button>
  );
}
