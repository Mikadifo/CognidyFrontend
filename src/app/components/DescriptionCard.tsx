import React, { FC } from "react";

interface DescriptionCardProps {
  className?: string;
  sourceFileName: string;
  correct: number;
  missed: number;
  total: number;
  label: string;
}

export const DescriptionCard: FC<DescriptionCardProps> = ({
  className,
  sourceFileName,
  correct,
  missed,
  total,
  label,
}) => {
  const padStart = (num: number) => String(num).padStart(2, "0");

  return (
    <div
      className={`${className} bg-dark-08 flex flex-col gap-8 px-12 py-8 rounded-lg text-dark font-nunito min-w-[276px] max-w-fit h-fit`}
    >
      <span className="text-[10px] max-w-[148px] truncate">
        <strong>Source: </strong>
        {sourceFileName}
      </span>

      <div className="flex flex-col gap-1">
        <div className="flex gap-2 items-center">
          <span className="text-brand text-xl font-poppins font-bold">
            {padStart(total - correct - missed)}
          </span>
          <span className="text-base">{label} to go</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-brand text-xl font-poppins font-bold">
            {padStart(correct)}
          </span>
          <span className="text-base">correct</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-brand text-xl font-poppins font-bold">
            {padStart(missed)}
          </span>
          <span className="text-base">missed</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-brand text-xl font-poppins font-bold">
            {padStart(total)}
          </span>
          <span className="text-base">total {label}</span>
        </div>
      </div>
    </div>
  );
};
