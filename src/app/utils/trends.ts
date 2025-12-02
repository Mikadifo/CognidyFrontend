import LineChartData from "../models/LineChartData";
import Session from "../models/Session";

export function getChartData(sessions: Session[]) {
  const map = new Map<number, LineChartData>();

  sessions.forEach((session) => {
    const key = session.number;
    const score = Math.round((session.correct / session.total) * 100);

    if (!map.has(key)) {
      map.set(key, { name: `Session ${key}` });
    }

    const entry = map.get(key)!;
    entry[session.section] = score;
  });

  return Array.from(map.values());
}

export function getSections(sessions: Session[]) {
  return [...new Set(sessions.map((s) => s.section))];
}
