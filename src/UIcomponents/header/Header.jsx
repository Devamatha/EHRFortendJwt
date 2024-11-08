import React, { useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import LOGO from '../../assets/images/logo.png'
import HEAD from '../../assets/images/Vector.png'
import TOGGLE from '../../assets/images/toggle.png'

function Header() {
    const [isMenuOpen,setIsMenuOpen] = useState('')
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isContactus = location.pathname === '/Contactus';
    const isPricing = location.pathname === '/Pricing';
    const isAbout = location.pathname === '/About';
    return (
        <div className='md:pt-3 totalPage'>
            <div className="overflow-hidden w-full">
                <nav className="flex flex-wrap items-center justify-between w-[100%] ">
                    <div className="flex items-center justify-between lg:w-[30%] w-[100%]">
                        <a onClick={() => navigate("/")} className="flex lg:justify-center  justify-start w-full lg:w-auto">
                            <img
                                src={LOGO}
                                alt='logo'
                                className="w-[100px] h-[100px] cursor-pointer"
                            />
                        </a>

                        <img
                        src={TOGGLE}
                            alt='toggle'
                            className="h-[30px] w-[30px] cursor-pointer lg:hidden block"
                            onClick={toggleMenu}
                        />
                    </div>
                    <div className={`w-full rounded-[10px] lg:flex lg:justify-between lg:items-center lg:pb-0 pb-4 lg:w-[70%] ${isMenuOpen ? "block black-container pl-4" : "hidden"}`} id="menu">
                        <div>
                        <ul className="pt-4 text-base lg:flex lg:justify-between lg:pt-0 justify-center items-center 2xl:gap-[8vh] xl:gap-[5vh] lg:gap-[2vh]">
                            <li className='cursor-pointer' onClick={() => navigate("/About")}>
                                <a className={` py-2 block lg:text-[20px] md:text-[15px] text-[12px]  ${isAbout ? 'text-[#c445fe]' : 'text-white'} font-normal hover:text-[#c445fe]`}>About Us</a>
                            </li>
                            <li className='cursor-pointer' onClick={() => navigate("/Pricing")}>
                                <a className={` py-2 block lg:text-[20px] md:text-[15px] text-[12px] font-medium ${isPricing ? 'text-[#c445fe]' : 'text-white'} hover:text-[#c445fe]`}>Pricing</a>
                            </li>

                            <li className='cursor-pointer' onClick={() => navigate("/Contactus")}>
                                <a className={` py-2 block lg:text-[20px]  md:text-[15px] text-[12px] font-medium ${isContactus ? 'text-[#c445fe]' : 'text-white'} hover:text-[#c445fe]`}>Contact Us</a>
                            </li>

                        </ul>
                        </div>
                        <div className='lg:flex gap-5 '>
                        <div className='flex items-center justify-center gap-2 border  hover-bg-gradient-hover rounded-[4px] lg:w-[108px] w-[100px] lg:h-[46px] h-[35px] cursor-pointer ' onClick={()=>navigate('/Login')}>
                            <img src={HEAD} className='w-[16px] h-[16px]' />
                            <div className='flex justify-center items-center'>
                            <span className='text-white lg:text-[20px] md:text-[15px] text-[12px]' >Login</span>
                            </div>
                        </div>
                        <div className='flex items-center lg:mt-0 mt-[1vh] justify-center gap-2 border hover-bg-gradient-hover rounded-[4px] lg:w-[131px] w-[100px] lg:h-[44px] h-[35px] cursor-pointer' onClick={()=>navigate('/Pricing')}>
                            <img src={HEAD} className='w-[16px] h-[16px]' />
                            <div className='flex justify-center items-center'>
                            <span className='text-white lg:text-[20px] md:text-[15px] text-[12px]' >Register</span>
                            </div>                        </div>
                    </div>
                    </div>

                   


                </nav>
            </div>
        </div>)
}

export default Header