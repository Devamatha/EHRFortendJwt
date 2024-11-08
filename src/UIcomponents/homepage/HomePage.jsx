import React, { useState } from 'react'
import Header from '../header/Header'
import CHATBOT from '../../assets/images/chatbot.png'
import BRAIN from '../../assets/images/brain.png'
import BULB from '../../assets/images/bulb.png'
import NOTEBOOK from '../../assets/images/notebook.png'
import CHATBOTROBOT from '../../assets/images/chatgptrobot.png'
import PricingContainer from '../pricing/PricingContainer'
import Subscribe from '../subscribe/Subscribe'
import Footer from '../footer/Footer'
import ROBOT from '../../assets/images/friendly robot assistant waving.png'
import Carousel from './Carousel'

function HomePage() {

  return (
    <div className='bg-img totalPage'>
      <div className=' max-w-1440 lg:w-[100%]  mx-auto'>
        <div className=' max-w-1440 lg:w-[100%]  mx-auto px-[30px]'>
          <Header />
        </div>
        <div className='relative flex items-center justify-center'>
          <div className='xl:mx-[200px] lg:mx-0 md:mx-[20px] text-center mt-[5vh]'>
            <h1 className='font-bold text-[#c445fe] md:text-[48px] text-[28px] md:leading-[56px] leading-[32.79px]'>
            Revolutionize Workforce Management with AI-Driven E-HR Solutions
            </h1>
            <p className='text-white md:text-[20px] text-[16px] mt-4 leading-[23.42px]'>
            Streamline Operations, Empower Your Team, and Scale with Our AI-Driven HR Solution.
            </p>
          </div>
          <img
            src={CHATBOT}
            alt='HR Management'
            className='absolute lg:bottom-0 md:bottom-[10vh] bottom-[5vh] xl:right-9 lg:right-2 right-0 md:w-[166px] w-[70px] md:h-[156px] h-[70px]'
          />
        </div>

        <div className='mx-[1vh] 2xl:my-[5vh] lg:my-[2vh] my-[5vh]'>
          <Carousel />

        </div>
        <div>
          <h1 className='font-bold md:text-[48px] text-[28px] text-white text-center mt-4'>Why Choose Us?</h1>
        </div>
        <div className='max-w-1440 lg:w-[100%] flex justify-center items-center xl:px-[8vh] md:px-[1vh] px-[2vh]'>
          <div className='relative black-container w-[1105px]  my-[2vh] py-[70px] md:px-[127px] px-[20px] rounded-[20px]'>
            <p className='text-white text-[16px] text-center'>
            E-HR leverages cutting-edge AI technology to simplify and enhance workforce management. Our platform offers intuitive solutions for efficient recruitment, seamless remote interviews, and data-driven insights, all designed to streamline your HR processes and drive organizational success.            </p>
            <img
              src={ROBOT}
              alt="Robot"
              className='absolute right-[-3px] bottom-[-100px] h-[150px] w-auto'
            />
          </div>
        </div>
        <div className='lg:grid lg:grid-cols-3 gap-3 2xl:mb-[7vh] mb-[4vh] 2xl:mt-[10vh] md:mt-[4vh] mt-[12vh] mx-[1vh]'>
          <div className='card-container col-span-1 bg py-9 rounded-[10px] lg:mb-0 mb-9'>
            <div className='flex justify-center items-center'>
              <img src={BRAIN} alt='brain' className='w-[48px] h-[48px]' />
            </div>
            <h1 className='text-[24px] text-white font-medium text-center mt-1'>AI-HR</h1>
            <p className='text-white text-[16px] font-normal text-center lg:mx-[28px] mt-5'>AI-HR leverages artificial intelligence to automate and enhance HR functions, such as recruitment, performance management, and employee engagement. It enables data-driven decision-making and improves efficiency in managing human resources.</p>
            <p className='text-[20px] text-white hover:text-[#1f1a43] text-center mt-6 font-normal cursor-pointer'><a  href="/About" className='text-light no-underline'>Know More</a></p>
          </div>



          <div className='card-container col-span-1 bg py-9 rounded-[10px] lg:mb-0 mb-9'>
            <div className='flex justify-center items-center'>
              <img src={BULB} alt='bulb' className='w-[48px] h-[48px]' />
            </div>
            <h1 className='text-[24px] text-white font-medium text-center mt-1'>Tech Assistance To HR</h1>
            <p className='text-white text-[16px] font-normal text-center mx-[28px] mt-5'>Leverage advanced technology to streamline HR processes, enhance efficiency, and make data-driven decisions, from recruitment to employee management.
            </p>
            <p className='text-[20px] text-white hover:text-[#1f1a43] text-center mt-6 font-normal cursor-pointer '><a  href="/About" className='text-light no-underline'>Know More</a></p>

          </div>
          <div className='card-container col-span-1 bg py-9 rounded-[10px]'>
            <div className='flex justify-center items-center'>
              <img src={NOTEBOOK} alt='NOTEBOOK' className='w-[48px] h-[48px]' />
            </div>
            <h1 className='text-[24px] text-white font-medium text-center mt-1'>HR Exam</h1>
            <p className='text-white text-[16px] font-normal text-center mx-[28px] mt-5'>The E-HR exam assesses your proficiency with E-HR systems and their role in contemporary HR practices. It focuses on essential topics like digital HR tools, AI integration, remote workforce management, and data-driven decision-making. The exam evaluates your skills in utilizing technology to enhance HR processes and implement strategic workforce management.</p>
            <p className='text-[20px] text-white text-center hover:text-[#1f1a43] mt-6 font-normal cursor-pointer'><a  href="/About" className='text-light no-underline'>Know More</a></p>

          </div>
        </div>
        <div>
          <h1 className='text-center font-bold md:text-[48px] text-[28px] text-white'>Our Pricing Plans</h1>
        </div>
        <div className='max-w-1440 lg:w-[100%] flex justify-center items-center xl:px-[8vh] md:px-[1vh] px-[2vh]'>
          <div className='relative black-container w-[1105px]  2xl:my-[5vh] my-[3vh] py-[70px] md:px-[127px] px-[20px] rounded-[20px]'>
            <p className='text-white text-[16px] text-center'>
            Explore flexible and transparent pricing options designed to fit businesses of all sizes. Choose from a range of plans tailored to your HR needs, including features like advanced AI analytics, seamless integration with existing systems, and dedicated support. Whether you're a small business or a large enterprise, our pricing models ensure you get the best value for cutting-edge HR solutions. Contact us for a personalized quote and discover how our AI-powered tools can transform your HR operations.
            </p>
            <img
              src={ROBOT}
              alt="Robot"
              className='absolute right-[-3px] bottom-[-100px] h-[150px] w-auto'
            />
          </div>
        </div>
        <div className='mx-[1vh] mt-[8vh]'>
          <PricingContainer />

        </div>
        <div>
          <h1 className='font-bold md:text-[48px] text-[28px] text-white text-center 2xl:my-[5vh] my-[3vh]'>About Us</h1>
        </div>
        <div className='lg:grid lg:grid-cols-5 gap-16  purple-bg rounded-[12px] mb-[5vh] xl:mx-[7vh] mx-[2vh]  lg:pl-[65px] md:py-[16px] py-0 lg:pr-[30px]'>
          <div className=' col-span-3 flex flex-col justify-center rounded-[10px] px-5 lg:mt-0 mt-4'>
            <div className='flex justify-center lg:justify-left '>
            <h2 className='font-bold text-white text-[36px]  leading-[42.16px] '>Empowering HR through Cutting-Edge AI Technology</h2>

            </div>
            <p className='font-normal text-white text-[16px] my-8 lg:text-start text-justify'>E-HR is a cutting-edge platform that leverages AI technology to transform workforce management. Our solutions streamline HR processes, enhance remote interviews, and optimize employee engagement, all from a single, intuitive interface</p>
            <div className='flex lg:justify-start justify-center'>
              <button className='text-white w-[136px] py-[10px] rounded-[4px] text-[20px] bg-[#a433e4]'><a  href="/About" className='text-light no-underline'>Know More</a></button>
            </div>
          </div>
          <div className=' col-span-2   py-9 rounded-[10px] flex lg:justify-end justify-center lg:mt-3'>
            <img src={CHATBOTROBOT} alt='CHATBOTROBOT' className='lg:w-[487px] w-[300px] lg:h-[456px]' />
          </div>
        </div>


      </div>
      <div className='pb-4 mx-auto max-w-full max-w-1440 lg:w-[100%] px-[1vh]'>
        <Subscribe />
      </div>
      <Footer />

    </div>
  )
}

export default HomePage