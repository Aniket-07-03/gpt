import { Card, CardContent } from "@/components/ui/card";
import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { TooltipPortal } from "@radix-ui/react-tooltip";

type CustomCardProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: string | number;
  icon: ReactNode;
  fromColor: string;
  toColor: string;
  textFrom: string;
  textTo: string;
  isPercentage?: boolean;
};
function formatToCr(value: number): string {
  if (isNaN(value)) return "N/A";
  const inCr = value / 10000000; // 1 Cr = 1,00,00,000
  return `₹${inCr.toFixed(2)} Cr`;
}
export function CustomCard({
  label,
  value,
  icon,
  fromColor,
  toColor,
  textFrom,
  textTo,
  className,
  isPercentage,
  ...props
}: CustomCardProps) {
  return (
    <Card
      className={clsx(
        "group transform transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-[1.02] shadow-md",
        "bg-white border rounded-xl overflow-hidden",
        className
      )}
      {...props}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div
            className={`p-3 bg-gradient-to-br from-${fromColor} to-${toColor} rounded-2xl shadow-lg`}
          >
            {icon}
          </div>
          <div>
            <div
              className={`text-[22px] font-bold bg-gradient-to-r from-${textFrom} to-${textTo} bg-clip-text text-transparent truncate max-w-[150px]`}
            >
              {isPercentage ? value : formatToCr(Number(value))}
              {isPercentage ? " %" : ""}
            </div>
            <Tooltip>
              <TooltipTrigger className="absolute top-2 right-2" asChild>
                <Info className="h-5 w-5 text-gray-500 hover:text-orange-600 cursor-pointer" />
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipContent>
                 {isPercentage ? <p>
                        Utilization is defined as:  
                        <span className="font-semibold"> (Total Funds Spent ÷ Total Funds Received) × 100</span>
                      </p>: <p>
                    {label}: {isPercentage ? "" : "₹"}{Number(value).toLocaleString()}
                    {isPercentage ? "%" : ""}
                  </p>}
                </TooltipContent>
              </TooltipPortal>
            </Tooltip>
            <p className="text-gray-600 font-medium">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
