import { useState, useRef } from 'react'
import UserItem from '../../shared/UserItem'
import { DotsThreeVertical, BookmarkSimple, ChatCircleDots, Heart, PaperPlaneRight } from 'phosphor-react'
import Input from '../../shared/Input'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper as SwiperCore } from 'swiper/types';
import {CaretLeft, CaretRight} from 'phosphor-react';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Abdelkrim = require('../../../assets/Abdelkrim.png')
const img1 = require('../../../assets/img1.jpeg')
const img2 = require('../../../assets/img2.jpeg')
const img3 = require('../../../assets/img3.jpeg')
const img4 = require('../../../assets/img4.jpeg')
const images = [img1,img2,img3,img4]

interface propsInterface{
    with?: boolean
}
function Post(props: propsInterface) {


  const [comment, setComment] = useState("");
  const swiperRef = useRef<SwiperCore>();  


  return (
    <div className='w-full bg-white rounded-2xl relative p-5 py-6'>
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
                <div className='flex w-full justify-between'>
                    <UserItem name='Abdelkrim Djerrah' text='Sun 14 May 1:19 PM' picture={Abdelkrim}/>
                    <div className='flex gap-1'>
                        <BookmarkSimple size={21} />
                        <DotsThreeVertical size={21} />
                    </div>
                </div>

                <p className='text-sm'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, a placeat provident cupiditate tenetur at magni! Quisquam nam voluptatem iusto eligendi in aliquam eius, adipisci sed, ipsam saepe, dolores facilis?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, a placeat provident cupiditate tenetur at magni! Quisquam nam voluptatem iusto eligendi in aliquam eius, adipisci sed, ipsam saepe, dolores facilis?
                </p>

                {props.with && (

                <div className='min-w-full h-[400px] object-fill overflow-hidden relative border rounded-2xl flex justify-center'>
                <Swiper
                  modules={[Navigation, Pagination, A11y]}
                  slidesPerView={1}
                  onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  onSlideChange={() => console.log('slide change')}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  {images.map((img) => (
                    <SwiperSlide
                      className='select-none'
                      key={img}
                    >
                      <div className='flex justify-center items-center h-[400px]'>
                        <img
                          src={img}
                          alt=""
                          className='max-h-full'
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>


                    <div className='absolute left-4 z-10 h-full flex items-center'>
                        <div className='navigationBtn' onClick={() => swiperRef.current?.slidePrev()}>
                            <CaretLeft size={30} />
                        </div>
                    </div>
                    
                    <div className='absolute right-4 z-10 h-full flex items-center'>
                        <div className='navigationBtn' onClick={() => swiperRef.current?.slideNext()}>
                            <CaretRight size={30} />
                        </div>
                    </div>
                    
                </div>
                )}

                <div className='text-sm items-center flex gap-3'>

                    <div className='flex gap-[2px] items-center'>
                        <Heart size={21}/>
                        <div className='flex gap-1'>
                            <p className='font-medium text-xs'>650</p>
                        </div>
                    </div>

                    <div className='flex gap-[2px] items-center'>
                        <ChatCircleDots size={21}/>
                        <div className='flex gap-1'>
                            <p className='font-medium text-xs'>650</p>
                        </div>
                    </div>


                </div>
                <div>
                    <Input
                        text="Write a comment ..."
                        type="text"
                        Icon={PaperPlaneRight}
                        widthFull
                        onChange={(v) => setComment(v)}
                        value={comment}
                        className="py-2 text-xs w-[250px]"
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post