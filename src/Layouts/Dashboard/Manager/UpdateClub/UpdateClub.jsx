import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import DataLoader from "../../../../Components/DataLoader";
import WebContext from "../../../../Context/WebContext";
import { MdArrowBack, MdCloudUpload } from "react-icons/md";

const UpdateClub = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { theme } = useContext(WebContext);
  const [submitting, setSubmitting] = useState(false);

  // Fetch existing club data
  const { data: existing, isLoading } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/club/data/${id}`);
      return res.data;
    },
    retry: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const f = e.target;

      // Handle banner: either file upload or URL
      let bannerImage = existing.bannerImage;
      const file = f.bannerImageFile.files[0];
      if (file) {
        // Example: upload file to server and get URL
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await axiosSecure.post("/upload/banner", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        bannerImage = uploadRes.data.url;
      } else if (f.bannerImageUrl.value.trim()) {
        bannerImage = f.bannerImageUrl.value.trim();
      }

      const payload = {
        clubName: f.clubName.value.trim(),
        description: f.description.value.trim(),
        category: f.category.value.trim(),
        location: f.location.value.trim(),
        bannerImage,
        membershipFee: Number(f.membershipFee.value || 0),
      };

      const res = await axiosSecure.put(`/club/update/${id}`, payload);

      if (res?.status === 200) {
        toast.success("Club updated successfully!");
        navigate("/dashboard/manage-clubs");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <DataLoader />;
  if (!existing)
    return (
      <div className="text-center py-20 font-black opacity-40">
        NO DATA FOUND
      </div>
    );

  const inputClass = `w-full px-4 py-3 rounded-2xl border outline-none transition-all ${
    theme === "dark"
      ? "bg-slate-900 border-slate-800 text-white focus:border-sky-500"
      : "bg-gray-50 border-gray-200 text-slate-700 focus:border-sky-500 focus:bg-white"
  }`;
  const labelClass =
    "text-xs font-black uppercase tracking-widest opacity-60 mb-2 block ml-1";

  return (
    <div className="w-full mx-auto p-2 sm:p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-3 rounded-2xl bg-slate-500/10 hover:bg-sky-500 hover:text-white transition-all"
        >
          <MdArrowBack size={20} />
        </button>
        <h2
          className={`md:text-3xl text-2xl font-black tracking-tight ${
            theme === "dark" ? "text-white" : "text-slate-900"
          }`}
        >
          Update Club
        </h2>
      </div>

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
            defaultValue={existing.clubName}
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
            defaultValue={existing.description}
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
              defaultValue={existing.category}
              required
              className={inputClass}
              placeholder="Photography, Sports, Tech..."
            />
          </div>

          <div>
            <label className={labelClass}>Location *</label>
            <input
              name="location"
              defaultValue={existing.location}
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
            <p className="text-sm opacity-70">Click to upload or drag & drop</p>
          </div>

          <input
            name="bannerImageUrl"
            defaultValue={existing.bannerImage}
            className={`${inputClass} mt-4`}
            placeholder="Or paste image URL..."
          />
        </div>

        {/* Membership Fee */}
        <div className="mb-8">
          <label className={labelClass}>Membership Fee (0 for Free)</label>
          <input
            type="number"
            name="membershipFee"
            defaultValue={existing.membershipFee || 0}
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
            {submitting ? "Updating..." : "Update Club"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateClub;
