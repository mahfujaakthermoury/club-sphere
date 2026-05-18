import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import WebContext from "../../../../Context/WebContext";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import DataLoader from "../../../../Components/DataLoader";
import { HeadProvider, Title } from "react-head";
import {
  MdDelete,
  MdVisibility,
  MdEvent,
  MdClose,
  MdPeople,
  MdPayments,
} from "react-icons/md";

const columnHelper = createColumnHelper();

const EventRegistrations = () => {
  const AxiosPublic = useAxiosPublic();
  const { user, theme } = useContext(WebContext);
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState(null);

  // Get Logged User Info
  const { data: userData } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  // Get Event Registrations For Club Manager
  const {
    data: registrations = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["eventRegistrations", userData?.managerFor],
    enabled: !!userData?.managerFor,
    queryFn: async () => {
      const res = await AxiosPublic.get(
        `/eventRegistrations?clubId=${userData?.managerFor}`
      );
      return res.data;
    },
  });

  // Cancel Registration
  const handleDelete = (id) => {
    Swal.fire({
      title: "Cancel Registration?",
      text: "This registration will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Cancel",
      background: theme === "dark" ? "#0f172a" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await AxiosPublic.delete(
            `/eventRegistrations/${id}`
          );

          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Registration Cancelled",
              timer: 1200,
              showConfirmButton: false,
            });

            queryClient.invalidateQueries([
              "eventRegistrations",
              userData?.managerFor,
            ]);
          }
        } catch (err) {
          console.log(err);

          Swal.fire({
            icon: "error",
            title: "Failed to cancel registration",
          });
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
        <span className="font-bold opacity-50">
          {info.getValue()}
        </span>
      ),
    }),

    columnHelper.accessor("eventTitle", {
      header: "Event",
      cell: (info) => (
        <div className="flex flex-col">
          <span className="font-bold text-sm">
            {info.getValue()}
          </span>

          <span className="text-[10px] uppercase tracking-wider opacity-60 font-black">
            {info.row.original.location}
          </span>
        </div>
      ),
    }),

    columnHelper.accessor("userEmail", {
      header: "Participant",
      cell: (info) => (
        <p className="text-sm font-medium opacity-80">
          {info.getValue()}
        </p>
      ),
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <div
          className={`px-3 py-1 rounded-xl text-xs font-black uppercase w-fit ${
            info.getValue() === "registered"
              ? "bg-green-500/10 text-green-500"
              : "bg-red-500/10 text-red-500"
          }`}
        >
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("paymentId", {
      header: "Payment",
      cell: (info) =>
        info.getValue() ? (
          <div className="flex items-center gap-1 text-emerald-500 text-xs font-black">
            <MdPayments />
            Paid
          </div>
        ) : (
          <span className="text-xs opacity-40">
            Free Event
          </span>
        ),
    }),

    columnHelper.accessor("registeredAt", {
      header: "Registered",
      cell: (info) => (
        <span className="text-xs opacity-70">
          {new Date(info.getValue()).toLocaleDateString()}
        </span>
      ),
    }),

    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex gap-2">
          <button
            onClick={() => setSelected(info.row.original)}
            className="p-2 bg-[#682626]/10 text-[#cd974c] rounded-xl hover:bg-[#682626] hover:text-white transition-all"
          >
            <MdVisibility size={18} />
          </button>

          <button
            onClick={() =>
              handleDelete(info.row.original._id)
            }
            className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
          >
            <MdDelete size={18} />
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: registrations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel:
      getPaginationRowModel(),
  });

  if (isLoading) return <DataLoader />;

  if (isError)
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Failed to load event registrations.
      </div>
    );

  return (
    <div className="w-full p-2 sm:p-4 md:p-8">
      <HeadProvider>
        <Title>
          Event Registrations || ClubSphere
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
            Event Registrations
          </h2>

          <p className="opacity-60 font-medium">
            Manage and track all event
            registrations, participant details,
            and attendance activity in one place.
          </p>
        </div>

        <div className="h-12 w-12 rounded-2xl bg-[#682626]/10 text-[#cd974c] flex items-center justify-center text-2xl shadow-lg">
          <MdPeople />
        </div>
      </div>

      {/* Table */}
      <div
        className={`overflow-hidden rounded-4xl border ${
          theme === "dark"
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead
              className={`text-[10px] uppercase tracking-[0.2em] font-black border-b ${
                theme === "dark"
                  ? "bg-slate-800/50 border-slate-800 text-slate-500"
                  : "bg-gray-50 border-gray-100 text-slate-400"
              }`}
            >
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th key={header.id} className="p-6">
                      {flexRender(
                        header.column.columnDef
                          .header,
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
                  className="hover:bg-[#682626]/5 transition-colors"
                >
                  {row
                    .getVisibleCells()
                    .map((cell) => (
                      <td
                        key={cell.id}
                        className="p-6"
                      >
                        {flexRender(
                          cell.column.columnDef
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
        <div className="p-6 flex items-center justify-between border-t border-slate-500/10">
          <span className="text-xs font-bold opacity-50 uppercase tracking-widest">
            Page{" "}
            {table.getState().pagination
              .pageIndex + 1}{" "}
            of {table.getPageCount()}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 rounded-xl bg-slate-500/10 text-xs font-black uppercase disabled:opacity-20 hover:bg-[#682626] hover:text-white transition-all"
            >
              Prev
            </button>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 rounded-xl bg-[#682626] text-white text-xs font-black uppercase disabled:opacity-20 hover:bg-[#682626] transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div
            className={`w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden ${
              theme === "dark"
                ? "bg-slate-900 border border-slate-800"
                : "bg-white"
            }`}
          >
            <div className="p-8 relative">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-red-500/10 text-red-500"
              >
                <MdClose size={24} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-[#682626]/10 text-[#cd974c] flex items-center justify-center text-3xl">
                  <MdEvent />
                </div>

                <div>
                  <h3 className="font-black text-xl">
                    {selected.eventTitle}
                  </h3>

                  <p className="text-sm opacity-60">
                    {selected.userEmail}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#cd974c]">
                    Event Status
                  </span>

                  <p className="font-bold text-lg mt-1">
                    {selected.status}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#cd974c]">
                    Registration Date
                  </span>

                  <p className="font-bold mt-1">
                    {new Date(
                      selected.registeredAt
                    ).toDateString()}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#cd974c]">
                    Payment ID
                  </span>

                  <p className="font-bold mt-1">
                    {selected.paymentId ||
                      "No Payment Required"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventRegistrations;