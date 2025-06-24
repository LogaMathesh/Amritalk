import { curve, heroBackground, robot } from "../assets";
import Button from "./Button";
import Section from "./Section";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { heroIcons } from "../constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import Generating from "./Generating";
import Notification from "./Notification";
import CompanyLogos from "./CompanyLogos";
import BlurText from "./ui/BlurText";




const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[-17rem] -mt-[-8.5rem]"
      crosses
      crossesOffset="lg:translate-y-[4.5rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <BlurText

text="Welcome Back, Student"

delay={500}

animateBy="words"

direction="top"

className="text-7xl mb-8"

/>
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
          
          </div>

          <BackgroundCircles />
        </div>

      </div>

      
    </Section>
  );
};

export default Hero;
