import React, { useEffect, useState } from "react";
// import "./Home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TICK from "../../assets/images/mdi_tick.png";
import BASIC from "../../assets/images/basic.png";

const Home = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const [hasNoData, setHasNoData] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const getSubscriptionPlans = () => {
    setisLoading(true);

    axios
      .get(`${apiUrl}plan/getAll`)
      .then((response) => {
        // console.log(response.data);

        setPlans(response.data);
        setHasNoData(response.data.length === 0);
        setisLoading(false);
      })
      .catch((error) => {
        setisLoading(false);

        // console.log(error);
      });
  };

  useEffect(() => {
    getSubscriptionPlans();
  }, []);

  const upgradePlans = (plan) => {
    // console.log(plan);

    navigate("/signup", { state: { plan } });
  };

  return (
    // <div className="plansparent totalPage">
    //   <div id="pricing-table">
    //     <div className="smaller"></div>

    //     {plans?.map((plan, index) => {
    //       return (
    //         <div key={plan?.subscription_Id}>
    //           <div className="plan plan3">
    //             <div className="header">{plan?.planType}</div>
    //             <div className="price">&#8377; {plan?.amount}</div>
    //             <div className="monthly">per month</div>
    //             <ul>
    //               <li>
    //                 <pre>Description</pre>
    //                 <p>{plan?.discription}</p>
    //               </li>
    //               <li>
    //                 <pre>Additional Features</pre>
    //                 <p>{plan?.additionalFeatures}</p>
    //               </li>
    //             </ul>
    //             <button className="signup" onClick={() => upgradePlans(plan)}>
    //               Sign up
    //             </button>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
    <div className="px-[1vh] mt-[7vh] mx-auto pricingContainerDetails ">
      {isLoading ? (
        // Spinner while loading
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : hasNoData ? (
        <div className="alert alert-warning text-center">No data found!</div>
      ) : (
        <div className=" 2xl:mt-[3vh] py-[35px]  rounded-[20px] px-[31px] totalPage  ">
          <div className="md:grid lg:grid-cols-3 md:grid-cols-2 gap-6   2xl:mb-[4vh] mb-[2vh] lg:mt-0 mt-12 ">
            {plans?.map((plan, index) => {
              return (
                <div
                  className="card-container div1 col-span-1 bg py-9 md:mb-0 mb-8 rounded-[10px]"
                  key={plan?.subscription_Id}
                >
                  <div className="flex justify-center items-center">
                    <img
                      src={BASIC}
                      alt="BASIC"
                      className="w-[48px] h-[48px]"
                    />
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
                      <img
                        src={TICK}
                        alt="tick"
                        className="w-[24px] h-[24px]"
                      />
                      <p className="text-white text-[16px]">
                        {plan?.additionalFeatures}
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex justify-center items-center mt-8">
                  <button
                    className="getplan py-[10px] px-[12px] text-white text-[20px] "
                    onClick={() => upgradePlans(plan)}
                  >
                    Get Plan
                  </button>
                </div> */}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
