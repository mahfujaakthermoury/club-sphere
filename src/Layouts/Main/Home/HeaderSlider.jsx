import { useContext } from "react";
import { Link } from "react-router";
import slide1 from "../../../assets/banner1.png";
import slide2 from "../../../assets/banner2.png";
import slide3 from "../../../assets/banner3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import WebContext from "../../../Context/WebContext";

const HeaderSlider = () => {
  const { user } = useContext(WebContext);

  const slideContentStyle =
    "absolute inset-0 bg-gradient-to-r from-[#682626]/80 to-transparent flex items-center px-4 md:px-12 transition-all duration-500";

  return (
    <div className="w-full">
      <Swiper
        className="w-full shadow-lg overflow-hidden"
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {/* Slide 1 */}
        <SwiperSlide className="relative bg-[#e3dddd]">
          <img
            className="ml-auto w-[920px] lg:h-[600px] sm:h-[350px] h-[250px] object-cover"
            src={slide1}
            alt="clubsphere-community"
          />
          <div className={slideContentStyle}>
            <div className="text-white max-w-lg space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                Discover & Join Local Clubs with{" "}
                <span className="text-[#e3dddd]">ClubSphere</span>
              </h2>
              <p className="text-sm md:text-base opacity-90 hidden sm:block pr-5">
                Find photography, hiking, book, and tech clubs near you.
                Connect with people who share your passion.
              </p>
              <div className="pt-2">
                <Link
                  to={user ? "/dashboard/home" : "/login"}
                  className="bg-[#cd974c] text-white hover:bg-[#682626] px-6 py-2.5 rounded-full font-bold transition-transform hover:scale-105 inline-block shadow-lg"
                >
                  {user ? "Go to Dashboard" : "Explore Clubs"}
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="relative bg-[#e3dddd]">
          <img
            className="ml-auto w-[920px] lg:h-[600px] sm:h-[350px] h-[250px] object-cover"
            src={slide2}
            alt="clubsphere-events"
          />
          <div className={slideContentStyle}>
            <div className="text-white max-w-lg space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold">
                Join Events & Manage Memberships
              </h2>
              <p className="text-sm md:text-base opacity-90 hidden sm:block pr-5">
                Register for club events, pay membership fees securely and manage everything from your personal dashboard.
              </p>
              <div className="pt-2">
                <Link
                  to="/"
                  className="bg-[#cd974c] text-white hover:bg-[#682626] px-6 py-2.5 rounded-full font-bold transition-transform hover:scale-105 inline-block shadow-lg"
                >
                  View Events
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className="relative bg-[#e3dddd]">
          <img
            className="ml-auto w-[920px] lg:h-[600px] sm:h-[350px] h-[250px] object-cover"
            src={slide3}
            alt="clubsphere-management"
          />
          <div className={slideContentStyle}>
            <div className="text-white max-w-lg space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold">
                Manage Clubs with Ease
              </h2>
              <p className="text-sm md:text-base opacity-90 hidden sm:block pr-5">
                Club Managers can create clubs, set membership fees,
                organize events, and manage members.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="bg-[#cd974c] text-white hover:bg-[#682626] px-6 py-2.5 rounded-full font-bold transition-transform hover:scale-105 inline-block shadow-lg"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeaderSlider;
