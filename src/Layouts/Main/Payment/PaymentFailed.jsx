import { useContext } from "react";
import { HeadProvider, Title } from "react-head";
import { useNavigate } from "react-router";
import WebContext from "../../../Context/WebContext";
import { ErrorOutline, Home, Replay } from "@mui/icons-material";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const { theme } = useContext(WebContext);

 return (
  <div
    className={`w-full min-h-screen flex items-center justify-center py-20 px-4 transition-colors duration-300 ${
      theme === "dark"
        ? "bg-[#1a1414] text-gray-300"
        : "bg-[#f9f4ef] text-[#4b3b2a]"
    }`}
  >
    <HeadProvider>
      <Title>Payment Failed || ClubSphere</Title>
    </HeadProvider>

    <div className="max-w-xl w-full">
      <div
        className={`p-10 rounded-2xl border text-center transition-all duration-300 ${
          theme === "dark"
            ? "bg-[#2a1d1d] border-[#3a2a2a]"
            : "bg-white border-[#ecd9c6]"
        }`}
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-5 rounded-full bg-[#682626]/20 text-[#682626] animate-pulse">
            <ErrorOutline sx={{ fontSize: 60 }} />
          </div>
        </div>

        {/* Title */}
        <h1
          className={`text-3xl font-bold mb-4 ${
            theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"
          }`}
        >
          Payment Failed ❌
        </h1>

        {/* Message */}
        <p
          className={`text-sm sm:text-base leading-relaxed mb-8 ${
            theme === "dark" ? "text-gray-400" : "text-[#7a6a58]"
          }`}
        >
          Your transaction could not be completed. Please verify your payment
          details and try again.
          <span className="block mt-3 text-xs uppercase font-bold tracking-widest opacity-60">
            Status: Unpaid
          </span>
        </p>

        {/* Info Box */}
        <div
          className={`p-6 rounded-xl mb-10 text-sm ${
            theme === "dark"
              ? "bg-[#1f1616] text-gray-400"
              : "bg-[#f3e8dd] text-[#7a6a58]"
          }`}
        >
          If money was deducted from your account, it will be refunded
          automatically within 5–7 business days.
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#682626] text-white font-bold rounded-full hover:bg-[#cd974c] transition-all duration-300"
          >
            <Replay fontSize="small" />
            Try Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-[#682626] text-[#682626] font-bold rounded-full hover:bg-[#682626] hover:text-white transition-all duration-300"
          >
            <Home fontSize="small" />
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  </div>
);

};

export default PaymentFailed;
