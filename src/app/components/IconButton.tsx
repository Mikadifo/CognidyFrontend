import React, {
  ButtonHTMLAttributes,
  ComponentType,
  FC,
  SVGProps,
} from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
}

export const IconButton: FC<IconButtonProps> = ({
  className,
  icon: Icon,
  ...props
}) => (
  <button
    {...props}
    className={`${className} flex bg-dark-08 rounded-lg size-[46px] cursor-pointer hover:opacity-80 justify-center items-center`}
  >
    <Icon className="size-4" />
  </button>
);
