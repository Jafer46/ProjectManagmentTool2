import { cn } from "@/lib/utils";

export default function CalendarView() {
  const dates = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  const indices = [9, 10, 30];
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 p-4">
      {dates.map((index) => (
        <div
          className={cn(
            "h-32 w-auto border flex p-2 border-l-0",
            indices.includes(index) && "blur blur-high"
          )}
        >
          Day {index}
        </div>
      ))}
    </div>
  );
}
