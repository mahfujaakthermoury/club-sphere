import FeaturedClubs from "./FeaturedClubs";
import HeaderSlider from "./HeaderSlider";
import WhyChooseUs from "./WhyChooseUs";
import SuccessStories from "./SuccessStories";
import FAQSection from "./FAQSection";

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <HeaderSlider></HeaderSlider>
      <FeaturedClubs></FeaturedClubs>
      <WhyChooseUs></WhyChooseUs>
      <SuccessStories></SuccessStories>
      <FAQSection></FAQSection>
    
    </div>
  );
};

export default Home;
