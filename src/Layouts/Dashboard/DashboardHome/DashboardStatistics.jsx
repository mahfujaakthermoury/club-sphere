import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { GiLaurelsTrophy } from "react-icons/gi";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import DataLoader from "../../../Components/DataLoader";
import { useContext } from "react";
import WebContext from "../../../Context/WebContext";

const DashboardStatistics = () => {
  const axiosPublic = useAxiosPublic();
  const { theme } = useContext(WebContext);

  const {
    data = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["live-stats"],
    queryFn: async () => {
      const res = await axiosPublic.get("/home/stats");
      return res.data;
    },
    retry: 1,
  });

  if (isError)
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-center font-bold">
        Failed to load stats.
      </div>
    );

  if (isLoading) return <DataLoader />;

  const cardBase = `relative overflow-hidden p-6 rounded-3xl border transition-all duration-300 group`;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* MEMBERS */}
      <div
        className={`${cardBase} ${
          theme === "dark"
            ? "bg-slate-900 border-slate-800 hover:shadow-xl hover:shadow-[#682626]/20"
            : "bg-white border-gray-100 hover:shadow-xl"
        }`}
      >
        <div className="flex py-3 items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest opacity-50 mb-2">
              Total Members
            </p>
            <h3
              className={`text-3xl font-black ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              {data.users?.toLocaleString() || 0}
            </h3>
          </div>

          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-[#682626]/10 text-[#682626] group-hover:scale-110 transition-transform">
            <FaUsers />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-[#682626]/40" />
      </div>

      {/* APPLICATIONS */}
      <div
        className={`${cardBase} ${
          theme === "dark"
            ? "bg-slate-900 border-slate-800 hover:shadow-xl hover:shadow-[#c9790a]/20"
            : "bg-white border-gray-100 hover:shadow-xl"
        }`}
      >
        <div className="flex py-3 items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest opacity-50 mb-2">
              Total Applications
            </p>
            <h3
              className={`text-3xl font-black ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              {data.applications?.toLocaleString() || 0}
            </h3>
          </div>

          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-[#c9790a]/10 text-[#c9790a] group-hover:scale-110 transition-transform">
            <MdAssignmentTurnedIn />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-[#c9790a]/40" />
      </div>

      {/* CLUBS */}
      <div
        className={`${cardBase} ${
          theme === "dark"
            ? "bg-slate-900 border-slate-800 hover:shadow-xl hover:shadow-[#92400e]/20"
            : "bg-white border-gray-100 hover:shadow-xl"
        }`}
      >
        <div className="flex py-3 items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest opacity-50 mb-2">
              Active Clubs
            </p>
            <h3
              className={`text-3xl font-black ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              {data.clubs?.toLocaleString() || 0}
            </h3>
          </div>

          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-[#92400e]/10 text-[#92400e] group-hover:scale-110 transition-transform">
            <GiLaurelsTrophy />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-[#92400e]/40" />
      </div>
    </div>
  );
};

export default DashboardStatistics;
