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
  MdEvent,
  MdLocationOn,
  MdPayments,
} from "react-icons/md";

const columnHelper = createColumnHelper();

const EventsManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { user, theme } =
    useContext(WebContext);

  // Fetch Events Created By Club Manager
  const {
    data: events = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manager-events"],
    queryFn: async () => {
      console.log("Logged User Email:", user?.email);
      const res = await axiosSecure.get(
        `/events/manager/${user?.email}`
      );
       console.log("Events Response:", res.data);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Delete Event
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Event?",
      text: "This event will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Delete",
      background:
        theme === "dark"
          ? "#0f172a"
          : "#fff",
      color:
        theme === "dark"
          ? "#fff"
          : "#000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res =
          await axiosSecure.delete(
            `/events/${id}`
          );

        if (res.data.deletedCount > 0) {
          Swal.fire(
            "Deleted!",
            "Event removed successfully.",
            "success"
          );

          refetch();
        }
      }
    });
  };

  // Table Columns
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

    columnHelper.accessor("eventImage", {
      header: "Image",
      cell: (info) => (
        <img
          src={info.getValue()}
          alt="event"
          className="h-12 w-12 rounded-2xl object-cover ring-2 ring-sky-500/20"
        />
      ),
    }),

    columnHelper.accessor("eventName", {
      header: "Event Name",
      cell: (info) => (
        <div className="flex flex-col max-w-[220px]">
          <span className="font-bold truncate">
            {info.getValue()}
          </span>

          <span className="text-[10px] uppercase tracking-widest opacity-50 font-black">
            {info.row.original.clubName}
          </span>
        </div>
      ),
    }),

    columnHelper.accessor("location", {
      header: "Location",
      cell: (info) => (
        <div className="flex items-center gap-1 text-sm opacity-70">
          <MdLocationOn
            className="text-[#cd974c]"
          />

          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("eventFee", {
      header: "Fee",
      cell: (info) => (
        <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-500 text-xs font-black w-fit">
          <MdPayments />

          ${info.getValue() || "0"}
        </div>
      ),
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span
          className={`px-3 py-1 rounded-xl text-[10px] uppercase font-black tracking-widest ${
            info.getValue() ===
            "approved"
              ? "bg-green-500/10 text-green-500"
              : info.getValue() ===
                "pending"
              ? "bg-amber-500/10 text-amber-500"
              : "bg-red-500/10 text-red-500"
          }`}
        >
          {info.getValue()}
        </span>
      ),
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",

      cell: (info) => (
        <div className="flex items-center gap-2">
          {/* Update */}
          <Link
            to={`/dashboard/update-event/${info.row.original._id}`}
            className="p-2 bg-[#682626]/10 text-[#cd974c] hover:bg-[#682626] hover:text-white rounded-xl transition-all"
            title="Edit"
          >
            <MdEdit size={18} />
          </Link>

          {/* Delete */}
          <button
            onClick={() =>
              handleDelete(
                info.row.original._id
              )
            }
            className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
          >
            <MdDelete size={18} />
          </button>
        </div>
      ),
    }),
  ];

  // Table Instance
  const table = useReactTable({
    data: events,
    columns,

    getCoreRowModel:
      getCoreRowModel(),

    getSortedRowModel:
      getSortedRowModel(),

    getPaginationRowModel:
      getPaginationRowModel(),
  });

  if (isLoading) return <DataLoader />;

  return (
    <div className="w-full p-2 sm:p-4 md:p-8">
      <HeadProvider>
        <Title>
          Manage Events || ClubSphere
        </Title>
      </HeadProvider>

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2
            className={`md:text-3xl text-2xl font-black tracking-tight ${
              theme === "dark"
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            Manage Events
          </h2>

          <p className="opacity-60 font-medium mt-1">
            Update, manage, and monitor
            all your created events from
            one place.
          </p>
        </div>
      </div>

      {/* Table */}
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
              {table
                .getHeaderGroups()
                .map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map(
                      (header) => (
                        <th
                          key={header.id}
                          className="p-5"
                        >
                          {flexRender(
                            header.column
                              .columnDef
                              .header,
                            header.getContext()
                          )}
                        </th>
                      )
                    )}
                  </tr>
                ))}
            </thead>

            <tbody className="divide-y divide-slate-500/10">
              {table
                .getRowModel()
                .rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`transition-colors ${
                      theme === "dark"
                        ? "hover:bg-slate-800/30"
                        : "hover:bg-gray-50/50"
                    }`}
                  >
                    {row
                      .getVisibleCells()
                      .map((cell) => (
                        <td
                          key={cell.id}
                          className="p-5 text-sm"
                        >
                          {flexRender(
                            cell.column
                              .columnDef
                              .cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-6 border-t border-slate-500/10">
          <span className="text-xs font-black uppercase tracking-widest opacity-40">
            Page{" "}
            {table.getState().pagination
              .pageIndex + 1}{" "}
            of{" "}
            {table.getPageCount()}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                table.previousPage()
              }
              disabled={
                !table.getCanPreviousPage()
              }
              className="h-10 w-10 rounded-xl bg-slate-500/10 hover:bg-[#682626] hover:text-white disabled:opacity-20 transition-all flex items-center justify-center"
            >
              <MdNavigateBefore
                size={20}
              />
            </button>

            <button
              onClick={() =>
                table.nextPage()
              }
              disabled={
                !table.getCanNextPage()
              }
              className="h-10 w-10 rounded-xl bg-slate-500/10 hover:bg-[#682626] hover:text-white disabled:opacity-20 transition-all flex items-center justify-center"
            >
              <MdNavigateNext size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsManagement;