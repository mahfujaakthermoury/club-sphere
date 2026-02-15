import { useContext, useState } from "react";
import { HeadProvider, Title } from "react-head";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import WebContext from "../../../Context/WebContext";
import auth from "../../../Firebase/firebase.config";
import { MdOutlineMailOutline, MdLockReset } from "react-icons/md";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(WebContext);
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!", { position: "top-center", autoClose: 2000 });
        setLoading(false);
        setEmail("");
      })
      .catch((error) => {
        toast.error(error.message, { position: "top-center", autoClose: 2000 });
        setLoading(false);
      });
  };

  return (
    <div className={`hero py-20 ${theme === "dark" ? "bg-slate-950 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
      <HeadProvider>
        <Title>Forgot Password || ClubSphere</Title>
      </HeadProvider>

      <div className="w-[400px] mx-auto">
        <h1 className={`text-3xl font-bold text-center mb-8 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          Forgot Password?
        </h1>

        <div className={`card p-8 rounded-xl shadow-2xl flex flex-col items-center ${theme === "dark" ? "bg-slate-900 border border-slate-800" : "bg-white border border-gray-100"}`}>
          <p className="text-center mb-6 opacity-70 leading-relaxed">
            Enter your email below to receive a recovery link.
          </p>

          <form onSubmit={handleForgotPassword} className="flex flex-col w-full gap-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className={`input w-full ${theme === "dark" ? "bg-slate-800 text-gray-100" : "bg-gray-100 text-gray-800"} pl-10 rounded-lg`}
                required
              />
              <MdOutlineMailOutline className="absolute left-3 top-3 text-xl opacity-50" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-[#682626] text-white font-bold rounded-xl shadow-lg hover:shadow-sky-500/20 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
            >
              {loading ? "Sending link..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm opacity-60">Remember your password?</span>{" "}
            <button
              onClick={() => navigate("/login")}
              className="link link-hover font-bold text-[#c9790a]"
            >
              Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
