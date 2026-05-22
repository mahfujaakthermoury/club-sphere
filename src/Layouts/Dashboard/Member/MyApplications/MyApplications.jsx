import { useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import WebContext from "../../../../Context/WebContext";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import DataLoader from "../../../../Components/DataLoader";
import Swal from "sweetalert2";
import { HeadProvider, Title } from "react-head";
import {
  MdVisibility,
  MdEdit,
  MdDelete,
  MdPayment,
  MdClose,
  MdCategory ,
  MdLocationOn,
  MdStar,
} from "react-icons/md";

const MyApplications = () => {
  const { user, theme } = useContext(WebContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState(null);

  const {
    data: applications = [],
    isLoading,
    isError,
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

  const handleEdit = (app) => {
    if (app.status !== "pending") {
      toast.info("Only pending applications can be edited.");
      return;
    }
    navigate(`/dashboard/edit-application/${app._id}`, { state: { app } });
  };

  const handlePay = (app) => {
    if (app.status !== "pending" || app.payment === "Paid") {
      toast.info("Payment not required or already completed.");
      return;
    }
    navigate("/payment", {
      state: {
        _id: app.clubId,
        category: app.category,
        clubName: app.clubName,
        membershipFee: app.membershipFee,
        clubImage: app.clubImage,
        location: app.location,
      },
    });
  };

  const handleDelete = async (app) => {
    if (app.status !== "pending") {
      toast.info("Only pending applications can be deleted.");
      return;
    }

    const result = await Swal.fire({
      title: "Delete Application?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      background: theme === "dark" ? "#0f172a" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/applications/${app._id}`);
        toast.success("Application deleted");
        queryClient.invalidateQueries(["applications", user?.email]);
      } catch (err) {
        toast.error("Failed to delete");
      }
    }
  };

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
          {applications.map((app) => (
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
      src={
        app.clubImage ||
        "https://via.placeholder.com/400x250"
      }
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      alt={app.clubName}
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

    <div className="absolute top-4 right-4">
      <span
        className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
          app.status === "completed"
            ? "bg-emerald-500 text-white"
            : app.status === "processing"
            ? "bg-amber-500 text-white"
            : "bg-[#cd974c] text-white"
        }`}
      >
        {app.status || "pending"}
      </span>
    </div>
  </div>

  {/* Content */}
  <div className="p-6 flex flex-col flex-1 gap-3">
    <div className="flex justify-between">
          {/* Category */}
    <div className="flex items-center gap-2 text-sm font-semibold text-[#cd974c]">
      <MdCategory />
      <span>{app.category || "Category"}</span>
    </div>

    {/* Fee + Payment */}
    <div className="flex items-center justify-between mt-3 bg-[#cd974c]/10 rounded-full px-4 py-2">
  <span className="text-[#cd974c] text-xs font-bold">
    Fees: ${app.membershipFee || 0}
  </span>

  <span
    className={`pl-3 text-xs font-bold ${
      app.payment === "Paid"
        ? "text-emerald-500"
        : "text-red-500"
    }`}
  >
    {app.payment || "Unpaid"}
  </span>
</div>
    </div>

    {/* Club Name */}
    <h2
      className={`text-xl font-bold ${
        theme === "dark"
          ? "text-[#cd974c]"
          : "text-[#682626]"
      }`}
    >
      {app.clubName}
    </h2>

    {/* Location */}
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

    

    {/* Actions */}
    <div className="flex gap-2 mt-5">
      <button
        onClick={() => setSelected(app)}
        className="flex-1 py-3 rounded-xl bg-slate-500/10 hover:bg-slate-500 hover:text-white transition-all flex justify-center"
      >
        <MdVisibility size={20} />
      </button>

      <button
        onClick={() => handleEdit(app)}
        className="flex-1 py-3 rounded-xl bg-[#cd974c]/10 text-[#cd974c] hover:bg-[#682626] hover:text-white transition-all flex justify-center"
      >
        <MdEdit size={20} />
      </button>

      <button
        onClick={() => handlePay(app)}
        disabled={app.payment === "Paid"}
        className="flex-1 py-3 rounded-xl bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white disabled:opacity-30 transition-all flex justify-center"
      >
        <MdPayment size={20} />
      </button>

      <button
        onClick={() => handleDelete(app)}
        className="flex-1 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex justify-center"
      >
        <MdDelete size={20} />
      </button>
    </div>
  </div>
</div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            className={`w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden ${theme === "dark"
                ? "bg-slate-900 border border-slate-800"
                : "bg-white"
              }`}
          >
            <div className="p-10 relative">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-8 right-8 p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
              >
                <MdClose size={28} />
              </button>

              <h3 className="text-3xl font-black mb-1 leading-tight">
                {selected.clubName}
              </h3>
              <p className="opacity-60 font-bold uppercase text-xs mb-8">
                {selected.location}
              </p>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <span className="text-[10px] font-black uppercase opacity-40 block mb-1">
                    Status
                  </span>
                  <p className="font-bold text-sm uppercase tracking-widest text-[#cd974c]">
                    {selected.status || "Pending"}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase opacity-40 block mb-1">
                    Applied Date
                  </span>
                  <p className="font-bold text-sm">
                    {new Date(selected.appliedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-500/5 border border-slate-500/10">
                <span className="text-[10px] font-black uppercase opacity-40 block mb-2">
                  Manager Feedback
                </span>
                <p className="text-sm italic opacity-80 leading-relaxed">
                  {selected.feedback || "No feedback from manager yet."}
                </p>
              </div>

              <div className="mt-10 flex gap-4">
                <button
                  onClick={() => {
                    handleEdit(selected);
                    setSelected(null);
                  }}
                  className="flex-1 py-4 bg-[#cd974c] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-[#cd974c]/20"
                >
                  Edit Application
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="flex-1 py-4 bg-slate-500/10 rounded-2xl font-black uppercase text-[10px] tracking-widest"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
