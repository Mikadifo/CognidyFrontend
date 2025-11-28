import React, { FC } from "react";

interface LineChartToolTipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    stroke: string;
  }>;
  label?: string;
}

export const LineChartToolTip: FC<LineChartToolTipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-md border border-dark-16 text-dark flex flex-col gap-3 font-nunito">
      <p className="font-bold text-base">{label}</p>

      <div className="flex flex-col gap-1 text-sm">
        {payload.map((item) => (
          <p key={item.dataKey} style={{ color: item.stroke }}>
            <b>{item.dataKey}:</b> <span>{item.value}% correct</span>
          </p>
        ))}
      </div>
    </div>
  );
};
