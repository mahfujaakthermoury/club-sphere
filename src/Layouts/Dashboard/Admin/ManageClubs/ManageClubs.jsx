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
import { useContext } from "react";
import WebContext from "../../../../Context/WebContext";
import { Link } from "react-router";
import { HeadProvider, Title } from "react-head";
import { MdEdit, MdDelete, MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const columnHelper = createColumnHelper();

const ManageClubs = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user, theme } = useContext(WebContext);

  // Fetch user clubs
  const {
    data: clubs = [],
    isLoading: isClubsLoading,
    refetch,
  } = useQuery({
    queryKey: ["allclubs"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${user?.email}`);
      return res.data;
    },
    retry: 3,
  });

  // Fetch featured clubs
  const {
    data: featuredClubs = [],
    isLoading: isFeaturedLoading,
    isError: isFeaturedError,
  } = useQuery({
    queryKey: ["featured-clubs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/home/clubs");
      return res.data;
    },
    retry: 1,
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This club will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
      background: theme === "dark" ? "#0f172a" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/clubs/delete/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Club removed.", "success");
          refetch();
        }
      }
    });
  };

  // Columns definition for table
  const columns = [
    columnHelper.accessor((_, i) => i + 1, {
      id: "index",
      header: "#",
      cell: (info) => <span className="font-bold opacity-60">{info.getValue()}</span>,
    }),
    columnHelper.accessor("clubImage", {
      header: "Clubs Image",
      cell: (info) => (
        <img
          src={info.getValue()}
          className="h-10 w-10 rounded-xl object-cover ring-2 ring-sky-500/20"
          alt="club"
        />
      ),
    }),
    columnHelper.accessor("clubName", {
      header: "Club Name",
      cell: (info) => (
        <span className="lg:max-w-40 truncate block font-medium" title={info.getValue()}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("membershipFee", {
      header: "Fees",
      cell: (info) => (
        <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 font-bold text-xs">
          ${info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (info) => (
        <span className="text-xs font-bold opacity-70 italic">{info.getValue()}</span>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/dashboard/update-club/${info.row.original._id}`}
            className="p-2 bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white rounded-xl transition-all"
            title="Edit"
          >
            <MdEdit size={18} />
          </Link>
          <button
            onClick={() => handleDelete(info.row.original._id)}
            className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
            title="Delete"
          >
            <MdDelete size={18} />
          </button>
        </div>
      ),
    }),
  ];

  // Table instance for user clubs
  const table = useReactTable({
    data: clubs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Table instance for featured clubs
  const featuredTable = useReactTable({
    data: featuredClubs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isClubsLoading || isFeaturedLoading) return <DataLoader />;

  return (
    <div className="w-full p-2 sm:p-4 md:p-8 space-y-16">
      <HeadProvider>
        <Title>Manage Clubs || ClubSphere</Title>
      </HeadProvider>

      {/* Featured Clubs Table */}
      {!isFeaturedError && featuredClubs.length > 0 && (
        <div>
          <h2
            className={`md:text-3xl text-2xl font-bold tracking-tight mb-4 ${
              theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"
            }`}
          >
            Featured Clubs
          </h2>
          <div
            className={`overflow-hidden rounded-4xl border transition-all duration-300 ${
              theme === "dark"
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead
                  className={`text-xs uppercase tracking-widest font-black ${
                    theme === "dark"
                      ? "bg-slate-800/50 text-slate-400"
                      : "bg-gray-50 text-slate-500"
                  }`}
                >
                  {featuredTable.getHeaderGroups().map((hg) => (
                    <tr key={hg.id}>
                      {hg.headers.map((header) => (
                        <th key={header.id} className="p-5">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody className="divide-y divide-slate-500/10">
                  {featuredTable.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className={`transition-colors ${
                        theme === "dark" ? "hover:bg-slate-800/30" : "hover:bg-gray-50/50"
                      }`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-5 text-sm">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClubs;
