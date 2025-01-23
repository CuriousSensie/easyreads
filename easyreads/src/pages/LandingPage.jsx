import React, { useState, useEffect } from 'react';
import LibraryImg from '../../public/library.jpg';
import Hero1 from '../../public/hero1.jpg';
import Hero2 from '../../public/hero2.jpg';
import Hero3 from '../../public/hero3.jpg';

const LandingPage = () => {
  const heroData = [
    {
      text1: "Dive into the world of books",
      text2: "FREE OF COST || NO ADS",  
      text3: "Sign Up / Log In to Get started now",
    }
  ];

  const [heroCount, setHeroCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prevCount) => (prevCount === 3 ? 1 : prevCount + 1));
    }, 3000); // Change hero image every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Blurred background */}
      <img
        className="w-full h-full blur-sm object-cover absolute top-0 left-0 right-0 bottom-0 -z-10"
        src={LibraryImg}
        alt="Library Background"
      />
      
      {/* Text and Hero Image */}
      <div className="flex w-full h-full flex-col lg:flex-row">
        {/* Hero image */}
        <div className="w-full lg:w-1/2 h-full py-4 flex justify-center items-center">
          {heroCount === 1 && <img className="w-48 h-80 sm:w-64 sm:h-96 lg:w-52 lg:h-96 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl" src={Hero1} alt="Hero 1" />}
          {heroCount === 2 && <img className="w-48 h-80 sm:w-64 sm:h-96 lg:w-52 lg:h-96 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl" src={Hero2} alt="Hero 2" />}
          {heroCount === 3 && <img className="w-48 h-80 sm:w-64 sm:h-96 lg:w-52 lg:h-96 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl" src={Hero3} alt="Hero 3" />}
        </div>

        {/* Text on the right side */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-start px-8 sm:px-16 text-white">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 transform transition-all duration-300 ease-in-out hover:text-slate-200">
            Welcome to
          </h1>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-200 mb-6 transform transition-all duration-300 ease-in-out hover:text-yellow-500">
            Easy Reads!
          </h1>
          {heroCount === 1 && <h2 className="text-xl sm:text-2xl font-bold">{heroData[0].text1}</h2>}
          {heroCount === 2 && <h2 className="text-xl sm:text-2xl font-bold">{heroData[0].text2}</h2>}
          {heroCount === 3 && <h2 className="text-xl sm:text-2xl font-bold">{heroData[0].text3}</h2>}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
