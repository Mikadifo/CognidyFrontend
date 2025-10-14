export default function RoadmapGoalsSkeleton() {
  return (
    <div className="font-nunito text-dark flex flex-col gap-16 w-[480px]">
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className="animate-pulse flex flex-col gap-4 justify-between bg-dark-08 rounded-lg p-8 relative h-[200px] w-[480px]"
          >
            <div className="w-[120px] bg-dark-16 h-[20px]" />
            <div className="w-[300px] bg-dark-16 h-[20px]" />
            <div className="w-[80px] bg-dark-16 h-[20px] rounded-full" />
          </div>
        ))}
    </div>
  );
}
