import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";
import DataLoader from "../../../../Components/DataLoader";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { HeadProvider, Title } from "react-head";
import { useContext } from "react";
import WebContext from "../../../../Context/WebContext";
import { MdPeople, MdSchool, MdAttachMoney } from "react-icons/md";

const Analytics = () => {
  const AxiosPublic = useAxiosPublic();
  const { theme } = useContext(WebContext);

  const colors = {
    lightBg: "bg-[#fff6f6]",
    darkBg: "bg-[#2c1f1f]",
    lightText: "text-[#714747]",
    darkText: "text-[#f8f8f8]",
    accent: "#e59e3b",
    cardLight: "bg-[#ffffff] border-[#f0e5e5]",
    cardDark: "bg-[#3c2b2b] border-[#4a3636]",
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["analyticsStats"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/analytics/stats");
      return res.data;
    },
    retry: 2,
  });

  if (isLoading) return <DataLoader />;
  if (isError)
    return (
      <div className={`py-20 text-center font-bold text-red-500 ${theme === "dark" ? "bg-red-500/10 border-red-500/20" : "bg-red-100 border-red-200"} rounded-4xl border`}>
        Failed to load analytics. Please try again later.
      </div>
    );

  const barData = Object.entries(data.appCountPerUniversity || {}).map(
    ([univ, count]) => ({
      university: univ,
      applications: count,
    })
  );

  const pieData = [
    { name: "Users", value: data.usersCount },
    { name: "clubs", value: data.clubsCount },
    { name: "Fees ($)", value: data.totalFees },
  ];

  const COLORS = [colors.accent, "#714747", "#f59e0b"];

  return (
    <div className={"w-full space-y-10 p-2 sm:p-4 md:p-8"}>
      <HeadProvider>
        <Title>Admin Analytics || ClubSphere</Title>
      </HeadProvider>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className={`md:text-3xl text-2xl font-black tracking-tight ${theme === "dark" ? colors.darkText : colors.lightText}`}>
            System Analytics
          </h2>
          <p className={`opacity-60 font-medium italic ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Comprehensive overview of ClubSphere performance.
          </p>
        </div>
      </div>

      {/* 1. Statistics Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Total Users",
            value: data.usersCount,
            icon: <MdPeople />,
            color: "#0ea5e9",
            bg: "#0ea5e9/10",
          },
          {
            label: "Total clubs",
            value: data.clubsCount,
            icon: <MdSchool />,
            color: "#714747",
            bg: "#714747/10",
          },
          {
            label: "Fees Collected",
            value: `$${data.totalFees}`,
            icon: <MdAttachMoney />,
            color: "#f59e0b",
            bg: "#f59e0b/10",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`p-8 rounded-4xl border transition-all duration-300 flex items-center gap-6 ${theme === "dark" ? colors.cardDark + " hover:border-[#5a4141]" : colors.cardLight}`}
          >
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-3xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest opacity-50 mb-1">
                {stat.label}
              </p>
              <h3 className={`text-3xl font-black ${theme === "dark" ? colors.darkText : colors.lightText}`}>
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Bar Chart: Applications per University */}
        <div className={`lg:col-span-7 p-8 rounded-4xl border transition-all ${theme === "dark" ? colors.cardDark : colors.cardLight}`}>
          <div className="flex items-center gap-2 mb-8">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: colors.accent }}></div>
            <h3 className={`text-sm font-black uppercase tracking-widest opacity-70 ${theme === "dark" ? colors.darkText : colors.lightText}`}>
              Applications per Clubs
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === "dark" ? "#3c2b2b" : "#f0e5e5"} />
              <XAxis
                dataKey="university"
                axisLine={false}
                tickLine={false}
                tick={{ fill: theme === "dark" ? "#f8f8f8" : "#714747", fontSize: 10, fontWeight: "bold" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: theme === "dark" ? "#f8f8f8" : "#714747", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: theme === "dark" ? "#3c2b2b" : "#fff6f6" }}
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  backgroundColor: theme === "dark" ? "#2c1f1f" : "#fff",
                }}
              />
              <Bar dataKey="applications" fill={colors.accent} radius={[10, 10, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Summary */}
        <div className={`lg:col-span-5 p-8 rounded-4xl border transition-all ${theme === "dark" ? colors.cardDark : colors.cardLight}`}>
          <div className="flex items-center gap-2 mb-8">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: "#f59e0b" }}></div>
            <h3 className={`text-sm font-black uppercase tracking-widest opacity-70 ${theme === "dark" ? colors.darkText : colors.lightText}`}>
              Resource Distribution
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={80}
                outerRadius={120}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  backgroundColor: theme === "dark" ? "#2c1f1f" : "#fff",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{
                  paddingTop: "20px",
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: theme === "dark" ? colors.darkText : colors.lightText,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="flex items-center gap-4 px-2 py-4">
        <div className="h-0.5 flex-1 bg-linear-to-r from-transparent via-[#714747]/20 to-transparent"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
          End of Analytics Report
        </p>
        <div className="h-0.5 flex-1 bg-linear-to-r from-transparent via-[#714747]/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default Analytics;
