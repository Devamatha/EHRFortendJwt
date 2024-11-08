import React from 'react'
import Header from '../header/Header'
import PricingContainer from './PricingContainer'
import Subscribe from '../subscribe/Subscribe'
import Footer from '../footer/Footer'

function Pricing() {
  return (
    <div className='bg-img totalPage'>
      <div className=' max-w-1440 lg:w-[100%]  mx-auto px-[30px]'>
        <Header />
        </div>

        <h1 className='text-center text-white font-bold md:text-[48px] text-[28px] 2xl:mt-[5vh] mt-[4vh]'>Our Pricing Plan</h1>
        <div className='max-w-1440 lg:w-[100%] flex justify-center items-center xl:px-[8vh] md:px-[1vh] px-[2vh]'>
          <div className='black-container  2xl:mt-[6vh] mt-[2vh] md:py-[70px] py-[18px] md:px-[127px] px-[36px] md:text-center text-justify rounded-[20px]'>
            <p className='text-white md:text-[16px] text-[14px]'>
            Explore flexible and transparent pricing options designed to fit businesses of all sizes. Choose from a range of plans tailored to your HR needs, including features like advanced AI analytics, seamless integration with existing systems, and dedicated support. Whether you're a small business or a large enterprise, our pricing models ensure you get the best value for cutting-edge HR solutions. Contact us for a personalized quote and discover how our AI-powered tools can transform your HR operations.
            </p>

          </div>
        </div>
      <h1 className='text-center text-white font-bold md:text-[48px] text-[28px] 2xl:my-[5vh] my-[3vh]'>Why Choose Us?</h1>
      <div className='px-[1vh] mt-[7vh]  max-w-1440 lg:w-[100%]  mx-auto'>
        <PricingContainer />
        <div className='2xl:mt-[15vh] mt-[7vh] mb-[1vh]'>
          <Subscribe />
        </div>
      </div>
      <Footer />

    </div>)
}

export default Pricing