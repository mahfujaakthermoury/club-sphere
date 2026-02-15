import React from 'react';
import { useNavigate } from 'react-router';
import Error404Img from "../assets/About/Error404.png"


const ErrorPage = () => {
     const navigate = useNavigate()
  return (
    <div>
        <div className="flex flex-col justify-center items-center mt-20 ">
            <img className="w-40 sm:w-[300px] md:w-[450px] lg:w-[550px] h-fit " src={Error404Img} alt="" />
            <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-3 md:mt-7 mb-2 ">OOPS!! Page NOT FOUND</h1>
            <p className="text-sm md:text-lg lg:text-xl text-center">
              The page you are looking for is not available.
            </p>
            <button
              onClick={() => navigate("/")}
              className="btn text-base md:text-xl py-4 md:py-6 mx-auto font-semibold bg-[#682626] text-[#ffffff] my-8"
            >
              Go Home
            </button>
          </div>
    </div>
  );
};

export default ErrorPage;