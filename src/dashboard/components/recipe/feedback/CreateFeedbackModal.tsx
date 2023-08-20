import React, { useRef, useState } from "react";
import Modal from "../../shared/Modal";
import { X, XCircle } from "phosphor-react";
import Button from "../../shared/ButtonSecondary";
import Textarea from "../../shared/Textarea";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ButtonSecondary from "../../shared/ButtonSecondary";
import Loader from "../../shared/Loader";
import RatingSystem from "../../shared/RatingSystem";
import successAnimation from './successAnimation.json'
import Lottie, {LottieRefCurrentProps} from "lottie-react";



const CreateFeedbackModal = ({ closeModal, recipeId }: any) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedFilesImg, setSelectedFilesImg] = useState<Blob[]>([]);

  const successAnimationRef = useRef<LottieRefCurrentProps>(null);

  const axiosPrivate = useAxiosPrivate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let list: DataTransfer = new DataTransfer();

      //add new selected files
      for (let i = 0; i < e.target.files.length; i++) {
        list.items.add(e.target.files[i]);

        //convert image to base64
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[i] as Blob);
        reader.onload = () => {
          setSelectedFilesImg((prev: Blob[]) => {
            const newSelectedFilesImg: Blob[] = [...prev];
            if (reader.result) {
              newSelectedFilesImg.push(reader.result as unknown as Blob);
            }
            return newSelectedFilesImg;
          });
        };
      }

      //append old selected files
      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          list.items.add(selectedFiles[i]);
        }
      }

      setSelectedFiles(list.files);
    }
  };

  const imagesFormData = new FormData();

  const handleAddFeedback = async () => {
    try {
      setLoading(true);

      if (!text) {
        setError("Please write something");
        return;
      }

      if (!rating) {
        setError("Please rate the recipe");
        return;
      }

      setError("");

      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          imagesFormData.append("images", selectedFiles[i]);
        }
      }

      const feedbackDetails = {
        recipeId,
        text,
        rating,
        images: imagesFormData,
      };

      const { data } = await axiosPrivate.post(
        `/api/recipes/${recipeId}/feedbacks`,
        feedbackDetails,
        {
          //overriding the base header in axio.ts by the new header that accept files
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            text: text,
          },
        }
      );

      if (!data?.success) {
        setError(data?.message);
        return;
      }
      setAdded(true);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = (index: number) => {
    //deleting from the shown images
    setSelectedFilesImg((prev: Blob[]) => {
      const newArray: Blob[] = [...prev];
      newArray.splice(index, 1);
      return newArray;
    });

    //deleting from the selected files
    setSelectedFiles((prev: FileList | null) => {
      let newFiles: DataTransfer = new DataTransfer();
      if (prev) {
        for (let i = 0; i < prev.length; i++) {
          if (i !== index) {
            newFiles.items.add(prev[i]);
          }
        }
      }
      return newFiles.files.length ? newFiles.files : null;
    });
  };

  return (
    <Modal closeModal={closeModal}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-[500px]  max-h-[80%] overflow-y-scroll bg-white w-[95%] md:min-w-[500px]   p-5 rounded-2xl relative"
      >
        <div onClick={closeModal}>
          <X
            size={21}
            className="text-gray-400 cursor-pointer hover:text-black absolute right-5 top-5"
          />
        </div>

        <div className="flex flex-col gap-2">
          {error && (
            <>
              <p className="text-sm text-red-500">{error}</p>
            </>
          )}
  
          {added ? (
            <div className="flex flex-col items-center">
              <Lottie 
                lottieRef={successAnimationRef}
                animationData={successAnimation}
                style={{width: 300, height: 300}}
                onComplete={() => closeModal()}
                loop={false}
              />
            
            </div>
          ):
          (
            <>     
                <div className="w-full flex justify-center">
                    <RatingSystem rating={rating} setRating={setRating} size={25} />
                </div>

              <Textarea
                text="Write a feedback ..."
                widthFull
                onChange={(v) => setText(v)}
                value={text}
                className="py-2 text-xs w-[250px] pr-8"
                rows={5}
              />

                {selectedFiles && (
                  <div className="flex gap-2 overflow-hidden flex-wrap">
                    {selectedFilesImg.map((img: any, index: number) => {
                      return (
                        <div className="relative" key={index}>
                          <img
                            src={img}
                            alt="img"
                            className="w-20 h-20 object-cover border-[1px] border-gray-100 rounded-lg"
                          />

                          {/* adding white bg to the X inside so it will be visible on dark images */}
                          <div
                            onClick={() => handleDeleteImage(index)}
                            className="cursor-pointer"
                          >
                            <div className="bg-white w-2 h-2 absolute top-[10px] right-[10px]" />
                            <XCircle
                              size={20}
                              weight="fill"
                              className=" absolute top-1 right-1"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              <div className="flex gap-2 items-center w-full justify-center">
                <ButtonSecondary onClick={handleAddFeedback} color="orange">
                  Add feedback
                </ButtonSecondary>

                <div className="relative w-fit">
                  {selectedFiles ? (
                    <ButtonSecondary>
                      Selected {selectedFiles.length}{" "}
                    </ButtonSecondary>
                  ) : (
                    <ButtonSecondary>Upload image</ButtonSecondary>
                  )}
                  <label className=" cursor-pointer absolute w-full h-full left-0">
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      multiple
                      onChange={handleFileChange}
                      className=" bg-blue-500"
                    />
                  </label>
                </div>

                {loading && (
                  <>
                    <Loader />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CreateFeedbackModal;
