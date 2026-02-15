
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import WebContext from "../../../../Context/WebContext";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import { HeadProvider, Title } from "react-head";
import { MdCloudUpload } from "react-icons/md";

const image_API = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_HOSTING_API
}`;

const AddClubs = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user, theme } = useContext(WebContext);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const hostImage = async (file) => {
    if (!file) return null;
    const form = new FormData();
    form.append("image", file);
    const res = await axiosPublic.post(image_API, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res?.data?.data?.url || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const f = e.target;

      const bannerFile = f.bannerImageFile.files[0];
      const bannerUrl = f.bannerImageUrl.value.trim();

      let finalImage = "";
      if (bannerFile) {
        finalImage = await hostImage(bannerFile);
      } else {
        finalImage = bannerUrl;
      }

      if (!finalImage) {
        setSubmitting(false);
        return toast.error("Please provide a banner image.");
      }

      const payload = {
        clubName: f.clubName.value,
        description: f.description.value,
        category: f.category.value,
        location: f.location.value,
        clubImage: finalImage,
        membershipFee: Number(f.membershipFee.value),
        status: "pending",
        managerEmail: user?.email,
        createdAt: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/clubs", payload);

      if (res.data.insertedId) {
        toast.success("Club added successfully!");
        navigate("/dashboard/manage-clubs");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 ${
    theme === "dark"
      ? "bg-slate-800 border-slate-700 text-white focus:border-[#cd974c]"
      : "bg-gray-50 border-gray-200 focus:border-[#682626]"
  }`;

  const labelClass = `block text-sm font-bold mb-2 ${
    theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"
  }`;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <HeadProvider>
        <Title>Add Club || ClubSphere</Title>
      </HeadProvider>

      {/* Header */}
      <div className="mb-10 text-center">
        <h2
          className={`text-4xl font-black ${
            theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"
          }`}
        >
          Create New Club
        </h2>
        <p className="opacity-70 mt-2">
          Build your community and start growing members today.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className={`p-8 rounded-3xl border shadow-xl transition-all ${
          theme === "dark"
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-gray-100"
        }`}
      >
        {/* Club Name */}
        <div className="mb-6">
          <label className={labelClass}>Club Name *</label>
          <input
            name="clubName"
            required
            className={inputClass}
            placeholder="e.g. Photography Club"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className={labelClass}>Description *</label>
          <textarea
            name="description"
            required
            rows="4"
            className={inputClass}
            placeholder="Describe your club and its activities..."
          ></textarea>
        </div>

        {/* Category + Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className={labelClass}>Category *</label>
            <input
              name="category"
              required
              className={inputClass}
              placeholder="Photography, Sports, Tech..."
            />
          </div>

          <div>
            <label className={labelClass}>Location *</label>
            <input
              name="location"
              required
              className={inputClass}
              placeholder="City or Area"
            />
          </div>
        </div>

        {/* Banner Upload */}
        <div className="mb-6">
          <label className={labelClass}>Banner Image *</label>

          <div
            className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
              theme === "dark"
                ? "border-slate-700 hover:border-[#cd974c]"
                : "border-gray-200 hover:border-[#682626]"
            }`}
          >
            <MdCloudUpload className="mx-auto text-4xl text-[#cd974c] mb-2" />
            <input
              type="file"
              name="bannerImageFile"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <p className="text-sm opacity-70">
              Click to upload or drag & drop
            </p>
          </div>

          <input
            name="bannerImageUrl"
            className={`${inputClass} mt-4`}
            placeholder="Or paste image URL..."
          />
        </div>

        {/* Membership Fee */}
        <div className="mb-8">
          <label className={labelClass}>
            Membership Fee (0 for Free)
          </label>
          <input
            type="number"
            name="membershipFee"
            defaultValue={0}
            className={inputClass}
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className={`px-10 py-4 font-bold rounded-2xl transition-all shadow-lg ${
              theme === "dark"
                ? "bg-[#cd974c] text-slate-900 hover:bg-[#e0b354]"
                : "bg-[#682626] text-white hover:bg-[#520f0f]"
            } disabled:bg-gray-400`}
          >
            {submitting ? "Creating..." : "Create Club"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClubs;
