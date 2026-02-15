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
import DataLoader from "../../../../Components/DataLoader";
import { useContext } from "react";
import WebContext from "../../../../Context/WebContext";
import { Link } from "react-router";
import { HeadProvider, Title } from "react-head";
import {
  MdEdit,
  MdDelete,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";

const columnHelper = createColumnHelper();

const ManageClubs = () => {
  const axiosSecure = useAxiosSecure();
  const { user, theme } = useContext(WebContext);

  const {
    data: clubs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allclubs"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${user?.email}`);
      return res.data;
    },
    retry: 3,
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

  const columns = [
    columnHelper.accessor((_, i) => i + 1, {
      id: "index",
      header: "#",
      cell: (info) => (
        <span className="font-bold opacity-60">{info.getValue()}</span>
      ),
    }),

    columnHelper.accessor("clubImage", {
      header: "Clubs",
      cell: (info) => (
        <div className="flex items-center gap-3">
          <img
            src={info.getValue()}
            className="h-10 w-10 rounded-xl object-cover ring-2 ring-sky-500/20"
          />
        </div>
      ),
    }),

    columnHelper.accessor("clubName", {
      header: "Club Name",
      cell: (info) => (
        <span
          className="lg:max-w-40 truncate block font-medium"
          title={info.getValue()}
        >
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
        <span className="text-xs font-bold opacity-70 italic">
          {info.getValue()}
        </span>
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

      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2
            className={`md:text-3xl text-2xl font-bold tracking-tight ${
              theme === "dark" ? "text-white" : "text-[#682626]"
            }`}
          >
            Manage clubs
          </h2>
          <p className="opacity-60 font-medium">
            Review, update or remove clubs you've posted.
          </p>
        </div>
        <Link
          to="/dashboard/add"
          className="px-6 py-3 bg-[#cd974c] text-white font-black rounded-2xl hover:bg-[#682626] transition-all shadow-lg shadow-[#e8dccb] text-sm"
        >
          + Add New
        </Link>
      </div>

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
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th key={header.id} className="p-5">
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
                  className={`transition-colors ${
                    theme === "dark"
                      ? "hover:bg-slate-800/30"
                      : "hover:bg-gray-50/50"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-5 text-sm">
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

        {/* Custom Pagination Footer */}
        <div
          className={`p-4 flex items-center justify-between border-t ${
            theme === "dark" ? "border-slate-800" : "border-gray-100"
          }`}
        >
          <span className="text-xs font-bold opacity-50 ml-2">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 rounded-xl border border-slate-500/20 disabled:opacity-20 hover:bg-sky-500/10 transition-all"
            >
              <MdNavigateBefore size={24} />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 rounded-xl border border-slate-500/20 disabled:opacity-20 hover:bg-sky-500/10 transition-all"
            >
              <MdNavigateNext size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageClubs;
