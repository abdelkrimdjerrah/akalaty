import React from 'react'
import { useState } from 'react'
import UserItem from '../../shared/UserItem'
import { DotsThreeVertical, BookmarkSimple, ChatCircleDots, Heart, PaperPlaneRight } from 'phosphor-react'
import Input from '../../shared/Input'


const Abdelkrim = require('../../../assets/Abdelkrim.png')

interface propsInterface{
    with?: boolean
}
function Post(props: propsInterface) {
  const [comment, setComment] = useState("");
  return (
    <div className='w-full border-b-[1px] py-6'>
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

            {props.with &&
                <div className='min-w-[200px] min-h-[200px] max-w-[200px] max-h-[200px] bg-gray-200 rounded-2xl flex items-center justify-center'>
                    <p className='text-xs text-gray-500'>Image</p>
            </div>
            }
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