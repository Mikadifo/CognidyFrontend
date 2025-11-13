export default function QuizzesSkeleton() {
  return (
    <div className="font-nunito text-dark flex flex-col gap-4 w-[640px] animate-pulse rounded-lg relative">
      <div className="w-full bg-dark-16 h-[20px]" />
      <div className="flex flex-wrap gap-4">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="rounded-lg py-2 w-[calc(50%-8px)] bg-dark-16 h-[20px]"
            />
          ))}
      </div>
      <div className="w-ful bg-dark-16 h-[40px] rounded-sm" />
    </div>
  );
}
