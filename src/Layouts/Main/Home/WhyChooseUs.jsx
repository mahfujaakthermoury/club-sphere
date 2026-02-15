import { useContext } from "react";
import { FaUsers, FaCalendarAlt, FaShieldAlt } from "react-icons/fa"; // Club-themed icons
import WebContext from "../../../Context/WebContext";

const WhyChooseUs = () => {
  const { theme } = useContext(WebContext);

  // Reusable Card Style
  const cardStyle = `p-8 rounded-2xl text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border ${
    theme === "dark"
      ? "bg-[#1f1515] border-[#3a2a2a] shadow-[#cd974c]/20"
      : "bg-white border-[#ecd9c6] shadow-[#cd974c]/10"
  }`;

  return (
    <section
      className={`w-full py-16 transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900" : "bg-white"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h1
            className={`md:text-3xl text-2xl font-bold ${
              theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"
            }`}
          >
            Why Choose Us?
          </h1>

          <div className="w-24 h-1 bg-[#cd974c] mx-auto mt-3 rounded-full"></div>

          <p
            className={`max-w-2xl mx-auto mt-4 sm:text-base text-sm ${
              theme === "dark" ? "text-gray-400" : "text-[#7a6a58]"
            }`}
          >
            Strengthening your social and club experience with the most reliable
            and efficient community management platform worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 - Club Discovery */}
          <div data-aos="fade-up" className={cardStyle}>
            <div className="w-16 h-16 bg-[#cd974c]/20 text-[#682626] rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner">
              <FaUsers />
            </div>
            <h3
              className={`text-xl font-bold mb-3 ${
                theme === "dark" ? "text-[#cd974c]" : "text-[#000000]"
              }`}
            >
              Club Discovery & Membership
            </h3>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-[#7a6a58]"
              } leading-relaxed`}
            >
              Discover local clubs, join free or paid memberships, and manage your
              participation easily through your personalized dashboard.
            </p>
          </div>

          {/* Card 2 - Club Management */}
          <div data-aos="fade-up" data-aos-delay="100" className={cardStyle}>
            <div className="w-16 h-16 bg-[#682626]/20 text-[#cd974c] rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner">
              <FaCalendarAlt />
            </div>
            <h3
              className={`text-xl font-bold mb-3 ${
                theme === "dark" ? "text-[#cd974c]" : "text-[#000000]"
              }`}
            >
              Streamlined Club Management
            </h3>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-[#7a6a58]"
              } leading-relaxed`}
            >
              Club managers can create and update clubs, organize events, set
              membership fees, and track member activity efficiently.
            </p>
          </div>

          {/* Card 3 - Secure Platform */}
          <div data-aos="fade-up" data-aos-delay="200" className={cardStyle}>
            <div className="w-16 h-16 bg-[#cd974c]/20 text-[#682626] rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner">
              <FaShieldAlt />
            </div>
            <h3
              className={`text-xl font-bold mb-3 ${
                theme === "dark" ? "text-[#cd974c]" : "text-[#000000]"
              }`}
            >
              Secure & Transparent Platform
            </h3>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-[#7a6a58]"
              } leading-relaxed`}
            >
              Payments are handled securely via Stripe, while admins ensure a
              safe and trustworthy environment for all members and managers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
