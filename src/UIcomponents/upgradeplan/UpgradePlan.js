import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import TICK from "../../assets/images/mdi_tick.png";
import BASIC from "../../assets/images/basic.png";
import Swal from "sweetalert2";
function UpgradePlan() {
  const [plans, setPlans] = useState([]);
  const apiUrl = process.env.REACT_APP_DB;
  const environment = process.env.REACT_APP_NODE_ENV;
  const userId=localStorage.getItem('user_id');
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
  var payNow = (response,  payDetails) => {
    // console.log(response.data.oder_id, "response.data.oder_id");
    var options = {
      key: "rzp_test_P7eTEWTbR1y2Sm",
      key_secret: "gFMj8IVEIJuIKBOEeqRzslPt",
      amount: 10 * 100,
      currency: "INR",
      name: "Get Photo Application",
      description: "Sample Razorpay demo",

      order_id: response.data.oder_id,
      //   image: "https://i.imgur.com/FApqk3D.jpeg",

      handler: function (response) {
        alert(response.razorpay_payment_id, "success");
        alert(response.razorpay_order_id, "success");
        alert(response.razorpay_signature, "success");
        subScriptionadd(payDetails);
       
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "+917416244195",
      },
      notes: {
        address: "Razorpay corporate office",
      },
      theme: {
        color: "#6466e3",
      },
    };
    var rzp1 = new window.Razorpay(options);

    rzp1.open();
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code, "response.error.code");
      alert(response.error.description, "response.error.description");
      alert(response.error.source, "response.error.source");
      alert(response.error.step, "response.error.step");
      alert(response.error.reason, "response.error.reason");
      alert(
        response.error.metadata.order_id,
        "response.error.metadata.order_id"
      );
      alert(
        response.error.metadata.payment_id,
        "response.error.metadata.payment_id"
      );
    });
  };
  const generateOrderId = async (payDetails) => {
    try {
      const response = await axios.post(
        `${apiUrl}oderId/save/oderId`,
        payDetails
      );
      // console.log("Server Response:", response.data);
      // console.log("Amount:", payDetails.amount);
      // console.log("Server Response:", response.data.oder_id);

      if (payDetails.amount && payDetails.planType) {
        payNow(response,  payDetails);
      } else {
        Swal.fire({
          title: "paydetails details ?",
          text: "paydetails details ?",
          icon: "info",
        });
      }
    } catch (error) {
      console.error("Error generating order ID:", error);
    }
  };
  useEffect(() => {
    getSubscriptionPlans();
  }, []);
  const upgradePlans = (plan) => {
     console.log(plan+"plan");
     const payDetails = plan;
     // console.log(payDetails + "payDetails");
     // console.log(payDetails.amount + "amount");
     const payDetailslist = {
       amount: payDetails.amount,
       planType: payDetails.planType,
       totalResumes: payDetails.totalResumes,
     };
     
     if (payDetailslist.amount) {
       generateOrderId(payDetailslist);
     } else {
       Swal.fire({
         title: "please select the plan details ?",
         text: "please select the plan details ?",
         icon: "info",
       });
     }
  };

  const subScriptionadd = async (payDetails) => {
    try {
      const response = await axios.post(
       ` ${apiUrl}subscriptions/upgrade/${userId}`,
        payDetails
      );
      Swal.fire({
        title: "form Submitted Successfully",
        text: "Data saved successfully",
        icon: "success",
      });
      // console.log("Server Response:", response.data.subscription_Id);
      // console.log("Amount:", payDetails.amount);
      // console.log("Server Response:", response.data.oder_id);

      //handleSubmitForm(e, response.data.subscription_Id);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: error.error,
        text: error.message,
        icon: "error",
      })
    }
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

     
    </div>
  );
}

export default UpgradePlan;
