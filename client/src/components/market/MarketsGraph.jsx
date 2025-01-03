import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Day 1", VNINDEX: 1267, HNXINDEX: 227, VN30: 1340, HNX30: 478 },
  { name: "Day 2", VNINDEX: 1268, HNXINDEX: 227.5, VN30: 1342, HNX30: 479 },
  { name: "Day 3", VNINDEX: 1269, HNXINDEX: 227.7, VN30: 1343, HNX30: 479.5 },
  { name: "Day 4", VNINDEX: 1270, HNXINDEX: 228, VN30: 1344, HNX30: 480 },
  { name: "Day 5", VNINDEX: 1269.5, HNXINDEX: 227.8, VN30: 1343.5, HNX30: 479.8 },
];

const MarketGraph = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 0, right: 60, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

      </LineChart>
    </ResponsiveContainer>
  );
};

export default MarketGraph;