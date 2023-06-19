import { useState } from "react";
import { House } from "phosphor-react";
import Input from "../../shared/Input";
import ButtonSecondary from "../../shared/ButtonSecondary";
import { axiosPrivate } from "../../api/axios";
import Loader from "../../shared/Loader";

function AddPost() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [isPosted, setIsPosted] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };
  const imagesFormData = new FormData();

  const handleAddPost = async () => {
    try {
      
      setLoading(true);
      
      if(!text){
        setIsError("Please write something")
        return
      }

      setIsError("")


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
        setIsError(data?.message)
        return;
      }
      setIsPosted(true);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl relative p-5 py-6 ">
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
        <Input
          text="Write a text ..."
          type="text"
          widthFull
          onClick={() => setIsPosted(false)}
          onChange={(v) => setText(v)}
          value={text}
          className="py-2 text-xs w-[250px]"
        />

        <div className="flex gap-2 items-center">
          <div className="relative w-fit">
            <ButtonSecondary color="orange">Upload image</ButtonSecondary>
            <label className=" cursor-pointer absolute w-full h-full left-0">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className=" bg-blue-500"
              />
            </label>
          </div>
          <ButtonSecondary onClick={handleAddPost} color="red">
            Add post
          </ButtonSecondary>
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
