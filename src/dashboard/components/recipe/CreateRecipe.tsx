import React, { useState } from "react";
import { Cookie, XCircle, X } from "phosphor-react";
import Input from "../shared/Input";
import Textarea from "../shared/Textarea";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Lottie from "lottie-react";
import addImageAnimation from "./addImageAnimation.json";
import ButtonSecondary from "../shared/ButtonSecondary";

const CreateRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preparation, setPreparation] = useState([
    { step: 1, description: "" },
  ]);
  const [preparationTime, SetPreparationTime] = useState(0);
  const [ingredients, setIngredients] = useState<
    [{ name: string; amount: number; unit: Types.IUnitType }]
  >([{ name: "", amount: 0, unit: "grams" }]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedFilesImg, setSelectedFilesImg] = useState<Blob[]>([]);

  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  console.log(preparation)
  const axiosPrivate = useAxiosPrivate();

  const addStep = () => {
    const newStep = { step: preparation.length + 1, description: "" };
    setPreparation([...preparation, newStep]);
  };

  const deleteStep = (step:{ step: number, description: string }) => {
    const updatedPreparation = preparation.filter((s) => s.step !== step.step).map((s) => {
      if (s.step > step.step) {
        return { ...s, step: s.step - 1 };
      }
      return s;
    });
    setPreparation(updatedPreparation);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let list: DataTransfer = new DataTransfer();

      //add new selected files
      for (let i = 0; i < e.target.files.length; i++) {
        list.items.add(e.target.files[i]);

        //convert image to base64 in order to show it in front-end
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
    <div className="w-full bg-white rounded-2xl relative px-3 py-4 sm:p-5 sm:py-6">
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 w-full">
          <Cookie size={21} />
          <p className="text-sm font-medium">Add recipe</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Title:</p>
            <Input
              text="Write a title"
              type="text"
              widthFull
              onChange={(v) => setTitle(v)}
              value={title}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Description:</p>
            <Textarea
              text="Write a description"
              widthFull
              onChange={(v) => setDescription(v)}
              value={description}
              className="py-2 w-full pr-8"
              rows={5}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Images:</p>
            {selectedFiles && (
              <div className="flex gap-2 overflow-hidden flex-wrap py-2">
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
            <div className="relative w-fit">
              {selectedFiles ? (
                <ButtonSecondary>
                  Add more{"  ("}
                  {selectedFiles.length}
                  {")"}
                </ButtonSecondary>
              ) : (
                <ButtonSecondary color="orange">Upload image</ButtonSecondary>
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
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Prepatation:</p>
            <div className="flex flex-col gap-1">
              {preparation.map((step) => (
                <div key={step.step} className="flex flex-col gap-2">
                  {
                    step.step !== 1 ? (
                      <div>
                        <div className="py-4">
                          <hr />
                        </div>
                          <div className="w-full flex justify-between items-center">
                            <p className="text-sm">Step {step.step}:</p>
                            <div onClick={() => deleteStep(step)} className="flex items-center text-red-500 text-sm font-medium cursor-pointer w-fit">
                              <X size={17} weight="bold" />
                              <p>Delete</p>
                            </div>
                          </div>
                      </div>
                    ) : <p className="text-sm">Step {step.step}:</p>
                  }

              
                  <Textarea
                    text="Phase description"
                    type="text"
                    widthFull
                    onChange={(e: any) => {
                      const updatedPreparation = [...preparation];
                      updatedPreparation[step.step - 1].description =
                        e;
                      setPreparation(updatedPreparation);
                    }}
                    value={step.description}
                    rows={5}
                  />
                </div>
              ))}
              <div className="pt-1">
                <ButtonSecondary onClick={addStep} color="blue">Add more steps</ButtonSecondary>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">{`Prepatation time (minutes) :`}</p>
            <Input
              text="in minutes"
              type="text"
              widthFull
              onChange={(v) =>
                SetPreparationTime(
                  Number(v) ? Number(v) : v === "" ? 0 : preparationTime
                )
              }
              value={String(preparationTime)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
