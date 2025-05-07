import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "cursor-pointer border-1 border-black px-4 py-2 rounded",
        className
      )}
    >
      {children}
    </button>
  );
}
