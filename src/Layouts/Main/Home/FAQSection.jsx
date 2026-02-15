import { useState, useContext } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import WebContext from "../../../Context/WebContext";
import faqImage from "../../../assets/faqImage.png";
import { useNavigate } from "react-router";


const FAQItem = ({ question, answer, index, theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      className={`border-b py-4 transition-colors duration-300 ${theme === "dark" ? "border-slate-700" : "border-gray-200"
        }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-semibold text-lg focus:outline-none"
      >
        <span className={theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"}>
          {question}
        </span>
        {isOpen ? (
          <FiChevronUp className={theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"} />
        ) : (
          <FiChevronDown className={theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"} />
        )}
      </button>
      {isOpen && (
        <p
          className={`mt-3 text-sm leading-relaxed transition-all duration-300 ${theme === "dark" ? "text-gray-400" : "text-gray-700"
            }`}
        >
          {answer}
        </p>
      )}
    </div>
  );
};

const FAQSection = () => {
  const { theme } = useContext(WebContext);

  const faqs = [
    {
      question: "How do I join a club?",
      answer:
        "Browse clubs in our platform, choose the one you like, and click 'Join'. For paid clubs, complete the secure Stripe payment, and you're in!",
    },
    {
      question: "Can I create my own club?",
      answer:
        "Yes! By signing up as a Club Manager, you can create and manage your own club, set membership fees, and organize events.",
    },
    {
      question: "How do I pay membership fees?",
      answer:
        "All paid memberships are handled securely through Stripe. You can pay using your preferred payment method and track your payments from your dashboard.",
    },
    {
      question: "What roles are available in ClubSphere?",
      answer:
        "There are three roles: Member (join clubs and events), Club Manager (create and manage clubs/events), and Admin (oversee the entire platform).",
    },
    {
      question: "Can I cancel my membership?",
      answer:
        "Yes, you can leave a club anytime. Refunds depend on the club's policies, which you can view before joining.",
    },
  ];

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
    <section
      className={`w-full py-16 transition-colors duration-300 ${theme === "dark" ? "bg-slate-900" : "bg-[#f9f5ef]"
        }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1
            className={`md:text-3xl text-2xl font-bold ${theme === "dark" ? "text-[#cd974c]" : "text-[#682626]"
              }`}
          >
            Frequently Asked Questions
          </h1>
          <div className="w-24 h-1 bg-[#cd974c] mx-auto mt-3 rounded-full"></div>
          <p
            className={`mt-4 sm:text-base text-sm max-w-xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-[#7a6a58]"
              }`}
          >
            Get answers to the most common questions about ClubSphere. If you still need help, reach out to our support team!
          </p>
        </div>

        {/* Split Layout: Image Left, FAQ Right */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Image */}
          <div className="lg:w-1/2 flex justify-center lg:justify-center pt-10">
            <img
              src={faqImage}
              alt="FAQ Illustration"
              className="rounded-2xl shadow-lg w-full max-w-md"
            />
          </div>

          {/* Right FAQ Items */}
          <div className="lg:w-1/2 space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                index={index}
                question={faq.question}
                answer={faq.answer}
                theme={theme}
              />
            ))}
          </div>
        </div>
      </div>
      {/* CTA Banner */}
      <div className={` w-full mt-15 py-12 rounded-3xl text-center ${theme === "dark" ? "bg-[#cd974c] text-slate-900" : "bg-[#682626] text-white"}`}>
        <h2 className="text-3xl font-bold mb-4">Ready to join a club?</h2>
        <p className="mb-6">Sign up today and start exploring the perfect community for you!</p>
        <button   onClick={handleClick}
 className={`px-8 py-3 rounded-full font-bold transition-all ${theme === "dark" ? "bg-slate-900 text-[#cd974c] hover:bg-slate-800" : "bg-white text-[#682626] hover:bg-[#f2ebe6]"}`}>
          Get Started
        </button>
      </div>
    </section>
  );
};

export default FAQSection;
