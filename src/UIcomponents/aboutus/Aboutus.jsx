import React from 'react'
import Header from '../header/Header'
import ROBO1 from '../../assets/images/small chatbot talking on the phone.png'
import ROBO2 from '../../assets/images/chatbot with text messages.png'
import ROBO3 from '../../assets/images/young woman reading book and holding pen.png'
import Accordion from './Accordion'
import Subscribe from '../subscribe/Subscribe'
import Footer from '../footer/Footer'
import ROBOT from '../../assets/images/friendly robot assistant waving.png'
import CHATBOT1 from '../../assets/images/chatbot1.png'

function Aboutus() {
  return (
    <div className='bg-img'>
      <div className='max-w-1440  lg:w-[100%]  mx-auto  '>
        <div className='px-[30px]'>
          <Header />
        </div>
        <h1 className='text-center text-white font-bold md:text-[48px] text-[28px] 2xl:mt-[5vh] mt-[4vh] totalPage'>About Us</h1>
        <div className='relative flex justify-center items-center xl:px-[8vh] md:px-[1vh] px-[2vh]'>
          <div className='black-container  2xl:mt-[6vh] mt-[2vh] md:py-[70px] py-[18px] md:px-[127px] px-[36px] rounded-[20px]'>
            <p className='text-white md:text-[16px] text-[14px] md:text-center text-justify'>
              E-HR is a cutting-edge platform that leverages AI technology to transform workforce management. Our solutions streamline HR processes, enhance remote interviews, and optimize employee engagement, all from a single, intuitive interface.            </p>
            <img
              src={CHATBOT1}
              alt='HR Management'
              className='absolute 2xl:bottom-[20vh] lg:bottom-[10vh] md:bottom-[15vh] md:block hidden  left-0 md:w-[166px] w-[70px] md:h-[156px] h-[70px]'
            />
          </div>
        </div>
        <h1 className='text-center text-white font-bold md:text-[48px] text-[28px] 2xl:mt-[5vh] mt-[4vh]'>Why Choose Us?</h1>
        <div className=' flex justify-center items-center xl:px-[8vh] md:px-[1vh] px-[2vh]'>
          <div className='relative black-container  2xl:mt-[6vh] mt-[2vh] md:py-[70px] py-[18px] md:px-[127px] px-[36px] rounded-[20px] text-center'>
            <p className='text-white md:text-[16px] text-[14px]'>
              E-HR leverages cutting-edge AI technology to simplify and enhance workforce management. Our platform offers intuitive solutions for efficient recruitment, seamless remote interviews, and data-driven insights, all designed to streamline your HR processes and drive organizational success.            </p>
            <img
              src={ROBOT}
              alt="Robot"
              className='absolute right-[-3px] md:bottom-[-100px] bottom-[-70px] md:h-[150px] h-[102px] w-auto'
            />
          </div>
        </div>
        <div className=' flex justify-center items-center lg:px-[6vh] md:px-[4vh] px-[2vh]'>
          <div className='about-bg 2xl:mt-[13vh] md:mt-[8vh] mt-[12vh] rounded-[20px] p-[30px] '>
            <div className='lg:grid lg:grid-cols-5 gap-3'>
              <div className=' col-span-2 flex items-center justify-center'>
                <img src={ROBO1} alt='robo1' className='w-[372px] h-[313px]' />
              </div>
              <div className=' col-span-3 flex flex-col justify-center'>
                <h1 className='font-bold text-white md:text-[28px] text-[18px] lg:text-start text-center'>AI-HR</h1>
                <p className='text-white font-normal md:text-[16px] text-[14px] lg:text-start text-justify'>AI-HR leverages artificial intelligence to automate and enhance HR functions, such as recruitment, performance management, and employee engagement. It enables data-driven decision-making and improves efficiency in managing human resources.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=' flex justify-center items-center lg:px-[6vh] md:px-[4vh] px-[2vh]'>
          {/* <div className='about-bg  mt-[3vh] rounded-[20px] p-[30px] '>
            <div className='lg:grid lg:grid-cols-5 gap-3'>
            <div className='div1 col-span-3 flex flex-col justify-center'>
                <h1 className='font-bold text-white md:text-[28px] text-[18px] lg:text-start text-center'>Tech Assistance to HR</h1>
                <p className='text-white font-normal md:text-[16px] text-[14px] lg:text-start text-justify'>Leverage advanced technology to streamline HR processes, enhance efficiency, and make data-driven decisions, from recruitment to employee management.</p>
              </div>
              <div className=' col-span-2 flex items-center justify-center'>
                <img src={ROBO2} alt='robo1' className='w-[372px] h-[313px]' />
              </div>
             
            </div>
          </div> */}
          <div className='about-bg mt-[3vh] rounded-[20px] p-[30px]'>
            <div className=' gap-3 grid lg:grid-cols-5'>
              <div className='div1 col-span-3 flex flex-col justify-center lg:order-1 order-2'>
                <h1 className='font-bold text-white md:text-[28px] text-[18px] lg:text-start text-center'>
                  Tech Assistance to HR
                </h1>
                <p className='text-white font-normal md:text-[16px] text-[14px] lg:text-start text-justify'>
                  Leverage advanced technology to streamline HR processes, enhance efficiency, and make data-driven decisions, from recruitment to employee management.
                </p>
              </div>
              <div className='lg:col-span-2 col-span-3 flex items-center justify-center lg:order-2 order-1'>
                <img src={ROBO2} alt='robo1' className='w-[372px] h-[313px]' />
              </div>
            </div>
          </div>

        </div>
        <div className=' flex justify-center items-center lg:px-[6vh] md:px-[4vh] px-[2vh]'>
          <div className='about-bg  mt-[3vh] rounded-[20px] p-[30px] '>
            <div className='lg:grid lg:grid-cols-5 gap-3'>
              <div className=' col-span-2 flex items-center justify-center'>
                <img src={ROBO3} alt='robo1' className='w-[372px] h-[313px]' />
              </div>
              <div className=' col-span-3 flex flex-col justify-center'>
                <h1 className='font-bold text-white md:text-[28px] text-[18px] lg:text-start text-center'>HR Exam</h1>
                <p className='text-white font-normal md:text-[16px] text-[14px] lg:text-start text-justify'>The E-HR exam assesses your proficiency with E-HR systems and their role in contemporary HR practices. It focuses on essential topics like digital HR tools, AI integration, remote workforce management, and data-driven decision-making. The exam evaluates your skills in utilizing technology to enhance HR processes and implement strategic workforce management.</p>
              </div>
            </div>
          </div>
        </div>
        <h1 className='text-center text-white font-bold md:text-[48px] text-[28px] 2xl:mt-[5vh] mt-[3vh] lg:mx-0 md:mx-[4vh]'>Frequently Asked Questions </h1>
        <div className=' px-[1vh]'>
          <div className='about-bg mt-[3vh] rounded-[10px] py-[3vh] '>
            <Accordion />
          </div>
        </div>
        <div className='lg:mt-[10vh] mt-[3vh] mb-[1vh] px-[1vh]'>
          <Subscribe />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Aboutus