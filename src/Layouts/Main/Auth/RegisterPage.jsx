import { useContext, useState } from "react";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import WebContext from "../../../Context/WebContext";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { MdVisibility, MdVisibilityOff, MdOutlineDriveFileRenameOutline, MdOutlinePhotoCamera, MdOutlineMailOutline } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { HeadProvider, Title } from "react-head";
import { updateProfile } from "firebase/auth";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { theme } = useContext(WebContext);

  const { handleRegisterEmail, handleGoogle, setUser, setUserName, setUserImage } = useContext(WebContext);

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/users");
      return res.data;
    },
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const target = e.target;
    const name = target.name.value;
    const email = target.email.value;
    const password = target.password.value;
    const role = target.role.value || "member";
    const image = target.image.value || "";

    const exists = users.find((u) => u.email === email);
    if (exists) {
      toast.error("User already exists with this email");
      return;
    }

    handleRegisterEmail(email, password)
      .then((result) => {
        const newUser = result.user;
        updateProfile(newUser, { displayName: name, photoURL: image });
        setUser(newUser);
        setUserName(name);
        setUserImage(image || newUser.photoURL || "");

        const toDB = { name, email, image: image || newUser.photoURL || "", role };
        AxiosPublic.post("/users", toDB);

        toast.success("Registration Successful");
        navigate("/");
      })
      .catch((error) => toast.error(`Register Error: ${error.message}`));
  };

  const handleGoogleMethod = () => {
    handleGoogle().then((result) => {
      const user = result.user;
      setUser(user);
      setUserName(user.displayName);
      setUserImage(user.photoURL);

      const exists = users.find((u) => u.email === user.email);
      if (!exists) {
        const newUser = { name: user.displayName, email: user.email, image: user.photoURL, role: "member" };
        AxiosPublic.post("/users", newUser);
      }
      toast.success("Login Successful");
      navigate("/");
    });
  };

  return (
    <div className={`hero py-20 ${theme === "dark" ? "bg-slate-950 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
      <HeadProvider>
        <Title>Register || ClubSphere</Title>
      </HeadProvider>

      <div className="w-[400px] mx-auto">
        <h1 className={`text-3xl font-bold text-center mb-8 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          Join <span className="text-[#682626]">ClubSphere</span>
        </h1>

        <div className={` card p-8 rounded-xl shadow-2xl ${theme === "dark" ? "bg-slate-900 border border-slate-800" : "bg-white border border-gray-100"}`}>
          <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className={`input w-full ${theme === "dark" ? "bg-slate-800 text-gray-100" : "bg-gray-100 text-gray-800"} px-4 py-3 rounded-lg`}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`input w-full ${theme === "dark" ? "bg-slate-800 text-gray-100" : "bg-gray-100 text-gray-800"} px-4 py-3 rounded-lg`}
              required
            />
            <input
              type="url"
              name="image"
              placeholder="Photo URL"
              className={`input w-full ${theme === "dark" ? "bg-slate-800 text-gray-100" : "bg-gray-100 text-gray-800"} px-4 py-3 rounded-lg`}
            />
            <select
              name="role"
              defaultValue="member"
              className={`input w-full ${theme === "dark" ? "bg-slate-800 text-gray-100" : "bg-gray-100 text-gray-800"} px-4 rounded-lg`}
            >
              <option value="Member">Member</option>
              <option value="Moderator">Manager</option>
              <option value="Admin">Admin</option>
            </select>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={`input w-full ${theme === "dark" ? "bg-slate-800 text-gray-100" : "bg-gray-100 text-gray-800"} px-4 py-3 rounded-lg pr-12`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-2xl"
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>

            <button 
              className=" inline-block text-center mt-5 border-2 bg-[#682626] text-[#ffffff] px-8 py-2.5 rounded-[5px] font-bold transition-all duration-300"
            >Create Account</button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-sm font-bold opacity-40 uppercase tracking-widest">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <button
            onClick={handleGoogleMethod}
            className={`btn w-full flex items-center justify-center gap-3 mt-4 ${theme === "dark" ? "bg-slate-800 border border-slate-700" : "bg-white border border-gray-200"}`}
          >
            <FcGoogle className="text-2xl" /> Continue with Google
          </button>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm opacity-60">
              Already have an account?{" "}
              <Link to="/login" className="text-[#c9790a] font-bold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
