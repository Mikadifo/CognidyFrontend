import { FC } from "react";

export const NoteItemsSkeleton: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <div className="flex gap-2 animate-pulse h-[38px]" key={i}>
            <div className="flex gap-2 bg-dark-08 rounded-lg px-4 py-2 w-full items-center" />
            <div className="flex gap-2 bg-dark-08 rounded-lg w-[40px] h-[38px] items-center" />
          </div>
        ))}
    </div>
  );
};
