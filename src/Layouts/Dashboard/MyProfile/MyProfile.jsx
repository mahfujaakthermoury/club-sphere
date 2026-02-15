import { useContext, useState } from "react";
import WebContext from "../../../Context/WebContext";
import auth from "../../../Firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { HeadProvider, Title } from "react-head";
import {
  MdOutlinePhotoCamera,
  MdOutlineBadge,
  MdOutlineEmail,
  MdUpdate,
  MdVerifiedUser,
} from "react-icons/md";

const MyProfile = () => {
  const { userName, setUserName, userImage, setUserImage, user, theme } =
    useContext(WebContext);
  const [isNameSubmitting, setIsNameSubmitting] = useState(false);
  const [isImageSubmitting, setIsImageSubmitting] = useState(false);

  const toastConfig = {
    position: "top-center",
    autoClose: 2000,
    theme: theme === "dark" ? "dark" : "light",
  };

  const updateName = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    setIsNameSubmitting(true);
    updateProfile(auth.currentUser, { displayName: name })
      .then(() => {
        toast.success(`Name updated successfully!`, toastConfig);
        setUserName(name);
        setIsNameSubmitting(false);
        e.target.reset();
      })
      .catch((error) => {
        toast.error(`Update failed: ${error.message}`, toastConfig);
        setIsNameSubmitting(false);
      });
  };

  const updateImage = (e) => {
    e.preventDefault();
    const imageURL = e.target.imageURL.value;
    setIsImageSubmitting(true);
    updateProfile(auth.currentUser, { photoURL: imageURL })
      .then(() => {
        toast.success(`Photo updated successfully!`, toastConfig);
        setUserImage(imageURL);
        setIsImageSubmitting(false);
        e.target.reset();
      })
      .catch((error) => {
        toast.error(`Photo update failed: ${error.message}`, toastConfig);
        setIsImageSubmitting(false);
      });
  };

 return (
  <div className="w-full max-w-6xl mx-auto py-14 px-4">
    <HeadProvider>
      <Title>Profile || ClubSphere</Title>
    </HeadProvider>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      
      {/* LEFT PROFILE CARD */}
      <div
        className={`rounded-2xl border p-8 h-fit transition-all ${
          theme === "dark"
            ? "bg-slate-900 border-slate-800"
            : "bg-white shadow-xl border-gray-200"
        }`}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <img
            className="w-32 h-32 rounded-full object-cover border-3 border-[#682626]"
            src={userImage || "https://i.ibb.co/jZ67CdJ2/download.jpg"}
            alt={userName}
          />

          <h2 className="text-2xl font-bold hover:text-[#e59e3b] transition">
            {userName || "Club Member"}
          </h2>

          <div className="flex items-center gap-2 text-gray-500">
            <MdOutlineEmail />
            <span className="text-sm">{user?.email}</span>
          </div>

          <div className="mt-4 px-4 py-2 rounded-full bg-[#682626]/10 text-[#682626] text-sm font-semibold">
            Active Member
          </div>
        </div>
      </div>

      {/* RIGHT FORMS SECTION */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Update Name */}
        <div
          className={`rounded-2xl border p-8 transition-all ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800"
              : "bg-white shadow-lg border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <MdOutlineBadge className="text-[#682626]" size={22} />
            <h3 className="text-lg font-bold hover:text-[#e59e3b] transition">
              Change Display Name
            </h3>
          </div>

          <form onSubmit={updateName} className="flex flex-col gap-4">
            <input
              required
              name="name"
              type="text"
              placeholder="Enter new display name"
              className={`w-full px-5 py-3 rounded-lg border outline-none transition ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 focus:border-[#e59e3b] text-white"
                  : "bg-gray-50 border-gray-300 focus:border-[#e59e3b]"
              }`}
            />

            <button
              disabled={isNameSubmitting}
              className="self-start px-6 py-2.5 rounded-lg bg-[#682626] text-white font-semibold hover:bg-[#e59e3b] hover:text-black transition flex items-center gap-2 disabled:opacity-50"
            >
              <MdUpdate size={18} />
              {isNameSubmitting ? "Updating..." : "Update Name"}
            </button>
          </form>
        </div>

        {/* Update Photo */}
        <div
          className={`rounded-2xl border p-8 transition-all ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800"
              : "bg-white shadow-lg border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <MdOutlinePhotoCamera className="text-[#682626]" size={22} />
            <h3 className="text-lg font-bold hover:text-[#e59e3b] transition">
              Change Profile Photo
            </h3>
          </div>

          <form onSubmit={updateImage} className="flex flex-col gap-4">
            <input
              required
              name="imageURL"
              type="text"
              placeholder="Paste new photo URL"
              className={`w-full px-5 py-3 rounded-lg border outline-none transition ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 focus:border-[#e59e3b] text-white"
                  : "bg-gray-50 border-gray-300 focus:border-[#e59e3b]"
              }`}
            />

            <button
              disabled={isImageSubmitting}
              className="self-start px-6 py-2.5 rounded-lg bg-[#714747] text-white font-semibold hover:bg-[#e59e3b] hover:text-black transition flex items-center gap-2 disabled:opacity-50"
            >
              <MdUpdate size={18} />
              {isImageSubmitting ? "Updating..." : "Update Photo"}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
);

};

export default MyProfile;
