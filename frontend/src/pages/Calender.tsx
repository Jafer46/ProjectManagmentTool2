import CalendarView from "@/components/CalenderView";
import { ScrollArea } from "@radix-ui/react-scroll-area";

function CalenderPage() {
  return (
    <div className=" mt-8">
      <div className="absolute top-2 w-full flex justify-center"> Hello</div>
      <CalendarView />
    </div>
  );
}

export default CalenderPage;
