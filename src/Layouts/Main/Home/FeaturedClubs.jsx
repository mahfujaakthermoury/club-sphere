import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import DataLoader from "../../../Components/DataLoader";
import { Link } from "react-router";
import { useContext } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import WebContext from "../../../Context/WebContext";

const FeaturedClubs = () => {
  const axiosPublic = useAxiosPublic();
  const { theme } = useContext(WebContext);

  const {
    data: clubs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featured-clubs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/home/clubs");
      return res.data;
    },
    retry: 1,
  });

  if (isError)
    return (
      <div className="text-center text-[#682626] py-10 font-bold">
        ⚠️ Failed to load clubs. Please try again.
      </div>
    );

  return (
    <section
      className={`w-full py-20 transition-all duration-300 ${theme === "dark" ? "bg-[#1f1515]" : "bg-[#f9f7f4]"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h1
          className={`md:text-3xl text-2xl font-bold text-center ${theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"
            }`}
        >
          Featured Clubs
        </h1>

        <div className="w-24 h-1 bg-[#cd974c] mx-auto mt-3 rounded-full"></div>

        <p
          className={`max-w-2xl text-center mx-auto mt-4 sm:text-base text-sm ${theme === "dark" ? "text-gray-400" : "text-[#7a6a58]"
            }`}
        >
          Discover top-rated opportunities from global universities. Our curated
          list helps you find the perfect financial match for your academic
          journey.
        </p>

        {isLoading ? (
          <DataLoader />
        ) : (
          <>
            {clubs.length === 0 ? (
              <p className="text-center text-gray-500 py-10">
                No featured clubs available.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
                {clubs.map((item) => (
                  <div
                    key={item._id}
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
                        alt="university"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>


                    </div>

                    {/* Content */}
                    <div className="relative p-6 flex flex-col flex-1 gap-3">
                      <h2
                        className={`text-lg font-bold line-clamp-1 ${theme === "dark"
                            ? "text-[#cd974c]"
                            : "text-[#682626]"
                          }`}
                      >
                        {item.clubName}
                      </h2>
                      <div className="absolute top-6 right-4 bg-[#cd974c] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {item.category}
                      </div>
                      <div
                        className={`space-y-3 flex-1 ${theme === "dark" ? "text-gray-400" : "text-[#7a6a58]"
                          }`}
                      >
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <p className="text-justify">{item.description}</p>
                        </div>
                        <div className="py-3">
                          <div className="flex items-center gap-2 text-sm ">
                            <HiOutlineLocationMarker className="text-[#682626] text-lg" />
                            <span>{item.location}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm font-bold mt-4">
                            <span
                              className={`${theme === "dark" ? "text-white" : "text-[#ee0808]"
                                }`}
                            >
                              Fees: ${item.membershipFee || "0"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Link
                        to={`/club-details/${item._id}`}
                        className=" inline-block text-center border-2 border-[#682626] text-[#cd974c] px-8 py-2.5 rounded-full font-bold hover:bg-[#682626] hover:text-white transition-all duration-300"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedClubs;
