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
      clubId: club._id,
      clubImage:club.clubImage,
      category: club.category,
      clubName: club.clubName,
      location: club.location,
      membershipFee: club.membershipFee,
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
          <div className="p-5 rounded-full bg-[#4ccd71]/20 text-[#4ccd71] animate-pulse">
            <CheckCircleOutline sx={{ fontSize: 60 }} />
          </div>
        </div>

        {/* Title */}
        <h1
          className={`text-3xl font-bold mb-7 ${
            theme === "dark" ? "text-[#4ccd71]" : "text-[#34943b]"
          }`}
        >
          Congratulations !  
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
            className="flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-[#cd974c] text-[#cd974c] font-bold rounded-full hover:bg-[#682626] hover:text-white transition-all duration-300"
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
