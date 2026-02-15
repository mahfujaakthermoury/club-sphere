import { useContext } from "react";
import { FaUsers, FaGlobe, FaBullseye, FaStar, FaCheckCircle } from "react-icons/fa";
import WebContext from "../../../Context/WebContext";
import aboutImg from "../../../assets/About/aboutImg.png"; 
import team1 from "../../../assets/About/team3.png";
import team2 from "../../../assets/About/team2.png";
import team3 from "../../../assets/About/team4.png";
import team4 from "../../../assets/About/team1.png";
import { useNavigate } from "react-router";

const About = () => {
  const { theme } = useContext(WebContext);
  const { user } = useContext(WebContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate("/all-clubs");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className={`w-full pb-15 transition-colors duration-300 ${theme === "dark" ? "bg-slate-900" : "bg-[#f9f5ef]"}`}>
      <div className="max-w-7xl mx-auto px-4 space-y-30">

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12  pb-">
          <div className="lg:w-1/2 space-y-6">
            <h1 className={`text-4xl md:text-5xl font-bold ${theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"}`}>
              About ClubSphere
            </h1>
            <p className={`text-sm sm:text-base leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>
              Discover, join, and manage local clubs effortlessly. ClubSphere connects communities, simplifies club management, and empowers you to engage in meaningful social experiences.
            </p>
            <div className="flex gap-4 mt-4">
              <button className={`px-6 py-3 rounded-full font-bold ${theme === "dark" ? "bg-[#cd974c] text-slate-900 hover:bg-[#e0b354]" : "bg-[#682626] text-white hover:bg-[#520f0f]"} transition-all`}>
                Get Started
              </button>
              <button className={`px-6 py-3 rounded-full font-bold border ${theme === "dark" ? "border-[#cd974c] text-[#cd974c] hover:bg-[#cd974c] hover:text-slate-900" : "border-[#682626] text-[#682626] hover:bg-[#682626] hover:text-white"} transition-all`}>
                Learn More
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center mt-10 lg:justify-end">
            <img src={aboutImg} alt="About Hero" className="rounded-2xl shadow-2xl w-full max-w-lg" />
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <h1 className={`text-2xl md:text-3xl font-bold ${theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"}`}>
              Our Mission & Vision
            </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-15">
          <div className={`p-8 rounded-3xl transition-all duration-500 shadow-xl border ${theme === "dark" ? "bg-slate-800 border-slate-700 shadow-purple-900/10" : "bg-white border-gray-100 shadow-gray-200"}`}>
            <FaBullseye className="text-4xl text-[#cd974c] mx-auto mb-4" />
            <h3 className={`text-xl font-bold mb-3 ${theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"}`}>Our Mission</h3>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-700"}>
              To simplify club discovery and membership management while creating a vibrant community experience. <span className="cursor-pointer text-[#dcb37a]">See more...</span>
            </p>
          </div>
          <div className={`p-8 rounded-3xl transition-all duration-500 shadow-xl border ${theme === "dark" ? "bg-slate-800 border-slate-700 shadow-purple-900/10" : "bg-white border-gray-100 shadow-gray-200"}`}>
            <FaGlobe className="text-4xl text-[#cd974c] mx-auto mb-4" />
            <h3 className={`text-xl font-bold mb-3 ${theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"}`}>Our Vision</h3>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-700"}>
              To be the most trusted platform for connecting people to clubs and events worldwide. <span className="cursor-pointer text-[#dcb37a]">See more...</span>
            </p>
          </div>
          <div className={`p-8 rounded-3xl transition-all duration-500 shadow-xl border ${theme === "dark" ? "bg-slate-800 border-slate-700 shadow-purple-900/10" : "bg-white border-gray-100 shadow-gray-200"}`}>
            <FaUsers className="text-4xl text-[#cd974c] mx-auto mb-4" />
            <h3 className={`text-xl font-bold mb-3 ${theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"}`}>Our Community</h3>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-700"}>
              A growing and diverse community of club members, managers, and admins sharing experiences. <span className="cursor-pointer text-[#dcb37a]">See more...</span>
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center space-y-8">
          <h2 className={`text-3xl pb-8 font-bold ${theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"}`}>Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[team1, team2, team3, team4].map((img, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                <img src={img} alt={`Team member ${idx+1}`} className="w-full h-64 object-cover"/>
                <div className="p-4 bg-white dark:bg-slate-800">
                  <h3 className={`font-bold ${theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"}`}>Member Name</h3>
                  <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Role / Position</p>
                </div>
              </div>
            ))}
          </div>
        </div>

         {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <h2 className={`text-4xl font-bold ${theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"}`}>500+</h2>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-700"}>Clubs Managed</p>
          </div>
          <div>
            <h2 className={`text-4xl font-bold ${theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"}`}>50K+</h2>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-700"}>Active Members</p>
          </div>
          <div>
            <h2 className={`text-4xl font-bold ${theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"}`}>200+</h2>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-700"}>Events Organized</p>
          </div>
          <div>
            <h2 className={`text-4xl font-bold ${theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"}`}>100%</h2>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-700"}>Secure Payments</p>
          </div>
        </div>

        

        {/* CTA Banner */}
        <div className={`py-12 rounded-3xl text-center ${theme === "dark" ? "bg-[#cd974c] text-slate-900" : "bg-[#682626] text-white"}`}>
          <h2 className="text-3xl font-bold mb-4">Ready to join a club?</h2>
          <p className="mb-6">Sign up today and start exploring the perfect community for you!</p>
          <button onClick={handleClick}
          className={`px-8 py-3 rounded-full font-bold transition-all ${theme === "dark" ? "bg-slate-900 text-[#cd974c] hover:bg-slate-800" : "bg-white text-[#682626] hover:bg-[#f2ebe6]"}`}>
            Get Started
          </button>
        </div>

      </div>
    </section>
  );
};

export default About;
