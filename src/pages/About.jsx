import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Born from a desire to redefine the digital shopping experience, Luxe
            serves as a premier global e-marketplace that seamlessly bridges the
            gap between the world's most visionary designers and discerning
            individuals who refuse to compromise on quality, style, or
            authenticity.
          </p>
          <p>
            Every single brand and artisan featured on our platform is
            meticulously vetted to ensure that their commitment to exceptional
            craftsmanship, sustainable practices, and timeless elegance aligns
            perfectly with the sophisticated standards our global community has
            come to expect.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            By combining a beautifully intuitive user interface with dedicated,
            premium customer care and secure, worldwide white-glove delivery,
            Luxe transforms traditional online shopping into an effortless,
            elevated journey tailored to the modern lifestyle.
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            To guarantee an unparalleled marketplace experience, Luxe implements
            a rigorous, multi-tiered vetting process where every single product
            undergoes meticulous authentication and quality inspection by
            industry experts before it ever reaches our digital storefront.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convinience</b>
          <p className="text-gray-600">
            Believing that true luxury extends far beyond the product itself,
            our dedicated, round-the-clock concierge team is deeply committed to
            providing personalized, high-touch support that anticipates and
            elegantly resolves your every need at any stage of your shopping
            journey.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            By integrating a highly intuitive, frictionless user interface with
            seamless, secure payment options and expedited premium worldwide
            delivery, Luxe effortlessly transforms the complexities of global
            e-commerce into a smooth, one-click shopping experience from the
            comfort of your home.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
