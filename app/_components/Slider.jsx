import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const Slider = ({ sliderList }) => {
  return (
    <Carousel>
      <CarouselContent>
        {sliderList.map((slider, index) => (
          <CarouselItem key={index}>
            <Image
              src={
                (process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
                  "http://localhost:1337") + slider?.image[0]?.url
              }
              width={1000}
              height={600}
              alt=""
              unoptimized
              className="w-full h-[200px]   md:h-[850px] object-cover rounded-2xl "
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Slider;
