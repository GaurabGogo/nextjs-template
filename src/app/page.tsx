"use client";

import type React from "react";
import RewardRingsChart from "../components/reward-rings-chart";
import MoneyEarnedChart from "@/components/MoneyEarnedChart";

export default function HomePage() {
  return (
    <section className="homepage">
      <div className="homepage-content">
        <div className="homepage-content__header">
          <h2>History and Statistics</h2>
        </div>
        <div className="homepage-content__body">
          <RewardRingsChart />
          <MoneyEarnedChart />
        </div>
      </div>
    </section>
  );
}
