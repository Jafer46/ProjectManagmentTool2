import { getCalendar } from "@/api/calendar";
import CalendarView from "@/components/CalenderView";
import Loading from "@/components/loading";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

const date = {
  month: new Date(Date.now()).getMonth(),
  year: new Date(Date.now()).getFullYear(),
};

function CalenderPage() {
  const [month, setMonth] = React.useState(date);

  const { isLoading, data, error } = useQuery({
    queryKey: ["calendar"],
    queryFn: () => getCalendar(month),
  });

  const handleChange = (isLeft: boolean) => {
    if (isLeft) {
      setMonth((month) => {
        month.month--;
        if (month.month < 0) {
          month.month = 12;
          month.year--;
        }
        return month;
      });
    } else {
      setMonth((month) => {
        month.month++;
        if (month.month > 12) {
          month.month = 0;
          month.year++;
        }
        return month;
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-8">
      <div className="absolute top-2 w-full flex">
        <div className="blur blur-high rounded-md hover:px-1 animate-in animate-out duration-75">
          <ArrowLeft onClick={() => handleChange(true)} />
        </div>
        <div className="blur blur-low w-full flex justify-center mx-1 rounded-sm">
          {}
        </div>
        <div className="blur blur-high rounded-md hover:px-1 animate-in animate-out duration-75">
          <ArrowRight onClick={() => handleChange(false)} />
        </div>
      </div>
      <CalendarView />
    </div>
  );
}

export default CalenderPage;
