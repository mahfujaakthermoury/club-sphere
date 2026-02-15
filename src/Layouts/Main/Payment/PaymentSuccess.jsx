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
  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    if (!club || !user?.email) return;

    const payload = {
      scholar: club,
      clubId: club._id,
      clubName: club.clubName,
      universityName: club.universityName,
      fees: club.membershipFee,
      applicant: user.email,
      userName: user.displayName,
      appliedDate: new Date(),
      status: "pending",
      payment: "Paid",
    };

    axiosPublic
      .post("/applications", payload)
      .then(() => {
        toast.success("Application submitted successfully!");
      })
      .catch(() => {
        toast.error("Failed to save application!");
      });
  }, [club, user, axiosPublic]);

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="opacity-50">No payment data found.</p>
      </div>
    );
  }

 return (
  <div
    className={`w-full min-h-screen flex items-center justify-center py-20 px-4 transition-colors duration-300 ${
      theme === "dark"
        ? "bg-[#1a1414] text-gray-300"
        : "bg-[#f9f4ef] text-[#4b3b2a]"
    }`}
  >
    <HeadProvider>
      <Title>Payment Successful || ClubSphere</Title>
    </HeadProvider>

    <div className="max-w-xl w-full">
      <div
        className={`p-10 rounded-2xl border text-center transition-all duration-300 ${
          theme === "dark"
            ? "bg-[#2a1d1d] border-[#3a2a2a]"
            : "bg-white border-[#ecd9c6]"
        }`}
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-5 rounded-full bg-[#cd974c]/20 text-[#cd974c] animate-pulse">
            <CheckCircleOutline sx={{ fontSize: 60 }} />
          </div>
        </div>

        {/* Title */}
        <h1
          className={`text-3xl font-bold mb-4 ${
            theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"
          }`}
        >
          Payment Successful 🎉
        </h1>

        {/* Message */}
        <p
          className={`text-sm sm:text-base leading-relaxed mb-8 ${
            theme === "dark" ? "text-gray-400" : "text-[#7a6a58]"
          }`}
        >
          Your payment for{" "}
          <span className="font-bold text-[#cd974c]">
            {club.clubName}
          </span>{" "}
          has been processed successfully. Your application is now under review.
        </p>

        {/* Info Box */}
        <div
          className={`p-6 rounded-xl mb-10 text-left space-y-3 ${
            theme === "dark" ? "bg-[#1f1616]" : "bg-[#f3e8dd]"
          }`}
        >
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-60">
            <span>University</span>
            <span>Status</span>
          </div>

          <div className="flex justify-between items-center">
            <p className="font-bold truncate pr-4">
              {club.universityName}
            </p>

            <span className="px-4 py-1 bg-[#cd974c] text-white text-xs font-bold rounded-full shadow-md">
              Pending
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/dashboard/my-applications")}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#682626] text-white font-bold rounded-full hover:bg-[#cd974c] transition-all duration-300"
          >
            <History fontSize="small" />
            My Applications
          </button>

          <button
            onClick={() => navigate("/all-clubs")}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-[#682626] text-[#682626] font-bold rounded-full hover:bg-[#682626] hover:text-white transition-all duration-300"
          >
            <ArrowBack fontSize="small" />
            More Clubs
          </button>
        </div>
      </div>
    </div>
  </div>
);

};

export default PaymentSuccess;
