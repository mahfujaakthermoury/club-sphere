import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import WebContext from "../../../../Context/WebContext";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import DataLoader from "../../../../Components/DataLoader";
import Swal from "sweetalert2";
import { HeadProvider, Title } from "react-head";
import {
  MdCategory,
  MdLocationOn,
} from "react-icons/md";

const MyApplications = () => {
  const { user, theme } = useContext(WebContext);
  const axiosPublic = useAxiosPublic();

  const {
    data: applications = [],
    isLoading,
  } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get("/applications/user", {
        params: { email: user?.email },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <DataLoader />;

  return (
    <div className="w-full p-2 sm:p-4 md:p-8">
      <HeadProvider>
        <Title>My Club Applications || ClubSphere</Title>
      </HeadProvider>

      <div className="mb-8">
        <h2
          className={`md:text-3xl text-2xl font-black tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"
            }`}
        >
          My Club Applications
        </h2>
        <p className="opacity-60 font-medium">
          Track and manage your club requests
        </p>
      </div>

{applications.length === 0 ? (
  <div className="py-20 text-center opacity-40 italic">
    No applications found.
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    {applications.map((app) => {
      const expiry = new Date(app.appliedDate);
      expiry.setFullYear(expiry.getFullYear() + 1);

      return (
        <div
          key={app._id}
          className={`group border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col hover:-translate-y-2 hover:shadow-2xl ${
            theme === "dark"
              ? "bg-[#2a1d1d] border-[#3a2a2a]"
              : "bg-white border-[#ecd9c6]"
          }`}
        >
          {/* Image */}
          <div className="relative h-60 overflow-hidden">
            <img
              src={app.clubImage}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              alt={app.clubName}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            <div className="absolute top-4 right-4">
              <span
                className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                  app.status === "completed"
                    ? "bg-[#1b9023] text-white"
                    : app.status === "processing"
                    ? "bg-amber-500 text-white"
                    : "bg-[#de0202] text-white"
                }`}
              >
                {app.status || "pending"}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1 gap-3">

            <div className="flex justify-between">

              <div className="flex items-center gap-2 text-sm font-semibold text-[#cd974c]">
                <MdCategory />
                <span>{app.category || "Category"}</span>
              </div>

              <div className="text-sm text-[#666666]">
                Expiry Date: {expiry.toLocaleDateString()}
              </div>

            </div>

            <h2
              className={`text-xl font-bold ${
                theme === "dark"
                  ? "text-[#cd974c]"
                  : "text-[#682626]"
              }`}
            >
              {app.clubName}
            </h2>

            <div
              className={`flex items-center gap-2 text-sm ${
                theme === "dark"
                  ? "text-gray-400"
                  : "text-[#7a6a58]"
              }`}
            >
              <MdLocationOn className="text-[#cd974c]" />
              <span>{app.location || "No location available"}</span>
            </div>

            <div className="flex text-sm items-center justify-between gap-4 mt-5">

              <Link
                to={`/club-details/${app.clubId}`}
                className="py-2 px-6 font-bold rounded-xl bg-[#cd974c]/10 text-[#cd974c] hover:bg-[#682626] hover:text-white transition-all"
              >
                Club Details
              </Link>

              <div className="flex items-center gap-3 bg-[#cd974c]/10 rounded-full px-4 py-2">

                <span className="text-[#cd974c] font-bold">
                  Fees: ${app.membershipFee || 0}
                </span>

                <span
                  className={`text-xs font-bold ${
                    app.payment === "Paid"
                      ? "text-emerald-500"
                      : "text-red-500"
                  }`}
                >
                  {app.payment || "Unpaid"}
                </span>

              </div>

            </div>

          </div>
        </div>
      );
    })}

  </div>
)}
    </div>
  );
};

export default MyApplications;
