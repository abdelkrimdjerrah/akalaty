import React, { useState } from 'react'
import ImagesSlider from './ImagesSlider';
import Modal from '../shared/Modal';
import { X } from 'phosphor-react';

interface recipeImagesProps {
    images: string[];
}

const RecipeImages = ({images}: recipeImagesProps) => {


   const[showModal, setShowModal] = useState(false);
   const[initialSlide, setInitialSlide] = useState(0);

  return (
    <div>
        {
              images.length === 1 ? (
                <div className="h-[300px] w-[300px] overflow-hidden relative border rounded-2xl flex justify-center">
                    <img onClick={()=> {setShowModal(true);setInitialSlide(0)}} src={images[0]} alt="" className="object-cover cursor-pointer w-full" />
                </div>
            ) : images.length === 2 ? (
                <div className='flex flex-col gap-1'>
                    <div className="h-[150px] w-[300px] overflow-hidden relative border rounded-2xl flex justify-center">
                        <img onClick={()=> {setShowModal(true);setInitialSlide(0)}} src={images[0]} alt="" className="object-cover cursor-pointer w-full" />
                    </div>
                    <div className="h-[150px] w-[300px] overflow-hidden relative border rounded-2xl flex justify-center">
                        <img onClick={()=> {setShowModal(true);setInitialSlide(1)}} src={images[1]} alt="" className="object-cover cursor-pointer w-full" />
                    </div>
                </div>
            ) : images.length === 3 ? (
                <div className='flex gap-1'>
                    <div className="h-[300px] w-[150px] overflow-hidden relative  rounded-2xl flex justify-center">
                            <img onClick={()=> {setShowModal(true);setInitialSlide(0)}} src={images[0]} alt="" className="object object-cover cursor-pointer w-full" />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className="h-[150px] w-[150px] overflow-hidden relative  rounded-2xl flex justify-center">
                            <img onClick={()=> {setShowModal(true);setInitialSlide(1)}} src={images[1]} alt="" className="object object-cover cursor-pointer w-full" />
                        </div>
                        <div className="h-[150px] w-[150px] overflow-hidden relative  rounded-2xl flex justify-center">
                            <img onClick={()=> {setShowModal(true);setInitialSlide(2)}} src={images[2]} alt="" className="object-cover cursor-pointer w-full" />
                        </div>
                    </div>
                </div>
            ) : images.length === 4 ? (
                <div className='flex gap-1'>
                    <div className='flex flex-col gap-1'>
                        <div className="h-[150px] w-[150px] overflow-hidden relative  rounded-2xl flex justify-center">
                            <img onClick={()=> {setShowModal(true);setInitialSlide(0)}} src={images[0]} alt="" className=" object-cover cursor-pointer w-full" />
                        </div>
                        <div className="h-[150px] w-[150px] overflow-hidden relative  rounded-2xl flex justify-center">
                            <img onClick={()=> {setShowModal(true);setInitialSlide(1)}} src={images[1]} alt="" className="object-cover cursor-pointer w-full" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className="h-[150px] w-[150px] overflow-hidden relative  rounded-2xl flex justify-center">
                            <img onClick={()=> {setShowModal(true);setInitialSlide(2)}} src={images[2]} alt="" className=" object-cover cursor-pointer w-full" />
                        </div>
                        <div className="h-[150px] w-[150px] overflow-hidden relative  rounded-2xl flex justify-center">
                            <img onClick={()=> {setShowModal(true);setInitialSlide(3)}} src={images[3]} alt="" className="object-cover cursor-pointer w-full" />
                        </div>
                    </div>
                </div>
            ) : images.length > 4 ? (
                <div className='flex gap-1'>
                    <div className='flex flex-col gap-1'>
                        <div className="h-[150px] w-[150px] overflow-hidden relative  rounded-2xl flex justify-center">
                            <img onClick={()=> {setShowModal(true);setInitialSlide(0)}} src={images[0]} alt="" className=" object-cover cursor-pointer w-full" />
                        </div>
                        <div className="h-[150px] w-[150px] overflow-hidden relative  rounded-2xl flex justify-center">
                            <img onClick={()=> {setShowModal(true);setInitialSlide(1)}} src={images[1]} alt="" className="object-cover cursor-pointer w-full" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className="h-[150px] w-[150px] overflow-hidden relative  rounded-2xl flex justify-center">
                            <img onClick={()=> {setShowModal(true);setInitialSlide(2)}} src={images[2]} alt="" className=" object-cover cursor-pointer w-full" />
                        </div>
                        <div className="h-[150px] w-[150px] overflow-hidden relative  rounded-2xl flex justify-center">
                            <div className='h-[150px] w-[150px] flex items-center justify-center absolute'>
                                <div className=' z-20 text-xl text-white flex'>{`+`+(images.length - 4)}</div>
                            </div>
                            <div onClick={()=> {setShowModal(true);setInitialSlide(3)}} className='bg-red-300 bg-opacity-60 h-[150px] w-[150px] absolute z-10 backdrop-blur-[1px] cursor-pointer'></div>
                            <img src={images[3]} alt="" className="object-cover w-full " />
                        </div>
                    </div>
                </div>
            ) : null
         
        }

        {showModal && (
            <Modal
            closeModal={() => {
                setShowModal(false);
            }}
            >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full flex justify-center h-fit rounded-2xl relative"
            >
                <ImagesSlider images={images} initialSlide={initialSlide}/>

                {/* added this since we gave post slider full width to center in middle,
                and as we see , we already did e.stopPropagation to stop unmounting the modal if we touch on pictures,
                but we made the wide full ! so the right or left side has also e.stopPropagation   */}
                <div
                className="w-full absolute h-full"
                onClick={() => setShowModal(false)}
                />
            </div>
        </Modal>
      )}    

    </div>
  )
}

export default RecipeImages
