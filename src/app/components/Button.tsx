"use client";

import Link from "next/link";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentType,
  FC,
  SVGProps,
} from "react";

interface BaseButtonProps {
  className?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  iconClassName?: String;
  variant?: "filled" | "outline";
  href?: string;
  disabled?: boolean;
}

interface asButtonProps
  extends BaseButtonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button";
  href?: never;
}

interface asLinkProps
  extends BaseButtonProps,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: "a";
  href: string;
}

type ButtonProps = asButtonProps | asLinkProps;

export const Button: FC<ButtonProps> = ({
  as = "button",
  className,
  icon: Icon,
  iconClassName,
  variant = "filled",
  disabled = false,
  href,
  ...props
}) => {
  const styles = `${className} font-poppins font-normal text-base px-6 py-3 rounded-sm ${variant === "filled" ? `bg-dark text-white ${disabled ? "" : "hover:opacity-80"}` : `border border-dark text-dark ${disabled ? "bg-dark-08" : "hover:bg-dark-08"}`} ${Icon && "flex gap-2 items-center"} ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`;
  const children = (
    <>
      {props.children}
      {Icon && <Icon className={`${iconClassName} size-5`} />}
    </>
  );

  if (as === "a" && href) {
    return (
      <Link
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={href}
        className={styles}
        onClick={(evt) => {
          if (disabled) {
            evt.preventDefault();
          }
        }}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        className={styles}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
};
