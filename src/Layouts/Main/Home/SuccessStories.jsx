import React, { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import WebContext from "../../../Context/WebContext";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const SuccessStories = () => {
  const { theme } = useContext(WebContext);

  const reviews = [
  {
    id: 1,
    userName: "Aisha Khan",
    user_email: "aisha.khan@example.com",
    user_photoURL: "https://i.ibb.co.com/Vphy2HYL/photo-1438761681033-6461ffad8d80-fm-jpg-q-60-w-3000-auto-format-fit-crop-ixlib-rb-4-1.jpg",
    review: "ClubSphere helped me find a local photography club. I love how easy it is to manage my membership and events!",
    rating: 5
  },
  {
    id: 2,
    userName: "Rohit Sharma",
    user_email: "rohit.sharma@example.com",
    user_photoURL: "https://i.ibb.co.com/0R7P3Vk0/confident-will-bring-change-to-business-designers-having-meeting-coffee-shop-confident-will-bring-ch.jpg",
    review: "Joining a hiking group through ClubSphere was effortless. The dashboard makes tracking events and payments so simple.",
    rating: 5
  },
  {
    id: 3,
    userName: "Emily Watson",
    user_email: "emily.watson@example.com",
    user_photoURL: "https://i.ibb.co.com/qYd1t4Sc/business-man-standing-his-mordern-business-23238168.jpg",
    review: "As a club manager, ClubSphere makes running events and memberships super efficient. Highly recommend it for organizers!",
    rating: 5
  },
  {
    id: 4,
    userName: "David Lee",
    user_email: "david.lee@example.com",
    user_photoURL: "https://i.ibb.co.com/WT6RDDp/business-man-city-portrait-street-travel-commute-confident-job-insurance-agency-person-accountant-sm.jpg",
    review: "The payment system via Stripe is smooth and secure. I never have to worry about membership fees being complicated.",
    rating: 5
  },
  {
    id: 5,
    userName: "Sara Ahmed",
    user_email: "sara.ahmed@example.com",
    user_photoURL: "https://i.ibb.co.com/ZpNZZsyn/successful-excited-young-mulatto-african-man-banker-bristle-successful-excited-young-mulatto-african.jpg",
    review: "ClubSphere connected me with amazing communities. I’ve joined multiple clubs and even organized my own events easily.",
    rating: 5
  }
];

  return (
    <section
      className={`w-full py-16 transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900" : "bg-purple-50/20"
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
            What People Say
          </h1>
          <div className="w-24 h-1 bg-[#cd974c] mx-auto mt-3 rounded-full"></div>
          <p
            className={`max-w-2xl mx-auto mt-4 sm:text-base text-sm ${
              theme === "dark" ? "text-gray-400" : "text-[#7a6a58]"
            }`}
          >
            Hear from our members who have discovered clubs, joined vibrant communities, and are now enjoying enriching social experiences worldwide.
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 200,
            scale: 0.9,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={review.id} className="max-w-md">
              <div
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className={`relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-2xl ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700 shadow-purple-900/10"
                    : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"
                }`}
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-8 text-[#cd974c]/20 text-5xl">
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={review.user_photoURL}
                    alt={review.userName}
                    className="w-16 h-16 rounded-full border-2 border-[#cd974c] p-0.5 object-cover"
                  />
                  <div>
                    <h4
                      className={`font-bold text-lg ${
                        theme === "dark" ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {review.userName}
                    </h4>
                    <p className="text-sm text-[#a9a9a9] font-medium">
                      {review.user_email}
                    </p>
                  </div>
                </div>

                {/* Story Content */}
                <p
                  className={`italic mb-6 leading-relaxed ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  "{review.review}"
                </p>

                {/* Star Rating */}
                <div className="flex gap-1 text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < review.rating
                          ? "fill-current"
                          : "text-gray-300 dark:text-gray-600"
                      }
                    />
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SuccessStories;
