import Link from "next/link";
import { ComponentType, FC, SVGProps } from "react";

interface SectionOptionProps {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href: string;
  disabled?: boolean;
}

export const SectionOption: FC<SectionOptionProps> = ({
  label,
  icon: Icon,
  href,
  disabled = false,
}) => {
  if (disabled) {
    return (
      <div className="bg-dark text-white flex flex-col gap-4 p-6 size-[200px] rounded-2xl items-center cursor-not-allowed opacity-[48%]">
        <Icon />
        <span className="font-bold font-poppins text-xl">{label}</span>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="bg-dark text-white flex flex-col gap-4 p-6 size-[200px] rounded-2xl items-center hover:scale-95 hover:opacity-95"
    >
      <Icon />
      <span className="font-bold font-poppins text-xl">{label}</span>
    </Link>
  );
};
