import Link from "next/link";
import { AnchorHTMLAttributes, ComponentType, FC, SVGProps } from "react";

interface SectionOptionProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href: string;
}

export const SectionOption: FC<SectionOptionProps> = ({
  label,
  icon: Icon,
  href,
  ...props
}) => {
  return (
    <Link
      href={href}
      {...props}
      className="bg-dark text-white flex flex-col gap-4 p-6 size-[200px] rounded-2xl items-center"
    >
      <Icon />
      <span className="font-bold font-poppins text-xl">{label}</span>
    </Link>
  );
};
