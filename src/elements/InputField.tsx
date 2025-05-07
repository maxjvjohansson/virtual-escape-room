import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function InputField(props: InputProps) {
  return <input type="text" {...props} />;
}
