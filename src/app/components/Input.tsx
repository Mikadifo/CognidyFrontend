import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  className?: string;
}

export const Input: FC<InputProps> = ({
  className,
  label,
  labelClassName,
  ...props
}) => (
  <div className="flex flex-col gap-2 font-nunito">
    {label && (
      <label className={`${labelClassName} text-dark font-bold text-[18px]`}>
        {label}
      </label>
    )}
    <input
      {...props}
      className={`${className} font-normal text-base px-4 py-2 rounded-lg bg-dark-08 text-dark focus:outline-brand focus:outline-2`}
    />
  </div>
);
