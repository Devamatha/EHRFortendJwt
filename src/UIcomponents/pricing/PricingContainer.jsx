import React, { useEffect, useState } from "react";
import BASIC from "../../assets/images/basic.png";
import PRO from "../../assets/images/pro.png";
import BUSINESS from "../../assets/images/business.png";
import TICK from "../../assets/images/mdi_tick.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function PricingContainer() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const apiUrl=process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const getSubscriptionPlans = () => {
    axios
      .get(`${apiUrl}plan/getAll`)
      .then((response) => {
        // console.log(response.data);

        setPlans(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    getSubscriptionPlans();
  }, []);
  const upgradePlans = (plan) => {
    // console.log(plan+"plan");
    // console.log(JSON.stringify(plan)+"plan");
    navigate("/Signup", { state: { plan } });
  };
  return (
    <div className="pricing-div 2xl:mt-[3vh] py-[35px]  rounded-[20px] px-[31px] totalPage ">
      <div className="md:grid lg:grid-cols-3 md:grid-cols-2 gap-6   2xl:mb-[4vh] mb-[2vh] lg:mt-0 mt-12">
        {plans?.map((plan, index) => {
          return (
            <div
              className="card-container div1 col-span-1 bg py-9 md:mb-0 mb-8 rounded-[10px]"
              key={plan?.subscription_Id}
            >
              <div className="flex justify-center items-center">
                <img src={BASIC} alt="BASIC" className="w-[48px] h-[48px]" />
              </div>
              <h1 className="md:text-[28px] text-[18px] text-white font-medium text-center mt-1">
                {plan?.planType}
              </h1>
              <p className="text-white text-center md:text-[28px] text-[22px] font-medium">
                &#8377; {plan?.amount}{" "}
                <span className="md:text-[20px] text-[16px] font-normal">
                  /{plan?.planType}
                </span>
              </p>
              <p className="text-white text-center text-[16px] font-normal">
                These are the {plan?.planType} Plans
              </p>
              <div className="mx-7">
                <div className="border border-t-[#FFFFFF] my-4 "></div>
                <h1 className="text-white md:text-[16px] text-[14px] font-bold">
                  {plan?.discription}
                </h1>
                <div className="flex gap-2 mt-3">
                  <img src={TICK} alt="tick" className="w-[24px] h-[24px]" />
                  <p className="text-white text-[16px]">
                    {plan?.additionalFeatures}
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center mt-8">
                <button
                  className="getplan py-[10px] px-[12px] text-white text-[20px]"
                  onClick={() => upgradePlans(plan)}
                >
                  Get Plan
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center">
        <button className="text-white hover:text-[#1f1a43] px-[12px] py-[10px] bg-[#A132E6] hover:bg-[#c37fef] rounded-[4px] hover:font-bold">
          <a href="/About" className="text-light no-underline">Know More</a>
        </button>
      </div>
    </div>
  );
}

export default PricingContainer;
