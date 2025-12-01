import React, { FC } from "react";
import RestartIcon from "./../assets/icons/restartIcon.svg";

interface DescriptionCardProps {
  className?: string;
  sourceFileName: string;
  correct: number;
  missed: number;
  total: number;
  label: string;
  onRestart?: () => void;
}

export const DescriptionCard: FC<DescriptionCardProps> = ({
  className,
  sourceFileName,
  correct,
  missed,
  total,
  label,
  onRestart = () => {},
}) => {
  const padStart = (num: number) => String(num).padStart(2, "0");

  return (
    <div
      className={`${className} bg-dark-08 flex-col gap-8 px-12 py-8 rounded-lg text-dark font-nunito min-w-[276px] max-w-fit h-fit relative hidden lg:flex`}
    >
      <span className="text-xs max-w-[148px] truncate">
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

      <button
        className="absolute top-3 right-3 cursor-pointer hover:opacity-80"
        onClick={() => onRestart()}
      >
        <RestartIcon className="size-6 text-dark-88" />
      </button>
    </div>
  );
};
