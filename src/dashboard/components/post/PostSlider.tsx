import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import { CaretLeft, CaretRight } from "phosphor-react";
import { Swiper as SwiperCore } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface PostSliderProps {
  images: string[];
}

function PostSlider({ images }: PostSliderProps) {

  const hasManyImages: boolean = images.length > 1;
  const swiperRef = useRef<SwiperCore>();

  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const handleSlideChange = () => {
    const swiperInstance = swiperRef.current;
    if (swiperInstance) {
      setIsFirstSlide(swiperInstance.activeIndex === 0);
      setIsLastSlide(swiperInstance.activeIndex === swiperInstance.slides.length - 1);
    }
  };
  
  return (
    <div className="min-w-full my-1 h-[400px] object-fill overflow-hidden relative border rounded-2xl flex justify-center">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        pagination={{ clickable: hasManyImages }}
        scrollbar={{ draggable: hasManyImages }}
        onSlideChange={() => handleSlideChange()}
        onSwiper={(swiper) => swiper}
      >
        {images.map((img: string, key: number) => (
          <SwiperSlide className="select-none" key={key}>
            <div className="flex justify-center items-center h-[400px]">
              <img src={img} alt="" className="max-h-full" />
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

export default PostSlider;

