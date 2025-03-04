import React from "react";
import { assets } from "../assets/assets";
import Title from "./Title";
const OurPolicy = () => {
  return (
    <div>
      <div className="text-center text-3xl py-8">
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit, reiciendis mollitia consequuntur corrupti
          numquam consequatur!
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-4 text-xs sm:text-sm md:text-base text-gray-700">
        <div>
          <img src={assets.exchange_icon} alt="" className="w-12 m-auto mb-5" />
          <p className="font-semibold">Easy Exchange Policy</p>
          <p className="text-gray-400">We offer hassle free exchange policy</p>
        </div>
        <div>
          <img src={assets.quality_icon} alt="" className="w-12 m-auto mb-5" />
          <p className="font-semibold">7 Days Return Policy</p>
          <p className="text-gray-400">We provide 7 days free return policy</p>
        </div>
        <div>
          <img src={assets.support_img} alt="" className="w-12 m-auto mb-5" />
          <p className="font-semibold">Best Customer Support</p>
          <p className="text-gray-400">We provide 24/7 customer support</p>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
