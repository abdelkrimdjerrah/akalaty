import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import { CaretLeft, CaretRight } from "phosphor-react";
import { Swiper as SwiperCore } from "swiper/types";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ImagesSliderProps {
  images: string[];
  initialSlide: number;
}

function ImagesSlider({ images,initialSlide }: ImagesSliderProps) { 

  const hasManyImages: boolean = images.length > 1;
  const swiperRef = useRef<SwiperCore>();
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const handleSlideChange = () => {
    const swiperInstance = swiperRef.current;
    if (swiperInstance) {
      setIsFirstSlide(swiperInstance.activeIndex === 0);
      setIsLastSlide(
        swiperInstance.activeIndex === swiperInstance.slides.length - 1
      );
    }
  };

  return (
    <div className="my-1 max-h-[500px] max-w-[500px] bg-white overflow-hidden relative border rounded-2xl flex justify-center">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        initialSlide={initialSlide}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        pagination={{ clickable: hasManyImages }}
        scrollbar={{ draggable: hasManyImages }}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => swiper}
      >
        {images.map((img: string, key: number) => (
          <SwiperSlide className="select-none" key={key}>
            <div className="h-full flex items-center">
              <img src={img} alt="" className=" object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {hasManyImages && (
        <>
          {!isFirstSlide && (
            <div className="absolute left-4 z-10 h-full flex items-center">
              <div
                className="navigationBtn"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <CaretLeft size={30} />
              </div>
            </div>
          )}

          {!isLastSlide && (
            <div className="absolute right-4 z-10 h-full flex items-center">
              <div
                className="navigationBtn"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <CaretRight size={30} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ImagesSlider;