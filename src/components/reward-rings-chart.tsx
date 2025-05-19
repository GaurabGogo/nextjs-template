import { Info } from "lucide-react";
import Image from "next/image";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Data for the pie chart
const data = [
  { name: "Gold", value: 33, color: "#DEB70F", text: "Achieved 22 medals" },
  { name: "Silver", value: 33, color: "#ADA997", text: "Achieved 1 medal" },
  { name: "Bronze", value: 34, color: "#CD7F32", text: "Achieved 1 medal" },
];

export default function RewardRingsChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bar-chart__tooltip bg-white border px-2 py-1 rounded shadow">
          <div className="flex items-center gap-1">
            <span className="font-medium">{payload[0].payload.name}</span>
            <span className="text-xs">{payload[0].payload.value} medals</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pie-chart-wrapper">
      <div className="pie-chart__header">
        <h3>Reward Rings</h3>
        <Image
          src="/charts/medal.gif"
          alt="Reward Rings"
          width={24}
          height={24}
        />
      </div>
      <div className="reward-rings-chart-container">
        <ResponsiveContainer
          width="100%"
          height={240}
          className="responsive-container"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="reward-rings-chart-legend">
          {data.map((entry, index) => (
            <div
              key={`legend-${index}`}
              className="reward-rings-chart-legend-item"
            >
              <div
                className="reward-rings-chart-legend-item-color"
                style={{ backgroundColor: entry.color }}
              />
              <div className="flex flex-col gap-2">
                <div className="reward-rings-chart-legend-item-name">
                  {entry.name}
                  <Info />
                </div>
                <div className="reward-rings-chart-legend-item-text">
                  {entry.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
