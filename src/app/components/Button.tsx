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
  variant?: "filled" | "outline";
  href?: string;
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
  variant = "filled",
  href,
  ...props
}) => {
  const styles = `${className} font-poppins font-normal text-base px-6 py-3 rounded-sm ${variant === "filled" ? "bg-dark text-white hover:opacity-80" : "border border-dark text-dark hover:bg-dark-08"} cursor-pointer ${Icon && "flex gap-2 items-center"}`;
  const children = (
    <>
      {Icon && <Icon className="size-5" />}
      {props.children}
    </>
  );

  if (as === "a" && href) {
    return (
      <Link
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={href}
        className={styles}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        className={styles}
      >
        {children}
      </button>
    );
  }
};
