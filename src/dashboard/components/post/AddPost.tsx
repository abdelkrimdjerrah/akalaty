import { useState } from "react";
import { House } from "phosphor-react";
import Input from "../../shared/Input";
import ButtonSecondary from "../../shared/ButtonSecondary";
import { axiosPrivate } from "../../api/axios";
import { selectUserData } from "../../redux/userSlice";
import { useSelector } from "react-redux";

function AddPost() {
  const userData = useSelector(selectUserData);
  const user = userData?._id;
  const [text, setText] = useState("");
  const images: string[] = [
    "https://images.unsplash.com/photo-1614602638662-c7c1f55c33f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://plus.unsplash.com/premium_photo-1674386067478-9b05280a87d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=850&q=80",
  ];
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };
  const imagesFormData = new FormData();

  const handleAddPost = async () => {
    try {
      setLoading(true);

      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
          imagesFormData.append("images", selectedFiles[i]);
        }
        console.log(imagesFormData.getAll("images"));
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
        console.log("error");
        return;
      }
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
        <input type="file" multiple onChange={handleFileChange} />
        <Input
          text="Write a text ..."
          type="text"
          widthFull
          onChange={(v) => setText(v)}
          value={text}
          className="py-2 text-xs w-[250px]"
        />

        <div className="flex gap-2">
          <ButtonSecondary onClick={() => {}} color="orange">
            Upload image
          </ButtonSecondary>
          <ButtonSecondary onClick={handleAddPost} color="red">
            Add post
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
}

export default AddPost;