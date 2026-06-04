import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdCalendarToday } from "react-icons/md";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import DataLoader from "../../../Components/DataLoader";
import { HeadProvider, Title } from "react-head";
import WebContext from "../../../Context/WebContext";

const EventDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { theme } = useContext(WebContext);

  const { data: event = null, isLoading } = useQuery({
    queryKey: ["events-details", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/events/data/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <DataLoader />;

  if (!event) {
    return (
      <div className="text-center py-20 font-bold text-red-500">
        Event not found
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen py-16 px-4 transition-all duration-300 ${
        theme === "dark"
          ? "bg-[#1a1414] text-gray-300"
          : "bg-[#f9f4ef] text-[#4b3b2a]"
      }`}
    >
      <HeadProvider>
        <Title>Event Details || ClubSphere</Title>
      </HeadProvider>

      <div className="max-w-4xl mx-auto">
        <div
          className={`group border rounded-3xl overflow-hidden transition-all duration-300 ${
            theme === "dark"
              ? "bg-[#2a1d1d] border-[#3a2a2a]"
              : "bg-white border-[#ecd9c6]"
          }`}
        >
          {/* IMAGE */}
          <div className="relative h-[380px] overflow-hidden">
            <img
              src={event?.eventImage}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              alt={event.eventName}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            {/* CATEGORY */}
            <div className="absolute top-6 right-6 bg-[#cd974c] text-white text-xs font-bold px-4 py-1 rounded-full">
              {event.category}
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-8 flex flex-col gap-6">
            {/* Club Name */}
            <p
              className={`text-sm font-bold ${
                theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"
              }`}
            >
              Club: {event.clubName}
            </p>

            {/* Event Title */}
            <h1
              className={`text-3xl font-bold ${
                theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"
              }`}
            >
              {event.eventName}
            </h1>

            {/* Description */}
            <p
              className={`leading-relaxed ${
                theme === "dark" ? "text-gray-400" : "text-[#7a6a58]"
              }`}
            >
              {event.description}
            </p>

            {/* INFO */}
            <div className="grid md:grid-cols-2 gap-6 mt-2">
              {/* DATE */}
              <div className="flex items-center gap-2">
                <MdCalendarToday className="text-[#682626]" />
                <span>
                  {event.eventDate
                    ? new Date(event.eventDate).toLocaleDateString()
                    : "No date set"}
                </span>
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-2">
                <HiOutlineLocationMarker className="text-[#682626]" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* PRICE */}
            <div className="text-lg font-bold mt-2">
              {event.isPaid ? (
                <span className="text-emerald-600">
                  Fee: ${event.eventFee}
                </span>
              ) : (
                <span className="text-green-600">Free Entry</span>
              )}
            </div>

            {/* BUTTON */}
            <div className="flex justify-end pt-6 border-t border-[#3a2a2a]/30">
              <button
                onClick={() => navigate("/payment")}
                className="border-2 border-[#682626] text-[#cd974c] px-10 py-3 rounded-full font-bold hover:bg-[#682626] hover:text-white transition-all duration-300"
              >
                Registration Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;