
import FounderSection from "@/components/homepage/founder";
import Hero from "@/components/homepage/hero";
import Image from "next/image";

import AboutUs from "@/components/homepage/about-us";
import Wrapper from "@/helpers/wrapper";


export default function Home() {
  return (
    <div>
      <Wrapper>

      <Hero/>
      <FounderSection/>
 
        <AboutUs />
      </Wrapper>

    </div>
  );
}
