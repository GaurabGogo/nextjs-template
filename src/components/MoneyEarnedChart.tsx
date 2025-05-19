"use client";

import { useState } from "react";
import { Bar, BarChart, Tooltip, XAxis, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaChevronDown } from "react-icons/fa";
import { Earth } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

export default function MoneyEarnedChart() {
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const [year, setYear] = useState<number>(2022);

  const data = [
    { month: "Mar", amount: 150 },
    { month: "Apr", amount: 80 },
    { month: "May", amount: 160 },
    { month: "Jun", amount: 120 },
    { month: "Jul", amount: 60 },
    { month: "Aug", amount: 180 },
    { month: "Sep", amount: 90 },
    { month: "Oct", amount: 170 },
    { month: "Nov", amount: 110 },
    { month: "Dec", amount: 110 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bar-chart__tooltip">
          <div className="tooltip-card">
            <h2>Event Title</h2>
            <div className="flex items-center gap-2">
              <h4 className="text-gray-500">${payload[0].payload.amount}</h4>
              <Earth className="h-4 w-4 text-gray-500" />
              <span className="text-gray-500 text-xs">
                {payload[0].payload.month}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const totalEarned = 905;

  return (
    <div className="bar-chart-wrapper w-full">
      <div className="bar-chart__header mb-4 flex justify-between items-center">
        <h3 className="text-2xl font-medium">
          Money Earned <span className="font-bold">${totalEarned}</span>
        </h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-sm bg-white px-10 py-5 flex gap-2 items-center"
            >
              {year}
              <FaChevronDown className="h-4 w-4" />
              <span className="sr-only">Toggle year</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {[2022, 2023, 2024].map((y) => (
              <DropdownMenuItem key={y} onClick={() => setYear(y)}>
                {y}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full h-full relative">
        <ResponsiveContainer width="100%" height={340}>
          <BarChart
            data={data}
            margin={{ bottom: 20, left: 0, right: 0 }}
            onMouseMove={(data) => {
              if (data?.activeTooltipIndex !== undefined) {
                setActiveBar(data.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => setActiveBar(null)}
          >
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#71717a" }}
              dy={10}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar
              dataKey="amount"
              radius={[4, 4, 0, 0]}
              fill="#2563eb"
              barSize={60}
              shape={(props: any) => {
                const { x, y, width, height, index, payload } = props;
                const isActive = index === activeBar;
                const fillColor = isActive ? "#FFC533" : "#2563eb";

                return (
                  <>
                    <rect
                      x={x}
                      y={y}
                      width={60}
                      height={height}
                      fill={fillColor}
                      rx={4}
                      ry={4}
                    />
                    {payload.month === "Jun" && (
                      <foreignObject x={x} y={y - 30} width={width} height={30}>
                        <div className="bar-chart__tooltip-annotation"></div>
                      </foreignObject>
                    )}
                  </>
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
