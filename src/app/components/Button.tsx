import { ComponentType, FC, SVGProps } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  variant?: "filled" | "outline";
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className,
  disabled,
  icon: Icon,
  variant = "filled",
}) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`${className} font-poppins font-normal text-base px-6 py-3 rounded-sm ${variant === "filled" ? "bg-dark text-white hover:opacity-80" : "border border-dark text-dark hover:bg-dark-08"} cursor-pointer ${Icon && "flex gap-2 items-center"}`}
  >
    {Icon && <Icon className="size-5" />}
    {children}
  </button>
);
