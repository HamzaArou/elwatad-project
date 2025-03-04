
import { cn } from "@/lib/utils";
import { memo } from "react";
import { getStatusColor } from "./utils";

const StatusLegend = memo(() => {
  return (
    <div className="flex justify-center items-center gap-2 whitespace-nowrap overflow-x-auto py-2">
      {['متاح', 'محجوز', 'مباع'].map((status) => (
        <div
          key={status}
          className={cn(
            "px-4 py-2 rounded-lg font-medium text-center min-w-[80px]",
            getStatusColor(status)
          )}
        >
          {status}
        </div>
      ))}
    </div>
  );
});

StatusLegend.displayName = 'StatusLegend';
export default StatusLegend;
