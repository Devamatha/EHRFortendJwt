
import React, { useState, useEffect } from 'react';
import SEND from '../../assets/images/Group.png';
import MAN from '../../assets/images/man.png';
import HEAD from '../../assets/images/Vector.png';
import YOUNGMAN from '../../assets/images/young man surrounded by gadgets writing notes.png';
import WOMEN from '../../assets/images/woman working with robot assistant.png';

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const sliders = [
    {
      id: 1,
      heading: "Smart Online Interviews with AI",
      description: '"Streamline Remote Interviews with AI-Enhanced Precision."',
      buttons: [
        { label: "Get Started Today", icon: SEND },
        { label: "Learn More", icon: HEAD },
      ],
      image: MAN,
    },
    {
      id: 2,
      heading: "Examinees preparing for assessments",
      description: '" Advanced Skill Testing with AI"',
      buttons: [
        { label: "Get Started Today", icon: SEND },
        { label: "Learn More", icon: HEAD },
      ],
      image: YOUNGMAN,
    },
    {
      id: 3,
      heading: "Smart AI Support for Human Resource Functions",
      description: '"Transform HR operations with AI solutions tailored for you."',
      buttons: [
        { label: "Get Started Today", icon: SEND },
        { label: "Learn More", icon: HEAD },
      ],
      image: WOMEN,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % sliders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [sliders.length]);

  const handleStepperClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative w-full overflow-hidden 2xl:h-[450px] xl:h-[600px] lg:h-[520px] md:h-[750px] h-[500px] totalPage">
      <div className="flex flex-col transition-transform duration-500 ease-in-out">
        {sliders.map((slider, index) => (
          <div
            key={slider.id}
            className="w-full"
            style={{ transform: `translateY(-${activeIndex * 100}%)` }}
          >
            <div className="lg:pl-[3vh] lg:grid lg:grid-cols-10">
              <div className="div2 col-span-4 lg:order-2 order-1 flex justify-center items-center">
                <img
                  src={slider.image}
                  alt="slider"
                  className="md:w-full  md:h-[454px] h-[260px]"
                />
              </div>

              <div className="div1 col-span-5 lg:order-1 order-2 lg:flex lg:flex-col lg:justify-center lg:h-auto h-[300px]">
                <h1 className="text-white md:text-[48px] text-[28px] font-bold  lg:text-start text-center">
                  {slider.heading}
                </h1>
                <p className="text-white md:text-[24px] text-[16px] lg:text-start text-center">{slider.description}</p>
                <div className="flex lg:justify-start justify-center gap-5 mt-5">
                  {slider.buttons.map((button, btnIndex) => (
                    <div
                      key={btnIndex}
                      className="hover-bg-gradient-hover cursor-pointer flex items-center justify-center border gap-2 w-auto h-[44px] rounded-[4px] md:px-[12px] px-[5px] py-[10px]"
                    >
                      <img
                        src={button.icon}
                        alt="button-icon"
                        className="w-[19.5px] h-[17.5px]"
                      />
                      {/* <p className="text-white md:text-[20px] text-[16px]">{button.label}</p> */}
                      <div className='flex justify-center items-center'>
                            <span className='text-white md:text-[20px] text-[16px]' >{button.label}</span>
                            </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="div3 col-span-1 flex items-center justify-center lg:order-3 order-3 hidden lg:block">
                <div className="hidden lg:block flex items-center justify-center">
                  <ol className="vertical relative text-black-500 border-s border-[#A132E6] dark:border-gray-700 dark:text-black-400 mt-4 ml-8 2xl:h-[250px]  2xl:mt-[10vh] mt-[6vh]">
                    {[1, 2, 3].map((year, index) => (
                      <li
                        key={year}
                        className={`xl:mb-14 lg:mb-8 ms-6 year-item h-[7vh]`}
                        onClick={() => handleStepperClick(index)}
                      >
                        <span className="stepper border border-[#A132E6] cursor-pointer absolute flex items-center bg-[#09001e] justify-center xl:w-[48px] p-[10px] rounded-full xl:-start-6 lg:-start-4 text-white">
                          <p className="text-[12px] font-bold">{year}</p>
                        </span>
                        <h3 className="text-[#18213b]">.</h3>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4 md:hidden block">
        {sliders.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${activeIndex === index ? "bg-[#9B28E2]" : "bg-white"
              }`}
            onClick={() => handleStepperClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;





