import React, { useState } from "react";
import { Cookie, XCircle, X } from "phosphor-react";
import Input from "../shared/Input";
import Textarea from "../shared/Textarea";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ButtonSecondary from "../shared/ButtonSecondary";
import BasicInformation from "./create/BasicInformation";
import UploadImages from "./create/UploadImages";
import Preparation from "./create/Preparation";
import Ingredients from "./create/Ingredients";

const CreateRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preparation, setPreparation] = useState([{ step: 1, description: "" }]);
  const [preparationTime, SetPreparationTime] = useState(0);
  const [ingredients, setIngredients] = useState<
    [{ key: number, name: string; amount: number; unit: Types.IUnitType }]
  >([{ key: 1, name: "", amount: 0, unit: "grams" }]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedFilesImg, setSelectedFilesImg] = useState<Blob[]>([]);

  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  const axiosPrivate = useAxiosPrivate();


  const formData: any = new FormData();

  const handleAddRecipe = async () => {
    try {
      setLoading(true);

      if (!title || !description) {
        setError("Please fill all the fields");
        return;
      }

      if (!selectedFiles?.length) {
        setError("Please add at least one image");
        return;
      }

      setError("");

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images", selectedFiles[i]);
      }

      //these will be found in req.body in server
      formData.append("title", title);
      formData.append("description", description);
      formData.append("preparation", preparation);
      formData.append("preparationTime", preparationTime);
      formData.append("ingredients", ingredients);

      const { data } = await axiosPrivate.post(
        `/api/recipes/create`,
        formData,
        {
          //overriding the base header in axio.ts by the new header that accept files
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!data?.success) {
        setError(data?.message);
        return;
      }
      setAdded(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="w-full bg-white rounded-2xl relative px-3 py-4 sm:p-5 sm:py-6">
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 w-full">
          <Cookie size={21} />
          <p className="text-sm font-medium">Add recipe</p>
        </div>
        <div className="flex flex-col gap-3">
            <BasicInformation title={title} setTitle={setTitle} description={description} setDescription={setDescription} />
            <UploadImages selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} selectedFilesImg={selectedFilesImg} setSelectedFilesImg={setSelectedFilesImg} />
            <Preparation preparation={preparation} setPreparation={setPreparation} preparationTime={preparationTime} SetPreparationTime={SetPreparationTime} />
            <Ingredients ingredients={ingredients} setIngredients={setIngredients}/>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
