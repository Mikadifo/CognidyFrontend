import { FC } from "react";

interface DashboardHeaderProps {
  heading: string;
  subheading: string;
}

export const DashboardHeader: FC<DashboardHeaderProps> = ({
  heading,
  subheading,
}) => (
  <div className="font-poppins flex flex-col gap-1">
    <span className="text-xl font-bold text-brand-84 tracking-tight uppercase">
      {heading}
    </span>
    <span className="text-dark font-normal text-[32px]">{subheading}</span>
  </div>
);
