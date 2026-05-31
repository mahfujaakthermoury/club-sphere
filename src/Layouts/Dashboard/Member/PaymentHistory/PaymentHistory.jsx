import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import DataLoader from "../../../../Components/DataLoader";
import { useContext } from "react";
import WebContext from "../../../../Context/WebContext";
import { HeadProvider, Title } from "react-head";

const columnHelper = createColumnHelper();

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(WebContext);

  const {
    data: payments = [],
    isLoading,
  } = useQuery({
    queryKey: ["payment-history"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
    retry: 1,
  });

  const columns = [
    columnHelper.accessor((_, i) => i + 1, {
      id: "index",
      header: "#",
      cell: (info) => (
        <span className="font-bold opacity-60">{info.getValue()}</span>
      ),
    }),

    columnHelper.accessor("clubName", {
      header: "Club",
      cell: (info) => (
        <span className="font-medium">
          {info.getValue() || "Unknown Club"}
        </span>
      ),
    }),

    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => (
        <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 font-bold text-xs">
          ${info.getValue()}
        </span>
      ),
    }),

    // TYPE (derived safely)
    columnHelper.display({
      id: "type",
      header: "Type",
      cell: (info) => {
        const item = info.row.original;

        // If you later add "type" in DB, it will use it
        const type = item.type || "membership";

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${type === "membership"
                ? "bg-blue-500/10 text-blue-500"
                : "bg-purple-500/10 text-purple-500"
              }`}
          >
            {type}
          </span>
        );
      },
    }),

    columnHelper.accessor("paidAt", {
      header: "Date",
      cell: (info) => (
        <span className="text-xs opacity-70">
          {new Date(info.getValue()).toLocaleString()}
        </span>
      ),
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${status === "completed"
                ? "bg-green-500/10 text-green-500"
                : status === "pending"
                  ? "bg-yellow-500/10 text-yellow-500"
                  : "bg-red-500/10 text-red-500"
              }`}
          >
            {status}
          </span>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: payments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <DataLoader />;

  return (
    <div className="w-full p-4 md:p-8">
      <HeadProvider>
        <Title>Payment History || ClubSphere</Title>
      </HeadProvider>

      <div className="mb-8">
        <h2
          className={`md:text-3xl text-2xl font-black tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"
            }`}
        >
          Payment History
        </h2>
        <p className="opacity-60 font-medium italic text-sm uppercase tracking-widest">
          Track all membership and event payment records in one place.
        </p>
      </div>

      <div
        className={`rounded-3xl border overflow-hidden ${theme === "dark"
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-gray-100 shadow-xl"
          }`}
      >

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead
              className={`text-xs uppercase tracking-widest font-bold ${theme === "dark"
                  ? "bg-slate-800 text-slate-400"
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
                  className={`hover:${theme === "dark"
                      ? "bg-slate-800/30"
                      : "bg-gray-50/40"
                    } transition`}
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

        {/* Footer */}
        <div className="p-4 text-xs opacity-60 text-right">
          Total Payments: {payments.length}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;