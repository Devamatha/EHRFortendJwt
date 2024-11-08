import React, { useState, useRef, useEffect } from 'react';

function Accordion() {
    const [openIndex, setOpenIndex] = useState(null);
    const contentRefs = useRef([]);

    useEffect(() => {
        contentRefs.current.forEach((ref, index) => {
            if (ref) {
                ref.style.maxHeight = index === openIndex ? `${ref.scrollHeight}px` : '0';
            }
        });
    }, [openIndex]);

    const handleToggle = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return (
        <div className=''>
            <div className='lg:px-[123px] md:px-[55px] px-[16px] py-[67px]  rounded-lg totalPage'>
                {accordionData.map((item, index) => (
                    <div key={index} className="w-full bg-white border-2 border-[#C883F2] mb-3 rounded-[10px]">
                        <div
                            className="w-full bg-white text-dark flex justify-between px-4 py-8 cursor-pointer rounded-[10px]"
                            onClick={() => handleToggle(index)}>
                            <span ><p className='md:text-[20px] text-[12px]'>{item.title}</p></span>
                            <div className='flex items-center justify-center w-7 h-7 border border-black rounded-full'>
                                <span className='text-[26px]'>{openIndex === index ? '-' : '+'}</span>
                            </div>
                        </div>
                        <div
                            ref={(el) => contentRefs.current[index] = el}
                            className={`accordion-content overflow-hidden ${openIndex === index ? 'accordion-content-open' : 'accordion-content-closed'}`}>
                            <div className="px-4 py-3 md:text-[14px] text-[11px]">
                                {item.content}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const accordionData = [
    {
        title: "How much does E HR premium cost ?",
        content: "The cost of an E HR (Electronic Human Resources) premium plan can vary widely depending on the provider and the specific features included. Generally, these costs can range from a few hundred to several thousand dollars per year. It's best to check with the specific E HR service provider for accurate pricing details."
    },
    {
        title: "Is there a monthly fee for this E HR service?",
        content: "The fee structure for an EHR (Electronic Health Record) service can vary widely depending on the provider. Many EHR systems have monthly subscription fees, which can depend on factors like the size of the practice, the number of users, and the features required. Some providers might offer different pricing tiers or packages. It's best to contact the specific EHR service provider you're interested in for detailed pricing information."
    },
    {
        title: "Can I cancel my subscription at any time?",
        content: "Yes, you can cancel your subscription at any time."
    },
    {
        title: "Lorem ipsum dolor sit amet consectetur.",
        content: "Lorem ipsum dolor sit amet consectetur. Adipiscing ultrices lacus pretium varius nibh tortor ac. Arcu sed viverra maecenas quis tortor tristique. Erat vestibulum et elit quis. Enim a volutpat nisi quam cursus enim ac amet facilisis.Lorem ipsum dolor sit amet consectetur. Adipiscing ultrices lacus pretium varius nibh tortor ac. Arcu sed viverra maecenas quis tortor tristique. Erat vestibulum et elit quis. Enim a volutpat nisi quam cursus enim ac amet facilisis.Lorem ipsum dolor sit amet consectetur. Adipiscing ultrices lacus pretium varius nibh tortor ac. Arcu sed viverra maecenas quis tortor tristique. Erat vestibulum et elit quis. Enim a volutpat nisi quam cursus enim ac amet facilisis."
    }
];

export default Accordion;
