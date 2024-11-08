import React from 'react'
import SUBSCRIBE from '../../assets/images/male student confused.png'

function Subscribe() {
    return (
        <div className='subscribe-box rounded-[10px] totalPage'>
        <div className='lg:grid lg:grid-cols-5 gap-16'>
          <div className='col-span-2 flex lg:justify-end justify-center mr-[-1vh] order-1 lg:order-2 lg:py-0 py-9'>
            <img src={SUBSCRIBE} alt='SUBSCRIBE' className='md:w-[409px] w-[312px] md:h-[456px] h-[374px]' />
          </div>
          
          <div className='col-span-3 lg:pl-[5vh] lg:pb-0 pb-6 flex flex-col justify-center items-start  order-2 lg:order-1 lg:mx-0 md:mx-[8vh] mx-[1vh]'>
            <h1 className='font-bold md:text-[36px] text-[22px] text-white'>Stay Ahead with AI Trends</h1>
            <p className='md:text-[16px] text-[14px] text-white font-light mt-2'>
            Sign up for our newsletter to receive the latest updates and insights on artificial intelligence directly to your inbox            </p>
            <div className='flex 2xl:mt-[5vh] mt-[2vh]'>
              <input 
                type='text' 
                className='purple-bg rounded-tl-[4px] rounded-bl-[4px] border border-[#FFFFFF] md:w-[269px] w-[201px] md:h-[43px] h-[36px] outline-none p-2  text-white md:text-[20px] text-[14px]' 
                placeholder='Enter the E-Mail' 
              />
              <button className='gradient-button md:text-[20px] text-[16px] md:h-[43px] h-[36px] md:w-[121px] w-[90px]'>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      

    )
}

export default Subscribe