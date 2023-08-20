import { useEffect, useState } from "react";
import { House, XCircle } from "phosphor-react";
import Input from "../shared/Input";
import ButtonSecondary from "../shared/ButtonSecondary";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../shared/Loader";
import Textarea from "../shared/Textarea";

function AddPost() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [isPosted, setIsPosted] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedFilesImg, setSelectedFilesImg] = useState<Blob[]>([]);

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

  const handleAddPost = async () => {
    try {
      setLoading(true);

      if (!text) {
        setIsError("Please write something");
        return;
      }

      setIsError("");

      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          imagesFormData.append("images", selectedFiles[i]);
        }
      }

      const { data } = await axiosPrivate.post(`/api/posts`, imagesFormData, {
        //overriding the base header in axio.ts by the new header that accept files
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          text: text,
        },
      });

      if (!data?.success) {
        setIsError(data?.message);
        return;
      }
      setIsPosted(true);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage  = (index:number) => {

    //deleting from the shown images
    setSelectedFilesImg((prev: Blob[]) => {
      const newArray: Blob[] = [...prev];
      newArray.splice(index, 1)
      return newArray;
    });

    //deleting from the selected files
    setSelectedFiles((prev: FileList | null) => {
      let newFiles: DataTransfer = new DataTransfer();
      if(prev){
        for (let i = 0; i < prev.length; i++) {
          if(i !== index){
            newFiles.items.add(prev[i])
          }
        }
      }
      return newFiles.files.length ? newFiles.files : null;
    })

  };

  return (
    <div className="w-full bg-white rounded-2xl relative px-3 py-4 sm:p-5 sm:py-6 ">
      <div className="flex flex-col gap-3">
        <div className="flex gap-1 w-full">
          <House size={21} />
          <p className="text-sm font-medium">Add post</p>
        </div>
        {isPosted && (
          <>
            <p className="text-sm text-green-500">Post added successfully!</p>
          </>
        )}
        {isError && (
          <>
            <p className="text-sm text-red-500">{isError}</p>
          </>
        )}
        <Textarea
          text="Write a text ..."
          type="text"
          widthFull
          onClick={() => setIsPosted(false)}
          onChange={(v) => setText(v)}
          value={text}
          rows={4}
          className="py-2 text-xs w-[250px]"
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
                  <div onClick={() => handleDeleteImage(index)} className="cursor-pointer">
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

        <div className="flex gap-2 items-center">
        <ButtonSecondary onClick={handleAddPost} color="orange">
            Add post
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
      </div>
    </div>
  );
}

export default AddPost;
