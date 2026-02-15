import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Rating } from "@mui/material";
import { HiOutlineLocationMarker } from "react-icons/hi";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import DataLoader from "../../../Components/DataLoader";
import { HeadProvider, Title } from "react-head";
import WebContext from "../../../Context/WebContext";

const ClubDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { theme } = useContext(WebContext);

  const { data: club = null, isLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/club/data/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews", {
        params: { clubId: id },
      });
      return res.data || [];
    },
    enabled: !!id,
  });

  if (isLoading) return <DataLoader />;

  const avgRating = reviews.length
    ? Math.round(
        (reviews.reduce((sum, r) => sum + (r.ratingPoint || 0), 0) /
          reviews.length) *
          10
      ) / 10
    : 0;

  return (
    <div
      className={`min-h-screen py-16 px-4 ${
        theme === "dark"
          ? "bg-[#1a1414] text-gray-300"
          : "bg-[#f9f4ef] text-[#4b3b2a]"
      }`}
    >
      <HeadProvider>
        <Title>Club Details || ClubSphere</Title>
      </HeadProvider>

      <div className="max-w-4xl mx-auto">
        <div
          className={`group border rounded-2xl overflow-hidden transition-all duration-300 ${
            theme === "dark"
              ? "bg-[#2a1d1d] border-[#3a2a2a]"
              : "bg-white border-[#ecd9c6]"
          }`}
        >
          {/* Image Section */}
          <div className="relative h-[350px] overflow-hidden">
            <img
              src={club?.clubImage}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              alt={club?.clubName}
            />
            <div className="absolute inset-0 bg-liner-to-t from-black/70 to-transparent"></div>

            {/* Category Badge */}
            <div className="absolute top-6 right-6 bg-[#cd974c] text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
              {club?.clubCategory}
            </div>
          </div>

          {/* Content */}
          <div className="relative p-8 flex flex-col gap-6">
            <h1
              className={`text-3xl font-bold ${
                theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"
              }`}
            >
              {club?.clubName}
            </h1>

            {/* Description */}
            <p
              className={`leading-relaxed ${
                theme === "dark" ? "text-gray-400" : "text-[#7a6a58]"
              }`}
            >
              {club?.description}
            </p>

            {/* Info Section */}
            <div className="grid md:grid-cols-2 gap-6 mt-4 ">
              <div className="flex items-center gap-3 text-md">
                <HiOutlineLocationMarker className="text-[#682626] text-lg" />
                <span>{club?.location}</span>
              </div>

              <div className="text-md font-bold">
                <span
                  className={`${
                    theme === "dark" ? "text-white" : "text-[#ee0808]"
                  }`}
                >
                  Fees: ${club?.membershipFee || 0}
                </span>
              </div>
            </div>

            {/* Rating + Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[#3a2a2a]/40">
              <div className="flex items-center gap-3">
                <Rating value={avgRating} precision={0.5} readOnly />
                <span className="text-sm opacity-70">
                  ({reviews.length} Reviews)
                </span>
              </div>

              <button
                onClick={() => navigate("/payment", { state: { club } })}
                className="border-2 border-[#682626] text-[#cd974c] px-10 py-3 rounded-full font-bold hover:bg-[#682626] hover:text-white transition-all duration-300"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
