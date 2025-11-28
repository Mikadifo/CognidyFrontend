import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Session from "../models/Session";
import { getChartData, getSections } from "../utils/trends";
import { SectionColors } from "../constants";
import { LineChartToolTip } from "./LineChartTooltip";

interface LineChartTrendProps {
  sessions: Session[];
}

function LineChartTrend({ sessions }: LineChartTrendProps) {
  const data = getChartData(sessions);

  return (
    <div className="p-8 rounded-2xl bg-dark-04 w-full max-w-[700px] font-nunito">
      <h1 className="font-bold font-poppins text-base text-dark mb-2">
        Your Growth Timeline
      </h1>

      <p className="text-sm mb-8 text-dark-88">
        Track how much you got right in each session.
      </p>

      <div className="w-full aspect-video">
        <LineChart
          style={{
            width: "100%",
            height: "100%",
            aspectRatio: 1.618,
          }}
          responsive
          data={data}
          margin={{
            top: 5,
            right: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            width="auto"
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<LineChartToolTip />} isAnimationActive={true} />
          <Legend />
          {getSections(sessions).map((section) => (
            <Line
              key={section}
              type="monotone"
              dataKey={section}
              stroke={SectionColors[section as keyof typeof SectionColors]}
              isAnimationActive={true}
            />
          ))}
        </LineChart>
      </div>
    </div>
  );
}

export default LineChartTrend;
