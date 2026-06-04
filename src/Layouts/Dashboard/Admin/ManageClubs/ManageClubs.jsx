import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import DataLoader from "../../../../Components/DataLoader";
import { useContext, useState } from "react";
import WebContext from "../../../../Context/WebContext";
import { HeadProvider, Title } from "react-head";

const columnHelper = createColumnHelper();

const ManageClubs = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(1);
  const limit = 9;
  const { theme } = useContext(WebContext);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["all-clubs", page],
    queryFn: async () => {
      const res = await axiosPublic.get("/clubs", {
        params: { page, limit },
      });
      return res.data;
    },
    retry: 1,
  });

  const clubs = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleStatusUpdate = async (id, status) => {
    try {
      const result = await Swal.fire({
        title: `Are you sure?`,
        text: `You want to ${status.toLowerCase()} this club.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `Yes, ${status}`,
        background: theme === "dark" ? "#0f172a" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
      });

      if (!result.isConfirmed) return;

      const res = await axiosSecure.patch(`/clubs/status/${id}`, {
        status,
      });

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: `Club ${status}`,
          timer: 1500,
          showConfirmButton: false,
        });

        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    columnHelper.accessor((_, i) => i + 1, {
      id: "index",
      header: "#",
      cell: (info) => (
        <span className="font-bold opacity-60">
          {info.getValue()}
        </span>
      ),
    }),

    columnHelper.accessor("clubName", {
      header: "Club Name",
      cell: (info) => (
        <span
          className="font-medium"
          title={info.getValue()}
        >
          {info.getValue()}
        </span>
      ),
    }),

    columnHelper.accessor("managerEmail", {
      header: "Manager Email",
      cell: (info) => (
        <span className="text-sm">
          {info.getValue()}
        </span>
      ),
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${status === "approved"
                ? "bg-green-500/10 text-green-500"
                : status === "rejected"
                  ? "bg-red-500/10 text-red-500"
                  : "bg-yellow-500/10 text-yellow-500"
              }`}
          >
            {status || "pending"}
          </span>
        );
      },
    }),

    columnHelper.accessor("membershipFee", {
      header: " Fees",
      cell: (info) => (
        <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 font-bold text-xs">
          ${info.getValue()}
        </span>
      ),
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => {
        const club = info.row.original;

        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                handleStatusUpdate(
                  club._id,
                  "approved"
                )
              }
              disabled={club.status === "approved"}
              className="px-3 py-2 rounded-xl bg-green-500/10 text-green-500 hover:bg-[#0b9a36] hover:text-white transition-all disabled:opacity-50"
            >
              Approve
            </button>

            <button
              onClick={() =>
                handleStatusUpdate(
                  club._id,
                  "rejected"
                )
              }
              disabled={club.status === "rejected"}
              className="px-3 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: clubs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <DataLoader />;

  return (
    <div className="w-full p-2 sm:p-4 md:p-8">
      <HeadProvider>
        <Title>Manage Clubs || ClubSphere</Title>
      </HeadProvider>

      {!isError && clubs.length > 0 && (
        <div>
          <h2
            className={`md:text-3xl text-2xl font-bold tracking-tight mb-6 ${theme === "dark"
                ? "text-[#cd974c]"
                : "text-[#682626]"
              }`}
          >
            Manage Clubs
          </h2>

          <div
            className={`overflow-hidden rounded-4xl border transition-all duration-300 ${theme === "dark"
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"
              }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead
                  className={`text-xs uppercase tracking-widest font-black ${theme === "dark"
                      ? "bg-slate-800/50 text-slate-400"
                      : "bg-gray-50 text-slate-500"
                    }`}
                >
                  {table.getHeaderGroups().map((hg) => (
                    <tr key={hg.id}>
                      {hg.headers.map((header) => (
                        <th
                          key={header.id}
                          className="p-5"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody className="divide-y divide-slate-500/10">
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className={`transition-colors ${theme === "dark"
                          ? "hover:bg-slate-800/30"
                          : "hover:bg-gray-50/50"
                        }`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="p-5 text-sm"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Pagination */}
      <div className="mt-16 flex justify-center items-center gap-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-6 py-2 rounded-full border border-[#682626] font-bold disabled:opacity-40"
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-6 py-2 rounded-full bg-[#682626] text-white font-bold disabled:opacity-40"
        >
          Next
        </button>
      </div>
        </div>
      )}
    </div>
  );
};

export default ManageClubs;