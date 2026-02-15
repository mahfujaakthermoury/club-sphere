import { useContext, useState } from "react";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import WebContext from "../../../Context/WebContext";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { MdVisibility, MdVisibilityOff, MdOutlineMailOutline, MdLockOutline, MdAdminPanelSettings, MdSecurity, MdSchool } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { HeadProvider, Title } from "react-head";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { theme, handleLoginEmail, handleGoogle, setUser, setUserName, setUserImage } = useContext(WebContext);

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/users");
      return res.data;
    },
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleLoginEmail(email, password)
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
        setUserName(loggedUser.displayName);
        setUserImage(loggedUser.photoURL);
        navigate("/");
        toast.success("Login Successful");
      })
      .catch((error) => toast.error(`Login Error: ${error.message}`));
  };

  const handleGoogleMethod = () => {
    handleGoogle().then((result) => {
      const user = result.user;
      setUser(user);
      setUserName(user.displayName);
      setUserImage(user.photoURL);

      const exists = users.find((u) => u.email === user.email);
      if (!exists) {
        const newUser = { name: user.displayName, email: user.email, image: user.photoURL, role: "Member" };
        AxiosPublic.post("/users", newUser);
      }
      toast.success("Google Login Successful");
      navigate("/");
    });
  };

  return (
    <div className={`hero py-20 ${theme === "dark" ? "bg-slate-950 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
      <HeadProvider>
        <Title>Login || ClubSphere</Title>
      </HeadProvider>

      <div className="w-[400px] mx-auto">
        <h1 className={`text-3xl font-bold text-center mb-8 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Welcome Back!</h1>
        <div className={`card p-8 rounded-xl shadow-2xl ${theme === "dark" ? "bg-slate-900 border border-slate-800" : "bg-white border border-gray-100"}`}>
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <label className="label">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={`input w-full ${theme === "dark" ? "bg-slate-800 text-gray-100" : "bg-gray-100 text-gray-800"}`}
                required
              />
              <MdOutlineMailOutline className="absolute right-3 top-3 text-xl opacity-50" />
            </div>

            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`input w-full ${theme === "dark" ? "bg-slate-800 text-gray-100" : "bg-gray-100 text-gray-800"} pr-12`}
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-2xl">
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>

            <div className="flex justify-between items-center mt-1">
              <button type="button" onClick={() => navigate(`/forgot`)} className="link link-hover text-sm text-orange-500">
                Forgot password?
              </button>
            </div>

            <button type="submit"
              className=" inline-block text-center mt-5 border-2 bg-[#682626] text-[#ffffff] px-8 py-2.5 rounded-[5px] font-bold transition-all duration-300"
            >Login</button>

            <button type="button" onClick={handleGoogleMethod} className="btn w-full mt-3 flex items-center justify-center gap-3">
              <FcGoogle className="text-2xl" /> Login with Google
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm opacity-60">Don't have an account?</span>
            <Link to="/register" className="link link-hover font-bold"> Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
