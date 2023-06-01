import { useEffect, useState } from "react";
import { ChatCircleDots, Heart, PaperPlaneRight, X } from "phosphor-react";
import Input from "../../shared/Input";
import Modal from "../../shared/Modal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface postIdInterface{
  postId: string
}

function PostEngagement({postId}: postIdInterface) {
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

 




    const handlePostLike = async () => {
        try {
          
          setLoading(true)
          const postDetails = { 
             postId
            }
          const {data} = await axiosPrivate.patch(
              `/api/posts/${postId}/likes`,
              postDetails
            );
            
          if (!data?.success) {
            console.log('error')
            return;
          }
          if (data?.action == 'Like') {
            setLike(true)
          }
          if (data?.action == 'Unlike') {
            setLike(false)
          }
          
        } catch (error) {
          console.log('error')
        } finally {
          setLoading(false);
        }
      };
    



      useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;
    
        const checkPostLike = async () => {
          try {
            const response = await axiosPrivate.get(
                `/api/posts/${postId}/likes/check`,
              {
                signal: controller.signal
              }
            );
    
            if (isMounted) {
              const result = response.data.hasLikedPost // returns either True or False
              setLike(result)
            }
          } catch (err) {
        
          }
        };
    
        checkPostLike();
    
        return () => {
          isMounted = false;
          controller.abort(); // Cancel the request if the component unmounts
        };
      }, []);
    



  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="text-sm items-center flex gap-3">
          <div className="flex gap-[2px] items-center">
            <div onClick={() => {
                  handlePostLike()
                }}>
              {like ? (
                <Heart size={21} weight="fill" className="text-red-500" />
              ) : (
                <Heart size={21} />
              )}
            </div>
            <div className="flex gap-1">
              <p className="font-medium text-xs">650</p>
            </div>
          </div>

          <div className="flex gap-[2px] items-center" onClick={() => setShowModal(true)}>
            <ChatCircleDots size={21} />
            <div className="flex gap-1">
              <p className="font-medium text-xs">650</p>
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
      
      {showModal && (
        <Modal
          closeModal={() => {
            setShowModal(false);
          }}
        >
          <div onClick={(e) => e.stopPropagation()} className="max-w-[500px] bg-white min-w-[500px] h-fit p-5 rounded-2xl relative">
            {showModal && (
                <div onClick={() => setShowModal(false)}>
                  <X
                    size={21}
                    className="text-gray-400 cursor-pointer hover:text-black absolute right-5 top-5"
                  />
                </div>
              )}
            Hello world
          </div>
        </Modal>
      )}

    </div>
  );
}

export default PostEngagement;
