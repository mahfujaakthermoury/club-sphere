import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import WebContext from "../../../Context/WebContext";
import { Link } from "react-router";
import DataLoader from "../../../Components/DataLoader";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HeadProvider, Title } from "react-head";

const AllClubs = () => {
  const axiosPublic = useAxiosPublic();
  const { theme } = useContext(WebContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9;

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["clubs", search, category, sortBy, order, page],
    queryFn: async () => {
      const res = await axiosPublic.get("/clubs", {
        params: { search, category, sortBy, order, page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const clubs = data?.data || [];
  const totalPages = data?.totalPages || 1;

  if (isError)
    return (
      <div className="text-center text-[#682626] py-20 font-bold">
        ⚠️ Failed to load clubs.
      </div>
    );

  return (
    <section
      className={`w-full py-20 transition-all duration-300 ${theme === "dark" ? "bg-[#1f1515]" : "bg-[#f9f7f4]"
        }`}
    >
      <HeadProvider>
        <Title>All Clubs || ClubSphere</Title>
      </HeadProvider>

      <div className="max-w-7xl mx-auto px-4">

        {/* Title */}
        <h1
          className={`md:text-3xl text-2xl font-bold text-center ${theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"
            }`}
        >
          Explore All Clubs
        </h1>
        <div className="w-24 h-1 bg-[#cd974c] mx-auto mt-3 rounded-full"></div>
        <p
          className={`max-w-2xl text-center mx-auto mt-4 sm:text-base text-sm ${theme === "dark" ? "text-gray-400" : "text-[#7a6a58]"
            }`}
        >          Discover vibrant clubs from different categories and become part of something meaningful.</p>


        {/* Filter Section */}
        <div
          data-aos="fade-up"
          data-aos-duration="800"
          className={`mt-12 p-6 rounded-2xl border flex flex-col md:flex-row gap-4 ${theme === "dark"
            ? "bg-[#2a1d1d] border-[#3a2a2a]"
            : "bg-white border-[#ecd9c6]"
            }`}
        >
          <input
            type="text"
            placeholder="Search clubs..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className={`w-full px-5 py-3 rounded-xl border transition-all duration-300 outline-none
              ${theme === "dark"
                ? "bg-[#1f1515] text-gray-300 border-[#3a2a2a] focus:border-[#cd974c] focus:ring-2 focus:ring-[#cd974c]/40"
                : "bg-white text-[#682626] border-[#ecd9c6] focus:border-[#682626] focus:ring-2 focus:ring-[#682626]/30"
              }`}
          />


          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full px-5 py-3 rounded-xl border transition-all duration-300 outline-none
              ${theme === "dark"
                ? "bg-[#1f1515] text-gray-300 border-[#3a2a2a] focus:border-[#cd974c] focus:ring-2 focus:ring-[#cd974c]/40"
                : "bg-white text-[#682626] border-[#ecd9c6] focus:border-[#682626] focus:ring-2 focus:ring-[#682626]/30"
              }`}          >
            <option value="">All Categories</option>
            <option value="Sports">Sports</option>
            <option value="Tech">Tech</option>
            <option value="Cultural">Cultural</option>
          </select>

          <select
            value={`${sortBy}-${order}`}
            onChange={(e) => {
              const [sb, ord] = e.target.value.split("-");
              setSortBy(sb);
              setOrder(ord);
            }}
            className={`w-full px-5 py-3 rounded-xl border transition-all duration-300 outline-none
              ${theme === "dark"
                ? "bg-[#1f1515] text-gray-300 border-[#3a2a2a] focus:border-[#cd974c] focus:ring-2 focus:ring-[#cd974c]/40"
                : "bg-white text-[#682626] border-[#ecd9c6] focus:border-[#682626] focus:ring-2 focus:ring-[#682626]/30"
              }`}          >
            <option value="-">Short By Size</option>
            <option value="membershipFee-asc">Fees (Low → High)</option>
            <option value="membershipFee-desc">Fees (High → Low)</option>
            <option value="createdAt-desc">Newest</option>
          </select>
        </div>

        {/* Content */}
        {isLoading ? (
          <DataLoader />
        ) : clubs.length === 0 ? (
          <p className="text-center text-gray-500 py-20">
            No clubs found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
            {clubs.map((item) => (
              <div
                key={item._id}
                data-aos="zoom-in-up"

                className={`group border rounded-2xl overflow-hidden transition-all duration-300 flex flex-col hover:-translate-y-2 hover:shadow-2xl ${theme === "dark"
                  ? "bg-[#2a1d1d] border-[#3a2a2a]"
                  : "bg-white border-[#ecd9c6]"
                  }`}
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={item.clubImage}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt="club"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <h2
                    className={`text-lg font-bold ${theme === "dark"
                      ? "text-[#cd974c]"
                      : "text-[#682626]"
                      }`}
                  >
                    {item.clubName}
                  </h2>

                  <p
                    className={`text-sm line-clamp-2 ${theme === "dark"
                      ? "text-gray-400"
                      : "text-[#7a6a58]"
                      }`}
                  >
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm mt-2">
                    <HiOutlineLocationMarker className="text-[#682626]" />
                    <span>{item.location}</span>
                  </div>

                  <div className="mt-4 font-bold">
                    Fees: ${item.membershipFee || 0}
                  </div>

                  <Link
                    to={`/club-details/${item._id}`}
                    className="mt-auto inline-block text-center border-2 border-[#682626] text-[#cd974c] px-8 py-2.5 rounded-full font-bold hover:bg-[#682626] hover:text-white transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

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
    </section>
  );
};

export default AllClubs;
