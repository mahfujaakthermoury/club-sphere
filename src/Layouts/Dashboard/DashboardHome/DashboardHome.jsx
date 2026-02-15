import { useContext } from "react";
import WebContext from "../../../Context/WebContext";
import DashboardStatistics from "./DashboardStatistics";
import DashboardLine from "./DashboardLine";
import { HeadProvider, Title } from "react-head";
import { MdWavingHand, MdInsertChartOutlined } from "react-icons/md";

const DashboardHome = () => {
  const { userName, theme } = useContext(WebContext);

  const colors = {
    lightBg: "bg-[#fff6f6]",
    darkBg: "bg-[#2c1f1f]",
    lightText: "text-[#714747]",
    darkText: "text-[#f8f8f8]",
    accent: "text-[#e59e3b]",
    cardLight: "bg-[#ffffff] border-[#f0e5e5]",
    cardDark: "bg-[#3c2b2b] border-[#4a3636]",
  };

  return (
    <div className="w-full space-y-10 animate-in fade-in duration-700 p-4 md:p-8">
      <HeadProvider>
        <Title>Welcome to Dashboard || ClubSphere</Title>
      </HeadProvider>

      {/* Hero Banner */}
      <div
        className={`relative overflow-hidden rounded-xl border p-5 md:p-15 transition-all duration-300 ${theme === "dark" ? colors.darkBg + " border-[#4a3636] shadow-2xl" : colors.lightBg + " border-[#f0e5e5] shadow-xl"
          }`}
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#e59e3b]/10 blur-3xl"></div>
        <div className="relative flex flex-col items-center text-center">
          <h1 className={`md:text-4xl text-2xl font-black mb-4 tracking-tight ${theme === "dark" ? colors.darkText : colors.lightText}`}>
            Hello,{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#714747] to-[#e59e3b] italic">
              {userName || "Dear"}
            </span>
            !
          </h1>
          <p className={`max-w-xl sm:text-lg text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Welcome to your dashboard. Track your applications, review progress, and stay up-to-date with ClubSphere activities.
          </p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="space-y-6 my-20">
        <DashboardStatistics />
      </div>

      {/* Pie Chart Section */}
        <div className=" lg:grid-cols-12 gap-8 items-start">
          {/* Pie Chart */}
          <div className="lg:col-span-6 w-full">
            <DashboardLine />
          </div>
        </div>
      </div>
  );
};

export default DashboardHome;
