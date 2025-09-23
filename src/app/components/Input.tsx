import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export const Input: FC<InputProps> = ({ className, label, ...props }) => (
  <input
    {...props}
    className={`${className} font-nunito font-normal text-base px-4 py-2 rounded-lg bg-dark-08 text-dark focus:outline-brand focus:outline-2`}
  />
);
