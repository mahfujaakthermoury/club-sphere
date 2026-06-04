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

const Transactions = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(WebContext);

  const {
    data: payments = [],
    isLoading,

  } = useQuery({
    queryKey: ["payments"],
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

    columnHelper.accessor("email", {
      header: "User Email",
      cell: (info) => (
        <span className="text-sm">{info.getValue()}</span>
      ),
    }),

    columnHelper.accessor("clubName", {
      header: "Club Name",
      cell: (info) => (
        <span className="font-medium">
          {info.getValue()}
        </span>
      ),
    }),

    columnHelper.accessor("type", {
      header: "Type",
      cell: (info) => {
        const type = info.getValue();

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${type === "membership"
                ? "bg-amber-500/10 text-amber-800"
                : "bg-amber-500/10 text-amber-600"
              }`}
          >
            {type}
          </span>
        );
      },
    }),

    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => (
        <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 font-bold text-xs">
          ${info.getValue()}
        </span>
      ),
    }),

    columnHelper.accessor("paidAt", {
      header: "Date",
      cell: (info) => {
        const date = new Date(info.getValue()).toLocaleString();

        return (
          <span className="text-xs opacity-70">
            {date}
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
        <Title>Transactions || Admin Dashboard</Title>
      </HeadProvider>

      <div
        className={`rounded-3xl border overflow-hidden ${theme === "dark"
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-gray-100 shadow-xl"
          }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200/10">
          <h2
            className={`text-2xl font-bold ${theme === "dark"
                ? "text-[#cd974c]"
                : "text-[#682626]"
              }`}
          >
            Payment Transactions
          </h2>
        </div>

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
                  className={`transition hover:${theme === "dark"
                      ? "bg-slate-800/30"
                      : "bg-gray-50/40"
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

        {/* Footer pagination space */}
        <div className="p-4 flex justify-end text-xs opacity-60">
          Total records: {payments.length}
        </div>
      </div>
    </div>
  );
};

export default Transactions;