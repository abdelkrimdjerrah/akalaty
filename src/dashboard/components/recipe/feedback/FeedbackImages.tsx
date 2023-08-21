import { useState } from 'react'
import ImagesSlider from '../ImagesSlider';
import Modal from '../../shared/Modal';

interface FeedbackImagesProps {
    images: string[];
}

const FeedbackImages = ({images}: FeedbackImagesProps) => {


   const[showModal, setShowModal] = useState(false);
   const[initialSlide, setInitialSlide] = useState(0);

  return (
    <div className='min-w-[303px]'>
        {
                images.length == 1 ? (
                    <div className='h-[50px] w-[50px] gap-2 overflow-hidden relative border rounded-lg flex justify-center'>
                        <img onClick={()=> {setShowModal(true);setInitialSlide(0)}} src={images[0]} alt="" className="object-cover cursor-pointer w-full" />
                   </div>            
    
            ) : images.length == 2 ? (
            
                
                <div className="flex gap-2">
                    <div className='h-[50px] w-[50px] gap-2 overflow-hidden relative border rounded-lg flex justify-center'>
                            <img onClick={()=> {setShowModal(true);setInitialSlide(0)}} src={images[0]} alt="" className="object-cover cursor-pointer w-full" />
                    </div>
                    <div className='h-[50px] w-[50px] gap-2 overflow-hidden relative border rounded-lg flex justify-center'>
                            <img onClick={()=> {setShowModal(true);setInitialSlide(1)}} src={images[1]} alt="" className="object-cover cursor-pointer w-full" />
                    </div>   
                </div>

            ) : images.length == 3 ? (
                
                <div className="flex gap-2">
                    <div className='h-[50px] w-[50px] gap-2 overflow-hidden relative border rounded-lg flex justify-center'>
                            <img onClick={()=> {setShowModal(true);setInitialSlide(0)}} src={images[0]} alt="" className="object-cover cursor-pointer w-full" />
                     </div>
                     <div className='h-[50px] w-[50px] gap-2 overflow-hidden relative border rounded-lg flex justify-center'>
                            <img onClick={()=> {setShowModal(true);setInitialSlide(1)}} src={images[1]} alt="" className="object-cover cursor-pointer w-full" />
                     </div>
                     <div className='h-[50px] w-[50px] gap-2 overflow-hidden relative border rounded-lg flex justify-center'>
                            <img onClick={()=> {setShowModal(true);setInitialSlide(2)}} src={images[2]} alt="" className="object-cover cursor-pointer w-full" />
                     </div>
                </div>
              
            ) : images.length > 3 ? (
                <div className='flex gap-2'>
                        <div className='h-[50px] w-[50px] gap-2 overflow-hidden relative border rounded-lg flex justify-center'>
                            <img onClick={()=> {setShowModal(true);setInitialSlide(0)}} src={images[0]} alt="" className="object-cover cursor-pointer w-full" />
                        </div>
                        <div className='h-[50px] w-[50px] gap-2 overflow-hidden relative border rounded-lg flex justify-center'>
                            <img onClick={()=> {setShowModal(true);setInitialSlide(1)}} src={images[1]} alt="" className="object-cover cursor-pointer w-full" />
                        </div>

                        <div className="h-[50px] w-[50px] sm:w-[50px] overflow-hidden relative  rounded-lg flex justify-center">
                            <div className='h-[50px] w-full sm:w-[50px] flex items-center justify-center absolute'>
                                <div className=' z-[11] text-xl text-white flex'>{`+`+(images.length - 3)}</div>
                            </div>
                            <div onClick={()=> {setShowModal(true);setInitialSlide(2)}} className='bg-gray-500 bg-opacity-60 h-[50px] w-full sm:w-[50px] absolute z-10 backdrop-blur-[1px] cursor-pointer'></div>
                            <img src={images[2]} alt="" className="object-cover w-full " />
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
                className="w-full flex justify-center h-fit rounded-lg relative"
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

export default FeedbackImages
