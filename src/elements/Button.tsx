import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant =
  | "default"
  | "primary-red"
  | "secondary-red"
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
  default: "",
  "primary-red":
    "bg-primary-red hover:bg-black text-white hover:text-primary-red",
  "secondary-red":
    "bg-black border-2 border-primary-red text-primary-red hover:bg-primary-red hover:text-white",
  "primary-green": "bg-primary-green hover:bg-primary-green-hover text-black",
  "primary-purple":
    "bg-primary-purple hover:bg-primary-purple-hover text-white",
  "primary-yellow":
    "bg-primary-yellow hover:bg-primary-yellow-hover text-black",
  "primary-gray": "bg-light-gray hover:bg-light-gray-hover text-black",
  disabled: "bg-dark-gray text-light-gray cursor-not-allowed opacity-60",
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
        "flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold uppercase transition-all duration-200 cursor-pointer",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </button>
  );
}
