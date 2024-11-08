import React from 'react'
import LOGO from '../../assets/images/logo.png'
import MAP from '../../assets/images/map.png'
import EMAIL from '../../assets/images/email.png'
import CALL from '../../assets/images/call.png'
import INSTA from '../../assets/images/insta.png'
import TWITTER from '../../assets/images/twitter.png'
import LINKEDIN from '../../assets/images/linkedin.png'
import FACEBOOK from '../../assets/images/facebook.png'

function Footer() {
    return (
        <footer className="bg-gradient-to-b from-[#341153] via-black to-black text-white lg:pt-14 pt-7 pb-2 totalPage">
            <div className="md:grid lg:grid-cols-8 md:grid-cols-8 gap-3 max-w-1440 lg:w-[100%]  mx-auto">
                <div className=' lg:col-span-2 col-span-3  flex 2xl:justify-start justify-center'>
                    <img src={LOGO} alt="Logo" className="w-[100px] h-[100px]" />
                </div>
                <div className="lg:col-span-2 col-span-2 lg:text-[20px]  text-[14px] md:block flex items-center justify-center gap-8 ">
                    <div className='mb-3'>
                        <a href="/About" className='text-light no-underline'>About Us</a>
                    </div>
                    <div className='mb-3'>
                        <a href="/Pricing" className='text-light no-underline'>Pricing</a>
                    </div>
                    <div className='mb-3'>
                        <a href="/Contactus" className='text-light no-underline'>Contact Us</a>
                    </div>
                </div>
                <div className="lg:col-span-2 col-span-3  md:mt-0 mt-6">
                    <h3 className="font-bold lg:text-[28px] text-[16px] lg:ml-7 ml-0 md:text-start text-center">Get In Touch</h3>
                    <div className='md:block flex justify-center items-center gap-4  mt-3'>
                        <div className='flex gap-2'>
                            <img src={MAP} alt='map' className='lg:w-[36px] w-[22px] lg:h-[36px] h-[22px]' />
                            <p className='lg:text-[18px] text-[14px]'>#1304, Shivalik Shilp,<br /> Iscon Cross Road,<br /> SG Highway, <br />Ahmedabad - 380054.</p>
                        </div>
                        <div className='flex gap-2 mt-3'>
                            <img src={MAP} alt='map' className='lg:w-[36px] w-[22px] lg:h-[36px] h-[22px] ' />
                            <p className='lg:text-[18px] text-[14px]'>#1304, Shivalik Shilp,<br /> Iscon Cross Road,<br /> SG Highway, <br />Ahmedabad - 380054.</p>
                        </div>
                    </div>
                </div>
                <div className=" lg:col-span-2 md:col-span-4 lg:ml-0 md:ml-[4vh] ml-[2vh] lg:mt-0 md:mt-[-28px] mt-12 md:block flex md:gap-0 gap-4">
                    <div>
                    <div className='flex gap-2 items-center mb-2'>
                        <img src={EMAIL} alt='email' className='w-[24px] h-[24px]' />
                        <p className='text-[18px]'>info@e-hr.com</p>
                    </div>
                    <div className='flex gap-2 items-center 2xl:pb-[19vh] lg:pb-[9vh] pb-4 '>
                        <img src={CALL} alt='call' className='w-[24px] h-[24px]' />
                        <p className='text-[18px]'>+91 8885023944</p>
                    </div>
                    </div>
                    <div className="flex md:space-x-4 space-x-2 items-center">
                        <a href="#">
                            <img src={FACEBOOK} alt='facebook' className='w-[36px] h-[36px]' />
                        </a>
                        <a href="#">
                            <img src={INSTA} alt='INSTA' className='w-[36px] h-[36px]' />
                        </a>
                        <a href="#">
                            <img src={TWITTER} alt='TWITTER' className='w-[36px] h-[36px]' />
                        </a>
                        <a href="#">
                            <img src={LINKEDIN} alt='LINKEDIN' className='w-[36px] h-[36px]' />
                        </a>
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-8 pt-4 flex justify-center items-center">
                <div className="flex space-x-6 lg:text-[18px] text-[14px]">
                    <p>© 2024 e-HR</p>
                    <a href="#" className='text-light no-underline'>Terms</a>
                    <a href="#" className='text-light no-underline'>Privacy</a>
                </div>
            </div>
        </footer>)
}

export default Footer