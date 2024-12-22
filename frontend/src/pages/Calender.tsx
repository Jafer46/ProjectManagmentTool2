import CalendarView from "@/components/CalenderView";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ArrowLeft, ArrowRight } from "lucide-react";

function CalenderPage() {
  return (
    <div className="mt-8">
      <div className="absolute top-2 w-full flex">
        <div className="blur blur-high rounded-md hover:px-1 animate-in animate-out duration-75">
          <ArrowLeft />
        </div>
        <div className="blur blur-low w-full flex justify-center mx-1 rounded-sm">
          This Month
        </div>
        <div className="blur blur-high rounded-md hover:px-1 animate-in animate-out duration-75">
          <ArrowRight />
        </div>
      </div>
      <CalendarView />
    </div>
  );
}

export default CalenderPage;
