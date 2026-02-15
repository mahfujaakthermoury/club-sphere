import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import DataLoader from "../../../Components/DataLoader";
import { useContext } from "react";
import WebContext from "../../../Context/WebContext";

const DashboardLine = () => {
  const axiosPublic = useAxiosPublic();
  const { theme } = useContext(WebContext);

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["live-stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/home/stats");
      return res.data;
    },
  });

  // Restructured data for multiple lines
  const chartData = [
  { name: "Members", members: stats.users || 0, applications: 0, clubs: 0 },
  { name: "Applications", members: 0, applications: stats.applications || 0, clubs: 0 },
  { name: "Clubs", members: 0, applications: 0, clubs: stats.clubs || 0 },
];


  if (isLoading) return <DataLoader />;

  return (
    <div
      className={`p-6 rounded-4xl border transition-all duration-300 h-[400px] flex flex-col ${
        theme === "dark"
          ? "bg-slate-900 border-slate-800 shadow-2xl shadow-black/20"
          : "bg-white border-gray-100 shadow-sm"
      }`}
    >
      <h3
        className={`text-lg font-black mb-4 px-2 ${
          theme === "dark" ? "text-white" : "text-slate-800"
        }`}
      >
        Platform Statistics
      </h3>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              stroke="#3b2f2f"
              strokeDasharray="3 3"
              strokeOpacity={0.2}
            />

            <XAxis
              dataKey="name"
              stroke={theme === "dark" ? "#94a3b8" : "#64748b"}
            />

            <YAxis stroke={theme === "dark" ? "#94a3b8" : "#64748b"} />

            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            />

            <Legend />

            {/* Members Line */}
            <Line
              type="monotone"
              dataKey="members"
              stroke="#682626"
              strokeWidth={3}
              dot={{ r: 6, fill: "#682626" }}
              activeDot={{ r: 8 }}
            />

            {/* Applications Line */}
            <Line
              type="monotone"
              dataKey="applications"
              stroke="#c9790a"
              strokeWidth={3}
              dot={{ r: 6, fill: "#c9790a" }}
              activeDot={{ r: 8 }}
            />

            {/* Clubs Line */}
            <Line
              type="monotone"
              dataKey="clubs"
              stroke="#92400e"
              strokeWidth={3}
              dot={{ r: 6, fill: "#92400e" }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardLine;
