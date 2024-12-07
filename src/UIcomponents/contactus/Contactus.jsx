

// import React, { useState } from 'react';
// import Header from '../header/Header';
// import Footer from '../footer/Footer';

// function Contactus() {


//   const [showPopup, setShowPopup] = useState(false);



//   return (
//     <div className='bg-img'>

//       <div className='max-w-1440  lg:w-[100%]  mx-auto  '>
//         <div className='px-[30px]'>
//         <Header />
//         </div>
//       <div className=' xl:px-[8vh] md:px-[20px] px-[10px]'>
//         <h1 className='text-center text-white font-bold md:text-[48px] text-[28px] 2xl:mt-[5vh] mt-[4vh]'>Contact Us</h1>
//         <div className='flex justify-center items-center'>
//           <div className='black-container 2xl:mt-[6vh] mt-[2vh] md:py-[70px] py-[18px] xl:px-[127px] md:px-[60px] px-[36px] rounded-[20px]'>
//             <p className='text-white md:text-[16px] text-[14px] md:text-center text-justify'>
//             We’re here to assist you with all your HR needs. Whether you have questions about our services, need support, or want to provide feedback, our team is ready to help. Reach out to us through the contact form below or via email, and we'll get back to you as soon as possible.            </p>
//           </div>
//         </div>
//         <div className='flex justify-center items-center'>
//           <div className='purple-bg w-full 2xl:mt-9 mt-[4vh] rounded-[20px] md:p-[100px] p-[24px]'>
//             <form>
//               <div className="w-full px-3 md:mb-6 mb-3">
//                 <label className="block tracking-wide md:text-[24px] text-[16px] text-white font-normal md:mb-2 mb-1" htmlFor="name">
//                   Enter your name
//                 </label>
//                 <input className="appearance-none block w-full bg-[#FFFFFF] rounded-[10px] text-gray-700 py-[12px] px-3 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" name="name" type="text"  required />
//               </div>
//               <div className="w-full px-3 md:mb-6 mb-3">
//                 <label className="block tracking-wide md:text-[24px] text-[16px] text-white font-normal md:mb-2 mb-1" htmlFor="email">
//                   Enter Mail ID
//                 </label>
//                 <input className="appearance-none block w-full bg-[#FFFFFF] rounded-[10px] text-gray-700 py-[12px] px-3 mb-3 leading-tight focus:outline-none focus:bg-white" id="email" name="email" type="text"  required />
//               </div>
//               <div className="w-full px-3 md:mb-6 mb-3 md:w-[100%]">
//                 <label className="block tracking-wide md:text-[24px] text-[16px] text-white font-normal md:mb-2 mb-1" htmlFor="comment">
//                   Comment Or Message
//                 </label>
//                 <textarea className="appearance-none block w-full rounded-[10px] bg-[#FFFFFF] text-gray-700 md:h-[200px] h-[180px] md:py-4 py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white" id="comment" name="comment" type="text" required></textarea>
//               </div>
//               <div className='flex items-center justify-center'>
//                 <button className='bg-[#A132E6] text-white px-[12px] py-[10px] rounded-[4px] mt-3 text-[20px]'>Know More</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       {showPopup && (
//         <div className='fixed inset-0 flex items-center justify-center z-50'>
//           <div className='bg-black p-6 rounded-lg shadow-lg'>
//             <p className='text-lg font-medium text-white'>Mail sent successfully!</p>
//           </div>
//         </div>
//       )}

//     </div>
//     <div className='2xl:mt-[20vh] mt-[12vh]'>
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default Contactus;




import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import Header from '../header/Header';
import Footer from '../footer/Footer';

function Contactus() {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });
  const [errors, setErrors] = useState({});
  const apiUrl=process.env.REACT_APP_DB;
const environment = process.env.REACT_APP_NODE_ENV;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors((prevErrors) => ({
  ...prevErrors,
  [name]: ''
}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors

    // Validate form fields
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Please enter your name.';
    if (!formData.email) newErrors.email = 'Please enter your email.';
    if (!formData.comment) newErrors.comment = 'Please enter a comment or message.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission if there are errors
    }

    try {
      // Send the data to the API
      const response = await axios.post(`${apiUrl}contacts/save`, {
        name: formData.name,
        email: formData.email,
        message: formData.comment
      });

      if (response.status === 200) {
        setShowPopup(true);
        setFormData({ name: '', email: '', comment: '' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className='bg-img totalPage'>
      <div className='max-w-1440 lg:w-[100%] mx-auto'>
        <div className='px-[30px]'>
          <Header />
        </div>
        <div className='xl:px-[8vh] md:px-[20px] px-[10px]'>
          <h1 className='text-center text-white font-bold md:text-[48px] text-[28px] 2xl:mt-[5vh] mt-[4vh]'>Contact Us</h1>
          <div className='flex justify-center items-center'>
            <div className='black-container 2xl:mt-[6vh] mt-[2vh] md:py-[70px] py-[18px] xl:px-[127px] md:px-[60px] px-[36px] rounded-[20px]'>
              <p className='text-white md:text-[16px] text-[14px] md:text-center text-justify'>
                We’re here to assist you with all your HR needs. Whether you have questions about our services, need support, or want to provide feedback, our team is ready to help. Reach out to us through the contact form below or via email, and we'll get back to you as soon as possible.
              </p>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <div className='purple-bg w-full 2xl:mt-9 mt-[4vh] rounded-[20px] md:p-[100px] p-[24px]'>
              <form onSubmit={handleSubmit}>
                <div className="w-full px-3 md:mb-6 mb-3 md:h-[90px] h-[80px]">
                  <label className="block tracking-wide md:text-[24px] text-[16px] text-white font-normal md:mb-2 mb-1" htmlFor="name">
                    Enter your name
                  </label>
                  <input
                    className="appearance-none block w-full bg-[#FFFFFF] rounded-[10px] text-gray-700 py-[12px] px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                </div>
                <div className="w-full px-3 md:mb-6 mb-3 md:h-[90px] h-[80px]">
                  <label className="block tracking-wide md:text-[24px] text-[16px] text-white font-normal md:mb-2 mb-1" htmlFor="email">
                    Enter Mail ID
                  </label>
                  <input
                    className="appearance-none block w-full bg-[#FFFFFF] rounded-[10px] text-gray-700 py-[12px] px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>
                <div className="w-full px-3 md:mb-6 mb-3 md:w-[100%] ">
                  <label className="block tracking-wide md:text-[24px] text-[16px] text-white font-normal md:mb-2 mb-1" htmlFor="comment">
                    Comment Or Message
                  </label>
                  <textarea
                    className="appearance-none block w-full rounded-[10px] bg-[#FFFFFF] text-gray-700 md:h-[200px] h-[180px] md:py-4 py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                  ></textarea>
                  {errors.comment && <p className="text-red-500 text-xs italic">{errors.comment}</p>}
                </div>
                <div className='flex items-center justify-center'>
                  <button className='bg-[#A132E6] text-white px-[12px] py-[10px] rounded-[4px] mt-3 text-[20px]'>Send Email</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {showPopup && (
          <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='bg-black p-6 rounded-lg shadow-lg'>
              <p className='text-lg font-medium text-white'>Mail sent successfully!</p>
            </div>
          </div>
        )}
      </div>
      <div className='2xl:mt-[20vh] mt-[12vh]'>
        <Footer />
      </div>
    </div>
  );
}

export default Contactus;