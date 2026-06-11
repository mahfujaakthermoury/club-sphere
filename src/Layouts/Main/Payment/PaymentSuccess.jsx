import { useLocation, useNavigate } from "react-router";
import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import WebContext from "../../../Context/WebContext";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import { HeadProvider, Title } from "react-head";
import { CheckCircleOutline, History, ArrowBack } from "@mui/icons-material";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user, theme } = useContext(WebContext);

  const club = location.state?.club;
  const event = location.state?.event;
  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    if (!user?.email) return;

    // CLUB APPLICATION
    if (club) {
      const payload = {
        clubId: club._id,
        managerEmail: club.managerEmail,
        clubImage: club.clubImage,
        category: club.category,
        clubName: club.clubName,
        location: club.location,
        membershipFee: club.membershipFee,
        applicant: user?.email,
        userName: user?.displayName,
        appliedDate: new Date(),
        status: "pending",
        payment: "Paid",
        type: "club",
      };

      axiosPublic
        .post("/applications", payload)
        .then(() => toast.success("Club application submitted!"))
        .catch(() => toast.error("Failed to save club application!"));

      return;
    }

    // EVENT REGISTRATION
    if (event) {
      const payload = {
        eventId: event._id,
        eventName: event.eventName,
        
        eventImage: event.eventImage,
        category: event.category,
        location: event.location,
        eventFee: event.eventFee,
        userEmail: user.email,
        registeredAt: new Date(),
        status: "pending",
        payment: "Paid",
        type: "event",
      };

      axiosPublic
        .post("/registrations", payload)
        .then(() => toast.success("Event registration successful!"))
        .catch(() => toast.error("Failed to save event registration!"));
    }
  }, [club, event, user, axiosPublic]);

  if (!club && !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="opacity-50">No payment data found.</p>
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center py-20 px-4 transition-colors duration-300 ${theme === "dark"
        ? "bg-[#1a1414] text-gray-300"
        : "bg-[#f9f4ef] text-[#4b3b2a]"
        }`}
    >
      <HeadProvider>
        <Title>Payment Successful || ClubSphere</Title>
      </HeadProvider>

      <div className="max-w-xl w-full">
        <div
          className={`p-10 rounded-2xl border text-center transition-all duration-300 ${theme === "dark"
            ? "bg-[#2a1d1d] border-[#3a2a2a]"
            : "bg-white border-[#ecd9c6]"
            }`}
        >
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-5 rounded-full bg-[#4ccd71]/20 text-[#4ccd71] animate-pulse">
              <CheckCircleOutline sx={{ fontSize: 60 }} />
            </div>
          </div>

          {/* Title */}
          <h1
            className={`text-3xl font-bold mb-7 ${theme === "dark" ? "text-[#4ccd71]" : "text-[#34943b]"
              }`}
          >
            Congratulations !
          </h1>

          {/* Message */}
          <p
            className={`text-sm sm:text-base leading-relaxed mb-8 ${theme === "dark" ? "text-gray-400" : "text-[#7a6a58]"
              }`}
          >
            <span className="font-bold text-[#cd974c]">
              {club?.clubName || event?.eventName}
            </span>{" "}
             has been processed successfully. 
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() =>navigate(club ? "/dashboard/my-clubs" : "/dashboard/my-event")}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#682626] text-white font-bold rounded-full hover:bg-[#cd974c] transition-all duration-300"
            >
              <History fontSize="small" />
              {club ? "My Applied Clubs" : "My Events"}
            </button>

            <button
              onClick={() => navigate(club ? "/all-clubs" : "/all-events")}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-[#cd974c] text-[#cd974c] font-bold rounded-full hover:bg-[#682626] hover:text-white transition-all duration-300"
            >
              <ArrowBack fontSize="small" />
              {club ? "More Clubs" : "More Events"}
              
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};

export default PaymentSuccess;
